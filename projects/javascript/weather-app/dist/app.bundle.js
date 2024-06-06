(()=>{"use strict";var t={11:(t,e,n)=>{n.d(e,{A:()=>s});var r=n(354),a=n.n(r),o=n(314),i=n.n(o)()(a());i.push([t.id,"@import url(https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap);"]),i.push([t.id,'*{margin:0;padding:0;box-sizing:border-box}img{-webkit-user-drag:none;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}body{font-family:"Josefin Sans",sans-serif;min-height:100vh}',"",{version:3,sources:["webpack://./src/style.scss"],names:[],mappings:"AAuCA,EACE,QAAA,CACA,SAAA,CACA,qBAAA,CAGF,IACE,sBAAA,CACA,gBAAA,CACA,qBAAA,CACA,wBAAA,CACA,oBAAA,CAGF,KACE,qCAAA,CACA,gBAAA",sourcesContent:["@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');\n\n@mixin flex-container($direction: row, $justify: center, $align: center, $gap: 0px) {\n  display: flex;\n  flex-direction: $direction;\n  justify-content: $justify;\n  align-items: $align;\n  gap: $gap;\n}\n\n@mixin box-shadow($color: #000000aa, $top: 0, $left: 0, $blur: 10px, $spread: 0px) {\n  box-shadow: $top $left $blur $spread $color;\n}\n\n@mixin button($width: 24px, $height: 24px, $image-size: 80%, $hover-bg: #00000033) {\n  @include flex-container;\n  width: $width;\n  height: $height;\n\n  border-radius: 8px;\n  background-color: transparent;\n  scale: 1;\n  transition: background-color 0.3s ease, scale 0.3s ease;\n  cursor: pointer;\n\n  img {\n    height: $image-size;\n  }\n\n  &:hover {\n    background-color: $hover-bg;\n  }\n\n  &:active {\n    scale: 0.9;\n  }\n}\n\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nimg {\n  -webkit-user-drag: none;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n\nbody {\n  font-family: \"Josefin Sans\", sans-serif;\n  min-height: 100vh;\n}\n"],sourceRoot:""}]);const s=i},314:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",r=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),r&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),r&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,r,a,o){"string"==typeof t&&(t=[[null,t,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var u=0;u<t.length;u++){var d=[].concat(t[u]);r&&i[d[0]]||(void 0!==o&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=o),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),a&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=a):d[4]="".concat(a)),e.push(d))}},e}},354:t=>{t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),a="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),o="/*# ".concat(a," */");return[e].concat([o]).join("\n")}return[e].join("\n")}},72:t=>{var e=[];function n(t){for(var n=-1,r=0;r<e.length;r++)if(e[r].identifier===t){n=r;break}return n}function r(t,r){for(var o={},i=[],s=0;s<t.length;s++){var c=t[s],u=r.base?c[0]+r.base:c[0],d=o[u]||0,l="".concat(u," ").concat(d);o[u]=d+1;var h=n(l),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==h)e[h].references++,e[h].updater(f);else{var m=a(f,r);r.byIndex=s,e.splice(s,0,{identifier:l,updater:m,references:1})}i.push(l)}return i}function a(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,a){var o=r(t=t||[],a=a||{});return function(t){t=t||[];for(var i=0;i<o.length;i++){var s=n(o[i]);e[s].references--}for(var c=r(t,a),u=0;u<o.length;u++){var d=n(o[u]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}o=c}}},659:t=>{var e={};t.exports=function(t,n){var r=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},540:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},56:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},825:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var a=void 0!==n.layer;a&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,a&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var o=n.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleTagTransform(r,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},113:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(r){var a=e[r];if(void 0!==a)return a.exports;var o=e[r]={id:r,exports:{}};return t[r](o,o.exports,n),o.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{var t=n(72),e=n.n(t),r=n(825),a=n.n(r),o=n(659),i=n.n(o),s=n(56),c=n.n(s),u=n(540),d=n.n(u),l=n(113),h=n.n(l),f=n(11),m={};async function g(t){try{let e=await fetch(t,{mode:"cors"});return e=await e.json(),e}catch(t){throw new Error(`Awaw Error: ${t}`)}}m.styleTagTransform=h(),m.setAttributes=c(),m.insert=i().bind(null,"head"),m.domAPI=a(),m.insertStyleElement=d(),e()(f.A,m),f.A&&f.A.locals&&f.A.locals,window.globals={};const w={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function p(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const b={date:p({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:p({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:p({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},y={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function v(t){return(e,n)=>{let r;if("formatting"===(n?.context?String(n.context):"standalone")&&t.formattingValues){const e=t.defaultFormattingWidth||t.defaultWidth,a=n?.width?String(n.width):e;r=t.formattingValues[a]||t.formattingValues[e]}else{const e=t.defaultWidth,a=n?.width?String(n.width):t.defaultWidth;r=t.values[a]||t.values[e]}return r[t.argumentCallback?t.argumentCallback(e):e]}}const M={ordinalNumber:(t,e)=>{const n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:v({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:v({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:t=>t-1}),month:v({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:v({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:v({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})};function x(t){return(e,n={})=>{const r=n.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],o=e.match(a);if(!o)return null;const i=o[0],s=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],c=Array.isArray(s)?function(t,e){for(let e=0;e<t.length;e++)if(t[e].test(i))return e}(s):function(t,e){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&t[e].test(i))return e}(s);let u;return u=t.valueCallback?t.valueCallback(c):c,u=n.valueCallback?n.valueCallback(u):u,{value:u,rest:e.slice(i.length)}}}const k={ordinalNumber:(A={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:t=>parseInt(t,10)},(t,e={})=>{const n=t.match(A.matchPattern);if(!n)return null;const r=n[0],a=t.match(A.parsePattern);if(!a)return null;let o=A.valueCallback?A.valueCallback(a[0]):a[0];return o=e.valueCallback?e.valueCallback(o):o,{value:o,rest:t.slice(r.length)}}),era:x({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:x({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:t=>t+1}),month:x({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:x({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:x({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})};var A;const C={code:"en-US",formatDistance:(t,e,n)=>{let r;const a=w[t];return r="string"==typeof a?a:1===e?a.one:a.other.replace("{{count}}",e.toString()),n?.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:b,formatRelative:(t,e,n,r)=>y[t],localize:M,match:k,options:{weekStartsOn:0,firstWeekContainsDate:1}};let S={};function P(){return S}Math.pow(10,8);const T=6048e5,D=864e5;function W(t){const e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new t.constructor(+t):"number"==typeof t||"[object Number]"===e||"string"==typeof t||"[object String]"===e?new Date(t):new Date(NaN)}function $(t){const e=W(t);return e.setHours(0,0,0,0),e}function N(t){const e=W(t),n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return n.setUTCFullYear(e.getFullYear()),+t-+n}function q(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}function j(t){const e=W(t);return function(t,e){const n=$(t),r=$(e),a=+n-N(n),o=+r-N(r);return Math.round((a-o)/D)}(e,function(t){const e=W(t),n=q(t,0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}(e))+1}function O(t,e){const n=P(),r=e?.weekStartsOn??e?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,a=W(t),o=a.getDay(),i=(o<r?7:0)+o-r;return a.setDate(a.getDate()-i),a.setHours(0,0,0,0),a}function E(t){return O(t,{weekStartsOn:1})}function Y(t){const e=W(t),n=e.getFullYear(),r=q(t,0);r.setFullYear(n+1,0,4),r.setHours(0,0,0,0);const a=E(r),o=q(t,0);o.setFullYear(n,0,4),o.setHours(0,0,0,0);const i=E(o);return e.getTime()>=a.getTime()?n+1:e.getTime()>=i.getTime()?n:n-1}function _(t){const e=W(t),n=+E(e)-+function(t){const e=Y(t),n=q(t,0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),E(n)}(e);return Math.round(n/T)+1}function F(t,e){const n=W(t),r=n.getFullYear(),a=P(),o=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??a.firstWeekContainsDate??a.locale?.options?.firstWeekContainsDate??1,i=q(t,0);i.setFullYear(r+1,0,o),i.setHours(0,0,0,0);const s=O(i,e),c=q(t,0);c.setFullYear(r,0,o),c.setHours(0,0,0,0);const u=O(c,e);return n.getTime()>=s.getTime()?r+1:n.getTime()>=u.getTime()?r:r-1}function H(t,e){const n=W(t),r=+O(n,e)-+function(t,e){const n=P(),r=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,a=F(t,e),o=q(t,0);return o.setFullYear(a,0,r),o.setHours(0,0,0,0),O(o,e)}(n,e);return Math.round(r/T)+1}function z(t,e){return(t<0?"-":"")+Math.abs(t).toString().padStart(e,"0")}const L={y(t,e){const n=t.getFullYear(),r=n>0?n:1-n;return z("yy"===e?r%100:r,e.length)},M(t,e){const n=t.getMonth();return"M"===e?String(n+1):z(n+1,2)},d:(t,e)=>z(t.getDate(),e.length),a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(t,e)=>z(t.getHours()%12||12,e.length),H:(t,e)=>z(t.getHours(),e.length),m:(t,e)=>z(t.getMinutes(),e.length),s:(t,e)=>z(t.getSeconds(),e.length),S(t,e){const n=e.length,r=t.getMilliseconds();return z(Math.trunc(r*Math.pow(10,n-3)),e.length)}},B={G:function(t,e,n){const r=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){const e=t.getFullYear(),r=e>0?e:1-e;return n.ordinalNumber(r,{unit:"year"})}return L.y(t,e)},Y:function(t,e,n,r){const a=F(t,r),o=a>0?a:1-a;return"YY"===e?z(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):z(o,e.length)},R:function(t,e){return z(Y(t),e.length)},u:function(t,e){return z(t.getFullYear(),e.length)},Q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return z(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return z(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){const r=t.getMonth();switch(e){case"M":case"MM":return L.M(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){const r=t.getMonth();switch(e){case"L":return String(r+1);case"LL":return z(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,r){const a=H(t,r);return"wo"===e?n.ordinalNumber(a,{unit:"week"}):z(a,e.length)},I:function(t,e,n){const r=_(t);return"Io"===e?n.ordinalNumber(r,{unit:"week"}):z(r,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getDate(),{unit:"date"}):L.d(t,e)},D:function(t,e,n){const r=j(t);return"Do"===e?n.ordinalNumber(r,{unit:"dayOfYear"}):z(r,e.length)},E:function(t,e,n){const r=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){const a=t.getDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return z(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){const a=t.getDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return z(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){const r=t.getDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return z(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){const r=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){const r=t.getHours();let a;switch(a=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(t,e,n){const r=t.getHours();let a;switch(a=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){let e=t.getHours()%12;return 0===e&&(e=12),n.ordinalNumber(e,{unit:"hour"})}return L.h(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getHours(),{unit:"hour"}):L.H(t,e)},K:function(t,e,n){const r=t.getHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):z(r,e.length)},k:function(t,e,n){let r=t.getHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):z(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):L.m(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getSeconds(),{unit:"second"}):L.s(t,e)},S:function(t,e){return L.S(t,e)},X:function(t,e,n){const r=t.getTimezoneOffset();if(0===r)return"Z";switch(e){case"X":return G(r);case"XXXX":case"XX":return X(r);default:return X(r,":")}},x:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"x":return G(r);case"xxxx":case"xx":return X(r);default:return X(r,":")}},O:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+Q(r,":");default:return"GMT"+X(r,":")}},z:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+Q(r,":");default:return"GMT"+X(r,":")}},t:function(t,e,n){return z(Math.trunc(t.getTime()/1e3),e.length)},T:function(t,e,n){return z(t.getTime(),e.length)}};function Q(t,e=""){const n=t>0?"-":"+",r=Math.abs(t),a=Math.trunc(r/60),o=r%60;return 0===o?n+String(a):n+String(a)+e+z(o,2)}function G(t,e){return t%60==0?(t>0?"-":"+")+z(Math.abs(t)/60,2):X(t,e)}function X(t,e=""){const n=t>0?"-":"+",r=Math.abs(t);return n+z(Math.trunc(r/60),2)+e+z(r%60,2)}const J=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},I=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},R={p:I,P:(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],r=n[1],a=n[2];if(!a)return J(t,e);let o;switch(r){case"P":o=e.dateTime({width:"short"});break;case"PP":o=e.dateTime({width:"medium"});break;case"PPP":o=e.dateTime({width:"long"});break;default:o=e.dateTime({width:"full"})}return o.replace("{{date}}",J(r,e)).replace("{{time}}",I(a,e))}},U=/^D+$/,K=/^Y+$/,V=["D","DD","YY","YYYY"];function Z(t){if(!(e=t,e instanceof Date||"object"==typeof e&&"[object Date]"===Object.prototype.toString.call(e)||"number"==typeof t))return!1;var e;const n=W(t);return!isNaN(Number(n))}const tt=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,et=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,nt=/^'([^]*?)'?$/,rt=/''/g,at=/[a-zA-Z]/;function ot(t){const e=t.match(nt);return e?e[1].replace(rt,"'"):t}function it(t,e){const n=W(t);return isNaN(e)?q(t,NaN):e?(n.setDate(n.getDate()+e),n):n}window.globals.key="56782529b35f4a1293434013240406",window.globals.city="Cainta",window.globals.tempUnit="Celsius";const st=t=>{const e=function(t,e,n){const r=P(),a=n?.locale??r.locale??C,o=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,i=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??r.weekStartsOn??r.locale?.options?.weekStartsOn??0,s=W(t);if(!Z(s))throw new RangeError("Invalid time value");let c=e.match(et).map((t=>{const e=t[0];return"p"===e||"P"===e?(0,R[e])(t,a.formatLong):t})).join("").match(tt).map((t=>{if("''"===t)return{isToken:!1,value:"'"};const e=t[0];if("'"===e)return{isToken:!1,value:ot(t)};if(B[e])return{isToken:!0,value:t};if(e.match(at))throw new RangeError("Format string contains an unescaped latin alphabet character `"+e+"`");return{isToken:!1,value:t}}));a.localize.preprocessor&&(c=a.localize.preprocessor(s,c));const u={firstWeekContainsDate:o,weekStartsOn:i,locale:a};return c.map((r=>{if(!r.isToken)return r.value;const o=r.value;return(!n?.useAdditionalWeekYearTokens&&function(t){return K.test(t)}(o)||!n?.useAdditionalDayOfYearTokens&&function(t){return U.test(t)}(o))&&function(t,e,n){const r=function(t,e,n){const r="Y"===t[0]?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(t,e,n);if(console.warn(r),V.includes(t))throw new RangeError(r)}(o,e,String(t)),(0,B[o[0]])(s,o,a.localize,u)})).join("")}(t,"yyyy-MM-dd");return g(`http://api.weatherapi.com/v1/history.json?key=${window.globals.key}&q=${window.globals.city}&dt=${e}\n  `)};class ct{constructor(t){({location:{name:this.city,country:this.country},current:{last_updated_epoch:this.last_updated_epoch,temp_c:this._temp,feelslike_c:this._feelslike,humidity:this.humidity,wind_kph:this.wind_kph,wind_dir:this.wind_dir,condition:{text:this.condition_text,icon:this.condition_icon}}}=t)}}class ut{constructor(t){({date_epoch:this.date_epoch,day:{avgtemp_c:this._avgtemp_c,daily_chance_of_rain:this.rain_chance,condition:{icon:this.condition_icon}}}=t),this.hourly=[];for(const e of t.hour)this.hourly.push(new dt(e))}}class dt{constructor(t){({time_epoch:this.time_epoch,temp_c:this._temp,feelslike_c:this._feelslike,condition:{icon:this.condition_icon}}=t)}}const lt={};g(`http://api.weatherapi.com/v1/current.json?key=${window.globals.key}&q=${window.globals.city}&aqi=no`).then((t=>lt.current=new ct(t))),lt.daily=[];const ht=new Date;for(const t of[-2,-1])st(it(ht,t)).then((t=>{const e=t.forecast.forecastday[0];lt.daily.push(new ut(e))}));g(`http://api.weatherapi.com/v1/forecast.json?key=${window.globals.key}&q=${window.globals.city}&days=3&aqi=no&alerts=no`).then((t=>{const e=t.forecast.forecastday;for(const t of e)lt.daily.push(new ut(t))})),setTimeout((()=>console.log(lt)),500),console.log("Awaw")})()})();
//# sourceMappingURL=app.bundle.js.map