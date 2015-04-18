var app=function(){function n(n,e){var o=e();return t[n]=function(){return o},o}var t={};return function(e,o){if(!o){var a=t[e];return a?t[e]():console.log("Module "+e+" does not exist")}t[e]=function(){return n(e,o)}}}();app("clock",function(){function n(){return 60*(f||10)}function t(n){return("00"+n.toString()).slice(-2)}function e(){var n=Math.floor(s/60),e=s%60;l.text(t(n)+":"+t(e))}function o(){setTimeout(function n(){--s?(e(),i=setTimeout(n,1e3)):(done(),r())},0)}function a(){clearTimeout(i)}function r(){s=n(),e()}var i,u=app("dom"),c=app("events"),p=app("settings"),f=p.read().minutes,s=n(),l=u(".zen-clock");c.on("paused",a),c.on("playing",o),c.on("reset",r),c.on("settings-updated",function(n){f=n.minutes,r()})}),app("dom",function(){return function(n){function t(n,t){return void 0===t?i[0]?i[0][n]:void 0:u.forEach(function(e){e[n]=t})}function e(n){return(n.getAttribute("class")||"").split(/[^\w\-]+/g)}function o(n,t){return e(n).indexOf(t)>=0}function a(n,t){t.setAttribute("class",e(t).filter(function(t){return t!==n}).join(" "))}function r(n,t){o(t,n)||t.setAttribute("class",t.getAttribute("class")+" "+n)}var i=Array.prototype.slice.call(document.querySelectorAll(n),0),u={length:i.length,forEach:function(){return i.forEach.apply(i,arguments),u},get:function(n){return i[n]},hasClass:function(n){return i.some(function(t){return o(t,n)})},removeClass:function(n){return u.forEach(a.bind(null,n))},addClass:function(n){return u.forEach(r.bind(null,n))},css:function(n){return u.forEach(function(t){for(var e in n)t.style[e]=n[e]})},text:function(n){return t("textContent",n)},val:function(n){return t("value",n)},on:function(n,t){return u.forEach(function(e){e.addEventListener(n,t)})},off:function(n,t){return u.forEach(function(e){e.removeEventListener(n,t)})},append:function(n){var t=i[0];return t&&t.insertAdjacentHTML("afterend",n),u},select:function(){var n=i[0];return n&&"function"==typeof n.select&&n.select(),u}};return u}}),app("editing-page",function(){var n=app("dom"),t=app("settings"),e=t.read(),o=n("input[name=time]");return o.val(e.minutes),n(".settings-form").on("submit",function(n){n.preventDefault(),e.minutes=parseInt(o.val())||10,t.update(e)}),{load:function(){n(".editing-page input").select()}}}),app("elite",function(){return function(){function n(n){u(n)}function t(n,t){return function(e){n(e),t(e)}}function e(n){u=t(u,n)}function o(n){r.push(n),e(n)}function a(n){r=r.filter(function(t){return t!==n}),u=i,r.forEach(e)}var r=[],i=function(){},u=i;return{on:o,off:a,trigger:n}}}),app("events",function(){function n(n){return e[n]||(e[n]=t())}var t=app("elite"),e={};return{on:function(t,e){n(t).on(e)},off:function(t,e){n(t).off(e)},trigger:function(t,e){setTimeout(function(){n(t).trigger(e)},0)}}}),app("load-audio",function(){return function(n){function t(t){return t.readyState<=3||o>=a.length?!1:(++o,i.css({width:o/a.length*100+"%"}),o>=a.length&&n&&n(),!0)}var e=app("dom"),o=0,a=["c1","c2","c3","c4","c5","c6"],r=a.map(function(n){return'<audio><source src="./audio/'+n+'.mp3" /><source src="./audio/'+n+'.wav" /></audio>'}).join(""),i=e(".loading-bar");e(".zen-page").append(r),e("audio").forEach(function(n){t(n)||n.addEventListener("canplay",function(){t(n)})})}}),app("page",function(){return{show:function(n){var t=app("dom");t(".active-page").removeClass("active-page").addClass("inactive-page"),t("."+n).removeClass("inactive-page").addClass("active-page");var e=app(n);e&&e.load&&e.load()}}}),app("paused-page",function(){var n=app("dom"),t=app("events"),e=app("page");n(".btn-play").on("click",function(){t.trigger("playing"),e.show("playing-page")})}),app("playing-page",function(){var n=app("dom"),t=app("page"),e=app("events");app("clock"),app("random-player"),n(".btn-reset").on("click",function(){e.trigger("reset")}),n(".btn-pause").on("click",function(){e.trigger("paused"),t.show("paused-page")}),n(".btn-edit").on("click",function(){t.show("editing-page")})}),app("random-player",function(){function n(){var o=Math.random()>.7,r=Math.floor(5e3*Math.random())+250;e(),o&&setTimeout(e,50),t(),a=setTimeout(n,r)}function t(){clearTimeout(a)}function e(){var n=r("audio"),t=Math.floor(1e3*Math.random())%n.length;u==t&&(t=++t%n.length),u=t,o(n.get(t))}function o(n){n.pause(),n.currentTime=0,n.play()}var a,r=app("dom"),i=app("events"),u=0;return i.on("paused",t),i.on("playing",n),{play:n,pause:t}}),app("settings",function(){var n="settings",t=app("events");return{read:function(){return JSON.parse(localStorage.getItem(n)||'{ "minutes": 10 }')},update:function(e){localStorage.setItem(n,JSON.stringify(e)),t.trigger("settings-updated",e)}}}),function(){var n=app("load-audio"),t=app("page"),e=app("events");n(function(){t.show("paused-page")}),e.on("settings-updated",function(){t.show("playing-page")})}();
//# sourceMappingURL=app.js.map