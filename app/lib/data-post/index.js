var engine = require('../data.js');
var collection = engine.getCollection('posts');

var requiredKeys = ['title', 'markdown', 'body', 'slug', 'createdAt'];
var requiredMessage = 'You must provide at least these keys: ' + requiredKeys.join(', ');

function _dummyIndex(err, indexName) {
  if (err) {
    throw new Error(err);
  }
  console.log('Created', indexName);
}
collection.ensureIndex('slug', {unique: true}, _dummyIndex);
collection.ensureIndex({createdAt: -1}, {w: 1}, _dummyIndex);
collection.ensureIndex({tags: 1}, {_tiarr: true}, _dummyIndex);

module.exports.list = listPosts;
module.exports.listByDate = listPostsByDate;
module.exports.listByTag = listPostsByTag;
module.exports.get = getPost;
module.exports.upsert = upsertPost;
module.exports.create = createPost;
module.exports.update = updatePost;
module.exports.remove = removePost;
module.exports.addComment = addComment;

function dateLimit(year, month) {
  var MIN_MONTH = 1;
  var MAX_MONTH = 12;

  var currDate = new Date();
  var hasMonth = Number.isFinite(month);
  var upper, lower;

  year = year || currDate.getFullYear();
  month = month || currDate.getMonth();

  if (hasMonth) {
    lower = year + '-' + month + '-1';
    if (month + 1 > MAX_MONTH) {
      upper = (year + 1) + '-1-1';
    } else {
      upper = year + '-' + (month + 1) + '-1';
    }
  } else {
    lower = year + '-1-1';
    upper = (year + 1) + '-1-1';
  }

  return [new Date(Date.parse(lower)), new Date(Date.parse(upper))];
}

function clone(original, edited) {
  var properties = ['title', 'body', 'markdown', 'tags'];
  properties.forEach(function (key) { original[key] = edited[key]; });
  return original;
}

function validate(data) {
  var dataKeys = Object.keys(data);
  var hasKeys = requiredKeys.map(function (key) {
    return dataKeys.indexOf(key) > -1; 
  }).reduce(function (accum, value) {
    return accum && value;
  });
  return hasKeys;
}

function listPosts(options) {
  var page = options.page || 0;
  // posts per page
  var limit = options.limit || 5;
  // skip how many posts
  var skip = limit * page;

  collection.find(
    {},
    {
      limit: limit,
      skip: skip,
      sort: {createdAt: -1}
    },
    options.callback
  );
}

function listPostsByTag(options) {
  collection.find(
    {tags: options.tag},
    options.callback
  );
}

function listPostsByDate(options) {
  var limits = dateLimit(options.year, options.month);
  collection.find(
    {publishAt: {$gt: limits[0], $lt: limits[1]}},
    options.callback
  );
}

function getPost(options) {
  collection.findOne({slug: options.slug}, options.callback);
}

function upsertPost(options) {
  collection.update(
    {slug: options.slug},
    options.data,
    {upsert: true},
    options.callback
  );
}

function createPost(options) {
  if (!validate(options.data)) {
    return options.callback(new Error(requiredMessage));
  }  
  collection.insert(options.data, options.callback);
}

function updatePost(options) {
  getPost({
    slug: options.slug,
    callback: function retrieved(err, item) {
      collection.update(
        {slug: options.slug},
        clone(item, options.data),
        options.callback
      );
    }
  });
}

function removePost(options) {
  collection.remove({slug: options.slug}, options.callback);
}

function addComment(options) {
  getPost({
    slug: options.slug,
    callback: function retrieved(err, item) {
      if (!item.comments) {
        item.comments = [];
      }
      item.comments.push(options.comment);
      item.comments = item.comments.sort(function sortByDate(a, b) {
        return b.createdAt.valueOf() - a.createdAt.valueOf();
      });
      collection.update(
        {slug: options.slug},
        item,
        options.callback
      );
    }
  });
}
