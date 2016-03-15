"use strict";angular.module("adminApp",["ngCookies","ngResource","ngSanitize","ngRoute","ui.tinymce","ui.bootstrap"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/News",{templateUrl:"views/news.html",controller:"NewsCtrl"}).when("/Pages",{templateUrl:"views/pages.html",controller:"PagesCtrl"}).when("/Blog",{templateUrl:"views/blog.html",controller:"BlogCtrl"}).when("/Pub",{templateUrl:"views/pub.html",controller:"PubCtrl"}).when("/Skiclubs",{templateUrl:"views/skiclubs.html",controller:"SkiclubsCtrl"}).when("/Widgets",{templateUrl:"views/widgets.html",controller:"WidgetsCtrl"}).when("/Angulation",{templateUrl:"views/angulation.html",controller:"AngulationCtrl"}).when("/Classements",{templateUrl:"views/classements.html",controller:"ClassementsCtrl"}).otherwise({redirectTo:"/"}),b.html5Mode(!1).hashPrefix("!")}]),angular.module("adminApp").controller("MainCtrl",["$scope","$location","User",function(a,b,c){var d=function(){return c.isLoggedIn};d()&&b.path("/News"),a.login=function(){var a=document.getElementById("login-email").value,d=document.getElementById("login-password").value;c.login(a,d,function(a){a.success===!0?b.path("/News"):document.getElementById("login-errors").innerHTML=a.error})},a.signup=function(){var a=document.getElementById("signup-email").value,b=document.getElementById("signup-password").value,d=document.getElementById("signup-confirm").value,e=document.getElementById("signup-name").value,f=document.getElementById("signup-signature").value,g=c.signup(a,b,d,e,f);g.success===!0?alert("Merci de votre enregistrement. Vous recevrez un email lorsque votre candidature sera validée."):document.getElementById("signup-errors").innerHTML=g.error}}]),angular.module("adminApp").factory("User",["$cookies","$location","$http","Server",function(a,b,c,d){var e=d.Url+"apiv1/",f=!1;return a.tooskiLogin?(d.setHeaders("Authorization",a.tooskiLogin),f=!0):b.path("#!/"),{isLoggedIn:f,login:function(b,g,h){var i="",j=!0;return-1===b.indexOf("@")&&(j=!1,i="Il ne s'agit pas d'un email valide."),""===g&&(j=!1,i="Le champ mot de passe est vide."),""===b&&(j=!1,i="Le champ email est vide."),j&&c.post(e+"auth-token/",{username:b,password:g}).then(function(b){var c=b.data;c.success=!!c.token,c.error=i,c.token&&(d.setHeaders("Authorization","Token "+c.token),a.tooskiLogin="Token "+c.token,f=!0),h(c)},d.errorHandler),{success:j,error:i}},signup:function(a,b,c,d,e){var f="",g=!0;return b!==c&&(g=!1,f="Le mot de passe ne correspond pas à la confirmation."),-1===a.indexOf("@")&&(g=!1,f="L'email n'est pas valide."),(""===a||""===b||""===c||""===d||""===e)&&(g=!1,f="Certains champs n'ont pas été remplis."),{success:g,error:f}}}}]),angular.module("adminApp").controller("NewsCtrl",["$scope","News",function(a,b){var c=new Date;a.current={date:c,content:""},b.get(function(b){a.news=b}),a.uploadedImage=function(b){console.log(b),a.current.content+='<img src="'+b+'" alt="'+a.current.title+'" />'},a.modify=function(b){a.current=a.news[b]},a["delete"]=function(c){var d=a.news[c],e=confirm("Voulez vous vraiment supprimer la News:\n"+d.title+" ?");e&&b["delete"](d.id,function(b){a.news.splice(c,1)})},a.addNews=function(){a.current={date:c,content:"",mag:0,id:0},document.getElementById("newsMag").checked=!1},a.sendNews=function(){var d,e=a.current,f=document.getElementById("newsDate").value.split("/");e.mag=document.getElementById("newsMag").checked?1:0,e.date=new Date(f[2],f[1]-1,f[0]).toISOString(),e.date===new Date(c.getFullYear(),c.getMonth(),c.getDate()).toISOString()&&(e.date=c.toISOString()),e.author="CB Service",e.id?b.save(e,function(){for(d=0;d<a.news.length;d++)if(a.news[d].id===e.id)return a.news[d]=e;a.addNews()}):b.add(e,function(b){a.news.unshift(b),a.addNews()})},a.loadPage=function(c){b.get(function(b){a.news=b,a.addNews()},c)},a.tinymceOptions={selector:"#newsContent",theme:"modern",fontsize_formats:"8pt 9pt 10pt 11pt 12pt 26pt 36pt",plugins:["advlist autolink lists link image charmap print preview hr anchor pagebreak","searchreplace wordcount visualblocks visualchars code fullscreen","insertdatetime media nonbreaking table contextmenu directionality","emoticons template paste textcolor"],toolbar1:"undo redo | styleselect | fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",image_advtab:!0}}]),angular.module("adminApp").factory("News",["$http","Server",function(a,b){var c=(b.Url+"news/",b.Url+"apiv1/news_admin/");return{get:function(d,e){var f=e?c+"?page="+e:c;a.get(f).then(function(a){d(a.data.results)},b.errorHandler)},"delete":function(d,e){var f=c+d+"/";a["delete"](f).then(e,b.errorHandler)},save:function(d,e){var f=c+d.id+"/";a.put(f,d).then(function(a){e(a.data)},b.errorHandler)},add:function(d,e){var f=c;a.post(f,d).then(function(a){e(a.data)},b.errorHandler)}}}]),angular.module("adminApp").controller("PagesCtrl",["$scope","Pages",function(a,b){a.current={id:0,name:"",content:""},b.getPage(function(b){a.pages=b}),a.modify=function(b){a.current=a.pages[b]},a["delete"]=function(){var c,d=a.current,e=confirm("Voulez-vous vraiment supprimer la page: \n"+d.name+" ?");e&&b["delete"](d.id,function(b){for(c=0;c<a.pages.length;c++)if(a.pages[c].id===d.id)return a.modify(0),a.pages.splice(c,1);a.modify(pages[0].id)})},a.save=function(){var c=a.current;c.id?b.save(c,function(a){}):b.add(c,function(b){a.pages.push(b)})},a.addPage=function(){a.current={id:0,title:"",content:""}},a.uploadedImage=function(b){a.current.content+='<img src="'+b+'" alt="'+a.current.title+'" />'},a.uploadedFile=function(b){a.current.content+='<a href="'+b+'" >'+b+"</a>"},a.tinymceOptions={selector:"textarea",theme:"modern",plugins:["advlist autolink lists link image charmap print preview hr anchor pagebreak","searchreplace wordcount visualblocks visualchars code fullscreen","insertdatetime media nonbreaking table contextmenu directionality","emoticons template paste textcolor"],toolbar1:"undo redo | styleselect | fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",image_advtab:!0}}]),angular.module("adminApp").factory("Pages",["$http","Server",function(a,b){var c=(b.Url+"pages/",b.Url+"apiv1/pages/");return{getPage:function(d,e){var f=e?c+e+"/":c;a.get(f).then(function(a){d(a.data)},b.errorHandler)},"delete":function(d,e){var f=c+d+"/";a["delete"](f).then(e,b.errorHandler)},add:function(d,e){var f=c;a.post(f,d).then(function(a){e(a.data)},b.errorHandler)},save:function(d,e){var f=c+d.id+"/";a.put(f,d).then(function(a){e(a.data)},b.errorHandler)}}}]),angular.module("adminApp").controller("BlogCtrl",["$scope","Bloggers","BlogPosts",function(a,b,c){var d=new Date;b.getBlogger(function(b){a.bloggers=b,a.current=a.bloggers[0]||{}}),a.selectBlogger=function(b){a.current=a.bloggers[b]},a.saveBlogger=function(c){var d=a.current;d.id?b.save(d,function(b){var c;for(c=0;c<a.bloggers.length;c++)if(b.id===a.bloggers[c].id)return a.bloggers[c]=b}):b.add(d,function(b){a.bloggers.push(b),a.current=b})},a.addBlogger=function(){return a.current={name:"Nom",header:"images/site/tooski.png",ad:["images/site/tooski.png"],sponsors:["images/site/tooski.png"],profilePic:"images/site/profile.png",biography:"Biographie",linkResults:"http://"},a.current},a.deleteBlogger=function(){confirm("Voulez-vous vraiment supprimer le blogger: "+a.current.name+" ?")&&b["delete"](a.current,function(){var b;for(b=0;b<a.bloggers.length;b++)if(a.bloggers[b].id===a.current.id)return a.current=a.bloggers[0]||a.addBlogger(),a.bloggers.splice(b,1)})},a.changePortrait=function(b){a.current.profilePic=b},a.changeHeader=function(b){a.current.header=b},a.addSponsors=function(b){a.current.sponsors.push(b)},a.addAd=function(b){a.current.ad.push(b)},a.removeSponsor=function(b){var c=a.current.sponsors.indexOf(b);a.current.sponsors.splice(c,1)},a.removeAd=function(b){var c=a.current.ad.indexOf(b);a.current.ad.splice(c,1)},a.$watch("current",function(b){b&&b.id||(b={id:0,date:d}),c.get(b.id,function(b){a.blogPosts=b,a.newPost()})}),a.newPost=function(){return a.currentPost={title:"",date:d,content:"",blogId:a.current.id}},a.insertBlogImage=function(b){a.currentPost.content+='<img src="'+b+'" alt="'+a.currentPost.title+'" />'},a.savePost=function(){var b=a.currentPost,e=a.current,f=document.getElementById("newsDate").value.split("/");return b.date=new Date(f[2],f[1]-1,f[0]).toISOString(),b.date===new Date(d.getFullYear(),d.getMonth(),d.getDate()).toISOString()&&(b.date=d.toISOString()),e.id?void(b.id?c.save(e.id,b,function(b){var c;for(a.currentPost=b,c=0;c<a.blogPosts.length;c++)a.blogPosts[c].id===b.id&&(a.blogPosts[c]=b)}):c.add(e.id,b,function(b){a.blogPosts.push(b),a.currentPost=b})):alert("Il faut d'abord créer le blogger et après écrire un post.")},a.deletePost=function(b){var d=a.blogPosts[b],e=a.current;confirm("Voulez-vous supprimer le post: "+d.title+" ?")&&c.del(e.id,d.id,function(){a.blogPosts.splice(b,1)})},a.selectPost=function(b){a.currentPost=a.blogPosts[b]},a.tinymceOptionsBio={selector:"#bioContent",theme:"modern",fontsize_formats:"8pt 9pt 10pt 11pt 12pt 26pt 36pt",toolbar1:"bold italic | alignleft aligncenter alignright alignjustify | bullist | styleselect | fontselect | fontsizeselect",image_advtab:!0},a.tinymceOptionsNews={selector:"#newsContent",theme:"modern",fontsize_formats:"8pt 9pt 10pt 11pt 12pt 26pt 36pt",plugins:["advlist autolink lists link image charmap print preview hr anchor pagebreak","searchreplace wordcount visualblocks visualchars code fullscreen","insertdatetime media nonbreaking table contextmenu directionality","emoticons template paste textcolor"],toolbar1:"undo redo | styleselect | fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",image_advtab:!0}}]),angular.module("adminApp").factory("Bloggers",["$http","Server",function(a,b){var c,d,e=(b.Url+"blogs/bloggers/",b.Url+"apiv1/bloggers/");return c=function(a){return a.ad=a.ad?a.ad.join("|"):"",a.sponsors=a.sponsors?a.sponsors.join("|"):"",a},d=function(a){return a.ad=a.ad.split("|"),a.sponsors=a.sponsors.split("|"),a},{getBlogger:function(c,f){var g=f?e+f+"/":e;a.get(g).then(function(a){var b=a.data;b=b.map(d),c(b)},b.errorHandler)},"delete":function(c,d){var f=e+c.id+"/";a["delete"](f).then(d,b.errorHandler)},save:function(d,f){var g=e+d.id+"/";d=c(d),a.put(g,d).then(function(a){f(a.data)},b.errorHandler)},add:function(d,f){d=c(d),a.post(e,d).then(function(a){f(a.data)},b.errorHandler)}}}]),angular.module("adminApp").factory("BlogPosts",["$http","Server",function(a,b){var c=b.Url+"apiv1/bloggers/";return{get:function(d,e){var f=c+d+"/posts/";a.get(f).then(function(a){e(a.data)},b.errorHandler)},del:function(d,e,f){var g=c+d+"/posts/"+e+"/";a["delete"](g).then(f,b.errorHandler)},add:function(d,e,f){var g=c+d+"/posts/";a.post(g,e).then(function(a){f(a.data)},b.errorHandler)},save:function(d,e,f){var g=c+d+"/posts/"+e.id+"/";a.put(g,e).then(function(a){f(a.data)},b.errorHandler)}}}]),angular.module("adminApp").directive("tsImageUpload",["Pictures",function(a){return{template:'<input style="display:inline;" type="file" multiple class="btn btn-warning" ng-model="upload" callback="uploadImage()" id="new-ad-upload-image" />',restrict:"EACM",replace:!0,scope:{callback:"=callback"},link:function(b,c,d){c.onchange=function(){console.log("don't erase this line.")};b.uploadImage=function(){var d=0,e=c[0],f=e.files;for(d=0;d<f.length;d++)a.upload(f[d],b.callback)}}}}]),angular.module("adminApp").controller("PubCtrl",["$scope","$modal","Pub",function(a,b,c){var d=function(){c.getCat("vertical",function(b){a.verticals=b}),c.getCat("horizontal",function(b){a.horizontals=b}),c.getCat("square",function(b){a.squares=b})};a.openEdit=function(c){var d="lg",e=b.open({templateUrl:"myModalContent.html",controller:"ModalInstanceCtrl",size:d,resolve:{items:function(){return null!=c.placeholders&&(c.placeholders=c.placeholders.split(",")),c}}});e.result.then(a.modifyImage,a.removeImage)},a.modifyImage=function(a){c.modify(a,function(a){d()})},a.removeImage=function(a){confirm("Effacer la publicité ?")&&c.remove(a,function(){d()})},a.save=function(){for(var b=a.vertical||0,e=a.horizontal||0,f=a.square||0,g=angular.element("#new-ad-upload-image")[0].files,h=0;h<g.length;h++)c.save(g[h],b,e,f,function(a){console.log(a),d()})},d()}]),angular.module("adminApp").controller("ModalInstanceCtrl",["$scope","$modalInstance","AdPlaceholder","items",function(a,b,c,d){c.getAdsPlaceholders(function(b){a.placeholders=b}),a.image=d,a.save=function(){b.close(a.image)},a["delete"]=function(){b.close(a.image)}}]),angular.module("adminApp").factory("Pub",["$http","Server",function(a,b){var c=b.Url+"ads/",d=b.Url+"apiv1/ads/";return{remove:function(c,e){a["delete"](d+c.id+"/").then(e,b.errorHandler)},getPub:function(a){return a||angular.isNumber(a)?pubs.filter(function(b){return b.id===a}):pubs},getCat:function(c,e){a.get(d+"?category="+c).then(function(a){e(a.data)},b.errorHandler)},save:function(d,e,f,g,h){var i=new FormData;i.append("file",d),i.append("vertical",e),i.append("horizontal",f),i.append("square",g),a({url:c+"save/",method:"POST",data:i,transformRequest:angular.identity,headers:{"Content-Type":void 0}}).then(function(a){h(a.data)},b.errorHandler)},modify:function(b,c){var e=d+b.id+"/";a.put(e,b).then(function(a){c(a.data)})}}}]).factory("AdPlaceholder",["$http","Server",function(a,b){var c=b.Url+"apiv1/ads/placeholders/";return{getAdsPlaceholders:function(d){a.get(c).then(function(a){d(a.data)},b.errorHandler)}}}]),angular.module("adminApp").service("Server",["$http","$cookies","$location",function(a,b,c){this.Url="http://127.0.0.1:8000/",this.processResponse=function(a){return a.map(function(a){var b=a.fields;return b.id=a.pk,b.date=new Date(b.date).getTime(),b})},this.errorHandler=function(a,b){alert("Problème de connection avec le serveur. ("+b+")"),console.log(a,b)},this.setHeaders=function(b,c){a.defaults.headers.common[b]=c},b.tooskiLogin?this.setHeaders("Authorization",b.tooskiLogin):c.path("#!/")}]),angular.module("adminApp").factory("Pictures",["$http","Server",function(a,b){var c=b.Url+"pictures/";return{upload:function(d,e){var f=new FormData;f.append("file",d),a({url:c,method:"POST",data:f,transformRequest:angular.identity,headers:{"Content-Type":void 0}}).then(function(a){e(a.data)},b.errorHandler)}}}]),angular.module("adminApp").controller("SkiclubsCtrl",["$scope","Skiclubs",function(a,b){a.current={},b.get(function(b){a.skiclubs=b}),a["delete"]=function(c){var d=a.skiclubs[c];confirm("Voulez-vous vraiment supprimer le club: "+d.title+" ?")&&b.del(d.id,function(){a.skiclubs.splice(c,1)})},a.modify=function(b){a.current=a.skiclubs[b]},a.save=function(){var c=a.current;c.id?b.save(c.id,c.title,c.latitude,c.longitude,c.contact,c.description,function(b){var c;for(c=0;c<a.skiclubs.length;c++)if(a.skiclubs[c].id==b.id)return a.skiclubs[c]=b}):b.add(c.title,c.latitude,c.longitude,c.contact,c.description,function(b){a.skiclubs.push(b)})},a.tinymceOptions={selector:"#description",theme:"modern",plugins:["advlist autolink lists link image charmap print preview hr anchor pagebreak","searchreplace wordcount visualblocks visualchars code fullscreen","insertdatetime media nonbreaking table contextmenu directionality","emoticons template paste textcolor"],toolbar1:"undo redo | styleselect | fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",image_advtab:!0}}]),angular.module("adminApp").controller("WidgetsCtrl",["$scope","Widgets",function(a,b){b.get(function(b){a.widgets=b,a.current=b[0]}),a.uploadedImage=function(b){console.log(b),a.current.content+='<img src="'+b+'" alt="'+a.current.name+'" />'},a.modify=function(b){a.current=a.widgets[b]},a.save=function(){var c=a.current;b.save(c.id,c.content,c.name,function(){})},a.tinymceOptions={selector:"#widgetContent",theme:"modern",plugins:["advlist autolink lists link image charmap print preview hr anchor pagebreak","searchreplace wordcount visualblocks visualchars code fullscreen","insertdatetime media nonbreaking table contextmenu directionality","emoticons template paste textcolor"],toolbar1:"undo redo | styleselect | fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",image_advtab:!0}}]),angular.module("adminApp").factory("Skiclubs",["Server","$http",function(a,b){var c=a.Url+"apiv1/skiclubs/";return{get:function(d){b.get(c).then(function(a){d(a.data)},a.errorHandler)},add:function(d,e,f,g,h,i){var j={title:d,latitude:e,longitude:f,contact:g,description:h};b.post(c,j).then(function(a){i(a.data)},a.errorHandler)},save:function(d,e,f,g,h,i,j){var k=c+d+"/",l={title:e,latitude:f,longitude:g,contact:h,description:i};b.put(k,l).then(function(a){j(a.data)},a.errorHandler)},del:function(d,e){var f=c+d+"/";b["delete"](f).then(e,a.errorHandler)}}}]),angular.module("adminApp").factory("Widgets",["$http","Server",function(a,b){var c=b.Url+"apiv1/widgets/";return{get:function(d){a.get(c).then(function(a){d(a.data)},b.errorHandler)},save:function(d,e,f,g){var h=c+d+"/",i={content:e,name:f};a.put(h,i).then(function(a){g(a.data)},b.errorHandler)}}}]),angular.module("adminApp").controller("AngulationCtrl",["$scope","Angulation",function(a,b){b.getCovers(function(b){a.covers=b}),a["delete"]=function(c){var d=a.covers[c];confirm("Confirmez-vous la suppression de la couverture ?")&&b.delCover(d.id,function(){a.covers.splice(c,1)})},a.uploadedImage=function(c){console.log(c),b.addCover(c,function(b){a.covers.push(b)})}}]),angular.module("adminApp").factory("Angulation",["$http","Server",function(a,b){var c=b.Url+"apiv1/angulation/";return{getCovers:function(d){var e=c+"covers/";a.get(e).then(function(a){d(a.data)},b.errorHandler)},delCover:function(d,e){var f=c+"covers/"+d+"/";a["delete"](f).then(function(a){e()},b.errorHandler)},addCover:function(d,e){var f=c+"covers/",g={url:d};a.post(f,g).then(function(a){e(a.data)},b.errorHandler)}}}]),angular.module("adminApp").controller("ClassementsCtrl",["$scope","$http","Server",function(a,b,c){var d=c.Url+"apiv1/races/update/";a.updateRaces=function(){alert("Mise à jour lancée..."),b.get(d).then(function(){alert("Les classements sont à jour.")},c.errorHandler)}}]);