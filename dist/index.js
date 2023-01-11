"use strict";
Object.defineProperty(exports, "__esModule", {value: !0});
var t = require("algosdk"),
  e = require("base64-js");
function n(t) {
  return t && "object" == typeof t && "default" in t ? t : {default: t};
}
var r = n(t),
  s = Uint8Array.from([1]);
function a(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e &&
      (r = r.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function o(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = null != arguments[e] ? arguments[e] : {};
    e % 2
      ? a(Object(n), !0).forEach(function (e) {
          f(t, e, n[e]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
      : a(Object(n)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
        });
  }
  return t;
}
function i() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  i = function () {
    return t;
  };
  var t = {},
    e = Object.prototype,
    n = e.hasOwnProperty,
    r = "function" == typeof Symbol ? Symbol : {},
    s = r.iterator || "@@iterator",
    a = r.asyncIterator || "@@asyncIterator",
    o = r.toStringTag || "@@toStringTag";
  function u(t, e, n) {
    return (
      Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }),
      t[e]
    );
  }
  try {
    u({}, "");
  } catch (t) {
    u = function (t, e, n) {
      return (t[e] = n);
    };
  }
  function c(t, e, n, r) {
    var s = e && e.prototype instanceof d ? e : d,
      a = Object.create(s.prototype),
      o = new w(r || []);
    return (
      (a._invoke = (function (t, e, n) {
        var r = "suspendedStart";
        return function (s, a) {
          if ("executing" === r) throw new Error("Generator is already running");
          if ("completed" === r) {
            if ("throw" === s) throw a;
            return b();
          }
          for (n.method = s, n.arg = a; ; ) {
            var o = n.delegate;
            if (o) {
              var i = y(o, n);
              if (i) {
                if (i === l) continue;
                return i;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if ("suspendedStart" === r) throw ((r = "completed"), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            r = "executing";
            var u = p(t, e, n);
            if ("normal" === u.type) {
              if (((r = n.done ? "completed" : "suspendedYield"), u.arg === l)) continue;
              return {value: u.arg, done: n.done};
            }
            "throw" === u.type &&
              ((r = "completed"), (n.method = "throw"), (n.arg = u.arg));
          }
        };
      })(t, n, o)),
      a
    );
  }
  function p(t, e, n) {
    try {
      return {type: "normal", arg: t.call(e, n)};
    } catch (t) {
      return {type: "throw", arg: t};
    }
  }
  t.wrap = c;
  var l = {};
  function d() {}
  function f() {}
  function m() {}
  var g = {};
  u(g, s, function () {
    return this;
  });
  var A = Object.getPrototypeOf,
    I = A && A(A(D([])));
  I && I !== e && n.call(I, s) && (g = I);
  var x = (m.prototype = d.prototype = Object.create(g));
  function T(t) {
    ["next", "throw", "return"].forEach(function (e) {
      u(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function h(t, e) {
    function r(s, a, o, i) {
      var u = p(t[s], t, a);
      if ("throw" !== u.type) {
        var c = u.arg,
          l = c.value;
        return l && "object" == typeof l && n.call(l, "__await")
          ? e.resolve(l.__await).then(
              function (t) {
                r("next", t, o, i);
              },
              function (t) {
                r("throw", t, o, i);
              }
            )
          : e.resolve(l).then(
              function (t) {
                (c.value = t), o(c);
              },
              function (t) {
                return r("throw", t, o, i);
              }
            );
      }
      i(u.arg);
    }
    var s;
    this._invoke = function (t, n) {
      function a() {
        return new e(function (e, s) {
          r(t, n, e, s);
        });
      }
      return (s = s ? s.then(a, a) : a());
    };
  }
  function y(t, e) {
    var n = t.iterator[e.method];
    if (void 0 === n) {
      if (((e.delegate = null), "throw" === e.method)) {
        if (
          t.iterator.return &&
          ((e.method = "return"), (e.arg = void 0), y(t, e), "throw" === e.method)
        )
          return l;
        (e.method = "throw"),
          (e.arg = new TypeError("The iterator does not provide a 'throw' method"));
      }
      return l;
    }
    var r = p(n, t.iterator, e.arg);
    if ("throw" === r.type)
      return (e.method = "throw"), (e.arg = r.arg), (e.delegate = null), l;
    var s = r.arg;
    return s
      ? s.done
        ? ((e[t.resultName] = s.value),
          (e.next = t.nextLoc),
          "return" !== e.method && ((e.method = "next"), (e.arg = void 0)),
          (e.delegate = null),
          l)
        : s
      : ((e.method = "throw"),
        (e.arg = new TypeError("iterator result is not an object")),
        (e.delegate = null),
        l);
  }
  function v(t) {
    var e = {tryLoc: t[0]};
    1 in t && (e.catchLoc = t[1]),
      2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
      this.tryEntries.push(e);
  }
  function _(t) {
    var e = t.completion || {};
    (e.type = "normal"), delete e.arg, (t.completion = e);
  }
  function w(t) {
    (this.tryEntries = [{tryLoc: "root"}]), t.forEach(v, this), this.reset(!0);
  }
  function D(t) {
    if (t) {
      var e = t[s];
      if (e) return e.call(t);
      if ("function" == typeof t.next) return t;
      if (!isNaN(t.length)) {
        var r = -1,
          a = function e() {
            for (; ++r < t.length; )
              if (n.call(t, r)) return (e.value = t[r]), (e.done = !1), e;
            return (e.value = void 0), (e.done = !0), e;
          };
        return (a.next = a);
      }
    }
    return {next: b};
  }
  function b() {
    return {value: void 0, done: !0};
  }
  return (
    (f.prototype = m),
    u(x, "constructor", m),
    u(m, "constructor", f),
    (f.displayName = u(m, o, "GeneratorFunction")),
    (t.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === f || "GeneratorFunction" === (e.displayName || e.name));
    }),
    (t.mark = function (t) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(t, m)
          : ((t.__proto__ = m), u(t, o, "GeneratorFunction")),
        (t.prototype = Object.create(x)),
        t
      );
    }),
    (t.awrap = function (t) {
      return {__await: t};
    }),
    T(h.prototype),
    u(h.prototype, a, function () {
      return this;
    }),
    (t.AsyncIterator = h),
    (t.async = function (e, n, r, s, a) {
      void 0 === a && (a = Promise);
      var o = new h(c(e, n, r, s), a);
      return t.isGeneratorFunction(n)
        ? o
        : o.next().then(function (t) {
            return t.done ? t.value : o.next();
          });
    }),
    T(x),
    u(x, o, "Generator"),
    u(x, s, function () {
      return this;
    }),
    u(x, "toString", function () {
      return "[object Generator]";
    }),
    (t.keys = function (t) {
      var e = [];
      for (var n in t) e.push(n);
      return (
        e.reverse(),
        function n() {
          for (; e.length; ) {
            var r = e.pop();
            if (r in t) return (n.value = r), (n.done = !1), n;
          }
          return (n.done = !0), n;
        }
      );
    }),
    (t.values = D),
    (w.prototype = {
      constructor: w,
      reset: function (t) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = void 0),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = void 0),
          this.tryEntries.forEach(_),
          !t)
        )
          for (var e in this)
            "t" === e.charAt(0) &&
              n.call(this, e) &&
              !isNaN(+e.slice(1)) &&
              (this[e] = void 0);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (t) {
        if (this.done) throw t;
        var e = this;
        function r(n, r) {
          return (
            (o.type = "throw"),
            (o.arg = t),
            (e.next = n),
            r && ((e.method = "next"), (e.arg = void 0)),
            !!r
          );
        }
        for (var s = this.tryEntries.length - 1; s >= 0; --s) {
          var a = this.tryEntries[s],
            o = a.completion;
          if ("root" === a.tryLoc) return r("end");
          if (a.tryLoc <= this.prev) {
            var i = n.call(a, "catchLoc"),
              u = n.call(a, "finallyLoc");
            if (i && u) {
              if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
              if (this.prev < a.finallyLoc) return r(a.finallyLoc);
            } else if (i) {
              if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
            } else {
              if (!u) throw new Error("try statement without catch or finally");
              if (this.prev < a.finallyLoc) return r(a.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var s = this.tryEntries[r];
          if (
            s.tryLoc <= this.prev &&
            n.call(s, "finallyLoc") &&
            this.prev < s.finallyLoc
          ) {
            var a = s;
            break;
          }
        }
        a &&
          ("break" === t || "continue" === t) &&
          a.tryLoc <= e &&
          e <= a.finallyLoc &&
          (a = null);
        var o = a ? a.completion : {};
        return (
          (o.type = t),
          (o.arg = e),
          a ? ((this.method = "next"), (this.next = a.finallyLoc), l) : this.complete(o)
        );
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return (
          "break" === t.type || "continue" === t.type
            ? (this.next = t.arg)
            : "return" === t.type
            ? ((this.rval = this.arg = t.arg),
              (this.method = "return"),
              (this.next = "end"))
            : "normal" === t.type && e && (this.next = e),
          l
        );
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), _(n), l;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.tryLoc === t) {
            var r = n.completion;
            if ("throw" === r.type) {
              var s = r.arg;
              _(n);
            }
            return s;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (t, e, n) {
        return (
          (this.delegate = {iterator: D(t), resultName: e, nextLoc: n}),
          "next" === this.method && (this.arg = void 0),
          l
        );
      }
    }),
    t
  );
}
function u(t, e, n, r, s, a, o) {
  try {
    var i = t[a](o),
      u = i.value;
  } catch (t) {
    return void n(t);
  }
  i.done ? e(u) : Promise.resolve(u).then(r, s);
}
function c(t) {
  return function () {
    var e = this,
      n = arguments;
    return new Promise(function (r, s) {
      var a = t.apply(e, n);
      function o(t) {
        u(a, r, s, o, i, "next", t);
      }
      function i(t) {
        u(a, r, s, o, i, "throw", t);
      }
      o(void 0);
    });
  };
}
function p(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function l(t, e) {
  for (var n = 0; n < e.length; n++) {
    var r = e[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(t, r.key, r);
  }
}
function d(t, e, n) {
  return (
    e && l(t.prototype, e),
    n && l(t, n),
    Object.defineProperty(t, "prototype", {writable: !1}),
    t
  );
}
function f(t, e, n) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = n),
    t
  );
}
function m(t, e) {
  if ("function" != typeof e && null !== e)
    throw new TypeError("Super expression must either be null or a function");
  (t.prototype = Object.create(e && e.prototype, {
    constructor: {value: t, writable: !0, configurable: !0}
  })),
    Object.defineProperty(t, "prototype", {writable: !1}),
    e && A(t, e);
}
function g(t) {
  return (
    (g = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        }),
    g(t)
  );
}
function A(t, e) {
  return (
    (A = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return (t.__proto__ = e), t;
        }),
    A(t, e)
  );
}
function I() {
  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" == typeof Proxy) return !0;
  try {
    return (
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
    );
  } catch (t) {
    return !1;
  }
}
function x(t, e, n) {
  return (
    (x = I()
      ? Reflect.construct.bind()
      : function (t, e, n) {
          var r = [null];
          r.push.apply(r, e);
          var s = new (Function.bind.apply(t, r))();
          return n && A(s, n.prototype), s;
        }),
    x.apply(null, arguments)
  );
}
function T(t) {
  var e = "function" == typeof Map ? new Map() : void 0;
  return (
    (T = function (t) {
      if (
        null === t ||
        ((n = t), -1 === Function.toString.call(n).indexOf("[native code]"))
      )
        return t;
      var n;
      if ("function" != typeof t)
        throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== e) {
        if (e.has(t)) return e.get(t);
        e.set(t, r);
      }
      function r() {
        return x(t, arguments, g(this).constructor);
      }
      return (
        (r.prototype = Object.create(t.prototype, {
          constructor: {value: r, enumerable: !1, writable: !0, configurable: !0}
        })),
        A(r, t)
      );
    }),
    T(t)
  );
}
function h(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e)
    throw new TypeError("Derived constructors may only return object or undefined");
  return (function (t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  })(t);
}
function y(t) {
  var e = I();
  return function () {
    var n,
      r = g(t);
    if (e) {
      var s = g(this).constructor;
      n = Reflect.construct(r, arguments, s);
    } else n = r.apply(this, arguments);
    return h(this, n);
  };
}
function v(t, e) {
  return (
    (function (t) {
      if (Array.isArray(t)) return t;
    })(t) ||
    (function (t, e) {
      var n =
        null == t
          ? null
          : ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
      if (null == n) return;
      var r,
        s,
        a = [],
        o = !0,
        i = !1;
      try {
        for (
          n = n.call(t);
          !(o = (r = n.next()).done) && (a.push(r.value), !e || a.length !== e);
          o = !0
        );
      } catch (t) {
        (i = !0), (s = t);
      } finally {
        try {
          o || null == n.return || n.return();
        } finally {
          if (i) throw s;
        }
      }
      return a;
    })(t, e) ||
    w(t, e) ||
    (function () {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    })()
  );
}
function _(t) {
  return (
    (function (t) {
      if (Array.isArray(t)) return D(t);
    })(t) ||
    (function (t) {
      if (
        ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
        null != t["@@iterator"]
      )
        return Array.from(t);
    })(t) ||
    w(t) ||
    (function () {
      throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    })()
  );
}
function w(t, e) {
  if (t) {
    if ("string" == typeof t) return D(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    return (
      "Object" === n && t.constructor && (n = t.constructor.name),
      "Map" === n || "Set" === n
        ? Array.from(t)
        : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        ? D(t, e)
        : void 0
    );
  }
}
function D(t, e) {
  (null == e || e > t.length) && (e = t.length);
  for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
  return r;
}
function b(t, e) {
  var n = ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
  if (!n) {
    if (Array.isArray(t) || (n = w(t)) || (e && t && "number" == typeof t.length)) {
      n && (t = n);
      var r = 0,
        s = function () {};
      return {
        s: s,
        n: function () {
          return r >= t.length ? {done: !0} : {done: !1, value: t[r++]};
        },
        e: function (t) {
          throw t;
        },
        f: s
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var a,
    o = !0,
    i = !1;
  return {
    s: function () {
      n = n.call(t);
    },
    n: function () {
      var t = n.next();
      return (o = t.done), t;
    },
    e: function (t) {
      (i = !0), (a = t);
    },
    f: function () {
      try {
        o || null == n.return || n.return();
      } finally {
        if (i) throw a;
      }
    }
  };
}
var E = "- would result negative",
  S = "logic eval error:",
  N = "exceeds schema integer count",
  O = /transaction \w+:/,
  P = (function (t) {
    m(n, T(Error));
    var e = y(n);
    function n(t, r) {
      var s;
      p(this, n);
      for (var a = arguments.length, o = new Array(a > 2 ? a - 2 : 0), i = 2; i < a; i++)
        o[i - 2] = arguments[i];
      var u = (s = e.call.apply(e, [this].concat(o))).extractMessageFromAlgoSDKError(t);
      return (
        (s.data = t),
        (s.type = s.getErrorType(u)),
        s.setMessage(s.getErrorMessage(u, s.type, r)),
        s
      );
    }
    return (
      d(n, [
        {
          key: "setMessage",
          value: function (t) {
            this.message = t;
          }
        },
        {
          key: "getErrorType",
          value: function (t) {
            var e = "Unknown";
            return (
              t.includes(E)
                ? (e = "SlippageTolerance")
                : t.includes(N)
                ? (e = "ExceedingExcessAmountCount")
                : t.includes(S)
                ? (e = "LogicError")
                : t.match(O) && (e = "TransactionError"),
              e
            );
          }
        },
        {
          key: "getErrorMessage",
          value: function (t, e, n) {
            var r;
            switch (e) {
              case "SlippageTolerance":
                r =
                  "The process failed due to too much slippage in the price. Please adjust the slippage tolerance and try again.";
                break;
              case "ExceedingExcessAmountCount":
                r =
                  "The process failed due to the number of excess amounts accumulated for your account in the Tinyman app.";
                break;
              case "LogicError":
                r = t.split(S)[1];
                break;
              case "TransactionError":
                r = t.split(O)[1];
                break;
              case "Unknown":
                t && (r = t);
            }
            return (
              r || (r = n || "We encountered an unexpected error, try again later."),
              r.trim()
            );
          }
        },
        {
          key: "extractMessageFromAlgoSDKError",
          value: function (t) {
            var e,
              n,
              r,
              s = "";
            return (
              null != t &&
              null !== (e = t.response) &&
              void 0 !== e &&
              null !== (n = e.body) &&
              void 0 !== n &&
              n.message
                ? (s = t.response.body.message)
                : null != t && null !== (r = t.response) && void 0 !== r && r.text
                ? (s = t.response.text)
                : "string" == typeof (null == t ? void 0 : t.message) &&
                  (s = this.isMessageObjectString(null == t ? void 0 : t.message)
                    ? JSON.parse(t.message || "{message: ''}").message
                    : t.message),
              "string" != typeof s && (s = String(s)),
              s
            );
          }
        },
        {
          key: "isMessageObjectString",
          value: function (t) {
            return "string" == typeof t && t.includes("{message:");
          }
        }
      ]),
      n
    );
  })();
function k(t) {
  var e,
    n = t.stateArray,
    r = void 0 === n ? [] : n,
    s = t.shouldDecodeKeys,
    a = void 0 !== s && s,
    o = {},
    i = b(r);
  try {
    for (i.s(); !(e = i.n()).done; ) {
      var u = e.value,
        c = u.key,
        p = void 0;
      if (1 == u.value.type) p = u.value.bytes;
      else {
        if (2 != u.value.type)
          throw new Error("Unexpected state type: ".concat(u.value.type));
        p = u.value.uint;
      }
      o[a ? atob(c) : c] = p;
    }
  } catch (t) {
    i.e(t);
  } finally {
    i.f();
  }
  return o;
}
function L(t) {
  var e,
    n = t.reduce(function (t, e) {
      return t + e.length;
    }, 0),
    r = new Uint8Array(n),
    s = 0,
    a = b(t);
  try {
    for (a.s(); !(e = a.n()).done; ) {
      var o = e.value;
      r.set(o, s), (s += o.length);
    }
  } catch (t) {
    a.e(t);
  } finally {
    a.f();
  }
  return r;
}
var F = 100000n,
  B = 100000n,
  R = 100000n,
  M = 25000n + 25000n,
  C = 25000n + 3500n;
function V(t) {
  var e = t["apps-total-schema"],
    n = 0n,
    r = 0n;
  e &&
    (e["num-byte-slice"] && (n = e["num-byte-slice"]),
    e["num-uint"] && (r = e["num-uint"]));
  var s = t["apps-local-state"] || [],
    a = t["created-apps"] || [],
    o = t.assets || [];
  return F + B * BigInt(o.length) + R * BigInt(a.length + s.length) + C * r + M * n;
}
function X(t) {
  return new Promise(function (e) {
    setTimeout(function () {
      e(null);
    }, t);
  });
}
function j(t, e) {
  return U.apply(this, arguments);
}
function U() {
  return (U = c(
    i().mark(function t(e, n) {
      var r;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (t.next = 3), X(1e3);
              case 3:
                return (
                  (r = null),
                  (t.prev = 4),
                  (t.next = 7),
                  e.pendingTransactionInformation(n).do()
                );
              case 7:
                (r = t.sent), (t.next = 12);
                break;
              case 10:
                (t.prev = 10), (t.t0 = t.catch(4));
              case 12:
                if (!r) {
                  t.next = 17;
                  break;
                }
                if (!r["confirmed-round"]) {
                  t.next = 15;
                  break;
                }
                return t.abrupt("return", r);
              case 15:
                if (!r["pool-error"]) {
                  t.next = 17;
                  break;
                }
                throw new Error("Transaction Rejected: ".concat(r["pool-error"]));
              case 17:
                t.next = 0;
                break;
              case 19:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[4, 10]]
      );
    })
  )).apply(this, arguments);
}
function Q(t, e, n) {
  if (e > 1 || e < 0)
    throw new Error("Invalid slippage value. Must be between 0 and 1, got ".concat(e));
  var r;
  try {
    var s = "negative" === t ? 1 - e : 1 + e;
    r = BigInt(Math.floor(Number(n) * s));
  } catch (t) {
    throw new Error(t.message);
  }
  return r;
}
function q(t, e) {
  var n = Number(t);
  return W({decimalPlaces: n}, Math.pow(10, -n) * Number(e));
}
function G(t, e) {
  return W({decimalPlaces: 0}, Math.pow(10, Number(t)) * Number(e));
}
function W(t, e) {
  var n = t.decimalPlaces,
    r = void 0 === n ? 0 : n;
  if (r > 0) {
    var s = v(J(e), 2),
      a = s[0],
      o = s[1],
      i = v(J(Math.round(Number(z(a, o + r)))), 2),
      u = i[0],
      c = i[1];
    return Number(z(u, c - r));
  }
  return Math.round(e);
}
function z(t, e) {
  return t + (e < 0 ? "e".concat(e) : "e+".concat(e));
}
function J(t) {
  if (t.toString().includes("e")) {
    var e = t.toString().split("e");
    return [parseFloat(e[0]), parseFloat(e[1])];
  }
  return [t, 0];
}
function Y(t, e) {
  return K.apply(this, arguments);
}
function K() {
  return (K = c(
    i().mark(function t(e, n) {
      var r, s, a, o, u, c, p, l;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                (t.prev = 0), (r = []), (s = b(n)), (t.prev = 3), s.s();
              case 5:
                if ((a = s.n()).done) {
                  t.next = 18;
                  break;
                }
                return (o = a.value), (t.next = 9), e.sendRawTransaction(o).do();
              case 9:
                return (u = t.sent), (c = u.txId), (t.next = 13), j(e, c);
              case 13:
                (p = t.sent),
                  (l = p["confirmed-round"]),
                  r.push({confirmedRound: l, txnID: c});
              case 16:
                t.next = 5;
                break;
              case 18:
                t.next = 23;
                break;
              case 20:
                (t.prev = 20), (t.t0 = t.catch(3)), s.e(t.t0);
              case 23:
                return (t.prev = 23), s.f(), t.finish(23);
              case 26:
                return t.abrupt("return", r);
              case 29:
                throw (
                  ((t.prev = 29),
                  (t.t1 = t.catch(0)),
                  new P(
                    t.t1,
                    "We encountered an error while processing this transaction. Try again later."
                  ))
                );
              case 32:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [
          [0, 29],
          [3, 20, 23, 26]
        ]
      );
    })
  )).apply(this, arguments);
}
function H(t) {
  return t.reduce(function (t, e) {
    return t + e.txn.fee;
  }, 0);
}
function Z(t) {
  return (e = t[0].txn.group) ? Buffer.from(e).toString("base64") : "";
  var e;
}
function $(t) {
  for (var e = []; ; ) {
    var n = 127 & t;
    if (!(t >>= 7)) {
      e.push(n);
      break;
    }
    e.push(128 | n);
  }
  return e;
}
function tt(t) {
  return new TextEncoder().encode(t);
}
var et = {
    id: "".concat(0),
    name: "Algorand",
    unit_name: "ALGO",
    decimals: 6,
    url: "https://algorand.org",
    is_liquidity_token: !1,
    total_amount: "6615503326932151"
  },
  nt = {V1: "TM1POOL", V1_1: "TMPOOL11", V2: "TMPOOL2"};
function rt() {
  return (rt = c(
    i().mark(function t(e) {
      var n, s, a, o, u;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (n = e.client),
                  (s = e.assetID),
                  (a = e.initiatorAddr),
                  (t.prev = 1),
                  (t.next = 4),
                  n.getTransactionParams().do()
                );
              case 4:
                return (
                  (o = t.sent),
                  (u = r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                    from: a,
                    to: a,
                    assetIndex: s,
                    amount: 0,
                    suggestedParams: o
                  })),
                  t.abrupt("return", [{txn: u, signers: [a]}])
                );
              case 9:
                throw (
                  ((t.prev = 9),
                  (t.t0 = t.catch(1)),
                  new P(
                    t.t0,
                    "We encountered something unexpected while opting into this asset. Try again later."
                  ))
                );
              case 12:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[1, 9]]
      );
    })
  )).apply(this, arguments);
}
function st(t, e) {
  var n = Number(t.id),
    r = Number(e.id);
  return n > r
    ? [o(o({}, t), {}, {id: n}), o(o({}, e), {}, {id: r})]
    : [o(o({}, e), {}, {id: r}), o(o({}, t), {}, {id: n})];
}
function at(t, e) {
  var n = [t, e];
  return [Math.max.apply(Math, n), Math.min.apply(Math, n)];
}
function ot(t) {
  return 0 === Number(t);
}
var it,
  ut = {V1_1: "v1_1", V2: "v2"},
  ct = {
    type: "logicsig",
    logic: {
      bytecode:
        "BCAIAQCBgICAgICAgPABgICAgICAgIDwAQMEBQYlJA1EMQkyAxJEMRUyAxJEMSAyAxJEMgQiDUQzAQAxABJEMwEQIQcSRDMBGIGCgICAgICAgPABEkQzARkiEjMBGyEEEhA3ARoAgAlib290c3RyYXASEEAAXDMBGSMSRDMBG4ECEjcBGgCABHN3YXASEEACOzMBGyISRDcBGgCABG1pbnQSQAE7NwEaAIAEYnVybhJAAZg3ARoAgAZyZWRlZW0SQAJbNwEaAIAEZmVlcxJAAnkAIQYhBSQjEk0yBBJENwEaARclEjcBGgIXJBIQRDMCADEAEkQzAhAhBBJEMwIhIxJEMwIiIxwSRDMCIyEHEkQzAiQjEkQzAiWACFRNUE9PTDExEkQzAiZRAA+AD1RpbnltYW5Qb29sMS4xIBJEMwIngBNodHRwczovL3RpbnltYW4ub3JnEkQzAikyAxJEMwIqMgMSRDMCKzIDEkQzAiwyAxJEMwMAMQASRDMDECEFEkQzAxElEkQzAxQxABJEMwMSIxJEJCMTQAAQMwEBMwIBCDMDAQg1AUIBsTMEADEAEkQzBBAhBRJEMwQRJBJEMwQUMQASRDMEEiMSRDMBATMCAQgzAwEIMwQBCDUBQgF8MgQhBhJENwEcATEAE0Q3ARwBMwQUEkQzAgAxABNEMwIUMQASRDMDADMCABJEMwIRJRJEMwMUMwMHMwMQIhJNMQASRDMDESMzAxAiEk0kEkQzBAAxABJEMwQUMwIAEkQzAQEzBAEINQFCAREyBCEGEkQ3ARwBMQATRDcBHAEzAhQSRDMDFDMDBzMDECISTTcBHAESRDMCADEAEkQzAhQzBAASRDMCESUSRDMDADEAEkQzAxQzAwczAxAiEk0zBAASRDMDESMzAxAiEk0kEkQzBAAxABNEMwQUMQASRDMBATMCAQgzAwEINQFCAJAyBCEFEkQ3ARwBMQATRDMCADcBHAESRDMCADEAE0QzAwAxABJEMwIUMwIHMwIQIhJNMQASRDMDFDMDBzMDECISTTMCABJEMwEBMwMBCDUBQgA+MgQhBBJENwEcATEAE0QzAhQzAgczAhAiEk03ARwBEkQzAQEzAgEINQFCABIyBCEEEkQzAQEzAgEINQFCAAAzAAAxABNEMwAHMQASRDMACDQBD0M=",
      address: "ABUKAXTANWR6K6ZYV75DWJEPVWWOU6SFUVRI6QHO44E4SIDLHBTD2CZ64A",
      size: 881,
      variables: [
        {name: "TMPL_ASSET_ID_1", type: "int", index: 15, length: 10},
        {name: "TMPL_ASSET_ID_2", type: "int", index: 5, length: 10},
        {name: "TMPL_VALIDATOR_APP_ID", type: "int", index: 74, length: 10}
      ],
      source:
        "https://github.com/tinymanorg/tinyman-contracts-v1/tree/dc9ab40c58b85c15d58f63a1507e18be76720dbb/contracts/pool_logicsig.teal.tmpl"
    },
    name: "pool_logicsig"
  },
  pt = {
    type: "app",
    global_state_schema: {num_uints: 0, num_byte_slices: 0},
    local_state_schema: {num_uints: 16, num_byte_slices: 0},
    name: "validator_app"
  },
  lt = new ((function () {
    function t() {
      p(this, t), (this.clientName = "tinyman-js-sdk");
    }
    return (
      d(t, [
        {
          key: "getClientName",
          value: function () {
            return this.clientName;
          }
        },
        {
          key: "setClientName",
          value: function (t) {
            this.clientName = t;
          }
        },
        {
          key: "getAppCallTxnNoteWithClientName",
          value: function (t) {
            return tt(
              "tinyman/"
                .concat(t === ut.V1_1 ? "v1" : "v2", ':j{"origin":"')
                .concat(this.clientName, '"}')
            );
          }
        }
      ]),
      t
    );
  })())(),
  dt =
    (f((it = {}), ut.V1_1, {testnet: 62368684, mainnet: 552635992}),
    f(it, ut.V2, {testnet: 148607e3, mainnet: 1002541853}),
    it);
