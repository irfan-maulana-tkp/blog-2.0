(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{188:function(t,e,n){"use strict";n.d(e,"c",function(){return o}),n.d(e,"b",function(){return c}),n.d(e,"a",function(){return l});var r=n(196);n(192);function o(t){var e=Math.round(t/5);return"".concat(new Array(e||1).fill("☕️").join("")," ").concat(t," min read")}function c(t){var e;if("function"!=typeof Date.prototype.toLocaleDateString)return t;t=new Date(t);var n=["en-EN",{day:"numeric",month:"long",year:"numeric"}].filter(Boolean);return(e=t).toLocaleDateString.apply(e,Object(r.a)(n))}function l(t,e,n){var r;return function(){var o=this,c=arguments,l=n&&!r;clearTimeout(r),r=setTimeout(function(){r=null,n||t.apply(o,c)},e),l&&t.apply(o,c)}}},192:function(t,e,n){var r=n(7);r(r.P,"Array",{fill:n(193)}),n(55)("fill")},193:function(t,e,n){"use strict";var r=n(28),o=n(108),c=n(18);t.exports=function(t){for(var e=r(this),n=c(e.length),l=arguments.length,d=o(l>1?arguments[1]:void 0,n),f=l>2?arguments[2]:void 0,m=void 0===f?n:o(f,n);m>d;)e[d++]=t;return e}},196:function(t,e,n){"use strict";function r(t){return function(t){if(Array.isArray(t)){for(var i=0,e=new Array(t.length);i<t.length;i++)e[i]=t[i];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n.d(e,"a",function(){return r})},206:function(t,e,n){var map={"./blog-2-0-in-nuxtjs/index.md":[179,1],"./create-simple-like-button-using-firebase-rtdb/index.md":[180,2],"./eslint-formatter-html-extended/index.md":[181,3],"./membuat-blog-keren-dengan-gridsome/index.md":[182,4],"./panduan-unit-testing-di-vuejs/index.md":[183,5],"./pengalaman-menjadi-fasilitator-gdk-mws-2018/index.md":[184,6]};function r(t){if(!n.o(map,t))return Promise.resolve().then(function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e});var e=map[t],r=e[0];return n.e(e[1]).then(function(){return n.t(r,7)})}r.keys=function(){return Object.keys(map)},r.id=206,t.exports=r},373:function(t,e,n){"use strict";n.r(e);n(58),n(30),n(73),n(19);var r=n(2),o=n(74),c=n.n(o),l=n(188),d={name:"ArchievesPage",head:function(){var title="Archieves | @mazipan",t="".concat(this.productionUrl,"/archieves/");return{title:title,meta:[{hid:"description",name:"description",content:"Page Archieves"},{hid:"apple-mobile-web-app-title",name:"apple-mobile-web-app-title",content:title},{hid:"og:title",property:"og:title",content:title},{hid:"og:description",property:"og:description",content:"Page Archieves"},{hid:"og:url",property:"og:url",content:t},{hid:"twitter:title",name:"twitter:title",content:title},{hid:"twitter:description",name:"twitter:description",content:"Page Archieves"},{hid:"twitter:url",name:"twitter:url",content:t}]}},data:function(){return{formatReadingTime:l.c,formatPostDate:l.b,productionUrl:"https://www.mazipan.xyz"}},asyncData:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(e){var o,l;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return l=function(){return(l=Object(r.a)(regeneratorRuntime.mark(function t(e){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n(206)("./".concat(e,"/index.md"));case 2:return r=t.sent,t.abrupt("return",r.attributes);case 4:case"end":return t.stop()}},t)}))).apply(this,arguments)},o=function(t){return l.apply(this,arguments)},e.store,t.abrupt("return",Promise.all(c.a.map(function(t){return o(t)})).then(function(t){return{blogs:t}}));case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},f=n(4),component=Object(f.a)(d,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"archieves"},[t._m(0),t._v(" "),n("table",{attrs:{width:"100%"}},t._l(t.blogs,function(e){return n("tr",{key:e.title,staticStyle:{"vertical-align":"top","line-height":"2"}},[n("td",{attrs:{width:"150px"}},[t._v("\n        "+t._s(t.formatPostDate(e.date))+"\n      ")]),t._v(" "),n("td",{attrs:{width:"20px"}},[t._v("\n        •\n      ")]),t._v(" "),n("td",[n("nuxt-link",{attrs:{to:"/"+e.slug+"/",title:e.title}},[t._v("\n          "+t._s(e.title)+"\n        ")])],1)])}),0)])},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"space-bottom text-title"},[e("h1",[this._v("Archieves")])])}],!1,null,"12b4eb6b",null);e.default=component.exports}}]);