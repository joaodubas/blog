var express = require('express');
var app = module.exports = express();

app.use(function _navigation(req, res, next) {
  var navList = [
    {
      icon: 'icon-home',
      text: 'Home',
      href: '/'
    },
    // {
    //   icon: 'icon-list',
    //   text: 'Arquivos',
    //   href: '/arquivo'
    // },
    // {
    //   icon: 'icon-tags',
    //   text: 'Tags',
    //   href: '/tags'
    // },
    {
      icon: 'icon-edit',
      text: 'Admin',
      href: '/admin'
    }
  ];
  res.locals.navigation = navList;
  next();
});

app.use(function _personal(req, res, next) {
  var personalList = [
    {
      icon: 'icon-user',
      text: 'Eu o/',
      href: 'https://dl.dropboxusercontent.com/u/11582370/temp/cv/cv_joao_dubas.html'
    },
    {
      icon: 'icon-twitter-sign',
      text: 'Twitter',
      href: 'https://twitter.com/joaodubas'
    },
    {
      icon: 'icon-facebook-sign',
      text: 'Facebook',
      href: 'http://www.facebook.com/joao.dubas'
    },
    {
      icon: 'icon-flickr',
      text: 'Flickr',
      href: 'http://www.flickr.com/photos/joao_dubas/'
    },
    {
      icon: 'icon-linkedin-sign',
      text: 'Linkedin',
      href: 'http://br.linkedin.com/in/joaodubas/'
    },
    {
      icon: 'icon-github-sign',
      text: 'Github',
      href: 'https://github.com/joaodubas'
    },
    {
      icon: 'icon-bitbucket-sign',
      text: 'Bitbucket',
      href: 'https://bitbucket.org/joaodubas'
    },
    {
      icon: 'icon-sign-blank',
      text: 'CodePen',
      href: 'http://codepen.io/joaodubas'
    }
  ];

  res.locals.personal = personalList;
  next();
});
