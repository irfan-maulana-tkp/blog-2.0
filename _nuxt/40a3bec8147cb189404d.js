(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{161:function(t,e,n){"use strict";n.d(e,"c",function(){return o}),n.d(e,"b",function(){return c}),n.d(e,"a",function(){return l});var r=n(163);n(162);function o(t){var e=Math.round(t/10);return"".concat(new Array(e||1).fill("☕️").join("")," ").concat(t," min read")}function c(t){var e;if("function"!=typeof Date.prototype.toLocaleDateString)return t;t=new Date(t);var n=["en-EN",{day:"numeric",month:"long",year:"numeric"}].filter(Boolean);return(e=t).toLocaleDateString.apply(e,Object(r.a)(n))}function l(t,e,n){var r;return function(){var o=this,c=arguments,l=n&&!r;clearTimeout(r),r=setTimeout(function(){r=null,n||t.apply(o,c)},e),l&&t.apply(o,c)}}},166:function(t,e,n){"use strict";n(167);var r=n(161),o={name:"MetaData",props:{metaDate:{type:String,default:""},metaMinuteToRead:{type:Number,default:0},isShowStats:{type:Boolean,default:!1},statsLikes:{type:Number,default:0},statsRead:{type:Number,default:0}},data:function(){return{formatReadingTime:r.c,formatPostDate:r.b}}},c=n(2),component=Object(c.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"meta meta--desktop"},[n("small",{staticClass:"meta__date"},[t._v("\n      📆 "+t._s(t.formatPostDate(t.metaDate))+"\n    ")]),t._v(" "),n("small",{staticClass:"dot"},[t._v(" • ")]),t._v(" "),n("small",{staticClass:"meta__read"},[t._v(t._s(t.formatReadingTime(t.metaMinuteToRead)))]),t._v(" "),t.isShowStats?n("small",{staticClass:"dot"},[t._v(" • ")]):t._e(),t._v(" "),t.isShowStats?n("small",[t._v("\n      ❤️ "+t._s(t.statsLikes)+" likes\n    ")]):t._e(),t._v(" "),t.isShowStats?n("small",{staticClass:"dot"},[t._v(" • ")]):t._e(),t._v(" "),t.isShowStats?n("small",[t._v("\n      📓 "+t._s(t.statsRead)+" read\n    ")]):t._e()]),t._v(" "),n("div",{staticClass:"meta meta--mobile"},[n("div",[n("small",{staticClass:"meta__date"},[t._v("\n        📆 "+t._s(t.formatPostDate(t.metaDate))+"\n      ")]),t._v(" "),n("small",{staticClass:"dot"},[t._v(" • ")]),t._v(" "),n("small",{staticClass:"meta__read"},[t._v(t._s(t.formatReadingTime(t.metaMinuteToRead)))])]),t._v(" "),n("div",{staticStyle:{"margin-top":".5em"}},[t.isShowStats?n("small",[t._v("\n        ❤️ "+t._s(t.statsLikes)+" likes\n      ")]):t._e(),t._v(" "),t.isShowStats?n("small",{staticClass:"dot"},[t._v(" • ")]):t._e(),t._v(" "),t.isShowStats?n("small",[t._v("\n        📓 "+t._s(t.statsRead)+" read\n      ")]):t._e()])])])},[],!1,null,null,null);e.a=component.exports},168:function(t,e,n){"use strict";var r={name:"EditContentNav",props:{slug:{type:String,default:""},isDraft:{type:Boolean,default:!1}},computed:{markdownLocation:function(){return this.isDraft?"https://github.com/mazipan/blog-2.0/edit/master/contents/drafts/".concat(this.slug,"/index.md"):"https://github.com/mazipan/blog-2.0/edit/master/contents/published/".concat(this.slug,"/index.md")}}},o=n(2),component=Object(o.a)(r,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("nuxt-link",{attrs:{to:"/"}},[this._v("\n    🏠 Back to Home\n  ")]),this._v(" "),e("span",{staticClass:"dot"},[this._v(" • ")]),this._v(" "),e("a",{attrs:{target:"_blank",rel:"noopener",title:"Edit in Github",href:this.markdownLocation}},[this._v("\n    📝 Edit in Github\n  ")])],1)},[],!1,null,null,null);e.a=component.exports},169:function(t,e,n){"use strict";var r=n(181),o=n.n(r),c=(n(182),n(183),n(184),n(185),n(186),n(187),n(188),n(189),n(190),n(191),n(192),{name:"ContentParser",props:{renderFn:{type:String,default:""},staticRenderFn:{type:String,default:""}},created:function(){this.templateRender=new Function(this.renderFn)(),this.$options.staticRenderFns=new Function(this.staticRenderFn)()},mounted:function(){o.a.highlightAll()},render:function(t){return this.templateRender?this.templateRender():t("div","Rendering")}}),l=n(2),component=Object(l.a)(c,void 0,void 0,!1,null,null,null);e.a=component.exports},200:function(t,e,n){var map={"./create-awesome-blog-with-gridsome/en.md":[219,33],"./create-simple-like-button-using-firebase-rtdb/en.md":[220,35],"./eslint-formatter-html-extended/en.md":[221,37],"./experience-in-become-fasilitator-gdk-mws-2018/en.md":[222,39],"./generate-amp-pages-in-nuxtjs/en.md":[223,41],"./migrate-nuxt-to-typescript/en.md":[224,43],"./tasting-reasonml-for-react/en.md":[225,45],"./the-art-of-deleting-and-updating-the-code/en.md":[226,47],"./unit-testing-guide-in-vuejs/en.md":[227,49]};function r(t){if(!n.o(map,t))return Promise.resolve().then(function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e});var e=map[t],r=e[0];return n.e(e[1]).then(function(){return n.t(r,7)})}r.keys=function(){return Object.keys(map)},r.id=200,t.exports=r},202:function(t,e,n){"use strict";e.a={head:function(){var title="".concat(this.meta.title),t="".concat(this.meta.description),e="ID"===this.lang?"/":"/en",n="".concat(this.productionUrl,"/").concat(this.meta.slug).concat(e),r="".concat(this.productionUrl,"/amp/").concat(this.meta.slug).concat(e);return{title:title,meta:[{hid:"description",name:"description",content:t},{hid:"apple-mobile-web-app-title",name:"apple-mobile-web-app-title",content:title},{hid:"og:title",property:"og:title",content:title},{hid:"og:description",property:"og:description",content:t},{hid:"og:url",property:"og:url",content:n},{hid:"og:type",property:"og:type",content:"article"},{hid:"article:published_time",property:"article:published_time",content:new Date(this.meta.date).toISOString()},{hid:"article:section",property:"article:section",content:"Technology"},{hid:"twitter:title",name:"twitter:title",content:title},{hid:"twitter:description",name:"twitter:description",content:t},{hid:"twitter:url",name:"twitter:url",content:n}],link:[{hid:"amphtml",rel:"amphtml",href:r}]}}}},203:function(t,e,n){"use strict";n(167);var r=n(74),o=n(205),c=n.n(o),l=n(206),d=n.n(l),m=n(207),h=n.n(m),f=n(208),v=n.n(f),_=n(209),w=n.n(_),k=n(166),S=n(169),C=n(168),y=n(161),x=n(45),D=n(210);function R(t){return"claps/".concat(t)}function O(t){return"pageview/".concat(t)}function I(t,e){var n=R(e);return t.database().ref(n)}function j(t,e){var n=O(e);return t.database().ref(n)}function F(t,e){t.database().ref().update(e)}n(214);var L=null,E={name:"PostDetailPartial",components:{FacebookIcon:c.a,TwitterIcon:d.a,HeartIcon:h.a,ShareIcon:v.a,ChatBoxesIcon:w.a,MetaData:k.a,EditContentNav:C.a,ContentParser:S.a},props:{lang:{type:String,default:"ID"},meta:{type:Object,default:function(){}},renderFn:{type:String,default:""},staticRenderFn:{type:String,default:""}},data:function(){return{productionUrl:"https://www.mazipan.xyz",formatReadingTime:y.c,formatPostDate:y.b,youClapped:0,claps:0,hits:0,isSupportWebshare:!1}},computed:{encodedTitle:function(){return encodeURIComponent("".concat(this.meta.title))},encodedDesc:function(){return encodeURIComponent("".concat(this.meta.description))},encodedUrl:function(){return encodeURIComponent("".concat(this.productionUrl,"/").concat(this.meta.slug,"?utm_source=sosial-share"))},fbLinkShare:function(){return"https://www.facebook.com/sharer/sharer.php?u=".concat(this.encodedUrl,"&title=").concat(this.encodedTitle,"&description=").concat(this.encodedDesc,"&quote=").concat(this.encodedDesc)},twitterLinkShare:function(){return"https://twitter.com/intent/tweet?text=".concat(this.encodedTitle,"-").concat(this.encodedDesc,"&url=").concat(this.encodedUrl,"&via=maz_ipan")},twitterLinkDiscuss:function(){return"https://mobile.twitter.com/search?q=".concat(this.encodedUrl)}},mounted:function(){var t=this;window.navigator.share&&(this.isSupportWebshare=!0),D.apps.length||D.initializeApp({apiKey:"AIzaSyAjEDtmUc9C_mogAdlXPA3gOXwqQnJJP5c",authDomain:"mazipan-blog.firebaseapp.com",databaseURL:"https://mazipan-blog.firebaseio.com",projectId:"mazipan-blog",storageBucket:"",messagingSenderId:"331001770357"}),function(t,e,n){j(t,e).once("value",n)}(L=D,this.meta.slug,function(e){if(e.val())t.hits=Number(e.val()),function(t,e,n){j(t,e).set(n)}(L,t.meta.slug,t.hits+1);else{var n=Object(r.a)({},O(t.meta.slug),1);F(L,n)}}),function(t,e,n){I(t,e).once("value",n)}(L,this.meta.slug,function(e){if(e.val())t.claps=Number(e.val());else{var n=Object(r.a)({},R(t.meta.slug),1);F(L,n)}}),function(t,e,n){I(t,e).on("value",n)}(L,this.meta.slug,function(e){Object(y.a)(function(){t.claps=e.val()},300)()})},methods:{trackSocialShare:function(t){Object(x.c)(this,this.meta.slug,t)},onClickShare:function(){var title="".concat(this.meta.title),t="".concat(this.meta.description),e="/".concat(this.meta.slug);Object(x.d)(this,this.meta.slug);var data={title:title,text:"".concat(t),url:e};window.navigator.share&&window.navigator.share(data)},onClickLike:function(){Object(x.b)(this,this.meta.slug),this.youClapped+=1,function(t,e,n){I(t,e).set(n)}(L,this.meta.slug,this.claps+1)}}},T=n(2),component=Object(T.a)(E,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"pages"},[n("h1",{staticClass:"pages__title pages__title--small text-title"},[t._v("\n    "+t._s(t.meta.title)+"\n  ")]),t._v(" "),"ID"===t.lang?n("div",{staticClass:"pages__lang"},[n("nuxt-link",{attrs:{to:"/"+t.meta.slug+"/en?utm_source=lang"}},[t._v("\n      Switch to  🇬🇧 language\n    ")])],1):t._e(),t._v(" "),"EN"===t.lang?n("div",{staticClass:"pages__lang"},[n("nuxt-link",{attrs:{to:"/"+t.meta.slug+"/?utm_source=lang"}},[t._v("\n      Switch to  🇮🇩 language\n    ")])],1):t._e(),t._v(" "),n("MetaData",{attrs:{"meta-date":t.meta.date,"meta-minute-to-read":t.meta.minute2read,"is-show-stats":!0,"stats-likes":t.claps,"stats-read":t.hits}}),t._v(" "),n("div",{staticClass:"pages__tags pages__tags--spacetop"},t._l(t.meta.categories,function(e){return n("div",{key:e,staticClass:"pages__tag"},[n("nuxt-link",{attrs:{to:"/category/"+e+"?utm_source=home",title:e}},[t._v("\n        #"+t._s(e)+"\n      ")])],1)}),0),t._v(" "),n("div",{staticClass:"pages__content"},[n("ContentParser",{attrs:{"render-fn":t.renderFn,"static-render-fn":t.staticRenderFn}}),t._v(" "),n("EditContentNav",{attrs:{slug:t.meta.slug}})],1),t._v(" "),n("hr"),t._v(" "),n("div",{staticClass:"pages__footer"},[t._v("\n    🚨Do you like this article? help me to click ❤️ button, share to your followers and subscribe the newsletter.\n    "),n("div",{staticClass:"block-wrap"},[t.isSupportWebshare?n("div",{staticClass:"share"},[n("a",{staticClass:"share-btn",attrs:{title:"Share this article"},on:{click:t.onClickShare}},[n("ShareIcon",{attrs:{w:"24px",h:"24px"}})],1),t._v(" "),n("a",{staticClass:"like-btn",attrs:{title:"Like this article"},on:{click:t.onClickLike}},[n("HeartIcon",{attrs:{w:"24px",h:"24px"}}),t._v("\n            "+t._s(t.claps)+"\n        ")],1)]):n("div",{staticClass:"share"},[n("a",{staticClass:"share-btn",attrs:{title:"Share to facebook",href:t.fbLinkShare,target:"_blank",rel:"noopener"},nativeOn:{click:function(e){return t.trackSocialShare("Facebook")}}},[n("FacebookIcon",{attrs:{w:"24px",h:"24px"}})],1),t._v(" "),n("a",{staticClass:"share-btn",attrs:{title:"Share to twitter",href:t.twitterLinkShare,target:"_blank",rel:"noopener"},nativeOn:{click:function(e){return t.trackSocialShare("Twitter")}}},[n("TwitterIcon",{attrs:{w:"24px",h:"24px"}})],1),t._v(" "),n("a",{staticClass:"share-btn",attrs:{title:"Discuss on twitter",href:t.twitterLinkDiscuss,target:"_blank",rel:"noopener"},nativeOn:{click:function(e){return t.trackSocialShare("Twitter Discuss")}}},[n("ChatBoxesIcon",{attrs:{w:"24px",h:"24px"}})],1),t._v(" "),n("a",{staticClass:"like-btn",attrs:{title:"Like this article"},on:{click:t.onClickLike}},[n("HeartIcon",{attrs:{w:"24px",h:"24px"}}),t._v("\n            "+t._s(t.claps)+"\n        ")],1)])])])],1)},[],!1,null,null,null);e.a=component.exports},262:function(t,e,n){"use strict";n.r(e);n(16);var r=n(3),o=n(203),c=n(202),l={name:"SlugPageEn",components:{PostDetail:o.a},mixins:[c.a],data:function(){return{productionUrl:"https://www.mazipan.xyz"}},asyncData:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(e){var r,o,c;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.params,t.next=3,n(200)("./".concat(r.slug,"/en.md"));case 3:return o=t.sent,c=o.attributes,t.abrupt("return",{lang:"EN",meta:c,renderFn:o.vue.render,staticRenderFn:o.vue.staticRenderFns});case 6:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},d=n(2),component=Object(d.a)(l,function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"postdetail-EN"},[e("PostDetail",{attrs:{lang:"EN",meta:this.meta,"render-fn":this.renderFn,"static-render-fn":this.staticRenderFn}})],1)},[],!1,null,null,null);e.default=component.exports}}]);