/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */(function(a,b){'object'==typeof exports&&'undefined'!=typeof module?b(exports):'function'==typeof define&&define.amd?define(['exports'],b):b(a.AbortControllerShim={})})(this,function(a){'use strict';function b(a){var b=A.get(a);return console.assert(null!=b,'\'this\' is expected an Event object, but got',a),b}function c(a,b){A.set(this,{eventTarget:a,event:b,eventPhase:2,currentTarget:a,canceled:!1,stopped:!1,passiveListener:null,timeStamp:b.timeStamp||Date.now()}),Object.defineProperty(this,'isTrusted',{value:!1,enumerable:!0});for(var c,e=Object.keys(b),f=0;f<e.length;++f)c=e[f],c in this||Object.defineProperty(this,c,d(c))}function d(a){return{get:function(){return b(this).event[a]},set:function(c){b(this).event[a]=c},configurable:!0,enumerable:!0}}function e(a){return{value:function(){var c=b(this).event;return c[a].apply(c,arguments)},configurable:!0,enumerable:!0}}function f(a,b){function c(b,c){a.call(this,b,c)}var f=Object.keys(b);if(0===f.length)return a;c.prototype=Object.create(a.prototype,{constructor:{value:c,configurable:!0,writable:!0}});for(var g,h=0;h<f.length;++h)if(g=f[h],!(g in a.prototype)){var i=Object.getOwnPropertyDescriptor(b,g),j='function'==typeof i.value;Object.defineProperty(c.prototype,g,j?e(g):d(g))}return c}function g(a){if(null==a||a===Object.prototype)return c;var b=B.get(a);return null==b&&(b=f(g(Object.getPrototypeOf(a)),a),B.set(a,b)),b}function h(a,b){var c=g(Object.getPrototypeOf(b));return new c(a,b)}function i(a){return b(a).stopped}function j(a,c){b(a).eventPhase=c}function k(a,c){b(a).currentTarget=c}function l(a,c){b(a).passiveListener=c}function m(a){return null!==a&&'object'===('undefined'==typeof a?'undefined':z(a))}function n(a){var b=C.get(a);if(null==b)throw new TypeError('\'this\' is expected an EventTarget object, but got another value.');return b}function o(a){return{get:function(){for(var b=n(this),c=b.get(a);null!=c;){if(c.listenerType===F)return c.listener;c=c.next}return null},set:function(b){'function'==typeof b||m(b)||(b=null);for(var c=n(this),d=null,e=c.get(a);null!=e;)e.listenerType===F?null==d?null===e.next?c.delete(a):c.set(a,e.next):d.next=e.next:d=e,e=e.next;if(null!==b){var f={listener:b,listenerType:F,passive:!1,once:!1,next:null};null===d?c.set(a,f):d.next=f}},configurable:!0,enumerable:!0}}function p(a,b){Object.defineProperty(a,'on'+b,o(b))}function q(a){function b(){r.call(this)}b.prototype=Object.create(r.prototype,{constructor:{value:b,configurable:!0,writable:!0}});for(var c=0;c<a.length;++c)p(b.prototype,a[c]);return b}function r(){if(this instanceof r)return void C.set(this,new Map);if(1===arguments.length&&Array.isArray(arguments[0]))return q(arguments[0]);if(0<arguments.length){for(var a=Array(arguments.length),b=0;b<arguments.length;++b)a[b]=arguments[b];return q(a)}throw new TypeError('Cannot call a class as a function')}function s(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function t(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function u(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function v(){var a=Object.create(J.prototype);return r.call(a),I.set(a,!1),a}function w(a){!1!==I.get(a)||(I.set(a,!0),a.dispatchEvent({type:'abort'}))}function x(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function y(a){var b=M.get(a);if(null==b)throw new TypeError('Expected \'this\' to be an \'AbortController\' object, but got '+(null===a?'null':'undefined'==typeof a?'undefined':L(a)));return b}var z='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},A=new WeakMap,B=new WeakMap;c.prototype={get type(){return b(this).event.type},get target(){return b(this).eventTarget},get currentTarget(){return b(this).currentTarget},composedPath:function(){var a=b(this).currentTarget;return null==a?[]:[a]},get NONE(){return 0},get CAPTURING_PHASE(){return 1},get AT_TARGET(){return 2},get BUBBLING_PHASE(){return 3},get eventPhase(){return b(this).eventPhase},stopPropagation:function(){var a=b(this);'function'==typeof a.event.stopPropagation&&a.event.stopPropagation()},stopImmediatePropagation:function(){var a=b(this);a.stopped=!0,'function'==typeof a.event.stopImmediatePropagation&&a.event.stopImmediatePropagation()},get bubbles(){return!!b(this).event.bubbles},get cancelable(){return!!b(this).event.cancelable},preventDefault:function(){var a=b(this);return null==a.passiveListener?void(!a.event.cancelable||(a.canceled=!0,'function'==typeof a.event.preventDefault&&a.event.preventDefault())):void console.warn('Event#preventDefault() was called from a passive listener:',a.passiveListener)},get defaultPrevented(){return b(this).canceled},get composed(){return!!b(this).event.composed},get timeStamp(){return b(this).timeStamp}},Object.defineProperty(c.prototype,'constructor',{value:c,configurable:!0,writable:!0}),'undefined'!=typeof window&&'undefined'!=typeof window.Event&&(Object.setPrototypeOf(c.prototype,window.Event.prototype),B.set(window.Event.prototype,c));var C=new WeakMap,D=1,E=2,F=3;r.prototype={addEventListener:function(a,b,c){if(null==b)return!1;if('function'!=typeof b&&!m(b))throw new TypeError('\'listener\' should be a function or an object.');var d=n(this),e=m(c),f=e?!!c.capture:!!c,g=f?D:E,h={listener:b,listenerType:g,passive:e&&!!c.passive,once:e&&!!c.once,next:null},i=d.get(a);if(void 0===i)return d.set(a,h),!0;for(var j=null;null!=i;){if(i.listener===b&&i.listenerType===g)return!1;j=i,i=i.next}return j.next=h,!0},removeEventListener:function(a,b,c){if(null==b)return!1;for(var d=n(this),e=m(c)?!!c.capture:!!c,f=e?D:E,g=null,h=d.get(a);null!=h;){if(h.listener===b&&h.listenerType===f)return null==g?null===h.next?d.delete(a):d.set(a,h.next):g.next=h.next,!0;g=h,h=h.next}return!1},dispatchEvent:function(a){if(null==a||'string'!=typeof a.type)throw new TypeError('"event.type" should be a string.');var b=n(this),c=a.type,d=b.get(c);if(null==d)return!0;for(var e=h(this,a),f=null;null!=d&&(d.once?null==f?null===d.next?b.delete(c):b.set(c,d.next):f.next=d.next:f=d,l(e,d.passive?d.listener:null),'function'==typeof d.listener?d.listener.call(this,e):d.listenerType!==F&&'function'==typeof d.listener.handleEvent&&d.listener.handleEvent(e),!i(e));)d=d.next;return l(e,null),j(e,0),k(e,null),!e.defaultPrevented}},Object.defineProperty(r.prototype,'constructor',{value:r,configurable:!0,writable:!0}),'undefined'!=typeof window&&'undefined'!=typeof window.EventTarget&&Object.setPrototypeOf(r.prototype,window.EventTarget.prototype);var G='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},H=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),I=new WeakMap,J=function(a){function b(){throw s(this,b),new TypeError('AbortSignal cannot be constructed directly')}return u(b,a),H(b,[{key:'aborted',get:function(){var a=I.get(this);if('boolean'!=typeof a)throw new TypeError('Expected \'this\' to be an \'AbortSignal\' object, but got '+(null===this?'null':G(this)));return!!a}}]),b}(r);Object.defineProperties(J.prototype,{aborted:{enumerable:!0}}),p(J.prototype,'abort');var K=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),L='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},M=new WeakMap,N=function(){function a(){x(this,a),M.set(this,v())}return K(a,[{key:'abort',value:function(){var a=y(this);null!=a&&w(a)}},{key:'signal',get:function(){return y(this)}}]),a}();if(Object.defineProperties(N.prototype,{signal:{enumerable:!0},abort:{enumerable:!0}}),a['default']=N,a.AbortController=N,a.AbortSignal=J,Object.defineProperty(a,'__esModule',{value:!0}),'undefined'==typeof module&&'undefined'==typeof define){const a=Function('return this')();'undefined'==typeof a.AbortController&&(a.AbortController=N,a.AbortSignal=J)}});
//# sourceMappingURL=abort-controller.umd.js.map
