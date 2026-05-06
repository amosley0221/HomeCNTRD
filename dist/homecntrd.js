typeof globalThis < "u" && typeof globalThis.process > "u" && (globalThis.process = { env: { NODE_ENV: "production" } });
function Gc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ba = { exports: {} }, F = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ar = Symbol.for("react.element"), Qc = Symbol.for("react.portal"), Yc = Symbol.for("react.fragment"), Kc = Symbol.for("react.strict_mode"), Xc = Symbol.for("react.profiler"), qc = Symbol.for("react.provider"), Zc = Symbol.for("react.context"), Jc = Symbol.for("react.forward_ref"), eu = Symbol.for("react.suspense"), tu = Symbol.for("react.memo"), nu = Symbol.for("react.lazy"), ss = Symbol.iterator;
function ru(e) {
  return e === null || typeof e != "object" ? null : (e = ss && e[ss] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ja = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Sa = Object.assign, Ca = {};
function yn(e, t, n) {
  this.props = e, this.context = t, this.refs = Ca, this.updater = n || ja;
}
yn.prototype.isReactComponent = {};
yn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
yn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function za() {
}
za.prototype = yn.prototype;
function al(e, t, n) {
  this.props = e, this.context = t, this.refs = Ca, this.updater = n || ja;
}
var dl = al.prototype = new za();
dl.constructor = al;
Sa(dl, yn.prototype);
dl.isPureReactComponent = !0;
var as = Array.isArray, Ta = Object.prototype.hasOwnProperty, cl = { current: null }, Ra = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ma(e, t, n) {
  var i, o = {}, l = null, s = null;
  if (t != null) for (i in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (l = "" + t.key), t) Ta.call(t, i) && !Ra.hasOwnProperty(i) && (o[i] = t[i]);
  var a = arguments.length - 2;
  if (a === 1) o.children = n;
  else if (1 < a) {
    for (var c = Array(a), d = 0; d < a; d++) c[d] = arguments[d + 2];
    o.children = c;
  }
  if (e && e.defaultProps) for (i in a = e.defaultProps, a) o[i] === void 0 && (o[i] = a[i]);
  return { $$typeof: ar, type: e, key: l, ref: s, props: o, _owner: cl.current };
}
function iu(e, t) {
  return { $$typeof: ar, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ul(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ar;
}
function ou(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var ds = /\/+/g;
function Fi(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? ou("" + e.key) : t.toString(36);
}
function Er(e, t, n, i, o) {
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
        case ar:
        case Qc:
          s = !0;
      }
  }
  if (s) return s = e, o = o(s), e = i === "" ? "." + Fi(s, 0) : i, as(o) ? (n = "", e != null && (n = e.replace(ds, "$&/") + "/"), Er(o, t, n, "", function(d) {
    return d;
  })) : o != null && (ul(o) && (o = iu(o, n + (!o.key || s && s.key === o.key ? "" : ("" + o.key).replace(ds, "$&/") + "/") + e)), t.push(o)), 1;
  if (s = 0, i = i === "" ? "." : i + ":", as(e)) for (var a = 0; a < e.length; a++) {
    l = e[a];
    var c = i + Fi(l, a);
    s += Er(l, t, n, c, o);
  }
  else if (c = ru(e), typeof c == "function") for (e = c.call(e), a = 0; !(l = e.next()).done; ) l = l.value, c = i + Fi(l, a++), s += Er(l, t, n, c, o);
  else if (l === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return s;
}
function gr(e, t, n) {
  if (e == null) return e;
  var i = [], o = 0;
  return Er(e, i, "", "", function(l) {
    return t.call(n, l, o++);
  }), i;
}
function lu(e) {
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
var he = { current: null }, Fr = { transition: null }, su = { ReactCurrentDispatcher: he, ReactCurrentBatchConfig: Fr, ReactCurrentOwner: cl };
function Ia() {
  throw Error("act(...) is not supported in production builds of React.");
}
F.Children = { map: gr, forEach: function(e, t, n) {
  gr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return gr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return gr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!ul(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
F.Component = yn;
F.Fragment = Yc;
F.Profiler = Xc;
F.PureComponent = al;
F.StrictMode = Kc;
F.Suspense = eu;
F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = su;
F.act = Ia;
F.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var i = Sa({}, e.props), o = e.key, l = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (l = t.ref, s = cl.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (c in t) Ta.call(t, c) && !Ra.hasOwnProperty(c) && (i[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) i.children = n;
  else if (1 < c) {
    a = Array(c);
    for (var d = 0; d < c; d++) a[d] = arguments[d + 2];
    i.children = a;
  }
  return { $$typeof: ar, type: e.type, key: o, ref: l, props: i, _owner: s };
};
F.createContext = function(e) {
  return e = { $$typeof: Zc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: qc, _context: e }, e.Consumer = e;
};
F.createElement = Ma;
F.createFactory = function(e) {
  var t = Ma.bind(null, e);
  return t.type = e, t;
};
F.createRef = function() {
  return { current: null };
};
F.forwardRef = function(e) {
  return { $$typeof: Jc, render: e };
};
F.isValidElement = ul;
F.lazy = function(e) {
  return { $$typeof: nu, _payload: { _status: -1, _result: e }, _init: lu };
};
F.memo = function(e, t) {
  return { $$typeof: tu, type: e, compare: t === void 0 ? null : t };
};
F.startTransition = function(e) {
  var t = Fr.transition;
  Fr.transition = {};
  try {
    e();
  } finally {
    Fr.transition = t;
  }
};
F.unstable_act = Ia;
F.useCallback = function(e, t) {
  return he.current.useCallback(e, t);
};
F.useContext = function(e) {
  return he.current.useContext(e);
};
F.useDebugValue = function() {
};
F.useDeferredValue = function(e) {
  return he.current.useDeferredValue(e);
};
F.useEffect = function(e, t) {
  return he.current.useEffect(e, t);
};
F.useId = function() {
  return he.current.useId();
};
F.useImperativeHandle = function(e, t, n) {
  return he.current.useImperativeHandle(e, t, n);
};
F.useInsertionEffect = function(e, t) {
  return he.current.useInsertionEffect(e, t);
};
F.useLayoutEffect = function(e, t) {
  return he.current.useLayoutEffect(e, t);
};
F.useMemo = function(e, t) {
  return he.current.useMemo(e, t);
};
F.useReducer = function(e, t, n) {
  return he.current.useReducer(e, t, n);
};
F.useRef = function(e) {
  return he.current.useRef(e);
};
F.useState = function(e) {
  return he.current.useState(e);
};
F.useSyncExternalStore = function(e, t, n) {
  return he.current.useSyncExternalStore(e, t, n);
};
F.useTransition = function() {
  return he.current.useTransition();
};
F.version = "18.3.1";
ba.exports = F;
var fl = ba.exports;
const K = /* @__PURE__ */ Gc(fl);
var _a = { exports: {} }, Re = {}, Pa = { exports: {} }, Ea = {};
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
  function t(R, _) {
    var P = R.length;
    R.push(_);
    e: for (; 0 < P; ) {
      var A = P - 1 >>> 1, q = R[A];
      if (0 < o(q, _)) R[A] = _, R[P] = q, P = A;
      else break e;
    }
  }
  function n(R) {
    return R.length === 0 ? null : R[0];
  }
  function i(R) {
    if (R.length === 0) return null;
    var _ = R[0], P = R.pop();
    if (P !== _) {
      R[0] = P;
      e: for (var A = 0, q = R.length, pr = q >>> 1; A < pr; ) {
        var Ct = 2 * (A + 1) - 1, Ei = R[Ct], zt = Ct + 1, hr = R[zt];
        if (0 > o(Ei, P)) zt < q && 0 > o(hr, Ei) ? (R[A] = hr, R[zt] = P, A = zt) : (R[A] = Ei, R[Ct] = P, A = Ct);
        else if (zt < q && 0 > o(hr, P)) R[A] = hr, R[zt] = P, A = zt;
        else break e;
      }
    }
    return _;
  }
  function o(R, _) {
    var P = R.sortIndex - _.sortIndex;
    return P !== 0 ? P : R.id - _.id;
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
  var c = [], d = [], u = 1, p = null, g = 3, v = !1, w = !1, f = !1, b = typeof setTimeout == "function" ? setTimeout : null, y = typeof clearTimeout == "function" ? clearTimeout : null, h = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(R) {
    for (var _ = n(d); _ !== null; ) {
      if (_.callback === null) i(d);
      else if (_.startTime <= R) i(d), _.sortIndex = _.expirationTime, t(c, _);
      else break;
      _ = n(d);
    }
  }
  function x(R) {
    if (f = !1, m(R), !w) if (n(c) !== null) w = !0, Be(k);
    else {
      var _ = n(d);
      _ !== null && B(x, _.startTime - R);
    }
  }
  function k(R, _) {
    w = !1, f && (f = !1, y(C), C = -1), v = !0;
    var P = g;
    try {
      for (m(_), p = n(c); p !== null && (!(p.expirationTime > _) || R && !$()); ) {
        var A = p.callback;
        if (typeof A == "function") {
          p.callback = null, g = p.priorityLevel;
          var q = A(p.expirationTime <= _);
          _ = e.unstable_now(), typeof q == "function" ? p.callback = q : p === n(c) && i(c), m(_);
        } else i(c);
        p = n(c);
      }
      if (p !== null) var pr = !0;
      else {
        var Ct = n(d);
        Ct !== null && B(x, Ct.startTime - _), pr = !1;
      }
      return pr;
    } finally {
      p = null, g = P, v = !1;
    }
  }
  var j = !1, S = null, C = -1, I = 5, T = -1;
  function $() {
    return !(e.unstable_now() - T < I);
  }
  function be() {
    if (S !== null) {
      var R = e.unstable_now();
      T = R;
      var _ = !0;
      try {
        _ = S(!0, R);
      } finally {
        _ ? E() : (j = !1, S = null);
      }
    } else j = !1;
  }
  var E;
  if (typeof h == "function") E = function() {
    h(be);
  };
  else if (typeof MessageChannel < "u") {
    var D = new MessageChannel(), ue = D.port2;
    D.port1.onmessage = be, E = function() {
      ue.postMessage(null);
    };
  } else E = function() {
    b(be, 0);
  };
  function Be(R) {
    S = R, j || (j = !0, E());
  }
  function B(R, _) {
    C = b(function() {
      R(e.unstable_now());
    }, _);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(R) {
    R.callback = null;
  }, e.unstable_continueExecution = function() {
    w || v || (w = !0, Be(k));
  }, e.unstable_forceFrameRate = function(R) {
    0 > R || 125 < R ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : I = 0 < R ? Math.floor(1e3 / R) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return g;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(R) {
    switch (g) {
      case 1:
      case 2:
      case 3:
        var _ = 3;
        break;
      default:
        _ = g;
    }
    var P = g;
    g = _;
    try {
      return R();
    } finally {
      g = P;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(R, _) {
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
    var P = g;
    g = R;
    try {
      return _();
    } finally {
      g = P;
    }
  }, e.unstable_scheduleCallback = function(R, _, P) {
    var A = e.unstable_now();
    switch (typeof P == "object" && P !== null ? (P = P.delay, P = typeof P == "number" && 0 < P ? A + P : A) : P = A, R) {
      case 1:
        var q = -1;
        break;
      case 2:
        q = 250;
        break;
      case 5:
        q = 1073741823;
        break;
      case 4:
        q = 1e4;
        break;
      default:
        q = 5e3;
    }
    return q = P + q, R = { id: u++, callback: _, priorityLevel: R, startTime: P, expirationTime: q, sortIndex: -1 }, P > A ? (R.sortIndex = P, t(d, R), n(c) === null && R === n(d) && (f ? (y(C), C = -1) : f = !0, B(x, P - A))) : (R.sortIndex = q, t(c, R), w || v || (w = !0, Be(k))), R;
  }, e.unstable_shouldYield = $, e.unstable_wrapCallback = function(R) {
    var _ = g;
    return function() {
      var P = g;
      g = _;
      try {
        return R.apply(this, arguments);
      } finally {
        g = P;
      }
    };
  };
})(Ea);
Pa.exports = Ea;
var au = Pa.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var du = fl, Te = au;
function z(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Fa = /* @__PURE__ */ new Set(), Un = {};
function Ot(e, t) {
  dn(e, t), dn(e + "Capture", t);
}
function dn(e, t) {
  for (Un[e] = t, e = 0; e < t.length; e++) Fa.add(t[e]);
}
var et = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), uo = Object.prototype.hasOwnProperty, cu = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, cs = {}, us = {};
function uu(e) {
  return uo.call(us, e) ? !0 : uo.call(cs, e) ? !1 : cu.test(e) ? us[e] = !0 : (cs[e] = !0, !1);
}
function fu(e, t, n, i) {
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
function pu(e, t, n, i) {
  if (t === null || typeof t > "u" || fu(e, t, n, i)) return !0;
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
function ge(e, t, n, i, o, l, s) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = i, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = l, this.removeEmptyString = s;
}
var le = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  le[e] = new ge(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  le[t] = new ge(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  le[e] = new ge(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  le[e] = new ge(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  le[e] = new ge(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  le[e] = new ge(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  le[e] = new ge(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  le[e] = new ge(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  le[e] = new ge(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var pl = /[\-:]([a-z])/g;
function hl(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    pl,
    hl
  );
  le[t] = new ge(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(pl, hl);
  le[t] = new ge(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(pl, hl);
  le[t] = new ge(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  le[e] = new ge(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
le.xlinkHref = new ge("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  le[e] = new ge(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function gl(e, t, n, i) {
  var o = le.hasOwnProperty(t) ? le[t] : null;
  (o !== null ? o.type !== 0 : i || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (pu(t, n, o, i) && (n = null), i || o === null ? uu(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : o.mustUseProperty ? e[o.propertyName] = n === null ? o.type === 3 ? !1 : "" : n : (t = o.attributeName, i = o.attributeNamespace, n === null ? e.removeAttribute(t) : (o = o.type, n = o === 3 || o === 4 && n === !0 ? "" : "" + n, i ? e.setAttributeNS(i, t, n) : e.setAttribute(t, n))));
}
var it = du.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, mr = Symbol.for("react.element"), Vt = Symbol.for("react.portal"), Ut = Symbol.for("react.fragment"), ml = Symbol.for("react.strict_mode"), fo = Symbol.for("react.profiler"), $a = Symbol.for("react.provider"), Na = Symbol.for("react.context"), yl = Symbol.for("react.forward_ref"), po = Symbol.for("react.suspense"), ho = Symbol.for("react.suspense_list"), xl = Symbol.for("react.memo"), lt = Symbol.for("react.lazy"), La = Symbol.for("react.offscreen"), fs = Symbol.iterator;
function kn(e) {
  return e === null || typeof e != "object" ? null : (e = fs && e[fs] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Q = Object.assign, $i;
function Pn(e) {
  if ($i === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    $i = t && t[1] || "";
  }
  return `
` + $i + e;
}
var Ni = !1;
function Li(e, t) {
  if (!e || Ni) return "";
  Ni = !0;
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
      } catch (d) {
        var i = d;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (d) {
        i = d;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (d) {
        i = d;
      }
      e();
    }
  } catch (d) {
    if (d && i && typeof d.stack == "string") {
      for (var o = d.stack.split(`
`), l = i.stack.split(`
`), s = o.length - 1, a = l.length - 1; 1 <= s && 0 <= a && o[s] !== l[a]; ) a--;
      for (; 1 <= s && 0 <= a; s--, a--) if (o[s] !== l[a]) {
        if (s !== 1 || a !== 1)
          do
            if (s--, a--, 0 > a || o[s] !== l[a]) {
              var c = `
` + o[s].replace(" at new ", " at ");
              return e.displayName && c.includes("<anonymous>") && (c = c.replace("<anonymous>", e.displayName)), c;
            }
          while (1 <= s && 0 <= a);
        break;
      }
    }
  } finally {
    Ni = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Pn(e) : "";
}
function hu(e) {
  switch (e.tag) {
    case 5:
      return Pn(e.type);
    case 16:
      return Pn("Lazy");
    case 13:
      return Pn("Suspense");
    case 19:
      return Pn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Li(e.type, !1), e;
    case 11:
      return e = Li(e.type.render, !1), e;
    case 1:
      return e = Li(e.type, !0), e;
    default:
      return "";
  }
}
function go(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Ut:
      return "Fragment";
    case Vt:
      return "Portal";
    case fo:
      return "Profiler";
    case ml:
      return "StrictMode";
    case po:
      return "Suspense";
    case ho:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Na:
      return (e.displayName || "Context") + ".Consumer";
    case $a:
      return (e._context.displayName || "Context") + ".Provider";
    case yl:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case xl:
      return t = e.displayName || null, t !== null ? t : go(e.type) || "Memo";
    case lt:
      t = e._payload, e = e._init;
      try {
        return go(e(t));
      } catch {
      }
  }
  return null;
}
function gu(e) {
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
      return go(t);
    case 8:
      return t === ml ? "StrictMode" : "Mode";
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
function wt(e) {
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
function Da(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function mu(e) {
  var t = Da(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), i = "" + e[t];
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
function yr(e) {
  e._valueTracker || (e._valueTracker = mu(e));
}
function Aa(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), i = "";
  return e && (i = Da(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), !0) : !1;
}
function Gr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function mo(e, t) {
  var n = t.checked;
  return Q({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function ps(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, i = t.checked != null ? t.checked : t.defaultChecked;
  n = wt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: i, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Oa(e, t) {
  t = t.checked, t != null && gl(e, "checked", t, !1);
}
function yo(e, t) {
  Oa(e, t);
  var n = wt(t.value), i = t.type;
  if (n != null) i === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (i === "submit" || i === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? xo(e, t.type, n) : t.hasOwnProperty("defaultValue") && xo(e, t.type, wt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function hs(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var i = t.type;
    if (!(i !== "submit" && i !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function xo(e, t, n) {
  (t !== "number" || Gr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var En = Array.isArray;
function nn(e, t, n, i) {
  if (e = e.options, t) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++) o = t.hasOwnProperty("$" + e[n].value), e[n].selected !== o && (e[n].selected = o), o && i && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + wt(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        e[o].selected = !0, i && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function vo(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(z(91));
  return Q({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function gs(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(z(92));
      if (En(n)) {
        if (1 < n.length) throw Error(z(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: wt(n) };
}
function Wa(e, t) {
  var n = wt(t.value), i = wt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), i != null && (e.defaultValue = "" + i);
}
function ms(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ha(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function wo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ha(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var xr, Ba = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, i, o) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, i, o);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (xr = xr || document.createElement("div"), xr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = xr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Gn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Nn = {
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
}, yu = ["Webkit", "ms", "Moz", "O"];
Object.keys(Nn).forEach(function(e) {
  yu.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Nn[t] = Nn[e];
  });
});
function Va(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Nn.hasOwnProperty(e) && Nn[e] ? ("" + t).trim() : t + "px";
}
function Ua(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var i = n.indexOf("--") === 0, o = Va(n, t[n], i);
    n === "float" && (n = "cssFloat"), i ? e.setProperty(n, o) : e[n] = o;
  }
}
var xu = Q({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function ko(e, t) {
  if (t) {
    if (xu[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(z(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(z(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(z(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(z(62));
  }
}
function bo(e, t) {
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
var jo = null;
function vl(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var So = null, rn = null, on = null;
function ys(e) {
  if (e = ur(e)) {
    if (typeof So != "function") throw Error(z(280));
    var t = e.stateNode;
    t && (t = ki(t), So(e.stateNode, e.type, t));
  }
}
function Ga(e) {
  rn ? on ? on.push(e) : on = [e] : rn = e;
}
function Qa() {
  if (rn) {
    var e = rn, t = on;
    if (on = rn = null, ys(e), t) for (e = 0; e < t.length; e++) ys(t[e]);
  }
}
function Ya(e, t) {
  return e(t);
}
function Ka() {
}
var Di = !1;
function Xa(e, t, n) {
  if (Di) return e(t, n);
  Di = !0;
  try {
    return Ya(e, t, n);
  } finally {
    Di = !1, (rn !== null || on !== null) && (Ka(), Qa());
  }
}
function Qn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var i = ki(n);
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
var Co = !1;
if (et) try {
  var bn = {};
  Object.defineProperty(bn, "passive", { get: function() {
    Co = !0;
  } }), window.addEventListener("test", bn, bn), window.removeEventListener("test", bn, bn);
} catch {
  Co = !1;
}
function vu(e, t, n, i, o, l, s, a, c) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (u) {
    this.onError(u);
  }
}
var Ln = !1, Qr = null, Yr = !1, zo = null, wu = { onError: function(e) {
  Ln = !0, Qr = e;
} };
function ku(e, t, n, i, o, l, s, a, c) {
  Ln = !1, Qr = null, vu.apply(wu, arguments);
}
function bu(e, t, n, i, o, l, s, a, c) {
  if (ku.apply(this, arguments), Ln) {
    if (Ln) {
      var d = Qr;
      Ln = !1, Qr = null;
    } else throw Error(z(198));
    Yr || (Yr = !0, zo = d);
  }
}
function Wt(e) {
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
function qa(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function xs(e) {
  if (Wt(e) !== e) throw Error(z(188));
}
function ju(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Wt(e), t === null) throw Error(z(188));
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
        if (l === n) return xs(o), e;
        if (l === i) return xs(o), t;
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
function Za(e) {
  return e = ju(e), e !== null ? Ja(e) : null;
}
function Ja(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ja(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var ed = Te.unstable_scheduleCallback, vs = Te.unstable_cancelCallback, Su = Te.unstable_shouldYield, Cu = Te.unstable_requestPaint, X = Te.unstable_now, zu = Te.unstable_getCurrentPriorityLevel, wl = Te.unstable_ImmediatePriority, td = Te.unstable_UserBlockingPriority, Kr = Te.unstable_NormalPriority, Tu = Te.unstable_LowPriority, nd = Te.unstable_IdlePriority, yi = null, Qe = null;
function Ru(e) {
  if (Qe && typeof Qe.onCommitFiberRoot == "function") try {
    Qe.onCommitFiberRoot(yi, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Oe = Math.clz32 ? Math.clz32 : _u, Mu = Math.log, Iu = Math.LN2;
function _u(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Mu(e) / Iu | 0) | 0;
}
var vr = 64, wr = 4194304;
function Fn(e) {
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
function Xr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var i = 0, o = e.suspendedLanes, l = e.pingedLanes, s = n & 268435455;
  if (s !== 0) {
    var a = s & ~o;
    a !== 0 ? i = Fn(a) : (l &= s, l !== 0 && (i = Fn(l)));
  } else s = n & ~o, s !== 0 ? i = Fn(s) : l !== 0 && (i = Fn(l));
  if (i === 0) return 0;
  if (t !== 0 && t !== i && !(t & o) && (o = i & -i, l = t & -t, o >= l || o === 16 && (l & 4194240) !== 0)) return t;
  if (i & 4 && (i |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= i; 0 < t; ) n = 31 - Oe(t), o = 1 << n, i |= e[n], t &= ~o;
  return i;
}
function Pu(e, t) {
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
function Eu(e, t) {
  for (var n = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, l = e.pendingLanes; 0 < l; ) {
    var s = 31 - Oe(l), a = 1 << s, c = o[s];
    c === -1 ? (!(a & n) || a & i) && (o[s] = Pu(a, t)) : c <= t && (e.expiredLanes |= a), l &= ~a;
  }
}
function To(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function rd() {
  var e = vr;
  return vr <<= 1, !(vr & 4194240) && (vr = 64), e;
}
function Ai(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function dr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Oe(t), e[t] = n;
}
function Fu(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var i = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - Oe(n), l = 1 << o;
    t[o] = 0, i[o] = -1, e[o] = -1, n &= ~l;
  }
}
function kl(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var i = 31 - Oe(n), o = 1 << i;
    o & t | e[i] & t && (e[i] |= t), n &= ~o;
  }
}
var L = 0;
function id(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var od, bl, ld, sd, ad, Ro = !1, kr = [], ft = null, pt = null, ht = null, Yn = /* @__PURE__ */ new Map(), Kn = /* @__PURE__ */ new Map(), at = [], $u = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function ws(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ft = null;
      break;
    case "dragenter":
    case "dragleave":
      pt = null;
      break;
    case "mouseover":
    case "mouseout":
      ht = null;
      break;
    case "pointerover":
    case "pointerout":
      Yn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Kn.delete(t.pointerId);
  }
}
function jn(e, t, n, i, o, l) {
  return e === null || e.nativeEvent !== l ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: i, nativeEvent: l, targetContainers: [o] }, t !== null && (t = ur(t), t !== null && bl(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
}
function Nu(e, t, n, i, o) {
  switch (t) {
    case "focusin":
      return ft = jn(ft, e, t, n, i, o), !0;
    case "dragenter":
      return pt = jn(pt, e, t, n, i, o), !0;
    case "mouseover":
      return ht = jn(ht, e, t, n, i, o), !0;
    case "pointerover":
      var l = o.pointerId;
      return Yn.set(l, jn(Yn.get(l) || null, e, t, n, i, o)), !0;
    case "gotpointercapture":
      return l = o.pointerId, Kn.set(l, jn(Kn.get(l) || null, e, t, n, i, o)), !0;
  }
  return !1;
}
function dd(e) {
  var t = It(e.target);
  if (t !== null) {
    var n = Wt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = qa(n), t !== null) {
          e.blockedOn = t, ad(e.priority, function() {
            ld(n);
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
function $r(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Mo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var i = new n.constructor(n.type, n);
      jo = i, n.target.dispatchEvent(i), jo = null;
    } else return t = ur(n), t !== null && bl(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function ks(e, t, n) {
  $r(e) && n.delete(t);
}
function Lu() {
  Ro = !1, ft !== null && $r(ft) && (ft = null), pt !== null && $r(pt) && (pt = null), ht !== null && $r(ht) && (ht = null), Yn.forEach(ks), Kn.forEach(ks);
}
function Sn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Ro || (Ro = !0, Te.unstable_scheduleCallback(Te.unstable_NormalPriority, Lu)));
}
function Xn(e) {
  function t(o) {
    return Sn(o, e);
  }
  if (0 < kr.length) {
    Sn(kr[0], e);
    for (var n = 1; n < kr.length; n++) {
      var i = kr[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
  }
  for (ft !== null && Sn(ft, e), pt !== null && Sn(pt, e), ht !== null && Sn(ht, e), Yn.forEach(t), Kn.forEach(t), n = 0; n < at.length; n++) i = at[n], i.blockedOn === e && (i.blockedOn = null);
  for (; 0 < at.length && (n = at[0], n.blockedOn === null); ) dd(n), n.blockedOn === null && at.shift();
}
var ln = it.ReactCurrentBatchConfig, qr = !0;
function Du(e, t, n, i) {
  var o = L, l = ln.transition;
  ln.transition = null;
  try {
    L = 1, jl(e, t, n, i);
  } finally {
    L = o, ln.transition = l;
  }
}
function Au(e, t, n, i) {
  var o = L, l = ln.transition;
  ln.transition = null;
  try {
    L = 4, jl(e, t, n, i);
  } finally {
    L = o, ln.transition = l;
  }
}
function jl(e, t, n, i) {
  if (qr) {
    var o = Mo(e, t, n, i);
    if (o === null) Ki(e, t, i, Zr, n), ws(e, i);
    else if (Nu(o, e, t, n, i)) i.stopPropagation();
    else if (ws(e, i), t & 4 && -1 < $u.indexOf(e)) {
      for (; o !== null; ) {
        var l = ur(o);
        if (l !== null && od(l), l = Mo(e, t, n, i), l === null && Ki(e, t, i, Zr, n), l === o) break;
        o = l;
      }
      o !== null && i.stopPropagation();
    } else Ki(e, t, i, null, n);
  }
}
var Zr = null;
function Mo(e, t, n, i) {
  if (Zr = null, e = vl(i), e = It(e), e !== null) if (t = Wt(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = qa(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Zr = e, null;
}
function cd(e) {
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
      switch (zu()) {
        case wl:
          return 1;
        case td:
          return 4;
        case Kr:
        case Tu:
          return 16;
        case nd:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ct = null, Sl = null, Nr = null;
function ud() {
  if (Nr) return Nr;
  var e, t = Sl, n = t.length, i, o = "value" in ct ? ct.value : ct.textContent, l = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++) ;
  var s = n - e;
  for (i = 1; i <= s && t[n - i] === o[l - i]; i++) ;
  return Nr = o.slice(e, 1 < i ? 1 - i : void 0);
}
function Lr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function br() {
  return !0;
}
function bs() {
  return !1;
}
function Me(e) {
  function t(n, i, o, l, s) {
    this._reactName = n, this._targetInst = o, this.type = i, this.nativeEvent = l, this.target = s, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(l) : l[a]);
    return this.isDefaultPrevented = (l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1) ? br : bs, this.isPropagationStopped = bs, this;
  }
  return Q(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = br);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = br);
  }, persist: function() {
  }, isPersistent: br }), t;
}
var xn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Cl = Me(xn), cr = Q({}, xn, { view: 0, detail: 0 }), Ou = Me(cr), Oi, Wi, Cn, xi = Q({}, cr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zl, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Cn && (Cn && e.type === "mousemove" ? (Oi = e.screenX - Cn.screenX, Wi = e.screenY - Cn.screenY) : Wi = Oi = 0, Cn = e), Oi);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Wi;
} }), js = Me(xi), Wu = Q({}, xi, { dataTransfer: 0 }), Hu = Me(Wu), Bu = Q({}, cr, { relatedTarget: 0 }), Hi = Me(Bu), Vu = Q({}, xn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Uu = Me(Vu), Gu = Q({}, xn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Qu = Me(Gu), Yu = Q({}, xn, { data: 0 }), Ss = Me(Yu), Ku = {
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
}, Xu = {
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
}, qu = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Zu(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = qu[e]) ? !!t[e] : !1;
}
function zl() {
  return Zu;
}
var Ju = Q({}, cr, { key: function(e) {
  if (e.key) {
    var t = Ku[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Lr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Xu[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zl, charCode: function(e) {
  return e.type === "keypress" ? Lr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Lr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), ef = Me(Ju), tf = Q({}, xi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Cs = Me(tf), nf = Q({}, cr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zl }), rf = Me(nf), of = Q({}, xn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), lf = Me(of), sf = Q({}, xi, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), af = Me(sf), df = [9, 13, 27, 32], Tl = et && "CompositionEvent" in window, Dn = null;
et && "documentMode" in document && (Dn = document.documentMode);
var cf = et && "TextEvent" in window && !Dn, fd = et && (!Tl || Dn && 8 < Dn && 11 >= Dn), zs = " ", Ts = !1;
function pd(e, t) {
  switch (e) {
    case "keyup":
      return df.indexOf(t.keyCode) !== -1;
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
function hd(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Gt = !1;
function uf(e, t) {
  switch (e) {
    case "compositionend":
      return hd(t);
    case "keypress":
      return t.which !== 32 ? null : (Ts = !0, zs);
    case "textInput":
      return e = t.data, e === zs && Ts ? null : e;
    default:
      return null;
  }
}
function ff(e, t) {
  if (Gt) return e === "compositionend" || !Tl && pd(e, t) ? (e = ud(), Nr = Sl = ct = null, Gt = !1, e) : null;
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
      return fd && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var pf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Rs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!pf[e.type] : t === "textarea";
}
function gd(e, t, n, i) {
  Ga(i), t = Jr(t, "onChange"), 0 < t.length && (n = new Cl("onChange", "change", null, n, i), e.push({ event: n, listeners: t }));
}
var An = null, qn = null;
function hf(e) {
  zd(e, 0);
}
function vi(e) {
  var t = Kt(e);
  if (Aa(t)) return e;
}
function gf(e, t) {
  if (e === "change") return t;
}
var md = !1;
if (et) {
  var Bi;
  if (et) {
    var Vi = "oninput" in document;
    if (!Vi) {
      var Ms = document.createElement("div");
      Ms.setAttribute("oninput", "return;"), Vi = typeof Ms.oninput == "function";
    }
    Bi = Vi;
  } else Bi = !1;
  md = Bi && (!document.documentMode || 9 < document.documentMode);
}
function Is() {
  An && (An.detachEvent("onpropertychange", yd), qn = An = null);
}
function yd(e) {
  if (e.propertyName === "value" && vi(qn)) {
    var t = [];
    gd(t, qn, e, vl(e)), Xa(hf, t);
  }
}
function mf(e, t, n) {
  e === "focusin" ? (Is(), An = t, qn = n, An.attachEvent("onpropertychange", yd)) : e === "focusout" && Is();
}
function yf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return vi(qn);
}
function xf(e, t) {
  if (e === "click") return vi(t);
}
function vf(e, t) {
  if (e === "input" || e === "change") return vi(t);
}
function wf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var He = typeof Object.is == "function" ? Object.is : wf;
function Zn(e, t) {
  if (He(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), i = Object.keys(t);
  if (n.length !== i.length) return !1;
  for (i = 0; i < n.length; i++) {
    var o = n[i];
    if (!uo.call(t, o) || !He(e[o], t[o])) return !1;
  }
  return !0;
}
function _s(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ps(e, t) {
  var n = _s(e);
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
    n = _s(n);
  }
}
function xd(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? xd(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function vd() {
  for (var e = window, t = Gr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Gr(e.document);
  }
  return t;
}
function Rl(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function kf(e) {
  var t = vd(), n = e.focusedElem, i = e.selectionRange;
  if (t !== n && n && n.ownerDocument && xd(n.ownerDocument.documentElement, n)) {
    if (i !== null && Rl(n)) {
      if (t = i.start, e = i.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var o = n.textContent.length, l = Math.min(i.start, o);
        i = i.end === void 0 ? l : Math.min(i.end, o), !e.extend && l > i && (o = i, i = l, l = o), o = Ps(n, l);
        var s = Ps(
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
var bf = et && "documentMode" in document && 11 >= document.documentMode, Qt = null, Io = null, On = null, _o = !1;
function Es(e, t, n) {
  var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  _o || Qt == null || Qt !== Gr(i) || (i = Qt, "selectionStart" in i && Rl(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = { anchorNode: i.anchorNode, anchorOffset: i.anchorOffset, focusNode: i.focusNode, focusOffset: i.focusOffset }), On && Zn(On, i) || (On = i, i = Jr(Io, "onSelect"), 0 < i.length && (t = new Cl("onSelect", "select", null, t, n), e.push({ event: t, listeners: i }), t.target = Qt)));
}
function jr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Yt = { animationend: jr("Animation", "AnimationEnd"), animationiteration: jr("Animation", "AnimationIteration"), animationstart: jr("Animation", "AnimationStart"), transitionend: jr("Transition", "TransitionEnd") }, Ui = {}, wd = {};
et && (wd = document.createElement("div").style, "AnimationEvent" in window || (delete Yt.animationend.animation, delete Yt.animationiteration.animation, delete Yt.animationstart.animation), "TransitionEvent" in window || delete Yt.transitionend.transition);
function wi(e) {
  if (Ui[e]) return Ui[e];
  if (!Yt[e]) return e;
  var t = Yt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in wd) return Ui[e] = t[n];
  return e;
}
var kd = wi("animationend"), bd = wi("animationiteration"), jd = wi("animationstart"), Sd = wi("transitionend"), Cd = /* @__PURE__ */ new Map(), Fs = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function bt(e, t) {
  Cd.set(e, t), Ot(t, [e]);
}
for (var Gi = 0; Gi < Fs.length; Gi++) {
  var Qi = Fs[Gi], jf = Qi.toLowerCase(), Sf = Qi[0].toUpperCase() + Qi.slice(1);
  bt(jf, "on" + Sf);
}
bt(kd, "onAnimationEnd");
bt(bd, "onAnimationIteration");
bt(jd, "onAnimationStart");
bt("dblclick", "onDoubleClick");
bt("focusin", "onFocus");
bt("focusout", "onBlur");
bt(Sd, "onTransitionEnd");
dn("onMouseEnter", ["mouseout", "mouseover"]);
dn("onMouseLeave", ["mouseout", "mouseover"]);
dn("onPointerEnter", ["pointerout", "pointerover"]);
dn("onPointerLeave", ["pointerout", "pointerover"]);
Ot("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ot("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ot("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ot("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ot("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ot("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var $n = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Cf = new Set("cancel close invalid load scroll toggle".split(" ").concat($n));
function $s(e, t, n) {
  var i = e.type || "unknown-event";
  e.currentTarget = n, bu(i, t, void 0, e), e.currentTarget = null;
}
function zd(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var i = e[n], o = i.event;
    i = i.listeners;
    e: {
      var l = void 0;
      if (t) for (var s = i.length - 1; 0 <= s; s--) {
        var a = i[s], c = a.instance, d = a.currentTarget;
        if (a = a.listener, c !== l && o.isPropagationStopped()) break e;
        $s(o, a, d), l = c;
      }
      else for (s = 0; s < i.length; s++) {
        if (a = i[s], c = a.instance, d = a.currentTarget, a = a.listener, c !== l && o.isPropagationStopped()) break e;
        $s(o, a, d), l = c;
      }
    }
  }
  if (Yr) throw e = zo, Yr = !1, zo = null, e;
}
function W(e, t) {
  var n = t[No];
  n === void 0 && (n = t[No] = /* @__PURE__ */ new Set());
  var i = e + "__bubble";
  n.has(i) || (Td(t, e, 2, !1), n.add(i));
}
function Yi(e, t, n) {
  var i = 0;
  t && (i |= 4), Td(n, e, i, t);
}
var Sr = "_reactListening" + Math.random().toString(36).slice(2);
function Jn(e) {
  if (!e[Sr]) {
    e[Sr] = !0, Fa.forEach(function(n) {
      n !== "selectionchange" && (Cf.has(n) || Yi(n, !1, e), Yi(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Sr] || (t[Sr] = !0, Yi("selectionchange", !1, t));
  }
}
function Td(e, t, n, i) {
  switch (cd(t)) {
    case 1:
      var o = Du;
      break;
    case 4:
      o = Au;
      break;
    default:
      o = jl;
  }
  n = o.bind(null, t, n, e), o = void 0, !Co || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), i ? o !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: o }) : e.addEventListener(t, n, !0) : o !== void 0 ? e.addEventListener(t, n, { passive: o }) : e.addEventListener(t, n, !1);
}
function Ki(e, t, n, i, o) {
  var l = i;
  if (!(t & 1) && !(t & 2) && i !== null) e: for (; ; ) {
    if (i === null) return;
    var s = i.tag;
    if (s === 3 || s === 4) {
      var a = i.stateNode.containerInfo;
      if (a === o || a.nodeType === 8 && a.parentNode === o) break;
      if (s === 4) for (s = i.return; s !== null; ) {
        var c = s.tag;
        if ((c === 3 || c === 4) && (c = s.stateNode.containerInfo, c === o || c.nodeType === 8 && c.parentNode === o)) return;
        s = s.return;
      }
      for (; a !== null; ) {
        if (s = It(a), s === null) return;
        if (c = s.tag, c === 5 || c === 6) {
          i = l = s;
          continue e;
        }
        a = a.parentNode;
      }
    }
    i = i.return;
  }
  Xa(function() {
    var d = l, u = vl(n), p = [];
    e: {
      var g = Cd.get(e);
      if (g !== void 0) {
        var v = Cl, w = e;
        switch (e) {
          case "keypress":
            if (Lr(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = ef;
            break;
          case "focusin":
            w = "focus", v = Hi;
            break;
          case "focusout":
            w = "blur", v = Hi;
            break;
          case "beforeblur":
          case "afterblur":
            v = Hi;
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
            v = js;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Hu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = rf;
            break;
          case kd:
          case bd:
          case jd:
            v = Uu;
            break;
          case Sd:
            v = lf;
            break;
          case "scroll":
            v = Ou;
            break;
          case "wheel":
            v = af;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Qu;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Cs;
        }
        var f = (t & 4) !== 0, b = !f && e === "scroll", y = f ? g !== null ? g + "Capture" : null : g;
        f = [];
        for (var h = d, m; h !== null; ) {
          m = h;
          var x = m.stateNode;
          if (m.tag === 5 && x !== null && (m = x, y !== null && (x = Qn(h, y), x != null && f.push(er(h, x, m)))), b) break;
          h = h.return;
        }
        0 < f.length && (g = new v(g, w, null, n, u), p.push({ event: g, listeners: f }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (g = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", g && n !== jo && (w = n.relatedTarget || n.fromElement) && (It(w) || w[tt])) break e;
        if ((v || g) && (g = u.window === u ? u : (g = u.ownerDocument) ? g.defaultView || g.parentWindow : window, v ? (w = n.relatedTarget || n.toElement, v = d, w = w ? It(w) : null, w !== null && (b = Wt(w), w !== b || w.tag !== 5 && w.tag !== 6) && (w = null)) : (v = null, w = d), v !== w)) {
          if (f = js, x = "onMouseLeave", y = "onMouseEnter", h = "mouse", (e === "pointerout" || e === "pointerover") && (f = Cs, x = "onPointerLeave", y = "onPointerEnter", h = "pointer"), b = v == null ? g : Kt(v), m = w == null ? g : Kt(w), g = new f(x, h + "leave", v, n, u), g.target = b, g.relatedTarget = m, x = null, It(u) === d && (f = new f(y, h + "enter", w, n, u), f.target = m, f.relatedTarget = b, x = f), b = x, v && w) t: {
            for (f = v, y = w, h = 0, m = f; m; m = Ht(m)) h++;
            for (m = 0, x = y; x; x = Ht(x)) m++;
            for (; 0 < h - m; ) f = Ht(f), h--;
            for (; 0 < m - h; ) y = Ht(y), m--;
            for (; h--; ) {
              if (f === y || y !== null && f === y.alternate) break t;
              f = Ht(f), y = Ht(y);
            }
            f = null;
          }
          else f = null;
          v !== null && Ns(p, g, v, f, !1), w !== null && b !== null && Ns(p, b, w, f, !0);
        }
      }
      e: {
        if (g = d ? Kt(d) : window, v = g.nodeName && g.nodeName.toLowerCase(), v === "select" || v === "input" && g.type === "file") var k = gf;
        else if (Rs(g)) if (md) k = vf;
        else {
          k = yf;
          var j = mf;
        }
        else (v = g.nodeName) && v.toLowerCase() === "input" && (g.type === "checkbox" || g.type === "radio") && (k = xf);
        if (k && (k = k(e, d))) {
          gd(p, k, n, u);
          break e;
        }
        j && j(e, g, d), e === "focusout" && (j = g._wrapperState) && j.controlled && g.type === "number" && xo(g, "number", g.value);
      }
      switch (j = d ? Kt(d) : window, e) {
        case "focusin":
          (Rs(j) || j.contentEditable === "true") && (Qt = j, Io = d, On = null);
          break;
        case "focusout":
          On = Io = Qt = null;
          break;
        case "mousedown":
          _o = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          _o = !1, Es(p, n, u);
          break;
        case "selectionchange":
          if (bf) break;
        case "keydown":
        case "keyup":
          Es(p, n, u);
      }
      var S;
      if (Tl) e: {
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
      else Gt ? pd(e, n) && (C = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (C = "onCompositionStart");
      C && (fd && n.locale !== "ko" && (Gt || C !== "onCompositionStart" ? C === "onCompositionEnd" && Gt && (S = ud()) : (ct = u, Sl = "value" in ct ? ct.value : ct.textContent, Gt = !0)), j = Jr(d, C), 0 < j.length && (C = new Ss(C, e, null, n, u), p.push({ event: C, listeners: j }), S ? C.data = S : (S = hd(n), S !== null && (C.data = S)))), (S = cf ? uf(e, n) : ff(e, n)) && (d = Jr(d, "onBeforeInput"), 0 < d.length && (u = new Ss("onBeforeInput", "beforeinput", null, n, u), p.push({ event: u, listeners: d }), u.data = S));
    }
    zd(p, t);
  });
}
function er(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Jr(e, t) {
  for (var n = t + "Capture", i = []; e !== null; ) {
    var o = e, l = o.stateNode;
    o.tag === 5 && l !== null && (o = l, l = Qn(e, n), l != null && i.unshift(er(e, l, o)), l = Qn(e, t), l != null && i.push(er(e, l, o))), e = e.return;
  }
  return i;
}
function Ht(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ns(e, t, n, i, o) {
  for (var l = t._reactName, s = []; n !== null && n !== i; ) {
    var a = n, c = a.alternate, d = a.stateNode;
    if (c !== null && c === i) break;
    a.tag === 5 && d !== null && (a = d, o ? (c = Qn(n, l), c != null && s.unshift(er(n, c, a))) : o || (c = Qn(n, l), c != null && s.push(er(n, c, a)))), n = n.return;
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var zf = /\r\n?/g, Tf = /\u0000|\uFFFD/g;
function Ls(e) {
  return (typeof e == "string" ? e : "" + e).replace(zf, `
`).replace(Tf, "");
}
function Cr(e, t, n) {
  if (t = Ls(t), Ls(e) !== t && n) throw Error(z(425));
}
function ei() {
}
var Po = null, Eo = null;
function Fo(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var $o = typeof setTimeout == "function" ? setTimeout : void 0, Rf = typeof clearTimeout == "function" ? clearTimeout : void 0, Ds = typeof Promise == "function" ? Promise : void 0, Mf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ds < "u" ? function(e) {
  return Ds.resolve(null).then(e).catch(If);
} : $o;
function If(e) {
  setTimeout(function() {
    throw e;
  });
}
function Xi(e, t) {
  var n = t, i = 0;
  do {
    var o = n.nextSibling;
    if (e.removeChild(n), o && o.nodeType === 8) if (n = o.data, n === "/$") {
      if (i === 0) {
        e.removeChild(o), Xn(t);
        return;
      }
      i--;
    } else n !== "$" && n !== "$?" && n !== "$!" || i++;
    n = o;
  } while (n);
  Xn(t);
}
function gt(e) {
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
function As(e) {
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
var vn = Math.random().toString(36).slice(2), Ge = "__reactFiber$" + vn, tr = "__reactProps$" + vn, tt = "__reactContainer$" + vn, No = "__reactEvents$" + vn, _f = "__reactListeners$" + vn, Pf = "__reactHandles$" + vn;
function It(e) {
  var t = e[Ge];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[tt] || n[Ge]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = As(e); e !== null; ) {
        if (n = e[Ge]) return n;
        e = As(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function ur(e) {
  return e = e[Ge] || e[tt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Kt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(z(33));
}
function ki(e) {
  return e[tr] || null;
}
var Lo = [], Xt = -1;
function jt(e) {
  return { current: e };
}
function H(e) {
  0 > Xt || (e.current = Lo[Xt], Lo[Xt] = null, Xt--);
}
function O(e, t) {
  Xt++, Lo[Xt] = e.current, e.current = t;
}
var kt = {}, ce = jt(kt), ve = jt(!1), $t = kt;
function cn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return kt;
  var i = e.stateNode;
  if (i && i.__reactInternalMemoizedUnmaskedChildContext === t) return i.__reactInternalMemoizedMaskedChildContext;
  var o = {}, l;
  for (l in n) o[l] = t[l];
  return i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = o), o;
}
function we(e) {
  return e = e.childContextTypes, e != null;
}
function ti() {
  H(ve), H(ce);
}
function Os(e, t, n) {
  if (ce.current !== kt) throw Error(z(168));
  O(ce, t), O(ve, n);
}
function Rd(e, t, n) {
  var i = e.stateNode;
  if (t = t.childContextTypes, typeof i.getChildContext != "function") return n;
  i = i.getChildContext();
  for (var o in i) if (!(o in t)) throw Error(z(108, gu(e) || "Unknown", o));
  return Q({}, n, i);
}
function ni(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || kt, $t = ce.current, O(ce, e), O(ve, ve.current), !0;
}
function Ws(e, t, n) {
  var i = e.stateNode;
  if (!i) throw Error(z(169));
  n ? (e = Rd(e, t, $t), i.__reactInternalMemoizedMergedChildContext = e, H(ve), H(ce), O(ce, e)) : H(ve), O(ve, n);
}
var Xe = null, bi = !1, qi = !1;
function Md(e) {
  Xe === null ? Xe = [e] : Xe.push(e);
}
function Ef(e) {
  bi = !0, Md(e);
}
function St() {
  if (!qi && Xe !== null) {
    qi = !0;
    var e = 0, t = L;
    try {
      var n = Xe;
      for (L = 1; e < n.length; e++) {
        var i = n[e];
        do
          i = i(!0);
        while (i !== null);
      }
      Xe = null, bi = !1;
    } catch (o) {
      throw Xe !== null && (Xe = Xe.slice(e + 1)), ed(wl, St), o;
    } finally {
      L = t, qi = !1;
    }
  }
  return null;
}
var qt = [], Zt = 0, ri = null, ii = 0, Ie = [], _e = 0, Nt = null, qe = 1, Ze = "";
function Rt(e, t) {
  qt[Zt++] = ii, qt[Zt++] = ri, ri = e, ii = t;
}
function Id(e, t, n) {
  Ie[_e++] = qe, Ie[_e++] = Ze, Ie[_e++] = Nt, Nt = e;
  var i = qe;
  e = Ze;
  var o = 32 - Oe(i) - 1;
  i &= ~(1 << o), n += 1;
  var l = 32 - Oe(t) + o;
  if (30 < l) {
    var s = o - o % 5;
    l = (i & (1 << s) - 1).toString(32), i >>= s, o -= s, qe = 1 << 32 - Oe(t) + o | n << o | i, Ze = l + e;
  } else qe = 1 << l | n << o | i, Ze = e;
}
function Ml(e) {
  e.return !== null && (Rt(e, 1), Id(e, 1, 0));
}
function Il(e) {
  for (; e === ri; ) ri = qt[--Zt], qt[Zt] = null, ii = qt[--Zt], qt[Zt] = null;
  for (; e === Nt; ) Nt = Ie[--_e], Ie[_e] = null, Ze = Ie[--_e], Ie[_e] = null, qe = Ie[--_e], Ie[_e] = null;
}
var ze = null, Ce = null, V = !1, Ae = null;
function _d(e, t) {
  var n = Pe(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Hs(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ze = e, Ce = gt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ze = e, Ce = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Nt !== null ? { id: qe, overflow: Ze } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Pe(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ze = e, Ce = null, !0) : !1;
    default:
      return !1;
  }
}
function Do(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ao(e) {
  if (V) {
    var t = Ce;
    if (t) {
      var n = t;
      if (!Hs(e, t)) {
        if (Do(e)) throw Error(z(418));
        t = gt(n.nextSibling);
        var i = ze;
        t && Hs(e, t) ? _d(i, n) : (e.flags = e.flags & -4097 | 2, V = !1, ze = e);
      }
    } else {
      if (Do(e)) throw Error(z(418));
      e.flags = e.flags & -4097 | 2, V = !1, ze = e;
    }
  }
}
function Bs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ze = e;
}
function zr(e) {
  if (e !== ze) return !1;
  if (!V) return Bs(e), V = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Fo(e.type, e.memoizedProps)), t && (t = Ce)) {
    if (Do(e)) throw Pd(), Error(z(418));
    for (; t; ) _d(e, t), t = gt(t.nextSibling);
  }
  if (Bs(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(z(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ce = gt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Ce = null;
    }
  } else Ce = ze ? gt(e.stateNode.nextSibling) : null;
  return !0;
}
function Pd() {
  for (var e = Ce; e; ) e = gt(e.nextSibling);
}
function un() {
  Ce = ze = null, V = !1;
}
function _l(e) {
  Ae === null ? Ae = [e] : Ae.push(e);
}
var Ff = it.ReactCurrentBatchConfig;
function zn(e, t, n) {
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
function Tr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(z(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Vs(e) {
  var t = e._init;
  return t(e._payload);
}
function Ed(e) {
  function t(y, h) {
    if (e) {
      var m = y.deletions;
      m === null ? (y.deletions = [h], y.flags |= 16) : m.push(h);
    }
  }
  function n(y, h) {
    if (!e) return null;
    for (; h !== null; ) t(y, h), h = h.sibling;
    return null;
  }
  function i(y, h) {
    for (y = /* @__PURE__ */ new Map(); h !== null; ) h.key !== null ? y.set(h.key, h) : y.set(h.index, h), h = h.sibling;
    return y;
  }
  function o(y, h) {
    return y = vt(y, h), y.index = 0, y.sibling = null, y;
  }
  function l(y, h, m) {
    return y.index = m, e ? (m = y.alternate, m !== null ? (m = m.index, m < h ? (y.flags |= 2, h) : m) : (y.flags |= 2, h)) : (y.flags |= 1048576, h);
  }
  function s(y) {
    return e && y.alternate === null && (y.flags |= 2), y;
  }
  function a(y, h, m, x) {
    return h === null || h.tag !== 6 ? (h = io(m, y.mode, x), h.return = y, h) : (h = o(h, m), h.return = y, h);
  }
  function c(y, h, m, x) {
    var k = m.type;
    return k === Ut ? u(y, h, m.props.children, x, m.key) : h !== null && (h.elementType === k || typeof k == "object" && k !== null && k.$$typeof === lt && Vs(k) === h.type) ? (x = o(h, m.props), x.ref = zn(y, h, m), x.return = y, x) : (x = Vr(m.type, m.key, m.props, null, y.mode, x), x.ref = zn(y, h, m), x.return = y, x);
  }
  function d(y, h, m, x) {
    return h === null || h.tag !== 4 || h.stateNode.containerInfo !== m.containerInfo || h.stateNode.implementation !== m.implementation ? (h = oo(m, y.mode, x), h.return = y, h) : (h = o(h, m.children || []), h.return = y, h);
  }
  function u(y, h, m, x, k) {
    return h === null || h.tag !== 7 ? (h = Ft(m, y.mode, x, k), h.return = y, h) : (h = o(h, m), h.return = y, h);
  }
  function p(y, h, m) {
    if (typeof h == "string" && h !== "" || typeof h == "number") return h = io("" + h, y.mode, m), h.return = y, h;
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case mr:
          return m = Vr(h.type, h.key, h.props, null, y.mode, m), m.ref = zn(y, null, h), m.return = y, m;
        case Vt:
          return h = oo(h, y.mode, m), h.return = y, h;
        case lt:
          var x = h._init;
          return p(y, x(h._payload), m);
      }
      if (En(h) || kn(h)) return h = Ft(h, y.mode, m, null), h.return = y, h;
      Tr(y, h);
    }
    return null;
  }
  function g(y, h, m, x) {
    var k = h !== null ? h.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number") return k !== null ? null : a(y, h, "" + m, x);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case mr:
          return m.key === k ? c(y, h, m, x) : null;
        case Vt:
          return m.key === k ? d(y, h, m, x) : null;
        case lt:
          return k = m._init, g(
            y,
            h,
            k(m._payload),
            x
          );
      }
      if (En(m) || kn(m)) return k !== null ? null : u(y, h, m, x, null);
      Tr(y, m);
    }
    return null;
  }
  function v(y, h, m, x, k) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return y = y.get(m) || null, a(h, y, "" + x, k);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case mr:
          return y = y.get(x.key === null ? m : x.key) || null, c(h, y, x, k);
        case Vt:
          return y = y.get(x.key === null ? m : x.key) || null, d(h, y, x, k);
        case lt:
          var j = x._init;
          return v(y, h, m, j(x._payload), k);
      }
      if (En(x) || kn(x)) return y = y.get(m) || null, u(h, y, x, k, null);
      Tr(h, x);
    }
    return null;
  }
  function w(y, h, m, x) {
    for (var k = null, j = null, S = h, C = h = 0, I = null; S !== null && C < m.length; C++) {
      S.index > C ? (I = S, S = null) : I = S.sibling;
      var T = g(y, S, m[C], x);
      if (T === null) {
        S === null && (S = I);
        break;
      }
      e && S && T.alternate === null && t(y, S), h = l(T, h, C), j === null ? k = T : j.sibling = T, j = T, S = I;
    }
    if (C === m.length) return n(y, S), V && Rt(y, C), k;
    if (S === null) {
      for (; C < m.length; C++) S = p(y, m[C], x), S !== null && (h = l(S, h, C), j === null ? k = S : j.sibling = S, j = S);
      return V && Rt(y, C), k;
    }
    for (S = i(y, S); C < m.length; C++) I = v(S, y, C, m[C], x), I !== null && (e && I.alternate !== null && S.delete(I.key === null ? C : I.key), h = l(I, h, C), j === null ? k = I : j.sibling = I, j = I);
    return e && S.forEach(function($) {
      return t(y, $);
    }), V && Rt(y, C), k;
  }
  function f(y, h, m, x) {
    var k = kn(m);
    if (typeof k != "function") throw Error(z(150));
    if (m = k.call(m), m == null) throw Error(z(151));
    for (var j = k = null, S = h, C = h = 0, I = null, T = m.next(); S !== null && !T.done; C++, T = m.next()) {
      S.index > C ? (I = S, S = null) : I = S.sibling;
      var $ = g(y, S, T.value, x);
      if ($ === null) {
        S === null && (S = I);
        break;
      }
      e && S && $.alternate === null && t(y, S), h = l($, h, C), j === null ? k = $ : j.sibling = $, j = $, S = I;
    }
    if (T.done) return n(
      y,
      S
    ), V && Rt(y, C), k;
    if (S === null) {
      for (; !T.done; C++, T = m.next()) T = p(y, T.value, x), T !== null && (h = l(T, h, C), j === null ? k = T : j.sibling = T, j = T);
      return V && Rt(y, C), k;
    }
    for (S = i(y, S); !T.done; C++, T = m.next()) T = v(S, y, C, T.value, x), T !== null && (e && T.alternate !== null && S.delete(T.key === null ? C : T.key), h = l(T, h, C), j === null ? k = T : j.sibling = T, j = T);
    return e && S.forEach(function(be) {
      return t(y, be);
    }), V && Rt(y, C), k;
  }
  function b(y, h, m, x) {
    if (typeof m == "object" && m !== null && m.type === Ut && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case mr:
          e: {
            for (var k = m.key, j = h; j !== null; ) {
              if (j.key === k) {
                if (k = m.type, k === Ut) {
                  if (j.tag === 7) {
                    n(y, j.sibling), h = o(j, m.props.children), h.return = y, y = h;
                    break e;
                  }
                } else if (j.elementType === k || typeof k == "object" && k !== null && k.$$typeof === lt && Vs(k) === j.type) {
                  n(y, j.sibling), h = o(j, m.props), h.ref = zn(y, j, m), h.return = y, y = h;
                  break e;
                }
                n(y, j);
                break;
              } else t(y, j);
              j = j.sibling;
            }
            m.type === Ut ? (h = Ft(m.props.children, y.mode, x, m.key), h.return = y, y = h) : (x = Vr(m.type, m.key, m.props, null, y.mode, x), x.ref = zn(y, h, m), x.return = y, y = x);
          }
          return s(y);
        case Vt:
          e: {
            for (j = m.key; h !== null; ) {
              if (h.key === j) if (h.tag === 4 && h.stateNode.containerInfo === m.containerInfo && h.stateNode.implementation === m.implementation) {
                n(y, h.sibling), h = o(h, m.children || []), h.return = y, y = h;
                break e;
              } else {
                n(y, h);
                break;
              }
              else t(y, h);
              h = h.sibling;
            }
            h = oo(m, y.mode, x), h.return = y, y = h;
          }
          return s(y);
        case lt:
          return j = m._init, b(y, h, j(m._payload), x);
      }
      if (En(m)) return w(y, h, m, x);
      if (kn(m)) return f(y, h, m, x);
      Tr(y, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" ? (m = "" + m, h !== null && h.tag === 6 ? (n(y, h.sibling), h = o(h, m), h.return = y, y = h) : (n(y, h), h = io(m, y.mode, x), h.return = y, y = h), s(y)) : n(y, h);
  }
  return b;
}
var fn = Ed(!0), Fd = Ed(!1), oi = jt(null), li = null, Jt = null, Pl = null;
function El() {
  Pl = Jt = li = null;
}
function Fl(e) {
  var t = oi.current;
  H(oi), e._currentValue = t;
}
function Oo(e, t, n) {
  for (; e !== null; ) {
    var i = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function sn(e, t) {
  li = e, Pl = Jt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (xe = !0), e.firstContext = null);
}
function Fe(e) {
  var t = e._currentValue;
  if (Pl !== e) if (e = { context: e, memoizedValue: t, next: null }, Jt === null) {
    if (li === null) throw Error(z(308));
    Jt = e, li.dependencies = { lanes: 0, firstContext: e };
  } else Jt = Jt.next = e;
  return t;
}
var _t = null;
function $l(e) {
  _t === null ? _t = [e] : _t.push(e);
}
function $d(e, t, n, i) {
  var o = t.interleaved;
  return o === null ? (n.next = n, $l(t)) : (n.next = o.next, o.next = n), t.interleaved = n, nt(e, i);
}
function nt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var st = !1;
function Nl(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Nd(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Je(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function mt(e, t, n) {
  var i = e.updateQueue;
  if (i === null) return null;
  if (i = i.shared, N & 2) {
    var o = i.pending;
    return o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, nt(e, n);
  }
  return o = i.interleaved, o === null ? (t.next = t, $l(i)) : (t.next = o.next, o.next = t), i.interleaved = t, nt(e, n);
}
function Dr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, kl(e, n);
  }
}
function Us(e, t) {
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
function si(e, t, n, i) {
  var o = e.updateQueue;
  st = !1;
  var l = o.firstBaseUpdate, s = o.lastBaseUpdate, a = o.shared.pending;
  if (a !== null) {
    o.shared.pending = null;
    var c = a, d = c.next;
    c.next = null, s === null ? l = d : s.next = d, s = c;
    var u = e.alternate;
    u !== null && (u = u.updateQueue, a = u.lastBaseUpdate, a !== s && (a === null ? u.firstBaseUpdate = d : a.next = d, u.lastBaseUpdate = c));
  }
  if (l !== null) {
    var p = o.baseState;
    s = 0, u = d = c = null, a = l;
    do {
      var g = a.lane, v = a.eventTime;
      if ((i & g) === g) {
        u !== null && (u = u.next = {
          eventTime: v,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var w = e, f = a;
          switch (g = t, v = n, f.tag) {
            case 1:
              if (w = f.payload, typeof w == "function") {
                p = w.call(v, p, g);
                break e;
              }
              p = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = f.payload, g = typeof w == "function" ? w.call(v, p, g) : w, g == null) break e;
              p = Q({}, p, g);
              break e;
            case 2:
              st = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, g = o.effects, g === null ? o.effects = [a] : g.push(a));
      } else v = { eventTime: v, lane: g, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, u === null ? (d = u = v, c = p) : u = u.next = v, s |= g;
      if (a = a.next, a === null) {
        if (a = o.shared.pending, a === null) break;
        g = a, a = g.next, g.next = null, o.lastBaseUpdate = g, o.shared.pending = null;
      }
    } while (!0);
    if (u === null && (c = p), o.baseState = c, o.firstBaseUpdate = d, o.lastBaseUpdate = u, t = o.shared.interleaved, t !== null) {
      o = t;
      do
        s |= o.lane, o = o.next;
      while (o !== t);
    } else l === null && (o.shared.lanes = 0);
    Dt |= s, e.lanes = s, e.memoizedState = p;
  }
}
function Gs(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var i = e[t], o = i.callback;
    if (o !== null) {
      if (i.callback = null, i = n, typeof o != "function") throw Error(z(191, o));
      o.call(i);
    }
  }
}
var fr = {}, Ye = jt(fr), nr = jt(fr), rr = jt(fr);
function Pt(e) {
  if (e === fr) throw Error(z(174));
  return e;
}
function Ll(e, t) {
  switch (O(rr, t), O(nr, e), O(Ye, fr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : wo(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = wo(t, e);
  }
  H(Ye), O(Ye, t);
}
function pn() {
  H(Ye), H(nr), H(rr);
}
function Ld(e) {
  Pt(rr.current);
  var t = Pt(Ye.current), n = wo(t, e.type);
  t !== n && (O(nr, e), O(Ye, n));
}
function Dl(e) {
  nr.current === e && (H(Ye), H(nr));
}
var U = jt(0);
function ai(e) {
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
var Zi = [];
function Al() {
  for (var e = 0; e < Zi.length; e++) Zi[e]._workInProgressVersionPrimary = null;
  Zi.length = 0;
}
var Ar = it.ReactCurrentDispatcher, Ji = it.ReactCurrentBatchConfig, Lt = 0, G = null, ee = null, ne = null, di = !1, Wn = !1, ir = 0, $f = 0;
function se() {
  throw Error(z(321));
}
function Ol(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!He(e[n], t[n])) return !1;
  return !0;
}
function Wl(e, t, n, i, o, l) {
  if (Lt = l, G = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ar.current = e === null || e.memoizedState === null ? Af : Of, e = n(i, o), Wn) {
    l = 0;
    do {
      if (Wn = !1, ir = 0, 25 <= l) throw Error(z(301));
      l += 1, ne = ee = null, t.updateQueue = null, Ar.current = Wf, e = n(i, o);
    } while (Wn);
  }
  if (Ar.current = ci, t = ee !== null && ee.next !== null, Lt = 0, ne = ee = G = null, di = !1, t) throw Error(z(300));
  return e;
}
function Hl() {
  var e = ir !== 0;
  return ir = 0, e;
}
function Ue() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ne === null ? G.memoizedState = ne = e : ne = ne.next = e, ne;
}
function $e() {
  if (ee === null) {
    var e = G.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ee.next;
  var t = ne === null ? G.memoizedState : ne.next;
  if (t !== null) ne = t, ee = e;
  else {
    if (e === null) throw Error(z(310));
    ee = e, e = { memoizedState: ee.memoizedState, baseState: ee.baseState, baseQueue: ee.baseQueue, queue: ee.queue, next: null }, ne === null ? G.memoizedState = ne = e : ne = ne.next = e;
  }
  return ne;
}
function or(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function eo(e) {
  var t = $e(), n = t.queue;
  if (n === null) throw Error(z(311));
  n.lastRenderedReducer = e;
  var i = ee, o = i.baseQueue, l = n.pending;
  if (l !== null) {
    if (o !== null) {
      var s = o.next;
      o.next = l.next, l.next = s;
    }
    i.baseQueue = o = l, n.pending = null;
  }
  if (o !== null) {
    l = o.next, i = i.baseState;
    var a = s = null, c = null, d = l;
    do {
      var u = d.lane;
      if ((Lt & u) === u) c !== null && (c = c.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), i = d.hasEagerState ? d.eagerState : e(i, d.action);
      else {
        var p = {
          lane: u,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        c === null ? (a = c = p, s = i) : c = c.next = p, G.lanes |= u, Dt |= u;
      }
      d = d.next;
    } while (d !== null && d !== l);
    c === null ? s = i : c.next = a, He(i, t.memoizedState) || (xe = !0), t.memoizedState = i, t.baseState = s, t.baseQueue = c, n.lastRenderedState = i;
  }
  if (e = n.interleaved, e !== null) {
    o = e;
    do
      l = o.lane, G.lanes |= l, Dt |= l, o = o.next;
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function to(e) {
  var t = $e(), n = t.queue;
  if (n === null) throw Error(z(311));
  n.lastRenderedReducer = e;
  var i = n.dispatch, o = n.pending, l = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var s = o = o.next;
    do
      l = e(l, s.action), s = s.next;
    while (s !== o);
    He(l, t.memoizedState) || (xe = !0), t.memoizedState = l, t.baseQueue === null && (t.baseState = l), n.lastRenderedState = l;
  }
  return [l, i];
}
function Dd() {
}
function Ad(e, t) {
  var n = G, i = $e(), o = t(), l = !He(i.memoizedState, o);
  if (l && (i.memoizedState = o, xe = !0), i = i.queue, Bl(Hd.bind(null, n, i, e), [e]), i.getSnapshot !== t || l || ne !== null && ne.memoizedState.tag & 1) {
    if (n.flags |= 2048, lr(9, Wd.bind(null, n, i, o, t), void 0, null), re === null) throw Error(z(349));
    Lt & 30 || Od(n, t, o);
  }
  return o;
}
function Od(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = G.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, G.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Wd(e, t, n, i) {
  t.value = n, t.getSnapshot = i, Bd(t) && Vd(e);
}
function Hd(e, t, n) {
  return n(function() {
    Bd(t) && Vd(e);
  });
}
function Bd(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !He(e, n);
  } catch {
    return !0;
  }
}
function Vd(e) {
  var t = nt(e, 1);
  t !== null && We(t, e, 1, -1);
}
function Qs(e) {
  var t = Ue();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: or, lastRenderedState: e }, t.queue = e, e = e.dispatch = Df.bind(null, G, e), [t.memoizedState, e];
}
function lr(e, t, n, i) {
  return e = { tag: e, create: t, destroy: n, deps: i, next: null }, t = G.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, G.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e)), e;
}
function Ud() {
  return $e().memoizedState;
}
function Or(e, t, n, i) {
  var o = Ue();
  G.flags |= e, o.memoizedState = lr(1 | t, n, void 0, i === void 0 ? null : i);
}
function ji(e, t, n, i) {
  var o = $e();
  i = i === void 0 ? null : i;
  var l = void 0;
  if (ee !== null) {
    var s = ee.memoizedState;
    if (l = s.destroy, i !== null && Ol(i, s.deps)) {
      o.memoizedState = lr(t, n, l, i);
      return;
    }
  }
  G.flags |= e, o.memoizedState = lr(1 | t, n, l, i);
}
function Ys(e, t) {
  return Or(8390656, 8, e, t);
}
function Bl(e, t) {
  return ji(2048, 8, e, t);
}
function Gd(e, t) {
  return ji(4, 2, e, t);
}
function Qd(e, t) {
  return ji(4, 4, e, t);
}
function Yd(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Kd(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ji(4, 4, Yd.bind(null, t, e), n);
}
function Vl() {
}
function Xd(e, t) {
  var n = $e();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && Ol(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
}
function qd(e, t) {
  var n = $e();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && Ol(t, i[1]) ? i[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Zd(e, t, n) {
  return Lt & 21 ? (He(n, t) || (n = rd(), G.lanes |= n, Dt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, xe = !0), e.memoizedState = n);
}
function Nf(e, t) {
  var n = L;
  L = n !== 0 && 4 > n ? n : 4, e(!0);
  var i = Ji.transition;
  Ji.transition = {};
  try {
    e(!1), t();
  } finally {
    L = n, Ji.transition = i;
  }
}
function Jd() {
  return $e().memoizedState;
}
function Lf(e, t, n) {
  var i = xt(e);
  if (n = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null }, ec(e)) tc(t, n);
  else if (n = $d(e, t, n, i), n !== null) {
    var o = pe();
    We(n, e, i, o), nc(n, t, i);
  }
}
function Df(e, t, n) {
  var i = xt(e), o = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (ec(e)) tc(t, o);
  else {
    var l = e.alternate;
    if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = t.lastRenderedReducer, l !== null)) try {
      var s = t.lastRenderedState, a = l(s, n);
      if (o.hasEagerState = !0, o.eagerState = a, He(a, s)) {
        var c = t.interleaved;
        c === null ? (o.next = o, $l(t)) : (o.next = c.next, c.next = o), t.interleaved = o;
        return;
      }
    } catch {
    } finally {
    }
    n = $d(e, t, o, i), n !== null && (o = pe(), We(n, e, i, o), nc(n, t, i));
  }
}
function ec(e) {
  var t = e.alternate;
  return e === G || t !== null && t === G;
}
function tc(e, t) {
  Wn = di = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function nc(e, t, n) {
  if (n & 4194240) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, kl(e, n);
  }
}
var ci = { readContext: Fe, useCallback: se, useContext: se, useEffect: se, useImperativeHandle: se, useInsertionEffect: se, useLayoutEffect: se, useMemo: se, useReducer: se, useRef: se, useState: se, useDebugValue: se, useDeferredValue: se, useTransition: se, useMutableSource: se, useSyncExternalStore: se, useId: se, unstable_isNewReconciler: !1 }, Af = { readContext: Fe, useCallback: function(e, t) {
  return Ue().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Fe, useEffect: Ys, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Or(
    4194308,
    4,
    Yd.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Or(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Or(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ue();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var i = Ue();
  return t = n !== void 0 ? n(t) : t, i.memoizedState = i.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, i.queue = e, e = e.dispatch = Lf.bind(null, G, e), [i.memoizedState, e];
}, useRef: function(e) {
  var t = Ue();
  return e = { current: e }, t.memoizedState = e;
}, useState: Qs, useDebugValue: Vl, useDeferredValue: function(e) {
  return Ue().memoizedState = e;
}, useTransition: function() {
  var e = Qs(!1), t = e[0];
  return e = Nf.bind(null, e[1]), Ue().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var i = G, o = Ue();
  if (V) {
    if (n === void 0) throw Error(z(407));
    n = n();
  } else {
    if (n = t(), re === null) throw Error(z(349));
    Lt & 30 || Od(i, t, n);
  }
  o.memoizedState = n;
  var l = { value: n, getSnapshot: t };
  return o.queue = l, Ys(Hd.bind(
    null,
    i,
    l,
    e
  ), [e]), i.flags |= 2048, lr(9, Wd.bind(null, i, l, n, t), void 0, null), n;
}, useId: function() {
  var e = Ue(), t = re.identifierPrefix;
  if (V) {
    var n = Ze, i = qe;
    n = (i & ~(1 << 32 - Oe(i) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = ir++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = $f++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Of = {
  readContext: Fe,
  useCallback: Xd,
  useContext: Fe,
  useEffect: Bl,
  useImperativeHandle: Kd,
  useInsertionEffect: Gd,
  useLayoutEffect: Qd,
  useMemo: qd,
  useReducer: eo,
  useRef: Ud,
  useState: function() {
    return eo(or);
  },
  useDebugValue: Vl,
  useDeferredValue: function(e) {
    var t = $e();
    return Zd(t, ee.memoizedState, e);
  },
  useTransition: function() {
    var e = eo(or)[0], t = $e().memoizedState;
    return [e, t];
  },
  useMutableSource: Dd,
  useSyncExternalStore: Ad,
  useId: Jd,
  unstable_isNewReconciler: !1
}, Wf = { readContext: Fe, useCallback: Xd, useContext: Fe, useEffect: Bl, useImperativeHandle: Kd, useInsertionEffect: Gd, useLayoutEffect: Qd, useMemo: qd, useReducer: to, useRef: Ud, useState: function() {
  return to(or);
}, useDebugValue: Vl, useDeferredValue: function(e) {
  var t = $e();
  return ee === null ? t.memoizedState = e : Zd(t, ee.memoizedState, e);
}, useTransition: function() {
  var e = to(or)[0], t = $e().memoizedState;
  return [e, t];
}, useMutableSource: Dd, useSyncExternalStore: Ad, useId: Jd, unstable_isNewReconciler: !1 };
function Le(e, t) {
  if (e && e.defaultProps) {
    t = Q({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Wo(e, t, n, i) {
  t = e.memoizedState, n = n(i, t), n = n == null ? t : Q({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Si = { isMounted: function(e) {
  return (e = e._reactInternals) ? Wt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var i = pe(), o = xt(e), l = Je(i, o);
  l.payload = t, n != null && (l.callback = n), t = mt(e, l, o), t !== null && (We(t, e, o, i), Dr(t, e, o));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var i = pe(), o = xt(e), l = Je(i, o);
  l.tag = 1, l.payload = t, n != null && (l.callback = n), t = mt(e, l, o), t !== null && (We(t, e, o, i), Dr(t, e, o));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = pe(), i = xt(e), o = Je(n, i);
  o.tag = 2, t != null && (o.callback = t), t = mt(e, o, i), t !== null && (We(t, e, i, n), Dr(t, e, i));
} };
function Ks(e, t, n, i, o, l, s) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, l, s) : t.prototype && t.prototype.isPureReactComponent ? !Zn(n, i) || !Zn(o, l) : !0;
}
function rc(e, t, n) {
  var i = !1, o = kt, l = t.contextType;
  return typeof l == "object" && l !== null ? l = Fe(l) : (o = we(t) ? $t : ce.current, i = t.contextTypes, l = (i = i != null) ? cn(e, o) : kt), t = new t(n, l), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Si, e.stateNode = t, t._reactInternals = e, i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = o, e.__reactInternalMemoizedMaskedChildContext = l), t;
}
function Xs(e, t, n, i) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== e && Si.enqueueReplaceState(t, t.state, null);
}
function Ho(e, t, n, i) {
  var o = e.stateNode;
  o.props = n, o.state = e.memoizedState, o.refs = {}, Nl(e);
  var l = t.contextType;
  typeof l == "object" && l !== null ? o.context = Fe(l) : (l = we(t) ? $t : ce.current, o.context = cn(e, l)), o.state = e.memoizedState, l = t.getDerivedStateFromProps, typeof l == "function" && (Wo(e, t, l, n), o.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (t = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), t !== o.state && Si.enqueueReplaceState(o, o.state, null), si(e, n, o, i), o.state = e.memoizedState), typeof o.componentDidMount == "function" && (e.flags |= 4194308);
}
function hn(e, t) {
  try {
    var n = "", i = t;
    do
      n += hu(i), i = i.return;
    while (i);
    var o = n;
  } catch (l) {
    o = `
Error generating stack: ` + l.message + `
` + l.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function no(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Bo(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Hf = typeof WeakMap == "function" ? WeakMap : Map;
function ic(e, t, n) {
  n = Je(-1, n), n.tag = 3, n.payload = { element: null };
  var i = t.value;
  return n.callback = function() {
    fi || (fi = !0, Jo = i), Bo(e, t);
  }, n;
}
function oc(e, t, n) {
  n = Je(-1, n), n.tag = 3;
  var i = e.type.getDerivedStateFromError;
  if (typeof i == "function") {
    var o = t.value;
    n.payload = function() {
      return i(o);
    }, n.callback = function() {
      Bo(e, t);
    };
  }
  var l = e.stateNode;
  return l !== null && typeof l.componentDidCatch == "function" && (n.callback = function() {
    Bo(e, t), typeof i != "function" && (yt === null ? yt = /* @__PURE__ */ new Set([this]) : yt.add(this));
    var s = t.stack;
    this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
  }), n;
}
function qs(e, t, n) {
  var i = e.pingCache;
  if (i === null) {
    i = e.pingCache = new Hf();
    var o = /* @__PURE__ */ new Set();
    i.set(t, o);
  } else o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
  o.has(n) || (o.add(n), e = np.bind(null, e, t, n), t.then(e, e));
}
function Zs(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Js(e, t, n, i, o) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = o, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Je(-1, 1), t.tag = 2, mt(n, t, 1))), n.lanes |= 1), e);
}
var Bf = it.ReactCurrentOwner, xe = !1;
function fe(e, t, n, i) {
  t.child = e === null ? Fd(t, null, n, i) : fn(t, e.child, n, i);
}
function ea(e, t, n, i, o) {
  n = n.render;
  var l = t.ref;
  return sn(t, o), i = Wl(e, t, n, i, l, o), n = Hl(), e !== null && !xe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, rt(e, t, o)) : (V && n && Ml(t), t.flags |= 1, fe(e, t, i, o), t.child);
}
function ta(e, t, n, i, o) {
  if (e === null) {
    var l = n.type;
    return typeof l == "function" && !Zl(l) && l.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = l, lc(e, t, l, i, o)) : (e = Vr(n.type, null, i, t, t.mode, o), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (l = e.child, !(e.lanes & o)) {
    var s = l.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Zn, n(s, i) && e.ref === t.ref) return rt(e, t, o);
  }
  return t.flags |= 1, e = vt(l, i), e.ref = t.ref, e.return = t, t.child = e;
}
function lc(e, t, n, i, o) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (Zn(l, i) && e.ref === t.ref) if (xe = !1, t.pendingProps = i = l, (e.lanes & o) !== 0) e.flags & 131072 && (xe = !0);
    else return t.lanes = e.lanes, rt(e, t, o);
  }
  return Vo(e, t, n, i, o);
}
function sc(e, t, n) {
  var i = t.pendingProps, o = i.children, l = e !== null ? e.memoizedState : null;
  if (i.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, O(tn, Se), Se |= n;
  else {
    if (!(n & 1073741824)) return e = l !== null ? l.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, O(tn, Se), Se |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, i = l !== null ? l.baseLanes : n, O(tn, Se), Se |= i;
  }
  else l !== null ? (i = l.baseLanes | n, t.memoizedState = null) : i = n, O(tn, Se), Se |= i;
  return fe(e, t, o, n), t.child;
}
function ac(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Vo(e, t, n, i, o) {
  var l = we(n) ? $t : ce.current;
  return l = cn(t, l), sn(t, o), n = Wl(e, t, n, i, l, o), i = Hl(), e !== null && !xe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, rt(e, t, o)) : (V && i && Ml(t), t.flags |= 1, fe(e, t, n, o), t.child);
}
function na(e, t, n, i, o) {
  if (we(n)) {
    var l = !0;
    ni(t);
  } else l = !1;
  if (sn(t, o), t.stateNode === null) Wr(e, t), rc(t, n, i), Ho(t, n, i, o), i = !0;
  else if (e === null) {
    var s = t.stateNode, a = t.memoizedProps;
    s.props = a;
    var c = s.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = Fe(d) : (d = we(n) ? $t : ce.current, d = cn(t, d));
    var u = n.getDerivedStateFromProps, p = typeof u == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    p || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== i || c !== d) && Xs(t, s, i, d), st = !1;
    var g = t.memoizedState;
    s.state = g, si(t, i, s, o), c = t.memoizedState, a !== i || g !== c || ve.current || st ? (typeof u == "function" && (Wo(t, n, u, i), c = t.memoizedState), (a = st || Ks(t, n, a, i, g, c, d)) ? (p || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = c), s.props = i, s.state = c, s.context = d, i = a) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
  } else {
    s = t.stateNode, Nd(e, t), a = t.memoizedProps, d = t.type === t.elementType ? a : Le(t.type, a), s.props = d, p = t.pendingProps, g = s.context, c = n.contextType, typeof c == "object" && c !== null ? c = Fe(c) : (c = we(n) ? $t : ce.current, c = cn(t, c));
    var v = n.getDerivedStateFromProps;
    (u = typeof v == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== p || g !== c) && Xs(t, s, i, c), st = !1, g = t.memoizedState, s.state = g, si(t, i, s, o);
    var w = t.memoizedState;
    a !== p || g !== w || ve.current || st ? (typeof v == "function" && (Wo(t, n, v, i), w = t.memoizedState), (d = st || Ks(t, n, d, i, g, w, c) || !1) ? (u || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, w, c), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, w, c)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = w), s.props = i, s.state = w, s.context = c, i = d) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), i = !1);
  }
  return Uo(e, t, n, i, l, o);
}
function Uo(e, t, n, i, o, l) {
  ac(e, t);
  var s = (t.flags & 128) !== 0;
  if (!i && !s) return o && Ws(t, n, !1), rt(e, t, l);
  i = t.stateNode, Bf.current = t;
  var a = s && typeof n.getDerivedStateFromError != "function" ? null : i.render();
  return t.flags |= 1, e !== null && s ? (t.child = fn(t, e.child, null, l), t.child = fn(t, null, a, l)) : fe(e, t, a, l), t.memoizedState = i.state, o && Ws(t, n, !0), t.child;
}
function dc(e) {
  var t = e.stateNode;
  t.pendingContext ? Os(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Os(e, t.context, !1), Ll(e, t.containerInfo);
}
function ra(e, t, n, i, o) {
  return un(), _l(o), t.flags |= 256, fe(e, t, n, i), t.child;
}
var Go = { dehydrated: null, treeContext: null, retryLane: 0 };
function Qo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function cc(e, t, n) {
  var i = t.pendingProps, o = U.current, l = !1, s = (t.flags & 128) !== 0, a;
  if ((a = s) || (a = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0), a ? (l = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (o |= 1), O(U, o & 1), e === null)
    return Ao(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = i.children, e = i.fallback, l ? (i = t.mode, l = t.child, s = { mode: "hidden", children: s }, !(i & 1) && l !== null ? (l.childLanes = 0, l.pendingProps = s) : l = Ti(s, i, 0, null), e = Ft(e, i, n, null), l.return = t, e.return = t, l.sibling = e, t.child = l, t.child.memoizedState = Qo(n), t.memoizedState = Go, e) : Ul(t, s));
  if (o = e.memoizedState, o !== null && (a = o.dehydrated, a !== null)) return Vf(e, t, s, i, a, o, n);
  if (l) {
    l = i.fallback, s = t.mode, o = e.child, a = o.sibling;
    var c = { mode: "hidden", children: i.children };
    return !(s & 1) && t.child !== o ? (i = t.child, i.childLanes = 0, i.pendingProps = c, t.deletions = null) : (i = vt(o, c), i.subtreeFlags = o.subtreeFlags & 14680064), a !== null ? l = vt(a, l) : (l = Ft(l, s, n, null), l.flags |= 2), l.return = t, i.return = t, i.sibling = l, t.child = i, i = l, l = t.child, s = e.child.memoizedState, s = s === null ? Qo(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, l.memoizedState = s, l.childLanes = e.childLanes & ~n, t.memoizedState = Go, i;
  }
  return l = e.child, e = l.sibling, i = vt(l, { mode: "visible", children: i.children }), !(t.mode & 1) && (i.lanes = n), i.return = t, i.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = i, t.memoizedState = null, i;
}
function Ul(e, t) {
  return t = Ti({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Rr(e, t, n, i) {
  return i !== null && _l(i), fn(t, e.child, null, n), e = Ul(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Vf(e, t, n, i, o, l, s) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, i = no(Error(z(422))), Rr(e, t, s, i)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (l = i.fallback, o = t.mode, i = Ti({ mode: "visible", children: i.children }, o, 0, null), l = Ft(l, o, s, null), l.flags |= 2, i.return = t, l.return = t, i.sibling = l, t.child = i, t.mode & 1 && fn(t, e.child, null, s), t.child.memoizedState = Qo(s), t.memoizedState = Go, l);
  if (!(t.mode & 1)) return Rr(e, t, s, null);
  if (o.data === "$!") {
    if (i = o.nextSibling && o.nextSibling.dataset, i) var a = i.dgst;
    return i = a, l = Error(z(419)), i = no(l, i, void 0), Rr(e, t, s, i);
  }
  if (a = (s & e.childLanes) !== 0, xe || a) {
    if (i = re, i !== null) {
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
      o = o & (i.suspendedLanes | s) ? 0 : o, o !== 0 && o !== l.retryLane && (l.retryLane = o, nt(e, o), We(i, e, o, -1));
    }
    return ql(), i = no(Error(z(421))), Rr(e, t, s, i);
  }
  return o.data === "$?" ? (t.flags |= 128, t.child = e.child, t = rp.bind(null, e), o._reactRetry = t, null) : (e = l.treeContext, Ce = gt(o.nextSibling), ze = t, V = !0, Ae = null, e !== null && (Ie[_e++] = qe, Ie[_e++] = Ze, Ie[_e++] = Nt, qe = e.id, Ze = e.overflow, Nt = t), t = Ul(t, i.children), t.flags |= 4096, t);
}
function ia(e, t, n) {
  e.lanes |= t;
  var i = e.alternate;
  i !== null && (i.lanes |= t), Oo(e.return, t, n);
}
function ro(e, t, n, i, o) {
  var l = e.memoizedState;
  l === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: i, tail: n, tailMode: o } : (l.isBackwards = t, l.rendering = null, l.renderingStartTime = 0, l.last = i, l.tail = n, l.tailMode = o);
}
function uc(e, t, n) {
  var i = t.pendingProps, o = i.revealOrder, l = i.tail;
  if (fe(e, t, i.children, n), i = U.current, i & 2) i = i & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && ia(e, n, t);
      else if (e.tag === 19) ia(e, n, t);
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
  if (O(U, i), !(t.mode & 1)) t.memoizedState = null;
  else switch (o) {
    case "forwards":
      for (n = t.child, o = null; n !== null; ) e = n.alternate, e !== null && ai(e) === null && (o = n), n = n.sibling;
      n = o, n === null ? (o = t.child, t.child = null) : (o = n.sibling, n.sibling = null), ro(t, !1, o, n, l);
      break;
    case "backwards":
      for (n = null, o = t.child, t.child = null; o !== null; ) {
        if (e = o.alternate, e !== null && ai(e) === null) {
          t.child = o;
          break;
        }
        e = o.sibling, o.sibling = n, n = o, o = e;
      }
      ro(t, !0, n, null, l);
      break;
    case "together":
      ro(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Wr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function rt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Dt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(z(153));
  if (t.child !== null) {
    for (e = t.child, n = vt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = vt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Uf(e, t, n) {
  switch (t.tag) {
    case 3:
      dc(t), un();
      break;
    case 5:
      Ld(t);
      break;
    case 1:
      we(t.type) && ni(t);
      break;
    case 4:
      Ll(t, t.stateNode.containerInfo);
      break;
    case 10:
      var i = t.type._context, o = t.memoizedProps.value;
      O(oi, i._currentValue), i._currentValue = o;
      break;
    case 13:
      if (i = t.memoizedState, i !== null)
        return i.dehydrated !== null ? (O(U, U.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? cc(e, t, n) : (O(U, U.current & 1), e = rt(e, t, n), e !== null ? e.sibling : null);
      O(U, U.current & 1);
      break;
    case 19:
      if (i = (n & t.childLanes) !== 0, e.flags & 128) {
        if (i) return uc(e, t, n);
        t.flags |= 128;
      }
      if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), O(U, U.current), i) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, sc(e, t, n);
  }
  return rt(e, t, n);
}
var fc, Yo, pc, hc;
fc = function(e, t) {
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
Yo = function() {
};
pc = function(e, t, n, i) {
  var o = e.memoizedProps;
  if (o !== i) {
    e = t.stateNode, Pt(Ye.current);
    var l = null;
    switch (n) {
      case "input":
        o = mo(e, o), i = mo(e, i), l = [];
        break;
      case "select":
        o = Q({}, o, { value: void 0 }), i = Q({}, i, { value: void 0 }), l = [];
        break;
      case "textarea":
        o = vo(e, o), i = vo(e, i), l = [];
        break;
      default:
        typeof o.onClick != "function" && typeof i.onClick == "function" && (e.onclick = ei);
    }
    ko(n, i);
    var s;
    n = null;
    for (d in o) if (!i.hasOwnProperty(d) && o.hasOwnProperty(d) && o[d] != null) if (d === "style") {
      var a = o[d];
      for (s in a) a.hasOwnProperty(s) && (n || (n = {}), n[s] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Un.hasOwnProperty(d) ? l || (l = []) : (l = l || []).push(d, null));
    for (d in i) {
      var c = i[d];
      if (a = o?.[d], i.hasOwnProperty(d) && c !== a && (c != null || a != null)) if (d === "style") if (a) {
        for (s in a) !a.hasOwnProperty(s) || c && c.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
        for (s in c) c.hasOwnProperty(s) && a[s] !== c[s] && (n || (n = {}), n[s] = c[s]);
      } else n || (l || (l = []), l.push(
        d,
        n
      )), n = c;
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, a = a ? a.__html : void 0, c != null && a !== c && (l = l || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (l = l || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Un.hasOwnProperty(d) ? (c != null && d === "onScroll" && W("scroll", e), l || a === c || (l = [])) : (l = l || []).push(d, c));
    }
    n && (l = l || []).push("style", n);
    var d = l;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
hc = function(e, t, n, i) {
  n !== i && (t.flags |= 4);
};
function Tn(e, t) {
  if (!V) switch (e.tailMode) {
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
function ae(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, i = 0;
  if (t) for (var o = e.child; o !== null; ) n |= o.lanes | o.childLanes, i |= o.subtreeFlags & 14680064, i |= o.flags & 14680064, o.return = e, o = o.sibling;
  else for (o = e.child; o !== null; ) n |= o.lanes | o.childLanes, i |= o.subtreeFlags, i |= o.flags, o.return = e, o = o.sibling;
  return e.subtreeFlags |= i, e.childLanes = n, t;
}
function Gf(e, t, n) {
  var i = t.pendingProps;
  switch (Il(t), t.tag) {
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
      return ae(t), null;
    case 1:
      return we(t.type) && ti(), ae(t), null;
    case 3:
      return i = t.stateNode, pn(), H(ve), H(ce), Al(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (zr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ae !== null && (nl(Ae), Ae = null))), Yo(e, t), ae(t), null;
    case 5:
      Dl(t);
      var o = Pt(rr.current);
      if (n = t.type, e !== null && t.stateNode != null) pc(e, t, n, i, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!i) {
          if (t.stateNode === null) throw Error(z(166));
          return ae(t), null;
        }
        if (e = Pt(Ye.current), zr(t)) {
          i = t.stateNode, n = t.type;
          var l = t.memoizedProps;
          switch (i[Ge] = t, i[tr] = l, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              W("cancel", i), W("close", i);
              break;
            case "iframe":
            case "object":
            case "embed":
              W("load", i);
              break;
            case "video":
            case "audio":
              for (o = 0; o < $n.length; o++) W($n[o], i);
              break;
            case "source":
              W("error", i);
              break;
            case "img":
            case "image":
            case "link":
              W(
                "error",
                i
              ), W("load", i);
              break;
            case "details":
              W("toggle", i);
              break;
            case "input":
              ps(i, l), W("invalid", i);
              break;
            case "select":
              i._wrapperState = { wasMultiple: !!l.multiple }, W("invalid", i);
              break;
            case "textarea":
              gs(i, l), W("invalid", i);
          }
          ko(n, l), o = null;
          for (var s in l) if (l.hasOwnProperty(s)) {
            var a = l[s];
            s === "children" ? typeof a == "string" ? i.textContent !== a && (l.suppressHydrationWarning !== !0 && Cr(i.textContent, a, e), o = ["children", a]) : typeof a == "number" && i.textContent !== "" + a && (l.suppressHydrationWarning !== !0 && Cr(
              i.textContent,
              a,
              e
            ), o = ["children", "" + a]) : Un.hasOwnProperty(s) && a != null && s === "onScroll" && W("scroll", i);
          }
          switch (n) {
            case "input":
              yr(i), hs(i, l, !0);
              break;
            case "textarea":
              yr(i), ms(i);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof l.onClick == "function" && (i.onclick = ei);
          }
          i = o, t.updateQueue = i, i !== null && (t.flags |= 4);
        } else {
          s = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ha(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = s.createElement(n, { is: i.is }) : (e = s.createElement(n), n === "select" && (s = e, i.multiple ? s.multiple = !0 : i.size && (s.size = i.size))) : e = s.createElementNS(e, n), e[Ge] = t, e[tr] = i, fc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (s = bo(n, i), n) {
              case "dialog":
                W("cancel", e), W("close", e), o = i;
                break;
              case "iframe":
              case "object":
              case "embed":
                W("load", e), o = i;
                break;
              case "video":
              case "audio":
                for (o = 0; o < $n.length; o++) W($n[o], e);
                o = i;
                break;
              case "source":
                W("error", e), o = i;
                break;
              case "img":
              case "image":
              case "link":
                W(
                  "error",
                  e
                ), W("load", e), o = i;
                break;
              case "details":
                W("toggle", e), o = i;
                break;
              case "input":
                ps(e, i), o = mo(e, i), W("invalid", e);
                break;
              case "option":
                o = i;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!i.multiple }, o = Q({}, i, { value: void 0 }), W("invalid", e);
                break;
              case "textarea":
                gs(e, i), o = vo(e, i), W("invalid", e);
                break;
              default:
                o = i;
            }
            ko(n, o), a = o;
            for (l in a) if (a.hasOwnProperty(l)) {
              var c = a[l];
              l === "style" ? Ua(e, c) : l === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && Ba(e, c)) : l === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Gn(e, c) : typeof c == "number" && Gn(e, "" + c) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (Un.hasOwnProperty(l) ? c != null && l === "onScroll" && W("scroll", e) : c != null && gl(e, l, c, s));
            }
            switch (n) {
              case "input":
                yr(e), hs(e, i, !1);
                break;
              case "textarea":
                yr(e), ms(e);
                break;
              case "option":
                i.value != null && e.setAttribute("value", "" + wt(i.value));
                break;
              case "select":
                e.multiple = !!i.multiple, l = i.value, l != null ? nn(e, !!i.multiple, l, !1) : i.defaultValue != null && nn(
                  e,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                );
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = ei);
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
      return ae(t), null;
    case 6:
      if (e && t.stateNode != null) hc(e, t, e.memoizedProps, i);
      else {
        if (typeof i != "string" && t.stateNode === null) throw Error(z(166));
        if (n = Pt(rr.current), Pt(Ye.current), zr(t)) {
          if (i = t.stateNode, n = t.memoizedProps, i[Ge] = t, (l = i.nodeValue !== n) && (e = ze, e !== null)) switch (e.tag) {
            case 3:
              Cr(i.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Cr(i.nodeValue, n, (e.mode & 1) !== 0);
          }
          l && (t.flags |= 4);
        } else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[Ge] = t, t.stateNode = i;
      }
      return ae(t), null;
    case 13:
      if (H(U), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (V && Ce !== null && t.mode & 1 && !(t.flags & 128)) Pd(), un(), t.flags |= 98560, l = !1;
        else if (l = zr(t), i !== null && i.dehydrated !== null) {
          if (e === null) {
            if (!l) throw Error(z(318));
            if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(z(317));
            l[Ge] = t;
          } else un(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ae(t), l = !1;
        } else Ae !== null && (nl(Ae), Ae = null), l = !0;
        if (!l) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || U.current & 1 ? te === 0 && (te = 3) : ql())), t.updateQueue !== null && (t.flags |= 4), ae(t), null);
    case 4:
      return pn(), Yo(e, t), e === null && Jn(t.stateNode.containerInfo), ae(t), null;
    case 10:
      return Fl(t.type._context), ae(t), null;
    case 17:
      return we(t.type) && ti(), ae(t), null;
    case 19:
      if (H(U), l = t.memoizedState, l === null) return ae(t), null;
      if (i = (t.flags & 128) !== 0, s = l.rendering, s === null) if (i) Tn(l, !1);
      else {
        if (te !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (s = ai(e), s !== null) {
            for (t.flags |= 128, Tn(l, !1), i = s.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = n, n = t.child; n !== null; ) l = n, e = i, l.flags &= 14680066, s = l.alternate, s === null ? (l.childLanes = 0, l.lanes = e, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = s.childLanes, l.lanes = s.lanes, l.child = s.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = s.memoizedProps, l.memoizedState = s.memoizedState, l.updateQueue = s.updateQueue, l.type = s.type, e = s.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return O(U, U.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        l.tail !== null && X() > gn && (t.flags |= 128, i = !0, Tn(l, !1), t.lanes = 4194304);
      }
      else {
        if (!i) if (e = ai(s), e !== null) {
          if (t.flags |= 128, i = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Tn(l, !0), l.tail === null && l.tailMode === "hidden" && !s.alternate && !V) return ae(t), null;
        } else 2 * X() - l.renderingStartTime > gn && n !== 1073741824 && (t.flags |= 128, i = !0, Tn(l, !1), t.lanes = 4194304);
        l.isBackwards ? (s.sibling = t.child, t.child = s) : (n = l.last, n !== null ? n.sibling = s : t.child = s, l.last = s);
      }
      return l.tail !== null ? (t = l.tail, l.rendering = t, l.tail = t.sibling, l.renderingStartTime = X(), t.sibling = null, n = U.current, O(U, i ? n & 1 | 2 : n & 1), t) : (ae(t), null);
    case 22:
    case 23:
      return Xl(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? Se & 1073741824 && (ae(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ae(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(z(156, t.tag));
}
function Qf(e, t) {
  switch (Il(t), t.tag) {
    case 1:
      return we(t.type) && ti(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return pn(), H(ve), H(ce), Al(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Dl(t), null;
    case 13:
      if (H(U), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(z(340));
        un();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return H(U), null;
    case 4:
      return pn(), null;
    case 10:
      return Fl(t.type._context), null;
    case 22:
    case 23:
      return Xl(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Mr = !1, de = !1, Yf = typeof WeakSet == "function" ? WeakSet : Set, M = null;
function en(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (i) {
    Y(e, t, i);
  }
  else n.current = null;
}
function Ko(e, t, n) {
  try {
    n();
  } catch (i) {
    Y(e, t, i);
  }
}
var oa = !1;
function Kf(e, t) {
  if (Po = qr, e = vd(), Rl(e)) {
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
        var s = 0, a = -1, c = -1, d = 0, u = 0, p = e, g = null;
        t: for (; ; ) {
          for (var v; p !== n || o !== 0 && p.nodeType !== 3 || (a = s + o), p !== l || i !== 0 && p.nodeType !== 3 || (c = s + i), p.nodeType === 3 && (s += p.nodeValue.length), (v = p.firstChild) !== null; )
            g = p, p = v;
          for (; ; ) {
            if (p === e) break t;
            if (g === n && ++d === o && (a = s), g === l && ++u === i && (c = s), (v = p.nextSibling) !== null) break;
            p = g, g = p.parentNode;
          }
          p = v;
        }
        n = a === -1 || c === -1 ? null : { start: a, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Eo = { focusedElem: e, selectionRange: n }, qr = !1, M = t; M !== null; ) if (t = M, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, M = e;
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
            var f = w.memoizedProps, b = w.memoizedState, y = t.stateNode, h = y.getSnapshotBeforeUpdate(t.elementType === t.type ? f : Le(t.type, f), b);
            y.__reactInternalSnapshotBeforeUpdate = h;
          }
          break;
        case 3:
          var m = t.stateNode.containerInfo;
          m.nodeType === 1 ? m.textContent = "" : m.nodeType === 9 && m.documentElement && m.removeChild(m.documentElement);
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
      Y(t, t.return, x);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, M = e;
      break;
    }
    M = t.return;
  }
  return w = oa, oa = !1, w;
}
function Hn(e, t, n) {
  var i = t.updateQueue;
  if (i = i !== null ? i.lastEffect : null, i !== null) {
    var o = i = i.next;
    do {
      if ((o.tag & e) === e) {
        var l = o.destroy;
        o.destroy = void 0, l !== void 0 && Ko(t, n, l);
      }
      o = o.next;
    } while (o !== i);
  }
}
function Ci(e, t) {
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
function Xo(e) {
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
function gc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, gc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ge], delete t[tr], delete t[No], delete t[_f], delete t[Pf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function mc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function la(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || mc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function qo(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ei));
  else if (i !== 4 && (e = e.child, e !== null)) for (qo(e, t, n), e = e.sibling; e !== null; ) qo(e, t, n), e = e.sibling;
}
function Zo(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (i !== 4 && (e = e.child, e !== null)) for (Zo(e, t, n), e = e.sibling; e !== null; ) Zo(e, t, n), e = e.sibling;
}
var ie = null, De = !1;
function ot(e, t, n) {
  for (n = n.child; n !== null; ) yc(e, t, n), n = n.sibling;
}
function yc(e, t, n) {
  if (Qe && typeof Qe.onCommitFiberUnmount == "function") try {
    Qe.onCommitFiberUnmount(yi, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      de || en(n, t);
    case 6:
      var i = ie, o = De;
      ie = null, ot(e, t, n), ie = i, De = o, ie !== null && (De ? (e = ie, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ie.removeChild(n.stateNode));
      break;
    case 18:
      ie !== null && (De ? (e = ie, n = n.stateNode, e.nodeType === 8 ? Xi(e.parentNode, n) : e.nodeType === 1 && Xi(e, n), Xn(e)) : Xi(ie, n.stateNode));
      break;
    case 4:
      i = ie, o = De, ie = n.stateNode.containerInfo, De = !0, ot(e, t, n), ie = i, De = o;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!de && (i = n.updateQueue, i !== null && (i = i.lastEffect, i !== null))) {
        o = i = i.next;
        do {
          var l = o, s = l.destroy;
          l = l.tag, s !== void 0 && (l & 2 || l & 4) && Ko(n, t, s), o = o.next;
        } while (o !== i);
      }
      ot(e, t, n);
      break;
    case 1:
      if (!de && (en(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function")) try {
        i.props = n.memoizedProps, i.state = n.memoizedState, i.componentWillUnmount();
      } catch (a) {
        Y(n, t, a);
      }
      ot(e, t, n);
      break;
    case 21:
      ot(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (de = (i = de) || n.memoizedState !== null, ot(e, t, n), de = i) : ot(e, t, n);
      break;
    default:
      ot(e, t, n);
  }
}
function sa(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Yf()), t.forEach(function(i) {
      var o = ip.bind(null, e, i);
      n.has(i) || (n.add(i), i.then(o, o));
    });
  }
}
function Ne(e, t) {
  var n = t.deletions;
  if (n !== null) for (var i = 0; i < n.length; i++) {
    var o = n[i];
    try {
      var l = e, s = t, a = s;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            ie = a.stateNode, De = !1;
            break e;
          case 3:
            ie = a.stateNode.containerInfo, De = !0;
            break e;
          case 4:
            ie = a.stateNode.containerInfo, De = !0;
            break e;
        }
        a = a.return;
      }
      if (ie === null) throw Error(z(160));
      yc(l, s, o), ie = null, De = !1;
      var c = o.alternate;
      c !== null && (c.return = null), o.return = null;
    } catch (d) {
      Y(o, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) xc(t, e), t = t.sibling;
}
function xc(e, t) {
  var n = e.alternate, i = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Ne(t, e), Ve(e), i & 4) {
        try {
          Hn(3, e, e.return), Ci(3, e);
        } catch (f) {
          Y(e, e.return, f);
        }
        try {
          Hn(5, e, e.return);
        } catch (f) {
          Y(e, e.return, f);
        }
      }
      break;
    case 1:
      Ne(t, e), Ve(e), i & 512 && n !== null && en(n, n.return);
      break;
    case 5:
      if (Ne(t, e), Ve(e), i & 512 && n !== null && en(n, n.return), e.flags & 32) {
        var o = e.stateNode;
        try {
          Gn(o, "");
        } catch (f) {
          Y(e, e.return, f);
        }
      }
      if (i & 4 && (o = e.stateNode, o != null)) {
        var l = e.memoizedProps, s = n !== null ? n.memoizedProps : l, a = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          a === "input" && l.type === "radio" && l.name != null && Oa(o, l), bo(a, s);
          var d = bo(a, l);
          for (s = 0; s < c.length; s += 2) {
            var u = c[s], p = c[s + 1];
            u === "style" ? Ua(o, p) : u === "dangerouslySetInnerHTML" ? Ba(o, p) : u === "children" ? Gn(o, p) : gl(o, u, p, d);
          }
          switch (a) {
            case "input":
              yo(o, l);
              break;
            case "textarea":
              Wa(o, l);
              break;
            case "select":
              var g = o._wrapperState.wasMultiple;
              o._wrapperState.wasMultiple = !!l.multiple;
              var v = l.value;
              v != null ? nn(o, !!l.multiple, v, !1) : g !== !!l.multiple && (l.defaultValue != null ? nn(
                o,
                !!l.multiple,
                l.defaultValue,
                !0
              ) : nn(o, !!l.multiple, l.multiple ? [] : "", !1));
          }
          o[tr] = l;
        } catch (f) {
          Y(e, e.return, f);
        }
      }
      break;
    case 6:
      if (Ne(t, e), Ve(e), i & 4) {
        if (e.stateNode === null) throw Error(z(162));
        o = e.stateNode, l = e.memoizedProps;
        try {
          o.nodeValue = l;
        } catch (f) {
          Y(e, e.return, f);
        }
      }
      break;
    case 3:
      if (Ne(t, e), Ve(e), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Xn(t.containerInfo);
      } catch (f) {
        Y(e, e.return, f);
      }
      break;
    case 4:
      Ne(t, e), Ve(e);
      break;
    case 13:
      Ne(t, e), Ve(e), o = e.child, o.flags & 8192 && (l = o.memoizedState !== null, o.stateNode.isHidden = l, !l || o.alternate !== null && o.alternate.memoizedState !== null || (Yl = X())), i & 4 && sa(e);
      break;
    case 22:
      if (u = n !== null && n.memoizedState !== null, e.mode & 1 ? (de = (d = de) || u, Ne(t, e), de = d) : Ne(t, e), Ve(e), i & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !u && e.mode & 1) for (M = e, u = e.child; u !== null; ) {
          for (p = M = u; M !== null; ) {
            switch (g = M, v = g.child, g.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Hn(4, g, g.return);
                break;
              case 1:
                en(g, g.return);
                var w = g.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  i = g, n = g.return;
                  try {
                    t = i, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (f) {
                    Y(i, n, f);
                  }
                }
                break;
              case 5:
                en(g, g.return);
                break;
              case 22:
                if (g.memoizedState !== null) {
                  da(p);
                  continue;
                }
            }
            v !== null ? (v.return = g, M = v) : da(p);
          }
          u = u.sibling;
        }
        e: for (u = null, p = e; ; ) {
          if (p.tag === 5) {
            if (u === null) {
              u = p;
              try {
                o = p.stateNode, d ? (l = o.style, typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none") : (a = p.stateNode, c = p.memoizedProps.style, s = c != null && c.hasOwnProperty("display") ? c.display : null, a.style.display = Va("display", s));
              } catch (f) {
                Y(e, e.return, f);
              }
            }
          } else if (p.tag === 6) {
            if (u === null) try {
              p.stateNode.nodeValue = d ? "" : p.memoizedProps;
            } catch (f) {
              Y(e, e.return, f);
            }
          } else if ((p.tag !== 22 && p.tag !== 23 || p.memoizedState === null || p === e) && p.child !== null) {
            p.child.return = p, p = p.child;
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            u === p && (u = null), p = p.return;
          }
          u === p && (u = null), p.sibling.return = p.return, p = p.sibling;
        }
      }
      break;
    case 19:
      Ne(t, e), Ve(e), i & 4 && sa(e);
      break;
    case 21:
      break;
    default:
      Ne(
        t,
        e
      ), Ve(e);
  }
}
function Ve(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (mc(n)) {
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
          i.flags & 32 && (Gn(o, ""), i.flags &= -33);
          var l = la(e);
          Zo(e, l, o);
          break;
        case 3:
        case 4:
          var s = i.stateNode.containerInfo, a = la(e);
          qo(e, a, s);
          break;
        default:
          throw Error(z(161));
      }
    } catch (c) {
      Y(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Xf(e, t, n) {
  M = e, vc(e);
}
function vc(e, t, n) {
  for (var i = (e.mode & 1) !== 0; M !== null; ) {
    var o = M, l = o.child;
    if (o.tag === 22 && i) {
      var s = o.memoizedState !== null || Mr;
      if (!s) {
        var a = o.alternate, c = a !== null && a.memoizedState !== null || de;
        a = Mr;
        var d = de;
        if (Mr = s, (de = c) && !d) for (M = o; M !== null; ) s = M, c = s.child, s.tag === 22 && s.memoizedState !== null ? ca(o) : c !== null ? (c.return = s, M = c) : ca(o);
        for (; l !== null; ) M = l, vc(l), l = l.sibling;
        M = o, Mr = a, de = d;
      }
      aa(e);
    } else o.subtreeFlags & 8772 && l !== null ? (l.return = o, M = l) : aa(e);
  }
}
function aa(e) {
  for (; M !== null; ) {
    var t = M;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            de || Ci(5, t);
            break;
          case 1:
            var i = t.stateNode;
            if (t.flags & 4 && !de) if (n === null) i.componentDidMount();
            else {
              var o = t.elementType === t.type ? n.memoizedProps : Le(t.type, n.memoizedProps);
              i.componentDidUpdate(o, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
            }
            var l = t.updateQueue;
            l !== null && Gs(t, l, i);
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
              Gs(t, s, n);
            }
            break;
          case 5:
            var a = t.stateNode;
            if (n === null && t.flags & 4) {
              n = a;
              var c = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  c.autoFocus && n.focus();
                  break;
                case "img":
                  c.src && (n.src = c.src);
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
              var d = t.alternate;
              if (d !== null) {
                var u = d.memoizedState;
                if (u !== null) {
                  var p = u.dehydrated;
                  p !== null && Xn(p);
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
        de || t.flags & 512 && Xo(t);
      } catch (g) {
        Y(t, t.return, g);
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
function da(e) {
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
function ca(e) {
  for (; M !== null; ) {
    var t = M;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Ci(4, t);
          } catch (c) {
            Y(t, n, c);
          }
          break;
        case 1:
          var i = t.stateNode;
          if (typeof i.componentDidMount == "function") {
            var o = t.return;
            try {
              i.componentDidMount();
            } catch (c) {
              Y(t, o, c);
            }
          }
          var l = t.return;
          try {
            Xo(t);
          } catch (c) {
            Y(t, l, c);
          }
          break;
        case 5:
          var s = t.return;
          try {
            Xo(t);
          } catch (c) {
            Y(t, s, c);
          }
      }
    } catch (c) {
      Y(t, t.return, c);
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
var qf = Math.ceil, ui = it.ReactCurrentDispatcher, Gl = it.ReactCurrentOwner, Ee = it.ReactCurrentBatchConfig, N = 0, re = null, J = null, oe = 0, Se = 0, tn = jt(0), te = 0, sr = null, Dt = 0, zi = 0, Ql = 0, Bn = null, ye = null, Yl = 0, gn = 1 / 0, Ke = null, fi = !1, Jo = null, yt = null, Ir = !1, ut = null, pi = 0, Vn = 0, el = null, Hr = -1, Br = 0;
function pe() {
  return N & 6 ? X() : Hr !== -1 ? Hr : Hr = X();
}
function xt(e) {
  return e.mode & 1 ? N & 2 && oe !== 0 ? oe & -oe : Ff.transition !== null ? (Br === 0 && (Br = rd()), Br) : (e = L, e !== 0 || (e = window.event, e = e === void 0 ? 16 : cd(e.type)), e) : 1;
}
function We(e, t, n, i) {
  if (50 < Vn) throw Vn = 0, el = null, Error(z(185));
  dr(e, n, i), (!(N & 2) || e !== re) && (e === re && (!(N & 2) && (zi |= n), te === 4 && dt(e, oe)), ke(e, i), n === 1 && N === 0 && !(t.mode & 1) && (gn = X() + 500, bi && St()));
}
function ke(e, t) {
  var n = e.callbackNode;
  Eu(e, t);
  var i = Xr(e, e === re ? oe : 0);
  if (i === 0) n !== null && vs(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = i & -i, e.callbackPriority !== t) {
    if (n != null && vs(n), t === 1) e.tag === 0 ? Ef(ua.bind(null, e)) : Md(ua.bind(null, e)), Mf(function() {
      !(N & 6) && St();
    }), n = null;
    else {
      switch (id(i)) {
        case 1:
          n = wl;
          break;
        case 4:
          n = td;
          break;
        case 16:
          n = Kr;
          break;
        case 536870912:
          n = nd;
          break;
        default:
          n = Kr;
      }
      n = Tc(n, wc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function wc(e, t) {
  if (Hr = -1, Br = 0, N & 6) throw Error(z(327));
  var n = e.callbackNode;
  if (an() && e.callbackNode !== n) return null;
  var i = Xr(e, e === re ? oe : 0);
  if (i === 0) return null;
  if (i & 30 || i & e.expiredLanes || t) t = hi(e, i);
  else {
    t = i;
    var o = N;
    N |= 2;
    var l = bc();
    (re !== e || oe !== t) && (Ke = null, gn = X() + 500, Et(e, t));
    do
      try {
        ep();
        break;
      } catch (a) {
        kc(e, a);
      }
    while (!0);
    El(), ui.current = l, N = o, J !== null ? t = 0 : (re = null, oe = 0, t = te);
  }
  if (t !== 0) {
    if (t === 2 && (o = To(e), o !== 0 && (i = o, t = tl(e, o))), t === 1) throw n = sr, Et(e, 0), dt(e, i), ke(e, X()), n;
    if (t === 6) dt(e, i);
    else {
      if (o = e.current.alternate, !(i & 30) && !Zf(o) && (t = hi(e, i), t === 2 && (l = To(e), l !== 0 && (i = l, t = tl(e, l))), t === 1)) throw n = sr, Et(e, 0), dt(e, i), ke(e, X()), n;
      switch (e.finishedWork = o, e.finishedLanes = i, t) {
        case 0:
        case 1:
          throw Error(z(345));
        case 2:
          Mt(e, ye, Ke);
          break;
        case 3:
          if (dt(e, i), (i & 130023424) === i && (t = Yl + 500 - X(), 10 < t)) {
            if (Xr(e, 0) !== 0) break;
            if (o = e.suspendedLanes, (o & i) !== i) {
              pe(), e.pingedLanes |= e.suspendedLanes & o;
              break;
            }
            e.timeoutHandle = $o(Mt.bind(null, e, ye, Ke), t);
            break;
          }
          Mt(e, ye, Ke);
          break;
        case 4:
          if (dt(e, i), (i & 4194240) === i) break;
          for (t = e.eventTimes, o = -1; 0 < i; ) {
            var s = 31 - Oe(i);
            l = 1 << s, s = t[s], s > o && (o = s), i &= ~l;
          }
          if (i = o, i = X() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * qf(i / 1960)) - i, 10 < i) {
            e.timeoutHandle = $o(Mt.bind(null, e, ye, Ke), i);
            break;
          }
          Mt(e, ye, Ke);
          break;
        case 5:
          Mt(e, ye, Ke);
          break;
        default:
          throw Error(z(329));
      }
    }
  }
  return ke(e, X()), e.callbackNode === n ? wc.bind(null, e) : null;
}
function tl(e, t) {
  var n = Bn;
  return e.current.memoizedState.isDehydrated && (Et(e, t).flags |= 256), e = hi(e, t), e !== 2 && (t = ye, ye = n, t !== null && nl(t)), e;
}
function nl(e) {
  ye === null ? ye = e : ye.push.apply(ye, e);
}
function Zf(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var i = 0; i < n.length; i++) {
        var o = n[i], l = o.getSnapshot;
        o = o.value;
        try {
          if (!He(l(), o)) return !1;
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
function dt(e, t) {
  for (t &= ~Ql, t &= ~zi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Oe(t), i = 1 << n;
    e[n] = -1, t &= ~i;
  }
}
function ua(e) {
  if (N & 6) throw Error(z(327));
  an();
  var t = Xr(e, 0);
  if (!(t & 1)) return ke(e, X()), null;
  var n = hi(e, t);
  if (e.tag !== 0 && n === 2) {
    var i = To(e);
    i !== 0 && (t = i, n = tl(e, i));
  }
  if (n === 1) throw n = sr, Et(e, 0), dt(e, t), ke(e, X()), n;
  if (n === 6) throw Error(z(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Mt(e, ye, Ke), ke(e, X()), null;
}
function Kl(e, t) {
  var n = N;
  N |= 1;
  try {
    return e(t);
  } finally {
    N = n, N === 0 && (gn = X() + 500, bi && St());
  }
}
function At(e) {
  ut !== null && ut.tag === 0 && !(N & 6) && an();
  var t = N;
  N |= 1;
  var n = Ee.transition, i = L;
  try {
    if (Ee.transition = null, L = 1, e) return e();
  } finally {
    L = i, Ee.transition = n, N = t, !(N & 6) && St();
  }
}
function Xl() {
  Se = tn.current, H(tn);
}
function Et(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Rf(n)), J !== null) for (n = J.return; n !== null; ) {
    var i = n;
    switch (Il(i), i.tag) {
      case 1:
        i = i.type.childContextTypes, i != null && ti();
        break;
      case 3:
        pn(), H(ve), H(ce), Al();
        break;
      case 5:
        Dl(i);
        break;
      case 4:
        pn();
        break;
      case 13:
        H(U);
        break;
      case 19:
        H(U);
        break;
      case 10:
        Fl(i.type._context);
        break;
      case 22:
      case 23:
        Xl();
    }
    n = n.return;
  }
  if (re = e, J = e = vt(e.current, null), oe = Se = t, te = 0, sr = null, Ql = zi = Dt = 0, ye = Bn = null, _t !== null) {
    for (t = 0; t < _t.length; t++) if (n = _t[t], i = n.interleaved, i !== null) {
      n.interleaved = null;
      var o = i.next, l = n.pending;
      if (l !== null) {
        var s = l.next;
        l.next = o, i.next = s;
      }
      n.pending = i;
    }
    _t = null;
  }
  return e;
}
function kc(e, t) {
  do {
    var n = J;
    try {
      if (El(), Ar.current = ci, di) {
        for (var i = G.memoizedState; i !== null; ) {
          var o = i.queue;
          o !== null && (o.pending = null), i = i.next;
        }
        di = !1;
      }
      if (Lt = 0, ne = ee = G = null, Wn = !1, ir = 0, Gl.current = null, n === null || n.return === null) {
        te = 1, sr = t, J = null;
        break;
      }
      e: {
        var l = e, s = n.return, a = n, c = t;
        if (t = oe, a.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var d = c, u = a, p = u.tag;
          if (!(u.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var g = u.alternate;
            g ? (u.updateQueue = g.updateQueue, u.memoizedState = g.memoizedState, u.lanes = g.lanes) : (u.updateQueue = null, u.memoizedState = null);
          }
          var v = Zs(s);
          if (v !== null) {
            v.flags &= -257, Js(v, s, a, l, t), v.mode & 1 && qs(l, d, t), t = v, c = d;
            var w = t.updateQueue;
            if (w === null) {
              var f = /* @__PURE__ */ new Set();
              f.add(c), t.updateQueue = f;
            } else w.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              qs(l, d, t), ql();
              break e;
            }
            c = Error(z(426));
          }
        } else if (V && a.mode & 1) {
          var b = Zs(s);
          if (b !== null) {
            !(b.flags & 65536) && (b.flags |= 256), Js(b, s, a, l, t), _l(hn(c, a));
            break e;
          }
        }
        l = c = hn(c, a), te !== 4 && (te = 2), Bn === null ? Bn = [l] : Bn.push(l), l = s;
        do {
          switch (l.tag) {
            case 3:
              l.flags |= 65536, t &= -t, l.lanes |= t;
              var y = ic(l, c, t);
              Us(l, y);
              break e;
            case 1:
              a = c;
              var h = l.type, m = l.stateNode;
              if (!(l.flags & 128) && (typeof h.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (yt === null || !yt.has(m)))) {
                l.flags |= 65536, t &= -t, l.lanes |= t;
                var x = oc(l, a, t);
                Us(l, x);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      Sc(n);
    } catch (k) {
      t = k, J === n && n !== null && (J = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function bc() {
  var e = ui.current;
  return ui.current = ci, e === null ? ci : e;
}
function ql() {
  (te === 0 || te === 3 || te === 2) && (te = 4), re === null || !(Dt & 268435455) && !(zi & 268435455) || dt(re, oe);
}
function hi(e, t) {
  var n = N;
  N |= 2;
  var i = bc();
  (re !== e || oe !== t) && (Ke = null, Et(e, t));
  do
    try {
      Jf();
      break;
    } catch (o) {
      kc(e, o);
    }
  while (!0);
  if (El(), N = n, ui.current = i, J !== null) throw Error(z(261));
  return re = null, oe = 0, te;
}
function Jf() {
  for (; J !== null; ) jc(J);
}
function ep() {
  for (; J !== null && !Su(); ) jc(J);
}
function jc(e) {
  var t = zc(e.alternate, e, Se);
  e.memoizedProps = e.pendingProps, t === null ? Sc(e) : J = t, Gl.current = null;
}
function Sc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Qf(n, t), n !== null) {
        n.flags &= 32767, J = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        te = 6, J = null;
        return;
      }
    } else if (n = Gf(n, t, Se), n !== null) {
      J = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      J = t;
      return;
    }
    J = t = e;
  } while (t !== null);
  te === 0 && (te = 5);
}
function Mt(e, t, n) {
  var i = L, o = Ee.transition;
  try {
    Ee.transition = null, L = 1, tp(e, t, n, i);
  } finally {
    Ee.transition = o, L = i;
  }
  return null;
}
function tp(e, t, n, i) {
  do
    an();
  while (ut !== null);
  if (N & 6) throw Error(z(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(z(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var l = n.lanes | n.childLanes;
  if (Fu(e, l), e === re && (J = re = null, oe = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Ir || (Ir = !0, Tc(Kr, function() {
    return an(), null;
  })), l = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || l) {
    l = Ee.transition, Ee.transition = null;
    var s = L;
    L = 1;
    var a = N;
    N |= 4, Gl.current = null, Kf(e, n), xc(n, e), kf(Eo), qr = !!Po, Eo = Po = null, e.current = n, Xf(n), Cu(), N = a, L = s, Ee.transition = l;
  } else e.current = n;
  if (Ir && (Ir = !1, ut = e, pi = o), l = e.pendingLanes, l === 0 && (yt = null), Ru(n.stateNode), ke(e, X()), t !== null) for (i = e.onRecoverableError, n = 0; n < t.length; n++) o = t[n], i(o.value, { componentStack: o.stack, digest: o.digest });
  if (fi) throw fi = !1, e = Jo, Jo = null, e;
  return pi & 1 && e.tag !== 0 && an(), l = e.pendingLanes, l & 1 ? e === el ? Vn++ : (Vn = 0, el = e) : Vn = 0, St(), null;
}
function an() {
  if (ut !== null) {
    var e = id(pi), t = Ee.transition, n = L;
    try {
      if (Ee.transition = null, L = 16 > e ? 16 : e, ut === null) var i = !1;
      else {
        if (e = ut, ut = null, pi = 0, N & 6) throw Error(z(331));
        var o = N;
        for (N |= 4, M = e.current; M !== null; ) {
          var l = M, s = l.child;
          if (M.flags & 16) {
            var a = l.deletions;
            if (a !== null) {
              for (var c = 0; c < a.length; c++) {
                var d = a[c];
                for (M = d; M !== null; ) {
                  var u = M;
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Hn(8, u, l);
                  }
                  var p = u.child;
                  if (p !== null) p.return = u, M = p;
                  else for (; M !== null; ) {
                    u = M;
                    var g = u.sibling, v = u.return;
                    if (gc(u), u === d) {
                      M = null;
                      break;
                    }
                    if (g !== null) {
                      g.return = v, M = g;
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
                    var b = f.sibling;
                    f.sibling = null, f = b;
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
                Hn(9, l, l.return);
            }
            var y = l.sibling;
            if (y !== null) {
              y.return = l.return, M = y;
              break e;
            }
            M = l.return;
          }
        }
        var h = e.current;
        for (M = h; M !== null; ) {
          s = M;
          var m = s.child;
          if (s.subtreeFlags & 2064 && m !== null) m.return = s, M = m;
          else e: for (s = h; M !== null; ) {
            if (a = M, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Ci(9, a);
              }
            } catch (k) {
              Y(a, a.return, k);
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
        if (N = o, St(), Qe && typeof Qe.onPostCommitFiberRoot == "function") try {
          Qe.onPostCommitFiberRoot(yi, e);
        } catch {
        }
        i = !0;
      }
      return i;
    } finally {
      L = n, Ee.transition = t;
    }
  }
  return !1;
}
function fa(e, t, n) {
  t = hn(n, t), t = ic(e, t, 1), e = mt(e, t, 1), t = pe(), e !== null && (dr(e, 1, t), ke(e, t));
}
function Y(e, t, n) {
  if (e.tag === 3) fa(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      fa(t, e, n);
      break;
    } else if (t.tag === 1) {
      var i = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (yt === null || !yt.has(i))) {
        e = hn(n, e), e = oc(t, e, 1), t = mt(t, e, 1), e = pe(), t !== null && (dr(t, 1, e), ke(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function np(e, t, n) {
  var i = e.pingCache;
  i !== null && i.delete(t), t = pe(), e.pingedLanes |= e.suspendedLanes & n, re === e && (oe & n) === n && (te === 4 || te === 3 && (oe & 130023424) === oe && 500 > X() - Yl ? Et(e, 0) : Ql |= n), ke(e, t);
}
function Cc(e, t) {
  t === 0 && (e.mode & 1 ? (t = wr, wr <<= 1, !(wr & 130023424) && (wr = 4194304)) : t = 1);
  var n = pe();
  e = nt(e, t), e !== null && (dr(e, t, n), ke(e, n));
}
function rp(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Cc(e, n);
}
function ip(e, t) {
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
  i !== null && i.delete(t), Cc(e, n);
}
var zc;
zc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ve.current) xe = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return xe = !1, Uf(e, t, n);
    xe = !!(e.flags & 131072);
  }
  else xe = !1, V && t.flags & 1048576 && Id(t, ii, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var i = t.type;
      Wr(e, t), e = t.pendingProps;
      var o = cn(t, ce.current);
      sn(t, n), o = Wl(null, t, i, e, o, n);
      var l = Hl();
      return t.flags |= 1, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, we(i) ? (l = !0, ni(t)) : l = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, Nl(t), o.updater = Si, t.stateNode = o, o._reactInternals = t, Ho(t, i, e, n), t = Uo(null, t, i, !0, l, n)) : (t.tag = 0, V && l && Ml(t), fe(null, t, o, n), t = t.child), t;
    case 16:
      i = t.elementType;
      e: {
        switch (Wr(e, t), e = t.pendingProps, o = i._init, i = o(i._payload), t.type = i, o = t.tag = lp(i), e = Le(i, e), o) {
          case 0:
            t = Vo(null, t, i, e, n);
            break e;
          case 1:
            t = na(null, t, i, e, n);
            break e;
          case 11:
            t = ea(null, t, i, e, n);
            break e;
          case 14:
            t = ta(null, t, i, Le(i.type, e), n);
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
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : Le(i, o), Vo(e, t, i, o, n);
    case 1:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : Le(i, o), na(e, t, i, o, n);
    case 3:
      e: {
        if (dc(t), e === null) throw Error(z(387));
        i = t.pendingProps, l = t.memoizedState, o = l.element, Nd(e, t), si(t, i, null, n);
        var s = t.memoizedState;
        if (i = s.element, l.isDehydrated) if (l = { element: i, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = l, t.memoizedState = l, t.flags & 256) {
          o = hn(Error(z(423)), t), t = ra(e, t, i, n, o);
          break e;
        } else if (i !== o) {
          o = hn(Error(z(424)), t), t = ra(e, t, i, n, o);
          break e;
        } else for (Ce = gt(t.stateNode.containerInfo.firstChild), ze = t, V = !0, Ae = null, n = Fd(t, null, i, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (un(), i === o) {
            t = rt(e, t, n);
            break e;
          }
          fe(e, t, i, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Ld(t), e === null && Ao(t), i = t.type, o = t.pendingProps, l = e !== null ? e.memoizedProps : null, s = o.children, Fo(i, o) ? s = null : l !== null && Fo(i, l) && (t.flags |= 32), ac(e, t), fe(e, t, s, n), t.child;
    case 6:
      return e === null && Ao(t), null;
    case 13:
      return cc(e, t, n);
    case 4:
      return Ll(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = fn(t, null, i, n) : fe(e, t, i, n), t.child;
    case 11:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : Le(i, o), ea(e, t, i, o, n);
    case 7:
      return fe(e, t, t.pendingProps, n), t.child;
    case 8:
      return fe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return fe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (i = t.type._context, o = t.pendingProps, l = t.memoizedProps, s = o.value, O(oi, i._currentValue), i._currentValue = s, l !== null) if (He(l.value, s)) {
          if (l.children === o.children && !ve.current) {
            t = rt(e, t, n);
            break e;
          }
        } else for (l = t.child, l !== null && (l.return = t); l !== null; ) {
          var a = l.dependencies;
          if (a !== null) {
            s = l.child;
            for (var c = a.firstContext; c !== null; ) {
              if (c.context === i) {
                if (l.tag === 1) {
                  c = Je(-1, n & -n), c.tag = 2;
                  var d = l.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var u = d.pending;
                    u === null ? c.next = c : (c.next = u.next, u.next = c), d.pending = c;
                  }
                }
                l.lanes |= n, c = l.alternate, c !== null && (c.lanes |= n), Oo(
                  l.return,
                  n,
                  t
                ), a.lanes |= n;
                break;
              }
              c = c.next;
            }
          } else if (l.tag === 10) s = l.type === t.type ? null : l.child;
          else if (l.tag === 18) {
            if (s = l.return, s === null) throw Error(z(341));
            s.lanes |= n, a = s.alternate, a !== null && (a.lanes |= n), Oo(s, n, t), s = l.sibling;
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
        fe(e, t, o.children, n), t = t.child;
      }
      return t;
    case 9:
      return o = t.type, i = t.pendingProps.children, sn(t, n), o = Fe(o), i = i(o), t.flags |= 1, fe(e, t, i, n), t.child;
    case 14:
      return i = t.type, o = Le(i, t.pendingProps), o = Le(i.type, o), ta(e, t, i, o, n);
    case 15:
      return lc(e, t, t.type, t.pendingProps, n);
    case 17:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : Le(i, o), Wr(e, t), t.tag = 1, we(i) ? (e = !0, ni(t)) : e = !1, sn(t, n), rc(t, i, o), Ho(t, i, o, n), Uo(null, t, i, !0, e, n);
    case 19:
      return uc(e, t, n);
    case 22:
      return sc(e, t, n);
  }
  throw Error(z(156, t.tag));
};
function Tc(e, t) {
  return ed(e, t);
}
function op(e, t, n, i) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Pe(e, t, n, i) {
  return new op(e, t, n, i);
}
function Zl(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function lp(e) {
  if (typeof e == "function") return Zl(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === yl) return 11;
    if (e === xl) return 14;
  }
  return 2;
}
function vt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Pe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Vr(e, t, n, i, o, l) {
  var s = 2;
  if (i = e, typeof e == "function") Zl(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else e: switch (e) {
    case Ut:
      return Ft(n.children, o, l, t);
    case ml:
      s = 8, o |= 8;
      break;
    case fo:
      return e = Pe(12, n, t, o | 2), e.elementType = fo, e.lanes = l, e;
    case po:
      return e = Pe(13, n, t, o), e.elementType = po, e.lanes = l, e;
    case ho:
      return e = Pe(19, n, t, o), e.elementType = ho, e.lanes = l, e;
    case La:
      return Ti(n, o, l, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case $a:
          s = 10;
          break e;
        case Na:
          s = 9;
          break e;
        case yl:
          s = 11;
          break e;
        case xl:
          s = 14;
          break e;
        case lt:
          s = 16, i = null;
          break e;
      }
      throw Error(z(130, e == null ? e : typeof e, ""));
  }
  return t = Pe(s, n, t, o), t.elementType = e, t.type = i, t.lanes = l, t;
}
function Ft(e, t, n, i) {
  return e = Pe(7, e, i, t), e.lanes = n, e;
}
function Ti(e, t, n, i) {
  return e = Pe(22, e, i, t), e.elementType = La, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function io(e, t, n) {
  return e = Pe(6, e, null, t), e.lanes = n, e;
}
function oo(e, t, n) {
  return t = Pe(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function sp(e, t, n, i, o) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ai(0), this.expirationTimes = Ai(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ai(0), this.identifierPrefix = i, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null;
}
function Jl(e, t, n, i, o, l, s, a, c) {
  return e = new sp(e, t, n, a, c), t === 1 ? (t = 1, l === !0 && (t |= 8)) : t = 0, l = Pe(3, null, null, t), e.current = l, l.stateNode = e, l.memoizedState = { element: i, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Nl(l), e;
}
function ap(e, t, n) {
  var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Vt, key: i == null ? null : "" + i, children: e, containerInfo: t, implementation: n };
}
function Rc(e) {
  if (!e) return kt;
  e = e._reactInternals;
  e: {
    if (Wt(e) !== e || e.tag !== 1) throw Error(z(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (we(t.type)) {
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
    if (we(n)) return Rd(e, n, t);
  }
  return t;
}
function Mc(e, t, n, i, o, l, s, a, c) {
  return e = Jl(n, i, !0, e, o, l, s, a, c), e.context = Rc(null), n = e.current, i = pe(), o = xt(n), l = Je(i, o), l.callback = t ?? null, mt(n, l, o), e.current.lanes = o, dr(e, o, i), ke(e, i), e;
}
function Ri(e, t, n, i) {
  var o = t.current, l = pe(), s = xt(o);
  return n = Rc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Je(l, s), t.payload = { element: e }, i = i === void 0 ? null : i, i !== null && (t.callback = i), e = mt(o, t, s), e !== null && (We(e, o, s, l), Dr(e, o, s)), s;
}
function gi(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function pa(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function es(e, t) {
  pa(e, t), (e = e.alternate) && pa(e, t);
}
function dp() {
  return null;
}
var Ic = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function ts(e) {
  this._internalRoot = e;
}
Mi.prototype.render = ts.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(z(409));
  Ri(e, t, null, null);
};
Mi.prototype.unmount = ts.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    At(function() {
      Ri(null, e, null, null);
    }), t[tt] = null;
  }
};
function Mi(e) {
  this._internalRoot = e;
}
Mi.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = sd();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < at.length && t !== 0 && t < at[n].priority; n++) ;
    at.splice(n, 0, e), n === 0 && dd(e);
  }
};
function ns(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Ii(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function ha() {
}
function cp(e, t, n, i, o) {
  if (o) {
    if (typeof i == "function") {
      var l = i;
      i = function() {
        var d = gi(s);
        l.call(d);
      };
    }
    var s = Mc(t, i, e, 0, null, !1, !1, "", ha);
    return e._reactRootContainer = s, e[tt] = s.current, Jn(e.nodeType === 8 ? e.parentNode : e), At(), s;
  }
  for (; o = e.lastChild; ) e.removeChild(o);
  if (typeof i == "function") {
    var a = i;
    i = function() {
      var d = gi(c);
      a.call(d);
    };
  }
  var c = Jl(e, 0, !1, null, null, !1, !1, "", ha);
  return e._reactRootContainer = c, e[tt] = c.current, Jn(e.nodeType === 8 ? e.parentNode : e), At(function() {
    Ri(t, c, n, i);
  }), c;
}
function _i(e, t, n, i, o) {
  var l = n._reactRootContainer;
  if (l) {
    var s = l;
    if (typeof o == "function") {
      var a = o;
      o = function() {
        var c = gi(s);
        a.call(c);
      };
    }
    Ri(t, s, e, o);
  } else s = cp(n, t, e, o, i);
  return gi(s);
}
od = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Fn(t.pendingLanes);
        n !== 0 && (kl(t, n | 1), ke(t, X()), !(N & 6) && (gn = X() + 500, St()));
      }
      break;
    case 13:
      At(function() {
        var i = nt(e, 1);
        if (i !== null) {
          var o = pe();
          We(i, e, 1, o);
        }
      }), es(e, 1);
  }
};
bl = function(e) {
  if (e.tag === 13) {
    var t = nt(e, 134217728);
    if (t !== null) {
      var n = pe();
      We(t, e, 134217728, n);
    }
    es(e, 134217728);
  }
};
ld = function(e) {
  if (e.tag === 13) {
    var t = xt(e), n = nt(e, t);
    if (n !== null) {
      var i = pe();
      We(n, e, t, i);
    }
    es(e, t);
  }
};
sd = function() {
  return L;
};
ad = function(e, t) {
  var n = L;
  try {
    return L = e, t();
  } finally {
    L = n;
  }
};
So = function(e, t, n) {
  switch (t) {
    case "input":
      if (yo(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var i = n[t];
          if (i !== e && i.form === e.form) {
            var o = ki(i);
            if (!o) throw Error(z(90));
            Aa(i), yo(i, o);
          }
        }
      }
      break;
    case "textarea":
      Wa(e, n);
      break;
    case "select":
      t = n.value, t != null && nn(e, !!n.multiple, t, !1);
  }
};
Ya = Kl;
Ka = At;
var up = { usingClientEntryPoint: !1, Events: [ur, Kt, ki, Ga, Qa, Kl] }, Rn = { findFiberByHostInstance: It, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, fp = { bundleType: Rn.bundleType, version: Rn.version, rendererPackageName: Rn.rendererPackageName, rendererConfig: Rn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: it.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Za(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Rn.findFiberByHostInstance || dp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var _r = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!_r.isDisabled && _r.supportsFiber) try {
    yi = _r.inject(fp), Qe = _r;
  } catch {
  }
}
Re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = up;
Re.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ns(t)) throw Error(z(200));
  return ap(e, t, null, n);
};
Re.createRoot = function(e, t) {
  if (!ns(e)) throw Error(z(299));
  var n = !1, i = "", o = Ic;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = Jl(e, 1, !1, null, null, n, !1, i, o), e[tt] = t.current, Jn(e.nodeType === 8 ? e.parentNode : e), new ts(t);
};
Re.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(z(188)) : (e = Object.keys(e).join(","), Error(z(268, e)));
  return e = Za(t), e = e === null ? null : e.stateNode, e;
};
Re.flushSync = function(e) {
  return At(e);
};
Re.hydrate = function(e, t, n) {
  if (!Ii(t)) throw Error(z(200));
  return _i(null, e, t, !0, n);
};
Re.hydrateRoot = function(e, t, n) {
  if (!ns(e)) throw Error(z(405));
  var i = n != null && n.hydratedSources || null, o = !1, l = "", s = Ic;
  if (n != null && (n.unstable_strictMode === !0 && (o = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = Mc(t, null, e, 1, n ?? null, o, !1, l, s), e[tt] = t.current, Jn(e), i) for (e = 0; e < i.length; e++) n = i[e], o = n._getVersion, o = o(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, o] : t.mutableSourceEagerHydrationData.push(
    n,
    o
  );
  return new Mi(t);
};
Re.render = function(e, t, n) {
  if (!Ii(t)) throw Error(z(200));
  return _i(null, e, t, !1, n);
};
Re.unmountComponentAtNode = function(e) {
  if (!Ii(e)) throw Error(z(40));
  return e._reactRootContainer ? (At(function() {
    _i(null, null, e, !1, function() {
      e._reactRootContainer = null, e[tt] = null;
    });
  }), !0) : !1;
};
Re.unstable_batchedUpdates = Kl;
Re.unstable_renderSubtreeIntoContainer = function(e, t, n, i) {
  if (!Ii(n)) throw Error(z(200));
  if (e == null || e._reactInternals === void 0) throw Error(z(38));
  return _i(e, t, n, !1, i);
};
Re.version = "18.3.1-next-f1338f8080-20240426";
function _c() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_c);
    } catch (e) {
      console.error(e);
    }
}
_c(), _a.exports = Re;
var pp = _a.exports, Pc, ga = pp;
Pc = ga.createRoot, ga.hydrateRoot;
const rs = K.createContext(null);
var Ec = { exports: {} }, Pi = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hp = fl, gp = Symbol.for("react.element"), mp = Symbol.for("react.fragment"), yp = Object.prototype.hasOwnProperty, xp = hp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, vp = { key: !0, ref: !0, __self: !0, __source: !0 };
function Fc(e, t, n) {
  var i, o = {}, l = null, s = null;
  n !== void 0 && (l = "" + n), t.key !== void 0 && (l = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (i in t) yp.call(t, i) && !vp.hasOwnProperty(i) && (o[i] = t[i]);
  if (e && e.defaultProps) for (i in t = e.defaultProps, t) o[i] === void 0 && (o[i] = t[i]);
  return { $$typeof: gp, type: e, key: l, ref: s, props: o, _owner: xp.current };
}
Pi.Fragment = mp;
Pi.jsx = Fc;
Pi.jsxs = Fc;
Ec.exports = Pi;
var r = Ec.exports;
const wp = `
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
function kp(e) {
  const [t, n] = React.useState(e), i = React.useCallback((o, l) => {
    const s = typeof o == "object" && o !== null ? o : { [o]: l };
    n((a) => ({ ...a, ...s })), window.parent.postMessage({ type: "__edit_mode_set_keys", edits: s }, "*"), window.dispatchEvent(new CustomEvent("tweakchange", { detail: s }));
  }, []);
  return [t, i];
}
function bp({ title: e = "Tweaks", noDeckControls: t = !1, children: n }) {
  const [i, o] = React.useState(!1), l = React.useRef(null), s = React.useMemo(
    () => typeof document < "u" && !!document.querySelector("deck-stage"),
    []
  ), [a, c] = React.useState(() => {
    try {
      return localStorage.getItem("deck-stage.railVisible") !== "0";
    } catch {
      return !0;
    }
  }), d = (f) => {
    c(f), window.postMessage({ type: "__deck_rail_visible", on: f }, "*");
  }, u = React.useRef({ x: 16, y: 16 }), p = 16, g = React.useCallback(() => {
    const f = l.current;
    if (!f) return;
    const b = f.offsetWidth, y = f.offsetHeight, h = Math.max(p, window.innerWidth - b - p), m = Math.max(p, window.innerHeight - y - p);
    u.current = {
      x: Math.min(h, Math.max(p, u.current.x)),
      y: Math.min(m, Math.max(p, u.current.y))
    }, f.style.right = u.current.x + "px", f.style.bottom = u.current.y + "px";
  }, []);
  React.useEffect(() => {
    if (!i) return;
    if (g(), typeof ResizeObserver > "u")
      return window.addEventListener("resize", g), () => window.removeEventListener("resize", g);
    const f = new ResizeObserver(g);
    return f.observe(document.documentElement), () => f.disconnect();
  }, [i, g]), React.useEffect(() => {
    const f = (b) => {
      const y = b?.data?.type;
      y === "__activate_edit_mode" ? o(!0) : y === "__deactivate_edit_mode" && o(!1);
    };
    return window.addEventListener("message", f), window.parent.postMessage({ type: "__edit_mode_available" }, "*"), () => window.removeEventListener("message", f);
  }, []);
  const v = () => {
    o(!1), window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
  }, w = (f) => {
    const b = l.current;
    if (!b) return;
    const y = b.getBoundingClientRect(), h = f.clientX, m = f.clientY, x = window.innerWidth - y.right, k = window.innerHeight - y.bottom, j = (C) => {
      u.current = {
        x: x - (C.clientX - h),
        y: k - (C.clientY - m)
      }, g();
    }, S = () => {
      window.removeEventListener("mousemove", j), window.removeEventListener("mouseup", S);
    };
    window.addEventListener("mousemove", j), window.addEventListener("mouseup", S);
  };
  return i ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx("style", { children: wp }),
    /* @__PURE__ */ r.jsxs(
      "div",
      {
        ref: l,
        className: "twk-panel",
        "data-noncommentable": "",
        style: { right: u.current.x, bottom: u.current.y },
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
            s && !t && /* @__PURE__ */ r.jsx($c, { label: "Deck", children: /* @__PURE__ */ r.jsx(Nc, { label: "Thumbnail rail", value: a, onChange: d }) }),
            n
          ] })
        ]
      }
    )
  ] }) : null;
}
function $c({ label: e, children: t }) {
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx("div", { className: "twk-sect", children: e }),
    t
  ] });
}
function wn({ label: e, value: t, children: n, inline: i = !1 }) {
  return /* @__PURE__ */ r.jsxs("div", { className: i ? "twk-row twk-row-h" : "twk-row", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "twk-lbl", children: [
      /* @__PURE__ */ r.jsx("span", { children: e }),
      t != null && /* @__PURE__ */ r.jsx("span", { className: "twk-val", children: t })
    ] }),
    n
  ] });
}
function jp({ label: e, value: t, min: n = 0, max: i = 100, step: o = 1, unit: l = "", onChange: s }) {
  return /* @__PURE__ */ r.jsx(wn, { label: e, value: `${t}${l}`, children: /* @__PURE__ */ r.jsx(
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
function Nc({ label: e, value: t, onChange: n }) {
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
function Sp({ label: e, value: t, options: n, onChange: i }) {
  const o = React.useRef(null), [l, s] = React.useState(!1), a = React.useRef(t);
  a.current = t;
  const c = (b) => String(typeof b == "object" ? b.label : b).length;
  if (!(n.reduce((b, y) => Math.max(b, c(y)), 0) <= ({ 2: 16, 3: 10 }[n.length] ?? 0))) {
    const b = (y) => {
      const h = n.find((m) => String(typeof m == "object" ? m.value : m) === y);
      return h === void 0 ? y : typeof h == "object" ? h.value : h;
    };
    return /* @__PURE__ */ r.jsx(
      Lc,
      {
        label: e,
        value: t,
        options: n,
        onChange: (y) => i(b(y))
      }
    );
  }
  const p = n.map((b) => typeof b == "object" ? b : { value: b, label: b }), g = Math.max(0, p.findIndex((b) => b.value === t)), v = p.length, w = (b) => {
    const y = o.current.getBoundingClientRect(), h = y.width - 4, m = Math.floor((b - y.left - 2) / h * v);
    return p[Math.max(0, Math.min(v - 1, m))].value;
  }, f = (b) => {
    s(!0);
    const y = w(b.clientX);
    y !== a.current && i(y);
    const h = (x) => {
      if (!o.current) return;
      const k = w(x.clientX);
      k !== a.current && i(k);
    }, m = () => {
      s(!1), window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", m);
    };
    window.addEventListener("pointermove", h), window.addEventListener("pointerup", m);
  };
  return /* @__PURE__ */ r.jsx(wn, { label: e, children: /* @__PURE__ */ r.jsxs(
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
              left: `calc(2px + ${g} * (100% - 4px) / ${v})`,
              width: `calc((100% - 4px) / ${v})`
            }
          }
        ),
        p.map((b) => /* @__PURE__ */ r.jsx("button", { type: "button", role: "radio", "aria-checked": b.value === t, children: b.label }, b.value))
      ]
    }
  ) });
}
function Lc({ label: e, value: t, options: n, onChange: i }) {
  return /* @__PURE__ */ r.jsx(wn, { label: e, children: /* @__PURE__ */ r.jsx("select", { className: "twk-field", value: t, onChange: (o) => i(o.target.value), children: n.map((o) => {
    const l = typeof o == "object" ? o.value : o, s = typeof o == "object" ? o.label : o;
    return /* @__PURE__ */ r.jsx("option", { value: l, children: s }, l);
  }) }) });
}
function Cp({ label: e, value: t, placeholder: n, onChange: i }) {
  return /* @__PURE__ */ r.jsx(wn, { label: e, children: /* @__PURE__ */ r.jsx(
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
function zp({ label: e, value: t, min: n, max: i, step: o = 1, unit: l = "", onChange: s }) {
  const a = (u) => n != null && u < n ? n : i != null && u > i ? i : u, c = React.useRef({ x: 0, val: 0 }), d = (u) => {
    u.preventDefault(), c.current = { x: u.clientX, val: t };
    const p = (String(o).split(".")[1] || "").length, g = (w) => {
      const f = w.clientX - c.current.x, b = c.current.val + f * o, y = Math.round(b / o) * o;
      s(a(Number(y.toFixed(p))));
    }, v = () => {
      window.removeEventListener("pointermove", g), window.removeEventListener("pointerup", v);
    };
    window.addEventListener("pointermove", g), window.addEventListener("pointerup", v);
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "twk-num", children: [
    /* @__PURE__ */ r.jsx("span", { className: "twk-num-lbl", onPointerDown: d, children: e }),
    /* @__PURE__ */ r.jsx(
      "input",
      {
        type: "number",
        value: t,
        min: n,
        max: i,
        step: o,
        onChange: (u) => s(a(Number(u.target.value)))
      }
    ),
    l && /* @__PURE__ */ r.jsx("span", { className: "twk-num-unit", children: l })
  ] });
}
function Tp(e) {
  const t = String(e).replace("#", ""), n = t.length === 3 ? t.replace(/./g, (a) => a + a) : t.padEnd(6, "0"), i = parseInt(n.slice(0, 6), 16);
  if (Number.isNaN(i)) return !0;
  const o = i >> 16 & 255, l = i >> 8 & 255, s = i & 255;
  return o * 299 + l * 587 + s * 114 > 148e3;
}
const Rp = ({ light: e }) => /* @__PURE__ */ r.jsx("svg", { viewBox: "0 0 14 14", "aria-hidden": "true", children: /* @__PURE__ */ r.jsx(
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
function Mp({ label: e, value: t, options: n, onChange: i }) {
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
  return /* @__PURE__ */ r.jsx(wn, { label: e, children: /* @__PURE__ */ r.jsx("div", { className: "twk-chips", role: "radiogroup", children: n.map((s, a) => {
    const c = Array.isArray(s) ? s : [s], [d, ...u] = c, p = u.slice(0, 4), g = o(s) === l;
    return /* @__PURE__ */ r.jsxs(
      "button",
      {
        type: "button",
        className: "twk-chip",
        role: "radio",
        "aria-checked": g,
        "data-on": g ? "1" : "0",
        "aria-label": c.join(", "),
        title: c.join(" · "),
        style: { background: d },
        onClick: () => i(s),
        children: [
          p.length > 0 && /* @__PURE__ */ r.jsx("span", { children: p.map((v, w) => /* @__PURE__ */ r.jsx("i", { style: { background: v } }, w)) }),
          g && /* @__PURE__ */ r.jsx(Rp, { light: Tp(d) })
        ]
      },
      a
    );
  }) }) });
}
function Ip({ label: e, onClick: t, secondary: n = !1 }) {
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
  useTweaks: kp,
  TweaksPanel: bp,
  TweakSection: $c,
  TweakRow: wn,
  TweakSlider: jp,
  TweakToggle: Nc,
  TweakRadio: Sp,
  TweakSelect: Lc,
  TweakText: Cp,
  TweakNumber: zp,
  TweakColor: Mp,
  TweakButton: Ip
});
const _p = ({ name: e, size: t = 18, stroke: n = 1.6, ...i }) => {
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
}, Pp = [
  { id: "living", name: "Living Room", icon: "home" },
  { id: "kitchen", name: "Kitchen", icon: "coffee" },
  { id: "bedroom", name: "Bedroom", icon: "bed" },
  { id: "office", name: "Office", icon: "user" },
  { id: "outdoor", name: "Outdoor", icon: "leaf" }
], me = [
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
], Dc = [
  { id: "pl1", name: "Sunday Slow", count: 42, art: ["oklch(45% 0.12 30)", "oklch(40% 0.14 60)", "oklch(35% 0.10 270)", "oklch(58% 0.16 60)"], tracks: ["t3", "t4", "t10", "t11", "t15"] },
  { id: "pl2", name: "Late Night", count: 28, art: ["oklch(28% 0.06 240)", "oklch(35% 0.10 320)", "oklch(36% 0.06 200)", "oklch(45% 0.12 30)"], tracks: ["t1", "t7", "t9", "t12"] },
  { id: "pl3", name: "Cooking", count: 64, art: ["oklch(50% 0.13 80)", "oklch(48% 0.18 50)", "oklch(45% 0.13 90)", "oklch(58% 0.16 60)"], tracks: ["t5", "t6", "t8", "t13", "t14"] },
  { id: "pl4", name: "Frances' Picks", count: 91, art: ["oklch(72% 0.10 20)", "oklch(40% 0.14 60)", "oklch(35% 0.10 270)", "oklch(45% 0.15 25)"], tracks: ["t1", "t2", "t3", "t4", "t5", "t6", "t11"] },
  { id: "pl5", name: "Focus", count: 37, art: ["oklch(36% 0.06 200)", "oklch(28% 0.06 240)", "oklch(35% 0.10 270)", "oklch(42% 0.12 340)"], tracks: ["t7", "t9", "t12"] },
  { id: "pl6", name: "Dinner Party", count: 54, art: ["oklch(58% 0.16 60)", "oklch(45% 0.13 90)", "oklch(72% 0.10 20)", "oklch(50% 0.13 80)"], tracks: ["t5", "t8", "t13", "t14", "t15"] }
], Ac = () => ({
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
function Ep(e, t, n) {
  const i = e.trim();
  if (!i) return null;
  const o = i.toLowerCase(), l = Oc(i, t);
  if (l)
    return n((f) => ({ ...f, automations: [...f.automations, l] })), `Saved automation: "${l.name}". ${l.desc} You can edit it under Automations.`;
  const s = o.match(/(?:set|make|put|change).*(?:thermostat|temp(?:erature)?|nest|heat|cool|ac).*?(\d{2})/i) || o.match(/(?:thermostat|temp(?:erature)?|nest).*?(\d{2})/i) || o.match(/(\d{2})\s*(?:degrees?|°)/i);
  if (s && /thermostat|temp|nest|degree|°|warmer|colder|heat|cool|ac/i.test(o)) {
    const f = Math.max(50, Math.min(90, +s[1]));
    return n((b) => ({ ...b, thermostat: { ...b.thermostat, target: f } })), `Set the Nest to ${f}°.`;
  }
  if (/warmer|hotter|heat up/i.test(o))
    return n((f) => ({ ...f, thermostat: { ...f.thermostat, target: Math.min(83, f.thermostat.target + 2) } })), "Bumped the thermostat up 2°.";
  if (/colder|cooler|cool (it )?down/i.test(o))
    return n((f) => ({ ...f, thermostat: { ...f.thermostat, target: Math.max(60, f.thermostat.target - 2) } })), "Cooled it down 2°.";
  const a = o.match(/(?:thermostat|nest|mode).*?(cool|heat|auto|off)/i) || o.match(/^(cool|heat|auto)\s*(?:mode|the house)?$/i);
  if (a) {
    const f = a[1].toLowerCase();
    return n((b) => ({ ...b, thermostat: { ...b.thermostat, mode: f } })), `Thermostat set to ${f}.`;
  }
  const c = [
    { match: /(movie|film|cinema)/i, id: "movie", reply: "Setting up movie night. Dimming the living room, switching to Apple TV." },
    { match: /(good ?night|sleep|bedtime)/i, id: "sleep", reply: "Goodnight. Locking up, turning off the TV, easing the lights down." },
    { match: /(good ?morning|wake ?up)/i, id: "morning", reply: "Good morning. Brewing coffee and bringing the kitchen lights up." },
    { match: /focus|work mode/i, id: "focus", reply: "Focus on. Office cool, notifications muted." },
    { match: /(away|leaving|out)/i, id: "away", reply: "Away mode. Doors locked, sentry armed, lights off." },
    { match: /dinner party/i, id: "dinner", reply: "Dinner party scene running." }
  ];
  for (const f of c)
    if (f.match.test(i))
      return n((b) => {
        const y = { ...b, scenes: b.scenes.map((h) => ({ ...h, active: h.id === f.id })) };
        return f.id === "movie" && (y.lights = b.lights.map((h) => h.room === "living" ? { ...h, on: !0, brightness: 12 } : h)), f.id === "sleep" && (y.lights = b.lights.map((h) => ({ ...h, on: !1 })), y.locks = b.locks.map((h) => ({ ...h, locked: !0 }))), f.id === "morning" && (y.lights = b.lights.map((h) => h.room === "kitchen" ? { ...h, on: !0, brightness: 85 } : h)), f.id === "away" && (y.locks = b.locks.map((h) => ({ ...h, locked: !0 })), y.lights = b.lights.map((h) => ({ ...h, on: !1 }))), y;
      }), f.reply;
  const d = o.match(/\b(living|kitchen|bedroom|office|outdoor|porch)\b/i), u = d ? d[1].toLowerCase() === "porch" ? "outdoor" : d[1].toLowerCase() : null, p = o.match(/(\d{1,3})\s*%/), g = p ? Math.max(1, Math.min(100, +p[1])) : null;
  if (/turn (?:on|up)|lights? on|brighten/i.test(o) && /light/i.test(o))
    return n((f) => ({ ...f, lights: f.lights.map((b) => !u || b.room === u ? { ...b, on: !0, brightness: g ?? b.brightness } : b) })), u ? `${Ur(u)} lights on${g ? ` at ${g}%` : ""}.` : `Lights on${g ? ` at ${g}%` : ""}.`;
  if (/turn (?:off|down)|lights? off/i.test(o) && /light/i.test(o))
    return n((f) => ({ ...f, lights: f.lights.map((b) => !u || b.room === u ? { ...b, on: !1 } : b) })), u ? `${Ur(u)} lights off.` : "Lights off.";
  if (/(dim|lower).*light/i.test(o))
    return n((f) => ({ ...f, lights: f.lights.map((b) => !u || b.room === u ? { ...b, on: !0, brightness: g ?? 30 } : b) })), `Dimmed${u ? ` the ${u}` : ""} to ${g ?? 30}%.`;
  if (/lock (?:up|the house|all|everything|doors)/i.test(o) || /^lock$/i.test(o.trim()))
    return n((f) => ({ ...f, locks: f.locks.map((b) => ({ ...b, locked: !0 })) })), "All doors locked. Sentry armed on the Tesla.";
  const v = o.match(/(?:set|put|switch|change|arm|disarm).*?ring.*?(disarm(?:ed)?|home|away|stay|night)/i) || o.match(/ring.*?(disarm(?:ed)?|home|away|stay|night).*?mode/i) || o.match(/^(?:arm|disarm)(?:\s+(?:to\s+)?(home|away|stay|disarmed))?$/i) || o.match(/(?:arm|set).*?(?:alarm|system).*?(home|away|stay|night)/i) || o.match(/(disarm)(?:\s+(?:the\s+)?(?:alarm|ring|system))?$/i);
  if (v) {
    let f = (v[1] || "").toLowerCase();
    if ((f === "stay" || f === "night") && (f = "home"), f.startsWith("disarm") && (f = "disarmed"), !f && /^arm/i.test(i.trim()) && (f = "away"), f === "disarmed" || f === "home" || f === "away")
      return n((y) => ({
        ...y,
        ring: { ...y.ring || {}, mode: f, lastChanged: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), changedBy: "Voice" },
        locks: f === "away" ? y.locks.map((h) => ({ ...h, locked: !0 })) : y.locks
      })), {
        disarmed: "Ring disarmed. Sensors off.",
        home: "Ring set to Home. Perimeter armed, interior bypassed so you can move around.",
        away: "Ring armed Away. Doors locked, full system armed with a 30-second entry delay."
      }[f];
  }
  if (/unlock front/i.test(o))
    return n((f) => ({ ...f, locks: f.locks.map((b) => b.id === "lk1" ? { ...b, locked: !1 } : b) })), "Unlocking the front door. I'll re-lock in five.";
  if (/unlock back/i.test(o))
    return n((f) => ({ ...f, locks: f.locks.map((b) => b.id === "lk2" ? { ...b, locked: !1 } : b) })), "Back door unlocked.";
  if (/(pause|stop) music/i.test(o))
    return n((f) => ({ ...f, speakers: f.speakers.map((b) => ({ ...b, playing: !1 })) })), "Music paused everywhere.";
  if (/skip|next track/i.test(o))
    return n((f) => ({ ...f, speakers: f.speakers.map((b) => b.playing ? { ...b, trackId: Fp(b.trackId), progress: 0 } : b) })), "Skipping to the next track.";
  const w = o.match(/^(?:please\s+)?play\s+(.+?)(?:\s+(?:in|on|to)\s+(?:the\s+)?([a-z\s]+?))?$/i) || o.match(/^(?:put on|start)\s+(.+?)(?:\s+(?:in|on|to)\s+(?:the\s+)?([a-z\s]+?))?$/i);
  if (w) {
    const f = w[1].trim(), b = (w[2] || "").trim().toLowerCase(), y = /everywhere|whole house|all (rooms|speakers)|every room/i.test(i), h = { living: "living", "living room": "living", kitchen: "kitchen", bedroom: "bedroom", office: "office", outdoor: "outdoor", patio: "outdoor", porch: "outdoor" }, m = h[b] || b && Object.keys(h).find((x) => b.includes(x)) || null;
    if (!/^(music|something|a song|tunes)$/i.test(f)) {
      const x = f.toLowerCase();
      let k = me.find((C) => C.title.toLowerCase() === x) || me.find((C) => C.title.toLowerCase().includes(x)) || me.find((C) => C.album.toLowerCase().includes(x)) || me.find((C) => C.artist.toLowerCase().includes(x)), j = null, S = "";
      if (k) {
        const C = me.filter((T) => T.id !== k.id && T.artist.toLowerCase() === k.artist.toLowerCase()), I = me.filter((T) => T.id !== k.id && !C.includes(T)).slice(0, 4);
        j = [...C, ...I].slice(0, 6).map((T) => T.id), S = `${k.title} — ${k.artist}`;
      } else {
        const C = (t.playlists || Dc).find((I) => I.name.toLowerCase().includes(x));
        C && C.tracks.length && (k = me.find((I) => I.id === C.tracks[0]), j = C.tracks.slice(1, 7), S = `playlist "${C.name}"`);
      }
      if (k) {
        const C = y ? "all speakers" : m ? Ur(m) : "the Living Room";
        return n((I) => ({ ...I, speakers: I.speakers.map((T) => y || !m && T.room === "living" || m && T.room === m ? { ...T, trackId: k.id, progress: 0, playing: !0, queue: j || T.queue } : T) })), `Playing ${S} in ${C}.`;
      }
    }
  }
  if (/(play|resume) music/i.test(o))
    return n((f) => ({ ...f, speakers: f.speakers.map((b) => ({ ...b, playing: !0 })) })), "Music playing.";
  if (/precondition|warm.*car|cool.*car|preheat/i.test(o))
    return n((f) => ({ ...f, tesla: { ...f.tesla, climateOn: !0, target: 70 } })), "Preconditioning the Tesla to 70°.";
  if (/charge|tesla|car/i.test(o) && /status|how/i.test(o)) return `Tesla is at ${t.tesla.chargePct}%, ${t.tesla.range} mi range, ${t.tesla.charging ? "charging" : t.tesla.pluggedIn ? "plugged in" : "unplugged"}.`;
  if (/lock.*car|sentry/i.test(o))
    return n((f) => ({ ...f, tesla: { ...f.tesla, locked: !0, sentry: !0 } })), "Tesla locked, sentry on.";
  if (/close.*garage|garage.*close/i.test(o))
    return n((f) => ({ ...f, garage: { ...f.garage, doors: f.garage.doors.map((b) => ({ ...b, open: !1, lastChanged: "now" })) } })), "Closing all garage doors.";
  if (/open.*garage|garage.*open/i.test(o))
    return n((f) => ({ ...f, garage: { ...f.garage, doors: f.garage.doors.map((b) => b.id === "g1" ? { ...b, open: !0, lastChanged: "now" } : b) } })), "Opening the main garage door.";
  if (/(vacuum|shark|roomba|clean.*house|start.*clean)/i.test(o) && /(start|clean|run|begin)/i.test(o)) {
    const f = o.match(/\b(living|kitchen|bedroom|office|outdoor)\b/i);
    return n((b) => ({ ...b, vacuum: { ...b.vacuum, state: "cleaning", mode: f ? "room" : "auto", currentRoom: f ? f[1].toLowerCase() : null } })), f ? `Sending the Shark to clean the ${f[1].toLowerCase()}.` : "Shark is starting a full-house clean.";
  }
  if (/(stop|pause).*(vacuum|shark|clean)/i.test(o))
    return n((f) => ({ ...f, vacuum: { ...f.vacuum, state: "paused" } })), "Vacuum paused.";
  if (/(dock|return).*(vacuum|shark)/i.test(o) || /send.*shark.*home/i.test(o))
    return n((f) => ({ ...f, vacuum: { ...f.vacuum, state: "returning" } })), "Sending the Shark back to its dock.";
  if (/weather/i.test(o)) return `It's ${t.weather.temp}° and ${t.weather.summary.toLowerCase()}. High of ${t.weather.high}° this afternoon.`;
  if (/alarm.*\d|wake.*\d/i.test(o)) {
    const f = o.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (f) {
      const b = +f[1], y = f[2] || "00", h = f[3] ? f[3].toUpperCase() : b < 8 ? "AM" : "PM", m = `${b}:${y} ${h}`;
      return n((x) => ({ ...x, alarms: [{ id: "new" + Date.now(), label: "Tomorrow", time: m, days: "Once", on: !0 }, ...x.alarms] })), `Alarm set for ${m}.`;
    }
  }
  return /do not disturb|dnd/i.test(o) ? (n((f) => ({ ...f, dnd: { active: !0, until: "next meeting end", source: "agent" } })), "Do not disturb on until your next meeting ends.") : null;
}
const Ur = (e) => e && e.charAt(0).toUpperCase() + e.slice(1);
function Fp(e) {
  const t = me.findIndex((n) => n.id === e);
  return me[(t + 1) % me.length].id;
}
function Oc(e, t) {
  const n = e.toLowerCase();
  if (!/^(when(?:ever)?|if|every (?:day|night|morning|evening))\b/i.test(e.trim())) return null;
  let i = null, o = "";
  const l = n.match(/motion (?:on|at|in front of|by|near)\s*(?:the\s*)?([a-z\s]+?)(?:\s*(?:cam(?:era)?|cam))?(?:[,]|\s+then|\s+turn|\s+do|\s+set|\s+lock|\s+open|\s+close|\s+run|$)/i);
  if (l || /motion/i.test(n)) {
    const p = l?.[1]?.trim();
    let g = t.cameras.find((v) => p && v.name.toLowerCase().includes(p));
    g || (g = t.cameras.find((v) => /front/i.test(v.name)) || t.cameras[0]), i = { type: "motion", cameraId: g.id }, o = `motion at ${g.name}`;
  }
  const s = e.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
  if (!i && s) {
    const p = +s[1], g = s[2] || "00", v = s[3].toUpperCase(), w = `${p}:${g} ${v}`;
    i = { type: "time", at: w }, o = `${w}`;
  }
  if (!i && /(?:i|we|someone)\s+(?:get home|arrive|come home)/i.test(n) && (i = { type: "arriveHome" }, o = "I arrive home"), !i && /(?:i|we|everyone)\s+(?:leave|go away)/i.test(n) && (i = { type: "leaveHome" }, o = "I leave home"), !i) return null;
  const a = [], c = [], d = n.match(/turn (?:on|up)\s+(?:the\s+)?([a-z\s]+?)\s*(?:light|lights|lamp)/i);
  if (d) {
    const p = d[1].trim(), g = t.lights.find((v) => p && (v.name.toLowerCase().includes(p) || v.room.toLowerCase().includes(p)));
    g ? (a.push({ type: "light", lightId: g.id, on: !0, brightness: 80 }), c.push(`turn on ${g.name}`)) : (a.push({ type: "allLights", on: !0 }), c.push("turn lights on"));
  } else /turn (?:on|up).*light/i.test(n) && (a.push({ type: "allLights", on: !0 }), c.push("turn lights on"));
  if (/turn (?:off|down).*light|lights? off/i.test(n) && (a.push({ type: "allLights", on: !1 }), c.push("turn lights off")), /lock (?:up|the door|all|everything|doors)|lock the house/i.test(n) && (a.push({ type: "lockAll" }), c.push("lock everything")), /run\s+(?:the\s+)?(goodnight|sleep|movie|away|focus|morning|dinner)/i.test(n)) {
    const p = n.match(/run\s+(?:the\s+)?(goodnight|sleep|movie|away|focus|morning|dinner)/i)[1], g = p === "goodnight" ? "sleep" : p;
    a.push({ type: "scene", sceneId: g }), c.push(`run ${p}`);
  }
  /precondition|warm.*car/i.test(n) && (a.push({ type: "precondition" }), c.push("precondition the Tesla")), /close.*garage/i.test(n) && (a.push({ type: "closeGarage" }), c.push("close the garage"));
  const u = n.match(/(?:set|make).*(?:thermostat|nest|temp).*?(\d{2})/i);
  return u && (a.push({ type: "thermostat", target: +u[1] }), c.push(`set thermostat to ${u[1]}°`)), a.length ? {
    id: "au" + Date.now(),
    name: `${Ur(o)} → ${c[0]}`,
    trigger: i,
    actions: a,
    enabled: !0,
    lastRun: null,
    desc: `When ${o}, ${c.join(" and ")}.`
  } : null;
}
function $p(e, t, n) {
  n((i) => {
    let o = { ...i };
    for (const l of e.actions)
      l.type === "light" && (o.lights = o.lights.map((s) => s.id === l.lightId ? { ...s, on: l.on, brightness: l.brightness ?? s.brightness } : s)), l.type === "allLights" && (o.lights = o.lights.map((s) => ({ ...s, on: l.on }))), l.type === "lockAll" && (o.locks = o.locks.map((s) => ({ ...s, locked: !0 }))), l.type === "scene" && (o.scenes = o.scenes.map((s) => ({ ...s, active: s.id === l.sceneId }))), l.type === "precondition" && (o.tesla = { ...o.tesla, climateOn: !0, target: 70 }), l.type === "closeGarage" && (o.garage = { ...o.garage, doors: o.garage.doors.map((s) => ({ ...s, open: !1, lastChanged: "now" })) }), l.type === "thermostat" && (o.thermostat = { ...o.thermostat, target: l.target });
    return o.automations = o.automations.map((l) => l.id === e.id ? { ...l, lastRun: "now" } : l), o;
  });
}
async function Np(e, t, n, i) {
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
function Lp() {
  const [e, t] = React.useState(() => Ac());
  return React.useEffect(() => {
    const n = setInterval(() => {
      t((i) => ({
        ...i,
        speakers: i.speakers.map((o) => o.playing ? { ...o, progress: (o.progress + 1) % (me.find((l) => l.id === o.trackId)?.dur || 240) } : o)
      }));
    }, 1e3);
    return () => clearInterval(n);
  }, []), [e, t];
}
function Dp(e) {
  const t = Math.floor(e / 60), n = Math.floor(e % 60);
  return `${t}:${n.toString().padStart(2, "0")}`;
}
function Ap(e) {
  return me.find((t) => t.id === e) || me[0];
}
Object.assign(window, { Icon: _p, ROOMS: Pp, TRACKS: me, PLAYLISTS: Dc, initialDevices: Ac, runAgent: Ep, runAutomation: $p, parseAutomation: Oc, callClaude: Np, useHomeState: Lp, fmtTime: Dp, trackById: Ap });
function Wc() {
  return K.useContext(rs);
}
function Op(e, t) {
  const n = ((t || "") + " " + (e || "")).toLowerCase();
  return /living|family\s*room|den/.test(n) ? "living" : /kitchen|dining/.test(n) ? "kitchen" : /bed|primary|guest\s*room|nursery/.test(n) ? "bedroom" : /office|study/.test(n) ? "office" : /outdoor|patio|porch|yard|garden|exterior|driveway|garage|backyard|frontyard|front\s*door/.test(n) ? "outdoor" : "living";
}
function Wp(e) {
  return e?.state === "on" || e?.state === "open" || e?.state === "unlocked" || e?.state === "playing";
}
function Hp(e) {
  return typeof e?.brightness == "number" ? Math.round(e.brightness / 255 * 100) : 80;
}
function Bp(e) {
  return !Array.isArray(e) || e.length < 3 ? "#ffe0b2" : "#" + e.slice(0, 3).map((t) => Math.max(0, Math.min(255, t | 0)).toString(16).padStart(2, "0")).join("");
}
function lo(e) {
  if (!e) return "—";
  try {
    return new Date(e).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } catch {
    return "—";
  }
}
function Vp(e) {
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
    tv: { on: !1, source: "—", show: "" }
  };
  if (!e)
    return { ...t, ...ma() };
  const n = Object.values(e);
  for (const o of n) {
    const l = o.entity_id, s = l.split(".")[0], a = o.attributes?.friendly_name || l, c = Op(a, o.attributes?.area_id);
    switch (s) {
      case "light":
        t.lights.push({
          id: l,
          room: c,
          name: a,
          on: Wp(o),
          brightness: Hp(o.attributes),
          color: o.attributes?.rgb_color ? Bp(o.attributes.rgb_color) : "#ffe0b2"
        });
        break;
      case "media_player": {
        const d = o.attributes?.device_class, u = d === "tv" || /\btv\b/i.test(a) || /apple\s*tv/i.test(a) || /chromecast/i.test(a) || /webos/i.test(a), p = o.state === "playing", g = typeof o.attributes?.volume_level == "number" ? Math.round(o.attributes.volume_level * 100) : 30;
        u ? (t.tvs.push({
          id: l,
          name: a,
          brand: d === "tv" ? "tv" : "appletv",
          model: a,
          room: c,
          on: o.state !== "off" && o.state !== "unavailable",
          app: o.attributes?.app_name || "—",
          show: o.attributes?.media_title || "—",
          poster: "oklch(45% 0.10 280)",
          playing: p,
          progress: o.attributes?.media_position || 0,
          dur: o.attributes?.media_duration || 0,
          vol: g,
          mute: !!o.attributes?.is_volume_muted,
          input: o.attributes?.source || "—"
        }), t.tv.on === !1 && o.state !== "off" && o.state !== "unavailable" && (t.tv = { on: !0, source: o.attributes?.app_name || a, show: o.attributes?.media_title || "" })) : t.speakers.push({
          id: l,
          room: c,
          name: a,
          type: "sonos",
          playing: p,
          vol: g,
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
        const d = o.attributes?.device_class;
        (d === "garage" || d === "door" || /garage/i.test(a)) && t.garage.doors.push({
          id: l,
          name: a,
          open: o.state === "open" || o.state === "opening",
          lastChanged: lo(o.last_changed)
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
          hourly: (o.attributes?.forecast || []).slice(0, 12).map((d) => Math.round(d.temperature || 65))
        });
        break;
      case "camera":
        t.cameras.push({
          id: l,
          name: a,
          room: c,
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
          lastRun: lo(o.attributes?.last_triggered),
          desc: a
        });
        break;
      case "alarm_control_panel":
        if (!t.ring) {
          const d = { armed_home: "home", armed_away: "away", armed_night: "home", disarmed: "disarmed" };
          t.ring = {
            id: l,
            mode: d[o.state] || "disarmed",
            lastChanged: lo(o.last_changed),
            changedBy: "HA"
          };
        }
        break;
    }
  }
  const i = /* @__PURE__ */ new Map();
  for (const o of n)
    if (o.entity_id.startsWith("binary_sensor.") && o.attributes?.device_class === "motion") {
      const l = (o.attributes?.friendly_name || "").toLowerCase().replace(/\s*motion\s*$/, "").trim();
      l && i.set(l, o.state === "on");
    }
  return t.cameras = t.cameras.map((o) => {
    const l = o.name.toLowerCase();
    return { ...o, motion: i.get(l) ?? o.motion };
  }), { ...t, ...ma(t) };
}
function ma(e) {
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
function Up(e, t, n) {
  if (!n || typeof n.callService != "function") {
    console.warn("[ha-bridge] hass not available — skipping dispatch");
    return;
  }
  const i = (s, a, c) => {
    console.log(`[ha-bridge] → ${s}.${a}`, c);
    try {
      const d = n.callService(s, a, c);
      d && typeof d.then == "function" && d.then(
        () => console.log(`[ha-bridge] ✓ ${s}.${a}`),
        (u) => console.warn(`[ha-bridge] ✗ ${s}.${a} rejected:`, u?.message || u, u)
      );
    } catch (d) {
      console.warn(`[ha-bridge] ✗ ${s}.${a} threw:`, d);
    }
  };
  for (const s of t.lights || []) {
    const a = e.lights?.find((c) => c.id === s.id);
    a && (a.on !== s.on ? i("light", s.on ? "turn_on" : "turn_off", { entity_id: s.id }) : s.on && a.brightness !== s.brightness && i("light", "turn_on", { entity_id: s.id, brightness_pct: s.brightness }));
  }
  const o = [...t.speakers || [], ...t.tvs || []], l = [...e.speakers || [], ...e.tvs || []];
  for (const s of o) {
    const a = l.find((c) => c.id === s.id);
    a && (a.playing !== s.playing && i("media_player", s.playing ? "media_play" : "media_pause", { entity_id: s.id }), a.vol !== s.vol && typeof s.vol == "number" && i("media_player", "volume_set", { entity_id: s.id, volume_level: s.vol / 100 }), "mute" in s && a.mute !== s.mute && i("media_player", "volume_mute", { entity_id: s.id, is_volume_muted: !!s.mute }), "on" in s && a.on !== s.on && i("media_player", s.on ? "turn_on" : "turn_off", { entity_id: s.id }));
  }
  for (const s of t.locks || []) {
    const a = e.locks?.find((c) => c.id === s.id);
    !a || a.locked === s.locked || i("lock", s.locked ? "lock" : "unlock", { entity_id: s.id });
  }
  for (const s of t.garage?.doors || []) {
    const a = e.garage?.doors?.find((c) => c.id === s.id);
    !a || a.open === s.open || i("cover", s.open ? "open_cover" : "close_cover", { entity_id: s.id });
  }
  if (t.vacuum?.id && e.vacuum && e.vacuum.state !== t.vacuum.state) {
    const a = { cleaning: "start", paused: "pause", returning: "return_to_base", docked: "return_to_base" }[t.vacuum.state];
    a && i("vacuum", a, { entity_id: t.vacuum.id });
  }
  t.thermostat?.id && e.thermostat && (e.thermostat.target !== t.thermostat.target && ((e.thermostat.mode === "off" || e.thermostat.mode === "unavailable") && i("climate", "set_hvac_mode", { entity_id: t.thermostat.id, hvac_mode: "auto" }), i("climate", "set_temperature", { entity_id: t.thermostat.id, temperature: t.thermostat.target })), e.thermostat.mode !== t.thermostat.mode && i("climate", "set_hvac_mode", { entity_id: t.thermostat.id, hvac_mode: t.thermostat.mode }));
  for (const s of t.scenes || []) {
    const a = e.scenes?.find((c) => c.id === s.id);
    a && !a.active && s.active && i("scene", "turn_on", { entity_id: s.id });
  }
  for (const s of t.automations || []) {
    const a = e.automations?.find((c) => c.id === s.id);
    !a || a.enabled === s.enabled || i("automation", s.enabled ? "turn_on" : "turn_off", { entity_id: s.id });
  }
  if (t.ring?.id && e.ring && e.ring.mode !== t.ring.mode) {
    const a = { home: "alarm_arm_home", away: "alarm_arm_away", disarmed: "alarm_disarm" }[t.ring.mode];
    a && i("alarm_control_panel", a, { entity_id: t.ring.id });
  }
}
function ya() {
  const e = Wc(), t = e?.states || null, n = K.useMemo(() => Vp(t), [t]), [i, o] = K.useState(null), l = i || n, s = K.useRef(null), a = K.useCallback((c) => {
    o((d) => {
      const u = d || n, p = typeof c == "function" ? c(u) : { ...u, ...c };
      return Up(u, p, e), p;
    }), clearTimeout(s.current), s.current = setTimeout(() => o(null), 1500);
  }, [e, n]);
  return K.useEffect(() => {
    if (!i) return;
    const c = setTimeout(() => o(null), 1500);
    return () => clearTimeout(c);
  }, [t]), [l, a];
}
typeof window < "u" && (window.useHomeState = ya, window.useHomeStateHA = ya, window.useHass = Wc);
const Hc = { S: 2, M: 3, L: 6 }, Gp = { S: 2, M: 4, L: 4 }, Qp = ({ layout: e, onLayoutChange: t, render: n, editing: i, ctx: o, narrow: l }) => {
  const { p: s, fonts: a } = o, c = l ? 4 : 6, d = l ? Gp : Hc, [u, p] = React.useState(null), g = React.useRef(null), v = React.useRef(null), w = e?.items || [], f = (x, k, j) => {
    if (!i || x.target.closest("[data-tile-resize]")) return;
    x.preventDefault();
    const S = x.currentTarget, C = S.getBoundingClientRect(), I = v.current.getBoundingClientRect();
    S.setPointerCapture?.(x.pointerId), p({
      id: k,
      from: j,
      pointerId: x.pointerId,
      x: x.clientX - I.left,
      y: x.clientY - I.top,
      offsetX: x.clientX - C.left,
      offsetY: x.clientY - C.top,
      w: C.width,
      h: C.height,
      target: j
    }), navigator.vibrate && navigator.vibrate(8);
  }, b = (x) => {
    if (!u) return;
    const k = v.current.getBoundingClientRect(), j = x.clientX - k.left, S = x.clientY - k.top;
    p((T) => ({ ...T, x: j, y: S }));
    const C = v.current.querySelectorAll("[data-tile-id]");
    let I = u.target;
    for (const T of C) {
      const $ = T.getBoundingClientRect();
      if (x.clientX >= $.left && x.clientX <= $.right && x.clientY >= $.top && x.clientY <= $.bottom) {
        const be = T.getAttribute("data-tile-id");
        if (be === u.id) continue;
        I = w.findIndex((E) => E.id === be);
        break;
      }
    }
    I !== u.target && p((T) => ({ ...T, target: I }));
  }, y = (x) => {
    if (u) {
      if (u.target !== u.from) {
        const k = [...w], [j] = k.splice(u.from, 1);
        k.splice(u.target, 0, j), t({ ...e, items: k });
      }
      p(null);
    }
  }, h = (x) => {
    const k = ["S", "M", "L"], j = w.map((S) => S.id === x ? { ...S, size: k[(k.indexOf(S.size) + 1) % 3] } : S);
    t({ ...e, items: j });
  };
  React.useEffect(() => {
    if (!u) return;
    const x = (j) => b(j), k = (j) => y();
    return window.addEventListener("pointermove", x), window.addEventListener("pointerup", k), window.addEventListener("pointercancel", k), () => {
      window.removeEventListener("pointermove", x), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k);
    };
  }, [u]);
  let m = w.map((x, k) => ({ ...x, _i: k }));
  if (u) {
    const x = [...m], [k] = x.splice(u.from, 1);
    x.splice(u.target, 0, k), m = x;
  }
  return /* @__PURE__ */ r.jsxs("div", { ref: v, style: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: `repeat(${c}, 1fr)`,
    gap: 14,
    gridAutoRows: "minmax(116px, auto)",
    gridAutoFlow: "dense",
    touchAction: i ? "none" : "auto"
  }, children: [
    m.map((x) => {
      const k = Math.min(d[x.size] || 2, c), j = u && u.id === x.id;
      return /* @__PURE__ */ r.jsxs(
        "div",
        {
          "data-tile-id": x.id,
          onPointerDown: i ? (S) => f(S, x.id, w.findIndex((C) => C.id === x.id)) : void 0,
          style: {
            gridColumn: `span ${k}`,
            position: "relative",
            opacity: j ? 0 : 1,
            cursor: i ? j ? "grabbing" : "grab" : "default",
            transition: u ? "transform .25s cubic-bezier(.2,.7,.4,1)" : "none",
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
                  onClick: () => h(x.id),
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
    u && /* @__PURE__ */ r.jsx("div", { ref: g, style: {
      position: "absolute",
      pointerEvents: "none",
      left: u.x - u.offsetX,
      top: u.y - u.offsetY,
      width: u.w,
      height: u.h,
      transform: "rotate(-1deg) scale(1.02)",
      boxShadow: "0 24px 60px rgba(0,0,0,.45)",
      borderRadius: 14,
      zIndex: 100,
      opacity: 0.95
    }, children: n(u.id, w.find((x) => x.id === u.id)?.size, !0) })
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
Object.assign(window, { DragGrid: Qp, TILE_SPAN: Hc });
const Yp = ({ dark: e, density: t, accent: n, agentTone: i, fontPair: o, bgImage: l, visibleDevices: s, settings: a, setSetting: c, user: d, patchUser: u, doLogout: p, narrow: g }) => {
  const [v, w] = window.useHomeState(), [f, b] = React.useState("home"), [y, h] = React.useState("living"), [m, x] = React.useState(!1), [k, j] = React.useState(0), [S, C] = React.useState(!1), [I, T] = React.useState([
    { who: "agent", text: "Evening, Frances. The house is settled — kitchen lights at 90, a couple lamps in the living room. Want me to start dinner mode?", t: "7:38 PM" }
  ]), [$, be] = React.useState(""), E = Bc(e, n), D = rl[o] || rl.editorial, ue = il[t] || il.regular, B = { p: E, fonts: D, dens: ue, state: v, setState: w, room: y, setRoom: h, page: f, setPage: b, visible: s || { lights: !0, music: !0, cameras: !0, climate: !0, locks: !0, scenes: !0, calendar: !0, weather: !0, alarms: !0, tv: !0 }, accent: n, dark: e, settings: a, setSetting: c, user: d, patchUser: u, doLogout: p, narrow: g };
  return /* @__PURE__ */ r.jsxs("div", { "data-screen-label": "HomeCNTRD", style: {
    width: "100%",
    height: "100%",
    background: E.bg,
    color: E.fg,
    fontFamily: D.body,
    position: "relative",
    overflow: "hidden",
    backgroundImage: l ? `url(${l})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }, children: [
    l && /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, background: e ? "rgba(20,15,12,.78)" : "rgba(248,243,235,.84)", backdropFilter: "blur(2px)" } }),
    v.dnd.active && /* @__PURE__ */ r.jsx(rh, { ctx: B }),
    /* @__PURE__ */ r.jsxs("div", { style: { position: "relative", display: "grid", gridTemplateColumns: g ? "1fr" : "232px 1fr", gridTemplateRows: g ? "1fr 64px" : "1fr", height: "100%" }, children: [
      !g && /* @__PURE__ */ r.jsx(Kp, { ctx: B }),
      /* @__PURE__ */ r.jsxs("main", { style: { overflow: "auto", padding: g ? "16px 14px 14px" : ue.pad, display: "flex", flexDirection: "column", gap: ue.gap, paddingBottom: g ? 80 : void 0 }, children: [
        g && /* @__PURE__ */ r.jsx(Xp, { ctx: B }),
        f === "home" && /* @__PURE__ */ r.jsx(window.HomeView, { ctx: B }),
        f === "music" && /* @__PURE__ */ r.jsx(window.MusicView, { ctx: B }),
        f === "cameras" && /* @__PURE__ */ r.jsx(window.CamerasView, { ctx: B }),
        f === "calendar" && /* @__PURE__ */ r.jsx(window.CalendarView, { ctx: B }),
        f === "car" && /* @__PURE__ */ r.jsx(window.CarView, { ctx: B }),
        f === "garage" && /* @__PURE__ */ r.jsx(window.GarageView, { ctx: B }),
        f === "devices" && /* @__PURE__ */ r.jsx(window.DevicesView, { ctx: B }),
        f === "automations" && /* @__PURE__ */ r.jsx(window.AutomationsView, { ctx: B }),
        f === "settings" && /* @__PURE__ */ r.jsx(window.SettingsView, { ctx: B })
      ] }),
      g && /* @__PURE__ */ r.jsx(qp, { ctx: B })
    ] }),
    /* @__PURE__ */ r.jsx(window.NowPlayingBar, { ctx: B })
  ] });
}, xa = {
  tangerine: "#e87f4a",
  terracotta: "#c96442",
  ochre: "#b8843e",
  sage: "#7a8c6c",
  plum: "#7d4f6b",
  slate: "#5b7390"
};
function Bc(e, t) {
  const n = xa[t] || xa.tangerine;
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
const rl = {
  editorial: { display: '"Newsreader", "Iowan Old Style", Georgia, serif', body: '"Inter", -apple-system, system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace' },
  classic: { display: '"Instrument Serif", "Iowan Old Style", Georgia, serif', body: '"Inter", system-ui, sans-serif', mono: '"JetBrains Mono", monospace' },
  modern: { display: '"Space Grotesk", system-ui, sans-serif', body: '"Inter", system-ui, sans-serif', mono: '"JetBrains Mono", monospace' }
}, il = {
  compact: { pad: "18px 22px", gap: 14, tilePad: 14, tileGap: 10, h1: 30, h2: 14 },
  regular: { pad: "24px 32px", gap: 18, tilePad: 18, tileGap: 14, h1: 38, h2: 15 },
  comfy: { pad: "32px 40px", gap: 24, tilePad: 22, tileGap: 18, h1: 46, h2: 16 }
}, Kp = ({ ctx: e }) => {
  const { p: t, fonts: n, page: i, setPage: o, room: l, setRoom: s, state: a, user: c } = e, d = ({ children: f }) => /* @__PURE__ */ r.jsx("div", { style: { padding: "10px 14px 4px", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: t.fg3, fontWeight: 500 }, children: f }), u = ({ active: f, onClick: b, icon: y, label: h, count: m, badge: x }) => /* @__PURE__ */ r.jsxs("button", { onClick: b, style: {
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
    /* @__PURE__ */ r.jsx(window.Icon, { name: y, size: 16, stroke: 1.5 }),
    /* @__PURE__ */ r.jsx("span", { style: { flex: 1 }, children: h }),
    m !== void 0 && m !== "" && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, color: t.fg3, fontVariantNumeric: "tabular-nums" }, children: m }),
    x && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 9, padding: "2px 6px", borderRadius: 999, background: t.accent, color: "#fff", fontWeight: 600 }, children: x })
  ] }), p = a.cameras.filter((f) => f.online).length, g = a.speakers.filter((f) => f.playing).length, v = a.calendar.length, w = a.garage.doors.filter((f) => f.open).length;
  return /* @__PURE__ */ r.jsxs("aside", { style: { borderRight: `.5px solid ${t.border}`, background: t.surface, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { padding: "20px 22px 16px", borderBottom: `.5px solid ${t.border}` }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 22, fontStyle: "italic", color: t.accent, lineHeight: 1 }, children: "HomeCNTRD" }),
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, marginTop: 6, letterSpacing: ".05em" }, children: [
        (c?.location || "HOME").toUpperCase(),
        " · ",
        (/* @__PURE__ */ new Date()).toLocaleDateString([], { weekday: "long" })
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { padding: "16px 22px 4px" }, children: /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: n.display, fontSize: 22, lineHeight: 1.15, color: t.fg, fontWeight: 500 }, children: [
      "Good evening,",
      /* @__PURE__ */ r.jsx("br", {}),
      /* @__PURE__ */ r.jsxs("em", { style: { fontStyle: "italic", color: t.accent, fontWeight: 400 }, children: [
        c?.firstName || "there",
        "."
      ] })
    ] }) }),
    /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, overflow: "auto", paddingBottom: 14, marginTop: 6 }, children: [
      /* @__PURE__ */ r.jsx(d, { children: "View" }),
      /* @__PURE__ */ r.jsx(u, { active: i === "home", onClick: () => o("home"), icon: "home", label: "Home" }),
      /* @__PURE__ */ r.jsx(u, { active: i === "music", onClick: () => o("music"), icon: "music", label: "Music", count: g ? `${g} playing` : "" }),
      /* @__PURE__ */ r.jsx(u, { active: i === "cameras", onClick: () => o("cameras"), icon: "cam", label: "Cameras", count: `${p}/${a.cameras.length}` }),
      /* @__PURE__ */ r.jsx(u, { active: i === "calendar", onClick: () => o("calendar"), icon: "cal", label: "Calendar", count: v }),
      /* @__PURE__ */ r.jsx(u, { active: i === "car", onClick: () => o("car"), icon: "car", label: "Car", count: `${a.tesla.chargePct}%` }),
      /* @__PURE__ */ r.jsx(u, { active: i === "garage", onClick: () => o("garage"), icon: "garage", label: "Garage", badge: w ? "OPEN" : "" }),
      /* @__PURE__ */ r.jsx(u, { active: i === "devices", onClick: () => o("devices"), icon: "grid", label: "Devices", count: a.integrations.filter((f) => f.status === "connected").length }),
      /* @__PURE__ */ r.jsx(u, { active: i === "automations", onClick: () => o("automations"), icon: "sparkle", label: "Automations", count: a.automations.filter((f) => f.enabled).length }),
      i === "home" && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
        /* @__PURE__ */ r.jsx(d, { children: "Rooms" }),
        window.ROOMS.map((f) => {
          const b = a.lights.filter((y) => y.room === f.id && y.on).length;
          return /* @__PURE__ */ r.jsx(u, { active: l === f.id, onClick: () => s(f.id), icon: f.icon, label: f.name, count: b > 0 ? b : "" }, f.id);
        }),
        /* @__PURE__ */ r.jsx(d, { children: "Quick scenes" }),
        a.scenes.slice(0, 4).map((f) => /* @__PURE__ */ r.jsx(u, { icon: f.icon, label: f.name, active: f.active }, f.id))
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { style: { borderTop: `.5px solid ${t.border}`, padding: 8 }, children: [
      /* @__PURE__ */ r.jsx(u, { active: i === "settings", onClick: () => o("settings"), icon: "settings", label: "Settings" }),
      /* @__PURE__ */ r.jsxs("div", { style: { padding: "10px 14px 4px", display: "flex", alignItems: "center", gap: 10, fontSize: 11, color: t.fg2 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 8, height: 8, borderRadius: "50%", background: "oklch(60% 0.15 145)" } }),
        /* @__PURE__ */ r.jsx("span", { children: "32 devices · all online" })
      ] })
    ] })
  ] });
}, Xp = ({ ctx: e }) => {
  const { p: t, fonts: n, user: i, room: o, setRoom: l, page: s } = e;
  return s !== "home" ? null : /* @__PURE__ */ r.jsxs("div", { style: { padding: "4px 2px 8px" }, children: [
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
}, qp = ({ ctx: e }) => {
  const { p: t, fonts: n, page: i, setPage: o } = e, l = [
    { id: "home", icon: "home", label: "Home" },
    { id: "music", icon: "music", label: "Music" },
    { id: "cameras", icon: "cam", label: "Cams" },
    { id: "devices", icon: "grid", label: "Devices" },
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
}, Zp = ({ p: e, children: t, style: n, ...i }) => /* @__PURE__ */ r.jsx("div", { ...i, style: {
  background: e.surface2,
  border: `.5px solid ${e.border}`,
  borderRadius: 14,
  padding: 18,
  color: e.fg,
  ...n
}, children: t }), Jp = ({ title: e, subtitle: t, p: n, fonts: i, children: o, action: l }) => /* @__PURE__ */ r.jsxs("section", { children: [
  /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 12 }, children: [
      /* @__PURE__ */ r.jsx("h2", { style: { margin: 0, fontFamily: i.display, fontSize: 20, fontWeight: 500, color: n.fg }, children: e }),
      t && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 12, color: n.fg3, fontStyle: "italic" }, children: t })
    ] }),
    l
  ] }),
  o
] }), eh = ({ ctx: e, eyebrow: t, title: n, sub: i, right: o }) => {
  const l = e.state.weather, s = (/* @__PURE__ */ new Date()).getHours(), c = s < 6 || s >= 19 ? "moon" : /cloud/i.test(l.summary) ? "cloud" : /rain/i.test(l.summary) ? "droplet" : "sun";
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
        /* @__PURE__ */ r.jsx(window.Icon, { name: c, size: 16, style: { color: e.p.accent } }),
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
}, th = ({ p: e, fonts: t, active: n, onClick: i, children: o, danger: l, style: s }) => /* @__PURE__ */ r.jsx("button", { onClick: i, style: {
  padding: "7px 12px",
  borderRadius: 8,
  cursor: "pointer",
  fontFamily: t.body,
  fontSize: 12,
  border: `.5px solid ${l ? e.danger : n ? e.accent : e.border2}`,
  background: l ? e.danger : n ? e.accentSoft : "transparent",
  color: l ? "#fff" : n ? e.accent : e.fg,
  ...s
}, children: o }), nh = ({ p: e, on: t, onChange: n, size: i = 20 }) => /* @__PURE__ */ r.jsx("button", { onClick: () => n(!t), style: {
  width: i * 1.7,
  height: i,
  borderRadius: 999,
  border: 0,
  cursor: "pointer",
  position: "relative",
  background: t ? e.accent : e.border2,
  transition: ".2s"
}, children: /* @__PURE__ */ r.jsx("span", { style: { position: "absolute", top: 2, left: t ? i * 0.7 + 2 : 2, width: i - 4, height: i - 4, borderRadius: "50%", background: "#fff", transition: ".2s" } }) }), rh = ({ ctx: e }) => {
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
};
Object.assign(window, { HearthApp: Yp, Card: Zp, Section: Jp, PageHead: eh, PillBtn: th, Toggle: nh, palette: Bc, FONT_PAIRS: rl, DENSITY: il });
const so = [
  { id: "climate", label: "Climate" },
  { id: "lights", label: "Lighting" },
  { id: "music", label: "Music" },
  { id: "tvs", label: "TVs" },
  { id: "scenes", label: "Scenes" },
  { id: "cameras", label: "Cameras" },
  { id: "security", label: "Security & access" },
  { id: "car", label: "Car & garage" },
  { id: "today", label: "Today's schedule" }
], ih = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l, room: s, user: a, patchUser: c, narrow: d } = e, u = window.ROOMS.find((m) => m.id === s), p = o.lights.filter((m) => m.room === s), g = a?.roomSections || {}, w = a?.homeSections || Object.fromEntries(so.map((m) => [m.id, !0])), f = g[s] || w, b = (m, x) => c?.((k) => {
    const j = k.roomSections && k.roomSections[s] || k.homeSections || Object.fromEntries(so.map((S) => [S.id, !0]));
    return { ...k, roomSections: { ...k.roomSections || {}, [s]: { ...j, [m]: x } } };
  }), [y, h] = React.useState(!1);
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "Currently in",
        title: `The ${u?.name || "house"}`,
        sub: `${p.filter((m) => m.on).length} lamps softly lit · ${o.thermostat.temp}° · the cat is asleep on the rug`,
        right: /* @__PURE__ */ r.jsxs("button", { onClick: () => h((m) => !m), style: {
          padding: "8px 14px",
          borderRadius: 9,
          border: `.5px solid ${y ? t.accent : t.border2}`,
          background: y ? t.accentSoft : "transparent",
          color: y ? t.accent : t.fg,
          fontSize: 12,
          cursor: "pointer",
          fontFamily: n.body,
          display: "inline-flex",
          alignItems: "center",
          gap: 6
        }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: y ? "check" : "edit", size: 12 }),
          y ? "Done" : "Customize"
        ] })
      }
    ),
    y && /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 14 }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }, children: [
        "Show in ",
        u?.name || "this room"
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 6 }, children: so.map((m) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: t.surface, border: `.5px solid ${t.border}` }, children: [
        /* @__PURE__ */ r.jsx("span", { style: { flex: 1, fontSize: 12, color: t.fg }, children: m.label }),
        /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: f[m.id] !== !1, onChange: (x) => b(m.id, x), size: 16 })
      ] }, m.id)) }),
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
}, oh = ({ ctx: e }) => {
  const { p: t, fonts: n, state: i, setState: o } = e, l = i.thermostat, s = (E) => o((D) => ({ ...D, thermostat: { ...D.thermostat, target: E } })), a = (E) => o((D) => ({ ...D, thermostat: { ...D.thermostat, mode: E } })), c = 60, d = 83, u = React.useRef(null), [p, g] = React.useState(!1), v = (E) => {
    const D = u.current.getBoundingClientRect(), ue = D.left + D.width / 2, Be = D.top + D.height / 2, B = E.clientX - ue, R = E.clientY - Be;
    let A = ((Math.atan2(R, B) * 180 / Math.PI + 360) % 360 - 135 + 360) % 360;
    A > 270 && (A = A > 315 ? 0 : 270);
    const q = A / 270;
    return Math.round(c + q * (d - c));
  }, w = (E) => {
    g(!0), u.current.setPointerCapture?.(E.pointerId), s(v(E));
  }, f = (E) => {
    p && s(v(E));
  }, b = (E) => {
    g(!1);
  }, y = 220, h = 92, m = y / 2, x = y / 2, k = (E, D) => {
    const ue = E * Math.PI / 180;
    return [m + D * Math.cos(ue), x + D * Math.sin(ue)];
  }, j = 135, S = 405, C = j + (l.target - c) / (d - c) * 270, I = j + (l.temp - c) / (d - c) * 270, T = (E, D) => {
    const [ue, Be] = k(E, h), [B, R] = k(D, h), _ = D - E > 180 ? 1 : 0;
    return `M ${ue} ${Be} A ${h} ${h} 0 ${_} 1 ${B} ${R}`;
  }, [$, be] = k(C, h);
  return /* @__PURE__ */ r.jsx(window.Section, { title: "Climate", subtitle: "Hallway · Nest", p: t, fonts: n, children: /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 24, display: "grid", gridTemplateColumns: "auto 1fr", gap: 30, alignItems: "center" }, children: [
    /* @__PURE__ */ r.jsx(
      "div",
      {
        ref: u,
        onPointerDown: w,
        onPointerMove: f,
        onPointerUp: b,
        onPointerCancel: b,
        style: { width: y, height: y, position: "relative", cursor: p ? "grabbing" : "grab", touchAction: "none", userSelect: "none", flex: "none" },
        children: /* @__PURE__ */ r.jsxs("svg", { width: y, height: y, style: { position: "absolute", inset: 0 }, children: [
          /* @__PURE__ */ r.jsx("path", { d: T(j, S), fill: "none", stroke: t.border, strokeWidth: "14", strokeLinecap: "round" }),
          /* @__PURE__ */ r.jsx("path", { d: T(Math.min(I, C), Math.max(I, C)), fill: "none", stroke: t.accentSoft, strokeWidth: "14", strokeLinecap: "round" }),
          /* @__PURE__ */ r.jsx("path", { d: T(j, C), fill: "none", stroke: t.accent, strokeWidth: "3", strokeLinecap: "round", opacity: ".75" }),
          Array.from({ length: 24 }).map((E, D) => {
            const ue = j + D / 23 * 270, [Be, B] = k(ue, h - 10), [R, _] = k(ue, h - 4);
            return /* @__PURE__ */ r.jsx("line", { x1: Be, y1: B, x2: R, y2: _, stroke: t.fg3, strokeWidth: ".5", opacity: D % 4 === 0 ? 0.6 : 0.25 }, D);
          }),
          /* @__PURE__ */ r.jsx("circle", { cx: $, cy: be, r: "11", fill: t.accent, stroke: t.surface2, strokeWidth: "3" }),
          /* @__PURE__ */ r.jsx("text", { x: m, y: x - 12, textAnchor: "middle", fill: t.fg3, fontSize: "10", fontFamily: n.body, letterSpacing: "2", children: "SET TO" }),
          /* @__PURE__ */ r.jsxs("text", { x: m, y: x + 22, textAnchor: "middle", fill: t.fg, fontSize: "50", fontFamily: n.display, fontWeight: "500", children: [
            l.target,
            "°"
          ] }),
          /* @__PURE__ */ r.jsxs("text", { x: m, y: x + 44, textAnchor: "middle", fill: t.fg3, fontSize: "11", fontFamily: n.display, fontStyle: "italic", children: [
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
      /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8 }, children: ["cool", "auto", "heat", "off"].map((E) => /* @__PURE__ */ r.jsx("button", { onClick: () => a(E), style: {
        flex: 1,
        padding: "10px 0",
        textTransform: "capitalize",
        border: `.5px solid ${E === l.mode ? t.accent : t.border2}`,
        background: E === l.mode ? t.accentSoft : "transparent",
        color: E === l.mode ? t.accent : t.fg2,
        borderRadius: 8,
        fontSize: 12,
        cursor: "pointer",
        fontFamily: n.body
      }, children: E }, E)) }),
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, fontStyle: "italic", fontFamily: n.display }, children: [
        "Drag the dial to set the target temperature. ",
        i.weather.summary.toLowerCase(),
        " outside."
      ] })
    ] })
  ] }) });
}, lh = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l, room: s } = e, a = o.lights.filter((d) => d.room === s), c = a.every((d) => d.on);
  return /* @__PURE__ */ r.jsx(
    window.Section,
    {
      title: "Lighting",
      subtitle: `${a.filter((d) => d.on).length} of ${a.length} on`,
      p: t,
      fonts: n,
      action: /* @__PURE__ */ r.jsx("button", { onClick: () => l((d) => ({ ...d, lights: d.lights.map((u) => u.room === s ? { ...u, on: !c } : u) })), style: { padding: "6px 12px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 11, cursor: "pointer", fontFamily: n.body }, children: c ? "All off" : "All on" }),
      children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: i.tileGap }, children: a.map((d) => /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 14, position: "relative", overflow: "hidden" }, children: [
        d.on && /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", right: -20, top: -20, width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, ${d.color}77, transparent 70%)` } }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: "bulb", size: 18, stroke: 1.4, style: { color: d.on ? d.color : t.fg3 } }),
          /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: d.on, size: 18, onChange: () => l((u) => ({ ...u, lights: u.lights.map((p) => p.id === d.id ? { ...p, on: !p.on } : p) })) })
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: t.fg, marginTop: 10, fontWeight: 500 }, children: d.name }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, marginTop: 1 }, children: d.on ? `${d.brightness}%` : "off" }),
        d.on && /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "range",
            min: "1",
            max: "100",
            value: d.brightness,
            onChange: (u) => l((p) => ({ ...p, lights: p.lights.map((g) => g.id === d.id ? { ...g, brightness: +u.target.value } : g) })),
            style: { width: "100%", marginTop: 8, accentColor: t.accent }
          }
        )
      ] }, d.id)) })
    }
  );
}, sh = ({ ctx: e }) => {
  const { p: t, fonts: n, state: i, setState: o, room: l, setPage: s } = e, a = i.speakers.find((u) => u.room === l) || i.speakers[0];
  if (!a) return null;
  const c = window.trackById(a.trackId), d = () => o((u) => ({ ...u, speakers: u.speakers.map((p) => p.id === a.id ? { ...p, playing: !a.playing } : p) }));
  return /* @__PURE__ */ r.jsx(
    window.Section,
    {
      title: "Music",
      subtitle: `${i.speakers.filter((u) => u.playing).length} speakers playing`,
      p: t,
      fonts: n,
      action: /* @__PURE__ */ r.jsx("button", { onClick: () => s("music"), style: { padding: "6px 12px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 11, cursor: "pointer", fontFamily: n.body }, children: "Library →" }),
      children: /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 18, display: "flex", gap: 16, alignItems: "center" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 90, height: 90, borderRadius: 10, flex: "none", background: `radial-gradient(120% 120% at 30% 25%, ${c.hue}, oklch(20% 0.05 25))` } }),
        /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 10, color: t.fg3, letterSpacing: ".1em", textTransform: "uppercase" }, children: [
            "Now playing · ",
            window.ROOMS.find((u) => u.id === a.room)?.name
          ] }),
          /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 20, color: t.fg, fontWeight: 500, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: c.title }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: t.fg2, fontStyle: "italic", marginTop: 1 }, children: [
            c.artist,
            " · ",
            c.album
          ] }),
          /* @__PURE__ */ r.jsx("div", { style: { height: 3, background: t.border, borderRadius: 2, marginTop: 12, position: "relative" }, children: /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, width: `${a.progress / c.dur * 100}%`, background: t.accent, borderRadius: 2 } }) }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: t.fg3, marginTop: 4 }, children: [
            /* @__PURE__ */ r.jsx("span", { children: window.fmtTime(a.progress) }),
            /* @__PURE__ */ r.jsxs("span", { children: [
              "−",
              window.fmtTime(c.dur - a.progress)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 6, flex: "none" }, children: [
          /* @__PURE__ */ r.jsx("button", { style: { width: 34, height: 34, borderRadius: 8, background: "transparent", border: `.5px solid ${t.border2}`, color: t.fg2, cursor: "pointer" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "prev", size: 14 }) }),
          /* @__PURE__ */ r.jsx("button", { onClick: d, style: { width: 42, height: 42, borderRadius: "50%", background: t.accent, color: "#fff", border: 0, cursor: "pointer", display: "grid", placeItems: "center" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: a.playing ? "pause" : "play", size: 16 }) }),
          /* @__PURE__ */ r.jsx("button", { style: { width: 34, height: 34, borderRadius: 8, background: "transparent", border: `.5px solid ${t.border2}`, color: t.fg2, cursor: "pointer" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "next", size: 14 }) })
        ] })
      ] })
    }
  );
}, ah = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e;
  return /* @__PURE__ */ r.jsx(window.Section, { title: "Scenes", subtitle: "Tap to activate", p: t, fonts: n, children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: i.tileGap }, children: o.scenes.map((s) => /* @__PURE__ */ r.jsxs("button", { onClick: () => l((a) => ({ ...a, scenes: a.scenes.map((c) => ({ ...c, active: c.id === s.id })) })), style: {
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
}, dh = ({ ctx: e }) => {
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
}, ol = [
  { id: "disarmed", label: "Disarmed", icon: "shield", desc: "Sensors off · all clear", color: "oklch(55% 0.05 80)" },
  { id: "home", label: "Home", icon: "home", desc: "Perimeter armed · interior bypassed", color: "oklch(60% 0.13 145)" },
  { id: "away", label: "Away", icon: "lock", desc: "Full system armed · entry delay 30s", color: "oklch(58% 0.16 30)" }
], Vc = ({ ctx: e, compact: t }) => {
  const { p: n, fonts: i, state: o, setState: l } = e, s = o.ring?.mode || "disarmed", a = (d) => {
    l((u) => ({
      ...u,
      ring: { ...u.ring || {}, mode: d, lastChanged: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), changedBy: "You" },
      // Away also locks everything
      locks: d === "away" ? u.locks.map((p) => ({ ...p, locked: !0 })) : u.locks
    }));
  }, c = ol.find((d) => d.id === s);
  return /* @__PURE__ */ r.jsxs(window.Card, { p: n, style: { padding: t ? 12 : 16 }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { width: 24, height: 24, borderRadius: 5, background: "#1f1f1f", color: "#fff", display: "grid", placeItems: "center", fontSize: 9, fontWeight: 700, flex: "none" }, children: "R" }),
      /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: n.fg, fontWeight: 500 }, children: "Ring Alarm" }),
        /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 10, color: n.fg3 }, children: [
          c.desc,
          " · ",
          o.ring?.lastChanged,
          " by ",
          o.ring?.changedBy
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { width: 7, height: 7, borderRadius: "50%", background: c.color } })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }, children: ol.map((d) => {
      const u = d.id === s;
      return /* @__PURE__ */ r.jsxs("button", { onClick: () => a(d.id), style: {
        padding: t ? "8px 6px" : "10px 8px",
        borderRadius: 8,
        border: `.5px solid ${u ? d.color : n.border2}`,
        background: u ? `color-mix(in oklch, ${d.color} 14%, transparent)` : n.surface,
        color: u ? d.color : n.fg,
        cursor: "pointer",
        fontFamily: i.body,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        transition: "border-color .15s, background .15s"
      }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: d.icon, size: 14 }),
        /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, fontWeight: u ? 600 : 500 }, children: d.label })
      ] }, d.id);
    }) })
  ] });
}, ch = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, s = o.locks.every((d) => d.locked), a = o.ring?.mode || "disarmed", c = ol.find((d) => d.id === a);
  return /* @__PURE__ */ r.jsxs(
    window.Section,
    {
      title: "Security & access",
      subtitle: `${c.label} · ${s ? "all locked" : "something is open"}`,
      p: t,
      fonts: n,
      action: /* @__PURE__ */ r.jsx("button", { onClick: () => l((d) => ({ ...d, locks: d.locks.map((u) => ({ ...u, locked: !0 })) })), style: { padding: "6px 12px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 11, cursor: "pointer", fontFamily: n.body }, children: "Lock all" }),
      children: [
        /* @__PURE__ */ r.jsx("div", { style: { marginBottom: i.tileGap }, children: /* @__PURE__ */ r.jsx(Vc, { ctx: e }) }),
        /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: i.tileGap }, children: o.locks.map((d) => /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 14, display: "flex", alignItems: "center", gap: 12 }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: "lock", size: 20, style: { color: d.locked ? "oklch(60% 0.13 145)" : t.accent } }),
          /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: t.fg, fontWeight: 500 }, children: d.name }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, marginTop: 1 }, children: d.locked ? "Locked" : "Unlocked" })
          ] }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => l((u) => ({ ...u, locks: u.locks.map((p) => p.id === d.id ? { ...p, locked: !p.locked } : p) })), style: { padding: "5px 10px", borderRadius: 999, border: `.5px solid ${d.locked ? t.border2 : t.accent}`, background: d.locked ? "transparent" : t.accentSoft, color: d.locked ? t.fg2 : t.accent, fontSize: 11, cursor: "pointer" }, children: d.locked ? "Unlock" : "Lock" })
        ] }, d.id)) })
      ]
    }
  );
}, uh = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setPage: l } = e, s = o.tesla, a = o.garage.doors.filter((c) => c.open).length;
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
      /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 5, marginTop: 10 }, children: o.garage.doors.map((c) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: t.fg2 }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: "garage", size: 11, style: { color: c.open ? t.accent : t.fg3 } }),
        /* @__PURE__ */ r.jsx("span", { style: { flex: 1 }, children: c.name }),
        /* @__PURE__ */ r.jsx("span", { style: { color: c.open ? t.accent : t.fg3, fontSize: 11 }, children: c.open ? "Open" : "Closed" })
      ] }, c.id)) })
    ] })
  ] }) });
}, fh = ({ ctx: e }) => {
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
            /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: s.on, size: 16, onChange: (c) => e.setState((d) => ({ ...d, alarms: d.alarms.map((u) => u.id === s.id ? { ...u, on: c } : u) })) })
          ] }, s.id))
        ] })
      ] })
    }
  );
}, ph = ({ c: e, ctx: t }) => {
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
Object.assign(window, { HomeView: ih, ClimateSection: oh, LightsSection: lh, MusicSection: sh, ScenesSection: ah, CamerasSection: dh, SecuritySection: ch, CarSection: uh, TodaySection: fh, CamThumb: ph, RingModeSwitcher: Vc });
const hh = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, [s, a] = React.useState("library"), [c, d] = React.useState(window.PLAYLISTS[0].id), [u, p] = React.useState(""), [g, v] = React.useState(o.speakers[0].id), w = o.speakers.find((S) => S.id === g) || o.speakers[0], f = (S, C = g) => {
    l((I) => ({
      ...I,
      speakers: I.speakers.map((T) => T.id === C ? { ...T, trackId: S, progress: 0, playing: !0 } : T)
    }));
  }, b = (S) => l((C) => ({
    ...C,
    speakers: C.speakers.map((I) => I.id === S ? { ...I, playing: !I.playing } : I)
  })), y = (S, C) => l((I) => ({
    ...I,
    speakers: I.speakers.map((T) => T.id === S ? { ...T, vol: C } : T)
  })), h = (S, C) => {
    l((I) => {
      const T = I.playlists || JSON.parse(JSON.stringify(window.PLAYLISTS));
      return {
        ...I,
        playlists: T.map(($) => $.id === S ? { ...$, tracks: $.tracks.includes(C) ? $.tracks : [...$.tracks, C], count: $.count + ($.tracks.includes(C) ? 0 : 1) } : $)
      };
    });
  }, m = (S, C) => {
    l((I) => {
      const T = I.playlists || JSON.parse(JSON.stringify(window.PLAYLISTS));
      return {
        ...I,
        playlists: T.map(($) => $.id === S ? { ...$, tracks: $.tracks.filter((be) => be !== C), count: Math.max(0, $.count - 1) } : $)
      };
    });
  }, x = o.playlists || window.PLAYLISTS, k = x.find((S) => S.id === c), j = u ? window.TRACKS.filter((S) => (S.title + " " + S.artist + " " + S.album).toLowerCase().includes(u.toLowerCase())) : window.TRACKS;
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "Apple Music · 2,847 songs",
        title: "Library",
        sub: "frances.w@icloud.com · streaming to Sonos & AirPlay",
        right: /* @__PURE__ */ r.jsx(gh, { ctx: e, value: u, onChange: (S) => {
          p(S), S && a("search");
        } })
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "200px 1fr 320px", gap: i.gap, alignItems: "start", minHeight: 0 }, children: [
      /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: "14px 8px", position: "sticky", top: 0 }, children: [
        /* @__PURE__ */ r.jsx(Mn, { ctx: e, icon: "library", label: "Library", active: s === "library", onClick: () => a("library") }),
        /* @__PURE__ */ r.jsx(Mn, { ctx: e, icon: "clock", label: "Recently played", active: s === "recent", onClick: () => a("recent") }),
        /* @__PURE__ */ r.jsx(Mn, { ctx: e, icon: "heart", label: "Favorites", onClick: () => a("library") }),
        /* @__PURE__ */ r.jsx(Mn, { ctx: e, icon: "search", label: "Search", active: s === "search", onClick: () => a("search") }),
        /* @__PURE__ */ r.jsx("div", { style: { padding: "14px 14px 6px", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: t.fg3, fontWeight: 500 }, children: "Playlists" }),
        x.map((S) => /* @__PURE__ */ r.jsx(
          Mn,
          {
            ctx: e,
            swatches: S.art.slice(0, 4),
            label: S.name,
            active: s === "playlist" && c === S.id,
            onClick: () => {
              a("playlist"), d(S.id);
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
        yh,
        {
          ctx: e,
          pl: k,
          playOn: f,
          speaker: w,
          removeFromPlaylist: m
        }
      ) : s === "recent" ? /* @__PURE__ */ r.jsx(mi, { ctx: e, title: "Recently played", tracks: window.TRACKS.slice(0, 8), playOn: f, speaker: w, playlists: x, addToPlaylist: h }) : s === "search" ? /* @__PURE__ */ r.jsx(mi, { ctx: e, title: `Results for "${u}"`, tracks: j, playOn: f, speaker: w, playlists: x, addToPlaylist: h }) : /* @__PURE__ */ r.jsx(mh, { ctx: e, playOn: f, speaker: w, playlists: x, addToPlaylist: h, setSection: a, setActivePlaylist: d }) }),
      /* @__PURE__ */ r.jsx(
        vh,
        {
          ctx: e,
          activeSpeaker: g,
          setActiveSpeaker: v,
          togglePlay: b,
          setVol: y
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
}, Mn = ({ ctx: e, icon: t, label: n, active: i, onClick: o, swatches: l }) => {
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
    l && /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", width: 18, height: 18, borderRadius: 3, overflow: "hidden", flex: "none" }, children: l.map((c, d) => /* @__PURE__ */ r.jsx("span", { style: { background: c } }, d)) }),
    /* @__PURE__ */ r.jsx("span", { style: { flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: n })
  ] });
}, gh = ({ ctx: e, value: t, onChange: n }) => {
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
}, mh = ({ ctx: e, playOn: t, speaker: n, playlists: i, addToPlaylist: o, setSection: l, setActivePlaylist: s }) => {
  const { p: a, fonts: c, dens: d } = e;
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs(window.Card, { p: a, style: { padding: 0, overflow: "hidden", display: "flex", minHeight: 200 }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, padding: 24, display: "flex", flexDirection: "column", justifyContent: "flex-end", background: `linear-gradient(135deg, ${a.accent} 0%, oklch(35% 0.13 30) 100%)` }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: "rgba(255,255,255,.85)", letterSpacing: ".12em", textTransform: "uppercase" }, children: "Made for you" }),
        /* @__PURE__ */ r.jsx("div", { style: { fontFamily: c.display, fontSize: 30, color: "#fff", marginTop: 6, fontWeight: 500 }, children: "Frances' Picks" }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: "rgba(255,255,255,.85)", marginTop: 4, fontStyle: "italic" }, children: "91 tracks · refreshed for Tuesday" }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 14 }, children: [
          /* @__PURE__ */ r.jsxs("button", { onClick: () => t("t11"), style: { padding: "8px 18px", borderRadius: 8, border: 0, background: "#fff", color: a.accent, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: "play", size: 13 }),
            " Play"
          ] }),
          /* @__PURE__ */ r.jsx("button", { style: { padding: "8px 18px", borderRadius: 8, border: ".5px solid rgba(255,255,255,.4)", background: "transparent", color: "#fff", fontSize: 13, cursor: "pointer" }, children: "Shuffle" })
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { width: 200, position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }, children: window.PLAYLISTS[3].art.map((u, p) => /* @__PURE__ */ r.jsx("div", { style: { background: u } }, p)) })
    ] }),
    /* @__PURE__ */ r.jsx(window.Section, { title: "Recently played", p: a, fonts: c, children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: d.tileGap }, children: window.TRACKS.slice(0, 6).map((u) => /* @__PURE__ */ r.jsxs("button", { onClick: () => t(u.id), style: { padding: 0, border: 0, background: "transparent", cursor: "pointer", textAlign: "left" }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { aspectRatio: "1", borderRadius: 8, background: `radial-gradient(120% 120% at 30% 25%, ${u.hue}, oklch(15% 0.05 25))`, position: "relative", overflow: "hidden" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 70%, rgba(255,220,150,.4), transparent 55%)" } }),
        /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", bottom: 8, left: 10, right: 10, fontFamily: c.display, fontStyle: "italic", fontSize: 10, color: "rgba(255,240,210,.85)", letterSpacing: ".05em", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: u.album })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { fontFamily: c.display, fontSize: 14, color: a.fg, marginTop: 8, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: u.title }),
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: a.fg3, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: u.artist })
    ] }, u.id)) }) }),
    /* @__PURE__ */ r.jsx(window.Section, { title: "Your playlists", p: a, fonts: c, children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: d.tileGap }, children: i.map((u) => /* @__PURE__ */ r.jsxs("button", { onClick: () => {
      l("playlist"), s(u.id);
    }, style: { padding: 0, border: 0, background: "transparent", cursor: "pointer", textAlign: "left" }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { aspectRatio: "1", borderRadius: 8, display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }, children: u.art.slice(0, 4).map((p, g) => /* @__PURE__ */ r.jsx("div", { style: { background: p } }, g)) }),
      /* @__PURE__ */ r.jsx("div", { style: { fontFamily: c.display, fontSize: 14, color: a.fg, marginTop: 8, fontWeight: 500 }, children: u.name }),
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: a.fg3, marginTop: 1 }, children: [
        u.count,
        " songs"
      ] })
    ] }, u.id)) }) }),
    /* @__PURE__ */ r.jsx(window.Section, { title: "All songs", subtitle: `${window.TRACKS.length} of 2,847`, p: a, fonts: c, children: /* @__PURE__ */ r.jsx(mi, { ctx: e, tracks: window.TRACKS, playOn: t, speaker: n, playlists: i, addToPlaylist: o }) })
  ] });
}, yh = ({ ctx: e, pl: t, playOn: n, speaker: i, removeFromPlaylist: o }) => {
  const { p: l, fonts: s } = e, a = t.tracks.map((c) => window.trackById(c)).filter(Boolean);
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs(window.Card, { p: l, style: { padding: 0, overflow: "hidden", display: "flex", minHeight: 200 }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { width: 200, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, flex: "none" }, children: t.art.slice(0, 4).map((c, d) => /* @__PURE__ */ r.jsx("div", { style: { background: c } }, d)) }),
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
      mi,
      {
        ctx: e,
        tracks: a,
        playOn: n,
        speaker: i,
        rowAction: (c) => /* @__PURE__ */ r.jsxs(
          "button",
          {
            onClick: (d) => {
              d.stopPropagation(), o(t.id, c.id);
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
}, mi = ({ ctx: e, tracks: t, title: n, playOn: i, speaker: o, playlists: l, addToPlaylist: s, rowAction: a }) => {
  const { p: c, fonts: d } = e, [u, p] = React.useState(null);
  return /* @__PURE__ */ r.jsxs("div", { children: [
    n && /* @__PURE__ */ r.jsx("h2", { style: { margin: "0 0 12px", fontFamily: d.display, fontSize: 20, fontWeight: 500, color: c.fg }, children: n }),
    /* @__PURE__ */ r.jsxs(window.Card, { p: c, style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "40px 1.6fr 1fr 1fr 60px 80px", alignItems: "center", gap: 14, padding: "10px 18px", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: c.fg3, borderBottom: `.5px solid ${c.border}` }, children: [
        /* @__PURE__ */ r.jsx("span", { children: "#" }),
        /* @__PURE__ */ r.jsx("span", { children: "Title" }),
        /* @__PURE__ */ r.jsx("span", { children: "Artist" }),
        /* @__PURE__ */ r.jsx("span", { children: "Album" }),
        /* @__PURE__ */ r.jsx("span", { style: { textAlign: "right" }, children: "Time" }),
        /* @__PURE__ */ r.jsx("span", {})
      ] }),
      t.map((g, v) => {
        const w = o.trackId === g.id;
        return /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "40px 1.6fr 1fr 1fr 60px 80px", alignItems: "center", gap: 14, padding: "8px 18px", fontSize: 13, color: c.fg, borderBottom: v < t.length - 1 ? `.5px solid ${c.border}` : "none", cursor: "pointer", position: "relative" }, onDoubleClick: () => i(g.id), children: [
          /* @__PURE__ */ r.jsx("button", { onClick: () => i(g.id), style: { width: 24, height: 24, borderRadius: "50%", border: 0, background: w ? c.accent : "transparent", color: w ? "#fff" : c.fg3, cursor: "pointer", display: "grid", placeItems: "center" }, children: w && o.playing ? /* @__PURE__ */ r.jsx(xh, { p: c }) : /* @__PURE__ */ r.jsx(window.Icon, { name: "play", size: 11 }) }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, minWidth: 0 }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { width: 34, height: 34, borderRadius: 5, flex: "none", background: `radial-gradient(120% 120% at 30% 25%, ${g.hue}, oklch(20% 0.05 25))` } }),
            /* @__PURE__ */ r.jsx("div", { style: { minWidth: 0 }, children: /* @__PURE__ */ r.jsx("div", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: w ? c.accent : c.fg, fontWeight: w ? 500 : 400 }, children: g.title }) })
          ] }),
          /* @__PURE__ */ r.jsx("div", { style: { color: c.fg2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: g.artist }),
          /* @__PURE__ */ r.jsx("div", { style: { color: c.fg3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: g.album }),
          /* @__PURE__ */ r.jsx("div", { style: { textAlign: "right", color: c.fg3, fontSize: 11, fontVariantNumeric: "tabular-nums" }, children: window.fmtTime(g.dur) }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "flex-end", gap: 6, position: "relative" }, children: [
            a ? a(g) : /* @__PURE__ */ r.jsx("button", { onClick: (f) => {
              f.stopPropagation(), p(u === g.id ? null : g.id);
            }, style: {
              width: 26,
              height: 26,
              borderRadius: 6,
              border: 0,
              background: "transparent",
              color: c.fg3,
              cursor: "pointer",
              display: "grid",
              placeItems: "center"
            }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "dots", size: 14 }) }),
            u === g.id && l && /* @__PURE__ */ r.jsxs(
              "div",
              {
                style: { position: "absolute", right: 0, top: 30, width: 200, background: c.surface2, border: `.5px solid ${c.border2}`, borderRadius: 9, boxShadow: "0 12px 32px rgba(0,0,0,.18)", zIndex: 30, padding: 6 },
                onMouseLeave: () => p(null),
                children: [
                  /* @__PURE__ */ r.jsx("div", { style: { padding: "4px 10px", fontSize: 10, color: c.fg3, letterSpacing: ".1em", textTransform: "uppercase" }, children: "Add to playlist" }),
                  l.map((f) => /* @__PURE__ */ r.jsxs("button", { onClick: () => {
                    s(f.id, g.id), p(null);
                  }, style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "7px 10px",
                    borderRadius: 6,
                    border: 0,
                    background: "transparent",
                    color: c.fg,
                    fontSize: 12,
                    cursor: "pointer",
                    fontFamily: d.body,
                    textAlign: "left"
                  }, children: [
                    /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", width: 14, height: 14, borderRadius: 2, overflow: "hidden", flex: "none" }, children: f.art.slice(0, 4).map((b, y) => /* @__PURE__ */ r.jsx("span", { style: { background: b } }, y)) }),
                    f.name
                  ] }, f.id))
                ]
              }
            )
          ] })
        ] }, g.id + "-" + v);
      })
    ] })
  ] });
}, xh = ({ p: e }) => /* @__PURE__ */ r.jsxs("span", { style: { display: "inline-flex", gap: 1.5, alignItems: "flex-end", height: 10 }, children: [
  [0, 1, 2].map((t) => /* @__PURE__ */ r.jsx("span", { style: { width: 2, background: "#fff", animation: `mvBar 0.8s ${t * 0.12}s infinite ease-in-out`, height: "100%" } }, t)),
  /* @__PURE__ */ r.jsx("style", { children: "@keyframes mvBar{0%,100%{height:30%}50%{height:100%}}" })
] }), vh = ({ ctx: e, activeSpeaker: t, setActiveSpeaker: n, togglePlay: i, setVol: o }) => {
  const { p: l, fonts: s, state: a, setState: c } = e;
  return /* @__PURE__ */ r.jsxs(window.Card, { p: l, style: { padding: 0, overflow: "hidden", position: "sticky", top: 0 }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { padding: "14px 16px", borderBottom: `.5px solid ${l.border}`, display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ r.jsx(window.Icon, { name: "airplay", size: 14, style: { color: l.accent } }),
      /* @__PURE__ */ r.jsx("div", { style: { flex: 1, fontFamily: s.display, fontSize: 15, color: l.fg, fontWeight: 500 }, children: "Playing on" }),
      /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: l.fg3 }, children: [
        a.speakers.filter((d) => d.playing).length,
        " of ",
        a.speakers.length
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { maxHeight: 520, overflow: "auto" }, children: a.speakers.map((d) => {
      const u = window.trackById(d.trackId), p = d.id === t;
      return /* @__PURE__ */ r.jsxs("div", { onClick: () => n(d.id), style: {
        padding: "12px 14px",
        borderBottom: `.5px solid ${l.border}`,
        cursor: "pointer",
        background: p ? l.warm : "transparent",
        borderLeft: p ? `2px solid ${l.accent}` : "2px solid transparent"
      }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { width: 36, height: 36, borderRadius: 6, background: `radial-gradient(120% 120% at 30% 25%, ${u.hue}, oklch(20% 0.05 25))`, flex: "none" } }),
          /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: l.fg, fontWeight: 500 }, children: [
              /* @__PURE__ */ r.jsx(window.Icon, { name: d.type === "airplay" ? "airplay" : "sonos", size: 11, style: { color: l.fg3 } }),
              d.name,
              d.playing && /* @__PURE__ */ r.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "oklch(60% 0.14 145)" } })
            ] }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: l.fg3, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: d.playing ? `${u.title} · ${u.artist}` : "Idle" })
          ] }),
          /* @__PURE__ */ r.jsx("button", { onClick: (g) => {
            g.stopPropagation(), i(d.id);
          }, style: {
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: 0,
            background: d.playing ? l.accent : l.surface,
            color: d.playing ? "#fff" : l.fg2,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            flex: "none"
          }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: d.playing ? "pause" : "play", size: 11 }) })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginTop: 8 }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: "speaker", size: 11, style: { color: l.fg3 } }),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "100",
              value: d.vol,
              onChange: (g) => o(d.id, +g.target.value),
              onClick: (g) => g.stopPropagation(),
              style: { flex: 1, accentColor: l.accent, height: 3 }
            }
          ),
          /* @__PURE__ */ r.jsx("span", { style: { fontSize: 10, color: l.fg3, fontVariantNumeric: "tabular-nums", width: 20, textAlign: "right" }, children: d.vol })
        ] }),
        d.playing && /* @__PURE__ */ r.jsx("div", { style: { height: 2, background: l.border, borderRadius: 1, marginTop: 6, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${d.progress / u.dur * 100}%`, height: "100%", background: l.accent } }) })
      ] }, d.id);
    }) }),
    /* @__PURE__ */ r.jsxs("div", { style: { padding: "12px 14px", borderTop: `.5px solid ${l.border}`, display: "flex", gap: 8 }, children: [
      /* @__PURE__ */ r.jsx("button", { onClick: () => c((d) => ({ ...d, speakers: d.speakers.map((u) => ({ ...u, playing: !1 })) })), style: {
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
        const d = a.speakers.find((u) => u.id === t);
        c((u) => ({ ...u, speakers: u.speakers.map((p) => ({ ...p, group: "g1", trackId: d.trackId, progress: d.progress, playing: d.playing })) }));
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
window.MusicView = hh;
const wh = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o } = e, [l, s] = React.useState(o.cameras[0].id), a = o.cameras.find((c) => c.id === l) || o.cameras[0];
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "Ring · live",
        title: "Around the house",
        sub: `${o.cameras.filter((c) => c.online).length} live · ${o.cameras.filter((c) => c.motion).length} with motion`
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: i.gap }, children: [
      /* @__PURE__ */ r.jsxs("div", { children: [
        /* @__PURE__ */ r.jsx("div", { style: { aspectRatio: "16/9", borderRadius: 14, overflow: "hidden", position: "relative" }, children: /* @__PURE__ */ r.jsx(window.CamThumb, { c: a, ctx: e, big: !0 }) }),
        /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }, children: ["Talk", "Snapshot", "Save clip", "Mute alerts", "Spotlight"].map((c) => /* @__PURE__ */ r.jsx("button", { style: { padding: "8px 14px", borderRadius: 8, border: `.5px solid ${t.border2}`, background: t.surface2, color: t.fg, fontSize: 12, cursor: "pointer", fontFamily: n.body }, children: c }, c)) }),
        /* @__PURE__ */ r.jsx("div", { style: { marginTop: 12 }, children: /* @__PURE__ */ r.jsx(window.RingModeSwitcher, { ctx: e }) })
      ] }),
      /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, alignContent: "start" }, children: o.cameras.map((c) => /* @__PURE__ */ r.jsx("button", { onClick: () => s(c.id), style: { padding: 0, border: `.5px solid ${c.id === l ? t.accent : "transparent"}`, borderRadius: 11, background: "transparent", cursor: "pointer" }, children: /* @__PURE__ */ r.jsx(window.CamThumb, { c, ctx: e }) }, c.id)) })
    ] }),
    /* @__PURE__ */ r.jsx(window.Section, { title: "Recent activity", p: t, fonts: n, children: [
      { t: "7:38 PM", cam: "Front Door", what: "Person at front door · package delivered", dot: t.accent },
      { t: "5:14 PM", cam: "Driveway", what: "Vehicle pulled in · Frances's Subaru", dot: "oklch(60% 0.13 145)" },
      { t: "2:02 PM", cam: "Back Yard", what: "Motion · likely a deer", dot: t.fg3 },
      { t: "12:38 PM", cam: "Garage", what: "Door opened · Frances", dot: "oklch(60% 0.13 145)" }
    ].map((c, d) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 10, background: t.surface2, border: `.5px solid ${t.border}`, marginBottom: 8 }, children: [
      /* @__PURE__ */ r.jsx("div", { style: { width: 60, fontSize: 12, color: t.fg2, fontVariantNumeric: "tabular-nums" }, children: c.t }),
      /* @__PURE__ */ r.jsx("div", { style: { width: 6, height: 6, borderRadius: "50%", background: c.dot } }),
      /* @__PURE__ */ r.jsx("div", { style: { flex: 1, fontSize: 13, color: t.fg }, children: c.what }),
      /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, fontStyle: "italic" }, children: c.cam })
    ] }, d)) }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
};
window.CamerasView = wh;
const kh = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, s = (u, p, g) => l((v) => ({ ...v, calendar: v.calendar.map((w) => w.id === u ? { ...w, [p]: g } : w) })), a = (u, p) => s(u, "dnd", !p), c = (u, p) => s(u, "preMins", p), d = (u) => l((p) => ({ ...p, dnd: { active: !0, until: u.end + " (" + u.title + ")", source: u.id } }));
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: "Microsoft Outlook · frances.w@willowstudio.com",
        title: "Tuesday, May 5",
        sub: `${o.calendar.length} events · ${o.calendar.filter((u) => u.dnd).length} with Do Not Disturb`,
        right: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: /* @__PURE__ */ r.jsx(bh, { ctx: e }) })
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: i.gap, alignItems: "start" }, children: [
      /* @__PURE__ */ r.jsx(window.Card, { p: t, style: { padding: 0, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx(jh, { ctx: e }) }),
      /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: o.calendar.map((u) => /* @__PURE__ */ r.jsx(window.Card, { p: t, style: { padding: 16 }, children: /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 12, alignItems: "flex-start" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 4, alignSelf: "stretch", borderRadius: 2, background: u.dot, flex: "none" } }),
        /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 10 }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 17, fontWeight: 500, color: t.fg, flex: 1 }, children: u.title }),
            /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: t.fg2, fontVariantNumeric: "tabular-nums" }, children: [
              u.t,
              " – ",
              u.end
            ] })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 12, color: t.fg3, marginTop: 3, fontStyle: "italic" }, children: [
            u.where,
            " · ",
            u.organizer
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, marginTop: 12, padding: "10px 12px", borderRadius: 8, background: u.dnd ? t.accentSoft : t.surface, border: `.5px solid ${u.dnd ? t.accent : t.border}` }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: u.dnd ? "bellOff" : "bell", size: 14, style: { color: u.dnd ? t.accent : t.fg3 } }),
            /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, fontSize: 12 }, children: [
              /* @__PURE__ */ r.jsxs("div", { style: { color: u.dnd ? t.accent : t.fg, fontWeight: u.dnd ? 500 : 400 }, children: [
                "Do not disturb ",
                u.dnd ? "on" : "off"
              ] }),
              u.dnd && /* @__PURE__ */ r.jsxs("div", { style: { color: t.fg3, marginTop: 2, fontSize: 11 }, children: [
                "Starts ",
                u.preMins,
                " min before · ends when meeting ends"
              ] })
            ] }),
            u.dnd && /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 4 }, children: [0, 5, 10, 15].map((p) => /* @__PURE__ */ r.jsx("button", { onClick: () => c(u.id, p), style: {
              padding: "3px 7px",
              borderRadius: 5,
              fontSize: 10,
              border: `.5px solid ${p === u.preMins ? t.accent : t.border2}`,
              background: p === u.preMins ? t.accent : "transparent",
              color: p === u.preMins ? "#fff" : t.fg2,
              cursor: "pointer",
              fontFamily: n.body
            }, children: p === 0 ? "now" : `−${p}m` }, p)) }),
            /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: u.dnd, onChange: () => a(u.id, u.dnd) })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 6, marginTop: 10, fontSize: 11 }, children: [
            /* @__PURE__ */ r.jsx("span", { style: {
              padding: "3px 8px",
              borderRadius: 999,
              border: `.5px solid ${t.border2}`,
              color: u.accepted === "accepted" ? "oklch(60% 0.13 145)" : t.fg3,
              background: u.accepted === "accepted" ? "oklch(60% 0.13 145 / .12)" : "transparent"
            }, children: u.accepted === "accepted" ? "✓ Going" : "? Tentative" }),
            u.dnd && /* @__PURE__ */ r.jsx("button", { onClick: () => d(u), style: {
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
      ] }) }, u.id)) })
    ] }),
    /* @__PURE__ */ r.jsx(Sh, { ctx: e }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
}, bh = ({ ctx: e }) => {
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
}, jh = ({ ctx: e }) => {
  const { p: t, fonts: n, state: i } = e, o = 8, l = 20, s = (l - o) * 60, a = 44, c = (l - o) * a, d = (v) => {
    const [, w, f, b] = v.match(/(\d+):(\d+)\s*(AM|PM)/i);
    return (parseInt(w) % 12 + (b.toUpperCase() === "PM" ? 12 : 0)) * 60 + parseInt(f);
  }, u = (v) => (d(v) - o * 60) / s * c, g = (19 * 60 + 42 - o * 60) / s * c;
  return /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "60px 1fr", height: c, fontSize: 11 }, children: [
    /* @__PURE__ */ r.jsx("div", { children: Array.from({ length: l - o }).map((v, w) => /* @__PURE__ */ r.jsxs("div", { style: { height: a, color: t.fg3, padding: "2px 10px 0", borderTop: `.5px solid ${t.border}`, textAlign: "right" }, children: [
      (o + w) % 12 || 12,
      " ",
      o + w >= 12 ? "PM" : "AM"
    ] }, w)) }),
    /* @__PURE__ */ r.jsxs("div", { style: { position: "relative", borderLeft: `.5px solid ${t.border}` }, children: [
      Array.from({ length: l - o }).map((v, w) => /* @__PURE__ */ r.jsx("div", { style: { height: a, borderTop: `.5px solid ${t.border}` } }, w)),
      i.calendar.map((v) => {
        const w = u(v.t), b = (d(v.end) - d(v.t)) / 60 * a;
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
      /* @__PURE__ */ r.jsxs("div", { style: { position: "absolute", top: g, left: 0, right: 0, height: 1, background: t.accent, zIndex: 5 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", left: -4, top: -4, width: 9, height: 9, borderRadius: "50%", background: t.accent } }),
        /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", right: 8, top: -9, fontSize: 10, color: t.accent, fontWeight: 600, background: t.surface2, padding: "1px 5px", borderRadius: 3 }, children: "now · 7:42 PM" })
      ] })
    ] })
  ] });
}, Sh = ({ ctx: e }) => {
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
window.CalendarView = kh;
const Ch = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, s = o.tesla, a = (c, d) => l((u) => ({ ...u, tesla: { ...u.tesla, [c]: d } }));
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
        ].map((c) => /* @__PURE__ */ r.jsxs("button", { onClick: c.onClick, style: {
          padding: "12px 8px",
          borderRadius: 9,
          cursor: "pointer",
          fontFamily: n.body,
          fontSize: 11,
          border: `.5px solid ${c.active ? t.accent : t.border2}`,
          background: c.active ? t.accentSoft : t.surface,
          color: c.active ? t.accent : t.fg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6
        }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: c.icon, size: 16 }),
          /* @__PURE__ */ r.jsx("span", { children: c.label })
        ] }, c.label)) })
      ] }),
      /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 18 }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.fg3 }, children: "Cabin climate" }),
          /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: s.climateOn, onChange: (c) => a("climateOn", c) })
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
        /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }, children: ["Auto", "Defrost", "Heat seats", "Vent"].map((c) => /* @__PURE__ */ r.jsx("button", { style: { padding: "9px 0", border: `.5px solid ${t.border2}`, background: t.surface, color: t.fg, borderRadius: 8, fontSize: 11, cursor: "pointer", fontFamily: n.body }, children: c }, c)) }),
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
          /* @__PURE__ */ r.jsx(In, { p: t, label: "Charge limit", value: `${s.chargePct < 80 ? 80 : 90}%` }),
          /* @__PURE__ */ r.jsx(In, { p: t, label: "Scheduled start", value: "Tonight · 11:00 PM" }),
          /* @__PURE__ */ r.jsx(In, { p: t, label: "Charging amps", value: "48 A" }),
          /* @__PURE__ */ r.jsx(In, { p: t, label: "Voltage", value: "240 V" }),
          /* @__PURE__ */ r.jsx(In, { p: t, label: "Energy added today", value: "22.4 kWh" })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs(window.Card, { p: t, style: { padding: 18 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.fg3, marginBottom: 12 }, children: "Recent trips" }),
        [
          { dest: "Studio · Mission", time: "8:14 AM", dist: "4.2 mi", energy: "1.6 kWh" },
          { dest: "Sightglass Coffee", time: "11:32 AM", dist: "1.8 mi", energy: "0.7 kWh" },
          { dest: "Whole Foods · 4th St", time: "5:48 PM", dist: "3.1 mi", energy: "1.2 kWh" },
          { dest: "Home", time: "6:22 PM", dist: "3.0 mi", energy: "1.1 kWh" }
        ].map((c, d) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderTop: d ? `.5px solid ${t.border}` : "none", fontSize: 12 }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: "location", size: 14, style: { color: t.fg3 } }),
          /* @__PURE__ */ r.jsx("div", { style: { flex: 1, color: t.fg }, children: c.dest }),
          /* @__PURE__ */ r.jsx("div", { style: { color: t.fg3, fontVariantNumeric: "tabular-nums" }, children: c.time }),
          /* @__PURE__ */ r.jsx("div", { style: { color: t.fg3, width: 60, textAlign: "right", fontVariantNumeric: "tabular-nums" }, children: c.dist })
        ] }, d))
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
}, In = ({ p: e, label: t, value: n }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", fontSize: 12 }, children: [
  /* @__PURE__ */ r.jsx("span", { style: { color: e.fg2 }, children: t }),
  /* @__PURE__ */ r.jsx("span", { style: { color: e.fg, fontVariantNumeric: "tabular-nums" }, children: n })
] });
window.CarView = Ch;
const zh = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, s = (a) => l((c) => ({
    ...c,
    garage: { ...c.garage, doors: c.garage.doors.map((d) => d.id === a ? { ...d, open: !d.open, lastChanged: "now" } : d) }
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
          Array.from({ length: 7 }).map((c, d) => /* @__PURE__ */ r.jsx(
            "rect",
            {
              x: "54",
              y: 86 + d * 13,
              width: "132",
              height: "11",
              rx: "2",
              fill: t.dark ? "#3a3024" : "#e8d9bd",
              stroke: t.border,
              strokeWidth: ".5",
              style: {
                transform: a.open ? `translateY(-${(d + 1) * 8}px)` : "translateY(0)",
                opacity: a.open ? Math.max(0, 1 - d * 0.18) : 1,
                transition: "all .6s cubic-bezier(.5,0,.2,1)",
                transformOrigin: "center"
              }
            },
            d
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
      o.garage.history.map((a, c) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderTop: c ? `.5px solid ${t.border}` : "none", fontSize: 13 }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 60, color: t.fg3, fontVariantNumeric: "tabular-nums" }, children: a.t }),
        /* @__PURE__ */ r.jsx("div", { style: { width: 6, height: 6, borderRadius: "50%", background: a.action === "opened" ? t.accent : "oklch(60% 0.14 145)" } }),
        /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, color: t.fg }, children: [
          /* @__PURE__ */ r.jsx("b", { style: { fontWeight: 500 }, children: a.door }),
          " ",
          /* @__PURE__ */ r.jsx("span", { style: { color: t.fg2 }, children: a.action })
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, fontStyle: "italic", fontFamily: n.display }, children: a.who })
      ] }, c))
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
};
window.GarageView = zh;
const Th = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, [s, a] = React.useState(null), [c, d] = React.useState(null), u = o.integrations.filter((v) => v.status === "connected"), p = o.integrations.filter((v) => v.status === "available"), g = (v, w) => l((f) => ({
    ...f,
    integrations: f.integrations.map((b) => b.id === v ? { ...b, status: w } : b)
  }));
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      window.PageHead,
      {
        ctx: e,
        eyebrow: `${u.length} integrations connected`,
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
    /* @__PURE__ */ r.jsx(window.Section, { title: "Connected", subtitle: `${u.length} services · 32 devices`, p: t, fonts: n, children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: i.tileGap }, children: u.map((v) => /* @__PURE__ */ r.jsx(
      Rh,
      {
        ctx: e,
        integration: v,
        expanded: c === v.id,
        onClick: () => d(c === v.id ? null : v.id),
        onDisconnect: () => g(v.id, "available")
      },
      v.id
    )) }) }),
    /* @__PURE__ */ r.jsx(window.Section, { title: "Available", subtitle: "Compatible with HomeCNTRD", p: t, fonts: n, children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: i.tileGap }, children: p.map((v) => /* @__PURE__ */ r.jsxs("button", { onClick: () => a(v.id), style: {
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
      Ih,
      {
        ctx: e,
        integrationId: s,
        onClose: () => a(null),
        onConnect: (v) => {
          g(v, "connected"), a(null);
        }
      }
    ),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
}, Rh = ({ ctx: e, integration: t, expanded: n, onClick: i, onDisconnect: o }) => {
  const { p: l, fonts: s, state: a } = e, c = t, d = Mh(c.id, a);
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
      /* @__PURE__ */ r.jsx("div", { style: { width: 40, height: 40, borderRadius: 9, background: c.color + "22", color: c.color, display: "grid", placeItems: "center", flex: "none" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: c.icon, size: 20 }) }),
      /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontFamily: s.display, fontSize: 15, color: l.fg, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }, children: c.name }),
          /* @__PURE__ */ r.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "oklch(60% 0.14 145)", flex: "none" } })
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: l.fg3, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: c.account })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { style: { textAlign: "right", flex: "none" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: l.fg2, fontVariantNumeric: "tabular-nums" }, children: typeof c.devices == "number" ? `${c.devices} devices` : c.devices }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: l.fg3, marginTop: 2 }, children: n ? "Hide" : "Manage" })
      ] })
    ] }),
    n && /* @__PURE__ */ r.jsxs("div", { style: { borderTop: `.5px solid ${l.border}`, padding: "10px 14px", background: l.surface }, children: [
      c.id === "hue" || c.id === "sonos" || c.id === "ring" ? /* @__PURE__ */ r.jsx(Fh, { ctx: e, integrationId: c.id }) : d.length > 0 && /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }, children: d.map((u, p) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "5px 0", fontSize: 12, color: l.fg2, borderBottom: p < d.length - 1 ? `.5px solid ${l.border}` : "none" }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: u.icon, size: 11, style: { color: l.fg3 } }),
        /* @__PURE__ */ r.jsx("span", { style: { flex: 1 }, children: u.name }),
        /* @__PURE__ */ r.jsxs("span", { style: { fontSize: 10, color: u.online ? "oklch(60% 0.14 145)" : l.fg3 }, children: [
          "● ",
          u.online ? "online" : "offline"
        ] })
      ] }, p)) }),
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
        /* @__PURE__ */ r.jsx("button", { style: { flex: 1, padding: "6px 10px", borderRadius: 6, border: `.5px solid ${l.border2}`, background: "transparent", color: l.fg2, fontSize: 11, cursor: "pointer", fontFamily: s.body }, children: "Refresh" }),
        /* @__PURE__ */ r.jsx("button", { style: { flex: 1, padding: "6px 10px", borderRadius: 6, border: `.5px solid ${l.border2}`, background: "transparent", color: l.fg2, fontSize: 11, cursor: "pointer", fontFamily: s.body }, children: "Settings" }),
        /* @__PURE__ */ r.jsx("button", { onClick: (u) => {
          u.stopPropagation(), o();
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
function Mh(e, t) {
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
const Ih = ({ ctx: e, integrationId: t, onClose: n, onConnect: i }) => {
  const { p: o, fonts: l, state: s } = e, [a, c] = React.useState(t === "PICK" ? "pick" : "auth"), [d, u] = React.useState(t === "PICK" ? null : t), [p, g] = React.useState(0), v = s.integrations;
  React.useEffect(() => {
    if (a === "discover") {
      g(0);
      const f = setInterval(() => g((b) => b >= 100 ? (clearInterval(f), c("done"), 100) : b + 8), 80);
      return () => clearInterval(f);
    }
  }, [a]);
  const w = v.find((f) => f.id === d);
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
          u(f.id), c("auth");
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
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: o.fg3, marginTop: 2 }, children: _h(w.id) })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { marginTop: 16, padding: "14px 16px", background: o.surface, border: `.5px solid ${o.border}`, borderRadius: 10 }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: o.fg3, marginBottom: 10 }, children: "Permissions" }),
          Ph(w.id).map((f, b) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 0", fontSize: 12 }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: "check", size: 13, style: { color: o.accent, marginTop: 2, flex: "none" } }),
            /* @__PURE__ */ r.jsx("div", { style: { color: o.fg2 }, children: f })
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
          /* @__PURE__ */ r.jsx("button", { onClick: () => t === "PICK" ? c("pick") : n(), style: {
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
          /* @__PURE__ */ r.jsxs("button", { onClick: () => c("discover"), style: {
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
        /* @__PURE__ */ r.jsx("div", { style: { width: "100%", maxWidth: 300, height: 4, background: o.border, borderRadius: 2, marginTop: 20, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${p}%`, height: "100%", background: w.color, transition: "width .1s" } }) }),
        /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: o.fg3, marginTop: 12, fontVariantNumeric: "tabular-nums" }, children: [
          p,
          "%"
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: o.fg2, marginTop: 18, fontStyle: "italic", fontFamily: l.display, textAlign: "center", maxWidth: 280 }, children: p < 30 ? "Connecting securely…" : p < 60 ? "Loading your account…" : p < 90 ? `Found ${Math.floor(p / 15)} devices…` : "Almost done…" })
      ] }),
      a === "done" && w && /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 20px", textAlign: "center" }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { width: 56, height: 56, borderRadius: "50%", background: "oklch(60% 0.14 145 / .15)", color: "oklch(60% 0.14 145)", display: "grid", placeItems: "center", marginBottom: 14 }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "check", size: 28, stroke: 2.2 }) }),
        /* @__PURE__ */ r.jsxs("div", { style: { fontFamily: l.display, fontSize: 20, color: o.fg, fontWeight: 500 }, children: [
          w.name,
          " connected"
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: o.fg2, marginTop: 8, maxWidth: 340 }, children: Eh(w.id) }),
        /* @__PURE__ */ r.jsx("button", { onClick: () => i(d), style: {
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
function _h(e) {
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
function Ph(e) {
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
function Eh(e) {
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
const Fh = ({ ctx: e, integrationId: t }) => {
  const { p: n, fonts: i, state: o, setState: l } = e, s = t === "hue" ? o.lights : t === "sonos" ? o.speakers.filter((u) => u.type === "sonos") : o.cameras, a = t === "hue" ? "bulb" : t === "sonos" ? "sonos" : "cam", c = t === "hue" ? "lights" : t === "sonos" ? "speakers" : "cameras", d = (u, p) => l((g) => ({ ...g, [c]: g[c].map((v) => v.id === u ? { ...v, room: p } : v) }));
  return /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }, children: [
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: n.fg3, marginBottom: 2 }, children: "Assign rooms" }),
    s.map((u) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 7, background: n.surface2, border: `.5px solid ${n.border}` }, children: [
      /* @__PURE__ */ r.jsx(window.Icon, { name: a, size: 12, style: { color: n.fg3, flex: "none" } }),
      /* @__PURE__ */ r.jsx("span", { style: { flex: 1, fontSize: 12, color: n.fg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: u.name }),
      /* @__PURE__ */ r.jsx("select", { value: u.room, onChange: (p) => d(u.id, p.target.value), style: {
        padding: "4px 8px",
        borderRadius: 6,
        border: `.5px solid ${n.border2}`,
        background: n.surface,
        color: n.fg,
        fontSize: 11,
        fontFamily: i.body,
        cursor: "pointer",
        flex: "none"
      }, children: window.ROOMS.map((p) => /* @__PURE__ */ r.jsx("option", { value: p.id, children: p.name }, p.id)) })
    ] }, u.id))
  ] });
};
window.DevicesView = Th;
const $h = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l } = e, [s, a] = React.useState(!1), [c, d] = React.useState(""), [u, p] = React.useState(null), [g, v] = React.useState(""), w = (x) => {
    if (d(x), v(""), !x.trim()) {
      p(null);
      return;
    }
    const k = window.parseAutomation(x, o);
    k ? p(k) : (p(null), v('Try: "When there is motion at the front door, turn on the porch light"'));
  }, f = () => {
    u && (l((x) => ({ ...x, automations: [...x.automations, u] })), d(""), p(null), a(!1));
  }, b = (x) => l((k) => ({ ...k, automations: k.automations.map((j) => j.id === x ? { ...j, enabled: !j.enabled } : j) })), y = (x) => l((k) => ({ ...k, automations: k.automations.filter((j) => j.id !== x) })), h = (x) => window.runAutomation(x, o, l), m = [
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
          value: c,
          onChange: (x) => w(x.target.value),
          placeholder: "When there is motion at the front door, turn on the porch light",
          autoFocus: !0,
          style: {
            width: "100%",
            padding: "12px 14px",
            borderRadius: 10,
            border: `.5px solid ${u ? t.accent : t.border2}`,
            background: t.surface,
            color: t.fg,
            fontSize: 14,
            fontFamily: n.body,
            outline: "none",
            boxSizing: "border-box"
          }
        }
      ),
      !c && /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }, children: m.map((x) => /* @__PURE__ */ r.jsx("button", { onClick: () => w(x), style: {
        padding: "5px 10px",
        borderRadius: 999,
        border: `.5px solid ${t.border2}`,
        background: "transparent",
        color: t.fg2,
        fontSize: 11,
        cursor: "pointer",
        fontFamily: n.body
      }, children: x }, x)) }),
      u && /* @__PURE__ */ r.jsxs("div", { style: { marginTop: 14, padding: 14, borderRadius: 10, background: t.warm, border: `.5px solid ${t.border}` }, children: [
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }, children: "I understood" }),
        /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 16, color: t.fg, fontWeight: 500, marginBottom: 4 }, children: u.name }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: t.fg2, fontStyle: "italic" }, children: u.desc }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 12 }, children: [
          /* @__PURE__ */ r.jsx("button", { onClick: f, style: { padding: "8px 14px", borderRadius: 8, border: 0, background: t.accent, color: "#fff", fontSize: 12, cursor: "pointer" }, children: "Save automation" }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => {
            d(""), p(null);
          }, style: { padding: "8px 14px", borderRadius: 8, border: `.5px solid ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 12, cursor: "pointer" }, children: "Try again" })
        ] })
      ] }),
      g && !u && /* @__PURE__ */ r.jsx("div", { style: { marginTop: 10, fontSize: 12, color: t.fg3, fontStyle: "italic" }, children: g }),
      /* @__PURE__ */ r.jsxs("div", { style: { marginTop: 14, padding: "10px 12px", borderRadius: 8, background: t.surface, border: `.5px dashed ${t.border2}`, fontSize: 11, color: t.fg3 }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: "sparkle", size: 11, style: { display: "inline", verticalAlign: "middle", marginRight: 5 } }),
        "Tip: you can also just tell the agent. Say ",
        /* @__PURE__ */ r.jsx("em", { style: { color: t.accent }, children: `"when there's motion on the front door cam, turn the porch light on"` }),
        " and it'll set it up."
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: i.tileGap }, children: o.automations.map((x) => /* @__PURE__ */ r.jsx(Nh, { a: x, ctx: e, onToggle: () => b(x.id), onRemove: () => y(x.id), onRun: () => h(x) }, x.id)) }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 80 } })
  ] });
}, Nh = ({ a: e, ctx: t, onToggle: n, onRemove: i, onRun: o }) => {
  const { p: l, fonts: s, state: a } = t, c = e.trigger.type === "motion" ? "cam" : e.trigger.type === "time" ? "clock" : e.trigger.type === "leaveHome" ? "door" : "home", d = e.trigger.type === "motion" ? `Motion · ${a.cameras.find((u) => u.id === e.trigger.cameraId)?.name || "camera"}` : e.trigger.type === "time" ? `At ${e.trigger.at}` : e.trigger.type === "leaveHome" ? "When I leave" : e.trigger.type === "arriveHome" ? "When I arrive" : "Trigger";
  return /* @__PURE__ */ r.jsxs(window.Card, { p: l, style: { padding: 16, opacity: e.enabled ? 1 : 0.55 }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: 10 }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: l.accent, letterSpacing: ".05em" }, children: [
          /* @__PURE__ */ r.jsx(window.Icon, { name: c, size: 11 }),
          d
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: { fontFamily: s.display, fontSize: 16, color: l.fg, fontWeight: 500, marginTop: 6 }, children: e.name }),
        /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: l.fg2, fontStyle: "italic", marginTop: 4, lineHeight: 1.4 }, children: e.desc })
      ] }),
      /* @__PURE__ */ r.jsx(window.Toggle, { p: l, on: e.enabled, onChange: n, size: 18 })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12, paddingTop: 12, borderTop: `.5px solid ${l.border}` }, children: e.actions.map((u, p) => /* @__PURE__ */ r.jsxs("span", { style: {
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
      /* @__PURE__ */ r.jsx(window.Icon, { name: Lh(u), size: 9 }),
      Dh(u, a)
    ] }, p)) }),
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
}, Lh = (e) => e.type === "light" || e.type === "allLights" ? "bulb" : e.type === "lockAll" ? "lock" : e.type === "scene" ? "scene" : e.type === "precondition" ? "car" : e.type === "closeGarage" ? "garage" : e.type === "thermostat" ? "therm" : "sparkle", Dh = (e, t) => {
  if (e.type === "light") {
    const n = t.lights.find((i) => i.id === e.lightId);
    return `${e.on ? "On" : "Off"} · ${n?.name || "light"}`;
  }
  return e.type === "allLights" ? e.on ? "All lights on" : "All lights off" : e.type === "lockAll" ? "Lock all" : e.type === "scene" ? `Scene · ${e.sceneId}` : e.type === "precondition" ? "Precondition Tesla" : e.type === "closeGarage" ? "Close garage" : e.type === "thermostat" ? `Set ${e.target}°` : e.type;
};
Object.assign(window, { AutomationsView: $h });
const Ah = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i } = e, o = e.settings || {}, l = e.setSetting || (() => {
  }), s = [
    { id: "tangerine", name: "Tangerine", hex: "#e87f4a" },
    { id: "terracotta", name: "Terracotta", hex: "#c96442" },
    { id: "ochre", name: "Ochre", hex: "#b8843e" },
    { id: "sage", name: "Sage", hex: "#7a8c6c" },
    { id: "plum", name: "Plum", hex: "#7d4f6b" },
    { id: "slate", name: "Slate", hex: "#5b7390" }
  ], a = [
    { id: "jarvis", name: "Jarvis-y", desc: "Warm, capable, conversational" },
    { id: "terse", name: "Terse", desc: "Brief terminal-style replies" },
    { id: "playful", name: "Playful", desc: "Cheeky, light, friendly (Pip)" }
  ], c = [
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
        { id: "account", icon: "user", label: "Account" }
      ].map((d) => /* @__PURE__ */ r.jsxs("button", { onClick: () => document.getElementById(`setting-${d.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 12px",
        margin: "2px 4px",
        borderRadius: 7,
        border: 0,
        background: "transparent",
        color: t.fg2,
        fontFamily: n.body,
        fontSize: 13,
        cursor: "pointer",
        width: "calc(100% - 8px)",
        textAlign: "left"
      }, children: [
        /* @__PURE__ */ r.jsx(window.Icon, { name: d.icon, size: 14, stroke: 1.5 }),
        /* @__PURE__ */ r.jsx("span", { style: { flex: 1 }, children: d.label })
      ] }, d.id)) }),
      /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: i.gap }, children: [
        /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-appearance", style: { padding: 22 }, children: [
          /* @__PURE__ */ r.jsx(Bt, { p: t, fonts: n, title: "Appearance", sub: "How HomeCNTRD looks on this device" }),
          /* @__PURE__ */ r.jsx(je, { p: t, fonts: n, label: "Theme", desc: "Light, dark, or follow system", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8 }, children: [
            { id: !1, name: "Light", icon: "sun" },
            { id: !0, name: "Dark", icon: "moon" }
          ].map((d) => /* @__PURE__ */ r.jsxs("button", { onClick: () => l("dark", d.id), style: {
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "8px 14px",
            borderRadius: 9,
            border: `.5px solid ${o.dark === d.id ? t.accent : t.border2}`,
            background: o.dark === d.id ? t.accentSoft : "transparent",
            color: o.dark === d.id ? t.accent : t.fg,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: n.body
          }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: d.icon, size: 13 }),
            " ",
            d.name
          ] }, String(d.id))) }) }),
          /* @__PURE__ */ r.jsx(je, { p: t, fonts: n, label: "Accent color", desc: "Used across the app for highlights and status", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" }, children: s.map((d) => /* @__PURE__ */ r.jsxs("button", { onClick: () => l("hearthAccent", d.id), style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 10px 7px 7px",
            borderRadius: 999,
            border: `.5px solid ${o.hearthAccent === d.id ? t.fg : t.border2}`,
            background: o.hearthAccent === d.id ? t.warm : "transparent",
            color: t.fg,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: n.body
          }, children: [
            /* @__PURE__ */ r.jsx("span", { style: { width: 18, height: 18, borderRadius: "50%", background: d.hex, border: `.5px solid ${t.border2}` } }),
            d.name
          ] }, d.id)) }) }),
          /* @__PURE__ */ r.jsx(je, { p: t, fonts: n, label: "Density", desc: "How tightly information is packed", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8 }, children: ["compact", "regular", "comfy"].map((d) => /* @__PURE__ */ r.jsx("button", { onClick: () => l("density", d), style: {
            padding: "8px 16px",
            borderRadius: 9,
            textTransform: "capitalize",
            border: `.5px solid ${o.density === d ? t.accent : t.border2}`,
            background: o.density === d ? t.accentSoft : "transparent",
            color: o.density === d ? t.accent : t.fg,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: n.body
          }, children: d }, d)) }) }),
          /* @__PURE__ */ r.jsx(je, { p: t, fonts: n, label: "Typography", desc: "Headline pairing", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: c.map((d) => /* @__PURE__ */ r.jsxs("button", { onClick: () => l("fontPair", d.id), style: {
            padding: "10px 14px",
            borderRadius: 9,
            textAlign: "left",
            border: `.5px solid ${o.fontPair === d.id ? t.accent : t.border2}`,
            background: o.fontPair === d.id ? t.accentSoft : "transparent",
            color: t.fg,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: n.body
          }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { fontWeight: 500, color: o.fontPair === d.id ? t.accent : t.fg }, children: d.name }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10, color: t.fg3, marginTop: 2 }, children: d.desc })
          ] }, d.id)) }) })
        ] }),
        /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-agent", style: { padding: 22 }, children: [
          /* @__PURE__ */ r.jsx(Bt, { p: t, fonts: n, title: "Agent", sub: "How HomeCNTRD speaks to you" }),
          /* @__PURE__ */ r.jsx(je, { p: t, fonts: n, label: "Personality", desc: "Persona used when chatting and reading status", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: a.map((d) => /* @__PURE__ */ r.jsxs("button", { onClick: () => l("agentTone", d.id), style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 9,
            textAlign: "left",
            border: `.5px solid ${o.agentTone === d.id ? t.accent : t.border2}`,
            background: o.agentTone === d.id ? t.accentSoft : "transparent",
            color: t.fg,
            cursor: "pointer",
            fontFamily: n.body
          }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { width: 22, height: 22, borderRadius: "50%", background: t.accent, color: "#fff", display: "grid", placeItems: "center", flex: "none" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: "sparkle", size: 11 }) }),
            /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, fontWeight: o.agentTone === d.id ? 500 : 400 }, children: d.name }),
              /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, marginTop: 1 }, children: d.desc })
            ] }),
            o.agentTone === d.id && /* @__PURE__ */ r.jsx(window.Icon, { name: "check", size: 14, style: { color: t.accent } })
          ] }, d.id)) }) }),
          /* @__PURE__ */ r.jsx(je, { p: t, fonts: n, label: "Voice activation", desc: "Wake on 'Hey HomeCNTRD'", inline: !0, children: /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: o.wake !== !1, onChange: (d) => l("wake", d) }) }),
          /* @__PURE__ */ r.jsx(je, { p: t, fonts: n, label: "Suggestions on home", desc: "Show suggested commands when you open the agent", inline: !0, children: /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: o.suggestions !== !1, onChange: (d) => l("suggestions", d) }) })
        ] }),
        /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-devices", style: { padding: 22 }, children: [
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
          ].map((d) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 9, border: `.5px solid ${t.border}`, background: t.surface }, children: [
            /* @__PURE__ */ r.jsx(window.Icon, { name: d.icon, size: 15, style: { color: t.fg3 } }),
            /* @__PURE__ */ r.jsx("div", { style: { flex: 1, fontSize: 13, color: t.fg }, children: d.name }),
            /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: o[d.k] !== !1, onChange: (u) => l(d.k, u) })
          ] }, d.k)) })
        ] }),
        /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-home", style: { padding: 22 }, children: [
          /* @__PURE__ */ r.jsx(Bt, { p: t, fonts: n, title: "Household", sub: "People & places" }),
          /* @__PURE__ */ r.jsx(je, { p: t, fonts: n, label: "Members", children: /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
            [
              { name: "Frances Willows", role: "Owner", mail: "frances.w@willowstudio.com" },
              { name: "Jamie Willows", role: "Member", mail: "jamie.w@willowstudio.com" },
              { name: "Guests", role: "Door codes", mail: "2 active codes" }
            ].map((d) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 9, border: `.5px solid ${t.border}`, background: t.surface }, children: [
              /* @__PURE__ */ r.jsx("div", { style: { width: 32, height: 32, borderRadius: "50%", background: t.warm, color: t.accent, display: "grid", placeItems: "center", fontFamily: n.display, fontWeight: 500, flex: "none" }, children: d.name[0] }),
              /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
                /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: t.fg }, children: d.name }),
                /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3 }, children: d.mail })
              ] }),
              /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, color: t.fg3 }, children: d.role })
            ] }, d.mail)),
            /* @__PURE__ */ r.jsxs("button", { style: { padding: "8px 12px", borderRadius: 8, border: `1px dashed ${t.border2}`, background: "transparent", color: t.fg2, fontSize: 12, cursor: "pointer", fontFamily: n.body, display: "flex", alignItems: "center", gap: 6, alignSelf: "flex-start" }, children: [
              /* @__PURE__ */ r.jsx(window.Icon, { name: "plus", size: 11 }),
              " Invite a member"
            ] })
          ] }) }),
          /* @__PURE__ */ r.jsx(je, { p: t, fonts: n, label: "Address", inline: !0, children: /* @__PURE__ */ r.jsx("span", { style: { fontSize: 13, color: t.fg2 }, children: "Willowbrook · Bernal Heights, SF" }) }),
          /* @__PURE__ */ r.jsx(je, { p: t, fonts: n, label: "Time zone", inline: !0, children: /* @__PURE__ */ r.jsx("span", { style: { fontSize: 13, color: t.fg2 }, children: "Pacific · GMT−8" }) })
        ] }),
        /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-notifications", style: { padding: 22 }, children: [
          /* @__PURE__ */ r.jsx(Bt, { p: t, fonts: n, title: "Notifications", sub: "What HomeCNTRD chimes for" }),
          [
            { k: "notifMotion", name: "Motion at the front door", desc: "Ring chime + push" },
            { k: "notifPackage", name: "Package detected", desc: "Once per delivery, all rooms" },
            { k: "notifLeak", name: "Water leak / freeze warning", desc: "Critical · breaks DND" },
            { k: "notifCharge", name: "Tesla finished charging", desc: "Once per session" },
            { k: "notifGarage", name: "Garage left open > 10 min", desc: "Repeats every 5 min until closed" },
            { k: "notifBriefing", name: "Morning briefing", desc: "7:30 AM · weather + first meeting + traffic" }
          ].map((d) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: `.5px solid ${t.border}` }, children: [
            /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: t.fg }, children: d.name }),
              /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, marginTop: 2 }, children: d.desc })
            ] }),
            /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: o[d.k] !== !1, onChange: (u) => l(d.k, u) })
          ] }, d.k))
        ] }),
        /* @__PURE__ */ r.jsxs(window.Card, { p: t, id: "setting-account", style: { padding: 22 }, children: [
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
          /* @__PURE__ */ r.jsx(je, { p: t, fonts: n, label: "Active sessions", desc: "Devices currently signed in to your HomeCNTRD account", children: /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
            (e.user?.sessions || []).map((d) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 9, background: t.surface, border: `.5px solid ${t.border}` }, children: [
              /* @__PURE__ */ r.jsx("div", { style: { width: 30, height: 30, borderRadius: 7, background: t.warm, color: t.accent, display: "grid", placeItems: "center", flex: "none" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: d.device.includes("iPhone") ? "mic" : d.device.includes("Mac") ? "grid" : d.device.includes("iPad") ? "tv" : "home", size: 14 }) }),
              /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 13, color: t.fg, fontWeight: d.current ? 500 : 400, display: "flex", alignItems: "center", gap: 6 }, children: [
                  d.device,
                  d.current && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 9, padding: "1px 6px", borderRadius: 999, background: t.accent, color: "#fff" }, children: "THIS DEVICE" })
                ] }),
                /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, marginTop: 1 }, children: [
                  d.os,
                  " · ",
                  d.loc,
                  " · ",
                  d.last
                ] })
              ] }),
              !d.current && /* @__PURE__ */ r.jsx("button", { onClick: () => e.patchUser?.((u) => ({ ...u, sessions: u.sessions.filter((p) => p.id !== d.id) })), style: { padding: "5px 9px", borderRadius: 7, border: `.5px solid ${t.border2}`, background: "transparent", color: t.danger, fontSize: 11, cursor: "pointer" }, children: "End" })
            ] }, d.id)),
            /* @__PURE__ */ r.jsx("button", { onClick: () => e.patchUser?.((d) => ({ ...d, sessions: d.sessions.filter((u) => u.current) })), style: { padding: "8px 12px", borderRadius: 8, border: `1px dashed ${t.border2}`, background: "transparent", color: t.danger, fontSize: 12, cursor: "pointer", fontFamily: n.body, alignSelf: "flex-start" }, children: "Sign out everywhere else" })
          ] }) }),
          /* @__PURE__ */ r.jsx(je, { p: t, fonts: n, label: "Connected services", desc: "Mirrors what's set up in Devices", children: /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 6 }, children: e.state.integrations.filter((d) => d.status === "connected").map((d) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, background: t.surface, border: `.5px solid ${t.border}` }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { width: 22, height: 22, borderRadius: 6, background: d.color + "22", color: d.color, display: "grid", placeItems: "center", flex: "none" }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: d.icon, size: 11 }) }),
            /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: d.name })
          ] }, d.id)) }) }),
          /* @__PURE__ */ r.jsx(je, { p: t, fonts: n, label: "Privacy", desc: "What HomeCNTRD shares and stores", children: /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column" }, children: [
            { k: "cameraIndoorRecording", name: "Record indoor cameras when home", desc: "Turn off to only record when Away mode is active" },
            { k: "shareWithApple", name: "Share routines with Apple Home", desc: "Lets HomeKit see scenes and trigger them" },
            { k: "shareWithGoogle", name: "Share with Google Home", desc: "Off · no devices currently linked to Google" },
            { k: "analytics", name: "Anonymous usage analytics", desc: "Helps improve suggestions · no audio or video" },
            { k: "voiceTraining", name: "Use my voice to train the assistant", desc: "Off · voice samples are deleted after each session" }
          ].map((d, u) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: u ? `.5px solid ${t.border}` : "none" }, children: [
            /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: t.fg }, children: d.name }),
              /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: t.fg3, marginTop: 2 }, children: d.desc })
            ] }),
            /* @__PURE__ */ r.jsx(window.Toggle, { p: t, on: !!e.user?.privacy?.[d.k], onChange: (p) => e.patchUser?.((g) => ({ ...g, privacy: { ...g.privacy, [d.k]: p } })) })
          ] }, d.k)) }) }),
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
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { style: { height: 60 } })
  ] });
}, Bt = ({ p: e, fonts: t, title: n, sub: i }) => /* @__PURE__ */ r.jsxs("div", { style: { marginBottom: 16 }, children: [
  /* @__PURE__ */ r.jsx("div", { style: { fontFamily: t.display, fontSize: 22, color: e.fg, fontWeight: 500 }, children: n }),
  i && /* @__PURE__ */ r.jsx("div", { style: { fontSize: 12, color: e.fg3, marginTop: 3, fontStyle: "italic", fontFamily: t.display }, children: i })
] }), je = ({ p: e, fonts: t, label: n, desc: i, children: o, inline: l }) => /* @__PURE__ */ r.jsxs("div", { style: { padding: "14px 0", borderTop: `.5px solid ${e.border}`, display: l ? "flex" : "block", alignItems: l ? "center" : "stretch", gap: 14 }, children: [
  /* @__PURE__ */ r.jsxs("div", { style: { flex: l ? 1 : "auto", marginBottom: l ? 0 : 12 }, children: [
    /* @__PURE__ */ r.jsx("div", { style: { fontSize: 13, color: e.fg, fontWeight: 500 }, children: n }),
    i && /* @__PURE__ */ r.jsx("div", { style: { fontSize: 11, color: e.fg3, marginTop: 3 }, children: i })
  ] }),
  o
] });
window.SettingsView = Ah;
const Oh = ({ ctx: e }) => {
  const { p: t, fonts: n, dens: i, state: o, setState: l, room: s } = e, a = o.tvs.filter((v) => v.room === s), c = a.length ? a : o.tvs, [d, u] = React.useState(null);
  if (!c.length) return null;
  const p = (v) => l((w) => ({ ...w, tvs: w.tvs.map((f) => f.id === v ? { ...f, playing: !f.playing, on: !0 } : f) })), g = (v) => l((w) => ({ ...w, tvs: w.tvs.map((f) => f.id === v ? { ...f, on: !f.on, playing: f.on ? !1 : f.playing } : f) }));
  return /* @__PURE__ */ r.jsxs(window.Section, { title: "TVs", subtitle: `${c.filter((v) => v.on).length} of ${c.length} on${a.length ? "" : " · whole house"}`, p: t, fonts: n, children: [
    /* @__PURE__ */ r.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: i.tileGap }, children: c.map((v) => /* @__PURE__ */ r.jsx(Wh, { ctx: e, tv: v, togglePlay: p, togglePower: g, openRemote: () => u(v.id) }, v.id)) }),
    d && /* @__PURE__ */ r.jsx(Bh, { ctx: e, tv: o.tvs.find((v) => v.id === d), onClose: () => u(null) })
  ] });
}, ll = {
  appletv: { label: "Apple TV", badgeBg: "#1f1f1f", badgeFg: "#fff", accent: "#a78bfa" },
  googletv: { label: "Google TV", badgeBg: "#1f1f1f", badgeFg: "#fff", accent: "#5b8cff" },
  lgthinq: { label: "LG ThinQ", badgeBg: "#a8174e", badgeFg: "#fff", accent: "#a8174e" }
}, Wh = ({ ctx: e, tv: t, togglePlay: n, togglePower: i, openRemote: o }) => {
  const { p: l, fonts: s, state: a, setState: c } = e, d = ll[t.brand] || ll.appletv, u = window.ROOMS.find((g) => g.id === t.room)?.name, p = t.dur > 0 ? t.progress / t.dur * 100 : 0;
  return /* @__PURE__ */ r.jsxs(window.Card, { p: l, style: { padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ r.jsxs("div", { style: {
      position: "relative",
      aspectRatio: "16/9",
      background: t.on ? `radial-gradient(120% 120% at 30% 25%, ${t.poster}, oklch(15% 0.05 25))` : "#0a0a0a"
    }, children: [
      /* @__PURE__ */ r.jsxs("div", { style: { position: "absolute", top: 10, left: 10, padding: "3px 8px", borderRadius: 6, background: d.badgeBg, color: d.badgeFg, fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }, children: [
        t.brand === "appletv" && /* @__PURE__ */ r.jsx(window.Icon, { name: "apple", size: 11 }),
        t.brand === "googletv" && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 11, fontWeight: 700 }, children: "▶" }),
        t.brand === "lgthinq" && /* @__PURE__ */ r.jsx("span", { style: { fontSize: 10, fontWeight: 700 }, children: "LG" }),
        d.label
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
      t.on && t.dur > 0 && /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", left: 14, right: 14, bottom: 6, height: 2, background: "rgba(255,255,255,.18)", borderRadius: 1, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${p}%`, height: "100%", background: "#fff" } }) })
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
          u,
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
        /* @__PURE__ */ r.jsx(Hh, { size: 12 }),
        " Remote"
      ] })
    ] })
  ] });
}, Hh = ({ size: e = 12 }) => /* @__PURE__ */ r.jsxs("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ r.jsx("rect", { x: "7", y: "3", width: "10", height: "18", rx: "3" }),
  /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "9", r: "2" }),
  /* @__PURE__ */ r.jsx("path", { d: "M12 14v4M10 16h4" })
] }), Bh = ({ ctx: e, tv: t, onClose: n }) => {
  const { p: i, fonts: o, setState: l, state: s } = e;
  if (!t) return null;
  const a = ll[t.brand], c = window.ROOMS.find((p) => p.id === t.room)?.name, d = (p) => l((g) => ({ ...g, tvs: g.tvs.map((v) => v.id === t.id ? { ...v, ...p } : v) })), u = (p) => {
    p === "play" && d({ playing: !0, on: !0 }), p === "pause" && d({ playing: !1 }), p === "power" && d({ on: !t.on, playing: t.on ? !1 : t.playing }), p === "mute" && d({ mute: !t.mute }), p === "volUp" && d({ vol: Math.min(100, t.vol + 2), mute: !1 }), p === "volDown" && d({ vol: Math.max(0, t.vol - 2) }), p === "next" && d({ progress: Math.min(t.dur || 9999, t.progress + 30) }), p === "prev" && d({ progress: Math.max(0, t.progress - 30) });
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
            c,
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
        t.brand === "appletv" && /* @__PURE__ */ r.jsx(Vh, { p: i, fonts: o, press: u, update: d, tv: t }),
        t.brand === "googletv" && /* @__PURE__ */ r.jsx(Uh, { p: i, fonts: o, press: u, update: d, tv: t }),
        t.brand === "lgthinq" && /* @__PURE__ */ r.jsx(Gh, { p: i, fonts: o, press: u, update: d, tv: t })
      ] })
    ] })
  ] });
}, Z = ({ p: e, fonts: t, onClick: n, children: i, size: o = 44, primary: l, danger: s, style: a, label: c }) => /* @__PURE__ */ r.jsx(
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
    onMouseDown: (d) => d.currentTarget.style.transform = "scale(.94)",
    onMouseUp: (d) => d.currentTarget.style.transform = "scale(1)",
    onMouseLeave: (d) => d.currentTarget.style.transform = "scale(1)",
    title: c,
    children: i
  }
), is = ({ p: e, fonts: t, onPress: n, accent: i, size: o = 200 }) => {
  const l = o * 0.18, s = /* @__PURE__ */ r.jsx("div", { style: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    background: `radial-gradient(circle at 50% 50%, ${e.surface} 38%, ${e.surface2} 39%, ${e.surface2} 100%)`,
    border: `.5px solid ${e.border2}`,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.4), 0 1px 2px rgba(0,0,0,.08)"
  } }), a = ({ dir: c, top: d, left: u, right: p, bottom: g, char: v }) => /* @__PURE__ */ r.jsx("button", { onClick: () => n(c), style: {
    position: "absolute",
    top: d,
    left: u,
    right: p,
    bottom: g,
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
}, mn = ({ children: e, gap: t = 10, justify: n = "space-between" }) => /* @__PURE__ */ r.jsx("div", { style: { display: "flex", justifyContent: n, alignItems: "center", gap: t, marginTop: 14 }, children: e }), Vh = ({ p: e, fonts: t, press: n, update: i, tv: o }) => /* @__PURE__ */ r.jsxs("div", { children: [
  /* @__PURE__ */ r.jsxs(mn, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n("back"), size: 40, label: "Back", children: "↶" }),
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n("home"), size: 40, label: "TV", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "tv", size: 16 }) }),
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n("power"), size: 40, danger: (o.on, !1), label: "Power", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "bolt", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ r.jsx(is, { p: e, fonts: t, accent: "#a78bfa", onPress: (l) => n(l) }) }),
  /* @__PURE__ */ r.jsxs(mn, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n("siri"), size: 40, label: "Siri", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "mic", size: 14 }) }),
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n(o.playing ? "pause" : "play"), size: 40, label: "Play/Pause", primary: !0, children: /* @__PURE__ */ r.jsx(window.Icon, { name: o.playing ? "pause" : "play", size: 14 }) }),
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n("mute"), size: 40, label: "Mute", children: /* @__PURE__ */ r.jsx(window.Icon, { name: o.mute ? "bellOff" : "speaker", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx(os, { p: e, fonts: t, tv: o, press: n }),
  /* @__PURE__ */ r.jsx(Uc, { p: e, fonts: t, tv: o, press: n }),
  /* @__PURE__ */ r.jsx(ls, { p: e, fonts: t, apps: ["Apple TV+", "Netflix", "HBO Max", "Hulu", "Disney+", "YouTube"], update: i })
] }), Uh = ({ p: e, fonts: t, press: n, update: i, tv: o }) => /* @__PURE__ */ r.jsxs("div", { children: [
  /* @__PURE__ */ r.jsxs(mn, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n("power"), size: 40, label: "Power", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "bolt", size: 14 }) }),
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n("mute"), size: 40, label: "Mute", children: /* @__PURE__ */ r.jsx(window.Icon, { name: o.mute ? "bellOff" : "speaker", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ r.jsx(is, { p: e, fonts: t, accent: "#5b8cff", onPress: (l) => n(l) }) }),
  /* @__PURE__ */ r.jsxs(mn, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n("back"), size: 40, label: "Back", children: "←" }),
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n("home"), size: 40, label: "Home", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "home", size: 14 }) }),
    /* @__PURE__ */ r.jsx(
      Z,
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
  /* @__PURE__ */ r.jsx(os, { p: e, fonts: t, tv: o, press: n }),
  /* @__PURE__ */ r.jsx(Uc, { p: e, fonts: t, tv: o, press: n }),
  /* @__PURE__ */ r.jsx(ls, { p: e, fonts: t, apps: ["YouTube", "Netflix", "Prime Video", "Disney+", "HBO Max", "Spotify"], update: i })
] }), Gh = ({ p: e, fonts: t, press: n, update: i, tv: o }) => /* @__PURE__ */ r.jsxs("div", { children: [
  /* @__PURE__ */ r.jsxs(mn, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n("power"), size: 40, danger: !0, label: "Power", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "bolt", size: 14 }) }),
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n("input"), size: 40, label: "Input", children: "▣" }),
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n("settings"), size: 40, label: "Settings", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "settings", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ r.jsx(is, { p: e, fonts: t, accent: "#a8174e", onPress: (l) => n(l) }) }),
  /* @__PURE__ */ r.jsxs(mn, { justify: "space-between", gap: 8, children: [
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n("back"), size: 40, label: "Back", children: "↩" }),
    /* @__PURE__ */ r.jsx(
      Z,
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
    /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => n("mute"), size: 40, label: "Mute", children: /* @__PURE__ */ r.jsx(window.Icon, { name: o.mute ? "bellOff" : "speaker", size: 14 }) })
  ] }),
  /* @__PURE__ */ r.jsx(os, { p: e, fonts: t, tv: o, press: n }),
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
  /* @__PURE__ */ r.jsx(ls, { p: e, fonts: t, apps: ["LG Channels", "Netflix", "Disney+", "YouTube", "Prime Video", "Apple TV"], update: i })
] }), os = ({ p: e, fonts: t, tv: n, press: i }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }, children: [
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
] }), Uc = ({ p: e, fonts: t, tv: n, press: i }) => /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "center", gap: 14, marginTop: 14 }, children: [
  /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => i("prev"), size: 38, label: "−30s", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "prev", size: 13 }) }),
  /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => i(n.playing ? "pause" : "play"), size: 50, primary: !0, label: "Play/Pause", children: /* @__PURE__ */ r.jsx(window.Icon, { name: n.playing ? "pause" : "play", size: 16 }) }),
  /* @__PURE__ */ r.jsx(Z, { p: e, fonts: t, onClick: () => i("next"), size: 38, label: "+30s", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "next", size: 13 }) })
] }), ls = ({ p: e, fonts: t, apps: n, update: i }) => /* @__PURE__ */ r.jsxs("div", { style: { marginTop: 18, paddingTop: 14, borderTop: `.5px solid ${e.border}` }, children: [
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
window.TvsSection = Oh;
const Qh = ({ ctx: e }) => {
  const { p: t, fonts: n, state: i, setState: o, narrow: l } = e, [s, a] = React.useState(!1), [c, d] = React.useState(null), u = i.speakers.filter((m) => m.playing), p = c ? i.speakers.find((m) => m.id === c) || u[0] : u.find((m) => m.room === "living") || u[0];
  if (!p) return null;
  const g = window.trackById(p.trackId), v = window.ROOMS.find((m) => m.id === p.room)?.name || p.name, w = (m) => o((x) => ({ ...x, speakers: x.speakers.map((k) => k.id === m ? { ...k, playing: !k.playing } : k) })), f = (m) => o((x) => ({ ...x, speakers: x.speakers.map((k) => {
    if (k.id !== m) return k;
    const j = k.queue || [], S = j[0] || window.TRACKS[(window.TRACKS.findIndex((C) => C.id === k.trackId) + 1) % window.TRACKS.length].id;
    return { ...k, trackId: S, queue: j.slice(1).concat(k.trackId), progress: 0 };
  }) })), b = (m) => o((x) => ({ ...x, speakers: x.speakers.map((k) => {
    if (k.id !== m) return k;
    const j = window.TRACKS.findIndex((S) => S.id === k.trackId);
    return { ...k, trackId: window.TRACKS[(j - 1 + window.TRACKS.length) % window.TRACKS.length].id, progress: 0 };
  }) })), y = (m, x) => o((k) => ({ ...k, speakers: k.speakers.map((j) => {
    if (j.id !== m) return j;
    const S = (j.queue || []).filter((C) => C !== x);
    return { ...j, trackId: x, progress: 0, playing: !0, queue: S };
  }) })), h = (m, x) => o((k) => ({ ...k, speakers: k.speakers.map(
    (j) => j.id === m ? { ...j, queue: (j.queue || []).filter((S) => S !== x) } : j
  ) }));
  if (s) {
    const m = (p.queue || []).map((x) => window.trackById(x)).filter(Boolean);
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
          background: `linear-gradient(160deg, ${g.hue} 0%, oklch(20% 0.06 25) 100%)`,
          color: "#fff"
        }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 0%, rgba(255,220,170,.25), transparent 60%)" } }),
          /* @__PURE__ */ r.jsxs("div", { style: {
            width: 96,
            height: 96,
            borderRadius: 10,
            flex: "none",
            position: "relative",
            background: `radial-gradient(120% 120% at 30% 25%, ${g.hue}, oklch(15% 0.05 25))`,
            boxShadow: "0 12px 28px rgba(0,0,0,.35)"
          }, children: [
            /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 70%, rgba(255,220,150,.4), transparent 55%)", borderRadius: 10 } }),
            /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", bottom: 6, left: 7, right: 7, fontFamily: n.display, fontStyle: "italic", fontSize: 9, color: "rgba(255,240,210,.85)", letterSpacing: ".05em", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: g.album })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0, position: "relative", paddingBottom: 2 }, children: [
            /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.85, display: "flex", alignItems: "center", gap: 6 }, children: [
              /* @__PURE__ */ r.jsx(window.Icon, { name: p.type === "airplay" ? "airplay" : "sonos", size: 11 }),
              "Playing in ",
              v,
              u.length > 1 && /* @__PURE__ */ r.jsxs("span", { style: { opacity: 0.7 }, children: [
                "· +",
                u.length - 1,
                " more"
              ] })
            ] }),
            /* @__PURE__ */ r.jsx("div", { style: { fontFamily: n.display, fontSize: 22, fontWeight: 500, marginTop: 4, lineHeight: 1.15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: g.title }),
            /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 13, opacity: 0.85, marginTop: 2, fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: [
              g.artist,
              " · ",
              g.album
            ] }),
            /* @__PURE__ */ r.jsx("button", { onClick: () => a(!1), style: { position: "absolute", top: -6, right: -2, width: 28, height: 28, borderRadius: "50%", border: 0, background: "rgba(0,0,0,.25)", color: "#fff", cursor: "pointer", display: "grid", placeItems: "center", fontSize: 16, lineHeight: 1 }, children: "×" })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { padding: "12px 18px 14px", borderBottom: `.5px solid ${t.border}` }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { height: 3, background: t.border, borderRadius: 2, position: "relative", overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${p.progress / g.dur * 100}%`, height: "100%", background: t.accent, borderRadius: 2, transition: "width .8s linear" } }) }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: t.fg3, marginTop: 5, fontVariantNumeric: "tabular-nums" }, children: [
            /* @__PURE__ */ r.jsx("span", { children: window.fmtTime(p.progress) }),
            /* @__PURE__ */ r.jsxs("span", { children: [
              "−",
              window.fmtTime(g.dur - p.progress)
            ] })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 10 }, children: [
            /* @__PURE__ */ r.jsx("button", { onClick: () => b(p.id), style: Tt(t, 36), children: /* @__PURE__ */ r.jsx(window.Icon, { name: "prev", size: 15 }) }),
            /* @__PURE__ */ r.jsx("button", { onClick: () => w(p.id), style: { ...Tt(t, 46), background: t.accent, color: "#fff", border: 0 }, children: /* @__PURE__ */ r.jsx(window.Icon, { name: p.playing ? "pause" : "play", size: 18 }) }),
            /* @__PURE__ */ r.jsx("button", { onClick: () => f(p.id), style: Tt(t, 36), children: /* @__PURE__ */ r.jsx(window.Icon, { name: "next", size: 15 }) }),
            /* @__PURE__ */ r.jsx("div", { style: { flex: 1 } }),
            /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, color: t.fg3 }, children: [
              /* @__PURE__ */ r.jsx(window.Icon, { name: "speaker", size: 12 }),
              /* @__PURE__ */ r.jsx(
                "input",
                {
                  type: "range",
                  min: "0",
                  max: "100",
                  value: p.vol,
                  onChange: (x) => o((k) => ({ ...k, speakers: k.speakers.map((j) => j.id === p.id ? { ...j, vol: +x.target.value } : j) })),
                  style: { width: 88, accentColor: t.accent, height: 3 }
                }
              )
            ] })
          ] })
        ] }),
        u.length > 1 && /* @__PURE__ */ r.jsx("div", { style: { padding: "10px 14px", borderBottom: `.5px solid ${t.border}`, display: "flex", gap: 6, overflowX: "auto" }, children: u.map((x) => {
          const k = window.trackById(x.trackId), j = window.ROOMS.find((C) => C.id === x.room)?.name || x.name, S = x.id === p.id;
          return /* @__PURE__ */ r.jsxs("button", { onClick: () => d(x.id), style: {
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
              m.length,
              " song",
              m.length === 1 ? "" : "s"
            ] })
          ] }),
          m.length === 0 ? /* @__PURE__ */ r.jsx("div", { style: { padding: "18px 18px 22px", fontSize: 12, color: t.fg3, fontStyle: "italic", fontFamily: n.display }, children: "Queue is empty. The next track in your library will play after this one." }) : m.map((x, k) => /* @__PURE__ */ r.jsxs(
            "div",
            {
              onClick: () => y(p.id, x.id),
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
                  j.stopPropagation(), h(p.id, x.id);
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
      onClick: (m) => {
        m.detail;
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
          background: `radial-gradient(120% 120% at 30% 25%, ${g.hue}, oklch(20% 0.05 25))`
        }, children: /* @__PURE__ */ r.jsx("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 70%, rgba(255,220,150,.35), transparent 55%)", borderRadius: 7 } }) }),
        /* @__PURE__ */ r.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: t.fg, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.2 }, children: [
            g.title,
            p.playing && /* @__PURE__ */ r.jsx(Yh, { p: t })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { style: { fontSize: 11, color: t.fg3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 1 }, children: [
            /* @__PURE__ */ r.jsx("span", { style: { color: t.fg2 }, children: g.artist }),
            /* @__PURE__ */ r.jsxs("span", { children: [
              " · ",
              v
            ] }),
            u.length > 1 && /* @__PURE__ */ r.jsxs("span", { children: [
              " +",
              u.length - 1
            ] })
          ] }),
          /* @__PURE__ */ r.jsx("div", { style: { height: 2, background: t.border, borderRadius: 1, marginTop: 3, overflow: "hidden" }, children: /* @__PURE__ */ r.jsx("div", { style: { width: `${p.progress / g.dur * 100}%`, height: "100%", background: t.accent, transition: "width .8s linear" } }) })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 2, flex: "none" }, onClick: (m) => m.stopPropagation(), children: [
          /* @__PURE__ */ r.jsx("button", { onClick: () => b(p.id), style: Tt(t, 28), title: "Previous", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "prev", size: 12 }) }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => w(p.id), style: { ...Tt(t, 32), background: t.accent, color: "#fff", border: 0 }, title: p.playing ? "Pause" : "Play", children: /* @__PURE__ */ r.jsx(window.Icon, { name: p.playing ? "pause" : "play", size: 13 }) }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => f(p.id), style: Tt(t, 28), title: "Next", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "next", size: 12 }) }),
          /* @__PURE__ */ r.jsx("button", { onClick: () => a(!0), style: Tt(t, 28), title: "Show queue", children: /* @__PURE__ */ r.jsx(window.Icon, { name: "queue", size: 12 }) })
        ] })
      ]
    }
  );
}, Tt = (e, t) => ({
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
}), Yh = ({ p: e }) => /* @__PURE__ */ r.jsxs("span", { style: { display: "inline-flex", gap: 1.5, alignItems: "flex-end", height: 9, marginLeft: 4 }, children: [
  [0, 1, 2].map((t) => /* @__PURE__ */ r.jsx("span", { style: { width: 2, background: e.accent, animation: `npbBar 0.9s ${t * 0.13}s infinite ease-in-out`, height: "100%", borderRadius: 1 } }, t)),
  /* @__PURE__ */ r.jsx("style", { children: "@keyframes npbBar{0%,100%{height:25%}50%{height:100%}}" })
] });
window.NowPlayingBar = Qh;
function Kh() {
  return typeof window < "u" && (window.SpeechRecognition || window.webkitSpeechRecognition);
}
function Xh({ lang: e = "en-US", onPartial: t } = {}) {
  const n = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!n) return Promise.reject(new Error("SpeechRecognition not supported in this browser"));
  const i = new n();
  return i.lang = e, i.continuous = !1, i.interimResults = !!t, i.maxAlternatives = 1, new Promise((o, l) => {
    let s = "", a = null;
    const c = () => {
      clearTimeout(a), i.onresult = i.onerror = i.onend = null;
    };
    i.onresult = (d) => {
      let u = "";
      for (let p = d.resultIndex; p < d.results.length; p++) {
        const g = d.results[p][0].transcript;
        d.results[p].isFinal ? s += g : u += g;
      }
      t && u && t(u);
    }, i.onerror = (d) => {
      c(), l(new Error(d.error || "Recognition error"));
    }, i.onend = () => {
      c(), s.trim() ? o(s.trim()) : l(new Error("No speech detected"));
    }, a = setTimeout(() => {
      try {
        i.stop();
      } catch {
      }
    }, 12e3);
    try {
      i.start();
    } catch (d) {
      c(), l(d);
    }
  });
}
function ao(e, { rate: t = 1, pitch: n = 1, lang: i = "en-US" } = {}) {
  if (!e || typeof window > "u" || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
  }
  const o = new SpeechSynthesisUtterance(e);
  o.rate = t, o.pitch = n, o.lang = i, window.speechSynthesis.speak(o);
}
function qh() {
  if (!(typeof window > "u"))
    try {
      window.speechSynthesis?.cancel();
    } catch {
    }
}
const Zh = (() => {
  if (typeof window > "u") return ["localhost"];
  const e = /* @__PURE__ */ new Set(), t = window.location.hostname || "localhost";
  return e.add(t), e.add("homeassistant.local"), /\.ts\.net$/.test(t) && e.add(t), Array.from(e);
})();
function Jh(e, t = {}) {
  const n = e.toLowerCase().replace(/\s+/g, ""), i = Zh.map((o) => `parent=${encodeURIComponent(o)}`).join("&");
  return `https://player.twitch.tv/?channel=${encodeURIComponent(n)}&${i}&muted=${t.muted ? "true" : "false"}`;
}
function eg(e, t = {}) {
  return `https://www.youtube.com/embed/${encodeURIComponent(e)}?autoplay=${t.autoplay === !1 ? 0 : 1}`;
}
function tg(e) {
  const t = e.replace(/^@/, "");
  return `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(t)}&autoplay=1`;
}
function ng(e) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(e)}`;
}
function rg(e) {
  return `https://player.vimeo.com/video/${encodeURIComponent(e)}?autoplay=1`;
}
const _n = {
  twitch: Jh,
  youtube: eg,
  youtubeChannel: tg,
  youtubeSearch: ng,
  vimeo: rg
}, ig = [
  // "open <name> on twitch" / "watch <name> on twitch"
  {
    re: /^(?:open|watch|put on|play|start|launch)\s+(.+?)(?:'s)?\s+(?:stream\s+)?on\s+twitch\b.*$/i,
    handler: (e) => ({ type: "open_url", label: "Esfand on Twitch", url: _n.twitch(e[1].trim()) })
  },
  {
    re: /^(?:open|watch|launch)\s+twitch(?:\s+(?:stream\s+)?(?:for|of)\s+)?\s*(.+)?$/i,
    handler: (e) => {
      const t = (e[1] || "").trim();
      return t ? { type: "open_url", label: `${t} on Twitch`, url: _n.twitch(t) } : { type: "speech", text: "Which Twitch channel?" };
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
    handler: (e) => ({ type: "open_url", label: `YouTube: ${e[1].trim()}`, url: _n.youtubeSearch(e[1].trim()) })
  },
  // "play youtube video <id>"
  {
    re: /^(?:open|play|watch)\s+youtube\s+(?:video\s+)?([\w-]{6,15})\s*$/i,
    handler: (e) => ({ type: "open_url", label: "YouTube", url: _n.youtube(e[1]) })
  },
  // Vimeo
  {
    re: /^(?:open|watch|play)\s+vimeo\s+(\d+)\s*$/i,
    handler: (e) => ({ type: "open_url", label: "Vimeo", url: _n.vimeo(e[1]) })
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
function og(e) {
  if (!e) return null;
  const t = e.trim().replace(/[.!?]+$/, "");
  for (const { re: n, handler: i } of ig) {
    const o = t.match(n);
    if (o) return i(o);
  }
  return null;
}
async function lg(e, t, { agentId: n } = {}) {
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
const Pr = 56, co = "#e87f4a", va = "#f1ead9";
function sg({ hass: e, onOpenUrl: t, onCloseBrowser: n, onNavigate: i }) {
  const [o, l] = K.useState("idle"), [s, a] = K.useState(null), [c, d] = K.useState(""), [u, p] = K.useState(""), g = Kh(), v = K.useRef(null), w = K.useRef(null);
  K.useEffect(() => {
    o === "typing" && w.current && w.current.focus();
  }, [o]);
  const f = (j, S = 5e3) => {
    clearTimeout(v.current), a(j), S > 0 && (v.current = setTimeout(() => a(null), S));
  }, b = async (j, S) => {
    if (!j) return !1;
    switch (j.type) {
      case "open_url":
        return f({ kind: "agent", text: `Opening ${j.label || j.url}` }), ao(`Opening ${j.label || "that"}`), t?.(j.url, j.label), !0;
      case "navigate":
        return i?.(j.target), !0;
      case "close_browser":
        return n?.(), f({ kind: "agent", text: "Closed." }, 1500), !0;
      case "speech":
        return f({ kind: "agent", text: j.text }), ao(j.text), !0;
      default:
        return !1;
    }
  }, y = async (j) => {
    if (!j || !j.trim()) {
      l("idle");
      return;
    }
    const S = j.trim();
    f({ kind: "user", text: S }, 4e3), l("thinking");
    const C = og(S);
    if (console.log("[ai-dot] local intent:", C), C && await b(C)) {
      l("idle");
      return;
    }
    console.log("[ai-dot] falling back to HA conversation agent");
    const I = await lg(e, S);
    console.log("[ai-dot] agent reply:", I), l("idle"), I?.speech ? (f({ kind: "agent", text: I.speech }, 7e3), ao(I.speech)) : f({ kind: "error", text: "No reply from HA's conversation agent. Set one up in HA → Settings → Voice Assistants." });
  }, h = (j) => {
    j?.preventDefault?.();
    const S = u;
    p(""), y(S);
  }, m = async () => {
    if (console.log("[ai-dot] tap, current state =", o, "voice supported =", g), o === "listening") {
      l("idle"), d("");
      return;
    }
    if (o === "typing") {
      l("idle"), p("");
      return;
    }
    if (o === "thinking") return;
    if (qh(), !g) {
      console.log("[ai-dot] no SpeechRecognition — switching to text input"), l("typing");
      return;
    }
    l("listening"), d("");
    let j = null;
    try {
      console.log("[ai-dot] starting recognition…"), j = await Xh({ onPartial: d }), console.log("[ai-dot] final transcript:", j);
    } catch (S) {
      console.warn("[ai-dot] recognition error:", S), l("idle"), d(""), f({ kind: "error", text: S.message || "Could not capture audio" });
      return;
    }
    d(""), y(j);
  }, x = {
    position: "fixed",
    right: "calc(env(safe-area-inset-right, 0px) + 18px)",
    bottom: "calc(env(safe-area-inset-bottom, 0px) + 18px)",
    width: Pr,
    height: Pr,
    borderRadius: "50%",
    background: o === "listening" ? "#c14d36" : co,
    border: 0,
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(0,0,0,.45), 0 0 0 4px rgba(232,127,74,.2)",
    display: "grid",
    placeItems: "center",
    zIndex: 99999,
    transition: "background .2s, transform .15s",
    transform: o === "listening" ? "scale(1.05)" : "scale(1)",
    fontFamily: '"Inter", system-ui, sans-serif'
  }, k = {
    position: "absolute",
    inset: -8,
    borderRadius: "50%",
    border: `2px solid ${o === "listening" ? "#c14d36" : co}`,
    opacity: o === "listening" ? 0.6 : 0,
    animation: o === "listening" ? "aiRing 1.2s ease-out infinite" : "none",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs("button", { onClick: m, "aria-label": g ? "Tap to talk" : "Tap to type a command", style: x, children: [
      /* @__PURE__ */ r.jsx("span", { style: k }),
      o === "idle" && (g ? /* @__PURE__ */ r.jsx(wa, {}) : /* @__PURE__ */ r.jsx(ka, {})),
      o === "listening" && /* @__PURE__ */ r.jsx(wa, { active: !0 }),
      o === "thinking" && /* @__PURE__ */ r.jsx(ag, {}),
      o === "typing" && /* @__PURE__ */ r.jsx(ka, { active: !0 })
    ] }),
    o === "typing" && /* @__PURE__ */ r.jsxs("form", { onSubmit: h, style: {
      position: "fixed",
      right: "calc(env(safe-area-inset-right, 0px) + 18px)",
      bottom: `calc(env(safe-area-inset-bottom, 0px) + ${Pr + 14}px)`,
      width: "min(420px, calc(100vw - 36px))",
      padding: "10px 12px",
      background: "rgba(31,27,22,.96)",
      border: ".5px solid rgba(241,234,217,.18)",
      borderRadius: 14,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      zIndex: 99998,
      boxShadow: "0 12px 32px rgba(0,0,0,.5)",
      display: "flex",
      alignItems: "center",
      gap: 8
    }, children: [
      /* @__PURE__ */ r.jsx(
        "input",
        {
          ref: w,
          value: u,
          onChange: (j) => p(j.target.value),
          placeholder: 'e.g. "open Esfand on Twitch"',
          style: {
            flex: 1,
            padding: "8px 10px",
            borderRadius: 8,
            border: ".5px solid rgba(241,234,217,.18)",
            background: "rgba(241,234,217,.04)",
            color: va,
            fontSize: 14,
            fontFamily: '"Inter", system-ui, sans-serif',
            outline: "none"
          },
          autoCorrect: "off",
          autoCapitalize: "none"
        }
      ),
      /* @__PURE__ */ r.jsx("button", { type: "submit", style: {
        padding: "8px 14px",
        borderRadius: 8,
        border: 0,
        background: co,
        color: "#fff",
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "inherit"
      }, children: "Send" })
    ] }),
    (s || c) && /* @__PURE__ */ r.jsxs("div", { style: {
      position: "fixed",
      right: "calc(env(safe-area-inset-right, 0px) + 18px)",
      bottom: `calc(env(safe-area-inset-bottom, 0px) + ${Pr + 30}px)`,
      maxWidth: "min(360px, calc(100vw - 36px))",
      padding: "12px 14px",
      background: s?.kind === "error" ? "rgba(217,100,80,.18)" : "rgba(31,27,22,.96)",
      color: s?.kind === "error" ? "#ec8b78" : va,
      border: s?.kind === "error" ? ".5px solid rgba(217,100,80,.4)" : ".5px solid rgba(241,234,217,.14)",
      borderRadius: 14,
      fontSize: 13,
      lineHeight: 1.4,
      fontFamily: '"Inter", system-ui, sans-serif',
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      zIndex: 99998,
      boxShadow: "0 12px 32px rgba(0,0,0,.5)",
      animation: "aiBubble .18s ease-out"
    }, children: [
      c && /* @__PURE__ */ r.jsxs("div", { style: { color: "rgba(241,234,217,0.55)", fontStyle: "italic" }, children: [
        c,
        "…"
      ] }),
      s && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
        s.kind === "user" && /* @__PURE__ */ r.jsx("div", { style: { fontSize: 10.5, color: "rgba(241,234,217,.45)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }, children: "You" }),
        /* @__PURE__ */ r.jsx("div", { children: s.text })
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("style", { children: `
        @keyframes aiRing {
          0%   { transform: scale(1);   opacity: .6; }
          100% { transform: scale(1.6); opacity: 0;  }
        }
        @keyframes aiBubble {
          from { transform: translateY(8px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        @keyframes aiSpin {
          to { transform: rotate(360deg); }
        }
      ` })
  ] });
}
function wa({ active: e }) {
  return /* @__PURE__ */ r.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ r.jsx("rect", { x: "9", y: "3", width: "6", height: "12", rx: "3", fill: e ? "currentColor" : "none" }),
    /* @__PURE__ */ r.jsx("path", { d: "M5 11a7 7 0 0 0 14 0" }),
    /* @__PURE__ */ r.jsx("path", { d: "M12 18v3" })
  ] });
}
function ka({ active: e }) {
  return /* @__PURE__ */ r.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ r.jsx("path", { d: "M4 5h16v11H8l-4 4z", fill: e ? "currentColor" : "none" }) });
}
function ag() {
  return /* @__PURE__ */ r.jsx("span", { style: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    border: "2.5px solid rgba(255,255,255,.35)",
    borderTopColor: "#fff",
    animation: "aiSpin .9s linear infinite",
    display: "inline-block"
  } });
}
function dg({ url: e, label: t, onClose: n }) {
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
const cg = (
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
    showTv: !0
  }
);
class ug extends K.Component {
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
function fg({ hass: e, narrow: t, panel: n }) {
  const [i, o] = window.useTweaks(cg), [l, s] = K.useState(null), a = K.useMemo(() => {
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
  }, [e?.user, e?.config?.location_name]), [c, d] = K.useState({}), u = K.useCallback((w) => {
    d((f) => typeof w == "function" ? w({ ...a, ...f }) : { ...f, ...w });
  }, [a]), p = { ...a, ...c }, g = {
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
  return /* @__PURE__ */ r.jsxs(ug, { children: [
    /* @__PURE__ */ r.jsx("div", { style: { width: "100%", height: "100%" }, children: /* @__PURE__ */ r.jsx(
      window.HearthApp,
      {
        dark: i.dark,
        density: i.density,
        accent: i.hearthAccent,
        agentTone: i.agentTone,
        fontPair: i.fontPair,
        bgImage: i.bgImage,
        visibleDevices: g,
        settings: i,
        setSetting: o,
        user: p,
        patchUser: u,
        doLogout: v,
        narrow: !!t
      }
    ) }),
    /* @__PURE__ */ r.jsx(
      dg,
      {
        url: l?.url,
        label: l?.label,
        onClose: () => s(null)
      }
    ),
    /* @__PURE__ */ r.jsx(
      sg,
      {
        hass: e,
        onOpenUrl: (w, f) => s({ url: w, label: f }),
        onCloseBrowser: () => s(null),
        onNavigate: () => s(null)
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
          value: pg(i.hearthAccent),
          options: ["#e87f4a", "#c96442", "#b8843e", "#7a8c6c", "#7d4f6b", "#5b7390"],
          onChange: (w) => o("hearthAccent", hg(w))
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
      /* @__PURE__ */ r.jsx(window.TweakSection, { label: "Home Assistant" }),
      /* @__PURE__ */ r.jsx(window.TweakButton, { onClick: () => window.location.assign("/config/integrations"), children: "Manage devices in Home Assistant" }),
      /* @__PURE__ */ r.jsx(window.TweakSection, { label: "Account" }),
      /* @__PURE__ */ r.jsxs(window.TweakButton, { onClick: v, children: [
        "Sign out · ",
        p.email || "HA user"
      ] })
    ] })
  ] });
}
const sl = { tangerine: "#e87f4a", terracotta: "#c96442", ochre: "#b8843e", sage: "#7a8c6c", plum: "#7d4f6b", slate: "#5b7390" };
function pg(e) {
  return sl[e] || sl.tangerine;
}
function hg(e) {
  return Object.entries(sl).find(([, t]) => t === e)?.[0] || "tangerine";
}
window.App = fg;
typeof globalThis < "u" && typeof globalThis.process > "u" && (globalThis.process = { env: { NODE_ENV: "production" } });
window.React = K;
window.HassContext = rs;
class gg extends HTMLElement {
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
      this._mount = document.createElement("div"), this._mount.style.cssText = "width:100%;height:100%;display:block;background:#161310", this.appendChild(this._mount), this._mount.innerHTML = '<div style="width:100%;height:100%;display:grid;place-items:center;color:#e87f4a;font-family:Newsreader,Georgia,serif;font-style:italic;font-size:28px;letter-spacing:.01em;">HomeCNTRD</div>', this._root = Pc(this._mount), this._render();
    }
  }
  disconnectedCallback() {
    this._root && (this._root.unmount(), this._root = null), this._mount && this._mount.parentNode && this._mount.parentNode.removeChild(this._mount), this._mount = null;
  }
  _render() {
    if (!this._root) return;
    const t = window.App;
    t && this._root.render(
      K.createElement(
        rs.Provider,
        { value: this._hass },
        K.createElement(t, {
          hass: this._hass,
          narrow: this._narrow,
          panel: this._panel
        })
      )
    );
  }
}
customElements.get("homecntrd-panel") || customElements.define("homecntrd-panel", gg);
//# sourceMappingURL=homecntrd.js.map
