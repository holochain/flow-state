(function(e){function t(t){for(var r,a,i=t[0],u=t[1],s=t[2],d=0,l=[];d<i.length;d++)a=i[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);p&&p(t);while(l.length)l.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(c.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},o={app:0},c=[];function i(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-2037c252":"54137132","chunk-25d6b988":"790efe10","chunk-2d228ff4":"b6c2ac12","chunk-70007513":"30713c20","chunk-0a59143b":"33ac12e8","chunk-2d0d9f46":"f0a1dec1","chunk-62f534b6":"069fce11","chunk-199d84fc":"cf66ab50","chunk-68d31029":"fc842e1b","chunk-6ccd6e47":"80fa1e24"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-2037c252":1,"chunk-25d6b988":1,"chunk-0a59143b":1,"chunk-62f534b6":1,"chunk-199d84fc":1,"chunk-68d31029":1,"chunk-6ccd6e47":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2037c252":"5476a791","chunk-25d6b988":"e7b8c5d5","chunk-2d228ff4":"31d6cfe0","chunk-70007513":"31d6cfe0","chunk-0a59143b":"683a83b1","chunk-2d0d9f46":"31d6cfe0","chunk-62f534b6":"9deb4d24","chunk-199d84fc":"81e6f519","chunk-68d31029":"63786a3b","chunk-6ccd6e47":"651ad7a6"}[e]+".css",o=u.p+r,c=document.getElementsByTagName("link"),i=0;i<c.length;i++){var s=c[i],d=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(d===r||d===o))return t()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){s=l[i],d=s.getAttribute("data-href");if(d===r||d===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||o,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete a[e],p.parentNode.removeChild(p),n(c)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=c);var s,d=document.createElement("script");d.charset="utf-8",d.timeout=120,u.nc&&d.setAttribute("nonce",u.nc),d.src=i(e);var l=new Error;s=function(t){d.onerror=d.onload=null,clearTimeout(p);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,n[1](l)}o[e]=void 0}};var p=setTimeout((function(){s({type:"timeout",target:d})}),12e4);d.onerror=d.onload=s,document.head.appendChild(d)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var p=d;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"313e":function(e,t,n){"use strict";var r=n("5304"),a=n.n(r);a.a},5304:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("core-app-bar"),n("core-drawer",{attrs:{navOpen:e.navOpen},on:{"close-nav-bar":function(t){e.navOpen=!1}}}),n("v-main",[n("v-responsive",{attrs:{height:"100%"}},[n("transition",{attrs:{name:"fade"}},[n("router-view",{attrs:{id:"router"},on:{"open-nav-bar":function(t){e.navOpen=!e.navOpen}}})],1)],1)],1)],1)},o=[],c=(n("d3b7"),{name:"App",components:{CoreAppBar:function(){return n.e("chunk-2d228ff4").then(n.bind(null,"dc21"))},CoreDrawer:function(){return n.e("chunk-25d6b988").then(n.bind(null,"41c0"))}},data:function(){return{navOpen:!1}},created:function(){this.$store.dispatch("initialiseDexie").then(this.$store.dispatch("portfolio/fetchProjects")),this.$vuetify.theme.dark=!0}}),i=c,u=(n("313e"),n("2877")),s=n("6544"),d=n.n(s),l=n("7496"),p=n("f6c4"),f=n("6b53"),h=Object(u["a"])(i,a,o,!1,null,"31d536fb",null),v=h.exports;d()(h,{VApp:l["a"],VMain:p["a"],VResponsive:f["a"]});var b=n("9483");Object(b["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var m=n("8c4f"),g=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-card",{staticClass:"pl-1 pt-1 pr-1",attrs:{height:"100%",width:"100%"}},[r("v-app-bar",{attrs:{app:"",dense:"",dark:"","clipped-left":"",tile:"",elevation:"5"}},[r("v-avatar",{attrs:{size:"30"}},[r("img",{attrs:{src:n("ce88")}})]),r("v-toolbar-title",{staticClass:"title ml-2"},[e._v(" Welcome to Flow State")]),r("v-spacer")],1),r("v-row",{attrs:{"no-gutters":this.$vuetify.breakpoint.smAndDown}},[r("v-col",[r("v-card",{staticClass:"mx-auto pa-2",attrs:{"max-width":"380",outlined:this.$vuetify.breakpoint.mdAndUp}},[r("v-list-item",[r("v-list-item-content",[r("v-list-item-title",{staticClass:"title"},[e._v("Get your Agent Key")])],1)],1),r("v-img",{staticClass:"mx-auto",attrs:{src:n("ce88"),width:"150"}}),r("v-card-text",[r("p",[e._v(" To gain access to FlowState you will need to retrieve the Agent Key created for you. Paste the invite key into the box below and press Initialise Me 😎 ")]),r("p",[e._v(" If you don't have an invite press Request Invite ❤️ and we will be in contact with you. ")])]),r("v-textarea",{attrs:{outlined:"",label:"Paste your invite here.",value:e.invite}}),r("v-card-actions",[r("v-spacer"),r("v-btn",{attrs:{text:"",color:"deep-purple accent-4"}},[e._v(" Request Invite ❤️ ")]),r("v-btn",{attrs:{text:"",color:"deep-purple accent-4"},on:{click:e.getAgentKey}},[e._v(" Initialise Me 😎 ")])],1)],1)],1)],1)],1)},k=[],j=n("bc3a"),y=n.n(j),w={name:"Home",data:function(){return{invite:"Hey there"}},methods:{getAgentKey:function(){y.a.post("http://localhost:5401/getAgentky",this.invite).then((function(e){return console.log(e)}))}}},C=w,O=n("40dc"),P=n("8212"),A=n("8336"),S=n("b0af"),x=n("99d9"),_=n("62ad"),V=n("adda"),E=n("da13"),F=n("5d23"),T=n("0fd9"),B=n("2fa4"),I=n("a844"),K=n("2a7f"),D=Object(u["a"])(C,g,k,!1,null,null,null),N=D.exports;d()(D,{VAppBar:O["a"],VAvatar:P["a"],VBtn:A["a"],VCard:S["a"],VCardActions:x["a"],VCardText:x["b"],VCol:_["a"],VImg:V["a"],VListItem:E["a"],VListItemContent:F["a"],VListItemTitle:F["b"],VRow:T["a"],VSpacer:B["a"],VTextarea:I["a"],VToolbarTitle:K["a"]}),r["a"].use(m["a"]);var q=[{path:"/",name:"Home",component:N},{path:"/projects",name:"Projects",component:function(){return n.e("chunk-2037c252").then(n.bind(null,"1619"))}},{path:"/kanban/:uuid",name:"Kanban Board",component:function(){return n.e("chunk-70007513").then(n.bind(null,"2699"))}}],L=new m["a"]({mode:"history",base:"/",routes:q}),$=L,M=n("2f62"),R=(n("4de4"),n("7db0"),n("4160"),n("d81d"),n("b0c0"),n("159b"),n("5530"));r["a"].use(M["a"]);var H={namespaced:!0,state:{portfolio:{uuid:"aad9e8b3-4889-4cb4-ad70-3da65fe6ce49",name:"Eat Sleep Code Repeat"},people:{},projects:{},project:{name:"",preview:"",people:[],shortStory:"",longStory:"",kanbanColumns:[]},tags:[]},getters:{avatar:function(e,t){var n=e.state,r=n.portfolio.people.find((function(e){return e.uuid===t}));return void 0===r?"":r.avatar}},actions:{fetchProjects:function(e,t){var n=e.rootState,r=e.commit,a=Object(R["a"])({},t);n.db.projects.where("parent").equals(a.uuid).toArray((function(e){r("setProjects",e)}))},saveProject:function(e,t){var n=e.rootState,r=e.commit,a=Object(R["a"])(Object(R["a"])({},t.project),{},{parent:t.portfolio.uuid});n.db.projects.put(a).then((function(){"create"===t.action?r("createProject",a):r("updateProject",a)}))},deleteProject:function(e,t){var n=e.rootState,r=e.commit,a=Object(R["a"])({},t);console.log("deleteProject",a),n.db.projects.delete(a.uuid).then((function(){r("deleteProject",a)}))},setProject:function(e,t){var n=e.rootState,r=e.commit;n.db.projects.get(t).then((function(e){n.db.kanbanColumns.where("parent").equals(e.uuid).toArray((function(t){e.kanbanColumns=t.sort((function(e,t){return e.order-t.order})),r("setProject",e),t.forEach((function(t){n.db.kanbanCards.where("parent").equals(t.uuid).toArray((function(n){t.kanbanCards=n.sort((function(e,t){return e.order-t.order})),r("setProject",e)}))}))}))}))},saveKanbanColumn:function(e,t){var n=e.rootState,r=Object(R["a"])(Object(R["a"])({},t.column),{},{parent:t.project.uuid});console.log(r),n.db.kanbanColumns.put(r).then((function(e){return console.log(e)}))},deleteKanbanColumn:function(e,t){var n=e.rootState,r=Object(R["a"])({},t);n.db.kanbanColumns.delete(r.uuid)},saveKanbanCard:function(e,t){var n=e.rootState,r=Object(R["a"])(Object(R["a"])({},t.card),{},{parent:t.column.uuid});n.db.kanbanCards.put(r)},deleteKanbanCard:function(e,t){var n=e.rootState,r=Object(R["a"])({},t);n.db.kanbanCards.delete(r.uuid)},updateCardOrder:function(e,t){var n=e.rootState;n.db.kanbanCards.bulkPut(t).then((function(e){return console.log(e)}))}},mutations:{setProjects:function(e,t){e.projects=t},createProject:function(e,t){e.projects.push(t)},updateProject:function(e,t){e.projects=e.projects.map((function(e){return e.uuid!==t.uuid?e:Object(R["a"])(Object(R["a"])({},e),t)}))},deleteProject:function(e,t){e.projects=e.projects.filter((function(e){return e.uuid!==t.uuid}))},setProject:function(e,t){e.project=t,e.projectName=t.name,e.projectPreview=t.preview}},modules:{}};r["a"].use(M["a"]);var G=new M["a"].Store({state:{},mutations:{},actions:{initialiseDexie:function(e){var t=e.state;t.db.version(1).stores({projects:"uuid,name,parent",kanbanColumns:"uuid,name,parent",kanbanCards:"uuid,name,parent"})}},modules:{portfolio:H}}),J=n("f309"),U=n("3f38"),z=(n("b404"),new J["a"]);r["a"].use(J["a"]),r["a"].use(U["p"],{vuetify:z,iconsGroup:"mdi"});var W=new J["a"]({theme:{dark:!0,themes:{dark:{primary:"#7311F1",accent:"#3BBAED",secondary:"#424345",success:"#4CAF50",info:"#2196F3",warning:"#FB8C00",error:"#FF5252"},light:{primary:"#1976D2",accent:"#E91E63",secondary:"#30B1DC",success:"#4CAF50",info:"#2196F3",warning:"#FB8C00",error:"#FF5252"}}}}),Q=n("4dec");G.state.db=new Q["a"]("flow-state"),r["a"].config.productionTip=!1,new r["a"]({router:$,store:G,vuetify:W,render:function(e){return e(v)}}).$mount("#app")},ce88:function(e,t,n){e.exports=n.p+"img/e-s-c-r-logo.1ba58cd7.png"}});
//# sourceMappingURL=app.887434bc.js.map