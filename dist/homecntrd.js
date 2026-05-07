typeof globalThis < "u" && typeof globalThis.process > "u" && (globalThis.process = { env: { NODE_ENV: "production" } });
function $u(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var rd = { exports: {} }, A = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cr = Symbol.for("react.element"), Mu = Symbol.for("react.portal"), Fu = Symbol.for("react.fragment"), Eu = Symbol.for("react.strict_mode"), Pu = Symbol.for("react.profiler"), Du = Symbol.for("react.provider"), Nu = Symbol.for("react.context"), Lu = Symbol.for("react.forward_ref"), Au = Symbol.for("react.suspense"), Ou = Symbol.for("react.memo"), Wu = Symbol.for("react.lazy"), Es = Symbol.iterator;
function Hu(e) {
  return e === null || typeof e != "object" ? null : (e = Es && e[Es] || e["@@iterator"], typeof e == "function" ? e : null);
}
var id = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, od = Object.assign, ld = {};
function Mn(e, t, n) {
  this.props = e, this.context = t, this.refs = ld, this.updater = n || id;
}
Mn.prototype.isReactComponent = {};
Mn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Mn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function sd() {
}
sd.prototype = Mn.prototype;
function $l(e, t, n) {
  this.props = e, this.context = t, this.refs = ld, this.updater = n || id;
}
var Ml = $l.prototype = new sd();
Ml.constructor = $l;
od(Ml, Mn.prototype);
Ml.isPureReactComponent = !0;
var Ps = Array.isArray, ad = Object.prototype.hasOwnProperty, Fl = { current: null }, dd = { key: !0, ref: !0, __self: !0, __source: !0 };
function cd(e, t, n) {
  var i, o = {}, l = null, s = null;
  if (t != null) for (i in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (l = "" + t.key), t) ad.call(t, i) && !dd.hasOwnProperty(i) && (o[i] = t[i]);
  var a = arguments.length - 2;
  if (a === 1) o.children = n;
  else if (1 < a) {
    for (var d = Array(a), c = 0; c < a; c++) d[c] = arguments[c + 2];
    o.children = d;
  }
  if (e && e.defaultProps) for (i in a = e.defaultProps, a) o[i] === void 0 && (o[i] = a[i]);
  return { $$typeof: Cr, type: e, key: l, ref: s, props: o, _owner: Fl.current };
}
function Bu(e, t) {
  return { $$typeof: Cr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function El(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Cr;
}
function Vu(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Ds = /\/+/g;
function to(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Vu("" + e.key) : t.toString(36);
}
function Zr(e, t, n, i, o) {
  var l = typeof e;
  (l === "undefined" || l === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else switch (l) {
    case "string":
    case "number":
      s = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case Cr:
        case Mu:
          s = !0;
      }
  }
  if (s) return s = e, o = o(s), e = i === "" ? "." + to(s, 0) : i, Ps(o) ? (n = "", e != null && (n = e.replace(Ds, "$&/") + "/"), Zr(o, t, n, "", function(c) {
    return c;
  })) : o != null && (El(o) && (o = Bu(o, n + (!o.key || s && s.key === o.key ? "" : ("" + o.key).replace(Ds, "$&/") + "/") + e)), t.push(o)), 1;
  if (s = 0, i = i === "" ? "." : i + ":", Ps(e)) for (var a = 0; a < e.length; a++) {
    l = e[a];
    var d = i + to(l, a);
    s += Zr(l, t, n, d, o);
  }
  else if (d = Hu(e), typeof d == "function") for (e = d.call(e), a = 0; !(l = e.next()).done; ) l = l.value, d = i + to(l, a++), s += Zr(l, t, n, d, o);
  else if (l === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return s;
}
function Fr(e, t, n) {
  if (e == null) return e;
  var i = [], o = 0;
  return Zr(e, i, "", "", function(l) {
    return t.call(n, l, o++);
  }), i;
}
function Uu(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ce = { current: null }, ei = { transition: null }, Gu = { ReactCurrentDispatcher: Ce, ReactCurrentBatchConfig: ei, ReactCurrentOwner: Fl };
function ud() {
  throw Error("act(...) is not supported in production builds of React.");
}
A.Children = { map: Fr, forEach: function(e, t, n) {
  Fr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Fr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Fr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!El(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
A.Component = Mn;
A.Fragment = Fu;
A.Profiler = Pu;
A.PureComponent = $l;
A.StrictMode = Eu;
A.Suspense = Au;
A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Gu;
A.act = ud;
A.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var i = od({}, e.props), o = e.key, l = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (l = t.ref, s = Fl.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (d in t) ad.call(t, d) && !dd.hasOwnProperty(d) && (i[d] = t[d] === void 0 && a !== void 0 ? a[d] : t[d]);
  }
  var d = arguments.length - 2;
  if (d === 1) i.children = n;
  else if (1 < d) {
    a = Array(d);
    for (var c = 0; c < d; c++) a[c] = arguments[c + 2];
    i.children = a;
  }
  return { $$typeof: Cr, type: e.type, key: o, ref: l, props: i, _owner: s };
};
A.createContext = function(e) {
  return e = { $$typeof: Nu, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Du, _context: e }, e.Consumer = e;
};
A.createElement = cd;
A.createFactory = function(e) {
  var t = cd.bind(null, e);
  return t.type = e, t;
};
A.createRef = function() {
  return { current: null };
};
A.forwardRef = function(e) {
  return { $$typeof: Lu, render: e };
};
A.isValidElement = El;
A.lazy = function(e) {
  return { $$typeof: Wu, _payload: { _status: -1, _result: e }, _init: Uu };
};
A.memo = function(e, t) {
  return { $$typeof: Ou, type: e, compare: t === void 0 ? null : t };
};
A.startTransition = function(e) {
  var t = ei.transition;
  ei.transition = {};
  try {
    e();
  } finally {
    ei.transition = t;
  }
};
A.unstable_act = ud;
A.useCallback = function(e, t) {
  return Ce.current.useCallback(e, t);
};
A.useContext = function(e) {
  return Ce.current.useContext(e);
};
A.useDebugValue = function() {
};
A.useDeferredValue = function(e) {
  return Ce.current.useDeferredValue(e);
};
A.useEffect = function(e, t) {
  return Ce.current.useEffect(e, t);
};
A.useId = function() {
  return Ce.current.useId();
};
A.useImperativeHandle = function(e, t, n) {
  return Ce.current.useImperativeHandle(e, t, n);
};
A.useInsertionEffect = function(e, t) {
  return Ce.current.useInsertionEffect(e, t);
};
A.useLayoutEffect = function(e, t) {
  return Ce.current.useLayoutEffect(e, t);
};
A.useMemo = function(e, t) {
  return Ce.current.useMemo(e, t);
};
A.useReducer = function(e, t, n) {
  return Ce.current.useReducer(e, t, n);
};
A.useRef = function(e) {
  return Ce.current.useRef(e);
};
A.useState = function(e) {
  return Ce.current.useState(e);
};
A.useSyncExternalStore = function(e, t, n) {
  return Ce.current.useSyncExternalStore(e, t, n);
};
A.useTransition = function() {
  return Ce.current.useTransition();
};
A.version = "18.3.1";
rd.exports = A;
var Pl = rd.exports;
const se = /* @__PURE__ */ $u(Pl);
var pd = { exports: {} }, Le = {}, fd = { exports: {} }, hd = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(I, R) {
    var F = I.length;
    I.push(R);
    e: for (; 0 < F; ) {
      var N = F - 1 >>> 1, O = I[N];
      if (0 < o(O, R)) I[N] = R, I[F] = O, F = N;
      else break e;
    }
  }
  function n(I) {
    return I.length === 0 ? null : I[0];
  }
  function i(I) {
    if (I.length === 0) return null;
    var R = I[0], F = I.pop();
    if (F !== R) {
      I[0] = F;
      e: for (var N = 0, O = I.length, me = O >>> 1; N < me; ) {
        var ye = 2 * (N + 1) - 1, G = I[ye], L = ye + 1, le = I[L];
        if (0 > o(G, F)) L < O && 0 > o(le, G) ? (I[N] = le, I[L] = F, N = L) : (I[N] = G, I[ye] = F, N = ye);
        else if (L < O && 0 > o(le, F)) I[N] = le, I[L] = F, N = L;
        else break e;
      }
    }
    return R;
  }
  function o(I, R) {
    var F = I.sortIndex - R.sortIndex;
    return F !== 0 ? F : I.id - R.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var l = performance;
    e.unstable_now = function() {
      return l.now();
    };
  } else {
    var s = Date, a = s.now();
    e.unstable_now = function() {
      return s.now() - a;
    };
  }
  var d = [], c = [], p = 1, u = null, h = 3, v = !1, w = !1, f = !1, k = typeof setTimeout == "function" ? setTimeout : null, m = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(I) {
    for (var R = n(c); R !== null; ) {
      if (R.callback === null) i(c);
      else if (R.startTime <= I) i(c), R.sortIndex = R.expirationTime, t(d, R);
      else break;
      R = n(c);
    }
  }
  function x(I) {
    if (f = !1, y(I), !w) if (n(d) !== null) w = !0, B(b);
    else {
      var R = n(c);
      R !== null && U(x, R.startTime - I);
    }
  }
  function b(I, R) {
    w = !1, f && (f = !1, m(C), C = -1), v = !0;
    var F = h;
    try {
      for (y(R), u = n(d); u !== null && (!(u.expirationTime > R) || I && !_()); ) {
        var N = u.callback;
        if (typeof N == "function") {
          u.callback = null, h = u.priorityLevel;
          var O = N(u.expirationTime <= R);
          R = e.unstable_now(), typeof O == "function" ? u.callback = O : u === n(d) && i(d), y(R);
        } else i(d);
        u = n(d);
      }
      if (u !== null) var me = !0;
      else {
        var ye = n(c);
        ye !== null && U(x, ye.startTime - R), me = !1;
      }
      return me;
    } finally {
      u = null, h = F, v = !1;
    }
  }
  var j = !1, S = null, C = -1, $ = 5, T = -1;
  function _() {
    return !(e.unstable_now() - T < $);
  }
  function E() {
    if (S !== null) {
      var I = e.unstable_now();
      T = I;
      var R = !0;
      try {
        R = S(!0, I);
      } finally {
        R ? H() : (j = !1, S = null);
      }
    } else j = !1;
  }
  var H;
  if (typeof g == "function") H = function() {
    g(E);
  };
  else if (typeof MessageChannel < "u") {
    var P = new MessageChannel(), D = P.port2;
    P.port1.onmessage = E, H = function() {
      D.postMessage(null);
    };
  } else H = function() {
    k(E, 0);
  };
  function B(I) {
    S = I, j || (j = !0, H());
  }
  function U(I, R) {
    C = k(function() {
      I(e.unstable_now());
    }, R);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(I) {
    I.callback = null;
  }, e.unstable_continueExecution = function() {
    w || v || (w = !0, B(b));
  }, e.unstable_forceFrameRate = function(I) {
    0 > I || 125 < I ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : $ = 0 < I ? Math.floor(1e3 / I) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(d);
  }, e.unstable_next = function(I) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var R = 3;
        break;
      default:
        R = h;
    }
    var F = h;
    h = R;
    try {
      return I();
    } finally {
      h = F;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(I, R) {
    switch (I) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        I = 3;
    }
    var F = h;
    h = I;
    try {
      return R();
    } finally {
      h = F;
    }
  }, e.unstable_scheduleCallback = function(I, R, F) {
    var N = e.unstable_now();
    switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? N + F : N) : F = N, I) {
      case 1:
        var O = -1;
        break;
      case 2:
        O = 250;
        break;
      case 5:
        O = 1073741823;
        break;
      case 4:
        O = 1e4;
        break;
      default:
        O = 5e3;
    }
    return O = F + O, I = { id: p++, callback: R, priorityLevel: I, startTime: F, expirationTime: O, sortIndex: -1 }, F > N ? (I.sortIndex = F, t(c, I), n(d) === null && I === n(c) && (f ? (m(C), C = -1) : f = !0, U(x, F - N))) : (I.sortIndex = O, t(d, I), w || v || (w = !0, B(b))), I;
  }, e.unstable_shouldYield = _, e.unstable_wrapCallback = function(I) {
    var R = h;
    return function() {
      var F = h;
      h = R;
      try {
        return I.apply(this, arguments);
      } finally {
        h = F;
      }
    };
  };
})(hd);
fd.exports = hd;
var Qu = fd.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yu = Pl, Ne = Qu;
function z(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var gd = /* @__PURE__ */ new Set(), ar = {};
function en(e, t) {
  Sn(e, t), Sn(e + "Capture", t);
}
function Sn(e, t) {
  for (ar[e] = t, e = 0; e < t.length; e++) gd.add(t[e]);
}
var gt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), $o = Object.prototype.hasOwnProperty, Ku = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ns = {}, Ls = {};
function Xu(e) {
  return $o.call(Ls, e) ? !0 : $o.call(Ns, e) ? !1 : Ku.test(e) ? Ls[e] = !0 : (Ns[e] = !0, !1);
}
function qu(e, t, n, i) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return i ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Ju(e, t, n, i) {
  if (t === null || typeof t > "u" || qu(e, t, n, i)) return !0;
  if (i) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function ze(e, t, n, i, o, l, s) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = i, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = l, this.removeEmptyString = s;
}
var ge = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ge[e] = new ze(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ge[t] = new ze(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ge[e] = new ze(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ge[e] = new ze(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ge[e] = new ze(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ge[e] = new ze(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ge[e] = new ze(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ge[e] = new ze(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ge[e] = new ze(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Dl = /[\-:]([a-z])/g;
function Nl(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Dl,
    Nl
  );
  ge[t] = new ze(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Dl, Nl);
  ge[t] = new ze(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Dl, Nl);
  ge[t] = new ze(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ge[e] = new ze(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ge.xlinkHref = new ze("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ge[e] = new ze(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ll(e, t, n, i) {
  var o = ge.hasOwnProperty(t) ? ge[t] : null;
  (o !== null ? o.type !== 0 : i || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Ju(t, n, o, i) && (n = null), i || o === null ? Xu(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : o.mustUseProperty ? e[o.propertyName] = n === null ? o.type === 3 ? !1 : "" : n : (t = o.attributeName, i = o.attributeNamespace, n === null ? e.removeAttribute(t) : (o = o.type, n = o === 3 || o === 4 && n === !0 ? "" : "" + n, i ? e.setAttributeNS(i, t, n) : e.setAttribute(t, n))));
}
var vt = Yu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Er = Symbol.for("react.element"), on = Symbol.for("react.portal"), ln = Symbol.for("react.fragment"), Al = Symbol.for("react.strict_mode"), Mo = Symbol.for("react.profiler"), md = Symbol.for("react.provider"), yd = Symbol.for("react.context"), Ol = Symbol.for("react.forward_ref"), Fo = Symbol.for("react.suspense"), Eo = Symbol.for("react.suspense_list"), Wl = Symbol.for("react.memo"), kt = Symbol.for("react.lazy"), xd = Symbol.for("react.offscreen"), As = Symbol.iterator;
function Ln(e) {
  return e === null || typeof e != "object" ? null : (e = As && e[As] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Z = Object.assign, no;
function Kn(e) {
  if (no === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    no = t && t[1] || "";
  }
  return `
` + no + e;
}
var ro = !1;
function io(e, t) {
  if (!e || ro) return "";
  ro = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (c) {
        var i = c;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (c) {
        i = c;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (c) {
        i = c;
      }
      e();
    }
  } catch (c) {
    if (c && i && typeof c.stack == "string") {
      for (var o = c.stack.split(`
`), l = i.stack.split(`
`), s = o.length - 1, a = l.length - 1; 1 <= s && 0 <= a && o[s] !== l[a]; ) a--;
      for (; 1 <= s && 0 <= a; s--, a--) if (o[s] !== l[a]) {
        if (s !== 1 || a !== 1)
          do
            if (s--, a--, 0 > a || o[s] !== l[a]) {
              var d = `
` + o[s].replace(" at new ", " at ");
              return e.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", e.displayName)), d;
            }
          while (1 <= s && 0 <= a);
        break;
      }
    }
  } finally {
    ro = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Kn(e) : "";
}
function Zu(e) {
  switch (e.tag) {
    case 5:
      return Kn(e.type);
    case 16:
      return Kn("Lazy");
    case 13:
      return Kn("Suspense");
    case 19:
      return Kn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = io(e.type, !1), e;
    case 11:
      return e = io(e.type.render, !1), e;
    case 1:
      return e = io(e.type, !0), e;
    default:
      return "";
  }
}
function Po(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case ln:
      return "Fragment";
    case on:
      return "Portal";
    case Mo:
      return "Profiler";
    case Al:
      return "StrictMode";
    case Fo:
      return "Suspense";
    case Eo:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case yd:
      return (e.displayName || "Context") + ".Consumer";
    case md:
      return (e._context.displayName || "Context") + ".Provider";
    case Ol:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Wl:
      return t = e.displayName || null, t !== null ? t : Po(e.type) || "Memo";
    case kt:
      t = e._payload, e = e._init;
      try {
        return Po(e(t));
      } catch {
      }
  }
  return null;
}
function ep(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Po(t);
    case 8:
      return t === Al ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Pt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function vd(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function tp(e) {
  var t = vd(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), i = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var o = n.get, l = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return o.call(this);
    }, set: function(s) {
      i = "" + s, l.call(this, s);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return i;
    }, setValue: function(s) {
      i = "" + s;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function Pr(e) {
  e._valueTracker || (e._valueTracker = tp(e));
}
function wd(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), i = "";
  return e && (i = vd(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), !0) : !1;
}
function pi(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Do(e, t) {
  var n = t.checked;
  return Z({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Os(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, i = t.checked != null ? t.checked : t.defaultChecked;
  n = Pt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: i, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function kd(e, t) {
  t = t.checked, t != null && Ll(e, "checked", t, !1);
}
function No(e, t) {
  kd(e, t);
  var n = Pt(t.value), i = t.type;
  if (n != null) i === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (i === "submit" || i === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Lo(e, t.type, n) : t.hasOwnProperty("defaultValue") && Lo(e, t.type, Pt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Ws(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var i = t.type;
    if (!(i !== "submit" && i !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Lo(e, t, n) {
  (t !== "number" || pi(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Xn = Array.isArray;
function xn(e, t, n, i) {
  if (e = e.options, t) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++) o = t.hasOwnProperty("$" + e[n].value), e[n].selected !== o && (e[n].selected = o), o && i && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Pt(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        e[o].selected = !0, i && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ao(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(z(91));
  return Z({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Hs(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(z(92));
      if (Xn(n)) {
        if (1 < n.length) throw Error(z(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Pt(n) };
}
function bd(e, t) {
  var n = Pt(t.value), i = Pt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), i != null && (e.defaultValue = "" + i);
}
function Bs(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function jd(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Oo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? jd(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Dr, Sd = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, i, o) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, i, o);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Dr = Dr || document.createElement("div"), Dr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Dr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function dr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Zn = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, np = ["Webkit", "ms", "Moz", "O"];
Object.keys(Zn).forEach(function(e) {
  np.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Zn[t] = Zn[e];
  });
});
function Cd(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Zn.hasOwnProperty(e) && Zn[e] ? ("" + t).trim() : t + "px";
}
function zd(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var i = n.indexOf("--") === 0, o = Cd(n, t[n], i);
    n === "float" && (n = "cssFloat"), i ? e.setProperty(n, o) : e[n] = o;
  }
}
var rp = Z({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Wo(e, t) {
  if (t) {
    if (rp[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(z(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(z(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(z(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(z(62));
  }
}
function Ho(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Bo = null;
function Hl(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Vo = null, vn = null, wn = null;
function Vs(e) {
  if (e = _r(e)) {
    if (typeof Vo != "function") throw Error(z(280));
    var t = e.stateNode;
    t && (t = Bi(t), Vo(e.stateNode, e.type, t));
  }
}
function Td(e) {
  vn ? wn ? wn.push(e) : wn = [e] : vn = e;
}
function _d() {
  if (vn) {
    var e = vn, t = wn;
    if (wn = vn = null, Vs(e), t) for (e = 0; e < t.length; e++) Vs(t[e]);
  }
}
function Rd(e, t) {
  return e(t);
}
function Id() {
}
var oo = !1;
function $d(e, t, n) {
  if (oo) return e(t, n);
  oo = !0;
  try {
    return Rd(e, t, n);
  } finally {
    oo = !1, (vn !== null || wn !== null) && (Id(), _d());
  }
}
function cr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var i = Bi(n);
  if (i === null) return null;
  n = i[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(z(231, t, typeof n));
  return n;
}
var Uo = !1;
if (gt) try {
  var An = {};
  Object.defineProperty(An, "passive", { get: function() {
    Uo = !0;
  } }), window.addEventListener("test", An, An), window.removeEventListener("test", An, An);
} catch {
  Uo = !1;
}
function ip(e, t, n, i, o, l, s, a, d) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (p) {
    this.onError(p);
  }
}
var er = !1, fi = null, hi = !1, Go = null, op = { onError: function(e) {
  er = !0, fi = e;
} };
function lp(e, t, n, i, o, l, s, a, d) {
  er = !1, fi = null, ip.apply(op, arguments);
}
function sp(e, t, n, i, o, l, s, a, d) {
  if (lp.apply(this, arguments), er) {
    if (er) {
      var c = fi;
      er = !1, fi = null;
    } else throw Error(z(198));
    hi || (hi = !0, Go = c);
  }
}
function tn(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Md(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Us(e) {
  if (tn(e) !== e) throw Error(z(188));
}
function ap(e) {
  var t = e.alternate;
  if (!t) {
    if (t = tn(e), t === null) throw Error(z(188));
    return t !== e ? null : e;
  }
  for (var n = e, i = t; ; ) {
    var o = n.return;
    if (o === null) break;
    var l = o.alternate;
    if (l === null) {
      if (i = o.return, i !== null) {
        n = i;
        continue;
      }
      break;
    }
    if (o.child === l.child) {
      for (l = o.child; l; ) {
        if (l === n) return Us(o), e;
        if (l === i) return Us(o), t;
        l = l.sibling;
      }
      throw Error(z(188));
    }
    if (n.return !== i.return) n = o, i = l;
    else {
      for (var s = !1, a = o.child; a; ) {
        if (a === n) {
          s = !0, n = o, i = l;
          break;
        }
        if (a === i) {
          s = !0, i = o, n = l;
          break;
        }
        a = a.sibling;
      }
      if (!s) {
        for (a = l.child; a; ) {
          if (a === n) {
            s = !0, n = l, i = o;
            break;
          }
          if (a === i) {
            s = !0, i = l, n = o;
            break;
          }
          a = a.sibling;
        }
        if (!s) throw Error(z(189));
      }
    }
    if (n.alternate !== i) throw Error(z(190));
  }
  if (n.tag !== 3) throw Error(z(188));
  return n.stateNode.current === n ? e : t;
}
function Fd(e) {
  return e = ap(e), e !== null ? Ed(e) : null;
}
function Ed(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ed(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Pd = Ne.unstable_scheduleCallback, Gs = Ne.unstable_cancelCallback, dp = Ne.unstable_shouldYield, cp = Ne.unstable_requestPaint, re = Ne.unstable_now, up = Ne.unstable_getCurrentPriorityLevel, Bl = Ne.unstable_ImmediatePriority, Dd = Ne.unstable_UserBlockingPriority, gi = Ne.unstable_NormalPriority, pp = Ne.unstable_LowPriority, Nd = Ne.unstable_IdlePriority, Ai = null, st = null;
function fp(e) {
  if (st && typeof st.onCommitFiberRoot == "function") try {
    st.onCommitFiberRoot(Ai, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var et = Math.clz32 ? Math.clz32 : mp, hp = Math.log, gp = Math.LN2;
function mp(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (hp(e) / gp | 0) | 0;
}
var Nr = 64, Lr = 4194304;
function qn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function mi(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var i = 0, o = e.suspendedLanes, l = e.pingedLanes, s = n & 268435455;
  if (s !== 0) {
    var a = s & ~o;
    a !== 0 ? i = qn(a) : (l &= s, l !== 0 && (i = qn(l)));
  } else s = n & ~o, s !== 0 ? i = qn(s) : l !== 0 && (i = qn(l));
  if (i === 0) return 0;
  if (t !== 0 && t !== i && !(t & o) && (o = i & -i, l = t & -t, o >= l || o === 16 && (l & 4194240) !== 0)) return t;
  if (i & 4 && (i |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= i; 0 < t; ) n = 31 - et(t), o = 1 << n, i |= e[n], t &= ~o;
  return i;
}
function yp(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function xp(e, t) {
  for (var n = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, l = e.pendingLanes; 0 < l; ) {
    var s = 31 - et(l), a = 1 << s, d = o[s];
    d === -1 ? (!(a & n) || a & i) && (o[s] = yp(a, t)) : d <= t && (e.expiredLanes |= a), l &= ~a;
  }
}
function Qo(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ld() {
  var e = Nr;
  return Nr <<= 1, !(Nr & 4194240) && (Nr = 64), e;
}
function lo(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function zr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - et(t), e[t] = n;
}
function vp(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var i = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - et(n), l = 1 << o;
    t[o] = 0, i[o] = -1, e[o] = -1, n &= ~l;
  }
}
function Vl(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var i = 31 - et(n), o = 1 << i;
    o & t | e[i] & t && (e[i] |= t), n &= ~o;
  }
}
var V = 0;
function Ad(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Od, Ul, Wd, Hd, Bd, Yo = !1, Ar = [], Tt = null, _t = null, Rt = null, ur = /* @__PURE__ */ new Map(), pr = /* @__PURE__ */ new Map(), jt = [], wp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Qs(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Tt = null;
      break;
    case "dragenter":
    case "dragleave":
      _t = null;
      break;
    case "mouseover":
    case "mouseout":
      Rt = null;
      break;
    case "pointerover":
    case "pointerout":
      ur.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      pr.delete(t.pointerId);
  }
}
function On(e, t, n, i, o, l) {
  return e === null || e.nativeEvent !== l ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: i, nativeEvent: l, targetContainers: [o] }, t !== null && (t = _r(t), t !== null && Ul(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
}
function kp(e, t, n, i, o) {
  switch (t) {
    case "focusin":
      return Tt = On(Tt, e, t, n, i, o), !0;
    case "dragenter":
      return _t = On(_t, e, t, n, i, o), !0;
    case "mouseover":
      return Rt = On(Rt, e, t, n, i, o), !0;
    case "pointerover":
      var l = o.pointerId;
      return ur.set(l, On(ur.get(l) || null, e, t, n, i, o)), !0;
    case "gotpointercapture":
      return l = o.pointerId, pr.set(l, On(pr.get(l) || null, e, t, n, i, o)), !0;
  }
  return !1;
}
function Vd(e) {
  var t = Vt(e.target);
  if (t !== null) {
    var n = tn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Md(n), t !== null) {
          e.blockedOn = t, Bd(e.priority, function() {
            Wd(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function ti(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ko(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var i = new n.constructor(n.type, n);
      Bo = i, n.target.dispatchEvent(i), Bo = null;
    } else return t = _r(n), t !== null && Ul(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Ys(e, t, n) {
  ti(e) && n.delete(t);
}
function bp() {
  Yo = !1, Tt !== null && ti(Tt) && (Tt = null), _t !== null && ti(_t) && (_t = null), Rt !== null && ti(Rt) && (Rt = null), ur.forEach(Ys), pr.forEach(Ys);
}
function Wn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Yo || (Yo = !0, Ne.unstable_scheduleCallback(Ne.unstable_NormalPriority, bp)));
}
function fr(e) {
  function t(o) {
    return Wn(o, e);
  }
  if (0 < Ar.length) {
    Wn(Ar[0], e);
    for (var n = 1; n < Ar.length; n++) {
      var i = Ar[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
  }
  for (Tt !== null && Wn(Tt, e), _t !== null && Wn(_t, e), Rt !== null && Wn(Rt, e), ur.forEach(t), pr.forEach(t), n = 0; n < jt.length; n++) i = jt[n], i.blockedOn === e && (i.blockedOn = null);
  for (; 0 < jt.length && (n = jt[0], n.blockedOn === null); ) Vd(n), n.blockedOn === null && jt.shift();
}
var kn = vt.ReactCurrentBatchConfig, yi = !0;
function jp(e, t, n, i) {
  var o = V, l = kn.transition;
  kn.transition = null;
  try {
    V = 1, Gl(e, t, n, i);
  } finally {
    V = o, kn.transition = l;
  }
}
function Sp(e, t, n, i) {
  var o = V, l = kn.transition;
  kn.transition = null;
  try {
    V = 4, Gl(e, t, n, i);
  } finally {
    V = o, kn.transition = l;
  }
}
function Gl(e, t, n, i) {
  if (yi) {
    var o = Ko(e, t, n, i);
    if (o === null) yo(e, t, i, xi, n), Qs(e, i);
    else if (kp(o, e, t, n, i)) i.stopPropagation();
    else if (Qs(e, i), t & 4 && -1 < wp.indexOf(e)) {
      for (; o !== null; ) {
        var l = _r(o);
        if (l !== null && Od(l), l = Ko(e, t, n, i), l === null && yo(e, t, i, xi, n), l === o) break;
        o = l;
      }
      o !== null && i.stopPropagation();
    } else yo(e, t, i, null, n);
  }
}
var xi = null;
function Ko(e, t, n, i) {
  if (xi = null, e = Hl(i), e = Vt(e), e !== null) if (t = tn(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Md(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return xi = e, null;
}
function Ud(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (up()) {
        case Bl:
          return 1;
        case Dd:
          return 4;
        case gi:
        case pp:
          return 16;
        case Nd:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Ct = null, Ql = null, ni = null;
function Gd() {
  if (ni) return ni;
  var e, t = Ql, n = t.length, i, o = "value" in Ct ? Ct.value : Ct.textContent, l = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++) ;
  var s = n - e;
  for (i = 1; i <= s && t[n - i] === o[l - i]; i++) ;
  return ni = o.slice(e, 1 < i ? 1 - i : void 0);
}
function ri(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Or() {
  return !0;
}
function Ks() {
  return !1;
}
function Ae(e) {
  function t(n, i, o, l, s) {
    this._reactName = n, this._targetInst = o, this.type = i, this.nativeEvent = l, this.target = s, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(l) : l[a]);
    return this.isDefaultPrevented = (l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1) ? Or : Ks, this.isPropagationStopped = Ks, this;
  }
  return Z(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Or);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Or);
  }, persist: function() {
  }, isPersistent: Or }), t;
}
var Fn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Yl = Ae(Fn), Tr = Z({}, Fn, { view: 0, detail: 0 }), Cp = Ae(Tr), so, ao, Hn, Oi = Z({}, Tr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Kl, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Hn && (Hn && e.type === "mousemove" ? (so = e.screenX - Hn.screenX, ao = e.screenY - Hn.screenY) : ao = so = 0, Hn = e), so);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : ao;
} }), Xs = Ae(Oi), zp = Z({}, Oi, { dataTransfer: 0 }), Tp = Ae(zp), _p = Z({}, Tr, { relatedTarget: 0 }), co = Ae(_p), Rp = Z({}, Fn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Ip = Ae(Rp), $p = Z({}, Fn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Mp = Ae($p), Fp = Z({}, Fn, { data: 0 }), qs = Ae(Fp), Ep = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Pp = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Dp = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Np(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Dp[e]) ? !!t[e] : !1;
}
function Kl() {
  return Np;
}
var Lp = Z({}, Tr, { key: function(e) {
  if (e.key) {
    var t = Ep[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = ri(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Pp[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Kl, charCode: function(e) {
  return e.type === "keypress" ? ri(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? ri(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Ap = Ae(Lp), Op = Z({}, Oi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Js = Ae(Op), Wp = Z({}, Tr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Kl }), Hp = Ae(Wp), Bp = Z({}, Fn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Vp = Ae(Bp), Up = Z({}, Oi, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Gp = Ae(Up), Qp = [9, 13, 27, 32], Xl = gt && "CompositionEvent" in window, tr = null;
gt && "documentMode" in document && (tr = document.documentMode);
var Yp = gt && "TextEvent" in window && !tr, Qd = gt && (!Xl || tr && 8 < tr && 11 >= tr), Zs = " ", ea = !1;
function Yd(e, t) {
  switch (e) {
    case "keyup":
      return Qp.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Kd(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var sn = !1;
function Kp(e, t) {
  switch (e) {
    case "compositionend":
      return Kd(t);
    case "keypress":
      return t.which !== 32 ? null : (ea = !0, Zs);
    case "textInput":
      return e = t.data, e === Zs && ea ? null : e;
    default:
      return null;
  }
}
function Xp(e, t) {
  if (sn) return e === "compositionend" || !Xl && Yd(e, t) ? (e = Gd(), ni = Ql = Ct = null, sn = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Qd && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var qp = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function ta(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!qp[e.type] : t === "textarea";
}
function Xd(e, t, n, i) {
  Td(i), t = vi(t, "onChange"), 0 < t.length && (n = new Yl("onChange", "change", null, n, i), e.push({ event: n, listeners: t }));
}
var nr = null, hr = null;
function Jp(e) {
  sc(e, 0);
}
function Wi(e) {
  var t = cn(e);
  if (wd(t)) return e;
}
function Zp(e, t) {
  if (e === "change") return t;
}
var qd = !1;
if (gt) {
  var uo;
  if (gt) {
    var po = "oninput" in document;
    if (!po) {
      var na = document.createElement("div");
      na.setAttribute("oninput", "return;"), po = typeof na.oninput == "function";
    }
    uo = po;
  } else uo = !1;
  qd = uo && (!document.documentMode || 9 < document.documentMode);
}
function ra() {
  nr && (nr.detachEvent("onpropertychange", Jd), hr = nr = null);
}
function Jd(e) {
  if (e.propertyName === "value" && Wi(hr)) {
    var t = [];
    Xd(t, hr, e, Hl(e)), $d(Jp, t);
  }
}
function ef(e, t, n) {
  e === "focusin" ? (ra(), nr = t, hr = n, nr.attachEvent("onpropertychange", Jd)) : e === "focusout" && ra();
}
function tf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Wi(hr);
}
function nf(e, t) {
  if (e === "click") return Wi(t);
}
function rf(e, t) {
  if (e === "input" || e === "change") return Wi(t);
}
function of(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var nt = typeof Object.is == "function" ? Object.is : of;
function gr(e, t) {
  if (nt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), i = Object.keys(t);
  if (n.length !== i.length) return !1;
  for (i = 0; i < n.length; i++) {
    var o = n[i];
    if (!$o.call(t, o) || !nt(e[o], t[o])) return !1;
  }
  return !0;
}
function ia(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function oa(e, t) {
  var n = ia(e);
  e = 0;
  for (var i; n; ) {
    if (n.nodeType === 3) {
      if (i = e + n.textContent.length, e <= t && i >= t) return { node: n, offset: t - e };
      e = i;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = ia(n);
  }
}
function Zd(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Zd(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function ec() {
  for (var e = window, t = pi(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = pi(e.document);
  }
  return t;
}
function ql(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function lf(e) {
  var t = ec(), n = e.focusedElem, i = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Zd(n.ownerDocument.documentElement, n)) {
    if (i !== null && ql(n)) {
      if (t = i.start, e = i.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var o = n.textContent.length, l = Math.min(i.start, o);
        i = i.end === void 0 ? l : Math.min(i.end, o), !e.extend && l > i && (o = i, i = l, l = o), o = oa(n, l);
        var s = oa(
          n,
          i
        );
        o && s && (e.rangeCount !== 1 || e.anchorNode !== o.node || e.anchorOffset !== o.offset || e.focusNode !== s.node || e.focusOffset !== s.offset) && (t = t.createRange(), t.setStart(o.node, o.offset), e.removeAllRanges(), l > i ? (e.addRange(t), e.extend(s.node, s.offset)) : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var sf = gt && "documentMode" in document && 11 >= document.documentMode, an = null, Xo = null, rr = null, qo = !1;
function la(e, t, n) {
  var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  qo || an == null || an !== pi(i) || (i = an, "selectionStart" in i && ql(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = { anchorNode: i.anchorNode, anchorOffset: i.anchorOffset, focusNode: i.focusNode, focusOffset: i.focusOffset }), rr && gr(rr, i) || (rr = i, i = vi(Xo, "onSelect"), 0 < i.length && (t = new Yl("onSelect", "select", null, t, n), e.push({ event: t, listeners: i }), t.target = an)));
}
function Wr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var dn = { animationend: Wr("Animation", "AnimationEnd"), animationiteration: Wr("Animation", "AnimationIteration"), animationstart: Wr("Animation", "AnimationStart"), transitionend: Wr("Transition", "TransitionEnd") }, fo = {}, tc = {};
gt && (tc = document.createElement("div").style, "AnimationEvent" in window || (delete dn.animationend.animation, delete dn.animationiteration.animation, delete dn.animationstart.animation), "TransitionEvent" in window || delete dn.transitionend.transition);
function Hi(e) {
  if (fo[e]) return fo[e];
  if (!dn[e]) return e;
  var t = dn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in tc) return fo[e] = t[n];
  return e;
}
var nc = Hi("animationend"), rc = Hi("animationiteration"), ic = Hi("animationstart"), oc = Hi("transitionend"), lc = /* @__PURE__ */ new Map(), sa = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Nt(e, t) {
  lc.set(e, t), en(t, [e]);
}
for (var ho = 0; ho < sa.length; ho++) {
  var go = sa[ho], af = go.toLowerCase(), df = go[0].toUpperCase() + go.slice(1);
  Nt(af, "on" + df);
}
Nt(nc, "onAnimationEnd");
Nt(rc, "onAnimationIteration");
Nt(ic, "onAnimationStart");
Nt("dblclick", "onDoubleClick");
Nt("focusin", "onFocus");
Nt("focusout", "onBlur");
Nt(oc, "onTransitionEnd");
Sn("onMouseEnter", ["mouseout", "mouseover"]);
Sn("onMouseLeave", ["mouseout", "mouseover"]);
Sn("onPointerEnter", ["pointerout", "pointerover"]);
Sn("onPointerLeave", ["pointerout", "pointerover"]);
en("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
en("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
en("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
en("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
en("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
en("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Jn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), cf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Jn));
function aa(e, t, n) {
  var i = e.type || "unknown-event";
  e.currentTarget = n, sp(i, t, void 0, e), e.currentTarget = null;
}
function sc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var i = e[n], o = i.event;
    i = i.listeners;
    e: {
      var l = void 0;
      if (t) for (var s = i.length - 1; 0 <= s; s--) {
        var a = i[s], d = a.instance, c = a.currentTarget;
        if (a = a.listener, d !== l && o.isPropagationStopped()) break e;
        aa(o, a, c), l = d;
      }
      else for (s = 0; s < i.length; s++) {
        if (a = i[s], d = a.instance, c = a.currentTarget, a = a.listener, d !== l && o.isPropagationStopped()) break e;
        aa(o, a, c), l = d;
      }
    }
  }
  if (hi) throw e = Go, hi = !1, Go = null, e;
}
function Y(e, t) {
  var n = t[nl];
  n === void 0 && (n = t[nl] = /* @__PURE__ */ new Set());
  var i = e + "__bubble";
  n.has(i) || (ac(t, e, 2, !1), n.add(i));
}
function mo(e, t, n) {
  var i = 0;
  t && (i |= 4), ac(n, e, i, t);
}
var Hr = "_reactListening" + Math.random().toString(36).slice(2);
function mr(e) {
  if (!e[Hr]) {
    e[Hr] = !0, gd.forEach(function(n) {
      n !== "selectionchange" && (cf.has(n) || mo(n, !1, e), mo(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Hr] || (t[Hr] = !0, mo("selectionchange", !1, t));
  }
}
function ac(e, t, n, i) {
  switch (Ud(t)) {
    case 1:
      var o = jp;
      break;
    case 4:
      o = Sp;
      break;
    default:
      o = Gl;
  }
  n = o.bind(null, t, n, e), o = void 0, !Uo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), i ? o !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: o }) : e.addEventListener(t, n, !0) : o !== void 0 ? e.addEventListener(t, n, { passive: o }) : e.addEventListener(t, n, !1);
}
function yo(e, t, n, i, o) {
  var l = i;
  if (!(t & 1) && !(t & 2) && i !== null) e: for (; ; ) {
    if (i === null) return;
    var s = i.tag;
    if (s === 3 || s === 4) {
      var a = i.stateNode.containerInfo;
      if (a === o || a.nodeType === 8 && a.parentNode === o) break;
      if (s === 4) for (s = i.return; s !== null; ) {
        var d = s.tag;
        if ((d === 3 || d === 4) && (d = s.stateNode.containerInfo, d === o || d.nodeType === 8 && d.parentNode === o)) return;
        s = s.return;
      }
      for (; a !== null; ) {
        if (s = Vt(a), s === null) return;
        if (d = s.tag, d === 5 || d === 6) {
          i = l = s;
          continue e;
        }
        a = a.parentNode;
      }
    }
    i = i.return;
  }
  $d(function() {
    var c = l, p = Hl(n), u = [];
    e: {
      var h = lc.get(e);
      if (h !== void 0) {
        var v = Yl, w = e;
        switch (e) {
          case "keypress":
            if (ri(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = Ap;
            break;
          case "focusin":
            w = "focus", v = co;
            break;
          case "focusout":
            w = "blur", v = co;
            break;
          case "beforeblur":
          case "afterblur":
            v = co;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Xs;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Tp;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = Hp;
            break;
          case nc:
          case rc:
          case ic:
            v = Ip;
            break;
          case oc:
            v = Vp;
            break;
          case "scroll":
            v = Cp;
            break;
          case "wheel":
            v = Gp;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Mp;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Js;
        }
        var f = (t & 4) !== 0, k = !f && e === "scroll", m = f ? h !== null ? h + "Capture" : null : h;
        f = [];
        for (var g = c, y; g !== null; ) {
          y = g;
          var x = y.stateNode;
          if (y.tag === 5 && x !== null && (y = x, m !== null && (x = cr(g, m), x != null && f.push(yr(g, x, y)))), k) break;
          g = g.return;
        }
        0 < f.length && (h = new v(h, w, null, n, p), u.push({ event: h, listeners: f }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", h && n !== Bo && (w = n.relatedTarget || n.fromElement) && (Vt(w) || w[mt])) break e;
        if ((v || h) && (h = p.window === p ? p : (h = p.ownerDocument) ? h.defaultView || h.parentWindow : window, v ? (w = n.relatedTarget || n.toElement, v = c, w = w ? Vt(w) : null, w !== null && (k = tn(w), w !== k || w.tag !== 5 && w.tag !== 6) && (w = null)) : (v = null, w = c), v !== w)) {
          if (f = Xs, x = "onMouseLeave", m = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (f = Js, x = "onPointerLeave", m = "onPointerEnter", g = "pointer"), k = v == null ? h : cn(v), y = w == null ? h : cn(w), h = new f(x, g + "leave", v, n, p), h.target = k, h.relatedTarget = y, x = null, Vt(p) === c && (f = new f(m, g + "enter", w, n, p), f.target = y, f.relatedTarget = k, x = f), k = x, v && w) t: {
            for (f = v, m = w, g = 0, y = f; y; y = rn(y)) g++;
            for (y = 0, x = m; x; x = rn(x)) y++;
            for (; 0 < g - y; ) f = rn(f), g--;
            for (; 0 < y - g; ) m = rn(m), y--;
            for (; g--; ) {
              if (f === m || m !== null && f === m.alternate) break t;
              f = rn(f), m = rn(m);
            }
            f = null;
          }
          else f = null;
          v !== null && da(u, h, v, f, !1), w !== null && k !== null && da(u, k, w, f, !0);
        }
      }
      e: {
        if (h = c ? cn(c) : window, v = h.nodeName && h.nodeName.toLowerCase(), v === "select" || v === "input" && h.type === "file") var b = Zp;
        else if (ta(h)) if (qd) b = rf;
        else {
          b = tf;
          var j = ef;
        }
        else (v = h.nodeName) && v.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (b = nf);
        if (b && (b = b(e, c))) {
          Xd(u, b, n, p);
          break e;
        }
        j && j(e, h, c), e === "focusout" && (j = h._wrapperState) && j.controlled && h.type === "number" && Lo(h, "number", h.value);
      }
      switch (j = c ? cn(c) : window, e) {
        case "focusin":
          (ta(j) || j.contentEditable === "true") && (an = j, Xo = c, rr = null);
          break;
        case "focusout":
          rr = Xo = an = null;
          break;
        case "mousedown":
          qo = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          qo = !1, la(u, n, p);
          break;
        case "selectionchange":
          if (sf) break;
        case "keydown":
        case "keyup":
          la(u, n, p);
      }
      var S;
      if (Xl) e: {
        switch (e) {
          case "compositionstart":
            var C = "onCompositionStart";
            break e;
          case "compositionend":
            C = "onCompositionEnd";
            break e;
          case "compositionupdate":
            C = "onCompositionUpdate";
            break e;
        }
        C = void 0;
      }
      else sn ? Yd(e, n) && (C = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (C = "onCompositionStart");
      C && (Qd && n.locale !== "ko" && (sn || C !== "onCompositionStart" ? C === "onCompositionEnd" && sn && (S = Gd()) : (Ct = p, Ql = "value" in Ct ? Ct.value : Ct.textContent, sn = !0)), j = vi(c, C), 0 < j.length && (C = new qs(C, e, null, n, p), u.push({ event: C, listeners: j }), S ? C.data = S : (S = Kd(n), S !== null && (C.data = S)))), (S = Yp ? Kp(e, n) : Xp(e, n)) && (c = vi(c, "onBeforeInput"), 0 < c.length && (p = new qs("onBeforeInput", "beforeinput", null, n, p), u.push({ event: p, listeners: c }), p.data = S));
    }
    sc(u, t);
  });
}
function yr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function vi(e, t) {
  for (var n = t + "Capture", i = []; e !== null; ) {
    var o = e, l = o.stateNode;
    o.tag === 5 && l !== null && (o = l, l = cr(e, n), l != null && i.unshift(yr(e, l, o)), l = cr(e, t), l != null && i.push(yr(e, l, o))), e = e.return;
  }
  return i;
}
function rn(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function da(e, t, n, i, o) {
  for (var l = t._reactName, s = []; n !== null && n !== i; ) {
    var a = n, d = a.alternate, c = a.stateNode;
    if (d !== null && d === i) break;
    a.tag === 5 && c !== null && (a = c, o ? (d = cr(n, l), d != null && s.unshift(yr(n, d, a))) : o || (d = cr(n, l), d != null && s.push(yr(n, d, a)))), n = n.return;
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var uf = /\r\n?/g, pf = /\u0000|\uFFFD/g;
function ca(e) {
  return (typeof e == "string" ? e : "" + e).replace(uf, `
`).replace(pf, "");
}
function Br(e, t, n) {
  if (t = ca(t), ca(e) !== t && n) throw Error(z(425));
}
function wi() {
}
var Jo = null, Zo = null;
function el(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var tl = typeof setTimeout == "function" ? setTimeout : void 0, ff = typeof clearTimeout == "function" ? clearTimeout : void 0, ua = typeof Promise == "function" ? Promise : void 0, hf = typeof queueMicrotask == "function" ? queueMicrotask : typeof ua < "u" ? function(e) {
  return ua.resolve(null).then(e).catch(gf);
} : tl;
function gf(e) {
  setTimeout(function() {
    throw e;
  });
}
function xo(e, t) {
  var n = t, i = 0;
  do {
    var o = n.nextSibling;
    if (e.removeChild(n), o && o.nodeType === 8) if (n = o.data, n === "/$") {
      if (i === 0) {
        e.removeChild(o), fr(t);
        return;
      }
      i--;
    } else n !== "$" && n !== "$?" && n !== "$!" || i++;
    n = o;
  } while (n);
  fr(t);
}
function It(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function pa(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var En = Math.random().toString(36).slice(2), ot = "__reactFiber$" + En, xr = "__reactProps$" + En, mt = "__reactContainer$" + En, nl = "__reactEvents$" + En, mf = "__reactListeners$" + En, yf = "__reactHandles$" + En;
function Vt(e) {
  var t = e[ot];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[mt] || n[ot]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = pa(e); e !== null; ) {
        if (n = e[ot]) return n;
        e = pa(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function _r(e) {
  return e = e[ot] || e[mt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function cn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(z(33));
}
function Bi(e) {
  return e[xr] || null;
}
var rl = [], un = -1;
function Lt(e) {
  return { current: e };
}
function K(e) {
  0 > un || (e.current = rl[un], rl[un] = null, un--);
}
function Q(e, t) {
  un++, rl[un] = e.current, e.current = t;
}
var Dt = {}, be = Lt(Dt), Ie = Lt(!1), Kt = Dt;
function Cn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Dt;
  var i = e.stateNode;
  if (i && i.__reactInternalMemoizedUnmaskedChildContext === t) return i.__reactInternalMemoizedMaskedChildContext;
  var o = {}, l;
  for (l in n) o[l] = t[l];
  return i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = o), o;
}
function $e(e) {
  return e = e.childContextTypes, e != null;
}
function ki() {
  K(Ie), K(be);
}
function fa(e, t, n) {
  if (be.current !== Dt) throw Error(z(168));
  Q(be, t), Q(Ie, n);
}
function dc(e, t, n) {
  var i = e.stateNode;
  if (t = t.childContextTypes, typeof i.getChildContext != "function") return n;
  i = i.getChildContext();
  for (var o in i) if (!(o in t)) throw Error(z(108, ep(e) || "Unknown", o));
  return Z({}, n, i);
}
function bi(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Dt, Kt = be.current, Q(be, e), Q(Ie, Ie.current), !0;
}
function ha(e, t, n) {
  var i = e.stateNode;
  if (!i) throw Error(z(169));
  n ? (e = dc(e, t, Kt), i.__reactInternalMemoizedMergedChildContext = e, K(Ie), K(be), Q(be, e)) : K(Ie), Q(Ie, n);
}
var ut = null, Vi = !1, vo = !1;
function cc(e) {
  ut === null ? ut = [e] : ut.push(e);
}
function xf(e) {
  Vi = !0, cc(e);
}
function At() {
  if (!vo && ut !== null) {
    vo = !0;
    var e = 0, t = V;
    try {
      var n = ut;
      for (V = 1; e < n.length; e++) {
        var i = n[e];
        do
          i = i(!0);
        while (i !== null);
      }
      ut = null, Vi = !1;
    } catch (o) {
      throw ut !== null && (ut = ut.slice(e + 1)), Pd(Bl, At), o;
    } finally {
      V = t, vo = !1;
    }
  }
  return null;
}
var pn = [], fn = 0, ji = null, Si = 0, Be = [], Ve = 0, Xt = null, pt = 1, ft = "";
function Wt(e, t) {
  pn[fn++] = Si, pn[fn++] = ji, ji = e, Si = t;
}
function uc(e, t, n) {
  Be[Ve++] = pt, Be[Ve++] = ft, Be[Ve++] = Xt, Xt = e;
  var i = pt;
  e = ft;
  var o = 32 - et(i) - 1;
  i &= ~(1 << o), n += 1;
  var l = 32 - et(t) + o;
  if (30 < l) {
    var s = o - o % 5;
    l = (i & (1 << s) - 1).toString(32), i >>= s, o -= s, pt = 1 << 32 - et(t) + o | n << o | i, ft = l + e;
  } else pt = 1 << l | n << o | i, ft = e;
}
function Jl(e) {
  e.return !== null && (Wt(e, 1), uc(e, 1, 0));
}
function Zl(e) {
  for (; e === ji; ) ji = pn[--fn], pn[fn] = null, Si = pn[--fn], pn[fn] = null;
  for (; e === Xt; ) Xt = Be[--Ve], Be[Ve] = null, ft = Be[--Ve], Be[Ve] = null, pt = Be[--Ve], Be[Ve] = null;
}
var De = null, Pe = null, X = !1, Ze = null;
function pc(e, t) {
  var n = Ue(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function ga(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, De = e, Pe = It(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, De = e, Pe = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Xt !== null ? { id: pt, overflow: ft } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ue(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, De = e, Pe = null, !0) : !1;
    default:
      return !1;
  }
}
function il(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ol(e) {
  if (X) {
    var t = Pe;
    if (t) {
      var n = t;
      if (!ga(e, t)) {
        if (il(e)) throw Error(z(418));
        t = It(n.nextSibling);
        var i = De;
        t && ga(e, t) ? pc(i, n) : (e.flags = e.flags & -4097 | 2, X = !1, De = e);
      }
    } else {
      if (il(e)) throw Error(z(418));
      e.flags = e.flags & -4097 | 2, X = !1, De = e;
    }
  }
}
function ma(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  De = e;
}
function Vr(e) {
  if (e !== De) return !1;
  if (!X) return ma(e), X = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !el(e.type, e.memoizedProps)), t && (t = Pe)) {
    if (il(e)) throw fc(), Error(z(418));
    for (; t; ) pc(e, t), t = It(t.nextSibling);
  }
  if (ma(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(z(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Pe = It(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Pe = null;
    }
  } else Pe = De ? It(e.stateNode.nextSibling) : null;
  return !0;
}
function fc() {
  for (var e = Pe; e; ) e = It(e.nextSibling);
}
function zn() {
  Pe = De = null, X = !1;
}
function es(e) {
  Ze === null ? Ze = [e] : Ze.push(e);
}
var vf = vt.ReactCurrentBatchConfig;
function Bn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(z(309));
        var i = n.stateNode;
      }
      if (!i) throw Error(z(147, e));
      var o = i, l = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === l ? t.ref : (t = function(s) {
        var a = o.refs;
        s === null ? delete a[l] : a[l] = s;
      }, t._stringRef = l, t);
    }
    if (typeof e != "string") throw Error(z(284));
    if (!n._owner) throw Error(z(290, e));
  }
  return e;
}
function Ur(e, t) {
  throw e = Object.prototype.toString.call(t), Error(z(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function ya(e) {
  var t = e._init;
  return t(e._payload);
}
function hc(e) {
  function t(m, g) {
    if (e) {
      var y = m.deletions;
      y === null ? (m.deletions = [g], m.flags |= 16) : y.push(g);
    }
  }
  function n(m, g) {
    if (!e) return null;
    for (; g !== null; ) t(m, g), g = g.sibling;
    return null;
  }
  function i(m, g) {
    for (m = /* @__PURE__ */ new Map(); g !== null; ) g.key !== null ? m.set(g.key, g) : m.set(g.index, g), g = g.sibling;
    return m;
  }
  function o(m, g) {
    return m = Et(m, g), m.index = 0, m.sibling = null, m;
  }
  function l(m, g, y) {
    return m.index = y, e ? (y = m.alternate, y !== null ? (y = y.index, y < g ? (m.flags |= 2, g) : y) : (m.flags |= 2, g)) : (m.flags |= 1048576, g);
  }
  function s(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function a(m, g, y, x) {
    return g === null || g.tag !== 6 ? (g = zo(y, m.mode, x), g.return = m, g) : (g = o(g, y), g.return = m, g);
  }
  function d(m, g, y, x) {
    var b = y.type;
    return b === ln ? p(m, g, y.props.children, x, y.key) : g !== null && (g.elementType === b || typeof b == "object" && b !== null && b.$$typeof === kt && ya(b) === g.type) ? (x = o(g, y.props), x.ref = Bn(m, g, y), x.return = m, x) : (x = ci(y.type, y.key, y.props, null, m.mode, x), x.ref = Bn(m, g, y), x.return = m, x);
  }
  function c(m, g, y, x) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== y.containerInfo || g.stateNode.implementation !== y.implementation ? (g = To(y, m.mode, x), g.return = m, g) : (g = o(g, y.children || []), g.return = m, g);
  }
  function p(m, g, y, x, b) {
    return g === null || g.tag !== 7 ? (g = Yt(y, m.mode, x, b), g.return = m, g) : (g = o(g, y), g.return = m, g);
  }
  function u(m, g, y) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return g = zo("" + g, m.mode, y), g.return = m, g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Er:
          return y = ci(g.type, g.key, g.props, null, m.mode, y), y.ref = Bn(m, null, g), y.return = m, y;
        case on:
          return g = To(g, m.mode, y), g.return = m, g;
        case kt:
          var x = g._init;
          return u(m, x(g._payload), y);
      }
      if (Xn(g) || Ln(g)) return g = Yt(g, m.mode, y, null), g.return = m, g;
      Ur(m, g);
    }
    return null;
  }
  function h(m, g, y, x) {
    var b = g !== null ? g.key : null;
    if (typeof y == "string" && y !== "" || typeof y == "number") return b !== null ? null : a(m, g, "" + y, x);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Er:
          return y.key === b ? d(m, g, y, x) : null;
        case on:
          return y.key === b ? c(m, g, y, x) : null;
        case kt:
          return b = y._init, h(
            m,
            g,
            b(y._payload),
            x
          );
      }
      if (Xn(y) || Ln(y)) return b !== null ? null : p(m, g, y, x, null);
      Ur(m, y);
    }
    return null;
  }
  function v(m, g, y, x, b) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return m = m.get(y) || null, a(g, m, "" + x, b);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Er:
          return m = m.get(x.key === null ? y : x.key) || null, d(g, m, x, b);
        case on:
          return m = m.get(x.key === null ? y : x.key) || null, c(g, m, x, b);
        case kt:
          var j = x._init;
          return v(m, g, y, j(x._payload), b);
      }
      if (Xn(x) || Ln(x)) return m = m.get(y) || null, p(g, m, x, b, null);
      Ur(g, x);
    }
    return null;
  }
  function w(m, g, y, x) {
    for (var b = null, j = null, S = g, C = g = 0, $ = null; S !== null && C < y.length; C++) {
      S.index > C ? ($ = S, S = null) : $ = S.sibling;
      var T = h(m, S, y[C], x);
      if (T === null) {
        S === null && (S = $);
        break;
      }
      e && S && T.alternate === null && t(m, S), g = l(T, g, C), j === null ? b = T : j.sibling = T, j = T, S = $;
    }
    if (C === y.length) return n(m, S), X && Wt(m, C), b;
    if (S === null) {
      for (; C < y.length; C++) S = u(m, y[C], x), S !== null && (g = l(S, g, C), j === null ? b = S : j.sibling = S, j = S);
      return X && Wt(m, C), b;
    }
    for (S = i(m, S); C < y.length; C++) $ = v(S, m, C, y[C], x), $ !== null && (e && $.alternate !== null && S.delete($.key === null ? C : $.key), g = l($, g, C), j === null ? b = $ : j.sibling = $, j = $);
    return e && S.forEach(function(_) {
      return t(m, _);
    }), X && Wt(m, C), b;
  }
  function f(m, g, y, x) {
    var b = Ln(y);
    if (typeof b != "function") throw Error(z(150));
    if (y = b.call(y), y == null) throw Error(z(151));
    for (var j = b = null, S = g, C = g = 0, $ = null, T = y.next(); S !== null && !T.done; C++, T = y.next()) {
      S.index > C ? ($ = S, S = null) : $ = S.sibling;
      var _ = h(m, S, T.value, x);
      if (_ === null) {
        S === null && (S = $);
        break;
      }
      e && S && _.alternate === null && t(m, S), g = l(_, g, C), j === null ? b = _ : j.sibling = _, j = _, S = $;
    }
    if (T.done) return n(
      m,
      S
    ), X && Wt(m, C), b;
    if (S === null) {
      for (; !T.done; C++, T = y.next()) T = u(m, T.value, x), T !== null && (g = l(T, g, C), j === null ? b = T : j.sibling = T, j = T);
      return X && Wt(m, C), b;
    }
    for (S = i(m, S); !T.done; C++, T = y.next()) T = v(S, m, C, T.value, x), T !== null && (e && T.alternate !== null && S.delete(T.key === null ? C : T.key), g = l(T, g, C), j === null ? b = T : j.sibling = T, j = T);
    return e && S.forEach(function(E) {
      return t(m, E);
    }), X && Wt(m, C), b;
  }
  function k(m, g, y, x) {
    if (typeof y == "object" && y !== null && y.type === ln && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Er:
          e: {
            for (var b = y.key, j = g; j !== null; ) {
              if (j.key === b) {
                if (b = y.type, b === ln) {
                  if (j.tag === 7) {
                    n(m, j.sibling), g = o(j, y.props.children), g.return = m, m = g;
                    break e;
                  }
                } else if (j.elementType === b || typeof b == "object" && b !== null && b.$$typeof === kt && ya(b) === j.type) {
                  n(m, j.sibling), g = o(j, y.props), g.ref = Bn(m, j, y), g.return = m, m = g;
                  break e;
                }
                n(m, j);
                break;
              } else t(m, j);
              j = j.sibling;
            }
            y.type === ln ? (g = Yt(y.props.children, m.mode, x, y.key), g.return = m, m = g) : (x = ci(y.type, y.key, y.props, null, m.mode, x), x.ref = Bn(m, g, y), x.return = m, m = x);
          }
          return s(m);
        case on:
          e: {
            for (j = y.key; g !== null; ) {
              if (g.key === j) if (g.tag === 4 && g.stateNode.containerInfo === y.containerInfo && g.stateNode.implementation === y.implementation) {
                n(m, g.sibling), g = o(g, y.children || []), g.return = m, m = g;
                break e;
              } else {
                n(m, g);
                break;
              }
              else t(m, g);
              g = g.sibling;
            }
            g = To(y, m.mode, x), g.return = m, m = g;
          }
          return s(m);
        case kt:
          return j = y._init, k(m, g, j(y._payload), x);
      }
      if (Xn(y)) return w(m, g, y, x);
      if (Ln(y)) return f(m, g, y, x);
      Ur(m, y);
    }
    return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, g !== null && g.tag === 6 ? (n(m, g.sibling), g = o(g, y), g.return = m, m = g) : (n(m, g), g = zo(y, m.mode, x), g.return = m, m = g), s(m)) : n(m, g);
  }
  return k;
}
var Tn = hc(!0), gc = hc(!1), Ci = Lt(null), zi = null, hn = null, ts = null;
function ns() {
  ts = hn = zi = null;
}
function rs(e) {
  var t = Ci.current;
  K(Ci), e._currentValue = t;
}
function ll(e, t, n) {
  for (; e !== null; ) {
    var i = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function bn(e, t) {
  zi = e, ts = hn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Re = !0), e.firstContext = null);
}
function Ye(e) {
  var t = e._currentValue;
  if (ts !== e) if (e = { context: e, memoizedValue: t, next: null }, hn === null) {
    if (zi === null) throw Error(z(308));
    hn = e, zi.dependencies = { lanes: 0, firstContext: e };
  } else hn = hn.next = e;
  return t;
}
var Ut = null;
function is(e) {
  Ut === null ? Ut = [e] : Ut.push(e);
}
function mc(e, t, n, i) {
  var o = t.interleaved;
  return o === null ? (n.next = n, is(t)) : (n.next = o.next, o.next = n), t.interleaved = n, yt(e, i);
}
function yt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var bt = !1;
function os(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function yc(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function ht(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function $t(e, t, n) {
  var i = e.updateQueue;
  if (i === null) return null;
  if (i = i.shared, W & 2) {
    var o = i.pending;
    return o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, yt(e, n);
  }
  return o = i.interleaved, o === null ? (t.next = t, is(i)) : (t.next = o.next, o.next = t), i.interleaved = t, yt(e, n);
}
function ii(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, Vl(e, n);
  }
}
function xa(e, t) {
  var n = e.updateQueue, i = e.alternate;
  if (i !== null && (i = i.updateQueue, n === i)) {
    var o = null, l = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var s = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        l === null ? o = l = s : l = l.next = s, n = n.next;
      } while (n !== null);
      l === null ? o = l = t : l = l.next = t;
    } else o = l = t;
    n = { baseState: i.baseState, firstBaseUpdate: o, lastBaseUpdate: l, shared: i.shared, effects: i.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Ti(e, t, n, i) {
  var o = e.updateQueue;
  bt = !1;
  var l = o.firstBaseUpdate, s = o.lastBaseUpdate, a = o.shared.pending;
  if (a !== null) {
    o.shared.pending = null;
    var d = a, c = d.next;
    d.next = null, s === null ? l = c : s.next = c, s = d;
    var p = e.alternate;
    p !== null && (p = p.updateQueue, a = p.lastBaseUpdate, a !== s && (a === null ? p.firstBaseUpdate = c : a.next = c, p.lastBaseUpdate = d));
  }
  if (l !== null) {
    var u = o.baseState;
    s = 0, p = c = d = null, a = l;
    do {
      var h = a.lane, v = a.eventTime;
      if ((i & h) === h) {
        p !== null && (p = p.next = {
          eventTime: v,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var w = e, f = a;
          switch (h = t, v = n, f.tag) {
            case 1:
              if (w = f.payload, typeof w == "function") {
                u = w.call(v, u, h);
                break e;
              }
              u = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = f.payload, h = typeof w == "function" ? w.call(v, u, h) : w, h == null) break e;
              u = Z({}, u, h);
              break e;
            case 2:
              bt = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = o.effects, h === null ? o.effects = [a] : h.push(a));
      } else v = { eventTime: v, lane: h, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, p === null ? (c = p = v, d = u) : p = p.next = v, s |= h;
      if (a = a.next, a === null) {
        if (a = o.shared.pending, a === null) break;
        h = a, a = h.next, h.next = null, o.lastBaseUpdate = h, o.shared.pending = null;
      }
    } while (!0);
    if (p === null && (d = u), o.baseState = d, o.firstBaseUpdate = c, o.lastBaseUpdate = p, t = o.shared.interleaved, t !== null) {
      o = t;
      do
        s |= o.lane, o = o.next;
      while (o !== t);
    } else l === null && (o.shared.lanes = 0);
    Jt |= s, e.lanes = s, e.memoizedState = u;
  }
}
function va(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var i = e[t], o = i.callback;
    if (o !== null) {
      if (i.callback = null, i = n, typeof o != "function") throw Error(z(191, o));
      o.call(i);
    }
  }
}
var Rr = {}, at = Lt(Rr), vr = Lt(Rr), wr = Lt(Rr);
function Gt(e) {
  if (e === Rr) throw Error(z(174));
  return e;
}
function ls(e, t) {
  switch (Q(wr, t), Q(vr, e), Q(at, Rr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Oo(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Oo(t, e);
  }
  K(at), Q(at, t);
}
function _n() {
  K(at), K(vr), K(wr);
}
function xc(e) {
  Gt(wr.current);
  var t = Gt(at.current), n = Oo(t, e.type);
  t !== n && (Q(vr, e), Q(at, n));
}
function ss(e) {
  vr.current === e && (K(at), K(vr));
}
var q = Lt(0);
function _i(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var wo = [];
function as() {
  for (var e = 0; e < wo.length; e++) wo[e]._workInProgressVersionPrimary = null;
  wo.length = 0;
}
var oi = vt.ReactCurrentDispatcher, ko = vt.ReactCurrentBatchConfig, qt = 0, J = null, ae = null, ue = null, Ri = !1, ir = !1, kr = 0, wf = 0;
function ve() {
  throw Error(z(321));
}
function ds(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!nt(e[n], t[n])) return !1;
  return !0;
}
function cs(e, t, n, i, o, l) {
  if (qt = l, J = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, oi.current = e === null || e.memoizedState === null ? Sf : Cf, e = n(i, o), ir) {
    l = 0;
    do {
      if (ir = !1, kr = 0, 25 <= l) throw Error(z(301));
      l += 1, ue = ae = null, t.updateQueue = null, oi.current = zf, e = n(i, o);
    } while (ir);
  }
  if (oi.current = Ii, t = ae !== null && ae.next !== null, qt = 0, ue = ae = J = null, Ri = !1, t) throw Error(z(300));
  return e;
}
function us() {
  var e = kr !== 0;
  return kr = 0, e;
}
function it() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ue === null ? J.memoizedState = ue = e : ue = ue.next = e, ue;
}
function Ke() {
  if (ae === null) {
    var e = J.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ae.next;
  var t = ue === null ? J.memoizedState : ue.next;
  if (t !== null) ue = t, ae = e;
  else {
    if (e === null) throw Error(z(310));
    ae = e, e = { memoizedState: ae.memoizedState, baseState: ae.baseState, baseQueue: ae.baseQueue, queue: ae.queue, next: null }, ue === null ? J.memoizedState = ue = e : ue = ue.next = e;
  }
  return ue;
}
function br(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function bo(e) {
  var t = Ke(), n = t.queue;
  if (n === null) throw Error(z(311));
  n.lastRenderedReducer = e;
  var i = ae, o = i.baseQueue, l = n.pending;
  if (l !== null) {
    if (o !== null) {
      var s = o.next;
      o.next = l.next, l.next = s;
    }
    i.baseQueue = o = l, n.pending = null;
  }
  if (o !== null) {
    l = o.next, i = i.baseState;
    var a = s = null, d = null, c = l;
    do {
      var p = c.lane;
      if ((qt & p) === p) d !== null && (d = d.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), i = c.hasEagerState ? c.eagerState : e(i, c.action);
      else {
        var u = {
          lane: p,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        d === null ? (a = d = u, s = i) : d = d.next = u, J.lanes |= p, Jt |= p;
      }
      c = c.next;
    } while (c !== null && c !== l);
    d === null ? s = i : d.next = a, nt(i, t.memoizedState) || (Re = !0), t.memoizedState = i, t.baseState = s, t.baseQueue = d, n.lastRenderedState = i;
  }
  if (e = n.interleaved, e !== null) {
    o = e;
    do
      l = o.lane, J.lanes |= l, Jt |= l, o = o.next;
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function jo(e) {
  var t = Ke(), n = t.queue;
  if (n === null) throw Error(z(311));
  n.lastRenderedReducer = e;
  var i = n.dispatch, o = n.pending, l = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var s = o = o.next;
    do
      l = e(l, s.action), s = s.next;
    while (s !== o);
    nt(l, t.memoizedState) || (Re = !0), t.memoizedState = l, t.baseQueue === null && (t.baseState = l), n.lastRenderedState = l;
  }
  return [l, i];
}
function vc() {
}
function wc(e, t) {
  var n = J, i = Ke(), o = t(), l = !nt(i.memoizedState, o);
  if (l && (i.memoizedState = o, Re = !0), i = i.queue, ps(jc.bind(null, n, i, e), [e]), i.getSnapshot !== t || l || ue !== null && ue.memoizedState.tag & 1) {
    if (n.flags |= 2048, jr(9, bc.bind(null, n, i, o, t), void 0, null), pe === null) throw Error(z(349));
    qt & 30 || kc(n, t, o);
  }
  return o;
}
function kc(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = J.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, J.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function bc(e, t, n, i) {
  t.value = n, t.getSnapshot = i, Sc(t) && Cc(e);
}
function jc(e, t, n) {
  return n(function() {
    Sc(t) && Cc(e);
  });
}
function Sc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !nt(e, n);
  } catch {
    return !0;
  }
}
function Cc(e) {
  var t = yt(e, 1);
  t !== null && tt(t, e, 1, -1);
}
function wa(e) {
  var t = it();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: br, lastRenderedState: e }, t.queue = e, e = e.dispatch = jf.bind(null, J, e), [t.memoizedState, e];
}
function jr(e, t, n, i) {
  return e = { tag: e, create: t, destroy: n, deps: i, next: null }, t = J.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, J.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e)), e;
}
function zc() {
  return Ke().memoizedState;
}
function li(e, t, n, i) {
  var o = it();
  J.flags |= e, o.memoizedState = jr(1 | t, n, void 0, i === void 0 ? null : i);
}
function Ui(e, t, n, i) {
  var o = Ke();
  i = i === void 0 ? null : i;
  var l = void 0;
  if (ae !== null) {
    var s = ae.memoizedState;
    if (l = s.destroy, i !== null && ds(i, s.deps)) {
      o.memoizedState = jr(t, n, l, i);
      return;
    }
  }
  J.flags |= e, o.memoizedState = jr(1 | t, n, l, i);
}
function ka(e, t) {
  return li(8390656, 8, e, t);
}
function ps(e, t) {
  return Ui(2048, 8, e, t);
}
function Tc(e, t) {
  return Ui(4, 2, e, t);
}
function _c(e, t) {
  return Ui(4, 4, e, t);
}
function Rc(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Ic(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ui(4, 4, Rc.bind(null, t, e), n);
}
function fs() {
}
function $c(e, t) {
  var n = Ke();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && ds(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
}
function Mc(e, t) {
  var n = Ke();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && ds(t, i[1]) ? i[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Fc(e, t, n) {
  return qt & 21 ? (nt(n, t) || (n = Ld(), J.lanes |= n, Jt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Re = !0), e.memoizedState = n);
}
function kf(e, t) {
  var n = V;
  V = n !== 0 && 4 > n ? n : 4, e(!0);
  var i = ko.transition;
  ko.transition = {};
  try {
    e(!1), t();
  } finally {
    V = n, ko.transition = i;
  }
}
function Ec() {
  return Ke().memoizedState;
}
function bf(e, t, n) {
  var i = Ft(e);
  if (n = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null }, Pc(e)) Dc(t, n);
  else if (n = mc(e, t, n, i), n !== null) {
    var o = Se();
    tt(n, e, i, o), Nc(n, t, i);
  }
}
function jf(e, t, n) {
  var i = Ft(e), o = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Pc(e)) Dc(t, o);
  else {
    var l = e.alternate;
    if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = t.lastRenderedReducer, l !== null)) try {
      var s = t.lastRenderedState, a = l(s, n);
      if (o.hasEagerState = !0, o.eagerState = a, nt(a, s)) {
        var d = t.interleaved;
        d === null ? (o.next = o, is(t)) : (o.next = d.next, d.next = o), t.interleaved = o;
        return;
      }
    } catch {
    } finally {
    }
    n = mc(e, t, o, i), n !== null && (o = Se(), tt(n, e, i, o), Nc(n, t, i));
  }
}
function Pc(e) {
  var t = e.alternate;
  return e === J || t !== null && t === J;
}
function Dc(e, t) {
  ir = Ri = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Nc(e, t, n) {
  if (n & 4194240) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, Vl(e, n);
  }
}
var Ii = { readContext: Ye, useCallback: ve, useContext: ve, useEffect: ve, useImperativeHandle: ve, useInsertionEffect: ve, useLayoutEffect: ve, useMemo: ve, useReducer: ve, useRef: ve, useState: ve, useDebugValue: ve, useDeferredValue: ve, useTransition: ve, useMutableSource: ve, useSyncExternalStore: ve, useId: ve, unstable_isNewReconciler: !1 }, Sf = { readContext: Ye, useCallback: function(e, t) {
  return it().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Ye, useEffect: ka, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, li(
    4194308,
    4,
    Rc.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return li(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return li(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = it();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var i = it();
  return t = n !== void 0 ? n(t) : t, i.memoizedState = i.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, i.queue = e, e = e.dispatch = bf.bind(null, J, e), [i.memoizedState, e];
}, useRef: function(e) {
  var t = it();
  return e = { current: e }, t.memoizedState = e;
}, useState: wa, useDebugValue: fs, useDeferredValue: function(e) {
  return it().memoizedState = e;
}, useTransition: function() {
  var e = wa(!1), t = e[0];
  return e = kf.bind(null, e[1]), it().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var i = J, o = it();
  if (X) {
    if (n === void 0) throw Error(z(407));
    n = n();
  } else {
    if (n = t(), pe === null) throw Error(z(349));
    qt & 30 || kc(i, t, n);
  }
  o.memoizedState = n;
  var l = { value: n, getSnapshot: t };
  return o.queue = l, ka(jc.bind(
    null,
    i,
    l,
    e
  ), [e]), i.flags |= 2048, jr(9, bc.bind(null, i, l, n, t), void 0, null), n;
}, useId: function() {
  var e = it(), t = pe.identifierPrefix;
  if (X) {
    var n = ft, i = pt;
    n = (i & ~(1 << 32 - et(i) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = kr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = wf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Cf = {
  readContext: Ye,
  useCallback: $c,
  useContext: Ye,
  useEffect: ps,
  useImperativeHandle: Ic,
  useInsertionEffect: Tc,
  useLayoutEffect: _c,
  useMemo: Mc,
  useReducer: bo,
  useRef: zc,
  useState: function() {
    return bo(br);
  },
  useDebugValue: fs,
  useDeferredValue: function(e) {
    var t = Ke();
    return Fc(t, ae.memoizedState, e);
  },
  useTransition: function() {
    var e = bo(br)[0], t = Ke().memoizedState;
    return [e, t];
  },
  useMutableSource: vc,
  useSyncExternalStore: wc,
  useId: Ec,
  unstable_isNewReconciler: !1
}, zf = { readContext: Ye, useCallback: $c, useContext: Ye, useEffect: ps, useImperativeHandle: Ic, useInsertionEffect: Tc, useLayoutEffect: _c, useMemo: Mc, useReducer: jo, useRef: zc, useState: function() {
  return jo(br);
}, useDebugValue: fs, useDeferredValue: function(e) {
  var t = Ke();
  return ae === null ? t.memoizedState = e : Fc(t, ae.memoizedState, e);
}, useTransition: function() {
  var e = jo(br)[0], t = Ke().memoizedState;
  return [e, t];
}, useMutableSource: vc, useSyncExternalStore: wc, useId: Ec, unstable_isNewReconciler: !1 };
function qe(e, t) {
  if (e && e.defaultProps) {
    t = Z({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function sl(e, t, n, i) {
  t = e.memoizedState, n = n(i, t), n = n == null ? t : Z({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Gi = { isMounted: function(e) {
  return (e = e._reactInternals) ? tn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var i = Se(), o = Ft(e), l = ht(i, o);
  l.payload = t, n != null && (l.callback = n), t = $t(e, l, o), t !== null && (tt(t, e, o, i), ii(t, e, o));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var i = Se(), o = Ft(e), l = ht(i, o);
  l.tag = 1, l.payload = t, n != null && (l.callback = n), t = $t(e, l, o), t !== null && (tt(t, e, o, i), ii(t, e, o));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Se(), i = Ft(e), o = ht(n, i);
  o.tag = 2, t != null && (o.callback = t), t = $t(e, o, i), t !== null && (tt(t, e, i, n), ii(t, e, i));
} };
function ba(e, t, n, i, o, l, s) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, l, s) : t.prototype && t.prototype.isPureReactComponent ? !gr(n, i) || !gr(o, l) : !0;
}
function Lc(e, t, n) {
  var i = !1, o = Dt, l = t.contextType;
  return typeof l == "object" && l !== null ? l = Ye(l) : (o = $e(t) ? Kt : be.current, i = t.contextTypes, l = (i = i != null) ? Cn(e, o) : Dt), t = new t(n, l), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Gi, e.stateNode = t, t._reactInternals = e, i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = o, e.__reactInternalMemoizedMaskedChildContext = l), t;
}
function ja(e, t, n, i) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== e && Gi.enqueueReplaceState(t, t.state, null);
}
function al(e, t, n, i) {
  var o = e.stateNode;
  o.props = n, o.state = e.memoizedState, o.refs = {}, os(e);
  var l = t.contextType;
  typeof l == "object" && l !== null ? o.context = Ye(l) : (l = $e(t) ? Kt : be.current, o.context = Cn(e, l)), o.state = e.memoizedState, l = t.getDerivedStateFromProps, typeof l == "function" && (sl(e, t, l, n), o.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (t = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), t !== o.state && Gi.enqueueReplaceState(o, o.state, null), Ti(e, n, o, i), o.state = e.memoizedState), typeof o.componentDidMount == "function" && (e.flags |= 4194308);
}
function Rn(e, t) {
  try {
    var n = "", i = t;
    do
      n += Zu(i), i = i.return;
    while (i);
    var o = n;
  } catch (l) {
    o = `
Error generating stack: ` + l.message + `
` + l.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function So(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function dl(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Tf = typeof WeakMap == "function" ? WeakMap : Map;
function Ac(e, t, n) {
  n = ht(-1, n), n.tag = 3, n.payload = { element: null };
  var i = t.value;
  return n.callback = function() {
    Mi || (Mi = !0, vl = i), dl(e, t);
  }, n;
}
function Oc(e, t, n) {
  n = ht(-1, n), n.tag = 3;
  var i = e.type.getDerivedStateFromError;
  if (typeof i == "function") {
    var o = t.value;
    n.payload = function() {
      return i(o);
    }, n.callback = function() {
      dl(e, t);
    };
  }
  var l = e.stateNode;
  return l !== null && typeof l.componentDidCatch == "function" && (n.callback = function() {
    dl(e, t), typeof i != "function" && (Mt === null ? Mt = /* @__PURE__ */ new Set([this]) : Mt.add(this));
    var s = t.stack;
    this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
  }), n;
}
function Sa(e, t, n) {
  var i = e.pingCache;
  if (i === null) {
    i = e.pingCache = new Tf();
    var o = /* @__PURE__ */ new Set();
    i.set(t, o);
  } else o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
  o.has(n) || (o.add(n), e = Wf.bind(null, e, t, n), t.then(e, e));
}
function Ca(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function za(e, t, n, i, o) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = o, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = ht(-1, 1), t.tag = 2, $t(n, t, 1))), n.lanes |= 1), e);
}
var _f = vt.ReactCurrentOwner, Re = !1;
function je(e, t, n, i) {
  t.child = e === null ? gc(t, null, n, i) : Tn(t, e.child, n, i);
}
function Ta(e, t, n, i, o) {
  n = n.render;
  var l = t.ref;
  return bn(t, o), i = cs(e, t, n, i, l, o), n = us(), e !== null && !Re ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, xt(e, t, o)) : (X && n && Jl(t), t.flags |= 1, je(e, t, i, o), t.child);
}
function _a(e, t, n, i, o) {
  if (e === null) {
    var l = n.type;
    return typeof l == "function" && !ks(l) && l.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = l, Wc(e, t, l, i, o)) : (e = ci(n.type, null, i, t, t.mode, o), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (l = e.child, !(e.lanes & o)) {
    var s = l.memoizedProps;
    if (n = n.compare, n = n !== null ? n : gr, n(s, i) && e.ref === t.ref) return xt(e, t, o);
  }
  return t.flags |= 1, e = Et(l, i), e.ref = t.ref, e.return = t, t.child = e;
}
function Wc(e, t, n, i, o) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (gr(l, i) && e.ref === t.ref) if (Re = !1, t.pendingProps = i = l, (e.lanes & o) !== 0) e.flags & 131072 && (Re = !0);
    else return t.lanes = e.lanes, xt(e, t, o);
  }
  return cl(e, t, n, i, o);
}
function Hc(e, t, n) {
  var i = t.pendingProps, o = i.children, l = e !== null ? e.memoizedState : null;
  if (i.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Q(mn, Ee), Ee |= n;
  else {
    if (!(n & 1073741824)) return e = l !== null ? l.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Q(mn, Ee), Ee |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, i = l !== null ? l.baseLanes : n, Q(mn, Ee), Ee |= i;
  }
  else l !== null ? (i = l.baseLanes | n, t.memoizedState = null) : i = n, Q(mn, Ee), Ee |= i;
  return je(e, t, o, n), t.child;
}
function Bc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function cl(e, t, n, i, o) {
  var l = $e(n) ? Kt : be.current;
  return l = Cn(t, l), bn(t, o), n = cs(e, t, n, i, l, o), i = us(), e !== null && !Re ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, xt(e, t, o)) : (X && i && Jl(t), t.flags |= 1, je(e, t, n, o), t.child);
}
function Ra(e, t, n, i, o) {
  if ($e(n)) {
    var l = !0;
    bi(t);
  } else l = !1;
  if (bn(t, o), t.stateNode === null) si(e, t), Lc(t, n, i), al(t, n, i, o), i = !0;
  else if (e === null) {
    var s = t.stateNode, a = t.memoizedProps;
    s.props = a;
    var d = s.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Ye(c) : (c = $e(n) ? Kt : be.current, c = Cn(t, c));
    var p = n.getDerivedStateFromProps, u = typeof p == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    u || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== i || d !== c) && ja(t, s, i, c), bt = !1;
    var h = t.memoizedState;
    s.state = h, Ti(t, i, s, o), d = t.memoizedState, a !== i || h !== d || Ie.current || bt ? (typeof p == "function" && (sl(t, n, p, i), d = t.memoizedState), (a = bt || ba(t, n, a, i, h, d, c)) ? (u || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = d), s.props = i, s.state = d, s.context = c, i = a) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
  } else {
    s = t.stateNode, yc(e, t), a = t.memoizedProps, c = t.type === t.elementType ? a : qe(t.type, a), s.props = c, u = t.pendingProps, h = s.context, d = n.contextType, typeof d == "object" && d !== null ? d = Ye(d) : (d = $e(n) ? Kt : be.current, d = Cn(t, d));
    var v = n.getDerivedStateFromProps;
    (p = typeof v == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== u || h !== d) && ja(t, s, i, d), bt = !1, h = t.memoizedState, s.state = h, Ti(t, i, s, o);
    var w = t.memoizedState;
    a !== u || h !== w || Ie.current || bt ? (typeof v == "function" && (sl(t, n, v, i), w = t.memoizedState), (c = bt || ba(t, n, c, i, h, w, d) || !1) ? (p || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, w, d), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, w, d)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = w), s.props = i, s.state = w, s.context = d, i = c) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), i = !1);
  }
  return ul(e, t, n, i, l, o);
}
function ul(e, t, n, i, o, l) {
  Bc(e, t);
  var s = (t.flags & 128) !== 0;
  if (!i && !s) return o && ha(t, n, !1), xt(e, t, l);
  i = t.stateNode, _f.current = t;
  var a = s && typeof n.getDerivedStateFromError != "function" ? null : i.render();
  return t.flags |= 1, e !== null && s ? (t.child = Tn(t, e.child, null, l), t.child = Tn(t, null, a, l)) : je(e, t, a, l), t.memoizedState = i.state, o && ha(t, n, !0), t.child;
}
function Vc(e) {
  var t = e.stateNode;
  t.pendingContext ? fa(e, t.pendingContext, t.pendingContext !== t.context) : t.context && fa(e, t.context, !1), ls(e, t.containerInfo);
}
function Ia(e, t, n, i, o) {
  return zn(), es(o), t.flags |= 256, je(e, t, n, i), t.child;
}
var pl = { dehydrated: null, treeContext: null, retryLane: 0 };
function fl(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Uc(e, t, n) {
  var i = t.pendingProps, o = q.current, l = !1, s = (t.flags & 128) !== 0, a;
  if ((a = s) || (a = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0), a ? (l = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (o |= 1), Q(q, o & 1), e === null)
    return ol(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = i.children, e = i.fallback, l ? (i = t.mode, l = t.child, s = { mode: "hidden", children: s }, !(i & 1) && l !== null ? (l.childLanes = 0, l.pendingProps = s) : l = Ki(s, i, 0, null), e = Yt(e, i, n, null), l.return = t, e.return = t, l.sibling = e, t.child = l, t.child.memoizedState = fl(n), t.memoizedState = pl, e) : hs(t, s));
  if (o = e.memoizedState, o !== null && (a = o.dehydrated, a !== null)) return Rf(e, t, s, i, a, o, n);
  if (l) {
    l = i.fallback, s = t.mode, o = e.child, a = o.sibling;
    var d = { mode: "hidden", children: i.children };
    return !(s & 1) && t.child !== o ? (i = t.child, i.childLanes = 0, i.pendingProps = d, t.deletions = null) : (i = Et(o, d), i.subtreeFlags = o.subtreeFlags & 14680064), a !== null ? l = Et(a, l) : (l = Yt(l, s, n, null), l.flags |= 2), l.return = t, i.return = t, i.sibling = l, t.child = i, i = l, l = t.child, s = e.child.memoizedState, s = s === null ? fl(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, l.memoizedState = s, l.childLanes = e.childLanes & ~n, t.memoizedState = pl, i;
  }
  return l = e.child, e = l.sibling, i = Et(l, { mode: "visible", children: i.children }), !(t.mode & 1) && (i.lanes = n), i.return = t, i.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = i, t.memoizedState = null, i;
}
function hs(e, t) {
  return t = Ki({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Gr(e, t, n, i) {
  return i !== null && es(i), Tn(t, e.child, null, n), e = hs(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Rf(e, t, n, i, o, l, s) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, i = So(Error(z(422))), Gr(e, t, s, i)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (l = i.fallback, o = t.mode, i = Ki({ mode: "visible", children: i.children }, o, 0, null), l = Yt(l, o, s, null), l.flags |= 2, i.return = t, l.return = t, i.sibling = l, t.child = i, t.mode & 1 && Tn(t, e.child, null, s), t.child.memoizedState = fl(s), t.memoizedState = pl, l);
  if (!(t.mode & 1)) return Gr(e, t, s, null);
  if (o.data === "$!") {
    if (i = o.nextSibling && o.nextSibling.dataset, i) var a = i.dgst;
    return i = a, l = Error(z(419)), i = So(l, i, void 0), Gr(e, t, s, i);
  }
  if (a = (s & e.childLanes) !== 0, Re || a) {
    if (i = pe, i !== null) {
      switch (s & -s) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      o = o & (i.suspendedLanes | s) ? 0 : o, o !== 0 && o !== l.retryLane && (l.retryLane = o, yt(e, o), tt(i, e, o, -1));
    }
    return ws(), i = So(Error(z(421))), Gr(e, t, s, i);
  }
  return o.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Hf.bind(null, e), o._reactRetry = t, null) : (e = l.treeContext, Pe = It(o.nextSibling), De = t, X = !0, Ze = null, e !== null && (Be[Ve++] = pt, Be[Ve++] = ft, Be[Ve++] = Xt, pt = e.id, ft = e.overflow, Xt = t), t = hs(t, i.children), t.flags |= 4096, t);
}
function $a(e, t, n) {
  e.lanes |= t;
  var i = e.alternate;
  i !== null && (i.lanes |= t), ll(e.return, t, n);
}
function Co(e, t, n, i, o) {
  var l = e.memoizedState;
  l === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: i, tail: n, tailMode: o } : (l.isBackwards = t, l.rendering = null, l.renderingStartTime = 0, l.last = i, l.tail = n, l.tailMode = o);
}
function Gc(e, t, n) {
  var i = t.pendingProps, o = i.revealOrder, l = i.tail;
  if (je(e, t, i.children, n), i = q.current, i & 2) i = i & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && $a(e, n, t);
      else if (e.tag === 19) $a(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    i &= 1;
  }
  if (Q(q, i), !(t.mode & 1)) t.memoizedState = null;
  else switch (o) {
    case "forwards":
      for (n = t.child, o = null; n !== null; ) e = n.alternate, e !== null && _i(e) === null && (o = n), n = n.sibling;
      n = o, n === null ? (o = t.child, t.child = null) : (o = n.sibling, n.sibling = null), Co(t, !1, o, n, l);
      break;
    case "backwards":
      for (n = null, o = t.child, t.child = null; o !== null; ) {
        if (e = o.alternate, e !== null && _i(e) === null) {
          t.child = o;
          break;
        }
        e = o.sibling, o.sibling = n, n = o, o = e;
      }
      Co(t, !0, n, null, l);
      break;
    case "together":
      Co(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function si(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function xt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Jt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(z(153));
  if (t.child !== null) {
    for (e = t.child, n = Et(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Et(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function If(e, t, n) {
  switch (t.tag) {
    case 3:
      Vc(t), zn();
      break;
    case 5:
      xc(t);
      break;
    case 1:
      $e(t.type) && bi(t);
      break;
    case 4:
      ls(t, t.stateNode.containerInfo);
      break;
    case 10:
      var i = t.type._context, o = t.memoizedProps.value;
      Q(Ci, i._currentValue), i._currentValue = o;
      break;
    case 13:
      if (i = t.memoizedState, i !== null)
        return i.dehydrated !== null ? (Q(q, q.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Uc(e, t, n) : (Q(q, q.current & 1), e = xt(e, t, n), e !== null ? e.sibling : null);
      Q(q, q.current & 1);
      break;
    case 19:
      if (i = (n & t.childLanes) !== 0, e.flags & 128) {
        if (i) return Gc(e, t, n);
        t.flags |= 128;
      }
      if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), Q(q, q.current), i) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Hc(e, t, n);
  }
  return xt(e, t, n);
}
var Qc, hl, Yc, Kc;
Qc = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
hl = function() {
};
Yc = function(e, t, n, i) {
  var o = e.memoizedProps;
  if (o !== i) {
    e = t.stateNode, Gt(at.current);
    var l = null;
    switch (n) {
      case "input":
        o = Do(e, o), i = Do(e, i), l = [];
        break;
      case "select":
        o = Z({}, o, { value: void 0 }), i = Z({}, i, { value: void 0 }), l = [];
        break;
      case "textarea":
        o = Ao(e, o), i = Ao(e, i), l = [];
        break;
      default:
        typeof o.onClick != "function" && typeof i.onClick == "function" && (e.onclick = wi);
    }
    Wo(n, i);
    var s;
    n = null;
    for (c in o) if (!i.hasOwnProperty(c) && o.hasOwnProperty(c) && o[c] != null) if (c === "style") {
      var a = o[c];
      for (s in a) a.hasOwnProperty(s) && (n || (n = {}), n[s] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (ar.hasOwnProperty(c) ? l || (l = []) : (l = l || []).push(c, null));
    for (c in i) {
      var d = i[c];
      if (a = o?.[c], i.hasOwnProperty(c) && d !== a && (d != null || a != null)) if (c === "style") if (a) {
        for (s in a) !a.hasOwnProperty(s) || d && d.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
        for (s in d) d.hasOwnProperty(s) && a[s] !== d[s] && (n || (n = {}), n[s] = d[s]);
      } else n || (l || (l = []), l.push(
        c,
        n
      )), n = d;
      else c === "dangerouslySetInnerHTML" ? (d = d ? d.__html : void 0, a = a ? a.__html : void 0, d != null && a !== d && (l = l || []).push(c, d)) : c === "children" ? typeof d != "string" && typeof d != "number" || (l = l || []).push(c, "" + d) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (ar.hasOwnProperty(c) ? (d != null && c === "onScroll" && Y("scroll", e), l || a === d || (l = [])) : (l = l || []).push(c, d));
    }
    n && (l = l || []).push("style", n);
    var c = l;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
Kc = function(e, t, n, i) {
  n !== i && (t.flags |= 4);
};
function Vn(e, t) {
  if (!X) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var i = null; n !== null; ) n.alternate !== null && (i = n), n = n.sibling;
      i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
  }
}
function we(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, i = 0;
  if (t) for (var o = e.child; o !== null; ) n |= o.lanes | o.childLanes, i |= o.subtreeFlags & 14680064, i |= o.flags & 14680064, o.return = e, o = o.sibling;
  else for (o = e.child; o !== null; ) n |= o.lanes | o.childLanes, i |= o.subtreeFlags, i |= o.flags, o.return = e, o = o.sibling;
  return e.subtreeFlags |= i, e.childLanes = n, t;
}
function $f(e, t, n) {
  var i = t.pendingProps;
  switch (Zl(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return we(t), null;
    case 1:
      return $e(t.type) && ki(), we(t), null;
    case 3:
      return i = t.stateNode, _n(), K(Ie), K(be), as(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Vr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ze !== null && (bl(Ze), Ze = null))), hl(e, t), we(t), null;
    case 5:
      ss(t);
      var o = Gt(wr.current);
      if (n = t.type, e !== null && t.stateNode != null) Yc(e, t, n, i, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!i) {
          if (t.stateNode === null) throw Error(z(166));
          return we(t), null;
        }
        if (e = Gt(at.current), Vr(t)) {
          i = t.stateNode, n = t.type;
          var l = t.memoizedProps;
          switch (i[ot] = t, i[xr] = l, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Y("cancel", i), Y("close", i);
              break;
            case "iframe":
            case "object":
            case "embed":
              Y("load", i);
              break;
            case "video":
            case "audio":
              for (o = 0; o < Jn.length; o++) Y(Jn[o], i);
              break;
            case "source":
              Y("error", i);
              break;
            case "img":
            case "image":
            case "link":
              Y(
                "error",
                i
              ), Y("load", i);
              break;
            case "details":
              Y("toggle", i);
              break;
            case "input":
              Os(i, l), Y("invalid", i);
              break;
            case "select":
              i._wrapperState = { wasMultiple: !!l.multiple }, Y("invalid", i);
              break;
            case "textarea":
              Hs(i, l), Y("invalid", i);
          }
          Wo(n, l), o = null;
          for (var s in l) if (l.hasOwnProperty(s)) {
            var a = l[s];
            s === "children" ? typeof a == "string" ? i.textContent !== a && (l.suppressHydrationWarning !== !0 && Br(i.textContent, a, e), o = ["children", a]) : typeof a == "number" && i.textContent !== "" + a && (l.suppressHydrationWarning !== !0 && Br(
              i.textContent,
              a,
              e
            ), o = ["children", "" + a]) : ar.hasOwnProperty(s) && a != null && s === "onScroll" && Y("scroll", i);
          }
          switch (n) {
            case "input":
              Pr(i), Ws(i, l, !0);
              break;
            case "textarea":
              Pr(i), Bs(i);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof l.onClick == "function" && (i.onclick = wi);
          }
          i = o, t.updateQueue = i, i !== null && (t.flags |= 4);
        } else {
          s = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = jd(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = s.createElement(n, { is: i.is }) : (e = s.createElement(n), n === "select" && (s = e, i.multiple ? s.multiple = !0 : i.size && (s.size = i.size))) : e = s.createElementNS(e, n), e[ot] = t, e[xr] = i, Qc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (s = Ho(n, i), n) {
              case "dialog":
                Y("cancel", e), Y("close", e), o = i;
                break;
              case "iframe":
              case "object":
              case "embed":
                Y("load", e), o = i;
                break;
              case "video":
              case "audio":
                for (o = 0; o < Jn.length; o++) Y(Jn[o], e);
                o = i;
                break;
              case "source":
                Y("error", e), o = i;
                break;
              case "img":
              case "image":
              case "link":
                Y(
                  "error",
                  e
                ), Y("load", e), o = i;
                break;
              case "details":
                Y("toggle", e), o = i;
                break;
              case "input":
                Os(e, i), o = Do(e, i), Y("invalid", e);
                break;
              case "option":
                o = i;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!i.multiple }, o = Z({}, i, { value: void 0 }), Y("invalid", e);
                break;
              case "textarea":
                Hs(e, i), o = Ao(e, i), Y("invalid", e);
                break;
              default:
                o = i;
            }
            Wo(n, o), a = o;
            for (l in a) if (a.hasOwnProperty(l)) {
              var d = a[l];
              l === "style" ? zd(e, d) : l === "dangerouslySetInnerHTML" ? (d = d ? d.__html : void 0, d != null && Sd(e, d)) : l === "children" ? typeof d == "string" ? (n !== "textarea" || d !== "") && dr(e, d) : typeof d == "number" && dr(e, "" + d) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (ar.hasOwnProperty(l) ? d != null && l === "onScroll" && Y("scroll", e) : d != null && Ll(e, l, d, s));
            }
            switch (n) {
              case "input":
                Pr(e), Ws(e, i, !1);
                break;
              case "textarea":
                Pr(e), Bs(e);
                break;
              case "option":
                i.value != null && e.setAttribute("value", "" + Pt(i.value));
                break;
              case "select":
                e.multiple = !!i.multiple, l = i.value, l != null ? xn(e, !!i.multiple, l, !1) : i.defaultValue != null && xn(
                  e,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                );
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = wi);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break e;
              case "img":
                i = !0;
                break e;
              default:
                i = !1;
            }
          }
          i && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return we(t), null;
    case 6:
      if (e && t.stateNode != null) Kc(e, t, e.memoizedProps, i);
      else {
        if (typeof i != "string" && t.stateNode === null) throw Error(z(166));
        if (n = Gt(wr.current), Gt(at.current), Vr(t)) {
          if (i = t.stateNode, n = t.memoizedProps, i[ot] = t, (l = i.nodeValue !== n) && (e = De, e !== null)) switch (e.tag) {
            case 3:
              Br(i.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Br(i.nodeValue, n, (e.mode & 1) !== 0);
          }
          l && (t.flags |= 4);
        } else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[ot] = t, t.stateNode = i;
      }
      return we(t), null;
    case 13:
      if (K(q), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (X && Pe !== null && t.mode & 1 && !(t.flags & 128)) fc(), zn(), t.flags |= 98560, l = !1;
        else if (l = Vr(t), i !== null && i.dehydrated !== null) {
          if (e === null) {
            if (!l) throw Error(z(318));
            if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(z(317));
            l[ot] = t;
          } else zn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          we(t), l = !1;
        } else Ze !== null && (bl(Ze), Ze = null), l = !0;
        if (!l) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || q.current & 1 ? de === 0 && (de = 3) : ws())), t.updateQueue !== null && (t.flags |= 4), we(t), null);
    case 4:
      return _n(), hl(e, t), e === null && mr(t.stateNode.containerInfo), we(t), null;
    case 10:
      return rs(t.type._context), we(t), null;
    case 17:
      return $e(t.type) && ki(), we(t), null;
    case 19:
      if (K(q), l = t.memoizedState, l === null) return we(t), null;
      if (i = (t.flags & 128) !== 0, s = l.rendering, s === null) if (i) Vn(l, !1);
      else {
        if (de !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (s = _i(e), s !== null) {
            for (t.flags |= 128, Vn(l, !1), i = s.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = n, n = t.child; n !== null; ) l = n, e = i, l.flags &= 14680066, s = l.alternate, s === null ? (l.childLanes = 0, l.lanes = e, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = s.childLanes, l.lanes = s.lanes, l.child = s.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = s.memoizedProps, l.memoizedState = s.memoizedState, l.updateQueue = s.updateQueue, l.type = s.type, e = s.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Q(q, q.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        l.tail !== null && re() > In && (t.flags |= 128, i = !0, Vn(l, !1), t.lanes = 4194304);
      }
      else {
        if (!i) if (e = _i(s), e !== null) {
          if (t.flags |= 128, i = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Vn(l, !0), l.tail === null && l.tailMode === "hidden" && !s.alternate && !X) return we(t), null;
        } else 2 * re() - l.renderingStartTime > In && n !== 1073741824 && (t.flags |= 128, i = !0, Vn(l, !1), t.lanes = 4194304);
        l.isBackwards ? (s.sibling = t.child, t.child = s) : (n = l.last, n !== null ? n.sibling = s : t.child = s, l.last = s);
      }
      return l.tail !== null ? (t = l.tail, l.rendering = t, l.tail = t.sibling, l.renderingStartTime = re(), t.sibling = null, n = q.current, Q(q, i ? n & 1 | 2 : n & 1), t) : (we(t), null);
    case 22:
    case 23:
      return vs(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? Ee & 1073741824 && (we(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : we(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(z(156, t.tag));
}
function Mf(e, t) {
  switch (Zl(t), t.tag) {
    case 1:
      return $e(t.type) && ki(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return _n(), K(Ie), K(be), as(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return ss(t), null;
    case 13:
      if (K(q), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(z(340));
        zn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return K(q), null;
    case 4:
      return _n(), null;
    case 10:
      return rs(t.type._context), null;
    case 22:
    case 23:
      return vs(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Qr = !1, ke = !1, Ff = typeof WeakSet == "function" ? WeakSet : Set, M = null;
function gn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (i) {
    ne(e, t, i);
  }
  else n.current = null;
}
function gl(e, t, n) {
  try {
    n();
  } catch (i) {
    ne(e, t, i);
  }
}
var Ma = !1;
function Ef(e, t) {
  if (Jo = yi, e = ec(), ql(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var i = n.getSelection && n.getSelection();
      if (i && i.rangeCount !== 0) {
        n = i.anchorNode;
        var o = i.anchorOffset, l = i.focusNode;
        i = i.focusOffset;
        try {
          n.nodeType, l.nodeType;
        } catch {
          n = null;
          break e;
        }
        var s = 0, a = -1, d = -1, c = 0, p = 0, u = e, h = null;
        t: for (; ; ) {
          for (var v; u !== n || o !== 0 && u.nodeType !== 3 || (a = s + o), u !== l || i !== 0 && u.nodeType !== 3 || (d = s + i), u.nodeType === 3 && (s += u.nodeValue.length), (v = u.firstChild) !== null; )
            h = u, u = v;
          for (; ; ) {
            if (u === e) break t;
            if (h === n && ++c === o && (a = s), h === l && ++p === i && (d = s), (v = u.nextSibling) !== null) break;
            u = h, h = u.parentNode;
          }
          u = v;
        }
        n = a === -1 || d === -1 ? null : { start: a, end: d };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Zo = { focusedElem: e, selectionRange: n }, yi = !1, M = t; M !== null; ) if (t = M, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, M = e;
  else for (; M !== null; ) {
    t = M;
    try {
      var w = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (w !== null) {
            var f = w.memoizedProps, k = w.memoizedState, m = t.stateNode, g = m.getSnapshotBeforeUpdate(t.elementType === t.type ? f : qe(t.type, f), k);
            m.__reactInternalSnapshotBeforeUpdate = g;
          }
          break;
        case 3:
          var y = t.stateNode.containerInfo;
          y.nodeType === 1 ? y.textContent = "" : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(z(163));
      }
    } catch (x) {
      ne(t, t.return, x);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, M = e;
      break;
    }
    M = t.return;
  }
  return w = Ma, Ma = !1, w;
}
function or(e, t, n) {
  var i = t.updateQueue;
  if (i = i !== null ? i.lastEffect : null, i !== null) {
    var o = i = i.next;
    do {
      if ((o.tag & e) === e) {
        var l = o.destroy;
        o.destroy = void 0, l !== void 0 && gl(t, n, l);
      }
      o = o.next;
    } while (o !== i);
  }
}
function Qi(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var i = n.create;
        n.destroy = i();
      }
      n = n.next;
    } while (n !== t);
  }
}
function ml(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function Xc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Xc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[ot], delete t[xr], delete t[nl], delete t[mf], delete t[yf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function qc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Fa(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || qc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function yl(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = wi));
  else if (i !== 4 && (e = e.child, e !== null)) for (yl(e, t, n), e = e.sibling; e !== null; ) yl(e, t, n), e = e.sibling;
}
function xl(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (i !== 4 && (e = e.child, e !== null)) for (xl(e, t, n), e = e.sibling; e !== null; ) xl(e, t, n), e = e.sibling;
}
var fe = null, Je = !1;
function wt(e, t, n) {
  for (n = n.child; n !== null; ) Jc(e, t, n), n = n.sibling;
}
function Jc(e, t, n) {
  if (st && typeof st.onCommitFiberUnmount == "function") try {
    st.onCommitFiberUnmount(Ai, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ke || gn(n, t);
    case 6:
      var i = fe, o = Je;
      fe = null, wt(e, t, n), fe = i, Je = o, fe !== null && (Je ? (e = fe, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : fe.removeChild(n.stateNode));
      break;
    case 18:
      fe !== null && (Je ? (e = fe, n = n.stateNode, e.nodeType === 8 ? xo(e.parentNode, n) : e.nodeType === 1 && xo(e, n), fr(e)) : xo(fe, n.stateNode));
      break;
    case 4:
      i = fe, o = Je, fe = n.stateNode.containerInfo, Je = !0, wt(e, t, n), fe = i, Je = o;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ke && (i = n.updateQueue, i !== null && (i = i.lastEffect, i !== null))) {
        o = i = i.next;
        do {
          var l = o, s = l.destroy;
          l = l.tag, s !== void 0 && (l & 2 || l & 4) && gl(n, t, s), o = o.next;
        } while (o !== i);
      }
      wt(e, t, n);
      break;
    case 1:
      if (!ke && (gn(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function")) try {
        i.props = n.memoizedProps, i.state = n.memoizedState, i.componentWillUnmount();
      } catch (a) {
        ne(n, t, a);
      }
      wt(e, t, n);
      break;
    case 21:
      wt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ke = (i = ke) || n.memoizedState !== null, wt(e, t, n), ke = i) : wt(e, t, n);
      break;
    default:
      wt(e, t, n);
  }
}
function Ea(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Ff()), t.forEach(function(i) {
      var o = Bf.bind(null, e, i);
      n.has(i) || (n.add(i), i.then(o, o));
    });
  }
}
function Xe(e, t) {
  var n = t.deletions;
  if (n !== null) for (var i = 0; i < n.length; i++) {
    var o = n[i];
    try {
      var l = e, s = t, a = s;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            fe = a.stateNode, Je = !1;
            break e;
          case 3:
            fe = a.stateNode.containerInfo, Je = !0;
            break e;
          case 4:
            fe = a.stateNode.containerInfo, Je = !0;
            break e;
        }
        a = a.return;
      }
      if (fe === null) throw Error(z(160));
      Jc(l, s, o), fe = null, Je = !1;
      var d = o.alternate;
      d !== null && (d.return = null), o.return = null;
    } catch (c) {
      ne(o, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Zc(t, e), t = t.sibling;
}
function Zc(e, t) {
  var n = e.alternate, i = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Xe(t, e), rt(e), i & 4) {
        try {
          or(3, e, e.return), Qi(3, e);
        } catch (f) {
          ne(e, e.return, f);
        }
        try {
          or(5, e, e.return);
        } catch (f) {
          ne(e, e.return, f);
        }
      }
      break;
    case 1:
      Xe(t, e), rt(e), i & 512 && n !== null && gn(n, n.return);
      break;
    case 5:
      if (Xe(t, e), rt(e), i & 512 && n !== null && gn(n, n.return), e.flags & 32) {
        var o = e.stateNode;
        try {
          dr(o, "");
        } catch (f) {
          ne(e, e.return, f);
        }
      }
      if (i & 4 && (o = e.stateNode, o != null)) {
        var l = e.memoizedProps, s = n !== null ? n.memoizedProps : l, a = e.type, d = e.updateQueue;
        if (e.updateQueue = null, d !== null) try {
          a === "input" && l.type === "radio" && l.name != null && kd(o, l), Ho(a, s);
          var c = Ho(a, l);
          for (s = 0; s < d.length; s += 2) {
            var p = d[s], u = d[s + 1];
            p === "style" ? zd(o, u) : p === "dangerouslySetInnerHTML" ? Sd(o, u) : p === "children" ? dr(o, u) : Ll(o, p, u, c);
          }
          switch (a) {
            case "input":
              No(o, l);
              break;
            case "textarea":
              bd(o, l);
              break;
            case "select":
              var h = o._wrapperState.wasMultiple;
              o._wrapperState.wasMultiple = !!l.multiple;
              var v = l.value;
              v != null ? xn(o, !!l.multiple, v, !1) : h !== !!l.multiple && (l.defaultValue != null ? xn(
                o,
                !!l.multiple,
                l.defaultValue,
                !0
              ) : xn(o, !!l.multiple, l.multiple ? [] : "", !1));
          }
          o[xr] = l;
        } catch (f) {
          ne(e, e.return, f);
        }
      }
      break;
    case 6:
      if (Xe(t, e), rt(e), i & 4) {
        if (e.stateNode === null) throw Error(z(162));
        o = e.stateNode, l = e.memoizedProps;
        try {
          o.nodeValue = l;
        } catch (f) {
          ne(e, e.return, f);
        }
      }
      break;
    case 3:
      if (Xe(t, e), rt(e), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
        fr(t.containerInfo);
      } catch (f) {
        ne(e, e.return, f);
      }
      break;
    case 4:
      Xe(t, e), rt(e);
      break;
    case 13:
      Xe(t, e), rt(e), o = e.child, o.flags & 8192 && (l = o.memoizedState !== null, o.stateNode.isHidden = l, !l || o.alternate !== null && o.alternate.memoizedState !== null || (ys = re())), i & 4 && Ea(e);
      break;
    case 22:
      if (p = n !== null && n.memoizedState !== null, e.mode & 1 ? (ke = (c = ke) || p, Xe(t, e), ke = c) : Xe(t, e), rt(e), i & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !p && e.mode & 1) for (M = e, p = e.child; p !== null; ) {
          for (u = M = p; M !== null; ) {
            switch (h = M, v = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                or(4, h, h.return);
                break;
              case 1:
                gn(h, h.return);
                var w = h.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  i = h, n = h.return;
                  try {
                    t = i, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (f) {
                    ne(i, n, f);
                  }
                }
                break;
              case 5:
                gn(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Da(u);
                  continue;
                }
            }
            v !== null ? (v.return = h, M = v) : Da(u);
          }
          p = p.sibling;
        }
        e: for (p = null, u = e; ; ) {
          if (u.tag === 5) {
            if (p === null) {
              p = u;
              try {
                o = u.stateNode, c ? (l = o.style, typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none") : (a = u.stateNode, d = u.memoizedProps.style, s = d != null && d.hasOwnProperty("display") ? d.display : null, a.style.display = Cd("display", s));
              } catch (f) {
                ne(e, e.return, f);
              }
            }
          } else if (u.tag === 6) {
            if (p === null) try {
              u.stateNode.nodeValue = c ? "" : u.memoizedProps;
            } catch (f) {
              ne(e, e.return, f);
            }
          } else if ((u.tag !== 22 && u.tag !== 23 || u.memoizedState === null || u === e) && u.child !== null) {
            u.child.return = u, u = u.child;
            continue;
          }
          if (u === e) break e;
          for (; u.sibling === null; ) {
            if (u.return === null || u.return === e) break e;
            p === u && (p = null), u = u.return;
          }
          p === u && (p = null), u.sibling.return = u.return, u = u.sibling;
        }
      }
      break;
    case 19:
      Xe(t, e), rt(e), i & 4 && Ea(e);
      break;
    case 21:
      break;
    default:
      Xe(
        t,
        e
      ), rt(e);
  }
}
function rt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (qc(n)) {
            var i = n;
            break e;
          }
          n = n.return;
        }
        throw Error(z(160));
      }
      switch (i.tag) {
        case 5:
          var o = i.stateNode;
          i.flags & 32 && (dr(o, ""), i.flags &= -33);
          var l = Fa(e);
          xl(e, l, o);
          break;
        case 3:
        case 4:
          var s = i.stateNode.containerInfo, a = Fa(e);
          yl(e, a, s);
          break;
        default:
          throw Error(z(161));
      }
    } catch (d) {
      ne(e, e.return, d);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Pf(e, t, n) {
  M = e, eu(e);
}
function eu(e, t, n) {
  for (var i = (e.mode & 1) !== 0; M !== null; ) {
    var o = M, l = o.child;
    if (o.tag === 22 && i) {
      var s = o.memoizedState !== null || Qr;
      if (!s) {
        var a = o.alternate, d = a !== null && a.memoizedState !== null || ke;
        a = Qr;
        var c = ke;
        if (Qr = s, (ke = d) && !c) for (M = o; M !== null; ) s = M, d = s.child, s.tag === 22 && s.memoizedState !== null ? Na(o) : d !== null ? (d.return = s, M = d) : Na(o);
        for (; l !== null; ) M = l, eu(l), l = l.sibling;
        M = o, Qr = a, ke = c;
      }
      Pa(e);
    } else o.subtreeFlags & 8772 && l !== null ? (l.return = o, M = l) : Pa(e);
  }
}
function Pa(e) {
  for (; M !== null; ) {
    var t = M;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ke || Qi(5, t);
            break;
          case 1:
            var i = t.stateNode;
            if (t.flags & 4 && !ke) if (n === null) i.componentDidMount();
            else {
              var o = t.elementType === t.type ? n.memoizedProps : qe(t.type, n.memoizedProps);
              i.componentDidUpdate(o, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
            }
            var l = t.updateQueue;
            l !== null && va(t, l, i);
            break;
          case 3:
            var s = t.updateQueue;
            if (s !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              va(t, s, n);
            }
            break;
          case 5:
            var a = t.stateNode;
            if (n === null && t.flags & 4) {
              n = a;
              var d = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  d.autoFocus && n.focus();
                  break;
                case "img":
                  d.src && (n.src = d.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var c = t.alternate;
              if (c !== null) {
                var p = c.memoizedState;
                if (p !== null) {
                  var u = p.dehydrated;
                  u !== null && fr(u);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(z(163));
        }
        ke || t.flags & 512 && ml(t);
      } catch (h) {
        ne(t, t.return, h);
      }
    }
    if (t === e) {
      M = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, M = n;
      break;
    }
    M = t.return;
  }
}
function Da(e) {
  for (; M !== null; ) {
    var t = M;
    if (t === e) {
      M = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, M = n;
      break;
    }
    M = t.return;
  }
}
function Na(e) {
  for (; M !== null; ) {
    var t = M;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Qi(4, t);
          } catch (d) {
            ne(t, n, d);
          }
          break;
        case 1:
          var i = t.stateNode;
          if (typeof i.componentDidMount == "function") {
            var o = t.return;
            try {
              i.componentDidMount();
            } catch (d) {
              ne(t, o, d);
            }
          }
          var l = t.return;
          try {
            ml(t);
          } catch (d) {
            ne(t, l, d);
          }
          break;
        case 5:
          var s = t.return;
          try {
            ml(t);
          } catch (d) {
            ne(t, s, d);
          }
      }
    } catch (d) {
      ne(t, t.return, d);
    }
    if (t === e) {
      M = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, M = a;
      break;
    }
    M = t.return;
  }
}
var Df = Math.ceil, $i = vt.ReactCurrentDispatcher, gs = vt.ReactCurrentOwner, Qe = vt.ReactCurrentBatchConfig, W = 0, pe = null, oe = null, he = 0, Ee = 0, mn = Lt(0), de = 0, Sr = null, Jt = 0, Yi = 0, ms = 0, lr = null, _e = null, ys = 0, In = 1 / 0, ct = null, Mi = !1, vl = null, Mt = null, Yr = !1, zt = null, Fi = 0, sr = 0, wl = null, ai = -1, di = 0;
function Se() {
  return W & 6 ? re() : ai !== -1 ? ai : ai = re();
}
function Ft(e) {
  return e.mode & 1 ? W & 2 && he !== 0 ? he & -he : vf.transition !== null ? (di === 0 && (di = Ld()), di) : (e = V, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ud(e.type)), e) : 1;
}
function tt(e, t, n, i) {
  if (50 < sr) throw sr = 0, wl = null, Error(z(185));
  zr(e, n, i), (!(W & 2) || e !== pe) && (e === pe && (!(W & 2) && (Yi |= n), de === 4 && St(e, he)), Me(e, i), n === 1 && W === 0 && !(t.mode & 1) && (In = re() + 500, Vi && At()));
}
function Me(e, t) {
  var n = e.callbackNode;
  xp(e, t);
  var i = mi(e, e === pe ? he : 0);
  if (i === 0) n !== null && Gs(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = i & -i, e.callbackPriority !== t) {
    if (n != null && Gs(n), t === 1) e.tag === 0 ? xf(La.bind(null, e)) : cc(La.bind(null, e)), hf(function() {
      !(W & 6) && At();
    }), n = null;
    else {
      switch (Ad(i)) {
        case 1:
          n = Bl;
          break;
        case 4:
          n = Dd;
          break;
        case 16:
          n = gi;
          break;
        case 536870912:
          n = Nd;
          break;
        default:
          n = gi;
      }
      n = au(n, tu.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function tu(e, t) {
  if (ai = -1, di = 0, W & 6) throw Error(z(327));
  var n = e.callbackNode;
  if (jn() && e.callbackNode !== n) return null;
  var i = mi(e, e === pe ? he : 0);
  if (i === 0) return null;
  if (i & 30 || i & e.expiredLanes || t) t = Ei(e, i);
  else {
    t = i;
    var o = W;
    W |= 2;
    var l = ru();
    (pe !== e || he !== t) && (ct = null, In = re() + 500, Qt(e, t));
    do
      try {
        Af();
        break;
      } catch (a) {
        nu(e, a);
      }
    while (!0);
    ns(), $i.current = l, W = o, oe !== null ? t = 0 : (pe = null, he = 0, t = de);
  }
  if (t !== 0) {
    if (t === 2 && (o = Qo(e), o !== 0 && (i = o, t = kl(e, o))), t === 1) throw n = Sr, Qt(e, 0), St(e, i), Me(e, re()), n;
    if (t === 6) St(e, i);
    else {
      if (o = e.current.alternate, !(i & 30) && !Nf(o) && (t = Ei(e, i), t === 2 && (l = Qo(e), l !== 0 && (i = l, t = kl(e, l))), t === 1)) throw n = Sr, Qt(e, 0), St(e, i), Me(e, re()), n;
      switch (e.finishedWork = o, e.finishedLanes = i, t) {
        case 0:
        case 1:
          throw Error(z(345));
        case 2:
          Ht(e, _e, ct);
          break;
        case 3:
          if (St(e, i), (i & 130023424) === i && (t = ys + 500 - re(), 10 < t)) {
            if (mi(e, 0) !== 0) break;
            if (o = e.suspendedLanes, (o & i) !== i) {
              Se(), e.pingedLanes |= e.suspendedLanes & o;
              break;
            }
            e.timeoutHandle = tl(Ht.bind(null, e, _e, ct), t);
            break;
          }
          Ht(e, _e, ct);
          break;
        case 4:
          if (St(e, i), (i & 4194240) === i) break;
          for (t = e.eventTimes, o = -1; 0 < i; ) {
            var s = 31 - et(i);
            l = 1 << s, s = t[s], s > o && (o = s), i &= ~l;
          }
          if (i = o, i = re() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * Df(i / 1960)) - i, 10 < i) {
            e.timeoutHandle = tl(Ht.bind(null, e, _e, ct), i);
            break;
          }
          Ht(e, _e, ct);
          break;
        case 5:
          Ht(e, _e, ct);
          break;
        default:
          throw Error(z(329));
      }
    }
  }
  return Me(e, re()), e.callbackNode === n ? tu.bind(null, e) : null;
}
function kl(e, t) {
  var n = lr;
  return e.current.memoizedState.isDehydrated && (Qt(e, t).flags |= 256), e = Ei(e, t), e !== 2 && (t = _e, _e = n, t !== null && bl(t)), e;
}
function bl(e) {
  _e === null ? _e = e : _e.push.apply(_e, e);
}
function Nf(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var i = 0; i < n.length; i++) {
        var o = n[i], l = o.getSnapshot;
        o = o.value;
        try {
          if (!nt(l(), o)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function St(e, t) {
  for (t &= ~ms, t &= ~Yi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - et(t), i = 1 << n;
    e[n] = -1, t &= ~i;
  }
}
function La(e) {
  if (W & 6) throw Error(z(327));
  jn();
  var t = mi(e, 0);
  if (!(t & 1)) return Me(e, re()), null;
  var n = Ei(e, t);
  if (e.tag !== 0 && n === 2) {
    var i = Qo(e);
    i !== 0 && (t = i, n = kl(e, i));
  }
  if (n === 1) throw n = Sr, Qt(e, 0), St(e, t), Me(e, re()), n;
  if (n === 6) throw Error(z(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ht(e, _e, ct), Me(e, re()), null;
}
function xs(e, t) {
  var n = W;
  W |= 1;
  try {
    return e(t);
  } finally {
    W = n, W === 0 && (In = re() + 500, Vi && At());
  }
}
function Zt(e) {
  zt !== null && zt.tag === 0 && !(W & 6) && jn();
  var t = W;
  W |= 1;
  var n = Qe.transition, i = V;
  try {
    if (Qe.transition = null, V = 1, e) return e();
  } finally {
    V = i, Qe.transition = n, W = t, !(W & 6) && At();
  }
}
function vs() {
  Ee = mn.current, K(mn);
}
function Qt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, ff(n)), oe !== null) for (n = oe.return; n !== null; ) {
    var i = n;
    switch (Zl(i), i.tag) {
      case 1:
        i = i.type.childContextTypes, i != null && ki();
        break;
      case 3:
        _n(), K(Ie), K(be), as();
        break;
      case 5:
        ss(i);
        break;
      case 4:
        _n();
        break;
      case 13:
        K(q);
        break;
      case 19:
        K(q);
        break;
      case 10:
        rs(i.type._context);
        break;
      case 22:
      case 23:
        vs();
    }
    n = n.return;
  }
  if (pe = e, oe = e = Et(e.current, null), he = Ee = t, de = 0, Sr = null, ms = Yi = Jt = 0, _e = lr = null, Ut !== null) {
    for (t = 0; t < Ut.length; t++) if (n = Ut[t], i = n.interleaved, i !== null) {
      n.interleaved = null;
      var o = i.next, l = n.pending;
      if (l !== null) {
        var s = l.next;
        l.next = o, i.next = s;
      }
      n.pending = i;
    }
    Ut = null;
  }
  return e;
}
function nu(e, t) {
  do {
    var n = oe;
    try {
      if (ns(), oi.current = Ii, Ri) {
        for (var i = J.memoizedState; i !== null; ) {
          var o = i.queue;
          o !== null && (o.pending = null), i = i.next;
        }
        Ri = !1;
      }
      if (qt = 0, ue = ae = J = null, ir = !1, kr = 0, gs.current = null, n === null || n.return === null) {
        de = 1, Sr = t, oe = null;
        break;
      }
      e: {
        var l = e, s = n.return, a = n, d = t;
        if (t = he, a.flags |= 32768, d !== null && typeof d == "object" && typeof d.then == "function") {
          var c = d, p = a, u = p.tag;
          if (!(p.mode & 1) && (u === 0 || u === 11 || u === 15)) {
            var h = p.alternate;
            h ? (p.updateQueue = h.updateQueue, p.memoizedState = h.memoizedState, p.lanes = h.lanes) : (p.updateQueue = null, p.memoizedState = null);
          }
          var v = Ca(s);
          if (v !== null) {
            v.flags &= -257, za(v, s, a, l, t), v.mode & 1 && Sa(l, c, t), t = v, d = c;
            var w = t.updateQueue;
            if (w === null) {
              var f = /* @__PURE__ */ new Set();
              f.add(d), t.updateQueue = f;
            } else w.add(d);
            break e;
          } else {
            if (!(t & 1)) {
              Sa(l, c, t), ws();
              break e;
            }
            d = Error(z(426));
          }
        } else if (X && a.mode & 1) {
          var k = Ca(s);
          if (k !== null) {
            !(k.flags & 65536) && (k.flags |= 256), za(k, s, a, l, t), es(Rn(d, a));
            break e;
          }
        }
        l = d = Rn(d, a), de !== 4 && (de = 2), lr === null ? lr = [l] : lr.push(l), l = s;
        do {
          switch (l.tag) {
            case 3:
              l.flags |= 65536, t &= -t, l.lanes |= t;
              var m = Ac(l, d, t);
              xa(l, m);
              break e;
            case 1:
              a = d;
              var g = l.type, y = l.stateNode;
              if (!(l.flags & 128) && (typeof g.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (Mt === null || !Mt.has(y)))) {
                l.flags |= 65536, t &= -t, l.lanes |= t;
                var x = Oc(l, a, t);
                xa(l, x);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      ou(n);
    } catch (b) {
      t = b, oe === n && n !== null && (oe = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function ru() {
  var e = $i.current;
  return $i.current = Ii, e === null ? Ii : e;
}
function ws() {
  (de === 0 || de === 3 || de === 2) && (de = 4), pe === null || !(Jt & 268435455) && !(Yi & 268435455) || St(pe, he);
}
function Ei(e, t) {
  var n = W;
  W |= 2;
  var i = ru();
  (pe !== e || he !== t) && (ct = null, Qt(e, t));
  do
    try {
      Lf();
      break;
    } catch (o) {
      nu(e, o);
    }
  while (!0);
  if (ns(), W = n, $i.current = i, oe !== null) throw Error(z(261));
  return pe = null, he = 0, de;
}
function Lf() {
  for (; oe !== null; ) iu(oe);
}
function Af() {
  for (; oe !== null && !dp(); ) iu(oe);
}
function iu(e) {
  var t = su(e.alternate, e, Ee);
  e.memoizedProps = e.pendingProps, t === null ? ou(e) : oe = t, gs.current = null;
}
function ou(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Mf(n, t), n !== null) {
        n.flags &= 32767, oe = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        de = 6, oe = null;
        return;
      }
    } else if (n = $f(n, t, Ee), n !== null) {
      oe = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      oe = t;
      return;
    }
    oe = t = e;
  } while (t !== null);
  de === 0 && (de = 5);
}
function Ht(e, t, n) {
  var i = V, o = Qe.transition;
  try {
    Qe.transition = null, V = 1, Of(e, t, n, i);
  } finally {
    Qe.transition = o, V = i;
  }
  return null;
}
function Of(e, t, n, i) {
  do
    jn();
  while (zt !== null);
  if (W & 6) throw Error(z(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(z(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var l = n.lanes | n.childLanes;
  if (vp(e, l), e === pe && (oe = pe = null, he = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Yr || (Yr = !0, au(gi, function() {
    return jn(), null;
  })), l = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || l) {
    l = Qe.transition, Qe.transition = null;
    var s = V;
    V = 1;
    var a = W;
    W |= 4, gs.current = null, Ef(e, n), Zc(n, e), lf(Zo), yi = !!Jo, Zo = Jo = null, e.current = n, Pf(n), cp(), W = a, V = s, Qe.transition = l;
  } else e.current = n;
  if (Yr && (Yr = !1, zt = e, Fi = o), l = e.pendingLanes, l === 0 && (Mt = null), fp(n.stateNode), Me(e, re()), t !== null) for (i = e.onRecoverableError, n = 0; n < t.length; n++) o = t[n], i(o.value, { componentStack: o.stack, digest: o.digest });
  if (Mi) throw Mi = !1, e = vl, vl = null, e;
  return Fi & 1 && e.tag !== 0 && jn(), l = e.pendingLanes, l & 1 ? e === wl ? sr++ : (sr = 0, wl = e) : sr = 0, At(), null;
}
function jn() {
  if (zt !== null) {
    var e = Ad(Fi), t = Qe.transition, n = V;
    try {
      if (Qe.transition = null, V = 16 > e ? 16 : e, zt === null) var i = !1;
      else {
        if (e = zt, zt = null, Fi = 0, W & 6) throw Error(z(331));
        var o = W;
        for (W |= 4, M = e.current; M !== null; ) {
          var l = M, s = l.child;
          if (M.flags & 16) {
            var a = l.deletions;
            if (a !== null) {
              for (var d = 0; d < a.length; d++) {
                var c = a[d];
                for (M = c; M !== null; ) {
                  var p = M;
                  switch (p.tag) {
                    case 0:
                    case 11:
                    case 15:
                      or(8, p, l);
                  }
                  var u = p.child;
                  if (u !== null) u.return = p, M = u;
                  else for (; M !== null; ) {
                    p = M;
                    var h = p.sibling, v = p.return;
                    if (Xc(p), p === c) {
                      M = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = v, M = h;
                      break;
                    }
                    M = v;
                  }
                }
              }
              var w = l.alternate;
              if (w !== null) {
                var f = w.child;
                if (f !== null) {
                  w.child = null;
                  do {
                    var k = f.sibling;
                    f.sibling = null, f = k;
                  } while (f !== null);
                }
              }
              M = l;
            }
          }
          if (l.subtreeFlags & 2064 && s !== null) s.return = l, M = s;
          else e: for (; M !== null; ) {
            if (l = M, l.flags & 2048) switch (l.tag) {
              case 0:
              case 11:
              case 15:
                or(9, l, l.return);
            }
            var m = l.sibling;
            if (m !== null) {
              m.return = l.return, M = m;
              break e;
            }
            M = l.return;
          }
        }
        var g = e.current;
        for (M = g; M !== null; ) {
          s = M;
          var y = s.child;
          if (s.subtreeFlags & 2064 && y !== null) y.return = s, M = y;
          else e: for (s = g; M !== null; ) {
            if (a = M, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Qi(9, a);
              }
            } catch (b) {
              ne(a, a.return, b);
            }
            if (a === s) {
              M = null;
              break e;
            }
            var x = a.sibling;
            if (x !== null) {
              x.return = a.return, M = x;
              break e;
            }
            M = a.return;
          }
        }
        if (W = o, At(), st && typeof st.onPostCommitFiberRoot == "function") try {
          st.onPostCommitFiberRoot(Ai, e);
        } catch {
        }
        i = !0;
      }
      return i;
    } finally {
      V = n, Qe.transition = t;
    }
  }
  return !1;
}
function Aa(e, t, n) {
  t = Rn(n, t), t = Ac(e, t, 1), e = $t(e, t, 1), t = Se(), e !== null && (zr(e, 1, t), Me(e, t));
}
function ne(e, t, n) {
  if (e.tag === 3) Aa(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Aa(t, e, n);
      break;
    } else if (t.tag === 1) {
      var i = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (Mt === null || !Mt.has(i))) {
        e = Rn(n, e), e = Oc(t, e, 1), t = $t(t, e, 1), e = Se(), t !== null && (zr(t, 1, e), Me(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Wf(e, t, n) {
  var i = e.pingCache;
  i !== null && i.delete(t), t = Se(), e.pingedLanes |= e.suspendedLanes & n, pe === e && (he & n) === n && (de === 4 || de === 3 && (he & 130023424) === he && 500 > re() - ys ? Qt(e, 0) : ms |= n), Me(e, t);
}
function lu(e, t) {
  t === 0 && (e.mode & 1 ? (t = Lr, Lr <<= 1, !(Lr & 130023424) && (Lr = 4194304)) : t = 1);
  var n = Se();
  e = yt(e, t), e !== null && (zr(e, t, n), Me(e, n));
}
function Hf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), lu(e, n);
}
function Bf(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var i = e.stateNode, o = e.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      i = e.stateNode;
      break;
    default:
      throw Error(z(314));
  }
  i !== null && i.delete(t), lu(e, n);
}
var su;
su = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Ie.current) Re = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Re = !1, If(e, t, n);
    Re = !!(e.flags & 131072);
  }
  else Re = !1, X && t.flags & 1048576 && uc(t, Si, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var i = t.type;
      si(e, t), e = t.pendingProps;
      var o = Cn(t, be.current);
      bn(t, n), o = cs(null, t, i, e, o, n);
      var l = us();
      return t.flags |= 1, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, $e(i) ? (l = !0, bi(t)) : l = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, os(t), o.updater = Gi, t.stateNode = o, o._reactInternals = t, al(t, i, e, n), t = ul(null, t, i, !0, l, n)) : (t.tag = 0, X && l && Jl(t), je(null, t, o, n), t = t.child), t;
    case 16:
      i = t.elementType;
      e: {
        switch (si(e, t), e = t.pendingProps, o = i._init, i = o(i._payload), t.type = i, o = t.tag = Uf(i), e = qe(i, e), o) {
          case 0:
            t = cl(null, t, i, e, n);
            break e;
          case 1:
            t = Ra(null, t, i, e, n);
            break e;
          case 11:
            t = Ta(null, t, i, e, n);
            break e;
          case 14:
            t = _a(null, t, i, qe(i.type, e), n);
            break e;
        }
        throw Error(z(
          306,
          i,
          ""
        ));
      }
      return t;
    case 0:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : qe(i, o), cl(e, t, i, o, n);
    case 1:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : qe(i, o), Ra(e, t, i, o, n);
    case 3:
      e: {
        if (Vc(t), e === null) throw Error(z(387));
        i = t.pendingProps, l = t.memoizedState, o = l.element, yc(e, t), Ti(t, i, null, n);
        var s = t.memoizedState;
        if (i = s.element, l.isDehydrated) if (l = { element: i, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = l, t.memoizedState = l, t.flags & 256) {
          o = Rn(Error(z(423)), t), t = Ia(e, t, i, n, o);
          break e;
        } else if (i !== o) {
          o = Rn(Error(z(424)), t), t = Ia(e, t, i, n, o);
          break e;
        } else for (Pe = It(t.stateNode.containerInfo.firstChild), De = t, X = !0, Ze = null, n = gc(t, null, i, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (zn(), i === o) {
            t = xt(e, t, n);
            break e;
          }
          je(e, t, i, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return xc(t), e === null && ol(t), i = t.type, o = t.pendingProps, l = e !== null ? e.memoizedProps : null, s = o.children, el(i, o) ? s = null : l !== null && el(i, l) && (t.flags |= 32), Bc(e, t), je(e, t, s, n), t.child;
    case 6:
      return e === null && ol(t), null;
    case 13:
      return Uc(e, t, n);
    case 4:
      return ls(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = Tn(t, null, i, n) : je(e, t, i, n), t.child;
    case 11:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : qe(i, o), Ta(e, t, i, o, n);
    case 7:
      return je(e, t, t.pendingProps, n), t.child;
    case 8:
      return je(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return je(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (i = t.type._context, o = t.pendingProps, l = t.memoizedProps, s = o.value, Q(Ci, i._currentValue), i._currentValue = s, l !== null) if (nt(l.value, s)) {
          if (l.children === o.children && !Ie.current) {
            t = xt(e, t, n);
            break e;
          }
        } else for (l = t.child, l !== null && (l.return = t); l !== null; ) {
          var a = l.dependencies;
          if (a !== null) {
            s = l.child;
            for (var d = a.firstContext; d !== null; ) {
              if (d.context === i) {
                if (l.tag === 1) {
                  d = ht(-1, n & -n), d.tag = 2;
                  var c = l.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var p = c.pending;
                    p === null ? d.next = d : (d.next = p.next, p.next = d), c.pending = d;
                  }
                }
                l.lanes |= n, d = l.alternate, d !== null && (d.lanes |= n), ll(
                  l.return,
                  n,
                  t
                ), a.lanes |= n;
                break;
              }
              d = d.next;
            }
          } else if (l.tag === 10) s = l.type === t.type ? null : l.child;
          else if (l.tag === 18) {
            if (s = l.return, s === null) throw Error(z(341));
            s.lanes |= n, a = s.alternate, a !== null && (a.lanes |= n), ll(s, n, t), s = l.sibling;
          } else s = l.child;
          if (s !== null) s.return = l;
          else for (s = l; s !== null; ) {
            if (s === t) {
              s = null;
              break;
            }
            if (l = s.sibling, l !== null) {
              l.return = s.return, s = l;
              break;
            }
            s = s.return;
          }
          l = s;
        }
        je(e, t, o.children, n), t = t.child;
      }
      return t;
    case 9:
      return o = t.type, i = t.pendingProps.children, bn(t, n), o = Ye(o), i = i(o), t.flags |= 1, je(e, t, i, n), t.child;
    case 14:
      return i = t.type, o = qe(i, t.pendingProps), o = qe(i.type, o), _a(e, t, i, o, n);
    case 15:
      return Wc(e, t, t.type, t.pendingProps, n);
    case 17:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : qe(i, o), si(e, t), t.tag = 1, $e(i) ? (e = !0, bi(t)) : e = !1, bn(t, n), Lc(t, i, o), al(t, i, o, n), ul(null, t, i, !0, e, n);
    case 19:
      return Gc(e, t, n);
    case 22:
      return Hc(e, t, n);
  }
  throw Error(z(156, t.tag));
};
function au(e, t) {
  return Pd(e, t);
}
function Vf(e, t, n, i) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ue(e, t, n, i) {
  return new Vf(e, t, n, i);
}
function ks(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Uf(e) {
  if (typeof e == "function") return ks(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Ol) return 11;
    if (e === Wl) return 14;
  }
  return 2;
}
function Et(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ue(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function ci(e, t, n, i, o, l) {
  var s = 2;
  if (i = e, typeof e == "function") ks(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else e: switch (e) {
    case ln:
      return Yt(n.children, o, l, t);
    case Al:
      s = 8, o |= 8;
      break;
    case Mo:
      return e = Ue(12, n, t, o | 2), e.elementType = Mo, e.lanes = l, e;
    case Fo:
      return e = Ue(13, n, t, o), e.elementType = Fo, e.lanes = l, e;
    case Eo:
      return e = Ue(19, n, t, o), e.elementType = Eo, e.lanes = l, e;
    case xd:
      return Ki(n, o, l, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case md:
          s = 10;
          break e;
        case yd:
          s = 9;
          break e;
        case Ol:
          s = 11;
          break e;
        case Wl:
          s = 14;
          break e;
        case kt:
          s = 16, i = null;
          break e;
      }
      throw Error(z(130, e == null ? e : typeof e, ""));
  }
  return t = Ue(s, n, t, o), t.elementType = e, t.type = i, t.lanes = l, t;
}
function Yt(e, t, n, i) {
  return e = Ue(7, e, i, t), e.lanes = n, e;
}
function Ki(e, t, n, i) {
  return e = Ue(22, e, i, t), e.elementType = xd, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function zo(e, t, n) {
  return e = Ue(6, e, null, t), e.lanes = n, e;
}
function To(e, t, n) {
  return t = Ue(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Gf(e, t, n, i, o) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = lo(0), this.expirationTimes = lo(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = lo(0), this.identifierPrefix = i, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null;
}
function bs(e, t, n, i, o, l, s, a, d) {
  return e = new Gf(e, t, n, a, d), t === 1 ? (t = 1, l === !0 && (t |= 8)) : t = 0, l = Ue(3, null, null, t), e.current = l, l.stateNode = e, l.memoizedState = { element: i, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, os(l), e;
}
function Qf(e, t, n) {
  var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: on, key: i == null ? null : "" + i, children: e, containerInfo: t, implementation: n };
}
function du(e) {
  if (!e) return Dt;
  e = e._reactInternals;
  e: {
    if (tn(e) !== e || e.tag !== 1) throw Error(z(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if ($e(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(z(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if ($e(n)) return dc(e, n, t);
  }
  return t;
}
function cu(e, t, n, i, o, l, s, a, d) {
  return e = bs(n, i, !0, e, o, l, s, a, d), e.context = du(null), n = e.current, i = Se(), o = Ft(n), l = ht(i, o), l.callback = t ?? null, $t(n, l, o), e.current.lanes = o, zr(e, o, i), Me(e, i), e;
}
function Xi(e, t, n, i) {
  var o = t.current, l = Se(), s = Ft(o);
  return n = du(n), t.context === null ? t.context = n : t.pendingContext = n, t = ht(l, s), t.payload = { element: e }, i = i === void 0 ? null : i, i !== null && (t.callback = i), e = $t(o, t, s), e !== null && (tt(e, o, s, l), ii(e, o, s)), s;
}
function Pi(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Oa(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function js(e, t) {
  Oa(e, t), (e = e.alternate) && Oa(e, t);
}
function Yf() {
  return null;
}
var uu = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Ss(e) {
  this._internalRoot = e;
}
qi.prototype.render = Ss.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(z(409));
  Xi(e, t, null, null);
};
qi.prototype.unmount = Ss.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Zt(function() {
      Xi(null, e, null, null);
    }), t[mt] = null;
  }
};
function qi(e) {
  this._internalRoot = e;
}
qi.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Hd();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < jt.length && t !== 0 && t < jt[n].priority; n++) ;
    jt.splice(n, 0, e), n === 0 && Vd(e);
  }
};
function Cs(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Ji(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Wa() {
}
function Kf(e, t, n, i, o) {
  if (o) {
    if (typeof i == "function") {
      var l = i;
      i = function() {
        var c = Pi(s);
        l.call(c);
      };
    }
    var s = cu(t, i, e, 0, null, !1, !1, "", Wa);
    return e._reactRootContainer = s, e[mt] = s.current, mr(e.nodeType === 8 ? e.parentNode : e), Zt(), s;
  }
  for (; o = e.lastChild; ) e.removeChild(o);
  if (typeof i == "function") {
    var a = i;
    i = function() {
      var c = Pi(d);
      a.call(c);
    };
  }
  var d = bs(e, 0, !1, null, null, !1, !1, "", Wa);
  return e._reactRootContainer = d, e[mt] = d.current, mr(e.nodeType === 8 ? e.parentNode : e), Zt(function() {
    Xi(t, d, n, i);
  }), d;
}
function Zi(e, t, n, i, o) {
  var l = n._reactRootContainer;
  if (l) {
    var s = l;
    if (typeof o == "function") {
      var a = o;
      o = function() {
        var d = Pi(s);
        a.call(d);
      };
    }
    Xi(t, s, e, o);
  } else s = Kf(n, t, e, o, i);
  return Pi(s);
}
Od = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = qn(t.pendingLanes);
        n !== 0 && (Vl(t, n | 1), Me(t, re()), !(W & 6) && (In = re() + 500, At()));
      }
      break;
    case 13:
      Zt(function() {
        var i = yt(e, 1);
        if (i !== null) {
          var o = Se();
          tt(i, e, 1, o);
        }
      }), js(e, 1);
  }
};
Ul = function(e) {
  if (e.tag === 13) {
    var t = yt(e, 134217728);
    if (t !== null) {
      var n = Se();
      tt(t, e, 134217728, n);
    }
    js(e, 134217728);
  }
};
Wd = function(e) {
  if (e.tag === 13) {
    var t = Ft(e), n = yt(e, t);
    if (n !== null) {
      var i = Se();
      tt(n, e, t, i);
    }
    js(e, t);
  }
};
Hd = function() {
  return V;
};
Bd = function(e, t) {
  var n = V;
  try {
    return V = e, t();
  } finally {
    V = n;
  }
};
Vo = function(e, t, n) {
  switch (t) {
    case "input":
      if (No(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var i = n[t];
          if (i !== e && i.form === e.form) {
            var o = Bi(i);
            if (!o) throw Error(z(90));
            wd(i), No(i, o);
          }
        }
      }
      break;
    case "textarea":
      bd(e, n);
      break;
    case "select":
      t = n.value, t != null && xn(e, !!n.multiple, t, !1);
  }
};
Rd = xs;
Id = Zt;
var Xf = { usingClientEntryPoint: !1, Events: [_r, cn, Bi, Td, _d, xs] }, Un = { findFiberByHostInstance: Vt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, qf = { bundleType: Un.bundleType, version: Un.version, rendererPackageName: Un.rendererPackageName, rendererConfig: Un.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: vt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Fd(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Un.findFiberByHostInstance || Yf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Kr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Kr.isDisabled && Kr.supportsFiber) try {
    Ai = Kr.inject(qf), st = Kr;
  } catch {
  }
}
Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Xf;
Le.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Cs(t)) throw Error(z(200));
  return Qf(e, t, null, n);
};
Le.createRoot = function(e, t) {
  if (!Cs(e)) throw Error(z(299));
  var n = !1, i = "", o = uu;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = bs(e, 1, !1, null, null, n, !1, i, o), e[mt] = t.current, mr(e.nodeType === 8 ? e.parentNode : e), new Ss(t);
};
Le.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(z(188)) : (e = Object.keys(e).join(","), Error(z(268, e)));
  return e = Fd(t), e = e === null ? null : e.stateNode, e;
};
Le.flushSync = function(e) {
  return Zt(e);
};
Le.hydrate = function(e, t, n) {
  if (!Ji(t)) throw Error(z(200));
  return Zi(null, e, t, !0, n);
};
Le.hydrateRoot = function(e, t, n) {
  if (!Cs(e)) throw Error(z(405));
  var i = n != null && n.hydratedSources || null, o = !1, l = "", s = uu;
  if (n != null && (n.unstable_strictMode === !0 && (o = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = cu(t, null, e, 1, n ?? null, o, !1, l, s), e[mt] = t.current, mr(e), i) for (e = 0; e < i.length; e++) n = i[e], o = n._getVersion, o = o(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, o] : t.mutableSourceEagerHydrationData.push(
    n,
    o
  );
  return new qi(t);
};
Le.render = function(e, t, n) {
  if (!Ji(t)) throw Error(z(200));
  return Zi(null, e, t, !1, n);
};
Le.unmountComponentAtNode = function(e) {
  if (!Ji(e)) throw Error(z(40));
  return e._reactRootContainer ? (Zt(function() {
    Zi(null, null, e, !1, function() {
      e._reactRootContainer = null, e[mt] = null;
    });
  }), !0) : !1;
};
Le.unstable_batchedUpdates = xs;
Le.unstable_renderSubtreeIntoContainer = function(e, t, n, i) {
  if (!Ji(n)) throw Error(z(200));
  if (e == null || e._reactInternals === void 0) throw Error(z(38));
  return Zi(e, t, n, !1, i);
};
Le.version = "18.3.1-next-f1338f8080-20240426";
function pu() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(pu);
    } catch (e) {
      console.error(e);
    }
}
pu(), pd.exports = Le;
var Jf = pd.exports, fu, Ha = Jf;
fu = Ha.createRoot, Ha.hydrateRoot;
const Ir = se.createContext(null);
var hu = { exports: {} }, eo = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zf = Pl, eh = Symbol.for("react.element"), th = Symbol.for("react.fragment"), nh = Object.prototype.hasOwnProperty, rh = Zf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ih = { key: !0, ref: !0, __self: !0, __source: !0 };
function gu(e, t, n) {
  var i, o = {}, l = null, s = null;
  n !== void 0 && (l = "" + n), t.key !== void 0 && (l = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (i in t) nh.call(t, i) && !ih.hasOwnProperty(i) && (o[i] = t[i]);
  if (e && e.defaultProps) for (i in t = e.defaultProps, t) o[i] === void 0 && (o[i] = t[i]);
  return { $$typeof: eh, type: e, key: l, ref: s, props: o, _owner: rh.current };
}
eo.Fragment = th;
eo.jsx = gu;
eo.jsxs = gu;
hu.exports = eo;
var r = hu.exports;
const oh = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;width:100%;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;
function lh(e) {
  const [t, n] = React.useState(e), i = React.useCallback((o, l) => {
    const s = typeof o == "object" && o !== null ? o : { [o]: l };
    n((a) => ({ ...a, ...s })), window.parent.postMessage({ type: "__edit_mode_set_keys", edits: s }, "*"), window.dispatchEvent(new CustomEvent("tweakchange", { detail: s }));
  }, []);
  return [t, i];
}
function sh({ title: e = "Tweaks", noDeckControls: t = !1, children: n }) {
  const [i, o] = React.useState(!1), l = React.useRef(null), s = React.useMemo(
    () => typeof document < "u" && !!document.querySelector("deck-stage"),
    []
  ), [a, d] = React.useState(() => {
    try {
      return localStorage.getItem("deck-stage.railVisible") !== "0";
    } catch {
      return !0;
    }
  }), c = (f) => {
    d(f), window.postMessage({ type: "__deck_rail_visible", on: f }, "*");
  }, p = React.useRef({ x: 16, y: 16 }), u = 16, h = React.useCallback(() => {
    const f = l.current;
    if (!f) return;
    const k = f.offsetWidth, m = f.offsetHeight, g = Math.max(u, window.innerWidth - k - u), y = Math.max(u, window.innerHeight - m - u);
    p.current = {
      x: Math.min(g, Math.max(u, p.current.x)),
      y: Math.min(y, Math.max(u, p.current.y))
    }, f.style.right = p.current.x + "px", f.style.bottom = p.current.y + "px";
  }, []);
  React.useEffect(() => {
    if (!i) return;
    if (h(), typeof ResizeObserver > "u")
      return window.addEventListener("resize", h), () => window.removeEventListener("resize", h);
    const f = new ResizeObserver(h);
    return f.observe(document.documentElement), () => f.disconnect();
  }, [i, h]), React.useEffect(() => {
    const f = (k) => {
      const m = k?.data?.type;
      m === "__activate_edit_mode" ? o(!0) : m === "__deactivate_edit_mode" && o(!1);
    };
    return window.addEventListener("message", f), window.parent.postMessage({ type: "__edit_mode_available" }, "*"), () => window.removeEventListener("message", f);
  }, []);
  const v = () => {
    o(!1), window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
  }, w = (f) => {
    const k = l.current;
    if (!k) return;
    const m = k.getBoundingClientRect(), g = f.clientX, y = f.clientY, x = window.innerWidth - m.right, b = window.innerHeight - m.bottom, j = (C) => {
      p.current = {
        x: x - (C.clientX - g),
        y: b - (C.clientY - y)
      }, h();
    }, S = () => {
      window.removeEventListener("mousemove", j), window.removeEventListener("mouseup", S);
    };
    window.addEventListener("mousemove", j), window.addEventListener("mouseup", S);
  };
  return i ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx("style", { children: oh }),
    /* @__PURE__ */ r.jsxs(
      "div",
      {
        ref: l,
        className: "twk-panel",
        "data-noncommentable": "",
        style: { right: p.current.x, bottom: p.current.y },
        children: [
          /* @__PURE__ */ r.jsxs("div", { className: "twk-hd", onMouseDown: w, children: [
            /* @__PURE__ */ r.jsx("b", { children: e }),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                className: "twk-x",
                "aria-label": "Close tweaks",
                onMouseDown: (f) => f.stopPropagation(),
                onClick: v,
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "twk-body", children: [
            s && !t && /* @__PURE__ */ r.jsx(mu, { label: "Deck", children: /* @__PURE__ */ r.jsx(yu, { label: "Thumbnail rail", value: a, onChange: c }) }),
            n
          ] })
        ]
      }
    )
  ] }) : null;
}
function mu({ label: e, children: t }) {
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx("div", { className: "twk-sect", children: e }),
    t
  ] });
}
function Pn({ label: e, value: t, children: n, inline: i = !1 }) {
  return /* @__PURE__ */ r.jsxs("div", { className: i ? "twk-row twk-row-h" : "twk-row", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "twk-lbl", children: [
      /* @__PURE__ */ r.jsx("span", { children: e }),
      t != null && /* @__PURE__ */ r.jsx("span", { className: "twk-val", children: t })
    ] }),
    n
  ] });
}
function ah({ label: e, value: t, min: n = 0, max: i = 100, step: o = 1, unit: l = "", onChange: s }) {
  return /* @__PURE__ */ r.jsx(Pn, { label: e, value: `${t}${l}`, children: /* @__PURE__ */ r.jsx(
    "input",
    {
      type: "range",
      className: "twk-slider",
      min: n,
      max: i,
      step: o,
      value: t,
      onChange: (a) => s(Number(a.target.value))
    }
  ) });
}
function yu({ label: e, value: t, onChange: n }) {
  return /* @__PURE__ */ r.jsxs("div", { className: "twk-row twk-row-h", children: [
    /* @__PURE__ */ r.jsx("div", { className: "twk-lbl", children: /* @__PURE__ */ r.jsx("span", { children: e }) }),
    /* @__PURE__ */ r.jsx(
      "button",
      {
        type: "button",
        className: "twk-toggle",
        "data-on": t ? "1" : "0",
        role: "switch",
        "aria-checked": !!t,
        onClick: () => n(!t),
        children: /* @__PURE__ */ r.jsx("i", {})
      }
    )
  ] });
}
function dh({ label: e, value: t, options: n, onChange: i }) {
  const o = React.useRef(null), [l, s] = React.useState(!1), a = React.useRef(t);
  a.current = t;
  const d = (k) => String(typeof k == "object" ? k.label : k).length;
  if (!(n.reduce((k, m) => Math.max(k, d(m)), 0) <= ({ 2: 16, 3: 10 }[n.length] ?? 0))) {
    const k = (m) => {
      const g = n.find((y) => String(typeof y == "object" ? y.value : y) === m);
      return g === void 0 ? m : typeof g == "object" ? g.value : g;
    };
    return /* @__PURE__ */ r.jsx(
      xu,
      {
        label: e,
        value: t,
        options: n,
        onChange: (m) => i(k(m))
      }
    );
  }
  const u = n.map((k) => typeof k == "object" ? k : { value: k, label: k }), h = Math.max(0, u.findIndex((k) => k.value === t)), v = u.length, w = (k) => {
    const m = o.current.getBoundingClientRect(), g = m.width - 4, y = Math.floor((k - m.left - 2) / g * v);
    return u[Math.max(0, Math.min(v - 1, y))].value;
  }, f = (k) => {
    s(!0);
    const m = w(k.clientX);
    m !== a.current && i(m);
    const g = (x) => {
      if (!o.current) return;
      const b = w(x.clientX);
      b !== a.current && i(b);
    }, y = () => {
      s(!1), window.removeEventListener("pointermove", g), window.removeEventListener("pointerup", y);
    };
    window.addEventListener("pointermove", g), window.addEventListener("pointerup", y);
  };
  return /* @__PURE__ */ r.jsx(Pn, { label: e, children: /* @__PURE__ */ r.jsxs(
    "div",
    {
      ref: o,
      role: "radiogroup",
      onPointerDown: f,
      className: l ? "twk-seg dragging" : "twk-seg",
      children: [
        /* @__PURE__ */ r.jsx(
          "div",
          {
            className: "twk-seg-thumb",
            style: {
              left: `calc(2px + ${h} * (100% - 4px) / ${v})`,
              width: `calc((100% - 4px) / ${v})`
            }
          }
        ),
        u.map((k) => /* @__PURE__ */ r.jsx("button", { type: "button", role: "radio", "aria-checked": k.value === t, children: k.label }, k.value))
      ]
    }
  ) });
}
function xu({ label: e, value: t, options: n, onChange: i }) {
  return /* @__PURE__ */ r.jsx(Pn, { label: e, children: /* @__PURE__ */ r.jsx("select", { className: "twk-field", value: t, onChange: (o) => i(o.target.value), children: n.map((o) => {
    const l = typeof o == "object" ? o.value : o, s = typeof o == "object" ? o.label : o;
    return /* @__PURE__ */ r.jsx("option", { value: l, children: s }, l);
  }) }) });
}
function ch({ label: e, value: t, placeholder: n, onChange: i }) {
  return /* @__PURE__ */ r.jsx(Pn, { label: e, children: /* @__PURE__ */ r.jsx(
    "input",
    {
      className: "twk-field",
      type: "text",
      value: t,
      placeholder: n,
      onChange: (o) => i(o.target.value)
    }
  ) });
}
function uh({ label: e, value: t, min: n, max: i, step: o = 1, unit: l = "", onChange: s }) {
  const a = (p) => n != null && p < n ? n : i != null && p > i ? i : p, d = React.useRef({ x: 0, val: 0 }), c = (p) => {
    p.preventDefault(), d.current = { x: p.clientX, val: t };
    const u = (String(o).split(".")[1] || "").length, h = (w) => {
      const f = w.clientX - d.current.x, k = d.current.val + f * o, m = Math.round(k / o) * o;
      s(a(Number(m.toFixed(u))));
    }, v = () => {
      window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", v);
    };
    window.addEventListener("pointermove", h), window.addEventListener("pointerup", v);
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "twk-num", children: [
    /* @__PURE__ */ r.jsx("span", { className: "twk-num-lbl", onPointerDown: c, children: e }),
    /* @__PURE__ */ r.jsx(
      "input",
      {
        type: "number",
        value: t,
        min: n,
        max: i,
        step: o,
        onChange: (p) => s(a(Number(p.target.value)))
      }
    ),
    l && /* @__PURE__ */ r.jsx("span", { className: "twk-num-unit", children: l })
  ] });
}
function ph(e) {
  const t = String(e).replace("#", ""), n = t.length === 3 ? t.replace(/./g, (a) => a + a) : t.padEnd(6, "0"), i = parseInt(n.slice(0, 6), 16);
  if (Number.isNaN(i)) return !0;
  const o = i >> 16 & 255, l = i >> 8 & 255, s = i & 255;
  return o * 299 + l * 587 + s * 114 > 148e3;
}
const fh = ({ light: e }) => /* @__PURE__ */ r.jsx("svg", { viewBox: "0 0 14 14", "aria-hidden": "true", children: /* @__PURE__ */ r.jsx(
  "path",
  {
    d: "M3 7.2 5.8 10 11 4.2",
    fill: "none",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: e ? "rgba(0,0,0,.78)" : "#fff"
  }
) });
function hh({ label: e, value: t, options: n, onChange: i }) {
  if (!n || !n.length)
    return /* @__PURE__ */ r.jsxs("div", { className: "twk-row twk-row-h", children: [
      /* @__PURE__ */ r.jsx("div", { className: "twk-lbl", children: /* @__PURE__ */ r.jsx("span", { children: e }) }),
      /* @__PURE__ */ r.jsx(
        "input",
        {
          type: "color",
          className: "twk-swatch",
          value: t,
          onChange: (s) => i(s.target.value)
        }
      )
    ] });
  const o = (s) => String(JSON.stringify(s)).toLowerCase(), l = o(t);
  return /* @__PURE__ */ r.jsx(Pn, { label: e, children: /* @__PURE__ */ r.jsx("div", { className: "twk-chips", role: "radiogroup", children: n.map((s, a) => {
    const d = Array.isArray(s) ? s : [s], [c, ...p] = d, u = p.slice(0, 4), h = o(s) === l;
    return /* @__PURE__ */ r.jsxs(
      "button",
      {
        type: "button",
        className: "twk-chip",
        role: "radio",
        "aria-checked": h,
        "data-on": h ? "1" : "0",
        "aria-label": d.join(", "),
        title: d.join(" · "),
        style: { background: c },
        onClick: () => i(s),
        children: [
          u.length > 0 && /* @__PURE__ */ r.jsx("span", { children: u.map((v, w) => /* @__PURE__ */ r.jsx("i", { style: { background: v } }, w)) }),
          h && /* @__PURE__ */ r.jsx(fh, { light: ph(c) })
        ]
      },
      a
    );
  }) }) });
}
function gh({ label: e, onClick: t, secondary: n = !1 }) {
  return /* @__PURE__ */ r.jsx(
    "button",
    {
      type: "button",
      className: n ? "twk-btn secondary" : "twk-btn",
      onClick: t,
      children: e
    }
  );
}
Object.assign(window, {
  useTweaks: lh,
  TweaksPanel: sh,
  TweakSection: mu,
  TweakRow: Pn,
  TweakSlider: ah,
  TweakToggle: yu,
  TweakRadio: dh,
  TweakSelect: xu,
  TweakText: ch,
  TweakNumber: uh,
  TweakColor: hh,
  TweakButton: gh
});
const mh = ({ name: e, size: t = 18, stroke: n = 1.6, ...i }) => {
  const o = {
    bulb: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("path", { d: "M9 18h6" }),
      /* @__PURE__ */ r.jsx("path", { d: "M10 21h4" }),
      /* @__PURE__ */ r.jsx("path", { d: "M12 3a6 6 0 0 0-4 10c1 1 1.5 2 1.5 3h5c0-1 .5-2 1.5-3a6 6 0 0 0-4-10z" })
    ] }),
    speaker: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("rect", { x: "6", y: "3", width: "12", height: "18", rx: "2" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "14", r: "3.2" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "7", r: "1" })
    ] }),
    cam: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M3 7h12l4-3v16l-4-3H3z" }) }),
    tv: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("rect", { x: "3", y: "5", width: "18", height: "12", rx: "2" }),
      /* @__PURE__ */ r.jsx("path", { d: "M8 21h8M12 17v4" })
    ] }),
    lock: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("rect", { x: "5", y: "11", width: "14", height: "9", rx: "2" }),
      /* @__PURE__ */ r.jsx("path", { d: "M8 11V8a4 4 0 0 1 8 0v3" })
    ] }),
    cal: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
      /* @__PURE__ */ r.jsx("path", { d: "M3 9h18M8 3v4M16 3v4" })
    ] }),
    weather: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "4" }),
      /* @__PURE__ */ r.jsx("path", { d: "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" })
    ] }),
    clock: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "9" }),
      /* @__PURE__ */ r.jsx("path", { d: "M12 7v5l3 2" })
    ] }),
    scene: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" }) }),
    therm: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M14 14V5a2 2 0 1 0-4 0v9a4 4 0 1 0 4 0z" }) }),
    play: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M7 5v14l12-7z", fill: "currentColor", stroke: "none" }) }),
    pause: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("rect", { x: "7", y: "5", width: "3.5", height: "14", rx: "1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ r.jsx("rect", { x: "13.5", y: "5", width: "3.5", height: "14", rx: "1", fill: "currentColor", stroke: "none" })
    ] }),
    next: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("path", { d: "M6 5l10 7-10 7z", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ r.jsx("rect", { x: "17", y: "5", width: "2", height: "14", fill: "currentColor", stroke: "none" })
    ] }),
    prev: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("path", { d: "M18 5L8 12l10 7z", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ r.jsx("rect", { x: "5", y: "5", width: "2", height: "14", fill: "currentColor", stroke: "none" })
    ] }),
    chat: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M4 5h16v11H8l-4 4z" }) }),
    send: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M22 2 11 13M22 2l-7 20-4-9-9-4z" }) }),
    mic: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("rect", { x: "9", y: "3", width: "6", height: "12", rx: "3" }),
      /* @__PURE__ */ r.jsx("path", { d: "M5 11a7 7 0 0 0 14 0M12 18v3" })
    ] }),
    sun: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "4" }),
      /* @__PURE__ */ r.jsx("path", { d: "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" })
    ] }),
    moon: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M20 14A8 8 0 1 1 10 4a7 7 0 0 0 10 10z" }) }),
    plus: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M12 5v14M5 12h14" }) }),
    minus: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M5 12h14" }) }),
    sparkle: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M12 3l1.6 5L19 9.6l-5.4 1.4L12 16l-1.6-5L5 9.6 10.4 8z" }) }),
    chevron: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "m6 9 6 6 6-6" }) }),
    chevronR: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "m9 6 6 6-6 6" }) }),
    chevronL: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "m15 6-6 6 6 6" }) }),
    dots: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("circle", { cx: "6", cy: "12", r: "1.4", fill: "currentColor" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "1.4", fill: "currentColor" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "18", cy: "12", r: "1.4", fill: "currentColor" })
    ] }),
    bell: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("path", { d: "M6 16V11a6 6 0 1 1 12 0v5l2 2H4z" }),
      /* @__PURE__ */ r.jsx("path", { d: "M10 20a2 2 0 0 0 4 0" })
    ] }),
    bellOff: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M6 16V11a6 6 0 0 1 9-5M9 17l-3 3h14l-2-2v-3M3 3l18 18" }) }),
    home: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" }) }),
    grid: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1" }),
      /* @__PURE__ */ r.jsx("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1" }),
      /* @__PURE__ */ r.jsx("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }),
      /* @__PURE__ */ r.jsx("rect", { x: "14", y: "14", width: "7", height: "7", rx: "1" })
    ] }),
    settings: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "3" }),
      /* @__PURE__ */ r.jsx("path", { d: "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" })
    ] }),
    droplet: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11z" }) }),
    cloud: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M7 18h10a4 4 0 0 0 .8-7.9 6 6 0 0 0-11.6 1.5A4 4 0 0 0 7 18z" }) }),
    user: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "8", r: "4" }),
      /* @__PURE__ */ r.jsx("path", { d: "M4 21a8 8 0 0 1 16 0" })
    ] }),
    movie: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("rect", { x: "3", y: "6", width: "18", height: "12", rx: "2" }),
      /* @__PURE__ */ r.jsx("path", { d: "M7 6v12M17 6v12M3 10h4M3 14h4M17 10h4M17 14h4" })
    ] }),
    coffee: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("path", { d: "M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" }),
      /* @__PURE__ */ r.jsx("path", { d: "M17 11h2a2 2 0 0 1 0 4h-2M8 4v2M12 4v2" })
    ] }),
    bed: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M3 18v-6a2 2 0 0 1 2-2h14v8M3 14h18M7 10V8a2 2 0 0 1 2-2h2v4" }) }),
    door: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("rect", { x: "6", y: "3", width: "12", height: "18", rx: "1" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "14", cy: "12", r: ".8", fill: "currentColor" })
    ] }),
    package: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("path", { d: "M3 7l9-4 9 4-9 4z" }),
      /* @__PURE__ */ r.jsx("path", { d: "M3 7v10l9 4 9-4V7M12 11v10" })
    ] }),
    music: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("path", { d: "M9 18V5l11-2v13" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "6", cy: "18", r: "3" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "17", cy: "16", r: "3" })
    ] }),
    apple: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M16 2c-1 1.5-2.5 2-4 2 0-1.5 1-3 4-2zM12 7c-3 0-6 2-6 6 0 5 3 9 6 9s2-1 4-1 1 1 4 1c2 0 4-3 4-6-2-1-3-3-3-5 0-1.5 1-3 2-3-1-2-3-3-5-3-2 0-3 2-6 2z", fill: "currentColor", stroke: "none" }) }),
    airplay: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M5 17H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1M8 21l4-5 4 5z" }) }),
    leaf: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M5 19c8 0 14-6 14-14-7 0-13 4-14 11 0 1-1 1.5-1 3" }) }),
    shield: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" }) }),
    car: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("path", { d: "M3 13l2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5v5h-2v-2H5v2H3z" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "7", cy: "15", r: "1.4" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "17", cy: "15", r: "1.4" })
    ] }),
    garage: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("path", { d: "M3 11 12 5l9 6v9H3z" }),
      /* @__PURE__ */ r.jsx("path", { d: "M6 14h12v6H6z" }),
      /* @__PURE__ */ r.jsx("path", { d: "M6 17h12" })
    ] }),
    battery: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("rect", { x: "3", y: "8", width: "16", height: "9", rx: "1" }),
      /* @__PURE__ */ r.jsx("path", { d: "M21 11v3" })
    ] }),
    plug: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M9 7v4M15 7v4M7 11h10v3a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4z M12 18v3" }) }),
    search: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("circle", { cx: "11", cy: "11", r: "7" }),
      /* @__PURE__ */ r.jsx("path", { d: "m20 20-4-4" })
    ] }),
    heart: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" }) }),
    queue: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("path", { d: "M3 6h18M3 12h12M3 18h9" }),
      /* @__PURE__ */ r.jsx("path", { d: "m17 15 4 3-4 3z", fill: "currentColor" })
    ] }),
    repeat: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M17 2 21 6l-4 4M3 12V8a2 2 0 0 1 2-2h16M7 22l-4-4 4-4M21 12v4a2 2 0 0 1-2 2H3" }) }),
    shuffle: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M16 3h5v5M4 20l17-17M21 16v5h-5M15 15l6 6M4 4l5 5" }) }),
    library: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M3 5h4v15H3zM10 5h4v15h-4zM17 5l5 1-3 14-5-1z" }) }),
    list: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01" }) }),
    check: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "m5 12 5 5 9-10" }) }),
    x: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M6 6l12 12M18 6 6 18" }) }),
    arrowR: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M5 12h14M13 5l7 7-7 7" }) }),
    fan: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "2" }),
      /* @__PURE__ */ r.jsx("path", { d: "M12 10c0-3 1-6 3-7 1 2 1 5-1 7M12 14c0 3-1 6-3 7-1-2-1-5 1-7M14 12c3 0 6 1 7 3-2 1-5 1-7-1M10 12c-3 0-6-1-7-3 2-1 5-1 7 1" })
    ] }),
    snowflake: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M12 3v18M3 12h18M5 5l14 14M19 5 5 19" }) }),
    bolt: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "m13 2-9 13h7l-1 7 9-13h-7z" }) }),
    location: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("path", { d: "M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "9", r: "2.5" })
    ] }),
    outlook: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("rect", { x: "3", y: "5", width: "11", height: "14", rx: "1" }),
      /* @__PURE__ */ r.jsx("path", { d: "M14 9h7v6h-7M17 9v6" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "8.5", cy: "12", r: "2.5" })
    ] }),
    nest: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "9" }),
      /* @__PURE__ */ r.jsx("path", { d: "M12 3v18M3 12h18", opacity: ".3" })
    ] }),
    tesla: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M5 6c2 0 5 1 7 1s5-1 7-1l-2 2c-1.5-.5-3-.7-5-.7s-3.5.2-5 .7zM12 7v14" }) }),
    ring: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "3" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "9", opacity: ".3" })
    ] }),
    hue: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "6" }),
      /* @__PURE__ */ r.jsx("path", { d: "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6 7.7 7.7M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" })
    ] }),
    sonos: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M4 8c2-2 5-2 8 0s6 2 8 0M4 12c2-2 5-2 8 0s6 2 8 0M4 16c2-2 5-2 8 0s6 2 8 0" }) }),
    myq: /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }),
      /* @__PURE__ */ r.jsx("path", { d: "M9 9v6M15 9v6M9 12h6" })
    ] }),
    folder: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }) }),
    edit: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" }) }),
    trash: /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx("path", { d: "M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" }) })
  };
  return /* @__PURE__ */ r.jsx(
    "svg",
    {
      width: t,
      height: t,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: n,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...i,
      children: o[e] || null
    }
  );
}, yh = [
  { id: "living", name: "Living Room", icon: "home" },
  { id: "kitchen", name: "Kitchen", icon: "coffee" },
  { id: "bedroom", name: "Bedroom", icon: "bed" },
  { id: "office", name: "Office", icon: "user" },
  { id: "outdoor", name: "Outdoor", icon: "leaf" }
], Te = [
  { id: "t1", title: "Cellophane", artist: "FKA twigs", album: "MAGDALENE", dur: 234, hue: "oklch(45% 0.12 30)" },
  { id: "t2", title: "Motion Sickness", artist: "Phoebe Bridgers", album: "Stranger in the Alps", dur: 248, hue: "oklch(38% 0.08 250)" },
  { id: "t3", title: "A Sunday Kind of Love", artist: "Etta James", album: "At Last!", dur: 185, hue: "oklch(40% 0.14 60)" },
  { id: "t4", title: "Ribs", artist: "Lorde", album: "Pure Heroine", dur: 267, hue: "oklch(35% 0.10 270)" },
  { id: "t5", title: "Nights", artist: "Frank Ocean", album: "Blonde", dur: 307, hue: "oklch(50% 0.13 80)" },
  { id: "t6", title: "Redbone", artist: "Childish Gambino", album: "Awaken, My Love!", dur: 326, hue: "oklch(45% 0.15 25)" },
  { id: "t7", title: "Glory Box", artist: "Portishead", album: "Dummy", dur: 303, hue: "oklch(28% 0.06 240)" },
  { id: "t8", title: "Pyramids", artist: "Frank Ocean", album: "Channel Orange", dur: 594, hue: "oklch(48% 0.18 50)" },
  { id: "t9", title: "Two Weeks", artist: "FKA twigs", album: "LP1", dur: 235, hue: "oklch(35% 0.10 320)" },
  { id: "t10", title: "Liability", artist: "Lorde", album: "Melodrama", dur: 172, hue: "oklch(42% 0.12 340)" },
  { id: "t11", title: "Pink + White", artist: "Frank Ocean", album: "Blonde", dur: 184, hue: "oklch(72% 0.10 20)" },
  { id: "t12", title: "Wading", artist: "James Blake", album: "Playing Robots Into Heaven", dur: 215, hue: "oklch(36% 0.06 200)" },
  { id: "t13", title: "Glide", artist: "Pleasure", album: "Future Now", dur: 241, hue: "oklch(45% 0.13 90)" },
  { id: "t14", title: "Sun Goes Down", artist: "Lil Nas X", album: "Montero", dur: 171, hue: "oklch(58% 0.16 60)" },
  { id: "t15", title: "August", artist: "Taylor Swift", album: "folklore", dur: 261, hue: "oklch(55% 0.05 80)" }
], vu = [
  { id: "pl1", name: "Sunday Slow", count: 42, art: ["oklch(45% 0.12 30)", "oklch(40% 0.14 60)", "oklch(35% 0.10 270)", "oklch(58% 0.16 60)"], tracks: ["t3", "t4", "t10", "t11", "t15"] },
  { id: "pl2", name: "Late Night", count: 28, art: ["oklch(28% 0.06 240)", "oklch(35% 0.10 320)", "oklch(36% 0.06 200)", "oklch(45% 0.12 30)"], tracks: ["t1", "t7", "t9", "t12"] },
  { id: "pl3", name: "Cooking", count: 64, art: ["oklch(50% 0.13 80)", "oklch(48% 0.18 50)", "oklch(45% 0.13 90)", "oklch(58% 0.16 60)"], tracks: ["t5", "t6", "t8", "t13", "t14"] },
  { id: "pl4", name: "Frances' Picks", count: 91, art: ["oklch(72% 0.10 20)", "oklch(40% 0.14 60)", "oklch(35% 0.10 270)", "oklch(45% 0.15 25)"], tracks: ["t1", "t2", "t3", "t4", "t5", "t6", "t11"] },
  { id: "pl5", name: "Focus", count: 37, art: ["oklch(36% 0.06 200)", "oklch(28% 0.06 240)", "oklch(35% 0.10 270)", "oklch(42% 0.12 340)"], tracks: ["t7", "t9", "t12"] },
  { id: "pl6", name: "Dinner Party", count: 54, art: ["oklch(58% 0.16 60)", "oklch(45% 0.13 90)", "oklch(72% 0.10 20)", "oklch(50% 0.13 80)"], tracks: ["t5", "t8", "t13", "t14", "t15"] }
], wu = () => ({
  // device-add state
  integrations: [
    { id: "hue", name: "Philips Hue", icon: "hue", status: "connected", devices: 9, account: "frances@home", color: "#ffd23f" },
    { id: "sonos", name: "Sonos", icon: "sonos", status: "connected", devices: 5, account: "Willowbrook Household", color: "#ff6b35" },
    { id: "ring", name: "Ring", icon: "ring", status: "connected", devices: 6, account: "frances.willows@gmail", color: "#5b8cff" },
    { id: "nest", name: "Nest", icon: "nest", status: "connected", devices: 1, account: "Google · frances.w", color: "#3ec9b3" },
    { id: "appletv", name: "Apple TV", icon: "apple", status: "connected", devices: 2, account: "iCloud · Frances W.", color: "#a78bfa" },
    { id: "googletv", name: "Google TV", icon: "tv", status: "connected", devices: 1, account: "Google · frances.w", color: "#5b8cff" },
    { id: "lgthinq", name: "LG ThinQ", icon: "tv", status: "connected", devices: 1, account: "frances.w@icloud.com", color: "#a8174e" },
    { id: "music", name: "Apple Music", icon: "apple", status: "connected", devices: "Library", account: "frances.w@icloud.com · 2,847 songs", color: "#ff5c8a" },
    { id: "tesla", name: "Tesla", icon: "tesla", status: "connected", devices: 1, account: "frances.willows@gmail · Model 3", color: "#c96442" },
    { id: "myq", name: "MyQ Garage", icon: "myq", status: "connected", devices: 2, account: "Willowbrook", color: "#7d4f6b" },
    { id: "outlook", name: "Microsoft Outlook", icon: "outlook", status: "connected", devices: "Calendar", account: "frances.w@willowstudio.com", color: "#5b8cff" },
    { id: "lutron", name: "Lutron Caseta", icon: "plug", status: "available", devices: 0, account: "", color: "#7a8c6c" },
    { id: "ecobee", name: "Ecobee", icon: "therm", status: "available", devices: 0, account: "", color: "#3ec9b3" },
    { id: "august", name: "August Locks", icon: "lock", status: "available", devices: 0, account: "", color: "#b8843e" },
    { id: "spotify", name: "Spotify", icon: "music", status: "available", devices: 0, account: "", color: "#1db954" },
    { id: "roborock", name: "Roborock", icon: "fan", status: "available", devices: 0, account: "", color: "#5b8cff" },
    { id: "shark", name: "Shark Robot", icon: "fan", status: "connected", devices: 1, account: "frances.w@icloud.com · IQ Robot R101AE", color: "#1f6feb" },
    { id: "simplisafe", name: "SimpliSafe", icon: "shield", status: "available", devices: 0, account: "", color: "#c14d36" },
    { id: "wyze", name: "Wyze", icon: "cam", status: "available", devices: 0, account: "", color: "#3ec9b3" },
    { id: "homekit", name: "Apple HomeKit", icon: "apple", status: "available", devices: 0, account: "", color: "#a78bfa" },
    { id: "matter", name: "Matter", icon: "sparkle", status: "available", devices: 0, account: "", color: "#7d4f6b" }
  ],
  lights: [
    { id: "l1", room: "living", name: "Sofa lamp", on: !0, brightness: 60, color: "#f3c277" },
    { id: "l2", room: "living", name: "Reading nook", on: !0, brightness: 35, color: "#e89870" },
    { id: "l3", room: "living", name: "Floor lamp", on: !1, brightness: 80, color: "#ffe0b2" },
    { id: "l4", room: "kitchen", name: "Island pendant", on: !0, brightness: 90, color: "#ffe9c2" },
    { id: "l5", room: "kitchen", name: "Under-counter", on: !0, brightness: 70, color: "#fff1cf" },
    { id: "l6", room: "bedroom", name: "Bedside left", on: !1, brightness: 40, color: "#e0a878" },
    { id: "l7", room: "bedroom", name: "Bedside right", on: !1, brightness: 40, color: "#e0a878" },
    { id: "l8", room: "office", name: "Desk lamp", on: !0, brightness: 100, color: "#ffffff" },
    { id: "l9", room: "outdoor", name: "Porch", on: !1, brightness: 80, color: "#ffd49a" }
  ],
  // Each speaker has its OWN now-playing — different rooms can play different tracks
  speakers: [
    { id: "s1", room: "living", name: "Living Room", type: "sonos", playing: !0, vol: 32, group: "g1", trackId: "t1", progress: 87, queue: ["t2", "t4", "t11", "t15", "t10"] },
    { id: "s2", room: "kitchen", name: "Kitchen", type: "sonos", playing: !0, vol: 28, group: "g1", trackId: "t1", progress: 87, queue: ["t2", "t4", "t11", "t15", "t10"] },
    { id: "s3", room: "bedroom", name: "Bedroom", type: "sonos", playing: !1, vol: 18, group: null, trackId: "t10", progress: 0, queue: ["t11", "t15", "t9"] },
    { id: "s4", room: "office", name: "Office", type: "airplay", playing: !0, vol: 25, group: null, trackId: "t12", progress: 42, queue: ["t7", "t9", "t1", "t13"] },
    { id: "s5", room: "outdoor", name: "Patio", type: "sonos", playing: !1, vol: 40, group: null, trackId: "t6", progress: 0, queue: ["t13", "t14", "t5"] }
  ],
  ring: { mode: "disarmed", lastChanged: "8:18 AM", changedBy: "Frances" },
  // disarmed | home | away
  cameras: [
    { id: "c1", name: "Front Door", room: "outdoor", online: !0, motion: !0, hue: "oklch(70% 0.15 80)" },
    { id: "c2", name: "Back Yard", room: "outdoor", online: !0, motion: !1, hue: "oklch(60% 0.10 200)" },
    { id: "c3", name: "Driveway", room: "outdoor", online: !0, motion: !1, hue: "oklch(55% 0.08 250)" },
    { id: "c4", name: "Garage", room: "outdoor", online: !0, motion: !1, hue: "oklch(40% 0.04 30)" },
    { id: "c5", name: "Living Room", room: "living", online: !0, motion: !1, hue: "oklch(72% 0.08 60)" },
    { id: "c6", name: "Nursery", room: "bedroom", online: !1, motion: !1, hue: "oklch(80% 0.06 320)" }
  ],
  locks: [
    { id: "lk1", name: "Front Door", locked: !0 },
    { id: "lk2", name: "Back Door", locked: !0 },
    { id: "lk3", name: "Side gate", locked: !1 }
  ],
  tv: { on: !1, source: "Apple TV", show: "Severance · S2E4" },
  tvs: [
    { id: "tv1", name: "Living Room TV", brand: "appletv", model: "Apple TV 4K", room: "living", on: !0, app: "Apple TV+", show: "Severance · S2E4", poster: "oklch(45% 0.10 280)", playing: !0, progress: 1322, dur: 3300, vol: 24, mute: !1, input: "HDMI 1" },
    { id: "tv2", name: "Bedroom TV", brand: "appletv", model: "Apple TV HD", room: "bedroom", on: !1, app: "Home", show: "—", poster: "oklch(40% 0.06 250)", playing: !1, progress: 0, dur: 0, vol: 18, mute: !1, input: "HDMI 1" },
    { id: "tv3", name: "Office TV", brand: "googletv", model: "Chromecast w/ Google TV", room: "office", on: !0, app: "YouTube", show: "Architecture Digest · 73 Q", poster: "oklch(50% 0.12 60)", playing: !0, progress: 412, dur: 1080, vol: 30, mute: !1, input: "Cast" },
    { id: "tv4", name: "Kitchen TV", brand: "lgthinq", model: 'LG C3 OLED 55"', room: "kitchen", on: !0, app: "Netflix", show: "The Bear · S3E2", poster: "oklch(38% 0.09 30)", playing: !1, progress: 780, dur: 1740, vol: 22, mute: !0, input: "HDMI 2" }
  ],
  thermostat: { temp: 71, target: 72, mode: "auto", humidity: 42 },
  weather: { temp: 64, summary: "Partly cloudy", high: 71, low: 52, hourly: [62, 63, 64, 66, 68, 70, 71, 70, 68, 66, 63, 61] },
  scenes: [
    { id: "movie", name: "Movie Night", icon: "movie", active: !1 },
    { id: "morning", name: "Good Morning", icon: "coffee", active: !0 },
    { id: "sleep", name: "Goodnight", icon: "moon", active: !1 },
    { id: "dinner", name: "Dinner Party", icon: "sparkle", active: !1 },
    { id: "focus", name: "Focus", icon: "leaf", active: !1 },
    { id: "away", name: "Away", icon: "shield", active: !1 }
  ],
  alarms: [
    { id: "a1", label: "Weekday wake-up", time: "6:45 AM", days: "Mon–Fri", on: !0 },
    { id: "a2", label: "Sunday brunch", time: "9:30 AM", days: "Sun", on: !0 },
    { id: "a3", label: "Sourdough proof", time: "2:00 PM", days: "Sat", on: !1 }
  ],
  // Outlook calendar — preMins controls the DND window before event start
  calendar: [
    { id: "e1", t: "9:00 AM", end: "9:30 AM", title: "Standup", where: "Zoom", organizer: "Maya Ortiz", dnd: !0, preMins: 5, dot: "#c96442", accepted: "accepted" },
    { id: "e2", t: "11:30 AM", end: "12:30 PM", title: "Coffee w/ Maya", where: "Sightglass", organizer: "Frances W.", dnd: !1, preMins: 10, dot: "#3ec9b3", accepted: "accepted" },
    { id: "e3", t: "2:00 PM", end: "2:45 PM", title: "Q3 planning", where: "Teams", organizer: "Liam Park", dnd: !0, preMins: 5, dot: "#a78bfa", accepted: "accepted" },
    { id: "e4", t: "3:00 PM", end: "4:00 PM", title: "Design review", where: "Conf Rm B", organizer: "Kris Tan", dnd: !0, preMins: 10, dot: "#7a5d3a", accepted: "tentative" },
    { id: "e5", t: "5:00 PM", end: "5:30 PM", title: "1:1 w/ Sasha", where: "Teams", organizer: "Sasha Mendoza", dnd: !0, preMins: 5, dot: "#5b8cff", accepted: "accepted" },
    { id: "e6", t: "6:30 PM", end: "7:30 PM", title: "Yoga", where: "Home", organizer: "Frances W.", dnd: !1, preMins: 0, dot: "#a35a76", accepted: "accepted" }
  ],
  dnd: { active: !1, until: null, source: null },
  // global do-not-disturb state
  // Tesla Model 3
  tesla: {
    name: "Frances' Model 3",
    locked: !0,
    charging: !0,
    chargePct: 72,
    chargeRate: 32,
    // mph added
    pluggedIn: !0,
    range: 248,
    // mi
    cabin: 64,
    // F
    target: 70,
    climateOn: !1,
    sentry: !0,
    location: "Home · Driveway",
    odometer: 18742,
    frunk: !1,
    trunk: !1,
    sunroof: 0,
    software: "2026.4.1",
    valet: !1
  },
  // MyQ
  garage: {
    doors: [
      { id: "g1", name: "Main door", open: !1, lastChanged: "12:42 PM" },
      { id: "g2", name: "Side garage", open: !0, lastChanged: "7:31 PM" }
    ],
    history: [
      { t: "7:31 PM", door: "Side garage", action: "opened", who: "Frances" },
      { t: "12:42 PM", door: "Main door", action: "closed", who: "Auto-close (timer)" },
      { t: "12:38 PM", door: "Main door", action: "opened", who: "Frances" },
      { t: "8:15 AM", door: "Main door", action: "closed", who: "Frances" },
      { t: "8:12 AM", door: "Main door", action: "opened", who: "Geofence" }
    ]
  },
  // Shark IQ Robot vacuum
  vacuum: {
    name: "Shark IQ",
    state: "docked",
    // docked | cleaning | returning | paused | stuck
    battery: 96,
    mode: "auto",
    // auto | spot | room
    currentRoom: null,
    cleanedToday: 0,
    // sq ft
    bin: "empty",
    // empty | full
    lastClean: "Yesterday, 2:14 PM",
    schedule: "Mon/Wed/Fri 10:00 AM"
  },
  // Automations — "if X then Y"
  automations: [
    {
      id: "au1",
      name: "Porch light on motion",
      trigger: { type: "motion", cameraId: "c1" },
      actions: [{ type: "light", lightId: "l9", on: !0, brightness: 80 }],
      enabled: !0,
      lastRun: "7:31 PM",
      desc: "When the front door camera sees motion, turn the porch light on."
    },
    {
      id: "au2",
      name: "Lock up when I leave",
      trigger: { type: "leaveHome" },
      actions: [{ type: "lockAll" }, { type: "scene", sceneId: "away" }],
      enabled: !0,
      lastRun: "8:18 AM",
      desc: "When everyone leaves, lock all doors and run the Away scene."
    },
    {
      id: "au3",
      name: "Goodnight at 11 PM",
      trigger: { type: "time", at: "11:00 PM" },
      actions: [{ type: "scene", sceneId: "sleep" }],
      enabled: !1,
      lastRun: null,
      desc: "At 11:00 PM every night, run the Goodnight scene."
    }
  ]
});
function xh(e, t, n) {
  const i = e.trim();
  if (!i) return null;
  const o = i.toLowerCase(), l = ku(i, t);
  if (l)
    return n((f) => ({ ...f, automations: [...f.automations, l] })), `Saved automation: "${l.name}". ${l.desc} You can edit it under Automations.`;
  const s = o.match(/(?:set|make|put|change).*(?:thermostat|temp(?:erature)?|nest|heat|cool|ac).*?(\d{2})/i) || o.match(/(?:thermostat|temp(?:erature)?|nest).*?(\d{2})/i) || o.match(/(\d{2})\s*(?:degrees?|°)/i);
  if (s && /thermostat|temp|nest|degree|°|warmer|colder|heat|cool|ac/i.test(o)) {
    const f = Math.max(50, Math.min(90, +s[1]));
    return n((k) => ({ ...k, thermostat: { ...k.thermostat, target: f } })), `Set the Nest to ${f}°.`;
  }
  if (/warmer|hotter|heat up/i.test(o))
    return n((f) => ({ ...f, thermostat: { ...f.thermostat, target: Math.min(83, f.thermostat.target + 2) } })), "Bumped the thermostat up 2°.";
  if (/colder|cooler|cool (it )?down/i.test(o))
    return n((f) => ({ ...f, thermostat: { ...f.thermostat, target: Math.max(60, f.thermostat.target - 2) } })), "Cooled it down 2°.";
  const a = o.match(/(?:thermostat|nest|mode).*?(cool|heat|auto|off)/i) || o.match(/^(cool|heat|auto)\s*(?:mode|the house)?$/i);
  if (a) {
    const f = a[1].toLowerCase();
    return n((k) => ({ ...k, thermostat: { ...k.thermostat, mode: f } })), `Thermostat set to ${f}.`;
  }
  const d = [
    { match: /(movie|film|cinema)/i, id: "movie", reply: "Setting up movie night. Dimming the living room, switching to Apple TV." },
    { match: /(good ?night|sleep|bedtime)/i, id: "sleep", reply: "Goodnight. Locking up, turning off the TV, easing the lights down." },
    { match: /(good ?morning|wake ?up)/i, id: "morning", reply: "Good morning. Brewing coffee and bringing the kitchen lights up." },
    { match: /focus|work mode/i, id: "focus", reply: "Focus on. Office cool, notifications muted." },
    { match: /(away|leaving|out)/i, id: "away", reply: "Away mode. Doors locked, sentry armed, lights off." },
    { match: /dinner party/i, id: "dinner", reply: "Dinner party scene running." }
  ];
  for (const f of d)
    if (f.match.test(i))
      return n((k) => {
        const m = { ...k, scenes: k.scenes.map((g) => ({ ...g, active: g.id === f.id })) };
        return f.id === "movie" && (m.lights = k.lights.map((g) => g.room === "living" ? { ...g, on: !0, brightness: 12 } : g)), f.id === "sleep" && (m.lights = k.lights.map((g) => ({ ...g, on: !1 })), m.locks = k.locks.map((g) => ({ ...g, locked: !0 }))), f.id === "morning" && (m.lights = k.lights.map((g) => g.room === "kitchen" ? { ...g, on: !0, brightness: 85 } : g)), f.id === "away" && (m.locks = k.locks.map((g) => ({ ...g, locked: !0 })), m.lights = k.lights.map((g) => ({ ...g, on: !1 }))), m;
      }), f.reply;
  const c = o.match(/\b(living|kitchen|bedroom|office|outdoor|porch)\b/i), p = c ? c[1].toLowerCase() === "porch" ? "outdoor" : c[1].toLowerCase() : null, u = o.match(/(\d{1,3})\s*%/), h = u ? Math.max(1, Math.min(100, +u[1])) : null;
  if (/turn (?:on|up)|lights? on|brighten/i.test(o) && /light/i.test(o))
    return n((f) => ({ ...f, lights: f.lights.map((k) => !p || k.room === p ? { ...k, on: !0, brightness: h ?? k.brightness } : k) })), p ? `${ui(p)} lights on${h ? ` at ${h}%` : ""}.` : `Lights on${h ? ` at ${h}%` : ""}.`;
  if (/turn (?:off|down)|lights? off/i.test(o) && /light/i.test(o))
    return n((f) => ({ ...f, lights: f.lights.map((k) => !p || k.room === p ? { ...k, on: !1 } : k) })), p ? `${ui(p)} lights off.` : "Lights off.";
  if (/(dim|lower).*light/i.test(o))
    return n((f) => ({ ...f, lights: f.lights.map((k) => !p || k.room === p ? { ...k, on: !0, brightness: h ?? 30 } : k) })), `Dimmed${p ? ` the ${p}` : ""} to ${h ?? 30}%.`;
  if (/lock (?:up|the house|all|everything|doors)/i.test(o) || /^lock$/i.test(o.trim()))
    return n((f) => ({ ...f, locks: f.locks.map((k) => ({ ...k, locked: !0 })) })), "All doors locked. Sentry armed on the Tesla.";
  const v = o.match(/(?:set|put|switch|change|arm|disarm).*?ring.*?(disarm(?:ed)?|home|away|stay|night)/i) || o.match(/ring.*?(disarm(?:ed)?|home|away|stay|night).*?mode/i) || o.match(/^(?:arm|disarm)(?:\s+(?:to\s+)?(home|away|stay|disarmed))?$/i) || o.match(/(?:arm|set).*?(?:alarm|system).*?(home|away|stay|night)/i) || o.match(/(disarm)(?:\s+(?:the\s+)?(?:alarm|ring|system))?$/i);
  if (v) {
    let f = (v[1] || "").toLowerCase();
    if ((f === "stay" || f === "night") && (f = "home"), f.startsWith("disarm") && (f = "disarmed"), !f && /^arm/i.test(i.trim()) && (f = "away"), f === "disarmed" || f === "home" || f === "away")
      return n((m) => ({
        ...m,
        ring: { ...m.ring || {}, mode: f, lastChanged: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), changedBy: "Voice" },
        locks: f === "away" ? m.locks.map((g) => ({ ...g, locked: !0 })) : m.locks
      })), {
        disarmed: "Ring disarmed. Sensors off.",
        home: "Ring set to Home. Perimeter armed, interior bypassed so you can move around.",
        away: "Ring armed Away. Doors locked, full system armed with a 30-second entry delay."
      }[f];
  }
  if (/unlock front/i.test(o))
    return n((f) => ({ ...f, locks: f.locks.map((k) => k.id === "lk1" ? { ...k, locked: !1 } : k) })), "Unlocking the front door. I'll re-lock in five.";
  if (/unlock back/i.test(o))
    return n((f) => ({ ...f, locks: f.locks.map((k) => k.id === "lk2" ? { ...k, locked: !1 } : k) })), "Back door unlocked.";
  if (/(pause|stop) music/i.test(o))
    return n((f) => ({ ...f, speakers: f.speakers.map((k) => ({ ...k, playing: !1 })) })), "Music paused everywhere.";
  if (/skip|next track/i.test(o))
    return n((f) => ({ ...f, speakers: f.speakers.map((k) => k.playing ? { ...k, trackId: vh(k.trackId), progress: 0 } : k) })), "Skipping to the next track.";
  const w = o.match(/^(?:please\s+)?play\s+(.+?)(?:\s+(?:in|on|to)\s+(?:the\s+)?([a-z\s]+?))?$/i) || o.match(/^(?:put on|start)\s+(.+?)(?:\s+(?:in|on|to)\s+(?:the\s+)?([a-z\s]+?))?$/i);
  if (w) {
    const f = w[1].trim(), k = (w[2] || "").trim().toLowerCase(), m = /everywhere|whole house|all (rooms|speakers)|every room/i.test(i), g = { living: "living", "living room": "living", kitchen: "kitchen", bedroom: "bedroom", office: "office", outdoor: "outdoor", patio: "outdoor", porch: "outdoor" }, y = g[k] || k && Object.keys(g).find((x) => k.includes(x)) || null;
    if (!/^(music|something|a song|tunes)$/i.test(f)) {
      const x = f.toLowerCase();
      let b = Te.find((C) => C.title.toLowerCase() === x) || Te.find((C) => C.title.toLowerCase().includes(x)) || Te.find((C) => C.album.toLowerCase().includes(x)) || Te.find((C) => C.artist.toLowerCase().includes(x)), j = null, S = "";
      if (b) {
        const C = Te.filter((T) => T.id !== b.id && T.artist.toLowerCase() === b.artist.toLowerCase()), $ = Te.filter((T) => T.id !== b.id && !C.includes(T)).slice(0, 4);
        j = [...C, ...$].slice(0, 6).map((T) => T.id), S = `${b.title} — ${b.artist}`;
      } else {
        const C = (t.playlists || vu).find(($) => $.name.toLowerCase().includes(x));
        C && C.tracks.length && (b = Te.find(($) => $.id === C.tracks[0]), j = C.tracks.slice(1, 7), S = `playlist "${C.name}"`);
      }
      if (b) {
        const C = m ? "all speakers" : y ? ui(y) : "the Living Room";
        return n(($) => ({ ...$, speakers: $.speakers.map((T) => m || !y && T.room === "living" || y && T.room === y ? { ...T, trackId: b.id, progress: 0, playing: !0, queue: j || T.queue } : T) })), `Playing ${S} in ${C}.`;
      }
    }
  }
  if (/(play|resume) music/i.test(o))
    return n((f) => ({ ...f, speakers: f.speakers.map((k) => ({ ...k, playing: !0 })) })), "Music playing.";
  if (/precondition|warm.*car|cool.*car|preheat/i.test(o))
    return n((f) => ({ ...f, tesla: { ...f.tesla, climateOn: !0, target: 70 } })), "Preconditioning the Tesla to 70°.";
  if (/charge|tesla|car/i.test(o) && /status|how/i.test(o)) return `Tesla is at ${t.tesla.chargePct}%, ${t.tesla.range} mi range, ${t.tesla.charging ? "charging" : t.tesla.pluggedIn ? "plugged in" : "unplugged"}.`;
  if (/lock.*car|sentry/i.test(o))
    return n((f) => ({ ...f, tesla: { ...f.tesla, locked: !0, sentry: !0 } })), "Tesla locked, sentry on.";
  if (/close.*garage|garage.*close/i.test(o))
    return n((f) => ({ ...f, garage: { ...f.garage, doors: f.garage.doors.map((k) => ({ ...k, open: !1, lastChanged: "now" })) } })), "Closing all garage doors.";
  if (/open.*garage|garage.*open/i.test(o))
    return n((f) => ({ ...f, garage: { ...f.garage, doors: f.garage.doors.map((k) => k.id === "g1" ? { ...k, open: !0, lastChanged: "now" } : k) } })), "Opening the main garage door.";
  if (/(vacuum|shark|roomba|clean.*house|start.*clean)/i.test(o) && /(start|clean|run|begin)/i.test(o)) {
    const f = o.match(/\b(living|kitchen|bedroom|office|outdoor)\b/i);
    return n((k) => ({ ...k, vacuum: { ...k.vacuum, state: "cleaning", mode: f ? "room" : "auto", currentRoom: f ? f[1].toLowerCase() : null } })), f ? `Sending the Shark to clean the ${f[1].toLowerCase()}.` : "Shark is starting a full-house clean.";
  }
  if (/(stop|pause).*(vacuum|shark|clean)/i.test(o))
    return n((f) => ({ ...f, vacuum: { ...f.vacuum, state: "paused" } })), "Vacuum paused.";
  if (/(dock|return).*(vacuum|shark)/i.test(o) || /send.*shark.*home/i.test(o))
    return n((f) => ({ ...f, vacuum: { ...f.vacuum, state: "returning" } })), "Sending the Shark back to its dock.";
  if (/weather/i.test(o)) return `It's ${t.weather.temp}° and ${t.weather.summary.toLowerCase()}. High of ${t.weather.high}° this afternoon.`;
  if (/alarm.*\d|wake.*\d/i.test(o)) {
    const f = o.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (f) {
      const k = +f[1], m = f[2] || "00", g = f[3] ? f[3].toUpperCase() : k < 8 ? "AM" : "PM", y = `${k}:${m} ${g}`;
      return n((x) => ({ ...x, alarms: [{ id: "new" + Date.now(), label: "Tomorrow", time: y, days: "Once", on: !0 }, ...x.alarms] })), `Alarm set for ${y}.`;
    }
  }
  return /do not disturb|dnd/i.test(o) ? (n((f) => ({ ...f, dnd: { active: !0, until: "next meeting end", source: "agent" } })), "Do not disturb on until your next meeting ends.") : null;
}
const ui = (e) => e && e.charAt(0).toUpperCase() + e.slice(1);
function vh(e) {
  const t = Te.findIndex((n) => n.id === e);
  return Te[(t + 1) % Te.length].id;
}
function ku(e, t) {
  const n = e.toLowerCase();
  if (!/^(when(?:ever)?|if|every (?:day|night|morning|evening))\b/i.test(e.trim())) return null;
  let i = null, o = "";
  const l = n.match(/motion (?:on|at|in front of|by|near)\s*(?:the\s*)?([a-z\s]+?)(?:\s*(?:cam(?:era)?|cam))?(?:[,]|\s+then|\s+turn|\s+do|\s+set|\s+lock|\s+open|\s+close|\s+run|$)/i);
  if (l || /motion/i.test(n)) {
    const u = l?.[1]?.trim();
    let h = t.cameras.find((v) => u && v.name.toLowerCase().includes(u));
    h || (h = t.cameras.find((v) => /front/i.test(v.name)) || t.cameras[0]), i = { type: "motion", cameraId: h.id }, o = `motion at ${h.name}`;
  }
  const s = e.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
  if (!i && s) {
    const u = +s[1], h = s[2] || "00", v = s[3].toUpperCase(), w = `${u}:${h} ${v}`;
    i = { type: "time", at: w }, o = `${w}`;
  }
  if (!i && /(?:i|we|someone)\s+(?:get home|arrive|come home)/i.test(n) && (i = { type: "arriveHome" }, o = "I arrive home"), !i && /(?:i|we|everyone)\s+(?:leave|go away)/i.test(n) && (i = { type: "leaveHome" }, o = "I leave home"), !i) return null;
  const a = [], d = [], c = n.match(/turn (?:on|up)\s+(?:the\s+)?([a-z\s]+?)\s*(?:light|lights|lamp)/i);
  if (c) {
    const u = c[1].trim(), h = t.lights.find((v) => u && (v.name.toLowerCase().includes(u) || v.room.toLowerCase().includes(u)));
    h ? (a.push({ type: "light", lightId: h.id, on: !0, brightness: 80 }), d.push(`turn on ${h.name}`)) : (a.push({ type: "allLights", on: !0 }), d.push("turn lights on"));
  } else /turn (?:on|up).*light/i.test(n) && (a.push({ type: "allLights", on: !0 }), d.push("turn lights on"));
  if (/turn (?:off|down).*light|lights? off/i.test(n) && (a.push({ type: "allLights", on: !1 }), d.push("turn lights off")), /lock (?:up|the door|all|everything|doors)|lock the house/i.test(n) && (a.push({ type: "lockAll" }), d.push("lock everything")), /run\s+(?:the\s+)?(goodnight|sleep|movie|away|focus|morning|dinner)/i.test(n)) {
    const u = n.match(/run\s+(?:the\s+)?(goodnight|sleep|movie|away|focus|morning|dinner)/i)[1], h = u === "goodnight" ? "sleep" : u;
    a.push({ type: "scene", sceneId: h }), d.push(`run ${u}`);
  }
  /precondition|warm.*car/i.test(n) && (a.push({ type: "precondition" }), d.push("precondition the Tesla")), /close.*garage/i.test(n) && (a.push({ type: "closeGarage" }), d.push("close the garage"));
  const p = n.match(/(?:set|make).*(?:thermostat|nest|temp).*?(\d{2})/i);
  return p && (a.push({ type: "thermostat", target: +p[1] }), d.push(`set thermostat to ${p[1]}°`)), a.length ? {
    id: "au" + Date.now(),
    name: `${ui(o)} → ${d[0]}`,
    trigger: i,
    actions: a,
    enabled: !0,
    lastRun: null,
    desc: `When ${o}, ${d.join(" and ")}.`
  } : null;
}
function wh(e, t, n) {
  n((i) => {
    let o = { ...i };
    for (const l of e.actions)
      l.type === "light" && (o.lights = o.lights.map((s) => s.id === l.lightId ? { ...s, on: l.on, brightness: l.brightness ?? s.brightness } : s)), l.type === "allLights" && (o.lights = o.lights.map((s) => ({ ...s, on: l.on }))), l.type === "lockAll" && (o.locks = o.locks.map((s) => ({ ...s, locked: !0 }))), l.type === "scene" && (o.scenes = o.scenes.map((s) => ({ ...s, active: s.id === l.sceneId }))), l.type === "precondition" && (o.tesla = { ...o.tesla, climateOn: !0, target: 70 }), l.type === "closeGarage" && (o.garage = { ...o.garage, doors: o.garage.doors.map((s) => ({ ...s, open: !1, lastChanged: "now" })) }), l.type === "thermostat" && (o.thermostat = { ...o.thermostat, target: l.target });
    return o.automations = o.automations.map((l) => l.id === e.id ? { ...l, lastRun: "now" } : l), o;
  });
}
async function kh(e, t, n, i) {
  const o = {
    jarvis: "You are HomeCNTRD, a warm, capable home AI like Jarvis. Be conversational but efficient. 1-3 short sentences unless answering a how-to or recipe question.",
    terse: "You are HomeCNTRD, a terse terminal-style home AI. Reply in <12 words. Lowercase. End with a period.",
    playful: "You are HomeCNTRD, a playful, slightly cheeky home AI named Pip. Warm, upbeat, light humor."
  }[n] || "You are HomeCNTRD, a friendly home AI.", l = /\b(recipe|recipes|cook|make|bake|how to|how do i|what is|where can i|find|search|news|article|review|best|top \d|near me|restaurant|movie|song|music)\b/i.test(e), s = [{ role: "user", content: `${o}

Connected: Hue lights, Sonos & AirPlay, Ring cams, Apple TV, Nest thermostat, Tesla Model 3, MyQ garage, Apple Music, Outlook calendar, Shark vacuum.

Recent:
${t.slice(-6).map((a) => `${a.who === "user" ? "User" : "You"}: ${a.text}`).join(`
`)}

User: "${e}"

${l ? `This is an informational question. Answer warmly in 2-4 sentences, then on NEW lines list 2-4 useful web links in this exact format (no markdown, one per line):
LINK: <Title> | <https://full-url.com>
Pick popular, real sites (NYTimes Cooking, Bon Appétit, Serious Eats, Wikipedia, official sites, etc).` : "Respond naturally as the assistant."}` }];
  try {
    if (window.claude && window.claude.complete) {
      const a = await window.claude.complete({ messages: s });
      if (a && typeof a == "string") return a.trim();
    }
  } catch {
  }
  return i || "I'm offline at the moment, but I noted that.";
}
function bh() {
  const [e, t] = React.useState(() => wu());
  return React.useEffect(() => {
    const n = setInterval(() => {
      t((i) => ({
        ...i,
        speakers: i.speakers.map((o) => o.playing ? { ...o, progress: (o.progress + 1) % (Te.find((l) => l.id === o.trackId)?.dur || 240) } : o)
      }));
    }, 1e3);
    return () => clearInterval(n);
  }, []), [e, t];
}
function jh(e) {
  const t = Math.floor(e / 60), n = Math.floor(e % 60);
  return `${t}:${n.toString().padStart(2, "0")}`;
}
function Sh(e) {
  return Te.find((t) => t.id === e) || Te[0];
}
Object.assign(window, { Icon: mh, ROOMS: yh, TRACKS: Te, PLAYLISTS: vu, initialDevices: wu, runAgent: xh, runAutomation: wh, parseAutomation: ku, callClaude: kh, useHomeState: bh, fmtTime: jh, trackById: Sh });
function bu() {
  return se.useContext(Ir);
}
function Ch(e, t) {
  const n = ((t || "") + " " + (e || "")).toLowerCase();
  return /living|family\s*room|den/.test(n) ? "living" : /kitchen|dining/.test(n) ? "kitchen" : /bed|primary|guest\s*room|nursery/.test(n) ? "bedroom" : /office|study/.test(n) ? "office" : /outdoor|patio|porch|yard|garden|exterior|driveway|garage|backyard|frontyard|front\s*door/.test(n) ? "outdoor" : "living";
}
function zh(e) {
  return e?.state === "on" || e?.state === "open" || e?.state === "unlocked" || e?.state === "playing";
}
function Th(e) {
  return typeof e?.brightness == "number" ? Math.round(e.brightness / 255 * 100) : 80;
}
function _h(e) {
  return !Array.isArray(e) || e.length < 3 ? "#ffe0b2" : "#" + e.slice(0, 3).map((t) => Math.max(0, Math.min(255, t | 0)).toString(16).padStart(2, "0")).join("");
}
function Xr(e) {
  if (!e) return "—";
  try {
    return new Date(e).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } catch {
    return "—";
  }
}
function Rh(e) {
  const t = {
    lights: [],
    speakers: [],
    tvs: [],
    cameras: [],
    locks: [],
    scenes: [],
    automations: [],
    integrations: [],
    garage: { doors: [], history: [] },
    vacuum: null,
    thermostat: null,
    weather: null,
    ring: null,
    tv: { on: !1, source: "—", show: "" },
    todos: [],
    sports: [],
    news: [],
    calendar: [],
    calendarEvents: []
  };
  if (!e)
    return { ...t, ...Ba() };
  const n = Object.values(e);
  for (const l of n) {
    const s = l.entity_id, a = s.split(".")[0], d = l.attributes?.friendly_name || s, c = Ch(d, l.attributes?.area_id);
    switch (a) {
      case "light":
        t.lights.push({
          id: s,
          room: c,
          name: d,
          on: zh(l),
          brightness: Th(l.attributes),
          color: l.attributes?.rgb_color ? _h(l.attributes.rgb_color) : "#ffe0b2"
        });
        break;
      case "media_player": {
        const p = l.attributes?.device_class, u = p === "tv" || /\btv\b/i.test(d) || /apple\s*tv/i.test(d) || /chromecast/i.test(d) || /webos/i.test(d), h = l.state === "playing", v = typeof l.attributes?.volume_level == "number" ? Math.round(l.attributes.volume_level * 100) : 30;
        u ? (t.tvs.push({
          id: s,
          name: d,
          brand: p === "tv" ? "tv" : "appletv",
          model: d,
          room: c,
          on: l.state !== "off" && l.state !== "unavailable",
          app: l.attributes?.app_name || "—",
          show: l.attributes?.media_title || "—",
          poster: "oklch(45% 0.10 280)",
          playing: h,
          progress: l.attributes?.media_position || 0,
          dur: l.attributes?.media_duration || 0,
          vol: v,
          mute: !!l.attributes?.is_volume_muted,
          input: l.attributes?.source || "—"
        }), t.tv.on === !1 && l.state !== "off" && l.state !== "unavailable" && (t.tv = { on: !0, source: l.attributes?.app_name || d, show: l.attributes?.media_title || "" })) : t.speakers.push({
          id: s,
          room: c,
          name: d,
          type: "sonos",
          playing: h,
          vol: v,
          group: l.attributes?.group_members?.[0] || null,
          trackId: null,
          // prototype expected an ID into TRACKS; we don't have that
          progress: l.attributes?.media_position || 0,
          queue: [],
          haMediaTitle: l.attributes?.media_title || null,
          haMediaArtist: l.attributes?.media_artist || null,
          haMediaAlbum: l.attributes?.media_album_name || null,
          haEntityPicture: l.attributes?.entity_picture || null
        });
        break;
      }
      case "lock":
        t.locks.push({ id: s, name: d, locked: l.state === "locked" });
        break;
      case "cover": {
        const p = l.attributes?.device_class;
        (p === "garage" || p === "door" || /garage/i.test(d)) && t.garage.doors.push({
          id: s,
          name: d,
          open: l.state === "open" || l.state === "opening",
          lastChanged: Xr(l.last_changed)
        });
        break;
      }
      case "vacuum":
        t.vacuum || (t.vacuum = {
          id: s,
          name: d,
          state: l.state,
          battery: l.attributes?.battery_level ?? 100,
          mode: "auto",
          currentRoom: null,
          cleanedToday: 0,
          bin: "empty",
          lastClean: "—",
          schedule: "—"
        });
        break;
      case "climate":
        t.thermostat || (t.thermostat = {
          id: s,
          temp: l.attributes?.current_temperature ?? 70,
          target: l.attributes?.temperature ?? l.attributes?.target_temp_high ?? 72,
          mode: l.state || "auto",
          humidity: l.attributes?.current_humidity ?? 42
        });
        break;
      case "weather":
        t.weather || (t.weather = {
          id: s,
          condition: l.state || "unknown",
          temp: Math.round(l.attributes?.temperature ?? 64),
          summary: (l.state || "Partly cloudy").replace(/-/g, " "),
          high: Math.round(l.attributes?.forecast?.[0]?.temperature ?? 71),
          low: Math.round(l.attributes?.forecast?.[0]?.templow ?? 52),
          hourly: (l.attributes?.forecast || []).slice(0, 12).map((p) => Math.round(p.temperature || 65))
        });
        break;
      case "camera":
        t.cameras.push({
          id: s,
          name: d,
          room: c,
          online: l.state !== "unavailable",
          motion: !1,
          hue: "oklch(60% 0.10 200)"
        });
        break;
      case "scene":
        t.scenes.push({ id: s, name: d, icon: "sparkle", active: !1 });
        break;
      case "automation":
        t.automations.push({
          id: s,
          name: d,
          trigger: { type: "ha" },
          actions: [],
          enabled: l.state === "on",
          lastRun: Xr(l.attributes?.last_triggered),
          desc: d
        });
        break;
      case "alarm_control_panel":
        if (!t.ring) {
          const p = { armed_home: "home", armed_away: "away", armed_night: "home", disarmed: "disarmed" };
          t.ring = {
            id: s,
            mode: p[l.state] || "disarmed",
            lastChanged: Xr(l.last_changed),
            changedBy: "HA"
          };
        }
        break;
      case "todo": {
        const p = parseInt(l.state, 10);
        t.todos.push({
          id: s,
          name: d,
          count: Number.isFinite(p) ? p : 0
        });
        break;
      }
      case "calendar":
        if (t.calendar.push({ id: s, name: d }), l.attributes?.message && (l.attributes?.start_time || l.attributes?.start)) {
          const p = l.attributes.start_time || l.attributes.start, u = new Date(p), h = typeof p == "string" && /\d{2}:\d{2}/.test(p), v = l.attributes.all_day === !0 || typeof p == "string" && !h;
          t.calendarEvents.push({
            id: `${s}-next`,
            title: l.attributes.message,
            where: l.attributes.location || "",
            kind: /birthday|bday/i.test(l.attributes.message) ? "birthday" : "event",
            start: p,
            isAllDay: v,
            day: u.getDate(),
            monthShort: u.toLocaleDateString([], { month: "short" }).toUpperCase(),
            timeStr: v ? "All day" : u.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
            sortKey: u.getTime()
          });
        }
        break;
      case "sensor": {
        const p = l.attributes || {};
        if (p.team_homeaway && p.team_score !== void 0)
          t.sports.push({
            id: s,
            team: p.team_name || d,
            opponent: p.opponent_name || "Opponent",
            teamScore: p.team_score,
            oppScore: p.opponent_score,
            state: l.state,
            live: l.state === "IN" || l.state === "in_progress"
          });
        else if (p.team_abbr && p.opponent_abbr) {
          const u = /^(IN|HALF|END)$/.test(l.state);
          t.sports.push({
            id: s,
            team: p.team_abbr,
            opponent: p.opponent_abbr,
            teamScore: p.team_score,
            oppScore: p.opponent_score,
            state: u ? `${p.clock || ""} Q${p.quarter || ""}`.trim() : l.state || "",
            live: u
          });
        }
        break;
      }
      case "event": {
        if (s.startsWith("event.feedreader") || /feedreader|rss/i.test(d)) {
          const p = Array.isArray(l.attributes?.entries) ? l.attributes.entries : [];
          for (const u of p.slice(0, 5))
            t.news.push({
              id: `${s}-${u.id || u.link || u.title}`,
              title: u.title || "Untitled",
              url: u.link || "#",
              source: l.attributes?.feed_title || d,
              timeAgo: Xr(u.published || u.updated || l.last_changed)
            });
        }
        break;
      }
    }
  }
  t.calendarEvents.sort((l, s) => (l.sortKey || 0) - (s.sortKey || 0));
  const i = /* @__PURE__ */ new Map();
  for (const l of n)
    if (l.entity_id.startsWith("binary_sensor.") && l.attributes?.device_class === "motion") {
      const s = (l.attributes?.friendly_name || "").toLowerCase().replace(/\s*motion\s*$/, "").trim();
      s && i.set(s, l.state === "on");
    }
  t.cameras = t.cameras.map((l) => {
    const s = l.name.toLowerCase();
    return { ...l, motion: i.get(s) ?? l.motion };
  });
  const o = Ih(e);
  return o && (t.tesla = Mh(e, o)), { ...t, ...Ba(t) };
}
function Ih(e) {
  for (const t of Object.keys(e)) {
    const n = t.match(/^sensor\.(.+)_battery_range$/);
    if (!n) continue;
    const i = n[1];
    if (e[`sensor.${i}_battery_level`]) return i;
  }
  return null;
}
function $h(e, t) {
  const n = [
    `lock.${t}`,
    `lock.${t}_doors`,
    `lock.${t}_lock`
  ];
  for (const i of n) if (e[i]) return i;
  for (const i of Object.keys(e))
    if (i.startsWith("lock.") && i.includes(t)) return i;
  return null;
}
function Mh(e, t) {
  const n = (v) => e[v], i = (v) => {
    const w = n(v);
    if (!w || w.state === "unknown" || w.state === "unavailable") return null;
    const f = Number(w.state);
    return Number.isFinite(f) ? f : null;
  }, o = $h(e, t), l = o ? n(o) : null, s = n(`sensor.${t}_battery_level`), a = n(`sensor.${t}_battery_range`), d = n(`climate.${t}_climate`), c = n(`sensor.${t}_inside_temperature`), p = n(`sensor.${t}_odometer`), u = n(`device_tracker.${t}_location`), h = s?.attributes?.friendly_name?.replace(/ Battery level$/i, "") || a?.attributes?.friendly_name?.replace(/ Battery range$/i, "") || "Tesla";
  return {
    id: t,
    lockEntityId: o,
    name: h,
    locked: l?.state === "locked",
    chargePct: Math.round(i(`sensor.${t}_battery_level`) ?? 0),
    range: Math.round(i(`sensor.${t}_battery_range`) ?? 0),
    rangeUnit: a?.attributes?.unit_of_measurement || "mi",
    charging: n(`sensor.${t}_charging`)?.state === "Charging",
    chargeRate: Math.round(i(`sensor.${t}_charge_rate_mph`) ?? i(`sensor.${t}_charging_speed`) ?? 0),
    pluggedIn: n(`binary_sensor.${t}_charge_cable`)?.state === "on",
    cabin: Math.round(i(`sensor.${t}_inside_temperature`) ?? 0),
    outside: Math.round(i(`sensor.${t}_outside_temperature`) ?? 0),
    tempUnit: c?.attributes?.unit_of_measurement || "°F",
    target: Math.round(d?.attributes?.temperature ?? 70),
    targetMin: d?.attributes?.min_temp ?? 60,
    targetMax: d?.attributes?.max_temp ?? 82,
    climateOn: !!d && !["off", "unavailable", "unknown"].includes(d.state),
    climateMode: d?.state || "off",
    sentry: n(`switch.${t}_sentry_mode`)?.state === "on",
    valet: n(`switch.${t}_valet_mode`)?.state === "on",
    defrost: n(`switch.${t}_defrost`)?.state === "on",
    location: u?.attributes?.friendly_name || (typeof u?.state == "string" && !/^[\d.\-,]+$/.test(u.state) ? u.state : "—"),
    odometer: Math.round(i(`sensor.${t}_odometer`) ?? 0),
    odometerUnit: p?.attributes?.unit_of_measurement || "mi",
    frunk: n(`cover.${t}_frunk`)?.state === "open",
    trunk: n(`cover.${t}_trunk`)?.state === "open",
    chargePortOpen: n(`cover.${t}_charge_port_door`)?.state === "open",
    sunroof: 0,
    software: n(`update.${t}_software_update`)?.attributes?.installed_version || n(`sensor.${t}_software_version`)?.state || "—",
    chargeLimit: Math.round(i(`number.${t}_charge_limit`) ?? 80),
    chargingAmps: i(`number.${t}_charging_amps`) ?? i(`sensor.${t}_charger_actual_current`) ?? null,
    voltage: i(`sensor.${t}_charger_voltage`) ?? null,
    energyAdded: i(`sensor.${t}_charge_energy_added`) ?? null,
    timeToFull: i(`sensor.${t}_time_to_full_charge`) ?? null
  };
}
function Ba(e) {
  return {
    thermostat: e?.thermostat || { id: null, temp: 70, target: 72, mode: "off", humidity: 42 },
    weather: e?.weather || { temp: 64, summary: "Unavailable", high: 71, low: 52, hourly: [] },
    ring: e?.ring || { id: null, mode: "disarmed", lastChanged: "—", changedBy: "—" },
    vacuum: e?.vacuum || {
      id: null,
      name: "No vacuum",
      state: "docked",
      battery: 100,
      mode: "auto",
      currentRoom: null,
      cleanedToday: 0,
      bin: "empty",
      lastClean: "—",
      schedule: "—"
    },
    tesla: e?.tesla || {
      id: null,
      name: "No Tesla connected",
      locked: !0,
      charging: !1,
      chargePct: 0,
      chargeRate: 0,
      pluggedIn: !1,
      range: 0,
      cabin: 65,
      target: 70,
      climateOn: !1,
      sentry: !1,
      location: "—",
      odometer: 0,
      frunk: !1,
      trunk: !1,
      sunroof: 0,
      software: "—",
      valet: !1
    },
    alarms: [],
    calendar: [],
    dnd: { active: !1, until: null, source: null }
  };
}
const Fh = 50;
typeof window < "u" && !window.__hcDiag && (window.__hcDiag = []);
function lt(e) {
  if (typeof window > "u") return;
  const t = window.__hcDiag;
  for (t.push(e); t.length > Fh; ) t.shift();
}
function Eh(e, t, n) {
  if (!n || typeof n.callService != "function") {
    console.warn("[ha-bridge] hass not available — skipping dispatch"), lt({ ts: Date.now(), kind: "skip", message: "hass not available" });
    return;
  }
  const i = (s, a, d) => {
    const c = { ts: Date.now(), kind: "call", domain: s, service: a, data: d, status: "pending" };
    lt(c), console.log(`[ha-bridge] → ${s}.${a}`, d);
    try {
      const p = n.callService(s, a, d);
      p && typeof p.then == "function" ? p.then(
        () => {
          c.status = "ok", console.log(`[ha-bridge] ✓ ${s}.${a}`);
        },
        (u) => {
          c.status = "error", c.error = u?.message || String(u), console.warn(`[ha-bridge] ✗ ${s}.${a} rejected:`, u?.message || u, u);
        }
      ) : c.status = "ok";
    } catch (p) {
      c.status = "error", c.error = p?.message || String(p), console.warn(`[ha-bridge] ✗ ${s}.${a} threw:`, p);
    }
  };
  for (const s of t.lights || []) {
    const a = e.lights?.find((d) => d.id === s.id);
    a && (a.on !== s.on ? i("light", s.on ? "turn_on" : "turn_off", { entity_id: s.id }) : s.on && a.brightness !== s.brightness && i("light", "turn_on", { entity_id: s.id, brightness_pct: s.brightness }));
  }
  const o = [...t.speakers || [], ...t.tvs || []], l = [...e.speakers || [], ...e.tvs || []];
  for (const s of o) {
    const a = l.find((d) => d.id === s.id);
    a && (a.playing !== s.playing && i("media_player", s.playing ? "media_play" : "media_pause", { entity_id: s.id }), a.vol !== s.vol && typeof s.vol == "number" && i("media_player", "volume_set", { entity_id: s.id, volume_level: s.vol / 100 }), "mute" in s && a.mute !== s.mute && i("media_player", "volume_mute", { entity_id: s.id, is_volume_muted: !!s.mute }), "on" in s && a.on !== s.on && i("media_player", s.on ? "turn_on" : "turn_off", { entity_id: s.id }));
  }
  for (const s of t.locks || []) {
    const a = e.locks?.find((d) => d.id === s.id);
    !a || a.locked === s.locked || i("lock", s.locked ? "lock" : "unlock", { entity_id: s.id });
  }
  for (const s of t.garage?.doors || []) {
    const a = e.garage?.doors?.find((d) => d.id === s.id);
    !a || a.open === s.open || i("cover", s.open ? "open_cover" : "close_cover", { entity_id: s.id });
  }
  if (t.vacuum?.id && e.vacuum && e.vacuum.state !== t.vacuum.state) {
    const a = { cleaning: "start", paused: "pause", returning: "return_to_base", docked: "return_to_base" }[t.vacuum.state];
    a && i("vacuum", a, { entity_id: t.vacuum.id });
  }
  e.thermostat && (e.thermostat.target !== t.thermostat.target || e.thermostat.mode !== t.thermostat.mode) && (t.thermostat?.id ? (e.thermostat.target !== t.thermostat.target && ((e.thermostat.mode === "off" || e.thermostat.mode === "unavailable") && i("climate", "set_hvac_mode", { entity_id: t.thermostat.id, hvac_mode: "auto" }), i("climate", "set_temperature", { entity_id: t.thermostat.id, temperature: t.thermostat.target })), e.thermostat.mode !== t.thermostat.mode && i("climate", "set_hvac_mode", { entity_id: t.thermostat.id, hvac_mode: t.thermostat.mode })) : lt({
    ts: Date.now(),
    kind: "skip",
    message: "thermostat change ignored — no climate.* entity in HA. Add a climate integration (Nest/Ecobee/etc.) and the dial will start firing set_temperature."
  }));
  for (const s of t.scenes || []) {
    const a = e.scenes?.find((d) => d.id === s.id);
    a && !a.active && s.active && i("scene", "turn_on", { entity_id: s.id });
  }
  for (const s of t.automations || []) {
    const a = e.automations?.find((d) => d.id === s.id);
    !a || a.enabled === s.enabled || i("automation", s.enabled ? "turn_on" : "turn_off", { entity_id: s.id });
  }
  if (e.ring && e.ring.mode !== t.ring.mode)
    if (!t.ring?.id)
      lt({
        ts: Date.now(),
        kind: "skip",
        message: "Ring mode change ignored — no alarm_control_panel.* entity in HA. Add a Ring (or other alarm) integration and the tile will start firing alarm_arm_home / alarm_arm_away / alarm_disarm."
      });
    else {
      const a = { home: "alarm_arm_home", away: "alarm_arm_away", disarmed: "alarm_disarm" }[t.ring.mode];
      a ? i("alarm_control_panel", a, { entity_id: t.ring.id }) : lt({ ts: Date.now(), kind: "skip", message: `Unknown ring mode: ${t.ring.mode}` });
    }
  if (t.tesla?.id && e.tesla?.id === t.tesla.id) {
    const s = t.tesla, a = e.tesla, d = s.lockEntityId || `lock.${s.id}`, c = `climate.${s.id}_climate`, p = `cover.${s.id}_frunk`, u = `cover.${s.id}_trunk`, h = `switch.${s.id}_sentry_mode`, v = `switch.${s.id}_defrost`;
    a.locked !== s.locked && i("lock", s.locked ? "lock" : "unlock", { entity_id: d }), a.climateOn !== s.climateOn && i("climate", s.climateOn ? "turn_on" : "turn_off", { entity_id: c }), a.target !== s.target && i("climate", "set_temperature", { entity_id: c, temperature: s.target }), a.frunk !== s.frunk && i("cover", s.frunk ? "open_cover" : "close_cover", { entity_id: p }), a.trunk !== s.trunk && i("cover", s.trunk ? "open_cover" : "close_cover", { entity_id: u }), a.sentry !== s.sentry && i("switch", s.sentry ? "turn_on" : "turn_off", { entity_id: h }), a.defrost !== s.defrost && i("switch", s.defrost ? "turn_on" : "turn_off", { entity_id: v });
  }
}
function Va() {
  const e = bu(), t = e?.states || null, n = se.useMemo(() => Rh(t), [t]), i = se.useRef(!1);
  se.useEffect(() => {
    if (i.current || !t) return;
    i.current = !0;
    const u = {};
    for (const v of Object.keys(t)) {
      const w = v.split(".")[0];
      u[w] = (u[w] || 0) + 1;
    }
    const h = Object.entries(u).sort().map(([v, w]) => `${v}=${w}`).join(" ");
    lt({ ts: Date.now(), kind: "info", message: `HA entity inventory: ${h || "none"}` }), u.climate || lt({ ts: Date.now(), kind: "info", message: "↑ no climate.* — thermostat tile will be read-only" }), u.alarm_control_panel || lt({ ts: Date.now(), kind: "info", message: "↑ no alarm_control_panel.* — Ring tile will be read-only" }), u.cover || lt({ ts: Date.now(), kind: "info", message: "↑ no cover.* — garage tile will be read-only" }), u.vacuum || lt({ ts: Date.now(), kind: "info", message: "↑ no vacuum.* — vacuum tile will be read-only" });
  }, [t]);
  const [o, l] = se.useState(null), s = o || n, a = se.useRef(null), d = se.useRef(null), c = se.useRef(null), p = se.useCallback((u) => {
    l((h) => {
      const v = h || n, w = typeof u == "function" ? u(v) : { ...v, ...u };
      return c.current || (c.current = { base: v, hass: e }), c.current.next = w, clearTimeout(d.current), d.current = setTimeout(() => {
        const f = c.current;
        f && Eh(f.base, f.next, f.hass), c.current = null, d.current = null;
      }, 400), w;
    }), clearTimeout(a.current), a.current = setTimeout(() => l(null), 3e3);
  }, [e, n]);
  return se.useEffect(() => {
    if (!o) return;
    const u = setTimeout(() => l(null), 3e3);
    return () => clearTimeout(u);
  }, [t]), [s, p];
}
typeof window < "u" && (window.useHomeState = Va, window.useHomeStateHA = Va, window.useHass = bu);
const ju = { S: 2, M: 3, L: 6 }, Ph = { S: 2, M: 4, L: 4 }, Dh = ({ layout: e, onLayoutChange: t, render: n, editing: i, ctx: o, narrow: l }) => {
  const { p: s, fonts: a } = o, d = l ? 4 : 6, c = l ? Ph : ju, [p, u] = React.useState(null), h = React.useRef(null), v = React.useRef(null), w = e?.items || [], f = (x, b, j) => {
    if (!i || x.target.closest("[data-tile-resize]")) return;
    x.preventDefault();
    const S = x.currentTarget, C = S.getBoundingClientRect(), $ = v.current.getBoundingClientRect();
    S.setPointerCapture?.(x.pointerId), u({
      id: b,
      from: j,
      pointerId: x.pointerId,
      x: x.clientX - $.left,
      y: x.clientY - $.top,
      offsetX: x.clientX - C.left,
      offsetY: x.clientY - C.top,
      w: C.width,
      h: C.height,
      target: j
    }), navigator.vibrate && navigator.vibrate(8);
  }, k = (x) => {
    if (!p) return;
    const b = v.current.getBoundingClientRect(), j = x.clientX - b.left, S = x.clientY - b.top;
    u((T) => ({ ...T, x: j, y: S }));
    const C = v.current.querySelectorAll("[data-tile-id]");
    let $ = p.target;
    for (const T of C) {
      const _ = T.getBoundingClientRect();
      if (x.clientX >= _.left && x.clientX <= _.right && x.clientY >= _.top && x.clientY <= _.bottom) {
        const E = T.getAttribute("data-tile-id");
        if (E === p.id) continue;
        $ = w.findIndex((H) => H.id === E);
        break;
      }
    }
    $ !== p.target && u((T) => ({ ...T, target: $ }));
  }, m = (x) => {
    if (p) {
      if (p.target !== p.from) {
        const b = [...w], [j] = b.splice(p.from, 1);
        b.splice(p.target, 0, j), t({ ...e, items: b });
      }
      u(null);
    }
  }, g = (x) => {
    const b = ["S", "M", "L"], j = w.map((S) => S.id === x ? { ...S, size: b[(b.indexOf(S.size) + 1) % 3] } : S);
    t({ ...e, items: j });
  };
  React.useEffect(() => {
    if (!p) return;
    const x = (j) => k(j), b = (j) => m();
    return window.addEventListener("pointermove", x), window.addEventListener("pointerup", b), window.addEventListener("pointercancel", b), () => {
      window.removeEventListener("pointermove", x), window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", b);
    };
  }, [p]);
  let y = w.map((x, b) => ({ ...x, _i: b }));
  if (p) {
    const x = [...y], [b] = x.splice(p.from, 1);
    x.splice(p.target, 0, b), y = x;
  }
  return /* @__PURE__ */ r.jsxs("div", { ref: v, style: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: `repeat(${d}, 1fr)`,
    gap: 14,
    gridAutoRows: "minmax(116px, auto)",
    gridAutoFlow: "dense",
    touchAction: i ? "none" : "auto"
  }, children: [
    y.map((x) => {
      const b = Math.min(c[x.size] || 2, d), j = p && p.id === x.id;
      return /* @__PURE__ */ r.jsxs(
        "div",
        {
          "data-tile-id": x.id,
          onPointerDown: i ? (S) => f(S, x.id, w.findIndex((C) => C.id === x.id)) : void 0,
          style: {
            gridColumn: `span ${b}`,
            position: "relative",
            opacity: j ? 0 : 1,
            cursor: i ? j ? "grabbing" : "grab" : "default",
            transition: p ? "transform .25s cubic-bezier(.2,.7,.4,1)" : "none",
            outline: i ? `1.5px dashed ${s.border2}` : "none",
            outlineOffset: i ? 4 : 0,
            borderRadius: 14
          },
          children: [
            n(x.id, x.size, i),
            i && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  "data-tile-resize": !0,
                  onPointerDown: (S) => S.stopPropagation(),
                  onClick: () => g(x.id),
                  style: {
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 5,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    border: `.5px solid ${s.border2}`,
                    background: s.surface2,
                    color: s.fg2,
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 11,
                    fontFamily: a.body,
                    fontWeight: 500,
                    boxShadow: "0 4px 12px rgba(0,0,0,.18)"
                  },
                  title: `Size: ${x.size} · click to cycle`,
                  children: x.size
                }
              ),
              /* @__PURE__ */ r.jsx("div", { style: {
                position: "absolute",
                top: 8,
                left: 8,
                zIndex: 5,
                width: 24,
                height: 24,
                borderRadius: 6,
                background: s.surface2,
                border: `.5px solid ${s.border2}`,
                display: "grid",
                placeItems: "center",
                color: s.fg3,
                pointerEvents: "none"
              }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "grip", size: 11 }) })
            ] })
          ]
        },
        x.id
      );
    }),
    p && /* @__PURE__ */ r.jsx("div", { ref: h, style: {
      position: "absolute",
      pointerEvents: "none",
      left: p.x - p.offsetX,
      top: p.y - p.offsetY,
      width: p.w,
      height: p.h,
      transform: "rotate(-1deg) scale(1.02)",
      boxShadow: "0 24px 60px rgba(0,0,0,.45)",
      borderRadius: 14,
      zIndex: 100,
      opacity: 0.95
    }, children: n(p.id, w.find((x) => x.id === p.id)?.size, !0) })
  ] });
};
setTimeout(() => {
  if (window.Icon && !window.__gripPatched) {
    window.__gripPatched = !0;
    const e = window.Icon, t = (n) => n.name === "grip" ? /* @__PURE__ */ r.jsxs("svg", { width: n.size || 18, height: n.size || 18, viewBox: "0 0 24 24", fill: "currentColor", stroke: "none", children: [
      /* @__PURE__ */ r.jsx("circle", { cx: "9", cy: "6", r: "1.4" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "15", cy: "6", r: "1.4" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "9", cy: "12", r: "1.4" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "15", cy: "12", r: "1.4" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "9", cy: "18", r: "1.4" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "15", cy: "18", r: "1.4" })
    ] }) : /* @__PURE__ */ r.jsx(e, { ...n });
    window.Icon = t;
  }
}, 0);
Object.assign(window, { DragGrid: Dh, TILE_SPAN: ju });
async function Nh(e, t, { agentId: n } = {}) {
  if (!e || !t) return null;
  try {
    const i = { text: t };
    n && (i.agent_id = n);
    const o = await e.callApi("POST", "conversation/process", i);
    return { speech: o?.response?.speech?.plain?.speech || o?.response?.card?.simple?.text || "", raw: o };
  } catch (i) {
    return { speech: `Couldn't reach the conversation agent. ${i.message || ""}`.trim(), error: i };
  }
}
const Lh = (() => {
  if (typeof window > "u") return ["localhost"];
  const e = /* @__PURE__ */ new Set(), t = window.location.hostname || "localhost";
  return e.add(t), e.add("homeassistant.local"), /\.ts\.net$/.test(t) && e.add(t), Array.from(e);
})();
function Ah(e, t = {}) {
  const n = e.toLowerCase().replace(/\s+/g, ""), i = Lh.map((o) => `parent=${encodeURIComponent(o)}`).join("&");
  return `https://player.twitch.tv/?channel=${encodeURIComponent(n)}&${i}&muted=${t.muted ? "true" : "false"}`;
}
function Oh(e, t = {}) {
  return `https://www.youtube.com/embed/${encodeURIComponent(e)}?autoplay=${t.autoplay === !1 ? 0 : 1}`;
}
function Wh(e) {
  const t = e.replace(/^@/, "");
  return `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(t)}&autoplay=1`;
}
function Hh(e) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(e)}`;
}
function Bh(e) {
  return `https://player.vimeo.com/video/${encodeURIComponent(e)}?autoplay=1`;
}
const Gn = {
  twitch: Ah,
  youtube: Oh,
  youtubeChannel: Wh,
  youtubeSearch: Hh,
  vimeo: Bh
}, Vh = [
  // "open <name> on twitch" / "watch <name> on twitch"
  {
    re: /^(?:open|watch|put on|play|start|launch)\s+(.+?)(?:'s)?\s+(?:stream\s+)?on\s+twitch\b.*$/i,
    handler: (e) => {
      const t = e[1].trim();
      return { type: "open_url", label: `${t} on Twitch`, url: Gn.twitch(t) };
    }
  },
  {
    re: /^(?:open|watch|launch)\s+twitch(?:\s+(?:stream\s+)?(?:for|of)\s+)?\s*(.+)?$/i,
    handler: (e) => {
      const t = (e[1] || "").trim();
      return t ? { type: "open_url", label: `${t} on Twitch`, url: Gn.twitch(t) } : { type: "speech", text: "Which Twitch channel?" };
    }
  },
  // "open youtube" alone
  {
    re: /^(?:open|launch)\s+youtube\s*$/i,
    handler: () => ({ type: "open_url", label: "YouTube", url: "https://www.youtube.com/" })
  },
  // "watch <something> on youtube" → search results page
  {
    re: /^(?:watch|search\s+(?:for\s+)?|find|look\s+up)\s+(.+?)\s+on\s+youtube\b.*$/i,
    handler: (e) => ({ type: "open_url", label: `YouTube: ${e[1].trim()}`, url: Gn.youtubeSearch(e[1].trim()) })
  },
  // "play youtube video <id>"
  {
    re: /^(?:open|play|watch)\s+youtube\s+(?:video\s+)?([\w-]{6,15})\s*$/i,
    handler: (e) => ({ type: "open_url", label: "YouTube", url: Gn.youtube(e[1]) })
  },
  // Vimeo
  {
    re: /^(?:open|watch|play)\s+vimeo\s+(\d+)\s*$/i,
    handler: (e) => ({ type: "open_url", label: "Vimeo", url: Gn.vimeo(e[1]) })
  },
  // DRM services — friendly bounce-out
  {
    re: /^(?:open|watch|play|put on|launch)\s+(?:something\s+on\s+)?(netflix|disney\+?|disney plus|hulu|hbo max|hbo|paramount\+?|paramount plus|peacock|prime video|apple tv\+?|apple tv plus)\b.*$/i,
    handler: (e) => ({ type: "speech", text: `${e[1]} blocks embedded playback. Open it from the app on your TV or phone.` })
  },
  // "go home" / "back to home"
  {
    re: /^(?:go|take me|back)\s+(?:to\s+)?home\b.*$/i,
    handler: () => ({ type: "navigate", target: "home" })
  },
  // "close" / "exit" / "go back"
  {
    re: /^(?:close|exit|stop|go\s+back|done)\s*(?:the\s+)?(?:browser|video|stream|page)?\.?$/i,
    handler: () => ({ type: "close_browser" })
  }
];
function Uh(e) {
  if (!e) return null;
  const t = e.trim().replace(/[.!?]+$/, "");
  for (const { re: n, handler: i } of Vh) {
    const o = t.match(n);
    if (o) return i(o);
  }
  return null;
}
let qr = null;
function jl() {
  if (typeof window > "u" || !window.speechSynthesis) return [];
  const e = window.speechSynthesis.getVoices();
  return e && e.length, e || [];
}
typeof window < "u" && window.speechSynthesis && (jl(), window.speechSynthesis.onvoiceschanged = () => {
  jl();
});
function Gh(e) {
  if (!e.length) return null;
  const t = (n) => {
    const i = (n.name || "").toLowerCase(), o = (n.lang || "").toLowerCase();
    if (!o.startsWith("en")) return -1;
    let l = 0;
    return (o === "en-gb" || /uk|british|england/.test(i)) && (l += 50), /daniel|oliver|arthur|ryan|george|brian/.test(i) && (l += 40), /aria|jenny|samantha|emma|libby|sonia/.test(i) && (l += 25), /siri/.test(i) && (l += 35), /neural|natural|online/.test(i) && (l += 30), /premium|enhanced/.test(i) && (l += 20), /google/.test(i) && (l += 10), /^microsoft (david|mark|zira|hazel)$/.test(n.name) && (l -= 30), l;
  };
  return e.filter((n) => (n.lang || "").toLowerCase().startsWith("en")).sort((n, i) => t(i) - t(n))[0] || e[0];
}
function Qh() {
  if (qr) return qr;
  const e = jl();
  return qr = Gh(e), qr;
}
function Yh(e, { rate: t = 1, pitch: n = 1, lang: i = "en-US" } = {}) {
  if (!e || typeof window > "u" || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
  }
  const o = new SpeechSynthesisUtterance(e);
  o.rate = t, o.pitch = n, o.lang = i;
  const l = Qh();
  l && (o.voice = l, l.lang && (o.lang = l.lang)), window.speechSynthesis.speak(o);
}
function Kh() {
  if (!(typeof window > "u"))
    try {
      window.speechSynthesis?.cancel();
    } catch {
    }
}
const Xh = ({ dark: e, density: t, accent: n, agentTone: i, fontPair: o, bgImage: l, visibleDevices: s, settings: a, setSetting: d, user: c, patchUser: p, doLogout: u, narrow: h, openBrowser: v }) => {
  const w = React.useContext(Ir), [f, k] = window.useHomeState(), [m, g] = React.useState("home"), [y, x] = React.useState("living"), [b, j] = React.useState(!1), [S, C] = React.useState(!1), [$, T] = React.useState(0), [_, E] = React.useState(!1), [H, P] = React.useState([
    { who: "agent", text: `Hi ${c?.firstName || "there"} — ask me anything about your home, or tell me to do something. Try "set the mood for dinner" or "open Esfand on Twitch".`, t: "now" }
  ]), [D, B] = React.useState(""), U = Su(e, n), I = Sl[o] || Sl.editorial, R = Cl[t] || Cl.regular, F = a?.ttsAgent !== !1, N = (L) => {
    !F || !L || (Kh(), Yh(L, { rate: 1, pitch: 1 }));
  }, O = async (L) => {
    if (!L.trim()) return;
    const le = { who: "user", text: L, t: "now" };
    P((ee) => [...ee, le]), B("");
    const ce = Uh(L);
    if (ce?.type === "open_url" && v) {
      v(ce.url, ce.label);
      const ee = `Opening ${ce.label || ce.url}.`;
      P((We) => [...We, { who: "agent", text: ee, t: "now" }]), N(ee), S || T((We) => We + 1);
      return;
    }
    if (ce?.type === "speech") {
      P((ee) => [...ee, { who: "agent", text: ce.text, t: "now" }]), N(ce.text), S || T((ee) => ee + 1);
      return;
    }
    E(!0);
    let Oe = null;
    w && (Oe = (await Nh(w, L))?.speech || null), Oe || (Oe = window.runAgent(L, f, k)), Oe || (Oe = "I'm here, but no conversation agent is configured yet — set one up in HA → Settings → Voice Assistants and I'll get smarter."), E(!1), P((ee) => [...ee, { who: "agent", text: Oe, t: "now" }]), N(Oe), S || T((ee) => ee + 1);
  }, me = () => {
    C(!0), T(0);
  }, G = { p: U, fonts: I, dens: R, state: f, setState: k, room: y, setRoom: x, page: m, setPage: g, visible: s || { lights: !0, music: !0, cameras: !0, climate: !0, locks: !0, scenes: !0, calendar: !0, weather: !0, alarms: !0, tv: !0 }, accent: n, dark: e, settings: a, setSetting: d, user: c, patchUser: p, doLogout: u, narrow: h };
  return /* @__PURE__ */ r.jsxs("div", { "data-screen-label": "HomeCNTRD", style: {
    width: "100%",
    height: "100%",
    background: U.bg,
    color: U.fg,
    fontFamily: I.body,
    position: "relative",
    overflow: "hidden",
    backgroundImage: l ? `url(${l})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }, children: [
    l && /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, background: e ? "rgba(20,15,12,.78)" : "rgba(248,243,235,.84)", backdropFilter: "blur(2px)" } }),
    f.dnd.active && /* @__PURE__ */ r.jsx(ig, { ctx: G }),
    /* @__PURE__ */ r.jsxs("div", { style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: h || m === "home" ? "1fr" : "232px 1fr",
      gridTemplateRows: h ? "1fr 64px" : "1fr",
      height: "100%"
    }, children: [
      !h && m !== "home" && /* @__PURE__ */ r.jsx(Ga, { ctx: G }),
      /* @__PURE__ */ r.jsxs("main", { style: { overflowY: "auto", overflowX: "hidden", minWidth: 0, padding: h ? "16px 14px 14px" : m === "home" ? 0 : R.pad, display: "flex", flexDirection: "column", gap: R.gap, paddingBottom: h ? 80 : void 0 }, children: [
        h && /* @__PURE__ */ r.jsx(qh, { ctx: G }),
        m === "home" && /* @__PURE__ */ r.jsx(window.PersonalDashboard, { ctx: G, onOpenMenu: () => j(!0) }),
        m === "dashboard" && /* @__PURE__ */ r.jsx(window.HomeView, { ctx: G }),
        m === "music" && /* @__PURE__ */ r.jsx(window.MusicView, { ctx: G }),
        m === "cameras" && /* @__PURE__ */ r.jsx(window.CamerasView, { ctx: G }),
        m === "calendar" && /* @__PURE__ */ r.jsx(window.CalendarView, { ctx: G }),
        m === "car" && /* @__PURE__ */ r.jsx(window.CarView, { ctx: G }),
        m === "garage" && /* @__PURE__ */ r.jsx(window.GarageView, { ctx: G }),
        m === "devices" && /* @__PURE__ */ r.jsx(window.DevicesView, { ctx: G }),
        m === "automations" && /* @__PURE__ */ r.jsx(window.AutomationsView, { ctx: G }),
        m === "settings" && /* @__PURE__ */ r.jsx(window.SettingsView, { ctx: G })
      ] }),
      h && /* @__PURE__ */ r.jsx(Jh, { ctx: G })
    ] }),
    !h && m === "home" && b && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("div", { onClick: () => j(!1), style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 60,
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)"
      } }),
      /* @__PURE__ */ r.jsx("div", { style: {
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: 232,
        zIndex: 61,
        boxShadow: "8px 0 32px rgba(0,0,0,.4)"
      }, children: /* @__PURE__ */ r.jsx(Ga, { ctx: { ...G, setPage: (L) => {
        g(L), j(!1);
      } } }) })
    ] }),
    /* @__PURE__ */ r.jsx(window.NowPlayingBar, { ctx: G }),
    /* @__PURE__ */ r.jsx(
      og,
      {
        ctx: G,
        open: S,
        setOpen: C,
        unread: $,
        messages: H,
        thinking: _,
        draft: D,
        setDraft: B,
        send: O,
        openAgent: me,
        agentTone: i
      }
    )
  ] });
}, Ua = {
  tangerine: "#e87f4a",
  terracotta: "#c96442",
  ochre: "#b8843e",
  sage: "#7a8c6c",
  plum: "#7d4f6b",
  slate: "#5b7390"
};
function Su(e, t) {
  const n = Ua[t] || Ua.tangerine;
  return e ? {
    bg: "#161310",
    surface: "#1f1b16",
    surface2: "#27221c",
    card: "#2a231b",
    fg: "#f1ead9",
    fg2: "rgba(241,234,217,0.7)",
    fg3: "rgba(241,234,217,0.45)",
    border: "rgba(241,234,217,0.08)",
    border2: "rgba(241,234,217,0.16)",
    accent: n,
    accentSoft: n + "33",
    accentDim: n + "22",
    warm: "#3a2e22",
    danger: "#d96450",
    dark: !0
  } : {
    bg: "#f5efe4",
    surface: "#fbf6ec",
    surface2: "#fff",
    card: "#fffaf0",
    fg: "#2a231b",
    fg2: "rgba(42,35,27,0.68)",
    fg3: "rgba(42,35,27,0.42)",
    border: "rgba(42,35,27,0.09)",
    border2: "rgba(42,35,27,0.18)",
    accent: n,
    accentSoft: n + "22",
    accentDim: n + "14",
    warm: "#efe3cf",
    danger: "#c14d36",
    dark: !1
  };
}
const Sl = {
  editorial: { display: '"Newsreader", "Iowan Old Style", Georgia, serif', body: '"Inter", -apple-system, system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace' },
  classic: { display: '"Instrument Serif", "Iowan Old Style", Georgia, serif', body: '"Inter", system-ui, sans-serif', mono: '"JetBrains Mono", monospace' },
  modern: { display: '"Space Grotesk", system-ui, sans-serif', body: '"Inter", system-ui, sans-serif', mono: '"JetBrains Mono", monospace' }
}, Cl = {
  compact: { pad: "18px 22px", gap: 14, tilePad: 14, tileGap: 10, h1: 30, h2: 14 },
  regular: { pad: "24px 32px", gap: 18, tilePad: 18, tileGap: 14, h1: 38, h2: 15 },
  comfy: { pad: "32px 40px", gap: 24, tilePad: 22, tileGap: 18, h1: 46, h2: 16 }
}, Ga = ({ ctx: e }) => {
  const { p: t, fonts: n, page: i, setPage: o, room: l, setRoom: s, state: a, user: d } = e, c = ({ children: f }) => /* @__PURE__ */ r.jsx("div", { style: { padding: "10px 14px 4px", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: t.fg3, fontWeight: 500 }, children: f }), p = ({ active: f, onClick: k, icon: m, label: g, count: y, badge: x }) => /* @__PURE__ */ r.jsxs("button", { onClick: k, style: {
    display: "flex",
    alignItems: "center",
    gap: 11,
    width: "calc(100% - 16px)",
    margin: "1px 8px",
    padding: "8px 12px",
    borderRadius: 8,
    border: 0,
    cursor: "pointer",
    background: f ? t.warm : "transparent",
    color: f ? t.fg : t.fg2,
    fontFamily: n.body,
    fontSize: 13.5,
    textAlign: "left",
    fontWeight: f ? 500 : 400,
    borderLeft: f ? `2px solid ${t.accent}` : "2px solid transparent"
  }, children: [
    /* @__PURE__ */ r.jsx(window.Icon, { name: m, size: 16, stroke: 1.5 }),
    /* @__PURE__ */ r.jsx("span", { style: { flex: 1 }, children: g }),
    y !== void 0 && y !== "" && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, color: t.fg3, fontVariantNumeric: "tabular-nums" }, children: y }),
    x && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 9, padding: "2px 6px", borderRadius: 999, background: t.accent, color: "#fff", fontWeight: 600 }, children: x })
  ] }), u = a.cameras.filter((f) => f.online).length, h = a.speakers.filter((f) => f.playing).length, v = a.calendar.length, w = a.garage.doors.filter((f) => f.open).length;
  return /* @__PURE__ */ r.jsxs("aside", { style: { borderRight: `.5px solid ${t.border}`, background: t.surface, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { padding: "20px 22px 16px", borderBottom: `.5px solid ${t.border}` }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 22, fontStyle: "italic", color: t.accent, lineHeight: 1 }, children: "HomeCNTRD" }),
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, marginTop: 6, letterSpacing: ".05em" }, children: [
        (d?.location || "HOME").toUpperCase(),
        " · ",
        (/* @__PURE__ */ new Date()).toLocaleDateString([], { weekday: "long" })
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { padding: "16px 22px 4px" }, children: /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: n.display, fontSize: 22, lineHeight: 1.15, color: t.fg, fontWeight: 500 }, children: [
      "Good evening,",
      /* @__PURE__ */ r.jsx("br", {}),
      /* @__PURE__ */ r.jsxs("em", { style: { fontStyle: "italic", color: t.accent, fontWeight: 400 }, children: [
        d?.firstName || "there",
        "."
      ] })
    ] }) }),
    /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, overflow: "auto", paddingBottom: 14, marginTop: 6 }, children: [
      /* @__PURE__ */ r.jsx(c, { children: "View" }),
      /* @__PURE__ */ r.jsx(p, { active: i === "home", onClick: () => o("home"), icon: "home", label: "Home" }),
      /* @__PURE__ */ r.jsx(p, { active: i === "dashboard", onClick: () => o("dashboard"), icon: "grid", label: "Dashboard" }),
      /* @__PURE__ */ r.jsx(p, { active: i === "music", onClick: () => o("music"), icon: "music", label: "Music", count: h ? `${h} playing` : "" }),
      /* @__PURE__ */ r.jsx(p, { active: i === "cameras", onClick: () => o("cameras"), icon: "cam", label: "Cameras", count: `${u}/${a.cameras.length}` }),
      /* @__PURE__ */ r.jsx(p, { active: i === "calendar", onClick: () => o("calendar"), icon: "cal", label: "Calendar", count: v }),
      /* @__PURE__ */ r.jsx(p, { active: i === "car", onClick: () => o("car"), icon: "car", label: "Car", count: `${a.tesla.chargePct}%` }),
      /* @__PURE__ */ r.jsx(p, { active: i === "garage", onClick: () => o("garage"), icon: "garage", label: "Garage", badge: w ? "OPEN" : "" }),
      /* @__PURE__ */ r.jsx(p, { active: i === "devices", onClick: () => o("devices"), icon: "grid", label: "Devices", count: a.integrations.filter((f) => f.status === "connected").length }),
      /* @__PURE__ */ r.jsx(p, { active: i === "automations", onClick: () => o("automations"), icon: "sparkle", label: "Automations", count: a.automations.filter((f) => f.enabled).length }),
      i === "dashboard" && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
        /* @__PURE__ */ r.jsx(c, { children: "Rooms" }),
        window.ROOMS.map((f) => {
          const k = a.lights.filter((m) => m.room === f.id && m.on).length;
          return /* @__PURE__ */ r.jsx(p, { active: l === f.id, onClick: () => s(f.id), icon: f.icon, label: f.name, count: k > 0 ? k : "" }, f.id);
        }),
        /* @__PURE__ */ r.jsx(c, { children: "Quick scenes" }),
        a.scenes.slice(0, 4).map((f) => /* @__PURE__ */ r.jsx(p, { icon: f.icon, label: f.name, active: f.active }, f.id))
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: { borderTop: `.5px solid ${t.border}`, padding: 8 }, children: [
      /* @__PURE__ */ r.jsx(p, { active: i === "settings", onClick: () => o("settings"), icon: "settings", label: "Settings" }),
      /* @__PURE__ */ r.jsxs("div", { style: { padding: "10px 14px 4px", display: "flex", alignItems: "center", gap: 10, fontSize: 11, color: t.fg2 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 8, height: 8, borderRadius: "50%", background: "oklch(60% 0.15 145)" } }),
        /* @__PURE__ */ r.jsx("span", { children: "32 devices · all online" })
      ] })
    ] })
  ] });
}, qh = ({ ctx: e }) => {
  const { p: t, fonts: n, user: i, room: o, setRoom: l, page: s } = e;
  return s !== "dashboard" ? null : /* @__PURE__ */ r.jsxs("div", { style: { padding: "4px 2px 8px" }, children: [
    /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 22, fontStyle: "italic", color: t.accent, lineHeight: 1 }, children: "HomeCNTRD" }),
    /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: n.display, fontSize: 24, color: t.fg, fontWeight: 500, marginTop: 6 }, children: [
      "Evening, ",
      /* @__PURE__ */ r.jsxs("em", { style: { fontStyle: "italic", color: t.accent, fontWeight: 400 }, children: [
        i?.firstName || "there",
        "."
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 6, overflowX: "auto", marginTop: 14, paddingBottom: 4 }, children: window.ROOMS.map((a) => /* @__PURE__ */ r.jsxs("button", { onClick: () => l(a.id), style: {
      padding: "6px 12px",
      borderRadius: 999,
      border: `.5px solid ${o === a.id ? t.accent : t.border2}`,
      background: o === a.id ? t.accentSoft : "transparent",
      color: o === a.id ? t.accent : t.fg2,
      fontSize: 12,
      cursor: "pointer",
      whiteSpace: "nowrap",
      flex: "none",
      fontFamily: n.body,
      display: "inline-flex",
      alignItems: "center",
      gap: 5
    }, children: [
      /* @__PURE__ */ r.jsx(window.Icon, { name: a.icon, size: 11 }),
      " ",
      a.name
    ] }, a.id)) })
  ] });
}, Jh = ({ ctx: e }) => {
  const { p: t, fonts: n, page: i, setPage: o } = e, l = [
    { id: "home", icon: "home", label: "Home" },
    { id: "dashboard", icon: "grid", label: "Dashboard" },
    { id: "music", icon: "music", label: "Music" },
    { id: "cameras", icon: "cam", label: "Cams" },
    { id: "settings", icon: "settings", label: "Settings" }
  ];
  return /* @__PURE__ */ r.jsx("nav", { style: {
    gridColumn: "1 / -1",
    display: "flex",
    borderTop: `.5px solid ${t.border}`,
    background: t.surface,
    paddingBottom: "env(safe-area-inset-bottom)"
  }, children: l.map((s) => /* @__PURE__ */ r.jsxs("button", { onClick: () => o(s.id), style: {
    flex: 1,
    padding: "10px 4px",
    border: 0,
    background: "transparent",
    color: i === s.id ? t.accent : t.fg3,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    fontFamily: n.body
  }, children: [
    /* @__PURE__ */ r.jsx(window.Icon, { name: s.icon, size: 18, stroke: 1.6 }),
    /* @__PURE__ */ r.jsx("span", { style: { fontSize: 10, fontWeight: i === s.id ? 500 : 400 }, children: s.label })
  ] }, s.id)) });
}, Zh = ({ p: e, children: t, style: n, ...i }) => /* @__PURE__ */ r.jsx("div", { ...i, style: {
  background: e.surface2,
  border: `.5px solid ${e.border}`,
  borderRadius: 14,
  padding: 18,
  color: e.fg,
  ...n
}, children: t }), eg = ({ title: e, subtitle: t, p: n, fonts: i, children: o, action: l }) => /* @__PURE__ */ r.jsxs("section", { children: [
  /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 12 }, children: [
      /* @__PURE__ */ r.jsx("h2", { style: { margin: 0, fontFamily: i.display, fontSize: 20, fontWeight: 500, color: n.fg }, children: e }),
      t && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 12, color: n.fg3, fontStyle: "italic" }, children: t })
    ] }),
    l
  ] }),
  o
] }), tg = ({ ctx: e, eyebrow: t, title: n, sub: i, right: o }) => {
  const l = e.state.weather, s = (/* @__PURE__ */ new Date()).getHours(), d = s < 6 || s >= 19 ? "moon" : /cloud/i.test(l.summary) ? "cloud" : /rain/i.test(l.summary) ? "droplet" : "sun";
  return /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 14, flexWrap: "wrap" }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { flex: "1 1 320px", minWidth: 0 }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: e.p.fg3, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 6 }, children: t }),
      /* @__PURE__ */ r.jsxs("h1", { style: { margin: 0, fontFamily: e.fonts.display, fontSize: e.dens.h1, fontWeight: 500, lineHeight: 1.15, color: e.p.fg, textWrap: "balance" }, children: [
        n,
        /* @__PURE__ */ r.jsx("span", { style: { color: e.p.accent, fontStyle: "italic" }, children: "." })
      ] }),
      i && /* @__PURE__ */ r.jsx("div", { style: { fontSize: 14, color: e.p.fg2, marginTop: 14, fontStyle: "italic", fontFamily: e.fonts.display, lineHeight: 1.4 }, children: i })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: { flex: "none", alignSelf: "flex-start", marginTop: 4, display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ r.jsxs("div", { title: `${l.summary} · H ${l.high}° L ${l.low}°`, style: {
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "8px 12px",
        borderRadius: 10,
        border: `.5px solid ${e.p.border}`,
        background: e.p.surface2,
        fontFamily: e.fonts.body
      }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: d, size: 16, style: { color: e.p.accent } }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", lineHeight: 1.1 }, children: [
          /* @__PURE__ */ r.jsxs("span", { style: { fontSize: 14, color: e.p.fg, fontWeight: 500, fontVariantNumeric: "tabular-nums" }, children: [
            l.temp,
            "°F"
          ] }),
          /* @__PURE__ */ r.jsxs("span", { style: { fontSize: 10, color: e.p.fg3, letterSpacing: ".04em" }, children: [
            l.summary,
            " · H",
            l.high,
            "° L",
            l.low,
            "°"
          ] })
        ] })
      ] }),
      o
    ] })
  ] });
}, ng = ({ p: e, fonts: t, active: n, onClick: i, children: o, danger: l, style: s }) => /* @__PURE__ */ r.jsx("button", { onClick: i, style: {
  padding: "7px 12px",
  borderRadius: 8,
  cursor: "pointer",
  fontFamily: t.body,
  fontSize: 12,
  border: `.5px solid ${l ? e.danger : n ? e.accent : e.border2}`,
  background: l ? e.danger : n ? e.accentSoft : "transparent",
  color: l ? "#fff" : n ? e.accent : e.fg,
  ...s
}, children: o }), rg = ({ p: e, on: t, onChange: n, size: i = 20 }) => /* @__PURE__ */ r.jsx("button", { onClick: () => n(!t), style: {
  width: i * 1.7,
  height: i,
  borderRadius: 999,
  border: 0,
  cursor: "pointer",
  position: "relative",
  background: t ? e.accent : e.border2,
  transition: ".2s"
}, children: /* @__PURE__ */ r.jsx("span", { style: { position: "absolute", top: 2, left: t ? i * 0.7 + 2 : 2, width: i - 4, height: i - 4, borderRadius: "50%", background: "#fff", transition: ".2s" } }) }), ig = ({ ctx: e }) => {
  const { p: t, fonts: n, state: i, setState: o } = e;
  return /* @__PURE__ */ r.jsxs("div", { style: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 30,
    padding: "8px 18px",
    background: t.accent,
    color: "#fff",
    fontSize: 12,
    fontFamily: n.body,
    display: "flex",
    alignItems: "center",
    gap: 10
  }, children: [
    /* @__PURE__ */ r.jsx(window.Icon, { name: "bellOff", size: 14 }),
    /* @__PURE__ */ r.jsxs("span", { children: [
      /* @__PURE__ */ r.jsx("b", { children: "Do not disturb" }),
      " · until ",
      i.dnd.until || "meeting ends"
    ] }),
    /* @__PURE__ */ r.jsx("span", { style: { flex: 1 } }),
    /* @__PURE__ */ r.jsx("button", { onClick: () => o((l) => ({ ...l, dnd: { active: !1, until: null, source: null } })), style: {
      background: "rgba(255,255,255,.18)",
      border: 0,
      color: "#fff",
      padding: "3px 10px",
      borderRadius: 6,
      fontSize: 11,
      cursor: "pointer"
    }, children: "End now" })
  ] });
}, og = ({ ctx: e, open: t, setOpen: n, unread: i, messages: o, thinking: l, draft: s, setDraft: a, send: d, openAgent: c, agentTone: p }) => {
  const { p: u, fonts: h, narrow: v } = e, w = React.useRef(null), f = React.useRef(null), [k, m] = React.useState(null);
  React.useEffect(() => {
    t && w.current && w.current.focus();
  }, [t]), React.useEffect(() => {
    f.current && (f.current.scrollTop = f.current.scrollHeight);
  }, [o, l]);
  const g = v ? 84 : 24, y = v ? 152 : 92, x = [
    "Find me a chocolate chip cookie recipe",
    "Set up movie night",
    "Lock the house",
    "Precondition the Tesla",
    "Best Italian recipes for tonight"
  ], b = { jarvis: "Jarvis", terse: "CTRL", playful: "Pip" }[p] || "Jarvis";
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs("button", { onClick: () => t ? n(!1) : c(), style: {
      position: "absolute",
      right: 24,
      bottom: g,
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: t ? u.surface2 : u.accent,
      color: t ? u.fg : "#fff",
      border: `.5px solid ${u.border}`,
      cursor: "pointer",
      display: "grid",
      placeItems: "center",
      boxShadow: t ? "0 4px 16px rgba(0,0,0,.15)" : `0 8px 28px ${u.accent}66, 0 1px 0 rgba(255,255,255,.3) inset`,
      zIndex: 50
    }, children: [
      /* @__PURE__ */ r.jsx(window.Icon, { name: t ? "chevron" : "sparkle", size: 20, stroke: 1.6 }),
      !t && i > 0 && /* @__PURE__ */ r.jsx("span", { style: { position: "absolute", top: -4, right: -4, minWidth: 20, height: 20, padding: "0 6px", borderRadius: 999, background: "#fff", color: u.accent, fontSize: 11, fontWeight: 600, display: "grid", placeItems: "center" }, children: i })
    ] }),
    t && /* @__PURE__ */ r.jsxs("div", { style: {
      position: "absolute",
      right: 24,
      bottom: y,
      width: 380,
      maxHeight: "min(560px, calc(100% - 180px))",
      background: u.surface2,
      border: `.5px solid ${u.border}`,
      borderRadius: 18,
      boxShadow: "0 24px 64px rgba(0,0,0,.18), 0 1px 0 rgba(255,255,255,.4) inset",
      display: "flex",
      flexDirection: "column",
      zIndex: 50,
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: `.5px solid ${u.border}` }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 32, height: 32, borderRadius: "50%", background: `radial-gradient(circle at 30% 30%, ${u.accent}, oklch(40% 0.1 25))`, display: "grid", placeItems: "center", color: "#fff" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "sparkle", size: 14 }) }),
        /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontFamily: h.display, fontSize: 15, color: u.fg, fontWeight: 500 }, children: b }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: u.fg3 }, children: [
            /* @__PURE__ */ r.jsx("span", { style: { color: "oklch(60% 0.13 145)" }, children: "●" }),
            " Listening · everything online"
          ] })
        ] }),
        /* @__PURE__ */ r.jsx("button", { onClick: () => n(!1), style: { border: 0, background: "transparent", color: u.fg3, cursor: "pointer", padding: 6, fontSize: 18 }, children: "×" })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { ref: f, style: { flex: 1, overflow: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }, children: [
        o.map((j, S) => /* @__PURE__ */ r.jsx(lg, { m: j, p: u, fonts: h, onOpen: (C, $) => m({ url: C, title: $ }) }, S)),
        l && /* @__PURE__ */ r.jsx(ag, { p: u, fonts: h })
      ] }),
      o.length <= 1 && /* @__PURE__ */ r.jsx("div", { style: { padding: "0 16px 8px", display: "flex", flexWrap: "wrap", gap: 6 }, children: x.map((j) => /* @__PURE__ */ r.jsx("button", { onClick: () => d(j), style: { padding: "5px 10px", borderRadius: 999, border: `.5px solid ${u.border2}`, background: "transparent", color: u.fg2, fontSize: 11, cursor: "pointer", fontFamily: h.body }, children: j }, j)) }),
      /* @__PURE__ */ r.jsxs("form", { onSubmit: (j) => {
        j.preventDefault(), d(s);
      }, style: { padding: 12, borderTop: `.5px solid ${u.border}`, display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ r.jsx("input", { ref: w, value: s, onChange: (j) => a(j.target.value), placeholder: `Ask ${b} anything…`, style: {
          flex: 1,
          padding: "10px 12px",
          borderRadius: 10,
          border: `.5px solid ${u.border2}`,
          background: u.surface,
          color: u.fg,
          fontSize: 13,
          fontFamily: h.body,
          outline: "none"
        } }),
        /* @__PURE__ */ r.jsx("button", { type: "button", style: { width: 36, height: 36, borderRadius: 9, background: "transparent", border: `.5px solid ${u.border2}`, color: u.fg2, cursor: "pointer", display: "grid", placeItems: "center" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "mic", size: 16 }) }),
        /* @__PURE__ */ r.jsx("button", { type: "submit", style: { width: 36, height: 36, borderRadius: 9, background: u.accent, border: 0, color: "#fff", cursor: "pointer", display: "grid", placeItems: "center" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "send", size: 15 }) })
      ] })
    ] }),
    k && /* @__PURE__ */ r.jsx(sg, { p: u, fonts: h, url: k.url, title: k.title, onClose: () => m(null) })
  ] });
}, lg = ({ m: e, p: t, fonts: n, onOpen: i }) => {
  const o = e.who === "user", l = (e.text || "").split(`
`), s = [], a = [];
  for (const c of l) {
    const p = c.match(/^\s*LINK:\s*(.+?)\s*\|\s*(https?:\/\/\S+)\s*$/i);
    p ? s.push({ title: p[1], url: p[2] }) : a.push(c);
  }
  const d = a.join(`
`).trim();
  return /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: o ? "flex-end" : "flex-start", gap: 5, maxWidth: "92%" }, children: [
    d && /* @__PURE__ */ r.jsx("div", { style: {
      maxWidth: "100%",
      padding: "9px 13px",
      borderRadius: 14,
      background: o ? t.accent : t.warm,
      color: o ? "#fff" : t.fg,
      fontSize: 13,
      lineHeight: 1.45,
      whiteSpace: "pre-wrap",
      borderBottomRightRadius: o ? 4 : 14,
      borderBottomLeftRadius: o ? 14 : 4
    }, children: d }),
    s.length > 0 && /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 5, width: "100%" }, children: s.map((c, p) => /* @__PURE__ */ r.jsxs("button", { onClick: () => i?.(c.url, c.title), style: {
      padding: "8px 11px",
      borderRadius: 9,
      border: `.5px solid ${t.border2}`,
      background: t.surface,
      color: t.fg,
      cursor: "pointer",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontFamily: n.body
    }, children: [
      /* @__PURE__ */ r.jsx(window.Icon, { name: "search", size: 11, style: { color: t.accent, flex: "none" } }),
      /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: t.fg, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: c.title }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: (c.url || "").replace(/^https?:\/\//, "").replace(/\/.*/, "") })
      ] }),
      /* @__PURE__ */ r.jsx(window.Icon, { name: "arrowR", size: 11, style: { color: t.fg3, flex: "none" } })
    ] }, p)) }),
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3 }, children: e.t })
  ] });
}, sg = ({ p: e, fonts: t, url: n, title: i, onClose: o }) => /* @__PURE__ */ r.jsxs("div", { style: { position: "absolute", inset: 0, zIndex: 70, background: e.bg, display: "flex", flexDirection: "column" }, children: [
  /* @__PURE__ */ r.jsxs("div", { style: { padding: "10px 14px", borderBottom: `.5px solid ${e.border}`, display: "flex", alignItems: "center", gap: 10, background: e.surface2 }, children: [
    /* @__PURE__ */ r.jsxs("button", { onClick: o, style: { border: 0, background: "transparent", color: e.fg, cursor: "pointer", padding: 6, fontSize: 18, display: "flex", alignItems: "center", gap: 4, fontFamily: t.body, fontSize: 13 }, children: [
      /* @__PURE__ */ r.jsx(window.Icon, { name: "chevronL", size: 14 }),
      " Back"
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: e.fg, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: i }),
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: e.fg3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: n })
    ] }),
    /* @__PURE__ */ r.jsx("a", { href: n, target: "_blank", rel: "noreferrer", style: { padding: "6px 10px", borderRadius: 7, border: `.5px solid ${e.border2}`, color: e.fg2, fontSize: 11, textDecoration: "none", fontFamily: t.body }, children: "Open external" })
  ] }),
  /* @__PURE__ */ r.jsx("iframe", { src: n, title: i, style: { flex: 1, border: 0, background: "#fff" }, sandbox: "allow-scripts allow-same-origin allow-forms allow-popups" })
] }), ag = ({ p: e, fonts: t }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, color: e.fg3, fontSize: 12 }, children: [
  /* @__PURE__ */ r.jsx("span", { style: { display: "inline-flex", gap: 3 }, children: [0, 1, 2].map((n) => /* @__PURE__ */ r.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: e.accent, animation: `hearthDot 1s ${n * 0.15}s infinite ease-in-out`, opacity: 0.5 } }, n)) }),
  /* @__PURE__ */ r.jsx("span", { style: { fontStyle: "italic", fontFamily: t.display }, children: "thinking…" }),
  /* @__PURE__ */ r.jsx("style", { children: "@keyframes hearthDot{0%,80%,100%{opacity:.3;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}" })
] });
Object.assign(window, { HearthApp: Xh, Card: Zh, Section: eg, PageHead: tg, PillBtn: ng, Toggle: rg, palette: Su, FONT_PAIRS: Sl, DENSITY: Cl });
const zl = [
  { id: "nfl", name: "NFL", sport: "football", league: "nfl", kind: "team" },
  { id: "nba", name: "NBA", sport: "basketball", league: "nba", kind: "team" },
  { id: "mlb", name: "MLB", sport: "baseball", league: "mlb", kind: "team" },
  { id: "nhl", name: "NHL", sport: "hockey", league: "nhl", kind: "team" },
  { id: "ncaaf", name: "CFB", sport: "football", league: "college-football", kind: "team" },
  { id: "ncaambb", name: "CBB", sport: "basketball", league: "mens-college-basketball", kind: "team" },
  { id: "epl", name: "EPL", sport: "soccer", league: "eng.1", kind: "team" },
  { id: "ucl", name: "UCL", sport: "soccer", league: "uefa.champions", kind: "team" },
  { id: "ufc", name: "UFC", sport: "mma", league: "ufc", kind: "combat" },
  { id: "boxing", name: "Box", sport: "boxing", league: "", kind: "combat" }
], dg = [
  { name: "Philadelphia Eagles" },
  { name: "Philadelphia Phillies" },
  { name: "Philadelphia 76ers" },
  { name: "Duke", leagues: ["ncaambb"] },
  { name: "Hurricanes", leagues: ["ncaaf"] },
  { name: "Chelsea", leagues: ["epl"] }
], cg = "homecntrd_sports_favs_v1";
function ug() {
  try {
    const e = localStorage.getItem(cg);
    if (e) {
      const t = JSON.parse(e);
      if (Array.isArray(t)) return t;
    }
  } catch {
  }
  return dg;
}
function pg(e) {
  return e.league ? `https://site.api.espn.com/apis/site/v2/sports/${e.sport}/${e.league}/scoreboard` : `https://site.api.espn.com/apis/site/v2/sports/${e.sport}/scoreboard`;
}
function fg(e) {
  return [e?.displayName, e?.shortDisplayName, e?.name, e?.location, e?.abbreviation, e?.nickname].filter(Boolean).map((t) => String(t).toLowerCase()).join(" | ");
}
function Tl(e, t, n) {
  const i = e?.team || e?.athlete || {}, o = fg(i);
  return n.some((l) => l.leagues && !l.leagues.includes(t) ? !1 : o.includes(String(l.name || "").toLowerCase()));
}
function Cu(e) {
  const t = e?.type || {};
  let n = t.state || "pre";
  t.completed && (n = "post");
  let i = t.shortDetail || t.detail || t.description || "";
  return n === "in" && e?.displayClock && e?.period && (i = `${e.displayClock} · ${hg(e.period)}`), { state: n, label: i };
}
function hg(e) {
  const t = ["th", "st", "nd", "rd"], n = e % 100;
  return e + (t[(n - 20) % 10] || t[n] || t[0]);
}
function Di(e) {
  const t = e?.team || e?.athlete || {}, n = t.logo || t.headshot && (t.headshot.href || t.headshot) || Array.isArray(t.logos) && t.logos[0]?.href || "";
  return {
    name: t.displayName || t.shortDisplayName || t.name || "TBD",
    abbr: t.abbreviation || "",
    logo: n,
    score: e?.score ?? "",
    isHome: e?.homeAway === "home",
    winner: e?.winner === !0,
    record: e?.records && e.records[0]?.summary || ""
  };
}
function gg(e, t, n) {
  const i = (e.competitions || [])[0];
  if (!i) return null;
  const o = i.competitors || [];
  if (o.length < 2) return null;
  const l = o.find((p) => p.homeAway === "home") || o[0], s = o.find((p) => p.homeAway === "away") || o[1], a = Cu(e.status || i.status), d = Tl(l, t.id, n) || Tl(s, t.id, n), c = e.date ? new Date(e.date) : null;
  return {
    id: `${t.id}:${e.id}`,
    league: t.name,
    leagueId: t.id,
    kind: "team",
    teamA: Di(s),
    teamB: Di(l),
    status: a,
    startTime: c,
    isFavorite: d
  };
}
function mg(e, t, n) {
  const i = e.competitions || [];
  if (!i.length) return null;
  const o = i[0], l = o.competitors || [];
  if (l.length < 2) return null;
  const s = Cu(o.status || e.status), a = i.some(
    (p) => (p.competitors || []).some((u) => Tl(u, t.id, n))
  ), d = o.date || e.date ? new Date(o.date || e.date) : null, c = e.shortName || e.name || "";
  return {
    id: `${t.id}:${e.id}`,
    league: c ? `${t.name} · ${c}` : t.name,
    leagueId: t.id,
    kind: "combat",
    teamA: Di(l[0]),
    teamB: Di(l[1]),
    status: s,
    startTime: d,
    isFavorite: a
  };
}
async function yg({ favorites: e = ug(), signal: t } = {}) {
  const n = [];
  await Promise.all(zl.map(async (o) => {
    try {
      const l = await fetch(pg(o), { signal: t, cache: "no-store" });
      if (!l.ok) return;
      const a = (await l.json()).events || [];
      for (const d of a) {
        const c = o.kind === "team" ? gg(d, o, e) : mg(d, o, e);
        c && n.push(c);
      }
    } catch {
    }
  }));
  const i = (o) => o.isFavorite ? 0 : o.status.state === "in" ? 1 : o.status.state === "pre" ? 2 : 3;
  return n.sort((o, l) => {
    const s = i(o), a = i(l);
    if (s !== a) return s - a;
    const d = o.startTime?.getTime() || 0, c = l.startTime?.getTime() || 0;
    return d - c;
  }), n;
}
const zu = {
  weather: { name: "Weather", defaultColSpan: 2 },
  car: { name: "Car", defaultColSpan: 2 },
  sports: { name: "Sports", defaultColSpan: 1 },
  news: { name: "News", defaultColSpan: 1 },
  todo: { name: "To-do", defaultColSpan: 2 },
  notes: { name: "Notes", defaultColSpan: 2 }
}, zs = [
  { id: "weather", colSpan: 2, hidden: !1 },
  { id: "car", colSpan: 2, hidden: !1 },
  { id: "sports", colSpan: 1, hidden: !1 },
  { id: "news", colSpan: 1, hidden: !1 },
  { id: "todo", colSpan: 2, hidden: !1 },
  { id: "notes", colSpan: 2, hidden: !1 }
], Ts = "homecntrd_layout_v1";
function nn(e) {
  return e.map((t) => ({ ...t }));
}
function xg(e) {
  const t = new Set(Object.keys(zu)), n = e.filter((o) => t.has(o.id)), i = new Set(n.map((o) => o.id));
  for (const o of zs)
    i.has(o.id) || n.push({ ...o });
  return n.map((o) => ({
    id: o.id,
    colSpan: o.colSpan === 2 ? 2 : 1,
    hidden: !!o.hidden
  }));
}
function vg() {
  try {
    const e = localStorage.getItem(Ts);
    if (e) {
      const t = JSON.parse(e);
      if (Array.isArray(t)) return xg(t);
    }
  } catch {
  }
  return nn(zs);
}
function wg(e) {
  try {
    localStorage.setItem(Ts, JSON.stringify(e));
  } catch {
  }
}
function kg() {
  try {
    localStorage.removeItem(Ts);
  } catch {
  }
  return nn(zs);
}
function bg(e, t, n) {
  if (t === n) return e;
  const i = nn(e), o = i.findIndex((a) => a.id === t), l = i.findIndex((a) => a.id === n);
  if (o === -1 || l === -1) return e;
  const [s] = i.splice(o, 1);
  return i.splice(l, 0, s), i;
}
function jg(e, t) {
  const n = e.findIndex((o) => o.id === t);
  if (n <= 0) return e;
  const i = nn(e);
  return [i[n - 1], i[n]] = [i[n], i[n - 1]], i;
}
function Sg(e, t) {
  const n = e.findIndex((o) => o.id === t);
  if (n === -1 || n >= e.length - 1) return e;
  const i = nn(e);
  return [i[n + 1], i[n]] = [i[n], i[n + 1]], i;
}
function Cg(e, t, n) {
  return nn(e).map((i) => i.id === t ? { ...i, colSpan: n === 2 ? 2 : 1 } : i);
}
function Qa(e, t, n) {
  return nn(e).map((i) => i.id === t ? { ...i, hidden: !!n } : i);
}
const zg = ({ ctx: e, onOpenMenu: t }) => {
  const { p: n, fonts: i, state: o, user: l, narrow: s, setPage: a } = e, d = React.useContext(Ir), c = n.accent, p = "#1a1612", u = "#221d18", h = "#f1ead9", v = "rgba(241,234,217,0.7)", w = "rgba(241,234,217,0.42)", f = "rgba(241,234,217,0.1)", k = i.display, m = i.body, g = /* @__PURE__ */ new Date(), y = g.toLocaleDateString([], { weekday: "long" }), x = g.toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" }), [b, j] = React.useState([]), S = (o.calendar || []).map((R) => R.id).join(",");
  React.useEffect(() => {
    if (!d || !S) {
      j([]);
      return;
    }
    let R = !0;
    const F = S.split(",").filter(Boolean), N = (ye) => {
      if (!(typeof window > "u"))
        for (window.__hcDiag || (window.__hcDiag = []), window.__hcDiag.push(ye); window.__hcDiag.length > 50; ) window.__hcDiag.shift();
    }, O = async () => {
      const ye = /* @__PURE__ */ new Date();
      ye.setHours(0, 0, 0, 0);
      const G = new Date(ye);
      G.setDate(G.getDate() + 14);
      const L = ye.toISOString(), le = G.toISOString(), ce = [];
      let Oe = 0;
      await Promise.all(F.map(async (ee) => {
        try {
          const We = `calendars/${ee}?start=${encodeURIComponent(L)}&end=${encodeURIComponent(le)}`, Dn = await d.callApi("GET", We);
          if (!Array.isArray(Dn)) {
            N({ ts: Date.now(), kind: "info", message: `calendar ${ee}: response not an array (${typeof Dn})` });
            return;
          }
          Oe += Dn.length, N({ ts: Date.now(), kind: "info", message: `calendar ${ee}: fetched ${Dn.length} event(s) over 14 days` });
          for (const xe of Dn) {
            const Nn = xe.start && (xe.start.dateTime || xe.start.date) || xe.start, Ms = xe.end && (xe.end.dateTime || xe.end.date) || xe.end;
            if (!Nn) continue;
            let Mr;
            xe.start && typeof xe.start == "object" ? Mr = !xe.start.dateTime && !!xe.start.date : typeof Nn == "string" ? Mr = !/\d{2}:\d{2}/.test(Nn) : Mr = !1;
            const Fs = new Date(Nn), Iu = Ms ? new Date(Ms) : null;
            ce.push({
              id: `${ee}-${Nn}-${xe.summary || ""}`,
              title: xe.summary || "(untitled)",
              where: xe.location || "",
              kind: /birthday|bday/i.test(xe.summary || "") ? "birthday" : "event",
              start: Fs,
              end: Iu,
              isAllDay: Mr,
              sortKey: Fs.getTime()
            });
          }
        } catch (We) {
          N({ ts: Date.now(), kind: "error", message: `calendar ${ee}: fetch failed — ${We?.message || We}` }), console.warn(`[dashboard] could not fetch events for ${ee}:`, We?.message || We);
        }
      })), R && (ce.sort((ee, We) => ee.sortKey - We.sortKey), N({ ts: Date.now(), kind: "info", message: `calendar: ${ce.length} total events parsed from ${F.length} calendar(s); raw=${Oe}` }), j(ce));
    };
    O();
    const me = setInterval(O, 5 * 60 * 1e3);
    return () => {
      R = !1, clearInterval(me);
    };
  }, [d, S]);
  const C = b.length > 0 ? b : (o.calendarEvents || []).map((R) => ({
    ...R,
    start: R.start ? new Date(R.start) : null,
    end: null
  })), $ = () => {
    const R = g.getHours();
    return R < 5 ? "Working late" : R < 12 ? "Good morning" : R < 17 ? "Good afternoon" : R < 21 ? "Good evening" : "Good night";
  }, [T, _] = React.useState(() => vg()), [E, H] = React.useState(!1), P = (R) => {
    _(R), wg(R);
  }, D = () => H(!1), B = () => {
    const R = kg();
    _(R);
  }, U = { accent: c, fonts: i, surface: p, surface2: u, fg: h, fg2: v, fg3: w, border: f, narrow: s }, I = (R) => {
    switch (R) {
      case "weather":
        return /* @__PURE__ */ r.jsx(Mg, { weather: o.weather, hass: d, ...U });
      case "car":
        return /* @__PURE__ */ r.jsx(Fg, { hass: d, ...U });
      case "sports":
        return /* @__PURE__ */ r.jsx(Dg, { ...U });
      case "news":
        return /* @__PURE__ */ r.jsx(Lg, { news: o.news, ...U });
      case "todo":
        return /* @__PURE__ */ r.jsx(Pg, { todos: o.todos, ...U });
      case "notes":
        return /* @__PURE__ */ r.jsx(Ag, { ...U });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ r.jsx("div", { style: {
    background: "#0d0b09",
    color: h,
    fontFamily: m,
    minHeight: "100%",
    // Safe-area aware so the status bar / home indicator don't clip
    // the rounded card corners on iPad / iOS Companion.
    paddingTop: `calc(env(safe-area-inset-top, 0px) + ${s ? 20 : 32}px)`,
    paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + ${s ? 24 : 40}px)`,
    paddingLeft: 0,
    paddingRight: 0,
    overflowX: "hidden"
  }, children: /* @__PURE__ */ r.jsxs("div", { style: {
    // Constrain the content so tiles don't sprawl edge-to-edge on
    // wide viewports — they should sit inside a comfortable column
    // with the page background visible on both sides.
    maxWidth: 1280,
    margin: "0 auto",
    paddingLeft: s ? 16 : 36,
    paddingRight: s ? 16 : 36
  }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, marginBottom: s ? 24 : 36 }, children: [
      /* @__PURE__ */ r.jsxs("div", { children: [
        /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: w, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 6 }, children: [
          y,
          " · ",
          x
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: k, fontSize: s ? 30 : 40, lineHeight: 1.05, color: h, fontWeight: 500 }, children: [
          $(),
          ", ",
          /* @__PURE__ */ r.jsxs("em", { style: { fontStyle: "italic", color: c, fontWeight: 400 }, children: [
            l?.firstName || "there",
            "."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 8, flex: "none" }, children: [
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: () => H((R) => !R),
            "aria-label": E ? "Done editing" : "Edit layout",
            style: {
              height: 42,
              borderRadius: 10,
              flex: "none",
              padding: "0 14px",
              background: E ? c : p,
              border: `.5px solid ${E ? c : f}`,
              color: E ? "#fff" : h,
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: ".04em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 6
            },
            children: E ? "Done" : "Edit"
          }
        ),
        !s && t && /* @__PURE__ */ r.jsx("button", { onClick: t, "aria-label": "Open menu", style: {
          width: 42,
          height: 42,
          borderRadius: 10,
          flex: "none",
          background: p,
          border: `.5px solid ${f}`,
          color: h,
          cursor: "pointer",
          display: "grid",
          placeItems: "center"
        }, children: /* @__PURE__ */ r.jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", children: /* @__PURE__ */ r.jsx("path", { d: "M3 6h18M3 12h18M3 18h18" }) }) })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: {
      display: "grid",
      gridTemplateColumns: s ? "1fr" : "minmax(0,1fr) minmax(280px, 360px)",
      gap: s ? 14 : 22
    }, children: [
      /* @__PURE__ */ r.jsxs("div", { children: [
        /* @__PURE__ */ r.jsx(
          Tg,
          {
            layout: T,
            updateLayout: P,
            editMode: E,
            renderTile: I,
            theme: U,
            injectAfterFirst: s ? /* @__PURE__ */ r.jsx(
              ed,
              {
                calendar: o.calendar,
                events: C,
                accent: c,
                fonts: i,
                surface: p,
                surface2: u,
                fg: h,
                fg2: v,
                fg3: w,
                border: f
              }
            ) : null
          }
        ),
        E && /* @__PURE__ */ r.jsx(
          Rg,
          {
            onReset: B,
            onDone: D,
            accent: c,
            fonts: i,
            surface: p,
            border: f,
            fg: h,
            fg3: w
          }
        )
      ] }),
      !s && /* @__PURE__ */ r.jsx(
        ed,
        {
          calendar: o.calendar,
          events: C,
          accent: c,
          fonts: i,
          surface: p,
          surface2: u,
          fg: h,
          fg2: v,
          fg3: w,
          border: f
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 80 } })
  ] }) });
}, Tg = ({ layout: e, updateLayout: t, editMode: n, renderTile: i, theme: o, injectAfterFirst: l }) => {
  const { narrow: s, accent: a, border: d, surface: c, fg: p, fg2: u, fg3: h, fonts: v } = o, w = e.filter((j) => !j.hidden), f = e.filter((j) => j.hidden), [k, m] = React.useState(null), g = (j, S) => {
    m(j);
    try {
      S.dataTransfer.effectAllowed = "move";
    } catch {
    }
    try {
      S.dataTransfer.setData("text/plain", j);
    } catch {
    }
  }, y = (j) => {
    j.preventDefault();
  }, x = (j, S) => {
    S.preventDefault();
    const C = k || S.dataTransfer && S.dataTransfer.getData("text/plain");
    C && C !== j && t(bg(e, C, j)), m(null);
  }, b = () => m(null);
  return /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: s ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gap: s ? 14 : 18,
      alignItems: "start"
    }, children: w.map((j, S) => /* @__PURE__ */ r.jsxs(React.Fragment, { children: [
      /* @__PURE__ */ r.jsx(
        _g,
        {
          tile: j,
          index: S,
          isFirst: S === 0,
          isLast: S === w.length - 1,
          editMode: n,
          isDragging: k === j.id,
          narrow: s,
          theme: o,
          onDragStart: g,
          onDragOver: y,
          onDrop: x,
          onDragEnd: b,
          onMoveUp: () => t(jg(e, j.id)),
          onMoveDown: () => t(Sg(e, j.id)),
          onResize: (C) => t(Cg(e, j.id, C)),
          onHide: () => t(Qa(e, j.id, !0)),
          children: i(j.id)
        }
      ),
      S === 0 && l && /* @__PURE__ */ r.jsx("div", { style: { gridColumn: "1 / -1" }, children: l })
    ] }, j.id)) }),
    n && f.length > 0 && /* @__PURE__ */ r.jsxs("div", { style: {
      marginTop: 22,
      padding: "14px 16px",
      borderRadius: 12,
      border: `.5px dashed ${d}`,
      background: "rgba(241,234,217,0.02)"
    }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: h, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 10 }, children: "Hidden tiles" }),
      /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 }, children: f.map((j) => /* @__PURE__ */ r.jsxs(
        "button",
        {
          onClick: () => t(Qa(e, j.id, !1)),
          style: {
            padding: "7px 12px",
            borderRadius: 8,
            background: c,
            border: `.5px solid ${d}`,
            color: u,
            fontSize: 12,
            fontFamily: "inherit",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 6
          },
          children: [
            /* @__PURE__ */ r.jsx("span", { style: { fontSize: 13 }, children: "+" }),
            zu[j.id]?.name || j.id
          ]
        },
        j.id
      )) })
    ] })
  ] });
}, _g = ({
  tile: e,
  isFirst: t,
  isLast: n,
  editMode: i,
  isDragging: o,
  narrow: l,
  theme: s,
  onDragStart: a,
  onDragOver: d,
  onDrop: c,
  onDragEnd: p,
  onMoveUp: u,
  onMoveDown: h,
  onResize: v,
  onHide: w,
  children: f
}) => {
  const { accent: k, border: m, surface: g, fg: y, fg2: x, fg3: b } = s, j = l ? 1 : e.colSpan;
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      draggable: i,
      onDragStart: (S) => i && a(e.id, S),
      onDragOver: i ? d : void 0,
      onDrop: (S) => i && c(e.id, S),
      onDragEnd: i ? p : void 0,
      style: {
        position: "relative",
        gridColumn: `span ${j}`,
        opacity: o ? 0.4 : 1,
        transition: "opacity 120ms ease",
        // The dashed accent outline tells the user the tile is editable
        // without obscuring the underlying card.
        outline: i ? `2px dashed ${k}66` : "none",
        outlineOffset: i ? 4 : 0,
        borderRadius: 16
      },
      children: [
        i && /* @__PURE__ */ r.jsxs("div", { style: {
          position: "absolute",
          top: -10,
          right: 8,
          zIndex: 5,
          display: "flex",
          gap: 4,
          padding: 4,
          background: "#0d0b09e8",
          backdropFilter: "blur(8px)",
          borderRadius: 8,
          border: `.5px solid ${m}`,
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
        }, children: [
          /* @__PURE__ */ r.jsx(Qn, { onClick: u, disabled: t, title: "Move up", border: m, fg: x, children: "↑" }),
          /* @__PURE__ */ r.jsx(Qn, { onClick: h, disabled: n, title: "Move down", border: m, fg: x, children: "↓" }),
          !l && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
            /* @__PURE__ */ r.jsx(
              Qn,
              {
                onClick: () => v(1),
                active: e.colSpan === 1,
                title: "Half width",
                border: m,
                fg: x,
                accent: k,
                children: "▭"
              }
            ),
            /* @__PURE__ */ r.jsx(
              Qn,
              {
                onClick: () => v(2),
                active: e.colSpan === 2,
                title: "Full width",
                border: m,
                fg: x,
                accent: k,
                children: "▬"
              }
            )
          ] }),
          /* @__PURE__ */ r.jsx(Qn, { onClick: w, title: "Hide", border: m, fg: x, children: "×" })
        ] }),
        i && /* @__PURE__ */ r.jsxs("div", { style: {
          position: "absolute",
          top: -10,
          left: 8,
          zIndex: 5,
          padding: "5px 8px",
          background: "#0d0b09e8",
          backdropFilter: "blur(8px)",
          borderRadius: 8,
          border: `.5px solid ${m}`,
          color: b,
          cursor: "grab",
          fontSize: 11,
          letterSpacing: ".04em",
          textTransform: "uppercase",
          display: "inline-flex",
          alignItems: "center",
          gap: 5
        }, children: [
          /* @__PURE__ */ r.jsxs("svg", { width: "10", height: "14", viewBox: "0 0 6 10", fill: "currentColor", children: [
            /* @__PURE__ */ r.jsx("circle", { cx: "1.5", cy: "1.5", r: "1" }),
            /* @__PURE__ */ r.jsx("circle", { cx: "4.5", cy: "1.5", r: "1" }),
            /* @__PURE__ */ r.jsx("circle", { cx: "1.5", cy: "5", r: "1" }),
            /* @__PURE__ */ r.jsx("circle", { cx: "4.5", cy: "5", r: "1" }),
            /* @__PURE__ */ r.jsx("circle", { cx: "1.5", cy: "8.5", r: "1" }),
            /* @__PURE__ */ r.jsx("circle", { cx: "4.5", cy: "8.5", r: "1" })
          ] }),
          "Drag"
        ] }),
        f
      ]
    }
  );
}, Qn = ({ children: e, onClick: t, disabled: n, active: i, title: o, border: l, fg: s, accent: a }) => /* @__PURE__ */ r.jsx(
  "button",
  {
    onClick: t,
    disabled: n,
    title: o,
    "aria-label": o,
    style: {
      width: 26,
      height: 26,
      borderRadius: 6,
      background: i ? a : "transparent",
      border: i ? `.5px solid ${a}` : `.5px solid ${l}`,
      color: i ? "#fff" : s,
      fontSize: 12,
      fontFamily: "inherit",
      cursor: n ? "not-allowed" : "pointer",
      opacity: n ? 0.35 : 1,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: 1,
      padding: 0
    },
    children: e
  }
), Rg = ({ onReset: e, onDone: t, accent: n, fonts: i, surface: o, border: l, fg: s, fg3: a }) => /* @__PURE__ */ r.jsxs("div", { style: {
  marginTop: 18,
  padding: "12px 14px",
  background: o,
  border: `.5px solid ${l}`,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10
}, children: [
  /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: a, lineHeight: 1.5 }, children: [
    "Drag tiles to reorder, use ",
    /* @__PURE__ */ r.jsx("strong", { style: { color: s }, children: "▭/▬" }),
    " to resize, and ",
    /* @__PURE__ */ r.jsx("strong", { style: { color: s }, children: "×" }),
    " to hide. Layout saves automatically."
  ] }),
  /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 8, flex: "none" }, children: [
    /* @__PURE__ */ r.jsx("button", { onClick: e, style: {
      padding: "8px 14px",
      borderRadius: 8,
      background: "transparent",
      border: `.5px solid ${l}`,
      color: a,
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 12
    }, children: "Reset" }),
    /* @__PURE__ */ r.jsx("button", { onClick: t, style: {
      padding: "8px 14px",
      borderRadius: 8,
      background: n,
      border: `.5px solid ${n}`,
      color: "#fff",
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 12,
      fontWeight: 500
    }, children: "Done" })
  ] })
] }), Ig = {
  sunny: "☀️",
  "clear-night": "🌙",
  partlycloudy: "⛅",
  cloudy: "☁️",
  rainy: "🌧️",
  pouring: "🌧️",
  lightning: "⛈️",
  "lightning-rainy": "⛈️",
  snowy: "❄️",
  "snowy-rainy": "🌨️",
  fog: "🌫️",
  windy: "💨",
  "windy-variant": "💨",
  hail: "🌨️",
  exceptional: "⚠️"
}, Ya = (e) => Ig[e] || "☁️", $g = (e) => (e || "unknown").replace(/-/g, " ").replace(/\b\w/g, (t) => t.toUpperCase()), Mg = ({ weather: e, hass: t, accent: n, fonts: i, surface: o, surface2: l, fg: s, fg2: a, fg3: d, border: c, narrow: p }) => {
  const [u, h] = React.useState([]), v = e?.id;
  if (React.useEffect(() => {
    if (!t || !v) return;
    let k = !0;
    const m = async () => {
      try {
        const x = (await t.connection.sendMessagePromise({
          type: "call_service",
          domain: "weather",
          service: "get_forecasts",
          service_data: { type: "daily" },
          target: { entity_id: v },
          return_response: !0
        }))?.response?.[v]?.forecast;
        k && Array.isArray(x) && h(x.slice(0, 4));
      } catch {
        const y = t.states?.[v]?.attributes;
        k && Array.isArray(y?.forecast) && h(y.forecast.slice(0, 4));
      }
    };
    m();
    const g = setInterval(m, 30 * 60 * 1e3);
    return () => {
      k = !1, clearInterval(g);
    };
  }, [t, v]), !e || e.summary === "Unavailable")
    return /* @__PURE__ */ r.jsx(_s, { title: "Weather", hint: "Add a Weather integration in HA → Devices & Services. Pirate Weather and Met.no are both free.", surface: o, fg: s, fg2: a, fg3: d, border: c, fonts: i, accent: n });
  const w = yn(/* @__PURE__ */ new Date()), f = u.map((k) => ({ ...k, _date: new Date(k.datetime || k.date || Date.now()) })).filter((k) => yn(k._date) !== w).slice(0, 3);
  return /* @__PURE__ */ r.jsxs("div", { style: {
    padding: p ? "20px 18px" : "24px 28px",
    borderRadius: 16,
    background: o,
    border: `.5px solid ${c}`
  }, children: [
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: d, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: p ? 12 : 16 }, children: "Weather" }),
    /* @__PURE__ */ r.jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: p ? 14 : 28,
      flexWrap: p ? "wrap" : "nowrap"
    }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: p ? 12 : 18, flex: "none" }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: i.display, fontSize: p ? 52 : 64, lineHeight: 1, color: s, fontWeight: 400, fontVariantNumeric: "tabular-nums" }, children: [
          e.temp,
          "°"
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 2 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: p ? 32 : 40, lineHeight: 1 }, children: Ya(e.condition) }),
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: a, marginTop: 4 }, children: $g(e.condition) }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: d, fontVariantNumeric: "tabular-nums" }, children: [
            "H ",
            e.high,
            "° · L ",
            e.low,
            "°"
          ] })
        ] })
      ] }),
      f.length > 0 && /* @__PURE__ */ r.jsx("div", { style: {
        flex: 1,
        minWidth: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${f.length}, 1fr)`,
        gap: p ? 8 : 14
      }, children: f.map((k, m) => {
        const g = k._date.toLocaleDateString([], { weekday: "short" }), y = Math.round(k.temperature ?? k.temp ?? 0), x = Math.round(k.templow ?? k.temp_low ?? k.temp_min ?? 0);
        return /* @__PURE__ */ r.jsxs("div", { style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          textAlign: "center"
        }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: d, letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 500 }, children: g }),
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: p ? 26 : 30, lineHeight: 1 }, children: Ya(k.condition) }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: i.display, fontSize: 15, color: s, fontWeight: 500, fontVariantNumeric: "tabular-nums" }, children: [
            y,
            "° ",
            /* @__PURE__ */ r.jsxs("span", { style: { color: d, fontWeight: 400 }, children: [
              "/ ",
              x,
              "°"
            ] })
          ] })
        ] }, m);
      }) })
    ] })
  ] });
}, te = "tone", Fg = ({ hass: e, accent: t, fonts: n, surface: i, surface2: o, fg: l, fg2: s, fg3: a, border: d, narrow: c }) => {
  const [, p] = React.useReducer((L) => L + 1, 0);
  React.useEffect(() => {
    if (!e) return;
    const L = setInterval(p, 5e3);
    return () => clearInterval(L);
  }, [e]);
  const u = (L) => e?.states?.[L], h = (L) => u(L)?.state ?? null, v = (L) => {
    const le = h(L);
    if (le == null || le === "unavailable" || le === "unknown") return null;
    const ce = Number(le);
    return Number.isFinite(ce) ? ce : null;
  }, w = (L, le) => u(L)?.attributes?.[le], f = (L) => !!u(L), k = async (L, le, ce = {}) => {
    if (e?.callService)
      try {
        await e.callService(L, le, ce);
      } catch (Oe) {
        console.error(`[car] ${L}.${le} failed:`, Oe);
      }
  }, m = v(`sensor.${te}_battery_level`), g = v(`sensor.${te}_battery_range`), y = w(`sensor.${te}_battery_range`, "unit_of_measurement") || "mi", b = h(`sensor.${te}_charging`) === "Charging", j = v(`sensor.${te}_time_to_full_charge`), S = v(`sensor.${te}_inside_temperature`), C = v(`sensor.${te}_outside_temperature`), $ = w(`sensor.${te}_inside_temperature`, "unit_of_measurement") || "°F", T = `lock.${te}`, E = h(T) === "locked", H = `climate.${te}_climate`, P = h(H), D = P && P !== "off" && P !== "unavailable" && P !== "unknown", B = w(H, "temperature"), U = w(H, "min_temp") ?? 60, I = w(H, "max_temp") ?? 82, R = `cover.${te}_frunk`, F = `cover.${te}_trunk`, N = `cover.${te}_charge_port_door`, O = `switch.${te}_sentry_mode`, me = `switch.${te}_defrost`;
  if (!e || !f(`sensor.${te}_battery_level`))
    return /* @__PURE__ */ r.jsxs(Ge, { surface: i, border: d, children: [
      /* @__PURE__ */ r.jsx($r, { title: "Car", right: null, fonts: n, fg: l, fg3: a, accent: t }),
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: a, lineHeight: 1.5 }, children: [
        "Waiting for Tessie data. If this persists, check that the Tessie integration is active in HA and that the car name's slug is ",
        /* @__PURE__ */ r.jsx("code", { style: { color: s }, children: te }),
        "."
      ] })
    ] });
  const ye = w(`sensor.${te}_battery_level`, "friendly_name")?.replace(/ Battery level$/i, "") || "Tone", G = m === null ? a : m <= 20 ? "#c14d36" : m <= 40 ? "#d8843e" : t;
  return /* @__PURE__ */ r.jsxs(Ge, { surface: i, border: d, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14, gap: 8 }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 18, color: l, fontWeight: 500 }, children: ye }),
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
        b && /* @__PURE__ */ r.jsx("span", { style: {
          fontSize: 10,
          padding: "2px 8px",
          borderRadius: 999,
          background: `${t}22`,
          color: t,
          fontWeight: 500,
          letterSpacing: ".04em",
          textTransform: "uppercase"
        }, children: "Charging" }),
        /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, color: E ? s : "#d8843e" }, children: E ? "Locked" : "Unlocked" })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: c ? 14 : 22, marginBottom: 16, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 200 }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: c ? 36 : 44, lineHeight: 1, color: l, fontWeight: 400, fontVariantNumeric: "tabular-nums" }, children: m !== null ? `${Math.round(m)}%` : "—" }),
          g !== null && /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 13, color: a, fontVariantNumeric: "tabular-nums" }, children: [
            "· ",
            Math.round(g),
            " ",
            y
          ] })
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { width: "100%", height: 6, background: "rgba(241,234,217,0.06)", borderRadius: 3, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: {
          width: `${Math.max(0, Math.min(100, m ?? 0))}%`,
          height: "100%",
          background: G,
          transition: "width 600ms ease"
        } }) }),
        b && j !== null && j > 0 && /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: a, marginTop: 6, fontVariantNumeric: "tabular-nums" }, children: [
          Eg(j),
          " until full"
        ] })
      ] }),
      (S !== null || C !== null) && /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 14, flex: "none" }, children: [
        S !== null && /* @__PURE__ */ r.jsx(Ka, { label: "Inside", value: `${Math.round(S)}${$}`, fonts: n, fg: l, fg3: a }),
        C !== null && /* @__PURE__ */ r.jsx(Ka, { label: "Outside", value: `${Math.round(C)}${$}`, fonts: n, fg: l, fg3: a })
      ] })
    ] }),
    D && B !== void 0 && B !== null && /* @__PURE__ */ r.jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      padding: "10px 12px",
      borderRadius: 10,
      marginBottom: 12,
      background: `${t}11`,
      border: `.5px solid ${t}33`
    }, children: [
      /* @__PURE__ */ r.jsxs("div", { children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t, letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 600, marginBottom: 2 }, children: "Climate target" }),
        /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: n.display, fontSize: 22, color: l, fontVariantNumeric: "tabular-nums" }, children: [
          Math.round(B),
          $
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
        /* @__PURE__ */ r.jsx(Xa, { onClick: () => k("climate", "set_temperature", { entity_id: H, temperature: Math.max(U, B - 1) }), border: d, fg: s, children: "−" }),
        /* @__PURE__ */ r.jsx(Xa, { onClick: () => k("climate", "set_temperature", { entity_id: H, temperature: Math.min(I, B + 1) }), border: d, fg: s, children: "+" })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: {
      display: "grid",
      gridTemplateColumns: `repeat(${c ? 2 : 3}, 1fr)`,
      gap: 8
    }, children: [
      f(T) && /* @__PURE__ */ r.jsx(
        dt,
        {
          label: E ? "Unlock" : "Lock",
          icon: E ? "🔓" : "🔒",
          active: !E,
          onClick: () => k("lock", E ? "unlock" : "lock", { entity_id: T }),
          accent: t,
          surface: o,
          border: d,
          fg: l,
          fg3: a
        }
      ),
      f(H) && /* @__PURE__ */ r.jsx(
        dt,
        {
          label: D ? "Climate off" : "Climate on",
          icon: D ? "🌡️" : "🌬️",
          active: D,
          onClick: () => k("climate", D ? "turn_off" : "turn_on", { entity_id: H }),
          accent: t,
          surface: o,
          border: d,
          fg: l,
          fg3: a
        }
      ),
      f(R) && /* @__PURE__ */ r.jsx(
        dt,
        {
          label: "Frunk",
          sub: h(R) === "open" ? "Open" : "Closed",
          icon: "🚗",
          active: h(R) === "open",
          onClick: () => k("cover", h(R) === "open" ? "close_cover" : "open_cover", { entity_id: R }),
          accent: t,
          surface: o,
          border: d,
          fg: l,
          fg3: a
        }
      ),
      f(F) && /* @__PURE__ */ r.jsx(
        dt,
        {
          label: "Trunk",
          sub: h(F) === "open" ? "Open" : "Closed",
          icon: "🧳",
          active: h(F) === "open",
          onClick: () => k("cover", h(F) === "open" ? "close_cover" : "open_cover", { entity_id: F }),
          accent: t,
          surface: o,
          border: d,
          fg: l,
          fg3: a
        }
      ),
      f(N) && /* @__PURE__ */ r.jsx(
        dt,
        {
          label: "Charge port",
          sub: h(N) === "open" ? "Open" : "Closed",
          icon: "🔌",
          active: h(N) === "open",
          onClick: () => k("cover", h(N) === "open" ? "close_cover" : "open_cover", { entity_id: N }),
          accent: t,
          surface: o,
          border: d,
          fg: l,
          fg3: a
        }
      ),
      f(O) && /* @__PURE__ */ r.jsx(
        dt,
        {
          label: "Sentry",
          sub: h(O) === "on" ? "On" : "Off",
          icon: "👁️",
          active: h(O) === "on",
          onClick: () => k("switch", h(O) === "on" ? "turn_off" : "turn_on", { entity_id: O }),
          accent: t,
          surface: o,
          border: d,
          fg: l,
          fg3: a
        }
      ),
      f(me) && /* @__PURE__ */ r.jsx(
        dt,
        {
          label: "Defrost",
          sub: h(me) === "on" ? "On" : "Off",
          icon: "❄️",
          active: h(me) === "on",
          onClick: () => k("switch", h(me) === "on" ? "turn_off" : "turn_on", { entity_id: me }),
          accent: t,
          surface: o,
          border: d,
          fg: l,
          fg3: a
        }
      ),
      f(`button.${te}_flash_lights`) && /* @__PURE__ */ r.jsx(
        dt,
        {
          label: "Flash",
          icon: "💡",
          onClick: () => k("button", "press", { entity_id: `button.${te}_flash_lights` }),
          accent: t,
          surface: o,
          border: d,
          fg: l,
          fg3: a
        }
      ),
      f(`button.${te}_honk_horn`) && /* @__PURE__ */ r.jsx(
        dt,
        {
          label: "Honk",
          icon: "📣",
          onClick: () => k("button", "press", { entity_id: `button.${te}_honk_horn` }),
          accent: t,
          surface: o,
          border: d,
          fg: l,
          fg3: a
        }
      )
    ] })
  ] });
}, Ka = ({ label: e, value: t, fonts: n, fg: i, fg3: o }) => /* @__PURE__ */ r.jsxs("div", { style: { textAlign: "right" }, children: [
  /* @__PURE__ */ r.jsx("div", { style: { fontSize: 9.5, color: o, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 2 }, children: e }),
  /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 16, color: i, fontVariantNumeric: "tabular-nums" }, children: t })
] }), Xa = ({ children: e, onClick: t, border: n, fg: i }) => /* @__PURE__ */ r.jsx("button", { onClick: t, style: {
  width: 30,
  height: 30,
  borderRadius: 8,
  background: "transparent",
  border: `.5px solid ${n}`,
  color: i,
  fontSize: 16,
  cursor: "pointer",
  fontFamily: "inherit",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center"
}, children: e }), dt = ({ label: e, sub: t, icon: n, active: i, onClick: o, accent: l, surface: s, border: a, fg: d, fg3: c }) => /* @__PURE__ */ r.jsxs("button", { onClick: o, style: {
  padding: "12px 10px",
  borderRadius: 10,
  background: i ? `${l}1a` : s,
  border: `.5px solid ${i ? `${l}66` : a}`,
  color: d,
  cursor: "pointer",
  fontFamily: "inherit",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 4,
  textAlign: "left"
}, children: [
  /* @__PURE__ */ r.jsx("span", { style: { fontSize: 18, lineHeight: 1 }, children: n }),
  /* @__PURE__ */ r.jsx("span", { style: { fontSize: 12, fontWeight: 500, color: d }, children: e }),
  t && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 10, color: i ? l : c, letterSpacing: ".04em", textTransform: "uppercase" }, children: t })
] });
function Eg(e) {
  if (!e || e <= 0) return "";
  const t = Math.floor(e), n = Math.round((e - t) * 60);
  return t === 0 ? `${n}m` : n === 0 ? `${t}h` : `${t}h ${n}m`;
}
const Pg = ({ todos: e, accent: t, fonts: n, surface: i, fg: o, fg2: l, fg3: s, border: a }) => !e || !e.length ? /* @__PURE__ */ r.jsx(_s, { title: "To-do", hint: "Add a To-do list in HA: Settings → Devices & Services → + Add Integration → Local To-do.", surface: i, fg: o, fg2: l, fg3: s, border: a, fonts: n, accent: t }) : /* @__PURE__ */ r.jsxs(Ge, { surface: i, border: a, children: [
  /* @__PURE__ */ r.jsx($r, { title: "To-do", right: /* @__PURE__ */ r.jsxs("span", { style: { fontSize: 11, color: s }, children: [
    e.reduce((d, c) => d + (c.count || 0), 0),
    " open"
  ] }), fonts: n, fg: o, fg3: s, accent: t }),
  /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: e.slice(0, 5).map((d) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: `.5px solid ${a}` }, children: [
    /* @__PURE__ */ r.jsx("span", { style: {
      width: 16,
      height: 16,
      borderRadius: 4,
      border: `.5px solid ${a}`,
      flex: "none"
    } }),
    /* @__PURE__ */ r.jsx("span", { style: { flex: 1, fontSize: 13, color: o, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: d.name }),
    /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, color: s, fontVariantNumeric: "tabular-nums" }, children: d.count ?? 0 })
  ] }, d.id)) })
] }), Dg = ({ accent: e, fonts: t, surface: n, fg: i, fg2: o, fg3: l, border: s }) => {
  const [a, d] = React.useState(null), [c, p] = React.useState(null), [u, h] = React.useState(!1), [v, w] = React.useState("all");
  React.useEffect(() => {
    let g = !0;
    const y = typeof AbortController < "u" ? new AbortController() : null, x = async () => {
      try {
        const j = await yg({ signal: y?.signal });
        g && (d(j), p(null));
      } catch (j) {
        g && j?.name !== "AbortError" && p(j?.message || String(j));
      }
    };
    x();
    const b = setInterval(x, 60 * 1e3);
    return () => {
      g = !1, clearInterval(b), y?.abort();
    };
  }, []);
  const { visible: f, hiddenCount: k } = React.useMemo(() => {
    if (!a || !a.length) return { visible: [], hiddenCount: 0 };
    if (v !== "all") {
      const x = a.filter((j) => j.leagueId === v), b = u ? x.length : 6;
      return { visible: x.slice(0, b), hiddenCount: Math.max(0, x.length - b) };
    }
    if (u)
      return { visible: a.slice(0, 12), hiddenCount: Math.max(0, a.length - 12) };
    const g = a.filter((x) => x.isFavorite);
    let y;
    if (g.length >= 3)
      y = g;
    else {
      const x = a.filter(
        (b) => !b.isFavorite && (b.status.state === "in" || b.status.state === "pre")
      );
      y = [...g, ...x].slice(0, Math.max(3, g.length));
    }
    return { visible: y, hiddenCount: Math.max(0, a.length - y.length) };
  }, [a, v, u]), m = React.useMemo(() => {
    if (!a) return [];
    const g = new Set(a.map((y) => y.leagueId));
    return zl.filter((y) => g.has(y.id));
  }, [a]);
  return a === null ? /* @__PURE__ */ r.jsxs(Ge, { surface: n, border: s, children: [
    /* @__PURE__ */ r.jsx(Jr, { fonts: t, fg: i, fg2: o, border: s, availableLeagues: [], leagueFilter: "all", setLeagueFilter: () => {
    } }),
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: l }, children: "Pulling scores from ESPN…" })
  ] }) : c && !a.length ? /* @__PURE__ */ r.jsxs(Ge, { surface: n, border: s, children: [
    /* @__PURE__ */ r.jsx(Jr, { fonts: t, fg: i, fg2: o, border: s, availableLeagues: [], leagueFilter: "all", setLeagueFilter: () => {
    } }),
    /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: l }, children: [
      "Couldn't reach ESPN: ",
      c
    ] })
  ] }) : a.length ? /* @__PURE__ */ r.jsxs(Ge, { surface: n, border: s, children: [
    /* @__PURE__ */ r.jsx(
      Jr,
      {
        fonts: t,
        fg: i,
        fg2: o,
        border: s,
        availableLeagues: m,
        leagueFilter: v,
        setLeagueFilter: (g) => {
          w(g), h(!1);
        }
      }
    ),
    f.length > 0 ? /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: f.map((g) => /* @__PURE__ */ r.jsx(Ng, { g, accent: e, fonts: t, fg: i, fg2: o, fg3: l, border: s }, g.id)) }) : /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: l, padding: "8px 0" }, children: v === "all" ? "No favorite or upcoming games right now." : `No ${zl.find((g) => g.id === v)?.name || ""} games today.` }),
    (k > 0 || u) && /* @__PURE__ */ r.jsx("button", { onClick: () => h((g) => !g), style: {
      marginTop: 10,
      width: "100%",
      padding: "7px 10px",
      borderRadius: 7,
      background: "transparent",
      cursor: "pointer",
      border: `.5px solid ${s}`,
      color: o,
      fontSize: 11,
      fontFamily: "inherit",
      letterSpacing: ".04em",
      textTransform: "uppercase"
    }, children: u ? "Show less" : `Show more${k ? ` (${k})` : ""}` })
  ] }) : /* @__PURE__ */ r.jsxs(Ge, { surface: n, border: s, children: [
    /* @__PURE__ */ r.jsx(Jr, { fonts: t, fg: i, fg2: o, border: s, availableLeagues: [], leagueFilter: "all", setLeagueFilter: () => {
    } }),
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: l }, children: "Nothing on the docket right now." })
  ] });
}, Jr = ({ fonts: e, fg: t, fg2: n, border: i, availableLeagues: o, leagueFilter: l, setLeagueFilter: s }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, gap: 8 }, children: [
  /* @__PURE__ */ r.jsx("div", { style: { fontFamily: e.display, fontSize: 15, color: t, fontWeight: 500 }, children: "Sports" }),
  /* @__PURE__ */ r.jsxs(
    "select",
    {
      value: l,
      onChange: (a) => s(a.target.value),
      "aria-label": "Filter by league",
      style: {
        background: "rgba(241,234,217,0.04)",
        color: n,
        border: `.5px solid ${i}`,
        borderRadius: 6,
        fontSize: 11,
        padding: "4px 8px",
        fontFamily: "inherit",
        cursor: "pointer"
      },
      children: [
        /* @__PURE__ */ r.jsx("option", { value: "all", children: "All leagues" }),
        o.map((a) => /* @__PURE__ */ r.jsx("option", { value: a.id, children: a.name }, a.id))
      ]
    }
  )
] }), Ng = ({ g: e, accent: t, fonts: n, fg: i, fg2: o, fg3: l, border: s }) => {
  const a = e.status.state === "in", d = e.status.state === "pre", c = e.status.state === "post", p = e.startTime ? `${e.startTime.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })} · ${e.startTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : "", u = d ? p : e.status.label || (c ? "Final" : ""), h = !d, v = c && Number(e.teamA.score) < Number(e.teamB.score), w = c && Number(e.teamB.score) < Number(e.teamA.score);
  return /* @__PURE__ */ r.jsxs("div", { style: {
    padding: "9px 11px",
    borderRadius: 9,
    background: e.isFavorite ? `${t}13` : "rgba(241,234,217,0.025)",
    border: e.isFavorite ? `.5px solid ${t}44` : `.5px solid ${s}`
  }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6 }, children: [
      /* @__PURE__ */ r.jsx("span", { style: { fontSize: 9.5, color: e.isFavorite ? t : l, letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: e.league }),
      a && /* @__PURE__ */ r.jsx("span", { style: { flex: "none", fontSize: 9, padding: "2px 6px", borderRadius: 999, background: "#c14d36", color: "#fff", fontWeight: 600, letterSpacing: ".04em" }, children: "LIVE" })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 3 }, children: [
      /* @__PURE__ */ r.jsx(qa, { c: e.teamA, fg: i, fg3: l, fonts: n, dim: v, showScore: h }),
      /* @__PURE__ */ r.jsx(qa, { c: e.teamB, fg: i, fg3: l, fonts: n, dim: w, showScore: h })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10.5, color: l, marginTop: 5, textAlign: "right", fontVariantNumeric: "tabular-nums" }, children: u })
  ] });
}, qa = ({ c: e, fg: t, fg3: n, fonts: i, dim: o, showScore: l }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, opacity: o ? 0.55 : 1 }, children: [
  e.logo ? /* @__PURE__ */ r.jsx("img", { src: e.logo, alt: "", width: "18", height: "18", style: { flex: "none", objectFit: "contain" }, loading: "lazy" }) : /* @__PURE__ */ r.jsx("span", { style: { flex: "none", width: 18, height: 18, borderRadius: "50%", background: "rgba(241,234,217,0.06)" } }),
  /* @__PURE__ */ r.jsx("span", { style: { flex: 1, minWidth: 0, fontSize: 12.5, color: t, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: e.name }),
  l && e.score !== "" && /* @__PURE__ */ r.jsx("span", { style: { fontFamily: i.display, fontSize: 15, color: t, fontVariantNumeric: "tabular-nums", fontWeight: e.winner ? 600 : 400 }, children: e.score })
] }), Lg = ({ news: e, accent: t, fonts: n, surface: i, fg: o, fg2: l, fg3: s, border: a }) => !e || !e.length ? /* @__PURE__ */ r.jsx(_s, { title: "Breaking news", hint: "Add Feedreader in configuration.yaml with your favourite RSS URLs (NYT, BBC, etc.). I can wire this up if you want.", surface: i, fg: o, fg2: l, fg3: s, border: a, fonts: n, accent: t }) : /* @__PURE__ */ r.jsxs(Ge, { surface: i, border: a, children: [
  /* @__PURE__ */ r.jsx($r, { title: "Breaking news", right: /* @__PURE__ */ r.jsxs("span", { style: { fontSize: 11, color: s }, children: [
    e.length,
    " headlines"
  ] }), fonts: n, fg: o, fg3: s, accent: t }),
  /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: e.slice(0, 5).map((d, c) => /* @__PURE__ */ r.jsxs("a", { href: d.url || "#", target: "_blank", rel: "noopener noreferrer", style: {
    padding: "8px 0",
    borderBottom: `.5px solid ${a}`,
    textDecoration: "none",
    color: "inherit"
  }, children: [
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: o, lineHeight: 1.4, marginBottom: 4 }, children: d.title }),
    /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 10.5, color: s, letterSpacing: ".04em", textTransform: "uppercase" }, children: [
      d.source,
      " · ",
      d.timeAgo
    ] })
  ] }, c)) })
] }), Ja = "homecntrd_notes_v1", _o = "homecntrd_drawing_v1", Za = "homecntrd_notes_mode_v1", Ag = ({ accent: e, fonts: t, surface: n, fg: i, fg2: o, fg3: l, border: s }) => {
  const [a, d] = React.useState(() => {
    try {
      return localStorage.getItem(Za) || "text";
    } catch {
      return "text";
    }
  }), c = (p) => {
    d(p);
    try {
      localStorage.setItem(Za, p);
    } catch {
    }
  };
  return /* @__PURE__ */ r.jsxs(Ge, { surface: n, border: s, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, gap: 8 }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { fontFamily: t.display, fontSize: 15, color: i, fontWeight: 500 }, children: "Notes" }),
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 4, padding: 3, borderRadius: 8, background: "rgba(241,234,217,0.04)", border: `.5px solid ${s}` }, children: [
        /* @__PURE__ */ r.jsx("button", { onClick: () => c("text"), style: Ni(a === "text", e, o), children: "Text" }),
        /* @__PURE__ */ r.jsx("button", { onClick: () => c("draw"), style: Ni(a === "draw", e, o), children: "Draw" })
      ] })
    ] }),
    a === "text" && /* @__PURE__ */ r.jsx(Og, { fg: i, border: s, fonts: t }),
    a === "draw" && /* @__PURE__ */ r.jsx(Wg, { accent: e, fg: i, fg3: l, border: s, fonts: t })
  ] });
}, Ni = (e, t, n) => ({
  padding: "5px 12px",
  borderRadius: 6,
  border: 0,
  background: e ? t : "transparent",
  color: e ? "#fff" : n,
  fontSize: 11.5,
  fontWeight: e ? 500 : 400,
  cursor: "pointer",
  fontFamily: "inherit"
}), Og = ({ fg: e, border: t, fonts: n }) => {
  const [i, o] = React.useState(() => {
    try {
      return localStorage.getItem(Ja) || "";
    } catch {
      return "";
    }
  }), l = (s) => {
    o(s);
    try {
      localStorage.setItem(Ja, s);
    } catch {
    }
  };
  return /* @__PURE__ */ r.jsx(
    "textarea",
    {
      value: i,
      onChange: (s) => l(s.target.value),
      placeholder: "Quick thoughts, reminders, things to remember…",
      style: {
        width: "100%",
        minHeight: 160,
        padding: "10px 12px",
        borderRadius: 8,
        background: "rgba(241,234,217,0.03)",
        color: e,
        border: `.5px solid ${t}`,
        outline: "none",
        resize: "vertical",
        fontFamily: n.body,
        fontSize: 13,
        lineHeight: 1.5,
        boxSizing: "border-box"
      }
    }
  );
}, Wg = ({ accent: e, fg: t, fg3: n, border: i, fonts: o }) => {
  const l = React.useRef(null), s = React.useRef(null), a = React.useRef(!1), d = React.useRef({ x: 0, y: 0 }), [c, p] = React.useState("pen"), u = React.useCallback(() => {
    const m = l.current, g = s.current;
    if (!m || !g) return;
    const y = window.devicePixelRatio || 1, x = g.clientWidth, b = 240;
    m.width = x * y, m.height = b * y, m.style.width = `${x}px`, m.style.height = `${b}px`;
    const j = m.getContext("2d");
    j.setTransform(y, 0, 0, y, 0, 0), j.lineCap = "round", j.lineJoin = "round";
    try {
      const S = localStorage.getItem(_o);
      if (S) {
        const C = new Image();
        C.onload = () => j.drawImage(C, 0, 0, x, b), C.src = S;
      }
    } catch {
    }
  }, []);
  React.useEffect(() => {
    if (u(), typeof ResizeObserver > "u") return;
    const m = new ResizeObserver(u);
    return s.current && m.observe(s.current), () => m.disconnect();
  }, [u]);
  const h = (m) => {
    const g = l.current.getBoundingClientRect();
    return { x: m.clientX - g.left, y: m.clientY - g.top };
  }, v = (m) => {
    m.preventDefault(), l.current.setPointerCapture?.(m.pointerId), a.current = !0, d.current = h(m);
  }, w = (m) => {
    if (!a.current) return;
    m.preventDefault();
    const g = l.current.getContext("2d"), { x: y, y: x } = h(m);
    g.beginPath(), g.moveTo(d.current.x, d.current.y), g.lineTo(y, x), g.lineWidth = c === "eraser" ? 18 : 2.5, g.strokeStyle = c === "eraser" ? "rgba(0,0,0,1)" : "#f1ead9", g.globalCompositeOperation = c === "eraser" ? "destination-out" : "source-over", g.stroke(), d.current = { x: y, y: x };
  }, f = () => {
    if (a.current) {
      a.current = !1;
      try {
        localStorage.setItem(_o, l.current.toDataURL("image/png"));
      } catch {
      }
    }
  }, k = () => {
    const m = l.current, g = m.getContext("2d");
    g.save(), g.setTransform(1, 0, 0, 1, 0, 0), g.clearRect(0, 0, m.width, m.height), g.restore();
    try {
      localStorage.removeItem(_o);
    } catch {
    }
  };
  return /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 4, padding: 3, borderRadius: 7, background: "rgba(241,234,217,0.03)", border: `.5px solid ${i}` }, children: [
        /* @__PURE__ */ r.jsx("button", { onClick: () => p("pen"), style: Ni(c === "pen", e, n), children: "Pen" }),
        /* @__PURE__ */ r.jsx("button", { onClick: () => p("eraser"), style: Ni(c === "eraser", e, n), children: "Eraser" })
      ] }),
      /* @__PURE__ */ r.jsx("button", { onClick: k, style: {
        padding: "5px 10px",
        borderRadius: 6,
        border: `.5px solid ${i}`,
        background: "transparent",
        color: n,
        fontSize: 11,
        cursor: "pointer",
        fontFamily: "inherit"
      }, children: "Clear" })
    ] }),
    /* @__PURE__ */ r.jsx("div", { ref: s, style: {
      background: "rgba(241,234,217,0.03)",
      border: `.5px solid ${i}`,
      borderRadius: 8,
      overflow: "hidden"
    }, children: /* @__PURE__ */ r.jsx(
      "canvas",
      {
        ref: l,
        onPointerDown: v,
        onPointerMove: w,
        onPointerUp: f,
        onPointerCancel: f,
        onPointerLeave: f,
        style: {
          display: "block",
          width: "100%",
          height: 240,
          touchAction: "none",
          // critical: stops the page from scrolling while you draw with a finger or stylus
          cursor: c === "eraser" ? "cell" : "crosshair"
        }
      }
    ) }),
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10.5, color: n, marginTop: 6, lineHeight: 1.4 }, children: "Use Apple Pencil, stylus, or finger. Drawings save automatically per device." })
  ] });
}, ed = ({ calendar: e, events: t, accent: n, fonts: i, surface: o, surface2: l, fg: s, fg2: a, fg3: d, border: c }) => {
  const p = /* @__PURE__ */ new Date(), u = yn(p), [h, v] = React.useState(() => new Date(p.getFullYear(), p.getMonth(), 1)), [w, f] = React.useState(null), k = h.getMonth(), m = h.getFullYear(), g = h.toLocaleDateString([], { month: "long", year: "numeric" }), y = new Date(m, k, 1).getDay(), x = new Date(m, k + 1, 0).getDate(), b = [];
  for (let _ = 0; _ < y; _++) b.push(null);
  for (let _ = 1; _ <= x; _++) b.push(_);
  const j = React.useMemo(() => {
    const _ = /* @__PURE__ */ new Set();
    for (const E of t || [])
      E?.start && _.add(yn(E.start instanceof Date ? E.start : new Date(E.start)));
    return _;
  }, [t]), S = React.useMemo(() => {
    if (!t?.length) return [];
    if (w)
      return t.filter((E) => E.start && yn(E.start instanceof Date ? E.start : new Date(E.start)) === w);
    const _ = new Date(p);
    return _.setHours(0, 0, 0, 0), _.setDate(_.getDate() + 3), t.filter((E) => {
      if (!E.start) return !1;
      const H = E.start instanceof Date ? E.start : new Date(E.start);
      return H.getTime() >= p.getTime() - 60 * 60 * 1e3 && H.getTime() < _.getTime();
    });
  }, [t, w, u]), C = () => v((_) => new Date(_.getFullYear(), _.getMonth() - 1, 1)), $ = () => v((_) => new Date(_.getFullYear(), _.getMonth() + 1, 1)), T = () => {
    v(new Date(p.getFullYear(), p.getMonth(), 1)), f(null);
  };
  return /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
    /* @__PURE__ */ r.jsxs(Ge, { surface: o, border: c, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, gap: 6 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontFamily: i.display, fontSize: 16, color: s, fontWeight: 500, flex: 1 }, children: g }),
        /* @__PURE__ */ r.jsx("button", { onClick: C, "aria-label": "Previous month", style: Ro(a, c), children: "‹" }),
        /* @__PURE__ */ r.jsx("button", { onClick: T, "aria-label": "Today", style: { ...Ro(a, c), padding: "0 10px", width: "auto", fontSize: 11 }, children: "Today" }),
        /* @__PURE__ */ r.jsx("button", { onClick: $, "aria-label": "Next month", style: Ro(a, c), children: "›" })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, fontFamily: i.body, fontSize: 11 }, children: [
        ["S", "M", "T", "W", "T", "F", "S"].map((_, E) => /* @__PURE__ */ r.jsx("div", { style: { textAlign: "center", padding: 4, color: d, fontWeight: 500 }, children: _ }, E)),
        b.map((_, E) => {
          if (!_) return /* @__PURE__ */ r.jsx("div", {}, E);
          const H = new Date(m, k, _), P = yn(H), D = P === u, B = P === w, U = j.has(P);
          return /* @__PURE__ */ r.jsxs(
            "button",
            {
              onClick: () => f((I) => I === P ? null : P),
              style: {
                position: "relative",
                textAlign: "center",
                padding: "8px 0",
                borderRadius: 6,
                fontSize: 12,
                fontVariantNumeric: "tabular-nums",
                color: D ? "#fff" : B ? n : a,
                background: D ? n : B ? `${n}22` : "transparent",
                border: 0,
                cursor: "pointer",
                fontFamily: i.body,
                fontWeight: D || B ? 600 : 400,
                outline: B && !D ? `1px solid ${n}66` : "none"
              },
              children: [
                _,
                U && /* @__PURE__ */ r.jsx("span", { style: {
                  position: "absolute",
                  left: "50%",
                  bottom: 3,
                  transform: "translateX(-50%)",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: D ? "#fff" : n
                } })
              ]
            },
            E
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs(Ge, { surface: o, border: c, children: [
      /* @__PURE__ */ r.jsx(
        $r,
        {
          title: w ? (/* @__PURE__ */ new Date(w + "T00:00:00")).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) : "Next 3 days",
          right: w ? /* @__PURE__ */ r.jsx("button", { onClick: () => f(null), style: Hg(d), children: "Clear" }) : /* @__PURE__ */ r.jsxs("span", { style: { fontSize: 11, color: d }, children: [
            S.length,
            " event",
            S.length === 1 ? "" : "s"
          ] }),
          fonts: i,
          fg: s,
          fg3: d,
          accent: n
        }
      ),
      S.length > 0 ? /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: S.map((_, E) => {
        const H = _.start instanceof Date ? _.start : new Date(_.start), P = _.end ? _.end instanceof Date ? _.end : new Date(_.end) : null, D = H.getDate(), B = H.toLocaleDateString([], { month: "short" }).toUpperCase(), U = _.isAllDay ? "All day" : H.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) + (P ? ` – ${P.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : "");
        return /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 10, padding: "6px 0", borderBottom: E < S.length - 1 ? `.5px solid ${c}` : "none" }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: {
            width: 38,
            flex: "none",
            textAlign: "center",
            padding: "4px 0",
            background: l,
            borderRadius: 6,
            border: `.5px solid ${c}`
          }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 9, color: d, letterSpacing: ".06em", textTransform: "uppercase" }, children: B }),
            /* @__PURE__ */ r.jsx("div", { style: { fontFamily: i.display, fontSize: 16, color: s, fontWeight: 500, lineHeight: 1 }, children: D })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: s, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: _.title }),
            /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: d, marginTop: 2 }, children: [
              U,
              _.where ? ` · ${_.where}` : ""
            ] })
          ] }),
          _.kind === "birthday" && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 12 }, children: "🎂" })
        ] }, _.id || E);
      }) }) : e?.length ? /* @__PURE__ */ r.jsx("div", { style: { padding: "20px 0", textAlign: "center", color: d, fontSize: 12 }, children: w ? "Nothing scheduled this day." : "Nothing scheduled in the next 3 days." }) : /* @__PURE__ */ r.jsx(Tu, { hint: "Add Outlook, Google Calendar, or Remote iCalendar in HA to see events here.", fg: a, fg3: d, border: c, accent: n, surface: l })
    ] })
  ] });
};
function yn(e) {
  if (!e) return "";
  const t = e instanceof Date ? e : new Date(e);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
const Ro = (e, t) => ({
  width: 26,
  height: 26,
  borderRadius: 6,
  background: "transparent",
  border: `.5px solid ${t}`,
  color: e,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  fontFamily: "inherit"
}), Hg = (e) => ({
  background: "transparent",
  border: 0,
  color: e,
  fontSize: 11,
  cursor: "pointer",
  padding: 0,
  fontFamily: "inherit",
  textDecoration: "underline",
  textUnderlineOffset: 2
}), Ge = ({ surface: e, border: t, children: n, style: i }) => /* @__PURE__ */ r.jsx("div", { style: {
  padding: "18px 20px",
  borderRadius: 14,
  background: e,
  border: `.5px solid ${t}`,
  ...i
}, children: n }), $r = ({ title: e, right: t, fonts: n, fg: i, fg3: o, accent: l }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }, children: [
  /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 15, color: i, fontWeight: 500 }, children: e }),
  t
] }), _s = ({ title: e, hint: t, surface: n, fg: i, fg2: o, fg3: l, border: s, fonts: a, accent: d }) => /* @__PURE__ */ r.jsxs(Ge, { surface: n, border: s, children: [
  /* @__PURE__ */ r.jsx($r, { title: e, right: null, fonts: a, fg: i, fg3: l, accent: d }),
  /* @__PURE__ */ r.jsx(Tu, { hint: t, fg: o, fg3: l, border: s, accent: d, surface: n })
] }), Tu = ({ hint: e, fg: t, fg3: n, border: i, accent: o, surface: l }) => /* @__PURE__ */ r.jsxs("div", { style: {
  padding: "14px 12px",
  borderRadius: 8,
  background: "rgba(241,234,217,0.02)",
  border: `.5px dashed ${i}`,
  fontSize: 12,
  color: n,
  lineHeight: 1.5
}, children: [
  /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }, children: [
    /* @__PURE__ */ r.jsx("span", { style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: o,
      opacity: 0.5,
      display: "inline-block"
    } }),
    /* @__PURE__ */ r.jsx("span", { style: { color: t, fontSize: 11.5, letterSpacing: ".04em", textTransform: "uppercase" }, children: "Not connected yet" })
  ] }),
  e
] });
window.PersonalDashboard = zg;
const Io = [
  { id: "climate", label: "Climate" },
  { id: "lights", label: "Lighting" },
  { id: "music", label: "Music" },
  { id: "tvs", label: "TVs" },
  { id: "scenes", label: "Scenes" },
  { id: "cameras", label: "Cameras" },
  { id: "security", label: "Security & access" },
  { id: "car", label: "Car & garage" },
  { id: "today", label: "Today's schedule" }
], Bg = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l, room: s, user: a, patchUser: d, narrow: c } = e, p = window.ROOMS.find((y) => y.id === s), u = o.lights.filter((y) => y.room === s), h = a?.roomSections || {}, w = a?.homeSections || Object.fromEntries(Io.map((y) => [y.id, !0])), f = h[s] || w, k = (y, x) => d?.((b) => {
    const j = b.roomSections && b.roomSections[s] || b.homeSections || Object.fromEntries(Io.map((S) => [S.id, !0]));
    return { ...b, roomSections: { ...b.roomSections || {}, [s]: { ...j, [y]: x } } };
  }), [m, g] = React.useState(!1);
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "Currently in",
        title: `The ${p?.name || "house"}`,
        sub: `${u.filter((y) => y.on).length} lamps softly lit · ${o.thermostat.temp}° · the cat is asleep on the rug`,
        right: /* @__PURE__ */ r.jsxs("button", { onClick: () => g((y) => !y), style: {
          padding: "8px 14px",
          borderRadius: 9,
          border: `.5px solid ${m ? t.accent : t.border2}`,
          background: m ? t.accentSoft : "transparent",
          color: m ? t.accent : t.fg,
          fontSize: 12,
          cursor: "pointer",
          fontFamily: n.body,
          display: "inline-flex",
          alignItems: "center",
          gap: 6
        }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: m ? "check" : "edit", size: 12 }),
          m ? "Done" : "Customize"
        ] })
      }
    ),
    m && /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 14 }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }, children: [
        "Show in ",
        p?.name || "this room"
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 6 }, children: Io.map((y) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: t.surface, border: `.5px solid ${t.border}` }, children: [
        /* @__PURE__ */ r.jsx("span", { style: { flex: 1, fontSize: 12, color: t.fg }, children: y.label }),
        /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: f[y.id] !== !1, onChange: (x) => k(y.id, x), size: 16 })
      ] }, y.id)) }),
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, fontStyle: "italic", marginTop: 10 }, children: "Each room remembers its own layout." })
    ] }),
    f.climate !== !1 && /* @__PURE__ */ r.jsx(window.ClimateSection, { ctx: e }),
    f.lights !== !1 && /* @__PURE__ */ r.jsx(window.LightsSection, { ctx: e }),
    f.music !== !1 && /* @__PURE__ */ r.jsx(window.MusicSection, { ctx: e }),
    f.tvs !== !1 && /* @__PURE__ */ r.jsx(window.TvsSection, { ctx: e }),
    f.scenes !== !1 && /* @__PURE__ */ r.jsx(window.ScenesSection, { ctx: e }),
    f.cameras !== !1 && /* @__PURE__ */ r.jsx(window.CamerasSection, { ctx: e }),
    f.security !== !1 && /* @__PURE__ */ r.jsx(window.SecuritySection, { ctx: e }),
    f.car !== !1 && /* @__PURE__ */ r.jsx(window.CarSection, { ctx: e }),
    f.today !== !1 && /* @__PURE__ */ r.jsx(window.TodaySection, { ctx: e }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 80 } })
  ] });
}, Vg = ({ ctx: e }) => {
  const { p: t, fonts: n, state: i, setState: o, narrow: l } = e, s = i.thermostat, a = (P) => o((D) => ({ ...D, thermostat: { ...D.thermostat, target: P } })), d = (P) => o((D) => ({ ...D, thermostat: { ...D.thermostat, mode: P } })), c = 60, p = 83, u = React.useRef(null), [h, v] = React.useState(!1), w = (P) => {
    const D = u.current.getBoundingClientRect(), B = D.left + D.width / 2, U = D.top + D.height / 2, I = P.clientX - B, R = P.clientY - U;
    let O = ((Math.atan2(R, I) * 180 / Math.PI + 360) % 360 - 135 + 360) % 360;
    O > 270 && (O = O > 315 ? 0 : 270);
    const me = O / 270;
    return Math.round(c + me * (p - c));
  }, f = (P) => {
    v(!0), u.current.setPointerCapture?.(P.pointerId), a(w(P));
  }, k = (P) => {
    h && a(w(P));
  }, m = (P) => {
    v(!1);
  }, g = 220, y = 92, x = g / 2, b = g / 2, j = (P, D) => {
    const B = P * Math.PI / 180;
    return [x + D * Math.cos(B), b + D * Math.sin(B)];
  }, S = 135, C = 405, $ = S + (s.target - c) / (p - c) * 270, T = S + (s.temp - c) / (p - c) * 270, _ = (P, D) => {
    const [B, U] = j(P, y), [I, R] = j(D, y), F = D - P > 180 ? 1 : 0;
    return `M ${B} ${U} A ${y} ${y} 0 ${F} 1 ${I} ${R}`;
  }, [E, H] = j($, y);
  return /* @__PURE__ */ r.jsx(window.Section, { title: "Climate", subtitle: "Hallway · Nest", p: t, fonts: n, children: /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: l ? 18 : 24, display: "grid", gridTemplateColumns: l ? "1fr" : "auto 1fr", gap: l ? 18 : 30, alignItems: "center", justifyItems: l ? "center" : "stretch" }, children: [
    /* @__PURE__ */ r.jsx(
      "div",
      {
        ref: u,
        onPointerDown: f,
        onPointerMove: k,
        onPointerUp: m,
        onPointerCancel: m,
        style: { width: g, height: g, position: "relative", cursor: h ? "grabbing" : "grab", touchAction: "none", userSelect: "none", flex: "none" },
        children: /* @__PURE__ */ r.jsxs("svg", { width: g, height: g, style: { position: "absolute", inset: 0 }, children: [
          /* @__PURE__ */ r.jsx("path", { d: _(S, C), fill: "none", stroke: t.border, strokeWidth: "14", strokeLinecap: "round" }),
          /* @__PURE__ */ r.jsx("path", { d: _(Math.min(T, $), Math.max(T, $)), fill: "none", stroke: t.accentSoft, strokeWidth: "14", strokeLinecap: "round" }),
          /* @__PURE__ */ r.jsx("path", { d: _(S, $), fill: "none", stroke: t.accent, strokeWidth: "3", strokeLinecap: "round", opacity: ".75" }),
          Array.from({ length: 24 }).map((P, D) => {
            const B = S + D / 23 * 270, [U, I] = j(B, y - 10), [R, F] = j(B, y - 4);
            return /* @__PURE__ */ r.jsx("line", { x1: U, y1: I, x2: R, y2: F, stroke: t.fg3, strokeWidth: ".5", opacity: D % 4 === 0 ? 0.6 : 0.25 }, D);
          }),
          /* @__PURE__ */ r.jsx("circle", { cx: E, cy: H, r: "11", fill: t.accent, stroke: t.surface2, strokeWidth: "3" }),
          /* @__PURE__ */ r.jsx("text", { x, y: b - 12, textAnchor: "middle", fill: t.fg3, fontSize: "10", fontFamily: n.body, letterSpacing: "2", children: "SET TO" }),
          /* @__PURE__ */ r.jsxs("text", { x, y: b + 22, textAnchor: "middle", fill: t.fg, fontSize: "50", fontFamily: n.display, fontWeight: "500", children: [
            s.target,
            "°"
          ] }),
          /* @__PURE__ */ r.jsxs("text", { x, y: b + 44, textAnchor: "middle", fill: t.fg3, fontSize: "11", fontFamily: n.display, fontStyle: "italic", children: [
            "now ",
            s.temp,
            "°"
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 14, width: l ? "100%" : "auto" }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 18, fontSize: 12, color: t.fg2, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ r.jsxs("div", { children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase" }, children: "Inside" }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: n.display, fontSize: 22, color: t.fg, marginTop: 2 }, children: [
            s.temp,
            "°"
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase" }, children: "Humidity" }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: n.display, fontSize: 22, color: t.fg, marginTop: 2 }, children: [
            s.humidity,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase" }, children: "Outside" }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: n.display, fontSize: 22, color: t.fg, marginTop: 2 }, children: [
            i.weather.temp,
            "°"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8 }, children: ["cool", "auto", "heat", "off"].map((P) => /* @__PURE__ */ r.jsx("button", { onClick: () => d(P), style: {
        flex: 1,
        padding: "10px 0",
        textTransform: "capitalize",
        border: `.5px solid ${P === s.mode ? t.accent : t.border2}`,
        background: P === s.mode ? t.accentSoft : "transparent",
        color: P === s.mode ? t.accent : t.fg2,
        borderRadius: 8,
        fontSize: 12,
        cursor: "pointer",
        fontFamily: n.body
      }, children: P }, P)) }),
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, fontStyle: "italic", fontFamily: n.display }, children: [
        "Drag the dial to set the target temperature. ",
        i.weather.summary.toLowerCase(),
        " outside."
      ] })
    ] })
  ] }) });
}, Ug = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l, room: s } = e, a = o.lights.filter((c) => c.room === s), d = a.every((c) => c.on);
  return /* @__PURE__ */ r.jsx(
    window.Section,
    {
      title: "Lighting",
      subtitle: `${a.filter((c) => c.on).length} of ${a.length} on`,
      p: t,
      fonts: n,
      action: /* @__PURE__ */ r.jsx("button", { onClick: () => l((c) => ({ ...c, lights: c.lights.map((p) => p.room === s ? { ...p, on: !d } : p) })), style: { padding: "6px 12px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 11, cursor: "pointer", fontFamily: n.body }, children: d ? "All off" : "All on" }),
      children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: i.tileGap }, children: a.map((c) => /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 14, position: "relative", overflow: "hidden" }, children: [
        c.on && /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", right: -20, top: -20, width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, ${c.color}77, transparent 70%)` } }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: "bulb", size: 18, stroke: 1.4, style: { color: c.on ? c.color : t.fg3 } }),
          /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: c.on, size: 18, onChange: () => l((p) => ({ ...p, lights: p.lights.map((u) => u.id === c.id ? { ...u, on: !u.on } : u) })) })
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: t.fg, marginTop: 10, fontWeight: 500 }, children: c.name }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, marginTop: 1 }, children: c.on ? `${c.brightness}%` : "off" }),
        c.on && /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "range",
            min: "1",
            max: "100",
            value: c.brightness,
            onChange: (p) => l((u) => ({ ...u, lights: u.lights.map((h) => h.id === c.id ? { ...h, brightness: +p.target.value } : h) })),
            style: { width: "100%", marginTop: 8, accentColor: t.accent }
          }
        )
      ] }, c.id)) })
    }
  );
}, Gg = ({ ctx: e }) => {
  const { p: t, fonts: n, state: i, setState: o, room: l, setPage: s } = e, a = i.speakers.find((p) => p.room === l) || i.speakers[0];
  if (!a) return null;
  const d = window.trackById(a.trackId), c = () => o((p) => ({ ...p, speakers: p.speakers.map((u) => u.id === a.id ? { ...u, playing: !a.playing } : u) }));
  return /* @__PURE__ */ r.jsx(
    window.Section,
    {
      title: "Music",
      subtitle: `${i.speakers.filter((p) => p.playing).length} speakers playing`,
      p: t,
      fonts: n,
      action: /* @__PURE__ */ r.jsx("button", { onClick: () => s("music"), style: { padding: "6px 12px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 11, cursor: "pointer", fontFamily: n.body }, children: "Library →" }),
      children: /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 18, display: "flex", gap: 16, alignItems: "center" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 90, height: 90, borderRadius: 10, flex: "none", background: `radial-gradient(120% 120% at 30% 25%, ${d.hue}, oklch(20% 0.05 25))` } }),
        /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 10, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase" }, children: [
            "Now playing · ",
            window.ROOMS.find((p) => p.id === a.room)?.name
          ] }),
          /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 20, color: t.fg, fontWeight: 500, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: d.title }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: t.fg2, fontStyle: "italic", marginTop: 1 }, children: [
            d.artist,
            " · ",
            d.album
          ] }),
          /* @__PURE__ */ r.jsx("div", { style: { height: 3, background: t.border, borderRadius: 2, marginTop: 12, position: "relative" }, children: /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, width: `${a.progress / d.dur * 100}%`, background: t.accent, borderRadius: 2 } }) }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: t.fg3, marginTop: 4 }, children: [
            /* @__PURE__ */ r.jsx("span", { children: window.fmtTime(a.progress) }),
            /* @__PURE__ */ r.jsxs("span", { children: [
              "−",
              window.fmtTime(d.dur - a.progress)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 6, flex: "none" }, children: [
          /* @__PURE__ */ r.jsx("button", { style: { width: 34, height: 34, borderRadius: 8, background: "transparent", border: `.5px solid ${t.border2}`, color: t.fg2, cursor: "pointer" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "prev", size: 14 }) }),
          /* @__PURE__ */ r.jsx("button", { onClick: c, style: { width: 42, height: 42, borderRadius: "50%", background: t.accent, color: "#fff", border: 0, cursor: "pointer", display: "grid", placeItems: "center" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: a.playing ? "pause" : "play", size: 16 }) }),
          /* @__PURE__ */ r.jsx("button", { style: { width: 34, height: 34, borderRadius: 8, background: "transparent", border: `.5px solid ${t.border2}`, color: t.fg2, cursor: "pointer" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "next", size: 14 }) })
        ] })
      ] })
    }
  );
}, Qg = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e;
  return /* @__PURE__ */ r.jsx(window.Section, { title: "Scenes", subtitle: "Tap to activate", p: t, fonts: n, children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: i.tileGap }, children: o.scenes.map((s) => /* @__PURE__ */ r.jsxs("button", { onClick: () => l((a) => ({ ...a, scenes: a.scenes.map((d) => ({ ...d, active: d.id === s.id })) })), style: {
    padding: 14,
    borderRadius: 11,
    cursor: "pointer",
    textAlign: "left",
    fontFamily: n.body,
    background: s.active ? t.accent : t.surface2,
    color: s.active ? "#fff" : t.fg,
    border: `.5px solid ${s.active ? t.accent : t.border}`,
    display: "flex",
    flexDirection: "column",
    gap: 8
  }, children: [
    /* @__PURE__ */ r.jsx(window.Icon, { name: s.icon, size: 22, stroke: 1.4 }),
    /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 14, fontWeight: 500 }, children: s.name }),
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, opacity: 0.7 }, children: s.active ? "Active" : "Tap to run" })
  ] }, s.id)) }) });
}, Yg = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setPage: l } = e;
  return /* @__PURE__ */ r.jsx(
    window.Section,
    {
      title: "Cameras",
      subtitle: `${o.cameras.filter((s) => s.online).length} live · ${o.cameras.filter((s) => s.motion).length} motion`,
      p: t,
      fonts: n,
      action: /* @__PURE__ */ r.jsx("button", { onClick: () => l("cameras"), style: { padding: "6px 12px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 11, cursor: "pointer", fontFamily: n.body }, children: "Open feeds →" }),
      children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: i.tileGap }, children: o.cameras.map((s) => /* @__PURE__ */ r.jsx(window.CamThumb, { c: s, ctx: e }, s.id)) })
    }
  );
}, _l = [
  { id: "disarmed", label: "Disarmed", icon: "shield", desc: "Sensors off · all clear", color: "oklch(55% 0.05 80)" },
  { id: "home", label: "Home", icon: "home", desc: "Perimeter armed · interior bypassed", color: "oklch(60% 0.13 145)" },
  { id: "away", label: "Away", icon: "lock", desc: "Full system armed · entry delay 30s", color: "oklch(58% 0.16 30)" }
], _u = ({ ctx: e, compact: t }) => {
  const { p: n, fonts: i, state: o, setState: l } = e, s = o.ring?.mode || "disarmed", a = (c) => {
    l((p) => ({
      ...p,
      ring: { ...p.ring || {}, mode: c, lastChanged: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), changedBy: "You" },
      // Away also locks everything
      locks: c === "away" ? p.locks.map((u) => ({ ...u, locked: !0 })) : p.locks
    }));
  }, d = _l.find((c) => c.id === s);
  return /* @__PURE__ */ r.jsxs(window.Card, { p: n, style: { padding: t ? 12 : 16 }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { width: 24, height: 24, borderRadius: 5, background: "#1f1f1f", color: "#fff", display: "grid", placeItems: "center", fontSize: 9, fontWeight: 700, flex: "none" }, children: "R" }),
      /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: n.fg, fontWeight: 500 }, children: "Ring Alarm" }),
        /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 10, color: n.fg3 }, children: [
          d.desc,
          " · ",
          o.ring?.lastChanged,
          " by ",
          o.ring?.changedBy
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { width: 7, height: 7, borderRadius: "50%", background: d.color } })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }, children: _l.map((c) => {
      const p = c.id === s;
      return /* @__PURE__ */ r.jsxs("button", { onClick: () => a(c.id), style: {
        padding: t ? "8px 6px" : "10px 8px",
        borderRadius: 8,
        border: `.5px solid ${p ? c.color : n.border2}`,
        background: p ? `color-mix(in oklch, ${c.color} 14%, transparent)` : n.surface,
        color: p ? c.color : n.fg,
        cursor: "pointer",
        fontFamily: i.body,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        transition: "border-color .15s, background .15s"
      }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: c.icon, size: 14 }),
        /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, fontWeight: p ? 600 : 500 }, children: c.label })
      ] }, c.id);
    }) })
  ] });
}, Kg = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, s = o.locks.every((c) => c.locked), a = o.ring?.mode || "disarmed", d = _l.find((c) => c.id === a);
  return /* @__PURE__ */ r.jsxs(
    window.Section,
    {
      title: "Security & access",
      subtitle: `${d.label} · ${s ? "all locked" : "something is open"}`,
      p: t,
      fonts: n,
      action: /* @__PURE__ */ r.jsx("button", { onClick: () => l((c) => ({ ...c, locks: c.locks.map((p) => ({ ...p, locked: !0 })) })), style: { padding: "6px 12px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 11, cursor: "pointer", fontFamily: n.body }, children: "Lock all" }),
      children: [
        /* @__PURE__ */ r.jsx("div", { style: { marginBottom: i.tileGap }, children: /* @__PURE__ */ r.jsx(_u, { ctx: e }) }),
        /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: i.tileGap }, children: o.locks.map((c) => /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 14, display: "flex", alignItems: "center", gap: 12 }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: "lock", size: 20, style: { color: c.locked ? "oklch(60% 0.13 145)" : t.accent } }),
          /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: t.fg, fontWeight: 500 }, children: c.name }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, marginTop: 1 }, children: c.locked ? "Locked" : "Unlocked" })
          ] }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => l((p) => ({ ...p, locks: p.locks.map((u) => u.id === c.id ? { ...u, locked: !u.locked } : u) })), style: { padding: "5px 10px", borderRadius: 999, border: `.5px solid ${c.locked ? t.border2 : t.accent}`, background: c.locked ? "transparent" : t.accentSoft, color: c.locked ? t.fg2 : t.accent, fontSize: 11, cursor: "pointer" }, children: c.locked ? "Unlock" : "Lock" })
        ] }, c.id)) })
      ]
    }
  );
}, Xg = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setPage: l, narrow: s } = e, a = o.tesla, d = o.garage.doors.filter((c) => c.open).length;
  return /* @__PURE__ */ r.jsx(window.Section, { title: "Car & garage", p: t, fonts: n, children: /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: s ? "1fr" : "1fr 1fr", gap: i.tileGap }, children: [
    /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 16, cursor: "pointer" }, onClick: () => l("car"), children: [
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: t.fg3 }, children: "Tesla · Model 3" }),
        /* @__PURE__ */ r.jsx(window.Icon, { name: "car", size: 14, style: { color: t.fg3 } })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 8, marginTop: 10 }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: n.display, fontSize: 34, color: t.fg, fontWeight: 500, lineHeight: 1 }, children: [
          a.chargePct,
          /* @__PURE__ */ r.jsx("span", { style: { fontSize: 14, color: t.fg2 }, children: "%" })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: t.fg2 }, children: [
          a.range,
          " mi · ",
          a.charging ? `+${a.chargeRate} mph` : a.pluggedIn ? "plugged in" : "unplugged"
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { height: 5, background: t.border, borderRadius: 3, marginTop: 12, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${a.chargePct}%`, height: "100%", background: a.charging ? t.accent : "oklch(60% 0.14 145)" } }) }),
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, marginTop: 8, display: "flex", alignItems: "center", gap: 5 }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: "location", size: 10 }),
        " ",
        a.location
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 16, cursor: "pointer" }, onClick: () => l("garage"), children: [
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: t.fg3 }, children: "Garage · MyQ" }),
        /* @__PURE__ */ r.jsx(window.Icon, { name: "garage", size: 14, style: { color: t.fg3 } })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 18, color: t.fg, marginTop: 10, fontWeight: 500 }, children: d === 0 ? "Both doors closed" : /* @__PURE__ */ r.jsxs("em", { style: { fontStyle: "italic", color: t.accent }, children: [
        d,
        " open"
      ] }) }),
      /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 5, marginTop: 10 }, children: o.garage.doors.map((c) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: t.fg2 }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: "garage", size: 11, style: { color: c.open ? t.accent : t.fg3 } }),
        /* @__PURE__ */ r.jsx("span", { style: { flex: 1 }, children: c.name }),
        /* @__PURE__ */ r.jsx("span", { style: { color: c.open ? t.accent : t.fg3, fontSize: 11 }, children: c.open ? "Open" : "Closed" })
      ] }, c.id)) })
    ] })
  ] }) });
}, qg = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setPage: l, narrow: s } = e;
  return /* @__PURE__ */ r.jsx(
    window.Section,
    {
      title: "Today",
      subtitle: `${o.calendar.length} events · ${o.alarms.filter((a) => a.on).length} alarms`,
      p: t,
      fonts: n,
      action: /* @__PURE__ */ r.jsx("button", { onClick: () => l("calendar"), style: { padding: "6px 12px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 11, cursor: "pointer", fontFamily: n.body }, children: "Calendar →" }),
      children: /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: s ? "1fr" : "2fr 1fr", gap: i.tileGap }, children: [
        /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 16 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }, children: "Schedule" }),
          o.calendar.slice(0, 5).map((a, d) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 12, padding: "8px 0", borderTop: d ? `.5px solid ${t.border}` : "none", alignItems: "baseline" }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { width: 64, fontSize: 12, color: t.fg2, fontVariantNumeric: "tabular-nums" }, children: a.t }),
            /* @__PURE__ */ r.jsx("div", { style: { width: 3, height: 18, borderRadius: 2, background: a.dot, alignSelf: "center" } }),
            /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, fontSize: 13, color: t.fg }, children: [
              a.title,
              /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, color: t.fg3, marginLeft: 8 }, children: a.where })
            ] }),
            a.dnd && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 9, padding: "1px 6px", borderRadius: 999, background: t.accentSoft, color: t.accent }, children: "DND" })
          ] }, a.id))
        ] }),
        /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 16 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }, children: "Alarms" }),
          o.alarms.map((a, d) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: d ? `.5px solid ${t.border}` : "none" }, children: [
            /* @__PURE__ */ r.jsxs("div", { children: [
              /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 15, color: a.on ? t.fg : t.fg3, fontVariantNumeric: "tabular-nums" }, children: a.time }),
              /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3 }, children: a.label })
            ] }),
            /* @__PURE__ */ r.jsx("div", { style: { flex: 1 } }),
            /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: a.on, size: 16, onChange: (c) => e.setState((p) => ({ ...p, alarms: p.alarms.map((u) => u.id === a.id ? { ...u, on: c } : u) })) })
          ] }, a.id))
        ] })
      ] })
    }
  );
}, Jg = ({ c: e, ctx: t }) => {
  const { p: n, fonts: i } = t;
  return /* @__PURE__ */ r.jsxs("div", { style: { aspectRatio: "16/10", borderRadius: 10, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${e.hue}, oklch(20% 0.04 25))`, color: "#fff" }, children: [
    /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(110deg, rgba(255,255,255,0.05) 0 12px, transparent 12px 24px)" } }),
    /* @__PURE__ */ r.jsxs("div", { style: { position: "absolute", top: 8, left: 8, fontSize: 10, padding: "2px 7px", borderRadius: 999, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", gap: 5 }, children: [
      /* @__PURE__ */ r.jsx("span", { style: { width: 5, height: 5, borderRadius: "50%", background: e.online ? "#ff5c5c" : "#666" } }),
      e.online ? "LIVE" : "OFF"
    ] }),
    e.motion && /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", top: 8, right: 8, fontSize: 10, padding: "2px 7px", borderRadius: 999, background: "rgba(255,92,92,.85)" }, children: "MOTION" }),
    /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", bottom: 8, left: 10, fontFamily: i.display, fontSize: 13, fontStyle: "italic" }, children: e.name })
  ] });
};
Object.assign(window, { HomeView: Bg, ClimateSection: Vg, LightsSection: Ug, MusicSection: Gg, ScenesSection: Qg, CamerasSection: Yg, SecuritySection: Kg, CarSection: Xg, TodaySection: qg, CamThumb: Jg, RingModeSwitcher: _u });
const Zg = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, [s, a] = React.useState("library"), [d, c] = React.useState(window.PLAYLISTS[0].id), [p, u] = React.useState(""), [h, v] = React.useState(o.speakers[0].id), w = o.speakers.find((S) => S.id === h) || o.speakers[0], f = (S, C = h) => {
    l(($) => ({
      ...$,
      speakers: $.speakers.map((T) => T.id === C ? { ...T, trackId: S, progress: 0, playing: !0 } : T)
    }));
  }, k = (S) => l((C) => ({
    ...C,
    speakers: C.speakers.map(($) => $.id === S ? { ...$, playing: !$.playing } : $)
  })), m = (S, C) => l(($) => ({
    ...$,
    speakers: $.speakers.map((T) => T.id === S ? { ...T, vol: C } : T)
  })), g = (S, C) => {
    l(($) => {
      const T = $.playlists || JSON.parse(JSON.stringify(window.PLAYLISTS));
      return {
        ...$,
        playlists: T.map((_) => _.id === S ? { ..._, tracks: _.tracks.includes(C) ? _.tracks : [..._.tracks, C], count: _.count + (_.tracks.includes(C) ? 0 : 1) } : _)
      };
    });
  }, y = (S, C) => {
    l(($) => {
      const T = $.playlists || JSON.parse(JSON.stringify(window.PLAYLISTS));
      return {
        ...$,
        playlists: T.map((_) => _.id === S ? { ..._, tracks: _.tracks.filter((E) => E !== C), count: Math.max(0, _.count - 1) } : _)
      };
    });
  }, x = o.playlists || window.PLAYLISTS, b = x.find((S) => S.id === d), j = p ? window.TRACKS.filter((S) => (S.title + " " + S.artist + " " + S.album).toLowerCase().includes(p.toLowerCase())) : window.TRACKS;
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "Apple Music · 2,847 songs",
        title: "Library",
        sub: "frances.w@icloud.com · streaming to Sonos & AirPlay",
        right: /* @__PURE__ */ r.jsx(em, { ctx: e, value: p, onChange: (S) => {
          u(S), S && a("search");
        } })
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "200px 1fr 320px", gap: i.gap, alignItems: "start", minHeight: 0 }, children: [
      /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: "14px 8px", position: "sticky", top: 0 }, children: [
        /* @__PURE__ */ r.jsx(Yn, { ctx: e, icon: "library", label: "Library", active: s === "library", onClick: () => a("library") }),
        /* @__PURE__ */ r.jsx(Yn, { ctx: e, icon: "clock", label: "Recently played", active: s === "recent", onClick: () => a("recent") }),
        /* @__PURE__ */ r.jsx(Yn, { ctx: e, icon: "heart", label: "Favorites", onClick: () => a("library") }),
        /* @__PURE__ */ r.jsx(Yn, { ctx: e, icon: "search", label: "Search", active: s === "search", onClick: () => a("search") }),
        /* @__PURE__ */ r.jsx("div", { style: { padding: "14px 14px 6px", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: t.fg3, fontWeight: 500 }, children: "Playlists" }),
        x.map((S) => /* @__PURE__ */ r.jsx(
          Yn,
          {
            ctx: e,
            swatches: S.art.slice(0, 4),
            label: S.name,
            active: s === "playlist" && d === S.id,
            onClick: () => {
              a("playlist"), c(S.id);
            }
          },
          S.id
        )),
        /* @__PURE__ */ r.jsxs("button", { style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 14px",
          margin: "4px 0",
          border: 0,
          background: "transparent",
          color: t.fg3,
          fontSize: 12,
          fontFamily: n.body,
          cursor: "pointer",
          width: "100%"
        }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: "plus", size: 14 }),
          " New playlist"
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: i.gap, minWidth: 0 }, children: s === "playlist" && b ? /* @__PURE__ */ r.jsx(
        nm,
        {
          ctx: e,
          pl: b,
          playOn: f,
          speaker: w,
          removeFromPlaylist: y
        }
      ) : s === "recent" ? /* @__PURE__ */ r.jsx(Li, { ctx: e, title: "Recently played", tracks: window.TRACKS.slice(0, 8), playOn: f, speaker: w, playlists: x, addToPlaylist: g }) : s === "search" ? /* @__PURE__ */ r.jsx(Li, { ctx: e, title: `Results for "${p}"`, tracks: j, playOn: f, speaker: w, playlists: x, addToPlaylist: g }) : /* @__PURE__ */ r.jsx(tm, { ctx: e, playOn: f, speaker: w, playlists: x, addToPlaylist: g, setSection: a, setActivePlaylist: c }) }),
      /* @__PURE__ */ r.jsx(
        im,
        {
          ctx: e,
          activeSpeaker: h,
          setActiveSpeaker: v,
          togglePlay: k,
          setVol: m
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
}, Yn = ({ ctx: e, icon: t, label: n, active: i, onClick: o, swatches: l }) => {
  const { p: s, fonts: a } = e;
  return /* @__PURE__ */ r.jsxs("button", { onClick: o, style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "7px 12px",
    margin: "2px 4px",
    borderRadius: 7,
    border: 0,
    background: i ? s.warm : "transparent",
    color: i ? s.fg : s.fg2,
    fontFamily: a.body,
    fontSize: 13,
    cursor: "pointer",
    width: "calc(100% - 8px)",
    textAlign: "left",
    borderLeft: i ? `2px solid ${s.accent}` : "2px solid transparent"
  }, children: [
    t && /* @__PURE__ */ r.jsx(window.Icon, { name: t, size: 14, stroke: 1.5 }),
    l && /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", width: 18, height: 18, borderRadius: 3, overflow: "hidden", flex: "none" }, children: l.map((d, c) => /* @__PURE__ */ r.jsx("span", { style: { background: d } }, c)) }),
    /* @__PURE__ */ r.jsx("span", { style: { flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: n })
  ] });
}, em = ({ ctx: e, value: t, onChange: n }) => {
  const { p: i, fonts: o } = e;
  return /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: i.surface2, borderRadius: 10, border: `.5px solid ${i.border}`, minWidth: 280 }, children: [
    /* @__PURE__ */ r.jsx(window.Icon, { name: "search", size: 14, style: { color: i.fg3 } }),
    /* @__PURE__ */ r.jsx("input", { value: t, onChange: (l) => n(l.target.value), placeholder: "Search songs, artists, albums…", style: {
      flex: 1,
      border: 0,
      outline: "none",
      background: "transparent",
      color: i.fg,
      fontSize: 13,
      fontFamily: o.body
    } })
  ] });
}, tm = ({ ctx: e, playOn: t, speaker: n, playlists: i, addToPlaylist: o, setSection: l, setActivePlaylist: s }) => {
  const { p: a, fonts: d, dens: c } = e;
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs(window.Card, { p: a, style: { padding: 0, overflow: "hidden", display: "flex", minHeight: 200 }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, padding: 24, display: "flex", flexDirection: "column", justifyContent: "flex-end", background: `linear-gradient(135deg, ${a.accent} 0%, oklch(35% 0.13 30) 100%)` }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: "rgba(255,255,255,.85)", letterSpacing: ".12em", textTransform: "uppercase" }, children: "Made for you" }),
        /* @__PURE__ */ r.jsx("div", { style: { fontFamily: d.display, fontSize: 30, color: "#fff", marginTop: 6, fontWeight: 500 }, children: "Frances' Picks" }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: "rgba(255,255,255,.85)", marginTop: 4, fontStyle: "italic" }, children: "91 tracks · refreshed for Tuesday" }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 14 }, children: [
          /* @__PURE__ */ r.jsxs("button", { onClick: () => t("t11"), style: { padding: "8px 18px", borderRadius: 8, border: 0, background: "#fff", color: a.accent, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: "play", size: 13 }),
            " Play"
          ] }),
          /* @__PURE__ */ r.jsx("button", { style: { padding: "8px 18px", borderRadius: 8, border: ".5px solid rgba(255,255,255,.4)", background: "transparent", color: "#fff", fontSize: 13, cursor: "pointer" }, children: "Shuffle" })
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { width: 200, position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }, children: window.PLAYLISTS[3].art.map((p, u) => /* @__PURE__ */ r.jsx("div", { style: { background: p } }, u)) })
    ] }),
    /* @__PURE__ */ r.jsx(window.Section, { title: "Recently played", p: a, fonts: d, children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: c.tileGap }, children: window.TRACKS.slice(0, 6).map((p) => /* @__PURE__ */ r.jsxs("button", { onClick: () => t(p.id), style: { padding: 0, border: 0, background: "transparent", cursor: "pointer", textAlign: "left" }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { aspectRatio: "1", borderRadius: 8, background: `radial-gradient(120% 120% at 30% 25%, ${p.hue}, oklch(15% 0.05 25))`, position: "relative", overflow: "hidden" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 70%, rgba(255,220,150,.4), transparent 55%)" } }),
        /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", bottom: 8, left: 10, right: 10, fontFamily: d.display, fontStyle: "italic", fontSize: 10, color: "rgba(255,240,210,.85)", letterSpacing: ".05em", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: p.album })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { fontFamily: d.display, fontSize: 14, color: a.fg, marginTop: 8, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: p.title }),
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: a.fg3, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: p.artist })
    ] }, p.id)) }) }),
    /* @__PURE__ */ r.jsx(window.Section, { title: "Your playlists", p: a, fonts: d, children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: c.tileGap }, children: i.map((p) => /* @__PURE__ */ r.jsxs("button", { onClick: () => {
      l("playlist"), s(p.id);
    }, style: { padding: 0, border: 0, background: "transparent", cursor: "pointer", textAlign: "left" }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { aspectRatio: "1", borderRadius: 8, display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }, children: p.art.slice(0, 4).map((u, h) => /* @__PURE__ */ r.jsx("div", { style: { background: u } }, h)) }),
      /* @__PURE__ */ r.jsx("div", { style: { fontFamily: d.display, fontSize: 14, color: a.fg, marginTop: 8, fontWeight: 500 }, children: p.name }),
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: a.fg3, marginTop: 1 }, children: [
        p.count,
        " songs"
      ] })
    ] }, p.id)) }) }),
    /* @__PURE__ */ r.jsx(window.Section, { title: "All songs", subtitle: `${window.TRACKS.length} of 2,847`, p: a, fonts: d, children: /* @__PURE__ */ r.jsx(Li, { ctx: e, tracks: window.TRACKS, playOn: t, speaker: n, playlists: i, addToPlaylist: o }) })
  ] });
}, nm = ({ ctx: e, pl: t, playOn: n, speaker: i, removeFromPlaylist: o }) => {
  const { p: l, fonts: s } = e, a = t.tracks.map((d) => window.trackById(d)).filter(Boolean);
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs(window.Card, { p: l, style: { padding: 0, overflow: "hidden", display: "flex", minHeight: 200 }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { width: 200, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, flex: "none" }, children: t.art.slice(0, 4).map((d, c) => /* @__PURE__ */ r.jsx("div", { style: { background: d } }, c)) }),
      /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, padding: 24, display: "flex", flexDirection: "column", justifyContent: "flex-end" }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: l.fg3, letterSpacing: ".12em", textTransform: "uppercase" }, children: [
          "Playlist · ",
          t.count,
          " songs"
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { fontFamily: s.display, fontSize: 36, color: l.fg, marginTop: 6, fontWeight: 500 }, children: t.name }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 14 }, children: [
          /* @__PURE__ */ r.jsxs("button", { onClick: () => a[0] && n(a[0].id), style: { padding: "8px 18px", borderRadius: 8, border: 0, background: l.accent, color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: s.body }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: "play", size: 13 }),
            " Play"
          ] }),
          /* @__PURE__ */ r.jsxs("button", { style: { padding: "8px 14px", borderRadius: 8, border: `.5px solid ${l.border2}`, background: "transparent", color: l.fg, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: s.body }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: "shuffle", size: 13 }),
            " Shuffle"
          ] }),
          /* @__PURE__ */ r.jsxs("button", { style: { padding: "8px 14px", borderRadius: 8, border: `.5px solid ${l.border2}`, background: "transparent", color: l.fg, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: s.body }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: "edit", size: 13 }),
            " Edit"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsx(
      Li,
      {
        ctx: e,
        tracks: a,
        playOn: n,
        speaker: i,
        rowAction: (d) => /* @__PURE__ */ r.jsxs(
          "button",
          {
            onClick: (c) => {
              c.stopPropagation(), o(t.id, d.id);
            },
            style: { padding: "4px 8px", borderRadius: 6, border: `.5px solid ${l.border2}`, background: "transparent", color: l.fg3, fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: s.body },
            children: [
              /* @__PURE__ */ r.jsx(window.Icon, { name: "minus", size: 11 }),
              " Remove"
            ]
          }
        )
      }
    )
  ] });
}, Li = ({ ctx: e, tracks: t, title: n, playOn: i, speaker: o, playlists: l, addToPlaylist: s, rowAction: a }) => {
  const { p: d, fonts: c } = e, [p, u] = React.useState(null);
  return /* @__PURE__ */ r.jsxs("div", { children: [
    n && /* @__PURE__ */ r.jsx("h2", { style: { margin: "0 0 12px", fontFamily: c.display, fontSize: 20, fontWeight: 500, color: d.fg }, children: n }),
    /* @__PURE__ */ r.jsxs(window.Card, { p: d, style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "40px 1.6fr 1fr 1fr 60px 80px", alignItems: "center", gap: 14, padding: "10px 18px", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: d.fg3, borderBottom: `.5px solid ${d.border}` }, children: [
        /* @__PURE__ */ r.jsx("span", { children: "#" }),
        /* @__PURE__ */ r.jsx("span", { children: "Title" }),
        /* @__PURE__ */ r.jsx("span", { children: "Artist" }),
        /* @__PURE__ */ r.jsx("span", { children: "Album" }),
        /* @__PURE__ */ r.jsx("span", { style: { textAlign: "right" }, children: "Time" }),
        /* @__PURE__ */ r.jsx("span", {})
      ] }),
      t.map((h, v) => {
        const w = o.trackId === h.id;
        return /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "40px 1.6fr 1fr 1fr 60px 80px", alignItems: "center", gap: 14, padding: "8px 18px", fontSize: 13, color: d.fg, borderBottom: v < t.length - 1 ? `.5px solid ${d.border}` : "none", cursor: "pointer", position: "relative" }, onDoubleClick: () => i(h.id), children: [
          /* @__PURE__ */ r.jsx("button", { onClick: () => i(h.id), style: { width: 24, height: 24, borderRadius: "50%", border: 0, background: w ? d.accent : "transparent", color: w ? "#fff" : d.fg3, cursor: "pointer", display: "grid", placeItems: "center" }, children: w && o.playing ? /* @__PURE__ */ r.jsx(rm, { p: d }) : /* @__PURE__ */ r.jsx(window.Icon, { name: "play", size: 11 }) }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, minWidth: 0 }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { width: 34, height: 34, borderRadius: 5, flex: "none", background: `radial-gradient(120% 120% at 30% 25%, ${h.hue}, oklch(20% 0.05 25))` } }),
            /* @__PURE__ */ r.jsx("div", { style: { minWidth: 0 }, children: /* @__PURE__ */ r.jsx("div", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: w ? d.accent : d.fg, fontWeight: w ? 500 : 400 }, children: h.title }) })
          ] }),
          /* @__PURE__ */ r.jsx("div", { style: { color: d.fg2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: h.artist }),
          /* @__PURE__ */ r.jsx("div", { style: { color: d.fg3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: h.album }),
          /* @__PURE__ */ r.jsx("div", { style: { textAlign: "right", color: d.fg3, fontSize: 11, fontVariantNumeric: "tabular-nums" }, children: window.fmtTime(h.dur) }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "flex-end", gap: 6, position: "relative" }, children: [
            a ? a(h) : /* @__PURE__ */ r.jsx("button", { onClick: (f) => {
              f.stopPropagation(), u(p === h.id ? null : h.id);
            }, style: {
              width: 26,
              height: 26,
              borderRadius: 6,
              border: 0,
              background: "transparent",
              color: d.fg3,
              cursor: "pointer",
              display: "grid",
              placeItems: "center"
            }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "dots", size: 14 }) }),
            p === h.id && l && /* @__PURE__ */ r.jsxs(
              "div",
              {
                style: { position: "absolute", right: 0, top: 30, width: 200, background: d.surface2, border: `.5px solid ${d.border2}`, borderRadius: 9, boxShadow: "0 12px 32px rgba(0,0,0,.18)", zIndex: 30, padding: 6 },
                onMouseLeave: () => u(null),
                children: [
                  /* @__PURE__ */ r.jsx("div", { style: { padding: "4px 10px", fontSize: 10, color: d.fg3, letterSpacing: ".1em", textTransform: "uppercase" }, children: "Add to playlist" }),
                  l.map((f) => /* @__PURE__ */ r.jsxs("button", { onClick: () => {
                    s(f.id, h.id), u(null);
                  }, style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "7px 10px",
                    borderRadius: 6,
                    border: 0,
                    background: "transparent",
                    color: d.fg,
                    fontSize: 12,
                    cursor: "pointer",
                    fontFamily: c.body,
                    textAlign: "left"
                  }, children: [
                    /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", width: 14, height: 14, borderRadius: 2, overflow: "hidden", flex: "none" }, children: f.art.slice(0, 4).map((k, m) => /* @__PURE__ */ r.jsx("span", { style: { background: k } }, m)) }),
                    f.name
                  ] }, f.id))
                ]
              }
            )
          ] })
        ] }, h.id + "-" + v);
      })
    ] })
  ] });
}, rm = ({ p: e }) => /* @__PURE__ */ r.jsxs("span", { style: { display: "inline-flex", gap: 1.5, alignItems: "flex-end", height: 10 }, children: [
  [0, 1, 2].map((t) => /* @__PURE__ */ r.jsx("span", { style: { width: 2, background: "#fff", animation: `mvBar 0.8s ${t * 0.12}s infinite ease-in-out`, height: "100%" } }, t)),
  /* @__PURE__ */ r.jsx("style", { children: "@keyframes mvBar{0%,100%{height:30%}50%{height:100%}}" })
] }), im = ({ ctx: e, activeSpeaker: t, setActiveSpeaker: n, togglePlay: i, setVol: o }) => {
  const { p: l, fonts: s, state: a, setState: d } = e;
  return /* @__PURE__ */ r.jsxs(window.Card, { p: l, style: { padding: 0, overflow: "hidden", position: "sticky", top: 0 }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { padding: "14px 16px", borderBottom: `.5px solid ${l.border}`, display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ r.jsx(window.Icon, { name: "airplay", size: 14, style: { color: l.accent } }),
      /* @__PURE__ */ r.jsx("div", { style: { flex: 1, fontFamily: s.display, fontSize: 15, color: l.fg, fontWeight: 500 }, children: "Playing on" }),
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: l.fg3 }, children: [
        a.speakers.filter((c) => c.playing).length,
        " of ",
        a.speakers.length
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { maxHeight: 520, overflow: "auto" }, children: a.speakers.map((c) => {
      const p = window.trackById(c.trackId), u = c.id === t;
      return /* @__PURE__ */ r.jsxs("div", { onClick: () => n(c.id), style: {
        padding: "12px 14px",
        borderBottom: `.5px solid ${l.border}`,
        cursor: "pointer",
        background: u ? l.warm : "transparent",
        borderLeft: u ? `2px solid ${l.accent}` : "2px solid transparent"
      }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { width: 36, height: 36, borderRadius: 6, background: `radial-gradient(120% 120% at 30% 25%, ${p.hue}, oklch(20% 0.05 25))`, flex: "none" } }),
          /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: l.fg, fontWeight: 500 }, children: [
              /* @__PURE__ */ r.jsx(window.Icon, { name: c.type === "airplay" ? "airplay" : "sonos", size: 11, style: { color: l.fg3 } }),
              c.name,
              c.playing && /* @__PURE__ */ r.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "oklch(60% 0.14 145)" } })
            ] }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: l.fg3, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: c.playing ? `${p.title} · ${p.artist}` : "Idle" })
          ] }),
          /* @__PURE__ */ r.jsx("button", { onClick: (h) => {
            h.stopPropagation(), i(c.id);
          }, style: {
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: 0,
            background: c.playing ? l.accent : l.surface,
            color: c.playing ? "#fff" : l.fg2,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            flex: "none"
          }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: c.playing ? "pause" : "play", size: 11 }) })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginTop: 8 }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: "speaker", size: 11, style: { color: l.fg3 } }),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "100",
              value: c.vol,
              onChange: (h) => o(c.id, +h.target.value),
              onClick: (h) => h.stopPropagation(),
              style: { flex: 1, accentColor: l.accent, height: 3 }
            }
          ),
          /* @__PURE__ */ r.jsx("span", { style: { fontSize: 10, color: l.fg3, fontVariantNumeric: "tabular-nums", width: 20, textAlign: "right" }, children: c.vol })
        ] }),
        c.playing && /* @__PURE__ */ r.jsx("div", { style: { height: 2, background: l.border, borderRadius: 1, marginTop: 6, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${c.progress / p.dur * 100}%`, height: "100%", background: l.accent } }) })
      ] }, c.id);
    }) }),
    /* @__PURE__ */ r.jsxs("div", { style: { padding: "12px 14px", borderTop: `.5px solid ${l.border}`, display: "flex", gap: 8 }, children: [
      /* @__PURE__ */ r.jsx("button", { onClick: () => d((c) => ({ ...c, speakers: c.speakers.map((p) => ({ ...p, playing: !1 })) })), style: {
        flex: 1,
        padding: "7px 10px",
        borderRadius: 7,
        border: `.5px solid ${l.border2}`,
        background: "transparent",
        color: l.fg,
        fontSize: 11,
        cursor: "pointer",
        fontFamily: s.body
      }, children: "Pause all" }),
      /* @__PURE__ */ r.jsxs("button", { onClick: () => {
        const c = a.speakers.find((p) => p.id === t);
        d((p) => ({ ...p, speakers: p.speakers.map((u) => ({ ...u, group: "g1", trackId: c.trackId, progress: c.progress, playing: c.playing })) }));
      }, style: {
        flex: 1,
        padding: "7px 10px",
        borderRadius: 7,
        border: `.5px solid ${l.accent}`,
        background: l.accentSoft,
        color: l.accent,
        fontSize: 11,
        cursor: "pointer",
        fontFamily: s.body,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
      }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: "airplay", size: 11 }),
        " Group all"
      ] })
    ] })
  ] });
};
window.MusicView = Zg;
const om = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o } = e, [l, s] = React.useState(o.cameras[0].id), a = o.cameras.find((d) => d.id === l) || o.cameras[0];
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "Ring · live",
        title: "Around the house",
        sub: `${o.cameras.filter((d) => d.online).length} live · ${o.cameras.filter((d) => d.motion).length} with motion`
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: i.gap }, children: [
      /* @__PURE__ */ r.jsxs("div", { children: [
        /* @__PURE__ */ r.jsx("div", { style: { aspectRatio: "16/9", borderRadius: 14, overflow: "hidden", position: "relative" }, children: /* @__PURE__ */ r.jsx(window.CamThumb, { c: a, ctx: e, big: !0 }) }),
        /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }, children: ["Talk", "Snapshot", "Save clip", "Mute alerts", "Spotlight"].map((d) => /* @__PURE__ */ r.jsx("button", { style: { padding: "8px 14px", borderRadius: 8, border: `.5px solid ${t.border2}`, background: t.surface2, color: t.fg, fontSize: 12, cursor: "pointer", fontFamily: n.body }, children: d }, d)) }),
        /* @__PURE__ */ r.jsx("div", { style: { marginTop: 12 }, children: /* @__PURE__ */ r.jsx(window.RingModeSwitcher, { ctx: e }) })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, alignContent: "start" }, children: o.cameras.map((d) => /* @__PURE__ */ r.jsx("button", { onClick: () => s(d.id), style: { padding: 0, border: `.5px solid ${d.id === l ? t.accent : "transparent"}`, borderRadius: 11, background: "transparent", cursor: "pointer" }, children: /* @__PURE__ */ r.jsx(window.CamThumb, { c: d, ctx: e }) }, d.id)) })
    ] }),
    /* @__PURE__ */ r.jsx(window.Section, { title: "Recent activity", p: t, fonts: n, children: [
      { t: "7:38 PM", cam: "Front Door", what: "Person at front door · package delivered", dot: t.accent },
      { t: "5:14 PM", cam: "Driveway", what: "Vehicle pulled in · Frances's Subaru", dot: "oklch(60% 0.13 145)" },
      { t: "2:02 PM", cam: "Back Yard", what: "Motion · likely a deer", dot: t.fg3 },
      { t: "12:38 PM", cam: "Garage", what: "Door opened · Frances", dot: "oklch(60% 0.13 145)" }
    ].map((d, c) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 10, background: t.surface2, border: `.5px solid ${t.border}`, marginBottom: 8 }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { width: 60, fontSize: 12, color: t.fg2, fontVariantNumeric: "tabular-nums" }, children: d.t }),
      /* @__PURE__ */ r.jsx("div", { style: { width: 6, height: 6, borderRadius: "50%", background: d.dot } }),
      /* @__PURE__ */ r.jsx("div", { style: { flex: 1, fontSize: 13, color: t.fg }, children: d.what }),
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, fontStyle: "italic" }, children: d.cam })
    ] }, c)) }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
};
window.CamerasView = om;
const lm = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, s = (p, u, h) => l((v) => ({ ...v, calendar: v.calendar.map((w) => w.id === p ? { ...w, [u]: h } : w) })), a = (p, u) => s(p, "dnd", !u), d = (p, u) => s(p, "preMins", u), c = (p) => l((u) => ({ ...u, dnd: { active: !0, until: p.end + " (" + p.title + ")", source: p.id } }));
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "Microsoft Outlook · frances.w@willowstudio.com",
        title: "Tuesday, May 5",
        sub: `${o.calendar.length} events · ${o.calendar.filter((p) => p.dnd).length} with Do Not Disturb`,
        right: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: /* @__PURE__ */ r.jsx(sm, { ctx: e }) })
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: i.gap, alignItems: "start" }, children: [
      /* @__PURE__ */ r.jsx(window.Card, { p: t, style: { padding: 0, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx(am, { ctx: e }) }),
      /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: o.calendar.map((p) => /* @__PURE__ */ r.jsx(window.Card, { p: t, style: { padding: 16 }, children: /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 12, alignItems: "flex-start" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 4, alignSelf: "stretch", borderRadius: 2, background: p.dot, flex: "none" } }),
        /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 10 }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 17, fontWeight: 500, color: t.fg, flex: 1 }, children: p.title }),
            /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: t.fg2, fontVariantNumeric: "tabular-nums" }, children: [
              p.t,
              " – ",
              p.end
            ] })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: t.fg3, marginTop: 3, fontStyle: "italic" }, children: [
            p.where,
            " · ",
            p.organizer
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, marginTop: 12, padding: "10px 12px", borderRadius: 8, background: p.dnd ? t.accentSoft : t.surface, border: `.5px solid ${p.dnd ? t.accent : t.border}` }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: p.dnd ? "bellOff" : "bell", size: 14, style: { color: p.dnd ? t.accent : t.fg3 } }),
            /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, fontSize: 12 }, children: [
              /* @__PURE__ */ r.jsxs("div", { style: { color: p.dnd ? t.accent : t.fg, fontWeight: p.dnd ? 500 : 400 }, children: [
                "Do not disturb ",
                p.dnd ? "on" : "off"
              ] }),
              p.dnd && /* @__PURE__ */ r.jsxs("div", { style: { color: t.fg3, marginTop: 2, fontSize: 11 }, children: [
                "Starts ",
                p.preMins,
                " min before · ends when meeting ends"
              ] })
            ] }),
            p.dnd && /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 4 }, children: [0, 5, 10, 15].map((u) => /* @__PURE__ */ r.jsx("button", { onClick: () => d(p.id, u), style: {
              padding: "3px 7px",
              borderRadius: 5,
              fontSize: 10,
              border: `.5px solid ${u === p.preMins ? t.accent : t.border2}`,
              background: u === p.preMins ? t.accent : "transparent",
              color: u === p.preMins ? "#fff" : t.fg2,
              cursor: "pointer",
              fontFamily: n.body
            }, children: u === 0 ? "now" : `−${u}m` }, u)) }),
            /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: p.dnd, onChange: () => a(p.id, p.dnd) })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 6, marginTop: 10, fontSize: 11 }, children: [
            /* @__PURE__ */ r.jsx("span", { style: {
              padding: "3px 8px",
              borderRadius: 999,
              border: `.5px solid ${t.border2}`,
              color: p.accepted === "accepted" ? "oklch(60% 0.13 145)" : t.fg3,
              background: p.accepted === "accepted" ? "oklch(60% 0.13 145 / .12)" : "transparent"
            }, children: p.accepted === "accepted" ? "✓ Going" : "? Tentative" }),
            p.dnd && /* @__PURE__ */ r.jsx("button", { onClick: () => c(p), style: {
              padding: "3px 9px",
              borderRadius: 999,
              border: `.5px solid ${t.accent}`,
              background: t.accent,
              color: "#fff",
              fontSize: 11,
              cursor: "pointer",
              fontFamily: n.body
            }, children: "Start DND now" })
          ] })
        ] })
      ] }) }, p.id)) })
    ] }),
    /* @__PURE__ */ r.jsx(dm, { ctx: e }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
}, sm = ({ ctx: e }) => {
  const { p: t, fonts: n, state: i, setState: o } = e;
  return i.dnd.active ? /* @__PURE__ */ r.jsxs("div", { style: { display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 14px", borderRadius: 10, background: t.accent, color: "#fff", fontSize: 12, fontFamily: n.body, whiteSpace: "nowrap" }, children: [
    /* @__PURE__ */ r.jsx(window.Icon, { name: "bellOff", size: 14 }),
    "DND active · until ",
    i.dnd.until,
    /* @__PURE__ */ r.jsx("button", { onClick: () => o((l) => ({ ...l, dnd: { active: !1, until: null, source: null } })), style: {
      marginLeft: 8,
      padding: "3px 9px",
      borderRadius: 6,
      border: 0,
      background: "rgba(255,255,255,.2)",
      color: "#fff",
      fontSize: 11,
      cursor: "pointer"
    }, children: "End" })
  ] }) : /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderRadius: 10, border: `.5px solid ${t.border2}`, background: t.surface2, color: t.fg, fontSize: 12, fontFamily: n.body }, children: [
    /* @__PURE__ */ r.jsx(window.Icon, { name: "bell", size: 14, style: { color: t.fg3 } }),
    "Notifications · all clear"
  ] });
}, am = ({ ctx: e }) => {
  const { p: t, fonts: n, state: i } = e, o = 8, l = 20, s = (l - o) * 60, a = 44, d = (l - o) * a, c = (v) => {
    const [, w, f, k] = v.match(/(\d+):(\d+)\s*(AM|PM)/i);
    return (parseInt(w) % 12 + (k.toUpperCase() === "PM" ? 12 : 0)) * 60 + parseInt(f);
  }, p = (v) => (c(v) - o * 60) / s * d, h = (19 * 60 + 42 - o * 60) / s * d;
  return /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "60px 1fr", height: d, fontSize: 11 }, children: [
    /* @__PURE__ */ r.jsx("div", { children: Array.from({ length: l - o }).map((v, w) => /* @__PURE__ */ r.jsxs("div", { style: { height: a, color: t.fg3, padding: "2px 10px 0", borderTop: `.5px solid ${t.border}`, textAlign: "right" }, children: [
      (o + w) % 12 || 12,
      " ",
      o + w >= 12 ? "PM" : "AM"
    ] }, w)) }),
    /* @__PURE__ */ r.jsxs("div", { style: { position: "relative", borderLeft: `.5px solid ${t.border}` }, children: [
      Array.from({ length: l - o }).map((v, w) => /* @__PURE__ */ r.jsx("div", { style: { height: a, borderTop: `.5px solid ${t.border}` } }, w)),
      i.calendar.map((v) => {
        const w = p(v.t), k = (c(v.end) - c(v.t)) / 60 * a;
        return /* @__PURE__ */ r.jsxs("div", { style: {
          position: "absolute",
          top: w,
          left: 8,
          right: 14,
          height: k - 4,
          borderRadius: 8,
          background: v.dot,
          color: "#fff",
          padding: "8px 10px",
          fontSize: 11,
          lineHeight: 1.3,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,.15)"
        }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontWeight: 600, fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: v.title }),
          /* @__PURE__ */ r.jsxs("div", { style: { opacity: 0.85, fontSize: 10 }, children: [
            v.t,
            " – ",
            v.end,
            " · ",
            v.where
          ] }),
          v.dnd && /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", top: 7, right: 8, fontSize: 9, padding: "1px 5px", borderRadius: 3, background: "rgba(255,255,255,.25)" }, children: "DND" })
        ] }, v.id);
      }),
      /* @__PURE__ */ r.jsxs("div", { style: { position: "absolute", top: h, left: 0, right: 0, height: 1, background: t.accent, zIndex: 5 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", left: -4, top: -4, width: 9, height: 9, borderRadius: "50%", background: t.accent } }),
        /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", right: 8, top: -9, fontSize: 10, color: t.accent, fontWeight: 600, background: t.surface2, padding: "1px 5px", borderRadius: 3 }, children: "now · 7:42 PM" })
      ] })
    ] })
  ] });
}, dm = ({ ctx: e }) => {
  const { p: t, fonts: n } = e;
  return /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 18, background: t.surface }, children: [
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.fg3, marginBottom: 10 }, children: "How meeting DND works" }),
    /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, fontSize: 12, color: t.fg2 }, children: [
      { n: "1", icon: "bellOff", title: "Mute notifications", text: "Silences phone, watch, and home speaker chimes for the duration of the meeting." },
      { n: "2", icon: "bulb", title: "Dim office lights", text: "Brings office lights to 60% and pauses any music in that room." },
      { n: "3", icon: "cam", title: "Hide camera doorbells", text: "Mutes Ring chimes; you'll still see motion logs after the meeting ends." },
      { n: "4", icon: "clock", title: "Auto-end", text: "DND lifts the moment the meeting wraps. No manual cleanup." }
    ].map((i) => /* @__PURE__ */ r.jsxs("div", { style: { padding: 14, background: t.surface2, borderRadius: 10, border: `.5px solid ${t.border}` }, children: [
      /* @__PURE__ */ r.jsx(window.Icon, { name: i.icon, size: 18, style: { color: t.accent } }),
      /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 14, color: t.fg, marginTop: 8, fontWeight: 500 }, children: i.title }),
      /* @__PURE__ */ r.jsx("div", { style: { marginTop: 4, lineHeight: 1.4 }, children: i.text })
    ] }, i.n)) })
  ] });
};
window.CalendarView = lm;
const cm = "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&bkba_opt=1&view=STUD_3QTR&size=1920&model=m3&options=$MT311,$PPSW,$IBB1,$WY18B", um = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, s = o.tesla, a = (y, x) => l((b) => ({ ...b, tesla: { ...b.tesla, [y]: x } })), d = ["/local/homecntrd-tesla.jpg", cm], [c, p] = React.useState(0), [u, h] = React.useState(!1), v = () => {
    c < d.length - 1 ? p(c + 1) : h(!0);
  };
  if (!s.id)
    return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx(
        window.PageHead,
        {
          ctx: e,
          eyebrow: "Tesla",
          title: "No Tesla connected",
          sub: "Add the Tessie integration in HA and your car will appear here."
        }
      ),
      /* @__PURE__ */ r.jsx(window.Card, { p: t, style: { padding: 24 }, children: /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 13, color: t.fg2, lineHeight: 1.6 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { marginBottom: 10, color: t.fg, fontFamily: n.display, fontSize: 16 }, children: "How to connect" }),
        /* @__PURE__ */ r.jsxs("ol", { style: { margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }, children: [
          /* @__PURE__ */ r.jsxs("li", { children: [
            "Sign in at ",
            /* @__PURE__ */ r.jsx("span", { style: { color: t.fg }, children: "tessie.com" }),
            " with your Tesla account."
          ] }),
          /* @__PURE__ */ r.jsx("li", { children: "In the Tesla mobile app: Locks → Add Key → scan Tessie's QR." }),
          /* @__PURE__ */ r.jsx("li", { children: "In Tessie: Settings → Home Assistant → copy the access token." }),
          /* @__PURE__ */ r.jsx("li", { children: "In HA: Settings → Devices & Services → Add Integration → Tessie → paste token." })
        ] })
      ] }) })
    ] });
  const w = [];
  s.location && s.location !== "—" && w.push(s.location), s.software && s.software !== "—" && w.push(`software ${s.software}`), s.odometer && w.push(`${s.odometer.toLocaleString()} ${s.odometerUnit}`);
  const f = w.join(" · "), k = s.tempUnit || "°F", m = s.rangeUnit || "mi", g = s.chargePct <= 20 ? "#c14d36" : s.chargePct <= 40 ? "#d8843e" : t.accent;
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "Tesla",
        title: s.name,
        sub: f || "—",
        right: /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ r.jsxs(
            window.PillBtn,
            {
              p: t,
              fonts: n,
              active: s.locked,
              onClick: () => a("locked", !s.locked),
              style: { display: "inline-flex", alignItems: "center", gap: 6 },
              children: [
                /* @__PURE__ */ r.jsx(window.Icon, { name: "lock", size: 12 }),
                " ",
                s.locked ? "Locked" : "Unlocked"
              ]
            }
          ),
          /* @__PURE__ */ r.jsxs(
            window.PillBtn,
            {
              p: t,
              fonts: n,
              active: s.sentry,
              onClick: () => a("sentry", !s.sentry),
              style: { display: "inline-flex", alignItems: "center", gap: 6 },
              children: [
                /* @__PURE__ */ r.jsx(window.Icon, { name: "shield", size: 12 }),
                " Sentry ",
                s.sentry ? "on" : "off"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: i.gap, alignItems: "start" }, children: [
      /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 0, overflow: "hidden" }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { position: "relative", height: 280, background: `linear-gradient(180deg, ${t.dark ? "#1a1a1f" : "#e6e3dd"} 0%, ${t.surface2} 100%)`, overflow: "hidden" }, children: [
          u ? /* @__PURE__ */ r.jsx(fm, { p: t, accent: t.accent, charging: s.charging, frunk: s.frunk, trunk: s.trunk }) : /* @__PURE__ */ r.jsx(
            "img",
            {
              src: d[c],
              alt: "Tesla",
              onError: v,
              style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -55%)",
                width: "88%",
                height: "auto",
                maxHeight: "78%",
                objectFit: "contain",
                filter: t.dark ? "drop-shadow(0 8px 24px rgba(0,0,0,.55))" : "drop-shadow(0 8px 18px rgba(0,0,0,.18))"
              }
            }
          ),
          !u && s.charging && /* @__PURE__ */ r.jsx("div", { style: {
            position: "absolute",
            top: "46%",
            right: "12%",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: t.accent,
            boxShadow: `0 0 18px 3px ${t.accent}`,
            animation: "pulse 2s ease-in-out infinite"
          } }),
          /* @__PURE__ */ r.jsxs("div", { style: { position: "absolute", bottom: 14, left: 18, right: 18 }, children: [
            /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 10, fontFamily: n.display, color: t.fg }, children: [
              /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 46, fontWeight: 500, lineHeight: 1, fontVariantNumeric: "tabular-nums" }, children: [
                s.chargePct,
                /* @__PURE__ */ r.jsx("span", { style: { fontSize: 22, color: t.fg2 }, children: "%" })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 13, color: t.fg2 }, children: [
                s.range,
                " ",
                m,
                " range"
              ] }),
              /* @__PURE__ */ r.jsx("div", { style: { flex: 1 } }),
              /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: s.charging ? t.accent : t.fg3, display: "flex", alignItems: "center", gap: 5 }, children: [
                s.charging && /* @__PURE__ */ r.jsx(window.Icon, { name: "bolt", size: 11 }),
                s.charging ? s.chargeRate ? `+${s.chargeRate} mph` : "charging" : s.pluggedIn ? "plugged in · idle" : "unplugged"
              ] })
            ] }),
            /* @__PURE__ */ r.jsx("div", { style: { height: 4, background: t.border, borderRadius: 2, marginTop: 8, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${s.chargePct}%`, height: "100%", background: g, transition: "width .3s" } }) })
          ] })
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { padding: 14, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, borderTop: `.5px solid ${t.border}` }, children: [
          { icon: "lock", label: s.locked ? "Unlock" : "Lock", onClick: () => a("locked", !s.locked) },
          { icon: "snowflake", label: s.climateOn ? "Climate off" : "Precondition", onClick: () => a("climateOn", !s.climateOn), active: s.climateOn },
          { icon: "package", label: s.frunk ? "Close frunk" : "Open frunk", onClick: () => a("frunk", !s.frunk), active: s.frunk },
          { icon: "package", label: s.trunk ? "Close trunk" : "Open trunk", onClick: () => a("trunk", !s.trunk), active: s.trunk }
        ].map((y) => /* @__PURE__ */ r.jsxs("button", { onClick: y.onClick, style: {
          padding: "12px 8px",
          borderRadius: 9,
          cursor: "pointer",
          fontFamily: n.body,
          fontSize: 11,
          border: `.5px solid ${y.active ? t.accent : t.border2}`,
          background: y.active ? t.accentSoft : t.surface,
          color: y.active ? t.accent : t.fg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6
        }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: y.icon, size: 16 }),
          /* @__PURE__ */ r.jsx("span", { children: y.label })
        ] }, y.label)) })
      ] }),
      /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 18 }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.fg3 }, children: "Cabin climate" }),
          /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: s.climateOn, onChange: (y) => a("climateOn", y) })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 14 }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: n.display, fontSize: 54, lineHeight: 1, color: t.fg }, children: [
            s.target,
            /* @__PURE__ */ r.jsx("span", { style: { fontSize: 24, color: t.fg2, marginLeft: 2 }, children: "°" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: t.fg2 }, children: [
            /* @__PURE__ */ r.jsxs("div", { children: [
              "cabin ",
              s.cabin,
              k
            ] }),
            /* @__PURE__ */ r.jsx("div", { style: { color: t.fg3 }, children: "target" })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 14 }, children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: () => a("target", Math.max(s.targetMin || 60, s.target - 1)),
              style: td(t),
              children: "−"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: () => a("target", Math.min(s.targetMax || 82, s.target + 1)),
              style: td(t),
              children: "+"
            }
          )
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }, children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: () => a("climateOn", !s.climateOn),
              style: nd(t, s.climateOn),
              children: s.climateOn ? "Climate on" : "Auto"
            }
          ),
          /* @__PURE__ */ r.jsxs(
            "button",
            {
              onClick: () => a("defrost", !s.defrost),
              style: nd(t, s.defrost),
              children: [
                "Defrost",
                s.defrost ? " on" : ""
              ]
            }
          )
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { borderTop: `.5px solid ${t.border}`, paddingTop: 12, marginTop: 14, fontSize: 11, color: t.fg3 }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 0" }, children: [
            /* @__PURE__ */ r.jsx("span", { children: "Outside" }),
            /* @__PURE__ */ r.jsx("span", { style: { color: t.fg2 }, children: s.outside ? `${s.outside}${k}` : "—" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 0" }, children: [
            /* @__PURE__ */ r.jsx("span", { children: "Charge port" }),
            /* @__PURE__ */ r.jsx("span", { style: { color: t.fg2 }, children: s.chargePortOpen ? "Open" : "Closed" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 0" }, children: [
            /* @__PURE__ */ r.jsx("span", { children: "Sentry" }),
            /* @__PURE__ */ r.jsx("span", { style: { color: t.fg2 }, children: s.sentry ? "On" : "Off" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: i.gap }, children: [
      /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 18 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.fg3, marginBottom: 12 }, children: "Charging" }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ r.jsx(He, { p: t, label: "State", value: s.charging ? "Charging" : s.pluggedIn ? "Plugged in · idle" : "Unplugged" }),
          /* @__PURE__ */ r.jsx(He, { p: t, label: "Charge limit", value: `${s.chargeLimit}%` }),
          s.charging && s.timeToFull > 0 && /* @__PURE__ */ r.jsx(He, { p: t, label: "Time to full", value: pm(s.timeToFull) }),
          s.chargingAmps !== null && /* @__PURE__ */ r.jsx(He, { p: t, label: "Amps", value: `${Math.round(s.chargingAmps)} A` }),
          s.voltage !== null && /* @__PURE__ */ r.jsx(He, { p: t, label: "Voltage", value: `${Math.round(s.voltage)} V` }),
          s.energyAdded !== null && /* @__PURE__ */ r.jsx(He, { p: t, label: "Energy added", value: `${s.energyAdded.toFixed(1)} kWh` })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 18 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.fg3, marginBottom: 12 }, children: "Vehicle" }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ r.jsx(He, { p: t, label: "Name", value: s.name }),
          /* @__PURE__ */ r.jsx(He, { p: t, label: "Software", value: s.software }),
          /* @__PURE__ */ r.jsx(He, { p: t, label: "Odometer", value: `${s.odometer.toLocaleString()} ${s.odometerUnit}` }),
          /* @__PURE__ */ r.jsx(He, { p: t, label: "Location", value: s.location }),
          /* @__PURE__ */ r.jsx(He, { p: t, label: "Inside / outside", value: `${s.cabin}${k} / ${s.outside}${k}` }),
          /* @__PURE__ */ r.jsx(He, { p: t, label: "Frunk / trunk", value: `${s.frunk ? "Open" : "Closed"} / ${s.trunk ? "Open" : "Closed"}` })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } }),
    /* @__PURE__ */ r.jsx("style", { children: `
        @keyframes pulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.18); }
        }
      ` })
  ] });
}, td = (e) => ({
  flex: 1,
  padding: "9px 0",
  border: `.5px solid ${e.border2}`,
  background: "transparent",
  color: e.fg,
  borderRadius: 8,
  fontSize: 14,
  cursor: "pointer"
}), nd = (e, t) => ({
  padding: "9px 0",
  borderRadius: 8,
  fontSize: 11,
  cursor: "pointer",
  fontFamily: "inherit",
  border: `.5px solid ${t ? e.accent : e.border2}`,
  background: t ? e.accentSoft : e.surface,
  color: t ? e.accent : e.fg
});
function pm(e) {
  if (!e) return "—";
  const t = Math.floor(e), n = Math.round((e - t) * 60);
  return t === 0 ? `${n}m` : n === 0 ? `${t}h` : `${t}h ${n}m`;
}
const He = ({ p: e, label: t, value: n }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", fontSize: 12, gap: 8 }, children: [
  /* @__PURE__ */ r.jsx("span", { style: { color: e.fg2, flex: "none" }, children: t }),
  /* @__PURE__ */ r.jsx("span", { style: { color: e.fg, fontVariantNumeric: "tabular-nums", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: n })
] }), fm = ({ p: e, accent: t, charging: n, frunk: i, trunk: o }) => /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 400 160", style: { position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", width: "82%", height: "auto", filter: e.dark ? "drop-shadow(0 8px 24px rgba(0,0,0,.5))" : "drop-shadow(0 8px 18px rgba(0,0,0,.18))" }, children: [
  /* @__PURE__ */ r.jsx(
    "path",
    {
      d: "M 30 110 Q 60 70, 130 60 Q 180 35, 240 38 Q 290 40, 330 60 Q 360 78, 380 105 L 380 120 Q 370 130, 350 130 L 50 130 Q 30 130, 30 120 Z",
      fill: "#ebe7e0",
      stroke: "rgba(0,0,0,0.18)",
      strokeWidth: ".8"
    }
  ),
  /* @__PURE__ */ r.jsx("path", { d: "M 130 60 Q 180 35, 240 38 Q 280 40, 310 56 L 290 80 L 150 80 Z", fill: "#1a1d22", opacity: ".7" }),
  /* @__PURE__ */ r.jsx("path", { d: "M 60 90 Q 130 78, 200 78 Q 280 78, 360 95", fill: "none", stroke: "rgba(255,255,255,.5)", strokeWidth: "1" }),
  /* @__PURE__ */ r.jsx("circle", { cx: "110", cy: "130", r: "22", fill: "#0e0e10" }),
  /* @__PURE__ */ r.jsx("circle", { cx: "110", cy: "130", r: "14", fill: "#2a2a2e" }),
  /* @__PURE__ */ r.jsx("circle", { cx: "110", cy: "130", r: "5", fill: "#0e0e10" }),
  /* @__PURE__ */ r.jsx("circle", { cx: "310", cy: "130", r: "22", fill: "#0e0e10" }),
  /* @__PURE__ */ r.jsx("circle", { cx: "310", cy: "130", r: "14", fill: "#2a2a2e" }),
  /* @__PURE__ */ r.jsx("circle", { cx: "310", cy: "130", r: "5", fill: "#0e0e10" }),
  n && /* @__PURE__ */ r.jsx("circle", { cx: "365", cy: "100", r: "5", fill: t, children: /* @__PURE__ */ r.jsx("animate", { attributeName: "opacity", values: "0.4;1;0.4", dur: "2s", repeatCount: "indefinite" }) }),
  i && /* @__PURE__ */ r.jsx("path", { d: "M 140 50 Q 180 25, 220 28", fill: "none", stroke: t, strokeWidth: "2", strokeDasharray: "3,3" }),
  o && /* @__PURE__ */ r.jsx("path", { d: "M 290 50 Q 320 25, 340 30", fill: "none", stroke: t, strokeWidth: "2", strokeDasharray: "3,3" })
] });
window.CarView = um;
const hm = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, s = (a) => l((d) => ({
    ...d,
    garage: { ...d.garage, doors: d.garage.doors.map((c) => c.id === a ? { ...c, open: !c.open, lastChanged: "now" } : c) }
  }));
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "MyQ · Willowbrook",
        title: "Garage",
        sub: `${o.garage.doors.filter((a) => a.open).length} open · ${o.garage.doors.length} doors`
      }
    ),
    /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: i.gap }, children: o.garage.doors.map((a) => /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { position: "relative", height: 240, background: t.dark ? "#1c1814" : "#efe7d8", display: "grid", placeItems: "center", overflow: "hidden" }, children: [
        /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 240 200", style: { width: "80%" }, children: [
          /* @__PURE__ */ r.jsx("rect", { x: "20", y: "60", width: "200", height: "120", fill: t.dark ? "#28221b" : "#dfd2bd", stroke: t.border2 }),
          /* @__PURE__ */ r.jsx("path", { d: "M 10 60 L 120 15 L 230 60 Z", fill: t.dark ? "#1f1a14" : "#cdbfa6", stroke: t.border2 }),
          /* @__PURE__ */ r.jsx("rect", { x: "50", y: "80", width: "140", height: "100", fill: t.dark ? "#15110c" : "#fffaf0", stroke: t.border2, strokeWidth: ".8" }),
          Array.from({ length: 7 }).map((d, c) => /* @__PURE__ */ r.jsx(
            "rect",
            {
              x: "54",
              y: 86 + c * 13,
              width: "132",
              height: "11",
              rx: "2",
              fill: t.dark ? "#3a3024" : "#e8d9bd",
              stroke: t.border,
              strokeWidth: ".5",
              style: {
                transform: a.open ? `translateY(-${(c + 1) * 8}px)` : "translateY(0)",
                opacity: a.open ? Math.max(0, 1 - c * 0.18) : 1,
                transition: "all .6s cubic-bezier(.5,0,.2,1)",
                transformOrigin: "center"
              }
            },
            c
          )),
          a.open && /* @__PURE__ */ r.jsx("rect", { x: "54", y: "86", width: "132", height: "14", fill: "#0a0805", opacity: "0.6" })
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: {
          position: "absolute",
          top: 14,
          left: 14,
          padding: "4px 9px",
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: ".05em",
          background: a.open ? t.accent : "oklch(60% 0.14 145)",
          color: "#fff"
        }, children: a.open ? "OPEN" : "CLOSED" }),
        /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", top: 14, right: 14, fontSize: 11, color: t.fg3, fontVariantNumeric: "tabular-nums" }, children: a.lastChanged })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { style: { padding: 18 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 22, color: t.fg, fontWeight: 500 }, children: a.name }),
        /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: t.fg3, marginTop: 4 }, children: [
          "Last ",
          a.open ? "opened" : "closed",
          " ",
          a.lastChanged
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 14 }, children: [
          /* @__PURE__ */ r.jsx("button", { onClick: () => s(a.id), style: {
            flex: 1,
            padding: "10px 0",
            borderRadius: 9,
            border: 0,
            cursor: "pointer",
            fontSize: 13,
            fontFamily: n.body,
            fontWeight: 500,
            background: a.open ? t.surface : t.accent,
            color: a.open ? t.fg : "#fff",
            border: a.open ? `.5px solid ${t.border2}` : "none"
          }, children: a.open ? "Close door" : "Open door" }),
          /* @__PURE__ */ r.jsx("button", { style: { padding: "10px 14px", borderRadius: 9, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 12, fontFamily: n.body, cursor: "pointer" }, children: "Auto-close" })
        ] })
      ] })
    ] }, a.id)) }),
    /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 18 }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.fg3, marginBottom: 12 }, children: "Activity · last 24 hours" }),
      o.garage.history.map((a, d) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderTop: d ? `.5px solid ${t.border}` : "none", fontSize: 13 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 60, color: t.fg3, fontVariantNumeric: "tabular-nums" }, children: a.t }),
        /* @__PURE__ */ r.jsx("div", { style: { width: 6, height: 6, borderRadius: "50%", background: a.action === "opened" ? t.accent : "oklch(60% 0.14 145)" } }),
        /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, color: t.fg }, children: [
          /* @__PURE__ */ r.jsx("b", { style: { fontWeight: 500 }, children: a.door }),
          " ",
          /* @__PURE__ */ r.jsx("span", { style: { color: t.fg2 }, children: a.action })
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, fontStyle: "italic", fontFamily: n.display }, children: a.who })
      ] }, d))
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
};
window.GarageView = hm;
const gm = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, [s, a] = React.useState(null), [d, c] = React.useState(null), p = o.integrations.filter((v) => v.status === "connected"), u = o.integrations.filter((v) => v.status === "available"), h = (v, w) => l((f) => ({
    ...f,
    integrations: f.integrations.map((k) => k.id === v ? { ...k, status: w } : k)
  }));
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: `${p.length} integrations connected`,
        title: "Devices",
        sub: "Hue, Sonos, Ring, Nest, Apple TV, Apple Music, Tesla, MyQ, Outlook · all online",
        right: /* @__PURE__ */ r.jsxs("button", { onClick: () => a("PICK"), style: {
          padding: "9px 16px",
          borderRadius: 9,
          border: 0,
          background: t.accent,
          color: "#fff",
          fontSize: 13,
          cursor: "pointer",
          fontFamily: n.body,
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: 6
        }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: "plus", size: 13 }),
          " Add device"
        ] })
      }
    ),
    /* @__PURE__ */ r.jsx(window.Section, { title: "Connected", subtitle: `${p.length} services · 32 devices`, p: t, fonts: n, children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: i.tileGap }, children: p.map((v) => /* @__PURE__ */ r.jsx(
      mm,
      {
        ctx: e,
        integration: v,
        expanded: d === v.id,
        onClick: () => c(d === v.id ? null : v.id),
        onDisconnect: () => h(v.id, "available")
      },
      v.id
    )) }) }),
    /* @__PURE__ */ r.jsx(window.Section, { title: "Available", subtitle: "Compatible with HomeCNTRD", p: t, fonts: n, children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: i.tileGap }, children: u.map((v) => /* @__PURE__ */ r.jsxs("button", { onClick: () => a(v.id), style: {
      padding: 18,
      borderRadius: 12,
      border: `1px dashed ${t.border2}`,
      background: t.surface2,
      color: t.fg,
      cursor: "pointer",
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontFamily: n.body
    }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { width: 38, height: 38, borderRadius: 9, background: v.color + "22", color: v.color, display: "grid", placeItems: "center" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: v.icon, size: 20 }) }),
      /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 15, fontWeight: 500, marginTop: 4 }, children: v.name }),
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3 }, children: "+ Set up" })
    ] }, v.id)) }) }),
    s && /* @__PURE__ */ r.jsx(
      xm,
      {
        ctx: e,
        integrationId: s,
        onClose: () => a(null),
        onConnect: (v) => {
          h(v, "connected"), a(null);
        }
      }
    ),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
}, mm = ({ ctx: e, integration: t, expanded: n, onClick: i, onDisconnect: o }) => {
  const { p: l, fonts: s, state: a } = e, d = t, c = ym(d.id, a);
  return /* @__PURE__ */ r.jsxs("div", { style: { borderRadius: 12, border: `.5px solid ${l.border}`, background: l.surface2, overflow: "hidden" }, children: [
    /* @__PURE__ */ r.jsxs("button", { onClick: i, style: {
      width: "100%",
      padding: 14,
      border: 0,
      background: "transparent",
      cursor: "pointer",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      gap: 12,
      color: l.fg,
      fontFamily: s.body
    }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { width: 40, height: 40, borderRadius: 9, background: d.color + "22", color: d.color, display: "grid", placeItems: "center", flex: "none" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: d.icon, size: 20 }) }),
      /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontFamily: s.display, fontSize: 15, color: l.fg, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }, children: d.name }),
          /* @__PURE__ */ r.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "oklch(60% 0.14 145)", flex: "none" } })
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: l.fg3, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: d.account })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { style: { textAlign: "right", flex: "none" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: l.fg2, fontVariantNumeric: "tabular-nums" }, children: typeof d.devices == "number" ? `${d.devices} devices` : d.devices }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: l.fg3, marginTop: 2 }, children: n ? "Hide" : "Manage" })
      ] })
    ] }),
    n && /* @__PURE__ */ r.jsxs("div", { style: { borderTop: `.5px solid ${l.border}`, padding: "10px 14px", background: l.surface }, children: [
      d.id === "hue" || d.id === "sonos" || d.id === "ring" ? /* @__PURE__ */ r.jsx(bm, { ctx: e, integrationId: d.id }) : c.length > 0 && /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }, children: c.map((p, u) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "5px 0", fontSize: 12, color: l.fg2, borderBottom: u < c.length - 1 ? `.5px solid ${l.border}` : "none" }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: p.icon, size: 11, style: { color: l.fg3 } }),
        /* @__PURE__ */ r.jsx("span", { style: { flex: 1 }, children: p.name }),
        /* @__PURE__ */ r.jsxs("span", { style: { fontSize: 10, color: p.online ? "oklch(60% 0.14 145)" : l.fg3 }, children: [
          "● ",
          p.online ? "online" : "offline"
        ] })
      ] }, u)) }),
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
        /* @__PURE__ */ r.jsx("button", { style: { flex: 1, padding: "6px 10px", borderRadius: 6, border: `.5px solid ${l.border2}`, background: "transparent", color: l.fg2, fontSize: 11, cursor: "pointer", fontFamily: s.body }, children: "Refresh" }),
        /* @__PURE__ */ r.jsx("button", { style: { flex: 1, padding: "6px 10px", borderRadius: 6, border: `.5px solid ${l.border2}`, background: "transparent", color: l.fg2, fontSize: 11, cursor: "pointer", fontFamily: s.body }, children: "Settings" }),
        /* @__PURE__ */ r.jsx("button", { onClick: (p) => {
          p.stopPropagation(), o();
        }, style: {
          flex: 1,
          padding: "6px 10px",
          borderRadius: 6,
          border: `.5px solid ${l.border2}`,
          background: "transparent",
          color: l.danger,
          fontSize: 11,
          cursor: "pointer",
          fontFamily: s.body
        }, children: "Disconnect" })
      ] })
    ] })
  ] });
};
function ym(e, t) {
  switch (e) {
    case "hue":
      return t.lights.map((n) => ({ name: `${n.name}`, icon: "bulb", online: !0 }));
    case "sonos":
      return t.speakers.filter((n) => n.type === "sonos").map((n) => ({ name: n.name, icon: "sonos", online: !0 }));
    case "ring":
      return t.cameras.map((n) => ({ name: n.name, icon: "cam", online: n.online }));
    case "nest":
      return [{ name: "Hallway thermostat", icon: "therm", online: !0 }];
    case "appletv":
      return t.tvs.filter((n) => n.brand === "appletv").map((n) => ({ name: `${window.ROOMS.find((i) => i.id === n.room)?.name} · ${n.model}`, icon: "tv", online: !0 }));
    case "googletv":
      return t.tvs.filter((n) => n.brand === "googletv").map((n) => ({ name: `${window.ROOMS.find((i) => i.id === n.room)?.name} · ${n.model}`, icon: "tv", online: !0 }));
    case "lgthinq":
      return t.tvs.filter((n) => n.brand === "lgthinq").map((n) => ({ name: `${window.ROOMS.find((i) => i.id === n.room)?.name} · ${n.model}`, icon: "tv", online: !0 }));
    case "music":
      return [{ name: "Apple Music · 2,847 songs", icon: "music", online: !0 }, { name: "Up Next queue · 12 tracks", icon: "queue", online: !0 }];
    case "tesla":
      return [{ name: t.tesla.name, icon: "car", online: !0 }];
    case "myq":
      return t.garage.doors.map((n) => ({ name: n.name, icon: "garage", online: !0 }));
    case "outlook":
      return [{ name: `Today · ${t.calendar.length} events`, icon: "cal", online: !0 }];
    default:
      return [];
  }
}
const xm = ({ ctx: e, integrationId: t, onClose: n, onConnect: i }) => {
  const { p: o, fonts: l, state: s } = e, [a, d] = React.useState(t === "PICK" ? "pick" : "auth"), [c, p] = React.useState(t === "PICK" ? null : t), [u, h] = React.useState(0), v = s.integrations;
  React.useEffect(() => {
    if (a === "discover") {
      h(0);
      const f = setInterval(() => h((k) => k >= 100 ? (clearInterval(f), d("done"), 100) : k + 8), 80);
      return () => clearInterval(f);
    }
  }, [a]);
  const w = v.find((f) => f.id === c);
  return /* @__PURE__ */ r.jsx("div", { style: {
    position: "absolute",
    inset: 0,
    zIndex: 60,
    background: "rgba(0,0,0,.55)",
    backdropFilter: "blur(4px)",
    display: "grid",
    placeItems: "center",
    padding: 24
  }, onClick: n, children: /* @__PURE__ */ r.jsxs("div", { onClick: (f) => f.stopPropagation(), style: {
    width: "min(560px, 100%)",
    maxHeight: "min(640px, 100%)",
    background: o.surface2,
    border: `.5px solid ${o.border2}`,
    borderRadius: 18,
    boxShadow: "0 32px 80px rgba(0,0,0,.4)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { padding: "16px 20px", borderBottom: `.5px solid ${o.border}`, display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { flex: 1, fontFamily: l.display, fontSize: 17, color: o.fg, fontWeight: 500 }, children: a === "pick" ? "Add a device" : w ? `Connect ${w.name}` : "Add a device" }),
      /* @__PURE__ */ r.jsx("button", { onClick: n, style: { border: 0, background: "transparent", color: o.fg3, cursor: "pointer", padding: 6, fontSize: 18 }, children: "×" })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, overflow: "auto", padding: 20 }, children: [
      a === "pick" && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: o.fg2, marginBottom: 14 }, children: "Choose what to connect. HomeCNTRD will guide you through sign-in and discovery." }),
        /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }, children: v.map((f) => /* @__PURE__ */ r.jsxs("button", { onClick: () => {
          p(f.id), d("auth");
        }, disabled: f.status === "connected", style: {
          padding: 14,
          borderRadius: 10,
          border: `.5px solid ${o.border2}`,
          background: f.status === "connected" ? o.surface : o.surface2,
          color: o.fg,
          cursor: f.status === "connected" ? "default" : "pointer",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: 11,
          fontFamily: l.body,
          opacity: f.status === "connected" ? 0.55 : 1
        }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { width: 32, height: 32, borderRadius: 7, background: f.color + "22", color: f.color, display: "grid", placeItems: "center", flex: "none" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: f.icon, size: 16 }) }),
          /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, fontWeight: 500 }, children: f.name }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: o.fg3, marginTop: 1 }, children: f.status === "connected" ? "✓ Connected" : "Not connected" })
          ] })
        ] }, f.id)) })
      ] }),
      a === "auth" && w && /* @__PURE__ */ r.jsxs("div", { children: [
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: 14, borderRadius: 11, background: o.surface, border: `.5px solid ${o.border}` }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { width: 44, height: 44, borderRadius: 10, background: w.color + "22", color: w.color, display: "grid", placeItems: "center", flex: "none" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: w.icon, size: 22 }) }),
          /* @__PURE__ */ r.jsxs("div", { children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontFamily: l.display, fontSize: 16, color: o.fg, fontWeight: 500 }, children: w.name }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: o.fg3, marginTop: 2 }, children: vm(w.id) })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { marginTop: 16, padding: "14px 16px", background: o.surface, border: `.5px solid ${o.border}`, borderRadius: 10 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: o.fg3, marginBottom: 10 }, children: "Permissions" }),
          wm(w.id).map((f, k) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 0", fontSize: 12 }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: "check", size: 13, style: { color: o.accent, marginTop: 2, flex: "none" } }),
            /* @__PURE__ */ r.jsx("div", { style: { color: o.fg2 }, children: f })
          ] }, k))
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { marginTop: 14, fontSize: 11, color: o.fg3, lineHeight: 1.5 }, children: [
          "You'll be redirected to ",
          w.name,
          "'s sign-in page. HomeCNTRD never sees your password — only the access token ",
          w.name,
          " returns."
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 10, marginTop: 18 }, children: [
          /* @__PURE__ */ r.jsx("button", { onClick: () => t === "PICK" ? d("pick") : n(), style: {
            flex: 1,
            padding: "11px 0",
            borderRadius: 9,
            border: `.5px solid ${o.border2}`,
            background: "transparent",
            color: o.fg,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: l.body
          }, children: t === "PICK" ? "Back" : "Cancel" }),
          /* @__PURE__ */ r.jsxs("button", { onClick: () => d("discover"), style: {
            flex: 1.5,
            padding: "11px 0",
            borderRadius: 9,
            border: 0,
            background: w.color,
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: l.body
          }, children: [
            "Sign in to ",
            w.name
          ] })
        ] })
      ] }),
      a === "discover" && w && /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 64, height: 64, borderRadius: 14, background: w.color + "22", color: w.color, display: "grid", placeItems: "center", marginBottom: 18 }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: w.icon, size: 32 }) }),
        /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: l.display, fontSize: 18, color: o.fg, fontWeight: 500 }, children: [
          "Discovering ",
          w.name,
          " devices…"
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: o.fg3, marginTop: 6 }, children: "Scanning your network and account" }),
        /* @__PURE__ */ r.jsx("div", { style: { width: "100%", maxWidth: 300, height: 4, background: o.border, borderRadius: 2, marginTop: 20, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${u}%`, height: "100%", background: w.color, transition: "width .1s" } }) }),
        /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: o.fg3, marginTop: 12, fontVariantNumeric: "tabular-nums" }, children: [
          u,
          "%"
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: o.fg2, marginTop: 18, fontStyle: "italic", fontFamily: l.display, textAlign: "center", maxWidth: 280 }, children: u < 30 ? "Connecting securely…" : u < 60 ? "Loading your account…" : u < 90 ? `Found ${Math.floor(u / 15)} devices…` : "Almost done…" })
      ] }),
      a === "done" && w && /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 20px", textAlign: "center" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 56, height: 56, borderRadius: "50%", background: "oklch(60% 0.14 145 / .15)", color: "oklch(60% 0.14 145)", display: "grid", placeItems: "center", marginBottom: 14 }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "check", size: 28, stroke: 2.2 }) }),
        /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: l.display, fontSize: 20, color: o.fg, fontWeight: 500 }, children: [
          w.name,
          " connected"
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: o.fg2, marginTop: 8, maxWidth: 340 }, children: km(w.id) }),
        /* @__PURE__ */ r.jsx("button", { onClick: () => i(c), style: {
          marginTop: 22,
          padding: "11px 24px",
          borderRadius: 9,
          border: 0,
          background: o.accent,
          color: "#fff",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          fontFamily: l.body
        }, children: "Done" })
      ] })
    ] })
  ] }) });
};
function vm(e) {
  return {
    hue: "Sign in with your Hue Bridge account · Bridge auto-discovered on local network",
    sonos: "Sign in with your Sonos household ID · OAuth via sonos.com",
    ring: "Sign in with your Ring account · two-factor required",
    nest: "Sign in with Google · Smart Device Management API",
    appletv: "Pair with HomeKit · open Home app on your iPhone to confirm",
    googletv: "Sign in with Google · pair with on-screen code",
    lgthinq: "Sign in with LG ThinQ · accept the prompt on your TV",
    music: "Sign in with your Apple ID · MusicKit access",
    tesla: "Sign in with your Tesla account · vehicle command consent",
    myq: "Sign in with your MyQ account · door open/close consent",
    outlook: "Sign in with Microsoft · calendar read & focus permission",
    lutron: "Sign in with your Lutron account · Caséta bridge required",
    ecobee: "Sign in with your Ecobee account",
    august: "Sign in with your August Home account"
  }[e] || "Sign in to continue";
}
function wm(e) {
  return {
    hue: ["Read & control all bulbs and groups", "Read scenes", "Modify schedules"],
    sonos: ["Play, pause & skip on any speaker", "Group & ungroup speakers", "Change volume", "Read playback state"],
    ring: ["View live feeds", "Receive motion notifications", "Save clips for 30 days"],
    nest: ["Read temperature & humidity", "Set target temperature & mode", "Read schedule"],
    appletv: ["Play, pause, change input", "Open apps", "AirPlay routing", "Use Siri remote"],
    googletv: ["Play, pause, cast content", "Read what's playing", "Open apps", "D-pad remote"],
    lgthinq: ["Power on/off", "Volume & input", "D-pad remote", "Launch apps"],
    music: ["Read your full library & playlists", "Play tracks on any speaker", "Modify playlists you own", "Read recently played"],
    tesla: ["Read vehicle state (charge, location, climate)", "Lock & unlock", "Open frunk and trunk", "Start preconditioning", "Set charge schedule"],
    myq: ["Open & close garage doors", "Read door state & history", "Set auto-close timers"],
    outlook: ["Read your calendar events", "Set focus / Do Not Disturb", "Read meeting attendees"],
    lutron: ["Read & control lights", "Read scenes"],
    ecobee: ["Read & control thermostat", "Read schedule"],
    august: ["Lock & unlock", "Read door state"]
  }[e] || ["Connect & manage"];
}
function km(e) {
  return {
    hue: "Found 9 bulbs across 4 rooms. Imported 4 scenes.",
    sonos: "Found 5 speakers in the Willowbrook household. Living Room and Kitchen are already grouped.",
    ring: "Found 6 cameras: Front Door, Back Yard, Driveway, Garage, Living Room, Nursery.",
    nest: "Found 1 thermostat (Hallway). Imported your weekly schedule.",
    appletv: "Found 2 Apple TVs. AirPlay routing enabled.",
    googletv: "Found 1 Google TV in the office. Now Playing is available.",
    lgthinq: "Found 1 LG OLED in the kitchen. Remote ready.",
    music: "Connected Apple Music — 2,847 songs in your library and 24 playlists are available.",
    tesla: "Found Frances's Model 3. Currently parked at home, 72% charged.",
    myq: "Found 2 doors: Main and Side garage.",
    outlook: "Synced today and the next 30 days. Found 6 events today.",
    lutron: "Found Caséta bridge and 3 dimmers.",
    ecobee: "Found 1 thermostat.",
    august: "Found 1 lock."
  }[e] || "Connected.";
}
const bm = ({ ctx: e, integrationId: t }) => {
  const { p: n, fonts: i, state: o, setState: l } = e, s = t === "hue" ? o.lights : t === "sonos" ? o.speakers.filter((p) => p.type === "sonos") : o.cameras, a = t === "hue" ? "bulb" : t === "sonos" ? "sonos" : "cam", d = t === "hue" ? "lights" : t === "sonos" ? "speakers" : "cameras", c = (p, u) => l((h) => ({ ...h, [d]: h[d].map((v) => v.id === p ? { ...v, room: u } : v) }));
  return /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }, children: [
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: n.fg3, marginBottom: 2 }, children: "Assign rooms" }),
    s.map((p) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 7, background: n.surface2, border: `.5px solid ${n.border}` }, children: [
      /* @__PURE__ */ r.jsx(window.Icon, { name: a, size: 12, style: { color: n.fg3, flex: "none" } }),
      /* @__PURE__ */ r.jsx("span", { style: { flex: 1, fontSize: 12, color: n.fg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: p.name }),
      /* @__PURE__ */ r.jsx("select", { value: p.room, onChange: (u) => c(p.id, u.target.value), style: {
        padding: "4px 8px",
        borderRadius: 6,
        border: `.5px solid ${n.border2}`,
        background: n.surface,
        color: n.fg,
        fontSize: 11,
        fontFamily: i.body,
        cursor: "pointer",
        flex: "none"
      }, children: window.ROOMS.map((u) => /* @__PURE__ */ r.jsx("option", { value: u.id, children: u.name }, u.id)) })
    ] }, p.id))
  ] });
};
window.DevicesView = gm;
const jm = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, [s, a] = React.useState(!1), [d, c] = React.useState(""), [p, u] = React.useState(null), [h, v] = React.useState(""), w = (x) => {
    if (c(x), v(""), !x.trim()) {
      u(null);
      return;
    }
    const b = window.parseAutomation(x, o);
    b ? u(b) : (u(null), v('Try: "When there is motion at the front door, turn on the porch light"'));
  }, f = () => {
    p && (l((x) => ({ ...x, automations: [...x.automations, p] })), c(""), u(null), a(!1));
  }, k = (x) => l((b) => ({ ...b, automations: b.automations.map((j) => j.id === x ? { ...j, enabled: !j.enabled } : j) })), m = (x) => l((b) => ({ ...b, automations: b.automations.filter((j) => j.id !== x) })), g = (x) => window.runAutomation(x, o, l), y = [
    "When there is motion at the front door, turn on the porch light",
    "When I leave home, lock everything",
    "Every day at 11:00 PM, run goodnight",
    "When motion at the back yard, turn lights on"
  ];
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: `${o.automations.length} routines`,
        title: "Automations",
        sub: `${o.automations.filter((x) => x.enabled).length} active · let the house run itself`,
        right: /* @__PURE__ */ r.jsxs("button", { onClick: () => a((x) => !x), style: {
          padding: "9px 16px",
          borderRadius: 9,
          border: `.5px solid ${t.accent}`,
          background: t.accent,
          color: "#fff",
          fontSize: 12,
          cursor: "pointer",
          fontFamily: n.body,
          display: "inline-flex",
          alignItems: "center",
          gap: 6
        }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: s ? "x" : "plus", size: 12 }),
          s ? "Cancel" : "New automation"
        ] })
      }
    ),
    s && /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 20 }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }, children: "Describe it in plain English" }),
      /* @__PURE__ */ r.jsx(
        "input",
        {
          value: d,
          onChange: (x) => w(x.target.value),
          placeholder: "When there is motion at the front door, turn on the porch light",
          autoFocus: !0,
          style: {
            width: "100%",
            padding: "12px 14px",
            borderRadius: 10,
            border: `.5px solid ${p ? t.accent : t.border2}`,
            background: t.surface,
            color: t.fg,
            fontSize: 14,
            fontFamily: n.body,
            outline: "none",
            boxSizing: "border-box"
          }
        }
      ),
      !d && /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }, children: y.map((x) => /* @__PURE__ */ r.jsx("button", { onClick: () => w(x), style: {
        padding: "5px 10px",
        borderRadius: 999,
        border: `.5px solid ${t.border2}`,
        background: "transparent",
        color: t.fg2,
        fontSize: 11,
        cursor: "pointer",
        fontFamily: n.body
      }, children: x }, x)) }),
      p && /* @__PURE__ */ r.jsxs("div", { style: { marginTop: 14, padding: 14, borderRadius: 10, background: t.warm, border: `.5px solid ${t.border}` }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }, children: "I understood" }),
        /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 16, color: t.fg, fontWeight: 500, marginBottom: 4 }, children: p.name }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: t.fg2, fontStyle: "italic" }, children: p.desc }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 12 }, children: [
          /* @__PURE__ */ r.jsx("button", { onClick: f, style: { padding: "8px 14px", borderRadius: 8, border: 0, background: t.accent, color: "#fff", fontSize: 12, cursor: "pointer" }, children: "Save automation" }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => {
            c(""), u(null);
          }, style: { padding: "8px 14px", borderRadius: 8, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 12, cursor: "pointer" }, children: "Try again" })
        ] })
      ] }),
      h && !p && /* @__PURE__ */ r.jsx("div", { style: { marginTop: 10, fontSize: 12, color: t.fg3, fontStyle: "italic" }, children: h }),
      /* @__PURE__ */ r.jsxs("div", { style: { marginTop: 14, padding: "10px 12px", borderRadius: 8, background: t.surface, border: `.5px dashed ${t.border2}`, fontSize: 11, color: t.fg3 }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: "sparkle", size: 11, style: { display: "inline", verticalAlign: "middle", marginRight: 5 } }),
        "Tip: you can also just tell the agent. Say ",
        /* @__PURE__ */ r.jsx("em", { style: { color: t.accent }, children: `"when there's motion on the front door cam, turn the porch light on"` }),
        " and it'll set it up."
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: i.tileGap }, children: o.automations.map((x) => /* @__PURE__ */ r.jsx(Sm, { a: x, ctx: e, onToggle: () => k(x.id), onRemove: () => m(x.id), onRun: () => g(x) }, x.id)) }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 80 } })
  ] });
}, Sm = ({ a: e, ctx: t, onToggle: n, onRemove: i, onRun: o }) => {
  const { p: l, fonts: s, state: a } = t, d = e.trigger.type === "motion" ? "cam" : e.trigger.type === "time" ? "clock" : e.trigger.type === "leaveHome" ? "door" : "home", c = e.trigger.type === "motion" ? `Motion · ${a.cameras.find((p) => p.id === e.trigger.cameraId)?.name || "camera"}` : e.trigger.type === "time" ? `At ${e.trigger.at}` : e.trigger.type === "leaveHome" ? "When I leave" : e.trigger.type === "arriveHome" ? "When I arrive" : "Trigger";
  return /* @__PURE__ */ r.jsxs(window.Card, { p: l, style: { padding: 16, opacity: e.enabled ? 1 : 0.55 }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: 10 }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: l.accent, letterSpacing: ".05em" }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: d, size: 11 }),
          c
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { fontFamily: s.display, fontSize: 16, color: l.fg, fontWeight: 500, marginTop: 6 }, children: e.name }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: l.fg2, fontStyle: "italic", marginTop: 4, lineHeight: 1.4 }, children: e.desc })
      ] }),
      /* @__PURE__ */ r.jsx(window.Toggle, { p: l, on: e.enabled, onChange: n, size: 18 })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12, paddingTop: 12, borderTop: `.5px solid ${l.border}` }, children: e.actions.map((p, u) => /* @__PURE__ */ r.jsxs("span", { style: {
      padding: "3px 9px",
      borderRadius: 999,
      background: l.surface,
      border: `.5px solid ${l.border2}`,
      fontSize: 10,
      color: l.fg2,
      display: "inline-flex",
      alignItems: "center",
      gap: 4
    }, children: [
      /* @__PURE__ */ r.jsx(window.Icon, { name: Cm(p), size: 9 }),
      zm(p, a)
    ] }, u)) }),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 6, marginTop: 12 }, children: [
      /* @__PURE__ */ r.jsxs("button", { onClick: o, style: { flex: 1, padding: "7px 10px", borderRadius: 7, border: `.5px solid ${l.border2}`, background: "transparent", color: l.fg2, fontSize: 11, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5 }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: "play", size: 10 }),
        " Run now"
      ] }),
      /* @__PURE__ */ r.jsx("button", { onClick: i, style: { padding: "7px 10px", borderRadius: 7, border: `.5px solid ${l.border2}`, background: "transparent", color: l.fg3, fontSize: 11, cursor: "pointer" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "trash", size: 11 }) })
    ] }),
    e.lastRun && /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 10, color: l.fg3, marginTop: 8, textAlign: "right" }, children: [
      "Last ran ",
      e.lastRun
    ] })
  ] });
}, Cm = (e) => e.type === "light" || e.type === "allLights" ? "bulb" : e.type === "lockAll" ? "lock" : e.type === "scene" ? "scene" : e.type === "precondition" ? "car" : e.type === "closeGarage" ? "garage" : e.type === "thermostat" ? "therm" : "sparkle", zm = (e, t) => {
  if (e.type === "light") {
    const n = t.lights.find((i) => i.id === e.lightId);
    return `${e.on ? "On" : "Off"} · ${n?.name || "light"}`;
  }
  return e.type === "allLights" ? e.on ? "All lights on" : "All lights off" : e.type === "lockAll" ? "Lock all" : e.type === "scene" ? `Scene · ${e.sceneId}` : e.type === "precondition" ? "Precondition Tesla" : e.type === "closeGarage" ? "Close garage" : e.type === "thermostat" ? `Set ${e.target}°` : e.type;
};
Object.assign(window, { AutomationsView: jm });
const Tm = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i } = e, o = e.settings || {}, l = e.setSetting || (() => {
  }), [s, a] = React.useState("appearance"), d = [
    { id: "tangerine", name: "Tangerine", hex: "#e87f4a" },
    { id: "terracotta", name: "Terracotta", hex: "#c96442" },
    { id: "ochre", name: "Ochre", hex: "#b8843e" },
    { id: "sage", name: "Sage", hex: "#7a8c6c" },
    { id: "plum", name: "Plum", hex: "#7d4f6b" },
    { id: "slate", name: "Slate", hex: "#5b7390" }
  ], c = [
    { id: "jarvis", name: "Jarvis-y", desc: "Warm, capable, conversational" },
    { id: "terse", name: "Terse", desc: "Brief terminal-style replies" },
    { id: "playful", name: "Playful", desc: "Cheeky, light, friendly (Pip)" }
  ], p = [
    { id: "editorial", name: "Editorial", desc: "Newsreader · Inter" },
    { id: "classic", name: "Classic", desc: "Instrument Serif · Inter" },
    { id: "modern", name: "Modern", desc: "Space Grotesk · Inter" }
  ];
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "Preferences",
        title: "Settings",
        sub: "Personal · this device · this household"
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "200px 1fr", gap: i.gap, alignItems: "start" }, children: [
      /* @__PURE__ */ r.jsx(window.Card, { p: t, style: { padding: "12px 8px", position: "sticky", top: 0 }, children: [
        { id: "appearance", icon: "sun", label: "Appearance" },
        { id: "agent", icon: "sparkle", label: "Agent" },
        { id: "devices", icon: "grid", label: "Devices" },
        { id: "home", icon: "home", label: "Household" },
        { id: "notifications", icon: "bell", label: "Notifications" },
        { id: "account", icon: "user", label: "Account" },
        { id: "diagnostics", icon: "grid", label: "Diagnostics" }
      ].map((u) => {
        const h = s === u.id;
        return /* @__PURE__ */ r.jsxs("button", { onClick: () => a(u.id), style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 12px",
          margin: "2px 4px",
          borderRadius: 7,
          border: 0,
          background: h ? t.warm : "transparent",
          color: h ? t.accent : t.fg2,
          fontWeight: h ? 500 : 400,
          fontFamily: n.body,
          fontSize: 13,
          cursor: "pointer",
          width: "calc(100% - 8px)",
          textAlign: "left"
        }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: u.icon, size: 14, stroke: 1.5 }),
          /* @__PURE__ */ r.jsx("span", { style: { flex: 1 }, children: u.label })
        ] }, u.id);
      }) }),
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: i.gap }, children: [
        s === "appearance" && /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-appearance", style: { padding: 22 }, children: [
          /* @__PURE__ */ r.jsx(Bt, { p: t, fonts: n, title: "Appearance", sub: "How HomeCNTRD looks on this device" }),
          /* @__PURE__ */ r.jsx(Fe, { p: t, fonts: n, label: "Theme", desc: "Light, dark, or follow system", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8 }, children: [
            { id: !1, name: "Light", icon: "sun" },
            { id: !0, name: "Dark", icon: "moon" }
          ].map((u) => /* @__PURE__ */ r.jsxs("button", { onClick: () => l("dark", u.id), style: {
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "8px 14px",
            borderRadius: 9,
            border: `.5px solid ${o.dark === u.id ? t.accent : t.border2}`,
            background: o.dark === u.id ? t.accentSoft : "transparent",
            color: o.dark === u.id ? t.accent : t.fg,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: n.body
          }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: u.icon, size: 13 }),
            " ",
            u.name
          ] }, String(u.id))) }) }),
          /* @__PURE__ */ r.jsx(Fe, { p: t, fonts: n, label: "Accent color", desc: "Used across the app for highlights and status", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" }, children: d.map((u) => /* @__PURE__ */ r.jsxs("button", { onClick: () => l("hearthAccent", u.id), style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 10px 7px 7px",
            borderRadius: 999,
            border: `.5px solid ${o.hearthAccent === u.id ? t.fg : t.border2}`,
            background: o.hearthAccent === u.id ? t.warm : "transparent",
            color: t.fg,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: n.body
          }, children: [
            /* @__PURE__ */ r.jsx("span", { style: { width: 18, height: 18, borderRadius: "50%", background: u.hex, border: `.5px solid ${t.border2}` } }),
            u.name
          ] }, u.id)) }) }),
          /* @__PURE__ */ r.jsx(Fe, { p: t, fonts: n, label: "Density", desc: "How tightly information is packed", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8 }, children: ["compact", "regular", "comfy"].map((u) => /* @__PURE__ */ r.jsx("button", { onClick: () => l("density", u), style: {
            padding: "8px 16px",
            borderRadius: 9,
            textTransform: "capitalize",
            border: `.5px solid ${o.density === u ? t.accent : t.border2}`,
            background: o.density === u ? t.accentSoft : "transparent",
            color: o.density === u ? t.accent : t.fg,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: n.body
          }, children: u }, u)) }) }),
          /* @__PURE__ */ r.jsx(Fe, { p: t, fonts: n, label: "Typography", desc: "Headline pairing", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: p.map((u) => /* @__PURE__ */ r.jsxs("button", { onClick: () => l("fontPair", u.id), style: {
            padding: "10px 14px",
            borderRadius: 9,
            textAlign: "left",
            border: `.5px solid ${o.fontPair === u.id ? t.accent : t.border2}`,
            background: o.fontPair === u.id ? t.accentSoft : "transparent",
            color: t.fg,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: n.body
          }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontWeight: 500, color: o.fontPair === u.id ? t.accent : t.fg }, children: u.name }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3, marginTop: 2 }, children: u.desc })
          ] }, u.id)) }) })
        ] }),
        s === "agent" && /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-agent", style: { padding: 22 }, children: [
          /* @__PURE__ */ r.jsx(Bt, { p: t, fonts: n, title: "Agent", sub: "How HomeCNTRD speaks to you" }),
          /* @__PURE__ */ r.jsx(Fe, { p: t, fonts: n, label: "Personality", desc: "Persona used when chatting and reading status", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: c.map((u) => /* @__PURE__ */ r.jsxs("button", { onClick: () => l("agentTone", u.id), style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 9,
            textAlign: "left",
            border: `.5px solid ${o.agentTone === u.id ? t.accent : t.border2}`,
            background: o.agentTone === u.id ? t.accentSoft : "transparent",
            color: t.fg,
            cursor: "pointer",
            fontFamily: n.body
          }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { width: 22, height: 22, borderRadius: "50%", background: t.accent, color: "#fff", display: "grid", placeItems: "center", flex: "none" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "sparkle", size: 11 }) }),
            /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, fontWeight: o.agentTone === u.id ? 500 : 400 }, children: u.name }),
              /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, marginTop: 1 }, children: u.desc })
            ] }),
            o.agentTone === u.id && /* @__PURE__ */ r.jsx(window.Icon, { name: "check", size: 14, style: { color: t.accent } })
          ] }, u.id)) }) }),
          /* @__PURE__ */ r.jsx(Fe, { p: t, fonts: n, label: "Voice activation", desc: "Wake on 'Hey HomeCNTRD'", inline: !0, children: /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: o.wake !== !1, onChange: (u) => l("wake", u) }) }),
          /* @__PURE__ */ r.jsx(Fe, { p: t, fonts: n, label: "Suggestions on home", desc: "Show suggested commands when you open the agent", inline: !0, children: /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: o.suggestions !== !1, onChange: (u) => l("suggestions", u) }) })
        ] }),
        s === "devices" && /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-devices", style: { padding: 22 }, children: [
          /* @__PURE__ */ r.jsx(Bt, { p: t, fonts: n, title: "Devices on home screen", sub: "Choose which categories appear on the dashboard" }),
          /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }, children: [
            { k: "showLights", icon: "bulb", name: "Lighting" },
            { k: "showMusic", icon: "music", name: "Music & speakers" },
            { k: "showCameras", icon: "cam", name: "Cameras" },
            { k: "showClimate", icon: "therm", name: "Climate" },
            { k: "showLocks", icon: "lock", name: "Locks & security" },
            { k: "showScenes", icon: "scene", name: "Scenes" },
            { k: "showCalendar", icon: "cal", name: "Calendar" },
            { k: "showAlarms", icon: "bell", name: "Alarms" },
            { k: "showTv", icon: "tv", name: "TV" },
            { k: "showWeather", icon: "cloud", name: "Weather" }
          ].map((u) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 9, border: `.5px solid ${t.border}`, background: t.surface }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: u.icon, size: 15, style: { color: t.fg3 } }),
            /* @__PURE__ */ r.jsx("div", { style: { flex: 1, fontSize: 13, color: t.fg }, children: u.name }),
            /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: o[u.k] !== !1, onChange: (h) => l(u.k, h) })
          ] }, u.k)) })
        ] }),
        s === "home" && /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-home", style: { padding: 22 }, children: [
          /* @__PURE__ */ r.jsx(Bt, { p: t, fonts: n, title: "Household", sub: "People & places" }),
          /* @__PURE__ */ r.jsx(Fe, { p: t, fonts: n, label: "Members", children: /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
            [
              { name: "Frances Willows", role: "Owner", mail: "frances.w@willowstudio.com" },
              { name: "Jamie Willows", role: "Member", mail: "jamie.w@willowstudio.com" },
              { name: "Guests", role: "Door codes", mail: "2 active codes" }
            ].map((u) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 9, border: `.5px solid ${t.border}`, background: t.surface }, children: [
              /* @__PURE__ */ r.jsx("div", { style: { width: 32, height: 32, borderRadius: "50%", background: t.warm, color: t.accent, display: "grid", placeItems: "center", fontFamily: n.display, fontWeight: 500, flex: "none" }, children: u.name[0] }),
              /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
                /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: t.fg }, children: u.name }),
                /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3 }, children: u.mail })
              ] }),
              /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, color: t.fg3 }, children: u.role })
            ] }, u.mail)),
            /* @__PURE__ */ r.jsxs("button", { style: { padding: "8px 12px", borderRadius: 8, border: `1px dashed ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 12, cursor: "pointer", fontFamily: n.body, display: "flex", alignItems: "center", gap: 6, alignSelf: "flex-start" }, children: [
              /* @__PURE__ */ r.jsx(window.Icon, { name: "plus", size: 11 }),
              " Invite a member"
            ] })
          ] }) }),
          /* @__PURE__ */ r.jsx(Fe, { p: t, fonts: n, label: "Address", inline: !0, children: /* @__PURE__ */ r.jsx("span", { style: { fontSize: 13, color: t.fg2 }, children: "Willowbrook · Bernal Heights, SF" }) }),
          /* @__PURE__ */ r.jsx(Fe, { p: t, fonts: n, label: "Time zone", inline: !0, children: /* @__PURE__ */ r.jsx("span", { style: { fontSize: 13, color: t.fg2 }, children: "Pacific · GMT−8" }) })
        ] }),
        s === "notifications" && /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-notifications", style: { padding: 22 }, children: [
          /* @__PURE__ */ r.jsx(Bt, { p: t, fonts: n, title: "Notifications", sub: "What HomeCNTRD chimes for" }),
          [
            { k: "notifMotion", name: "Motion at the front door", desc: "Ring chime + push" },
            { k: "notifPackage", name: "Package detected", desc: "Once per delivery, all rooms" },
            { k: "notifLeak", name: "Water leak / freeze warning", desc: "Critical · breaks DND" },
            { k: "notifCharge", name: "Tesla finished charging", desc: "Once per session" },
            { k: "notifGarage", name: "Garage left open > 10 min", desc: "Repeats every 5 min until closed" },
            { k: "notifBriefing", name: "Morning briefing", desc: "7:30 AM · weather + first meeting + traffic" }
          ].map((u) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: `.5px solid ${t.border}` }, children: [
            /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: t.fg }, children: u.name }),
              /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, marginTop: 2 }, children: u.desc })
            ] }),
            /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: o[u.k] !== !1, onChange: (h) => l(u.k, h) })
          ] }, u.k))
        ] }),
        s === "account" && /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-account", style: { padding: 22 }, children: [
          /* @__PURE__ */ r.jsx(Bt, { p: t, fonts: n, title: "Account", sub: "HomeCNTRD account · sign-in" }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 11, background: t.surface, border: `.5px solid ${t.border}` }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { width: 46, height: 46, borderRadius: "50%", background: t.warm, color: t.accent, display: "grid", placeItems: "center", fontFamily: n.display, fontSize: 22, fontWeight: 500, flex: "none" }, children: (e.user?.firstName || "F")[0] }),
            /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 16, color: t.fg, fontWeight: 500 }, children: e.user?.firstName || "Frances" }),
              /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: t.fg3, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: [
                e.user?.email || "frances@home.com",
                " · since ",
                e.user?.createdAt || "2024-05-12"
              ] })
            ] }),
            /* @__PURE__ */ r.jsx("button", { onClick: () => e.doLogout?.(), style: { padding: "7px 12px", borderRadius: 8, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg, fontSize: 12, cursor: "pointer", fontFamily: n.body }, children: "Sign out" })
          ] }),
          /* @__PURE__ */ r.jsx(Fe, { p: t, fonts: n, label: "Active sessions", desc: "Devices currently signed in to your HomeCNTRD account", children: /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
            (e.user?.sessions || []).map((u) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 9, background: t.surface, border: `.5px solid ${t.border}` }, children: [
              /* @__PURE__ */ r.jsx("div", { style: { width: 30, height: 30, borderRadius: 7, background: t.warm, color: t.accent, display: "grid", placeItems: "center", flex: "none" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: u.device.includes("iPhone") ? "mic" : u.device.includes("Mac") ? "grid" : u.device.includes("iPad") ? "tv" : "home", size: 14 }) }),
              /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 13, color: t.fg, fontWeight: u.current ? 500 : 400, display: "flex", alignItems: "center", gap: 6 }, children: [
                  u.device,
                  u.current && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 9, padding: "1px 6px", borderRadius: 999, background: t.accent, color: "#fff" }, children: "THIS DEVICE" })
                ] }),
                /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, marginTop: 1 }, children: [
                  u.os,
                  " · ",
                  u.loc,
                  " · ",
                  u.last
                ] })
              ] }),
              !u.current && /* @__PURE__ */ r.jsx("button", { onClick: () => e.patchUser?.((h) => ({ ...h, sessions: h.sessions.filter((v) => v.id !== u.id) })), style: { padding: "5px 9px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.danger, fontSize: 11, cursor: "pointer" }, children: "End" })
            ] }, u.id)),
            /* @__PURE__ */ r.jsx("button", { onClick: () => e.patchUser?.((u) => ({ ...u, sessions: u.sessions.filter((h) => h.current) })), style: { padding: "8px 12px", borderRadius: 8, border: `1px dashed ${t.border2}`, background: "transparent", color: t.danger, fontSize: 12, cursor: "pointer", fontFamily: n.body, alignSelf: "flex-start" }, children: "Sign out everywhere else" })
          ] }) }),
          /* @__PURE__ */ r.jsx(Fe, { p: t, fonts: n, label: "Connected services", desc: "Mirrors what's set up in Devices", children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 6 }, children: e.state.integrations.filter((u) => u.status === "connected").map((u) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, background: t.surface, border: `.5px solid ${t.border}` }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { width: 22, height: 22, borderRadius: 6, background: u.color + "22", color: u.color, display: "grid", placeItems: "center", flex: "none" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: u.icon, size: 11 }) }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: u.name })
          ] }, u.id)) }) }),
          /* @__PURE__ */ r.jsx(Fe, { p: t, fonts: n, label: "Privacy", desc: "What HomeCNTRD shares and stores", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column" }, children: [
            { k: "cameraIndoorRecording", name: "Record indoor cameras when home", desc: "Turn off to only record when Away mode is active" },
            { k: "shareWithApple", name: "Share routines with Apple Home", desc: "Lets HomeKit see scenes and trigger them" },
            { k: "shareWithGoogle", name: "Share with Google Home", desc: "Off · no devices currently linked to Google" },
            { k: "analytics", name: "Anonymous usage analytics", desc: "Helps improve suggestions · no audio or video" },
            { k: "voiceTraining", name: "Use my voice to train the assistant", desc: "Off · voice samples are deleted after each session" }
          ].map((u, h) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: h ? `.5px solid ${t.border}` : "none" }, children: [
            /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: t.fg }, children: u.name }),
              /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, marginTop: 2 }, children: u.desc })
            ] }),
            /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: !!e.user?.privacy?.[u.k], onChange: (v) => e.patchUser?.((w) => ({ ...w, privacy: { ...w.privacy, [u.k]: v } })) })
          ] }, u.k)) }) }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: `.5px solid ${t.border}`, marginTop: 14, fontSize: 12 }, children: [
            /* @__PURE__ */ r.jsx("span", { style: { color: t.fg2 }, children: "Plan" }),
            /* @__PURE__ */ r.jsxs("span", { style: { color: t.fg }, children: [
              "HomeCNTRD ",
              e.user?.plan === "plus-annual" ? "Plus · annual" : e.user?.plan === "free" ? "Free" : "Plus"
            ] })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: `.5px solid ${t.border}`, fontSize: 12 }, children: [
            /* @__PURE__ */ r.jsx("span", { style: { color: t.fg2 }, children: "Version" }),
            /* @__PURE__ */ r.jsx("span", { style: { color: t.fg3, fontVariantNumeric: "tabular-nums" }, children: "2.1.4 (1842)" })
          ] })
        ] }),
        s === "diagnostics" && /* @__PURE__ */ r.jsx(_m, { ctx: e })
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
}, _m = ({ ctx: e }) => {
  const { p: t, fonts: n } = e, [i, o] = React.useState(() => typeof window < "u" ? [...window.__hcDiag || []] : []);
  React.useEffect(() => {
    const c = setInterval(() => {
      typeof window < "u" && o([...window.__hcDiag || []]);
    }, 1e3);
    return () => clearInterval(c);
  }, []);
  const l = [...i].reverse(), s = (c) => new Date(c).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }), a = (c, p) => p === "info" ? "#7da9d6" : p === "skip" ? "#d6b97d" : c === "ok" ? "#7ed3a3" : c === "error" ? "#ec8b78" : c === "pending" ? t.fg3 : t.fg2, d = (c) => c.kind === "info" ? "ⓘ" : c.kind === "skip" ? "⊘" : c.status === "ok" ? "✓" : c.status === "error" ? "✗" : c.status === "pending" ? "·" : "!";
  return /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-diagnostics", style: { padding: 22 }, children: [
    /* @__PURE__ */ r.jsx(Bt, { p: t, fonts: n, title: "Diagnostics", sub: "Recent commands HomeCNTRD has sent to Home Assistant" }),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0 14px" }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: t.fg2, fontFamily: n.body }, children: i.length === 0 ? "No commands sent yet. Try toggling a light, dragging the thermostat, or tapping a Ring mode." : `${i.length} of last 50 (newest first, refreshes every second).` }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: () => {
            typeof window < "u" && (window.__hcDiag = []), o([]);
          },
          style: { padding: "6px 12px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg, fontSize: 11, cursor: "pointer", fontFamily: n.body },
          children: "Clear"
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6, fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: 11.5 }, children: l.map((c, p) => /* @__PURE__ */ r.jsxs("div", { style: {
      padding: "8px 10px",
      borderRadius: 8,
      background: "rgba(241,234,217,.03)",
      border: `.5px solid ${t.border}`,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: 8, color: t.fg }, children: [
        /* @__PURE__ */ r.jsx("span", { style: { color: t.fg3, fontVariantNumeric: "tabular-nums" }, children: s(c.ts) }),
        /* @__PURE__ */ r.jsx("span", { style: { color: a(c.status, c.kind), fontWeight: 600 }, children: d(c) }),
        /* @__PURE__ */ r.jsx("span", { style: { color: t.fg, flex: 1, wordBreak: "break-word" }, children: c.kind === "skip" || c.kind === "info" ? c.message : `${c.domain}.${c.service}` })
      ] }),
      c.data && /* @__PURE__ */ r.jsx("div", { style: { color: t.fg3, paddingLeft: 24, wordBreak: "break-all" }, children: Object.entries(c.data).map(([u, h]) => /* @__PURE__ */ r.jsxs("span", { style: { marginRight: 10 }, children: [
        u,
        "=",
        typeof h == "object" ? JSON.stringify(h) : String(h)
      ] }, u)) }),
      c.error && /* @__PURE__ */ r.jsxs("div", { style: { color: "#ec8b78", paddingLeft: 24, wordBreak: "break-word" }, children: [
        "error: ",
        c.error
      ] })
    ] }, p)) })
  ] });
}, Bt = ({ p: e, fonts: t, title: n, sub: i }) => /* @__PURE__ */ r.jsxs("div", { style: { marginBottom: 16 }, children: [
  /* @__PURE__ */ r.jsx("div", { style: { fontFamily: t.display, fontSize: 22, color: e.fg, fontWeight: 500 }, children: n }),
  i && /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: e.fg3, marginTop: 3, fontStyle: "italic", fontFamily: t.display }, children: i })
] }), Fe = ({ p: e, fonts: t, label: n, desc: i, children: o, inline: l }) => /* @__PURE__ */ r.jsxs("div", { style: { padding: "14px 0", borderTop: `.5px solid ${e.border}`, display: l ? "flex" : "block", alignItems: l ? "center" : "stretch", gap: 14 }, children: [
  /* @__PURE__ */ r.jsxs("div", { style: { flex: l ? 1 : "auto", marginBottom: l ? 0 : 12 }, children: [
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: e.fg, fontWeight: 500 }, children: n }),
    i && /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: e.fg3, marginTop: 3 }, children: i })
  ] }),
  o
] });
window.SettingsView = Tm;
const Rm = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l, room: s } = e, a = o.tvs.filter((v) => v.room === s), d = a.length ? a : o.tvs, [c, p] = React.useState(null);
  if (!d.length) return null;
  const u = (v) => l((w) => ({ ...w, tvs: w.tvs.map((f) => f.id === v ? { ...f, playing: !f.playing, on: !0 } : f) })), h = (v) => l((w) => ({ ...w, tvs: w.tvs.map((f) => f.id === v ? { ...f, on: !f.on, playing: f.on ? !1 : f.playing } : f) }));
  return /* @__PURE__ */ r.jsxs(window.Section, { title: "TVs", subtitle: `${d.filter((v) => v.on).length} of ${d.length} on${a.length ? "" : " · whole house"}`, p: t, fonts: n, children: [
    /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: i.tileGap }, children: d.map((v) => /* @__PURE__ */ r.jsx(Im, { ctx: e, tv: v, togglePlay: u, togglePower: h, openRemote: () => p(v.id) }, v.id)) }),
    c && /* @__PURE__ */ r.jsx(Mm, { ctx: e, tv: o.tvs.find((v) => v.id === c), onClose: () => p(null) })
  ] });
}, Rl = {
  appletv: { label: "Apple TV", badgeBg: "#1f1f1f", badgeFg: "#fff", accent: "#a78bfa" },
  googletv: { label: "Google TV", badgeBg: "#1f1f1f", badgeFg: "#fff", accent: "#5b8cff" },
  lgthinq: { label: "LG ThinQ", badgeBg: "#a8174e", badgeFg: "#fff", accent: "#a8174e" }
}, Im = ({ ctx: e, tv: t, togglePlay: n, togglePower: i, openRemote: o }) => {
  const { p: l, fonts: s, state: a, setState: d } = e, c = Rl[t.brand] || Rl.appletv, p = window.ROOMS.find((h) => h.id === t.room)?.name, u = t.dur > 0 ? t.progress / t.dur * 100 : 0;
  return /* @__PURE__ */ r.jsxs(window.Card, { p: l, style: { padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: {
      position: "relative",
      aspectRatio: "16/9",
      background: t.on ? `radial-gradient(120% 120% at 30% 25%, ${t.poster}, oklch(15% 0.05 25))` : "#0a0a0a"
    }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { position: "absolute", top: 10, left: 10, padding: "3px 8px", borderRadius: 6, background: c.badgeBg, color: c.badgeFg, fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }, children: [
        t.brand === "appletv" && /* @__PURE__ */ r.jsx(window.Icon, { name: "apple", size: 11 }),
        t.brand === "googletv" && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, fontWeight: 700 }, children: "▶" }),
        t.brand === "lgthinq" && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 10, fontWeight: 700 }, children: "LG" }),
        c.label
      ] }),
      t.on && /* @__PURE__ */ r.jsxs("div", { style: { position: "absolute", top: 10, right: 10, padding: "3px 8px", borderRadius: 6, background: "rgba(0,0,0,.5)", color: "#fff", fontSize: 10, display: "flex", alignItems: "center", gap: 5 }, children: [
        /* @__PURE__ */ r.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: t.playing ? "#ff5c5c" : "#fff" } }),
        t.playing ? "PLAYING" : t.on ? "PAUSED" : "OFF"
      ] }),
      t.on ? /* @__PURE__ */ r.jsxs("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, padding: "24px 14px 12px", background: "linear-gradient(to top, rgba(0,0,0,.7), transparent)" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: "rgba(255,255,255,.75)", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 500 }, children: t.app }),
        /* @__PURE__ */ r.jsx("div", { style: { fontFamily: s.display, fontSize: 16, color: "#fff", fontWeight: 500, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: t.show })
      ] }) : /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "rgba(255,255,255,.4)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase" }, children: /* @__PURE__ */ r.jsxs("div", { children: [
        "Off · ",
        t.input
      ] }) }),
      t.on && t.dur > 0 && /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", left: 14, right: 14, bottom: 6, height: 2, background: "rgba(255,255,255,.18)", borderRadius: 1, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${u}%`, height: "100%", background: "#fff" } }) })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: { padding: "12px 14px 10px", display: "flex", alignItems: "center", gap: 10, borderBottom: `.5px solid ${l.border}` }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: l.fg, fontWeight: 500 }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: "tv", size: 12, style: { color: l.fg3 } }),
          t.name
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: l.fg3, marginTop: 1 }, children: [
          t.model,
          " · ",
          p,
          t.on && t.dur > 0 && /* @__PURE__ */ r.jsxs("span", { children: [
            " · ",
            window.fmtTime(t.progress),
            " / ",
            window.fmtTime(t.dur)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r.jsx(window.Toggle, { p: l, on: t.on, onChange: () => i(t.id), size: 18 })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: { padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ r.jsxs("button", { onClick: () => n(t.id), disabled: !t.on, style: {
        flex: 1,
        padding: "9px 12px",
        borderRadius: 8,
        border: 0,
        background: t.on ? t.playing ? l.accentSoft : l.accent : l.surface,
        color: t.on ? t.playing ? l.accent : "#fff" : l.fg3,
        fontSize: 12,
        fontFamily: s.body,
        fontWeight: 500,
        cursor: t.on ? "pointer" : "not-allowed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        opacity: t.on ? 1 : 0.5
      }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: t.playing ? "pause" : "play", size: 12 }),
        t.playing ? "Pause" : "Play"
      ] }),
      /* @__PURE__ */ r.jsxs("button", { onClick: o, style: {
        padding: "9px 12px",
        borderRadius: 8,
        border: `.5px solid ${l.border2}`,
        background: "transparent",
        color: l.fg,
        fontSize: 12,
        fontFamily: s.body,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6
      }, children: [
        /* @__PURE__ */ r.jsx($m, { size: 12 }),
        " Remote"
      ] })
    ] })
  ] });
}, $m = ({ size: e = 12 }) => /* @__PURE__ */ r.jsxs("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ r.jsx("rect", { x: "7", y: "3", width: "10", height: "18", rx: "3" }),
  /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "9", r: "2" }),
  /* @__PURE__ */ r.jsx("path", { d: "M12 14v4M10 16h4" })
] }), Mm = ({ ctx: e, tv: t, onClose: n }) => {
  const { p: i, fonts: o, setState: l, state: s } = e;
  if (!t) return null;
  const a = Rl[t.brand], d = window.ROOMS.find((u) => u.id === t.room)?.name, c = (u) => l((h) => ({ ...h, tvs: h.tvs.map((v) => v.id === t.id ? { ...v, ...u } : v) })), p = (u) => {
    u === "play" && c({ playing: !0, on: !0 }), u === "pause" && c({ playing: !1 }), u === "power" && c({ on: !t.on, playing: t.on ? !1 : t.playing }), u === "mute" && c({ mute: !t.mute }), u === "volUp" && c({ vol: Math.min(100, t.vol + 2), mute: !1 }), u === "volDown" && c({ vol: Math.max(0, t.vol - 2) }), u === "next" && c({ progress: Math.min(t.dur || 9999, t.progress + 30) }), u === "prev" && c({ progress: Math.max(0, t.progress - 30) });
  };
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx("div", { onClick: n, style: { position: "absolute", inset: 0, zIndex: 60, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)" } }),
    /* @__PURE__ */ r.jsxs("div", { style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: 360,
      maxHeight: "min(720px, calc(100% - 80px))",
      background: i.surface2,
      border: `.5px solid ${i.border}`,
      borderRadius: 22,
      boxShadow: "0 32px 80px rgba(0,0,0,.5)",
      display: "flex",
      flexDirection: "column",
      zIndex: 61,
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: `.5px solid ${i.border}`, background: i.surface }, children: [
        /* @__PURE__ */ r.jsx("div", { style: {
          width: 32,
          height: 32,
          borderRadius: 8,
          background: a.badgeBg,
          color: a.badgeFg,
          display: "grid",
          placeItems: "center",
          flex: "none",
          fontSize: 12,
          fontWeight: 700
        }, children: t.brand === "appletv" ? /* @__PURE__ */ r.jsx(window.Icon, { name: "apple", size: 14 }) : t.brand === "lgthinq" ? "LG" : "▶" }),
        /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontFamily: o.display, fontSize: 15, color: i.fg, fontWeight: 500 }, children: t.name }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: i.fg3 }, children: [
            a.label,
            " · ",
            d,
            t.on ? " · On" : " · Off"
          ] })
        ] }),
        /* @__PURE__ */ r.jsx("button", { onClick: n, style: { border: 0, background: "transparent", color: i.fg3, cursor: "pointer", fontSize: 22, padding: 0, width: 28, height: 28 }, children: "×" })
      ] }),
      t.on && t.show && t.show !== "—" && /* @__PURE__ */ r.jsxs("div", { style: { padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, background: i.warm, borderBottom: `.5px solid ${i.border}` }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 40, height: 40, borderRadius: 5, background: `radial-gradient(120% 120% at 30% 25%, ${t.poster}, oklch(15% 0.05 25))`, flex: "none" } }),
        /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: i.fg3, letterSpacing: ".08em", textTransform: "uppercase" }, children: t.app }),
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: i.fg, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: t.show }),
          t.dur > 0 && /* @__PURE__ */ r.jsx("div", { style: { height: 2, background: i.border, borderRadius: 1, marginTop: 4, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${t.progress / t.dur * 100}%`, height: "100%", background: i.accent } }) })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { style: { padding: 18, overflow: "auto" }, children: [
        t.brand === "appletv" && /* @__PURE__ */ r.jsx(Fm, { p: i, fonts: o, press: p, update: c, tv: t }),
        t.brand === "googletv" && /* @__PURE__ */ r.jsx(Em, { p: i, fonts: o, press: p, update: c, tv: t }),
        t.brand === "lgthinq" && /* @__PURE__ */ r.jsx(Pm, { p: i, fonts: o, press: p, update: c, tv: t })
      ] })
    ] })
  ] });
}, ie = ({ p: e, fonts: t, onClick: n, children: i, size: o = 44, primary: l, danger: s, style: a, label: d }) => /* @__PURE__ */ r.jsx(
  "button",
  {
    onClick: n,
    style: {
      width: o,
      height: o,
      borderRadius: o / 2,
      border: `.5px solid ${l ? e.accent : e.border2}`,
      background: l ? e.accent : s ? e.danger : e.surface,
      color: l || s ? "#fff" : e.fg,
      cursor: "pointer",
      display: "grid",
      placeItems: "center",
      fontSize: 13,
      fontFamily: t.body,
      fontWeight: 500,
      transition: "transform .08s",
      ...a
    },
    onMouseDown: (c) => c.currentTarget.style.transform = "scale(.94)",
    onMouseUp: (c) => c.currentTarget.style.transform = "scale(1)",
    onMouseLeave: (c) => c.currentTarget.style.transform = "scale(1)",
    title: d,
    children: i
  }
), Rs = ({ p: e, fonts: t, onPress: n, accent: i, size: o = 200 }) => {
  const l = o * 0.18, s = /* @__PURE__ */ r.jsx("div", { style: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    background: `radial-gradient(circle at 50% 50%, ${e.surface} 38%, ${e.surface2} 39%, ${e.surface2} 100%)`,
    border: `.5px solid ${e.border2}`,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.4), 0 1px 2px rgba(0,0,0,.08)"
  } }), a = ({ dir: d, top: c, left: p, right: u, bottom: h, char: v }) => /* @__PURE__ */ r.jsx("button", { onClick: () => n(d), style: {
    position: "absolute",
    top: c,
    left: p,
    right: u,
    bottom: h,
    width: l,
    height: l,
    border: 0,
    borderRadius: "50%",
    background: "transparent",
    color: e.fg,
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    fontSize: 14
  }, children: v });
  return /* @__PURE__ */ r.jsxs("div", { style: { position: "relative", width: o, height: o, margin: "0 auto" }, children: [
    s,
    /* @__PURE__ */ r.jsx(a, { dir: "up", top: 4, left: `calc(50% - ${l / 2}px)`, char: "▲" }),
    /* @__PURE__ */ r.jsx(a, { dir: "down", bottom: 4, left: `calc(50% - ${l / 2}px)`, char: "▼" }),
    /* @__PURE__ */ r.jsx(a, { dir: "left", left: 4, top: `calc(50% - ${l / 2}px)`, char: "◀" }),
    /* @__PURE__ */ r.jsx(a, { dir: "right", right: 4, top: `calc(50% - ${l / 2}px)`, char: "▶" }),
    /* @__PURE__ */ r.jsx("button", { onClick: () => n("ok"), style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: o * 0.32,
      height: o * 0.32,
      borderRadius: "50%",
      background: i || e.accent,
      color: "#fff",
      border: 0,
      cursor: "pointer",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: ".1em",
      boxShadow: "0 4px 12px rgba(0,0,0,.18)"
    }, children: "OK" })
  ] });
}, $n = ({ children: e, gap: t = 10, justify: n = "space-between" }) => /* @__PURE__ */ r.jsx("div", { style: { display: "flex", justifyContent: n, alignItems: "center", gap: t, marginTop: 14 }, children: e }), Fm = ({ p: e, fonts: t, press: n, update: i, tv: o }) => /* @__PURE__ */ r.jsxs("div", { children: [
  /* @__PURE__ */ r.jsxs($n, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n("back"), size: 40, label: "Back", children: "↶" }),
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n("home"), size: 40, label: "TV", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "tv", size: 16 }) }),
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n("power"), size: 40, danger: (o.on, !1), label: "Power", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "bolt", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ r.jsx(Rs, { p: e, fonts: t, accent: "#a78bfa", onPress: (l) => n(l) }) }),
  /* @__PURE__ */ r.jsxs($n, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n("siri"), size: 40, label: "Siri", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "mic", size: 14 }) }),
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n(o.playing ? "pause" : "play"), size: 40, label: "Play/Pause", primary: !0, children: /* @__PURE__ */ r.jsx(window.Icon, { name: o.playing ? "pause" : "play", size: 14 }) }),
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n("mute"), size: 40, label: "Mute", children: /* @__PURE__ */ r.jsx(window.Icon, { name: o.mute ? "bellOff" : "speaker", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx(Is, { p: e, fonts: t, tv: o, press: n }),
  /* @__PURE__ */ r.jsx(Ru, { p: e, fonts: t, tv: o, press: n }),
  /* @__PURE__ */ r.jsx($s, { p: e, fonts: t, apps: ["Apple TV+", "Netflix", "HBO Max", "Hulu", "Disney+", "YouTube"], update: i })
] }), Em = ({ p: e, fonts: t, press: n, update: i, tv: o }) => /* @__PURE__ */ r.jsxs("div", { children: [
  /* @__PURE__ */ r.jsxs($n, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n("power"), size: 40, label: "Power", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "bolt", size: 14 }) }),
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n("mute"), size: 40, label: "Mute", children: /* @__PURE__ */ r.jsx(window.Icon, { name: o.mute ? "bellOff" : "speaker", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ r.jsx(Rs, { p: e, fonts: t, accent: "#5b8cff", onPress: (l) => n(l) }) }),
  /* @__PURE__ */ r.jsxs($n, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n("back"), size: 40, label: "Back", children: "←" }),
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n("home"), size: 40, label: "Home", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "home", size: 14 }) }),
    /* @__PURE__ */ r.jsx(
      ie,
      {
        p: e,
        fonts: t,
        onClick: () => n("assistant"),
        size: 40,
        label: "Assistant",
        style: { background: "linear-gradient(135deg, #4285f4, #ea4335 35%, #fbbc05 65%, #34a853)", color: "#fff", border: 0 },
        children: /* @__PURE__ */ r.jsx(window.Icon, { name: "mic", size: 14 })
      }
    )
  ] }),
  /* @__PURE__ */ r.jsx(Is, { p: e, fonts: t, tv: o, press: n }),
  /* @__PURE__ */ r.jsx(Ru, { p: e, fonts: t, tv: o, press: n }),
  /* @__PURE__ */ r.jsx($s, { p: e, fonts: t, apps: ["YouTube", "Netflix", "Prime Video", "Disney+", "HBO Max", "Spotify"], update: i })
] }), Pm = ({ p: e, fonts: t, press: n, update: i, tv: o }) => /* @__PURE__ */ r.jsxs("div", { children: [
  /* @__PURE__ */ r.jsxs($n, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n("power"), size: 40, danger: !0, label: "Power", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "bolt", size: 14 }) }),
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n("input"), size: 40, label: "Input", children: "▣" }),
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n("settings"), size: 40, label: "Settings", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "settings", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ r.jsx(Rs, { p: e, fonts: t, accent: "#a8174e", onPress: (l) => n(l) }) }),
  /* @__PURE__ */ r.jsxs($n, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n("back"), size: 40, label: "Back", children: "↩" }),
    /* @__PURE__ */ r.jsx(
      ie,
      {
        p: e,
        fonts: t,
        onClick: () => n("home"),
        size: 40,
        label: "Home",
        style: { background: "#a8174e", color: "#fff", border: 0 },
        children: /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, fontWeight: 700 }, children: "LG" })
      }
    ),
    /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => n("mute"), size: 40, label: "Mute", children: /* @__PURE__ */ r.jsx(window.Icon, { name: o.mute ? "bellOff" : "speaker", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx(Is, { p: e, fonts: t, tv: o, press: n }),
  /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginTop: 14 }, children: [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((l, s) => /* @__PURE__ */ r.jsx("button", { onClick: () => l !== "" && n("num" + l), disabled: l === "", style: {
    padding: "10px 0",
    borderRadius: 8,
    border: `.5px solid ${e.border2}`,
    background: l === "" ? "transparent" : e.surface,
    color: l === "" ? "transparent" : e.fg,
    fontSize: 14,
    fontFamily: t.body,
    cursor: l === "" ? "default" : "pointer"
  }, children: l }, s)) }),
  /* @__PURE__ */ r.jsx($s, { p: e, fonts: t, apps: ["LG Channels", "Netflix", "Disney+", "YouTube", "Prime Video", "Apple TV"], update: i })
] }), Is = ({ p: e, fonts: t, tv: n, press: i }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }, children: [
  /* @__PURE__ */ r.jsxs("div", { style: { padding: "8px 6px", borderRadius: 12, border: `.5px solid ${e.border2}`, background: e.surface, display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
    /* @__PURE__ */ r.jsx("button", { onClick: () => i("volDown"), style: { width: 34, height: 34, borderRadius: "50%", border: 0, background: "transparent", color: e.fg, cursor: "pointer", fontSize: 18 }, children: "−" }),
    /* @__PURE__ */ r.jsxs("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 9, color: e.fg3, letterSpacing: ".1em", textTransform: "uppercase" }, children: "Vol" }),
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 14, color: e.fg, fontWeight: 500, fontVariantNumeric: "tabular-nums" }, children: n.mute ? "×" : n.vol })
    ] }),
    /* @__PURE__ */ r.jsx("button", { onClick: () => i("volUp"), style: { width: 34, height: 34, borderRadius: "50%", border: 0, background: "transparent", color: e.fg, cursor: "pointer", fontSize: 18 }, children: "+" })
  ] }),
  /* @__PURE__ */ r.jsxs("div", { style: { padding: "8px 6px", borderRadius: 12, border: `.5px solid ${e.border2}`, background: e.surface, display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
    /* @__PURE__ */ r.jsx("button", { onClick: () => i("chDown"), style: { width: 34, height: 34, borderRadius: "50%", border: 0, background: "transparent", color: e.fg, cursor: "pointer", fontSize: 18 }, children: "∧" }),
    /* @__PURE__ */ r.jsxs("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 9, color: e.fg3, letterSpacing: ".1em", textTransform: "uppercase" }, children: "Ch" }),
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 14, color: e.fg, fontWeight: 500 }, children: n.input })
    ] }),
    /* @__PURE__ */ r.jsx("button", { onClick: () => i("chUp"), style: { width: 34, height: 34, borderRadius: "50%", border: 0, background: "transparent", color: e.fg, cursor: "pointer", fontSize: 18 }, children: "∨" })
  ] })
] }), Ru = ({ p: e, fonts: t, tv: n, press: i }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "center", gap: 14, marginTop: 14 }, children: [
  /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => i("prev"), size: 38, label: "−30s", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "prev", size: 13 }) }),
  /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => i(n.playing ? "pause" : "play"), size: 50, primary: !0, label: "Play/Pause", children: /* @__PURE__ */ r.jsx(window.Icon, { name: n.playing ? "pause" : "play", size: 16 }) }),
  /* @__PURE__ */ r.jsx(ie, { p: e, fonts: t, onClick: () => i("next"), size: 38, label: "+30s", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "next", size: 13 }) })
] }), $s = ({ p: e, fonts: t, apps: n, update: i }) => /* @__PURE__ */ r.jsxs("div", { style: { marginTop: 18, paddingTop: 14, borderTop: `.5px solid ${e.border}` }, children: [
  /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: e.fg3, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8, fontWeight: 500 }, children: "Apps" }),
  /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }, children: n.map((o) => /* @__PURE__ */ r.jsx("button", { onClick: () => i({ app: o, on: !0 }), style: {
    padding: "8px 6px",
    borderRadius: 7,
    border: `.5px solid ${e.border2}`,
    background: e.surface,
    color: e.fg,
    fontSize: 11,
    fontFamily: t.body,
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }, children: o }, o)) })
] });
window.TvsSection = Rm;
const Dm = ({ ctx: e }) => {
  const { p: t, fonts: n, state: i, setState: o, narrow: l } = e, [s, a] = React.useState(!1), [d, c] = React.useState(null), p = i.speakers.filter((y) => y.playing), u = d ? i.speakers.find((y) => y.id === d) || p[0] : p.find((y) => y.room === "living") || p[0];
  if (!u) return null;
  const h = window.trackById(u.trackId), v = window.ROOMS.find((y) => y.id === u.room)?.name || u.name, w = (y) => o((x) => ({ ...x, speakers: x.speakers.map((b) => b.id === y ? { ...b, playing: !b.playing } : b) })), f = (y) => o((x) => ({ ...x, speakers: x.speakers.map((b) => {
    if (b.id !== y) return b;
    const j = b.queue || [], S = j[0] || window.TRACKS[(window.TRACKS.findIndex((C) => C.id === b.trackId) + 1) % window.TRACKS.length].id;
    return { ...b, trackId: S, queue: j.slice(1).concat(b.trackId), progress: 0 };
  }) })), k = (y) => o((x) => ({ ...x, speakers: x.speakers.map((b) => {
    if (b.id !== y) return b;
    const j = window.TRACKS.findIndex((S) => S.id === b.trackId);
    return { ...b, trackId: window.TRACKS[(j - 1 + window.TRACKS.length) % window.TRACKS.length].id, progress: 0 };
  }) })), m = (y, x) => o((b) => ({ ...b, speakers: b.speakers.map((j) => {
    if (j.id !== y) return j;
    const S = (j.queue || []).filter((C) => C !== x);
    return { ...j, trackId: x, progress: 0, playing: !0, queue: S };
  }) })), g = (y, x) => o((b) => ({ ...b, speakers: b.speakers.map(
    (j) => j.id === y ? { ...j, queue: (j.queue || []).filter((S) => S !== x) } : j
  ) }));
  if (s) {
    const y = (u.queue || []).map((x) => window.trackById(x)).filter(Boolean);
    return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("div", { onClick: () => a(!1), style: {
        position: "absolute",
        inset: 0,
        zIndex: 48,
        background: "rgba(0,0,0,.35)",
        backdropFilter: "blur(4px)"
      } }),
      /* @__PURE__ */ r.jsxs("div", { style: {
        position: "absolute",
        right: l ? 12 : 24,
        bottom: l ? 84 : 24,
        width: l ? "calc(100% - 24px)" : 460,
        maxHeight: l ? "calc(100% - 100px)" : "min(620px, calc(100% - 80px))",
        background: t.surface2,
        border: `.5px solid ${t.border}`,
        borderRadius: 18,
        boxShadow: "0 32px 80px rgba(0,0,0,.32)",
        display: "flex",
        flexDirection: "column",
        zIndex: 49,
        overflow: "hidden"
      }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: {
          position: "relative",
          padding: "18px 18px 16px",
          display: "flex",
          gap: 14,
          alignItems: "flex-end",
          background: `linear-gradient(160deg, ${h.hue} 0%, oklch(20% 0.06 25) 100%)`,
          color: "#fff"
        }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 0%, rgba(255,220,170,.25), transparent 60%)" } }),
          /* @__PURE__ */ r.jsxs("div", { style: {
            width: 96,
            height: 96,
            borderRadius: 10,
            flex: "none",
            position: "relative",
            background: `radial-gradient(120% 120% at 30% 25%, ${h.hue}, oklch(15% 0.05 25))`,
            boxShadow: "0 12px 28px rgba(0,0,0,.35)"
          }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 70%, rgba(255,220,150,.4), transparent 55%)", borderRadius: 10 } }),
            /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", bottom: 6, left: 7, right: 7, fontFamily: n.display, fontStyle: "italic", fontSize: 9, color: "rgba(255,240,210,.85)", letterSpacing: ".05em", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: h.album })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0, position: "relative", paddingBottom: 2 }, children: [
            /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.85, display: "flex", alignItems: "center", gap: 6 }, children: [
              /* @__PURE__ */ r.jsx(window.Icon, { name: u.type === "airplay" ? "airplay" : "sonos", size: 11 }),
              "Playing in ",
              v,
              p.length > 1 && /* @__PURE__ */ r.jsxs("span", { style: { opacity: 0.7 }, children: [
                "· +",
                p.length - 1,
                " more"
              ] })
            ] }),
            /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 22, fontWeight: 500, marginTop: 4, lineHeight: 1.15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: h.title }),
            /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 13, opacity: 0.85, marginTop: 2, fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: [
              h.artist,
              " · ",
              h.album
            ] }),
            /* @__PURE__ */ r.jsx("button", { onClick: () => a(!1), style: { position: "absolute", top: -6, right: -2, width: 28, height: 28, borderRadius: "50%", border: 0, background: "rgba(0,0,0,.25)", color: "#fff", cursor: "pointer", display: "grid", placeItems: "center", fontSize: 16, lineHeight: 1 }, children: "×" })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { padding: "12px 18px 14px", borderBottom: `.5px solid ${t.border}` }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { height: 3, background: t.border, borderRadius: 2, position: "relative", overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${u.progress / h.dur * 100}%`, height: "100%", background: t.accent, borderRadius: 2, transition: "width .8s linear" } }) }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: t.fg3, marginTop: 5, fontVariantNumeric: "tabular-nums" }, children: [
            /* @__PURE__ */ r.jsx("span", { children: window.fmtTime(u.progress) }),
            /* @__PURE__ */ r.jsxs("span", { children: [
              "−",
              window.fmtTime(h.dur - u.progress)
            ] })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 10 }, children: [
            /* @__PURE__ */ r.jsx("button", { onClick: () => k(u.id), style: Ot(t, 36), children: /* @__PURE__ */ r.jsx(window.Icon, { name: "prev", size: 15 }) }),
            /* @__PURE__ */ r.jsx("button", { onClick: () => w(u.id), style: { ...Ot(t, 46), background: t.accent, color: "#fff", border: 0 }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: u.playing ? "pause" : "play", size: 18 }) }),
            /* @__PURE__ */ r.jsx("button", { onClick: () => f(u.id), style: Ot(t, 36), children: /* @__PURE__ */ r.jsx(window.Icon, { name: "next", size: 15 }) }),
            /* @__PURE__ */ r.jsx("div", { style: { flex: 1 } }),
            /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, color: t.fg3 }, children: [
              /* @__PURE__ */ r.jsx(window.Icon, { name: "speaker", size: 12 }),
              /* @__PURE__ */ r.jsx(
                "input",
                {
                  type: "range",
                  min: "0",
                  max: "100",
                  value: u.vol,
                  onChange: (x) => o((b) => ({ ...b, speakers: b.speakers.map((j) => j.id === u.id ? { ...j, vol: +x.target.value } : j) })),
                  style: { width: 88, accentColor: t.accent, height: 3 }
                }
              )
            ] })
          ] })
        ] }),
        p.length > 1 && /* @__PURE__ */ r.jsx("div", { style: { padding: "10px 14px", borderBottom: `.5px solid ${t.border}`, display: "flex", gap: 6, overflowX: "auto" }, children: p.map((x) => {
          const b = window.trackById(x.trackId), j = window.ROOMS.find((C) => C.id === x.room)?.name || x.name, S = x.id === u.id;
          return /* @__PURE__ */ r.jsxs("button", { onClick: () => c(x.id), style: {
            padding: "6px 10px",
            borderRadius: 8,
            border: `.5px solid ${S ? t.accent : t.border2}`,
            background: S ? t.accentSoft : "transparent",
            color: S ? t.accent : t.fg2,
            fontSize: 11,
            cursor: "pointer",
            fontFamily: n.body,
            display: "flex",
            alignItems: "center",
            gap: 6,
            whiteSpace: "nowrap",
            flex: "none"
          }, children: [
            /* @__PURE__ */ r.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "oklch(60% 0.14 145)" } }),
            j,
            " ",
            /* @__PURE__ */ r.jsxs("span", { style: { opacity: 0.6, marginLeft: 2 }, children: [
              "· ",
              b.title
            ] })
          ] }, x.id);
        }) }),
        /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, overflow: "auto", padding: "4px 0 8px" }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: { padding: "10px 18px 6px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 10, color: t.fg3, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 500 }, children: [
              "Up next · ",
              v
            ] }),
            /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3 }, children: [
              y.length,
              " song",
              y.length === 1 ? "" : "s"
            ] })
          ] }),
          y.length === 0 ? /* @__PURE__ */ r.jsx("div", { style: { padding: "18px 18px 22px", fontSize: 12, color: t.fg3, fontStyle: "italic", fontFamily: n.display }, children: "Queue is empty. The next track in your library will play after this one." }) : y.map((x, b) => /* @__PURE__ */ r.jsxs(
            "div",
            {
              onClick: () => m(u.id, x.id),
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 18px",
                cursor: "pointer"
              },
              onMouseEnter: (j) => j.currentTarget.style.background = t.warm,
              onMouseLeave: (j) => j.currentTarget.style.background = "transparent",
              children: [
                /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, width: 14, textAlign: "right", fontVariantNumeric: "tabular-nums" }, children: b + 1 }),
                /* @__PURE__ */ r.jsx("div", { style: { width: 36, height: 36, borderRadius: 5, flex: "none", background: `radial-gradient(120% 120% at 30% 25%, ${x.hue}, oklch(20% 0.05 25))` } }),
                /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: t.fg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: x.title }),
                  /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: [
                    x.artist,
                    " · ",
                    x.album
                  ] })
                ] }),
                /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, fontVariantNumeric: "tabular-nums" }, children: window.fmtTime(x.dur) }),
                /* @__PURE__ */ r.jsx("button", { onClick: (j) => {
                  j.stopPropagation(), g(u.id, x.id);
                }, style: {
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  border: 0,
                  background: "transparent",
                  color: t.fg3,
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center"
                }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "x", size: 12 }) })
              ]
            },
            x.id + "-" + b
          ))
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      onDoubleClick: () => a(!0),
      onClick: (y) => {
        y.detail;
      },
      title: "Double-click to expand",
      style: {
        position: "absolute",
        right: l ? 12 : 96,
        // leave room for the 56px agent bubble + 16 gap on desktop
        bottom: l ? 76 : 28,
        left: l ? 12 : "auto",
        maxWidth: l ? "none" : 380,
        minWidth: l ? 0 : 320,
        height: 56,
        background: t.surface2,
        border: `.5px solid ${t.border}`,
        borderLeft: `3px solid ${t.accent}`,
        borderRadius: 12,
        boxShadow: "0 12px 32px rgba(0,0,0,.18), 0 1px 0 rgba(255,255,255,.3) inset",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 10px 6px 6px",
        zIndex: 49,
        cursor: "pointer",
        userSelect: "none"
      },
      children: [
        /* @__PURE__ */ r.jsx("div", { style: {
          width: 44,
          height: 44,
          borderRadius: 7,
          flex: "none",
          position: "relative",
          background: `radial-gradient(120% 120% at 30% 25%, ${h.hue}, oklch(20% 0.05 25))`
        }, children: /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 70%, rgba(255,220,150,.35), transparent 55%)", borderRadius: 7 } }) }),
        /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: t.fg, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.2 }, children: [
            h.title,
            u.playing && /* @__PURE__ */ r.jsx(Nm, { p: t })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 1 }, children: [
            /* @__PURE__ */ r.jsx("span", { style: { color: t.fg2 }, children: h.artist }),
            /* @__PURE__ */ r.jsxs("span", { children: [
              " · ",
              v
            ] }),
            p.length > 1 && /* @__PURE__ */ r.jsxs("span", { children: [
              " +",
              p.length - 1
            ] })
          ] }),
          /* @__PURE__ */ r.jsx("div", { style: { height: 2, background: t.border, borderRadius: 1, marginTop: 3, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${u.progress / h.dur * 100}%`, height: "100%", background: t.accent, transition: "width .8s linear" } }) })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 2, flex: "none" }, onClick: (y) => y.stopPropagation(), children: [
          /* @__PURE__ */ r.jsx("button", { onClick: () => k(u.id), style: Ot(t, 28), title: "Previous", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "prev", size: 12 }) }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => w(u.id), style: { ...Ot(t, 32), background: t.accent, color: "#fff", border: 0 }, title: u.playing ? "Pause" : "Play", children: /* @__PURE__ */ r.jsx(window.Icon, { name: u.playing ? "pause" : "play", size: 13 }) }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => f(u.id), style: Ot(t, 28), title: "Next", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "next", size: 12 }) }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => a(!0), style: Ot(t, 28), title: "Show queue", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "queue", size: 12 }) })
        ] })
      ]
    }
  );
}, Ot = (e, t) => ({
  width: t,
  height: t,
  borderRadius: t >= 36 ? "50%" : 7,
  border: `.5px solid ${e.border2}`,
  background: "transparent",
  color: e.fg2,
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  flex: "none"
}), Nm = ({ p: e }) => /* @__PURE__ */ r.jsxs("span", { style: { display: "inline-flex", gap: 1.5, alignItems: "flex-end", height: 9, marginLeft: 4 }, children: [
  [0, 1, 2].map((t) => /* @__PURE__ */ r.jsx("span", { style: { width: 2, background: e.accent, animation: `npbBar 0.9s ${t * 0.13}s infinite ease-in-out`, height: "100%", borderRadius: 1 } }, t)),
  /* @__PURE__ */ r.jsx("style", { children: "@keyframes npbBar{0%,100%{height:25%}50%{height:100%}}" })
] });
window.NowPlayingBar = Dm;
function Lm({ url: e, label: t, onClose: n }) {
  return e ? /* @__PURE__ */ r.jsxs("div", { style: {
    position: "fixed",
    inset: 0,
    zIndex: 9e3,
    background: "#000",
    paddingTop: "env(safe-area-inset-top, 0px)",
    paddingBottom: "env(safe-area-inset-bottom, 0px)",
    paddingLeft: "env(safe-area-inset-left, 0px)",
    paddingRight: "env(safe-area-inset-right, 0px)",
    display: "flex",
    flexDirection: "column"
  }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: {
      height: 44,
      flex: "none",
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "0 12px",
      background: "rgba(20,18,15,.92)",
      borderBottom: ".5px solid rgba(241,234,217,.1)",
      backdropFilter: "blur(12px)",
      color: "#f1ead9",
      fontFamily: '"Inter", system-ui, sans-serif'
    }, children: [
      /* @__PURE__ */ r.jsxs("button", { onClick: n, style: {
        padding: "6px 10px",
        borderRadius: 8,
        background: "rgba(241,234,217,.06)",
        border: ".5px solid rgba(241,234,217,.14)",
        color: "#f1ead9",
        fontSize: 12,
        cursor: "pointer",
        fontFamily: "inherit",
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }, children: [
        /* @__PURE__ */ r.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ r.jsx("path", { d: "m15 6-6 6 6 6" }) }),
        "Back"
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, fontWeight: 500, flex: 1, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }, children: t || "Browser" }),
      /* @__PURE__ */ r.jsx("a", { href: e, target: "_blank", rel: "noopener noreferrer", style: {
        padding: "6px 10px",
        borderRadius: 8,
        background: "transparent",
        border: ".5px solid rgba(241,234,217,.14)",
        color: "#f1ead9",
        fontSize: 11.5,
        textDecoration: "none",
        fontFamily: "inherit"
      }, children: "Open in new tab" })
    ] }),
    /* @__PURE__ */ r.jsx(
      "iframe",
      {
        src: e,
        title: t || "Browser",
        style: { flex: 1, width: "100%", border: 0, background: "#000" },
        allow: "autoplay; fullscreen; picture-in-picture; encrypted-media; clipboard-write",
        referrerPolicy: "no-referrer-when-downgrade"
      },
      e
    )
  ] }) : null;
}
const Am = (
  /*EDITMODE-BEGIN*/
  {
    dark: !0,
    density: "regular",
    hearthAccent: "tangerine",
    agentTone: "jarvis",
    fontPair: "editorial",
    bgImage: "",
    showLights: !0,
    showMusic: !0,
    showCameras: !0,
    showClimate: !0,
    showLocks: !0,
    showScenes: !0,
    showCalendar: !0,
    showWeather: !0,
    showAlarms: !0,
    showTv: !0,
    ttsAgent: !0
  }
);
class Om extends se.Component {
  constructor(t) {
    super(t), this.state = { error: null };
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  componentDidCatch(t, n) {
    console.error("[boundary]", t, n);
  }
  render() {
    return this.state.error ? /* @__PURE__ */ r.jsx("div", { style: {
      width: "100%",
      height: "100%",
      display: "grid",
      placeItems: "center",
      background: "#161310",
      color: "#f1ead9",
      fontFamily: '"Inter", system-ui, sans-serif',
      padding: 24,
      textAlign: "left",
      overflow: "auto"
    }, children: /* @__PURE__ */ r.jsxs("div", { style: { maxWidth: 520, width: "100%" }, children: [
      /* @__PURE__ */ r.jsx("div", { style: {
        fontFamily: '"Newsreader", Georgia, serif',
        fontStyle: "italic",
        fontSize: 28,
        color: "#e87f4a",
        marginBottom: 16,
        textAlign: "center"
      }, children: "HomeCNTRD" }),
      /* @__PURE__ */ r.jsxs("div", { style: {
        padding: 16,
        fontSize: 13,
        color: "#ec8b78",
        background: "rgba(217,100,80,.08)",
        border: ".5px solid rgba(217,100,80,.4)",
        borderRadius: 8,
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word"
      }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontWeight: 600, marginBottom: 8, color: "#f1ead9" }, children: "Render error" }),
        String(this.state.error?.message || this.state.error),
        this.state.error?.stack && /* @__PURE__ */ r.jsxs("details", { style: { marginTop: 12, fontSize: 11, color: "rgba(241,234,217,0.6)" }, children: [
          /* @__PURE__ */ r.jsx("summary", { style: { cursor: "pointer" }, children: "Stack" }),
          /* @__PURE__ */ r.jsx("pre", { style: { fontSize: 10, overflowX: "auto", marginTop: 6 }, children: this.state.error.stack })
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("button", { onClick: () => this.setState({ error: null }), style: {
        marginTop: 16,
        padding: "10px 16px",
        borderRadius: 8,
        border: 0,
        background: "#e87f4a",
        color: "#fff",
        fontSize: 13,
        cursor: "pointer",
        fontFamily: "inherit"
      }, children: "Try again" })
    ] }) }) : this.props.children;
  }
}
function Wm({ hass: e, narrow: t, panel: n }) {
  const [i, o] = window.useTweaks(Am), [l, s] = se.useState(null), a = se.useMemo(() => {
    const w = e?.user || {};
    return {
      firstName: (w.name || "").split(" ")[0] || "there",
      email: w.name || "",
      plan: "home-assistant",
      layout: null,
      integrations: null,
      members: [],
      sessions: [],
      privacy: {
        cameraIndoorRecording: !1,
        shareWithApple: !1,
        shareWithGoogle: !1,
        analytics: !1,
        voiceTraining: !1
      },
      // Pulled from HA's own config so the sidebar wordmark reads the
      // user's actual location instead of the prototype's "Willowbrook".
      location: e?.config?.location_name || "Home",
      createdAt: ""
    };
  }, [e?.user, e?.config?.location_name]), [d, c] = se.useState({}), p = se.useCallback((w) => {
    c((f) => typeof w == "function" ? w({ ...a, ...f }) : { ...f, ...w });
  }, [a]), u = { ...a, ...d }, h = {
    lights: i.showLights,
    music: i.showMusic,
    cameras: i.showCameras,
    climate: i.showClimate,
    locks: i.showLocks,
    scenes: i.showScenes,
    calendar: i.showCalendar,
    weather: i.showWeather,
    alarms: i.showAlarms,
    tv: i.showTv
  }, v = () => {
    typeof window < "u" && window.location.assign("/?auth_callback=1");
  };
  return /* @__PURE__ */ r.jsxs(Om, { children: [
    /* @__PURE__ */ r.jsx("div", { style: { width: "100%", height: "100%" }, children: /* @__PURE__ */ r.jsx(
      window.HearthApp,
      {
        dark: i.dark,
        density: i.density,
        accent: i.hearthAccent,
        agentTone: i.agentTone,
        fontPair: i.fontPair,
        bgImage: i.bgImage,
        visibleDevices: h,
        settings: i,
        setSetting: o,
        user: u,
        patchUser: p,
        doLogout: v,
        narrow: !!t,
        openBrowser: (w, f) => s({ url: w, label: f })
      }
    ) }),
    /* @__PURE__ */ r.jsx(
      Lm,
      {
        url: l?.url,
        label: l?.label,
        onClose: () => s(null)
      }
    ),
    /* @__PURE__ */ r.jsxs(window.TweaksPanel, { children: [
      /* @__PURE__ */ r.jsx(window.TweakSection, { label: "Mode" }),
      /* @__PURE__ */ r.jsx(window.TweakToggle, { label: "Dark mode", value: i.dark, onChange: (w) => o("dark", w) }),
      /* @__PURE__ */ r.jsx(
        window.TweakRadio,
        {
          label: "Density",
          value: i.density,
          options: ["compact", "regular", "comfy"],
          onChange: (w) => o("density", w)
        }
      ),
      /* @__PURE__ */ r.jsx(window.TweakSection, { label: "Theme" }),
      /* @__PURE__ */ r.jsx(
        window.TweakColor,
        {
          label: "Accent",
          value: Hm(i.hearthAccent),
          options: ["#e87f4a", "#c96442", "#b8843e", "#7a8c6c", "#7d4f6b", "#5b7390"],
          onChange: (w) => o("hearthAccent", Bm(w))
        }
      ),
      /* @__PURE__ */ r.jsx(
        window.TweakSelect,
        {
          label: "Typography",
          value: i.fontPair,
          options: [
            { value: "editorial", label: "Editorial · Newsreader" },
            { value: "classic", label: "Classic · Instrument" },
            { value: "modern", label: "Modern · Space Grotesk" }
          ],
          onChange: (w) => o("fontPair", w)
        }
      ),
      /* @__PURE__ */ r.jsx(window.TweakSection, { label: "Agent" }),
      /* @__PURE__ */ r.jsx(
        window.TweakSelect,
        {
          label: "Personality",
          value: i.agentTone,
          options: [
            { value: "jarvis", label: "Jarvis-y (warm)" },
            { value: "terse", label: "Terse (terminal)" },
            { value: "playful", label: "Playful (Pip)" }
          ],
          onChange: (w) => o("agentTone", w)
        }
      ),
      /* @__PURE__ */ r.jsx(
        window.TweakToggle,
        {
          label: "Speak responses",
          value: i.ttsAgent !== !1,
          onChange: (w) => o("ttsAgent", w)
        }
      ),
      /* @__PURE__ */ r.jsx(window.TweakSection, { label: "Home Assistant" }),
      /* @__PURE__ */ r.jsx(window.TweakButton, { onClick: () => window.location.assign("/config/integrations"), children: "Manage devices in Home Assistant" }),
      /* @__PURE__ */ r.jsx(window.TweakSection, { label: "Account" }),
      /* @__PURE__ */ r.jsxs(window.TweakButton, { onClick: v, children: [
        "Sign out · ",
        u.email || "HA user"
      ] })
    ] })
  ] });
}
const Il = { tangerine: "#e87f4a", terracotta: "#c96442", ochre: "#b8843e", sage: "#7a8c6c", plum: "#7d4f6b", slate: "#5b7390" };
function Hm(e) {
  return Il[e] || Il.tangerine;
}
function Bm(e) {
  return Object.entries(Il).find(([, t]) => t === e)?.[0] || "tangerine";
}
window.App = Wm;
typeof globalThis < "u" && typeof globalThis.process > "u" && (globalThis.process = { env: { NODE_ENV: "production" } });
window.React = se;
window.HassContext = Ir;
class Vm extends HTMLElement {
  constructor() {
    super(), this._hass = null, this._narrow = !1, this._panel = null, this._route = null, this._mount = null, this._root = null;
  }
  // HA writes these as JS properties (not attributes), so use setters.
  set hass(t) {
    this._hass = t, this._render();
  }
  set narrow(t) {
    this._narrow = !!t, this._render();
  }
  set panel(t) {
    this._panel = t, this._render();
  }
  set route(t) {
    this._route = t;
  }
  connectedCallback() {
    if (!this._mount) {
      this.style.cssText = [
        "display:block",
        "width:100%",
        "height:100%",
        "overflow:hidden",
        "background:#161310",
        "box-sizing:border-box"
      ].join(";");
      try {
        this.dispatchEvent(new CustomEvent("hass-dock-sidebar", {
          detail: { dock: "always_hidden" },
          bubbles: !0,
          composed: !0
        }));
      } catch {
      }
      this._mount = document.createElement("div"), this._mount.style.cssText = "width:100%;height:100%;display:block;background:#161310", this.appendChild(this._mount), this._mount.innerHTML = '<div style="width:100%;height:100%;display:grid;place-items:center;color:#e87f4a;font-family:Newsreader,Georgia,serif;font-style:italic;font-size:28px;letter-spacing:.01em;">HomeCNTRD</div>', this._root = fu(this._mount), this._render();
    }
  }
  disconnectedCallback() {
    this._root && (this._root.unmount(), this._root = null), this._mount && this._mount.parentNode && this._mount.parentNode.removeChild(this._mount), this._mount = null;
  }
  _render() {
    if (!this._root) return;
    const t = window.App;
    t && this._root.render(
      se.createElement(
        Ir.Provider,
        { value: this._hass },
        se.createElement(t, {
          hass: this._hass,
          narrow: this._narrow,
          panel: this._panel
        })
      )
    );
  }
}
customElements.get("homecntrd-panel") || customElements.define("homecntrd-panel", Vm);
//# sourceMappingURL=homecntrd.js.map
