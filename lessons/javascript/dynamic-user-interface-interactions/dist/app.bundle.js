(()=>{"use strict";var n,e,t,o,A,r,i,a,s,c,l,d,u,p,C={11:(n,e,t)=>{t.d(e,{A:()=>a});var o=t(354),A=t.n(o),r=t(314),i=t.n(r)()(A());i.push([n.id,"@import url(https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap);"]),i.push([n.id,'*{margin:0;padding:0;box-sizing:border-box}img{-webkit-user-drag:none;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}body{font-family:"Josefin Sans",sans-serif;min-height:100vh}.main{height:100vh;width:100%;padding:24px;background-color:#fefefe}.dropdown{display:flex;flex-direction:column;justify-content:start;align-items:start;gap:4px;position:relative}.dropdown__btn{display:flex;flex-direction:row;justify-content:center;align-items:center;width:24px;height:24px;border-radius:8px;background-color:rgba(0,0,0,.0588235294);scale:1;transition:background-color .3s ease,scale .3s ease;cursor:pointer;border-radius:50%}.dropdown__btn img{height:70%}.dropdown__btn:hover{background-color:rgba(0,0,0,.2)}.dropdown__btn:active{scale:.9}.dropdown__menu{display:flex;flex-direction:column;justify-content:start;align-items:start;position:absolute;top:28px;left:2px;z-index:1;box-shadow:0 0 3px 0px rgba(0,0,0,.3333333333);background-color:#f3f3f3;max-height:110px;width:100px;opacity:80%;border-radius:8px;overflow:hidden;transition:max-height .5s ease,opacity .7s ease}.dropdown__menu--hidden{max-height:0;opacity:0%}.dropdown__item{width:100%;padding:6px 8px 4px 8px;cursor:pointer}.dropdown__item:hover{background-color:#ddd}.dropdown__item:not(:last-child){border-bottom:2px solid rgba(0,0,0,.0666666667)}.carousel{position:relative;width:fit-content}.carousel .dropdown{position:absolute;top:8px;right:8px}.carousel .dropdown img{filter:invert(1)}.carousel__slides-container{width:500px;border-radius:12px;overflow:hidden;box-shadow:0 0 10px 0px rgba(0,0,0,.1333333333)}.carousel__slide{display:none;width:100%;height:100%}.carousel__slide--active{display:block}.carousel__nav{display:flex;flex-direction:row;justify-content:center;align-items:center;width:32px;height:32px;border-radius:8px;background-color:rgba(0,0,0,.0588235294);scale:1;transition:background-color .3s ease,scale .3s ease;cursor:pointer;border-radius:50%;position:absolute;top:50%;transform:translateY(-50%)}.carousel__nav img{height:80%}.carousel__nav:hover{background-color:rgba(0,0,0,.1333333333)}.carousel__nav:active{scale:.9}.carousel__nav--left{left:8px}.carousel__nav--right{right:8px}.carousel__nav img{filter:invert(1)}.carousel__circles-container{display:flex;flex-direction:row;justify-content:center;align-items:center;gap:8px;position:absolute;bottom:12px;left:50%;transform:translateX(-50%)}.carousel__circle{height:16px;width:16px;border:#fff 2px solid;border-radius:50%;opacity:50%;cursor:pointer;transition:opacity .3s ease,background-color .3s ease}.carousel__circle--active{opacity:70%;background-color:#fff}',"",{version:3,sources:["webpack://./src/style.scss"],names:[],mappings:"AAgDA,EACE,QAAA,CACA,SAAA,CACA,qBAAA,CAGF,IACE,sBAAA,CACA,gBAAA,CACA,qBAAA,CACA,wBAAA,CACA,oBAAA,CAGF,KACE,qCAAA,CACA,gBAAA,CAGF,MACE,YAAA,CACA,UAAA,CACA,YAAA,CACA,wBAAA,CAGF,UAvEE,YAAA,CACA,qBAuEwB,CAtExB,qBAsEgC,CArEhC,iBAqEuC,CACvC,OAAA,CACA,iBAAA,CAEA,eA5EA,YAAA,CACA,kBAFgC,CAGhC,sBAH+C,CAI/C,kBAJ+D,CAwB/D,UAsDkB,CArDlB,WAqDwB,CAnDxB,iBAAA,CACA,wCAAA,CACA,OAAA,CACA,mDAAA,CACA,cAAA,CAgDE,iBAAA,CA9CF,mBACE,UA4C4B,CAzC9B,qBACE,+BAjBS,CAoBX,sBACE,QAAA,CAwCF,gBAjFA,YAAA,CACA,qBAiF0B,CAhF1B,qBAgFkC,CA/ElC,iBA+EyC,CAEvC,iBAAA,CACA,QAAA,CACA,QAAA,CACA,SAAA,CA1EF,8CAAA,CA6EE,wBAAA,CAEA,gBAAA,CACA,WAAA,CACA,WAAA,CACA,iBAAA,CACA,eAAA,CAEA,+CAAA,CAEA,wBACE,YAAA,CACA,UAAA,CAIJ,gBACE,UAAA,CACA,uBAAA,CAEA,cAAA,CAEA,sBACE,qBAAA,CAGF,iCACE,+CAAA,CAKN,UACE,iBAAA,CACA,iBAAA,CAEA,oBACE,iBAAA,CACA,OAAA,CACA,SAAA,CAEA,wBACE,gBAAA,CAIJ,4BACE,WAAA,CACA,kBAAA,CACA,eAAA,CA9HF,+CAAA,CAkIA,iBACE,YAAA,CAEA,UAAA,CACA,WAAA,CAEA,yBACE,aAAA,CAIJ,eA1JA,YAAA,CACA,kBAFgC,CAGhC,sBAH+C,CAI/C,kBAJ+D,CAwB/D,UAoIkB,CAnIlB,WAmIwB,CAjIxB,iBAAA,CACA,wCAAA,CACA,OAAA,CACA,mDAAA,CACA,cAAA,CA8HE,iBAAA,CAEA,iBAAA,CACA,OAAA,CACA,0BAAA,CAhIF,mBACE,UA0H4B,CAvH9B,qBACE,wCAsHiC,CAnHnC,sBACE,QAAA,CAyHA,qBACE,QAAA,CAGF,sBACE,SAAA,CAGF,mBACE,gBAAA,CAIJ,6BA/KA,YAAA,CACA,kBAFgC,CAGhC,sBAH+C,CAI/C,kBAJ+D,CAkL7D,OAAA,CAEA,iBAAA,CACA,WAAA,CACA,QAAA,CACA,0BAAA,CAGF,kBACE,WAAA,CACA,UAAA,CAEA,qBAAA,CACA,iBAAA,CACA,WAAA,CAEA,cAAA,CACA,qDAAA,CAEA,0BACE,WAAA,CACA,qBAAA",sourcesContent:['@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap");\n\n@mixin flex-container($direction: row, $justify: center, $align: center) {\n  display: flex;\n  flex-direction: $direction;\n  justify-content: $justify;\n  align-items: $align;\n}\n\n@mixin box-shadow(\n  $color: #000000aa,\n  $top: 0,\n  $left: 0,\n  $blur: 10px,\n  $spread: 0px\n) {\n  box-shadow: $top $left $blur $spread $color;\n}\n\n@mixin button(\n  $width: 24px,\n  $height: 24px,\n  $image-size: 80%,\n  $hover-bg: #00000033\n) {\n  @include flex-container;\n  width: $width;\n  height: $height;\n\n  border-radius: 8px;\n  background-color: #0000000f;\n  scale: 1;\n  transition: background-color 0.3s ease, scale 0.3s ease;\n  cursor: pointer;\n\n  img {\n    height: $image-size;\n  }\n\n  &:hover {\n    background-color: $hover-bg;\n  }\n\n  &:active {\n    scale: 0.9;\n  }\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nimg {\n  -webkit-user-drag: none;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n\nbody {\n  font-family: "Josefin Sans", sans-serif;\n  min-height: 100vh;\n}\n\n.main {\n  height: 100vh;\n  width: 100%;\n  padding: 24px;\n  background-color: #fefefe;\n}\n\n.dropdown {\n  @include flex-container(column, start, start);\n  gap: 4px;\n  position: relative;\n\n  &__btn {\n    @include button(24px, 24px, 70%);\n    border-radius: 50%;\n  }\n\n  &__menu {\n    @include flex-container(column, start, start);\n\n    position: absolute;\n    top: 28px;\n    left: 2px;\n    z-index: 1;\n\n    @include box-shadow(#00000055, 0, 0, 3px);\n    background-color: #f3f3f3;\n\n    max-height: 110px;\n    width: 100px;\n    opacity: 80%;\n    border-radius: 8px;\n    overflow: hidden;\n\n    transition: max-height 0.5s ease, opacity 0.7s ease;\n\n    &--hidden {\n      max-height: 0;\n      opacity: 0%;\n    }\n  }\n\n  &__item {\n    width: 100%;\n    padding: 6px 8px 4px 8px;\n\n    cursor: pointer;\n\n    &:hover {\n      background-color: #ddd;\n    }\n\n    &:not(:last-child) {\n      border-bottom: 2px solid #00000011;\n    }\n  }\n}\n\n.carousel {\n  position: relative;\n  width: fit-content;\n\n  .dropdown {\n    position: absolute;\n    top: 8px;\n    right: 8px;\n\n    img {\n      filter: invert(1);\n    }\n  }\n\n  &__slides-container {\n    width: 500px;\n    border-radius: 12px;\n    overflow: hidden;\n    @include box-shadow(#00000022);\n  }\n\n  &__slide {\n    display: none;\n\n    width: 100%;\n    height: 100%;\n\n    &--active {\n      display: block;\n    }\n  }\n\n  &__nav {\n    @include button(32px, 32px, 80%, #00000022);\n    border-radius: 50%;\n\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n\n    &--left {\n      left: 8px;\n    }\n\n    &--right {\n      right: 8px;\n    }\n\n    img {\n      filter: invert(1);\n    }\n  }\n\n  &__circles-container {\n    @include flex-container();\n    gap: 8px;\n\n    position: absolute;\n    bottom: 12px;\n    left: 50%;\n    transform: translateX(-50%);\n  }\n\n  &__circle {\n    height: 16px;\n    width: 16px;\n\n    border: #ffffff 2px solid;\n    border-radius: 50%;\n    opacity: 50%;\n\n    cursor: pointer;\n    transition: opacity 0.3s ease, background-color 0.3s ease;\n\n    &--active {\n      opacity: 70%;\n      background-color: #ffffff;\n    }\n  }\n}'],sourceRoot:""}]);const a=i},314:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,A,r){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(o)for(var a=0;a<this.length;a++){var s=this[a][0];null!=s&&(i[s]=!0)}for(var c=0;c<n.length;c++){var l=[].concat(n[c]);o&&i[l[0]]||(void 0!==r&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=r),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),A&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=A):l[4]="".concat(A)),e.push(l))}},e}},354:n=>{n.exports=function(n){var e=n[1],t=n[3];if(!t)return e;if("function"==typeof btoa){var o=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),A="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),r="/*# ".concat(A," */");return[e].concat([r]).join("\n")}return[e].join("\n")}},72:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var r={},i=[],a=0;a<n.length;a++){var s=n[a],c=o.base?s[0]+o.base:s[0],l=r[c]||0,d="".concat(c," ").concat(l);r[c]=l+1;var u=t(d),p={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==u)e[u].references++,e[u].updater(p);else{var C=A(p,o);o.byIndex=a,e.splice(a,0,{identifier:d,updater:C,references:1})}i.push(d)}return i}function A(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,A){var r=o(n=n||[],A=A||{});return function(n){n=n||[];for(var i=0;i<r.length;i++){var a=t(r[i]);e[a].references--}for(var s=o(n,A),c=0;c<r.length;c++){var l=t(r[c]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}r=s}}},659:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},540:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},56:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var A=void 0!==t.layer;A&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,A&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var r=t.sourceMap;r&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},113:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},f={};function h(n){var e=f[n];if(void 0!==e)return e.exports;var t=f[n]={id:n,exports:{}};return C[n](t,t.exports,h),t.exports}h.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return h.d(e,{a:e}),e},h.d=(n,e)=>{for(var t in e)h.o(e,t)&&!h.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:e[t]})},h.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),h.nc=void 0,n=h(72),e=h.n(n),t=h(825),o=h.n(t),A=h(659),r=h.n(A),i=h(56),a=h.n(i),s=h(540),c=h.n(s),l=h(113),d=h.n(l),u=h(11),(p={}).styleTagTransform=d(),p.setAttributes=a(),p.insert=r().bind(null,"head"),p.domAPI=o(),p.insertStyleElement=c(),e()(u.A,p),u.A&&u.A.locals&&u.A.locals,document.querySelectorAll(".dropdown").forEach((n=>{const e=n.querySelector(".dropdown__btn"),t=n.querySelector(".dropdown__menu"),o=()=>{t.classList.toggle("dropdown__menu--hidden")};e.addEventListener("click",(()=>{o()})),n.querySelectorAll(".dropdown__item").forEach((n=>{n.addEventListener("click",(()=>{o()}))}))})),document.querySelectorAll(".carousel").forEach((n=>{const e=n.querySelector(".carousel__slides-container"),t=n.querySelector(".carousel__circles-container");function o(n){const o=(e,t)=>{t.querySelector(`.carousel__${e}--active`).classList.remove(`carousel__${e}--active`),t.querySelector(`.carousel__${e}[data-slide-num="${n}"]`).classList.add(`carousel__${e}--active`)};o("slide",e),o("circle",t)}function A(n){const t=+e.querySelector(".carousel__slide--active").getAttribute("data-slide-num"),A=e.children.length;o(((t+n)%A+A)%A)}[...e.children].forEach(((n,e)=>{n.setAttribute("data-slide-num",e)})),[...t.children].forEach(((n,e)=>{n.setAttribute("data-slide-num",e),n.addEventListener("click",(()=>{o(e)}))})),n.querySelector(".carousel__nav--left").addEventListener("click",(()=>{A(-1)})),n.querySelector(".carousel__nav--right").addEventListener("click",(()=>{A(1)})),o(0),setInterval((()=>{A(1)}),5e3)}))})();
//# sourceMappingURL=app.bundle.js.map