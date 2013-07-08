var express = require('express');
var app = module.exports = express();

app.use(function _navigation(req, res, next) {
  var navList = [
    {
      icon: 'icon-home',
      text: 'Home',
      href: '#'
    },
    {
      icon: 'icon-user',
      text: 'Eu o/',
      href: '#'
    },
    {
      icon: 'icon-list',
      text: 'Arquivos',
      href: '#'
    },
    {
      icon: 'icon-tags',
      text: 'Tags',
      href: '#'
    },
    {
      icon: 'icon-edit',
      text: 'Admin',
      href: '#'
    }
  ];
  res.locals.navigation = navList;
  next();
});

app.use(function _personal(req, res, next) {
  var personalList = [
    {
      icon: 'icon-twitter-sign',
      text: 'Twitter',
      href: '#'
    },
    {
      icon: 'icon-facebook-sign',
      text: 'Facebook',
      href: '#'
    },
    {
      icon: 'icon-flickr',
      text: 'Flickr',
      href: '#'
    },
    {
      icon: 'icon-linkedin-sign',
      text: 'Linkedin',
      href: '#'
    },
    {
      icon: 'icon-github-sign',
      text: 'Github',
      href: '#'
    },
    {
      icon: 'icon-bitbucket-sign',
      text: 'Bitbucket',
      href: '#'
    },
    {
      icon: 'icon-sign-blank',
      text: 'CodePen',
      href: '#'
    }
  ];

  res.locals.personal = personalList;
  next();
});
