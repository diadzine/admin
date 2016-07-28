"use strict";angular.module("adminApp",["ngCookies","ngResource","ngSanitize","ngRoute","ui.tinymce","ui.bootstrap"]).config(function(e,t){e.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/News",{templateUrl:"views/news.html",controller:"NewsCtrl"}).when("/Pages",{templateUrl:"views/pages.html",controller:"PagesCtrl"}).when("/Blog",{templateUrl:"views/blog.html",controller:"BlogCtrl"}).when("/Pub",{templateUrl:"views/pub.html",controller:"PubCtrl"}).when("/Skiclubs",{templateUrl:"views/skiclubs.html",controller:"SkiclubsCtrl"}).when("/Widgets",{templateUrl:"views/widgets.html",controller:"WidgetsCtrl"}).when("/Angulation",{templateUrl:"views/angulation.html",controller:"AngulationCtrl"}).when("/Classements",{templateUrl:"views/classements.html",controller:"ClassementsCtrl"}).otherwise({redirectTo:"/"}),t.html5Mode(!1).hashPrefix("!")}),angular.module("adminApp").controller("MainCtrl",["$scope","$location","User",function(e,t,n){var r=function(){return n.isLoggedIn};r()&&t.path("/News"),e.login=function(){var e=document.getElementById("login-email").value,r=document.getElementById("login-password").value;n.login(e,r,function(e){e.success===!0?t.path("/News"):document.getElementById("login-errors").innerHTML=e.error})},e.signup=function(){var e=document.getElementById("signup-email").value,t=document.getElementById("signup-password").value,r=document.getElementById("signup-confirm").value,o=document.getElementById("signup-name").value,a=document.getElementById("signup-signature").value,i=n.signup(e,t,r,o,a);i.success===!0?alert("Merci de votre enregistrement. Vous recevrez un email lorsque votre candidature sera validée."):document.getElementById("signup-errors").innerHTML=i.error}}]),angular.module("adminApp").factory("User",function(e,t,n,r){var o=r.Url+"apiv1/",a=!1;return e.tooskiLogin?(r.setHeaders("Authorization",e.tooskiLogin),a=!0):t.path("#!/"),{isLoggedIn:a,login:function(t,i,l){var s="",c=!0;return t.indexOf("@")===-1&&(c=!1,s="Il ne s'agit pas d'un email valide."),""===i&&(c=!1,s="Le champ mot de passe est vide."),""===t&&(c=!1,s="Le champ email est vide."),c&&n.post(o+"auth-token/",{username:t,password:i}).then(function(t){var n=t.data;n.success=!!n.token,n.error=s,n.token&&(r.setHeaders("Authorization","Token "+n.token),e.tooskiLogin="Token "+n.token,a=!0),l(n)},r.errorHandler),{success:c,error:s}},signup:function(e,t,n,r,o){var a="",i=!0;return t!==n&&(i=!1,a="Le mot de passe ne correspond pas à la confirmation."),e.indexOf("@")===-1&&(i=!1,a="L'email n'est pas valide."),""!==e&&""!==t&&""!==n&&""!==r&&""!==o||(i=!1,a="Certains champs n'ont pas été remplis."),{success:i,error:a}}}}),angular.module("adminApp").controller("NewsCtrl",["$scope","News",function(e,t){var n=new Date;e.current={date:n,content:""},t.get(function(t){e.news=t}),e.uploadedImage=function(t){console.log(t),e.current.content+='<img src="'+t+'" alt="'+e.current.title+'" />'},e.modify=function(t){e.current=e.news[t]},e["delete"]=function(n){var r=e.news[n],o=confirm("Voulez vous vraiment supprimer la News:\n"+r.title+" ?");o&&t["delete"](r.id,function(t){e.news.splice(n,1)})},e.addNews=function(){e.current={date:n,content:"",mag:0,id:0},document.getElementById("newsMag").checked=!1},e.sendNews=function(){var r,o=e.current,a=document.getElementById("newsDate").value.split("/");o.mag=document.getElementById("newsMag").checked?1:0,o.date=new Date(a[2],a[1]-1,a[0]).toISOString(),o.date===new Date(n.getFullYear(),n.getMonth(),n.getDate()).toISOString()&&(o.date=n.toISOString()),o.author="CB Service",o.id?t.save(o,function(){for(r=0;r<e.news.length;r++)if(e.news[r].id===o.id)return e.news[r]=o;e.addNews()}):t.add(o,function(t){e.news.unshift(t),e.addNews()})},e.loadPage=function(n){t.get(function(t){e.news=t,e.addNews()},n)},e.tinymceOptions={selector:"#newsContent",theme:"modern",fontsize_formats:"8pt 9pt 10pt 11pt 12pt 26pt 36pt",plugins:["advlist autolink lists link image charmap print preview hr anchor pagebreak","searchreplace wordcount visualblocks visualchars code fullscreen","insertdatetime media nonbreaking table contextmenu directionality","emoticons template paste textcolor"],toolbar1:"undo redo | styleselect | fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",image_advtab:!0}}]),angular.module("adminApp").factory("News",function(e,t){var n=(t.Url+"news/",t.Url+"apiv1/news_admin/");return{get:function(r,o){var a=o?n+"?page="+o:n;e.get(a).then(function(e){r(e.data.results)},t.errorHandler)},"delete":function(r,o){var a=n+r+"/";e["delete"](a).then(o,t.errorHandler)},save:function(r,o){var a=n+r.id+"/";e.put(a,r).then(function(e){o(e.data)},t.errorHandler)},add:function(r,o){var a=n;e.post(a,r).then(function(e){o(e.data)},t.errorHandler)}}}),angular.module("adminApp").controller("PagesCtrl",["$scope","Pages",function(e,t){e.current={id:0,name:"",content:""},t.getPage(function(t){e.pages=t}),e.modify=function(t){e.current=e.pages[t]},e["delete"]=function(){var n,r=e.current,o=confirm("Voulez-vous vraiment supprimer la page: \n"+r.name+" ?");o&&t["delete"](r.id,function(t){for(n=0;n<e.pages.length;n++)if(e.pages[n].id===r.id)return e.modify(0),e.pages.splice(n,1);e.modify(pages[0].id)})},e.save=function(){var n=e.current;n.id?t.save(n,function(e){}):t.add(n,function(t){e.pages.push(t)})},e.addPage=function(){e.current={id:0,title:"",content:""}},e.uploadedImage=function(t){e.current.content+='<img src="'+t+'" alt="'+e.current.title+'" />'},e.uploadedFile=function(t){e.current.content+='<a href="'+t+'" >'+t+"</a>"},e.tinymceOptions={selector:"textarea",theme:"modern",plugins:["advlist autolink lists link image charmap print preview hr anchor pagebreak","searchreplace wordcount visualblocks visualchars code fullscreen","insertdatetime media nonbreaking table contextmenu directionality","emoticons template paste textcolor"],toolbar1:"undo redo | styleselect | fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",image_advtab:!0}}]),angular.module("adminApp").factory("Pages",function(e,t){var n=(t.Url+"pages/",t.Url+"apiv1/pages/");return{getPage:function(r,o){var a=o?n+o+"/":n;e.get(a).then(function(e){r(e.data)},t.errorHandler)},"delete":function(r,o){var a=n+r+"/";e["delete"](a).then(o,t.errorHandler)},add:function(r,o){var a=n;e.post(a,r).then(function(e){o(e.data)},t.errorHandler)},save:function(r,o){var a=n+r.id+"/";e.put(a,r).then(function(e){o(e.data)},t.errorHandler)}}}),angular.module("adminApp").controller("BlogCtrl",["$scope","Bloggers","BlogPosts",function(e,t,n){var r=new Date;t.getBlogger(function(t){e.bloggers=t,e.current=e.bloggers[0]||{}}),e.selectBlogger=function(t){e.current=e.bloggers[t]},e.saveBlogger=function(n){var r=e.current;r.id?t.save(r,function(t){var n;for(n=0;n<e.bloggers.length;n++)if(t.id===e.bloggers[n].id)return e.bloggers[n]=t}):t.add(r,function(t){e.bloggers.push(t),e.current=t})},e.addBlogger=function(){return e.current={name:"Nom",header:"images/site/tooski.png",ad:["images/site/tooski.png"],sponsors:["images/site/tooski.png"],profilePic:"images/site/profile.png",biography:"Biographie",linkResults:"http://"},e.current},e.deleteBlogger=function(){confirm("Voulez-vous vraiment supprimer le blogger: "+e.current.name+" ?")&&t["delete"](e.current,function(){var t;for(t=0;t<e.bloggers.length;t++)if(e.bloggers[t].id===e.current.id)return e.current=e.bloggers[0]||e.addBlogger(),e.bloggers.splice(t,1)})},e.changePortrait=function(t){e.current.profilePic=t},e.changeHeader=function(t){e.current.header=t},e.addSponsors=function(t){e.current.sponsors.push(t)},e.addAd=function(t){e.current.ad.push(t)},e.removeSponsor=function(t){var n=e.current.sponsors.indexOf(t);e.current.sponsors.splice(n,1)},e.removeAd=function(t){var n=e.current.ad.indexOf(t);e.current.ad.splice(n,1)},e.$watch("current",function(t){t&&t.id||(t={id:0,date:r}),n.get(t.id,function(t){e.blogPosts=t,e.newPost()})}),e.newPost=function(){return e.currentPost={title:"",date:r,content:"",blogId:e.current.id}},e.insertBlogImage=function(t){e.currentPost.content+='<img src="'+t+'" alt="'+e.currentPost.title+'" />'},e.savePost=function(){var t=e.currentPost,o=e.current,a=document.getElementById("newsDate").value.split("/");return t.date=new Date(a[2],a[1]-1,a[0]).toISOString(),t.date===new Date(r.getFullYear(),r.getMonth(),r.getDate()).toISOString()&&(t.date=r.toISOString()),o.id?void(t.id?n.save(o.id,t,function(t){var n;for(e.currentPost=t,n=0;n<e.blogPosts.length;n++)e.blogPosts[n].id===t.id&&(e.blogPosts[n]=t)}):n.add(o.id,t,function(t){e.blogPosts.push(t),e.currentPost=t})):alert("Il faut d'abord créer le blogger et après écrire un post.")},e.deletePost=function(t){var r=e.blogPosts[t],o=e.current;confirm("Voulez-vous supprimer le post: "+r.title+" ?")&&n.del(o.id,r.id,function(){e.blogPosts.splice(t,1)})},e.selectPost=function(t){e.currentPost=e.blogPosts[t]},e.tinymceOptionsBio={selector:"#bioContent",theme:"modern",fontsize_formats:"8pt 9pt 10pt 11pt 12pt 26pt 36pt",toolbar1:"bold italic | alignleft aligncenter alignright alignjustify | bullist | styleselect | fontselect | fontsizeselect",image_advtab:!0},e.tinymceOptionsNews={selector:"#newsContent",theme:"modern",fontsize_formats:"8pt 9pt 10pt 11pt 12pt 26pt 36pt",plugins:["advlist autolink lists link image charmap print preview hr anchor pagebreak","searchreplace wordcount visualblocks visualchars code fullscreen","insertdatetime media nonbreaking table contextmenu directionality","emoticons template paste textcolor"],toolbar1:"undo redo | styleselect | fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",image_advtab:!0}}]),angular.module("adminApp").factory("Bloggers",function(e,t){var n,r,o=(t.Url+"blogs/bloggers/",t.Url+"apiv1/bloggers/");return n=function(e){return e.ad=e.ad?e.ad.join("|"):"",e.sponsors=e.sponsors?e.sponsors.join("|"):"",e},r=function(e){return e.ad=e.ad.split("|"),e.sponsors=e.sponsors.split("|"),e},{getBlogger:function(n,a){var i=a?o+a+"/":o;e.get(i).then(function(e){var t=e.data;t=t.map(r),n(t)},t.errorHandler)},"delete":function(n,r){var a=o+n.id+"/";e["delete"](a).then(r,t.errorHandler)},save:function(r,a){var i=o+r.id+"/";r=n(r),e.put(i,r).then(function(e){a(e.data)},t.errorHandler)},add:function(r,a){r=n(r),e.post(o,r).then(function(e){a(e.data)},t.errorHandler)}}}),angular.module("adminApp").factory("BlogPosts",function(e,t){var n=t.Url+"apiv1/bloggers/";return{get:function(r,o){var a=n+r+"/posts/";e.get(a).then(function(e){o(e.data)},t.errorHandler)},del:function(r,o,a){var i=n+r+"/posts/"+o+"/";e["delete"](i).then(a,t.errorHandler)},add:function(r,o,a){var i=n+r+"/posts/";e.post(i,o).then(function(e){a(e.data)},t.errorHandler)},save:function(r,o,a){var i=n+r+"/posts/"+o.id+"/";e.put(i,o).then(function(e){a(e.data)},t.errorHandler)}}}),angular.module("adminApp").directive("tsImageUpload",function(e){return{template:'<input style="display:inline;" type="file" multiple class="btn btn-warning" ng-model="upload" callback="uploadImage()" id="new-ad-upload-image" />',restrict:"EACM",replace:!0,scope:{callback:"=callback"},link:function(t,n,r){n.onchange=function(){console.log("don't erase this line.")};t.uploadImage=function(){var r=0,o=n[0],a=o.files;for(r=0;r<a.length;r++)e.upload(a[r],t.callback)}}}}),angular.module("adminApp").controller("PubCtrl",function(e,t,n){var r=function(){n.getCat("vertical",function(t){e.verticals=t}),n.getCat("horizontal",function(t){e.horizontals=t}),n.getCat("square",function(t){e.squares=t})};e.openEdit=function(n){var r="lg",o=t.open({templateUrl:"myModalContent.html",controller:"ModalInstanceCtrl",size:r,resolve:{items:function(){return null!=n.placeholders&&(n.placeholders=n.placeholders.split(",")),n}}});o.result.then(e.modifyImage,e.removeImage)},e.modifyImage=function(e){n.modify(e,function(e){r()})},e.removeImage=function(e){confirm("Effacer la publicité ?")&&n.remove(e,function(){r()})},e.save=function(){for(var t=e.vertical||0,o=e.horizontal||0,a=e.square||0,i=angular.element("#new-ad-upload-image")[0].files,l=0;l<i.length;l++)n.save(i[l],t,o,a,function(e){console.log(e),r()})},r()}),angular.module("adminApp").controller("ModalInstanceCtrl",function(e,t,n,r){n.getAdsPlaceholders(function(t){e.placeholders=t}),e.image=r,e.save=function(){t.close(e.image)},e["delete"]=function(){t.close(e.image)}}),angular.module("adminApp").factory("Pub",function(e,t){var n=t.Url+"ads/",r=t.Url+"apiv1/ads/";return{remove:function(n,o){e["delete"](r+n.id+"/").then(o,t.errorHandler)},getPub:function(e){return e||angular.isNumber(e)?pubs.filter(function(t){return t.id===e}):pubs},getCat:function(n,o){e.get(r+"?category="+n).then(function(e){o(e.data)},t.errorHandler)},save:function(r,o,a,i,l){var s=new FormData;s.append("file",r),s.append("vertical",o),s.append("horizontal",a),s.append("square",i),e({url:n+"save/",method:"POST",data:s,transformRequest:angular.identity,headers:{"Content-Type":void 0}}).then(function(e){l(e.data)},t.errorHandler)},modify:function(t,n){var o=r+t.id+"/";e.put(o,t).then(function(e){n(e.data)})}}}).factory("AdPlaceholder",function(e,t){var n=t.Url+"apiv1/ads/placeholders/";return{getAdsPlaceholders:function(r){e.get(n).then(function(e){r(e.data)},t.errorHandler)}}}),angular.module("adminApp").service("Server",function(e,t,n){this.Url="http://tooski.webfactional.com/api/",this.processResponse=function(e){return e.map(function(e){var t=e.fields;return t.id=e.pk,t.date=new Date(t.date).getTime(),t})},this.errorHandler=function(e,t){alert("Problème de connection avec le serveur. ("+t+")"),console.log(e,t)},this.setHeaders=function(t,n){e.defaults.headers.common[t]=n},t.tooskiLogin?this.setHeaders("Authorization",t.tooskiLogin):n.path("#!/")}),angular.module("adminApp").factory("Pictures",function(e,t){var n=t.Url+"pictures/";return{upload:function(r,o){var a=new FormData;a.append("file",r),e({url:n,method:"POST",data:a,transformRequest:angular.identity,headers:{"Content-Type":void 0}}).then(function(e){o(e.data)},t.errorHandler)}}}),angular.module("adminApp").controller("SkiclubsCtrl",function(e,t){e.current={},t.get(function(t){e.skiclubs=t}),e["delete"]=function(n){var r=e.skiclubs[n];confirm("Voulez-vous vraiment supprimer le club: "+r.title+" ?")&&t.del(r.id,function(){e.skiclubs.splice(n,1)})},e.modify=function(t){e.current=e.skiclubs[t]},e.save=function(){var n=e.current;n.id?t.save(n.id,n.title,n.latitude,n.longitude,n.contact,n.description,function(t){var n;for(n=0;n<e.skiclubs.length;n++)if(e.skiclubs[n].id==t.id)return e.skiclubs[n]=t}):t.add(n.title,n.latitude,n.longitude,n.contact,n.description,function(t){e.skiclubs.push(t)})},e.tinymceOptions={selector:"#description",theme:"modern",plugins:["advlist autolink lists link image charmap print preview hr anchor pagebreak","searchreplace wordcount visualblocks visualchars code fullscreen","insertdatetime media nonbreaking table contextmenu directionality","emoticons template paste textcolor"],toolbar1:"undo redo | styleselect | fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",image_advtab:!0}}),angular.module("adminApp").controller("WidgetsCtrl",function(e,t){t.get(function(t){e.widgets=t,e.current=t[0]}),e.uploadedImage=function(t){console.log(t),e.current.content+='<img src="'+t+'" alt="'+e.current.name+'" />'},e.modify=function(t){e.current=e.widgets[t]},e.save=function(){var n=e.current;t.save(n.id,n.content,n.name,function(){})},e.tinymceOptions={selector:"#widgetContent",theme:"modern",plugins:["advlist autolink lists link image charmap print preview hr anchor pagebreak","searchreplace wordcount visualblocks visualchars code fullscreen","insertdatetime media nonbreaking table contextmenu directionality","emoticons template paste textcolor"],toolbar1:"undo redo | styleselect | fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",image_advtab:!0}}),angular.module("adminApp").factory("Skiclubs",function(e,t){var n=e.Url+"apiv1/skiclubs/";return{get:function(r){t.get(n).then(function(e){r(e.data)},e.errorHandler)},add:function(r,o,a,i,l,s){var c={title:r,latitude:o,longitude:a,contact:i,description:l};t.post(n,c).then(function(e){s(e.data)},e.errorHandler)},save:function(r,o,a,i,l,s,c){var u=n+r+"/",d={title:o,latitude:a,longitude:i,contact:l,description:s};t.put(u,d).then(function(e){c(e.data)},e.errorHandler)},del:function(r,o){var a=n+r+"/";t["delete"](a).then(o,e.errorHandler)}}}),angular.module("adminApp").factory("Widgets",function(e,t){var n=t.Url+"apiv1/widgets/";return{get:function(r){e.get(n).then(function(e){r(e.data)},t.errorHandler)},save:function(r,o,a,i){var l=n+r+"/",s={content:o,name:a};e.put(l,s).then(function(e){i(e.data)},t.errorHandler)}}}),angular.module("adminApp").controller("AngulationCtrl",function(e,t){t.getCovers(function(t){e.covers=t}),e["delete"]=function(n){var r=e.covers[n];confirm("Confirmez-vous la suppression de la couverture ?")&&t.delCover(r.id,function(){e.covers.splice(n,1)})},e.uploadedImage=function(n){console.log(n),t.addCover(n,function(t){e.covers.push(t)})}}),angular.module("adminApp").factory("Angulation",function(e,t){var n=t.Url+"apiv1/angulation/";return{getCovers:function(r){var o=n+"covers/";e.get(o).then(function(e){r(e.data)},t.errorHandler)},delCover:function(r,o){var a=n+"covers/"+r+"/";e["delete"](a).then(function(e){o()},t.errorHandler)},addCover:function(r,o){var a=n+"covers/",i={url:r};e.post(a,i).then(function(e){o(e.data)},t.errorHandler)}}}),angular.module("adminApp").controller("ClassementsCtrl",function(e,t,n){var r=n.Url+"apiv1/races/update/";e.updateRaces=function(){alert("Mise à jour lancée..."),t.get(r).then(function(){alert("Les classements sont à jour.")},n.errorHandler)}});