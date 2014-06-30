'use strict';
angular.module('adminApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.tinymce'
]).config([
  '$routeProvider',
  '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/News', {
      templateUrl: 'views/news.html',
      controller: 'NewsCtrl'
    }).when('/Pages', {
      templateUrl: 'views/pages.html',
      controller: 'PagesCtrl'
    }).when('/Blog', {
      templateUrl: 'views/blog.html',
      controller: 'BlogCtrl'
    }).when('/Pub', {
      templateUrl: 'views/pub.html',
      controller: 'PubCtrl'
    }).otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode(false).hashPrefix('!');
  }
]);
'use strict';
angular.module('adminApp').controller('MainCtrl', [
  '$scope',
  '$location',
  'User',
  function ($scope, $location, User) {
    // TODO: Implement it !
    var isLoggedIn = function () {
      return false;
    };
    if (isLoggedIn()) {
      alert('Imagine being redirected to the News page');
    }
    $scope.login = function () {
      var email = document.getElementById('login-email').value, password = document.getElementById('login-password').value;
      var login = User.login(email, password);
      if (login.success === true) {
        $location.path('/News');
      } else {
        document.getElementById('login-errors').innerHTML = login.error;
      }
    };
    $scope.signup = function () {
      var email = document.getElementById('signup-email').value, password = document.getElementById('signup-password').value, confirm = document.getElementById('signup-confirm').value, name = document.getElementById('signup-name').value, signature = document.getElementById('signup-signature').value;
      var signup = User.signup(email, password, confirm, name, signature);
      if (signup.success === true) {
        alert('Merci de votre enregistrement. Vous recevrez un email lorsque votre candidature sera valid\xe9e.');
      } else {
        document.getElementById('signup-errors').innerHTML = signup.error;
      }
    };
  }
]);
'use strict';
angular.module('adminApp').factory('User', function () {
  return {
    login: function (email, password) {
      var error = '', success = true;
      if (email.indexOf('@') === -1) {
        success = false;
        error = 'Il ne s\'agit pas d\'un email valide.';
      }
      if (password === '') {
        success = false;
        error = 'Le champ mot de passe est vide.';
      }
      if (email === '') {
        success = false;
        error = 'Le champ email est vide.';
      }
      if (success) {
      }
      return {
        success: success,
        error: error
      };
    },
    signup: function (email, password, confirm, name, signature) {
      var error = '', success = true;
      if (password !== confirm) {
        success = false;
        error = 'Le mot de passe ne correspond pas \xe0 la confirmation.';
      }
      if (email.indexOf('@') === -1) {
        success = false;
        error = 'L\'email n\'est pas valide.';
      }
      if (email === '' || password === '' || confirm === '' || name === '' || signature === '') {
        success = false;
        error = 'Certains champs n\'ont pas \xe9t\xe9 remplis.';
      }
      if (success) {
      }
      return {
        success: success,
        error: error
      };
    }
  };
});
'use strict';
angular.module('adminApp').controller('NewsCtrl', [
  '$scope',
  'News',
  function ($scope, News) {
    var news = [], date = new Date().getTime();
    News.getNews(function (response) {
      news = response;
      $scope.news = news;
    });
    $scope.sendNews = function () {
      var id = parseInt($scope.currentNews.id), title = $scope.currentNews.title, content = $scope.currentNews.content, date = $scope.currentNews.date, mag = document.getElementById('newsMag').checked ? 1 : 0;
      if (!(title || content || date)) {
        alert('Certains champs ne sont pas remplis.');
        return false;
      }
      News.save(function (response) {
        news = response;
        $scope.news = news;
      }, title, content, date, id, mag);
      $scope.addNews();
    };
    $scope.uploadedImage = function (img) {
      console.log(img);
      $scope.currentNews.content += '<img src="' + img + '" alt="' + $scope.currentNews.title + '" />';
    };
    $scope.delete = function (newsId) {
      var c = confirm('Voulez vous vraiment supprimer la News n\xb0' + newsId + ' ?');
      newsId = parseInt(newsId);
      if (c) {
        News.delete(function (response) {
          news = response;
          $scope.news = response;
        }, newsId);
      }
    };
    $scope.addNews = function () {
      $scope.currentNews = {
        date: date,
        content: '',
        mag: 0
      };
      document.getElementById('newsMag').checked = false;
      $scope.sendText = 'Cr\xe9er News';
    };
    $scope.modify = function (newsId) {
      News.getNews(function (response) {
        $scope.currentNews = response;
        $scope.sendText = 'Modifier News';
      }, newsId);
    };
    $scope.sendText = 'Cr\xe9er News';
    $scope.currentNews = {
      date: date,
      content: ''
    };
    $scope.tinymceOptions = {
      selector: '#newsContent',
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking table contextmenu directionality',
        'emoticons template paste textcolor'
      ],
      toolbar1: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
      image_advtab: true
    };
  }
]);
'use strict';
angular.module('adminApp').factory('News', [
  '$http',
  'Server',
  function ($http, Server) {
    var news = [];
    var newsUrl = Server.Url + 'news/';
    var loadNews;
    loadNews = function (callback, id) {
      var url = newsUrl + (id ? '?id=' + id : '');
      $http.get(url, { cache: 'true' }).success(function (response) {
        var iter, filter;
        var processed = Server.processResponse(response);
        for (iter = 0; iter < processed.length; iter++) {
          filter = news.some(function (el) {
            return JSON.stringify(el) === JSON.stringify(processed[iter]);
          });
          if (!filter) {
            news.push(processed[iter]);
          }
        }
        processed = processed.length > 1 ? processed : processed[0];
        callback(processed);
      }).error(Server.errorHandler);
    };
    return {
      getNews: function (callback, id) {
        var current;
        if (id || angular.isNumber(id)) {
          current = news.filter(function (el) {
            return el.id === id;
          })[0];
          if (typeof current === 'undefined') {
            loadNews(callback, id);
          } else {
            callback(current);
          }
        } else {
          if (news.length > 0) {
            callback(news);
          } else {
            loadNews(callback);
          }
        }
      },
      delete: function (callback, id) {
        var iter, deleteUrl = newsUrl + 'delete/?id=' + id;
        if (id && angular.isNumber(id)) {
          for (iter = 0; iter < news.length; iter++) {
            if (news[iter].id === id) {
              news.splice(iter, 1);
              $http.get(deleteUrl).success(function () {
                callback(news);
              }).error(Server.errorHandler);
              ;
              return true;
            }
          }
        }
        return false;
      },
      save: function (callback, title, content, date, id, mag) {
        var iter, saveUrl = newsUrl + 'save/', save = this.save, id = id || 0, data = {
            id: id,
            title: title,
            content: content,
            mag: mag
          };
        $http({
          method: 'POST',
          url: saveUrl,
          data: jQuery.param(data),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        }).success(function (response) {
          if (parseInt(response) === 0) {
            return alert('Vous \xeates d\xe9connecter. Veuillez vous reconnecter pour sauver la News.');
          }
          var saved = Server.processResponse(response)[0];
          if (id && angular.isNumber(id)) {
            for (iter = 0; iter < news.length; iter++) {
              if (news[iter].id === id) {
                news[iter] = saved;
                break;
              }
            }
          } else {
            news.push(saved);
          }
          callback(news);
        }).error(Server.errorHandler);
      }
    };
  }
]);
'use strict';
angular.module('adminApp').controller('PagesCtrl', [
  '$scope',
  'Pages',
  function ($scope, Pages) {
    var pages = [];
    Pages.getPage(function (response) {
      pages = response;
      $scope.currentTitle = pages[0].name;
      $scope.activePage = pages[0].id;
      $scope.tinyMceContent = pages[0].content;
      $scope.pages = pages;
    });
    $scope.modify = function (id) {
      Pages.getPage(function (response) {
        var page = response;
        $scope.currentTitle = page.name;
        $scope.activePage = page.id;
        $scope.tinyMceContent = page.content;
      }, id);
    };
    $scope.delete = function () {
      var id = $scope.activePage, conf = confirm('Voulez-vous vraiment supprimer la news n\xb0' + id + ' ?');
      if (conf) {
        Pages.delete(function (response) {
          pages = response;
          $scope.modify(pages[0].id);
        }, id);
      }
      return;
    };
    $scope.save = function () {
      var page = {
          id: $scope.activePage,
          name: $scope.currentTitle,
          content: $scope.tinyMceContent
        };
      Pages.save(function (saved) {
        Pages.getPage(function (response) {
          pages = response;
          $scope.pages = pages;
          $scope.modify(saved.id);
        });
      }, page);
    };
    $scope.addPage = function () {
      $scope.modify(0);
    };
    $scope.tinymceOptions = {
      selector: 'textarea',
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking table contextmenu directionality',
        'emoticons template paste textcolor'
      ],
      toolbar1: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
      image_advtab: true
    };
  }
]);
'use strict';
angular.module('adminApp').factory('Pages', [
  '$http',
  'Server',
  function ($http, Server) {
    var pages = [];
    var pageUrl = Server.Url + 'pages/';
    var loadPages;
    loadPages = function (callback) {
      $http.get(pageUrl, { cache: 'true' }).success(function (response) {
        var iter, filter;
        var processed = Server.processResponse(response);
        for (iter = 0; iter < processed.length; iter++) {
          filter = pages.some(function (el) {
            return JSON.stringify(el) === JSON.stringify(processed[iter]);
          });
          if (!filter) {
            pages.push(processed[iter]);
          }
        }
        callback(pages);
      }).error(Server.errorHandler);
    };
    return {
      getPage: function (callback, id) {
        var getPage;
        if (pages.length < 1) {
          getPage = this.getPage;
          loadPages(function () {
            getPage(callback, id);
          });
        } else {
          if (id && angular.isNumber(id)) {
            var page = pages.filter(function (el) {
                return el.id === +id;
              })[0];
            page = page ? page : {};
            callback(page);
          } else {
            callback(pages);
          }
        }
      },
      delete: function (callback, id) {
        var deleteUrl = pageUrl + 'delete/?id=' + id;
        $http.get(deleteUrl).success(function (response) {
          var iter;
          if (parseInt(response) === 0) {
            alert('La suppression de la page a \xe9chou\xe9.');
          } else {
            for (iter = 0; iter < pages.length; iter++) {
              if (pages[iter].id === id) {
                pages.splice(iter, 1);
                break;
              }
            }
            callback(pages);
          }
        }).error(Server.errorHandler);
      },
      save: function (callback, page) {
        var iter, id = page.id || 0, saveUrl = pageUrl + 'save/', save = this.save;
        page.id = id;
        $http({
          method: 'POST',
          url: saveUrl,
          data: jQuery.param(page),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        }).success(function (response) {
          if (parseInt(response) === 0) {
            return alert('Vous \xeates d\xe9connecter. Veuillez vous reconnecter pour sauver la page.');
          }
          var saved = Server.processResponse(response)[0];
          if (id && angular.isNumber(id)) {
            for (iter = 0; iter < pages.length; iter++) {
              if (pages[iter].id === id) {
                pages[iter] = saved;
                break;
              }
            }
          } else {
            pages.push(saved);
          }
          callback(saved);
        }).error(Server.errorHandler);
      }
    };
  }
]);
'use strict';
angular.module('adminApp').controller('BlogCtrl', [
  '$scope',
  'Bloggers',
  'BlogPosts',
  function ($scope, Bloggers, BlogPosts) {
    var bloggers = [];
    Bloggers.getBlogger(function (response) {
      bloggers = response;
      $scope.bloggers = bloggers;
      $scope.activeBlogger = bloggers[0].id;
      $scope.blogger = bloggers[0];
      BlogPosts.getPosts(function (response) {
        $scope.blogPosts = response;
      }, $scope.activeBlogger);
      $scope.currentNews = {
        date: parseInt(new Date().getTime()),
        blogId: $scope.activeBlogger
      };
    });
    $scope.select = function (id) {
      Bloggers.getBlogger(function (blogger) {
        $scope.activeBlogger = id;
        $scope.blogger = blogger;
        BlogPosts.getPosts(function (response) {
          $scope.blogPosts = response;
          $scope.currentNews = {
            date: parseInt(new Date().getTime()),
            blogId: $scope.activeBlogger
          };
        }, $scope.activeBlogger);
      }, id);
    };
    $scope.addBlog = function () {
      $scope.activeBlogger = 0;
      $scope.blogger = {};
    };
    $scope.deleteBlog = function () {
      var conf = confirm('\xcates-vous s\xfbr de vouloir supprimer le blog ' + $scope.blogger.name + ' ?'), blogger = $scope.blogger;
      if (conf) {
        Bloggers.delete(function (response) {
          bloggers = response;
          $scope.bloggers = response;
          $scope.select(bloggers[0].id);
        }, blogger);
      }
    };
    $scope.saveBlogger = function () {
      var id = $scope.activeBlogger, blogger = $scope.blogger;
      Bloggers.save(function (saved) {
        Bloggers.getBlogger(function (response) {
          $scope.blogger = saved;
          $scope.activeBlogger = saved.id;
          bloggers = response;
          $scope.bloggers = bloggers;
          BlogPosts.getPosts(function (response) {
            $scope.blogPosts = response;
          }, $scope.activeBlogger);
        });
      }, id, blogger);
    };
    $scope.removeSponsor = function (sponsor) {
      var pos = $scope.blogger.sponsors.indexOf(sponsor);
      $scope.blogger.sponsors.splice(pos, 1);
    };
    $scope.removeAd = function (ad) {
      var pos = $scope.blogger.ad.indexOf(ad);
      $scope.blogger.ad.splice(pos, 1);
    };
    // This function should upload the picture and then modify directly the scope.blogger object.
    $scope.changePortrait = function (url) {
      $scope.blogger.profilePic = url;
    };
    // This function should upload the picture and then modify directly the scope.blogger object.
    $scope.addSponsors = function (url) {
      $scope.blogger.sponsors.push(url);
    };
    // This function should upload the picture and then modify directly the scope.blogger object.
    $scope.addAd = function (url) {
      $scope.blogger.ad.push(url);
    };
    $scope.addNews = function () {
      $scope.currentNews = {
        date: parseInt(new Date().getTime()),
        blogId: $scope.activeBlogger
      };
    };
    $scope.modifyNews = function (post) {
      $scope.currentNews = post;
    };
    $scope.insertBlogImage = function (img) {
      $scope.currentNews.content += '<img src="' + img + '" alt="' + $scope.currentNews.title + '" />';
    };
    $scope.saveNews = function () {
      var post = $scope.currentNews, blogId = post.blogId;
      post.date = post.date || parseInt(new Date().getTime());
      BlogPosts.save(function (saved) {
        BlogPosts.getPosts(function (response) {
          $scope.currentNews = saved;
          $scope.blogPosts = response;
        }, blogId);
      }, post);
    };
    $scope.deleteNews = function (postId) {
      var conf = confirm('Voulez-vous vraiment effacer le post n\xb0' + postId + ' ?'), blogId = $scope.activeBlogger;
      if (conf) {
        BlogPosts.delete(function (response) {
          $scope.blogPosts = response;
        }, postId, blogId);
      }
    };
    $scope.tinymceOptionsBio = {
      selector: '#bioContent',
      theme: 'modern',
      toolbar1: 'bold italic | alignleft aligncenter alignright alignjustify | bullist',
      image_advtab: true
    };
    $scope.tinymceOptionsNews = {
      selector: '#newsContent',
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking table contextmenu directionality',
        'emoticons template paste textcolor'
      ],
      toolbar1: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
      image_advtab: true
    };
  }
]);
'use strict';
angular.module('adminApp').factory('Bloggers', [
  '$http',
  'Server',
  function ($http, Server) {
    var blogs = [], blogsUrl = Server.Url + 'blogs/bloggers/';
    var loadBloggers;
    loadBloggers = function (callback, id) {
      var url = blogsUrl + (id ? '?id=' + id : '');
      $http.get(url, { cache: 'true' }).success(function (response) {
        var iter, filter;
        var processed = Server.processResponse(response);
        processed = processed.map(function (el) {
          el.ad = el.ad.split('|');
          el.sponsors = el.sponsors.split('|');
          return el;
        });
        for (iter = 0; iter < processed.length; iter++) {
          filter = blogs.some(function (el) {
            return JSON.stringify(el) === JSON.stringify(processed[iter]);
          });
          if (!filter) {
            blogs.push(processed[iter]);
          }
        }
        processed = processed.length > 1 ? processed : processed[0];
        callback(processed);
      }).error(Server.errorHandler);
    };
    return {
      getBlogger: function (callback, id) {
        var getBlogger;
        if (blogs.length < 1) {
          getBlogger = this.getBlogger;
          loadBloggers(function () {
            getBlogger(callback, id);
          });
        } else {
          if (id && angular.isNumber(id)) {
            var blogger = blogs.filter(function (el) {
                return el.id === parseInt(id);
              });
            blogger = blogger[0] ? blogger[0] : {};
            callback(blogger);
          } else {
            callback(blogs);
          }
        }
      },
      delete: function (callback, blogger) {
        var id = blogger.id, deleteUrl = blogsUrl + 'delete/?id=' + id;
        $http.get(deleteUrl).success(function (response) {
          if (parseInt(response) === 0) {
            return alert('La suppression a \xe9chou\xe9 du cot\xe9 serveur.');
          }
          var iter;
          for (iter = 0; iter < blogs.length; iter++) {
            if (blogs[iter].id === id) {
              blogs.splice(iter, 1);
              break;
            }
          }
          callback(blogs);
        }).error(Server.errorHandler);
      },
      save: function (callback, id, blogger) {
        var iter, saveUrl = blogsUrl + 'save/', save = this.save, id = id || 0, data;
        blogger.id = id;
        blogger.ad = blogger.ad ? blogger.ad.join('|') : '';
        blogger.sponsors = blogger.sponsors ? blogger.sponsors.join('|') : '';
        data = jQuery.param(blogger);
        $http({
          method: 'POST',
          url: saveUrl,
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        }).success(function (response) {
          if (parseInt(response) === 0) {
            return alert('Vous \xeates d\xe9connecter. Veuillez vous reconnecter pour sauver la News.');
          }
          var saved = Server.processResponse(response)[0];
          if (id && angular.isNumber(id)) {
            for (iter = 0; iter < news.length; iter++) {
              if (blogs[iter].id === id) {
                blogs[iter] = saved;
                break;
              }
            }
          } else {
            blogs.push(saved);
          }
          callback(saved);
        }).error(Server.errorHandler);
      }
    };
  }
]);
'use strict';
angular.module('adminApp').factory('BlogPosts', [
  '$http',
  'Server',
  function ($http, Server) {
    var posts = [], postsUrl = Server.Url + 'blogs/posts/';
    var loadBlogPosts;
    loadBlogPosts = function (callback, blogId, id) {
      var url = postsUrl + 'blog/?blogId=' + blogId;
      url = id ? url + '&id=' + id : url;
      $http.get(url, { cache: 'true' }).success(function (response) {
        var iter, filter;
        var processed = Server.processResponse(response);
        if (!posts[blogId]) {
          posts[blogId] = [];
        }
        for (iter = 0; iter < processed.length; iter++) {
          filter = posts[blogId].some(function (el) {
            return JSON.stringify(el) === JSON.stringify(processed[iter]);
          });
          if (!filter) {
            posts[blogId].push(processed[iter]);
          }
        }
        processed = processed.length > 1 ? processed : processed[0];
        callback(processed);
      }).error(Server.errorHandler);
    };
    return {
      delete: function (callback, postId, blogId) {
        var deleteUrl = postsUrl + 'delete/?id=' + blogId;
        $http.get(deleteUrl).success(function (response) {
          var iter;
          if (parseInt(response) === 0) {
            return alert('Suppression a \xe9chou\xe9.');
          }
          for (iter = 0; iter < posts[blogId].length; iter++) {
            if (posts[blogId][iter].id === blogId) {
              posts[blogId].splice(iter, 1);
              break;
            }
          }
          callback(posts[blogId]);
        }).error(Server.errorHandler);
      },
      save: function (callback, post) {
        debugger;
        var iter, saveUrl = postsUrl + 'save/', save = this.save, id = post.id || 0, data;
        post.id = id;
        data = jQuery.param(post);
        $http({
          method: 'POST',
          url: saveUrl,
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        }).success(function (response) {
          if (parseInt(response) === 0) {
            return alert('Vous \xeates d\xe9connecter. Veuillez vous reconnecter pour sauver la News.');
          }
          var saved = Server.processResponse(response)[0];
          if (id && angular.isNumber(id)) {
            for (iter = 0; iter < posts[post.blogId].length; iter++) {
              if (posts[post.blogId][iter].id === id) {
                posts[post.blogId][iter] = saved;
                break;
              }
            }
          } else {
            posts[post.blogId].push(saved);
          }
          callback(saved);
        }).error(Server.errorHandler);
      },
      getPosts: function (callback, blogId, id) {
        var getPosts;
        if (!posts[blogId] || posts[blogId].length < 1) {
          getPosts = this.getPosts;
          loadBlogPosts(function () {
            getPosts(callback, blogId, id);
          }, blogId, id);
        } else {
          if (id && angular.isNumber(id)) {
            var post = posts[blogId].filter(function (el) {
                return el.id === parseInt(id);
              });
            post = post[0] ? post[0] : {};
            callback(post);
          } else {
            callback(posts[blogId]);
          }
        }
      }
    };
  }
]);
'use strict';
angular.module('adminApp').directive('tsImageUpload', [
  'Pictures',
  function (Pictures) {
    return {
      template: '<input style="display:inline;" type="file" multiple class="btn btn-warning" ng-model="upload" ng-change="uploadImage()" />',
      restrict: 'EACM',
      replace: true,
      scope: { callback: '=callback' },
      link: function postLink(scope, element, attrs) {
        element.onchange = function () {
          console.log('don\'t erase this line.');
        };
        var t = element;
        scope.uploadImage = function () {
          var i = 0, input = element[0], images = input.files;
          for (i = 0; i < images.length; i++) {
            Pictures.upload(images[i], scope.callback);
          }
        };
      }
    };
  }
]);
'use strict';
angular.module('adminApp').controller('PubCtrl', [
  '$scope',
  'Pub',
  function ($scope, Pub) {
    var refresh = function () {
      Pub.getCat('vertical', function (data) {
        $scope.verticals = data;
      });
      Pub.getCat('horizontal', function (data) {
        $scope.horizontals = data;
      });
      Pub.getCat('square', function (data) {
        $scope.squares = data;
      });
    };
    $scope.removeImage = function (image) {
      if (confirm('Effacer la publicit\xe9 ?')) {
        Pub.remove(image, function () {
          refresh();
        });
      }
    };
    $scope.save = function () {
      var ver = $scope.vertical || 0, hor = $scope.horizontal || 0, sq = $scope.square || 0;
      Pub.save(angular.element('#newAd')[0].files[0], ver, hor, sq, function (data) {
        console.log(data);
        refresh();
      });
    };
    refresh();
  }
]);
'use strict';
angular.module('adminApp').factory('Pub', [
  '$http',
  'Server',
  function ($http, Server) {
    var pubUrl = Server.Url + 'ads/', pubApi = Server.Url + 'apiv1/ads/';
    return {
      remove: function (img, callback) {
        $http.delete(pubApi + img.id + '/').then(callback, Server.errorHandler);
      },
      getPub: function (id) {
        if (!id && !angular.isNumber(id)) {
          return pubs;
        } else {
          return pubs.filter(function (el) {
            return el.id === id;
          });
        }
      },
      getCat: function (cat, callback) {
        $http.get(pubApi + '?category=' + cat).then(function (res) {
          callback(res.data);
        }, Server.errorHandler);
      },
      save: function (image, ver, hor, sq, callback) {
        var formData = new FormData();
        formData.append('file', image);
        formData.append('vertical', ver);
        formData.append('horizontal', hor);
        formData.append('square', sq);
        $http({
          url: pubUrl + 'save/',
          method: 'POST',
          data: formData,
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined }
        }).then(function (res) {
          callback(res.data);
        }, Server.errorHandler);
      }
    };
  }
]);
'use strict';
angular.module('adminApp').service('Server', function Server() {
  // AngularJS will instantiate a singleton by calling "new" on this function
  this.Url = 'http://tooski.webfactional.com/api/';
  // this.Url = 'http://127.0.0.1:8000/';
  this.processResponse = function (response) {
    return response.map(function (el) {
      var result = el.fields;
      result.id = el.pk;
      result.date = new Date(result.date).getTime();
      return result;
    });
  };
  this.errorHandler = function (response, status) {
    alert('There was a connection problem with the server. (' + status + ')');
  };
});
'use strict';
angular.module('adminApp').factory('Pictures', [
  '$http',
  'Server',
  function ($http, Server) {
    var picUrl = Server.Url + 'pictures/';
    return {
      upload: function (image, callback) {
        var formData = new FormData();
        formData.append('file', image);
        $http({
          url: picUrl,
          method: 'POST',
          data: formData,
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined }
        }).then(function (res) {
          callback(res.data);
        }, Server.errorHandler);
      }
    };
  }
]);