function ft(t, e) {
  var n = dt[e][t];
  if (!n)
    throw new Error(
      "No Validator App exists for "
        .concat(t, " network with ")
        .concat(e, " contract version")
    );
  return n;
}
function mt() {
  return (mt = c(
    i().mark(function t(e) {
      var n, s, a, o, u, c;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (s = e.network),
                (a = e.contractVersion),
                (o = e.initiatorAddr),
                (t.next = 3),
                n.getTransactionParams().do()
              );
            case 3:
              return (
                (u = t.sent),
                (c = r.default.makeApplicationOptInTxnFromObject({
                  from: o,
                  appIndex: ft(s, a),
                  note: lt.getAppCallTxnNoteWithClientName(a),
                  suggestedParams: u
                })),
                t.abrupt("return", [{txn: c, signers: [o]}])
              );
            case 6:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function gt() {
  return (gt = c(
    i().mark(function t(e) {
      var n, s, a, o, u, c;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (s = e.network),
                (a = e.contractVersion),
                (o = e.initiatorAddr),
                (t.next = 3),
                n.getTransactionParams().do()
              );
            case 3:
              return (
                (u = t.sent),
                (c = r.default.makeApplicationClearStateTxnFromObject({
                  from: o,
                  appIndex: ft(s, a),
                  note: lt.getAppCallTxnNoteWithClientName(a),
                  suggestedParams: u
                })),
                t.abrupt("return", [{txn: c, signers: [o]}])
              );
            case 6:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
var At = d(function t(e) {
    p(this, t),
      (this.schema = {
        numLocalInts: e.local_state_schema.num_uints,
        numLocalByteSlices: e.local_state_schema.num_byte_slices,
        numGlobalInts: e.global_state_schema.num_uints,
        numGlobalByteSlices: e.global_state_schema.num_byte_slices
      });
  }),
  It = new ((function (n) {
    m(s, At);
    var r = y(s);
    function s(t, e) {
      var n;
      return (
        p(this, s),
        ((n = r.call(this, t)).poolLogicSigContractTemplate = e.logic.bytecode),
        (n.templateVariables = e.logic.variables),
        n
      );
    }
    return (
      d(s, [
        {
          key: "generateLogicSigAccountForPool",
          value: function (n) {
            if (n.asset1ID === n.asset2ID) throw new Error("Assets are the same");
            var r = ft(n.network, ut.V1_1),
              s = v(at(n.asset1ID, n.asset2ID), 2),
              a = s[0],
              o = s[1],
              i = Array.from(e.toByteArray(this.poolLogicSigContractTemplate)),
              u = {asset_id_1: a, asset_id_2: o, validator_app_id: r},
              c = 0;
            this.templateVariables.sort(function (t, e) {
              return t.index - e.index;
            });
            for (var p = 0; p < this.templateVariables.length; p++) {
              var l = this.templateVariables[p],
                d = u[l.name.split("TMPL_")[1].toLowerCase()],
                f = l.index - c,
                m = f + l.length,
                g = $(d);
              (c += l.length - g.length),
                (i = i.slice(0, f).concat(g).concat(i.slice(m)));
            }
            var A = new Uint8Array(i);
            return new t.LogicSigAccount(A);
          }
        }
      ]),
      s
    );
  })())(pt, ct),
  xt = {
    type: "logicsig",
    logic: {bytecode: "BoAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgQBbNQA0ADEYEkQxGYEBEkSBAUM="},
    name: "pool_logicsig"
  },
  Tt = {
    type: "app",
    global_state_schema: {num_uints: 0, num_byte_slices: 3},
    local_state_schema: {num_uints: 12, num_byte_slices: 2},
    name: "validator_app"
  },
  ht = new ((function (e) {
    m(r, At);
    var n = y(r);
    function r(t, e) {
      var s;
      return (
        p(this, r),
        ((s = n.call(this, t)).poolLogicSigContractTemplate = e.logic.bytecode),
        s
      );
    }
    return (
      d(r, [
        {
          key: "generateLogicSigAccountForPool",
          value: function (e) {
            if (e.asset1ID === e.asset2ID) throw new Error("Assets are the same");
            var n = ft(e.network, ut.V2),
              r = v(at(e.asset1ID, e.asset2ID), 2),
              s = r[0],
              a = r[1],
              o = {
                bytes: Array.from(
                  Buffer.from(this.poolLogicSigContractTemplate, "base64")
                ),
                validatorAppId: Array.from(t.encodeUint64(n)),
                asset1ID: Array.from(t.encodeUint64(s)),
                asset2ID: Array.from(t.encodeUint64(a))
              },
              i = [].concat(
                _(o.bytes.slice(0, 3)),
                _(o.validatorAppId.slice(0, 8)),
                _(o.asset1ID.slice(0, 8)),
                _(o.asset2ID.slice(0, 8)),
                _(o.bytes.slice(27))
              );
            return new t.LogicSigAccount(new Uint8Array(i));
          }
        }
      ]),
      r
    );
  })())(Tt, xt);
function yt(t) {
  return (function (t) {
    return t === ut.V2;
  })(t)
    ? ht
    : It;
}
function vt(e, n) {
  var r =
    arguments.length > 2 && void 0 !== arguments[2]
      ? arguments[2]
      : t.IntDecoding.DEFAULT;
  return new Promise(
    (function () {
      var t = c(
        i().mark(function t(s, a) {
          var u;
          return i().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (t.prev = 0),
                      (t.next = 3),
                      e.accountInformation(n).setIntDecoding(r).do()
                    );
                  case 3:
                    (u = t.sent),
                      s(o(o({}, u), {}, {minimum_required_balance: wt(u)})),
                      (t.next = 10);
                    break;
                  case 7:
                    (t.prev = 7),
                      (t.t0 = t.catch(0)),
                      a(new Error(t.t0.message || "Failed to fetch account information"));
                  case 10:
                  case "end":
                    return t.stop();
                }
            },
            t,
            null,
            [[0, 7]]
          );
        })
      );
      return function (e, n) {
        return t.apply(this, arguments);
      };
    })()
  );
}
function _t(t, e) {
  var n = t["apps-local-state"].find(function (t) {
    return t.id === e;
  });
  return n ? k({stateArray: n["key-value"], shouldDecodeKeys: !0}) : null;
}
function wt(t) {
  var e = t["apps-total-schema"];
  return (
    1e5 +
    1e5 * (t.assets || []).length +
    1e5 * (t["created-apps"] || []).length +
    1e5 * (t["apps-local-state"] || []).length +
    5e4 * Number((e && e["num-byte-slice"]) || 0) +
    28500 * Number((e && e["num-uint"]) || 0) +
    1e5 * (t["apps-total-extra-pages"] || 0)
  );
}
var Dt,
  bt,
  Et = tt("e");
function St(t) {
  return Nt.apply(this, arguments);
}
function Nt() {
  return (Nt = c(
    i().mark(function n(s) {
      var a, o, u, c, p, l, d, f, m, g, A, I, x, T, h, y, v, _, w, D, E;
      return i().wrap(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                return (
                  (a = s.client),
                  (o = s.pool),
                  (u = s.accountAddr),
                  (n.next = 3),
                  a.accountInformation(u).setIntDecoding(t.IntDecoding.BIGINT).do()
                );
              case 3:
                (c = n.sent),
                  (p = c["apps-local-state"] || []),
                  (l = 0n),
                  (d = 0n),
                  (f = 0n),
                  (m = o.account.address()),
                  (g = b(p)),
                  (n.prev = 10),
                  g.s();
              case 12:
                if ((A = g.n()).done) {
                  n.next = 31;
                  break;
                }
                if ((I = A.value).id == o.validatorAppID) {
                  n.next = 16;
                  break;
                }
                return n.abrupt("continue", 29);
              case 16:
                if ((x = I["key-value"])) {
                  n.next = 19;
                  break;
                }
                return n.abrupt("break", 31);
              case 19:
                (T = k({stateArray: x})),
                  (h = e.fromByteArray(
                    L([
                      r.default.decodeAddress(m).publicKey,
                      Et,
                      r.default.encodeUint64(o.asset1ID)
                    ])
                  )),
                  (y = e.fromByteArray(
                    L([
                      r.default.decodeAddress(m).publicKey,
                      Et,
                      r.default.encodeUint64(o.asset2ID)
                    ])
                  )),
                  (v = e.fromByteArray(
                    L([
                      r.default.decodeAddress(m).publicKey,
                      Et,
                      r.default.encodeUint64(o.poolTokenID)
                    ])
                  )),
                  (_ = T[h]),
                  (w = T[y]),
                  (D = T[v]),
                  "bigint" == typeof _ && (l = _),
                  "bigint" == typeof w && (d = w),
                  "bigint" == typeof D && (f = D);
              case 29:
                n.next = 12;
                break;
              case 31:
                n.next = 36;
                break;
              case 33:
                (n.prev = 33), (n.t0 = n.catch(10)), g.e(n.t0);
              case 36:
                return (n.prev = 36), g.f(), n.finish(36);
              case 39:
                if (
                  !(
                    (E = {excessAsset1: l, excessAsset2: d, excessPoolTokens: f})
                      .excessAsset1 < 0n ||
                    E.excessAsset2 < 0n ||
                    E.excessPoolTokens < 0n
                  )
                ) {
                  n.next = 42;
                  break;
                }
                throw new Error("Invalid account excess: ".concat(E));
              case 42:
                return n.abrupt("return", E);
              case 43:
              case "end":
                return n.stop();
            }
        },
        n,
        null,
        [[10, 33, 36, 39]]
      );
    })
  )).apply(this, arguments);
}
function Ot() {
  return (Ot = c(
    i().mark(function t(n) {
      var s, a, o, u, c, p, l, d, f, m, g, A, I, x, T;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (s = n.client),
                (a = n.accountAddr),
                (o = n.validatorAppID),
                (t.next = 3),
                s.accountInformation(a).setIntDecoding("bigint").do()
              );
            case 3:
              if (
                ((u = t.sent),
                (c = u["apps-local-state"] || []),
                (p = c.find(function (t) {
                  return t.id == o;
                })),
                (l = []),
                p && p["key-value"])
              )
                for (
                  d = k({stateArray: p["key-value"]}), f = 0, m = Object.entries(d);
                  f < m.length;
                  f++
                )
                  (g = m[f]),
                    (A = v(g, 2)),
                    (I = A[0]),
                    (x = A[1]),
                    41 === (T = e.toByteArray(I)).length &&
                      101 === T[32] &&
                      l.push({
                        poolAddress: r.default.encodeAddress(T.slice(0, 32)),
                        assetID: r.default.decodeUint64(T.slice(33, 41), "safe"),
                        amount: parseInt(x)
                      });
              return t.abrupt("return", l);
            case 9:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
(exports.PoolStatus = void 0),
  ((Dt = exports.PoolStatus || (exports.PoolStatus = {})).NOT_CREATED = "not created"),
  (Dt.BOOTSTRAP = "bootstrap"),
  (Dt.READY = "ready"),
  (Dt.ERROR = "error");
var Pt =
    (f((bt = {}), ut.V1_1, {asset1: "a1", asset2: "a2"}),
    f(bt, ut.V2, {
      asset1: "asset_1_id",
      asset2: "asset_2_id",
      poolTokenID: "pool_token_asset_id",
      issuedPoolTokens: "issued_pool_tokens",
      asset1Reserves: "asset_1_reserves",
      asset2Reserves: "asset_2_reserves",
      asset1ProtocolFees: "asset_1_protocol_fees",
      asset2ProtocolFees: "asset_2_protocol_fees",
      totalFeeShare: "total_fee_share",
      protocolFeeRatio: "protocol_fee_ratio",
      cumulativePriceUpdateTimeStamp: "cumulative_price_update_timestamp"
    }),
    bt),
  kt = tt("o"),
  Lt = 0xffffffffffffffffn;
function Ft(t) {
  return Bt.apply(this, arguments);
}
function Bt() {
  return (Bt = c(
    i().mark(function t(e) {
      var n, r, s, a, o, u, c, p, l, d, f, m, g, A;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (r = e.client),
                (s = e.network),
                (a = e.asset1ID),
                (o = e.asset2ID),
                (u = yt(ut.V1_1)),
                (c = u.generateLogicSigAccountForPool(e)),
                (p = ft(s, ut.V1_1)),
                (l = c.address()),
                (d = at(a, o)),
                (t.next = 8),
                vt(r, l)
              );
            case 8:
              return (
                (f = t.sent),
                (m = _t(f, p)),
                (g =
                  null === (n = f["created-assets"][0]) || void 0 === n
                    ? void 0
                    : n.index),
                (A = {
                  account: c,
                  validatorAppID: p,
                  asset1ID: d[0],
                  asset2ID: d[1],
                  status:
                    m || g ? exports.PoolStatus.READY : exports.PoolStatus.NOT_CREATED,
                  contractVersion: ut.V1_1,
                  poolTokenID: g
                }),
                m && ((A.asset1ID = m[Pt.v1_1.asset1]), (A.asset2ID = m[Pt.v1_1.asset2])),
                t.abrupt("return", A)
              );
            case 14:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Rt() {
  return (Rt = c(
    i().mark(function n(s, a) {
      var o, u, c, p, l, d, f, m, g, A, I, x, T, h, y, v, _, w, D, E, S, N, O, P, F, B;
      return i().wrap(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                return (n.next = 2), vt(s, a.account.address(), t.IntDecoding.BIGINT);
              case 2:
                (o = n.sent),
                  (u = o["apps-local-state"] || []),
                  (c = 0n),
                  (p = 0n),
                  (l = 0n),
                  (d = b(u)),
                  (n.prev = 8),
                  d.s();
              case 10:
                if ((f = d.n()).done) {
                  n.next = 29;
                  break;
                }
                if ((m = f.value).id == a.validatorAppID) {
                  n.next = 14;
                  break;
                }
                return n.abrupt("continue", 27);
              case 14:
                if ((g = m["key-value"])) {
                  n.next = 17;
                  break;
                }
                return n.abrupt("break", 29);
              case 17:
                (A = k({stateArray: g})),
                  (I = e.fromByteArray(L([kt, r.default.encodeUint64(a.asset1ID)]))),
                  (x = e.fromByteArray(L([kt, r.default.encodeUint64(a.asset2ID)]))),
                  (T = e.fromByteArray(L([kt, r.default.encodeUint64(a.poolTokenID)]))),
                  (h = A[I]),
                  (y = A[x]),
                  (v = A[T]),
                  "bigint" == typeof h && (c = h),
                  "bigint" == typeof y && (p = y),
                  "bigint" == typeof v && (l = v);
              case 27:
                n.next = 10;
                break;
              case 29:
                n.next = 34;
                break;
              case 31:
                (n.prev = 31), (n.t0 = n.catch(8)), d.e(n.t0);
              case 34:
                return (n.prev = 34), d.f(), n.finish(34);
              case 37:
                (_ = 0n), (w = 0n), (D = 0n), (E = b(o.assets));
                try {
                  for (E.s(); !(S = E.n()).done; )
                    (N = S.value),
                      (O = N["asset-id"]),
                      (P = N.amount),
                      O == a.asset1ID
                        ? (_ = BigInt(P))
                        : O == a.asset2ID
                        ? (w = BigInt(P))
                        : O == a.poolTokenID && (D = BigInt(P));
                } catch (t) {
                  E.e(t);
                } finally {
                  E.f();
                }
                if (
                  (0 === a.asset2ID && ((F = V(o)), (w = BigInt(o.amount) - F)),
                  !(
                    (B = {
                      asset1: _ - c,
                      asset2: w - p,
                      issuedLiquidity: Lt - D + l,
                      round: o.round
                    }).asset1 < 0n ||
                    B.asset2 < 0n ||
                    B.issuedLiquidity < 0n ||
                    B.issuedLiquidity > Lt
                  ))
                ) {
                  n.next = 49;
                  break;
                }
                throw (
                  ((B.asset1 = Number(B.asset1)),
                  (B.asset2 = Number(B.asset2)),
                  (B.issuedLiquidity = Number(B.issuedLiquidity)),
                  new Error("Invalid pool reserves: ".concat(JSON.stringify(B))))
                );
              case 49:
                return n.abrupt("return", B);
              case 50:
              case "end":
                return n.stop();
            }
        },
        n,
        null,
        [[8, 31, 34, 37]]
      );
    })
  )).apply(this, arguments);
}
function Mt() {
  return (
    (Mt = c(
      i().mark(function t(e) {
        var n,
          r,
          s,
          a,
          o,
          u,
          c,
          p,
          l,
          d = arguments;
        return i().wrap(function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                if (
                  ((n = e.client),
                  (r = e.address),
                  (s = e.network),
                  !(a = d.length > 1 && void 0 !== d[1] ? d[1] : {})[r])
                ) {
                  t.next = 4;
                  break;
                }
                return t.abrupt("return", a[r]);
              case 4:
                return (t.next = 6), vt(n, r);
              case 6:
                return (
                  (o = t.sent),
                  (u = _t(o, ft(s, ut.V1_1))),
                  (c = null),
                  u &&
                    ((l = o["created-assets"][0]),
                    (p = l.index),
                    (c = {
                      asset1ID: u[Pt[ut.V1_1].asset1],
                      asset2ID: u[Pt[ut.V1_1].asset2],
                      poolTokenID: p
                    }),
                    (a[r] = c)),
                  t.abrupt("return", c)
                );
              case 11:
              case "end":
                return t.stop();
            }
        }, t);
      })
    )),
    Mt.apply(this, arguments)
  );
}
var Ct = Object.freeze({
  __proto__: null,
  getPoolInfo: Ft,
  getPoolReserves: function (t, e) {
    return Rt.apply(this, arguments);
  },
  getPoolAssets: function (t) {
    return Mt.apply(this, arguments);
  }
});
function Vt(t) {
  return Xt.apply(this, arguments);
}
function Xt() {
  return (Xt = c(
    i().mark(function t(e) {
      var n, r, s, a, o, u, c, p, l, d, f, m;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (r = e.network),
                (s = e.asset1ID),
                (a = e.asset2ID),
                (o = yt(ut.V2)),
                (u = o.generateLogicSigAccountForPool(e)),
                (c = ft(r, ut.V2)),
                (p = u.address()),
                (l = at(s, a)),
                (t.next = 8),
                vt(n, p)
              );
            case 8:
              return (
                (d = t.sent),
                (f = _t(d, c)),
                (m = {
                  account: u,
                  validatorAppID: c,
                  asset1ID: l[0],
                  asset2ID: l[1],
                  status: f ? exports.PoolStatus.READY : exports.PoolStatus.NOT_CREATED,
                  contractVersion: ut.V2
                }),
                f &&
                  ((m.asset1ProtocolFees = BigInt(f[Pt.v2.asset1ProtocolFees])),
                  (m.asset2ProtocolFees = BigInt(f[Pt.v2.asset2ProtocolFees])),
                  (m.asset1Reserves = BigInt(f[Pt.v2.asset1Reserves])),
                  (m.asset2Reserves = BigInt(f[Pt.v2.asset2Reserves])),
                  (m.issuedPoolTokens = BigInt(f[Pt.v2.issuedPoolTokens])),
                  (m.cumulativePriceUpdateTimeStamp = Number(
                    f[Pt.v2.cumulativePriceUpdateTimeStamp]
                  )),
                  (m.protocolFeeRatio = Number(f[Pt.v2.protocolFeeRatio])),
                  (m.totalFeeShare = BigInt(f[Pt.v2.totalFeeShare])),
                  (m.poolTokenID = Number(f[Pt.v2.poolTokenID])),
                  (m.asset1ID = Number(f[Pt.v2.asset1])),
                  (m.asset2ID = Number(f[Pt.v2.asset2]))),
                t.abrupt("return", m)
              );
            case 13:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function jt() {
  return (jt = c(
    i().mark(function t(e, n) {
      var r, s, a;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (t.next = 2), vt(e, n.account.address());
            case 2:
              return (
                (r = t.sent),
                (s = _t(r, n.validatorAppID)),
                (a = {asset1: 0n, asset2: 0n, issuedLiquidity: 0n, round: r.round}),
                s &&
                  ((a.asset1 = BigInt(s[Pt.v2.asset1Reserves])),
                  (a.asset2 = BigInt(s[Pt.v2.asset2Reserves])),
                  (a.issuedLiquidity = BigInt(s[Pt.v2.issuedPoolTokens]))),
                t.abrupt("return", a)
              );
            case 7:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Ut() {
  return (Ut = c(
    i().mark(function t(e) {
      var n, r, s, a, o, u;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client), (r = e.address), (s = e.network), (t.next = 3), vt(n, r)
              );
            case 3:
              return (
                (a = t.sent),
                (o = _t(a, ft(s, ut.V2))),
                (u = null),
                o &&
                  (u = {
                    asset1ID: o[Pt[ut.V2].asset1],
                    asset2ID: o[Pt[ut.V2].asset2],
                    poolTokenID: o[Pt[ut.V2].poolTokenID]
                  }),
                t.abrupt("return", u)
              );
            case 8:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
var Qt = Object.freeze({
  __proto__: null,
  getPoolInfo: Vt,
  getPoolReserves: function (t, e) {
    return jt.apply(this, arguments);
  },
  getPoolAssets: function (t) {
    return Ut.apply(this, arguments);
  }
});
function qt(t) {
  return Boolean(t && !(t.asset1 + t.asset2));
}
var Gt,
  Wt,
  zt = Object.freeze({
    __proto__: null,
    getPoolShare: function (t, e) {
      var n = Number(e) / Number(t);
      return Number.isFinite(n) || (n = 0), n;
    },
    getPoolPairRatio: function (t, e) {
      var n = qt(e),
        r = null;
      return (
        e &&
          !n &&
          e.asset1 &&
          e.asset2 &&
          "number" == typeof t.asset2 &&
          "number" == typeof t.asset1 &&
          (r = q(t.asset1, e.asset1) / q(t.asset2, e.asset2)),
        r
      );
    },
    isPoolEmpty: qt,
    isPoolNotCreated: function (t) {
      return (null == t ? void 0 : t.status) === exports.PoolStatus.NOT_CREATED;
    },
    isPoolReady: function (t) {
      return (null == t ? void 0 : t.status) === exports.PoolStatus.READY;
    },
    getPoolsForPair: function (t) {
      return Promise.all([Ft(t), Vt(t)]);
    }
  }),
  Jt = o(
    (f((Gt = {}), ut.V1_1, o(o({}, Ct), zt)), f(Gt, ut.V2, o(o({}, Qt), zt)), Gt),
    zt
  );
!(function (t) {
  (t[(t.FUNDING_TXN = 0)] = "FUNDING_TXN"),
    (t[(t.VALIDATOR_APP_CALL = 1)] = "VALIDATOR_APP_CALL"),
    (t[(t.POOL_TOKEN_CREATE = 2)] = "POOL_TOKEN_CREATE"),
    (t[(t.ASSET1_OPT_IN = 3)] = "ASSET1_OPT_IN"),
    (t[(t.ASSET2_OPT_IN = 4)] = "ASSET2_OPT_IN");
})(Wt || (Wt = {}));
var Yt = 96e4,
  Kt = 859e3;
function Ht() {
  return (Ht = c(
    i().mark(function t(e) {
      var n, s, a, o, u, c, p, l, d, f, m, g, A, I, x, T, h, y, _, w, D, b, E, S, N;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (s = e.network),
                (a = e.asset_1),
                (o = e.asset_2),
                (u = e.initiatorAddr),
                (t.next = 3),
                n.getTransactionParams().do()
              );
            case 3:
              return (
                (c = t.sent),
                (p = st(a, o)),
                (l = v(p, 2)),
                (d = l[0]),
                (f = d.id),
                (m = d.unit_name),
                (g = l[1]),
                (A = g.id),
                (I = g.unit_name),
                (x = ot(A)),
                (T = ft(s, ut.V1_1)),
                (h = It.generateLogicSigAccountForPool({
                  network: s,
                  asset1ID: f,
                  asset2ID: A
                })),
                (y = h.address()),
                (_ = r.default.makeApplicationOptInTxnFromObject({
                  from: y,
                  appIndex: T,
                  note: lt.getAppCallTxnNoteWithClientName(ut.V1_1),
                  appArgs: [
                    tt("bootstrap"),
                    r.default.encodeUint64(f),
                    r.default.encodeUint64(A)
                  ],
                  foreignAssets: x ? [f] : [A],
                  suggestedParams: c
                })),
                (w = r.default.makeAssetCreateTxnWithSuggestedParamsFromObject({
                  from: y,
                  total: 0xffffffffffffffffn,
                  decimals: 6,
                  defaultFrozen: !1,
                  unitName: nt.V1_1,
                  assetName: "TinymanPool1.1 ".concat(m, "-").concat(I),
                  assetURL: "https://tinyman.org",
                  suggestedParams: c
                })),
                (D = r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: y,
                  to: y,
                  assetIndex: f,
                  amount: 0,
                  suggestedParams: c
                })),
                (b = r.default.makePaymentTxnWithSuggestedParamsFromObject({
                  from: u,
                  to: y,
                  amount: Zt(x),
                  suggestedParams: c
                })),
                ((E = [])[Wt.FUNDING_TXN] = b),
                (E[Wt.VALIDATOR_APP_CALL] = _),
                (E[Wt.POOL_TOKEN_CREATE] = w),
                (E[Wt.ASSET1_OPT_IN] = D),
                x ||
                  (E[Wt.ASSET2_OPT_IN] =
                    r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                      from: y,
                      to: y,
                      assetIndex: A,
                      amount: 0,
                      suggestedParams: c
                    })),
                (S = r.default.assignGroupID(E)),
                (N = [
                  {txn: S[Wt.FUNDING_TXN], signers: [u]},
                  {txn: S[Wt.VALIDATOR_APP_CALL], signers: [y]},
                  {txn: S[Wt.POOL_TOKEN_CREATE], signers: [y]},
                  {txn: S[Wt.ASSET1_OPT_IN], signers: [y]}
                ]),
                S[Wt.ASSET2_OPT_IN] && N.push({txn: S[Wt.ASSET2_OPT_IN], signers: [y]}),
                t.abrupt("return", N)
              );
            case 23:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Zt(t) {
  return t ? Yt : Kt;
}
function $t() {
  return ($t = c(
    i().mark(function t(e) {
      var n, s, a, o, u, c, p, l, d, f, m, g, A, I, x;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.txGroup),
                (s = e.network),
                (a = e.initiatorSigner),
                (o = e.asset1ID),
                (u = e.asset2ID),
                (t.next = 3),
                a([n])
              );
            case 3:
              return (
                (c = t.sent),
                (p = v(c, 1)),
                (l = p[0]),
                (d = at(o, u)),
                (f = v(d, 2)),
                (m = f[0]),
                (g = f[1]),
                (A = It.generateLogicSigAccountForPool({
                  network: s,
                  asset1ID: m,
                  asset2ID: g
                })),
                (I = []),
                (x = n.map(function (t, e) {
                  if (e === Wt.FUNDING_TXN) return I.push(t.txn.txID().toString()), l;
                  var n = r.default.signLogicSigTransactionObject(t.txn, A),
                    s = n.txID,
                    a = n.blob;
                  return I.push(s), a;
                })),
                t.abrupt("return", {signedTxns: x, txnIDs: I})
              );
            case 11:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function te(t) {
  return ee.apply(this, arguments);
}
function ee() {
  return (ee = c(
    i().mark(function t(e) {
      var n, r, s, a, o;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (n = e.client),
                  (r = e.signedTxns),
                  (s = e.txnIDs),
                  (t.prev = 1),
                  (t.next = 4),
                  n.sendRawTransaction(r).do()
                );
              case 4:
                return (t.next = 6), j(n, s[Wt.POOL_TOKEN_CREATE]);
              case 6:
                if (((a = t.sent), "number" == typeof (o = a["asset-index"]))) {
                  t.next = 10;
                  break;
                }
                throw new Error("Generated ID is not valid: got ".concat(o));
              case 10:
                return t.abrupt("return", {poolTokenID: o});
              case 13:
                throw (
                  ((t.prev = 13),
                  (t.t0 = t.catch(1)),
                  new P(
                    t.t0,
                    "We encountered something unexpected while bootstraping the pool. Try again later."
                  ))
                );
              case 16:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[1, 13]]
      );
    })
  )).apply(this, arguments);
}
function ne() {
  return (ne = c(
    i().mark(function t(e) {
      var n, r, s, a, o, u, c;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (r = e.network),
                (s = e.pool),
                (a = s.asset1ID),
                (o = s.asset2ID),
                (u = e.signedTxns),
                (c = e.txnIDs),
                (t.next = 3),
                te({client: n, signedTxns: u, txnIDs: c})
              );
            case 3:
              return t.abrupt(
                "return",
                Jt.v1_1.getPoolInfo({client: n, network: r, asset1ID: a, asset2ID: o})
              );
            case 4:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
var re,
  se = {
    generateTxns: function (t) {
      return Ht.apply(this, arguments);
    },
    signTxns: function (t) {
      return $t.apply(this, arguments);
    },
    execute: function (t) {
      return ne.apply(this, arguments);
    },
    getBootstrapFundingTxnAmount: Zt
  };
!(function (t) {
  (t[(t.FUNDING_TXN = 0)] = "FUNDING_TXN"),
    (t[(t.VALIDATOR_APP_CALL = 1)] = "VALIDATOR_APP_CALL");
})(re || (re = {}));
var ae = 5,
  oe = 6;
function ie(t, e) {
  return ue.apply(this, arguments);
}
function ue() {
  return (ue = c(
    i().mark(function e(n, r) {
      var s, a, o;
      return i().wrap(function (e) {
        for (;;)
          switch ((e.prev = e.next)) {
            case 0:
              if (
                !(a =
                  null ===
                    (s = r.find(function (t) {
                      return "appl" === t.txn.type;
                    })) || void 0 === s
                    ? void 0
                    : s.txn.txID())
              ) {
                e.next = 7;
                break;
              }
              return (e.next = 4), t.waitForConfirmation(n, a, 1e3);
            case 4:
              (e.t0 = e.sent), (e.next = 8);
              break;
            case 7:
              e.t0 = void 0;
            case 8:
              return (o = e.t0), e.abrupt("return", o);
            case 10:
            case "end":
              return e.stop();
          }
      }, e);
    })
  )).apply(this, arguments);
}
function ce(t, e) {
  return pe.apply(this, arguments);
}
function pe() {
  return (pe = c(
    i().mark(function t(e, n) {
      var r;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (t.next = 2), ie(e, n);
            case 2:
              return (
                (r = t.sent), t.abrupt("return", null == r ? void 0 : r["inner-txns"])
              );
            case 4:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function le() {
  return (le = c(
    i().mark(function e(n) {
      var s, a, o, u, c, p, l, d, f, m, g, A, I, x, T, h, y, _, w, D;
      return i().wrap(function (e) {
        for (;;)
          switch ((e.prev = e.next)) {
            case 0:
              return (
                (s = n.client),
                (a = n.network),
                (o = n.asset_1),
                (u = n.asset_2),
                (c = n.initiatorAddr),
                (e.next = 3),
                s.getTransactionParams().do()
              );
            case 3:
              return (
                (p = e.sent),
                (l = ft(a, ut.V2)),
                (d = t.getApplicationAddress(l)),
                (f = st(o, u)),
                (m = v(f, 2)),
                (g = m[0].id),
                (A = m[1].id),
                (e.next = 9),
                Jt.v2.getPoolInfo({client: s, network: a, asset1ID: g, asset2ID: A})
              );
            case 9:
              if (e.sent.status !== exports.PoolStatus.READY) {
                e.next = 12;
                break;
              }
              throw new Error(
                "Pool for "
                  .concat(o.unit_name, "-")
                  .concat(u.unit_name, " already exists")
              );
            case 12:
              return (
                (I = ht.generateLogicSigAccountForPool({
                  network: a,
                  asset1ID: g,
                  asset2ID: A
                })),
                (x = I.address()),
                (T = ot(A)),
                ((h = r.default.makeApplicationOptInTxnFromObject({
                  from: x,
                  appIndex: l,
                  appArgs: [tt("bootstrap")],
                  note: lt.getAppCallTxnNoteWithClientName(ut.V2),
                  foreignAssets: [g, A],
                  rekeyTo: d,
                  suggestedParams: p
                })).fee = fe(T)),
                (y = r.default.makePaymentTxnWithSuggestedParamsFromObject({
                  from: c,
                  to: x,
                  amount: de(T),
                  suggestedParams: p
                })),
                ((_ = [])[re.FUNDING_TXN] = y),
                (_[re.VALIDATOR_APP_CALL] = h),
                (w = r.default.assignGroupID(_)),
                ((D = [])[re.FUNDING_TXN] = {txn: w[re.FUNDING_TXN], signers: [c]}),
                (D[re.VALIDATOR_APP_CALL] = {
                  txn: w[re.VALIDATOR_APP_CALL],
                  signers: [x]
                }),
                e.abrupt("return", D)
              );
            case 26:
            case "end":
              return e.stop();
          }
      }, e);
    })
  )).apply(this, arguments);
}
function de(t) {
  return (
    (function (t, e) {
      var n = yt(t).schema,
        r = 4e5 + 28500 * n.numLocalInts + 5e4 * n.numLocalByteSlices;
      return e || (r += 1e5), r;
    })(ut.V2, t) +
    fe(t) +
    1e5
  );
}
function fe(e) {
  return ((e ? ae : oe) + 1) * t.ALGORAND_MIN_TX_FEE;
}
function me() {
  return (me = c(
    i().mark(function t(e) {
      var n, s, a, o, u, c, p, l, d, f, m, g, A, I, x;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.txGroup),
                (s = e.network),
                (a = e.initiatorSigner),
                (o = e.asset1ID),
                (u = e.asset2ID),
                (t.next = 3),
                a([n])
              );
            case 3:
              return (
                (c = t.sent),
                (p = v(c, 1)),
                (l = p[0]),
                (d = at(o, u)),
                (f = v(d, 2)),
                (m = f[0]),
                (g = f[1]),
                (A = ht.generateLogicSigAccountForPool({
                  network: s,
                  asset1ID: m,
                  asset2ID: g
                })),
                (I = []),
                (x = n.map(function (t, e) {
                  if (e === re.FUNDING_TXN) return I.push(t.txn.txID().toString()), l;
                  var n = r.default.signLogicSigTransactionObject(t.txn, A),
                    s = n.txID,
                    a = n.blob;
                  return I.push(s), a;
                })),
                t.abrupt("return", {signedTxns: x, txnIDs: I})
              );
            case 11:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function ge() {
  return (ge = c(
    i().mark(function t(e) {
      var n, r, s, a, o, u, c, p, l, d, f;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (n = e.client),
                  (r = e.network),
                  (s = e.pool),
                  (a = s.asset1ID),
                  (o = s.asset2ID),
                  (u = e.txGroup),
                  (c = e.signedTxns),
                  (t.prev = 1),
                  (t.next = 4),
                  n.sendRawTransaction(c).do()
                );
              case 4:
                return (t.next = 6), ie(n, u);
              case 6:
                if (((t.t1 = p = t.sent), (t.t0 = null === t.t1), t.t0)) {
                  t.next = 10;
                  break;
                }
                t.t0 = void 0 === p;
              case 10:
                if (!t.t0) {
                  t.next = 14;
                  break;
                }
                (t.t2 = void 0), (t.next = 15);
                break;
              case 14:
                t.t2 =
                  null === (l = p["local-state-delta"][0].delta) ||
                  void 0 === l ||
                  null ===
                    (d = l.find(function (t) {
                      return t.key === btoa(Pt.v2.poolTokenID);
                    })) ||
                  void 0 === d
                    ? void 0
                    : d.value.uint;
              case 15:
                if ("number" == typeof (f = t.t2)) {
                  t.next = 18;
                  break;
                }
                throw new Error("Generated ID is not valid: got ".concat(f));
              case 18:
                return t.abrupt(
                  "return",
                  Jt.v2.getPoolInfo({client: n, network: r, asset1ID: a, asset2ID: o})
                );
              case 21:
                throw (
                  ((t.prev = 21),
                  (t.t3 = t.catch(1)),
                  new P(
                    t.t3,
                    "We encountered something unexpected while bootstraping the pool. Try again later."
                  ))
                );
              case 24:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[1, 21]]
      );
    })
  )).apply(this, arguments);
}
var Ae,
  Ie = {
    generateTxns: function (t) {
      return le.apply(this, arguments);
    },
    signTxns: function (t) {
      return me.apply(this, arguments);
    },
    execute: function (t) {
      return ge.apply(this, arguments);
    },
    getBootstrapFundingTxnAmount: de,
    getTotalCost: function (e) {
      return t.ALGORAND_MIN_TX_FEE + de(e);
    }
  };
var xe,
  Te =
    (f((Ae = {}), ut.V1_1, se),
    f(Ae, ut.V2, Ie),
    f(Ae, "generateTxns", function (t) {
      return t.contractVersion === ut.V1_1 ? se.generateTxns(t) : Ie.generateTxns(t);
    }),
    f(Ae, "signTxns", function (t) {
      return t.contractVersion === ut.V1_1 ? se.signTxns(t) : Ie.signTxns(t);
    }),
    f(Ae, "execute", function (t) {
      return t.contractVersion === ut.V1_1 ? se.execute(t) : Ie.execute(t);
    }),
    f(Ae, "calculateBootstrapFundingTxnAmount", function (t) {
      var e = t.contractVersion,
        n = t.isAlgoPool;
      return e === ut.V1_1
        ? se.getBootstrapFundingTxnAmount(n)
        : Ie.getBootstrapFundingTxnAmount(n);
    }),
    Ae);
(exports.V1_1AddLiquidityTxnIndices = void 0),
  ((xe = exports.V1_1AddLiquidityTxnIndices || (exports.V1_1AddLiquidityTxnIndices = {}))[
    (xe.FEE_TXN = 0)
  ] = "FEE_TXN"),
  (xe[(xe.VALIDATOR_APP_CALL_TXN = 1)] = "VALIDATOR_APP_CALL_TXN"),
  (xe[(xe.ASSET1_IN_TXN = 2)] = "ASSET1_IN_TXN"),
  (xe[(xe.ASSET2_IN_TXN = 3)] = "ASSET2_IN_TXN"),
  (xe[(xe.LIQUDITY_OUT_TXN = 4)] = "LIQUDITY_OUT_TXN");
var he,
  ye,
  ve,
  _e,
  we = 5 * t.ALGORAND_MIN_TX_FEE;
(exports.V2AddLiquidityType = void 0),
  ((_e = exports.V2AddLiquidityType || (exports.V2AddLiquidityType = {})).SINGLE =
    "single"),
  (_e.FLEXIBLE = "flexible"),
  (_e.INITIAL = "initial");
var De,
  be =
    (f((he = {}), exports.V2AddLiquidityType.FLEXIBLE, {
      ASSET1_IN_TXN: 0,
      ASSET2_IN_TXN: 1,
      VALIDATOR_APP_CALL_TXN: 2
    }),
    f(he, exports.V2AddLiquidityType.SINGLE, {
      ASSET_IN_TXN: 0,
      VALIDATOR_APP_CALL_TXN: 1
    }),
    f(he, exports.V2AddLiquidityType.INITIAL, {
      ASSET1_IN_TXN: 0,
      ASSET2_IN_TXN: 1,
      VALIDATOR_APP_CALL_TXN: 2
    }),
    he),
  Ee =
    (f((ye = {}), exports.V2AddLiquidityType.INITIAL, 1),
    f(ye, exports.V2AddLiquidityType.SINGLE, 2),
    f(ye, exports.V2AddLiquidityType.FLEXIBLE, 2),
    ye),
  Se =
    (f((ve = {}), exports.V2AddLiquidityType.INITIAL, 3),
    f(ve, exports.V2AddLiquidityType.FLEXIBLE, 3),
    f(ve, exports.V2AddLiquidityType.SINGLE, 2),
    ve);
function Ne(t) {
  var e = t.assetIn,
    n = t.assetOut;
  return q(n.decimals, Number(n.amount)) / q(e.decimals, Number(e.amount));
}
function Oe(t) {
  var e = t.inputSupply,
    n = t.outputSupply,
    r = t.assetIn,
    s = t.assetOut,
    a = Ne({assetIn: r, assetOut: s}),
    o = q(s.decimals, Number(n)) / q(r.decimals, Number(e));
  return W({decimalPlaces: 5}, Math.abs(a / o - 1));
}
function Pe(t) {
  var e,
    n,
    r,
    s,
    a = t.reserves,
    o = t.totalFeeShare,
    i = t.asset1Amount,
    u = t.asset2Amount,
    c = t.decimals,
    p = a.asset1 * a.asset2,
    l = a.asset1 + BigInt(i),
    d = a.asset2 + BigInt(u),
    f = l * d,
    m = BigInt(
      parseInt(String(Math.sqrt(Number((f * a.issuedLiquidity * a.issuedLiquidity) / p))))
    ),
    g = m - a.issuedLiquidity,
    A = (g * l) / m,
    I = (g * d) / m,
    x = BigInt(i) - A,
    T = BigInt(u) - I;
  if (x > T) {
    var h = x;
    (r = BigInt(Math.abs(Math.min(Number(T), 0)))),
      (e = !0),
      (n = h + (s = ke(h, o))),
      (g -= (s * m) / (l * BigInt(2)));
  } else {
    var y = T;
    (r = BigInt(Math.abs(Math.min(Number(x), 0)))),
      (e = !1),
      (n = y + (s = ke(y, o))),
      (g -= (s * m) / (d * BigInt(2)));
  }
  return {
    poolTokenAssetAmount: g,
    swapFromAsset1ToAsset2: e,
    swapInAmount: n,
    swapOutAmount: r,
    swapTotalFeeAmount: s,
    swapPriceImpact: Oe({
      inputSupply: e ? a.asset1 : a.asset2,
      outputSupply: e ? a.asset2 : a.asset1,
      assetIn: {amount: n, decimals: c.asset1},
      assetOut: {amount: r, decimals: c.asset2}
    })
  };
}
function ke(t, e) {
  return (t * BigInt(e)) / (BigInt(1e4) - BigInt(e));
}
function Le(e) {
  return (Ee[e] + 1) * t.ALGORAND_MIN_TX_FEE;
}
var Fe = tt("add_liquidity"),
  Be =
    (f((De = {}), ut.V1_1, [tt("mint")]),
    f(De, ut.V2, {
      INITIAL_LIQUIDITY: [tt("add_initial_liquidity")],
      SINGLE_ASSET_MODE: [Fe, tt("single")],
      FLEXIBLE_MODE: [Fe, tt("flexible")]
    }),
    De);
function Re() {
  return (Re = c(
    i().mark(function t(e) {
      var n, a, o, u, c, p, l, d, f, m, g, A, I, x, T, h;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (a = e.network),
                (o = e.poolAddress),
                (u = e.asset1In),
                (c = e.asset2In),
                (p = e.poolTokenOut),
                (l = e.slippage),
                (d = e.initiatorAddr),
                (f = Q("negative", l, p.amount)),
                (t.next = 4),
                n.getTransactionParams().do()
              );
            case 4:
              return (
                (m = t.sent),
                (g = r.default.makeApplicationNoOpTxnFromObject({
                  from: o,
                  appIndex: ft(a, ut.V1_1),
                  appArgs: Be.v1_1,
                  accounts: [d],
                  note: lt.getAppCallTxnNoteWithClientName(ut.V1_1),
                  foreignAssets: 0 == c.id ? [u.id, p.id] : [u.id, c.id, p.id],
                  suggestedParams: m
                })),
                (A = r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: d,
                  to: o,
                  assetIndex: u.id,
                  amount: u.amount,
                  suggestedParams: m
                })),
                (I =
                  0 === c.id
                    ? r.default.makePaymentTxnWithSuggestedParamsFromObject({
                        from: d,
                        to: o,
                        amount: c.amount,
                        suggestedParams: m
                      })
                    : r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: d,
                        to: o,
                        assetIndex: c.id,
                        amount: c.amount,
                        suggestedParams: m
                      })),
                (x = r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: o,
                  to: d,
                  assetIndex: p.id,
                  amount: f,
                  suggestedParams: m
                })),
                (T = r.default.makePaymentTxnWithSuggestedParamsFromObject({
                  from: d,
                  to: o,
                  amount: g.fee + x.fee,
                  note: s,
                  suggestedParams: m
                })),
                (h = r.default.assignGroupID([T, g, A, I, x])),
                t.abrupt("return", [
                  {txn: h[0], signers: [d]},
                  {txn: h[1], signers: [o]},
                  {txn: h[2], signers: [d]},
                  {txn: h[3], signers: [d]},
                  {txn: h[4], signers: [o]}
                ])
              );
            case 12:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Me() {
  return (Me = c(
    i().mark(function t(e) {
      var n, s, a, o, u, c, p, l, d, f;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.pool),
                (s = e.txGroup),
                (a = e.initiatorSigner),
                (o = n.account),
                (t.next = 4),
                a([s])
              );
            case 4:
              return (
                (u = t.sent),
                (c = v(u, 3)),
                (p = c[0]),
                (l = c[1]),
                (d = c[2]),
                (f = s.map(function (t, e) {
                  return e === exports.V1_1AddLiquidityTxnIndices.FEE_TXN
                    ? p
                    : e === exports.V1_1AddLiquidityTxnIndices.ASSET1_IN_TXN
                    ? l
                    : e === exports.V1_1AddLiquidityTxnIndices.ASSET2_IN_TXN
                    ? d
                    : r.default.signLogicSigTransactionObject(t.txn, o).blob;
                })),
                t.abrupt("return", f)
              );
            case 11:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Ce() {
  return (Ce = c(
    i().mark(function t(e) {
      var n, r, s, a, o, u, c, p, l, d, f, m, g, A, I, x, T;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (n = e.client),
                  (r = e.pool),
                  (s = e.txGroup),
                  (a = e.signedTxns),
                  (o = e.initiatorAddr),
                  (t.prev = 1),
                  (u = BigInt(
                    s[exports.V1_1AddLiquidityTxnIndices.LIQUDITY_OUT_TXN].txn.amount
                  )),
                  (t.next = 5),
                  St({client: n, pool: r, accountAddr: o})
                );
              case 5:
                return (c = t.sent), (t.next = 8), Y(n, [a]);
              case 8:
                return (
                  (p = t.sent),
                  (l = v(p, 1)),
                  (d = l[0]),
                  (f = d.confirmedRound),
                  (m = d.txnID),
                  (g = H(s)),
                  (A = Z(s)),
                  (t.next = 17),
                  St({client: n, pool: r, accountAddr: o})
                );
              case 17:
                return (
                  (I = t.sent),
                  (x = I.excessPoolTokens - c.excessPoolTokens) < 0n && (x = 0n),
                  t.abrupt("return", {
                    round: f,
                    fees: g,
                    poolTokenID: r.poolTokenID,
                    poolTokenOut: u + x,
                    excessAmount: {
                      excessAmountForAddingLiquidity: x,
                      totalExcessAmount: I.excessPoolTokens
                    },
                    txnID: m,
                    groupID: A
                  })
                );
              case 23:
                throw (
                  ((t.prev = 23),
                  (t.t0 = t.catch(1)),
                  "SlippageTolerance" ===
                    (T = new P(
                      t.t0,
                      "We encountered something unexpected while adding liquidity. Try again later."
                    )).type &&
                    T.setMessage(
                      "Adding liquidity failed due to too much slippage in the price. Please adjust the slippage tolerance and try again."
                    ),
                  T)
                );
              case 28:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[1, 23]]
      );
    })
  )).apply(this, arguments);
}
var Ve = Object.freeze({
  __proto__: null,
  getQuote: function (t) {
    var e = t.pool,
      n = t.reserves,
      r = t.asset1In,
      s = t.asset2In;
    if (0n === n.issuedLiquidity) {
      var a = BigInt(Math.floor(Math.sqrt(Number(r) * Number(s))));
      if (a <= BigInt(1e3))
        throw new Error(
          "Initial liquidity amount is too small. The amount must be greater than "
            .concat(1e3, ", this quote is for ")
            .concat(a, ".")
        );
      return {
        round: n.round,
        asset1ID: e.asset1ID,
        asset1In: BigInt(r),
        asset2ID: e.asset2ID,
        asset2In: BigInt(s),
        poolTokenID: e.poolTokenID,
        poolTokenOut: a - BigInt(1e3),
        share: 1
      };
    }
    var o = (BigInt(r) * n.issuedLiquidity) / n.asset1,
      i = (BigInt(s) * n.issuedLiquidity) / n.asset2,
      u = o < i ? o : i;
    return {
      round: n.round,
      asset1ID: e.asset1ID,
      asset1In: BigInt(r),
      asset2ID: e.asset2ID,
      asset2In: BigInt(s),
      poolTokenID: e.poolTokenID,
      poolTokenOut: u,
      share: Jt.getPoolShare(n.issuedLiquidity + u, u)
    };
  },
  generateTxns: function (t) {
    return Re.apply(this, arguments);
  },
  signTxns: function (t) {
    return Me.apply(this, arguments);
  },
  execute: function (t) {
    return Ce.apply(this, arguments);
  }
});
function Xe(t) {
  var e = t.txGroup;
  return (0, t.initiatorSigner)([e]);
}
function je(t) {
  return Ue.apply(this, arguments);
}
function Ue() {
  return (Ue = c(
    i().mark(function t(e) {
      var n, r, s, a, o, u, c, p, l, d, f, m, g;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (n = e.client),
                  (r = e.pool),
                  (s = e.txGroup),
                  (a = e.signedTxns),
                  (t.prev = 1),
                  (t.next = 4),
                  Y(n, [a])
                );
              case 4:
                return (
                  (c = t.sent),
                  (p = v(c, 1)),
                  (l = p[0]),
                  (d = l.confirmedRound),
                  (f = l.txnID),
                  (t.next = 11),
                  ce(n, s)
                );
              case 11:
                if (((t.t1 = o = t.sent), (t.t0 = null === t.t1), t.t0)) {
                  t.next = 15;
                  break;
                }
                t.t0 = void 0 === o;
              case 15:
                if (!t.t0) {
                  t.next = 19;
                  break;
                }
                (t.t2 = void 0), (t.next = 20);
                break;
              case 19:
                t.t2 =
                  null ===
                    (u = o.find(function (t) {
                      return "axfer" === t.txn.txn.type;
                    })) || void 0 === u
                    ? void 0
                    : u.txn.txn;
              case 20:
                return (
                  (m = t.t2),
                  t.abrupt("return", {
                    round: d,
                    assetOut: m ? {amount: m.aamt, id: m.xaid} : void 0,
                    fees: H(s),
                    poolTokenID: r.poolTokenID,
                    txnID: f,
                    groupID: Z(s)
                  })
                );
              case 24:
                throw (
                  ((t.prev = 24),
                  (t.t3 = t.catch(1)),
                  "SlippageTolerance" ===
                    (g = new P(
                      t.t3,
                      "We encountered something unexpected while adding liquidity. Try again later."
                    )).type &&
                    g.setMessage(
                      "Adding liquidity failed due to too much slippage in the price. Please adjust the slippage tolerance and try again."
                    ),
                  g)
                );
              case 29:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[1, 24]]
      );
    })
  )).apply(this, arguments);
}
function Qe() {
  return (Qe = c(
    i().mark(function e(n) {
      var s, a, o, u, c, p, l, d, f, m, g, A, I, x, T, h, y, w;
      return i().wrap(function (e) {
        for (;;)
          switch ((e.prev = e.next)) {
            case 0:
              return (
                (s = n.client),
                (a = n.network),
                (o = n.poolAddress),
                (u = n.asset1In),
                (c = n.asset2In),
                (p = n.poolTokenOut),
                (l = n.initiatorAddr),
                (d = n.minPoolTokenAssetAmount),
                (e.next = 3),
                s.getTransactionParams().do()
              );
            case 3:
              return (
                (f = e.sent),
                (m = st(u, c)),
                (g = v(m, 2)),
                (A = g[0]),
                (I = g[1]),
                (x = ot(I.id)),
                (T = r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: l,
                  to: o,
                  assetIndex: A.id,
                  amount: A.amount,
                  suggestedParams: f
                })),
                (h = x
                  ? r.default.makePaymentTxnWithSuggestedParamsFromObject({
                      from: l,
                      to: o,
                      amount: I.amount,
                      suggestedParams: f
                    })
                  : r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                      from: l,
                      to: o,
                      assetIndex: I.id,
                      amount: I.amount,
                      suggestedParams: f
                    })),
                ((y = r.default.makeApplicationNoOpTxnFromObject({
                  from: l,
                  appIndex: ft(a, ut.V2),
                  note: lt.getAppCallTxnNoteWithClientName(ut.V2),
                  appArgs: [].concat(_(Be.v2.FLEXIBLE_MODE), [t.encodeUint64(d)]),
                  accounts: [o],
                  foreignAssets: [p.id],
                  suggestedParams: f
                })).fee = Le(exports.V2AddLiquidityType.FLEXIBLE)),
                (w = r.default.assignGroupID([T, h, y])),
                e.abrupt("return", [
                  {txn: w[0], signers: [l]},
                  {txn: w[1], signers: [l]},
                  {txn: w[2], signers: [l]}
                ])
              );
            case 12:
            case "end":
              return e.stop();
          }
      }, e);
    })
  )).apply(this, arguments);
}
var qe = Object.freeze({
  __proto__: null,
  getQuote: function (t) {
    var e = t.pool,
      n = t.slippage,
      r = void 0 === n ? 0.05 : n,
      s = t.asset1,
      a = t.asset2;
    if (0n === e.issuedPoolTokens)
      throw new Error(
        "Pool has no liquidity at the moment. To be able to do Flexible Swap, you should first add initial liquidity."
      );
    if (e.status !== exports.PoolStatus.READY) throw new Error("Pool is not ready");
    var o = {
        asset1: e.asset1Reserves || 0n,
        asset2: e.asset2Reserves || 0n,
        issuedLiquidity: e.issuedPoolTokens || 0n
      },
      i = Pe({
        reserves: o,
        totalFeeShare: e.totalFeeShare,
        asset1Amount: s.amount,
        asset2Amount: a.amount,
        decimals: {asset1: s.decimals, asset2: a.decimals}
      }),
      u = i.poolTokenAssetAmount,
      c = i.swapInAmount,
      p = i.swapOutAmount,
      l = i.swapPriceImpact,
      d = i.swapTotalFeeAmount,
      f = u - BigInt(Math.ceil(Number(u) * r));
    return {
      asset1In: {id: e.asset1ID, amount: BigInt(s.amount)},
      asset2In: {id: e.asset2ID, amount: BigInt(a.amount)},
      poolTokenOut: {id: e.poolTokenID, amount: u},
      share: Jt.getPoolShare(o.issuedLiquidity + u, u),
      slippage: r,
      internalSwapQuote: {amountIn: c, amountOut: p, swapFees: d, priceImpact: l},
      minPoolTokenAssetAmountWithSlippage: f
    };
  },
  generateTxns: function (t) {
    return Qe.apply(this, arguments);
  },
  signTxns: Xe,
  execute: je
});
function Ge() {
  return (Ge = c(
    i().mark(function e(n) {
      var s, a, o, u, c, p, l, d, f, m, g, A;
      return i().wrap(function (e) {
        for (;;)
          switch ((e.prev = e.next)) {
            case 0:
              return (
                (s = n.client),
                (a = n.network),
                (o = n.poolAddress),
                (u = n.assetIn),
                (c = n.poolTokenId),
                (p = n.initiatorAddr),
                (l = n.minPoolTokenAssetAmount),
                (e.next = 3),
                s.getTransactionParams().do()
              );
            case 3:
              return (
                (d = e.sent),
                (f = ot(u.id)),
                (m = f
                  ? r.default.makePaymentTxnWithSuggestedParamsFromObject({
                      from: p,
                      to: o,
                      amount: u.amount,
                      suggestedParams: d
                    })
                  : r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                      from: p,
                      to: o,
                      assetIndex: u.id,
                      amount: u.amount,
                      suggestedParams: d
                    })),
                ((g = r.default.makeApplicationNoOpTxnFromObject({
                  from: p,
                  appIndex: ft(a, ut.V2),
                  note: lt.getAppCallTxnNoteWithClientName(ut.V2),
                  appArgs: [].concat(_(Be.v2.SINGLE_ASSET_MODE), [t.encodeUint64(l)]),
                  accounts: [o],
                  foreignAssets: [c],
                  suggestedParams: d
                })).fee = Le(exports.V2AddLiquidityType.SINGLE)),
                (A = r.default.assignGroupID([m, g])),
                e.abrupt("return", [
                  {txn: A[0], signers: [p]},
                  {txn: A[1], signers: [p]}
                ])
              );
            case 10:
            case "end":
              return e.stop();
          }
      }, e);
    })
  )).apply(this, arguments);
}
var We = Object.freeze({
  __proto__: null,
  getQuote: function (t) {
    var e = t.pool,
      n = t.assetIn,
      r = t.slippage,
      s = void 0 === r ? 0.05 : r,
      a = t.decimals;
    if (0n === e.issuedPoolTokens) throw new Error("Pool has no liquidity");
    if (e.status !== exports.PoolStatus.READY) throw new Error("Pool is not ready");
    var o = n.id === e.asset1ID,
      i = {
        asset1: e.asset1Reserves || 0n,
        asset2: e.asset2Reserves || 0n,
        issuedLiquidity: e.issuedPoolTokens || 0n
      },
      u = Pe({
        reserves: i,
        totalFeeShare: e.totalFeeShare,
        asset1Amount: o ? n.amount : 0,
        asset2Amount: o ? 0 : n.amount,
        decimals: a
      }),
      c = u.poolTokenAssetAmount,
      p = u.swapInAmount,
      l = u.swapOutAmount,
      d = u.swapPriceImpact,
      f = u.swapTotalFeeAmount,
      m = c - BigInt(Math.ceil(Number(c) * s));
    return {
      assetIn: {id: o ? e.asset1ID : e.asset2ID, amount: BigInt(n.amount)},
      poolTokenOut: {id: e.poolTokenID, amount: c},
      share: Jt.getPoolShare(i.issuedLiquidity + c, c),
      slippage: s,
      internalSwapQuote: {amountIn: p, amountOut: l, swapFees: f, priceImpact: d},
      minPoolTokenAssetAmountWithSlippage: m
    };
  },
  generateTxns: function (t) {
    return Ge.apply(this, arguments);
  },
  signTxns: Xe,
  execute: je
});
function ze() {
  return (ze = c(
    i().mark(function t(e) {
      var n, s, a, o, u, c, p, l, d, f, m, g, A;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (s = e.pool),
                (a = e.network),
                (o = e.poolAddress),
                (u = e.asset1In),
                (c = e.asset2In),
                (p = e.poolTokenId),
                (l = e.initiatorAddr),
                (d = ot(s.asset2ID)),
                (t.next = 4),
                n.getTransactionParams().do()
              );
            case 4:
              return (
                (f = t.sent),
                (m = r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: l,
                  to: o,
                  assetIndex: s.asset1ID,
                  amount: u.amount,
                  suggestedParams: f
                })),
                (g = d
                  ? r.default.makePaymentTxnWithSuggestedParamsFromObject({
                      from: l,
                      to: o,
                      amount: c.amount,
                      suggestedParams: f
                    })
                  : r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                      from: l,
                      to: o,
                      assetIndex: s.asset2ID,
                      amount: c.amount,
                      suggestedParams: f
                    })),
                ((A = r.default.makeApplicationNoOpTxnFromObject({
                  from: l,
                  appIndex: ft(a, ut.V2),
                  appArgs: Be.v2.INITIAL_LIQUIDITY,
                  note: lt.getAppCallTxnNoteWithClientName(ut.V2),
                  accounts: [o],
                  foreignAssets: [p],
                  suggestedParams: f
                })).fee = Le(exports.V2AddLiquidityType.INITIAL)),
                t.abrupt(
                  "return",
                  r.default.assignGroupID([m, g, A]).map(function (t) {
                    return {txn: t, signers: [l]};
                  })
                )
              );
            case 10:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
var Je,
  Ye,
  Ke = Object.freeze({
    __proto__: null,
    getQuote: function (t) {
      var e = t.pool,
        n = t.asset1,
        r = t.asset2,
        s = t.slippage,
        a = void 0 === s ? 0.05 : s;
      if (0n !== e.issuedPoolTokens) throw new Error("Pool already has liquidity");
      var o = BigInt(Math.floor(Math.sqrt(Number(n.amount) * Number(r.amount))));
      if (o <= BigInt(1e3))
        throw new Error(
          "Initial liquidity amount is too small. Liquidity amount must be greater than "
            .concat(1e3, ", this quote is for ")
            .concat(o, ".")
        );
      var i = (function (t, e) {
        if (!t.amount || !e.amount)
          throw new Error("Both assets are required for the initial add liquidity");
        return BigInt(
          Math.abs(
            Math.floor(
              Math.sqrt(
                G(t.decimals, Math.floor(Number(t.amount))) *
                  G(e.decimals, Math.floor(Number(e.amount)))
              ) - 1e3
            )
          )
        );
      })(n, r);
      return {
        asset1In: {id: e.asset1ID, amount: BigInt(n.amount)},
        asset2In: {id: e.asset2ID, amount: BigInt(r.amount)},
        poolTokenOut: {id: e.poolTokenID, amount: i},
        slippage: a
      };
    },
    generateTxns: function (t) {
      return ze.apply(this, arguments);
    },
    signTxns: Xe,
    execute: je
  }),
  He = Object.freeze({__proto__: null, flexible: qe, withSingleAsset: We, initial: Ke}),
  Ze = (f((Je = {}), ut.V1_1, Ve), f(Je, ut.V2, He), Je);
!(function (t) {
  (t[(t.FEE_TXN = 0)] = "FEE_TXN"),
    (t[(t.VALIDATOR_APP_CALL_TXN = 1)] = "VALIDATOR_APP_CALL_TXN"),
    (t[(t.ASSET1_OUT_TXN = 2)] = "ASSET1_OUT_TXN"),
    (t[(t.ASSET2_OUT_TXN = 3)] = "ASSET2_OUT_TXN"),
    (t[(t.POOL_TOKEN_IN_TXN = 4)] = "POOL_TOKEN_IN_TXN");
})(Ye || (Ye = {}));
var $e,
  tn = Object.values(Ye).length,
  en = tt("remove_liquidity");
function nn() {
  return (nn = c(
    i().mark(function t(e) {
      var n, a, o, u, c, p, l, d, f, m, g, A, I, x, T, h, y, v, _, w;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (a = e.pool),
                (o = e.poolTokenIn),
                (u = e.asset1Out),
                (c = e.asset2Out),
                (p = e.slippage),
                (l = e.initiatorAddr),
                (t.next = 3),
                n.getTransactionParams().do()
              );
            case 3:
              return (
                (d = t.sent),
                (f = a.account.address()),
                (m = ot(a.asset2ID)),
                (g = r.default.makeApplicationNoOpTxnFromObject({
                  from: f,
                  appIndex: a.validatorAppID,
                  appArgs: [tt("burn")],
                  note: lt.getAppCallTxnNoteWithClientName(ut.V1_1),
                  accounts: [l],
                  foreignAssets: m
                    ? [a.asset1ID, a.poolTokenID]
                    : [a.asset1ID, a.asset2ID, a.poolTokenID],
                  suggestedParams: d
                })),
                (A = Q("negative", p, u)),
                (I = r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: f,
                  to: l,
                  assetIndex: a.asset1ID,
                  amount: A,
                  suggestedParams: d
                })),
                (x = Q("negative", p, c)),
                (T = m
                  ? r.default.makePaymentTxnWithSuggestedParamsFromObject({
                      from: f,
                      to: l,
                      amount: x,
                      suggestedParams: d
                    })
                  : r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                      from: f,
                      to: l,
                      assetIndex: a.asset2ID,
                      amount: x,
                      suggestedParams: d
                    })),
                (h = r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: l,
                  to: f,
                  assetIndex: a.poolTokenID,
                  amount: o,
                  suggestedParams: d
                })),
                (y = g.fee + I.fee + T.fee),
                (v = r.default.makePaymentTxnWithSuggestedParamsFromObject({
                  from: l,
                  to: f,
                  amount: y,
                  note: s,
                  suggestedParams: d
                })),
                ((_ = [])[Ye.FEE_TXN] = v),
                (_[Ye.VALIDATOR_APP_CALL_TXN] = g),
                (_[Ye.ASSET1_OUT_TXN] = I),
                (_[Ye.ASSET2_OUT_TXN] = T),
                (_[Ye.POOL_TOKEN_IN_TXN] = h),
                (w = r.default.assignGroupID(_)),
                t.abrupt("return", [
                  {txn: w[Ye.FEE_TXN], signers: [l]},
                  {txn: w[Ye.VALIDATOR_APP_CALL_TXN], signers: [f]},
                  {txn: w[Ye.ASSET1_OUT_TXN], signers: [f]},
                  {txn: w[Ye.ASSET2_OUT_TXN], signers: [f]},
                  {txn: w[Ye.POOL_TOKEN_IN_TXN], signers: [l]}
                ])
              );
            case 22:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function rn() {
  return (rn = c(
    i().mark(function t(e) {
      var n, s, a, o, u, c, p, l, d;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.pool),
                (s = e.txGroup),
                (a = e.initiatorSigner),
                (t.next = 3),
                a([s])
              );
            case 3:
              return (
                (o = t.sent),
                (u = v(o, 2)),
                (c = u[0]),
                (p = u[1]),
                (l = n.account),
                (d = s.map(function (t, e) {
                  return e === Ye.FEE_TXN
                    ? c
                    : e === Ye.POOL_TOKEN_IN_TXN
                    ? p
                    : r.default.signLogicSigTransactionObject(t.txn, l).blob;
                })),
                t.abrupt("return", d)
              );
            case 10:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function sn() {
  return (sn = c(
    i().mark(function t(e) {
      var n, r, s, a, o, u, c, p, l, d, f, m, g, A, I, x, T, h;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (n = e.client),
                  (r = e.pool),
                  (s = e.txGroup),
                  (a = e.signedTxns),
                  (o = e.initiatorAddr),
                  (t.prev = 1),
                  (u = s[Ye.ASSET1_OUT_TXN].txn.amount),
                  (c = s[Ye.ASSET2_OUT_TXN].txn.amount),
                  (p = s[Ye.POOL_TOKEN_IN_TXN].txn.amount),
                  (t.next = 7),
                  St({client: n, pool: r, accountAddr: o})
                );
              case 7:
                return (l = t.sent), (t.next = 10), Y(n, [a]);
              case 10:
                return (
                  (d = t.sent),
                  (f = v(d, 1)),
                  (m = f[0]),
                  (g = m.confirmedRound),
                  (A = m.txnID),
                  (t.next = 17),
                  St({client: n, pool: r, accountAddr: o})
                );
              case 17:
                return (
                  (I = t.sent),
                  (x = I.excessAsset1 - l.excessAsset1) < 0n && (x = 0n),
                  (T = I.excessAsset2 - l.excessAsset2) < 0n && (T = 0n),
                  t.abrupt("return", {
                    round: g,
                    fees: H(s),
                    asset1ID: r.asset1ID,
                    asset1Out: BigInt(u) + x,
                    asset2ID: r.asset2ID,
                    asset2Out: BigInt(c) + T,
                    poolTokenID: r.poolTokenID,
                    poolTokenIn: BigInt(p),
                    excessAmounts: [
                      {
                        assetID: r.asset1ID,
                        excessAmountForBurning: x,
                        totalExcessAmount: I.excessAsset1
                      },
                      {
                        assetID: r.asset2ID,
                        excessAmountForBurning: T,
                        totalExcessAmount: I.excessAsset2
                      }
                    ],
                    txnID: A,
                    groupID: Z(s)
                  })
                );
              case 25:
                throw (
                  ((t.prev = 25),
                  (t.t0 = t.catch(1)),
                  "SlippageTolerance" ===
                    (h = new P(
                      t.t0,
                      "We encountered something unexpected while burning liquidity. Try again later."
                    )).type &&
                    h.setMessage(
                      "The burn failed due to too much slippage in the price. Please adjust the slippage tolerance and try again."
                    ),
                  h)
                );
              case 30:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[1, 25]]
      );
    })
  )).apply(this, arguments);
}
!(function (t) {
  (t[(t.ASSET_TRANSFER_TXN = 0)] = "ASSET_TRANSFER_TXN"),
    (t[(t.APP_CALL_TXN = 1)] = "APP_CALL_TXN");
})($e || ($e = {}));
var an,
  on,
  un,
  cn,
  pn = {
    generateTxns: function (t) {
      return nn.apply(this, arguments);
    },
    getQuote: function (t) {
      var e = t.pool,
        n = t.reserves,
        r = t.poolTokenIn,
        s = BigInt(r),
        a = n.issuedLiquidity && (s * n.asset1) / n.issuedLiquidity,
        o = n.issuedLiquidity && (s * n.asset2) / n.issuedLiquidity;
      return {
        round: n.round,
        poolTokenID: e.poolTokenID,
        poolTokenIn: s,
        asset1ID: e.asset1ID,
        asset1Out: a,
        asset2ID: e.asset2ID,
        asset2Out: o
      };
    },
    signTxns: function (t) {
      return rn.apply(this, arguments);
    },
    execute: function (t) {
      return sn.apply(this, arguments);
    }
  };
(exports.SwapType = void 0),
  ((an = exports.SwapType || (exports.SwapType = {})).FixedInput = "fixed-input"),
  (an.FixedOutput = "fixed-output"),
  (function (t) {
    (t[(t.INPUT_TXN = 0)] = "INPUT_TXN"), (t[(t.APP_CALL_TXN = 1)] = "APP_CALL_TXN");
  })(cn || (cn = {}));
var ln =
    (f((on = {}), exports.SwapType.FixedInput, 1),
    f(on, exports.SwapType.FixedOutput, 2),
    on),
  dn = tt("swap"),
  fn =
    (f((un = {}), exports.SwapType.FixedInput, tt("fixed-input")),
    f(un, exports.SwapType.FixedOutput, tt("fixed-output")),
    un);
function mn() {
  return (mn = c(
    i().mark(function t(e) {
      var n, s, a, o, u, c, p, l, d, f, m, g, A, I, x, T;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (s = e.pool),
                (a = e.swapType),
                (o = e.assetIn),
                (u = e.assetOut),
                (c = e.initiatorAddr),
                (p = e.slippage),
                (t.next = 3),
                n.getTransactionParams().do()
              );
            case 3:
              return (
                (l = t.sent),
                (d = s.account.address()),
                (f = ot(o.id)),
                (m =
                  a === exports.SwapType.FixedInput
                    ? o.amount
                    : Q("positive", p, o.amount)),
                (g =
                  a === exports.SwapType.FixedOutput
                    ? u.amount
                    : Q("negative", p, u.amount)),
                (A = f
                  ? r.default.makePaymentTxnWithSuggestedParamsFromObject({
                      from: c,
                      to: d,
                      amount: m,
                      suggestedParams: l
                    })
                  : r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                      from: c,
                      to: d,
                      amount: m,
                      assetIndex: o.id,
                      suggestedParams: l
                    })),
                ((I = r.default.makeApplicationNoOpTxnFromObject({
                  from: c,
                  appIndex: s.validatorAppID,
                  appArgs: [dn, fn[a], r.default.encodeUint64(g)],
                  note: lt.getAppCallTxnNoteWithClientName(ut.V2),
                  accounts: [d],
                  foreignAssets: [s.asset1ID, s.asset2ID],
                  suggestedParams: l
                })).fee = gn(a)),
                ((x = [])[cn.INPUT_TXN] = A),
                (x[cn.APP_CALL_TXN] = I),
                (T = r.default.assignGroupID(x)),
                t.abrupt("return", [
                  {txn: T[cn.INPUT_TXN], signers: [c]},
                  {txn: T[cn.APP_CALL_TXN], signers: [c]}
                ])
              );
            case 16:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function gn(e) {
  return (ln[e] + 1) * t.ALGORAND_MIN_TX_FEE;
}
function An() {
  return (An = c(
    i().mark(function t(e) {
      var n, r, s, a, o, u, c, p, l, d, f, m, g, A, I, x, T;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (s = e.client),
                (a = e.pool),
                (o = e.txGroup),
                (u = e.signedTxns),
                (c = e.network),
                (p = e.assetIn),
                (t.next = 3),
                Y(s, [u])
              );
            case 3:
              return (
                (l = t.sent),
                (d = v(l, 1)),
                (f = d[0]),
                (m = f.confirmedRound),
                (g = f.txnID),
                (t.next = 10),
                ce(s, o)
              );
            case 10:
              return (
                (A = t.sent),
                (I = [a.asset1ID, a.asset2ID].filter(function (t) {
                  return t !== p.id;
                })[0]),
                (x =
                  null == A ||
                  null ===
                    (n = A.find(function (t) {
                      return t.txn.txn.xaid === p.id;
                    })) ||
                  void 0 === n
                    ? void 0
                    : n.txn.txn),
                (T =
                  null == A ||
                  null ===
                    (r = A.find(function (t) {
                      return t.txn.txn.xaid === I;
                    })) ||
                  void 0 === r
                    ? void 0
                    : r.txn.txn),
                (t.t0 = m),
                (t.t1 = x && {amount: BigInt(p.amount) - BigInt(x.aamt || 0), id: p.id}),
                (t.t2 = T && {amount: T.aamt, id: I}),
                (t.next = 19),
                Jt.v2.getPoolInfo({
                  client: s,
                  network: c,
                  asset1ID: a.asset1ID,
                  asset2ID: a.asset2ID
                })
              );
            case 19:
              return (
                (t.t3 = t.sent),
                (t.t4 = g),
                t.abrupt("return", {
                  round: t.t0,
                  assetIn: t.t1,
                  assetOut: t.t2,
                  pool: t.t3,
                  txnID: t.t4
                })
              );
            case 22:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function In(t) {
  var e = t.pool,
    n = t.assetIn,
    r = t.decimals;
  if (e.status !== exports.PoolStatus.READY)
    throw new P({pool: e, assetIn: n}, "Trying to swap on a non-existent pool");
  var s,
    a,
    o,
    i = BigInt(n.amount),
    u = e.totalFeeShare;
  n.id === e.asset1ID
    ? ((s = e.asset2ID), (a = e.asset1Reserves), (o = e.asset2Reserves))
    : ((s = e.asset1ID), (a = e.asset2Reserves), (o = e.asset1Reserves));
  var c = Tn({
      inputSupply: a,
      outputSupply: o,
      swapInputAmount: i,
      totalFeeShare: u,
      decimals: r
    }),
    p = c.swapOutputAmount,
    l = c.totalFeeAmount,
    d = c.priceImpact;
  return {
    assetInID: n.id,
    assetInAmount: i,
    assetOutID: s,
    assetOutAmount: p,
    swapFee: Number(l),
    rate: q(r.assetOut, Number(p)) / q(r.assetIn, Number(i)),
    priceImpact: d
  };
}
function xn(t) {
  var e,
    n,
    r,
    s = t.pool,
    a = t.assetOut,
    o = t.decimals,
    i = BigInt(a.amount),
    u = s.totalFeeShare;
  a.id === s.asset1ID
    ? ((e = s.asset2ID), (n = s.asset2Reserves), (r = s.asset1Reserves))
    : ((e = s.asset1ID), (n = s.asset1Reserves), (r = s.asset2Reserves));
  var c = (function (t) {
      var e = t.inputSupply,
        n = t.outputSupply,
        r = t.swapOutputAmount,
        s = t.totalFeeShare,
        a = t.decimals,
        o = (function (t) {
          var e = t.inputSupply,
            n = t.outputSupply,
            r = t.outputAmount,
            s = BigInt((e * n) / (n - r)) - e;
          return (s += BigInt(1));
        })({inputSupply: e, outputSupply: n, outputAmount: r}),
        i = (function (t) {
          var e = t.swapAmount,
            n = t.totalFeeShare,
            r = Math.floor(Number((e * BigInt(1e4)) / (BigInt(1e4) - BigInt(n))));
          return BigInt(r) - e;
        })({swapAmount: o, totalFeeShare: s}),
        u = o + i,
        c = Oe({
          inputSupply: e,
          outputSupply: n,
          assetIn: {amount: u, decimals: a.assetIn},
          assetOut: {amount: r, decimals: a.assetOut}
        });
      return {swapInputAmount: u, totalFeeAmount: i, priceImpact: c};
    })({
      inputSupply: n,
      outputSupply: r,
      swapOutputAmount: i,
      totalFeeShare: u,
      decimals: o
    }),
    p = c.swapInputAmount,
    l = c.totalFeeAmount,
    d = c.priceImpact;
  return {
    assetInID: e,
    assetInAmount: p,
    assetOutID: a.id,
    assetOutAmount: i,
    swapFee: Number(l),
    rate: q(o.assetOut, Number(i)) / q(o.assetIn, Number(p)),
    priceImpact: d
  };
}
function Tn(t) {
  var e = t.inputSupply,
    n = t.outputSupply,
    r = t.swapInputAmount,
    s = t.totalFeeShare,
    a = t.decimals,
    o = BigInt(
      (function (t) {
        var e = t.inputAmount,
          n = t.totalFeeShare;
        return Math.floor(Number(e * BigInt(n)) / 1e4);
      })({inputAmount: r, totalFeeShare: s})
    ),
    i = (function (t) {
      var e = t.inputSupply,
        n = t.outputSupply,
        r = t.swapAmount,
        s = n - BigInt((e * n) / (e + BigInt(r)));
      return (s -= BigInt(1));
    })({inputSupply: e, outputSupply: n, swapAmount: r - o});
  return {
    swapOutputAmount: i,
    totalFeeAmount: o,
    priceImpact: Oe({
      inputSupply: e,
      outputSupply: n,
      assetIn: {amount: r, decimals: a.assetIn},
      assetOut: {amount: i, decimals: a.assetOut}
    })
  };
}
var hn = {
  getQuote: function (t, e, n, r) {
    if (e.status !== exports.PoolStatus.READY)
      throw new P({pool: e, asset: n}, "Trying to swap on a non-existent pool");
    return t === exports.SwapType.FixedInput
      ? In({pool: e, assetIn: n, decimals: r})
      : xn({pool: e, assetOut: n, decimals: r});
  },
  getFixedInputSwapQuote: In,
  getFixedOutputSwapQuote: xn,
  generateTxns: function (t) {
    return mn.apply(this, arguments);
  },
  signTxns: function (t) {
    var e = t.txGroup;
    return (0, t.initiatorSigner)([e]);
  },
  execute: function (t) {
    return An.apply(this, arguments);
  },
  calculateFixedInputSwap: Tn
};
function yn(t, e) {
  var n,
    r,
    s = BigInt(t),
    a = e.issuedLiquidity;
  return (
    a > s + BigInt(1e3)
      ? ((n = (s * e.asset1) / a), (r = (s * e.asset2) / a))
      : ((n = e.asset1), (r = e.asset2)),
    {asset1OutputAmount: n, asset2OutputAmount: r}
  );
}
function vn() {
  return (vn = c(
    i().mark(function e(n) {
      var s, a, o, u, c, p, l, d, f, m, g, A, I, x;
      return i().wrap(function (e) {
        for (;;)
          switch ((e.prev = e.next)) {
            case 0:
              return (
                (s = n.client),
                (a = n.pool),
                (o = n.poolTokenIn),
                (u = n.initiatorAddr),
                (c = n.minAsset1Amount),
                (p = n.minAsset2Amount),
                (l = n.slippage),
                (e.next = 3),
                s.getTransactionParams().do()
              );
            case 3:
              if (((d = e.sent), (f = a.account.address()), (m = a.poolTokenID))) {
                e.next = 8;
                break;
              }
              throw new Error("Pool token asset ID is missing");
            case 8:
              return (
                (g = r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: u,
                  to: f,
                  assetIndex: m,
                  amount: o,
                  suggestedParams: d
                })),
                ((A = r.default.makeApplicationNoOpTxnFromObject({
                  from: u,
                  appIndex: a.validatorAppID,
                  note: lt.getAppCallTxnNoteWithClientName(ut.V2),
                  appArgs: [
                    en,
                    r.default.encodeUint64(Q("negative", l, c)),
                    r.default.encodeUint64(Q("negative", l, p))
                  ],
                  accounts: [f],
                  foreignAssets: [a.asset1ID, a.asset2ID],
                  suggestedParams: d
                })).fee = 3 * t.ALGORAND_MIN_TX_FEE),
                ((I = [])[$e.ASSET_TRANSFER_TXN] = g),
                (I[$e.APP_CALL_TXN] = A),
                (x = r.default.assignGroupID(I)),
                e.abrupt("return", [
                  {txn: x[$e.ASSET_TRANSFER_TXN], signers: [u]},
                  {txn: x[$e.APP_CALL_TXN], signers: [u]}
                ])
              );
            case 16:
            case "end":
              return e.stop();
          }
      }, e);
    })
  )).apply(this, arguments);
}
function _n() {
  return (_n = c(
    i().mark(function e(n) {
      var s, a, o, u, c, p, l, d, f, m, g, A, I, x, T, h, y, v, _;
      return i().wrap(function (e) {
        for (;;)
          switch ((e.prev = e.next)) {
            case 0:
              return (
                (s = n.client),
                (a = n.pool),
                (o = n.initiatorAddr),
                (u = n.poolTokenIn),
                (c = n.outputAssetId),
                (p = n.minOutputAssetAmount),
                (l = n.slippage),
                (e.next = 3),
                s.getTransactionParams().do()
              );
            case 3:
              if (
                ((d = e.sent),
                (f = a.asset1ID),
                (m = a.asset2ID),
                (g = a.account.address()),
                (A = a.poolTokenID))
              ) {
                e.next = 9;
                break;
              }
              throw new Error("Pool token asset ID is missing");
            case 9:
              if (((I = 0), (x = 0), (T = Q("negative", l, p)), c !== f)) {
                e.next = 17;
                break;
              }
              (I = T), (x = 0), (e.next = 23);
              break;
            case 17:
              if (c !== m) {
                e.next = 22;
                break;
              }
              (I = 0), (x = T), (e.next = 23);
              break;
            case 22:
              throw new Error(
                "Invalid output asset id. It doesn't match with pool assets"
              );
            case 23:
              return (
                (h = r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: o,
                  to: g,
                  assetIndex: A,
                  amount: u,
                  suggestedParams: d
                })),
                ((y = r.default.makeApplicationNoOpTxnFromObject({
                  from: o,
                  appIndex: a.validatorAppID,
                  note: lt.getAppCallTxnNoteWithClientName(ut.V2),
                  appArgs: [en, r.default.encodeUint64(I), r.default.encodeUint64(x)],
                  accounts: [g],
                  foreignAssets: [c],
                  suggestedParams: d
                })).fee = 3 * t.ALGORAND_MIN_TX_FEE),
                ((v = [])[$e.ASSET_TRANSFER_TXN] = h),
                (v[$e.APP_CALL_TXN] = y),
                (_ = r.default.assignGroupID(v)),
                e.abrupt("return", [
                  {txn: _[$e.ASSET_TRANSFER_TXN], signers: [o]},
                  {txn: _[$e.APP_CALL_TXN], signers: [o]}
                ])
              );
            case 31:
            case "end":
              return e.stop();
          }
      }, e);
    })
  )).apply(this, arguments);
}
function wn() {
  return (wn = c(
    i().mark(function t(e) {
      var n, r, s, a, o, u, c, p;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (r = e.client),
                (s = e.txGroup),
                (a = e.signedTxns),
                (t.next = 3),
                Y(r, [a])
              );
            case 3:
              return (
                (o = t.sent), (u = v(o, 1)), (c = u[0].txnID), (t.next = 8), ce(r, s)
              );
            case 8:
              if (((t.t1 = n = t.sent), (t.t0 = null === t.t1), t.t0)) {
                t.next = 12;
                break;
              }
              t.t0 = void 0 === n;
            case 12:
              if (!t.t0) {
                t.next = 16;
                break;
              }
              (t.t2 = void 0), (t.next = 17);
              break;
            case 16:
              t.t2 = n.map(function (t) {
                return {assetId: t.txn.txn.xaid, amount: t.txn.txn.aamt};
              });
            case 17:
              return (p = t.t2), t.abrupt("return", {outputAssets: p, txnID: c});
            case 19:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
var Dn,
  bn,
  En = {
    getQuote: function (t) {
      var e = t.pool,
        n = t.reserves,
        r = t.poolTokenIn,
        s = BigInt(r),
        a = yn(s, n),
        o = a.asset1OutputAmount,
        i = a.asset2OutputAmount;
      return {
        round: n.round,
        asset1Out: {assetId: e.asset1ID, amount: o},
        asset2Out: {assetId: e.asset2ID, amount: i},
        poolTokenIn: {assetId: e.poolTokenID, amount: s}
      };
    },
    getSingleAssetRemoveLiquidityQuote: function (t) {
      var e,
        n = t.pool,
        r = t.reserves,
        s = t.poolTokenIn,
        a = t.assetOutID,
        o = t.decimals,
        i = BigInt(s),
        u = yn(i, r),
        c = u.asset1OutputAmount,
        p = u.asset2OutputAmount,
        l = n.totalFeeShare;
      if (a === n.asset1ID) {
        var d = hn.calculateFixedInputSwap({
            inputSupply: r.asset2 - p,
            outputSupply: r.asset1 - c,
            swapInputAmount: p,
            totalFeeShare: l,
            decimals: o
          }),
          f = d.swapOutputAmount,
          m = d.totalFeeAmount,
          g = d.priceImpact;
        e = {
          round: r.round,
          assetOut: {assetId: a, amount: c + f},
          poolTokenIn: {assetId: n.poolTokenID, amount: i},
          internalSwapQuote: {
            amountIn: {assetId: n.asset2ID, amount: p},
            amountOut: {assetId: n.asset1ID, amount: f},
            swapFees: {assetId: n.asset2ID, amount: m},
            priceImpact: g
          }
        };
      } else {
        if (a !== n.asset2ID)
          throw new Error("assetOutID must be one of the pool assets");
        var A = hn.calculateFixedInputSwap({
            inputSupply: r.asset1 - c,
            outputSupply: r.asset2 - p,
            swapInputAmount: c,
            totalFeeShare: l,
            decimals: o
          }),
          I = A.swapOutputAmount,
          x = A.totalFeeAmount,
          T = A.priceImpact;
        e = {
          round: r.round,
          assetOut: {assetId: a, amount: p + I},
          poolTokenIn: {assetId: n.poolTokenID, amount: i},
          internalSwapQuote: {
            amountIn: {assetId: n.asset2ID, amount: p},
            amountOut: {assetId: n.asset1ID, amount: I},
            swapFees: {assetId: n.asset2ID, amount: x},
            priceImpact: T
          }
        };
      }
      return e;
    },
    generateTxns: function (t) {
      return vn.apply(this, arguments);
    },
    generateSingleAssetOutTxns: function (t) {
      return _n.apply(this, arguments);
    },
    signTxns: function (t) {
      var e = t.txGroup;
      return (0, t.initiatorSigner)([e]);
    },
    execute: function (t) {
      return wn.apply(this, arguments);
    }
  },
  Sn = (f((Dn = {}), ut.V1_1, pn), f(Dn, ut.V2, En), Dn),
  Nn = 3n,
  On = 1000n;
function Pn() {
  return (Pn = c(
    i().mark(function t(e) {
      var n, s, a, o, u, c, p, l;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.pool),
                (s = e.txGroup),
                (a = e.initiatorSigner),
                (t.next = 3),
                a([s])
              );
            case 3:
              return (
                (o = t.sent),
                (u = v(o, 2)),
                (c = u[0]),
                (p = u[1]),
                (l = s.map(function (t, e) {
                  return e === bn.FEE_TXN_INDEX
                    ? c
                    : e === bn.ASSET_IN_TXN_INDEX
                    ? p
                    : r.default.signLogicSigTransactionObject(t.txn, n.account.lsig).blob;
                })),
                t.abrupt("return", l)
              );
            case 9:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function kn() {
  return (kn = c(
    i().mark(function t(e) {
      var n, a, o, u, c, p, l, d, f, m, g, A, I, x, T, h, y;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (a = e.pool),
                (o = e.swapType),
                (u = e.assetIn),
                (c = e.assetOut),
                (p = e.slippage),
                (l = e.initiatorAddr),
                (t.next = 3),
                n.getTransactionParams().do()
              );
            case 3:
              return (
                (d = t.sent),
                (f = a.account.address()),
                (m = [
                  tt("swap"),
                  o === exports.SwapType.FixedInput ? tt("fi") : tt("fo")
                ]),
                (g = r.default.makeApplicationNoOpTxnFromObject({
                  from: f,
                  appIndex: a.validatorAppID,
                  appArgs: m,
                  accounts: [l],
                  note: lt.getAppCallTxnNoteWithClientName(ut.V1_1),
                  foreignAssets:
                    0 == a.asset2ID
                      ? [a.asset1ID, a.poolTokenID]
                      : [a.asset1ID, a.asset2ID, a.poolTokenID],
                  suggestedParams: d
                })),
                (A =
                  o === exports.SwapType.FixedOutput
                    ? Q("positive", p, u.amount)
                    : u.amount),
                (I =
                  0 === u.id
                    ? r.default.makePaymentTxnWithSuggestedParamsFromObject({
                        from: l,
                        to: f,
                        amount: A,
                        suggestedParams: d
                      })
                    : r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: l,
                        to: f,
                        assetIndex: u.id,
                        amount: A,
                        suggestedParams: d
                      })),
                (x =
                  o === exports.SwapType.FixedInput
                    ? Q("negative", p, c.amount)
                    : c.amount),
                (T =
                  0 === c.id
                    ? r.default.makePaymentTxnWithSuggestedParamsFromObject({
                        from: f,
                        to: l,
                        amount: x,
                        suggestedParams: d
                      })
                    : r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: f,
                        to: l,
                        assetIndex: c.id,
                        amount: x,
                        suggestedParams: d
                      })),
                (h = r.default.makePaymentTxnWithSuggestedParamsFromObject({
                  from: l,
                  to: f,
                  amount: g.fee + T.fee,
                  note: s,
                  suggestedParams: d
                })),
                (y = r.default.assignGroupID([h, g, I, T])),
                t.abrupt("return", [
                  {txn: y[0], signers: [l]},
                  {txn: y[1], signers: [f]},
                  {txn: y[2], signers: [l]},
                  {txn: y[3], signers: [f]}
                ])
              );
            case 14:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Ln(t) {
  var e,
    n,
    r,
    s = t.pool,
    a = t.reserves,
    i = t.assetIn,
    u = t.decimals,
    c = BigInt(i.amount);
  i.id === s.asset1ID
    ? ((e = s.asset2ID), (n = a.asset1), (r = a.asset2))
    : ((e = s.asset1ID), (n = a.asset2), (r = a.asset1));
  var p = (c * Nn) / On,
    l = r - (n * r) / (n + (c - p));
  if (l > r) throw new Error("Output amount exceeds available liquidity.");
  var d = {
    assetIn: {amount: c, decimals: u.assetIn},
    assetOut: {amount: l, decimals: u.assetOut}
  };
  return {
    round: a.round,
    assetInID: i.id,
    assetInAmount: c,
    assetOutID: e,
    assetOutAmount: l,
    swapFee: Number(p),
    rate: Ne(d),
    priceImpact: Oe(o({inputSupply: n, outputSupply: r}, d))
  };
}
function Fn(t) {
  return Bn.apply(this, arguments);
}
function Bn() {
  return (Bn = c(
    i().mark(function t(e) {
      var n, r, s, a, o, u, c, p, l, d, f, m, g, A, I, x;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (r = e.pool),
                (s = e.signedTxns),
                (a = e.assetIn),
                (o = e.assetOut),
                (u = e.initiatorAddr),
                (t.next = 3),
                St({client: n, pool: r, accountAddr: u})
              );
            case 3:
              return (c = t.sent), (t.next = 6), Y(n, [s]);
            case 6:
              return (
                (p = t.sent),
                (l = v(p, 1)),
                (d = l[0]),
                (f = d.confirmedRound),
                (m = d.txnID),
                (t.next = 13),
                St({client: n, pool: r, accountAddr: u})
              );
            case 13:
              return (
                (g = t.sent),
                o.id === r.asset1ID
                  ? ((A = c.excessAsset1), (I = g.excessAsset1))
                  : ((A = c.excessAsset2), (I = g.excessAsset2)),
                (x = I - A) < 0n && (x = 0n),
                t.abrupt("return", {
                  round: f,
                  assetInID: a.id,
                  assetInAmount: BigInt(a.amount),
                  assetOutID: o.id,
                  assetOutAmount: BigInt(o.amount) + x,
                  excessAmount: {
                    assetID: o.id,
                    excessAmountForSwap: x,
                    totalExcessAmount: I
                  },
                  txnID: m
                })
              );
            case 18:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Rn(t) {
  var e,
    n,
    r,
    s = t.pool,
    a = t.reserves,
    o = t.assetOut,
    i = t.decimals,
    u = BigInt(o.amount);
  if (
    (o.id === s.asset1ID
      ? ((e = s.asset2ID), (n = a.asset2), (r = a.asset1))
      : ((e = s.asset1ID), (n = a.asset1), (r = a.asset2)),
    u > r)
  )
    throw new Error("Output amount exceeds available liquidity.");
  var c = (n * r) / (r - u) - n,
    p = (c * On) / (On - Nn),
    l = p - c,
    d = q(i.assetOut, Number(u)) / q(i.assetIn, Number(p)),
    f = q(i.assetOut, Number(r)) / q(i.assetIn, Number(n)),
    m = W({decimalPlaces: 5}, Math.abs(d / f - 1));
  return {
    round: a.round,
    assetInID: e,
    assetInAmount: p,
    assetOutID: o.id,
    assetOutAmount: u,
    swapFee: Number(l),
    rate: d,
    priceImpact: m
  };
}
function Mn(t) {
  return Cn.apply(this, arguments);
}
function Cn() {
  return (Cn = c(
    i().mark(function t(e) {
      var n, r, s, a, o, u, c, p, l, d, f, m, g, A, I, x;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (r = e.pool),
                (s = e.signedTxns),
                (a = e.assetIn),
                (o = e.assetOut),
                (u = e.initiatorAddr),
                (t.next = 3),
                St({client: n, pool: r, accountAddr: u})
              );
            case 3:
              return (c = t.sent), (t.next = 6), Y(n, [s]);
            case 6:
              return (
                (p = t.sent),
                (l = v(p, 1)),
                (d = l[0]),
                (f = d.confirmedRound),
                (m = d.txnID),
                (t.next = 13),
                St({client: n, pool: r, accountAddr: u})
              );
            case 13:
              return (
                (g = t.sent),
                a.id === r.asset1ID
                  ? ((A = c.excessAsset1), (I = g.excessAsset1))
                  : ((A = c.excessAsset2), (I = g.excessAsset2)),
                (x = I - A) < 0n && (x = 0n),
                t.abrupt("return", {
                  round: f,
                  assetInID: a.id,
                  assetInAmount: BigInt(a.amount) - x,
                  assetOutID: o.id,
                  assetOutAmount: BigInt(o.amount),
                  excessAmount: {
                    assetID: a.id,
                    excessAmountForSwap: x,
                    totalExcessAmount: I
                  },
                  txnID: m
                })
              );
            case 18:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Vn() {
  return (Vn = c(
    i().mark(function t(e) {
      var n, r, s, a, u, c, p, l, d, f;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                if (
                  ((n = e.client),
                  (r = e.pool),
                  (s = e.swapType),
                  (a = e.txGroup),
                  (u = e.signedTxns),
                  (c = e.initiatorAddr),
                  r.status === exports.PoolStatus.READY)
                ) {
                  t.next = 3;
                  break;
                }
                throw new P(
                  {pool: r, swapType: s, txGroup: a},
                  "Trying to swap on a non-existent pool"
                );
              case 3:
                if (
                  ((t.prev = 3),
                  (p = {
                    id: a[bn.ASSET_IN_TXN_INDEX].txn.assetIndex || 0,
                    amount: a[bn.ASSET_IN_TXN_INDEX].txn.amount
                  }),
                  (l = {
                    id: a[bn.ASSET_OUT_TXN_INDEX].txn.assetIndex || 0,
                    amount: a[bn.ASSET_OUT_TXN_INDEX].txn.amount
                  }),
                  s !== exports.SwapType.FixedInput)
                ) {
                  t.next = 12;
                  break;
                }
                return (
                  (t.next = 9),
                  Fn({
                    client: n,
                    pool: r,
                    signedTxns: u,
                    assetIn: p,
                    assetOut: l,
                    initiatorAddr: c
                  })
                );
              case 9:
                (d = t.sent), (t.next = 15);
                break;
              case 12:
                return (
                  (t.next = 14),
                  Mn({
                    client: n,
                    pool: r,
                    signedTxns: u,
                    assetIn: p,
                    assetOut: l,
                    initiatorAddr: c
                  })
                );
              case 14:
                d = t.sent;
              case 15:
                return t.abrupt("return", o(o({}, d), {}, {groupID: Z(a), fees: H(a)}));
              case 18:
                throw (
                  ((t.prev = 18),
                  (t.t0 = t.catch(3)),
                  "SlippageTolerance" ===
                    (f = new P(
                      t.t0,
                      "We encountered something unexpected while swapping. Try again later."
                    )).type &&
                    f.setMessage(
                      "The swap failed due to too much slippage in the price. Please adjust the slippage tolerance and try again."
                    ),
                  f)
                );
              case 23:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[3, 18]]
      );
    })
  )).apply(this, arguments);
}
!(function (t) {
  (t[(t.FEE_TXN_INDEX = 0)] = "FEE_TXN_INDEX"),
    (t[(t.VALIDATOR_APP_CALL_TXN_INDEX = 1)] = "VALIDATOR_APP_CALL_TXN_INDEX"),
    (t[(t.ASSET_IN_TXN_INDEX = 2)] = "ASSET_IN_TXN_INDEX"),
    (t[(t.ASSET_OUT_TXN_INDEX = 3)] = "ASSET_OUT_TXN_INDEX");
})(bn || (bn = {}));
var Xn,
  jn = {
    getQuote: function (t, e, n, r, s) {
      if (e.status !== exports.PoolStatus.READY)
        throw new P({pool: e, asset: r}, "Trying to swap on a non-existent pool");
      return t === exports.SwapType.FixedInput
        ? Ln({pool: e, reserves: n, assetIn: r, decimals: s})
        : Rn({pool: e, reserves: n, assetOut: r, decimals: s});
    },
    getFixedInputSwapQuote: Ln,
    getFixedOutputSwapQuote: Rn,
    generateTxns: function (t) {
      return kn.apply(this, arguments);
    },
    signTxns: function (t) {
      return Pn.apply(this, arguments);
    },
    execute: function (t) {
      return Vn.apply(this, arguments);
    },
    executeFixedOutputSwap: Mn
  },
  Un = 4 * t.ALGORAND_MIN_TX_FEE;
function Qn(t) {
  return t
    .filter(function (t) {
      return !qt(t.pool.reserves);
    })
    .sort(function (t, e) {
      return e.quote.rate - t.quote.rate;
    })[0];
}
var qn =
  (f((Xn = {}), ut.V1_1, jn),
  f(Xn, ut.V2, hn),
  f(Xn, "getQuote", function (t) {
    if (
      t.pools.every(function (t) {
        return qt(t.reserves);
      })
    )
      throw new Error("No pools available for swap");
    return t.type === exports.SwapType.FixedInput
      ? ((n = (e = t).pools),
        (r = e.assetIn),
        (s = e.assetOut),
        (a = e.amount),
        Qn(
          n.map(function (t) {
            var e = {
              pool: t.info,
              assetIn: {amount: a, id: Number(r.id)},
              decimals: {assetIn: r.decimals, assetOut: s.decimals},
              reserves: t.reserves
            };
            return {
              pool: t,
              quote:
                t.info.contractVersion === ut.V1_1
                  ? jn.getFixedInputSwapQuote(e)
                  : hn.getFixedInputSwapQuote(e)
            };
          })
        ))
      : (function (t) {
          var e = t.pools,
            n = t.assetIn,
            r = t.assetOut,
            s = t.amount;
          return Qn(
            e.map(function (t) {
              var e = {
                pool: t.info,
                assetOut: {amount: s, id: Number(r.id)},
                decimals: {assetIn: n.decimals, assetOut: r.decimals},
                reserves: t.reserves
              };
              return {
                pool: t,
                quote:
                  t.info.contractVersion === ut.V1_1
                    ? jn.getFixedOutputSwapQuote(e)
                    : hn.getFixedOutputSwapQuote(e)
              };
            })
          );
        })(t);
    var e, n, r, s, a;
  }),
  f(Xn, "generateTxns", function (t) {
    return t.pool.contractVersion === ut.V1_1 ? jn.generateTxns(t) : hn.generateTxns(t);
  }),
  f(Xn, "signTxns", function (t) {
    return t.pool.contractVersion === ut.V1_1 ? jn.signTxns(t) : hn.signTxns(t);
  }),
  f(Xn, "execute", function (t) {
    return t.contractVersion === ut.V1_1 ? jn.execute(t) : hn.execute(t);
  }),
  Xn);
function Gn() {
  return (Gn = c(
    i().mark(function t(e) {
      var n, r, s, a, o, u, c, p, l, d;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (n = e.client),
                  (r = e.pool),
                  (s = e.txGroup),
                  (a = e.initiatorSigner),
                  (t.prev = 1),
                  (t.next = 4),
                  Wn({txGroup: s, pool: r, initiatorSigner: a})
                );
              case 4:
                return (o = t.sent), (t.next = 7), Y(n, [o]);
              case 7:
                return (
                  (u = t.sent),
                  (c = v(u, 1)),
                  (p = c[0]),
                  (l = p.txnID),
                  (d = p.confirmedRound),
                  t.abrupt("return", {
                    fees: H(s),
                    confirmedRound: d,
                    txnID: l,
                    groupID: Z(s)
                  })
                );
              case 15:
                throw (
                  ((t.prev = 15),
                  (t.t0 = t.catch(1)),
                  new P(
                    t.t0,
                    "We encountered something unexpected while redeeming. Try again later."
                  ))
                );
              case 18:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[1, 15]]
      );
    })
  )).apply(this, arguments);
}
function Wn(t) {
  return zn.apply(this, arguments);
}
function zn() {
  return (zn = c(
    i().mark(function t(e) {
      var n, s, a, o, u, c, p, l;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.txGroup),
                (s = e.pool),
                (a = e.initiatorSigner),
                (t.next = 3),
                a([n])
              );
            case 3:
              return (
                (o = t.sent),
                (u = v(o, 1)),
                (c = u[0]),
                (p = s.account.lsig),
                (l = n.map(function (t, e) {
                  return 0 === e
                    ? c
                    : r.default.signLogicSigTransactionObject(t.txn, p).blob;
                })),
                t.abrupt("return", l)
              );
            case 9:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Jn() {
  return (
    (Jn = c(
      i().mark(function t(e) {
        var n, s, a, o, u, p;
        return i().wrap(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  return (
                    (n = e.client),
                    (s = e.data),
                    (a = e.initiatorSigner),
                    (t.prev = 1),
                    (o = s.map(function (t) {
                      var e = t.txGroup,
                        n = t.pool;
                      return {
                        txns: e,
                        txnFees: H(e),
                        groupID: Z(e),
                        lsig: n.account.lsig
                      };
                    })),
                    (t.next = 5),
                    a(
                      o.map(function (t) {
                        return t.txns;
                      })
                    )
                  );
                case 5:
                  return (
                    (u = t.sent),
                    (p = Promise.all(
                      o.map(function (t, e) {
                        return new Promise(
                          (function () {
                            var s = c(
                              i().mark(function s(a, o) {
                                var c, p, l, d, f, m;
                                return i().wrap(
                                  function (s) {
                                    for (;;)
                                      switch ((s.prev = s.next)) {
                                        case 0:
                                          return (
                                            (s.prev = 0),
                                            (c = t.txns.map(function (n, s) {
                                              return 0 === s
                                                ? u[e]
                                                : r.default.signLogicSigTransactionObject(
                                                    n.txn,
                                                    t.lsig
                                                  ).blob;
                                            })),
                                            (s.next = 4),
                                            Y(n, [c])
                                          );
                                        case 4:
                                          (p = s.sent),
                                            (l = v(p, 1)),
                                            (d = l[0]),
                                            (f = d.txnID),
                                            (m = d.confirmedRound),
                                            a({
                                              fees: t.txnFees,
                                              groupID: t.groupID,
                                              txnID: f,
                                              confirmedRound: m
                                            }),
                                            (s.next = 15);
                                          break;
                                        case 12:
                                          (s.prev = 12), (s.t0 = s.catch(0)), o(s.t0);
                                        case 15:
                                        case "end":
                                          return s.stop();
                                      }
                                  },
                                  s,
                                  null,
                                  [[0, 12]]
                                );
                              })
                            );
                            return function (t, e) {
                              return s.apply(this, arguments);
                            };
                          })()
                        );
                      })
                    )),
                    t.abrupt("return", p)
                  );
                case 10:
                  throw (
                    ((t.prev = 10),
                    (t.t0 = t.catch(1)),
                    new P(
                      t.t0,
                      "We encountered something unexpected while redeeming. Try again later."
                    ))
                  );
                case 13:
                case "end":
                  return t.stop();
              }
          },
          t,
          null,
          [[1, 10]]
        );
      })
    )),
    Jn.apply(this, arguments)
  );
}
function Yn() {
  return (Yn = c(
    i().mark(function t(e) {
      var n, a, o, u, c, p, l, d, f, m, g;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (a = e.pool),
                (o = e.assetID),
                (u = e.assetOut),
                (c = e.initiatorAddr),
                (t.next = 3),
                n.getTransactionParams().do()
              );
            case 3:
              return (
                (p = t.sent),
                (l = a.account.address()),
                (d = r.default.makeApplicationNoOpTxnFromObject({
                  from: l,
                  appIndex: a.validatorAppID,
                  appArgs: [tt("redeem")],
                  note: lt.getAppCallTxnNoteWithClientName(a.contractVersion),
                  accounts: [c],
                  foreignAssets:
                    0 == a.asset2ID
                      ? [a.asset1ID, a.poolTokenID]
                      : [a.asset1ID, a.asset2ID, a.poolTokenID],
                  suggestedParams: p
                })),
                (f =
                  0 === o
                    ? r.default.makePaymentTxnWithSuggestedParamsFromObject({
                        from: l,
                        to: c,
                        amount: BigInt(u),
                        suggestedParams: p
                      })
                    : r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: l,
                        to: c,
                        assetIndex: o,
                        amount: BigInt(u),
                        suggestedParams: p
                      })),
                (m = r.default.makePaymentTxnWithSuggestedParamsFromObject({
                  from: c,
                  to: l,
                  amount: d.fee + f.fee,
                  note: s,
                  suggestedParams: p
                })),
                (g = r.default.assignGroupID([m, d, f])),
                t.abrupt("return", [
                  {txn: g[0], signers: [c]},
                  {txn: g[1], signers: [l]},
                  {txn: g[2], signers: [l]}
                ])
              );
            case 10:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Kn(e) {
  var n = e.suggestedParams,
    r = e.stakingAppID,
    s = e.initiatorAddr,
    a = e.liquidityAssetID,
    o = e.program,
    i = e.amount,
    u = t.encodeUint64(i),
    c = t.encodeUint64(o.id);
  return t.makeApplicationNoOpTxnFromObject({
    appIndex: r,
    from: s,
    suggestedParams: n,
    foreignAssets: [a],
    accounts: [o.accountAddress],
    appArgs: [tt("commit"), u],
    note: L([tt("tinymanStaking/v1:b"), c, t.encodeUint64(a), u])
  });
}
function Hn() {
  return (Hn = c(
    i().mark(function e(n) {
      var r, s, a, o, u, c, p, l, d, f, m;
      return i().wrap(function (e) {
        for (;;)
          switch ((e.prev = e.next)) {
            case 0:
              return (
                (r = n.client),
                (s = n.stakingAppID),
                (a = n.program),
                (o = n.requiredAssetID),
                (u = n.liquidityAssetID),
                (c = n.amount),
                (p = n.initiatorAddr),
                (e.next = 3),
                r.getTransactionParams().do()
              );
            case 3:
              if (
                ((l = e.sent),
                (d = Kn({
                  suggestedParams: l,
                  stakingAppID: s,
                  program: a,
                  liquidityAssetID: u,
                  initiatorAddr: p,
                  amount: c
                })),
                (f = [d]),
                "number" != typeof o)
              ) {
                e.next = 10;
                break;
              }
              return (
                (m = t.makeApplicationNoOpTxnFromObject({
                  appIndex: s,
                  from: p,
                  suggestedParams: l,
                  foreignAssets: [o],
                  accounts: [a.accountAddress],
                  appArgs: [tt("log_balance")]
                })),
                (f = t.assignGroupID([d, m])),
                e.abrupt("return", [
                  {txn: f[0], signers: [p]},
                  {txn: f[1], signers: [p]}
                ])
              );
            case 10:
              return e.abrupt("return", [{txn: f[0], signers: [p]}]);
            case 11:
            case "end":
              return e.stop();
          }
      }, e);
    })
  )).apply(this, arguments);
}
(exports.ALGO_ASSET = et),
  (exports.ALGO_ASSET_ID = 0),
  (exports.ASSET_OPT_IN_PROCESS_TXN_COUNT = 1),
  (exports.AddLiquidity = Ze),
  (exports.BASE_MINIMUM_BALANCE = 1e5),
  (exports.Bootstrap = Te),
  (exports.CONTRACT_VERSION = ut),
  (exports.MINIMUM_ADD_LIQUIDITY_AMOUNT = 1e3),
  (exports.MINIMUM_BALANCE_REQUIRED_PER_APP = 1e5),
  (exports.MINIMUM_BALANCE_REQUIRED_PER_ASSET = 1e5),
  (exports.MINIMUM_BALANCE_REQUIRED_PER_BYTE_SCHEMA = 5e4),
  (exports.MINIMUM_BALANCE_REQUIRED_PER_INT_SCHEMA_VALUE = 28500),
  (exports.OPT_IN_VALIDATOR_APP_PROCESS_TXN_COUNT = 1),
  (exports.OPT_OUT_VALIDATOR_APP_PROCESS_TXN_COUNT = 1),
  (exports.POOL_TOKEN_UNIT_NAME = nt),
  (exports.REDEEM_PROCESS_TXN_COUNT = 3),
  (exports.RemoveLiquidity = Sn),
  (exports.Swap = qn),
  (exports.V1_1_ADD_LIQUIDITY_PROCESS_TXN_COUNT = 5),
  (exports.V1_1_REMOVE_LIQUIDITY_TXN_COUNT = tn),
  (exports.V2AddLiquidityTxnIndices = be),
  (exports.V2_REMOVE_LIQUIDITY_APP_CALL_INNER_TXN_COUNT = 2),
  (exports.applySlippageToAmount = Q),
  (exports.calculateAccountMinimumRequiredBalance = wt),
  (exports.combineAndRegroupSignerTxns = function () {
    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
      n[r] = arguments[r];
    var s = n.flat(),
      a = s.map(function (e) {
        var n = e.txn;
        return (
          (n.group = void 0), t.decodeUnsignedTransaction(t.encodeUnsignedTransaction(n))
        );
      }),
      i = t.assignGroupID(a);
    return s.map(function (t, e) {
      return o(o({}, t), {}, {txn: i[e]});
    });
  }),
  (exports.convertFromBaseUnits = q),
  (exports.convertToBaseUnits = G),
  (exports.generateOptIntoAssetTxns = function (t) {
    return rt.apply(this, arguments);
  }),
  (exports.generateOptIntoValidatorTxns = function (t) {
    return mt.apply(this, arguments);
  }),
  (exports.generateOptOutOfValidatorTxns = function (t) {
    return gt.apply(this, arguments);
  }),
  (exports.generateRedeemTxns = function (t) {
    return Yn.apply(this, arguments);
  }),
  (exports.getAccountExcess = function (t) {
    return Ot.apply(this, arguments);
  }),
  (exports.getAccountExcessWithinPool = St),
  (exports.getAccountInformation = vt),
  (exports.getAddLiquidityTotalFee = function (e) {
    switch (e.version) {
      case ut.V1_1:
        return we;
      case ut.V2:
        return (n = e.type), (Ee[n] + Se[n]) * t.ALGORAND_MIN_TX_FEE;
      default:
        throw new Error("Provided contract version was not valid.");
    }
    var n;
  }),
  (exports.getMinRequiredBalanceToOptIn = function (t) {
    var e,
      n = t.currentMinumumBalanceForAccount,
      r = t.suggestedTransactionFee;
    if ("app-opt-in" === t.type) {
      var s = yt(t.contractVersion);
      e = 1e5 + 5e4 * s.schema.numLocalByteSlices + 28500 * s.schema.numLocalInts;
    } else e = 1e5;
    return e + (n || 0) + (r || 0);
  }),
  (exports.getStakingAppID = function (t) {
    return "testnet" === t ? 51948952 : 649588853;
  }),
  (exports.getSwapTotalFee = function (e) {
    switch (e.version) {
      case ut.V1_1:
        return Un;
      case ut.V2:
        return (n = e.type), (ln[n] + 2) * t.ALGORAND_MIN_TX_FEE;
      default:
        throw new Error("Provided contract version was not valid.");
    }
    var n;
  }),
  (exports.getTxnGroupID = Z),
  (exports.getValidatorAppID = ft),
  (exports.hasSufficientMinimumBalance = function (t) {
    return t.amount >= t.minimum_required_balance;
  }),
  (exports.isAccountOptedIntoApp = function (t) {
    var e = t.appID;
    return t.accountAppsLocalState.some(function (t) {
      return t.id === e;
    });
  }),
  (exports.poolUtils = Jt),
  (exports.prepareCommitTransactions = function (t) {
    return Hn.apply(this, arguments);
  }),
  (exports.redeemAllExcessAsset = function (t) {
    return Jn.apply(this, arguments);
  }),
  (exports.redeemExcessAsset = function (t) {
    return Gn.apply(this, arguments);
  }),
  (exports.sendAndWaitRawTransaction = Y),
  (exports.sumUpTxnFees = H),
  (exports.tinymanContract_v1_1 = It),
  (exports.tinymanContract_v2 = ht),
  (exports.tinymanJSSDKConfig = lt);
