(()=>{"use strict";var e={11:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(354),s=n.n(r),o=n(314),i=n.n(o)()(s());i.push([e.id,"@import url(https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap);"]),i.push([e.id,'*{margin:0;padding:0;box-sizing:border-box}img{-webkit-user-drag:none;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}img[src*=svg]{height:50px}body{font-family:"Josefin Sans",sans-serif;min-height:100vh}',"",{version:3,sources:["webpack://./src/style.scss"],names:[],mappings:"AAuCA,EACE,QAAA,CACA,SAAA,CACA,qBAAA,CAGF,IACE,sBAAA,CACA,gBAAA,CACA,qBAAA,CACA,wBAAA,CACA,oBAAA,CAEA,cACE,WAAA,CAIJ,KACE,qCAAA,CACA,gBAAA",sourcesContent:["@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');\n\n@mixin flex-container($direction: row, $justify: center, $align: center, $gap: 0px) {\n  display: flex;\n  flex-direction: $direction;\n  justify-content: $justify;\n  align-items: $align;\n  gap: $gap;\n}\n\n@mixin box-shadow($color: #000000aa, $top: 0, $left: 0, $blur: 10px, $spread: 0px) {\n  box-shadow: $top $left $blur $spread $color;\n}\n\n@mixin button($width: 24px, $height: 24px, $image-size: 80%, $hover-bg: #00000033) {\n  @include flex-container;\n  width: $width;\n  height: $height;\n\n  border-radius: 8px;\n  background-color: transparent;\n  scale: 1;\n  transition: background-color 0.3s ease, scale 0.3s ease;\n  cursor: pointer;\n\n  img {\n    height: $image-size;\n  }\n\n  &:hover {\n    background-color: $hover-bg;\n  }\n\n  &:active {\n    scale: 0.9;\n  }\n}\n\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nimg {\n  -webkit-user-drag: none;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n\n  &[src*=svg] {\n    height: 50px;\n  }\n}\n\nbody {\n  font-family: \"Josefin Sans\", sans-serif;\n  min-height: 100vh;\n}\n"],sourceRoot:""}]);const a=i},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,s,o){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var a=0;a<this.length;a++){var c=this[a][0];null!=c&&(i[c]=!0)}for(var l=0;l<e.length;l++){var u=[].concat(e[l]);r&&i[u[0]]||(void 0!==o&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=o),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),s&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=s):u[4]="".concat(s)),t.push(u))}},t}},354:e=>{e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),o="/*# ".concat(s," */");return[t].concat([o]).join("\n")}return[t].join("\n")}},72:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var o={},i=[],a=0;a<e.length;a++){var c=e[a],l=r.base?c[0]+r.base:c[0],u=o[l]||0,h="".concat(l," ").concat(u);o[l]=u+1;var p=n(h),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)t[p].references++,t[p].updater(f);else{var d=s(f,r);r.byIndex=a,t.splice(a,0,{identifier:h,updater:d,references:1})}i.push(h)}return i}function s(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,s){var o=r(e=e||[],s=s||{});return function(e){e=e||[];for(var i=0;i<o.length;i++){var a=n(o[i]);t[a].references--}for(var c=r(e,s),l=0;l<o.length;l++){var u=n(o[l]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}o=c}}},659:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,s&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var o=n.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var s=t[r];if(void 0!==s)return s.exports;var o=t[r]={id:r,exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{var e=n(72),t=n.n(e),r=n(825),s=n.n(r),o=n(659),i=n.n(o),a=n(56),c=n.n(a),l=n(540),u=n.n(l),h=n(113),p=n.n(h),f=n(11),d={};d.styleTagTransform=p(),d.setAttributes=c(),d.insert=i().bind(null,"head"),d.domAPI=s(),d.insertStyleElement=u(),t()(f.A,d),f.A&&f.A.locals&&f.A.locals;class g{constructor(e){Object.assign(this,{length:1,hits:0},e)}hit(){this.hits++}isSunk(){return this.hits>=this.length}}class m{constructor(){this.init()}init(){this.shots=Array.from({length:10},(e=>Array(10).fill(!1))),this.shipMap=Array.from({length:10},(e=>Array(10).fill(null))),this.ships=[]}placeShip(e,t,n){const r=this.getShipLocations(e,t,n);if(!this.areShipCoordsLegal(r))return!1;const s=new g({name:e,length:r.length});for(const[e,t]of r)this.shipMap[e][t]=s;return this.ships.push(s),!0}getShipLocations(e,t,n){const r=[],s={Carrier:5,Battleship:4,Destroyer:3,Submarine:3,"Patrol Boat":2}[e]/2,o=Math.ceil(s)-1,i=Math.floor(s),a=+!n,c=t[1-a],l=t[a]-o,u=t[a]+i;for(let e=l;e<=u;e++){const t=n?[e,c]:[c,e];r.push(t)}return r}areShipCoordsLegal(e){for(const[t,n]of e){if(t<0||t>=10||n<0||n>=10)return!1;if(null!==this.shipMap[t][n])return!1}return!0}receiveAttack(e){let[t,n]=e;const r=this.shots[t][n],s=this.shipMap[t][n];return this.shots[t][n]=!0,s instanceof g&&!r&&(s.hit(),!0)}haveAllShipsSunk(){for(const e of this.ships)if(!e.isSunk())return!1;return!0}textDisplay(){let e="";const t="[00m";for(let n=0;n<10;n++){for(let t=0;t<10;t++){const r=this.shots[n][t]?" x":"  ";e+=null===this.shipMap[n][t]?`[44m${r}`:`[40m[31m${r}`}e+=`${t}\n`}return e+=t,e}randomlyPlaceShips(){this.init();const e=["Carrier","Battleship","Destroyer","Submarine","Patrol Boat"];for(const t of e){let e=!1;for(;!e;){const n=parseInt(10*Math.random()),r=parseInt(10*Math.random()),s=Math.random()>.5;e=this.placeShip(t,[n,r],s)}}}}class A{constructor(e){if(this.gameboard=new m,this.gameboard.randomlyPlaceShips(),Object.assign(this,{name:"Awaw",isAI:!1},e),this.isAI){this.legalMoves=[];for(let e=0;e<10;e++)for(let t=0;t<10;t++)this.legalMoves.push([e,t])}}getAImove(){if(!this.isAI)return null;const e=parseInt(Math.random()*this.legalMoves.length);return this.legalMoves[e]}}const v=new class{init(e){let{playersData:t,autoStart:n=!0,thinkingAI:r=!1}=e;this.turn=0,this.status=-1,this.message="",this.players=[];for(const e of t)this.players.push(new A(e));n&&this.players.every((e=>e.isAI))&&this.makeMove(1,this.players[0].getAImove()),this.thinkingAI=r}async makeMove(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;const r=this.oppPlayer.gameboard,[s,o]=t,i=-1!==this.status,a=this.turn!==1-e,c=r.shots[s][o];if(i||a||c)return Promise.resolve(!1);if(r.receiveAttack(t)){if(r.haveAllShipsSunk())return this.status=this.turn,Promise.resolve(!0)}else this.turn^=1;if(this.curPlayer.isAI){const e=n?n(r):this.curPlayer.getAImove(),t=this.thinkingAI?1e3:0;return new Promise((r=>{setTimeout((()=>{this.makeMove(1-this.turn,e,n).then(r)}),t)}))}return Promise.resolve(!0)}get curPlayer(){return this.players[this.turn]}get oppPlayer(){return this.players[1-this.turn]}},y=new class{constructor(){this.Game=v,v.init({playersData:[{isAI:!1,name:"Awp"},{isAI:!0,name:"Bot"}],thinkingAI:!0})}printBoardStates(){for(const e of v.players)console.log(e.name),console.log(e.gameboard.textDisplay()),console.log(" ")}};window.globals={},window.globals.Game=y.Game,window.globals.DisplayManager=y,y.printBoardStates()})()})();
//# sourceMappingURL=app.bundle.js.map