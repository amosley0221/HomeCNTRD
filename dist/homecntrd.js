typeof globalThis < "u" && typeof globalThis.process > "u" && (globalThis.process = { env: { NODE_ENV: "production" } });
function eu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ia = { exports: {} }, N = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yr = Symbol.for("react.element"), tu = Symbol.for("react.portal"), nu = Symbol.for("react.fragment"), ru = Symbol.for("react.strict_mode"), iu = Symbol.for("react.profiler"), ou = Symbol.for("react.provider"), lu = Symbol.for("react.context"), su = Symbol.for("react.forward_ref"), au = Symbol.for("react.suspense"), du = Symbol.for("react.memo"), cu = Symbol.for("react.lazy"), ms = Symbol.iterator;
function uu(e) {
  return e === null || typeof e != "object" ? null : (e = ms && e[ms] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Ma = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, _a = Object.assign, Pa = {};
function Cn(e, t, n) {
  this.props = e, this.context = t, this.refs = Pa, this.updater = n || Ma;
}
Cn.prototype.isReactComponent = {};
Cn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Cn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Ea() {
}
Ea.prototype = Cn.prototype;
function xl(e, t, n) {
  this.props = e, this.context = t, this.refs = Pa, this.updater = n || Ma;
}
var vl = xl.prototype = new Ea();
vl.constructor = xl;
_a(vl, Cn.prototype);
vl.isPureReactComponent = !0;
var ys = Array.isArray, $a = Object.prototype.hasOwnProperty, wl = { current: null }, Fa = { key: !0, ref: !0, __self: !0, __source: !0 };
function Da(e, t, n) {
  var i, o = {}, l = null, s = null;
  if (t != null) for (i in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (l = "" + t.key), t) $a.call(t, i) && !Fa.hasOwnProperty(i) && (o[i] = t[i]);
  var a = arguments.length - 2;
  if (a === 1) o.children = n;
  else if (1 < a) {
    for (var d = Array(a), c = 0; c < a; c++) d[c] = arguments[c + 2];
    o.children = d;
  }
  if (e && e.defaultProps) for (i in a = e.defaultProps, a) o[i] === void 0 && (o[i] = a[i]);
  return { $$typeof: yr, type: e, key: l, ref: s, props: o, _owner: wl.current };
}
function fu(e, t) {
  return { $$typeof: yr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function kl(e) {
  return typeof e == "object" && e !== null && e.$$typeof === yr;
}
function pu(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var xs = /\/+/g;
function Ui(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? pu("" + e.key) : t.toString(36);
}
function Br(e, t, n, i, o) {
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
        case yr:
        case tu:
          s = !0;
      }
  }
  if (s) return s = e, o = o(s), e = i === "" ? "." + Ui(s, 0) : i, ys(o) ? (n = "", e != null && (n = e.replace(xs, "$&/") + "/"), Br(o, t, n, "", function(c) {
    return c;
  })) : o != null && (kl(o) && (o = fu(o, n + (!o.key || s && s.key === o.key ? "" : ("" + o.key).replace(xs, "$&/") + "/") + e)), t.push(o)), 1;
  if (s = 0, i = i === "" ? "." : i + ":", ys(e)) for (var a = 0; a < e.length; a++) {
    l = e[a];
    var d = i + Ui(l, a);
    s += Br(l, t, n, d, o);
  }
  else if (d = uu(e), typeof d == "function") for (e = d.call(e), a = 0; !(l = e.next()).done; ) l = l.value, d = i + Ui(l, a++), s += Br(l, t, n, d, o);
  else if (l === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return s;
}
function jr(e, t, n) {
  if (e == null) return e;
  var i = [], o = 0;
  return Br(e, i, "", "", function(l) {
    return t.call(n, l, o++);
  }), i;
}
function hu(e) {
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
var xe = { current: null }, Vr = { transition: null }, gu = { ReactCurrentDispatcher: xe, ReactCurrentBatchConfig: Vr, ReactCurrentOwner: wl };
function Na() {
  throw Error("act(...) is not supported in production builds of React.");
}
N.Children = { map: jr, forEach: function(e, t, n) {
  jr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return jr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return jr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!kl(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
N.Component = Cn;
N.Fragment = nu;
N.Profiler = iu;
N.PureComponent = xl;
N.StrictMode = ru;
N.Suspense = au;
N.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gu;
N.act = Na;
N.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var i = _a({}, e.props), o = e.key, l = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (l = t.ref, s = wl.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (d in t) $a.call(t, d) && !Fa.hasOwnProperty(d) && (i[d] = t[d] === void 0 && a !== void 0 ? a[d] : t[d]);
  }
  var d = arguments.length - 2;
  if (d === 1) i.children = n;
  else if (1 < d) {
    a = Array(d);
    for (var c = 0; c < d; c++) a[c] = arguments[c + 2];
    i.children = a;
  }
  return { $$typeof: yr, type: e.type, key: o, ref: l, props: i, _owner: s };
};
N.createContext = function(e) {
  return e = { $$typeof: lu, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: ou, _context: e }, e.Consumer = e;
};
N.createElement = Da;
N.createFactory = function(e) {
  var t = Da.bind(null, e);
  return t.type = e, t;
};
N.createRef = function() {
  return { current: null };
};
N.forwardRef = function(e) {
  return { $$typeof: su, render: e };
};
N.isValidElement = kl;
N.lazy = function(e) {
  return { $$typeof: cu, _payload: { _status: -1, _result: e }, _init: hu };
};
N.memo = function(e, t) {
  return { $$typeof: du, type: e, compare: t === void 0 ? null : t };
};
N.startTransition = function(e) {
  var t = Vr.transition;
  Vr.transition = {};
  try {
    e();
  } finally {
    Vr.transition = t;
  }
};
N.unstable_act = Na;
N.useCallback = function(e, t) {
  return xe.current.useCallback(e, t);
};
N.useContext = function(e) {
  return xe.current.useContext(e);
};
N.useDebugValue = function() {
};
N.useDeferredValue = function(e) {
  return xe.current.useDeferredValue(e);
};
N.useEffect = function(e, t) {
  return xe.current.useEffect(e, t);
};
N.useId = function() {
  return xe.current.useId();
};
N.useImperativeHandle = function(e, t, n) {
  return xe.current.useImperativeHandle(e, t, n);
};
N.useInsertionEffect = function(e, t) {
  return xe.current.useInsertionEffect(e, t);
};
N.useLayoutEffect = function(e, t) {
  return xe.current.useLayoutEffect(e, t);
};
N.useMemo = function(e, t) {
  return xe.current.useMemo(e, t);
};
N.useReducer = function(e, t, n) {
  return xe.current.useReducer(e, t, n);
};
N.useRef = function(e) {
  return xe.current.useRef(e);
};
N.useState = function(e) {
  return xe.current.useState(e);
};
N.useSyncExternalStore = function(e, t, n) {
  return xe.current.useSyncExternalStore(e, t, n);
};
N.useTransition = function() {
  return xe.current.useTransition();
};
N.version = "18.3.1";
Ia.exports = N;
var bl = Ia.exports;
const ie = /* @__PURE__ */ eu(bl);
var La = { exports: {} }, Pe = {}, Aa = { exports: {} }, Oa = {};
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
  function t(R, P) {
    var E = R.length;
    R.push(P);
    e: for (; 0 < E; ) {
      var A = E - 1 >>> 1, L = R[A];
      if (0 < o(L, P)) R[A] = P, R[E] = L, E = A;
      else break e;
    }
  }
  function n(R) {
    return R.length === 0 ? null : R[0];
  }
  function i(R) {
    if (R.length === 0) return null;
    var P = R[0], E = R.pop();
    if (E !== P) {
      R[0] = E;
      e: for (var A = 0, L = R.length, $e = L >>> 1; A < $e; ) {
        var We = 2 * (A + 1) - 1, Q = R[We], Z = We + 1, ut = R[Z];
        if (0 > o(Q, E)) Z < L && 0 > o(ut, Q) ? (R[A] = ut, R[Z] = E, A = Z) : (R[A] = Q, R[We] = E, A = We);
        else if (Z < L && 0 > o(ut, E)) R[A] = ut, R[Z] = E, A = Z;
        else break e;
      }
    }
    return P;
  }
  function o(R, P) {
    var E = R.sortIndex - P.sortIndex;
    return E !== 0 ? E : R.id - P.id;
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
  var d = [], c = [], f = 1, u = null, h = 3, v = !1, w = !1, p = !1, b = typeof setTimeout == "function" ? setTimeout : null, m = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(R) {
    for (var P = n(c); P !== null; ) {
      if (P.callback === null) i(c);
      else if (P.startTime <= R) i(c), P.sortIndex = P.expirationTime, t(d, P);
      else break;
      P = n(c);
    }
  }
  function x(R) {
    if (p = !1, y(R), !w) if (n(d) !== null) w = !0, J(k);
    else {
      var P = n(c);
      P !== null && re(x, P.startTime - R);
    }
  }
  function k(R, P) {
    w = !1, p && (p = !1, m(C), C = -1), v = !0;
    var E = h;
    try {
      for (y(P), u = n(d); u !== null && (!(u.expirationTime > P) || R && !I()); ) {
        var A = u.callback;
        if (typeof A == "function") {
          u.callback = null, h = u.priorityLevel;
          var L = A(u.expirationTime <= P);
          P = e.unstable_now(), typeof L == "function" ? u.callback = L : u === n(d) && i(d), y(P);
        } else i(d);
        u = n(d);
      }
      if (u !== null) var $e = !0;
      else {
        var We = n(c);
        We !== null && re(x, We.startTime - P), $e = !1;
      }
      return $e;
    } finally {
      u = null, h = E, v = !1;
    }
  }
  var j = !1, S = null, C = -1, _ = 5, z = -1;
  function I() {
    return !(e.unstable_now() - z < _);
  }
  function F() {
    if (S !== null) {
      var R = e.unstable_now();
      z = R;
      var P = !0;
      try {
        P = S(!0, R);
      } finally {
        P ? $() : (j = !1, S = null);
      }
    } else j = !1;
  }
  var $;
  if (typeof g == "function") $ = function() {
    g(F);
  };
  else if (typeof MessageChannel < "u") {
    var D = new MessageChannel(), B = D.port2;
    D.port1.onmessage = F, $ = function() {
      B.postMessage(null);
    };
  } else $ = function() {
    b(F, 0);
  };
  function J(R) {
    S = R, j || (j = !0, $());
  }
  function re(R, P) {
    C = b(function() {
      R(e.unstable_now());
    }, P);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(R) {
    R.callback = null;
  }, e.unstable_continueExecution = function() {
    w || v || (w = !0, J(k));
  }, e.unstable_forceFrameRate = function(R) {
    0 > R || 125 < R ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : _ = 0 < R ? Math.floor(1e3 / R) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(d);
  }, e.unstable_next = function(R) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var P = 3;
        break;
      default:
        P = h;
    }
    var E = h;
    h = P;
    try {
      return R();
    } finally {
      h = E;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(R, P) {
    switch (R) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        R = 3;
    }
    var E = h;
    h = R;
    try {
      return P();
    } finally {
      h = E;
    }
  }, e.unstable_scheduleCallback = function(R, P, E) {
    var A = e.unstable_now();
    switch (typeof E == "object" && E !== null ? (E = E.delay, E = typeof E == "number" && 0 < E ? A + E : A) : E = A, R) {
      case 1:
        var L = -1;
        break;
      case 2:
        L = 250;
        break;
      case 5:
        L = 1073741823;
        break;
      case 4:
        L = 1e4;
        break;
      default:
        L = 5e3;
    }
    return L = E + L, R = { id: f++, callback: P, priorityLevel: R, startTime: E, expirationTime: L, sortIndex: -1 }, E > A ? (R.sortIndex = E, t(c, R), n(d) === null && R === n(c) && (p ? (m(C), C = -1) : p = !0, re(x, E - A))) : (R.sortIndex = L, t(d, R), w || v || (w = !0, J(k))), R;
  }, e.unstable_shouldYield = I, e.unstable_wrapCallback = function(R) {
    var P = h;
    return function() {
      var E = h;
      h = P;
      try {
        return R.apply(this, arguments);
      } finally {
        h = E;
      }
    };
  };
})(Oa);
Aa.exports = Oa;
var mu = Aa.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yu = bl, _e = mu;
function T(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Wa = /* @__PURE__ */ new Set(), er = {};
function Yt(e, t) {
  yn(e, t), yn(e + "Capture", t);
}
function yn(e, t) {
  for (er[e] = t, e = 0; e < t.length; e++) Wa.add(t[e]);
}
var lt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), wo = Object.prototype.hasOwnProperty, xu = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, vs = {}, ws = {};
function vu(e) {
  return wo.call(ws, e) ? !0 : wo.call(vs, e) ? !1 : xu.test(e) ? ws[e] = !0 : (vs[e] = !0, !1);
}
function wu(e, t, n, i) {
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
function ku(e, t, n, i) {
  if (t === null || typeof t > "u" || wu(e, t, n, i)) return !0;
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
function ve(e, t, n, i, o, l, s) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = i, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = l, this.removeEmptyString = s;
}
var ue = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ue[e] = new ve(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ue[t] = new ve(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ue[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ue[e] = new ve(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ue[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ue[e] = new ve(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ue[e] = new ve(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ue[e] = new ve(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ue[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var jl = /[\-:]([a-z])/g;
function Sl(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    jl,
    Sl
  );
  ue[t] = new ve(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(jl, Sl);
  ue[t] = new ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(jl, Sl);
  ue[t] = new ve(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ue[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ue.xlinkHref = new ve("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ue[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Cl(e, t, n, i) {
  var o = ue.hasOwnProperty(t) ? ue[t] : null;
  (o !== null ? o.type !== 0 : i || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (ku(t, n, o, i) && (n = null), i || o === null ? vu(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : o.mustUseProperty ? e[o.propertyName] = n === null ? o.type === 3 ? !1 : "" : n : (t = o.attributeName, i = o.attributeNamespace, n === null ? e.removeAttribute(t) : (o = o.type, n = o === 3 || o === 4 && n === !0 ? "" : "" + n, i ? e.setAttributeNS(i, t, n) : e.setAttribute(t, n))));
}
var ct = yu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Sr = Symbol.for("react.element"), Jt = Symbol.for("react.portal"), Zt = Symbol.for("react.fragment"), zl = Symbol.for("react.strict_mode"), ko = Symbol.for("react.profiler"), Ha = Symbol.for("react.provider"), Ba = Symbol.for("react.context"), Tl = Symbol.for("react.forward_ref"), bo = Symbol.for("react.suspense"), jo = Symbol.for("react.suspense_list"), Rl = Symbol.for("react.memo"), ht = Symbol.for("react.lazy"), Va = Symbol.for("react.offscreen"), ks = Symbol.iterator;
function Mn(e) {
  return e === null || typeof e != "object" ? null : (e = ks && e[ks] || e["@@iterator"], typeof e == "function" ? e : null);
}
var X = Object.assign, Gi;
function Wn(e) {
  if (Gi === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Gi = t && t[1] || "";
  }
  return `
` + Gi + e;
}
var Qi = !1;
function Ki(e, t) {
  if (!e || Qi) return "";
  Qi = !0;
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
    Qi = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Wn(e) : "";
}
function bu(e) {
  switch (e.tag) {
    case 5:
      return Wn(e.type);
    case 16:
      return Wn("Lazy");
    case 13:
      return Wn("Suspense");
    case 19:
      return Wn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ki(e.type, !1), e;
    case 11:
      return e = Ki(e.type.render, !1), e;
    case 1:
      return e = Ki(e.type, !0), e;
    default:
      return "";
  }
}
function So(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Zt:
      return "Fragment";
    case Jt:
      return "Portal";
    case ko:
      return "Profiler";
    case zl:
      return "StrictMode";
    case bo:
      return "Suspense";
    case jo:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Ba:
      return (e.displayName || "Context") + ".Consumer";
    case Ha:
      return (e._context.displayName || "Context") + ".Provider";
    case Tl:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Rl:
      return t = e.displayName || null, t !== null ? t : So(e.type) || "Memo";
    case ht:
      t = e._payload, e = e._init;
      try {
        return So(e(t));
      } catch {
      }
  }
  return null;
}
function ju(e) {
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
      return So(t);
    case 8:
      return t === zl ? "StrictMode" : "Mode";
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
function Rt(e) {
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
function Ua(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Su(e) {
  var t = Ua(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), i = "" + e[t];
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
function Cr(e) {
  e._valueTracker || (e._valueTracker = Su(e));
}
function Ga(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), i = "";
  return e && (i = Ua(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), !0) : !1;
}
function ni(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Co(e, t) {
  var n = t.checked;
  return X({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function bs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, i = t.checked != null ? t.checked : t.defaultChecked;
  n = Rt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: i, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Qa(e, t) {
  t = t.checked, t != null && Cl(e, "checked", t, !1);
}
function zo(e, t) {
  Qa(e, t);
  var n = Rt(t.value), i = t.type;
  if (n != null) i === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (i === "submit" || i === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? To(e, t.type, n) : t.hasOwnProperty("defaultValue") && To(e, t.type, Rt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function js(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var i = t.type;
    if (!(i !== "submit" && i !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function To(e, t, n) {
  (t !== "number" || ni(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Hn = Array.isArray;
function un(e, t, n, i) {
  if (e = e.options, t) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++) o = t.hasOwnProperty("$" + e[n].value), e[n].selected !== o && (e[n].selected = o), o && i && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Rt(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        e[o].selected = !0, i && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ro(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(T(91));
  return X({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Ss(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(T(92));
      if (Hn(n)) {
        if (1 < n.length) throw Error(T(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Rt(n) };
}
function Ka(e, t) {
  var n = Rt(t.value), i = Rt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), i != null && (e.defaultValue = "" + i);
}
function Cs(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ya(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Io(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ya(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var zr, Xa = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, i, o) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, i, o);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (zr = zr || document.createElement("div"), zr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = zr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function tr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Un = {
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
}, Cu = ["Webkit", "ms", "Moz", "O"];
Object.keys(Un).forEach(function(e) {
  Cu.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Un[t] = Un[e];
  });
});
function qa(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Un.hasOwnProperty(e) && Un[e] ? ("" + t).trim() : t + "px";
}
function Ja(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var i = n.indexOf("--") === 0, o = qa(n, t[n], i);
    n === "float" && (n = "cssFloat"), i ? e.setProperty(n, o) : e[n] = o;
  }
}
var zu = X({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Mo(e, t) {
  if (t) {
    if (zu[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(T(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(T(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(T(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(T(62));
  }
}
function _o(e, t) {
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
var Po = null;
function Il(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Eo = null, fn = null, pn = null;
function zs(e) {
  if (e = wr(e)) {
    if (typeof Eo != "function") throw Error(T(280));
    var t = e.stateNode;
    t && (t = _i(t), Eo(e.stateNode, e.type, t));
  }
}
function Za(e) {
  fn ? pn ? pn.push(e) : pn = [e] : fn = e;
}
function ed() {
  if (fn) {
    var e = fn, t = pn;
    if (pn = fn = null, zs(e), t) for (e = 0; e < t.length; e++) zs(t[e]);
  }
}
function td(e, t) {
  return e(t);
}
function nd() {
}
var Yi = !1;
function rd(e, t, n) {
  if (Yi) return e(t, n);
  Yi = !0;
  try {
    return td(e, t, n);
  } finally {
    Yi = !1, (fn !== null || pn !== null) && (nd(), ed());
  }
}
function nr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var i = _i(n);
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
  if (n && typeof n != "function") throw Error(T(231, t, typeof n));
  return n;
}
var $o = !1;
if (lt) try {
  var _n = {};
  Object.defineProperty(_n, "passive", { get: function() {
    $o = !0;
  } }), window.addEventListener("test", _n, _n), window.removeEventListener("test", _n, _n);
} catch {
  $o = !1;
}
function Tu(e, t, n, i, o, l, s, a, d) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (f) {
    this.onError(f);
  }
}
var Gn = !1, ri = null, ii = !1, Fo = null, Ru = { onError: function(e) {
  Gn = !0, ri = e;
} };
function Iu(e, t, n, i, o, l, s, a, d) {
  Gn = !1, ri = null, Tu.apply(Ru, arguments);
}
function Mu(e, t, n, i, o, l, s, a, d) {
  if (Iu.apply(this, arguments), Gn) {
    if (Gn) {
      var c = ri;
      Gn = !1, ri = null;
    } else throw Error(T(198));
    ii || (ii = !0, Fo = c);
  }
}
function Xt(e) {
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
function id(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Ts(e) {
  if (Xt(e) !== e) throw Error(T(188));
}
function _u(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Xt(e), t === null) throw Error(T(188));
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
        if (l === n) return Ts(o), e;
        if (l === i) return Ts(o), t;
        l = l.sibling;
      }
      throw Error(T(188));
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
        if (!s) throw Error(T(189));
      }
    }
    if (n.alternate !== i) throw Error(T(190));
  }
  if (n.tag !== 3) throw Error(T(188));
  return n.stateNode.current === n ? e : t;
}
function od(e) {
  return e = _u(e), e !== null ? ld(e) : null;
}
function ld(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = ld(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var sd = _e.unstable_scheduleCallback, Rs = _e.unstable_cancelCallback, Pu = _e.unstable_shouldYield, Eu = _e.unstable_requestPaint, ee = _e.unstable_now, $u = _e.unstable_getCurrentPriorityLevel, Ml = _e.unstable_ImmediatePriority, ad = _e.unstable_UserBlockingPriority, oi = _e.unstable_NormalPriority, Fu = _e.unstable_LowPriority, dd = _e.unstable_IdlePriority, Ti = null, Ze = null;
function Du(e) {
  if (Ze && typeof Ze.onCommitFiberRoot == "function") try {
    Ze.onCommitFiberRoot(Ti, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ge = Math.clz32 ? Math.clz32 : Au, Nu = Math.log, Lu = Math.LN2;
function Au(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Nu(e) / Lu | 0) | 0;
}
var Tr = 64, Rr = 4194304;
function Bn(e) {
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
function li(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var i = 0, o = e.suspendedLanes, l = e.pingedLanes, s = n & 268435455;
  if (s !== 0) {
    var a = s & ~o;
    a !== 0 ? i = Bn(a) : (l &= s, l !== 0 && (i = Bn(l)));
  } else s = n & ~o, s !== 0 ? i = Bn(s) : l !== 0 && (i = Bn(l));
  if (i === 0) return 0;
  if (t !== 0 && t !== i && !(t & o) && (o = i & -i, l = t & -t, o >= l || o === 16 && (l & 4194240) !== 0)) return t;
  if (i & 4 && (i |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= i; 0 < t; ) n = 31 - Ge(t), o = 1 << n, i |= e[n], t &= ~o;
  return i;
}
function Ou(e, t) {
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
function Wu(e, t) {
  for (var n = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, l = e.pendingLanes; 0 < l; ) {
    var s = 31 - Ge(l), a = 1 << s, d = o[s];
    d === -1 ? (!(a & n) || a & i) && (o[s] = Ou(a, t)) : d <= t && (e.expiredLanes |= a), l &= ~a;
  }
}
function Do(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function cd() {
  var e = Tr;
  return Tr <<= 1, !(Tr & 4194240) && (Tr = 64), e;
}
function Xi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function xr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ge(t), e[t] = n;
}
function Hu(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var i = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - Ge(n), l = 1 << o;
    t[o] = 0, i[o] = -1, e[o] = -1, n &= ~l;
  }
}
function _l(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var i = 31 - Ge(n), o = 1 << i;
    o & t | e[i] & t && (e[i] |= t), n &= ~o;
  }
}
var W = 0;
function ud(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var fd, Pl, pd, hd, gd, No = !1, Ir = [], wt = null, kt = null, bt = null, rr = /* @__PURE__ */ new Map(), ir = /* @__PURE__ */ new Map(), mt = [], Bu = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Is(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      wt = null;
      break;
    case "dragenter":
    case "dragleave":
      kt = null;
      break;
    case "mouseover":
    case "mouseout":
      bt = null;
      break;
    case "pointerover":
    case "pointerout":
      rr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ir.delete(t.pointerId);
  }
}
function Pn(e, t, n, i, o, l) {
  return e === null || e.nativeEvent !== l ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: i, nativeEvent: l, targetContainers: [o] }, t !== null && (t = wr(t), t !== null && Pl(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
}
function Vu(e, t, n, i, o) {
  switch (t) {
    case "focusin":
      return wt = Pn(wt, e, t, n, i, o), !0;
    case "dragenter":
      return kt = Pn(kt, e, t, n, i, o), !0;
    case "mouseover":
      return bt = Pn(bt, e, t, n, i, o), !0;
    case "pointerover":
      var l = o.pointerId;
      return rr.set(l, Pn(rr.get(l) || null, e, t, n, i, o)), !0;
    case "gotpointercapture":
      return l = o.pointerId, ir.set(l, Pn(ir.get(l) || null, e, t, n, i, o)), !0;
  }
  return !1;
}
function md(e) {
  var t = Lt(e.target);
  if (t !== null) {
    var n = Xt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = id(n), t !== null) {
          e.blockedOn = t, gd(e.priority, function() {
            pd(n);
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
function Ur(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Lo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var i = new n.constructor(n.type, n);
      Po = i, n.target.dispatchEvent(i), Po = null;
    } else return t = wr(n), t !== null && Pl(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Ms(e, t, n) {
  Ur(e) && n.delete(t);
}
function Uu() {
  No = !1, wt !== null && Ur(wt) && (wt = null), kt !== null && Ur(kt) && (kt = null), bt !== null && Ur(bt) && (bt = null), rr.forEach(Ms), ir.forEach(Ms);
}
function En(e, t) {
  e.blockedOn === t && (e.blockedOn = null, No || (No = !0, _e.unstable_scheduleCallback(_e.unstable_NormalPriority, Uu)));
}
function or(e) {
  function t(o) {
    return En(o, e);
  }
  if (0 < Ir.length) {
    En(Ir[0], e);
    for (var n = 1; n < Ir.length; n++) {
      var i = Ir[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
  }
  for (wt !== null && En(wt, e), kt !== null && En(kt, e), bt !== null && En(bt, e), rr.forEach(t), ir.forEach(t), n = 0; n < mt.length; n++) i = mt[n], i.blockedOn === e && (i.blockedOn = null);
  for (; 0 < mt.length && (n = mt[0], n.blockedOn === null); ) md(n), n.blockedOn === null && mt.shift();
}
var hn = ct.ReactCurrentBatchConfig, si = !0;
function Gu(e, t, n, i) {
  var o = W, l = hn.transition;
  hn.transition = null;
  try {
    W = 1, El(e, t, n, i);
  } finally {
    W = o, hn.transition = l;
  }
}
function Qu(e, t, n, i) {
  var o = W, l = hn.transition;
  hn.transition = null;
  try {
    W = 4, El(e, t, n, i);
  } finally {
    W = o, hn.transition = l;
  }
}
function El(e, t, n, i) {
  if (si) {
    var o = Lo(e, t, n, i);
    if (o === null) lo(e, t, i, ai, n), Is(e, i);
    else if (Vu(o, e, t, n, i)) i.stopPropagation();
    else if (Is(e, i), t & 4 && -1 < Bu.indexOf(e)) {
      for (; o !== null; ) {
        var l = wr(o);
        if (l !== null && fd(l), l = Lo(e, t, n, i), l === null && lo(e, t, i, ai, n), l === o) break;
        o = l;
      }
      o !== null && i.stopPropagation();
    } else lo(e, t, i, null, n);
  }
}
var ai = null;
function Lo(e, t, n, i) {
  if (ai = null, e = Il(i), e = Lt(e), e !== null) if (t = Xt(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = id(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return ai = e, null;
}
function yd(e) {
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
      switch ($u()) {
        case Ml:
          return 1;
        case ad:
          return 4;
        case oi:
        case Fu:
          return 16;
        case dd:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var xt = null, $l = null, Gr = null;
function xd() {
  if (Gr) return Gr;
  var e, t = $l, n = t.length, i, o = "value" in xt ? xt.value : xt.textContent, l = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++) ;
  var s = n - e;
  for (i = 1; i <= s && t[n - i] === o[l - i]; i++) ;
  return Gr = o.slice(e, 1 < i ? 1 - i : void 0);
}
function Qr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Mr() {
  return !0;
}
function _s() {
  return !1;
}
function Ee(e) {
  function t(n, i, o, l, s) {
    this._reactName = n, this._targetInst = o, this.type = i, this.nativeEvent = l, this.target = s, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(l) : l[a]);
    return this.isDefaultPrevented = (l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1) ? Mr : _s, this.isPropagationStopped = _s, this;
  }
  return X(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Mr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Mr);
  }, persist: function() {
  }, isPersistent: Mr }), t;
}
var zn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Fl = Ee(zn), vr = X({}, zn, { view: 0, detail: 0 }), Ku = Ee(vr), qi, Ji, $n, Ri = X({}, vr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Dl, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== $n && ($n && e.type === "mousemove" ? (qi = e.screenX - $n.screenX, Ji = e.screenY - $n.screenY) : Ji = qi = 0, $n = e), qi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ji;
} }), Ps = Ee(Ri), Yu = X({}, Ri, { dataTransfer: 0 }), Xu = Ee(Yu), qu = X({}, vr, { relatedTarget: 0 }), Zi = Ee(qu), Ju = X({}, zn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Zu = Ee(Ju), ef = X({}, zn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), tf = Ee(ef), nf = X({}, zn, { data: 0 }), Es = Ee(nf), rf = {
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
}, of = {
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
}, lf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function sf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = lf[e]) ? !!t[e] : !1;
}
function Dl() {
  return sf;
}
var af = X({}, vr, { key: function(e) {
  if (e.key) {
    var t = rf[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Qr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? of[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Dl, charCode: function(e) {
  return e.type === "keypress" ? Qr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Qr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), df = Ee(af), cf = X({}, Ri, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), $s = Ee(cf), uf = X({}, vr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Dl }), ff = Ee(uf), pf = X({}, zn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), hf = Ee(pf), gf = X({}, Ri, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), mf = Ee(gf), yf = [9, 13, 27, 32], Nl = lt && "CompositionEvent" in window, Qn = null;
lt && "documentMode" in document && (Qn = document.documentMode);
var xf = lt && "TextEvent" in window && !Qn, vd = lt && (!Nl || Qn && 8 < Qn && 11 >= Qn), Fs = " ", Ds = !1;
function wd(e, t) {
  switch (e) {
    case "keyup":
      return yf.indexOf(t.keyCode) !== -1;
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
function kd(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var en = !1;
function vf(e, t) {
  switch (e) {
    case "compositionend":
      return kd(t);
    case "keypress":
      return t.which !== 32 ? null : (Ds = !0, Fs);
    case "textInput":
      return e = t.data, e === Fs && Ds ? null : e;
    default:
      return null;
  }
}
function wf(e, t) {
  if (en) return e === "compositionend" || !Nl && wd(e, t) ? (e = xd(), Gr = $l = xt = null, en = !1, e) : null;
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
      return vd && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var kf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Ns(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!kf[e.type] : t === "textarea";
}
function bd(e, t, n, i) {
  Za(i), t = di(t, "onChange"), 0 < t.length && (n = new Fl("onChange", "change", null, n, i), e.push({ event: n, listeners: t }));
}
var Kn = null, lr = null;
function bf(e) {
  Ed(e, 0);
}
function Ii(e) {
  var t = rn(e);
  if (Ga(t)) return e;
}
function jf(e, t) {
  if (e === "change") return t;
}
var jd = !1;
if (lt) {
  var eo;
  if (lt) {
    var to = "oninput" in document;
    if (!to) {
      var Ls = document.createElement("div");
      Ls.setAttribute("oninput", "return;"), to = typeof Ls.oninput == "function";
    }
    eo = to;
  } else eo = !1;
  jd = eo && (!document.documentMode || 9 < document.documentMode);
}
function As() {
  Kn && (Kn.detachEvent("onpropertychange", Sd), lr = Kn = null);
}
function Sd(e) {
  if (e.propertyName === "value" && Ii(lr)) {
    var t = [];
    bd(t, lr, e, Il(e)), rd(bf, t);
  }
}
function Sf(e, t, n) {
  e === "focusin" ? (As(), Kn = t, lr = n, Kn.attachEvent("onpropertychange", Sd)) : e === "focusout" && As();
}
function Cf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ii(lr);
}
function zf(e, t) {
  if (e === "click") return Ii(t);
}
function Tf(e, t) {
  if (e === "input" || e === "change") return Ii(t);
}
function Rf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ke = typeof Object.is == "function" ? Object.is : Rf;
function sr(e, t) {
  if (Ke(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), i = Object.keys(t);
  if (n.length !== i.length) return !1;
  for (i = 0; i < n.length; i++) {
    var o = n[i];
    if (!wo.call(t, o) || !Ke(e[o], t[o])) return !1;
  }
  return !0;
}
function Os(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ws(e, t) {
  var n = Os(e);
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
    n = Os(n);
  }
}
function Cd(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Cd(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function zd() {
  for (var e = window, t = ni(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = ni(e.document);
  }
  return t;
}
function Ll(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function If(e) {
  var t = zd(), n = e.focusedElem, i = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Cd(n.ownerDocument.documentElement, n)) {
    if (i !== null && Ll(n)) {
      if (t = i.start, e = i.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var o = n.textContent.length, l = Math.min(i.start, o);
        i = i.end === void 0 ? l : Math.min(i.end, o), !e.extend && l > i && (o = i, i = l, l = o), o = Ws(n, l);
        var s = Ws(
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
var Mf = lt && "documentMode" in document && 11 >= document.documentMode, tn = null, Ao = null, Yn = null, Oo = !1;
function Hs(e, t, n) {
  var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Oo || tn == null || tn !== ni(i) || (i = tn, "selectionStart" in i && Ll(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = { anchorNode: i.anchorNode, anchorOffset: i.anchorOffset, focusNode: i.focusNode, focusOffset: i.focusOffset }), Yn && sr(Yn, i) || (Yn = i, i = di(Ao, "onSelect"), 0 < i.length && (t = new Fl("onSelect", "select", null, t, n), e.push({ event: t, listeners: i }), t.target = tn)));
}
function _r(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var nn = { animationend: _r("Animation", "AnimationEnd"), animationiteration: _r("Animation", "AnimationIteration"), animationstart: _r("Animation", "AnimationStart"), transitionend: _r("Transition", "TransitionEnd") }, no = {}, Td = {};
lt && (Td = document.createElement("div").style, "AnimationEvent" in window || (delete nn.animationend.animation, delete nn.animationiteration.animation, delete nn.animationstart.animation), "TransitionEvent" in window || delete nn.transitionend.transition);
function Mi(e) {
  if (no[e]) return no[e];
  if (!nn[e]) return e;
  var t = nn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Td) return no[e] = t[n];
  return e;
}
var Rd = Mi("animationend"), Id = Mi("animationiteration"), Md = Mi("animationstart"), _d = Mi("transitionend"), Pd = /* @__PURE__ */ new Map(), Bs = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Mt(e, t) {
  Pd.set(e, t), Yt(t, [e]);
}
for (var ro = 0; ro < Bs.length; ro++) {
  var io = Bs[ro], _f = io.toLowerCase(), Pf = io[0].toUpperCase() + io.slice(1);
  Mt(_f, "on" + Pf);
}
Mt(Rd, "onAnimationEnd");
Mt(Id, "onAnimationIteration");
Mt(Md, "onAnimationStart");
Mt("dblclick", "onDoubleClick");
Mt("focusin", "onFocus");
Mt("focusout", "onBlur");
Mt(_d, "onTransitionEnd");
yn("onMouseEnter", ["mouseout", "mouseover"]);
yn("onMouseLeave", ["mouseout", "mouseover"]);
yn("onPointerEnter", ["pointerout", "pointerover"]);
yn("onPointerLeave", ["pointerout", "pointerover"]);
Yt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Yt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Yt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Yt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Yt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Yt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Vn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ef = new Set("cancel close invalid load scroll toggle".split(" ").concat(Vn));
function Vs(e, t, n) {
  var i = e.type || "unknown-event";
  e.currentTarget = n, Mu(i, t, void 0, e), e.currentTarget = null;
}
function Ed(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var i = e[n], o = i.event;
    i = i.listeners;
    e: {
      var l = void 0;
      if (t) for (var s = i.length - 1; 0 <= s; s--) {
        var a = i[s], d = a.instance, c = a.currentTarget;
        if (a = a.listener, d !== l && o.isPropagationStopped()) break e;
        Vs(o, a, c), l = d;
      }
      else for (s = 0; s < i.length; s++) {
        if (a = i[s], d = a.instance, c = a.currentTarget, a = a.listener, d !== l && o.isPropagationStopped()) break e;
        Vs(o, a, c), l = d;
      }
    }
  }
  if (ii) throw e = Fo, ii = !1, Fo = null, e;
}
function V(e, t) {
  var n = t[Uo];
  n === void 0 && (n = t[Uo] = /* @__PURE__ */ new Set());
  var i = e + "__bubble";
  n.has(i) || ($d(t, e, 2, !1), n.add(i));
}
function oo(e, t, n) {
  var i = 0;
  t && (i |= 4), $d(n, e, i, t);
}
var Pr = "_reactListening" + Math.random().toString(36).slice(2);
function ar(e) {
  if (!e[Pr]) {
    e[Pr] = !0, Wa.forEach(function(n) {
      n !== "selectionchange" && (Ef.has(n) || oo(n, !1, e), oo(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Pr] || (t[Pr] = !0, oo("selectionchange", !1, t));
  }
}
function $d(e, t, n, i) {
  switch (yd(t)) {
    case 1:
      var o = Gu;
      break;
    case 4:
      o = Qu;
      break;
    default:
      o = El;
  }
  n = o.bind(null, t, n, e), o = void 0, !$o || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), i ? o !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: o }) : e.addEventListener(t, n, !0) : o !== void 0 ? e.addEventListener(t, n, { passive: o }) : e.addEventListener(t, n, !1);
}
function lo(e, t, n, i, o) {
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
        if (s = Lt(a), s === null) return;
        if (d = s.tag, d === 5 || d === 6) {
          i = l = s;
          continue e;
        }
        a = a.parentNode;
      }
    }
    i = i.return;
  }
  rd(function() {
    var c = l, f = Il(n), u = [];
    e: {
      var h = Pd.get(e);
      if (h !== void 0) {
        var v = Fl, w = e;
        switch (e) {
          case "keypress":
            if (Qr(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = df;
            break;
          case "focusin":
            w = "focus", v = Zi;
            break;
          case "focusout":
            w = "blur", v = Zi;
            break;
          case "beforeblur":
          case "afterblur":
            v = Zi;
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
            v = Ps;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Xu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = ff;
            break;
          case Rd:
          case Id:
          case Md:
            v = Zu;
            break;
          case _d:
            v = hf;
            break;
          case "scroll":
            v = Ku;
            break;
          case "wheel":
            v = mf;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = tf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = $s;
        }
        var p = (t & 4) !== 0, b = !p && e === "scroll", m = p ? h !== null ? h + "Capture" : null : h;
        p = [];
        for (var g = c, y; g !== null; ) {
          y = g;
          var x = y.stateNode;
          if (y.tag === 5 && x !== null && (y = x, m !== null && (x = nr(g, m), x != null && p.push(dr(g, x, y)))), b) break;
          g = g.return;
        }
        0 < p.length && (h = new v(h, w, null, n, f), u.push({ event: h, listeners: p }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", h && n !== Po && (w = n.relatedTarget || n.fromElement) && (Lt(w) || w[st])) break e;
        if ((v || h) && (h = f.window === f ? f : (h = f.ownerDocument) ? h.defaultView || h.parentWindow : window, v ? (w = n.relatedTarget || n.toElement, v = c, w = w ? Lt(w) : null, w !== null && (b = Xt(w), w !== b || w.tag !== 5 && w.tag !== 6) && (w = null)) : (v = null, w = c), v !== w)) {
          if (p = Ps, x = "onMouseLeave", m = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (p = $s, x = "onPointerLeave", m = "onPointerEnter", g = "pointer"), b = v == null ? h : rn(v), y = w == null ? h : rn(w), h = new p(x, g + "leave", v, n, f), h.target = b, h.relatedTarget = y, x = null, Lt(f) === c && (p = new p(m, g + "enter", w, n, f), p.target = y, p.relatedTarget = b, x = p), b = x, v && w) t: {
            for (p = v, m = w, g = 0, y = p; y; y = qt(y)) g++;
            for (y = 0, x = m; x; x = qt(x)) y++;
            for (; 0 < g - y; ) p = qt(p), g--;
            for (; 0 < y - g; ) m = qt(m), y--;
            for (; g--; ) {
              if (p === m || m !== null && p === m.alternate) break t;
              p = qt(p), m = qt(m);
            }
            p = null;
          }
          else p = null;
          v !== null && Us(u, h, v, p, !1), w !== null && b !== null && Us(u, b, w, p, !0);
        }
      }
      e: {
        if (h = c ? rn(c) : window, v = h.nodeName && h.nodeName.toLowerCase(), v === "select" || v === "input" && h.type === "file") var k = jf;
        else if (Ns(h)) if (jd) k = Tf;
        else {
          k = Cf;
          var j = Sf;
        }
        else (v = h.nodeName) && v.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (k = zf);
        if (k && (k = k(e, c))) {
          bd(u, k, n, f);
          break e;
        }
        j && j(e, h, c), e === "focusout" && (j = h._wrapperState) && j.controlled && h.type === "number" && To(h, "number", h.value);
      }
      switch (j = c ? rn(c) : window, e) {
        case "focusin":
          (Ns(j) || j.contentEditable === "true") && (tn = j, Ao = c, Yn = null);
          break;
        case "focusout":
          Yn = Ao = tn = null;
          break;
        case "mousedown":
          Oo = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Oo = !1, Hs(u, n, f);
          break;
        case "selectionchange":
          if (Mf) break;
        case "keydown":
        case "keyup":
          Hs(u, n, f);
      }
      var S;
      if (Nl) e: {
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
      else en ? wd(e, n) && (C = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (C = "onCompositionStart");
      C && (vd && n.locale !== "ko" && (en || C !== "onCompositionStart" ? C === "onCompositionEnd" && en && (S = xd()) : (xt = f, $l = "value" in xt ? xt.value : xt.textContent, en = !0)), j = di(c, C), 0 < j.length && (C = new Es(C, e, null, n, f), u.push({ event: C, listeners: j }), S ? C.data = S : (S = kd(n), S !== null && (C.data = S)))), (S = xf ? vf(e, n) : wf(e, n)) && (c = di(c, "onBeforeInput"), 0 < c.length && (f = new Es("onBeforeInput", "beforeinput", null, n, f), u.push({ event: f, listeners: c }), f.data = S));
    }
    Ed(u, t);
  });
}
function dr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function di(e, t) {
  for (var n = t + "Capture", i = []; e !== null; ) {
    var o = e, l = o.stateNode;
    o.tag === 5 && l !== null && (o = l, l = nr(e, n), l != null && i.unshift(dr(e, l, o)), l = nr(e, t), l != null && i.push(dr(e, l, o))), e = e.return;
  }
  return i;
}
function qt(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Us(e, t, n, i, o) {
  for (var l = t._reactName, s = []; n !== null && n !== i; ) {
    var a = n, d = a.alternate, c = a.stateNode;
    if (d !== null && d === i) break;
    a.tag === 5 && c !== null && (a = c, o ? (d = nr(n, l), d != null && s.unshift(dr(n, d, a))) : o || (d = nr(n, l), d != null && s.push(dr(n, d, a)))), n = n.return;
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var $f = /\r\n?/g, Ff = /\u0000|\uFFFD/g;
function Gs(e) {
  return (typeof e == "string" ? e : "" + e).replace($f, `
`).replace(Ff, "");
}
function Er(e, t, n) {
  if (t = Gs(t), Gs(e) !== t && n) throw Error(T(425));
}
function ci() {
}
var Wo = null, Ho = null;
function Bo(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Vo = typeof setTimeout == "function" ? setTimeout : void 0, Df = typeof clearTimeout == "function" ? clearTimeout : void 0, Qs = typeof Promise == "function" ? Promise : void 0, Nf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Qs < "u" ? function(e) {
  return Qs.resolve(null).then(e).catch(Lf);
} : Vo;
function Lf(e) {
  setTimeout(function() {
    throw e;
  });
}
function so(e, t) {
  var n = t, i = 0;
  do {
    var o = n.nextSibling;
    if (e.removeChild(n), o && o.nodeType === 8) if (n = o.data, n === "/$") {
      if (i === 0) {
        e.removeChild(o), or(t);
        return;
      }
      i--;
    } else n !== "$" && n !== "$?" && n !== "$!" || i++;
    n = o;
  } while (n);
  or(t);
}
function jt(e) {
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
function Ks(e) {
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
var Tn = Math.random().toString(36).slice(2), qe = "__reactFiber$" + Tn, cr = "__reactProps$" + Tn, st = "__reactContainer$" + Tn, Uo = "__reactEvents$" + Tn, Af = "__reactListeners$" + Tn, Of = "__reactHandles$" + Tn;
function Lt(e) {
  var t = e[qe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[st] || n[qe]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ks(e); e !== null; ) {
        if (n = e[qe]) return n;
        e = Ks(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function wr(e) {
  return e = e[qe] || e[st], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function rn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(T(33));
}
function _i(e) {
  return e[cr] || null;
}
var Go = [], on = -1;
function _t(e) {
  return { current: e };
}
function U(e) {
  0 > on || (e.current = Go[on], Go[on] = null, on--);
}
function H(e, t) {
  on++, Go[on] = e.current, e.current = t;
}
var It = {}, ge = _t(It), je = _t(!1), Bt = It;
function xn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return It;
  var i = e.stateNode;
  if (i && i.__reactInternalMemoizedUnmaskedChildContext === t) return i.__reactInternalMemoizedMaskedChildContext;
  var o = {}, l;
  for (l in n) o[l] = t[l];
  return i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = o), o;
}
function Se(e) {
  return e = e.childContextTypes, e != null;
}
function ui() {
  U(je), U(ge);
}
function Ys(e, t, n) {
  if (ge.current !== It) throw Error(T(168));
  H(ge, t), H(je, n);
}
function Fd(e, t, n) {
  var i = e.stateNode;
  if (t = t.childContextTypes, typeof i.getChildContext != "function") return n;
  i = i.getChildContext();
  for (var o in i) if (!(o in t)) throw Error(T(108, ju(e) || "Unknown", o));
  return X({}, n, i);
}
function fi(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || It, Bt = ge.current, H(ge, e), H(je, je.current), !0;
}
function Xs(e, t, n) {
  var i = e.stateNode;
  if (!i) throw Error(T(169));
  n ? (e = Fd(e, t, Bt), i.__reactInternalMemoizedMergedChildContext = e, U(je), U(ge), H(ge, e)) : U(je), H(je, n);
}
var nt = null, Pi = !1, ao = !1;
function Dd(e) {
  nt === null ? nt = [e] : nt.push(e);
}
function Wf(e) {
  Pi = !0, Dd(e);
}
function Pt() {
  if (!ao && nt !== null) {
    ao = !0;
    var e = 0, t = W;
    try {
      var n = nt;
      for (W = 1; e < n.length; e++) {
        var i = n[e];
        do
          i = i(!0);
        while (i !== null);
      }
      nt = null, Pi = !1;
    } catch (o) {
      throw nt !== null && (nt = nt.slice(e + 1)), sd(Ml, Pt), o;
    } finally {
      W = t, ao = !1;
    }
  }
  return null;
}
var ln = [], sn = 0, pi = null, hi = 0, Fe = [], De = 0, Vt = null, rt = 1, it = "";
function Ft(e, t) {
  ln[sn++] = hi, ln[sn++] = pi, pi = e, hi = t;
}
function Nd(e, t, n) {
  Fe[De++] = rt, Fe[De++] = it, Fe[De++] = Vt, Vt = e;
  var i = rt;
  e = it;
  var o = 32 - Ge(i) - 1;
  i &= ~(1 << o), n += 1;
  var l = 32 - Ge(t) + o;
  if (30 < l) {
    var s = o - o % 5;
    l = (i & (1 << s) - 1).toString(32), i >>= s, o -= s, rt = 1 << 32 - Ge(t) + o | n << o | i, it = l + e;
  } else rt = 1 << l | n << o | i, it = e;
}
function Al(e) {
  e.return !== null && (Ft(e, 1), Nd(e, 1, 0));
}
function Ol(e) {
  for (; e === pi; ) pi = ln[--sn], ln[sn] = null, hi = ln[--sn], ln[sn] = null;
  for (; e === Vt; ) Vt = Fe[--De], Fe[De] = null, it = Fe[--De], Fe[De] = null, rt = Fe[--De], Fe[De] = null;
}
var Me = null, Ie = null, G = !1, Ue = null;
function Ld(e, t) {
  var n = Ne(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function qs(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Me = e, Ie = jt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Me = e, Ie = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Vt !== null ? { id: rt, overflow: it } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ne(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Me = e, Ie = null, !0) : !1;
    default:
      return !1;
  }
}
function Qo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ko(e) {
  if (G) {
    var t = Ie;
    if (t) {
      var n = t;
      if (!qs(e, t)) {
        if (Qo(e)) throw Error(T(418));
        t = jt(n.nextSibling);
        var i = Me;
        t && qs(e, t) ? Ld(i, n) : (e.flags = e.flags & -4097 | 2, G = !1, Me = e);
      }
    } else {
      if (Qo(e)) throw Error(T(418));
      e.flags = e.flags & -4097 | 2, G = !1, Me = e;
    }
  }
}
function Js(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Me = e;
}
function $r(e) {
  if (e !== Me) return !1;
  if (!G) return Js(e), G = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Bo(e.type, e.memoizedProps)), t && (t = Ie)) {
    if (Qo(e)) throw Ad(), Error(T(418));
    for (; t; ) Ld(e, t), t = jt(t.nextSibling);
  }
  if (Js(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(T(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ie = jt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Ie = null;
    }
  } else Ie = Me ? jt(e.stateNode.nextSibling) : null;
  return !0;
}
function Ad() {
  for (var e = Ie; e; ) e = jt(e.nextSibling);
}
function vn() {
  Ie = Me = null, G = !1;
}
function Wl(e) {
  Ue === null ? Ue = [e] : Ue.push(e);
}
var Hf = ct.ReactCurrentBatchConfig;
function Fn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(T(309));
        var i = n.stateNode;
      }
      if (!i) throw Error(T(147, e));
      var o = i, l = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === l ? t.ref : (t = function(s) {
        var a = o.refs;
        s === null ? delete a[l] : a[l] = s;
      }, t._stringRef = l, t);
    }
    if (typeof e != "string") throw Error(T(284));
    if (!n._owner) throw Error(T(290, e));
  }
  return e;
}
function Fr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(T(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Zs(e) {
  var t = e._init;
  return t(e._payload);
}
function Od(e) {
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
    return m = Tt(m, g), m.index = 0, m.sibling = null, m;
  }
  function l(m, g, y) {
    return m.index = y, e ? (y = m.alternate, y !== null ? (y = y.index, y < g ? (m.flags |= 2, g) : y) : (m.flags |= 2, g)) : (m.flags |= 1048576, g);
  }
  function s(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function a(m, g, y, x) {
    return g === null || g.tag !== 6 ? (g = mo(y, m.mode, x), g.return = m, g) : (g = o(g, y), g.return = m, g);
  }
  function d(m, g, y, x) {
    var k = y.type;
    return k === Zt ? f(m, g, y.props.children, x, y.key) : g !== null && (g.elementType === k || typeof k == "object" && k !== null && k.$$typeof === ht && Zs(k) === g.type) ? (x = o(g, y.props), x.ref = Fn(m, g, y), x.return = m, x) : (x = ei(y.type, y.key, y.props, null, m.mode, x), x.ref = Fn(m, g, y), x.return = m, x);
  }
  function c(m, g, y, x) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== y.containerInfo || g.stateNode.implementation !== y.implementation ? (g = yo(y, m.mode, x), g.return = m, g) : (g = o(g, y.children || []), g.return = m, g);
  }
  function f(m, g, y, x, k) {
    return g === null || g.tag !== 7 ? (g = Ht(y, m.mode, x, k), g.return = m, g) : (g = o(g, y), g.return = m, g);
  }
  function u(m, g, y) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return g = mo("" + g, m.mode, y), g.return = m, g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Sr:
          return y = ei(g.type, g.key, g.props, null, m.mode, y), y.ref = Fn(m, null, g), y.return = m, y;
        case Jt:
          return g = yo(g, m.mode, y), g.return = m, g;
        case ht:
          var x = g._init;
          return u(m, x(g._payload), y);
      }
      if (Hn(g) || Mn(g)) return g = Ht(g, m.mode, y, null), g.return = m, g;
      Fr(m, g);
    }
    return null;
  }
  function h(m, g, y, x) {
    var k = g !== null ? g.key : null;
    if (typeof y == "string" && y !== "" || typeof y == "number") return k !== null ? null : a(m, g, "" + y, x);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Sr:
          return y.key === k ? d(m, g, y, x) : null;
        case Jt:
          return y.key === k ? c(m, g, y, x) : null;
        case ht:
          return k = y._init, h(
            m,
            g,
            k(y._payload),
            x
          );
      }
      if (Hn(y) || Mn(y)) return k !== null ? null : f(m, g, y, x, null);
      Fr(m, y);
    }
    return null;
  }
  function v(m, g, y, x, k) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return m = m.get(y) || null, a(g, m, "" + x, k);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Sr:
          return m = m.get(x.key === null ? y : x.key) || null, d(g, m, x, k);
        case Jt:
          return m = m.get(x.key === null ? y : x.key) || null, c(g, m, x, k);
        case ht:
          var j = x._init;
          return v(m, g, y, j(x._payload), k);
      }
      if (Hn(x) || Mn(x)) return m = m.get(y) || null, f(g, m, x, k, null);
      Fr(g, x);
    }
    return null;
  }
  function w(m, g, y, x) {
    for (var k = null, j = null, S = g, C = g = 0, _ = null; S !== null && C < y.length; C++) {
      S.index > C ? (_ = S, S = null) : _ = S.sibling;
      var z = h(m, S, y[C], x);
      if (z === null) {
        S === null && (S = _);
        break;
      }
      e && S && z.alternate === null && t(m, S), g = l(z, g, C), j === null ? k = z : j.sibling = z, j = z, S = _;
    }
    if (C === y.length) return n(m, S), G && Ft(m, C), k;
    if (S === null) {
      for (; C < y.length; C++) S = u(m, y[C], x), S !== null && (g = l(S, g, C), j === null ? k = S : j.sibling = S, j = S);
      return G && Ft(m, C), k;
    }
    for (S = i(m, S); C < y.length; C++) _ = v(S, m, C, y[C], x), _ !== null && (e && _.alternate !== null && S.delete(_.key === null ? C : _.key), g = l(_, g, C), j === null ? k = _ : j.sibling = _, j = _);
    return e && S.forEach(function(I) {
      return t(m, I);
    }), G && Ft(m, C), k;
  }
  function p(m, g, y, x) {
    var k = Mn(y);
    if (typeof k != "function") throw Error(T(150));
    if (y = k.call(y), y == null) throw Error(T(151));
    for (var j = k = null, S = g, C = g = 0, _ = null, z = y.next(); S !== null && !z.done; C++, z = y.next()) {
      S.index > C ? (_ = S, S = null) : _ = S.sibling;
      var I = h(m, S, z.value, x);
      if (I === null) {
        S === null && (S = _);
        break;
      }
      e && S && I.alternate === null && t(m, S), g = l(I, g, C), j === null ? k = I : j.sibling = I, j = I, S = _;
    }
    if (z.done) return n(
      m,
      S
    ), G && Ft(m, C), k;
    if (S === null) {
      for (; !z.done; C++, z = y.next()) z = u(m, z.value, x), z !== null && (g = l(z, g, C), j === null ? k = z : j.sibling = z, j = z);
      return G && Ft(m, C), k;
    }
    for (S = i(m, S); !z.done; C++, z = y.next()) z = v(S, m, C, z.value, x), z !== null && (e && z.alternate !== null && S.delete(z.key === null ? C : z.key), g = l(z, g, C), j === null ? k = z : j.sibling = z, j = z);
    return e && S.forEach(function(F) {
      return t(m, F);
    }), G && Ft(m, C), k;
  }
  function b(m, g, y, x) {
    if (typeof y == "object" && y !== null && y.type === Zt && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Sr:
          e: {
            for (var k = y.key, j = g; j !== null; ) {
              if (j.key === k) {
                if (k = y.type, k === Zt) {
                  if (j.tag === 7) {
                    n(m, j.sibling), g = o(j, y.props.children), g.return = m, m = g;
                    break e;
                  }
                } else if (j.elementType === k || typeof k == "object" && k !== null && k.$$typeof === ht && Zs(k) === j.type) {
                  n(m, j.sibling), g = o(j, y.props), g.ref = Fn(m, j, y), g.return = m, m = g;
                  break e;
                }
                n(m, j);
                break;
              } else t(m, j);
              j = j.sibling;
            }
            y.type === Zt ? (g = Ht(y.props.children, m.mode, x, y.key), g.return = m, m = g) : (x = ei(y.type, y.key, y.props, null, m.mode, x), x.ref = Fn(m, g, y), x.return = m, m = x);
          }
          return s(m);
        case Jt:
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
            g = yo(y, m.mode, x), g.return = m, m = g;
          }
          return s(m);
        case ht:
          return j = y._init, b(m, g, j(y._payload), x);
      }
      if (Hn(y)) return w(m, g, y, x);
      if (Mn(y)) return p(m, g, y, x);
      Fr(m, y);
    }
    return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, g !== null && g.tag === 6 ? (n(m, g.sibling), g = o(g, y), g.return = m, m = g) : (n(m, g), g = mo(y, m.mode, x), g.return = m, m = g), s(m)) : n(m, g);
  }
  return b;
}
var wn = Od(!0), Wd = Od(!1), gi = _t(null), mi = null, an = null, Hl = null;
function Bl() {
  Hl = an = mi = null;
}
function Vl(e) {
  var t = gi.current;
  U(gi), e._currentValue = t;
}
function Yo(e, t, n) {
  for (; e !== null; ) {
    var i = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function gn(e, t) {
  mi = e, Hl = an = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (be = !0), e.firstContext = null);
}
function Ae(e) {
  var t = e._currentValue;
  if (Hl !== e) if (e = { context: e, memoizedValue: t, next: null }, an === null) {
    if (mi === null) throw Error(T(308));
    an = e, mi.dependencies = { lanes: 0, firstContext: e };
  } else an = an.next = e;
  return t;
}
var At = null;
function Ul(e) {
  At === null ? At = [e] : At.push(e);
}
function Hd(e, t, n, i) {
  var o = t.interleaved;
  return o === null ? (n.next = n, Ul(t)) : (n.next = o.next, o.next = n), t.interleaved = n, at(e, i);
}
function at(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var gt = !1;
function Gl(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Bd(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function ot(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function St(e, t, n) {
  var i = e.updateQueue;
  if (i === null) return null;
  if (i = i.shared, O & 2) {
    var o = i.pending;
    return o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, at(e, n);
  }
  return o = i.interleaved, o === null ? (t.next = t, Ul(i)) : (t.next = o.next, o.next = t), i.interleaved = t, at(e, n);
}
function Kr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, _l(e, n);
  }
}
function ea(e, t) {
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
function yi(e, t, n, i) {
  var o = e.updateQueue;
  gt = !1;
  var l = o.firstBaseUpdate, s = o.lastBaseUpdate, a = o.shared.pending;
  if (a !== null) {
    o.shared.pending = null;
    var d = a, c = d.next;
    d.next = null, s === null ? l = c : s.next = c, s = d;
    var f = e.alternate;
    f !== null && (f = f.updateQueue, a = f.lastBaseUpdate, a !== s && (a === null ? f.firstBaseUpdate = c : a.next = c, f.lastBaseUpdate = d));
  }
  if (l !== null) {
    var u = o.baseState;
    s = 0, f = c = d = null, a = l;
    do {
      var h = a.lane, v = a.eventTime;
      if ((i & h) === h) {
        f !== null && (f = f.next = {
          eventTime: v,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var w = e, p = a;
          switch (h = t, v = n, p.tag) {
            case 1:
              if (w = p.payload, typeof w == "function") {
                u = w.call(v, u, h);
                break e;
              }
              u = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = p.payload, h = typeof w == "function" ? w.call(v, u, h) : w, h == null) break e;
              u = X({}, u, h);
              break e;
            case 2:
              gt = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = o.effects, h === null ? o.effects = [a] : h.push(a));
      } else v = { eventTime: v, lane: h, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, f === null ? (c = f = v, d = u) : f = f.next = v, s |= h;
      if (a = a.next, a === null) {
        if (a = o.shared.pending, a === null) break;
        h = a, a = h.next, h.next = null, o.lastBaseUpdate = h, o.shared.pending = null;
      }
    } while (!0);
    if (f === null && (d = u), o.baseState = d, o.firstBaseUpdate = c, o.lastBaseUpdate = f, t = o.shared.interleaved, t !== null) {
      o = t;
      do
        s |= o.lane, o = o.next;
      while (o !== t);
    } else l === null && (o.shared.lanes = 0);
    Gt |= s, e.lanes = s, e.memoizedState = u;
  }
}
function ta(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var i = e[t], o = i.callback;
    if (o !== null) {
      if (i.callback = null, i = n, typeof o != "function") throw Error(T(191, o));
      o.call(i);
    }
  }
}
var kr = {}, et = _t(kr), ur = _t(kr), fr = _t(kr);
function Ot(e) {
  if (e === kr) throw Error(T(174));
  return e;
}
function Ql(e, t) {
  switch (H(fr, t), H(ur, e), H(et, kr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Io(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Io(t, e);
  }
  U(et), H(et, t);
}
function kn() {
  U(et), U(ur), U(fr);
}
function Vd(e) {
  Ot(fr.current);
  var t = Ot(et.current), n = Io(t, e.type);
  t !== n && (H(ur, e), H(et, n));
}
function Kl(e) {
  ur.current === e && (U(et), U(ur));
}
var K = _t(0);
function xi(e) {
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
var co = [];
function Yl() {
  for (var e = 0; e < co.length; e++) co[e]._workInProgressVersionPrimary = null;
  co.length = 0;
}
var Yr = ct.ReactCurrentDispatcher, uo = ct.ReactCurrentBatchConfig, Ut = 0, Y = null, oe = null, se = null, vi = !1, Xn = !1, pr = 0, Bf = 0;
function fe() {
  throw Error(T(321));
}
function Xl(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ke(e[n], t[n])) return !1;
  return !0;
}
function ql(e, t, n, i, o, l) {
  if (Ut = l, Y = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Yr.current = e === null || e.memoizedState === null ? Qf : Kf, e = n(i, o), Xn) {
    l = 0;
    do {
      if (Xn = !1, pr = 0, 25 <= l) throw Error(T(301));
      l += 1, se = oe = null, t.updateQueue = null, Yr.current = Yf, e = n(i, o);
    } while (Xn);
  }
  if (Yr.current = wi, t = oe !== null && oe.next !== null, Ut = 0, se = oe = Y = null, vi = !1, t) throw Error(T(300));
  return e;
}
function Jl() {
  var e = pr !== 0;
  return pr = 0, e;
}
function Xe() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return se === null ? Y.memoizedState = se = e : se = se.next = e, se;
}
function Oe() {
  if (oe === null) {
    var e = Y.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = oe.next;
  var t = se === null ? Y.memoizedState : se.next;
  if (t !== null) se = t, oe = e;
  else {
    if (e === null) throw Error(T(310));
    oe = e, e = { memoizedState: oe.memoizedState, baseState: oe.baseState, baseQueue: oe.baseQueue, queue: oe.queue, next: null }, se === null ? Y.memoizedState = se = e : se = se.next = e;
  }
  return se;
}
function hr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function fo(e) {
  var t = Oe(), n = t.queue;
  if (n === null) throw Error(T(311));
  n.lastRenderedReducer = e;
  var i = oe, o = i.baseQueue, l = n.pending;
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
      var f = c.lane;
      if ((Ut & f) === f) d !== null && (d = d.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), i = c.hasEagerState ? c.eagerState : e(i, c.action);
      else {
        var u = {
          lane: f,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        d === null ? (a = d = u, s = i) : d = d.next = u, Y.lanes |= f, Gt |= f;
      }
      c = c.next;
    } while (c !== null && c !== l);
    d === null ? s = i : d.next = a, Ke(i, t.memoizedState) || (be = !0), t.memoizedState = i, t.baseState = s, t.baseQueue = d, n.lastRenderedState = i;
  }
  if (e = n.interleaved, e !== null) {
    o = e;
    do
      l = o.lane, Y.lanes |= l, Gt |= l, o = o.next;
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function po(e) {
  var t = Oe(), n = t.queue;
  if (n === null) throw Error(T(311));
  n.lastRenderedReducer = e;
  var i = n.dispatch, o = n.pending, l = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var s = o = o.next;
    do
      l = e(l, s.action), s = s.next;
    while (s !== o);
    Ke(l, t.memoizedState) || (be = !0), t.memoizedState = l, t.baseQueue === null && (t.baseState = l), n.lastRenderedState = l;
  }
  return [l, i];
}
function Ud() {
}
function Gd(e, t) {
  var n = Y, i = Oe(), o = t(), l = !Ke(i.memoizedState, o);
  if (l && (i.memoizedState = o, be = !0), i = i.queue, Zl(Yd.bind(null, n, i, e), [e]), i.getSnapshot !== t || l || se !== null && se.memoizedState.tag & 1) {
    if (n.flags |= 2048, gr(9, Kd.bind(null, n, i, o, t), void 0, null), ae === null) throw Error(T(349));
    Ut & 30 || Qd(n, t, o);
  }
  return o;
}
function Qd(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Y.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Y.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Kd(e, t, n, i) {
  t.value = n, t.getSnapshot = i, Xd(t) && qd(e);
}
function Yd(e, t, n) {
  return n(function() {
    Xd(t) && qd(e);
  });
}
function Xd(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ke(e, n);
  } catch {
    return !0;
  }
}
function qd(e) {
  var t = at(e, 1);
  t !== null && Qe(t, e, 1, -1);
}
function na(e) {
  var t = Xe();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: hr, lastRenderedState: e }, t.queue = e, e = e.dispatch = Gf.bind(null, Y, e), [t.memoizedState, e];
}
function gr(e, t, n, i) {
  return e = { tag: e, create: t, destroy: n, deps: i, next: null }, t = Y.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Y.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e)), e;
}
function Jd() {
  return Oe().memoizedState;
}
function Xr(e, t, n, i) {
  var o = Xe();
  Y.flags |= e, o.memoizedState = gr(1 | t, n, void 0, i === void 0 ? null : i);
}
function Ei(e, t, n, i) {
  var o = Oe();
  i = i === void 0 ? null : i;
  var l = void 0;
  if (oe !== null) {
    var s = oe.memoizedState;
    if (l = s.destroy, i !== null && Xl(i, s.deps)) {
      o.memoizedState = gr(t, n, l, i);
      return;
    }
  }
  Y.flags |= e, o.memoizedState = gr(1 | t, n, l, i);
}
function ra(e, t) {
  return Xr(8390656, 8, e, t);
}
function Zl(e, t) {
  return Ei(2048, 8, e, t);
}
function Zd(e, t) {
  return Ei(4, 2, e, t);
}
function ec(e, t) {
  return Ei(4, 4, e, t);
}
function tc(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function nc(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ei(4, 4, tc.bind(null, t, e), n);
}
function es() {
}
function rc(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && Xl(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
}
function ic(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && Xl(t, i[1]) ? i[0] : (e = e(), n.memoizedState = [e, t], e);
}
function oc(e, t, n) {
  return Ut & 21 ? (Ke(n, t) || (n = cd(), Y.lanes |= n, Gt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, be = !0), e.memoizedState = n);
}
function Vf(e, t) {
  var n = W;
  W = n !== 0 && 4 > n ? n : 4, e(!0);
  var i = uo.transition;
  uo.transition = {};
  try {
    e(!1), t();
  } finally {
    W = n, uo.transition = i;
  }
}
function lc() {
  return Oe().memoizedState;
}
function Uf(e, t, n) {
  var i = zt(e);
  if (n = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null }, sc(e)) ac(t, n);
  else if (n = Hd(e, t, n, i), n !== null) {
    var o = ye();
    Qe(n, e, i, o), dc(n, t, i);
  }
}
function Gf(e, t, n) {
  var i = zt(e), o = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (sc(e)) ac(t, o);
  else {
    var l = e.alternate;
    if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = t.lastRenderedReducer, l !== null)) try {
      var s = t.lastRenderedState, a = l(s, n);
      if (o.hasEagerState = !0, o.eagerState = a, Ke(a, s)) {
        var d = t.interleaved;
        d === null ? (o.next = o, Ul(t)) : (o.next = d.next, d.next = o), t.interleaved = o;
        return;
      }
    } catch {
    } finally {
    }
    n = Hd(e, t, o, i), n !== null && (o = ye(), Qe(n, e, i, o), dc(n, t, i));
  }
}
function sc(e) {
  var t = e.alternate;
  return e === Y || t !== null && t === Y;
}
function ac(e, t) {
  Xn = vi = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function dc(e, t, n) {
  if (n & 4194240) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, _l(e, n);
  }
}
var wi = { readContext: Ae, useCallback: fe, useContext: fe, useEffect: fe, useImperativeHandle: fe, useInsertionEffect: fe, useLayoutEffect: fe, useMemo: fe, useReducer: fe, useRef: fe, useState: fe, useDebugValue: fe, useDeferredValue: fe, useTransition: fe, useMutableSource: fe, useSyncExternalStore: fe, useId: fe, unstable_isNewReconciler: !1 }, Qf = { readContext: Ae, useCallback: function(e, t) {
  return Xe().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Ae, useEffect: ra, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Xr(
    4194308,
    4,
    tc.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Xr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Xr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Xe();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var i = Xe();
  return t = n !== void 0 ? n(t) : t, i.memoizedState = i.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, i.queue = e, e = e.dispatch = Uf.bind(null, Y, e), [i.memoizedState, e];
}, useRef: function(e) {
  var t = Xe();
  return e = { current: e }, t.memoizedState = e;
}, useState: na, useDebugValue: es, useDeferredValue: function(e) {
  return Xe().memoizedState = e;
}, useTransition: function() {
  var e = na(!1), t = e[0];
  return e = Vf.bind(null, e[1]), Xe().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var i = Y, o = Xe();
  if (G) {
    if (n === void 0) throw Error(T(407));
    n = n();
  } else {
    if (n = t(), ae === null) throw Error(T(349));
    Ut & 30 || Qd(i, t, n);
  }
  o.memoizedState = n;
  var l = { value: n, getSnapshot: t };
  return o.queue = l, ra(Yd.bind(
    null,
    i,
    l,
    e
  ), [e]), i.flags |= 2048, gr(9, Kd.bind(null, i, l, n, t), void 0, null), n;
}, useId: function() {
  var e = Xe(), t = ae.identifierPrefix;
  if (G) {
    var n = it, i = rt;
    n = (i & ~(1 << 32 - Ge(i) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = pr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Bf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Kf = {
  readContext: Ae,
  useCallback: rc,
  useContext: Ae,
  useEffect: Zl,
  useImperativeHandle: nc,
  useInsertionEffect: Zd,
  useLayoutEffect: ec,
  useMemo: ic,
  useReducer: fo,
  useRef: Jd,
  useState: function() {
    return fo(hr);
  },
  useDebugValue: es,
  useDeferredValue: function(e) {
    var t = Oe();
    return oc(t, oe.memoizedState, e);
  },
  useTransition: function() {
    var e = fo(hr)[0], t = Oe().memoizedState;
    return [e, t];
  },
  useMutableSource: Ud,
  useSyncExternalStore: Gd,
  useId: lc,
  unstable_isNewReconciler: !1
}, Yf = { readContext: Ae, useCallback: rc, useContext: Ae, useEffect: Zl, useImperativeHandle: nc, useInsertionEffect: Zd, useLayoutEffect: ec, useMemo: ic, useReducer: po, useRef: Jd, useState: function() {
  return po(hr);
}, useDebugValue: es, useDeferredValue: function(e) {
  var t = Oe();
  return oe === null ? t.memoizedState = e : oc(t, oe.memoizedState, e);
}, useTransition: function() {
  var e = po(hr)[0], t = Oe().memoizedState;
  return [e, t];
}, useMutableSource: Ud, useSyncExternalStore: Gd, useId: lc, unstable_isNewReconciler: !1 };
function Be(e, t) {
  if (e && e.defaultProps) {
    t = X({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Xo(e, t, n, i) {
  t = e.memoizedState, n = n(i, t), n = n == null ? t : X({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var $i = { isMounted: function(e) {
  return (e = e._reactInternals) ? Xt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var i = ye(), o = zt(e), l = ot(i, o);
  l.payload = t, n != null && (l.callback = n), t = St(e, l, o), t !== null && (Qe(t, e, o, i), Kr(t, e, o));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var i = ye(), o = zt(e), l = ot(i, o);
  l.tag = 1, l.payload = t, n != null && (l.callback = n), t = St(e, l, o), t !== null && (Qe(t, e, o, i), Kr(t, e, o));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ye(), i = zt(e), o = ot(n, i);
  o.tag = 2, t != null && (o.callback = t), t = St(e, o, i), t !== null && (Qe(t, e, i, n), Kr(t, e, i));
} };
function ia(e, t, n, i, o, l, s) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, l, s) : t.prototype && t.prototype.isPureReactComponent ? !sr(n, i) || !sr(o, l) : !0;
}
function cc(e, t, n) {
  var i = !1, o = It, l = t.contextType;
  return typeof l == "object" && l !== null ? l = Ae(l) : (o = Se(t) ? Bt : ge.current, i = t.contextTypes, l = (i = i != null) ? xn(e, o) : It), t = new t(n, l), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = $i, e.stateNode = t, t._reactInternals = e, i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = o, e.__reactInternalMemoizedMaskedChildContext = l), t;
}
function oa(e, t, n, i) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== e && $i.enqueueReplaceState(t, t.state, null);
}
function qo(e, t, n, i) {
  var o = e.stateNode;
  o.props = n, o.state = e.memoizedState, o.refs = {}, Gl(e);
  var l = t.contextType;
  typeof l == "object" && l !== null ? o.context = Ae(l) : (l = Se(t) ? Bt : ge.current, o.context = xn(e, l)), o.state = e.memoizedState, l = t.getDerivedStateFromProps, typeof l == "function" && (Xo(e, t, l, n), o.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (t = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), t !== o.state && $i.enqueueReplaceState(o, o.state, null), yi(e, n, o, i), o.state = e.memoizedState), typeof o.componentDidMount == "function" && (e.flags |= 4194308);
}
function bn(e, t) {
  try {
    var n = "", i = t;
    do
      n += bu(i), i = i.return;
    while (i);
    var o = n;
  } catch (l) {
    o = `
Error generating stack: ` + l.message + `
` + l.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function ho(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Jo(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Xf = typeof WeakMap == "function" ? WeakMap : Map;
function uc(e, t, n) {
  n = ot(-1, n), n.tag = 3, n.payload = { element: null };
  var i = t.value;
  return n.callback = function() {
    bi || (bi = !0, al = i), Jo(e, t);
  }, n;
}
function fc(e, t, n) {
  n = ot(-1, n), n.tag = 3;
  var i = e.type.getDerivedStateFromError;
  if (typeof i == "function") {
    var o = t.value;
    n.payload = function() {
      return i(o);
    }, n.callback = function() {
      Jo(e, t);
    };
  }
  var l = e.stateNode;
  return l !== null && typeof l.componentDidCatch == "function" && (n.callback = function() {
    Jo(e, t), typeof i != "function" && (Ct === null ? Ct = /* @__PURE__ */ new Set([this]) : Ct.add(this));
    var s = t.stack;
    this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
  }), n;
}
function la(e, t, n) {
  var i = e.pingCache;
  if (i === null) {
    i = e.pingCache = new Xf();
    var o = /* @__PURE__ */ new Set();
    i.set(t, o);
  } else o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
  o.has(n) || (o.add(n), e = cp.bind(null, e, t, n), t.then(e, e));
}
function sa(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function aa(e, t, n, i, o) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = o, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = ot(-1, 1), t.tag = 2, St(n, t, 1))), n.lanes |= 1), e);
}
var qf = ct.ReactCurrentOwner, be = !1;
function me(e, t, n, i) {
  t.child = e === null ? Wd(t, null, n, i) : wn(t, e.child, n, i);
}
function da(e, t, n, i, o) {
  n = n.render;
  var l = t.ref;
  return gn(t, o), i = ql(e, t, n, i, l, o), n = Jl(), e !== null && !be ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, dt(e, t, o)) : (G && n && Al(t), t.flags |= 1, me(e, t, i, o), t.child);
}
function ca(e, t, n, i, o) {
  if (e === null) {
    var l = n.type;
    return typeof l == "function" && !as(l) && l.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = l, pc(e, t, l, i, o)) : (e = ei(n.type, null, i, t, t.mode, o), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (l = e.child, !(e.lanes & o)) {
    var s = l.memoizedProps;
    if (n = n.compare, n = n !== null ? n : sr, n(s, i) && e.ref === t.ref) return dt(e, t, o);
  }
  return t.flags |= 1, e = Tt(l, i), e.ref = t.ref, e.return = t, t.child = e;
}
function pc(e, t, n, i, o) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (sr(l, i) && e.ref === t.ref) if (be = !1, t.pendingProps = i = l, (e.lanes & o) !== 0) e.flags & 131072 && (be = !0);
    else return t.lanes = e.lanes, dt(e, t, o);
  }
  return Zo(e, t, n, i, o);
}
function hc(e, t, n) {
  var i = t.pendingProps, o = i.children, l = e !== null ? e.memoizedState : null;
  if (i.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, H(cn, Re), Re |= n;
  else {
    if (!(n & 1073741824)) return e = l !== null ? l.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, H(cn, Re), Re |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, i = l !== null ? l.baseLanes : n, H(cn, Re), Re |= i;
  }
  else l !== null ? (i = l.baseLanes | n, t.memoizedState = null) : i = n, H(cn, Re), Re |= i;
  return me(e, t, o, n), t.child;
}
function gc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Zo(e, t, n, i, o) {
  var l = Se(n) ? Bt : ge.current;
  return l = xn(t, l), gn(t, o), n = ql(e, t, n, i, l, o), i = Jl(), e !== null && !be ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, dt(e, t, o)) : (G && i && Al(t), t.flags |= 1, me(e, t, n, o), t.child);
}
function ua(e, t, n, i, o) {
  if (Se(n)) {
    var l = !0;
    fi(t);
  } else l = !1;
  if (gn(t, o), t.stateNode === null) qr(e, t), cc(t, n, i), qo(t, n, i, o), i = !0;
  else if (e === null) {
    var s = t.stateNode, a = t.memoizedProps;
    s.props = a;
    var d = s.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Ae(c) : (c = Se(n) ? Bt : ge.current, c = xn(t, c));
    var f = n.getDerivedStateFromProps, u = typeof f == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    u || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== i || d !== c) && oa(t, s, i, c), gt = !1;
    var h = t.memoizedState;
    s.state = h, yi(t, i, s, o), d = t.memoizedState, a !== i || h !== d || je.current || gt ? (typeof f == "function" && (Xo(t, n, f, i), d = t.memoizedState), (a = gt || ia(t, n, a, i, h, d, c)) ? (u || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = d), s.props = i, s.state = d, s.context = c, i = a) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
  } else {
    s = t.stateNode, Bd(e, t), a = t.memoizedProps, c = t.type === t.elementType ? a : Be(t.type, a), s.props = c, u = t.pendingProps, h = s.context, d = n.contextType, typeof d == "object" && d !== null ? d = Ae(d) : (d = Se(n) ? Bt : ge.current, d = xn(t, d));
    var v = n.getDerivedStateFromProps;
    (f = typeof v == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== u || h !== d) && oa(t, s, i, d), gt = !1, h = t.memoizedState, s.state = h, yi(t, i, s, o);
    var w = t.memoizedState;
    a !== u || h !== w || je.current || gt ? (typeof v == "function" && (Xo(t, n, v, i), w = t.memoizedState), (c = gt || ia(t, n, c, i, h, w, d) || !1) ? (f || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, w, d), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, w, d)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = w), s.props = i, s.state = w, s.context = d, i = c) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), i = !1);
  }
  return el(e, t, n, i, l, o);
}
function el(e, t, n, i, o, l) {
  gc(e, t);
  var s = (t.flags & 128) !== 0;
  if (!i && !s) return o && Xs(t, n, !1), dt(e, t, l);
  i = t.stateNode, qf.current = t;
  var a = s && typeof n.getDerivedStateFromError != "function" ? null : i.render();
  return t.flags |= 1, e !== null && s ? (t.child = wn(t, e.child, null, l), t.child = wn(t, null, a, l)) : me(e, t, a, l), t.memoizedState = i.state, o && Xs(t, n, !0), t.child;
}
function mc(e) {
  var t = e.stateNode;
  t.pendingContext ? Ys(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ys(e, t.context, !1), Ql(e, t.containerInfo);
}
function fa(e, t, n, i, o) {
  return vn(), Wl(o), t.flags |= 256, me(e, t, n, i), t.child;
}
var tl = { dehydrated: null, treeContext: null, retryLane: 0 };
function nl(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function yc(e, t, n) {
  var i = t.pendingProps, o = K.current, l = !1, s = (t.flags & 128) !== 0, a;
  if ((a = s) || (a = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0), a ? (l = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (o |= 1), H(K, o & 1), e === null)
    return Ko(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = i.children, e = i.fallback, l ? (i = t.mode, l = t.child, s = { mode: "hidden", children: s }, !(i & 1) && l !== null ? (l.childLanes = 0, l.pendingProps = s) : l = Ni(s, i, 0, null), e = Ht(e, i, n, null), l.return = t, e.return = t, l.sibling = e, t.child = l, t.child.memoizedState = nl(n), t.memoizedState = tl, e) : ts(t, s));
  if (o = e.memoizedState, o !== null && (a = o.dehydrated, a !== null)) return Jf(e, t, s, i, a, o, n);
  if (l) {
    l = i.fallback, s = t.mode, o = e.child, a = o.sibling;
    var d = { mode: "hidden", children: i.children };
    return !(s & 1) && t.child !== o ? (i = t.child, i.childLanes = 0, i.pendingProps = d, t.deletions = null) : (i = Tt(o, d), i.subtreeFlags = o.subtreeFlags & 14680064), a !== null ? l = Tt(a, l) : (l = Ht(l, s, n, null), l.flags |= 2), l.return = t, i.return = t, i.sibling = l, t.child = i, i = l, l = t.child, s = e.child.memoizedState, s = s === null ? nl(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, l.memoizedState = s, l.childLanes = e.childLanes & ~n, t.memoizedState = tl, i;
  }
  return l = e.child, e = l.sibling, i = Tt(l, { mode: "visible", children: i.children }), !(t.mode & 1) && (i.lanes = n), i.return = t, i.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = i, t.memoizedState = null, i;
}
function ts(e, t) {
  return t = Ni({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Dr(e, t, n, i) {
  return i !== null && Wl(i), wn(t, e.child, null, n), e = ts(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Jf(e, t, n, i, o, l, s) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, i = ho(Error(T(422))), Dr(e, t, s, i)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (l = i.fallback, o = t.mode, i = Ni({ mode: "visible", children: i.children }, o, 0, null), l = Ht(l, o, s, null), l.flags |= 2, i.return = t, l.return = t, i.sibling = l, t.child = i, t.mode & 1 && wn(t, e.child, null, s), t.child.memoizedState = nl(s), t.memoizedState = tl, l);
  if (!(t.mode & 1)) return Dr(e, t, s, null);
  if (o.data === "$!") {
    if (i = o.nextSibling && o.nextSibling.dataset, i) var a = i.dgst;
    return i = a, l = Error(T(419)), i = ho(l, i, void 0), Dr(e, t, s, i);
  }
  if (a = (s & e.childLanes) !== 0, be || a) {
    if (i = ae, i !== null) {
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
      o = o & (i.suspendedLanes | s) ? 0 : o, o !== 0 && o !== l.retryLane && (l.retryLane = o, at(e, o), Qe(i, e, o, -1));
    }
    return ss(), i = ho(Error(T(421))), Dr(e, t, s, i);
  }
  return o.data === "$?" ? (t.flags |= 128, t.child = e.child, t = up.bind(null, e), o._reactRetry = t, null) : (e = l.treeContext, Ie = jt(o.nextSibling), Me = t, G = !0, Ue = null, e !== null && (Fe[De++] = rt, Fe[De++] = it, Fe[De++] = Vt, rt = e.id, it = e.overflow, Vt = t), t = ts(t, i.children), t.flags |= 4096, t);
}
function pa(e, t, n) {
  e.lanes |= t;
  var i = e.alternate;
  i !== null && (i.lanes |= t), Yo(e.return, t, n);
}
function go(e, t, n, i, o) {
  var l = e.memoizedState;
  l === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: i, tail: n, tailMode: o } : (l.isBackwards = t, l.rendering = null, l.renderingStartTime = 0, l.last = i, l.tail = n, l.tailMode = o);
}
function xc(e, t, n) {
  var i = t.pendingProps, o = i.revealOrder, l = i.tail;
  if (me(e, t, i.children, n), i = K.current, i & 2) i = i & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && pa(e, n, t);
      else if (e.tag === 19) pa(e, n, t);
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
  if (H(K, i), !(t.mode & 1)) t.memoizedState = null;
  else switch (o) {
    case "forwards":
      for (n = t.child, o = null; n !== null; ) e = n.alternate, e !== null && xi(e) === null && (o = n), n = n.sibling;
      n = o, n === null ? (o = t.child, t.child = null) : (o = n.sibling, n.sibling = null), go(t, !1, o, n, l);
      break;
    case "backwards":
      for (n = null, o = t.child, t.child = null; o !== null; ) {
        if (e = o.alternate, e !== null && xi(e) === null) {
          t.child = o;
          break;
        }
        e = o.sibling, o.sibling = n, n = o, o = e;
      }
      go(t, !0, n, null, l);
      break;
    case "together":
      go(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function qr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function dt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Gt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(T(153));
  if (t.child !== null) {
    for (e = t.child, n = Tt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Tt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Zf(e, t, n) {
  switch (t.tag) {
    case 3:
      mc(t), vn();
      break;
    case 5:
      Vd(t);
      break;
    case 1:
      Se(t.type) && fi(t);
      break;
    case 4:
      Ql(t, t.stateNode.containerInfo);
      break;
    case 10:
      var i = t.type._context, o = t.memoizedProps.value;
      H(gi, i._currentValue), i._currentValue = o;
      break;
    case 13:
      if (i = t.memoizedState, i !== null)
        return i.dehydrated !== null ? (H(K, K.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? yc(e, t, n) : (H(K, K.current & 1), e = dt(e, t, n), e !== null ? e.sibling : null);
      H(K, K.current & 1);
      break;
    case 19:
      if (i = (n & t.childLanes) !== 0, e.flags & 128) {
        if (i) return xc(e, t, n);
        t.flags |= 128;
      }
      if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), H(K, K.current), i) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, hc(e, t, n);
  }
  return dt(e, t, n);
}
var vc, rl, wc, kc;
vc = function(e, t) {
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
rl = function() {
};
wc = function(e, t, n, i) {
  var o = e.memoizedProps;
  if (o !== i) {
    e = t.stateNode, Ot(et.current);
    var l = null;
    switch (n) {
      case "input":
        o = Co(e, o), i = Co(e, i), l = [];
        break;
      case "select":
        o = X({}, o, { value: void 0 }), i = X({}, i, { value: void 0 }), l = [];
        break;
      case "textarea":
        o = Ro(e, o), i = Ro(e, i), l = [];
        break;
      default:
        typeof o.onClick != "function" && typeof i.onClick == "function" && (e.onclick = ci);
    }
    Mo(n, i);
    var s;
    n = null;
    for (c in o) if (!i.hasOwnProperty(c) && o.hasOwnProperty(c) && o[c] != null) if (c === "style") {
      var a = o[c];
      for (s in a) a.hasOwnProperty(s) && (n || (n = {}), n[s] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (er.hasOwnProperty(c) ? l || (l = []) : (l = l || []).push(c, null));
    for (c in i) {
      var d = i[c];
      if (a = o?.[c], i.hasOwnProperty(c) && d !== a && (d != null || a != null)) if (c === "style") if (a) {
        for (s in a) !a.hasOwnProperty(s) || d && d.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
        for (s in d) d.hasOwnProperty(s) && a[s] !== d[s] && (n || (n = {}), n[s] = d[s]);
      } else n || (l || (l = []), l.push(
        c,
        n
      )), n = d;
      else c === "dangerouslySetInnerHTML" ? (d = d ? d.__html : void 0, a = a ? a.__html : void 0, d != null && a !== d && (l = l || []).push(c, d)) : c === "children" ? typeof d != "string" && typeof d != "number" || (l = l || []).push(c, "" + d) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (er.hasOwnProperty(c) ? (d != null && c === "onScroll" && V("scroll", e), l || a === d || (l = [])) : (l = l || []).push(c, d));
    }
    n && (l = l || []).push("style", n);
    var c = l;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
kc = function(e, t, n, i) {
  n !== i && (t.flags |= 4);
};
function Dn(e, t) {
  if (!G) switch (e.tailMode) {
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
function pe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, i = 0;
  if (t) for (var o = e.child; o !== null; ) n |= o.lanes | o.childLanes, i |= o.subtreeFlags & 14680064, i |= o.flags & 14680064, o.return = e, o = o.sibling;
  else for (o = e.child; o !== null; ) n |= o.lanes | o.childLanes, i |= o.subtreeFlags, i |= o.flags, o.return = e, o = o.sibling;
  return e.subtreeFlags |= i, e.childLanes = n, t;
}
function ep(e, t, n) {
  var i = t.pendingProps;
  switch (Ol(t), t.tag) {
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
      return pe(t), null;
    case 1:
      return Se(t.type) && ui(), pe(t), null;
    case 3:
      return i = t.stateNode, kn(), U(je), U(ge), Yl(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && ($r(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ue !== null && (ul(Ue), Ue = null))), rl(e, t), pe(t), null;
    case 5:
      Kl(t);
      var o = Ot(fr.current);
      if (n = t.type, e !== null && t.stateNode != null) wc(e, t, n, i, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!i) {
          if (t.stateNode === null) throw Error(T(166));
          return pe(t), null;
        }
        if (e = Ot(et.current), $r(t)) {
          i = t.stateNode, n = t.type;
          var l = t.memoizedProps;
          switch (i[qe] = t, i[cr] = l, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              V("cancel", i), V("close", i);
              break;
            case "iframe":
            case "object":
            case "embed":
              V("load", i);
              break;
            case "video":
            case "audio":
              for (o = 0; o < Vn.length; o++) V(Vn[o], i);
              break;
            case "source":
              V("error", i);
              break;
            case "img":
            case "image":
            case "link":
              V(
                "error",
                i
              ), V("load", i);
              break;
            case "details":
              V("toggle", i);
              break;
            case "input":
              bs(i, l), V("invalid", i);
              break;
            case "select":
              i._wrapperState = { wasMultiple: !!l.multiple }, V("invalid", i);
              break;
            case "textarea":
              Ss(i, l), V("invalid", i);
          }
          Mo(n, l), o = null;
          for (var s in l) if (l.hasOwnProperty(s)) {
            var a = l[s];
            s === "children" ? typeof a == "string" ? i.textContent !== a && (l.suppressHydrationWarning !== !0 && Er(i.textContent, a, e), o = ["children", a]) : typeof a == "number" && i.textContent !== "" + a && (l.suppressHydrationWarning !== !0 && Er(
              i.textContent,
              a,
              e
            ), o = ["children", "" + a]) : er.hasOwnProperty(s) && a != null && s === "onScroll" && V("scroll", i);
          }
          switch (n) {
            case "input":
              Cr(i), js(i, l, !0);
              break;
            case "textarea":
              Cr(i), Cs(i);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof l.onClick == "function" && (i.onclick = ci);
          }
          i = o, t.updateQueue = i, i !== null && (t.flags |= 4);
        } else {
          s = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ya(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = s.createElement(n, { is: i.is }) : (e = s.createElement(n), n === "select" && (s = e, i.multiple ? s.multiple = !0 : i.size && (s.size = i.size))) : e = s.createElementNS(e, n), e[qe] = t, e[cr] = i, vc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (s = _o(n, i), n) {
              case "dialog":
                V("cancel", e), V("close", e), o = i;
                break;
              case "iframe":
              case "object":
              case "embed":
                V("load", e), o = i;
                break;
              case "video":
              case "audio":
                for (o = 0; o < Vn.length; o++) V(Vn[o], e);
                o = i;
                break;
              case "source":
                V("error", e), o = i;
                break;
              case "img":
              case "image":
              case "link":
                V(
                  "error",
                  e
                ), V("load", e), o = i;
                break;
              case "details":
                V("toggle", e), o = i;
                break;
              case "input":
                bs(e, i), o = Co(e, i), V("invalid", e);
                break;
              case "option":
                o = i;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!i.multiple }, o = X({}, i, { value: void 0 }), V("invalid", e);
                break;
              case "textarea":
                Ss(e, i), o = Ro(e, i), V("invalid", e);
                break;
              default:
                o = i;
            }
            Mo(n, o), a = o;
            for (l in a) if (a.hasOwnProperty(l)) {
              var d = a[l];
              l === "style" ? Ja(e, d) : l === "dangerouslySetInnerHTML" ? (d = d ? d.__html : void 0, d != null && Xa(e, d)) : l === "children" ? typeof d == "string" ? (n !== "textarea" || d !== "") && tr(e, d) : typeof d == "number" && tr(e, "" + d) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (er.hasOwnProperty(l) ? d != null && l === "onScroll" && V("scroll", e) : d != null && Cl(e, l, d, s));
            }
            switch (n) {
              case "input":
                Cr(e), js(e, i, !1);
                break;
              case "textarea":
                Cr(e), Cs(e);
                break;
              case "option":
                i.value != null && e.setAttribute("value", "" + Rt(i.value));
                break;
              case "select":
                e.multiple = !!i.multiple, l = i.value, l != null ? un(e, !!i.multiple, l, !1) : i.defaultValue != null && un(
                  e,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                );
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = ci);
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
      return pe(t), null;
    case 6:
      if (e && t.stateNode != null) kc(e, t, e.memoizedProps, i);
      else {
        if (typeof i != "string" && t.stateNode === null) throw Error(T(166));
        if (n = Ot(fr.current), Ot(et.current), $r(t)) {
          if (i = t.stateNode, n = t.memoizedProps, i[qe] = t, (l = i.nodeValue !== n) && (e = Me, e !== null)) switch (e.tag) {
            case 3:
              Er(i.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Er(i.nodeValue, n, (e.mode & 1) !== 0);
          }
          l && (t.flags |= 4);
        } else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[qe] = t, t.stateNode = i;
      }
      return pe(t), null;
    case 13:
      if (U(K), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (G && Ie !== null && t.mode & 1 && !(t.flags & 128)) Ad(), vn(), t.flags |= 98560, l = !1;
        else if (l = $r(t), i !== null && i.dehydrated !== null) {
          if (e === null) {
            if (!l) throw Error(T(318));
            if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(T(317));
            l[qe] = t;
          } else vn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          pe(t), l = !1;
        } else Ue !== null && (ul(Ue), Ue = null), l = !0;
        if (!l) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || K.current & 1 ? le === 0 && (le = 3) : ss())), t.updateQueue !== null && (t.flags |= 4), pe(t), null);
    case 4:
      return kn(), rl(e, t), e === null && ar(t.stateNode.containerInfo), pe(t), null;
    case 10:
      return Vl(t.type._context), pe(t), null;
    case 17:
      return Se(t.type) && ui(), pe(t), null;
    case 19:
      if (U(K), l = t.memoizedState, l === null) return pe(t), null;
      if (i = (t.flags & 128) !== 0, s = l.rendering, s === null) if (i) Dn(l, !1);
      else {
        if (le !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (s = xi(e), s !== null) {
            for (t.flags |= 128, Dn(l, !1), i = s.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = n, n = t.child; n !== null; ) l = n, e = i, l.flags &= 14680066, s = l.alternate, s === null ? (l.childLanes = 0, l.lanes = e, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = s.childLanes, l.lanes = s.lanes, l.child = s.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = s.memoizedProps, l.memoizedState = s.memoizedState, l.updateQueue = s.updateQueue, l.type = s.type, e = s.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return H(K, K.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        l.tail !== null && ee() > jn && (t.flags |= 128, i = !0, Dn(l, !1), t.lanes = 4194304);
      }
      else {
        if (!i) if (e = xi(s), e !== null) {
          if (t.flags |= 128, i = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Dn(l, !0), l.tail === null && l.tailMode === "hidden" && !s.alternate && !G) return pe(t), null;
        } else 2 * ee() - l.renderingStartTime > jn && n !== 1073741824 && (t.flags |= 128, i = !0, Dn(l, !1), t.lanes = 4194304);
        l.isBackwards ? (s.sibling = t.child, t.child = s) : (n = l.last, n !== null ? n.sibling = s : t.child = s, l.last = s);
      }
      return l.tail !== null ? (t = l.tail, l.rendering = t, l.tail = t.sibling, l.renderingStartTime = ee(), t.sibling = null, n = K.current, H(K, i ? n & 1 | 2 : n & 1), t) : (pe(t), null);
    case 22:
    case 23:
      return ls(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? Re & 1073741824 && (pe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : pe(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(T(156, t.tag));
}
function tp(e, t) {
  switch (Ol(t), t.tag) {
    case 1:
      return Se(t.type) && ui(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return kn(), U(je), U(ge), Yl(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Kl(t), null;
    case 13:
      if (U(K), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(T(340));
        vn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return U(K), null;
    case 4:
      return kn(), null;
    case 10:
      return Vl(t.type._context), null;
    case 22:
    case 23:
      return ls(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Nr = !1, he = !1, np = typeof WeakSet == "function" ? WeakSet : Set, M = null;
function dn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (i) {
    q(e, t, i);
  }
  else n.current = null;
}
function il(e, t, n) {
  try {
    n();
  } catch (i) {
    q(e, t, i);
  }
}
var ha = !1;
function rp(e, t) {
  if (Wo = si, e = zd(), Ll(e)) {
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
        var s = 0, a = -1, d = -1, c = 0, f = 0, u = e, h = null;
        t: for (; ; ) {
          for (var v; u !== n || o !== 0 && u.nodeType !== 3 || (a = s + o), u !== l || i !== 0 && u.nodeType !== 3 || (d = s + i), u.nodeType === 3 && (s += u.nodeValue.length), (v = u.firstChild) !== null; )
            h = u, u = v;
          for (; ; ) {
            if (u === e) break t;
            if (h === n && ++c === o && (a = s), h === l && ++f === i && (d = s), (v = u.nextSibling) !== null) break;
            u = h, h = u.parentNode;
          }
          u = v;
        }
        n = a === -1 || d === -1 ? null : { start: a, end: d };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ho = { focusedElem: e, selectionRange: n }, si = !1, M = t; M !== null; ) if (t = M, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, M = e;
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
            var p = w.memoizedProps, b = w.memoizedState, m = t.stateNode, g = m.getSnapshotBeforeUpdate(t.elementType === t.type ? p : Be(t.type, p), b);
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
          throw Error(T(163));
      }
    } catch (x) {
      q(t, t.return, x);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, M = e;
      break;
    }
    M = t.return;
  }
  return w = ha, ha = !1, w;
}
function qn(e, t, n) {
  var i = t.updateQueue;
  if (i = i !== null ? i.lastEffect : null, i !== null) {
    var o = i = i.next;
    do {
      if ((o.tag & e) === e) {
        var l = o.destroy;
        o.destroy = void 0, l !== void 0 && il(t, n, l);
      }
      o = o.next;
    } while (o !== i);
  }
}
function Fi(e, t) {
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
function ol(e) {
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
function bc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, bc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[qe], delete t[cr], delete t[Uo], delete t[Af], delete t[Of])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function jc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ga(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || jc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function ll(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ci));
  else if (i !== 4 && (e = e.child, e !== null)) for (ll(e, t, n), e = e.sibling; e !== null; ) ll(e, t, n), e = e.sibling;
}
function sl(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (i !== 4 && (e = e.child, e !== null)) for (sl(e, t, n), e = e.sibling; e !== null; ) sl(e, t, n), e = e.sibling;
}
var de = null, Ve = !1;
function pt(e, t, n) {
  for (n = n.child; n !== null; ) Sc(e, t, n), n = n.sibling;
}
function Sc(e, t, n) {
  if (Ze && typeof Ze.onCommitFiberUnmount == "function") try {
    Ze.onCommitFiberUnmount(Ti, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      he || dn(n, t);
    case 6:
      var i = de, o = Ve;
      de = null, pt(e, t, n), de = i, Ve = o, de !== null && (Ve ? (e = de, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : de.removeChild(n.stateNode));
      break;
    case 18:
      de !== null && (Ve ? (e = de, n = n.stateNode, e.nodeType === 8 ? so(e.parentNode, n) : e.nodeType === 1 && so(e, n), or(e)) : so(de, n.stateNode));
      break;
    case 4:
      i = de, o = Ve, de = n.stateNode.containerInfo, Ve = !0, pt(e, t, n), de = i, Ve = o;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!he && (i = n.updateQueue, i !== null && (i = i.lastEffect, i !== null))) {
        o = i = i.next;
        do {
          var l = o, s = l.destroy;
          l = l.tag, s !== void 0 && (l & 2 || l & 4) && il(n, t, s), o = o.next;
        } while (o !== i);
      }
      pt(e, t, n);
      break;
    case 1:
      if (!he && (dn(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function")) try {
        i.props = n.memoizedProps, i.state = n.memoizedState, i.componentWillUnmount();
      } catch (a) {
        q(n, t, a);
      }
      pt(e, t, n);
      break;
    case 21:
      pt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (he = (i = he) || n.memoizedState !== null, pt(e, t, n), he = i) : pt(e, t, n);
      break;
    default:
      pt(e, t, n);
  }
}
function ma(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new np()), t.forEach(function(i) {
      var o = fp.bind(null, e, i);
      n.has(i) || (n.add(i), i.then(o, o));
    });
  }
}
function He(e, t) {
  var n = t.deletions;
  if (n !== null) for (var i = 0; i < n.length; i++) {
    var o = n[i];
    try {
      var l = e, s = t, a = s;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            de = a.stateNode, Ve = !1;
            break e;
          case 3:
            de = a.stateNode.containerInfo, Ve = !0;
            break e;
          case 4:
            de = a.stateNode.containerInfo, Ve = !0;
            break e;
        }
        a = a.return;
      }
      if (de === null) throw Error(T(160));
      Sc(l, s, o), de = null, Ve = !1;
      var d = o.alternate;
      d !== null && (d.return = null), o.return = null;
    } catch (c) {
      q(o, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Cc(t, e), t = t.sibling;
}
function Cc(e, t) {
  var n = e.alternate, i = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (He(t, e), Ye(e), i & 4) {
        try {
          qn(3, e, e.return), Fi(3, e);
        } catch (p) {
          q(e, e.return, p);
        }
        try {
          qn(5, e, e.return);
        } catch (p) {
          q(e, e.return, p);
        }
      }
      break;
    case 1:
      He(t, e), Ye(e), i & 512 && n !== null && dn(n, n.return);
      break;
    case 5:
      if (He(t, e), Ye(e), i & 512 && n !== null && dn(n, n.return), e.flags & 32) {
        var o = e.stateNode;
        try {
          tr(o, "");
        } catch (p) {
          q(e, e.return, p);
        }
      }
      if (i & 4 && (o = e.stateNode, o != null)) {
        var l = e.memoizedProps, s = n !== null ? n.memoizedProps : l, a = e.type, d = e.updateQueue;
        if (e.updateQueue = null, d !== null) try {
          a === "input" && l.type === "radio" && l.name != null && Qa(o, l), _o(a, s);
          var c = _o(a, l);
          for (s = 0; s < d.length; s += 2) {
            var f = d[s], u = d[s + 1];
            f === "style" ? Ja(o, u) : f === "dangerouslySetInnerHTML" ? Xa(o, u) : f === "children" ? tr(o, u) : Cl(o, f, u, c);
          }
          switch (a) {
            case "input":
              zo(o, l);
              break;
            case "textarea":
              Ka(o, l);
              break;
            case "select":
              var h = o._wrapperState.wasMultiple;
              o._wrapperState.wasMultiple = !!l.multiple;
              var v = l.value;
              v != null ? un(o, !!l.multiple, v, !1) : h !== !!l.multiple && (l.defaultValue != null ? un(
                o,
                !!l.multiple,
                l.defaultValue,
                !0
              ) : un(o, !!l.multiple, l.multiple ? [] : "", !1));
          }
          o[cr] = l;
        } catch (p) {
          q(e, e.return, p);
        }
      }
      break;
    case 6:
      if (He(t, e), Ye(e), i & 4) {
        if (e.stateNode === null) throw Error(T(162));
        o = e.stateNode, l = e.memoizedProps;
        try {
          o.nodeValue = l;
        } catch (p) {
          q(e, e.return, p);
        }
      }
      break;
    case 3:
      if (He(t, e), Ye(e), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
        or(t.containerInfo);
      } catch (p) {
        q(e, e.return, p);
      }
      break;
    case 4:
      He(t, e), Ye(e);
      break;
    case 13:
      He(t, e), Ye(e), o = e.child, o.flags & 8192 && (l = o.memoizedState !== null, o.stateNode.isHidden = l, !l || o.alternate !== null && o.alternate.memoizedState !== null || (is = ee())), i & 4 && ma(e);
      break;
    case 22:
      if (f = n !== null && n.memoizedState !== null, e.mode & 1 ? (he = (c = he) || f, He(t, e), he = c) : He(t, e), Ye(e), i & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !f && e.mode & 1) for (M = e, f = e.child; f !== null; ) {
          for (u = M = f; M !== null; ) {
            switch (h = M, v = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                qn(4, h, h.return);
                break;
              case 1:
                dn(h, h.return);
                var w = h.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  i = h, n = h.return;
                  try {
                    t = i, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (p) {
                    q(i, n, p);
                  }
                }
                break;
              case 5:
                dn(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  xa(u);
                  continue;
                }
            }
            v !== null ? (v.return = h, M = v) : xa(u);
          }
          f = f.sibling;
        }
        e: for (f = null, u = e; ; ) {
          if (u.tag === 5) {
            if (f === null) {
              f = u;
              try {
                o = u.stateNode, c ? (l = o.style, typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none") : (a = u.stateNode, d = u.memoizedProps.style, s = d != null && d.hasOwnProperty("display") ? d.display : null, a.style.display = qa("display", s));
              } catch (p) {
                q(e, e.return, p);
              }
            }
          } else if (u.tag === 6) {
            if (f === null) try {
              u.stateNode.nodeValue = c ? "" : u.memoizedProps;
            } catch (p) {
              q(e, e.return, p);
            }
          } else if ((u.tag !== 22 && u.tag !== 23 || u.memoizedState === null || u === e) && u.child !== null) {
            u.child.return = u, u = u.child;
            continue;
          }
          if (u === e) break e;
          for (; u.sibling === null; ) {
            if (u.return === null || u.return === e) break e;
            f === u && (f = null), u = u.return;
          }
          f === u && (f = null), u.sibling.return = u.return, u = u.sibling;
        }
      }
      break;
    case 19:
      He(t, e), Ye(e), i & 4 && ma(e);
      break;
    case 21:
      break;
    default:
      He(
        t,
        e
      ), Ye(e);
  }
}
function Ye(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (jc(n)) {
            var i = n;
            break e;
          }
          n = n.return;
        }
        throw Error(T(160));
      }
      switch (i.tag) {
        case 5:
          var o = i.stateNode;
          i.flags & 32 && (tr(o, ""), i.flags &= -33);
          var l = ga(e);
          sl(e, l, o);
          break;
        case 3:
        case 4:
          var s = i.stateNode.containerInfo, a = ga(e);
          ll(e, a, s);
          break;
        default:
          throw Error(T(161));
      }
    } catch (d) {
      q(e, e.return, d);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function ip(e, t, n) {
  M = e, zc(e);
}
function zc(e, t, n) {
  for (var i = (e.mode & 1) !== 0; M !== null; ) {
    var o = M, l = o.child;
    if (o.tag === 22 && i) {
      var s = o.memoizedState !== null || Nr;
      if (!s) {
        var a = o.alternate, d = a !== null && a.memoizedState !== null || he;
        a = Nr;
        var c = he;
        if (Nr = s, (he = d) && !c) for (M = o; M !== null; ) s = M, d = s.child, s.tag === 22 && s.memoizedState !== null ? va(o) : d !== null ? (d.return = s, M = d) : va(o);
        for (; l !== null; ) M = l, zc(l), l = l.sibling;
        M = o, Nr = a, he = c;
      }
      ya(e);
    } else o.subtreeFlags & 8772 && l !== null ? (l.return = o, M = l) : ya(e);
  }
}
function ya(e) {
  for (; M !== null; ) {
    var t = M;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            he || Fi(5, t);
            break;
          case 1:
            var i = t.stateNode;
            if (t.flags & 4 && !he) if (n === null) i.componentDidMount();
            else {
              var o = t.elementType === t.type ? n.memoizedProps : Be(t.type, n.memoizedProps);
              i.componentDidUpdate(o, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
            }
            var l = t.updateQueue;
            l !== null && ta(t, l, i);
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
              ta(t, s, n);
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
                var f = c.memoizedState;
                if (f !== null) {
                  var u = f.dehydrated;
                  u !== null && or(u);
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
            throw Error(T(163));
        }
        he || t.flags & 512 && ol(t);
      } catch (h) {
        q(t, t.return, h);
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
function xa(e) {
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
function va(e) {
  for (; M !== null; ) {
    var t = M;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Fi(4, t);
          } catch (d) {
            q(t, n, d);
          }
          break;
        case 1:
          var i = t.stateNode;
          if (typeof i.componentDidMount == "function") {
            var o = t.return;
            try {
              i.componentDidMount();
            } catch (d) {
              q(t, o, d);
            }
          }
          var l = t.return;
          try {
            ol(t);
          } catch (d) {
            q(t, l, d);
          }
          break;
        case 5:
          var s = t.return;
          try {
            ol(t);
          } catch (d) {
            q(t, s, d);
          }
      }
    } catch (d) {
      q(t, t.return, d);
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
var op = Math.ceil, ki = ct.ReactCurrentDispatcher, ns = ct.ReactCurrentOwner, Le = ct.ReactCurrentBatchConfig, O = 0, ae = null, ne = null, ce = 0, Re = 0, cn = _t(0), le = 0, mr = null, Gt = 0, Di = 0, rs = 0, Jn = null, ke = null, is = 0, jn = 1 / 0, tt = null, bi = !1, al = null, Ct = null, Lr = !1, vt = null, ji = 0, Zn = 0, dl = null, Jr = -1, Zr = 0;
function ye() {
  return O & 6 ? ee() : Jr !== -1 ? Jr : Jr = ee();
}
function zt(e) {
  return e.mode & 1 ? O & 2 && ce !== 0 ? ce & -ce : Hf.transition !== null ? (Zr === 0 && (Zr = cd()), Zr) : (e = W, e !== 0 || (e = window.event, e = e === void 0 ? 16 : yd(e.type)), e) : 1;
}
function Qe(e, t, n, i) {
  if (50 < Zn) throw Zn = 0, dl = null, Error(T(185));
  xr(e, n, i), (!(O & 2) || e !== ae) && (e === ae && (!(O & 2) && (Di |= n), le === 4 && yt(e, ce)), Ce(e, i), n === 1 && O === 0 && !(t.mode & 1) && (jn = ee() + 500, Pi && Pt()));
}
function Ce(e, t) {
  var n = e.callbackNode;
  Wu(e, t);
  var i = li(e, e === ae ? ce : 0);
  if (i === 0) n !== null && Rs(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = i & -i, e.callbackPriority !== t) {
    if (n != null && Rs(n), t === 1) e.tag === 0 ? Wf(wa.bind(null, e)) : Dd(wa.bind(null, e)), Nf(function() {
      !(O & 6) && Pt();
    }), n = null;
    else {
      switch (ud(i)) {
        case 1:
          n = Ml;
          break;
        case 4:
          n = ad;
          break;
        case 16:
          n = oi;
          break;
        case 536870912:
          n = dd;
          break;
        default:
          n = oi;
      }
      n = $c(n, Tc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Tc(e, t) {
  if (Jr = -1, Zr = 0, O & 6) throw Error(T(327));
  var n = e.callbackNode;
  if (mn() && e.callbackNode !== n) return null;
  var i = li(e, e === ae ? ce : 0);
  if (i === 0) return null;
  if (i & 30 || i & e.expiredLanes || t) t = Si(e, i);
  else {
    t = i;
    var o = O;
    O |= 2;
    var l = Ic();
    (ae !== e || ce !== t) && (tt = null, jn = ee() + 500, Wt(e, t));
    do
      try {
        ap();
        break;
      } catch (a) {
        Rc(e, a);
      }
    while (!0);
    Bl(), ki.current = l, O = o, ne !== null ? t = 0 : (ae = null, ce = 0, t = le);
  }
  if (t !== 0) {
    if (t === 2 && (o = Do(e), o !== 0 && (i = o, t = cl(e, o))), t === 1) throw n = mr, Wt(e, 0), yt(e, i), Ce(e, ee()), n;
    if (t === 6) yt(e, i);
    else {
      if (o = e.current.alternate, !(i & 30) && !lp(o) && (t = Si(e, i), t === 2 && (l = Do(e), l !== 0 && (i = l, t = cl(e, l))), t === 1)) throw n = mr, Wt(e, 0), yt(e, i), Ce(e, ee()), n;
      switch (e.finishedWork = o, e.finishedLanes = i, t) {
        case 0:
        case 1:
          throw Error(T(345));
        case 2:
          Dt(e, ke, tt);
          break;
        case 3:
          if (yt(e, i), (i & 130023424) === i && (t = is + 500 - ee(), 10 < t)) {
            if (li(e, 0) !== 0) break;
            if (o = e.suspendedLanes, (o & i) !== i) {
              ye(), e.pingedLanes |= e.suspendedLanes & o;
              break;
            }
            e.timeoutHandle = Vo(Dt.bind(null, e, ke, tt), t);
            break;
          }
          Dt(e, ke, tt);
          break;
        case 4:
          if (yt(e, i), (i & 4194240) === i) break;
          for (t = e.eventTimes, o = -1; 0 < i; ) {
            var s = 31 - Ge(i);
            l = 1 << s, s = t[s], s > o && (o = s), i &= ~l;
          }
          if (i = o, i = ee() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * op(i / 1960)) - i, 10 < i) {
            e.timeoutHandle = Vo(Dt.bind(null, e, ke, tt), i);
            break;
          }
          Dt(e, ke, tt);
          break;
        case 5:
          Dt(e, ke, tt);
          break;
        default:
          throw Error(T(329));
      }
    }
  }
  return Ce(e, ee()), e.callbackNode === n ? Tc.bind(null, e) : null;
}
function cl(e, t) {
  var n = Jn;
  return e.current.memoizedState.isDehydrated && (Wt(e, t).flags |= 256), e = Si(e, t), e !== 2 && (t = ke, ke = n, t !== null && ul(t)), e;
}
function ul(e) {
  ke === null ? ke = e : ke.push.apply(ke, e);
}
function lp(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var i = 0; i < n.length; i++) {
        var o = n[i], l = o.getSnapshot;
        o = o.value;
        try {
          if (!Ke(l(), o)) return !1;
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
function yt(e, t) {
  for (t &= ~rs, t &= ~Di, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ge(t), i = 1 << n;
    e[n] = -1, t &= ~i;
  }
}
function wa(e) {
  if (O & 6) throw Error(T(327));
  mn();
  var t = li(e, 0);
  if (!(t & 1)) return Ce(e, ee()), null;
  var n = Si(e, t);
  if (e.tag !== 0 && n === 2) {
    var i = Do(e);
    i !== 0 && (t = i, n = cl(e, i));
  }
  if (n === 1) throw n = mr, Wt(e, 0), yt(e, t), Ce(e, ee()), n;
  if (n === 6) throw Error(T(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Dt(e, ke, tt), Ce(e, ee()), null;
}
function os(e, t) {
  var n = O;
  O |= 1;
  try {
    return e(t);
  } finally {
    O = n, O === 0 && (jn = ee() + 500, Pi && Pt());
  }
}
function Qt(e) {
  vt !== null && vt.tag === 0 && !(O & 6) && mn();
  var t = O;
  O |= 1;
  var n = Le.transition, i = W;
  try {
    if (Le.transition = null, W = 1, e) return e();
  } finally {
    W = i, Le.transition = n, O = t, !(O & 6) && Pt();
  }
}
function ls() {
  Re = cn.current, U(cn);
}
function Wt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Df(n)), ne !== null) for (n = ne.return; n !== null; ) {
    var i = n;
    switch (Ol(i), i.tag) {
      case 1:
        i = i.type.childContextTypes, i != null && ui();
        break;
      case 3:
        kn(), U(je), U(ge), Yl();
        break;
      case 5:
        Kl(i);
        break;
      case 4:
        kn();
        break;
      case 13:
        U(K);
        break;
      case 19:
        U(K);
        break;
      case 10:
        Vl(i.type._context);
        break;
      case 22:
      case 23:
        ls();
    }
    n = n.return;
  }
  if (ae = e, ne = e = Tt(e.current, null), ce = Re = t, le = 0, mr = null, rs = Di = Gt = 0, ke = Jn = null, At !== null) {
    for (t = 0; t < At.length; t++) if (n = At[t], i = n.interleaved, i !== null) {
      n.interleaved = null;
      var o = i.next, l = n.pending;
      if (l !== null) {
        var s = l.next;
        l.next = o, i.next = s;
      }
      n.pending = i;
    }
    At = null;
  }
  return e;
}
function Rc(e, t) {
  do {
    var n = ne;
    try {
      if (Bl(), Yr.current = wi, vi) {
        for (var i = Y.memoizedState; i !== null; ) {
          var o = i.queue;
          o !== null && (o.pending = null), i = i.next;
        }
        vi = !1;
      }
      if (Ut = 0, se = oe = Y = null, Xn = !1, pr = 0, ns.current = null, n === null || n.return === null) {
        le = 1, mr = t, ne = null;
        break;
      }
      e: {
        var l = e, s = n.return, a = n, d = t;
        if (t = ce, a.flags |= 32768, d !== null && typeof d == "object" && typeof d.then == "function") {
          var c = d, f = a, u = f.tag;
          if (!(f.mode & 1) && (u === 0 || u === 11 || u === 15)) {
            var h = f.alternate;
            h ? (f.updateQueue = h.updateQueue, f.memoizedState = h.memoizedState, f.lanes = h.lanes) : (f.updateQueue = null, f.memoizedState = null);
          }
          var v = sa(s);
          if (v !== null) {
            v.flags &= -257, aa(v, s, a, l, t), v.mode & 1 && la(l, c, t), t = v, d = c;
            var w = t.updateQueue;
            if (w === null) {
              var p = /* @__PURE__ */ new Set();
              p.add(d), t.updateQueue = p;
            } else w.add(d);
            break e;
          } else {
            if (!(t & 1)) {
              la(l, c, t), ss();
              break e;
            }
            d = Error(T(426));
          }
        } else if (G && a.mode & 1) {
          var b = sa(s);
          if (b !== null) {
            !(b.flags & 65536) && (b.flags |= 256), aa(b, s, a, l, t), Wl(bn(d, a));
            break e;
          }
        }
        l = d = bn(d, a), le !== 4 && (le = 2), Jn === null ? Jn = [l] : Jn.push(l), l = s;
        do {
          switch (l.tag) {
            case 3:
              l.flags |= 65536, t &= -t, l.lanes |= t;
              var m = uc(l, d, t);
              ea(l, m);
              break e;
            case 1:
              a = d;
              var g = l.type, y = l.stateNode;
              if (!(l.flags & 128) && (typeof g.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (Ct === null || !Ct.has(y)))) {
                l.flags |= 65536, t &= -t, l.lanes |= t;
                var x = fc(l, a, t);
                ea(l, x);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      _c(n);
    } catch (k) {
      t = k, ne === n && n !== null && (ne = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Ic() {
  var e = ki.current;
  return ki.current = wi, e === null ? wi : e;
}
function ss() {
  (le === 0 || le === 3 || le === 2) && (le = 4), ae === null || !(Gt & 268435455) && !(Di & 268435455) || yt(ae, ce);
}
function Si(e, t) {
  var n = O;
  O |= 2;
  var i = Ic();
  (ae !== e || ce !== t) && (tt = null, Wt(e, t));
  do
    try {
      sp();
      break;
    } catch (o) {
      Rc(e, o);
    }
  while (!0);
  if (Bl(), O = n, ki.current = i, ne !== null) throw Error(T(261));
  return ae = null, ce = 0, le;
}
function sp() {
  for (; ne !== null; ) Mc(ne);
}
function ap() {
  for (; ne !== null && !Pu(); ) Mc(ne);
}
function Mc(e) {
  var t = Ec(e.alternate, e, Re);
  e.memoizedProps = e.pendingProps, t === null ? _c(e) : ne = t, ns.current = null;
}
function _c(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = tp(n, t), n !== null) {
        n.flags &= 32767, ne = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        le = 6, ne = null;
        return;
      }
    } else if (n = ep(n, t, Re), n !== null) {
      ne = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      ne = t;
      return;
    }
    ne = t = e;
  } while (t !== null);
  le === 0 && (le = 5);
}
function Dt(e, t, n) {
  var i = W, o = Le.transition;
  try {
    Le.transition = null, W = 1, dp(e, t, n, i);
  } finally {
    Le.transition = o, W = i;
  }
  return null;
}
function dp(e, t, n, i) {
  do
    mn();
  while (vt !== null);
  if (O & 6) throw Error(T(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(T(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var l = n.lanes | n.childLanes;
  if (Hu(e, l), e === ae && (ne = ae = null, ce = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Lr || (Lr = !0, $c(oi, function() {
    return mn(), null;
  })), l = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || l) {
    l = Le.transition, Le.transition = null;
    var s = W;
    W = 1;
    var a = O;
    O |= 4, ns.current = null, rp(e, n), Cc(n, e), If(Ho), si = !!Wo, Ho = Wo = null, e.current = n, ip(n), Eu(), O = a, W = s, Le.transition = l;
  } else e.current = n;
  if (Lr && (Lr = !1, vt = e, ji = o), l = e.pendingLanes, l === 0 && (Ct = null), Du(n.stateNode), Ce(e, ee()), t !== null) for (i = e.onRecoverableError, n = 0; n < t.length; n++) o = t[n], i(o.value, { componentStack: o.stack, digest: o.digest });
  if (bi) throw bi = !1, e = al, al = null, e;
  return ji & 1 && e.tag !== 0 && mn(), l = e.pendingLanes, l & 1 ? e === dl ? Zn++ : (Zn = 0, dl = e) : Zn = 0, Pt(), null;
}
function mn() {
  if (vt !== null) {
    var e = ud(ji), t = Le.transition, n = W;
    try {
      if (Le.transition = null, W = 16 > e ? 16 : e, vt === null) var i = !1;
      else {
        if (e = vt, vt = null, ji = 0, O & 6) throw Error(T(331));
        var o = O;
        for (O |= 4, M = e.current; M !== null; ) {
          var l = M, s = l.child;
          if (M.flags & 16) {
            var a = l.deletions;
            if (a !== null) {
              for (var d = 0; d < a.length; d++) {
                var c = a[d];
                for (M = c; M !== null; ) {
                  var f = M;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      qn(8, f, l);
                  }
                  var u = f.child;
                  if (u !== null) u.return = f, M = u;
                  else for (; M !== null; ) {
                    f = M;
                    var h = f.sibling, v = f.return;
                    if (bc(f), f === c) {
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
                var p = w.child;
                if (p !== null) {
                  w.child = null;
                  do {
                    var b = p.sibling;
                    p.sibling = null, p = b;
                  } while (p !== null);
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
                qn(9, l, l.return);
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
                  Fi(9, a);
              }
            } catch (k) {
              q(a, a.return, k);
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
        if (O = o, Pt(), Ze && typeof Ze.onPostCommitFiberRoot == "function") try {
          Ze.onPostCommitFiberRoot(Ti, e);
        } catch {
        }
        i = !0;
      }
      return i;
    } finally {
      W = n, Le.transition = t;
    }
  }
  return !1;
}
function ka(e, t, n) {
  t = bn(n, t), t = uc(e, t, 1), e = St(e, t, 1), t = ye(), e !== null && (xr(e, 1, t), Ce(e, t));
}
function q(e, t, n) {
  if (e.tag === 3) ka(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      ka(t, e, n);
      break;
    } else if (t.tag === 1) {
      var i = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (Ct === null || !Ct.has(i))) {
        e = bn(n, e), e = fc(t, e, 1), t = St(t, e, 1), e = ye(), t !== null && (xr(t, 1, e), Ce(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function cp(e, t, n) {
  var i = e.pingCache;
  i !== null && i.delete(t), t = ye(), e.pingedLanes |= e.suspendedLanes & n, ae === e && (ce & n) === n && (le === 4 || le === 3 && (ce & 130023424) === ce && 500 > ee() - is ? Wt(e, 0) : rs |= n), Ce(e, t);
}
function Pc(e, t) {
  t === 0 && (e.mode & 1 ? (t = Rr, Rr <<= 1, !(Rr & 130023424) && (Rr = 4194304)) : t = 1);
  var n = ye();
  e = at(e, t), e !== null && (xr(e, t, n), Ce(e, n));
}
function up(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Pc(e, n);
}
function fp(e, t) {
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
      throw Error(T(314));
  }
  i !== null && i.delete(t), Pc(e, n);
}
var Ec;
Ec = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || je.current) be = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return be = !1, Zf(e, t, n);
    be = !!(e.flags & 131072);
  }
  else be = !1, G && t.flags & 1048576 && Nd(t, hi, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var i = t.type;
      qr(e, t), e = t.pendingProps;
      var o = xn(t, ge.current);
      gn(t, n), o = ql(null, t, i, e, o, n);
      var l = Jl();
      return t.flags |= 1, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Se(i) ? (l = !0, fi(t)) : l = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, Gl(t), o.updater = $i, t.stateNode = o, o._reactInternals = t, qo(t, i, e, n), t = el(null, t, i, !0, l, n)) : (t.tag = 0, G && l && Al(t), me(null, t, o, n), t = t.child), t;
    case 16:
      i = t.elementType;
      e: {
        switch (qr(e, t), e = t.pendingProps, o = i._init, i = o(i._payload), t.type = i, o = t.tag = hp(i), e = Be(i, e), o) {
          case 0:
            t = Zo(null, t, i, e, n);
            break e;
          case 1:
            t = ua(null, t, i, e, n);
            break e;
          case 11:
            t = da(null, t, i, e, n);
            break e;
          case 14:
            t = ca(null, t, i, Be(i.type, e), n);
            break e;
        }
        throw Error(T(
          306,
          i,
          ""
        ));
      }
      return t;
    case 0:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : Be(i, o), Zo(e, t, i, o, n);
    case 1:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : Be(i, o), ua(e, t, i, o, n);
    case 3:
      e: {
        if (mc(t), e === null) throw Error(T(387));
        i = t.pendingProps, l = t.memoizedState, o = l.element, Bd(e, t), yi(t, i, null, n);
        var s = t.memoizedState;
        if (i = s.element, l.isDehydrated) if (l = { element: i, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = l, t.memoizedState = l, t.flags & 256) {
          o = bn(Error(T(423)), t), t = fa(e, t, i, n, o);
          break e;
        } else if (i !== o) {
          o = bn(Error(T(424)), t), t = fa(e, t, i, n, o);
          break e;
        } else for (Ie = jt(t.stateNode.containerInfo.firstChild), Me = t, G = !0, Ue = null, n = Wd(t, null, i, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (vn(), i === o) {
            t = dt(e, t, n);
            break e;
          }
          me(e, t, i, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Vd(t), e === null && Ko(t), i = t.type, o = t.pendingProps, l = e !== null ? e.memoizedProps : null, s = o.children, Bo(i, o) ? s = null : l !== null && Bo(i, l) && (t.flags |= 32), gc(e, t), me(e, t, s, n), t.child;
    case 6:
      return e === null && Ko(t), null;
    case 13:
      return yc(e, t, n);
    case 4:
      return Ql(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = wn(t, null, i, n) : me(e, t, i, n), t.child;
    case 11:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : Be(i, o), da(e, t, i, o, n);
    case 7:
      return me(e, t, t.pendingProps, n), t.child;
    case 8:
      return me(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return me(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (i = t.type._context, o = t.pendingProps, l = t.memoizedProps, s = o.value, H(gi, i._currentValue), i._currentValue = s, l !== null) if (Ke(l.value, s)) {
          if (l.children === o.children && !je.current) {
            t = dt(e, t, n);
            break e;
          }
        } else for (l = t.child, l !== null && (l.return = t); l !== null; ) {
          var a = l.dependencies;
          if (a !== null) {
            s = l.child;
            for (var d = a.firstContext; d !== null; ) {
              if (d.context === i) {
                if (l.tag === 1) {
                  d = ot(-1, n & -n), d.tag = 2;
                  var c = l.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var f = c.pending;
                    f === null ? d.next = d : (d.next = f.next, f.next = d), c.pending = d;
                  }
                }
                l.lanes |= n, d = l.alternate, d !== null && (d.lanes |= n), Yo(
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
            if (s = l.return, s === null) throw Error(T(341));
            s.lanes |= n, a = s.alternate, a !== null && (a.lanes |= n), Yo(s, n, t), s = l.sibling;
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
        me(e, t, o.children, n), t = t.child;
      }
      return t;
    case 9:
      return o = t.type, i = t.pendingProps.children, gn(t, n), o = Ae(o), i = i(o), t.flags |= 1, me(e, t, i, n), t.child;
    case 14:
      return i = t.type, o = Be(i, t.pendingProps), o = Be(i.type, o), ca(e, t, i, o, n);
    case 15:
      return pc(e, t, t.type, t.pendingProps, n);
    case 17:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : Be(i, o), qr(e, t), t.tag = 1, Se(i) ? (e = !0, fi(t)) : e = !1, gn(t, n), cc(t, i, o), qo(t, i, o, n), el(null, t, i, !0, e, n);
    case 19:
      return xc(e, t, n);
    case 22:
      return hc(e, t, n);
  }
  throw Error(T(156, t.tag));
};
function $c(e, t) {
  return sd(e, t);
}
function pp(e, t, n, i) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ne(e, t, n, i) {
  return new pp(e, t, n, i);
}
function as(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function hp(e) {
  if (typeof e == "function") return as(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Tl) return 11;
    if (e === Rl) return 14;
  }
  return 2;
}
function Tt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ne(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function ei(e, t, n, i, o, l) {
  var s = 2;
  if (i = e, typeof e == "function") as(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else e: switch (e) {
    case Zt:
      return Ht(n.children, o, l, t);
    case zl:
      s = 8, o |= 8;
      break;
    case ko:
      return e = Ne(12, n, t, o | 2), e.elementType = ko, e.lanes = l, e;
    case bo:
      return e = Ne(13, n, t, o), e.elementType = bo, e.lanes = l, e;
    case jo:
      return e = Ne(19, n, t, o), e.elementType = jo, e.lanes = l, e;
    case Va:
      return Ni(n, o, l, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Ha:
          s = 10;
          break e;
        case Ba:
          s = 9;
          break e;
        case Tl:
          s = 11;
          break e;
        case Rl:
          s = 14;
          break e;
        case ht:
          s = 16, i = null;
          break e;
      }
      throw Error(T(130, e == null ? e : typeof e, ""));
  }
  return t = Ne(s, n, t, o), t.elementType = e, t.type = i, t.lanes = l, t;
}
function Ht(e, t, n, i) {
  return e = Ne(7, e, i, t), e.lanes = n, e;
}
function Ni(e, t, n, i) {
  return e = Ne(22, e, i, t), e.elementType = Va, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function mo(e, t, n) {
  return e = Ne(6, e, null, t), e.lanes = n, e;
}
function yo(e, t, n) {
  return t = Ne(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function gp(e, t, n, i, o) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Xi(0), this.expirationTimes = Xi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Xi(0), this.identifierPrefix = i, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null;
}
function ds(e, t, n, i, o, l, s, a, d) {
  return e = new gp(e, t, n, a, d), t === 1 ? (t = 1, l === !0 && (t |= 8)) : t = 0, l = Ne(3, null, null, t), e.current = l, l.stateNode = e, l.memoizedState = { element: i, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Gl(l), e;
}
function mp(e, t, n) {
  var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Jt, key: i == null ? null : "" + i, children: e, containerInfo: t, implementation: n };
}
function Fc(e) {
  if (!e) return It;
  e = e._reactInternals;
  e: {
    if (Xt(e) !== e || e.tag !== 1) throw Error(T(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Se(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(T(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Se(n)) return Fd(e, n, t);
  }
  return t;
}
function Dc(e, t, n, i, o, l, s, a, d) {
  return e = ds(n, i, !0, e, o, l, s, a, d), e.context = Fc(null), n = e.current, i = ye(), o = zt(n), l = ot(i, o), l.callback = t ?? null, St(n, l, o), e.current.lanes = o, xr(e, o, i), Ce(e, i), e;
}
function Li(e, t, n, i) {
  var o = t.current, l = ye(), s = zt(o);
  return n = Fc(n), t.context === null ? t.context = n : t.pendingContext = n, t = ot(l, s), t.payload = { element: e }, i = i === void 0 ? null : i, i !== null && (t.callback = i), e = St(o, t, s), e !== null && (Qe(e, o, s, l), Kr(e, o, s)), s;
}
function Ci(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function ba(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function cs(e, t) {
  ba(e, t), (e = e.alternate) && ba(e, t);
}
function yp() {
  return null;
}
var Nc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function us(e) {
  this._internalRoot = e;
}
Ai.prototype.render = us.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(T(409));
  Li(e, t, null, null);
};
Ai.prototype.unmount = us.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Qt(function() {
      Li(null, e, null, null);
    }), t[st] = null;
  }
};
function Ai(e) {
  this._internalRoot = e;
}
Ai.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = hd();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < mt.length && t !== 0 && t < mt[n].priority; n++) ;
    mt.splice(n, 0, e), n === 0 && md(e);
  }
};
function fs(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Oi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function ja() {
}
function xp(e, t, n, i, o) {
  if (o) {
    if (typeof i == "function") {
      var l = i;
      i = function() {
        var c = Ci(s);
        l.call(c);
      };
    }
    var s = Dc(t, i, e, 0, null, !1, !1, "", ja);
    return e._reactRootContainer = s, e[st] = s.current, ar(e.nodeType === 8 ? e.parentNode : e), Qt(), s;
  }
  for (; o = e.lastChild; ) e.removeChild(o);
  if (typeof i == "function") {
    var a = i;
    i = function() {
      var c = Ci(d);
      a.call(c);
    };
  }
  var d = ds(e, 0, !1, null, null, !1, !1, "", ja);
  return e._reactRootContainer = d, e[st] = d.current, ar(e.nodeType === 8 ? e.parentNode : e), Qt(function() {
    Li(t, d, n, i);
  }), d;
}
function Wi(e, t, n, i, o) {
  var l = n._reactRootContainer;
  if (l) {
    var s = l;
    if (typeof o == "function") {
      var a = o;
      o = function() {
        var d = Ci(s);
        a.call(d);
      };
    }
    Li(t, s, e, o);
  } else s = xp(n, t, e, o, i);
  return Ci(s);
}
fd = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Bn(t.pendingLanes);
        n !== 0 && (_l(t, n | 1), Ce(t, ee()), !(O & 6) && (jn = ee() + 500, Pt()));
      }
      break;
    case 13:
      Qt(function() {
        var i = at(e, 1);
        if (i !== null) {
          var o = ye();
          Qe(i, e, 1, o);
        }
      }), cs(e, 1);
  }
};
Pl = function(e) {
  if (e.tag === 13) {
    var t = at(e, 134217728);
    if (t !== null) {
      var n = ye();
      Qe(t, e, 134217728, n);
    }
    cs(e, 134217728);
  }
};
pd = function(e) {
  if (e.tag === 13) {
    var t = zt(e), n = at(e, t);
    if (n !== null) {
      var i = ye();
      Qe(n, e, t, i);
    }
    cs(e, t);
  }
};
hd = function() {
  return W;
};
gd = function(e, t) {
  var n = W;
  try {
    return W = e, t();
  } finally {
    W = n;
  }
};
Eo = function(e, t, n) {
  switch (t) {
    case "input":
      if (zo(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var i = n[t];
          if (i !== e && i.form === e.form) {
            var o = _i(i);
            if (!o) throw Error(T(90));
            Ga(i), zo(i, o);
          }
        }
      }
      break;
    case "textarea":
      Ka(e, n);
      break;
    case "select":
      t = n.value, t != null && un(e, !!n.multiple, t, !1);
  }
};
td = os;
nd = Qt;
var vp = { usingClientEntryPoint: !1, Events: [wr, rn, _i, Za, ed, os] }, Nn = { findFiberByHostInstance: Lt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, wp = { bundleType: Nn.bundleType, version: Nn.version, rendererPackageName: Nn.rendererPackageName, rendererConfig: Nn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ct.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = od(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Nn.findFiberByHostInstance || yp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ar = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ar.isDisabled && Ar.supportsFiber) try {
    Ti = Ar.inject(wp), Ze = Ar;
  } catch {
  }
}
Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vp;
Pe.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!fs(t)) throw Error(T(200));
  return mp(e, t, null, n);
};
Pe.createRoot = function(e, t) {
  if (!fs(e)) throw Error(T(299));
  var n = !1, i = "", o = Nc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = ds(e, 1, !1, null, null, n, !1, i, o), e[st] = t.current, ar(e.nodeType === 8 ? e.parentNode : e), new us(t);
};
Pe.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(T(188)) : (e = Object.keys(e).join(","), Error(T(268, e)));
  return e = od(t), e = e === null ? null : e.stateNode, e;
};
Pe.flushSync = function(e) {
  return Qt(e);
};
Pe.hydrate = function(e, t, n) {
  if (!Oi(t)) throw Error(T(200));
  return Wi(null, e, t, !0, n);
};
Pe.hydrateRoot = function(e, t, n) {
  if (!fs(e)) throw Error(T(405));
  var i = n != null && n.hydratedSources || null, o = !1, l = "", s = Nc;
  if (n != null && (n.unstable_strictMode === !0 && (o = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = Dc(t, null, e, 1, n ?? null, o, !1, l, s), e[st] = t.current, ar(e), i) for (e = 0; e < i.length; e++) n = i[e], o = n._getVersion, o = o(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, o] : t.mutableSourceEagerHydrationData.push(
    n,
    o
  );
  return new Ai(t);
};
Pe.render = function(e, t, n) {
  if (!Oi(t)) throw Error(T(200));
  return Wi(null, e, t, !1, n);
};
Pe.unmountComponentAtNode = function(e) {
  if (!Oi(e)) throw Error(T(40));
  return e._reactRootContainer ? (Qt(function() {
    Wi(null, null, e, !1, function() {
      e._reactRootContainer = null, e[st] = null;
    });
  }), !0) : !1;
};
Pe.unstable_batchedUpdates = os;
Pe.unstable_renderSubtreeIntoContainer = function(e, t, n, i) {
  if (!Oi(n)) throw Error(T(200));
  if (e == null || e._reactInternals === void 0) throw Error(T(38));
  return Wi(e, t, n, !1, i);
};
Pe.version = "18.3.1-next-f1338f8080-20240426";
function Lc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Lc);
    } catch (e) {
      console.error(e);
    }
}
Lc(), La.exports = Pe;
var kp = La.exports, Ac, Sa = kp;
Ac = Sa.createRoot, Sa.hydrateRoot;
const br = ie.createContext(null);
var Oc = { exports: {} }, Hi = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bp = bl, jp = Symbol.for("react.element"), Sp = Symbol.for("react.fragment"), Cp = Object.prototype.hasOwnProperty, zp = bp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Tp = { key: !0, ref: !0, __self: !0, __source: !0 };
function Wc(e, t, n) {
  var i, o = {}, l = null, s = null;
  n !== void 0 && (l = "" + n), t.key !== void 0 && (l = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (i in t) Cp.call(t, i) && !Tp.hasOwnProperty(i) && (o[i] = t[i]);
  if (e && e.defaultProps) for (i in t = e.defaultProps, t) o[i] === void 0 && (o[i] = t[i]);
  return { $$typeof: jp, type: e, key: l, ref: s, props: o, _owner: zp.current };
}
Hi.Fragment = Sp;
Hi.jsx = Wc;
Hi.jsxs = Wc;
Oc.exports = Hi;
var r = Oc.exports;
const Rp = `
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
function Ip(e) {
  const [t, n] = React.useState(e), i = React.useCallback((o, l) => {
    const s = typeof o == "object" && o !== null ? o : { [o]: l };
    n((a) => ({ ...a, ...s })), window.parent.postMessage({ type: "__edit_mode_set_keys", edits: s }, "*"), window.dispatchEvent(new CustomEvent("tweakchange", { detail: s }));
  }, []);
  return [t, i];
}
function Mp({ title: e = "Tweaks", noDeckControls: t = !1, children: n }) {
  const [i, o] = React.useState(!1), l = React.useRef(null), s = React.useMemo(
    () => typeof document < "u" && !!document.querySelector("deck-stage"),
    []
  ), [a, d] = React.useState(() => {
    try {
      return localStorage.getItem("deck-stage.railVisible") !== "0";
    } catch {
      return !0;
    }
  }), c = (p) => {
    d(p), window.postMessage({ type: "__deck_rail_visible", on: p }, "*");
  }, f = React.useRef({ x: 16, y: 16 }), u = 16, h = React.useCallback(() => {
    const p = l.current;
    if (!p) return;
    const b = p.offsetWidth, m = p.offsetHeight, g = Math.max(u, window.innerWidth - b - u), y = Math.max(u, window.innerHeight - m - u);
    f.current = {
      x: Math.min(g, Math.max(u, f.current.x)),
      y: Math.min(y, Math.max(u, f.current.y))
    }, p.style.right = f.current.x + "px", p.style.bottom = f.current.y + "px";
  }, []);
  React.useEffect(() => {
    if (!i) return;
    if (h(), typeof ResizeObserver > "u")
      return window.addEventListener("resize", h), () => window.removeEventListener("resize", h);
    const p = new ResizeObserver(h);
    return p.observe(document.documentElement), () => p.disconnect();
  }, [i, h]), React.useEffect(() => {
    const p = (b) => {
      const m = b?.data?.type;
      m === "__activate_edit_mode" ? o(!0) : m === "__deactivate_edit_mode" && o(!1);
    };
    return window.addEventListener("message", p), window.parent.postMessage({ type: "__edit_mode_available" }, "*"), () => window.removeEventListener("message", p);
  }, []);
  const v = () => {
    o(!1), window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
  }, w = (p) => {
    const b = l.current;
    if (!b) return;
    const m = b.getBoundingClientRect(), g = p.clientX, y = p.clientY, x = window.innerWidth - m.right, k = window.innerHeight - m.bottom, j = (C) => {
      f.current = {
        x: x - (C.clientX - g),
        y: k - (C.clientY - y)
      }, h();
    }, S = () => {
      window.removeEventListener("mousemove", j), window.removeEventListener("mouseup", S);
    };
    window.addEventListener("mousemove", j), window.addEventListener("mouseup", S);
  };
  return i ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx("style", { children: Rp }),
    /* @__PURE__ */ r.jsxs(
      "div",
      {
        ref: l,
        className: "twk-panel",
        "data-noncommentable": "",
        style: { right: f.current.x, bottom: f.current.y },
        children: [
          /* @__PURE__ */ r.jsxs("div", { className: "twk-hd", onMouseDown: w, children: [
            /* @__PURE__ */ r.jsx("b", { children: e }),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                className: "twk-x",
                "aria-label": "Close tweaks",
                onMouseDown: (p) => p.stopPropagation(),
                onClick: v,
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "twk-body", children: [
            s && !t && /* @__PURE__ */ r.jsx(Hc, { label: "Deck", children: /* @__PURE__ */ r.jsx(Bc, { label: "Thumbnail rail", value: a, onChange: c }) }),
            n
          ] })
        ]
      }
    )
  ] }) : null;
}
function Hc({ label: e, children: t }) {
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx("div", { className: "twk-sect", children: e }),
    t
  ] });
}
function Rn({ label: e, value: t, children: n, inline: i = !1 }) {
  return /* @__PURE__ */ r.jsxs("div", { className: i ? "twk-row twk-row-h" : "twk-row", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "twk-lbl", children: [
      /* @__PURE__ */ r.jsx("span", { children: e }),
      t != null && /* @__PURE__ */ r.jsx("span", { className: "twk-val", children: t })
    ] }),
    n
  ] });
}
function _p({ label: e, value: t, min: n = 0, max: i = 100, step: o = 1, unit: l = "", onChange: s }) {
  return /* @__PURE__ */ r.jsx(Rn, { label: e, value: `${t}${l}`, children: /* @__PURE__ */ r.jsx(
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
function Bc({ label: e, value: t, onChange: n }) {
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
function Pp({ label: e, value: t, options: n, onChange: i }) {
  const o = React.useRef(null), [l, s] = React.useState(!1), a = React.useRef(t);
  a.current = t;
  const d = (b) => String(typeof b == "object" ? b.label : b).length;
  if (!(n.reduce((b, m) => Math.max(b, d(m)), 0) <= ({ 2: 16, 3: 10 }[n.length] ?? 0))) {
    const b = (m) => {
      const g = n.find((y) => String(typeof y == "object" ? y.value : y) === m);
      return g === void 0 ? m : typeof g == "object" ? g.value : g;
    };
    return /* @__PURE__ */ r.jsx(
      Vc,
      {
        label: e,
        value: t,
        options: n,
        onChange: (m) => i(b(m))
      }
    );
  }
  const u = n.map((b) => typeof b == "object" ? b : { value: b, label: b }), h = Math.max(0, u.findIndex((b) => b.value === t)), v = u.length, w = (b) => {
    const m = o.current.getBoundingClientRect(), g = m.width - 4, y = Math.floor((b - m.left - 2) / g * v);
    return u[Math.max(0, Math.min(v - 1, y))].value;
  }, p = (b) => {
    s(!0);
    const m = w(b.clientX);
    m !== a.current && i(m);
    const g = (x) => {
      if (!o.current) return;
      const k = w(x.clientX);
      k !== a.current && i(k);
    }, y = () => {
      s(!1), window.removeEventListener("pointermove", g), window.removeEventListener("pointerup", y);
    };
    window.addEventListener("pointermove", g), window.addEventListener("pointerup", y);
  };
  return /* @__PURE__ */ r.jsx(Rn, { label: e, children: /* @__PURE__ */ r.jsxs(
    "div",
    {
      ref: o,
      role: "radiogroup",
      onPointerDown: p,
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
        u.map((b) => /* @__PURE__ */ r.jsx("button", { type: "button", role: "radio", "aria-checked": b.value === t, children: b.label }, b.value))
      ]
    }
  ) });
}
function Vc({ label: e, value: t, options: n, onChange: i }) {
  return /* @__PURE__ */ r.jsx(Rn, { label: e, children: /* @__PURE__ */ r.jsx("select", { className: "twk-field", value: t, onChange: (o) => i(o.target.value), children: n.map((o) => {
    const l = typeof o == "object" ? o.value : o, s = typeof o == "object" ? o.label : o;
    return /* @__PURE__ */ r.jsx("option", { value: l, children: s }, l);
  }) }) });
}
function Ep({ label: e, value: t, placeholder: n, onChange: i }) {
  return /* @__PURE__ */ r.jsx(Rn, { label: e, children: /* @__PURE__ */ r.jsx(
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
function $p({ label: e, value: t, min: n, max: i, step: o = 1, unit: l = "", onChange: s }) {
  const a = (f) => n != null && f < n ? n : i != null && f > i ? i : f, d = React.useRef({ x: 0, val: 0 }), c = (f) => {
    f.preventDefault(), d.current = { x: f.clientX, val: t };
    const u = (String(o).split(".")[1] || "").length, h = (w) => {
      const p = w.clientX - d.current.x, b = d.current.val + p * o, m = Math.round(b / o) * o;
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
        onChange: (f) => s(a(Number(f.target.value)))
      }
    ),
    l && /* @__PURE__ */ r.jsx("span", { className: "twk-num-unit", children: l })
  ] });
}
function Fp(e) {
  const t = String(e).replace("#", ""), n = t.length === 3 ? t.replace(/./g, (a) => a + a) : t.padEnd(6, "0"), i = parseInt(n.slice(0, 6), 16);
  if (Number.isNaN(i)) return !0;
  const o = i >> 16 & 255, l = i >> 8 & 255, s = i & 255;
  return o * 299 + l * 587 + s * 114 > 148e3;
}
const Dp = ({ light: e }) => /* @__PURE__ */ r.jsx("svg", { viewBox: "0 0 14 14", "aria-hidden": "true", children: /* @__PURE__ */ r.jsx(
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
function Np({ label: e, value: t, options: n, onChange: i }) {
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
  return /* @__PURE__ */ r.jsx(Rn, { label: e, children: /* @__PURE__ */ r.jsx("div", { className: "twk-chips", role: "radiogroup", children: n.map((s, a) => {
    const d = Array.isArray(s) ? s : [s], [c, ...f] = d, u = f.slice(0, 4), h = o(s) === l;
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
          h && /* @__PURE__ */ r.jsx(Dp, { light: Fp(c) })
        ]
      },
      a
    );
  }) }) });
}
function Lp({ label: e, onClick: t, secondary: n = !1 }) {
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
  useTweaks: Ip,
  TweaksPanel: Mp,
  TweakSection: Hc,
  TweakRow: Rn,
  TweakSlider: _p,
  TweakToggle: Bc,
  TweakRadio: Pp,
  TweakSelect: Vc,
  TweakText: Ep,
  TweakNumber: $p,
  TweakColor: Np,
  TweakButton: Lp
});
const Ap = ({ name: e, size: t = 18, stroke: n = 1.6, ...i }) => {
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
}, Op = [
  { id: "living", name: "Living Room", icon: "home" },
  { id: "kitchen", name: "Kitchen", icon: "coffee" },
  { id: "bedroom", name: "Bedroom", icon: "bed" },
  { id: "office", name: "Office", icon: "user" },
  { id: "outdoor", name: "Outdoor", icon: "leaf" }
], we = [
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
], Uc = [
  { id: "pl1", name: "Sunday Slow", count: 42, art: ["oklch(45% 0.12 30)", "oklch(40% 0.14 60)", "oklch(35% 0.10 270)", "oklch(58% 0.16 60)"], tracks: ["t3", "t4", "t10", "t11", "t15"] },
  { id: "pl2", name: "Late Night", count: 28, art: ["oklch(28% 0.06 240)", "oklch(35% 0.10 320)", "oklch(36% 0.06 200)", "oklch(45% 0.12 30)"], tracks: ["t1", "t7", "t9", "t12"] },
  { id: "pl3", name: "Cooking", count: 64, art: ["oklch(50% 0.13 80)", "oklch(48% 0.18 50)", "oklch(45% 0.13 90)", "oklch(58% 0.16 60)"], tracks: ["t5", "t6", "t8", "t13", "t14"] },
  { id: "pl4", name: "Frances' Picks", count: 91, art: ["oklch(72% 0.10 20)", "oklch(40% 0.14 60)", "oklch(35% 0.10 270)", "oklch(45% 0.15 25)"], tracks: ["t1", "t2", "t3", "t4", "t5", "t6", "t11"] },
  { id: "pl5", name: "Focus", count: 37, art: ["oklch(36% 0.06 200)", "oklch(28% 0.06 240)", "oklch(35% 0.10 270)", "oklch(42% 0.12 340)"], tracks: ["t7", "t9", "t12"] },
  { id: "pl6", name: "Dinner Party", count: 54, art: ["oklch(58% 0.16 60)", "oklch(45% 0.13 90)", "oklch(72% 0.10 20)", "oklch(50% 0.13 80)"], tracks: ["t5", "t8", "t13", "t14", "t15"] }
], Gc = () => ({
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
function Wp(e, t, n) {
  const i = e.trim();
  if (!i) return null;
  const o = i.toLowerCase(), l = Qc(i, t);
  if (l)
    return n((p) => ({ ...p, automations: [...p.automations, l] })), `Saved automation: "${l.name}". ${l.desc} You can edit it under Automations.`;
  const s = o.match(/(?:set|make|put|change).*(?:thermostat|temp(?:erature)?|nest|heat|cool|ac).*?(\d{2})/i) || o.match(/(?:thermostat|temp(?:erature)?|nest).*?(\d{2})/i) || o.match(/(\d{2})\s*(?:degrees?|°)/i);
  if (s && /thermostat|temp|nest|degree|°|warmer|colder|heat|cool|ac/i.test(o)) {
    const p = Math.max(50, Math.min(90, +s[1]));
    return n((b) => ({ ...b, thermostat: { ...b.thermostat, target: p } })), `Set the Nest to ${p}°.`;
  }
  if (/warmer|hotter|heat up/i.test(o))
    return n((p) => ({ ...p, thermostat: { ...p.thermostat, target: Math.min(83, p.thermostat.target + 2) } })), "Bumped the thermostat up 2°.";
  if (/colder|cooler|cool (it )?down/i.test(o))
    return n((p) => ({ ...p, thermostat: { ...p.thermostat, target: Math.max(60, p.thermostat.target - 2) } })), "Cooled it down 2°.";
  const a = o.match(/(?:thermostat|nest|mode).*?(cool|heat|auto|off)/i) || o.match(/^(cool|heat|auto)\s*(?:mode|the house)?$/i);
  if (a) {
    const p = a[1].toLowerCase();
    return n((b) => ({ ...b, thermostat: { ...b.thermostat, mode: p } })), `Thermostat set to ${p}.`;
  }
  const d = [
    { match: /(movie|film|cinema)/i, id: "movie", reply: "Setting up movie night. Dimming the living room, switching to Apple TV." },
    { match: /(good ?night|sleep|bedtime)/i, id: "sleep", reply: "Goodnight. Locking up, turning off the TV, easing the lights down." },
    { match: /(good ?morning|wake ?up)/i, id: "morning", reply: "Good morning. Brewing coffee and bringing the kitchen lights up." },
    { match: /focus|work mode/i, id: "focus", reply: "Focus on. Office cool, notifications muted." },
    { match: /(away|leaving|out)/i, id: "away", reply: "Away mode. Doors locked, sentry armed, lights off." },
    { match: /dinner party/i, id: "dinner", reply: "Dinner party scene running." }
  ];
  for (const p of d)
    if (p.match.test(i))
      return n((b) => {
        const m = { ...b, scenes: b.scenes.map((g) => ({ ...g, active: g.id === p.id })) };
        return p.id === "movie" && (m.lights = b.lights.map((g) => g.room === "living" ? { ...g, on: !0, brightness: 12 } : g)), p.id === "sleep" && (m.lights = b.lights.map((g) => ({ ...g, on: !1 })), m.locks = b.locks.map((g) => ({ ...g, locked: !0 }))), p.id === "morning" && (m.lights = b.lights.map((g) => g.room === "kitchen" ? { ...g, on: !0, brightness: 85 } : g)), p.id === "away" && (m.locks = b.locks.map((g) => ({ ...g, locked: !0 })), m.lights = b.lights.map((g) => ({ ...g, on: !1 }))), m;
      }), p.reply;
  const c = o.match(/\b(living|kitchen|bedroom|office|outdoor|porch)\b/i), f = c ? c[1].toLowerCase() === "porch" ? "outdoor" : c[1].toLowerCase() : null, u = o.match(/(\d{1,3})\s*%/), h = u ? Math.max(1, Math.min(100, +u[1])) : null;
  if (/turn (?:on|up)|lights? on|brighten/i.test(o) && /light/i.test(o))
    return n((p) => ({ ...p, lights: p.lights.map((b) => !f || b.room === f ? { ...b, on: !0, brightness: h ?? b.brightness } : b) })), f ? `${ti(f)} lights on${h ? ` at ${h}%` : ""}.` : `Lights on${h ? ` at ${h}%` : ""}.`;
  if (/turn (?:off|down)|lights? off/i.test(o) && /light/i.test(o))
    return n((p) => ({ ...p, lights: p.lights.map((b) => !f || b.room === f ? { ...b, on: !1 } : b) })), f ? `${ti(f)} lights off.` : "Lights off.";
  if (/(dim|lower).*light/i.test(o))
    return n((p) => ({ ...p, lights: p.lights.map((b) => !f || b.room === f ? { ...b, on: !0, brightness: h ?? 30 } : b) })), `Dimmed${f ? ` the ${f}` : ""} to ${h ?? 30}%.`;
  if (/lock (?:up|the house|all|everything|doors)/i.test(o) || /^lock$/i.test(o.trim()))
    return n((p) => ({ ...p, locks: p.locks.map((b) => ({ ...b, locked: !0 })) })), "All doors locked. Sentry armed on the Tesla.";
  const v = o.match(/(?:set|put|switch|change|arm|disarm).*?ring.*?(disarm(?:ed)?|home|away|stay|night)/i) || o.match(/ring.*?(disarm(?:ed)?|home|away|stay|night).*?mode/i) || o.match(/^(?:arm|disarm)(?:\s+(?:to\s+)?(home|away|stay|disarmed))?$/i) || o.match(/(?:arm|set).*?(?:alarm|system).*?(home|away|stay|night)/i) || o.match(/(disarm)(?:\s+(?:the\s+)?(?:alarm|ring|system))?$/i);
  if (v) {
    let p = (v[1] || "").toLowerCase();
    if ((p === "stay" || p === "night") && (p = "home"), p.startsWith("disarm") && (p = "disarmed"), !p && /^arm/i.test(i.trim()) && (p = "away"), p === "disarmed" || p === "home" || p === "away")
      return n((m) => ({
        ...m,
        ring: { ...m.ring || {}, mode: p, lastChanged: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), changedBy: "Voice" },
        locks: p === "away" ? m.locks.map((g) => ({ ...g, locked: !0 })) : m.locks
      })), {
        disarmed: "Ring disarmed. Sensors off.",
        home: "Ring set to Home. Perimeter armed, interior bypassed so you can move around.",
        away: "Ring armed Away. Doors locked, full system armed with a 30-second entry delay."
      }[p];
  }
  if (/unlock front/i.test(o))
    return n((p) => ({ ...p, locks: p.locks.map((b) => b.id === "lk1" ? { ...b, locked: !1 } : b) })), "Unlocking the front door. I'll re-lock in five.";
  if (/unlock back/i.test(o))
    return n((p) => ({ ...p, locks: p.locks.map((b) => b.id === "lk2" ? { ...b, locked: !1 } : b) })), "Back door unlocked.";
  if (/(pause|stop) music/i.test(o))
    return n((p) => ({ ...p, speakers: p.speakers.map((b) => ({ ...b, playing: !1 })) })), "Music paused everywhere.";
  if (/skip|next track/i.test(o))
    return n((p) => ({ ...p, speakers: p.speakers.map((b) => b.playing ? { ...b, trackId: Hp(b.trackId), progress: 0 } : b) })), "Skipping to the next track.";
  const w = o.match(/^(?:please\s+)?play\s+(.+?)(?:\s+(?:in|on|to)\s+(?:the\s+)?([a-z\s]+?))?$/i) || o.match(/^(?:put on|start)\s+(.+?)(?:\s+(?:in|on|to)\s+(?:the\s+)?([a-z\s]+?))?$/i);
  if (w) {
    const p = w[1].trim(), b = (w[2] || "").trim().toLowerCase(), m = /everywhere|whole house|all (rooms|speakers)|every room/i.test(i), g = { living: "living", "living room": "living", kitchen: "kitchen", bedroom: "bedroom", office: "office", outdoor: "outdoor", patio: "outdoor", porch: "outdoor" }, y = g[b] || b && Object.keys(g).find((x) => b.includes(x)) || null;
    if (!/^(music|something|a song|tunes)$/i.test(p)) {
      const x = p.toLowerCase();
      let k = we.find((C) => C.title.toLowerCase() === x) || we.find((C) => C.title.toLowerCase().includes(x)) || we.find((C) => C.album.toLowerCase().includes(x)) || we.find((C) => C.artist.toLowerCase().includes(x)), j = null, S = "";
      if (k) {
        const C = we.filter((z) => z.id !== k.id && z.artist.toLowerCase() === k.artist.toLowerCase()), _ = we.filter((z) => z.id !== k.id && !C.includes(z)).slice(0, 4);
        j = [...C, ..._].slice(0, 6).map((z) => z.id), S = `${k.title} — ${k.artist}`;
      } else {
        const C = (t.playlists || Uc).find((_) => _.name.toLowerCase().includes(x));
        C && C.tracks.length && (k = we.find((_) => _.id === C.tracks[0]), j = C.tracks.slice(1, 7), S = `playlist "${C.name}"`);
      }
      if (k) {
        const C = m ? "all speakers" : y ? ti(y) : "the Living Room";
        return n((_) => ({ ..._, speakers: _.speakers.map((z) => m || !y && z.room === "living" || y && z.room === y ? { ...z, trackId: k.id, progress: 0, playing: !0, queue: j || z.queue } : z) })), `Playing ${S} in ${C}.`;
      }
    }
  }
  if (/(play|resume) music/i.test(o))
    return n((p) => ({ ...p, speakers: p.speakers.map((b) => ({ ...b, playing: !0 })) })), "Music playing.";
  if (/precondition|warm.*car|cool.*car|preheat/i.test(o))
    return n((p) => ({ ...p, tesla: { ...p.tesla, climateOn: !0, target: 70 } })), "Preconditioning the Tesla to 70°.";
  if (/charge|tesla|car/i.test(o) && /status|how/i.test(o)) return `Tesla is at ${t.tesla.chargePct}%, ${t.tesla.range} mi range, ${t.tesla.charging ? "charging" : t.tesla.pluggedIn ? "plugged in" : "unplugged"}.`;
  if (/lock.*car|sentry/i.test(o))
    return n((p) => ({ ...p, tesla: { ...p.tesla, locked: !0, sentry: !0 } })), "Tesla locked, sentry on.";
  if (/close.*garage|garage.*close/i.test(o))
    return n((p) => ({ ...p, garage: { ...p.garage, doors: p.garage.doors.map((b) => ({ ...b, open: !1, lastChanged: "now" })) } })), "Closing all garage doors.";
  if (/open.*garage|garage.*open/i.test(o))
    return n((p) => ({ ...p, garage: { ...p.garage, doors: p.garage.doors.map((b) => b.id === "g1" ? { ...b, open: !0, lastChanged: "now" } : b) } })), "Opening the main garage door.";
  if (/(vacuum|shark|roomba|clean.*house|start.*clean)/i.test(o) && /(start|clean|run|begin)/i.test(o)) {
    const p = o.match(/\b(living|kitchen|bedroom|office|outdoor)\b/i);
    return n((b) => ({ ...b, vacuum: { ...b.vacuum, state: "cleaning", mode: p ? "room" : "auto", currentRoom: p ? p[1].toLowerCase() : null } })), p ? `Sending the Shark to clean the ${p[1].toLowerCase()}.` : "Shark is starting a full-house clean.";
  }
  if (/(stop|pause).*(vacuum|shark|clean)/i.test(o))
    return n((p) => ({ ...p, vacuum: { ...p.vacuum, state: "paused" } })), "Vacuum paused.";
  if (/(dock|return).*(vacuum|shark)/i.test(o) || /send.*shark.*home/i.test(o))
    return n((p) => ({ ...p, vacuum: { ...p.vacuum, state: "returning" } })), "Sending the Shark back to its dock.";
  if (/weather/i.test(o)) return `It's ${t.weather.temp}° and ${t.weather.summary.toLowerCase()}. High of ${t.weather.high}° this afternoon.`;
  if (/alarm.*\d|wake.*\d/i.test(o)) {
    const p = o.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (p) {
      const b = +p[1], m = p[2] || "00", g = p[3] ? p[3].toUpperCase() : b < 8 ? "AM" : "PM", y = `${b}:${m} ${g}`;
      return n((x) => ({ ...x, alarms: [{ id: "new" + Date.now(), label: "Tomorrow", time: y, days: "Once", on: !0 }, ...x.alarms] })), `Alarm set for ${y}.`;
    }
  }
  return /do not disturb|dnd/i.test(o) ? (n((p) => ({ ...p, dnd: { active: !0, until: "next meeting end", source: "agent" } })), "Do not disturb on until your next meeting ends.") : null;
}
const ti = (e) => e && e.charAt(0).toUpperCase() + e.slice(1);
function Hp(e) {
  const t = we.findIndex((n) => n.id === e);
  return we[(t + 1) % we.length].id;
}
function Qc(e, t) {
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
  const f = n.match(/(?:set|make).*(?:thermostat|nest|temp).*?(\d{2})/i);
  return f && (a.push({ type: "thermostat", target: +f[1] }), d.push(`set thermostat to ${f[1]}°`)), a.length ? {
    id: "au" + Date.now(),
    name: `${ti(o)} → ${d[0]}`,
    trigger: i,
    actions: a,
    enabled: !0,
    lastRun: null,
    desc: `When ${o}, ${d.join(" and ")}.`
  } : null;
}
function Bp(e, t, n) {
  n((i) => {
    let o = { ...i };
    for (const l of e.actions)
      l.type === "light" && (o.lights = o.lights.map((s) => s.id === l.lightId ? { ...s, on: l.on, brightness: l.brightness ?? s.brightness } : s)), l.type === "allLights" && (o.lights = o.lights.map((s) => ({ ...s, on: l.on }))), l.type === "lockAll" && (o.locks = o.locks.map((s) => ({ ...s, locked: !0 }))), l.type === "scene" && (o.scenes = o.scenes.map((s) => ({ ...s, active: s.id === l.sceneId }))), l.type === "precondition" && (o.tesla = { ...o.tesla, climateOn: !0, target: 70 }), l.type === "closeGarage" && (o.garage = { ...o.garage, doors: o.garage.doors.map((s) => ({ ...s, open: !1, lastChanged: "now" })) }), l.type === "thermostat" && (o.thermostat = { ...o.thermostat, target: l.target });
    return o.automations = o.automations.map((l) => l.id === e.id ? { ...l, lastRun: "now" } : l), o;
  });
}
async function Vp(e, t, n, i) {
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
function Up() {
  const [e, t] = React.useState(() => Gc());
  return React.useEffect(() => {
    const n = setInterval(() => {
      t((i) => ({
        ...i,
        speakers: i.speakers.map((o) => o.playing ? { ...o, progress: (o.progress + 1) % (we.find((l) => l.id === o.trackId)?.dur || 240) } : o)
      }));
    }, 1e3);
    return () => clearInterval(n);
  }, []), [e, t];
}
function Gp(e) {
  const t = Math.floor(e / 60), n = Math.floor(e % 60);
  return `${t}:${n.toString().padStart(2, "0")}`;
}
function Qp(e) {
  return we.find((t) => t.id === e) || we[0];
}
Object.assign(window, { Icon: Ap, ROOMS: Op, TRACKS: we, PLAYLISTS: Uc, initialDevices: Gc, runAgent: Wp, runAutomation: Bp, parseAutomation: Qc, callClaude: Vp, useHomeState: Up, fmtTime: Gp, trackById: Qp });
function Kc() {
  return ie.useContext(br);
}
function Kp(e, t) {
  const n = ((t || "") + " " + (e || "")).toLowerCase();
  return /living|family\s*room|den/.test(n) ? "living" : /kitchen|dining/.test(n) ? "kitchen" : /bed|primary|guest\s*room|nursery/.test(n) ? "bedroom" : /office|study/.test(n) ? "office" : /outdoor|patio|porch|yard|garden|exterior|driveway|garage|backyard|frontyard|front\s*door/.test(n) ? "outdoor" : "living";
}
function Yp(e) {
  return e?.state === "on" || e?.state === "open" || e?.state === "unlocked" || e?.state === "playing";
}
function Xp(e) {
  return typeof e?.brightness == "number" ? Math.round(e.brightness / 255 * 100) : 80;
}
function qp(e) {
  return !Array.isArray(e) || e.length < 3 ? "#ffe0b2" : "#" + e.slice(0, 3).map((t) => Math.max(0, Math.min(255, t | 0)).toString(16).padStart(2, "0")).join("");
}
function Or(e) {
  if (!e) return "—";
  try {
    return new Date(e).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } catch {
    return "—";
  }
}
function Jp(e) {
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
    return { ...t, ...Ca() };
  const n = Object.values(e);
  for (const o of n) {
    const l = o.entity_id, s = l.split(".")[0], a = o.attributes?.friendly_name || l, d = Kp(a, o.attributes?.area_id);
    switch (s) {
      case "light":
        t.lights.push({
          id: l,
          room: d,
          name: a,
          on: Yp(o),
          brightness: Xp(o.attributes),
          color: o.attributes?.rgb_color ? qp(o.attributes.rgb_color) : "#ffe0b2"
        });
        break;
      case "media_player": {
        const c = o.attributes?.device_class, f = c === "tv" || /\btv\b/i.test(a) || /apple\s*tv/i.test(a) || /chromecast/i.test(a) || /webos/i.test(a), u = o.state === "playing", h = typeof o.attributes?.volume_level == "number" ? Math.round(o.attributes.volume_level * 100) : 30;
        f ? (t.tvs.push({
          id: l,
          name: a,
          brand: c === "tv" ? "tv" : "appletv",
          model: a,
          room: d,
          on: o.state !== "off" && o.state !== "unavailable",
          app: o.attributes?.app_name || "—",
          show: o.attributes?.media_title || "—",
          poster: "oklch(45% 0.10 280)",
          playing: u,
          progress: o.attributes?.media_position || 0,
          dur: o.attributes?.media_duration || 0,
          vol: h,
          mute: !!o.attributes?.is_volume_muted,
          input: o.attributes?.source || "—"
        }), t.tv.on === !1 && o.state !== "off" && o.state !== "unavailable" && (t.tv = { on: !0, source: o.attributes?.app_name || a, show: o.attributes?.media_title || "" })) : t.speakers.push({
          id: l,
          room: d,
          name: a,
          type: "sonos",
          playing: u,
          vol: h,
          group: o.attributes?.group_members?.[0] || null,
          trackId: null,
          // prototype expected an ID into TRACKS; we don't have that
          progress: o.attributes?.media_position || 0,
          queue: [],
          haMediaTitle: o.attributes?.media_title || null,
          haMediaArtist: o.attributes?.media_artist || null,
          haMediaAlbum: o.attributes?.media_album_name || null,
          haEntityPicture: o.attributes?.entity_picture || null
        });
        break;
      }
      case "lock":
        t.locks.push({ id: l, name: a, locked: o.state === "locked" });
        break;
      case "cover": {
        const c = o.attributes?.device_class;
        (c === "garage" || c === "door" || /garage/i.test(a)) && t.garage.doors.push({
          id: l,
          name: a,
          open: o.state === "open" || o.state === "opening",
          lastChanged: Or(o.last_changed)
        });
        break;
      }
      case "vacuum":
        t.vacuum || (t.vacuum = {
          id: l,
          name: a,
          state: o.state,
          battery: o.attributes?.battery_level ?? 100,
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
          id: l,
          temp: o.attributes?.current_temperature ?? 70,
          target: o.attributes?.temperature ?? o.attributes?.target_temp_high ?? 72,
          mode: o.state || "auto",
          humidity: o.attributes?.current_humidity ?? 42
        });
        break;
      case "weather":
        t.weather || (t.weather = {
          temp: Math.round(o.attributes?.temperature ?? 64),
          summary: (o.state || "Partly cloudy").replace(/-/g, " "),
          high: Math.round(o.attributes?.forecast?.[0]?.temperature ?? 71),
          low: Math.round(o.attributes?.forecast?.[0]?.templow ?? 52),
          hourly: (o.attributes?.forecast || []).slice(0, 12).map((c) => Math.round(c.temperature || 65))
        });
        break;
      case "camera":
        t.cameras.push({
          id: l,
          name: a,
          room: d,
          online: o.state !== "unavailable",
          motion: !1,
          hue: "oklch(60% 0.10 200)"
        });
        break;
      case "scene":
        t.scenes.push({ id: l, name: a, icon: "sparkle", active: !1 });
        break;
      case "automation":
        t.automations.push({
          id: l,
          name: a,
          trigger: { type: "ha" },
          actions: [],
          enabled: o.state === "on",
          lastRun: Or(o.attributes?.last_triggered),
          desc: a
        });
        break;
      case "alarm_control_panel":
        if (!t.ring) {
          const c = { armed_home: "home", armed_away: "away", armed_night: "home", disarmed: "disarmed" };
          t.ring = {
            id: l,
            mode: c[o.state] || "disarmed",
            lastChanged: Or(o.last_changed),
            changedBy: "HA"
          };
        }
        break;
      case "todo": {
        const c = parseInt(o.state, 10);
        t.todos.push({
          id: l,
          name: a,
          count: Number.isFinite(c) ? c : 0
        });
        break;
      }
      case "calendar":
        if (t.calendar.push({ id: l, name: a }), o.attributes?.message && (o.attributes?.start_time || o.attributes?.start)) {
          const c = o.attributes.start_time || o.attributes.start, f = new Date(c), u = o.attributes.all_day === !0 || typeof c == "string" && !c.includes("T");
          t.calendarEvents.push({
            id: `${l}-next`,
            title: o.attributes.message,
            where: o.attributes.location || "",
            kind: /birthday|bday/i.test(o.attributes.message) ? "birthday" : "event",
            start: c,
            isAllDay: u,
            day: f.getDate(),
            monthShort: f.toLocaleDateString([], { month: "short" }).toUpperCase(),
            timeStr: u ? "All day" : f.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
            sortKey: f.getTime()
          });
        }
        break;
      case "sensor": {
        const c = o.attributes || {};
        if (c.team_homeaway && c.team_score !== void 0)
          t.sports.push({
            id: l,
            team: c.team_name || a,
            opponent: c.opponent_name || "Opponent",
            teamScore: c.team_score,
            oppScore: c.opponent_score,
            state: o.state,
            live: o.state === "IN" || o.state === "in_progress"
          });
        else if (c.team_abbr && c.opponent_abbr) {
          const f = /^(IN|HALF|END)$/.test(o.state);
          t.sports.push({
            id: l,
            team: c.team_abbr,
            opponent: c.opponent_abbr,
            teamScore: c.team_score,
            oppScore: c.opponent_score,
            state: f ? `${c.clock || ""} Q${c.quarter || ""}`.trim() : o.state || "",
            live: f
          });
        }
        break;
      }
      case "event": {
        if (l.startsWith("event.feedreader") || /feedreader|rss/i.test(a)) {
          const c = Array.isArray(o.attributes?.entries) ? o.attributes.entries : [];
          for (const f of c.slice(0, 5))
            t.news.push({
              id: `${l}-${f.id || f.link || f.title}`,
              title: f.title || "Untitled",
              url: f.link || "#",
              source: o.attributes?.feed_title || a,
              timeAgo: Or(f.published || f.updated || o.last_changed)
            });
        }
        break;
      }
    }
  }
  t.calendarEvents.sort((o, l) => (o.sortKey || 0) - (l.sortKey || 0));
  const i = /* @__PURE__ */ new Map();
  for (const o of n)
    if (o.entity_id.startsWith("binary_sensor.") && o.attributes?.device_class === "motion") {
      const l = (o.attributes?.friendly_name || "").toLowerCase().replace(/\s*motion\s*$/, "").trim();
      l && i.set(l, o.state === "on");
    }
  return t.cameras = t.cameras.map((o) => {
    const l = o.name.toLowerCase();
    return { ...o, motion: i.get(l) ?? o.motion };
  }), { ...t, ...Ca(t) };
}
function Ca(e) {
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
    tesla: {
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
const Zp = 50;
typeof window < "u" && !window.__hcDiag && (window.__hcDiag = []);
function Je(e) {
  if (typeof window > "u") return;
  const t = window.__hcDiag;
  for (t.push(e); t.length > Zp; ) t.shift();
}
function eh(e, t, n) {
  if (!n || typeof n.callService != "function") {
    console.warn("[ha-bridge] hass not available — skipping dispatch"), Je({ ts: Date.now(), kind: "skip", message: "hass not available" });
    return;
  }
  const i = (s, a, d) => {
    const c = { ts: Date.now(), kind: "call", domain: s, service: a, data: d, status: "pending" };
    Je(c), console.log(`[ha-bridge] → ${s}.${a}`, d);
    try {
      const f = n.callService(s, a, d);
      f && typeof f.then == "function" ? f.then(
        () => {
          c.status = "ok", console.log(`[ha-bridge] ✓ ${s}.${a}`);
        },
        (u) => {
          c.status = "error", c.error = u?.message || String(u), console.warn(`[ha-bridge] ✗ ${s}.${a} rejected:`, u?.message || u, u);
        }
      ) : c.status = "ok";
    } catch (f) {
      c.status = "error", c.error = f?.message || String(f), console.warn(`[ha-bridge] ✗ ${s}.${a} threw:`, f);
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
  e.thermostat && (e.thermostat.target !== t.thermostat.target || e.thermostat.mode !== t.thermostat.mode) && (t.thermostat?.id ? (e.thermostat.target !== t.thermostat.target && ((e.thermostat.mode === "off" || e.thermostat.mode === "unavailable") && i("climate", "set_hvac_mode", { entity_id: t.thermostat.id, hvac_mode: "auto" }), i("climate", "set_temperature", { entity_id: t.thermostat.id, temperature: t.thermostat.target })), e.thermostat.mode !== t.thermostat.mode && i("climate", "set_hvac_mode", { entity_id: t.thermostat.id, hvac_mode: t.thermostat.mode })) : Je({
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
      Je({
        ts: Date.now(),
        kind: "skip",
        message: "Ring mode change ignored — no alarm_control_panel.* entity in HA. Add a Ring (or other alarm) integration and the tile will start firing alarm_arm_home / alarm_arm_away / alarm_disarm."
      });
    else {
      const a = { home: "alarm_arm_home", away: "alarm_arm_away", disarmed: "alarm_disarm" }[t.ring.mode];
      a ? i("alarm_control_panel", a, { entity_id: t.ring.id }) : Je({ ts: Date.now(), kind: "skip", message: `Unknown ring mode: ${t.ring.mode}` });
    }
}
function za() {
  const e = Kc(), t = e?.states || null, n = ie.useMemo(() => Jp(t), [t]), i = ie.useRef(!1);
  ie.useEffect(() => {
    if (i.current || !t) return;
    i.current = !0;
    const u = {};
    for (const v of Object.keys(t)) {
      const w = v.split(".")[0];
      u[w] = (u[w] || 0) + 1;
    }
    const h = Object.entries(u).sort().map(([v, w]) => `${v}=${w}`).join(" ");
    Je({ ts: Date.now(), kind: "info", message: `HA entity inventory: ${h || "none"}` }), u.climate || Je({ ts: Date.now(), kind: "info", message: "↑ no climate.* — thermostat tile will be read-only" }), u.alarm_control_panel || Je({ ts: Date.now(), kind: "info", message: "↑ no alarm_control_panel.* — Ring tile will be read-only" }), u.cover || Je({ ts: Date.now(), kind: "info", message: "↑ no cover.* — garage tile will be read-only" }), u.vacuum || Je({ ts: Date.now(), kind: "info", message: "↑ no vacuum.* — vacuum tile will be read-only" });
  }, [t]);
  const [o, l] = ie.useState(null), s = o || n, a = ie.useRef(null), d = ie.useRef(null), c = ie.useRef(null), f = ie.useCallback((u) => {
    l((h) => {
      const v = h || n, w = typeof u == "function" ? u(v) : { ...v, ...u };
      return c.current || (c.current = { base: v, hass: e }), c.current.next = w, clearTimeout(d.current), d.current = setTimeout(() => {
        const p = c.current;
        p && eh(p.base, p.next, p.hass), c.current = null, d.current = null;
      }, 400), w;
    }), clearTimeout(a.current), a.current = setTimeout(() => l(null), 3e3);
  }, [e, n]);
  return ie.useEffect(() => {
    if (!o) return;
    const u = setTimeout(() => l(null), 3e3);
    return () => clearTimeout(u);
  }, [t]), [s, f];
}
typeof window < "u" && (window.useHomeState = za, window.useHomeStateHA = za, window.useHass = Kc);
const Yc = { S: 2, M: 3, L: 6 }, th = { S: 2, M: 4, L: 4 }, nh = ({ layout: e, onLayoutChange: t, render: n, editing: i, ctx: o, narrow: l }) => {
  const { p: s, fonts: a } = o, d = l ? 4 : 6, c = l ? th : Yc, [f, u] = React.useState(null), h = React.useRef(null), v = React.useRef(null), w = e?.items || [], p = (x, k, j) => {
    if (!i || x.target.closest("[data-tile-resize]")) return;
    x.preventDefault();
    const S = x.currentTarget, C = S.getBoundingClientRect(), _ = v.current.getBoundingClientRect();
    S.setPointerCapture?.(x.pointerId), u({
      id: k,
      from: j,
      pointerId: x.pointerId,
      x: x.clientX - _.left,
      y: x.clientY - _.top,
      offsetX: x.clientX - C.left,
      offsetY: x.clientY - C.top,
      w: C.width,
      h: C.height,
      target: j
    }), navigator.vibrate && navigator.vibrate(8);
  }, b = (x) => {
    if (!f) return;
    const k = v.current.getBoundingClientRect(), j = x.clientX - k.left, S = x.clientY - k.top;
    u((z) => ({ ...z, x: j, y: S }));
    const C = v.current.querySelectorAll("[data-tile-id]");
    let _ = f.target;
    for (const z of C) {
      const I = z.getBoundingClientRect();
      if (x.clientX >= I.left && x.clientX <= I.right && x.clientY >= I.top && x.clientY <= I.bottom) {
        const F = z.getAttribute("data-tile-id");
        if (F === f.id) continue;
        _ = w.findIndex(($) => $.id === F);
        break;
      }
    }
    _ !== f.target && u((z) => ({ ...z, target: _ }));
  }, m = (x) => {
    if (f) {
      if (f.target !== f.from) {
        const k = [...w], [j] = k.splice(f.from, 1);
        k.splice(f.target, 0, j), t({ ...e, items: k });
      }
      u(null);
    }
  }, g = (x) => {
    const k = ["S", "M", "L"], j = w.map((S) => S.id === x ? { ...S, size: k[(k.indexOf(S.size) + 1) % 3] } : S);
    t({ ...e, items: j });
  };
  React.useEffect(() => {
    if (!f) return;
    const x = (j) => b(j), k = (j) => m();
    return window.addEventListener("pointermove", x), window.addEventListener("pointerup", k), window.addEventListener("pointercancel", k), () => {
      window.removeEventListener("pointermove", x), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k);
    };
  }, [f]);
  let y = w.map((x, k) => ({ ...x, _i: k }));
  if (f) {
    const x = [...y], [k] = x.splice(f.from, 1);
    x.splice(f.target, 0, k), y = x;
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
      const k = Math.min(c[x.size] || 2, d), j = f && f.id === x.id;
      return /* @__PURE__ */ r.jsxs(
        "div",
        {
          "data-tile-id": x.id,
          onPointerDown: i ? (S) => p(S, x.id, w.findIndex((C) => C.id === x.id)) : void 0,
          style: {
            gridColumn: `span ${k}`,
            position: "relative",
            opacity: j ? 0 : 1,
            cursor: i ? j ? "grabbing" : "grab" : "default",
            transition: f ? "transform .25s cubic-bezier(.2,.7,.4,1)" : "none",
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
    f && /* @__PURE__ */ r.jsx("div", { ref: h, style: {
      position: "absolute",
      pointerEvents: "none",
      left: f.x - f.offsetX,
      top: f.y - f.offsetY,
      width: f.w,
      height: f.h,
      transform: "rotate(-1deg) scale(1.02)",
      boxShadow: "0 24px 60px rgba(0,0,0,.45)",
      borderRadius: 14,
      zIndex: 100,
      opacity: 0.95
    }, children: n(f.id, w.find((x) => x.id === f.id)?.size, !0) })
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
Object.assign(window, { DragGrid: nh, TILE_SPAN: Yc });
async function rh(e, t, { agentId: n } = {}) {
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
const ih = (() => {
  if (typeof window > "u") return ["localhost"];
  const e = /* @__PURE__ */ new Set(), t = window.location.hostname || "localhost";
  return e.add(t), e.add("homeassistant.local"), /\.ts\.net$/.test(t) && e.add(t), Array.from(e);
})();
function oh(e, t = {}) {
  const n = e.toLowerCase().replace(/\s+/g, ""), i = ih.map((o) => `parent=${encodeURIComponent(o)}`).join("&");
  return `https://player.twitch.tv/?channel=${encodeURIComponent(n)}&${i}&muted=${t.muted ? "true" : "false"}`;
}
function lh(e, t = {}) {
  return `https://www.youtube.com/embed/${encodeURIComponent(e)}?autoplay=${t.autoplay === !1 ? 0 : 1}`;
}
function sh(e) {
  const t = e.replace(/^@/, "");
  return `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(t)}&autoplay=1`;
}
function ah(e) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(e)}`;
}
function dh(e) {
  return `https://player.vimeo.com/video/${encodeURIComponent(e)}?autoplay=1`;
}
const Ln = {
  twitch: oh,
  youtube: lh,
  youtubeChannel: sh,
  youtubeSearch: ah,
  vimeo: dh
}, ch = [
  // "open <name> on twitch" / "watch <name> on twitch"
  {
    re: /^(?:open|watch|put on|play|start|launch)\s+(.+?)(?:'s)?\s+(?:stream\s+)?on\s+twitch\b.*$/i,
    handler: (e) => {
      const t = e[1].trim();
      return { type: "open_url", label: `${t} on Twitch`, url: Ln.twitch(t) };
    }
  },
  {
    re: /^(?:open|watch|launch)\s+twitch(?:\s+(?:stream\s+)?(?:for|of)\s+)?\s*(.+)?$/i,
    handler: (e) => {
      const t = (e[1] || "").trim();
      return t ? { type: "open_url", label: `${t} on Twitch`, url: Ln.twitch(t) } : { type: "speech", text: "Which Twitch channel?" };
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
    handler: (e) => ({ type: "open_url", label: `YouTube: ${e[1].trim()}`, url: Ln.youtubeSearch(e[1].trim()) })
  },
  // "play youtube video <id>"
  {
    re: /^(?:open|play|watch)\s+youtube\s+(?:video\s+)?([\w-]{6,15})\s*$/i,
    handler: (e) => ({ type: "open_url", label: "YouTube", url: Ln.youtube(e[1]) })
  },
  // Vimeo
  {
    re: /^(?:open|watch|play)\s+vimeo\s+(\d+)\s*$/i,
    handler: (e) => ({ type: "open_url", label: "Vimeo", url: Ln.vimeo(e[1]) })
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
function uh(e) {
  if (!e) return null;
  const t = e.trim().replace(/[.!?]+$/, "");
  for (const { re: n, handler: i } of ch) {
    const o = t.match(n);
    if (o) return i(o);
  }
  return null;
}
let Wr = null;
function fl() {
  if (typeof window > "u" || !window.speechSynthesis) return [];
  const e = window.speechSynthesis.getVoices();
  return e && e.length, e || [];
}
typeof window < "u" && window.speechSynthesis && (fl(), window.speechSynthesis.onvoiceschanged = () => {
  fl();
});
function fh(e) {
  if (!e.length) return null;
  const t = (n) => {
    const i = (n.name || "").toLowerCase(), o = (n.lang || "").toLowerCase();
    if (!o.startsWith("en")) return -1;
    let l = 0;
    return (o === "en-gb" || /uk|british|england/.test(i)) && (l += 50), /daniel|oliver|arthur|ryan|george|brian/.test(i) && (l += 40), /aria|jenny|samantha|emma|libby|sonia/.test(i) && (l += 25), /siri/.test(i) && (l += 35), /neural|natural|online/.test(i) && (l += 30), /premium|enhanced/.test(i) && (l += 20), /google/.test(i) && (l += 10), /^microsoft (david|mark|zira|hazel)$/.test(n.name) && (l -= 30), l;
  };
  return e.filter((n) => (n.lang || "").toLowerCase().startsWith("en")).sort((n, i) => t(i) - t(n))[0] || e[0];
}
function ph() {
  if (Wr) return Wr;
  const e = fl();
  return Wr = fh(e), Wr;
}
function hh(e, { rate: t = 1, pitch: n = 1, lang: i = "en-US" } = {}) {
  if (!e || typeof window > "u" || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
  }
  const o = new SpeechSynthesisUtterance(e);
  o.rate = t, o.pitch = n, o.lang = i;
  const l = ph();
  l && (o.voice = l, l.lang && (o.lang = l.lang)), window.speechSynthesis.speak(o);
}
function gh() {
  if (!(typeof window > "u"))
    try {
      window.speechSynthesis?.cancel();
    } catch {
    }
}
const mh = ({ dark: e, density: t, accent: n, agentTone: i, fontPair: o, bgImage: l, visibleDevices: s, settings: a, setSetting: d, user: c, patchUser: f, doLogout: u, narrow: h, openBrowser: v }) => {
  const w = React.useContext(br), [p, b] = window.useHomeState(), [m, g] = React.useState("home"), [y, x] = React.useState("living"), [k, j] = React.useState(!1), [S, C] = React.useState(!1), [_, z] = React.useState(0), [I, F] = React.useState(!1), [$, D] = React.useState([
    { who: "agent", text: `Hi ${c?.firstName || "there"} — ask me anything about your home, or tell me to do something. Try "set the mood for dinner" or "open Esfand on Twitch".`, t: "now" }
  ]), [B, J] = React.useState(""), re = Xc(e, n), R = pl[o] || pl.editorial, P = hl[t] || hl.regular, E = a?.ttsAgent !== !1, A = (Z) => {
    !E || !Z || (gh(), hh(Z, { rate: 1, pitch: 1 }));
  }, L = async (Z) => {
    if (!Z.trim()) return;
    const ut = { who: "user", text: Z, t: "now" };
    D((ze) => [...ze, ut]), J("");
    const ft = uh(Z);
    if (ft?.type === "open_url" && v) {
      v(ft.url, ft.label);
      const ze = `Opening ${ft.label || ft.url}.`;
      D((Vi) => [...Vi, { who: "agent", text: ze, t: "now" }]), A(ze), S || z((Vi) => Vi + 1);
      return;
    }
    if (ft?.type === "speech") {
      D((ze) => [...ze, { who: "agent", text: ft.text, t: "now" }]), A(ft.text), S || z((ze) => ze + 1);
      return;
    }
    F(!0);
    let Et = null;
    w && (Et = (await rh(w, Z))?.speech || null), Et || (Et = window.runAgent(Z, p, b)), Et || (Et = "I'm here, but no conversation agent is configured yet — set one up in HA → Settings → Voice Assistants and I'll get smarter."), F(!1), D((ze) => [...ze, { who: "agent", text: Et, t: "now" }]), A(Et), S || z((ze) => ze + 1);
  }, $e = () => {
    C(!0), z(0);
  }, Q = { p: re, fonts: R, dens: P, state: p, setState: b, room: y, setRoom: x, page: m, setPage: g, visible: s || { lights: !0, music: !0, cameras: !0, climate: !0, locks: !0, scenes: !0, calendar: !0, weather: !0, alarms: !0, tv: !0 }, accent: n, dark: e, settings: a, setSetting: d, user: c, patchUser: f, doLogout: u, narrow: h };
  return /* @__PURE__ */ r.jsxs("div", { "data-screen-label": "HomeCNTRD", style: {
    width: "100%",
    height: "100%",
    background: re.bg,
    color: re.fg,
    fontFamily: R.body,
    position: "relative",
    overflow: "hidden",
    backgroundImage: l ? `url(${l})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }, children: [
    l && /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, background: e ? "rgba(20,15,12,.78)" : "rgba(248,243,235,.84)", backdropFilter: "blur(2px)" } }),
    p.dnd.active && /* @__PURE__ */ r.jsx(Sh, { ctx: Q }),
    /* @__PURE__ */ r.jsxs("div", { style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: h || m === "home" ? "1fr" : "232px 1fr",
      gridTemplateRows: h ? "1fr 64px" : "1fr",
      height: "100%"
    }, children: [
      !h && m !== "home" && /* @__PURE__ */ r.jsx(Ra, { ctx: Q }),
      /* @__PURE__ */ r.jsxs("main", { style: { overflow: "auto", padding: h ? "16px 14px 14px" : m === "home" ? 0 : P.pad, display: "flex", flexDirection: "column", gap: P.gap, paddingBottom: h ? 80 : void 0 }, children: [
        h && /* @__PURE__ */ r.jsx(yh, { ctx: Q }),
        m === "home" && /* @__PURE__ */ r.jsx(window.PersonalDashboard, { ctx: Q, onOpenMenu: () => j(!0) }),
        m === "dashboard" && /* @__PURE__ */ r.jsx(window.HomeView, { ctx: Q }),
        m === "music" && /* @__PURE__ */ r.jsx(window.MusicView, { ctx: Q }),
        m === "cameras" && /* @__PURE__ */ r.jsx(window.CamerasView, { ctx: Q }),
        m === "calendar" && /* @__PURE__ */ r.jsx(window.CalendarView, { ctx: Q }),
        m === "car" && /* @__PURE__ */ r.jsx(window.CarView, { ctx: Q }),
        m === "garage" && /* @__PURE__ */ r.jsx(window.GarageView, { ctx: Q }),
        m === "devices" && /* @__PURE__ */ r.jsx(window.DevicesView, { ctx: Q }),
        m === "automations" && /* @__PURE__ */ r.jsx(window.AutomationsView, { ctx: Q }),
        m === "settings" && /* @__PURE__ */ r.jsx(window.SettingsView, { ctx: Q })
      ] }),
      h && /* @__PURE__ */ r.jsx(xh, { ctx: Q })
    ] }),
    !h && m === "home" && k && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
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
      }, children: /* @__PURE__ */ r.jsx(Ra, { ctx: { ...Q, setPage: (Z) => {
        g(Z), j(!1);
      } } }) })
    ] }),
    /* @__PURE__ */ r.jsx(window.NowPlayingBar, { ctx: Q }),
    /* @__PURE__ */ r.jsx(
      Ch,
      {
        ctx: Q,
        open: S,
        setOpen: C,
        unread: _,
        messages: $,
        thinking: I,
        draft: B,
        setDraft: J,
        send: L,
        openAgent: $e,
        agentTone: i
      }
    )
  ] });
}, Ta = {
  tangerine: "#e87f4a",
  terracotta: "#c96442",
  ochre: "#b8843e",
  sage: "#7a8c6c",
  plum: "#7d4f6b",
  slate: "#5b7390"
};
function Xc(e, t) {
  const n = Ta[t] || Ta.tangerine;
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
const pl = {
  editorial: { display: '"Newsreader", "Iowan Old Style", Georgia, serif', body: '"Inter", -apple-system, system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace' },
  classic: { display: '"Instrument Serif", "Iowan Old Style", Georgia, serif', body: '"Inter", system-ui, sans-serif', mono: '"JetBrains Mono", monospace' },
  modern: { display: '"Space Grotesk", system-ui, sans-serif', body: '"Inter", system-ui, sans-serif', mono: '"JetBrains Mono", monospace' }
}, hl = {
  compact: { pad: "18px 22px", gap: 14, tilePad: 14, tileGap: 10, h1: 30, h2: 14 },
  regular: { pad: "24px 32px", gap: 18, tilePad: 18, tileGap: 14, h1: 38, h2: 15 },
  comfy: { pad: "32px 40px", gap: 24, tilePad: 22, tileGap: 18, h1: 46, h2: 16 }
}, Ra = ({ ctx: e }) => {
  const { p: t, fonts: n, page: i, setPage: o, room: l, setRoom: s, state: a, user: d } = e, c = ({ children: p }) => /* @__PURE__ */ r.jsx("div", { style: { padding: "10px 14px 4px", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: t.fg3, fontWeight: 500 }, children: p }), f = ({ active: p, onClick: b, icon: m, label: g, count: y, badge: x }) => /* @__PURE__ */ r.jsxs("button", { onClick: b, style: {
    display: "flex",
    alignItems: "center",
    gap: 11,
    width: "calc(100% - 16px)",
    margin: "1px 8px",
    padding: "8px 12px",
    borderRadius: 8,
    border: 0,
    cursor: "pointer",
    background: p ? t.warm : "transparent",
    color: p ? t.fg : t.fg2,
    fontFamily: n.body,
    fontSize: 13.5,
    textAlign: "left",
    fontWeight: p ? 500 : 400,
    borderLeft: p ? `2px solid ${t.accent}` : "2px solid transparent"
  }, children: [
    /* @__PURE__ */ r.jsx(window.Icon, { name: m, size: 16, stroke: 1.5 }),
    /* @__PURE__ */ r.jsx("span", { style: { flex: 1 }, children: g }),
    y !== void 0 && y !== "" && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, color: t.fg3, fontVariantNumeric: "tabular-nums" }, children: y }),
    x && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 9, padding: "2px 6px", borderRadius: 999, background: t.accent, color: "#fff", fontWeight: 600 }, children: x })
  ] }), u = a.cameras.filter((p) => p.online).length, h = a.speakers.filter((p) => p.playing).length, v = a.calendar.length, w = a.garage.doors.filter((p) => p.open).length;
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
      /* @__PURE__ */ r.jsx(f, { active: i === "home", onClick: () => o("home"), icon: "home", label: "Home" }),
      /* @__PURE__ */ r.jsx(f, { active: i === "dashboard", onClick: () => o("dashboard"), icon: "grid", label: "Dashboard" }),
      /* @__PURE__ */ r.jsx(f, { active: i === "music", onClick: () => o("music"), icon: "music", label: "Music", count: h ? `${h} playing` : "" }),
      /* @__PURE__ */ r.jsx(f, { active: i === "cameras", onClick: () => o("cameras"), icon: "cam", label: "Cameras", count: `${u}/${a.cameras.length}` }),
      /* @__PURE__ */ r.jsx(f, { active: i === "calendar", onClick: () => o("calendar"), icon: "cal", label: "Calendar", count: v }),
      /* @__PURE__ */ r.jsx(f, { active: i === "car", onClick: () => o("car"), icon: "car", label: "Car", count: `${a.tesla.chargePct}%` }),
      /* @__PURE__ */ r.jsx(f, { active: i === "garage", onClick: () => o("garage"), icon: "garage", label: "Garage", badge: w ? "OPEN" : "" }),
      /* @__PURE__ */ r.jsx(f, { active: i === "devices", onClick: () => o("devices"), icon: "grid", label: "Devices", count: a.integrations.filter((p) => p.status === "connected").length }),
      /* @__PURE__ */ r.jsx(f, { active: i === "automations", onClick: () => o("automations"), icon: "sparkle", label: "Automations", count: a.automations.filter((p) => p.enabled).length }),
      i === "dashboard" && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
        /* @__PURE__ */ r.jsx(c, { children: "Rooms" }),
        window.ROOMS.map((p) => {
          const b = a.lights.filter((m) => m.room === p.id && m.on).length;
          return /* @__PURE__ */ r.jsx(f, { active: l === p.id, onClick: () => s(p.id), icon: p.icon, label: p.name, count: b > 0 ? b : "" }, p.id);
        }),
        /* @__PURE__ */ r.jsx(c, { children: "Quick scenes" }),
        a.scenes.slice(0, 4).map((p) => /* @__PURE__ */ r.jsx(f, { icon: p.icon, label: p.name, active: p.active }, p.id))
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: { borderTop: `.5px solid ${t.border}`, padding: 8 }, children: [
      /* @__PURE__ */ r.jsx(f, { active: i === "settings", onClick: () => o("settings"), icon: "settings", label: "Settings" }),
      /* @__PURE__ */ r.jsxs("div", { style: { padding: "10px 14px 4px", display: "flex", alignItems: "center", gap: 10, fontSize: 11, color: t.fg2 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 8, height: 8, borderRadius: "50%", background: "oklch(60% 0.15 145)" } }),
        /* @__PURE__ */ r.jsx("span", { children: "32 devices · all online" })
      ] })
    ] })
  ] });
}, yh = ({ ctx: e }) => {
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
}, xh = ({ ctx: e }) => {
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
}, vh = ({ p: e, children: t, style: n, ...i }) => /* @__PURE__ */ r.jsx("div", { ...i, style: {
  background: e.surface2,
  border: `.5px solid ${e.border}`,
  borderRadius: 14,
  padding: 18,
  color: e.fg,
  ...n
}, children: t }), wh = ({ title: e, subtitle: t, p: n, fonts: i, children: o, action: l }) => /* @__PURE__ */ r.jsxs("section", { children: [
  /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 12 }, children: [
      /* @__PURE__ */ r.jsx("h2", { style: { margin: 0, fontFamily: i.display, fontSize: 20, fontWeight: 500, color: n.fg }, children: e }),
      t && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 12, color: n.fg3, fontStyle: "italic" }, children: t })
    ] }),
    l
  ] }),
  o
] }), kh = ({ ctx: e, eyebrow: t, title: n, sub: i, right: o }) => {
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
}, bh = ({ p: e, fonts: t, active: n, onClick: i, children: o, danger: l, style: s }) => /* @__PURE__ */ r.jsx("button", { onClick: i, style: {
  padding: "7px 12px",
  borderRadius: 8,
  cursor: "pointer",
  fontFamily: t.body,
  fontSize: 12,
  border: `.5px solid ${l ? e.danger : n ? e.accent : e.border2}`,
  background: l ? e.danger : n ? e.accentSoft : "transparent",
  color: l ? "#fff" : n ? e.accent : e.fg,
  ...s
}, children: o }), jh = ({ p: e, on: t, onChange: n, size: i = 20 }) => /* @__PURE__ */ r.jsx("button", { onClick: () => n(!t), style: {
  width: i * 1.7,
  height: i,
  borderRadius: 999,
  border: 0,
  cursor: "pointer",
  position: "relative",
  background: t ? e.accent : e.border2,
  transition: ".2s"
}, children: /* @__PURE__ */ r.jsx("span", { style: { position: "absolute", top: 2, left: t ? i * 0.7 + 2 : 2, width: i - 4, height: i - 4, borderRadius: "50%", background: "#fff", transition: ".2s" } }) }), Sh = ({ ctx: e }) => {
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
}, Ch = ({ ctx: e, open: t, setOpen: n, unread: i, messages: o, thinking: l, draft: s, setDraft: a, send: d, openAgent: c, agentTone: f }) => {
  const { p: u, fonts: h, narrow: v } = e, w = React.useRef(null), p = React.useRef(null), [b, m] = React.useState(null);
  React.useEffect(() => {
    t && w.current && w.current.focus();
  }, [t]), React.useEffect(() => {
    p.current && (p.current.scrollTop = p.current.scrollHeight);
  }, [o, l]);
  const g = v ? 84 : 24, y = v ? 152 : 92, x = [
    "Find me a chocolate chip cookie recipe",
    "Set up movie night",
    "Lock the house",
    "Precondition the Tesla",
    "Best Italian recipes for tonight"
  ], k = { jarvis: "Jarvis", terse: "CTRL", playful: "Pip" }[f] || "Jarvis";
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
          /* @__PURE__ */ r.jsx("div", { style: { fontFamily: h.display, fontSize: 15, color: u.fg, fontWeight: 500 }, children: k }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: u.fg3 }, children: [
            /* @__PURE__ */ r.jsx("span", { style: { color: "oklch(60% 0.13 145)" }, children: "●" }),
            " Listening · everything online"
          ] })
        ] }),
        /* @__PURE__ */ r.jsx("button", { onClick: () => n(!1), style: { border: 0, background: "transparent", color: u.fg3, cursor: "pointer", padding: 6, fontSize: 18 }, children: "×" })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { ref: p, style: { flex: 1, overflow: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }, children: [
        o.map((j, S) => /* @__PURE__ */ r.jsx(zh, { m: j, p: u, fonts: h, onOpen: (C, _) => m({ url: C, title: _ }) }, S)),
        l && /* @__PURE__ */ r.jsx(Rh, { p: u, fonts: h })
      ] }),
      o.length <= 1 && /* @__PURE__ */ r.jsx("div", { style: { padding: "0 16px 8px", display: "flex", flexWrap: "wrap", gap: 6 }, children: x.map((j) => /* @__PURE__ */ r.jsx("button", { onClick: () => d(j), style: { padding: "5px 10px", borderRadius: 999, border: `.5px solid ${u.border2}`, background: "transparent", color: u.fg2, fontSize: 11, cursor: "pointer", fontFamily: h.body }, children: j }, j)) }),
      /* @__PURE__ */ r.jsxs("form", { onSubmit: (j) => {
        j.preventDefault(), d(s);
      }, style: { padding: 12, borderTop: `.5px solid ${u.border}`, display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ r.jsx("input", { ref: w, value: s, onChange: (j) => a(j.target.value), placeholder: `Ask ${k} anything…`, style: {
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
    b && /* @__PURE__ */ r.jsx(Th, { p: u, fonts: h, url: b.url, title: b.title, onClose: () => m(null) })
  ] });
}, zh = ({ m: e, p: t, fonts: n, onOpen: i }) => {
  const o = e.who === "user", l = (e.text || "").split(`
`), s = [], a = [];
  for (const c of l) {
    const f = c.match(/^\s*LINK:\s*(.+?)\s*\|\s*(https?:\/\/\S+)\s*$/i);
    f ? s.push({ title: f[1], url: f[2] }) : a.push(c);
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
    s.length > 0 && /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 5, width: "100%" }, children: s.map((c, f) => /* @__PURE__ */ r.jsxs("button", { onClick: () => i?.(c.url, c.title), style: {
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
    ] }, f)) }),
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3 }, children: e.t })
  ] });
}, Th = ({ p: e, fonts: t, url: n, title: i, onClose: o }) => /* @__PURE__ */ r.jsxs("div", { style: { position: "absolute", inset: 0, zIndex: 70, background: e.bg, display: "flex", flexDirection: "column" }, children: [
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
] }), Rh = ({ p: e, fonts: t }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, color: e.fg3, fontSize: 12 }, children: [
  /* @__PURE__ */ r.jsx("span", { style: { display: "inline-flex", gap: 3 }, children: [0, 1, 2].map((n) => /* @__PURE__ */ r.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: e.accent, animation: `hearthDot 1s ${n * 0.15}s infinite ease-in-out`, opacity: 0.5 } }, n)) }),
  /* @__PURE__ */ r.jsx("span", { style: { fontStyle: "italic", fontFamily: t.display }, children: "thinking…" }),
  /* @__PURE__ */ r.jsx("style", { children: "@keyframes hearthDot{0%,80%,100%{opacity:.3;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}" })
] });
Object.assign(window, { HearthApp: mh, Card: vh, Section: wh, PageHead: kh, PillBtn: bh, Toggle: jh, palette: Xc, FONT_PAIRS: pl, DENSITY: hl });
const Ih = ({ ctx: e, onOpenMenu: t }) => {
  const { p: n, fonts: i, state: o, user: l, narrow: s, setPage: a } = e, d = React.useContext(br), c = n.accent, f = "#1a1612", u = "#221d18", h = "#f1ead9", v = "rgba(241,234,217,0.7)", w = "rgba(241,234,217,0.42)", p = "rgba(241,234,217,0.1)", b = i.display, m = i.body, g = /* @__PURE__ */ new Date(), y = g.toLocaleDateString([], { weekday: "long" }), x = g.toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" }), [k, j] = React.useState([]), S = (o.calendar || []).map((z) => z.id).join(",");
  React.useEffect(() => {
    if (!d || !S) {
      j([]);
      return;
    }
    let z = !0;
    const I = S.split(",").filter(Boolean), F = async () => {
      const D = /* @__PURE__ */ new Date();
      D.setHours(0, 0, 0, 0);
      const B = new Date(D);
      B.setDate(B.getDate() + 14);
      const J = D.toISOString(), re = B.toISOString(), R = [];
      await Promise.all(I.map(async (P) => {
        try {
          const E = `calendars/${P}?start=${encodeURIComponent(J)}&end=${encodeURIComponent(re)}`, A = await d.callApi("GET", E);
          if (!Array.isArray(A)) return;
          for (const L of A) {
            const $e = L.start && (L.start.dateTime || L.start.date) || L.start, We = L.end && (L.end.dateTime || L.end.date) || L.end;
            if (!$e) continue;
            const Q = typeof $e == "string" && !$e.includes("T"), Z = new Date($e), ut = We ? new Date(We) : null;
            R.push({
              id: `${P}-${$e}-${L.summary || ""}`,
              title: L.summary || "(untitled)",
              where: L.location || "",
              kind: /birthday|bday/i.test(L.summary || "") ? "birthday" : "event",
              start: Z,
              end: ut,
              isAllDay: Q,
              sortKey: Z.getTime()
            });
          }
        } catch (E) {
          console.warn(`[dashboard] could not fetch events for ${P}:`, E.message);
        }
      })), z && (R.sort((P, E) => P.sortKey - E.sortKey), j(R));
    };
    F();
    const $ = setInterval(F, 5 * 60 * 1e3);
    return () => {
      z = !1, clearInterval($);
    };
  }, [d, S]);
  const C = k.length > 0 ? k : (o.calendarEvents || []).map((z) => ({
    ...z,
    start: z.start ? new Date(z.start) : null,
    end: null
  })), _ = () => {
    const z = g.getHours();
    return z < 5 ? "Working late" : z < 12 ? "Good morning" : z < 17 ? "Good afternoon" : z < 21 ? "Good evening" : "Good night";
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
        /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: b, fontSize: s ? 30 : 40, lineHeight: 1.05, color: h, fontWeight: 500 }, children: [
          _(),
          ", ",
          /* @__PURE__ */ r.jsxs("em", { style: { fontStyle: "italic", color: c, fontWeight: 400 }, children: [
            l?.firstName || "there",
            "."
          ] })
        ] })
      ] }),
      !s && t && /* @__PURE__ */ r.jsx("button", { onClick: t, "aria-label": "Open menu", style: {
        width: 42,
        height: 42,
        borderRadius: 10,
        flex: "none",
        background: f,
        border: `.5px solid ${p}`,
        color: h,
        cursor: "pointer",
        display: "grid",
        placeItems: "center"
      }, children: /* @__PURE__ */ r.jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", children: /* @__PURE__ */ r.jsx("path", { d: "M3 6h18M3 12h18M3 18h18" }) }) })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: {
      display: "grid",
      gridTemplateColumns: s ? "1fr" : "minmax(0,1fr) minmax(280px, 360px)",
      gap: s ? 14 : 22
    }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: s ? 14 : 18 }, children: [
        /* @__PURE__ */ r.jsx(Mh, { weather: o.weather, accent: c, fonts: i, surface: f, fg: h, fg2: v, fg3: w, border: p, narrow: s }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: s ? "1fr" : "1fr 1fr", gap: s ? 14 : 18 }, children: [
          /* @__PURE__ */ r.jsx(_h, { todos: o.todos, accent: c, fonts: i, surface: f, fg: h, fg2: v, fg3: w, border: p }),
          /* @__PURE__ */ r.jsx(Ph, { sports: o.sports, accent: c, fonts: i, surface: f, fg: h, fg2: v, fg3: w, border: p })
        ] }),
        /* @__PURE__ */ r.jsx(Eh, { news: o.news, accent: c, fonts: i, surface: f, fg: h, fg2: v, fg3: w, border: p }),
        /* @__PURE__ */ r.jsx($h, { accent: c, fonts: i, surface: f, fg: h, fg2: v, fg3: w, border: p })
      ] }),
      /* @__PURE__ */ r.jsx(
        Fh,
        {
          calendar: o.calendar,
          events: C,
          accent: c,
          fonts: i,
          surface: f,
          surface2: u,
          fg: h,
          fg2: v,
          fg3: w,
          border: p
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 80 } })
  ] }) });
}, Mh = ({ weather: e, accent: t, fonts: n, surface: i, fg: o, fg2: l, fg3: s, border: a, narrow: d }) => !e || e.summary === "Unavailable" ? /* @__PURE__ */ r.jsx(Bi, { title: "Weather", hint: "Add a Weather integration in HA → Devices & Services. Pirate Weather and Met.no are both free.", surface: i, fg: o, fg2: l, fg3: s, border: a, fonts: n, accent: t }) : /* @__PURE__ */ r.jsxs("div", { style: {
  padding: d ? "20px 18px" : "28px 28px",
  borderRadius: 16,
  background: i,
  border: `.5px solid ${a}`,
  display: "flex",
  alignItems: "center",
  gap: d ? 18 : 28
}, children: [
  /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: s, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 6 }, children: "Weather" }),
    /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: n.display, fontSize: d ? 56 : 76, lineHeight: 1, color: o, fontWeight: 400, fontVariantNumeric: "tabular-nums" }, children: [
      e.temp,
      "°"
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 14, color: l, marginTop: 8, textTransform: "capitalize" }, children: e.summary }),
    /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: s, marginTop: 4, fontVariantNumeric: "tabular-nums" }, children: [
      "High ",
      e.high,
      "° · Low ",
      e.low,
      "°"
    ] })
  ] }),
  e.hourly?.length > 0 && /* @__PURE__ */ r.jsx("div", { style: { display: "flex", alignItems: "flex-end", gap: 4, height: 90, flex: "none" }, children: e.hourly.slice(0, d ? 6 : 12).map((c, f) => {
    const u = Math.min(...e.hourly), h = Math.max(...e.hourly), v = h === u ? 50 : (c - u) / (h - u) * 60 + 18;
    return /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 9, color: s, fontVariantNumeric: "tabular-nums" }, children: [
        Math.round(c),
        "°"
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { width: 6, height: v, background: f === 0 ? t : `${t}55`, borderRadius: 3 } })
    ] }, f);
  }) })
] }), _h = ({ todos: e, accent: t, fonts: n, surface: i, fg: o, fg2: l, fg3: s, border: a }) => !e || !e.length ? /* @__PURE__ */ r.jsx(Bi, { title: "To-do", hint: "Add a To-do list in HA: Settings → Devices & Services → + Add Integration → Local To-do.", surface: i, fg: o, fg2: l, fg3: s, border: a, fonts: n, accent: t }) : /* @__PURE__ */ r.jsxs(Kt, { surface: i, border: a, children: [
  /* @__PURE__ */ r.jsx(In, { title: "To-do", right: /* @__PURE__ */ r.jsxs("span", { style: { fontSize: 11, color: s }, children: [
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
] }), Ph = ({ sports: e, accent: t, fonts: n, surface: i, fg: o, fg2: l, fg3: s, border: a }) => !e || !e.length ? /* @__PURE__ */ r.jsx(Bi, { title: "Sports", hint: "Install TeamTracker via HACS, then add your favourite teams.", surface: i, fg: o, fg2: l, fg3: s, border: a, fonts: n, accent: t }) : /* @__PURE__ */ r.jsxs(Kt, { surface: i, border: a, children: [
  /* @__PURE__ */ r.jsx(In, { title: "Sports", right: null, fonts: n, fg: o, fg3: s, accent: t }),
  /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: e.slice(0, 4).map((d) => /* @__PURE__ */ r.jsxs("div", { style: { padding: "8px 0", borderBottom: `.5px solid ${a}` }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }, children: [
      /* @__PURE__ */ r.jsxs("span", { style: { fontSize: 12, color: o, fontWeight: 500 }, children: [
        d.team,
        " ",
        /* @__PURE__ */ r.jsx("span", { style: { color: s }, children: "vs" }),
        " ",
        d.opponent
      ] }),
      d.live && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 9, padding: "2px 6px", borderRadius: 999, background: "#c14d36", color: "#fff", fontWeight: 600, letterSpacing: ".04em" }, children: "LIVE" })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }, children: [
      /* @__PURE__ */ r.jsx("span", { style: { fontFamily: n.display, fontSize: 22, color: o, fontVariantNumeric: "tabular-nums" }, children: d.teamScore ?? "—" }),
      /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, color: s }, children: "—" }),
      /* @__PURE__ */ r.jsx("span", { style: { fontFamily: n.display, fontSize: 22, color: l, fontVariantNumeric: "tabular-nums" }, children: d.oppScore ?? "—" }),
      /* @__PURE__ */ r.jsx("span", { style: { flex: 1, textAlign: "right", fontSize: 11, color: s }, children: d.state })
    ] })
  ] }, d.id)) })
] }), Eh = ({ news: e, accent: t, fonts: n, surface: i, fg: o, fg2: l, fg3: s, border: a }) => !e || !e.length ? /* @__PURE__ */ r.jsx(Bi, { title: "Breaking news", hint: "Add Feedreader in configuration.yaml with your favourite RSS URLs (NYT, BBC, etc.). I can wire this up if you want.", surface: i, fg: o, fg2: l, fg3: s, border: a, fonts: n, accent: t }) : /* @__PURE__ */ r.jsxs(Kt, { surface: i, border: a, children: [
  /* @__PURE__ */ r.jsx(In, { title: "Breaking news", right: /* @__PURE__ */ r.jsxs("span", { style: { fontSize: 11, color: s }, children: [
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
] }), $h = ({ accent: e, fonts: t, surface: n, fg: i, fg2: o, fg3: l, border: s }) => {
  const a = "homecntrd_notes_v1", [d, c] = React.useState(() => {
    try {
      return localStorage.getItem(a) || "";
    } catch {
      return "";
    }
  }), f = (u) => {
    c(u);
    try {
      localStorage.setItem(a, u);
    } catch {
    }
  };
  return /* @__PURE__ */ r.jsxs(Kt, { surface: n, border: s, children: [
    /* @__PURE__ */ r.jsx(In, { title: "Notes", right: /* @__PURE__ */ r.jsxs("span", { style: { fontSize: 11, color: l }, children: [
      d.length,
      " chars"
    ] }), fonts: t, fg: i, fg3: l, accent: e }),
    /* @__PURE__ */ r.jsx(
      "textarea",
      {
        value: d,
        onChange: (u) => f(u.target.value),
        placeholder: "Quick thoughts, reminders, things to remember…",
        style: {
          width: "100%",
          minHeight: 110,
          padding: "10px 12px",
          borderRadius: 8,
          background: "rgba(241,234,217,0.03)",
          color: i,
          border: `.5px solid ${s}`,
          outline: "none",
          resize: "vertical",
          fontFamily: t.body,
          fontSize: 13,
          lineHeight: 1.5
        }
      }
    )
  ] });
}, Fh = ({ calendar: e, events: t, accent: n, fonts: i, surface: o, surface2: l, fg: s, fg2: a, fg3: d, border: c }) => {
  const f = /* @__PURE__ */ new Date(), u = Hr(f), [h, v] = React.useState(() => new Date(f.getFullYear(), f.getMonth(), 1)), [w, p] = React.useState(null), b = h.getMonth(), m = h.getFullYear(), g = h.toLocaleDateString([], { month: "long", year: "numeric" }), y = new Date(m, b, 1).getDay(), x = new Date(m, b + 1, 0).getDate(), k = [];
  for (let I = 0; I < y; I++) k.push(null);
  for (let I = 1; I <= x; I++) k.push(I);
  const j = React.useMemo(() => {
    const I = /* @__PURE__ */ new Set();
    for (const F of t || [])
      F?.start && I.add(Hr(F.start instanceof Date ? F.start : new Date(F.start)));
    return I;
  }, [t]), S = React.useMemo(() => {
    if (!t?.length) return [];
    if (w)
      return t.filter((F) => F.start && Hr(F.start instanceof Date ? F.start : new Date(F.start)) === w);
    const I = new Date(f);
    return I.setHours(0, 0, 0, 0), I.setDate(I.getDate() + 3), t.filter((F) => {
      if (!F.start) return !1;
      const $ = F.start instanceof Date ? F.start : new Date(F.start);
      return $.getTime() >= f.getTime() - 60 * 60 * 1e3 && $.getTime() < I.getTime();
    });
  }, [t, w, u]), C = () => v((I) => new Date(I.getFullYear(), I.getMonth() - 1, 1)), _ = () => v((I) => new Date(I.getFullYear(), I.getMonth() + 1, 1)), z = () => {
    v(new Date(f.getFullYear(), f.getMonth(), 1)), p(null);
  };
  return /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
    /* @__PURE__ */ r.jsxs(Kt, { surface: o, border: c, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, gap: 6 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontFamily: i.display, fontSize: 16, color: s, fontWeight: 500, flex: 1 }, children: g }),
        /* @__PURE__ */ r.jsx("button", { onClick: C, "aria-label": "Previous month", style: xo(a, c), children: "‹" }),
        /* @__PURE__ */ r.jsx("button", { onClick: z, "aria-label": "Today", style: { ...xo(a, c), padding: "0 10px", width: "auto", fontSize: 11 }, children: "Today" }),
        /* @__PURE__ */ r.jsx("button", { onClick: _, "aria-label": "Next month", style: xo(a, c), children: "›" })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, fontFamily: i.body, fontSize: 11 }, children: [
        ["S", "M", "T", "W", "T", "F", "S"].map((I, F) => /* @__PURE__ */ r.jsx("div", { style: { textAlign: "center", padding: 4, color: d, fontWeight: 500 }, children: I }, F)),
        k.map((I, F) => {
          if (!I) return /* @__PURE__ */ r.jsx("div", {}, F);
          const $ = new Date(m, b, I), D = Hr($), B = D === u, J = D === w, re = j.has(D);
          return /* @__PURE__ */ r.jsxs(
            "button",
            {
              onClick: () => p((R) => R === D ? null : D),
              style: {
                position: "relative",
                textAlign: "center",
                padding: "8px 0",
                borderRadius: 6,
                fontSize: 12,
                fontVariantNumeric: "tabular-nums",
                color: B ? "#fff" : J ? n : a,
                background: B ? n : J ? `${n}22` : "transparent",
                border: 0,
                cursor: "pointer",
                fontFamily: i.body,
                fontWeight: B || J ? 600 : 400,
                outline: J && !B ? `1px solid ${n}66` : "none"
              },
              children: [
                I,
                re && /* @__PURE__ */ r.jsx("span", { style: {
                  position: "absolute",
                  left: "50%",
                  bottom: 3,
                  transform: "translateX(-50%)",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: B ? "#fff" : n
                } })
              ]
            },
            F
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs(Kt, { surface: o, border: c, children: [
      /* @__PURE__ */ r.jsx(
        In,
        {
          title: w ? (/* @__PURE__ */ new Date(w + "T00:00:00")).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) : "Next 3 days",
          right: w ? /* @__PURE__ */ r.jsx("button", { onClick: () => p(null), style: Dh(d), children: "Clear" }) : /* @__PURE__ */ r.jsxs("span", { style: { fontSize: 11, color: d }, children: [
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
      S.length > 0 ? /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: S.map((I, F) => {
        const $ = I.start instanceof Date ? I.start : new Date(I.start), D = I.end ? I.end instanceof Date ? I.end : new Date(I.end) : null, B = $.getDate(), J = $.toLocaleDateString([], { month: "short" }).toUpperCase(), re = I.isAllDay ? "All day" : $.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) + (D ? ` – ${D.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : "");
        return /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 10, padding: "6px 0", borderBottom: F < S.length - 1 ? `.5px solid ${c}` : "none" }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: {
            width: 38,
            flex: "none",
            textAlign: "center",
            padding: "4px 0",
            background: l,
            borderRadius: 6,
            border: `.5px solid ${c}`
          }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 9, color: d, letterSpacing: ".06em", textTransform: "uppercase" }, children: J }),
            /* @__PURE__ */ r.jsx("div", { style: { fontFamily: i.display, fontSize: 16, color: s, fontWeight: 500, lineHeight: 1 }, children: B })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: s, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: I.title }),
            /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: d, marginTop: 2 }, children: [
              re,
              I.where ? ` · ${I.where}` : ""
            ] })
          ] }),
          I.kind === "birthday" && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 12 }, children: "🎂" })
        ] }, I.id || F);
      }) }) : e?.length ? /* @__PURE__ */ r.jsx("div", { style: { padding: "20px 0", textAlign: "center", color: d, fontSize: 12 }, children: w ? "Nothing scheduled this day." : "Nothing scheduled in the next 3 days." }) : /* @__PURE__ */ r.jsx(qc, { hint: "Add Outlook, Google Calendar, or Remote iCalendar in HA to see events here.", fg: a, fg3: d, border: c, accent: n, surface: l })
    ] })
  ] });
};
function Hr(e) {
  if (!e) return "";
  const t = e instanceof Date ? e : new Date(e);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
const xo = (e, t) => ({
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
}), Dh = (e) => ({
  background: "transparent",
  border: 0,
  color: e,
  fontSize: 11,
  cursor: "pointer",
  padding: 0,
  fontFamily: "inherit",
  textDecoration: "underline",
  textUnderlineOffset: 2
}), Kt = ({ surface: e, border: t, children: n, style: i }) => /* @__PURE__ */ r.jsx("div", { style: {
  padding: "18px 20px",
  borderRadius: 14,
  background: e,
  border: `.5px solid ${t}`,
  ...i
}, children: n }), In = ({ title: e, right: t, fonts: n, fg: i, fg3: o, accent: l }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }, children: [
  /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 15, color: i, fontWeight: 500 }, children: e }),
  t
] }), Bi = ({ title: e, hint: t, surface: n, fg: i, fg2: o, fg3: l, border: s, fonts: a, accent: d }) => /* @__PURE__ */ r.jsxs(Kt, { surface: n, border: s, children: [
  /* @__PURE__ */ r.jsx(In, { title: e, right: null, fonts: a, fg: i, fg3: l, accent: d }),
  /* @__PURE__ */ r.jsx(qc, { hint: t, fg: o, fg3: l, border: s, accent: d, surface: n })
] }), qc = ({ hint: e, fg: t, fg3: n, border: i, accent: o, surface: l }) => /* @__PURE__ */ r.jsxs("div", { style: {
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
window.PersonalDashboard = Ih;
const vo = [
  { id: "climate", label: "Climate" },
  { id: "lights", label: "Lighting" },
  { id: "music", label: "Music" },
  { id: "tvs", label: "TVs" },
  { id: "scenes", label: "Scenes" },
  { id: "cameras", label: "Cameras" },
  { id: "security", label: "Security & access" },
  { id: "car", label: "Car & garage" },
  { id: "today", label: "Today's schedule" }
], Nh = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l, room: s, user: a, patchUser: d, narrow: c } = e, f = window.ROOMS.find((y) => y.id === s), u = o.lights.filter((y) => y.room === s), h = a?.roomSections || {}, w = a?.homeSections || Object.fromEntries(vo.map((y) => [y.id, !0])), p = h[s] || w, b = (y, x) => d?.((k) => {
    const j = k.roomSections && k.roomSections[s] || k.homeSections || Object.fromEntries(vo.map((S) => [S.id, !0]));
    return { ...k, roomSections: { ...k.roomSections || {}, [s]: { ...j, [y]: x } } };
  }), [m, g] = React.useState(!1);
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "Currently in",
        title: `The ${f?.name || "house"}`,
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
        f?.name || "this room"
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 6 }, children: vo.map((y) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: t.surface, border: `.5px solid ${t.border}` }, children: [
        /* @__PURE__ */ r.jsx("span", { style: { flex: 1, fontSize: 12, color: t.fg }, children: y.label }),
        /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: p[y.id] !== !1, onChange: (x) => b(y.id, x), size: 16 })
      ] }, y.id)) }),
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, fontStyle: "italic", marginTop: 10 }, children: "Each room remembers its own layout." })
    ] }),
    p.climate !== !1 && /* @__PURE__ */ r.jsx(window.ClimateSection, { ctx: e }),
    p.lights !== !1 && /* @__PURE__ */ r.jsx(window.LightsSection, { ctx: e }),
    p.music !== !1 && /* @__PURE__ */ r.jsx(window.MusicSection, { ctx: e }),
    p.tvs !== !1 && /* @__PURE__ */ r.jsx(window.TvsSection, { ctx: e }),
    p.scenes !== !1 && /* @__PURE__ */ r.jsx(window.ScenesSection, { ctx: e }),
    p.cameras !== !1 && /* @__PURE__ */ r.jsx(window.CamerasSection, { ctx: e }),
    p.security !== !1 && /* @__PURE__ */ r.jsx(window.SecuritySection, { ctx: e }),
    p.car !== !1 && /* @__PURE__ */ r.jsx(window.CarSection, { ctx: e }),
    p.today !== !1 && /* @__PURE__ */ r.jsx(window.TodaySection, { ctx: e }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 80 } })
  ] });
}, Lh = ({ ctx: e }) => {
  const { p: t, fonts: n, state: i, setState: o } = e, l = i.thermostat, s = ($) => o((D) => ({ ...D, thermostat: { ...D.thermostat, target: $ } })), a = ($) => o((D) => ({ ...D, thermostat: { ...D.thermostat, mode: $ } })), d = 60, c = 83, f = React.useRef(null), [u, h] = React.useState(!1), v = ($) => {
    const D = f.current.getBoundingClientRect(), B = D.left + D.width / 2, J = D.top + D.height / 2, re = $.clientX - B, R = $.clientY - J;
    let A = ((Math.atan2(R, re) * 180 / Math.PI + 360) % 360 - 135 + 360) % 360;
    A > 270 && (A = A > 315 ? 0 : 270);
    const L = A / 270;
    return Math.round(d + L * (c - d));
  }, w = ($) => {
    h(!0), f.current.setPointerCapture?.($.pointerId), s(v($));
  }, p = ($) => {
    u && s(v($));
  }, b = ($) => {
    h(!1);
  }, m = 220, g = 92, y = m / 2, x = m / 2, k = ($, D) => {
    const B = $ * Math.PI / 180;
    return [y + D * Math.cos(B), x + D * Math.sin(B)];
  }, j = 135, S = 405, C = j + (l.target - d) / (c - d) * 270, _ = j + (l.temp - d) / (c - d) * 270, z = ($, D) => {
    const [B, J] = k($, g), [re, R] = k(D, g), P = D - $ > 180 ? 1 : 0;
    return `M ${B} ${J} A ${g} ${g} 0 ${P} 1 ${re} ${R}`;
  }, [I, F] = k(C, g);
  return /* @__PURE__ */ r.jsx(window.Section, { title: "Climate", subtitle: "Hallway · Nest", p: t, fonts: n, children: /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 24, display: "grid", gridTemplateColumns: "auto 1fr", gap: 30, alignItems: "center" }, children: [
    /* @__PURE__ */ r.jsx(
      "div",
      {
        ref: f,
        onPointerDown: w,
        onPointerMove: p,
        onPointerUp: b,
        onPointerCancel: b,
        style: { width: m, height: m, position: "relative", cursor: u ? "grabbing" : "grab", touchAction: "none", userSelect: "none", flex: "none" },
        children: /* @__PURE__ */ r.jsxs("svg", { width: m, height: m, style: { position: "absolute", inset: 0 }, children: [
          /* @__PURE__ */ r.jsx("path", { d: z(j, S), fill: "none", stroke: t.border, strokeWidth: "14", strokeLinecap: "round" }),
          /* @__PURE__ */ r.jsx("path", { d: z(Math.min(_, C), Math.max(_, C)), fill: "none", stroke: t.accentSoft, strokeWidth: "14", strokeLinecap: "round" }),
          /* @__PURE__ */ r.jsx("path", { d: z(j, C), fill: "none", stroke: t.accent, strokeWidth: "3", strokeLinecap: "round", opacity: ".75" }),
          Array.from({ length: 24 }).map(($, D) => {
            const B = j + D / 23 * 270, [J, re] = k(B, g - 10), [R, P] = k(B, g - 4);
            return /* @__PURE__ */ r.jsx("line", { x1: J, y1: re, x2: R, y2: P, stroke: t.fg3, strokeWidth: ".5", opacity: D % 4 === 0 ? 0.6 : 0.25 }, D);
          }),
          /* @__PURE__ */ r.jsx("circle", { cx: I, cy: F, r: "11", fill: t.accent, stroke: t.surface2, strokeWidth: "3" }),
          /* @__PURE__ */ r.jsx("text", { x: y, y: x - 12, textAnchor: "middle", fill: t.fg3, fontSize: "10", fontFamily: n.body, letterSpacing: "2", children: "SET TO" }),
          /* @__PURE__ */ r.jsxs("text", { x: y, y: x + 22, textAnchor: "middle", fill: t.fg, fontSize: "50", fontFamily: n.display, fontWeight: "500", children: [
            l.target,
            "°"
          ] }),
          /* @__PURE__ */ r.jsxs("text", { x: y, y: x + 44, textAnchor: "middle", fill: t.fg3, fontSize: "11", fontFamily: n.display, fontStyle: "italic", children: [
            "now ",
            l.temp,
            "°"
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 18, fontSize: 12, color: t.fg2 }, children: [
        /* @__PURE__ */ r.jsxs("div", { children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase" }, children: "Inside" }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: n.display, fontSize: 22, color: t.fg, marginTop: 2 }, children: [
            l.temp,
            "°"
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase" }, children: "Humidity" }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: n.display, fontSize: 22, color: t.fg, marginTop: 2 }, children: [
            l.humidity,
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
      /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8 }, children: ["cool", "auto", "heat", "off"].map(($) => /* @__PURE__ */ r.jsx("button", { onClick: () => a($), style: {
        flex: 1,
        padding: "10px 0",
        textTransform: "capitalize",
        border: `.5px solid ${$ === l.mode ? t.accent : t.border2}`,
        background: $ === l.mode ? t.accentSoft : "transparent",
        color: $ === l.mode ? t.accent : t.fg2,
        borderRadius: 8,
        fontSize: 12,
        cursor: "pointer",
        fontFamily: n.body
      }, children: $ }, $)) }),
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, fontStyle: "italic", fontFamily: n.display }, children: [
        "Drag the dial to set the target temperature. ",
        i.weather.summary.toLowerCase(),
        " outside."
      ] })
    ] })
  ] }) });
}, Ah = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l, room: s } = e, a = o.lights.filter((c) => c.room === s), d = a.every((c) => c.on);
  return /* @__PURE__ */ r.jsx(
    window.Section,
    {
      title: "Lighting",
      subtitle: `${a.filter((c) => c.on).length} of ${a.length} on`,
      p: t,
      fonts: n,
      action: /* @__PURE__ */ r.jsx("button", { onClick: () => l((c) => ({ ...c, lights: c.lights.map((f) => f.room === s ? { ...f, on: !d } : f) })), style: { padding: "6px 12px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 11, cursor: "pointer", fontFamily: n.body }, children: d ? "All off" : "All on" }),
      children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: i.tileGap }, children: a.map((c) => /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 14, position: "relative", overflow: "hidden" }, children: [
        c.on && /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", right: -20, top: -20, width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, ${c.color}77, transparent 70%)` } }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: "bulb", size: 18, stroke: 1.4, style: { color: c.on ? c.color : t.fg3 } }),
          /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: c.on, size: 18, onChange: () => l((f) => ({ ...f, lights: f.lights.map((u) => u.id === c.id ? { ...u, on: !u.on } : u) })) })
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
            onChange: (f) => l((u) => ({ ...u, lights: u.lights.map((h) => h.id === c.id ? { ...h, brightness: +f.target.value } : h) })),
            style: { width: "100%", marginTop: 8, accentColor: t.accent }
          }
        )
      ] }, c.id)) })
    }
  );
}, Oh = ({ ctx: e }) => {
  const { p: t, fonts: n, state: i, setState: o, room: l, setPage: s } = e, a = i.speakers.find((f) => f.room === l) || i.speakers[0];
  if (!a) return null;
  const d = window.trackById(a.trackId), c = () => o((f) => ({ ...f, speakers: f.speakers.map((u) => u.id === a.id ? { ...u, playing: !a.playing } : u) }));
  return /* @__PURE__ */ r.jsx(
    window.Section,
    {
      title: "Music",
      subtitle: `${i.speakers.filter((f) => f.playing).length} speakers playing`,
      p: t,
      fonts: n,
      action: /* @__PURE__ */ r.jsx("button", { onClick: () => s("music"), style: { padding: "6px 12px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 11, cursor: "pointer", fontFamily: n.body }, children: "Library →" }),
      children: /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 18, display: "flex", gap: 16, alignItems: "center" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 90, height: 90, borderRadius: 10, flex: "none", background: `radial-gradient(120% 120% at 30% 25%, ${d.hue}, oklch(20% 0.05 25))` } }),
        /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 10, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase" }, children: [
            "Now playing · ",
            window.ROOMS.find((f) => f.id === a.room)?.name
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
}, Wh = ({ ctx: e }) => {
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
}, Hh = ({ ctx: e }) => {
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
}, gl = [
  { id: "disarmed", label: "Disarmed", icon: "shield", desc: "Sensors off · all clear", color: "oklch(55% 0.05 80)" },
  { id: "home", label: "Home", icon: "home", desc: "Perimeter armed · interior bypassed", color: "oklch(60% 0.13 145)" },
  { id: "away", label: "Away", icon: "lock", desc: "Full system armed · entry delay 30s", color: "oklch(58% 0.16 30)" }
], Jc = ({ ctx: e, compact: t }) => {
  const { p: n, fonts: i, state: o, setState: l } = e, s = o.ring?.mode || "disarmed", a = (c) => {
    l((f) => ({
      ...f,
      ring: { ...f.ring || {}, mode: c, lastChanged: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), changedBy: "You" },
      // Away also locks everything
      locks: c === "away" ? f.locks.map((u) => ({ ...u, locked: !0 })) : f.locks
    }));
  }, d = gl.find((c) => c.id === s);
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
    /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }, children: gl.map((c) => {
      const f = c.id === s;
      return /* @__PURE__ */ r.jsxs("button", { onClick: () => a(c.id), style: {
        padding: t ? "8px 6px" : "10px 8px",
        borderRadius: 8,
        border: `.5px solid ${f ? c.color : n.border2}`,
        background: f ? `color-mix(in oklch, ${c.color} 14%, transparent)` : n.surface,
        color: f ? c.color : n.fg,
        cursor: "pointer",
        fontFamily: i.body,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        transition: "border-color .15s, background .15s"
      }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: c.icon, size: 14 }),
        /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, fontWeight: f ? 600 : 500 }, children: c.label })
      ] }, c.id);
    }) })
  ] });
}, Bh = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, s = o.locks.every((c) => c.locked), a = o.ring?.mode || "disarmed", d = gl.find((c) => c.id === a);
  return /* @__PURE__ */ r.jsxs(
    window.Section,
    {
      title: "Security & access",
      subtitle: `${d.label} · ${s ? "all locked" : "something is open"}`,
      p: t,
      fonts: n,
      action: /* @__PURE__ */ r.jsx("button", { onClick: () => l((c) => ({ ...c, locks: c.locks.map((f) => ({ ...f, locked: !0 })) })), style: { padding: "6px 12px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 11, cursor: "pointer", fontFamily: n.body }, children: "Lock all" }),
      children: [
        /* @__PURE__ */ r.jsx("div", { style: { marginBottom: i.tileGap }, children: /* @__PURE__ */ r.jsx(Jc, { ctx: e }) }),
        /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: i.tileGap }, children: o.locks.map((c) => /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 14, display: "flex", alignItems: "center", gap: 12 }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: "lock", size: 20, style: { color: c.locked ? "oklch(60% 0.13 145)" : t.accent } }),
          /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: t.fg, fontWeight: 500 }, children: c.name }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, marginTop: 1 }, children: c.locked ? "Locked" : "Unlocked" })
          ] }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => l((f) => ({ ...f, locks: f.locks.map((u) => u.id === c.id ? { ...u, locked: !u.locked } : u) })), style: { padding: "5px 10px", borderRadius: 999, border: `.5px solid ${c.locked ? t.border2 : t.accent}`, background: c.locked ? "transparent" : t.accentSoft, color: c.locked ? t.fg2 : t.accent, fontSize: 11, cursor: "pointer" }, children: c.locked ? "Unlock" : "Lock" })
        ] }, c.id)) })
      ]
    }
  );
}, Vh = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setPage: l } = e, s = o.tesla, a = o.garage.doors.filter((d) => d.open).length;
  return /* @__PURE__ */ r.jsx(window.Section, { title: "Car & garage", p: t, fonts: n, children: /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: i.tileGap }, children: [
    /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 16, cursor: "pointer" }, onClick: () => l("car"), children: [
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: t.fg3 }, children: "Tesla · Model 3" }),
        /* @__PURE__ */ r.jsx(window.Icon, { name: "car", size: 14, style: { color: t.fg3 } })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 8, marginTop: 10 }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: n.display, fontSize: 34, color: t.fg, fontWeight: 500, lineHeight: 1 }, children: [
          s.chargePct,
          /* @__PURE__ */ r.jsx("span", { style: { fontSize: 14, color: t.fg2 }, children: "%" })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: t.fg2 }, children: [
          s.range,
          " mi · ",
          s.charging ? `+${s.chargeRate} mph` : s.pluggedIn ? "plugged in" : "unplugged"
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { height: 5, background: t.border, borderRadius: 3, marginTop: 12, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${s.chargePct}%`, height: "100%", background: s.charging ? t.accent : "oklch(60% 0.14 145)" } }) }),
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, marginTop: 8, display: "flex", alignItems: "center", gap: 5 }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: "location", size: 10 }),
        " ",
        s.location
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 16, cursor: "pointer" }, onClick: () => l("garage"), children: [
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: t.fg3 }, children: "Garage · MyQ" }),
        /* @__PURE__ */ r.jsx(window.Icon, { name: "garage", size: 14, style: { color: t.fg3 } })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 18, color: t.fg, marginTop: 10, fontWeight: 500 }, children: a === 0 ? "Both doors closed" : /* @__PURE__ */ r.jsxs("em", { style: { fontStyle: "italic", color: t.accent }, children: [
        a,
        " open"
      ] }) }),
      /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 5, marginTop: 10 }, children: o.garage.doors.map((d) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: t.fg2 }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: "garage", size: 11, style: { color: d.open ? t.accent : t.fg3 } }),
        /* @__PURE__ */ r.jsx("span", { style: { flex: 1 }, children: d.name }),
        /* @__PURE__ */ r.jsx("span", { style: { color: d.open ? t.accent : t.fg3, fontSize: 11 }, children: d.open ? "Open" : "Closed" })
      ] }, d.id)) })
    ] })
  ] }) });
}, Uh = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setPage: l } = e;
  return /* @__PURE__ */ r.jsx(
    window.Section,
    {
      title: "Today",
      subtitle: `${o.calendar.length} events · ${o.alarms.filter((s) => s.on).length} alarms`,
      p: t,
      fonts: n,
      action: /* @__PURE__ */ r.jsx("button", { onClick: () => l("calendar"), style: { padding: "6px 12px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 11, cursor: "pointer", fontFamily: n.body }, children: "Calendar →" }),
      children: /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: i.tileGap }, children: [
        /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 16 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }, children: "Schedule" }),
          o.calendar.slice(0, 5).map((s, a) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 12, padding: "8px 0", borderTop: a ? `.5px solid ${t.border}` : "none", alignItems: "baseline" }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { width: 64, fontSize: 12, color: t.fg2, fontVariantNumeric: "tabular-nums" }, children: s.t }),
            /* @__PURE__ */ r.jsx("div", { style: { width: 3, height: 18, borderRadius: 2, background: s.dot, alignSelf: "center" } }),
            /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, fontSize: 13, color: t.fg }, children: [
              s.title,
              /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, color: t.fg3, marginLeft: 8 }, children: s.where })
            ] }),
            s.dnd && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 9, padding: "1px 6px", borderRadius: 999, background: t.accentSoft, color: t.accent }, children: "DND" })
          ] }, s.id))
        ] }),
        /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 16 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }, children: "Alarms" }),
          o.alarms.map((s, a) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: a ? `.5px solid ${t.border}` : "none" }, children: [
            /* @__PURE__ */ r.jsxs("div", { children: [
              /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 15, color: s.on ? t.fg : t.fg3, fontVariantNumeric: "tabular-nums" }, children: s.time }),
              /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3 }, children: s.label })
            ] }),
            /* @__PURE__ */ r.jsx("div", { style: { flex: 1 } }),
            /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: s.on, size: 16, onChange: (d) => e.setState((c) => ({ ...c, alarms: c.alarms.map((f) => f.id === s.id ? { ...f, on: d } : f) })) })
          ] }, s.id))
        ] })
      ] })
    }
  );
}, Gh = ({ c: e, ctx: t }) => {
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
Object.assign(window, { HomeView: Nh, ClimateSection: Lh, LightsSection: Ah, MusicSection: Oh, ScenesSection: Wh, CamerasSection: Hh, SecuritySection: Bh, CarSection: Vh, TodaySection: Uh, CamThumb: Gh, RingModeSwitcher: Jc });
const Qh = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, [s, a] = React.useState("library"), [d, c] = React.useState(window.PLAYLISTS[0].id), [f, u] = React.useState(""), [h, v] = React.useState(o.speakers[0].id), w = o.speakers.find((S) => S.id === h) || o.speakers[0], p = (S, C = h) => {
    l((_) => ({
      ..._,
      speakers: _.speakers.map((z) => z.id === C ? { ...z, trackId: S, progress: 0, playing: !0 } : z)
    }));
  }, b = (S) => l((C) => ({
    ...C,
    speakers: C.speakers.map((_) => _.id === S ? { ..._, playing: !_.playing } : _)
  })), m = (S, C) => l((_) => ({
    ..._,
    speakers: _.speakers.map((z) => z.id === S ? { ...z, vol: C } : z)
  })), g = (S, C) => {
    l((_) => {
      const z = _.playlists || JSON.parse(JSON.stringify(window.PLAYLISTS));
      return {
        ..._,
        playlists: z.map((I) => I.id === S ? { ...I, tracks: I.tracks.includes(C) ? I.tracks : [...I.tracks, C], count: I.count + (I.tracks.includes(C) ? 0 : 1) } : I)
      };
    });
  }, y = (S, C) => {
    l((_) => {
      const z = _.playlists || JSON.parse(JSON.stringify(window.PLAYLISTS));
      return {
        ..._,
        playlists: z.map((I) => I.id === S ? { ...I, tracks: I.tracks.filter((F) => F !== C), count: Math.max(0, I.count - 1) } : I)
      };
    });
  }, x = o.playlists || window.PLAYLISTS, k = x.find((S) => S.id === d), j = f ? window.TRACKS.filter((S) => (S.title + " " + S.artist + " " + S.album).toLowerCase().includes(f.toLowerCase())) : window.TRACKS;
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "Apple Music · 2,847 songs",
        title: "Library",
        sub: "frances.w@icloud.com · streaming to Sonos & AirPlay",
        right: /* @__PURE__ */ r.jsx(Kh, { ctx: e, value: f, onChange: (S) => {
          u(S), S && a("search");
        } })
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "200px 1fr 320px", gap: i.gap, alignItems: "start", minHeight: 0 }, children: [
      /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: "14px 8px", position: "sticky", top: 0 }, children: [
        /* @__PURE__ */ r.jsx(An, { ctx: e, icon: "library", label: "Library", active: s === "library", onClick: () => a("library") }),
        /* @__PURE__ */ r.jsx(An, { ctx: e, icon: "clock", label: "Recently played", active: s === "recent", onClick: () => a("recent") }),
        /* @__PURE__ */ r.jsx(An, { ctx: e, icon: "heart", label: "Favorites", onClick: () => a("library") }),
        /* @__PURE__ */ r.jsx(An, { ctx: e, icon: "search", label: "Search", active: s === "search", onClick: () => a("search") }),
        /* @__PURE__ */ r.jsx("div", { style: { padding: "14px 14px 6px", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: t.fg3, fontWeight: 500 }, children: "Playlists" }),
        x.map((S) => /* @__PURE__ */ r.jsx(
          An,
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
      /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: i.gap, minWidth: 0 }, children: s === "playlist" && k ? /* @__PURE__ */ r.jsx(
        Xh,
        {
          ctx: e,
          pl: k,
          playOn: p,
          speaker: w,
          removeFromPlaylist: y
        }
      ) : s === "recent" ? /* @__PURE__ */ r.jsx(zi, { ctx: e, title: "Recently played", tracks: window.TRACKS.slice(0, 8), playOn: p, speaker: w, playlists: x, addToPlaylist: g }) : s === "search" ? /* @__PURE__ */ r.jsx(zi, { ctx: e, title: `Results for "${f}"`, tracks: j, playOn: p, speaker: w, playlists: x, addToPlaylist: g }) : /* @__PURE__ */ r.jsx(Yh, { ctx: e, playOn: p, speaker: w, playlists: x, addToPlaylist: g, setSection: a, setActivePlaylist: c }) }),
      /* @__PURE__ */ r.jsx(
        Jh,
        {
          ctx: e,
          activeSpeaker: h,
          setActiveSpeaker: v,
          togglePlay: b,
          setVol: m
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
}, An = ({ ctx: e, icon: t, label: n, active: i, onClick: o, swatches: l }) => {
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
}, Kh = ({ ctx: e, value: t, onChange: n }) => {
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
}, Yh = ({ ctx: e, playOn: t, speaker: n, playlists: i, addToPlaylist: o, setSection: l, setActivePlaylist: s }) => {
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
      /* @__PURE__ */ r.jsx("div", { style: { width: 200, position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }, children: window.PLAYLISTS[3].art.map((f, u) => /* @__PURE__ */ r.jsx("div", { style: { background: f } }, u)) })
    ] }),
    /* @__PURE__ */ r.jsx(window.Section, { title: "Recently played", p: a, fonts: d, children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: c.tileGap }, children: window.TRACKS.slice(0, 6).map((f) => /* @__PURE__ */ r.jsxs("button", { onClick: () => t(f.id), style: { padding: 0, border: 0, background: "transparent", cursor: "pointer", textAlign: "left" }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { aspectRatio: "1", borderRadius: 8, background: `radial-gradient(120% 120% at 30% 25%, ${f.hue}, oklch(15% 0.05 25))`, position: "relative", overflow: "hidden" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 70%, rgba(255,220,150,.4), transparent 55%)" } }),
        /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", bottom: 8, left: 10, right: 10, fontFamily: d.display, fontStyle: "italic", fontSize: 10, color: "rgba(255,240,210,.85)", letterSpacing: ".05em", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: f.album })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { fontFamily: d.display, fontSize: 14, color: a.fg, marginTop: 8, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: f.title }),
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: a.fg3, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: f.artist })
    ] }, f.id)) }) }),
    /* @__PURE__ */ r.jsx(window.Section, { title: "Your playlists", p: a, fonts: d, children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: c.tileGap }, children: i.map((f) => /* @__PURE__ */ r.jsxs("button", { onClick: () => {
      l("playlist"), s(f.id);
    }, style: { padding: 0, border: 0, background: "transparent", cursor: "pointer", textAlign: "left" }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { aspectRatio: "1", borderRadius: 8, display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }, children: f.art.slice(0, 4).map((u, h) => /* @__PURE__ */ r.jsx("div", { style: { background: u } }, h)) }),
      /* @__PURE__ */ r.jsx("div", { style: { fontFamily: d.display, fontSize: 14, color: a.fg, marginTop: 8, fontWeight: 500 }, children: f.name }),
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: a.fg3, marginTop: 1 }, children: [
        f.count,
        " songs"
      ] })
    ] }, f.id)) }) }),
    /* @__PURE__ */ r.jsx(window.Section, { title: "All songs", subtitle: `${window.TRACKS.length} of 2,847`, p: a, fonts: d, children: /* @__PURE__ */ r.jsx(zi, { ctx: e, tracks: window.TRACKS, playOn: t, speaker: n, playlists: i, addToPlaylist: o }) })
  ] });
}, Xh = ({ ctx: e, pl: t, playOn: n, speaker: i, removeFromPlaylist: o }) => {
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
      zi,
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
}, zi = ({ ctx: e, tracks: t, title: n, playOn: i, speaker: o, playlists: l, addToPlaylist: s, rowAction: a }) => {
  const { p: d, fonts: c } = e, [f, u] = React.useState(null);
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
          /* @__PURE__ */ r.jsx("button", { onClick: () => i(h.id), style: { width: 24, height: 24, borderRadius: "50%", border: 0, background: w ? d.accent : "transparent", color: w ? "#fff" : d.fg3, cursor: "pointer", display: "grid", placeItems: "center" }, children: w && o.playing ? /* @__PURE__ */ r.jsx(qh, { p: d }) : /* @__PURE__ */ r.jsx(window.Icon, { name: "play", size: 11 }) }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, minWidth: 0 }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { width: 34, height: 34, borderRadius: 5, flex: "none", background: `radial-gradient(120% 120% at 30% 25%, ${h.hue}, oklch(20% 0.05 25))` } }),
            /* @__PURE__ */ r.jsx("div", { style: { minWidth: 0 }, children: /* @__PURE__ */ r.jsx("div", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: w ? d.accent : d.fg, fontWeight: w ? 500 : 400 }, children: h.title }) })
          ] }),
          /* @__PURE__ */ r.jsx("div", { style: { color: d.fg2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: h.artist }),
          /* @__PURE__ */ r.jsx("div", { style: { color: d.fg3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: h.album }),
          /* @__PURE__ */ r.jsx("div", { style: { textAlign: "right", color: d.fg3, fontSize: 11, fontVariantNumeric: "tabular-nums" }, children: window.fmtTime(h.dur) }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "flex-end", gap: 6, position: "relative" }, children: [
            a ? a(h) : /* @__PURE__ */ r.jsx("button", { onClick: (p) => {
              p.stopPropagation(), u(f === h.id ? null : h.id);
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
            f === h.id && l && /* @__PURE__ */ r.jsxs(
              "div",
              {
                style: { position: "absolute", right: 0, top: 30, width: 200, background: d.surface2, border: `.5px solid ${d.border2}`, borderRadius: 9, boxShadow: "0 12px 32px rgba(0,0,0,.18)", zIndex: 30, padding: 6 },
                onMouseLeave: () => u(null),
                children: [
                  /* @__PURE__ */ r.jsx("div", { style: { padding: "4px 10px", fontSize: 10, color: d.fg3, letterSpacing: ".1em", textTransform: "uppercase" }, children: "Add to playlist" }),
                  l.map((p) => /* @__PURE__ */ r.jsxs("button", { onClick: () => {
                    s(p.id, h.id), u(null);
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
                    /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", width: 14, height: 14, borderRadius: 2, overflow: "hidden", flex: "none" }, children: p.art.slice(0, 4).map((b, m) => /* @__PURE__ */ r.jsx("span", { style: { background: b } }, m)) }),
                    p.name
                  ] }, p.id))
                ]
              }
            )
          ] })
        ] }, h.id + "-" + v);
      })
    ] })
  ] });
}, qh = ({ p: e }) => /* @__PURE__ */ r.jsxs("span", { style: { display: "inline-flex", gap: 1.5, alignItems: "flex-end", height: 10 }, children: [
  [0, 1, 2].map((t) => /* @__PURE__ */ r.jsx("span", { style: { width: 2, background: "#fff", animation: `mvBar 0.8s ${t * 0.12}s infinite ease-in-out`, height: "100%" } }, t)),
  /* @__PURE__ */ r.jsx("style", { children: "@keyframes mvBar{0%,100%{height:30%}50%{height:100%}}" })
] }), Jh = ({ ctx: e, activeSpeaker: t, setActiveSpeaker: n, togglePlay: i, setVol: o }) => {
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
      const f = window.trackById(c.trackId), u = c.id === t;
      return /* @__PURE__ */ r.jsxs("div", { onClick: () => n(c.id), style: {
        padding: "12px 14px",
        borderBottom: `.5px solid ${l.border}`,
        cursor: "pointer",
        background: u ? l.warm : "transparent",
        borderLeft: u ? `2px solid ${l.accent}` : "2px solid transparent"
      }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { width: 36, height: 36, borderRadius: 6, background: `radial-gradient(120% 120% at 30% 25%, ${f.hue}, oklch(20% 0.05 25))`, flex: "none" } }),
          /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: l.fg, fontWeight: 500 }, children: [
              /* @__PURE__ */ r.jsx(window.Icon, { name: c.type === "airplay" ? "airplay" : "sonos", size: 11, style: { color: l.fg3 } }),
              c.name,
              c.playing && /* @__PURE__ */ r.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "oklch(60% 0.14 145)" } })
            ] }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: l.fg3, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: c.playing ? `${f.title} · ${f.artist}` : "Idle" })
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
        c.playing && /* @__PURE__ */ r.jsx("div", { style: { height: 2, background: l.border, borderRadius: 1, marginTop: 6, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${c.progress / f.dur * 100}%`, height: "100%", background: l.accent } }) })
      ] }, c.id);
    }) }),
    /* @__PURE__ */ r.jsxs("div", { style: { padding: "12px 14px", borderTop: `.5px solid ${l.border}`, display: "flex", gap: 8 }, children: [
      /* @__PURE__ */ r.jsx("button", { onClick: () => d((c) => ({ ...c, speakers: c.speakers.map((f) => ({ ...f, playing: !1 })) })), style: {
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
        const c = a.speakers.find((f) => f.id === t);
        d((f) => ({ ...f, speakers: f.speakers.map((u) => ({ ...u, group: "g1", trackId: c.trackId, progress: c.progress, playing: c.playing })) }));
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
window.MusicView = Qh;
const Zh = ({ ctx: e }) => {
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
window.CamerasView = Zh;
const eg = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, s = (f, u, h) => l((v) => ({ ...v, calendar: v.calendar.map((w) => w.id === f ? { ...w, [u]: h } : w) })), a = (f, u) => s(f, "dnd", !u), d = (f, u) => s(f, "preMins", u), c = (f) => l((u) => ({ ...u, dnd: { active: !0, until: f.end + " (" + f.title + ")", source: f.id } }));
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "Microsoft Outlook · frances.w@willowstudio.com",
        title: "Tuesday, May 5",
        sub: `${o.calendar.length} events · ${o.calendar.filter((f) => f.dnd).length} with Do Not Disturb`,
        right: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: /* @__PURE__ */ r.jsx(tg, { ctx: e }) })
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: i.gap, alignItems: "start" }, children: [
      /* @__PURE__ */ r.jsx(window.Card, { p: t, style: { padding: 0, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx(ng, { ctx: e }) }),
      /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: o.calendar.map((f) => /* @__PURE__ */ r.jsx(window.Card, { p: t, style: { padding: 16 }, children: /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 12, alignItems: "flex-start" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 4, alignSelf: "stretch", borderRadius: 2, background: f.dot, flex: "none" } }),
        /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 10 }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 17, fontWeight: 500, color: t.fg, flex: 1 }, children: f.title }),
            /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: t.fg2, fontVariantNumeric: "tabular-nums" }, children: [
              f.t,
              " – ",
              f.end
            ] })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: t.fg3, marginTop: 3, fontStyle: "italic" }, children: [
            f.where,
            " · ",
            f.organizer
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, marginTop: 12, padding: "10px 12px", borderRadius: 8, background: f.dnd ? t.accentSoft : t.surface, border: `.5px solid ${f.dnd ? t.accent : t.border}` }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: f.dnd ? "bellOff" : "bell", size: 14, style: { color: f.dnd ? t.accent : t.fg3 } }),
            /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, fontSize: 12 }, children: [
              /* @__PURE__ */ r.jsxs("div", { style: { color: f.dnd ? t.accent : t.fg, fontWeight: f.dnd ? 500 : 400 }, children: [
                "Do not disturb ",
                f.dnd ? "on" : "off"
              ] }),
              f.dnd && /* @__PURE__ */ r.jsxs("div", { style: { color: t.fg3, marginTop: 2, fontSize: 11 }, children: [
                "Starts ",
                f.preMins,
                " min before · ends when meeting ends"
              ] })
            ] }),
            f.dnd && /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 4 }, children: [0, 5, 10, 15].map((u) => /* @__PURE__ */ r.jsx("button", { onClick: () => d(f.id, u), style: {
              padding: "3px 7px",
              borderRadius: 5,
              fontSize: 10,
              border: `.5px solid ${u === f.preMins ? t.accent : t.border2}`,
              background: u === f.preMins ? t.accent : "transparent",
              color: u === f.preMins ? "#fff" : t.fg2,
              cursor: "pointer",
              fontFamily: n.body
            }, children: u === 0 ? "now" : `−${u}m` }, u)) }),
            /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: f.dnd, onChange: () => a(f.id, f.dnd) })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 6, marginTop: 10, fontSize: 11 }, children: [
            /* @__PURE__ */ r.jsx("span", { style: {
              padding: "3px 8px",
              borderRadius: 999,
              border: `.5px solid ${t.border2}`,
              color: f.accepted === "accepted" ? "oklch(60% 0.13 145)" : t.fg3,
              background: f.accepted === "accepted" ? "oklch(60% 0.13 145 / .12)" : "transparent"
            }, children: f.accepted === "accepted" ? "✓ Going" : "? Tentative" }),
            f.dnd && /* @__PURE__ */ r.jsx("button", { onClick: () => c(f), style: {
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
      ] }) }, f.id)) })
    ] }),
    /* @__PURE__ */ r.jsx(rg, { ctx: e }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
}, tg = ({ ctx: e }) => {
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
}, ng = ({ ctx: e }) => {
  const { p: t, fonts: n, state: i } = e, o = 8, l = 20, s = (l - o) * 60, a = 44, d = (l - o) * a, c = (v) => {
    const [, w, p, b] = v.match(/(\d+):(\d+)\s*(AM|PM)/i);
    return (parseInt(w) % 12 + (b.toUpperCase() === "PM" ? 12 : 0)) * 60 + parseInt(p);
  }, f = (v) => (c(v) - o * 60) / s * d, h = (19 * 60 + 42 - o * 60) / s * d;
  return /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "60px 1fr", height: d, fontSize: 11 }, children: [
    /* @__PURE__ */ r.jsx("div", { children: Array.from({ length: l - o }).map((v, w) => /* @__PURE__ */ r.jsxs("div", { style: { height: a, color: t.fg3, padding: "2px 10px 0", borderTop: `.5px solid ${t.border}`, textAlign: "right" }, children: [
      (o + w) % 12 || 12,
      " ",
      o + w >= 12 ? "PM" : "AM"
    ] }, w)) }),
    /* @__PURE__ */ r.jsxs("div", { style: { position: "relative", borderLeft: `.5px solid ${t.border}` }, children: [
      Array.from({ length: l - o }).map((v, w) => /* @__PURE__ */ r.jsx("div", { style: { height: a, borderTop: `.5px solid ${t.border}` } }, w)),
      i.calendar.map((v) => {
        const w = f(v.t), b = (c(v.end) - c(v.t)) / 60 * a;
        return /* @__PURE__ */ r.jsxs("div", { style: {
          position: "absolute",
          top: w,
          left: 8,
          right: 14,
          height: b - 4,
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
}, rg = ({ ctx: e }) => {
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
window.CalendarView = eg;
const ig = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, s = o.tesla, a = (d, c) => l((f) => ({ ...f, tesla: { ...f.tesla, [d]: c } }));
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "Tesla · Model 3",
        title: s.name,
        sub: `${s.location} · software ${s.software} · ${s.odometer.toLocaleString()} mi`,
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
          /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 400 160", style: { position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", width: "82%", height: "auto", filter: t.dark ? "drop-shadow(0 8px 24px rgba(0,0,0,.5))" : "drop-shadow(0 8px 18px rgba(0,0,0,.18))" }, children: [
            /* @__PURE__ */ r.jsx(
              "path",
              {
                d: "M 30 110 Q 60 70, 130 60 Q 180 35, 240 38 Q 290 40, 330 60 Q 360 78, 380 105 L 380 120 Q 370 130, 350 130 L 50 130 Q 30 130, 30 120 Z",
                fill: t.dark ? "#3a3a40" : "#cfcdc7",
                stroke: t.border2,
                strokeWidth: ".8"
              }
            ),
            /* @__PURE__ */ r.jsx("path", { d: "M 130 60 Q 180 35, 240 38 Q 280 40, 310 56 L 290 80 L 150 80 Z", fill: t.dark ? "#1a1d22" : "#7d8896", opacity: ".85" }),
            /* @__PURE__ */ r.jsx("path", { d: "M 60 90 Q 130 78, 200 78 Q 280 78, 360 95", fill: "none", stroke: "rgba(255,255,255,.12)", strokeWidth: "1" }),
            /* @__PURE__ */ r.jsx("circle", { cx: "110", cy: "130", r: "22", fill: t.dark ? "#0e0e10" : "#2a2622" }),
            /* @__PURE__ */ r.jsx("circle", { cx: "110", cy: "130", r: "14", fill: t.dark ? "#2a2a2e" : "#65605a" }),
            /* @__PURE__ */ r.jsx("circle", { cx: "110", cy: "130", r: "5", fill: t.dark ? "#0e0e10" : "#2a2622" }),
            /* @__PURE__ */ r.jsx("circle", { cx: "310", cy: "130", r: "22", fill: t.dark ? "#0e0e10" : "#2a2622" }),
            /* @__PURE__ */ r.jsx("circle", { cx: "310", cy: "130", r: "14", fill: t.dark ? "#2a2a2e" : "#65605a" }),
            /* @__PURE__ */ r.jsx("circle", { cx: "310", cy: "130", r: "5", fill: t.dark ? "#0e0e10" : "#2a2622" }),
            s.charging && /* @__PURE__ */ r.jsx("circle", { cx: "365", cy: "100", r: "5", fill: t.accent, children: /* @__PURE__ */ r.jsx("animate", { attributeName: "opacity", values: "0.4;1;0.4", dur: "2s", repeatCount: "indefinite" }) }),
            s.frunk && /* @__PURE__ */ r.jsx("path", { d: "M 140 50 Q 180 25, 220 28", fill: "none", stroke: t.accent, strokeWidth: "2", strokeDasharray: "3,3" }),
            s.trunk && /* @__PURE__ */ r.jsx("path", { d: "M 290 50 Q 320 25, 340 30", fill: "none", stroke: t.accent, strokeWidth: "2", strokeDasharray: "3,3" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { position: "absolute", bottom: 14, left: 18, right: 18 }, children: [
            /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 10, fontFamily: n.display, color: t.fg }, children: [
              /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 46, fontWeight: 500, lineHeight: 1, fontVariantNumeric: "tabular-nums" }, children: [
                s.chargePct,
                /* @__PURE__ */ r.jsx("span", { style: { fontSize: 22, color: t.fg2 }, children: "%" })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 13, color: t.fg2 }, children: [
                s.range,
                " mi range"
              ] }),
              /* @__PURE__ */ r.jsx("div", { style: { flex: 1 } }),
              /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: s.charging ? t.accent : t.fg3, display: "flex", alignItems: "center", gap: 5 }, children: [
                s.charging && /* @__PURE__ */ r.jsx(window.Icon, { name: "bolt", size: 11 }),
                s.charging ? `+${s.chargeRate} mph` : s.pluggedIn ? "plugged in · idle" : "unplugged"
              ] })
            ] }),
            /* @__PURE__ */ r.jsx("div", { style: { height: 4, background: t.border, borderRadius: 2, marginTop: 8, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${s.chargePct}%`, height: "100%", background: s.charging ? t.accent : "oklch(60% 0.14 145)", transition: "width .3s" } }) })
          ] })
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { padding: 14, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, borderTop: `.5px solid ${t.border}` }, children: [
          { icon: "lock", label: s.locked ? "Unlock" : "Lock", onClick: () => a("locked", !s.locked) },
          { icon: "snowflake", label: s.climateOn ? "Climate on" : "Precondition", onClick: () => a("climateOn", !s.climateOn), active: s.climateOn },
          { icon: "package", label: s.frunk ? "Frunk open" : "Open frunk", onClick: () => a("frunk", !s.frunk), active: s.frunk },
          { icon: "package", label: s.trunk ? "Trunk open" : "Open trunk", onClick: () => a("trunk", !s.trunk), active: s.trunk }
        ].map((d) => /* @__PURE__ */ r.jsxs("button", { onClick: d.onClick, style: {
          padding: "12px 8px",
          borderRadius: 9,
          cursor: "pointer",
          fontFamily: n.body,
          fontSize: 11,
          border: `.5px solid ${d.active ? t.accent : t.border2}`,
          background: d.active ? t.accentSoft : t.surface,
          color: d.active ? t.accent : t.fg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6
        }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: d.icon, size: 16 }),
          /* @__PURE__ */ r.jsx("span", { children: d.label })
        ] }, d.label)) })
      ] }),
      /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 18 }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.fg3 }, children: "Cabin climate" }),
          /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: s.climateOn, onChange: (d) => a("climateOn", d) })
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
              "°"
            ] }),
            /* @__PURE__ */ r.jsx("div", { style: { color: t.fg3 }, children: "target" })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 14 }, children: [
          /* @__PURE__ */ r.jsx("button", { onClick: () => a("target", s.target - 1), style: {
            flex: 1,
            padding: "9px 0",
            border: `.5px solid ${t.border2}`,
            background: "transparent",
            color: t.fg,
            borderRadius: 8,
            fontSize: 14,
            cursor: "pointer"
          }, children: "−" }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => a("target", s.target + 1), style: {
            flex: 1,
            padding: "9px 0",
            border: `.5px solid ${t.border2}`,
            background: "transparent",
            color: t.fg,
            borderRadius: 8,
            fontSize: 14,
            cursor: "pointer"
          }, children: "+" })
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }, children: ["Auto", "Defrost", "Heat seats", "Vent"].map((d) => /* @__PURE__ */ r.jsx("button", { style: { padding: "9px 0", border: `.5px solid ${t.border2}`, background: t.surface, color: t.fg, borderRadius: 8, fontSize: 11, cursor: "pointer", fontFamily: n.body }, children: d }, d)) }),
        /* @__PURE__ */ r.jsxs("div", { style: { borderTop: `.5px solid ${t.border}`, paddingTop: 12, marginTop: 14, fontSize: 11, color: t.fg3 }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 0" }, children: [
            /* @__PURE__ */ r.jsx("span", { children: "Sunroof" }),
            /* @__PURE__ */ r.jsxs("span", { style: { color: t.fg2 }, children: [
              s.sunroof,
              "% open"
            ] })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 0" }, children: [
            /* @__PURE__ */ r.jsx("span", { children: "Windows" }),
            /* @__PURE__ */ r.jsx("span", { style: { color: t.fg2 }, children: "Closed" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 0" }, children: [
            /* @__PURE__ */ r.jsx("span", { children: "Tire pressure" }),
            /* @__PURE__ */ r.jsx("span", { style: { color: t.fg2 }, children: "42 / 41 / 42 / 41 psi" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: i.gap }, children: [
      /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 18 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.fg3, marginBottom: 12 }, children: "Charging" }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ r.jsx(On, { p: t, label: "Charge limit", value: `${s.chargePct < 80 ? 80 : 90}%` }),
          /* @__PURE__ */ r.jsx(On, { p: t, label: "Scheduled start", value: "Tonight · 11:00 PM" }),
          /* @__PURE__ */ r.jsx(On, { p: t, label: "Charging amps", value: "48 A" }),
          /* @__PURE__ */ r.jsx(On, { p: t, label: "Voltage", value: "240 V" }),
          /* @__PURE__ */ r.jsx(On, { p: t, label: "Energy added today", value: "22.4 kWh" })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 18 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.fg3, marginBottom: 12 }, children: "Recent trips" }),
        [
          { dest: "Studio · Mission", time: "8:14 AM", dist: "4.2 mi", energy: "1.6 kWh" },
          { dest: "Sightglass Coffee", time: "11:32 AM", dist: "1.8 mi", energy: "0.7 kWh" },
          { dest: "Whole Foods · 4th St", time: "5:48 PM", dist: "3.1 mi", energy: "1.2 kWh" },
          { dest: "Home", time: "6:22 PM", dist: "3.0 mi", energy: "1.1 kWh" }
        ].map((d, c) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderTop: c ? `.5px solid ${t.border}` : "none", fontSize: 12 }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: "location", size: 14, style: { color: t.fg3 } }),
          /* @__PURE__ */ r.jsx("div", { style: { flex: 1, color: t.fg }, children: d.dest }),
          /* @__PURE__ */ r.jsx("div", { style: { color: t.fg3, fontVariantNumeric: "tabular-nums" }, children: d.time }),
          /* @__PURE__ */ r.jsx("div", { style: { color: t.fg3, width: 60, textAlign: "right", fontVariantNumeric: "tabular-nums" }, children: d.dist })
        ] }, c))
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
}, On = ({ p: e, label: t, value: n }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", fontSize: 12 }, children: [
  /* @__PURE__ */ r.jsx("span", { style: { color: e.fg2 }, children: t }),
  /* @__PURE__ */ r.jsx("span", { style: { color: e.fg, fontVariantNumeric: "tabular-nums" }, children: n })
] });
window.CarView = ig;
const og = ({ ctx: e }) => {
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
window.GarageView = og;
const lg = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, [s, a] = React.useState(null), [d, c] = React.useState(null), f = o.integrations.filter((v) => v.status === "connected"), u = o.integrations.filter((v) => v.status === "available"), h = (v, w) => l((p) => ({
    ...p,
    integrations: p.integrations.map((b) => b.id === v ? { ...b, status: w } : b)
  }));
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: `${f.length} integrations connected`,
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
    /* @__PURE__ */ r.jsx(window.Section, { title: "Connected", subtitle: `${f.length} services · 32 devices`, p: t, fonts: n, children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: i.tileGap }, children: f.map((v) => /* @__PURE__ */ r.jsx(
      sg,
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
      dg,
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
}, sg = ({ ctx: e, integration: t, expanded: n, onClick: i, onDisconnect: o }) => {
  const { p: l, fonts: s, state: a } = e, d = t, c = ag(d.id, a);
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
      d.id === "hue" || d.id === "sonos" || d.id === "ring" ? /* @__PURE__ */ r.jsx(pg, { ctx: e, integrationId: d.id }) : c.length > 0 && /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }, children: c.map((f, u) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "5px 0", fontSize: 12, color: l.fg2, borderBottom: u < c.length - 1 ? `.5px solid ${l.border}` : "none" }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: f.icon, size: 11, style: { color: l.fg3 } }),
        /* @__PURE__ */ r.jsx("span", { style: { flex: 1 }, children: f.name }),
        /* @__PURE__ */ r.jsxs("span", { style: { fontSize: 10, color: f.online ? "oklch(60% 0.14 145)" : l.fg3 }, children: [
          "● ",
          f.online ? "online" : "offline"
        ] })
      ] }, u)) }),
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
        /* @__PURE__ */ r.jsx("button", { style: { flex: 1, padding: "6px 10px", borderRadius: 6, border: `.5px solid ${l.border2}`, background: "transparent", color: l.fg2, fontSize: 11, cursor: "pointer", fontFamily: s.body }, children: "Refresh" }),
        /* @__PURE__ */ r.jsx("button", { style: { flex: 1, padding: "6px 10px", borderRadius: 6, border: `.5px solid ${l.border2}`, background: "transparent", color: l.fg2, fontSize: 11, cursor: "pointer", fontFamily: s.body }, children: "Settings" }),
        /* @__PURE__ */ r.jsx("button", { onClick: (f) => {
          f.stopPropagation(), o();
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
function ag(e, t) {
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
const dg = ({ ctx: e, integrationId: t, onClose: n, onConnect: i }) => {
  const { p: o, fonts: l, state: s } = e, [a, d] = React.useState(t === "PICK" ? "pick" : "auth"), [c, f] = React.useState(t === "PICK" ? null : t), [u, h] = React.useState(0), v = s.integrations;
  React.useEffect(() => {
    if (a === "discover") {
      h(0);
      const p = setInterval(() => h((b) => b >= 100 ? (clearInterval(p), d("done"), 100) : b + 8), 80);
      return () => clearInterval(p);
    }
  }, [a]);
  const w = v.find((p) => p.id === c);
  return /* @__PURE__ */ r.jsx("div", { style: {
    position: "absolute",
    inset: 0,
    zIndex: 60,
    background: "rgba(0,0,0,.55)",
    backdropFilter: "blur(4px)",
    display: "grid",
    placeItems: "center",
    padding: 24
  }, onClick: n, children: /* @__PURE__ */ r.jsxs("div", { onClick: (p) => p.stopPropagation(), style: {
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
        /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }, children: v.map((p) => /* @__PURE__ */ r.jsxs("button", { onClick: () => {
          f(p.id), d("auth");
        }, disabled: p.status === "connected", style: {
          padding: 14,
          borderRadius: 10,
          border: `.5px solid ${o.border2}`,
          background: p.status === "connected" ? o.surface : o.surface2,
          color: o.fg,
          cursor: p.status === "connected" ? "default" : "pointer",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: 11,
          fontFamily: l.body,
          opacity: p.status === "connected" ? 0.55 : 1
        }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { width: 32, height: 32, borderRadius: 7, background: p.color + "22", color: p.color, display: "grid", placeItems: "center", flex: "none" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: p.icon, size: 16 }) }),
          /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, fontWeight: 500 }, children: p.name }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: o.fg3, marginTop: 1 }, children: p.status === "connected" ? "✓ Connected" : "Not connected" })
          ] })
        ] }, p.id)) })
      ] }),
      a === "auth" && w && /* @__PURE__ */ r.jsxs("div", { children: [
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: 14, borderRadius: 11, background: o.surface, border: `.5px solid ${o.border}` }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { width: 44, height: 44, borderRadius: 10, background: w.color + "22", color: w.color, display: "grid", placeItems: "center", flex: "none" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: w.icon, size: 22 }) }),
          /* @__PURE__ */ r.jsxs("div", { children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontFamily: l.display, fontSize: 16, color: o.fg, fontWeight: 500 }, children: w.name }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: o.fg3, marginTop: 2 }, children: cg(w.id) })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { marginTop: 16, padding: "14px 16px", background: o.surface, border: `.5px solid ${o.border}`, borderRadius: 10 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: o.fg3, marginBottom: 10 }, children: "Permissions" }),
          ug(w.id).map((p, b) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 0", fontSize: 12 }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: "check", size: 13, style: { color: o.accent, marginTop: 2, flex: "none" } }),
            /* @__PURE__ */ r.jsx("div", { style: { color: o.fg2 }, children: p })
          ] }, b))
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
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: o.fg2, marginTop: 8, maxWidth: 340 }, children: fg(w.id) }),
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
function cg(e) {
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
function ug(e) {
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
function fg(e) {
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
const pg = ({ ctx: e, integrationId: t }) => {
  const { p: n, fonts: i, state: o, setState: l } = e, s = t === "hue" ? o.lights : t === "sonos" ? o.speakers.filter((f) => f.type === "sonos") : o.cameras, a = t === "hue" ? "bulb" : t === "sonos" ? "sonos" : "cam", d = t === "hue" ? "lights" : t === "sonos" ? "speakers" : "cameras", c = (f, u) => l((h) => ({ ...h, [d]: h[d].map((v) => v.id === f ? { ...v, room: u } : v) }));
  return /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }, children: [
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: n.fg3, marginBottom: 2 }, children: "Assign rooms" }),
    s.map((f) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 7, background: n.surface2, border: `.5px solid ${n.border}` }, children: [
      /* @__PURE__ */ r.jsx(window.Icon, { name: a, size: 12, style: { color: n.fg3, flex: "none" } }),
      /* @__PURE__ */ r.jsx("span", { style: { flex: 1, fontSize: 12, color: n.fg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: f.name }),
      /* @__PURE__ */ r.jsx("select", { value: f.room, onChange: (u) => c(f.id, u.target.value), style: {
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
    ] }, f.id))
  ] });
};
window.DevicesView = lg;
const hg = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, [s, a] = React.useState(!1), [d, c] = React.useState(""), [f, u] = React.useState(null), [h, v] = React.useState(""), w = (x) => {
    if (c(x), v(""), !x.trim()) {
      u(null);
      return;
    }
    const k = window.parseAutomation(x, o);
    k ? u(k) : (u(null), v('Try: "When there is motion at the front door, turn on the porch light"'));
  }, p = () => {
    f && (l((x) => ({ ...x, automations: [...x.automations, f] })), c(""), u(null), a(!1));
  }, b = (x) => l((k) => ({ ...k, automations: k.automations.map((j) => j.id === x ? { ...j, enabled: !j.enabled } : j) })), m = (x) => l((k) => ({ ...k, automations: k.automations.filter((j) => j.id !== x) })), g = (x) => window.runAutomation(x, o, l), y = [
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
            border: `.5px solid ${f ? t.accent : t.border2}`,
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
      f && /* @__PURE__ */ r.jsxs("div", { style: { marginTop: 14, padding: 14, borderRadius: 10, background: t.warm, border: `.5px solid ${t.border}` }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }, children: "I understood" }),
        /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 16, color: t.fg, fontWeight: 500, marginBottom: 4 }, children: f.name }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: t.fg2, fontStyle: "italic" }, children: f.desc }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 12 }, children: [
          /* @__PURE__ */ r.jsx("button", { onClick: p, style: { padding: "8px 14px", borderRadius: 8, border: 0, background: t.accent, color: "#fff", fontSize: 12, cursor: "pointer" }, children: "Save automation" }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => {
            c(""), u(null);
          }, style: { padding: "8px 14px", borderRadius: 8, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 12, cursor: "pointer" }, children: "Try again" })
        ] })
      ] }),
      h && !f && /* @__PURE__ */ r.jsx("div", { style: { marginTop: 10, fontSize: 12, color: t.fg3, fontStyle: "italic" }, children: h }),
      /* @__PURE__ */ r.jsxs("div", { style: { marginTop: 14, padding: "10px 12px", borderRadius: 8, background: t.surface, border: `.5px dashed ${t.border2}`, fontSize: 11, color: t.fg3 }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: "sparkle", size: 11, style: { display: "inline", verticalAlign: "middle", marginRight: 5 } }),
        "Tip: you can also just tell the agent. Say ",
        /* @__PURE__ */ r.jsx("em", { style: { color: t.accent }, children: `"when there's motion on the front door cam, turn the porch light on"` }),
        " and it'll set it up."
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: i.tileGap }, children: o.automations.map((x) => /* @__PURE__ */ r.jsx(gg, { a: x, ctx: e, onToggle: () => b(x.id), onRemove: () => m(x.id), onRun: () => g(x) }, x.id)) }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 80 } })
  ] });
}, gg = ({ a: e, ctx: t, onToggle: n, onRemove: i, onRun: o }) => {
  const { p: l, fonts: s, state: a } = t, d = e.trigger.type === "motion" ? "cam" : e.trigger.type === "time" ? "clock" : e.trigger.type === "leaveHome" ? "door" : "home", c = e.trigger.type === "motion" ? `Motion · ${a.cameras.find((f) => f.id === e.trigger.cameraId)?.name || "camera"}` : e.trigger.type === "time" ? `At ${e.trigger.at}` : e.trigger.type === "leaveHome" ? "When I leave" : e.trigger.type === "arriveHome" ? "When I arrive" : "Trigger";
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
    /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12, paddingTop: 12, borderTop: `.5px solid ${l.border}` }, children: e.actions.map((f, u) => /* @__PURE__ */ r.jsxs("span", { style: {
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
      /* @__PURE__ */ r.jsx(window.Icon, { name: mg(f), size: 9 }),
      yg(f, a)
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
}, mg = (e) => e.type === "light" || e.type === "allLights" ? "bulb" : e.type === "lockAll" ? "lock" : e.type === "scene" ? "scene" : e.type === "precondition" ? "car" : e.type === "closeGarage" ? "garage" : e.type === "thermostat" ? "therm" : "sparkle", yg = (e, t) => {
  if (e.type === "light") {
    const n = t.lights.find((i) => i.id === e.lightId);
    return `${e.on ? "On" : "Off"} · ${n?.name || "light"}`;
  }
  return e.type === "allLights" ? e.on ? "All lights on" : "All lights off" : e.type === "lockAll" ? "Lock all" : e.type === "scene" ? `Scene · ${e.sceneId}` : e.type === "precondition" ? "Precondition Tesla" : e.type === "closeGarage" ? "Close garage" : e.type === "thermostat" ? `Set ${e.target}°` : e.type;
};
Object.assign(window, { AutomationsView: hg });
const xg = ({ ctx: e }) => {
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
  ], f = [
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
          /* @__PURE__ */ r.jsx(Nt, { p: t, fonts: n, title: "Appearance", sub: "How HomeCNTRD looks on this device" }),
          /* @__PURE__ */ r.jsx(Te, { p: t, fonts: n, label: "Theme", desc: "Light, dark, or follow system", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8 }, children: [
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
          /* @__PURE__ */ r.jsx(Te, { p: t, fonts: n, label: "Accent color", desc: "Used across the app for highlights and status", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" }, children: d.map((u) => /* @__PURE__ */ r.jsxs("button", { onClick: () => l("hearthAccent", u.id), style: {
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
          /* @__PURE__ */ r.jsx(Te, { p: t, fonts: n, label: "Density", desc: "How tightly information is packed", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8 }, children: ["compact", "regular", "comfy"].map((u) => /* @__PURE__ */ r.jsx("button", { onClick: () => l("density", u), style: {
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
          /* @__PURE__ */ r.jsx(Te, { p: t, fonts: n, label: "Typography", desc: "Headline pairing", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: f.map((u) => /* @__PURE__ */ r.jsxs("button", { onClick: () => l("fontPair", u.id), style: {
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
          /* @__PURE__ */ r.jsx(Nt, { p: t, fonts: n, title: "Agent", sub: "How HomeCNTRD speaks to you" }),
          /* @__PURE__ */ r.jsx(Te, { p: t, fonts: n, label: "Personality", desc: "Persona used when chatting and reading status", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: c.map((u) => /* @__PURE__ */ r.jsxs("button", { onClick: () => l("agentTone", u.id), style: {
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
          /* @__PURE__ */ r.jsx(Te, { p: t, fonts: n, label: "Voice activation", desc: "Wake on 'Hey HomeCNTRD'", inline: !0, children: /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: o.wake !== !1, onChange: (u) => l("wake", u) }) }),
          /* @__PURE__ */ r.jsx(Te, { p: t, fonts: n, label: "Suggestions on home", desc: "Show suggested commands when you open the agent", inline: !0, children: /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: o.suggestions !== !1, onChange: (u) => l("suggestions", u) }) })
        ] }),
        s === "devices" && /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-devices", style: { padding: 22 }, children: [
          /* @__PURE__ */ r.jsx(Nt, { p: t, fonts: n, title: "Devices on home screen", sub: "Choose which categories appear on the dashboard" }),
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
          /* @__PURE__ */ r.jsx(Nt, { p: t, fonts: n, title: "Household", sub: "People & places" }),
          /* @__PURE__ */ r.jsx(Te, { p: t, fonts: n, label: "Members", children: /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
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
          /* @__PURE__ */ r.jsx(Te, { p: t, fonts: n, label: "Address", inline: !0, children: /* @__PURE__ */ r.jsx("span", { style: { fontSize: 13, color: t.fg2 }, children: "Willowbrook · Bernal Heights, SF" }) }),
          /* @__PURE__ */ r.jsx(Te, { p: t, fonts: n, label: "Time zone", inline: !0, children: /* @__PURE__ */ r.jsx("span", { style: { fontSize: 13, color: t.fg2 }, children: "Pacific · GMT−8" }) })
        ] }),
        s === "notifications" && /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-notifications", style: { padding: 22 }, children: [
          /* @__PURE__ */ r.jsx(Nt, { p: t, fonts: n, title: "Notifications", sub: "What HomeCNTRD chimes for" }),
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
          /* @__PURE__ */ r.jsx(Nt, { p: t, fonts: n, title: "Account", sub: "HomeCNTRD account · sign-in" }),
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
          /* @__PURE__ */ r.jsx(Te, { p: t, fonts: n, label: "Active sessions", desc: "Devices currently signed in to your HomeCNTRD account", children: /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
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
          /* @__PURE__ */ r.jsx(Te, { p: t, fonts: n, label: "Connected services", desc: "Mirrors what's set up in Devices", children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 6 }, children: e.state.integrations.filter((u) => u.status === "connected").map((u) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, background: t.surface, border: `.5px solid ${t.border}` }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { width: 22, height: 22, borderRadius: 6, background: u.color + "22", color: u.color, display: "grid", placeItems: "center", flex: "none" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: u.icon, size: 11 }) }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: u.name })
          ] }, u.id)) }) }),
          /* @__PURE__ */ r.jsx(Te, { p: t, fonts: n, label: "Privacy", desc: "What HomeCNTRD shares and stores", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column" }, children: [
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
        s === "diagnostics" && /* @__PURE__ */ r.jsx(vg, { ctx: e })
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
}, vg = ({ ctx: e }) => {
  const { p: t, fonts: n } = e, [i, o] = React.useState(() => typeof window < "u" ? [...window.__hcDiag || []] : []);
  React.useEffect(() => {
    const c = setInterval(() => {
      typeof window < "u" && o([...window.__hcDiag || []]);
    }, 1e3);
    return () => clearInterval(c);
  }, []);
  const l = [...i].reverse(), s = (c) => new Date(c).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }), a = (c, f) => f === "info" ? "#7da9d6" : f === "skip" ? "#d6b97d" : c === "ok" ? "#7ed3a3" : c === "error" ? "#ec8b78" : c === "pending" ? t.fg3 : t.fg2, d = (c) => c.kind === "info" ? "ⓘ" : c.kind === "skip" ? "⊘" : c.status === "ok" ? "✓" : c.status === "error" ? "✗" : c.status === "pending" ? "·" : "!";
  return /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-diagnostics", style: { padding: 22 }, children: [
    /* @__PURE__ */ r.jsx(Nt, { p: t, fonts: n, title: "Diagnostics", sub: "Recent commands HomeCNTRD has sent to Home Assistant" }),
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
    /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6, fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: 11.5 }, children: l.map((c, f) => /* @__PURE__ */ r.jsxs("div", { style: {
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
    ] }, f)) })
  ] });
}, Nt = ({ p: e, fonts: t, title: n, sub: i }) => /* @__PURE__ */ r.jsxs("div", { style: { marginBottom: 16 }, children: [
  /* @__PURE__ */ r.jsx("div", { style: { fontFamily: t.display, fontSize: 22, color: e.fg, fontWeight: 500 }, children: n }),
  i && /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: e.fg3, marginTop: 3, fontStyle: "italic", fontFamily: t.display }, children: i })
] }), Te = ({ p: e, fonts: t, label: n, desc: i, children: o, inline: l }) => /* @__PURE__ */ r.jsxs("div", { style: { padding: "14px 0", borderTop: `.5px solid ${e.border}`, display: l ? "flex" : "block", alignItems: l ? "center" : "stretch", gap: 14 }, children: [
  /* @__PURE__ */ r.jsxs("div", { style: { flex: l ? 1 : "auto", marginBottom: l ? 0 : 12 }, children: [
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: e.fg, fontWeight: 500 }, children: n }),
    i && /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: e.fg3, marginTop: 3 }, children: i })
  ] }),
  o
] });
window.SettingsView = xg;
const wg = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l, room: s } = e, a = o.tvs.filter((v) => v.room === s), d = a.length ? a : o.tvs, [c, f] = React.useState(null);
  if (!d.length) return null;
  const u = (v) => l((w) => ({ ...w, tvs: w.tvs.map((p) => p.id === v ? { ...p, playing: !p.playing, on: !0 } : p) })), h = (v) => l((w) => ({ ...w, tvs: w.tvs.map((p) => p.id === v ? { ...p, on: !p.on, playing: p.on ? !1 : p.playing } : p) }));
  return /* @__PURE__ */ r.jsxs(window.Section, { title: "TVs", subtitle: `${d.filter((v) => v.on).length} of ${d.length} on${a.length ? "" : " · whole house"}`, p: t, fonts: n, children: [
    /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: i.tileGap }, children: d.map((v) => /* @__PURE__ */ r.jsx(kg, { ctx: e, tv: v, togglePlay: u, togglePower: h, openRemote: () => f(v.id) }, v.id)) }),
    c && /* @__PURE__ */ r.jsx(jg, { ctx: e, tv: o.tvs.find((v) => v.id === c), onClose: () => f(null) })
  ] });
}, ml = {
  appletv: { label: "Apple TV", badgeBg: "#1f1f1f", badgeFg: "#fff", accent: "#a78bfa" },
  googletv: { label: "Google TV", badgeBg: "#1f1f1f", badgeFg: "#fff", accent: "#5b8cff" },
  lgthinq: { label: "LG ThinQ", badgeBg: "#a8174e", badgeFg: "#fff", accent: "#a8174e" }
}, kg = ({ ctx: e, tv: t, togglePlay: n, togglePower: i, openRemote: o }) => {
  const { p: l, fonts: s, state: a, setState: d } = e, c = ml[t.brand] || ml.appletv, f = window.ROOMS.find((h) => h.id === t.room)?.name, u = t.dur > 0 ? t.progress / t.dur * 100 : 0;
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
          f,
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
        /* @__PURE__ */ r.jsx(bg, { size: 12 }),
        " Remote"
      ] })
    ] })
  ] });
}, bg = ({ size: e = 12 }) => /* @__PURE__ */ r.jsxs("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ r.jsx("rect", { x: "7", y: "3", width: "10", height: "18", rx: "3" }),
  /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "9", r: "2" }),
  /* @__PURE__ */ r.jsx("path", { d: "M12 14v4M10 16h4" })
] }), jg = ({ ctx: e, tv: t, onClose: n }) => {
  const { p: i, fonts: o, setState: l, state: s } = e;
  if (!t) return null;
  const a = ml[t.brand], d = window.ROOMS.find((u) => u.id === t.room)?.name, c = (u) => l((h) => ({ ...h, tvs: h.tvs.map((v) => v.id === t.id ? { ...v, ...u } : v) })), f = (u) => {
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
        t.brand === "appletv" && /* @__PURE__ */ r.jsx(Sg, { p: i, fonts: o, press: f, update: c, tv: t }),
        t.brand === "googletv" && /* @__PURE__ */ r.jsx(Cg, { p: i, fonts: o, press: f, update: c, tv: t }),
        t.brand === "lgthinq" && /* @__PURE__ */ r.jsx(zg, { p: i, fonts: o, press: f, update: c, tv: t })
      ] })
    ] })
  ] });
}, te = ({ p: e, fonts: t, onClick: n, children: i, size: o = 44, primary: l, danger: s, style: a, label: d }) => /* @__PURE__ */ r.jsx(
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
), ps = ({ p: e, fonts: t, onPress: n, accent: i, size: o = 200 }) => {
  const l = o * 0.18, s = /* @__PURE__ */ r.jsx("div", { style: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    background: `radial-gradient(circle at 50% 50%, ${e.surface} 38%, ${e.surface2} 39%, ${e.surface2} 100%)`,
    border: `.5px solid ${e.border2}`,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.4), 0 1px 2px rgba(0,0,0,.08)"
  } }), a = ({ dir: d, top: c, left: f, right: u, bottom: h, char: v }) => /* @__PURE__ */ r.jsx("button", { onClick: () => n(d), style: {
    position: "absolute",
    top: c,
    left: f,
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
}, Sn = ({ children: e, gap: t = 10, justify: n = "space-between" }) => /* @__PURE__ */ r.jsx("div", { style: { display: "flex", justifyContent: n, alignItems: "center", gap: t, marginTop: 14 }, children: e }), Sg = ({ p: e, fonts: t, press: n, update: i, tv: o }) => /* @__PURE__ */ r.jsxs("div", { children: [
  /* @__PURE__ */ r.jsxs(Sn, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n("back"), size: 40, label: "Back", children: "↶" }),
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n("home"), size: 40, label: "TV", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "tv", size: 16 }) }),
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n("power"), size: 40, danger: (o.on, !1), label: "Power", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "bolt", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ r.jsx(ps, { p: e, fonts: t, accent: "#a78bfa", onPress: (l) => n(l) }) }),
  /* @__PURE__ */ r.jsxs(Sn, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n("siri"), size: 40, label: "Siri", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "mic", size: 14 }) }),
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n(o.playing ? "pause" : "play"), size: 40, label: "Play/Pause", primary: !0, children: /* @__PURE__ */ r.jsx(window.Icon, { name: o.playing ? "pause" : "play", size: 14 }) }),
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n("mute"), size: 40, label: "Mute", children: /* @__PURE__ */ r.jsx(window.Icon, { name: o.mute ? "bellOff" : "speaker", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx(hs, { p: e, fonts: t, tv: o, press: n }),
  /* @__PURE__ */ r.jsx(Zc, { p: e, fonts: t, tv: o, press: n }),
  /* @__PURE__ */ r.jsx(gs, { p: e, fonts: t, apps: ["Apple TV+", "Netflix", "HBO Max", "Hulu", "Disney+", "YouTube"], update: i })
] }), Cg = ({ p: e, fonts: t, press: n, update: i, tv: o }) => /* @__PURE__ */ r.jsxs("div", { children: [
  /* @__PURE__ */ r.jsxs(Sn, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n("power"), size: 40, label: "Power", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "bolt", size: 14 }) }),
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n("mute"), size: 40, label: "Mute", children: /* @__PURE__ */ r.jsx(window.Icon, { name: o.mute ? "bellOff" : "speaker", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ r.jsx(ps, { p: e, fonts: t, accent: "#5b8cff", onPress: (l) => n(l) }) }),
  /* @__PURE__ */ r.jsxs(Sn, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n("back"), size: 40, label: "Back", children: "←" }),
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n("home"), size: 40, label: "Home", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "home", size: 14 }) }),
    /* @__PURE__ */ r.jsx(
      te,
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
  /* @__PURE__ */ r.jsx(hs, { p: e, fonts: t, tv: o, press: n }),
  /* @__PURE__ */ r.jsx(Zc, { p: e, fonts: t, tv: o, press: n }),
  /* @__PURE__ */ r.jsx(gs, { p: e, fonts: t, apps: ["YouTube", "Netflix", "Prime Video", "Disney+", "HBO Max", "Spotify"], update: i })
] }), zg = ({ p: e, fonts: t, press: n, update: i, tv: o }) => /* @__PURE__ */ r.jsxs("div", { children: [
  /* @__PURE__ */ r.jsxs(Sn, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n("power"), size: 40, danger: !0, label: "Power", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "bolt", size: 14 }) }),
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n("input"), size: 40, label: "Input", children: "▣" }),
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n("settings"), size: 40, label: "Settings", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "settings", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ r.jsx(ps, { p: e, fonts: t, accent: "#a8174e", onPress: (l) => n(l) }) }),
  /* @__PURE__ */ r.jsxs(Sn, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n("back"), size: 40, label: "Back", children: "↩" }),
    /* @__PURE__ */ r.jsx(
      te,
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
    /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => n("mute"), size: 40, label: "Mute", children: /* @__PURE__ */ r.jsx(window.Icon, { name: o.mute ? "bellOff" : "speaker", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx(hs, { p: e, fonts: t, tv: o, press: n }),
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
  /* @__PURE__ */ r.jsx(gs, { p: e, fonts: t, apps: ["LG Channels", "Netflix", "Disney+", "YouTube", "Prime Video", "Apple TV"], update: i })
] }), hs = ({ p: e, fonts: t, tv: n, press: i }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }, children: [
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
] }), Zc = ({ p: e, fonts: t, tv: n, press: i }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "center", gap: 14, marginTop: 14 }, children: [
  /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => i("prev"), size: 38, label: "−30s", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "prev", size: 13 }) }),
  /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => i(n.playing ? "pause" : "play"), size: 50, primary: !0, label: "Play/Pause", children: /* @__PURE__ */ r.jsx(window.Icon, { name: n.playing ? "pause" : "play", size: 16 }) }),
  /* @__PURE__ */ r.jsx(te, { p: e, fonts: t, onClick: () => i("next"), size: 38, label: "+30s", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "next", size: 13 }) })
] }), gs = ({ p: e, fonts: t, apps: n, update: i }) => /* @__PURE__ */ r.jsxs("div", { style: { marginTop: 18, paddingTop: 14, borderTop: `.5px solid ${e.border}` }, children: [
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
window.TvsSection = wg;
const Tg = ({ ctx: e }) => {
  const { p: t, fonts: n, state: i, setState: o, narrow: l } = e, [s, a] = React.useState(!1), [d, c] = React.useState(null), f = i.speakers.filter((y) => y.playing), u = d ? i.speakers.find((y) => y.id === d) || f[0] : f.find((y) => y.room === "living") || f[0];
  if (!u) return null;
  const h = window.trackById(u.trackId), v = window.ROOMS.find((y) => y.id === u.room)?.name || u.name, w = (y) => o((x) => ({ ...x, speakers: x.speakers.map((k) => k.id === y ? { ...k, playing: !k.playing } : k) })), p = (y) => o((x) => ({ ...x, speakers: x.speakers.map((k) => {
    if (k.id !== y) return k;
    const j = k.queue || [], S = j[0] || window.TRACKS[(window.TRACKS.findIndex((C) => C.id === k.trackId) + 1) % window.TRACKS.length].id;
    return { ...k, trackId: S, queue: j.slice(1).concat(k.trackId), progress: 0 };
  }) })), b = (y) => o((x) => ({ ...x, speakers: x.speakers.map((k) => {
    if (k.id !== y) return k;
    const j = window.TRACKS.findIndex((S) => S.id === k.trackId);
    return { ...k, trackId: window.TRACKS[(j - 1 + window.TRACKS.length) % window.TRACKS.length].id, progress: 0 };
  }) })), m = (y, x) => o((k) => ({ ...k, speakers: k.speakers.map((j) => {
    if (j.id !== y) return j;
    const S = (j.queue || []).filter((C) => C !== x);
    return { ...j, trackId: x, progress: 0, playing: !0, queue: S };
  }) })), g = (y, x) => o((k) => ({ ...k, speakers: k.speakers.map(
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
              f.length > 1 && /* @__PURE__ */ r.jsxs("span", { style: { opacity: 0.7 }, children: [
                "· +",
                f.length - 1,
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
            /* @__PURE__ */ r.jsx("button", { onClick: () => b(u.id), style: $t(t, 36), children: /* @__PURE__ */ r.jsx(window.Icon, { name: "prev", size: 15 }) }),
            /* @__PURE__ */ r.jsx("button", { onClick: () => w(u.id), style: { ...$t(t, 46), background: t.accent, color: "#fff", border: 0 }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: u.playing ? "pause" : "play", size: 18 }) }),
            /* @__PURE__ */ r.jsx("button", { onClick: () => p(u.id), style: $t(t, 36), children: /* @__PURE__ */ r.jsx(window.Icon, { name: "next", size: 15 }) }),
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
                  onChange: (x) => o((k) => ({ ...k, speakers: k.speakers.map((j) => j.id === u.id ? { ...j, vol: +x.target.value } : j) })),
                  style: { width: 88, accentColor: t.accent, height: 3 }
                }
              )
            ] })
          ] })
        ] }),
        f.length > 1 && /* @__PURE__ */ r.jsx("div", { style: { padding: "10px 14px", borderBottom: `.5px solid ${t.border}`, display: "flex", gap: 6, overflowX: "auto" }, children: f.map((x) => {
          const k = window.trackById(x.trackId), j = window.ROOMS.find((C) => C.id === x.room)?.name || x.name, S = x.id === u.id;
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
              k.title
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
          y.length === 0 ? /* @__PURE__ */ r.jsx("div", { style: { padding: "18px 18px 22px", fontSize: 12, color: t.fg3, fontStyle: "italic", fontFamily: n.display }, children: "Queue is empty. The next track in your library will play after this one." }) : y.map((x, k) => /* @__PURE__ */ r.jsxs(
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
                /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, width: 14, textAlign: "right", fontVariantNumeric: "tabular-nums" }, children: k + 1 }),
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
            x.id + "-" + k
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
            u.playing && /* @__PURE__ */ r.jsx(Rg, { p: t })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 1 }, children: [
            /* @__PURE__ */ r.jsx("span", { style: { color: t.fg2 }, children: h.artist }),
            /* @__PURE__ */ r.jsxs("span", { children: [
              " · ",
              v
            ] }),
            f.length > 1 && /* @__PURE__ */ r.jsxs("span", { children: [
              " +",
              f.length - 1
            ] })
          ] }),
          /* @__PURE__ */ r.jsx("div", { style: { height: 2, background: t.border, borderRadius: 1, marginTop: 3, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${u.progress / h.dur * 100}%`, height: "100%", background: t.accent, transition: "width .8s linear" } }) })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 2, flex: "none" }, onClick: (y) => y.stopPropagation(), children: [
          /* @__PURE__ */ r.jsx("button", { onClick: () => b(u.id), style: $t(t, 28), title: "Previous", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "prev", size: 12 }) }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => w(u.id), style: { ...$t(t, 32), background: t.accent, color: "#fff", border: 0 }, title: u.playing ? "Pause" : "Play", children: /* @__PURE__ */ r.jsx(window.Icon, { name: u.playing ? "pause" : "play", size: 13 }) }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => p(u.id), style: $t(t, 28), title: "Next", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "next", size: 12 }) }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => a(!0), style: $t(t, 28), title: "Show queue", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "queue", size: 12 }) })
        ] })
      ]
    }
  );
}, $t = (e, t) => ({
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
}), Rg = ({ p: e }) => /* @__PURE__ */ r.jsxs("span", { style: { display: "inline-flex", gap: 1.5, alignItems: "flex-end", height: 9, marginLeft: 4 }, children: [
  [0, 1, 2].map((t) => /* @__PURE__ */ r.jsx("span", { style: { width: 2, background: e.accent, animation: `npbBar 0.9s ${t * 0.13}s infinite ease-in-out`, height: "100%", borderRadius: 1 } }, t)),
  /* @__PURE__ */ r.jsx("style", { children: "@keyframes npbBar{0%,100%{height:25%}50%{height:100%}}" })
] });
window.NowPlayingBar = Tg;
function Ig({ url: e, label: t, onClose: n }) {
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
const Mg = (
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
class _g extends ie.Component {
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
function Pg({ hass: e, narrow: t, panel: n }) {
  const [i, o] = window.useTweaks(Mg), [l, s] = ie.useState(null), a = ie.useMemo(() => {
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
  }, [e?.user, e?.config?.location_name]), [d, c] = ie.useState({}), f = ie.useCallback((w) => {
    c((p) => typeof w == "function" ? w({ ...a, ...p }) : { ...p, ...w });
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
  return /* @__PURE__ */ r.jsxs(_g, { children: [
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
        patchUser: f,
        doLogout: v,
        narrow: !!t,
        openBrowser: (w, p) => s({ url: w, label: p })
      }
    ) }),
    /* @__PURE__ */ r.jsx(
      Ig,
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
          value: Eg(i.hearthAccent),
          options: ["#e87f4a", "#c96442", "#b8843e", "#7a8c6c", "#7d4f6b", "#5b7390"],
          onChange: (w) => o("hearthAccent", $g(w))
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
const yl = { tangerine: "#e87f4a", terracotta: "#c96442", ochre: "#b8843e", sage: "#7a8c6c", plum: "#7d4f6b", slate: "#5b7390" };
function Eg(e) {
  return yl[e] || yl.tangerine;
}
function $g(e) {
  return Object.entries(yl).find(([, t]) => t === e)?.[0] || "tangerine";
}
window.App = Pg;
typeof globalThis < "u" && typeof globalThis.process > "u" && (globalThis.process = { env: { NODE_ENV: "production" } });
window.React = ie;
window.HassContext = br;
class Fg extends HTMLElement {
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
      this._mount = document.createElement("div"), this._mount.style.cssText = "width:100%;height:100%;display:block;background:#161310", this.appendChild(this._mount), this._mount.innerHTML = '<div style="width:100%;height:100%;display:grid;place-items:center;color:#e87f4a;font-family:Newsreader,Georgia,serif;font-style:italic;font-size:28px;letter-spacing:.01em;">HomeCNTRD</div>', this._root = Ac(this._mount), this._render();
    }
  }
  disconnectedCallback() {
    this._root && (this._root.unmount(), this._root = null), this._mount && this._mount.parentNode && this._mount.parentNode.removeChild(this._mount), this._mount = null;
  }
  _render() {
    if (!this._root) return;
    const t = window.App;
    t && this._root.render(
      ie.createElement(
        br.Provider,
        { value: this._hass },
        ie.createElement(t, {
          hass: this._hass,
          narrow: this._narrow,
          panel: this._panel
        })
      )
    );
  }
}
customElements.get("homecntrd-panel") || customElements.define("homecntrd-panel", Fg);
//# sourceMappingURL=homecntrd.js.map
