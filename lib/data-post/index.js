var engine = require('data');
var collection = engine.getCollection('posts');

function _dummyIndex(err, indexName) {
  if (err) {
    throw new Error(err);
  }
  console.log('Created', indexName);
}
collection.ensureIndex('slug', {unique: true}, _dummyIndex);
collection.ensureIndex({createdAt: -1}, {w: 1}, _dummyIndex);
collection.ensureIndex({publishAt: -1}, {w: 1}, _dummyIndex);
collection.ensureIndex({tags: 1}, {_tiarr: true}, _dummyIndex);

module.exports.list = listPosts;
module.exports.listByDate = listPostsByDate;
module.exports.listByTag = listPostsByTag;
module.exports.get = getPost;
module.exports.upsert = upsertPost;
module.exports.create = createPost;
module.exports.update = updatePost;
module.exports.remove = removePost;

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

function listPosts(options) {
  page = options.page || 0;
  // posts per page
  limit = options.limit || 5;
  // skip how many posts
  skip = limit * page;

  collection.find(
    {},
    {
      limit: limit,
      skip: skip,
      sort: {publishAt: -1}
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
  collection.insert(options.data, options.callback);
}

function updatePost(options) {
  collection.update({slug: options.slug}, options.data, options.callback);
}

function removePost(options) {
  collection.remove({slug: options.slug}, options.callback);
}
