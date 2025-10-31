"use strict";
var e;
(function () {
  var e = window.Document.prototype.createElement,
    t = window.Document.prototype.createElementNS,
    a = window.Document.prototype.importNode,
    o = window.Document.prototype.prepend,
    r = window.Document.prototype.append,
    n = window.DocumentFragment.prototype.prepend,
    i = window.DocumentFragment.prototype.append,
    d = window.Node.prototype.cloneNode,
    l = window.Node.prototype.appendChild,
    s = window.Node.prototype.insertBefore,
    c = window.Node.prototype.removeChild,
    u = window.Node.prototype.replaceChild,
    h = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
    p = window.Element.prototype.attachShadow,
    y = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
    g = window.Element.prototype.getAttribute,
    f = window.Element.prototype.setAttribute,
    m = window.Element.prototype.removeAttribute,
    v = window.Element.prototype.toggleAttribute,
    b = window.Element.prototype.getAttributeNS,
    k = window.Element.prototype.setAttributeNS,
    C = window.Element.prototype.removeAttributeNS,
    w = window.Element.prototype.insertAdjacentElement,
    $ = window.Element.prototype.insertAdjacentHTML,
    S = window.Element.prototype.prepend,
    D = window.Element.prototype.append,
    x = window.Element.prototype.before,
    _ = window.Element.prototype.after,
    E = window.Element.prototype.replaceWith,
    T = window.Element.prototype.remove,
    A = window.HTMLElement,
    N = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      "innerHTML",
    ),
    H = window.HTMLElement.prototype.insertAdjacentElement,
    z = window.HTMLElement.prototype.insertAdjacentHTML,
    I = new Set();
  function j(e) {
    var t = I.has(e);
    return ((e = /^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(e)), !t && e);
  }
  "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph"
    .split(" ")
    .forEach(function (e) {
      return I.add(e);
    });
  var M = document.contains
    ? document.contains.bind(document)
    : document.documentElement.contains.bind(document.documentElement);
  function B(e) {
    var t = e.isConnected;
    if (void 0 !== t) return t;
    if (M(e)) return !0;
    for (; e && !(e.__CE_isImportDocument || e instanceof Document); )
      e =
        e.parentNode ||
        (window.ShadowRoot && e instanceof ShadowRoot ? e.host : void 0);
    return !(!e || !(e.__CE_isImportDocument || e instanceof Document));
  }
  function P(e) {
    var t = e.children;
    if (t) return Array.prototype.slice.call(t);
    for (t = [], e = e.firstChild; e; e = e.nextSibling)
      e.nodeType === Node.ELEMENT_NODE && t.push(e);
    return t;
  }
  function L(e, t) {
    for (; t && t !== e && !t.nextSibling; ) t = t.parentNode;
    return t && t !== e ? t.nextSibling : null;
  }
  function F(e, t, a) {
    for (var o = e; o; ) {
      if (o.nodeType === Node.ELEMENT_NODE) {
        var r = o;
        t(r);
        var n = r.localName;
        if ("link" === n && "import" === r.getAttribute("rel")) {
          if (
            ((o = r.import),
            void 0 === a && (a = new Set()),
            o instanceof Node && !a.has(o))
          )
            for (a.add(o), o = o.firstChild; o; o = o.nextSibling) F(o, t, a);
          o = L(e, r);
          continue;
        }
        if ("template" === n) {
          o = L(e, r);
          continue;
        }
        if ((r = r.__CE_shadowRoot))
          for (r = r.firstChild; r; r = r.nextSibling) F(r, t, a);
      }
      o = o.firstChild ? o.firstChild : L(e, o);
    }
  }
  function R() {
    var e = !(null == le || !le.noDocumentConstructionObserver),
      t = !(null == le || !le.shadyDomFastWalk);
    ((this.m = []),
      (this.g = []),
      (this.j = !1),
      (this.shadyDomFastWalk = t),
      (this.I = !e));
  }
  function O(e, t, a, o) {
    var r = window.ShadyDOM;
    if (e.shadyDomFastWalk && r && r.inUse) {
      if ((t.nodeType === Node.ELEMENT_NODE && a(t), t.querySelectorAll))
        for (
          e = r.nativeMethods.querySelectorAll.call(t, "*"), t = 0;
          t < e.length;
          t++
        )
          a(e[t]);
    } else F(t, a, o);
  }
  function W(e, t) {
    e.j &&
      O(e, t, function (t) {
        return G(e, t);
      });
  }
  function G(e, t) {
    if (e.j && !t.__CE_patched) {
      t.__CE_patched = !0;
      for (var a = 0; a < e.m.length; a++) e.m[a](t);
      for (a = 0; a < e.g.length; a++) e.g[a](t);
    }
  }
  function U(e, t) {
    var a = [];
    for (
      O(e, t, function (e) {
        return a.push(e);
      }),
        t = 0;
      t < a.length;
      t++
    ) {
      var o = a[t];
      1 === o.__CE_state ? e.connectedCallback(o) : K(e, o);
    }
  }
  function V(e, t) {
    var a = [];
    for (
      O(e, t, function (e) {
        return a.push(e);
      }),
        t = 0;
      t < a.length;
      t++
    ) {
      var o = a[t];
      1 === o.__CE_state && e.disconnectedCallback(o);
    }
  }
  function Y(e, t, a) {
    var o = (a = void 0 === a ? {} : a).J,
      r =
        a.upgrade ||
        function (t) {
          return K(e, t);
        },
      n = [];
    for (
      O(
        e,
        t,
        function (t) {
          if (
            (e.j && G(e, t),
            "link" === t.localName && "import" === t.getAttribute("rel"))
          ) {
            var a = t.import;
            (a instanceof Node &&
              ((a.__CE_isImportDocument = !0),
              (a.__CE_registry = document.__CE_registry)),
              a && "complete" === a.readyState
                ? (a.__CE_documentLoadHandled = !0)
                : t.addEventListener("load", function () {
                    var a = t.import;
                    if (!a.__CE_documentLoadHandled) {
                      a.__CE_documentLoadHandled = !0;
                      var n = new Set();
                      (o &&
                        (o.forEach(function (e) {
                          return n.add(e);
                        }),
                        n.delete(a)),
                        Y(e, a, { J: n, upgrade: r }));
                    }
                  }));
          } else n.push(t);
        },
        o,
      ),
        t = 0;
      t < n.length;
      t++
    )
      r(n[t]);
  }
  function K(e, t) {
    try {
      var a = t.ownerDocument,
        o = a.__CE_registry,
        r =
          o && (a.defaultView || a.__CE_isImportDocument)
            ? re(o, t.localName)
            : void 0;
      if (r && void 0 === t.__CE_state) {
        r.constructionStack.push(t);
        try {
          try {
            if (new r.constructorFunction() !== t)
              throw Error(
                "The custom element constructor did not produce the element being upgraded.",
              );
          } finally {
            r.constructionStack.pop();
          }
        } catch (l) {
          throw ((t.__CE_state = 2), l);
        }
        if (
          ((t.__CE_state = 1),
          (t.__CE_definition = r),
          r.attributeChangedCallback && t.hasAttributes())
        ) {
          var n = r.observedAttributes;
          for (r = 0; r < n.length; r++) {
            var i = n[r],
              d = t.getAttribute(i);
            null !== d && e.attributeChangedCallback(t, i, null, d, null);
          }
        }
        B(t) && e.connectedCallback(t);
      }
    } catch (l) {
      q(l);
    }
  }
  function Z(a, o, r, n) {
    var i = o.__CE_registry;
    if (
      i &&
      (null === n || "http://www.w3.org/1999/xhtml" === n) &&
      (i = re(i, r))
    )
      try {
        var d = new i.constructorFunction();
        if (void 0 === d.__CE_state || void 0 === d.__CE_definition)
          throw Error(
            "Failed to construct '" +
              r +
              "': The returned value was not constructed with the HTMLElement constructor.",
          );
        if ("http://www.w3.org/1999/xhtml" !== d.namespaceURI)
          throw Error(
            "Failed to construct '" +
              r +
              "': The constructed element's namespace must be the HTML namespace.",
          );
        if (d.hasAttributes())
          throw Error(
            "Failed to construct '" +
              r +
              "': The constructed element must not have any attributes.",
          );
        if (null !== d.firstChild)
          throw Error(
            "Failed to construct '" +
              r +
              "': The constructed element must not have any children.",
          );
        if (null !== d.parentNode)
          throw Error(
            "Failed to construct '" +
              r +
              "': The constructed element must not have a parent node.",
          );
        if (d.ownerDocument !== o)
          throw Error(
            "Failed to construct '" +
              r +
              "': The constructed element's owner document is incorrect.",
          );
        if (d.localName !== r)
          throw Error(
            "Failed to construct '" +
              r +
              "': The constructed element's local name is incorrect.",
          );
        return d;
      } catch (l) {
        return (
          q(l),
          (o = null === n ? e.call(o, r) : t.call(o, n, r)),
          Object.setPrototypeOf(o, HTMLUnknownElement.prototype),
          (o.__CE_state = 2),
          (o.__CE_definition = void 0),
          G(a, o),
          o
        );
      }
    return (G(a, (o = null === n ? e.call(o, r) : t.call(o, n, r))), o);
  }
  function q(e) {
    var t = "",
      a = "",
      o = 0,
      r = 0;
    e instanceof Error
      ? ((t = e.message),
        (a = e.sourceURL || e.fileName || ""),
        (o = e.line || e.lineNumber || 0),
        (r = e.column || e.columnNumber || 0))
      : (t = "Uncaught " + String(e));
    var n = void 0;
    (void 0 === ErrorEvent.prototype.initErrorEvent
      ? (n = new ErrorEvent("error", {
          cancelable: !0,
          message: t,
          filename: a,
          lineno: o,
          colno: r,
          error: e,
        }))
      : ((n = document.createEvent("ErrorEvent")).initErrorEvent(
          "error",
          !1,
          !0,
          t,
          a,
          o,
        ),
        (n.preventDefault = function () {
          Object.defineProperty(this, "defaultPrevented", {
            configurable: !0,
            get: function () {
              return !0;
            },
          });
        })),
      void 0 === n.error &&
        Object.defineProperty(n, "error", {
          configurable: !0,
          enumerable: !0,
          get: function () {
            return e;
          },
        }),
      window.dispatchEvent(n),
      n.defaultPrevented);
  }
  function J() {
    var e = this;
    ((this.g = void 0),
      (this.F = new Promise(function (t) {
        e.l = t;
      })));
  }
  function X(e) {
    var t = document;
    ((this.l = void 0),
      (this.h = e),
      (this.g = t),
      Y(this.h, this.g),
      "loading" === this.g.readyState &&
        ((this.l = new MutationObserver(this.G.bind(this))),
        this.l.observe(this.g, { childList: !0, subtree: !0 })));
  }
  function Q(e) {
    e.l && e.l.disconnect();
  }
  function ee(e) {
    ((this.s = new Map()),
      (this.u = new Map()),
      (this.C = new Map()),
      (this.A = !1),
      (this.B = new Map()),
      (this.o = function (e) {
        return e();
      }),
      (this.i = !1),
      (this.v = []),
      (this.h = e),
      (this.D = e.I ? new X(e) : void 0));
  }
  function te(e, t) {
    if (!j(t))
      throw new SyntaxError("The element name '" + t + "' is not valid.");
    if (re(e, t))
      throw Error(
        "A custom element with name '" + t + "' has already been defined.",
      );
    if (e.A) throw Error("A custom element is already being defined.");
  }
  function ae(e, t, a) {
    var o;
    e.A = !0;
    try {
      var r = a.prototype;
      if (!(r instanceof Object))
        throw new TypeError(
          "The custom element constructor's prototype is not an object.",
        );
      var n = function (e) {
          var t = r[e];
          if (void 0 !== t && !(t instanceof Function))
            throw Error("The '" + e + "' callback must be a function.");
          return t;
        },
        i = n("connectedCallback"),
        d = n("disconnectedCallback"),
        l = n("adoptedCallback"),
        s = ((o = n("attributeChangedCallback")) && a.observedAttributes) || [];
    } catch (c) {
      throw c;
    } finally {
      e.A = !1;
    }
    return (
      (a = {
        localName: t,
        constructorFunction: a,
        connectedCallback: i,
        disconnectedCallback: d,
        adoptedCallback: l,
        attributeChangedCallback: o,
        observedAttributes: s,
        constructionStack: [],
      }),
      e.u.set(t, a),
      e.C.set(a.constructorFunction, a),
      a
    );
  }
  function oe(e) {
    if (!1 !== e.i) {
      e.i = !1;
      for (var t = [], a = e.v, o = new Map(), r = 0; r < a.length; r++)
        o.set(a[r], []);
      for (
        Y(e.h, document, {
          upgrade: function (a) {
            if (void 0 === a.__CE_state) {
              var r = a.localName,
                n = o.get(r);
              n ? n.push(a) : e.u.has(r) && t.push(a);
            }
          },
        }),
          r = 0;
        r < t.length;
        r++
      )
        K(e.h, t[r]);
      for (r = 0; r < a.length; r++) {
        for (var n = a[r], i = o.get(n), d = 0; d < i.length; d++) K(e.h, i[d]);
        (n = e.B.get(n)) && n.resolve(void 0);
      }
      a.length = 0;
    }
  }
  function re(e, t) {
    var a = e.u.get(t);
    if (a) return a;
    if ((a = e.s.get(t))) {
      e.s.delete(t);
      try {
        return ae(e, t, a());
      } catch (o) {
        q(o);
      }
    }
  }
  function ne(e, t, a) {
    function o(t) {
      return function (a) {
        for (var o = [], r = 0; r < arguments.length; ++r) o[r] = arguments[r];
        r = [];
        for (var n = [], i = 0; i < o.length; i++) {
          var d = o[i];
          if (
            (d instanceof Element && B(d) && n.push(d),
            d instanceof DocumentFragment)
          )
            for (d = d.firstChild; d; d = d.nextSibling) r.push(d);
          else r.push(d);
        }
        for (t.apply(this, o), o = 0; o < n.length; o++) V(e, n[o]);
        if (B(this))
          for (o = 0; o < r.length; o++)
            (n = r[o]) instanceof Element && U(e, n);
      };
    }
    (void 0 !== a.prepend && (t.prepend = o(a.prepend)),
      void 0 !== a.append && (t.append = o(a.append)));
  }
  function ie(e) {
    function a(t, a) {
      Object.defineProperty(t, "innerHTML", {
        enumerable: a.enumerable,
        configurable: !0,
        get: a.get,
        set: function (t) {
          var o = this,
            r = void 0;
          if (
            (B(this) &&
              ((r = []),
              O(e, this, function (e) {
                e !== o && r.push(e);
              })),
            a.set.call(this, t),
            r)
          )
            for (var n = 0; n < r.length; n++) {
              var i = r[n];
              1 === i.__CE_state && e.disconnectedCallback(i);
            }
          return (
            this.ownerDocument.__CE_registry ? Y(e, this) : W(e, this),
            t
          );
        },
      });
    }
    function o(t, a) {
      t.insertAdjacentElement = function (t, o) {
        var r = B(o);
        return ((t = a.call(this, t, o)), r && V(e, o), B(t) && U(e, o), t);
      };
    }
    function r(t, a) {
      function o(t, a) {
        for (var o = []; t !== a; t = t.nextSibling) o.push(t);
        for (a = 0; a < o.length; a++) Y(e, o[a]);
      }
      t.insertAdjacentHTML = function (e, t) {
        if ("beforebegin" === (e = e.toLowerCase())) {
          var r = this.previousSibling;
          (a.call(this, e, t), o(r || this.parentNode.firstChild, this));
        } else if ("afterbegin" === e)
          ((r = this.firstChild), a.call(this, e, t), o(this.firstChild, r));
        else if ("beforeend" === e)
          ((r = this.lastChild),
            a.call(this, e, t),
            o(r || this.firstChild, null));
        else {
          if ("afterend" !== e)
            throw new SyntaxError(
              "The value provided (" +
                String(e) +
                ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.",
            );
          ((r = this.nextSibling), a.call(this, e, t), o(this.nextSibling, r));
        }
      };
    }
    (p &&
      (Element.prototype.attachShadow = function (t) {
        if (((t = p.call(this, t)), e.j && !t.__CE_patched)) {
          t.__CE_patched = !0;
          for (var a = 0; a < e.m.length; a++) e.m[a](t);
        }
        return (this.__CE_shadowRoot = t);
      }),
      y && y.get
        ? a(Element.prototype, y)
        : N && N.get
          ? a(HTMLElement.prototype, N)
          : (function (e, t) {
              ((e.j = !0), e.g.push(t));
            })(e, function (e) {
              a(e, {
                enumerable: !0,
                configurable: !0,
                get: function () {
                  return d.call(this, !0).innerHTML;
                },
                set: function (e) {
                  var a = "template" === this.localName,
                    o = a ? this.content : this,
                    r = t.call(document, this.namespaceURI, this.localName);
                  for (r.innerHTML = e; 0 < o.childNodes.length; )
                    c.call(o, o.childNodes[0]);
                  for (e = a ? r.content : r; 0 < e.childNodes.length; )
                    l.call(o, e.childNodes[0]);
                },
              });
            }),
      (Element.prototype.setAttribute = function (t, a) {
        if (1 !== this.__CE_state) return f.call(this, t, a);
        var o = g.call(this, t);
        (f.call(this, t, a),
          (a = g.call(this, t)),
          e.attributeChangedCallback(this, t, o, a, null));
      }),
      (Element.prototype.setAttributeNS = function (t, a, o) {
        if (1 !== this.__CE_state) return k.call(this, t, a, o);
        var r = b.call(this, t, a);
        (k.call(this, t, a, o),
          (o = b.call(this, t, a)),
          e.attributeChangedCallback(this, a, r, o, t));
      }),
      (Element.prototype.removeAttribute = function (t) {
        if (1 !== this.__CE_state) return m.call(this, t);
        var a = g.call(this, t);
        (m.call(this, t),
          null !== a && e.attributeChangedCallback(this, t, a, null, null));
      }),
      v &&
        (Element.prototype.toggleAttribute = function (t, a) {
          if (1 !== this.__CE_state) return v.call(this, t, a);
          var o = g.call(this, t);
          return (
            (null !== o) !== (a = v.call(this, t, a)) &&
              e.attributeChangedCallback(this, t, o, a ? "" : null, null),
            a
          );
        }),
      (Element.prototype.removeAttributeNS = function (t, a) {
        if (1 !== this.__CE_state) return C.call(this, t, a);
        var o = b.call(this, t, a);
        C.call(this, t, a);
        var r = b.call(this, t, a);
        o !== r && e.attributeChangedCallback(this, a, o, r, t);
      }),
      H ? o(HTMLElement.prototype, H) : w && o(Element.prototype, w),
      z ? r(HTMLElement.prototype, z) : $ && r(Element.prototype, $),
      ne(e, Element.prototype, { prepend: S, append: D }),
      (function (e) {
        function t(t) {
          return function (a) {
            for (var o = [], r = 0; r < arguments.length; ++r)
              o[r] = arguments[r];
            r = [];
            for (var n = [], i = 0; i < o.length; i++) {
              var d = o[i];
              if (
                (d instanceof Element && B(d) && n.push(d),
                d instanceof DocumentFragment)
              )
                for (d = d.firstChild; d; d = d.nextSibling) r.push(d);
              else r.push(d);
            }
            for (t.apply(this, o), o = 0; o < n.length; o++) V(e, n[o]);
            if (B(this))
              for (o = 0; o < r.length; o++)
                (n = r[o]) instanceof Element && U(e, n);
          };
        }
        var a = Element.prototype;
        (void 0 !== x && (a.before = t(x)),
          void 0 !== _ && (a.after = t(_)),
          void 0 !== E &&
            (a.replaceWith = function (t) {
              for (var a = [], o = 0; o < arguments.length; ++o)
                a[o] = arguments[o];
              o = [];
              for (var r = [], n = 0; n < a.length; n++) {
                var i = a[n];
                if (
                  (i instanceof Element && B(i) && r.push(i),
                  i instanceof DocumentFragment)
                )
                  for (i = i.firstChild; i; i = i.nextSibling) o.push(i);
                else o.push(i);
              }
              for (n = B(this), E.apply(this, a), a = 0; a < r.length; a++)
                V(e, r[a]);
              if (n)
                for (V(e, this), a = 0; a < o.length; a++)
                  (r = o[a]) instanceof Element && U(e, r);
            }),
          void 0 !== T &&
            (a.remove = function () {
              var t = B(this);
              (T.call(this), t && V(e, this));
            }));
      })(e));
  }
  ((R.prototype.connectedCallback = function (e) {
    var t = e.__CE_definition;
    if (t.connectedCallback)
      try {
        t.connectedCallback.call(e);
      } catch (a) {
        q(a);
      }
  }),
    (R.prototype.disconnectedCallback = function (e) {
      var t = e.__CE_definition;
      if (t.disconnectedCallback)
        try {
          t.disconnectedCallback.call(e);
        } catch (a) {
          q(a);
        }
    }),
    (R.prototype.attributeChangedCallback = function (e, t, a, o, r) {
      var n = e.__CE_definition;
      if (n.attributeChangedCallback && -1 < n.observedAttributes.indexOf(t))
        try {
          n.attributeChangedCallback.call(e, t, a, o, r);
        } catch (i) {
          q(i);
        }
    }),
    (J.prototype.resolve = function (e) {
      if (this.g) throw Error("Already resolved.");
      ((this.g = e), this.l(e));
    }),
    (X.prototype.G = function (e) {
      var t = this.g.readyState;
      for (
        ("interactive" !== t && "complete" !== t) || Q(this), t = 0;
        t < e.length;
        t++
      )
        for (var a = e[t].addedNodes, o = 0; o < a.length; o++) Y(this.h, a[o]);
    }),
    (ee.prototype.H = function (e, t) {
      var a = this;
      if (!(t instanceof Function))
        throw new TypeError(
          "Custom element constructor getters must be functions.",
        );
      (te(this, e),
        this.s.set(e, t),
        this.v.push(e),
        this.i ||
          ((this.i = !0),
          this.o(function () {
            return oe(a);
          })));
    }),
    (ee.prototype.define = function (e, t) {
      var a = this;
      if (!(t instanceof Function))
        throw new TypeError("Custom element constructors must be functions.");
      (te(this, e),
        ae(this, e, t),
        this.v.push(e),
        this.i ||
          ((this.i = !0),
          this.o(function () {
            return oe(a);
          })));
    }),
    (ee.prototype.upgrade = function (e) {
      Y(this.h, e);
    }),
    (ee.prototype.get = function (e) {
      if ((e = re(this, e))) return e.constructorFunction;
    }),
    (ee.prototype.whenDefined = function (e) {
      if (!j(e))
        return Promise.reject(
          new SyntaxError("'" + e + "' is not a valid custom element name."),
        );
      var t = this.B.get(e);
      if (t) return t.F;
      ((t = new J()), this.B.set(e, t));
      var a = this.u.has(e) || this.s.has(e);
      return ((e = -1 === this.v.indexOf(e)), a && e && t.resolve(void 0), t.F);
    }),
    (ee.prototype.polyfillWrapFlushCallback = function (e) {
      this.D && Q(this.D);
      var t = this.o;
      this.o = function (a) {
        return e(function () {
          return t(a);
        });
      };
    }),
    (ee.prototype.define = ee.prototype.define),
    (ee.prototype.upgrade = ee.prototype.upgrade),
    (ee.prototype.get = ee.prototype.get),
    (ee.prototype.whenDefined = ee.prototype.whenDefined),
    (ee.prototype.polyfillDefineLazy = ee.prototype.H),
    (ee.prototype.polyfillWrapFlushCallback =
      ee.prototype.polyfillWrapFlushCallback));
  var de = {};
  var le = window.customElements;
  function se() {
    var t = new R();
    (!(function (t) {
      function a() {
        var a = this.constructor,
          o = document.__CE_registry.C.get(a);
        if (!o)
          throw Error(
            "Failed to construct a custom element: The constructor was not registered with `customElements`.",
          );
        var r = o.constructionStack;
        if (0 === r.length)
          return (
            (r = e.call(document, o.localName)),
            Object.setPrototypeOf(r, a.prototype),
            (r.__CE_state = 1),
            (r.__CE_definition = o),
            G(t, r),
            r
          );
        var n = r.length - 1,
          i = r[n];
        if (i === de)
          throw Error(
            "Failed to construct '" +
              o.localName +
              "': This element was already constructed.",
          );
        return ((r[n] = de), Object.setPrototypeOf(i, a.prototype), G(t, i), i);
      }
      ((a.prototype = A.prototype),
        Object.defineProperty(HTMLElement.prototype, "constructor", {
          writable: !0,
          configurable: !0,
          enumerable: !1,
          value: a,
        }),
        (window.HTMLElement = a));
    })(t),
      (function (e) {
        ((Document.prototype.createElement = function (t) {
          return Z(e, this, t, null);
        }),
          (Document.prototype.importNode = function (t, o) {
            return (
              (t = a.call(this, t, !!o)),
              this.__CE_registry ? Y(e, t) : W(e, t),
              t
            );
          }),
          (Document.prototype.createElementNS = function (t, a) {
            return Z(e, this, a, t);
          }),
          ne(e, Document.prototype, { prepend: o, append: r }));
      })(t),
      ne(t, DocumentFragment.prototype, { prepend: n, append: i }),
      (function (e) {
        function t(t, a) {
          Object.defineProperty(t, "textContent", {
            enumerable: a.enumerable,
            configurable: !0,
            get: a.get,
            set: function (t) {
              if (this.nodeType === Node.TEXT_NODE) a.set.call(this, t);
              else {
                var o = void 0;
                if (this.firstChild) {
                  var r = this.childNodes,
                    n = r.length;
                  if (0 < n && B(this)) {
                    o = Array(n);
                    for (var i = 0; i < n; i++) o[i] = r[i];
                  }
                }
                if ((a.set.call(this, t), o))
                  for (t = 0; t < o.length; t++) V(e, o[t]);
              }
            },
          });
        }
        ((Node.prototype.insertBefore = function (t, a) {
          if (t instanceof DocumentFragment) {
            var o = P(t);
            if (((t = s.call(this, t, a)), B(this)))
              for (a = 0; a < o.length; a++) U(e, o[a]);
            return t;
          }
          return (
            (o = t instanceof Element && B(t)),
            (a = s.call(this, t, a)),
            o && V(e, t),
            B(this) && U(e, t),
            a
          );
        }),
          (Node.prototype.appendChild = function (t) {
            if (t instanceof DocumentFragment) {
              var a = P(t);
              if (((t = l.call(this, t)), B(this)))
                for (var o = 0; o < a.length; o++) U(e, a[o]);
              return t;
            }
            return (
              (a = t instanceof Element && B(t)),
              (o = l.call(this, t)),
              a && V(e, t),
              B(this) && U(e, t),
              o
            );
          }),
          (Node.prototype.cloneNode = function (t) {
            return (
              (t = d.call(this, !!t)),
              this.ownerDocument.__CE_registry ? Y(e, t) : W(e, t),
              t
            );
          }),
          (Node.prototype.removeChild = function (t) {
            var a = t instanceof Element && B(t),
              o = c.call(this, t);
            return (a && V(e, t), o);
          }),
          (Node.prototype.replaceChild = function (t, a) {
            if (t instanceof DocumentFragment) {
              var o = P(t);
              if (((t = u.call(this, t, a)), B(this)))
                for (V(e, a), a = 0; a < o.length; a++) U(e, o[a]);
              return t;
            }
            o = t instanceof Element && B(t);
            var r = u.call(this, t, a),
              n = B(this);
            return (n && V(e, a), o && V(e, t), n && U(e, t), r);
          }),
          h && h.get
            ? t(Node.prototype, h)
            : (function (e, t) {
                ((e.j = !0), e.m.push(t));
              })(e, function (e) {
                t(e, {
                  enumerable: !0,
                  configurable: !0,
                  get: function () {
                    for (var e = [], t = this.firstChild; t; t = t.nextSibling)
                      t.nodeType !== Node.COMMENT_NODE && e.push(t.textContent);
                    return e.join("");
                  },
                  set: function (e) {
                    for (; this.firstChild; ) c.call(this, this.firstChild);
                    null != e &&
                      "" !== e &&
                      l.call(this, document.createTextNode(e));
                  },
                });
              }));
      })(t),
      ie(t),
      (window.CustomElementRegistry = ee),
      (t = new ee(t)),
      (document.__CE_registry = t),
      Object.defineProperty(window, "customElements", {
        configurable: !0,
        enumerable: !0,
        value: t,
      }));
  }
  ((le &&
    !le.forcePolyfill &&
    "function" == typeof le.define &&
    "function" == typeof le.get) ||
    se(),
    (window.__CE_installPolyfill = se));
}).call(self);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis,
  a =
    t.ShadowRoot &&
    (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  o = Symbol(),
  r = new WeakMap();
let n = class {
  constructor(e, t, a) {
    if (((this._$cssResult$ = !0), a !== o))
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead.",
      );
    ((this.cssText = e), (this.t = t));
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (a && void 0 === e) {
      const a = void 0 !== t && 1 === t.length;
      (a && (e = r.get(t)),
        void 0 === e &&
          ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText),
          a && r.set(t, e)));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const i = a
    ? (e) => e
    : (e) =>
        e instanceof CSSStyleSheet
          ? ((e) => {
              let t = "";
              for (const a of e.cssRules) t += a.cssText;
              return ((e) =>
                new n("string" == typeof e ? e : e + "", void 0, o))(t);
            })(e)
          : e,
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ {
    is: d,
    defineProperty: l,
    getOwnPropertyDescriptor: s,
    getOwnPropertyNames: c,
    getOwnPropertySymbols: u,
    getPrototypeOf: h,
  } = Object,
  p = globalThis,
  y = p.trustedTypes,
  g = y ? y.emptyScript : "",
  f = p.reactiveElementPolyfillSupport,
  m = (e, t) => e,
  v = {
    toAttribute(e, t) {
      switch (t) {
        case Boolean:
          e = e ? g : null;
          break;
        case Object:
        case Array:
          e = null == e ? e : JSON.stringify(e);
      }
      return e;
    },
    fromAttribute(e, t) {
      let a = e;
      switch (t) {
        case Boolean:
          a = null !== e;
          break;
        case Number:
          a = null === e ? null : Number(e);
          break;
        case Object:
        case Array:
          try {
            a = JSON.parse(e);
          } catch (o) {
            a = null;
          }
      }
      return a;
    },
  },
  b = (e, t) => !d(e, t),
  k = { attribute: !0, type: String, converter: v, reflect: !1, hasChanged: b };
(Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")),
  p.litPropertyMetadata ?? (p.litPropertyMetadata = new WeakMap()));
class C extends HTMLElement {
  static addInitializer(e) {
    (this._$Ei(), (this.l ?? (this.l = [])).push(e));
  }
  static get observedAttributes() {
    return (this.finalize(), this._$Eh && [...this._$Eh.keys()]);
  }
  static createProperty(e, t = k) {
    if (
      (t.state && (t.attribute = !1),
      this._$Ei(),
      this.elementProperties.set(e, t),
      !t.noAccessor)
    ) {
      const a = Symbol(),
        o = this.getPropertyDescriptor(e, a, t);
      void 0 !== o && l(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, a) {
    const { get: o, set: r } = s(this.prototype, e) ?? {
      get() {
        return this[t];
      },
      set(e) {
        this[t] = e;
      },
    };
    return {
      get() {
        return null == o ? void 0 : o.call(this);
      },
      set(t) {
        const n = null == o ? void 0 : o.call(this);
        (r.call(this, t), this.requestUpdate(e, n, a));
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? k;
  }
  static _$Ei() {
    if (this.hasOwnProperty(m("elementProperties"))) return;
    const e = h(this);
    (e.finalize(),
      void 0 !== e.l && (this.l = [...e.l]),
      (this.elementProperties = new Map(e.elementProperties)));
  }
  static finalize() {
    if (this.hasOwnProperty(m("finalized"))) return;
    if (
      ((this.finalized = !0), this._$Ei(), this.hasOwnProperty(m("properties")))
    ) {
      const e = this.properties,
        t = [...c(e), ...u(e)];
      for (const a of t) this.createProperty(a, e[a]);
    }
    const e = this[Symbol.metadata];
    if (null !== e) {
      const t = litPropertyMetadata.get(e);
      if (void 0 !== t)
        for (const [e, a] of t) this.elementProperties.set(e, a);
    }
    this._$Eh = new Map();
    for (const [t, a] of this.elementProperties) {
      const e = this._$Eu(t, a);
      void 0 !== e && this._$Eh.set(e, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const a = new Set(e.flat(1 / 0).reverse());
      for (const e of a) t.unshift(i(e));
    } else void 0 !== e && t.push(i(e));
    return t;
  }
  static _$Eu(e, t) {
    const a = t.attribute;
    return !1 === a
      ? void 0
      : "string" == typeof a
        ? a
        : "string" == typeof e
          ? e.toLowerCase()
          : void 0;
  }
  constructor() {
    (super(),
      (this._$Ep = void 0),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Em = null),
      this._$Ev());
  }
  _$Ev() {
    var e;
    ((this._$ES = new Promise((e) => (this.enableUpdating = e))),
      (this._$AL = new Map()),
      this._$E_(),
      this.requestUpdate(),
      null == (e = this.constructor.l) || e.forEach((e) => e(this)));
  }
  addController(e) {
    var t;
    ((this._$EO ?? (this._$EO = new Set())).add(e),
      void 0 !== this.renderRoot &&
        this.isConnected &&
        (null == (t = e.hostConnected) || t.call(e)));
  }
  removeController(e) {
    var t;
    null == (t = this._$EO) || t.delete(e);
  }
  _$E_() {
    const e = new Map(),
      t = this.constructor.elementProperties;
    for (const a of t.keys())
      this.hasOwnProperty(a) && (e.set(a, this[a]), delete this[a]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e =
      this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return (
      ((e, o) => {
        if (a)
          e.adoptedStyleSheets = o.map((e) =>
            e instanceof CSSStyleSheet ? e : e.styleSheet,
          );
        else
          for (const a of o) {
            const o = document.createElement("style"),
              r = t.litNonce;
            (void 0 !== r && o.setAttribute("nonce", r),
              (o.textContent = a.cssText),
              e.appendChild(o));
          }
      })(e, this.constructor.elementStyles),
      e
    );
  }
  connectedCallback() {
    var e;
    (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null == (e = this._$EO) ||
        e.forEach((e) => {
          var t;
          return null == (t = e.hostConnected) ? void 0 : t.call(e);
        }));
  }
  enableUpdating(e) {}
  disconnectedCallback() {
    var e;
    null == (e = this._$EO) ||
      e.forEach((e) => {
        var t;
        return null == (t = e.hostDisconnected) ? void 0 : t.call(e);
      });
  }
  attributeChangedCallback(e, t, a) {
    this._$AK(e, a);
  }
  _$EC(e, t) {
    var a;
    const o = this.constructor.elementProperties.get(e),
      r = this.constructor._$Eu(e, o);
    if (void 0 !== r && !0 === o.reflect) {
      const n = (
        void 0 !== (null == (a = o.converter) ? void 0 : a.toAttribute)
          ? o.converter
          : v
      ).toAttribute(t, o.type);
      ((this._$Em = e),
        null == n ? this.removeAttribute(r) : this.setAttribute(r, n),
        (this._$Em = null));
    }
  }
  _$AK(e, t) {
    var a;
    const o = this.constructor,
      r = o._$Eh.get(e);
    if (void 0 !== r && this._$Em !== r) {
      const e = o.getPropertyOptions(r),
        n =
          "function" == typeof e.converter
            ? { fromAttribute: e.converter }
            : void 0 !== (null == (a = e.converter) ? void 0 : a.fromAttribute)
              ? e.converter
              : v;
      ((this._$Em = r),
        (this[r] = n.fromAttribute(t, e.type)),
        (this._$Em = null));
    }
  }
  requestUpdate(e, t, a) {
    if (void 0 !== e) {
      if (
        (a ?? (a = this.constructor.getPropertyOptions(e)),
        !(a.hasChanged ?? b)(this[e], t))
      )
        return;
      this.P(e, t, a);
    }
    !1 === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(e, t, a) {
    (this._$AL.has(e) || this._$AL.set(e, t),
      !0 === a.reflect &&
        this._$Em !== e &&
        (this._$Ej ?? (this._$Ej = new Set())).add(e));
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return (null != e && (await e), !this.isUpdatePending);
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (
        (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()),
        this._$Ep)
      ) {
        for (const [e, t] of this._$Ep) this[e] = t;
        this._$Ep = void 0;
      }
      const e = this.constructor.elementProperties;
      if (e.size > 0)
        for (const [t, a] of e)
          !0 !== a.wrapped ||
            this._$AL.has(t) ||
            void 0 === this[t] ||
            this.P(t, this[t], a);
    }
    let t = !1;
    const a = this._$AL;
    try {
      ((t = this.shouldUpdate(a)),
        t
          ? (this.willUpdate(a),
            null == (e = this._$EO) ||
              e.forEach((e) => {
                var t;
                return null == (t = e.hostUpdate) ? void 0 : t.call(e);
              }),
            this.update(a))
          : this._$EU());
    } catch (o) {
      throw ((t = !1), this._$EU(), o);
    }
    t && this._$AE(a);
  }
  willUpdate(e) {}
  _$AE(e) {
    var t;
    (null == (t = this._$EO) ||
      t.forEach((e) => {
        var t;
        return null == (t = e.hostUpdated) ? void 0 : t.call(e);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(e)),
      this.updated(e));
  }
  _$EU() {
    ((this._$AL = new Map()), (this.isUpdatePending = !1));
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    (this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EC(e, this[e]))),
      this._$EU());
  }
  updated(e) {}
  firstUpdated(e) {}
}
((C.elementStyles = []),
  (C.shadowRootOptions = { mode: "open" }),
  (C[m("elementProperties")] = new Map()),
  (C[m("finalized")] = new Map()),
  null == f || f({ ReactiveElement: C }),
  (p.reactiveElementVersions ?? (p.reactiveElementVersions = [])).push(
    "2.0.4",
  ));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis,
  $ = w.trustedTypes,
  S = $ ? $.createPolicy("lit-html", { createHTML: (e) => e }) : void 0,
  D = "$lit$",
  x = `lit$${Math.random().toFixed(9).slice(2)}$`,
  _ = "?" + x,
  E = `<${_}>`,
  T = document,
  A = () => T.createComment(""),
  N = (e) => null === e || ("object" != typeof e && "function" != typeof e),
  H = Array.isArray,
  z = "[ \t\n\f\r]",
  I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  j = /-->/g,
  M = />/g,
  B = RegExp(
    `>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
    "g",
  ),
  P = /'/g,
  L = /"/g,
  F = /^(?:script|style|textarea|title)$/i,
  R = ((V = 1), (e, ...t) => ({ _$litType$: V, strings: e, values: t })),
  O = Symbol.for("lit-noChange"),
  W = Symbol.for("lit-nothing"),
  G = new WeakMap(),
  U = T.createTreeWalker(T, 129);
var V;
function Y(e, t) {
  if (!H(e) || !e.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== S ? S.createHTML(t) : t;
}
class K {
  constructor({ strings: e, _$litType$: t }, a) {
    let o;
    this.parts = [];
    let r = 0,
      n = 0;
    const i = e.length - 1,
      d = this.parts,
      [l, s] = ((e, t) => {
        const a = e.length - 1,
          o = [];
        let r,
          n = 2 === t ? "<svg>" : 3 === t ? "<math>" : "",
          i = I;
        for (let d = 0; d < a; d++) {
          const t = e[d];
          let a,
            l,
            s = -1,
            c = 0;
          for (
            ;
            c < t.length && ((i.lastIndex = c), (l = i.exec(t)), null !== l);

          )
            ((c = i.lastIndex),
              i === I
                ? "!--" === l[1]
                  ? (i = j)
                  : void 0 !== l[1]
                    ? (i = M)
                    : void 0 !== l[2]
                      ? (F.test(l[2]) && (r = RegExp("</" + l[2], "g")),
                        (i = B))
                      : void 0 !== l[3] && (i = B)
                : i === B
                  ? ">" === l[0]
                    ? ((i = r ?? I), (s = -1))
                    : void 0 === l[1]
                      ? (s = -2)
                      : ((s = i.lastIndex - l[2].length),
                        (a = l[1]),
                        (i = void 0 === l[3] ? B : '"' === l[3] ? L : P))
                  : i === L || i === P
                    ? (i = B)
                    : i === j || i === M
                      ? (i = I)
                      : ((i = B), (r = void 0)));
          const u = i === B && e[d + 1].startsWith("/>") ? " " : "";
          n +=
            i === I
              ? t + E
              : s >= 0
                ? (o.push(a), t.slice(0, s) + D + t.slice(s) + x + u)
                : t + x + (-2 === s ? d : u);
        }
        return [
          Y(
            e,
            n +
              (e[a] || "<?>") +
              (2 === t ? "</svg>" : 3 === t ? "</math>" : ""),
          ),
          o,
        ];
      })(e, t);
    if (
      ((this.el = K.createElement(l, a)),
      (U.currentNode = this.el.content),
      2 === t || 3 === t)
    ) {
      const e = this.el.content.firstChild;
      e.replaceWith(...e.childNodes);
    }
    for (; null !== (o = U.nextNode()) && d.length < i; ) {
      if (1 === o.nodeType) {
        if (o.hasAttributes())
          for (const e of o.getAttributeNames())
            if (e.endsWith(D)) {
              const t = s[n++],
                a = o.getAttribute(e).split(x),
                i = /([.?@])?(.*)/.exec(t);
              (d.push({
                type: 1,
                index: r,
                name: i[2],
                strings: a,
                ctor:
                  "." === i[1] ? Q : "?" === i[1] ? ee : "@" === i[1] ? te : X,
              }),
                o.removeAttribute(e));
            } else
              e.startsWith(x) &&
                (d.push({ type: 6, index: r }), o.removeAttribute(e));
        if (F.test(o.tagName)) {
          const e = o.textContent.split(x),
            t = e.length - 1;
          if (t > 0) {
            o.textContent = $ ? $.emptyScript : "";
            for (let a = 0; a < t; a++)
              (o.append(e[a], A()),
                U.nextNode(),
                d.push({ type: 2, index: ++r }));
            o.append(e[t], A());
          }
        }
      } else if (8 === o.nodeType)
        if (o.data === _) d.push({ type: 2, index: r });
        else {
          let e = -1;
          for (; -1 !== (e = o.data.indexOf(x, e + 1)); )
            (d.push({ type: 7, index: r }), (e += x.length - 1));
        }
      r++;
    }
  }
  static createElement(e, t) {
    const a = T.createElement("template");
    return ((a.innerHTML = e), a);
  }
}
function Z(e, t, a = e, o) {
  var r, n;
  if (t === O) return t;
  let i = void 0 !== o ? (null == (r = a._$Co) ? void 0 : r[o]) : a._$Cl;
  const d = N(t) ? void 0 : t._$litDirective$;
  return (
    (null == i ? void 0 : i.constructor) !== d &&
      (null == (n = null == i ? void 0 : i._$AO) || n.call(i, !1),
      void 0 === d ? (i = void 0) : ((i = new d(e)), i._$AT(e, a, o)),
      void 0 !== o ? ((a._$Co ?? (a._$Co = []))[o] = i) : (a._$Cl = i)),
    void 0 !== i && (t = Z(e, i._$AS(e, t.values), i, o)),
    t
  );
}
class q {
  constructor(e, t) {
    ((this._$AV = []), (this._$AN = void 0), (this._$AD = e), (this._$AM = t));
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const {
        el: { content: t },
        parts: a,
      } = this._$AD,
      o = ((null == e ? void 0 : e.creationScope) ?? T).importNode(t, !0);
    U.currentNode = o;
    let r = U.nextNode(),
      n = 0,
      i = 0,
      d = a[0];
    for (; void 0 !== d; ) {
      if (n === d.index) {
        let t;
        (2 === d.type
          ? (t = new J(r, r.nextSibling, this, e))
          : 1 === d.type
            ? (t = new d.ctor(r, d.name, d.strings, this, e))
            : 6 === d.type && (t = new ae(r, this, e)),
          this._$AV.push(t),
          (d = a[++i]));
      }
      n !== (null == d ? void 0 : d.index) && ((r = U.nextNode()), n++);
    }
    return ((U.currentNode = T), o);
  }
  p(e) {
    let t = 0;
    for (const a of this._$AV)
      (void 0 !== a &&
        (void 0 !== a.strings
          ? (a._$AI(e, a, t), (t += a.strings.length - 2))
          : a._$AI(e[t])),
        t++);
  }
}
class J {
  get _$AU() {
    var e;
    return (null == (e = this._$AM) ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, a, o) {
    ((this.type = 2),
      (this._$AH = W),
      (this._$AN = void 0),
      (this._$AA = e),
      (this._$AB = t),
      (this._$AM = a),
      (this.options = o),
      (this._$Cv = (null == o ? void 0 : o.isConnected) ?? !0));
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return (
      void 0 !== t &&
        11 === (null == e ? void 0 : e.nodeType) &&
        (e = t.parentNode),
      e
    );
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    ((e = Z(this, e, t)),
      N(e)
        ? e === W || null == e || "" === e
          ? (this._$AH !== W && this._$AR(), (this._$AH = W))
          : e !== this._$AH && e !== O && this._(e)
        : void 0 !== e._$litType$
          ? this.$(e)
          : void 0 !== e.nodeType
            ? this.T(e)
            : ((e) =>
                  H(e) ||
                  "function" ==
                    typeof (null == e ? void 0 : e[Symbol.iterator]))(e)
              ? this.k(e)
              : this._(e));
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), (this._$AH = this.O(e)));
  }
  _(e) {
    (this._$AH !== W && N(this._$AH)
      ? (this._$AA.nextSibling.data = e)
      : this.T(T.createTextNode(e)),
      (this._$AH = e));
  }
  $(e) {
    var t;
    const { values: a, _$litType$: o } = e,
      r =
        "number" == typeof o
          ? this._$AC(e)
          : (void 0 === o.el &&
              (o.el = K.createElement(Y(o.h, o.h[0]), this.options)),
            o);
    if ((null == (t = this._$AH) ? void 0 : t._$AD) === r) this._$AH.p(a);
    else {
      const e = new q(r, this),
        t = e.u(this.options);
      (e.p(a), this.T(t), (this._$AH = e));
    }
  }
  _$AC(e) {
    let t = G.get(e.strings);
    return (void 0 === t && G.set(e.strings, (t = new K(e))), t);
  }
  k(e) {
    H(this._$AH) || ((this._$AH = []), this._$AR());
    const t = this._$AH;
    let a,
      o = 0;
    for (const r of e)
      (o === t.length
        ? t.push((a = new J(this.O(A()), this.O(A()), this, this.options)))
        : (a = t[o]),
        a._$AI(r),
        o++);
    o < t.length && (this._$AR(a && a._$AB.nextSibling, o), (t.length = o));
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var a;
    for (
      null == (a = this._$AP) || a.call(this, !1, !0, t);
      e && e !== this._$AB;

    ) {
      const t = e.nextSibling;
      (e.remove(), (e = t));
    }
  }
  setConnected(e) {
    var t;
    void 0 === this._$AM &&
      ((this._$Cv = e), null == (t = this._$AP) || t.call(this, e));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, a, o, r) {
    ((this.type = 1),
      (this._$AH = W),
      (this._$AN = void 0),
      (this.element = e),
      (this.name = t),
      (this._$AM = o),
      (this.options = r),
      a.length > 2 || "" !== a[0] || "" !== a[1]
        ? ((this._$AH = Array(a.length - 1).fill(new String())),
          (this.strings = a))
        : (this._$AH = W));
  }
  _$AI(e, t = this, a, o) {
    const r = this.strings;
    let n = !1;
    if (void 0 === r)
      ((e = Z(this, e, t, 0)),
        (n = !N(e) || (e !== this._$AH && e !== O)),
        n && (this._$AH = e));
    else {
      const o = e;
      let i, d;
      for (e = r[0], i = 0; i < r.length - 1; i++)
        ((d = Z(this, o[a + i], t, i)),
          d === O && (d = this._$AH[i]),
          n || (n = !N(d) || d !== this._$AH[i]),
          d === W ? (e = W) : e !== W && (e += (d ?? "") + r[i + 1]),
          (this._$AH[i] = d));
    }
    n && !o && this.j(e);
  }
  j(e) {
    e === W
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, e ?? "");
  }
}
class Q extends X {
  constructor() {
    (super(...arguments), (this.type = 3));
  }
  j(e) {
    this.element[this.name] = e === W ? void 0 : e;
  }
}
class ee extends X {
  constructor() {
    (super(...arguments), (this.type = 4));
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== W);
  }
}
class te extends X {
  constructor(e, t, a, o, r) {
    (super(e, t, a, o, r), (this.type = 5));
  }
  _$AI(e, t = this) {
    if ((e = Z(this, e, t, 0) ?? W) === O) return;
    const a = this._$AH,
      o =
        (e === W && a !== W) ||
        e.capture !== a.capture ||
        e.once !== a.once ||
        e.passive !== a.passive,
      r = e !== W && (a === W || o);
    (o && this.element.removeEventListener(this.name, this, a),
      r && this.element.addEventListener(this.name, this, e),
      (this._$AH = e));
  }
  handleEvent(e) {
    var t;
    "function" == typeof this._$AH
      ? this._$AH.call(
          (null == (t = this.options) ? void 0 : t.host) ?? this.element,
          e,
        )
      : this._$AH.handleEvent(e);
  }
}
class ae {
  constructor(e, t, a) {
    ((this.element = e),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = t),
      (this.options = a));
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Z(this, e);
  }
}
const oe = w.litHtmlPolyfillSupport;
(null == oe || oe(K, J),
  (w.litHtmlVersions ?? (w.litHtmlVersions = [])).push("3.2.1"));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let re = class extends C {
  constructor() {
    (super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0));
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (
      (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild),
      t
    );
  }
  update(e) {
    const t = this.render();
    (this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(e),
      (this._$Do = ((e, t, a) => {
        const o = (null == a ? void 0 : a.renderBefore) ?? t;
        let r = o._$litPart$;
        if (void 0 === r) {
          const e = (null == a ? void 0 : a.renderBefore) ?? null;
          o._$litPart$ = r = new J(t.insertBefore(A(), e), e, void 0, a ?? {});
        }
        return (r._$AI(e), r);
      })(t, this.renderRoot, this.renderOptions)));
  }
  connectedCallback() {
    var e;
    (super.connectedCallback(), null == (e = this._$Do) || e.setConnected(!0));
  }
  disconnectedCallback() {
    var e;
    (super.disconnectedCallback(),
      null == (e = this._$Do) || e.setConnected(!1));
  }
  render() {
    return O;
  }
};
((re._$litElement$ = !0),
  (re.finalized = !0),
  null == (e = globalThis.litElementHydrateSupport) ||
    e.call(globalThis, { LitElement: re }));
const ne = globalThis.litElementPolyfillSupport;
(null == ne || ne({ LitElement: re }),
  (globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push(
    "4.1.1",
  ));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = {
    attribute: !0,
    type: String,
    converter: v,
    reflect: !1,
    hasChanged: b,
  },
  de = (e = ie, t, a) => {
    const { kind: o, metadata: r } = a;
    let n = globalThis.litPropertyMetadata.get(r);
    if (
      (void 0 === n && globalThis.litPropertyMetadata.set(r, (n = new Map())),
      n.set(a.name, e),
      "accessor" === o)
    ) {
      const { name: o } = a;
      return {
        set(a) {
          const r = t.get.call(this);
          (t.set.call(this, a), this.requestUpdate(o, r, e));
        },
        init(t) {
          return (void 0 !== t && this.P(o, void 0, e), t);
        },
      };
    }
    if ("setter" === o) {
      const { name: o } = a;
      return function (a) {
        const r = this[o];
        (t.call(this, a), this.requestUpdate(o, r, e));
      };
    }
    throw Error("Unsupported decorator location: " + o);
  };
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function le(e) {
  return (t, a) =>
    "object" == typeof a
      ? de(e, t, a)
      : ((e, t, a) => {
          const o = t.hasOwnProperty(a);
          return (
            t.constructor.createProperty(a, o ? { ...e, wrapped: !0 } : e),
            o ? Object.getOwnPropertyDescriptor(t, a) : void 0
          );
        })(e, t, a);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function se(e) {
  return le({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ce(e, t) {
  return (t, a, o) =>
    ((e, t, a) => (
      (a.configurable = !0),
      (a.enumerable = !0),
      Reflect.decorate &&
        "object" != typeof t &&
        Object.defineProperty(e, t, a),
      a
    ))(t, a, {
      get() {
        return ((t) => {
          var a;
          return (
            (null == (a = t.renderRoot) ? void 0 : a.querySelector(e)) ?? null
          );
        })(this);
      },
    });
}
const ue = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  he = {
    variables: "gcalize_variables",
    month_mini: "gcalize_month_mini",
    month_big: "gcalize_month_big",
    year: "gcalize_year",
    year_month: "gcalize_year_month",
    holidays: "gcalize_holidays",
    today: "gcalize_today",
    daily: "gcalize_daily",
    agenda: "gcalize_agenda",
  },
  pe = [
    he.variables,
    he.month_mini,
    he.month_big,
    he.year,
    he.year_month,
    he.holidays,
    he.today,
    he.daily,
    he.agenda,
  ],
  ye = {
    getSaveData:
      "[ERROR] G-calize:\n        Failed to retrieve saved data.\n        Please restart your browser or sign in and install the extension.",
    getHolidaysList:
      "[ERROR] G-calize:\n        Failed to retrieve holiday calendar list.\n        Please try reloading the calendar page.",
    notFoundFirstWeek:
      "[ERROR] G-calize:\n        Start of week not found... Please reload the page.\n        If this occurs frequently, please contact the developer.",
  },
  ge = ["day", "week", "custom_days"],
  fe = ["day", "week", "month", "year", "agenda", "custom_days"];
let me;
function ve(e, t = document) {
  return t.querySelector(e) || null;
}
function be(e, t = document) {
  return Array.from(t.querySelectorAll(e));
}
function ke(e) {
  var t;
  return (
    (null == (t = e.matches)
      ? void 0
      : t.call(
          e,
          "[role='main']>[jsname]>[role='grid']>[role='rowgroup'][data-datekey]",
        )) ?? !1
  );
}
function Ce() {
  return ve(
    "#drawerMiniMonthNavigator > [data-month] > [role='grid'] > tbody > tr",
  );
}
async function we() {
  let e,
    t = -1;
  return new Promise((a) => {
    let o = 0;
    (clearInterval(e),
      (e = setInterval(() => {
        if (
          ((t = (function () {
            const e = Ce();
            if (!e) return -1;
            const t = e.querySelector("td[data-date]");
            if (!t || !t.dataset.date) return -1;
            const a = Be(t.dataset.date);
            return (null == a ? void 0 : a.getDay()) ?? -1;
          })()),
          t > -1)
        )
          return (clearInterval(e), void a(t));
        (o++,
          o > 240 &&
            (clearInterval(e),
            fe.includes(Ee()) && alert(ye.notFoundFirstWeek),
            a(-1)));
      }, 500)));
  });
}
function $e() {
  be(
    "[role='main']>[jsname]>[role='grid']>[role='rowgroup'][data-datekey]",
  ).forEach((e) => {
    const t = (function (e) {
      const t = Be(Ie(e));
      return (null == t ? void 0 : t.getDay()) ?? null;
    })(parseInt(e.dataset.datekey, 10));
    null != t && e.dataset.gczWid !== `${t}` && (e.dataset.gczWid = `${t}`);
  });
}
const Se = function () {};
async function De(e) {
  return new Promise((t) => {
    setTimeout(() => t(), e);
  });
}
function xe(e, t = 250) {
  let a;
  return (...o) => {
    (clearTimeout(a), (a = setTimeout(() => e(...o), t)));
  };
}
function _e() {
  return getComputedStyle(document.body).getPropertyValue("color-scheme");
}
function Ee() {
  var e, t;
  return (
    (null == (t = null == (e = document.body.dataset) ? void 0 : e.viewkey)
      ? void 0
      : t.toLowerCase()) || ""
  );
}
function Te(e) {
  const t = window.getComputedStyle(e).transitionDuration;
  return (parseFloat(t) || 0) * (t.endsWith("s") ? 1e3 : 1);
}
const Ae = { opacity: 0, transform: "translate3d(0, -8px, 0) scale(0.9)" },
  Ne = { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
  He = { easing: "ease-out", duration: 200 };
function ze(e, t, a = {}) {
  e &&
    e.dispatchEvent(
      new CustomEvent(t, { bubbles: !0, cancelable: !0, composed: !1, ...a }),
    );
}
function Ie(e) {
  return `${("" + (1970 + (e >> 9))).padStart(4, "0")}${("" + ((e >> 5) & 15)).padStart(2, "0")}${("" + (31 & e)).padStart(2, "0")}`;
}
function je(e) {
  return (
    ((((parseInt(e.substring(0, 4)) - 1970) << 4) +
      parseInt(e.substring(4, 6))) <<
      5) +
    parseInt(e.substring(6, 8))
  );
}
function Me(e) {
  return `${`${e.getFullYear()}`}${`${e.getMonth() + 1}`.padStart(2, "0")}${`${e.getDate()}`.padStart(2, "0")}`;
}
function Be(e) {
  const t = parseInt(e.substring(0, 4)),
    a = parseInt(e.substring(4, 6)),
    o = parseInt(e.substring(6, 8)),
    r = new Date(t, a - 1, o);
  return (function (e) {
    return !Number.isNaN(e.getTime());
  })(r)
    ? r
    : null;
}
function Pe(e, t) {
  const a = new Date(e.getTime());
  return (a.setDate(a.getDate() + t), a);
}
function Le({ stepYear: e, startYear: t, endYear: a }) {
  return Math.trunc(((e - t) / (a - t)) * 100);
}
class Fe {
  constructor() {
    ((this.apiKey = ""),
      (this.calendarID = ""),
      (this.startYear = 0),
      (this.endYear = 0),
      (this.data = {
        startYear: 0,
        stepYear: 0,
        endYear: 0,
        calendarID: "",
        calendarName: "",
        days: {},
      }),
      (this.errors = []),
      (this._stepCallback = Se),
      (this._doneCallback = Se),
      (this._failCallback = Se));
  }
  clear() {
    return (
      (this.apiKey = ""),
      (this.calendarID = ""),
      (this.startYear = 0),
      (this.endYear = 0),
      (this.data = {
        startYear: 0,
        stepYear: 0,
        endYear: 0,
        calendarID: "",
        calendarName: "",
        days: {},
      }),
      (this.errors = []),
      this
    );
  }
  setting(e) {
    const { apiKey: t, calendarID: a, startYear: o, endYear: r } = e;
    return (
      (this.apiKey = t),
      (this.calendarID = a),
      (this.startYear = o),
      (this.endYear = r),
      this
    );
  }
  step(e) {
    return ((this._stepCallback = e), this);
  }
  done(e) {
    return ((this._doneCallback = e), this);
  }
  fail(e) {
    return ((this._failCallback = e), this);
  }
  load() {
    const e = {
      ...this.data,
      calendarID: this.calendarID,
      startYear: this.startYear,
      stepYear: this.startYear,
      endYear: this.endYear,
    };
    return (
      this._stepCallback.call(this, Le(e)),
      this.loopLoader(e, (e) => {
        this._doneCallback.call(this, e);
      }),
      this
    );
  }
  async loopLoader(e, t) {
    const { stepYear: a, calendarID: o } = e,
      r = (function (e, t, a) {
        const o = `${a}-01-01T00:00:00.000Z`,
          r = `${a}-12-31T23:59:59.000Z`;
        let n = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(t)}`;
        return (
          (n += "/events?orderBy=startTime&singleEvents=true"),
          (n +=
            "&fields=description%2Citems(description%2Cend%2Cstart%2Cstatus%2Csummary%2Cupdated%2Cvisibility)%2CnextPageToken%2Csummary"),
          (n += `&timeMin=${o}&timeMax=${r}&maxResults=9999&key=${e}`),
          n
        );
      })(this.apiKey, o, a);
    (await fetch(r, { method: "GET", cache: "no-cache" })
      .then((e) => e.json())
      .then((t) => {
        const { summary: a, items: o } = t;
        ((e.calendarName = a),
          o.forEach((t) => {
            var a, o;
            const r = t.status,
              n = t.summary || "",
              i = (null == (a = t.start) ? void 0 : a.date) || "",
              d = (null == (o = t.end) ? void 0 : o.date) || "",
              l = i.match(/^(\d{4})-(\d{2})-(\d{2})$/),
              s = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
            if (["confirmed", "tentative"].includes(r) && l && s) {
              let t = new Date(+[l[1]], +[l[2]] - 1, +[l[3]]);
              const a = new Date(+[s[1]], +[s[2]] - 1, +[s[3]]);
              let o = !0;
              for (; o; )
                if (t.getTime() >= a.getTime()) o = !1;
                else {
                  const a = Me(t);
                  ((e.days[a] = n), t.setDate(t.getDate() + 1));
                }
            }
          }));
      })
      .catch((e) => {
        this.errors.push(`${e.message || "faile error"}`);
      }),
      e.stepYear++,
      this._stepCallback.call(this, Le(e)),
      e.stepYear < e.endYear && this.errors.length < 2
        ? setTimeout(() => this.loopLoader(e, t), 480)
        : setTimeout(() => t(e), 480));
  }
}
/**
 * @license
 * Copyright (C) piayo.
 */ const Re = {
    ja: {
      "Restore to Default": "デフォルトに戻す",
      "Donate to developer": "開発者に寄付",
      Close: "閉じる",
      "Day of the Week": "曜日の設定",
      Holidays: "祝日の設定",
      "Font Color": "文字色",
      "Border Color": "枠線色",
      "Background Color": "背景色",
      "Accent Color": "アクセント色",
      Enable: "有効",
      Today: "今日",
      Sunday: "日曜",
      Monday: "月曜",
      Tuesday: "火曜",
      Wednesday: "水曜",
      Thursday: "木曜",
      Friday: "金曜",
      Saturday: "土曜",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "※ 休日データは前後3年分読み込まれ、ブラウザに保存されます。",
      "Select the Holidays Calendar": "祝日のカレンダーを選択",
      "by Google's": "Google から",
      "Select and Import": "選択 ＆ 読み込み",
      "Calendar Name": "カレンダー名",
      "Calendar ID": "カレンダー ID",
      "Period / Total": "範囲 / 合計",
      days: "日",
      "Clear of Holidays Data": "祝日データ削除",
      "Select the Calendar": "カレンダーを選択",
      "Holidays Color": "祝日の色",
      Loading: "読み込み中",
      Saved: "保存しました",
      "Restore to Default. Are you sure?":
        "設定をデフォルトに戻します。よろしいですか？",
      "Settings was restored to default.": "設定をデフォルトに戻しました",
      Light: "ライト",
      Dark: "ダーク",
    },
    "zh-TW": {
      "Restore to Default": "還原為默認",
      "Donate to developer": "向開發人員捐款",
      Close: "關閉",
      "Day of the Week": "一周中的天",
      Holidays: "假期",
      "Font Color": "字體顏色",
      "Border Color": "邊框顏色",
      "Background Color": "背景顏色",
      "Accent Color": "口音顏色",
      Enable: "使能夠",
      Today: "今天",
      Sunday: "星期日",
      Monday: "週一",
      Tuesday: "週二",
      Wednesday: "週三",
      Thursday: "週四",
      Friday: "星期五",
      Saturday: "週六",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "注意：讀取假期數據前後三年，並保存在瀏覽器中。",
      "Select the Holidays Calendar": "選擇節日日曆",
      "by Google's": "由Google's",
      "Select and Import": "選擇和導入",
      "Calendar Name": "日曆名稱",
      "Calendar ID": "日曆ID",
      "Period / Total": "週期 /總數",
      days: "天",
      "Clear of Holidays Data": "避免假期數據",
      "Select the Calendar": "選擇日曆",
      "Holidays Color": "假期顏色",
      "Now Loading": "現在加載",
      Saved: "保存",
      "Restore to Default. Are you sure?": "還原為默認。你確定嗎？",
      "Settings was restored to default.": "設置已恢復為默認設置。",
      Light: "淺色",
      Dark: "黑暗",
    },
    "zh-CN": {
      "Restore to Default": "还原为默认",
      "Donate to developer": "向开发人员捐款",
      Close: "关闭",
      "Day of the Week": "一周中的天",
      Holidays: "假期",
      "Font Color": "字体颜色",
      "Border Color": "边框颜色",
      "Background Color": "背景颜色",
      "Accent Color": "口音颜色",
      Enable: "使能够",
      Today: "今天",
      Sunday: "星期日",
      Monday: "周一",
      Tuesday: "周二",
      Wednesday: "周三",
      Thursday: "周四",
      Friday: "星期五",
      Saturday: "周六",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "注意：读取假期数据前后三年，并保存在浏览器中。",
      "Select the Holidays Calendar": "选择节日日历",
      "by Google's": "由Google's",
      "Select and Import": "选择和导入",
      "Calendar Name": "日历名称",
      "Calendar ID": "日历ID",
      "Period / Total": "周期 /总数",
      days: "天",
      "Clear of Holidays Data": "避免假期数据",
      "Select the Calendar": "选择日历",
      "Holidays Color": "假期颜色",
      "Now Loading": "现在加载",
      Saved: "保存",
      "Restore to Default. Are you sure?": "还原为默认。你确定吗？",
      "Settings was restored to default.": "设置已恢复为默认设置。",
      Light: "浅色",
      Dark: "黑暗",
    },
    vi: {
      "Restore to Default": "Khôi phục về mặc định",
      "Donate to developer": "Quyên góp cho nhà phát triển",
      Close: "Đóng",
      "Day of the Week": "Ngày trong tuần",
      Holidays: "Ngày lễ",
      "Font Color": "Màu chữ",
      "Border Color": "Màu sắc biên giới",
      "Background Color": "Màu nền",
      "Accent Color": "Màu điểm nhấn",
      Enable: "Cho phép",
      Today: "Hôm nay",
      Sunday: "Chủ nhật",
      Monday: "Thứ hai",
      Tuesday: "Thứ ba",
      Wednesday: "Thứ Tư",
      Thursday: "Thứ năm",
      Friday: "Thứ sáu",
      Saturday: "Thứ bảy",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Lưu ý: Dữ liệu ngày lễ được đọc trong 3 năm trước và sau và được lưu trong trình duyệt.",
      "Select the Holidays Calendar": "Chọn lịch ngày lễ",
      "by Google's": "bởi Google's",
      "Select and Import": "Chọn và nhập",
      "Calendar Name": "Tên lịch",
      "Calendar ID": "ID lịch",
      "Period / Total": "Thời gian / tổng số",
      days: "ngày",
      "Clear of Holidays Data": "Xóa dữ liệu ngày lễ",
      "Select the Calendar": "Chọn lịch",
      "Holidays Color": "Màu sắc ngày lễ",
      "Now Loading": "Đang tải",
      Saved: "Đã lưu",
      "Restore to Default. Are you sure?":
        "Khôi phục về mặc định. Bạn có chắc không?",
      "Settings was restored to default.":
        "Cài đặt đã được khôi phục lại mặc định.",
      Light: "Ánh sáng",
      Dark: "Tối tăm",
    },
    uk: {
      "Restore to Default": "Відновити до дефолту",
      "Donate to developer": "Пожертвуйте розробнику",
      Close: "Закривати",
      "Day of the Week": "День тижня",
      Holidays: "Свята",
      "Font Color": "Шрифт",
      "Border Color": "Прикордонний колір",
      "Background Color": "Колір фону",
      "Accent Color": "Акцентний колір",
      Enable: "Ввімкнути",
      Today: "Сьогодні",
      Sunday: "Неділя",
      Monday: "Понеділок",
      Tuesday: "У вівторок",
      Wednesday: "Середа",
      Thursday: "Четвер",
      Friday: "П’ятниця",
      Saturday: "Субота",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Примітка. Дані про свято читаються протягом 3 років до і після та зберігаються в браузері.",
      "Select the Holidays Calendar": "Виберіть Календар свят",
      "by Google's": "від Google",
      "Select and Import": "Виберіть та імпортуйте",
      "Calendar Name": "Назва календаря",
      "Calendar ID": "Ідентифікатор календаря",
      "Period / Total": "Період / загальний",
      days: "дні",
      "Clear of Holidays Data": "Визначити дані про свята",
      "Select the Calendar": "Виберіть календар",
      "Holidays Color": "Свята Колір",
      "Now Loading": "Тепер завантаження",
      Saved: "Врятований",
      "Restore to Default. Are you sure?":
        "Відновити до за замовчуванням. Ти впевнений?",
      "Settings was restored to default.":
        "Налаштування відновлювались за замовчуванням.",
      Light: "світло",
      Dark: "Темний",
    },
    tr: {
      "Restore to Default": "Fabrika ayarlarına geri dön",
      "Donate to developer": "Geliştiriciye bağış",
      Close: "Kapalı",
      "Day of the Week": "Haftanın günü",
      Holidays: "Bayram",
      "Font Color": "Yazı rengi",
      "Border Color": "Sınır rengi",
      "Background Color": "Arka plan rengi",
      "Accent Color": "Aksan rengi",
      Enable: "Olanak vermek",
      Today: "Bugün",
      Sunday: "Pazar",
      Monday: "Pazartesi",
      Tuesday: "Salı",
      Wednesday: "Çarşamba",
      Thursday: "Perşembe",
      Friday: "Cuma",
      Saturday: "Cumartesi",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Not: Tatil verileri 3 yıl önce ve sonra okunur ve tarayıcıya kaydedilir.",
      "Select the Holidays Calendar": "Tatil Takvimini Seçin",
      "by Google's": "Google tarafından",
      "Select and Import": "Seç ve İçe Aktar",
      "Calendar Name": "Takvim adı",
      "Calendar ID": "Takvim kimliği",
      "Period / Total": "Dönem / Toplam",
      days: "günler",
      "Clear of Holidays Data": "Tatil verilerinden uzak",
      "Select the Calendar": "Takvimi seçin",
      "Holidays Color": "Tatil Rengi",
      "Now Loading": "Şimdi yükleniyor",
      Saved: "Kurtarılmış",
      "Restore to Default. Are you sure?":
        "Fabrika ayarlarına geri dön. Emin misin?",
      "Settings was restored to default.":
        "Ayarlar varsayılan olarak geri yüklendi.",
      Light: "Işık",
      Dark: "Karanlık",
    },
    th: {
      "Restore to Default": "คืนค่าเป็นค่าเริ่มต้น",
      "Donate to developer": "บริจาคให้กับนักพัฒนา",
      Close: "ปิด",
      "Day of the Week": "วันของสัปดาห์",
      Holidays: "วันหยุด",
      "Font Color": "สีตัวอักษร",
      "Border Color": "สีพรมแดน",
      "Background Color": "สีพื้นหลัง",
      "Accent Color": "สีเน้น",
      Enable: "เปิดใช้งาน",
      Today: "วันนี้",
      Sunday: "วันอาทิตย์",
      Monday: "วันจันทร์",
      Tuesday: "วันอังคาร",
      Wednesday: "วันพุธ",
      Thursday: "วันพฤหัสบดี",
      Friday: "วันศุกร์",
      Saturday: "วันเสาร์",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "หมายเหตุ: ข้อมูลวันหยุดถูกอ่านเป็นเวลา 3 ปีก่อนและหลังและบันทึกไว้ในเบราว์เซอร์",
      "Select the Holidays Calendar": "เลือกปฏิทินวันหยุด",
      "by Google's": "โดย Google's",
      "Select and Import": "เลือกและนำเข้า",
      "Calendar Name": "ชื่อปฏิทิน",
      "Calendar ID": "รหัสปฏิทิน",
      "Period / Total": "ระยะเวลา / ทั้งหมด",
      days: "วัน",
      "Clear of Holidays Data": "ล้างข้อมูลวันหยุด",
      "Select the Calendar": "เลือกปฏิทิน",
      "Holidays Color": "สีวันหยุด",
      "Now Loading": "กำลังโหลด",
      Saved: "ที่ได้รับการช่วยเหลือ",
      "Restore to Default. Are you sure?": "คืนค่าเป็นค่าเริ่มต้น คุณแน่ใจไหม?",
      "Settings was restored to default.":
        "การตั้งค่าได้รับการกู้คืนเป็นค่าเริ่มต้น",
      Light: "แสงสว่าง",
      Dark: "มืด",
    },
    sv: {
      "Restore to Default": "Återställa till standard",
      "Donate to developer": "Donera till utvecklare",
      Close: "Stänga",
      "Day of the Week": "Veckodag",
      Holidays: "Högtider",
      "Font Color": "Fontfärg",
      "Border Color": "Gräns ​​färg",
      "Background Color": "Bakgrundsfärg",
      "Accent Color": "Accentfärg",
      Enable: "Gör det möjligt",
      Today: "I dag",
      Sunday: "Söndag",
      Monday: "Måndag",
      Tuesday: "Tisdag",
      Wednesday: "Onsdag",
      Thursday: "Torsdag",
      Friday: "fredag",
      Saturday: "Lördag",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Obs: Holiday Data läses i 3 år före och efter och sparas i webbläsaren.",
      "Select the Holidays Calendar": "Välj Holiday Calender",
      "by Google's": "av Google's",
      "Select and Import": "Välj och importera",
      "Calendar Name": "Kalendernamn",
      "Calendar ID": "Kalender ID",
      "Period / Total": "Period / total",
      days: "dagar",
      "Clear of Holidays Data": "Klar av semesterdata",
      "Select the Calendar": "Välj kalendern",
      "Holidays Color": "Semester färg",
      "Now Loading": "Laddar",
      Saved: "Räddad",
      "Restore to Default. Are you sure?":
        "Återställa till standard. Är du säker?",
      "Settings was restored to default.":
        "Inställningar återställdes till standard.",
      Light: "Ljus",
      Dark: "Mörk",
    },
    sr: {
      "Restore to Default": "Врати на подразумевано",
      "Donate to developer": "Донирајте програмеру",
      Close: "Близу",
      "Day of the Week": "Дан у недељи",
      Holidays: "Празници",
      "Font Color": "Боја фонта",
      "Border Color": "Боја ивице",
      "Background Color": "Боја позадине",
      "Accent Color": "Боја нагласности",
      Enable: "Омогућити",
      Today: "Данас",
      Sunday: "Недеља",
      Monday: "Понедељак",
      Tuesday: "У уторак",
      Wednesday: "Среда",
      Thursday: "У четвртак",
      Friday: "Петак",
      Saturday: "У суботу",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Напомена: Подаци о одмору се читају 3 године пре и после и сачуване у прегледачу.",
      "Select the Holidays Calendar": "Изаберите Календар празнике",
      "by Google's": "од стране Гоогле-а",
      "Select and Import": "Изаберите и унесите",
      "Calendar Name": "Име календара",
      "Calendar ID": "ИД календара",
      "Period / Total": "Период / укупно",
      days: "дани",
      "Clear of Holidays Data": "Јасно од празника података",
      "Select the Calendar": "Изаберите календар",
      "Holidays Color": "Боја празника",
      "Now Loading": "Сад учитавање",
      Saved: "Сачуван",
      "Restore to Default. Are you sure?":
        "Врати на подразумевано. Јеси ли сигуран?",
      "Settings was restored to default.":
        "Подешавања је враћена на подразумевано.",
      Light: "Светлост",
      Dark: "Дарк",
    },
    sl: {
      "Restore to Default": "Obnovite na privzeto",
      "Donate to developer": "Darovanje razvijalcu",
      Close: "Blizu",
      "Day of the Week": "Dan v tednu",
      Holidays: "Počitnice",
      "Font Color": "Barva pisave",
      "Border Color": "Barva meje",
      "Background Color": "Barva ozadja",
      "Accent Color": "Naglasna barva",
      Enable: "Omogoči",
      Today: "Danes",
      Sunday: "Nedelja",
      Monday: "Ponedeljek",
      Tuesday: "Torek",
      Wednesday: "Sreda",
      Thursday: "Četrtek",
      Friday: "Petek",
      Saturday: "Sobota",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Opomba: Podatki o počitnicah se berejo 3 leta pred in po njem in jih shranijo v brskalnik.",
      "Select the Holidays Calendar": "Izberite koledar praznikov",
      "by Google's": "Google",
      "Select and Import": "Izberite in uvozite",
      "Calendar Name": "Ime koledarja",
      "Calendar ID": "ID koledarja",
      "Period / Total": "Obdobje / skupaj",
      days: "dnevi",
      "Clear of Holidays Data": "Brez počitnic",
      "Select the Calendar": "Izberite koledar",
      "Holidays Color": "Počitnice barva",
      "Now Loading": "Zdaj nalaganje",
      Saved: "Shranjeno",
      "Restore to Default. Are you sure?":
        "Obnovite na privzeto. Ali si prepričan?",
      "Settings was restored to default.":
        "Nastavitve so bile obnovljene v privzeto.",
      Light: "Svetloba",
      Dark: "Temno",
    },
    sk: {
      "Restore to Default": "Obnoviť predvolene",
      "Donate to developer": "Darujte vývojárovi",
      Close: "Zavrieť",
      "Day of the Week": "Deň v týždni",
      Holidays: "Prázdniny",
      "Font Color": "Farba písma",
      "Border Color": "Farbu okraja",
      "Background Color": "Farba pozadia",
      "Accent Color": "Prízvuk",
      Enable: "Umožniť",
      Today: "Dnes",
      Sunday: "Nedeľa",
      Monday: "Pondelok",
      Tuesday: "Utorok",
      Wednesday: "Streda",
      Thursday: "Štvrtok",
      Friday: "Piatok",
      Saturday: "Sobota",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Poznámka: Data sviatkov sa čítajú 3 roky pred a po a uložené v prehliadači.",
      "Select the Holidays Calendar": "Vyberte kalendár sviatkov",
      "by Google's": "od spoločnosti Google",
      "Select and Import": "Vyberte a importujte",
      "Calendar Name": "Názov kalendára",
      "Calendar ID": "ID kalendára",
      "Period / Total": "Obdobie / celkom",
      days: "dni",
      "Clear of Holidays Data": "Bez sviatkov údajov",
      "Select the Calendar": "Vyberte kalendár",
      "Holidays Color": "Sviatok",
      "Now Loading": "Načítava sa",
      Saved: "Uložený",
      "Restore to Default. Are you sure?": "Obnovte predvolené. Si si istý?",
      "Settings was restored to default.":
        "Nastavenia boli obnovené na predvolené.",
      Light: "Svetlo",
      Dark: "Tmavý",
    },
    ru: {
      "Restore to Default": "Восстановить по умолчанию",
      "Donate to developer": "Пожертвовать разработчику",
      Close: "Закрывать",
      "Day of the Week": "День недели",
      Holidays: "Каникулы",
      "Font Color": "Цвет шрифта",
      "Border Color": "Цвет границы",
      "Background Color": "Фоновый цвет",
      "Accent Color": "Акцентный цвет",
      Enable: "Давать возможность",
      Today: "Сегодня",
      Sunday: "Воскресенье",
      Monday: "Понедельник",
      Tuesday: "Вторник",
      Wednesday: "Среда",
      Thursday: "Четверг",
      Friday: "Пятница",
      Saturday: "Суббота",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "ПРИМЕЧАНИЕ. Праздничные данные читаются в течение 3 лет до и после и сохраняются в браузере.",
      "Select the Holidays Calendar": "Выберите календарь праздников",
      "by Google's": "Google's",
      "Select and Import": "Выберите и импортируйте",
      "Calendar Name": "Название календаря",
      "Calendar ID": "Идентификатор календаря",
      "Period / Total": "Период / всего",
      days: "дни",
      "Clear of Holidays Data": "Данные от праздников",
      "Select the Calendar": "Выберите календарь",
      "Holidays Color": "Праздники цвета",
      "Now Loading": "Сейчас загружается",
      Saved: "Спасенный",
      "Restore to Default. Are you sure?":
        "Восстановить по умолчанию. Вы уверены?",
      "Settings was restored to default.":
        "Настройки были восстановлены по умолчанию.",
      Light: "Свет",
      Dark: "Темный",
    },
    ro: {
      "Restore to Default": "ຟື້ນຟູໃຫ້ເປັນຄ່າເລີ່ມຕົ້ນ",
      "Donate to developer": "ບໍລິຈາກໃຫ້ນັກພັດທະນາ",
      Close: "ປິດ",
      "Day of the Week": "ມື້ຂອງອາທິດ",
      Holidays: "ວັນພັກ",
      "Font Color": "ສີຕົວອັກສອນ",
      "Border Color": "ສີຊາຍແດນ",
      "Background Color": "ສີພື້ນຫລັງ",
      "Accent Color": "ສີສໍານຽງ",
      Enable: "ເປີດໃຊ້",
      Today: "ມື້​ນີ້",
      Sunday: "ວັນອາທິດ",
      Monday: "ວັນຈັນ",
      Tuesday: "ວັນອັງຄານ",
      Wednesday: "ວັນພຸດ",
      Thursday: "ວັນພະຫັດ",
      Friday: "ວັນ​ສຸກ",
      Saturday: "ວັນເສົາ",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "ຫມາຍເຫດ: ຂໍ້ມູນວັນພັກຜ່ອນແມ່ນອ່ານເປັນເວລາ 3 ປີກ່ອນແລະຫຼັງແລະບັນທຶກໄວ້ໃນ browser.",
      "Select the Holidays Calendar": "ເລືອກປະຕິທິນວັນພັກຜ່ອນ",
      "by Google's": "ໂດຍ google ຂອງ",
      "Select and Import": "ເລືອກແລະນໍາເຂົ້າ",
      "Calendar Name": "ນາມປະຕິທິນ",
      "Calendar ID": "ID ປະຕິທິນ",
      "Period / Total": "ໄລຍະເວລາ / ທັງຫມົດ",
      days: "ມື້",
      "Clear of Holidays Data": "ຄວາມຊັດເຈນຂອງຂໍ້ມູນວັນພັກຜ່ອນ",
      "Select the Calendar": "ເລືອກປະຕິທິນ",
      "Holidays Color": "ວັນພັກ",
      "Now Loading": "ດຽວນີ້ກໍາລັງໂຫລດ",
      Saved: "ປະຢັດ",
      "Restore to Default. Are you sure?":
        "ຟື້ນຟູໃຫ້ເປັນຄ່າເລີ່ມຕົ້ນ. ເຈົ້າ​ແນ່​ໃຈ​ບໍ່?",
      "Settings was restored to default.":
        "ການຕັ້ງຄ່າໄດ້ຖືກຟື້ນຟູຄືນສູ່ຄ່າເລີ່ມຕົ້ນ.",
      Light: "ແສງສະຫວ່າງ",
      Dark: "ມືດ",
    },
    pt: {
      "Restore to Default": "Restaurar para padrão",
      "Donate to developer": "Doar ao desenvolvedor",
      Close: "Fechar",
      "Day of the Week": "Dia da semana",
      Holidays: "Feriados",
      "Font Color": "Cor da fonte",
      "Border Color": "Cor da borda",
      "Background Color": "Cor de fundo",
      "Accent Color": "Cor de destaque",
      Enable: "Habilitar",
      Today: "Hoje",
      Sunday: "Domingo",
      Monday: "Segunda-feira",
      Tuesday: "Terça-feira",
      Wednesday: "Quarta-feira",
      Thursday: "Quinta-feira",
      Friday: "Sexta-feira",
      Saturday: "Sábado",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Nota: Os dados de férias são lidos por 3 anos antes e depois e salvos no navegador.",
      "Select the Holidays Calendar": "Selecione o calendário de férias",
      "by Google's": "pelo Google's",
      "Select and Import": "Selecione e importar",
      "Calendar Name": "Nome do calendário",
      "Calendar ID": "ID do calendário",
      "Period / Total": "Período / total",
      days: "dias",
      "Clear of Holidays Data": "Afastar dados de férias",
      "Select the Calendar": "Selecione o calendário",
      "Holidays Color": "Férias de cor",
      "Now Loading": "Agora carregando",
      Saved: "Salvou",
      "Restore to Default. Are you sure?":
        "Restaurar para padrão. Tem certeza?",
      "Settings was restored to default.":
        "As configurações foram restauradas para o padrão.",
      Light: "Luz",
      Dark: "Escuro",
    },
    pl: {
      "Restore to Default": "Przywrócić domyślne",
      "Donate to developer": "Przekazaj darowiznę dla programistów",
      Close: "Zamknąć",
      "Day of the Week": "Dzień tygodnia",
      Holidays: "Wakacje",
      "Font Color": "Kolor czcionki",
      "Border Color": "Kolor ramki",
      "Background Color": "Kolor tła",
      "Accent Color": "Kolor akcentu",
      Enable: "Włączać",
      Today: "Dzisiaj",
      Sunday: "Niedziela",
      Monday: "Poniedziałek",
      Tuesday: "Wtorek",
      Wednesday: "Środa",
      Thursday: "Czwartek",
      Friday: "Piątek",
      Saturday: "Sobota",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Uwaga: Dane wakacyjne są odczytywane przez 3 lata przed i po i zapisywane w przeglądarce.",
      "Select the Holidays Calendar": "Wybierz kalendarz wakacji",
      "by Google's": "przez Google",
      "Select and Import": "Wybierz i import",
      "Calendar Name": "Nazwa kalendarza",
      "Calendar ID": "Identyfikator kalendarza",
      "Period / Total": "Okres / całkowita",
      days: "dni",
      "Clear of Holidays Data": "Zrębne dane z wakacji",
      "Select the Calendar": "Wybierz kalendarz",
      "Holidays Color": "Kolor wakacji",
      "Now Loading": "Teraz ładuje",
      Saved: "Uratowany",
      "Restore to Default. Are you sure?": "Przywrócić domyślne. Jesteś pewny?",
      "Settings was restored to default.":
        "Ustawienia zostały przywrócone, aby domyślnie.",
      Light: "Światło",
      Dark: "Ciemny",
    },
    nl: {
      "Restore to Default": "Beginwaarden herstellen",
      "Donate to developer": "Doneer aan ontwikkelaar",
      Close: "Dichtbij",
      "Day of the Week": "Dag van de week",
      Holidays: "Vakantie",
      "Font Color": "Letter kleur",
      "Border Color": "Rand kleur",
      "Background Color": "Achtergrond kleur",
      "Accent Color": "Accent kleur",
      Enable: "Inschakelen",
      Today: "Vandaag",
      Sunday: "Zondag",
      Monday: "Maandag",
      Tuesday: "Dinsdag",
      Wednesday: "Woensdag",
      Thursday: "Donderdag",
      Friday: "Vrijdag",
      Saturday: "Zaterdag",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Opmerking: vakantiegegevens worden voor en na 3 jaar gelezen en opgeslagen in de browser.",
      "Select the Holidays Calendar": "Selecteer de kalender van de vakantie",
      "by Google's": "Door Google's",
      "Select and Import": "Selecteer en importeren",
      "Calendar Name": "Kalendernaam",
      "Calendar ID": "Kalender -ID",
      "Period / Total": "Periode / totaal",
      days: "dagen",
      "Clear of Holidays Data": "Vrij van vakantiegegevens",
      "Select the Calendar": "Selecteer de kalender",
      "Holidays Color": "Holidays Color",
      "Now Loading": "Nu aan het laden",
      Saved: "Gered",
      "Restore to Default. Are you sure?":
        "Beginwaarden herstellen. Weet je het zeker?",
      "Settings was restored to default.":
        "Instellingen zijn gerestaureerd in standaard.",
      Light: "Licht",
      Dark: "Donker",
    },
    lv: {
      "Restore to Default": "Atjaunot, lai noklusētu",
      "Donate to developer": "Ziedojiet izstrādātājam",
      Close: "Tuvs",
      "Day of the Week": "Nedēļas diena",
      Holidays: "Brīvdienas",
      "Font Color": "Fonta krāsa",
      "Border Color": "Apmale",
      "Background Color": "Fona krāsa",
      "Accent Color": "Akcents",
      Enable: "Dot iespēju",
      Today: "Šodien",
      Sunday: "Svētdiena",
      Monday: "Pirmdiena",
      Tuesday: "Otrdiena",
      Wednesday: "Trešdiena",
      Thursday: "Ceturtdiena",
      Friday: "Piektdiena",
      Saturday: "Sestdiena",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "PIEZĪME: Svētku dati tiek lasīti 3 gadus pirms un pēc un pēc pārlūkprogrammas saglabātajiem.",
      "Select the Holidays Calendar": "Atlasiet brīvdienu kalendāru",
      "by Google's": "Google",
      "Select and Import": "Atlasīt un importēt",
      "Calendar Name": "Kalendāra vārds",
      "Calendar ID": "Kalendāra ID",
      "Period / Total": "Periods / kopsumma",
      days: "dienas",
      "Clear of Holidays Data": "Netīriet brīvdienu datus",
      "Select the Calendar": "Atlasiet kalendāru",
      "Holidays Color": "Brīvdienu krāsa",
      "Now Loading": "Tagad iekraušana",
      Saved: "Izglābts",
      "Restore to Default. Are you sure?":
        "Atjaunot noklusējumu. Vai tu esi pārliecināts?",
      "Settings was restored to default.":
        "Iestatījumi tika atjaunoti pēc noklusējuma.",
      Light: "Gaisma",
      Dark: "Tumšs",
    },
    lt: {
      "Restore to Default": "Atkurti iki numatytųjų",
      "Donate to developer": "Paaukokite kūrėjui",
      Close: "Uždaryti",
      "Day of the Week": "Savaitės diena",
      Holidays: "Atostogos",
      "Font Color": "Šrifto spalva",
      "Border Color": "Pasienio spalva",
      "Background Color": "Fono spalva",
      "Accent Color": "Akcento spalva",
      Enable: "Įgalinti",
      Today: "Šiandien",
      Sunday: "Sekmadienis",
      Monday: "Pirmadienis",
      Tuesday: "Antradienis",
      Wednesday: "Trečiadienis",
      Thursday: "Ketvirtadienis",
      Friday: "Penktadienis",
      Saturday: "Šeštadienis",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Pastaba: atostogų duomenys skaitomi 3 metus prieš ir po jų ir išsaugomi naršyklėje.",
      "Select the Holidays Calendar": "Pasirinkite atostogų kalendorių",
      "by Google's": "pateikė „Google“",
      "Select and Import": "Pasirinkite ir importuokite",
      "Calendar Name": "Kalendoriaus pavadinimas",
      "Calendar ID": "Kalendoriaus ID",
      "Period / Total": "Laikotarpis / iš viso",
      days: "dienos",
      "Clear of Holidays Data": "Nepriklausomai nuo atostogų duomenų",
      "Select the Calendar": "Pasirinkite kalendorių",
      "Holidays Color": "Atostogų spalva",
      "Now Loading": "Dabar kraunasi",
      Saved: "Išsaugota",
      "Restore to Default. Are you sure?":
        "Atkurti iki numatytųjų. Ar tu tuo tikras?",
      "Settings was restored to default.":
        "Nustatymai buvo atkurti kaip numatytasis.",
      Light: "Šviesa",
      Dark: "Tamsus",
    },
    ko: {
      "Restore to Default": "기본값으로 복원하십시오",
      "Donate to developer": "개발자에게 기부하십시오",
      Close: "닫다",
      "Day of the Week": "요일",
      Holidays: "휴가",
      "Font Color": "글꼴 색상",
      "Border Color": "테두리 색상",
      "Background Color": "배경색",
      "Accent Color": "악센트 색상",
      Enable: "할 수 있게 하다",
      Today: "오늘",
      Sunday: "일요일",
      Monday: "월요일",
      Tuesday: "화요일",
      Wednesday: "수요일",
      Thursday: "목요일",
      Friday: "금요일",
      Saturday: "토요일",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "참고 : 휴일 데이터는 3 년 전후에 읽히고 브라우저에서 저장됩니다.",
      "Select the Holidays Calendar": "휴일 일정을 선택하십시오",
      "by Google's": "Google의",
      "Select and Import": "선택 및 가져 오기",
      "Calendar Name": "달력 이름",
      "Calendar ID": "캘린더 ID",
      "Period / Total": "기간 / 총",
      days: "날",
      "Clear of Holidays Data": "휴일 데이터가 없음",
      "Select the Calendar": "캘린더를 선택하십시오",
      "Holidays Color": "휴일 색",
      "Now Loading": "이제로드",
      Saved: "저장",
      "Restore to Default. Are you sure?":
        "기본값으로 복원하십시오. 확실합니까?",
      "Settings was restored to default.": "설정이 기본값으로 복원되었습니다.",
      Light: "빛",
      Dark: "어두운",
    },
    it: {
      "Restore to Default": "Ripristina il valore predefinito",
      "Donate to developer": "Dona allo sviluppatore",
      Close: "Vicino",
      "Day of the Week": "Giorno della settimana",
      Holidays: "Vacanze",
      "Font Color": "Colore del carattere",
      "Border Color": "Colore del bordo",
      "Background Color": "Colore di sfondo",
      "Accent Color": "Colore accento",
      Enable: "Abilitare",
      Today: "Oggi",
      Sunday: "Domenica",
      Monday: "Lunedi",
      Tuesday: "Martedì",
      Wednesday: "Mercoledì",
      Thursday: "Giovedì",
      Friday: "Venerdì",
      Saturday: "Sabato",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Nota: i dati delle vacanze vengono letti per 3 anni prima e dopo e salvati nel browser.",
      "Select the Holidays Calendar": "Seleziona il calendario delle vacanze",
      "by Google's": "di Google's",
      "Select and Import": "Seleziona e importa",
      "Calendar Name": "Nome del calendario",
      "Calendar ID": "ID calendario",
      "Period / Total": "Periodo / totale",
      days: "giorni",
      "Clear of Holidays Data": "Libero dai dati delle vacanze",
      "Select the Calendar": "Seleziona il calendario",
      "Holidays Color": "Colore delle vacanze",
      "Now Loading": "In caricamento",
      Saved: "Salvato",
      "Restore to Default. Are you sure?":
        "Ripristina il valore predefinito. Sei sicuro?",
      "Settings was restored to default.":
        "Le impostazioni sono state ripristinate in default.",
      Light: "Leggero",
      Dark: "Buio",
    },
    id: {
      "Restore to Default": "Kembalikan ke default",
      "Donate to developer": "Donasi untuk pengembang",
      Close: "Menutup",
      "Day of the Week": "Hari di minggu ini",
      Holidays: "Liburan",
      "Font Color": "Warna huruf",
      "Border Color": "Warna perbatasan",
      "Background Color": "Warna latar belakang",
      "Accent Color": "Aksen warna",
      Enable: "Memungkinkan",
      Today: "Hari ini",
      Sunday: "Minggu",
      Monday: "Senin",
      Tuesday: "Selasa",
      Wednesday: "Rabu",
      Thursday: "Kamis",
      Friday: "Jumat",
      Saturday: "Sabtu",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Catatan: Data liburan dibaca selama 3 tahun sebelum dan sesudah dan disimpan di browser.",
      "Select the Holidays Calendar": "Pilih Kalender Liburan",
      "by Google's": "oleh Google",
      "Select and Import": "Pilih dan Impor",
      "Calendar Name": "Nama Kalender",
      "Calendar ID": "ID Kalender",
      "Period / Total": "Periode / total",
      days: "hari -hari",
      "Clear of Holidays Data": "Bersihkan Data Liburan",
      "Select the Calendar": "Pilih Kalender",
      "Holidays Color": "Warna liburan",
      "Now Loading": "Sedang memuat",
      Saved: "Diselamatkan",
      "Restore to Default. Are you sure?":
        "Kembalikan ke default. Apa kamu yakin?",
      "Settings was restored to default.":
        "Pengaturan dipulihkan menjadi default.",
      Light: "Lampu",
      Dark: "Gelap",
    },
    hu: {
      "Restore to Default": "alapértelmezett visszaállítása",
      "Donate to developer": "Adományozzon a fejlesztőnek",
      Close: "Bezárás",
      "Day of the Week": "A hét napja",
      Holidays: "Ünnepek",
      "Font Color": "Betű szín",
      "Border Color": "Határ színe",
      "Background Color": "Háttérszín",
      "Accent Color": "Akcentus szín",
      Enable: "Engedélyezze",
      Today: "Ma",
      Sunday: "vasárnap",
      Monday: "hétfő",
      Tuesday: "kedd",
      Wednesday: "szerda",
      Thursday: "csütörtök",
      Friday: "péntek",
      Saturday: "szombat",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Megjegyzés: Az ünnepi adatokat 3 évig és utána olvasják el, és a böngészőbe mentik.",
      "Select the Holidays Calendar": "Válassza ki az ünnepi naptárt",
      "by Google's": "a Google által",
      "Select and Import": "Válassza ki és importáljon",
      "Calendar Name": "Naptár neve",
      "Calendar ID": "Naptári azonosító",
      "Period / Total": "Periódus / teljes",
      days: "napok",
      "Clear of Holidays Data": "Tiszta az ünnepi adatoktól",
      "Select the Calendar": "Válassza ki a naptárat",
      "Holidays Color": "Ünnepnapok színe",
      "Now Loading": "Most betöltve",
      Saved: "Mentett",
      "Restore to Default. Are you sure?":
        "Visszaállítás az alapértelmezett értékre. biztos vagy ebben?",
      "Settings was restored to default.":
        "A beállításokat alapértelmezettre visszaállították.",
      Light: "Fény",
      Dark: "Sötét",
    },
    hr: {
      "Restore to Default": "Vratite se u zadanu",
      "Donate to developer": "Donirajte programeru",
      Close: "Zatvoriti",
      "Day of the Week": "Dan u tjednu",
      Holidays: "Praznici",
      "Font Color": "Boja fonta",
      "Border Color": "Boja obruba",
      "Background Color": "Boja pozadine",
      "Accent Color": "Akcentna boja",
      Enable: "Omogućiti",
      Today: "Danas",
      Sunday: "nedjelja",
      Monday: "ponedjeljak",
      Tuesday: "utorak",
      Wednesday: "srijeda",
      Thursday: "četvrtak",
      Friday: "petak",
      Saturday: "subota",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Napomena: Podaci o prazniku čitaju se 3 godine prije i poslije i spremaju se u preglednik.",
      "Select the Holidays Calendar": "Odaberite kalendar za odmor",
      "by Google's": "od Google's",
      "Select and Import": "Odaberite i uvoz",
      "Calendar Name": "Ime kalendara",
      "Calendar ID": "ID kalendara",
      "Period / Total": "Razdoblje / ukupno",
      days: "dani",
      "Clear of Holidays Data": "ODALJENI OD PODATAKA",
      "Select the Calendar": "Odaberite kalendar",
      "Holidays Color": "Praznici boja",
      "Now Loading": "Učitava se",
      Saved: "Spreman",
      "Restore to Default. Are you sure?": "Vratite u zadani. Jesi li siguran?",
      "Settings was restored to default.": "Postavke su obnovljene u zadani.",
      Light: "Svjetlo",
      Dark: "tamno",
    },
    hi: {
      "Restore to Default": "पुन: मूल रूप में सहेजे",
      "Donate to developer": "डेवलपर को दान करें",
      Close: "बंद करना",
      "Day of the Week": "सप्ताह का दिन",
      Holidays: "छुट्टियां",
      "Font Color": "लिपि का रंग",
      "Border Color": "सीमा रंग",
      "Background Color": "पृष्ठभूमि का रंग",
      "Accent Color": "स्वरोंका रंग",
      Enable: "सक्षम",
      Today: "आज",
      Sunday: "रविवार",
      Monday: "सोमवार",
      Tuesday: "मंगलवार",
      Wednesday: "बुधवार",
      Thursday: "गुरुवार",
      Friday: "शुक्रवार",
      Saturday: "शनिवार",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "नोट: छुट्टी डेटा को 3 साल पहले और बाद में पढ़ा जाता है और ब्राउज़र में सहेजा जाता है।",
      "Select the Holidays Calendar": "छुट्टियों के कैलेंडर का चयन करें",
      "by Google's": "Google द्वारा",
      "Select and Import": "चयन करें और आयात करें",
      "Calendar Name": "कैलेंडर नाम",
      "Calendar ID": "कैलेंडर आईडी",
      "Period / Total": "अवधि / कुल",
      days: "दिन",
      "Clear of Holidays Data": "छुट्टियों के आंकड़ों से साफ",
      "Select the Calendar": "कैलेंडर का चयन करें",
      "Holidays Color": "छुट्टियों का रंग",
      "Now Loading": "अभी लोड किया जा रहा है",
      Saved: "बचाया",
      "Restore to Default. Are you sure?":
        "पुन: मूल रूप में सहेजे। क्या आपको यकीन है?",
      "Settings was restored to default.":
        "सेटिंग्स को डिफ़ॉल्ट रूप से बहाल किया गया था।",
      Light: "रोशनी",
      Dark: "अँधेरा",
    },
    fr: {
      "Restore to Default": "Rétablir les options par défaut",
      "Donate to developer": "Faire un don au développeur",
      Close: "Fermer",
      "Day of the Week": "Jour de la semaine",
      Holidays: "Vacances",
      "Font Color": "Couleur de la police",
      "Border Color": "Couleur de la bordure",
      "Background Color": "Couleur de l'arrière plan",
      "Accent Color": "Couleur accent",
      Enable: "Activer",
      Today: "Aujourd'hui",
      Sunday: "Dimanche",
      Monday: "Lundi",
      Tuesday: "Mardi",
      Wednesday: "Mercredi",
      Thursday: "Jeudi",
      Friday: "Vendredi",
      Saturday: "Samedi",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Remarque: Les données de vacances sont lues pendant 3 ans avant et après et enregistrées dans le navigateur.",
      "Select the Holidays Calendar": "Sélectionnez le calendrier des vacances",
      "by Google's": "par Google",
      "Select and Import": "Sélectionner et importer",
      "Calendar Name": "Nom du calendrier",
      "Calendar ID": "ID du calendrier",
      "Period / Total": "Période / total",
      days: "jours",
      "Clear of Holidays Data": "Génération des données de vacances",
      "Select the Calendar": "Sélectionnez le calendrier",
      "Holidays Color": "Couleur des vacances",
      "Now Loading": "En cours de chargement",
      Saved: "Enregistré",
      "Restore to Default. Are you sure?":
        "Rétablir les options par défaut. Es-tu sûr?",
      "Settings was restored to default.":
        "Les paramètres ont été restaurés par défaut.",
      Light: "Lumière",
      Dark: "Sombre",
    },
    fi: {
      "Restore to Default": "Palauta laiminlyöntiin",
      "Donate to developer": "Lahjoita kehittäjälle",
      Close: "kiinni",
      "Day of the Week": "Viikonpäivä",
      Holidays: "Loma",
      "Font Color": "Fontin väri",
      "Border Color": "Reunuksen väri",
      "Background Color": "Taustaväri",
      "Accent Color": "Korostusväri",
      Enable: "ota käyttöön",
      Today: "Tänään",
      Sunday: "sunnuntai",
      Monday: "maanantai",
      Tuesday: "tiistai",
      Wednesday: "keskiviikko",
      Thursday: "torstai",
      Friday: "perjantai",
      Saturday: "Lauantai",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Huomaa: Lomatiedot luetaan 3 vuotta ennen ja jälkeen ja tallennetaan selaimeen.",
      "Select the Holidays Calendar": "Valitse lomakalenteri",
      "by Google's": "Googlen",
      "Select and Import": "Valitse ja tuonti",
      "Calendar Name": "Kalenterin nimi",
      "Calendar ID": "Kalenteritunnus",
      "Period / Total": "Ajanjakso / yhteensä",
      days: "päivä",
      "Clear of Holidays Data": "Vapaapäiviä",
      "Select the Calendar": "Valitse kalenteri",
      "Holidays Color": "Lomien väri",
      "Now Loading": "Lataa",
      Saved: "Pelastettu",
      "Restore to Default. Are you sure?":
        "Palauta oletusarvoon. Oletko varma?",
      "Settings was restored to default.":
        "Asetukset palautettiin oletusarvoon.",
      Light: "Kevyt",
      Dark: "Tumma",
    },
    es: {
      "Restore to Default": "Restaurar a los valores predeterminados",
      "Donate to developer": "Donar al desarrollador",
      Close: "Cerca",
      "Day of the Week": "Día de la semana",
      Holidays: "Vacaciones",
      "Font Color": "Color de fuente",
      "Border Color": "Color del borde",
      "Background Color": "Color de fondo",
      "Accent Color": "Acentuar el color",
      Enable: "Permitir",
      Today: "Hoy",
      Sunday: "Domingo",
      Monday: "Lunes",
      Tuesday: "Martes",
      Wednesday: "Miércoles",
      Thursday: "Jueves",
      Friday: "Viernes",
      Saturday: "Sábado",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Nota: Los datos de vacaciones se leen durante 3 años antes y después y se guarda en el navegador.",
      "Select the Holidays Calendar": "Seleccione el calendario de vacaciones",
      "by Google's": "por Google's",
      "Select and Import": "Seleccionar e importar",
      "Calendar Name": "Nombre del calendario",
      "Calendar ID": "ID de calendario",
      "Period / Total": "Período / total",
      days: "días",
      "Clear of Holidays Data": "Limpiado de los datos de vacaciones",
      "Select the Calendar": "Seleccione el calendario",
      "Holidays Color": "Color de vacaciones",
      "Now Loading": "Cargando",
      Saved: "Salvado",
      "Restore to Default. Are you sure?":
        "Restaurar a los valores predeterminados. ¿Está seguro?",
      "Settings was restored to default.":
        "La configuración se restauró al valor predeterminado.",
      Light: "Luz",
      Dark: "Oscuro",
    },
    el: {
      "Restore to Default": "Επαναφορά στην προεπιλογή",
      "Donate to developer": "Δωρίστε στον προγραμματιστή",
      Close: "Κλείσε",
      "Day of the Week": "Ημέρα της εβδομάδας",
      Holidays: "Διακοπές",
      "Font Color": "Γραμματοσειρά",
      "Border Color": "Χρώμα πλαισίου",
      "Background Color": "Χρώμα του φόντου",
      "Accent Color": "Έμφαση στο χρώμα",
      Enable: "επιτρέπω",
      Today: "Σήμερα",
      Sunday: "Κυριακή",
      Monday: "Δευτέρα",
      Tuesday: "Τρίτη",
      Wednesday: "Τετάρτη",
      Thursday: "Πέμπτη",
      Friday: "Παρασκευή",
      Saturday: "Σάββατο",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Σημείωση: Τα δεδομένα των διακοπών διαβάζονται για 3 χρόνια πριν και μετά και αποθηκεύονται στο πρόγραμμα περιήγησης.",
      "Select the Holidays Calendar": "Επιλέξτε το ημερολόγιο διακοπών",
      "by Google's": "από την Google's",
      "Select and Import": "Επιλέξτε και εισαγωγή",
      "Calendar Name": "Όνομα ημερολογίου",
      "Calendar ID": "Αναγνωριστικό ημερολογίου",
      "Period / Total": "Περίοδος / σύνολο",
      days: "ημέρες",
      "Clear of Holidays Data": "Δεδομένα των διακοπών",
      "Select the Calendar": "Επιλέξτε το ημερολόγιο",
      "Holidays Color": "Χρώμα διακοπών",
      "Now Loading": "Φορτώνει",
      Saved: "Αποθηκευμένος",
      "Restore to Default. Are you sure?":
        "Επαναφορά στην προεπιλογή. Είσαι σίγουρος?",
      "Settings was restored to default.":
        "Οι ρυθμίσεις αποκαταστάθηκαν στην προεπιλογή.",
      Light: "Φως",
      Dark: "Σκοτάδι",
    },
    de: {
      "Restore to Default": "Zurück zu Werkeinstellungen",
      "Donate to developer": "Spenden Sie dem Entwickler",
      Close: "Schließen",
      "Day of the Week": "Wochentag",
      Holidays: "Feiertage",
      "Font Color": "Schriftfarbe",
      "Border Color": "Randfarbe",
      "Background Color": "Hintergrundfarbe",
      "Accent Color": "Akzentfarbe",
      Enable: "Aktivieren",
      Today: "Heute",
      Sunday: "Sonntag",
      Monday: "Montag",
      Tuesday: "Dienstag",
      Wednesday: "Mittwoch",
      Thursday: "Donnerstag",
      Friday: "Freitag",
      Saturday: "Samstag",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Hinweis: Die Urlaubsdaten werden vor und nach 3 Jahren gelesen und im Browser gespeichert.",
      "Select the Holidays Calendar": "Wählen Sie den Urlaubskalender aus",
      "by Google's": "von Google",
      "Select and Import": "Wählen und importieren",
      "Calendar Name": "Kalendername",
      "Calendar ID": "Kalender -ID",
      "Period / Total": "Periode / Gesamt",
      days: "Tage",
      "Clear of Holidays Data": "Freien von Feiertagsdaten",
      "Select the Calendar": "Wählen Sie den Kalender aus",
      "Holidays Color": "Feiertage Farbe",
      "Now Loading": "Lädt",
      Saved: "Gerettet",
      "Restore to Default. Are you sure?":
        "Zurück zu Werkeinstellungen. Bist du sicher?",
      "Settings was restored to default.":
        "Die Einstellungen wurden zu Standardeinstellungen wiederhergestellt.",
      Light: "Licht",
      Dark: "Dunkel",
    },
    da: {
      "Restore to Default": "Gendan til standard",
      "Donate to developer": "Doner til udvikleren",
      Close: "Tæt",
      "Day of the Week": "Dag i ugen",
      Holidays: "Helligdage",
      "Font Color": "Skrift farve",
      "Border Color": "Grænsefarve",
      "Background Color": "Baggrundsfarve",
      "Accent Color": "Accentfarve",
      Enable: "Aktivér",
      Today: "I dag",
      Sunday: "Søndag",
      Monday: "Mandag",
      Tuesday: "tirsdag",
      Wednesday: "onsdag",
      Thursday: "torsdag",
      Friday: "Fredag",
      Saturday: "lørdag",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "BEMÆRK: Ferie data læses i 3 år før og efter og gemmes i browseren.",
      "Select the Holidays Calendar": "Vælg Holidage -kalenderen",
      "by Google's": "af Googles",
      "Select and Import": "Vælg og importer",
      "Calendar Name": "Kalendernavn",
      "Calendar ID": "Kalender ID",
      "Period / Total": "Periode / i alt",
      days: "dage",
      "Clear of Holidays Data": "Fri for data om helligdage",
      "Select the Calendar": "Vælg kalenderen",
      "Holidays Color": "Ferie farve",
      "Now Loading": "Indlæser nu",
      Saved: "Gemt",
      "Restore to Default. Are you sure?": "Gendan til standard. Er du sikker?",
      "Settings was restored to default.":
        "Indstillinger blev gendannet til standard.",
      Light: "Lys",
      Dark: "Mørk",
    },
    cs: {
      "Restore to Default": "Obnovit do výchozího nastavení",
      "Donate to developer": "Darujte vývojáři",
      Close: "Zavřít",
      "Day of the Week": "Den v týdnu",
      Holidays: "Dovolená",
      "Font Color": "Barva fontu",
      "Border Color": "Barva hranic",
      "Background Color": "Barva pozadí",
      "Accent Color": "Barva zvýraznění",
      Enable: "Umožnit",
      Today: "Dnes",
      Sunday: "Neděle",
      Monday: "pondělí",
      Tuesday: "úterý",
      Wednesday: "středa",
      Thursday: "Čtvrtek",
      Friday: "pátek",
      Saturday: "sobota",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Poznámka: Údaje o dovolené se čte po dobu 3 let před a po a ukládá se v prohlížeči.",
      "Select the Holidays Calendar": "Vyberte kalendář svátků",
      "by Google's": "od Google",
      "Select and Import": "Vyberte a importujte",
      "Calendar Name": "Název kalendáře",
      "Calendar ID": "ID kalendáře",
      "Period / Total": "Období / celkový počet",
      days: "dny",
      "Clear of Holidays Data": "Zjednodušeně řečeno",
      "Select the Calendar": "Vyberte kalendář",
      "Holidays Color": "Svátky barvy",
      "Now Loading": "Nyní načítání",
      Saved: "Uložené",
      "Restore to Default. Are you sure?": "Obnovit výchozí. Jsi si jistá?",
      "Settings was restored to default.":
        "Nastavení bylo obnoveno do výchozího nastavení.",
      Light: "Světlo",
      Dark: "Tmavý",
    },
    ca: {
      "Restore to Default": "Restaureu a Default",
      "Donate to developer": "Dona al desenvolupador",
      Close: "Tanca",
      "Day of the Week": "Dia de la setmana",
      Holidays: "Vacances",
      "Font Color": "Color de la lletra",
      "Border Color": "Color fronterer",
      "Background Color": "Color de fons",
      "Accent Color": "Color d’accent",
      Enable: "Capacitar",
      Today: "Avui",
      Sunday: "Diumenge",
      Monday: "Dilluns",
      Tuesday: "Dimarts",
      Wednesday: "Dimecres",
      Thursday: "Dijous",
      Friday: "Divendres",
      Saturday: "Dissabte",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Nota: les dades de vacances es llegeixen durant 3 anys abans i després i es guarden al navegador.",
      "Select the Holidays Calendar": "Seleccioneu el calendari de vacances",
      "by Google's": "per Google's",
      "Select and Import": "Seleccioneu i importeu",
      "Calendar Name": "Nom del calendari",
      "Calendar ID": "ID del calendari",
      "Period / Total": "Període / total",
      days: "dies",
      "Clear of Holidays Data": "Dades de vacances",
      "Select the Calendar": "Seleccioneu el calendari",
      "Holidays Color": "Color de vacances",
      "Now Loading": "Ara carregant",
      Saved: "Guardat",
      "Restore to Default. Are you sure?":
        "Restaureu a predeterminat. Estàs segur?",
      "Settings was restored to default.":
        "La configuració es va restablir per defecte.",
      Light: "Llum",
      Dark: "Fosc",
    },
    bg: {
      "Restore to Default": "Възстановяване по подразбиране",
      "Donate to developer": "Дарете на разработчик",
      Close: "Близо",
      "Day of the Week": "Ден от седмицата",
      Holidays: "Почивни дни",
      "Font Color": "Цвят на шрифта",
      "Border Color": "Цвят на границата",
      "Background Color": "Цвят на фона",
      "Accent Color": "Цвят на акцент",
      Enable: "Активиране",
      Today: "Днес",
      Sunday: "Неделя",
      Monday: "Понеделник",
      Tuesday: "Вторник",
      Wednesday: "Сряда",
      Thursday: "Четвъртък",
      Friday: "Петък",
      Saturday: "Събота",
      "NOTE: Holiday data is read for 3 years before and after, and saved in the browser.":
        "Забележка: Данните за празника се четат 3 години преди и след и се запазват в браузъра.",
      "Select the Holidays Calendar": "Изберете календара на празниците",
      "by Google's": "от Google's",
      "Select and Import": "Изберете и импортирайте",
      "Calendar Name": "Име на календара",
      "Calendar ID": "ID на календара",
      "Period / Total": "Период / общо",
      days: "дни",
      "Clear of Holidays Data": "Данни за празнични ваканции",
      "Select the Calendar": "Изберете календара",
      "Holidays Color": "Цвят на празниците",
      "Now Loading": "Сега се зарежда",
      Saved: "Запазени",
      "Restore to Default. Are you sure?":
        "Възстановяване по подразбиране. Сигурен ли си?",
      "Settings was restored to default.":
        "Настройките бяха възстановени по подразбиране.",
      Light: "светлина",
      Dark: "Тъмно",
    },
  },
  Oe = ((e, ...t) => {
    const a =
      1 === e.length
        ? e[0]
        : t.reduce(
            (t, a, o) =>
              t +
              ((e) => {
                if (!0 === e._$cssResult$) return e.cssText;
                if ("number" == typeof e) return e;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    e +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
                );
              })(a) +
              e[o + 1],
            e[0],
          );
    return new n(a, e, o);
  })`[hidden] {    display:none !important;}* {    box-sizing: border-box;}:host {    display: contents;    color: #333;    font-size: 14px;    text-rendering: geometricPrecision;    -webkit-font-smoothing: antialiased;    --speed: 240ms;    transition: display var(--speed) allow-discrete;    @media (prefers-reduced-motion: reduce) {        --speed: 0ms;    }}:host(:not([open])) {    display: none;}@starting-style {    :host([open]) {        display: contents;    }}.dialog {    view-transition-name: "gcz-setting";    font-family: -apple-system, "Google Sans Text", "Google Sans", Helvetica, Arial, "Segoe UI Emoji", "Segoe UI Symbol", "Noto Emoji", sans-serif;    color: inherit;    pointer-events: none;    background-color: transparent;    justify-content: center;    align-items: flex-start;    position: fixed;    z-index: 99999;    inset: 0;    width: auto;    height: auto;    max-width: none;    max-height: none;    margin: 0;    padding: 0;    border: 0;    opacity: 0;    scale: 0.92;    transition:        display var(--speed) allow-discrete,        opacity var(--speed),        scale var(--speed);    &::backdrop {        pointer-events: none;        background-color: rgba(0,0,0,0.32);    }    &[open] {        display: flex;        opacity: 1;        scale: 1;    }    @starting-style {        &[open] {            display: flex;            opacity: 0;            scale: 0.96;        }    }}.container {    display: flex;    flex-wrap: nowrap;    flex-direction: column;    pointer-events: auto;    position: relative;    border-radius: 16px;    margin: 24px;    width: 640px;    max-height: calc(100dvh - 48px);    box-shadow:        0 3px 16px -8px rgba(0, 0, 0, 0.2),        0 1px 4px -2px rgba(0, 0, 0, 0.5);}.extention-name {    font-size: 140%;    display: inline-block;    color: #D2E5EA;    margin: 0;    text-shadow: 0 1px 0 rgba(0,0,0,0.3);}.version {    vertical-align: super;    font-size: x-small;    margin: 0 0 0 1em;    opacity: .5;}.header {    padding: 18px 24px 0 24px;    background: #505B66;    color: #fff;    border-top-left-radius: inherit;    border-top-right-radius: inherit;    position:relative;    .sub {        position: absolute;        top: 10px;        right: 10px;        font-size: 12px;        display: inline-flex;        flex-wrap: nowrap;        align-items: center;        gap: 8px;    }    .h-btn {        border-radius: 999px;        background-color: #5e7696;        line-height: 1;        margin:0;        padding: 6px 12px;        box-shadow: 0 1px 1px rgba(0,0,0,0.3), inset 0 1px 0px rgba(255,255,255,0.1);        text-shadow: 0px 1px rgba(0,0,0,0.3);        border: 0;        cursor:pointer;        font-size: inherit;        text-decoration: none;        color: #fff;    }    .close {        border: 0;        background-color: inherit;        color: #fff;        border: 1px solid #ffffff52;        border-radius: 999px;        width: 24px;        height: 24px;        display: inline-flex;        justify-content: center;        align-items: center;        font-size: 16px;        line-height: 0;        font-family: monospace;        cursor: pointer;        transition: all .3s;    }    .close:hover {        background-color: #e9eff4;        color: #4f5c66;    }}.menu {    display: flex;    margin: 0;    padding: 0;    list-style: none;    align-items: stretch;    align-content: center;    flex-wrap: nowrap;    flex-direction: row;    justify-content: flex-start;    gap: 8px;    margin-top: 16px;    & li {        display: flex;        align-items: center;        justify-content: center;        min-width: 32%;        text-align: center;        background-color: #f1f1f1;        color: #4f5c66;        border-top-left-radius: 8px;        border-top-right-radius: 8px;        padding: 8px 1em 2px;        opacity: .5;        font-weight: bold;        outline: 0;        cursor: pointer;    }    & li.active_1 {        opacity: 1;    }}.dialog[data-size='small'] {    justify-content: flex-end;    flex-direction: row;    align-items: flex-start;    &::backdrop {        opacity: 0;    }    .header {        padding: 10px 24px;        border-radius: inherit;    }    .header .menu,    .cont.of-week,    .cont.of-holiday {        display: none;    }    .container {        width: calc(100% - 264px);        margin: 62px 0px 0px 0px;        box-shadow: none;        &[data-toolbar='true'] {            padding-right: 54px;        }        &[data-week-no='true'] {            padding-left: 24px;        }    }    .cont.of-small,    .cont.of-etc {        padding: 0;        background-color: transparent;        .color {            min-width: 0;            margin-right: 0;            height: auto;            border: 0;            padding: 1px;            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);            &:after {                content: none;            }        }        .row-week,        .row-etc {            display: flex;            flex-wrap: nowrap;            justify-content: space-around;            flex-direction: row;            gap: 8px;            padding: 0px 4px;            fieldset {                display: flex;                justify-content: center;                padding: 4px 0 0 0;                border: 0;                margin: 0;                span {                    margin: 0 2px;                }            }            &[data-week-end='false'] {                [data-wid='0'],                [data-wid='6'] {                    display: none;                }            }        }        .row-etc {            justify-content: center;            gap: 24px;            fieldset {                span {                    margin: 0 16px;                }            }        }    }}strong[data-total] {    color: #0f74af;}strong[data-total='0'] {    color: #cc0000;}hr {    border: 0;    border-top: 1px solid #ccc;    margin: 1em 0;}select,input,button {    &:disabled,    &[disabled] {        cursor: not-allowed;    }}.cont {    padding: 20px 24px;    overflow: auto;    background-color: #f1f1f1;    border-bottom-left-radius: inherit;    border-bottom-right-radius: inherit;}.note {    font-size: 12px;    margin: 0 0 1em;}fieldset {    border: 1px solid #d8d8d8;    border-radius: 8px;    padding: 0px 16px 12px 16px;    margin: 8px 0;    line-height: 2;    span {        display: inline-block;        margin: 0 .5em 0 0;;        vertical-align: middle;    }    label {        display: inline-block;        margin-right: 4px;    }}fieldset:hover,fieldset:focus-within {    border-color: #909090;}legend {    padding: 0 8px;    color: #6f6f6f;    font-weight: bold;}.label {    display: inline-flex;    align-items: center;    vertical-align: middle;    cursor: pointer;}.radio {    accent-color: #394fff;    outline: 0;    display: inline-block;    vertical-align: middle;    margin: 0 4px 2px 0;}.select {    background-color: #fff;    color: #333;    outline: 0;    display: inline-block;    vertical-align: middle;    border: 1px solid #ccc;    border-radius: 5px;    line-height: 24px;    height: 24px;    margin: 2px 0;    border-bottom-color: #aaa;    padding: 0 4px;    cursor: pointer;}.ipt {    color: #333;    outline: 0;    display: inline-block;    vertical-align: middle;    border: 1px solid #ccc;    border-radius: 5px;    line-height: 24px;    height: 24px;    margin: 2px 0;    padding: 0 8px;    appearance: none;    box-shadow: inset 0 1px 2px rgba(0,0,0,0.08);    background-color: #f9f9f9;}.select:disabled,.ipt:disabled {    opacity: 1;    background-color: #ddd;}:host {    --felm-cr-size                        : 16px;    --felm-cr-checkbox-border-radius      :  3px;    --felm-cr-radio-border-radius         : 16px;    --felm-cr-border_unchecked            : 1px solid #d4d4d8;    --felm-cr-background_unchecked        : #f9fafb;    --felm-cr-outline_focus               : 3px solid rgba(0, 140, 255, 0.2);    --felm-cr-border-color_unchecked_focus: #2563eb;    --felm-cr-background_unchecked_focus  : #fff;    --felm-cr-background_checked          : #3b82f6;    --felm-cr-background_checked_focus    : #60a5fa;    --radio-checked-marker                : url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj4KICA8ZyBpZD0i44Kw44Or44O844OXXzY1MiIgZGF0YS1uYW1lPSLjgrDjg6vjg7zjg5cgNjUyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjcxIDI3KSI+CiAgICA8cmVjdCBpZD0i6ZW35pa55b2iXzM4NSIgZGF0YS1uYW1lPSLplbfmlrnlvaIgMzg1IiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY3MSAtMjcpIiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBpZD0i6ZW35pa55b2iXzM4NiIgZGF0YS1uYW1lPSLplbfmlrnlvaIgMzg2IiBkPSJNMSwwSDFBMSwxLDAsMCwxLDIsMVY5YTEsMSwwLDAsMS0xLDFIMGEwLDAsMCwwLDEsMCwwVjFBMSwxLDAsMCwxLDEsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY4MS4zOTkgLTI1LjUzNikgcm90YXRlKDQ1KSIgZmlsbD0iI2ZmZiIvPgogICAgPHBhdGggaWQ9IumVt+aWueW9ol8zODciIGRhdGEtbmFtZT0i6ZW35pa55b2iIDM4NyIgZD0iTTEsMEgxQTEsMSwwLDAsMSwyLDFWNkEwLDAsMCwwLDEsMiw2SDFBMSwxLDAsMCwxLDAsNVYxQTEsMSwwLDAsMSwxLDBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NzEuNSAtMjEuMjkzKSByb3RhdGUoLTQ1KSIgZmlsbD0iI2ZmZiIvPgogIDwvZz4KPC9zdmc+Cg==');    --checkbox-checked-marker             : url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiIHZpZXdCb3g9IjAgMCA2IDYiPgogIDxjaXJjbGUgaWQ9IualleWGhuW9ol8xNSIgZGF0YS1uYW1lPSLmpZXlhoblvaIgMTUiIGN4PSIzIiBjeT0iMyIgcj0iMyIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4K');}.checkbox,.radio {    appearance: none;    display: inline-block;    outline: 0;    outline-offset: 0;    margin: -2px 4px 0 0;    width           : var(--felm-cr-size);    height          : var(--felm-cr-size);    border          : var(--felm-cr-border_unchecked);    background-color: var(--felm-cr-background_unchecked);    background-image: none;    background-position: 50% 50%;    background-repeat: no-repeat;    transition: all .16s;    print-color-adjust: exact;    cursor: inherit;    &:not(:disabled):focus {        outline: var(--felm-cr-outline_focus);    }    &:not(:disabled):focus,    &:not(:disabled):hover{        border-color    : var(--felm-cr-border-color_unchecked_focus);        background-color: var(--felm-cr-background_unchecked_focus);    }    &:checked,    &:is(.checkbox):indeterminate {        border-color    : transparent;        background-color: var(--felm-cr-background_checked);        &:not(:disabled):focus,        &:not(:disabled):hover{            border-color    : transparent;            background-color: var(--felm-cr-background_checked_focus);        }    }    &:not(:disabled):active{        box-shadow: inset 0px 1px 3px rgba(0,0,0,0.1) !important;    }}.checkbox {    border-radius: var(--felm-cr-checkbox-border-radius);    &:checked {        background-image: var(--radio-checked-marker);    }}.radio{    border-radius: var(--felm-cr-radio-border-radius);    &:checked{        background-image: var(--checkbox-checked-marker);    }}.radio-segmented {    display: inline-flex;    position: relative;    line-height: 1;    font-size: 0;    border-radius: 5px;    vertical-align: middle;    background-color: #e4e4e4;    padding: 4px;    & > *:not(:first-child):not(:last-child) {        margin: 0 2px;        .holder {            margin: 0 2px;        }    }    .holder {        &:not(:last-child) span {            margin-right: 2px;        }        padding: 0;        margin: 0;        display: inline-flex;        span {            display: block;            text-align: center;            min-width: 8em;            font-size: 14px;            height: 24px;            line-height: 24px;            background-color: transparent;            position: relative;            color: #7d7d7d;            transition: all .2s;            border-radius: 3px;            padding: 0 1em;            margin: 0;            cursor: pointer;        }        .radio {            z-index: -1;            opacity: 0;            position: absolute;            left: 0;            top: 0;            &:not(:disabled):focus ~ span,            &:not(:disabled):hover ~ span{                color: #333333;            }            &:checked ~ span {                color: #333333;                background-color: #ffffff;                box-shadow: 0 1px 2px rgba(0,0,0,.2), 0 0px 1px rgba(0,0,0,.3);            }            &:not(:disabled):active ~ span,            &:not(:disabled):checked:focus ~ span {                box-shadow: 0px 0px 0px 2px rgba(0, 140, 255, 0.6);            }            &:disabled ~ span {                color: #848484;                cursor: not-allowed;            }            &:disabled:checked ~ span {                color: #6f6f6f;                background-color: #f1f1f1;                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);            }        }    }}.radio-segmented.of-small {    background-color:rgba(0,0,0,0.3);    border-radius: 999px;    padding: 2px;    .holder {        span {            min-width: 2em;            padding: 0 0 ;            font-size: 13px;            height: 20px;            line-height: 21px;            border-radius: 999px;        }        :checked ~ span {            background-color: #5f7696;        }    }}.color {    color: #333;    display: inline-flex;    align-items: center;    vertical-align: middle;    border: 1px solid #ccc;    background-color: #f9f9f9;    padding: 3px;    box-sizing: border-box;    width: auto;    min-width: 8em;    height: 24px;    border-radius: 3px;    outline: 0;    cursor: pointer;    margin-right: 1em;    position: relative;    &:disabled,    &[disabled] {        &:before {            content: "";            display: inline-block;            width: 20px;            height: 2px;            background-color: #cc0000;            transform: rotate(-45deg);            position: absolute;            left: -1px;            top: 8px;            border-radius: 99px;        }    }    &:after {        content: attr(data-value);        font-family: "Courier New", Courier, monospace;        font-size: 12px;        display: inline-block;        margin-left: 4px;        -webkit-font-smoothing: auto;        font-smoothing: auto;    }    &::-webkit-color-swatch-wrapper {        padding: 0;        width: 16px;        height: 16px;    }    &::-webkit-color-swatch {        box-shadow: inset 0px 0px 0px 1px rgba(0,0,0,0.16);        border: 0;        border-radius: 2px;        width: 16px;        box-sizing: border-box;        height: 16px;    }}.checkbox-switch {    outline: 0;    appearance: none;    display: inline-flex;    outline: 0;    outline-offset: 0;    margin: 0px 4px;    vertical-align: middle;    width: 32px;    height: 18px;    background-color: #cbd5e1;    border-radius: 999px;    align-items: center;    border: 1px solid transparent;    transition: all .2s;    cursor: pointer;    &:after {        content: "";        width: 12px;        height: 12px;        border-radius: 999px;        background-color: #fff;        margin: 2px;        box-shadow: 0 1px 1px rgb(0,0,0,0.2), 0 0px 1px 0 rgb(0,0,0,0.5);        transform: translateX(0px);        transition: all .2s;    }    &:checked {        background-color: #3b82f6;    }    &:checked:after {        transform: translateX(14px);    }}.buttons {    margin: 2px 0% 2px 0%;    display: flex;    justify-content: flex-end;    gap: 8px;}.btn {    font-family: inherit;    color: #333;    outline: 0;    appearance: none;    background-color: #f6faff;    border: 1px solid #d7d9db;    border-bottom-color: #b0b5ba;    border-radius: 5px;    padding: 0 18px;    line-height: 22px;    cursor: pointer;    transition: all .2s;    &:enabled:active {        background-color: #eceef3;        border: 1px solid #caced2;        border-bottom-color: #b0b5ba;        box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.1);    }    &:disabled {        opacity: .5;    }}.table,.table-today {    position: relative;    line-height: 1.286;    overflow: hidden;    border: none;    border-collapse: separate;    border-spacing: 0px 2px;}.table {    th,    td {        padding: 3px 8px;        text-align: left;        position: relative;    }    th {        color: #37414f;        background-color: #ddddde;        font-weight: normal;        white-space: nowrap;    }    td {        color: #111827;        word-break: break-all;    }}.datas {    position: relative;}.loading {    position: absolute;    left: 50%;    top: 50%;    transform: translate(-50%, -50%);    background-color: #fff;    padding: 16px;    border-radius: 10px;    border: 3px solid #447ae4;    box-shadow: 0 3px 20px rgba(0,0,0,0.4);}.progress {    width: 200px;    height: 10px;    margin-top: 10px;    background-color: #d4dce2;    position: relative;    border-radius: 999px;    box-shadow: inset 0 1px 0px rgba(0, 0, 0, 0.1);    &:after {        content: "";        display: block;        width: var(--width);        height: inherit;        background-color: #0658e8;        border-radius: inherit;        background-image: linear-gradient(            45deg,            transparent 30%,            rgba(255, 255, 255, 0.3) 30%,            rgba(255, 255, 255, 0.3) 50%,            transparent 50%,            transparent 80%,            rgba(255, 255, 255, 0.3) 80%        );        background-size: 28px 28px;        animation: gcalize-anim-progress-bar 18s linear infinite;        transition: width linear .3s;    }}.gcalize-notify {    display:block;    position:absolute;    left: 6%;    top: 10px;    line-height: 1;    padding: 8px 16px;    border: 3px solid #447ae4;    background-color: #fff;    border-radius: 999px;    box-shadow: 0 3px 20px rgba(0,0,0,0.4);    color: #333;    pointer-events:none;    user-select: none;}.menu li:focus-visible,.color:focus-visible,.color:focus,.checkbox-switch:focus-visible,.radio:focus-visible,.ipt:focus-visible,.select:focus-visible,.btn:focus-visible {    outline: 2px solid rgba(0, 140, 255, 0.7);    outline-offset: 1px;}@keyframes gcalize-anim-progress-bar {    0% {        background-position: 0;    }    100% {        background-position: 999px;    }}`;
var We = Object.defineProperty,
  Ge = Object.getOwnPropertyDescriptor,
  Ue = (e, t, a, o) => {
    for (
      var r, n = o > 1 ? void 0 : o ? Ge(t, a) : t, i = e.length - 1;
      i >= 0;
      i--
    )
      (r = e[i]) && (n = (o ? r(t, a, n) : r(n)) || n);
    return (o && n && We(t, a, n), n);
  };
const Ve = "gcalize-setteing";
let Ye = document.documentElement.lang;
function Ke(e) {
  return (Ye && Re[Ye] && Re[Ye][e]) || e;
}
let Ze,
  qe = class extends re {
    constructor() {
      (super(...arguments),
        (this.open = !1),
        (this.size = "default"),
        (this.activeMenu = [1, 0]),
        (this.manifest = {}),
        (this.holidaysList = []),
        (this.config = null),
        (this.holidays = null),
        (this.view = {
          startWeek: -1,
          showWeekNo: !1,
          showWeekEnd: !0,
          showToolbar: !0,
          activeView: "",
          themeColor: "",
          todayID: 0,
          todayYMD: "",
          todayYM1: "",
        }),
        (this._timer = null));
    }
    async init() {
      return (
        (this.view.startWeek = await we()),
        this.updateViewData(),
        -1 !== this.view.startWeek
      );
    }
    updateViewData() {
      const { view: e } = this;
      ((e.showWeekNo = (function () {
        var e;
        const t = Ce();
        return (
          ((null == (e = null == t ? void 0 : t.children)
            ? void 0
            : e.length) ?? 100) > 7
        );
      })()),
        (e.showWeekEnd = (function () {
          var e;
          const t = ve(
            "[role='main']>[data-view-heading]>[role='grid']>[role='presentation']>[role='row']>[aria-hidden][jsname",
          );
          return (
            ((null == (e = null == t ? void 0 : t.children)
              ? void 0
              : e.length) ?? 1) > 5
          );
        })()),
        (e.showToolbar = (function () {
          const e = ve("[data-keeps-details-open][role='complementary']");
          return !!e && "none" !== e.style.display;
        })()),
        (e.activeView = Ee()),
        (e.themeColor = _e()));
      const t = new Date();
      ((e.todayYMD = Me(t)),
        (e.todayID = je(e.todayYMD)),
        t.setUTCDate(1),
        (e.todayYM1 = Me(t)));
    }
    async performUpdate() {
      if (!document.startViewTransition || !this._viewTransition)
        return super.performUpdate();
      ((this._viewTransition = document.startViewTransition(
        async () => await super.performUpdate(),
      )),
        await this._viewTransition.updateCallbackDone,
        (this._viewTransition = !1));
    }
    startViewTransition() {
      return ((this._viewTransition = !0), this._viewTransition);
    }
    getOptions() {
      return {
        config: structuredClone(this.config),
        holidays: structuredClone(this.holidays),
        view: structuredClone(this.view),
      };
    }
    show() {
      super.requestUpdate();
      const { dialog: e } = this;
      return (
        !this.open &&
        ((this.open = !0),
        e.showModal(),
        ze(this, "show"),
        De(Te(e)).then(() => !0 === this.open && ze(this, "shown")),
        !0)
      );
    }
    hide() {
      const { dialog: e } = this;
      return (
        !!this.open &&
        (e.close(),
        (this.open = !1),
        ze(this, "hide"),
        De(Te(e)).then(() => !1 === this.open && ze(this, "hidden")),
        !0)
      );
    }
    toggle() {
      return (
        "month" !== this.view.activeView && (this.size = "default"),
        this.open ? this.hide() : this.show()
      );
    }
    setMenu(e) {
      ((this.activeMenu = [0, 0]),
        (this.activeMenu[e] = 1),
        this.startViewTransition());
    }
    async showNotify(e, t = 1e3) {
      const a = document.createElement("div");
      var o;
      (a.classList.add("gcalize-notify"),
        (a.textContent = e),
        this.container.append(a),
        await ((o = a), o.animate([Ae, Ne], He).finished),
        await De(t),
        await (function (e) {
          return e.animate([Ne, Ae], He).finished;
        })(a),
        a.remove());
    }
    toReset() {
      confirm(Ke("Restore to Default. Are you sure?")) &&
        (ze(this, "reset"),
        this.showNotify(Ke("Settings was restored to default."), 1800));
    }
    importHolidaysData() {
      const { dialog: e, holidays: t } = this;
      if (!t.from)
        return void this.showNotify(
          Ke("Please select a calendar destination."),
        );
      const a = e.querySelector(".ipt.of-calendarid"),
        o = e.querySelector(".select.of-google");
      let r = ("google" === t.from ? o : a).value.trim();
      if (!r) return void this.showNotify(Ke("Select the Calendar"));
      if (!/^\S+@\S+\.\S+$/.test(r))
        return void this.showNotify(Ke("Malformed Calendar ID."));
      ((t.selectedID = r),
        (t.loading = !0),
        (t.progress = 0),
        (t.data = null),
        super.requestUpdate());
      const n = new Date(),
        i = n.getFullYear() - 3,
        d = n.getFullYear() + 3;
      new Fe()
        .setting({
          apiKey: "AIzaSyDXobUokTiR0mW2UMTlBxVNdjYLZLEsBEg",
          calendarID: r,
          startYear: i,
          endYear: d,
        })
        .step((e) => {
          ((t.progress = e), super.requestUpdate());
        })
        .done((e) => {
          ((t.progress = 100),
            (t.loading = !1),
            (t.data = e),
            super.requestUpdate(),
            ze(this, "saved"),
            this.showNotify(Ke("Saved")));
        })
        .load();
    }
    clearHolidaysData() {
      ((this.holidays.data = null),
        super.requestUpdate(),
        ze(this, "saved"),
        this.showNotify(Ke("Saved")));
    }
    render() {
      var e, t;
      const {
          activeMenu: a,
          size: o,
          manifest: r,
          holidaysList: n,
          config: i,
          holidays: d,
          view: l,
        } = this,
        {
          activeView: s,
          themeColor: c,
          startWeek: u,
          showWeekNo: h,
          showWeekEnd: p,
          showToolbar: y,
        } = l,
        g =
          (null !=
            ve("[data-is-drawer-closed] [aria-haspopup]:not([jsshadow])")) ==
          !1,
        f = "light" === c;
      return R`<dialog class="dialog" data-json="${JSON.stringify({ view: l })}" data-size="${o}" @close="${() => (this.open = !1)}"><div class="container" part="container" data-week-no="${h}" data-toolbar="${y}" @change="${(
        e,
      ) => {
        (super.requestUpdate(),
          (e.target.name && e.target.name.includes("_")) ||
            (clearTimeout(this._timer),
            (this._timer = setTimeout(() => {
              (ze(this, "saved"), this.showNotify(Ke("Saved")));
            }, 600))));
      }}"><div class="header"><h1 class="extention-name">${r.name}</h1><span class="version">Version: ${r.version}</span><div class="sub"><span class="radio-segmented of-small" ?hidden="${"month" !== s}" @change="${(e) => this.startViewTransition() && (this.size = e.target.value)}"><label class="holder"><input type="radio" name="_.size" class="radio" value="default" .checked="${"default" === o}"><span>⚙️</span></label> <label class="holder"><input type="radio" name="_.size" class="radio" value="small" .checked="${"small" === o}"><span>📌</span></label> </span><span class="radio-segmented of-small" ?hidden="${g}" @change="${(e) => (l.themeColor = e.target.value)}"><label class="holder" title="${Ke("Light")}"><input type="radio" name="_.theme" class="radio" value="light" .checked="${f}"><span>🔆</span></label> <label class="holder" title="${Ke("Dark")}"><input type="radio" name="_.theme" class="radio" value="dark" .checked="${!f}"><span>🌙</span></label> </span><button type="button" class="h-btn" @click="${() => this.toReset()}" title="${Ke("Restore to Default")}">🔄</button> <a href="${"https://www.paypal.com/paypalme/piayo/1000JPY"}" tabindex="-1" target="_blank" class="h-btn">💰${Ke("Donate to developer")}</a> <button type="button" class="close" @click="${() => this.toggle()}" title="${Ke("Close")}">✕</button></div><ul class="menu"><li class="active_${a[0]}" tabindex="0" @keydown="${(e) => "Enter" === e.key && this.setMenu(0)}" @click="${() => this.setMenu(0)}">🗓 ${Ke("Day of the Week")}</li><li class="active_${a[1]}" tabindex="0" @keydown="${(e) => "Enter" === e.key && this.setMenu(1)}" @click="${() => this.setMenu(1)}">🏝 ${Ke("Holidays")}</li></ul></div><div class="cont of-week" ?hidden="${1 !== a[0]}"><fieldset><legend>${Ke("Today")}</legend><table class="table-today"><tr><td><span>${Ke("Accent Color")}</span></td><td><input type="color" class="color" data-value="${i.today.accent}" .value="${i.today.accent}" ?hidden="${!f}" @change="${(
        e,
      ) => {
        i.today.accent = e.target.value;
      }}" @input="${(e) => {}}"> <input type="color" class="color" data-value="${i.today.darkAccent}" .value="${i.today.darkAccent}" ?hidden="${f}" @change="${(e) => (i.today.darkAccent = e.target.value)}" @input="${(e) => {}}"></td><td><span>${Ke("Enable")}</span> <input type="checkbox" class="checkbox-switch" .checked="${i.today.active}" value="${!0}" @change="${(e) => (i.today.active = e.target.checked)}"></td></tr><tr><td><span>${Ke("Border Color")}</span></td><td><input type="color" class="color" id="today-border" data-value="${i.today.borderColor}" .value="${i.today.borderColor}" ?hidden="${!f}" @change="${(e) => (i.today.borderColor = e.target.value)}"> <input type="color" class="color" id="today-border" data-value="${i.today.darkBorderColor}" .value="${i.today.darkBorderColor}" ?hidden="${f}" @change="${(e) => (i.today.darkBorderColor = e.target.value)}"></td><td><span>${Ke("Enable")}</span> <input type="checkbox" class="checkbox-switch" .checked="${i.today.activeBorder}" value="${!0}" @change="${(e) => (i.today.activeBorder = e.target.checked)}"></td></tr><tr><td><span>${Ke("Background Color")}</span></td><td><input type="color" class="color" data-value="${i.today.background}" .value="${i.today.background}" ?hidden="${!f}" @change="${(e) => (i.today.background = e.target.value)}"> <input type="color" class="color" data-value="${i.today.darkBackground}" .value="${i.today.darkBackground}" ?hidden="${f}" @change="${(e) => (i.today.darkBackground = e.target.value)}"></td><td><span>${Ke("Enable")}</span> <input type="checkbox" class="checkbox-switch" .checked="${i.today.activeBG}" value="${!0}" @change="${(e) => (i.today.activeBG = e.target.checked)}"></td></tr></table></fieldset>${ue.map((e, t) => R`<fieldset><legend>${Ke(e)}</legend><span><span>${Ke("Font Color")}</span> <input type="color" class="color" data-value="${i.color[t]}" .value="${i.color[t]}" ?hidden="${!f}" @change="${(e) => (i.color[t] = e.target.value)}"> <input type="color" class="color" data-value="${i.darkColor[t]}" .value="${i.darkColor[t]}" ?hidden="${f}" @change="${(e) => (i.darkColor[t] = e.target.value)}"> </span><span><span>${Ke("Background Color")}</span> <input type="color" class="color" data-value="${i.background[t]}" .value="${i.background[t]}" ?hidden="${!f}" @change="${(e) => (i.background[t] = e.target.value)}"> <input type="color" class="color" data-value="${i.darkBackground[t]}" .value="${i.darkBackground[t]}" ?hidden="${f}" @change="${(e) => (i.darkBackground[t] = e.target.value)}"></span></fieldset>`)}</div><div class="cont of-holiday" ?hidden="${1 !== a[1]}"><p class="note">${Ke("NOTE: Holiday data is read for 3 years before and after, and saved in the browser.")}</p><fieldset><legend>${Ke("Select the Holidays Calendar")}</legend><table style="width:100%"><tr><td><label class="label"><input type="radio" class="radio" name="_.gc_from" value="google" .checked="${"google" === d.from}" @change="${(e) => (d.from = e.target.value)}">${Ke("by Google's")}</label></td><td><select class="select of-google" style="width:100%" name="_.by_google" .disabled="${"google" !== d.from}"><option value="">▼ ${Ke("Select the Holidays Calendar")} ▼</option>${n.map((e) => R`<option value="${e.cid}" .selected="${e.cid === d.selectedID}">${e.title}</option>`)}</select></td></tr><tr><td><label class="label"><input type="radio" class="radio" name="_.gc_from" value="calendarID" .checked="${"calendarID" === d.from}" @change="${(e) => (d.from = e.target.value)}">${Ke("Calendar ID")}</label></td><td><input type="text" style="width:100%" name="_.user_calendar" class="ipt of-calendarid" placeholder="${Ke("Calendar ID")}" .value="${d.selectedID || ""}" .disabled="${"calendarID" !== d.from}"></td></tr><tr></tr></table><p class="buttons"><button type="button" class="btn of-import" .disabled="${!0 === d.loading}" @click="${() => this.importHolidaysData()}">✅ ${Ke("Select and Import")}</button></p><div class="loading" .hidden="${!1 === d.loading}"><span class="text">${Ke("Now Loading")} ... ${d.progress}%</span><div class="progress" style="--width:${`${d.progress}%`}"></div></div><hr><div class="datas"><table class="table"><tr><th>${Ke("Calendar Name")}</th><td>${(null == (e = d.data) ? void 0 : e.calendarName) || ""}</td></tr><tr><th>${Ke("Calendar ID")}</th><td>${(null == (t = d.data) ? void 0 : t.calendarID) || ""}</td></tr><tr><th>${Ke("Period / Total")}</th><td>${d.data ? R`${d.data.startYear} 〜 ${d.data.endYear} / <strong data-total="${Object.keys(d.data.days).length}">${Object.keys(d.data.days).length}</strong> ${Ke("days")}.` : ""}</td></tr></table></div><p class="buttons"><button type="button" class="btn of-clear" .disabled="${!0 === d.loading}" @click="${() => this.clearHolidaysData()}">🗑️ ${Ke("Clear of Holidays Data")}</button></p></fieldset><fieldset><legend>${Ke("Holidays Color")}</legend><span><span>${Ke("Font Color")}</span> <input type="color" class="color" data-value="${d.color}" .value="${d.color}" ?hidden="${!f}" @change="${(e) => (d.color = e.target.value)}"> <input type="color" class="color" data-value="${d.darkColor}" .value="${d.darkColor}" ?hidden="${f}" @change="${(e) => (d.darkColor = e.target.value)}"> </span><span><span>${Ke("Background Color")}</span> <input type="color" class="color" data-value="${d.background}" .value="${d.background}" ?hidden="${!f}" @change="${(e) => (d.background = e.target.value)}"> <input type="color" class="color" data-value="${d.darkBackground}" .value="${d.darkBackground}" ?hidden="${f}" @change="${(e) => (d.darkBackground = e.target.value)}"> </span><span><span>${Ke("Enable")}</span> <input type="checkbox" class="checkbox-switch" .checked="${d.active}" value="${!0}" @change="${(e) => (d.active = e.target.checked)}"></span></fieldset></div><div class="cont of-etc" ?hidden="${"small" !== o}"><div class="row-etc"><fieldset><span><input type="color" class="color" title="${Ke("Today")} / ${Ke("Accent Color")}" data-value="${i.today.accent}" .value="${i.today.accent}" ?disabled="${!i.today.active}" ?hidden="${!f}" @change="${(
        e,
      ) => {
        i.today.accent = e.target.value;
      }}"> <input type="color" class="color" title="${Ke("Today")} / ${Ke("Accent Color")}" data-value="${i.today.darkAccent}" .value="${i.today.darkAccent}" ?disabled="${!i.today.active}" ?hidden="${f}" @change="${(e) => (i.today.darkAccent = e.target.value)}"> <input type="checkbox" class="checkbox-switch" title="${Ke("Today")} / ${Ke("Accent Color")} / ${Ke("Enable")}" .checked="${i.today.active}" value="${!0}" @change="${(e) => (i.today.active = e.target.checked)}"> </span><span><input type="color" class="color" title="${Ke("Today")} / ${Ke("Border Color")}" id="today-border" data-value="${i.today.borderColor}" .value="${i.today.borderColor}" ?disabled="${!i.today.activeBorder}" ?hidden="${!f}" @change="${(e) => (i.today.borderColor = e.target.value)}"> <input type="color" class="color" title="${Ke("Today")} / ${Ke("Border Color")}" id="today-border" data-value="${i.today.darkBorderColor}" .value="${i.today.darkBorderColor}" ?disabled="${!i.today.activeBorder}" ?hidden="${f}" @change="${(e) => (i.today.darkBorderColor = e.target.value)}"> <input type="checkbox" class="checkbox-switch" title="${Ke("Today")} / ${Ke("Border Color")} / ${Ke("Enable")}" .checked="${i.today.activeBorder}" value="${!0}" @change="${(e) => (i.today.activeBorder = e.target.checked)}"> </span><span><input type="color" class="color" title="${Ke("Today")} / ${Ke("Background Color")}" data-value="${i.today.background}" .value="${i.today.background}" ?disabled="${!i.today.activeBG}" ?hidden="${!f}" @change="${(e) => (i.today.background = e.target.value)}"> <input type="color" class="color" title="${Ke("Today")} / ${Ke("Background Color")}" data-value="${i.today.darkBackground}" .value="${i.today.darkBackground}" ?disabled="${!i.today.activeBG}" ?hidden="${f}" @change="${(e) => (i.today.darkBackground = e.target.value)}"> <input type="checkbox" class="checkbox-switch" title="${Ke("Today")} / ${Ke("Background Color")} / ${Ke("Enable")}" .checked="${i.today.activeBG}" value="${!0}" @change="${(e) => (i.today.activeBG = e.target.checked)}"></span></fieldset><fieldset><span><input type="color" class="color" title="${Ke("Holidays Color")} / ${Ke("Font Color")}" data-value="${d.color}" .value="${d.color}" ?disabled="${!d.active}" ?hidden="${!f}" @change="${(e) => (d.color = e.target.value)}"> <input type="color" class="color" title="${Ke("Holidays Color")} / ${Ke("Font Color")}" data-value="${d.darkColor}" .value="${d.darkColor}" ?disabled="${!d.active}" ?hidden="${f}" @change="${(e) => (d.darkColor = e.target.value)}"> <input type="color" class="color" title="${Ke("Holidays Color")} / ${Ke("Background Color")}" data-value="${d.background}" .value="${d.background}" ?disabled="${!d.active}" ?hidden="${!f}" @change="${(e) => (d.background = e.target.value)}"> <input type="color" class="color" title="${Ke("Holidays Color")} / ${Ke("Background Color")}" data-value="${d.darkBackground}" ?disabled="${!d.active}" .value="${d.darkBackground}" ?hidden="${f}" @change="${(e) => (d.darkBackground = e.target.value)}"> <input type="checkbox" class="checkbox-switch" title="${Ke("Holidays Color")} / ${Ke("Enable")}" .checked="${d.active}" value="${!0}" @change="${(e) => (d.active = e.target.checked)}"></span></fieldset></div></div><div class="cont of-small" ?hidden="${"small" !== o}"><div class="row-week" data-week-end="${p}">${ue.map(
        (e, t) => {
          const a = (t + u) % 7,
            o = ue[a];
          return R`<fieldset class="of-${o}" data-wid="${a}"><span><input type="color" class="color" title="${Ke(o)} / ${Ke("Font Color")}" data-value="${i.color[a]}" .value="${i.color[a]}" ?hidden="${!f}" @change="${(e) => (i.color[a] = e.target.value)}"> <input type="color" class="color" title="${Ke(o)} / ${Ke("Font Color")}" data-value="${i.darkColor[a]}" .value="${i.darkColor[a]}" ?hidden="${f}" @change="${(e) => (i.darkColor[a] = e.target.value)}"> </span><span><input type="color" class="color" title="${Ke(o)} / ${Ke("Background Color")}" data-value="${i.background[a]}" .value="${i.background[a]}" ?hidden="${!f}" @change="${(e) => (i.background[a] = e.target.value)}"> <input type="color" class="color" title="${Ke(o)} / ${Ke("Background Color")}" data-value="${i.darkBackground[a]}" .value="${i.darkBackground[a]}" ?hidden="${f}" @change="${(e) => (i.darkBackground[a] = e.target.value)}"></span></fieldset>`;
        },
      )}</div></div></div></dialog>`;
    }
  };
function Je(e) {
  const t = document.querySelector(`#${e}`);
  if (t && t.sheet)
    for (let a = t.sheet.cssRules.length - 1; a >= 0; a--)
      t.sheet.deleteRule(a);
}
function Xe(e, t) {
  const a = document.querySelector(`#${t}`);
  a && a.sheet && a.sheet.insertRule(e);
}
function Qe({}) {
  Je(he.year_month);
  const e = be("[role='main']>[data-view-heading] [data-month]").at(-1) ?? null;
  if (!e || !e.dataset.month) return;
  const t = Be(e.dataset.month).getFullYear();
  Xe(
    `\n    [role='main']>[data-view-heading] [data-month] {\n        ${[
      ...Array(12),
    ]
      .map((e, a) => {
        const o = `${a + 1}`.padStart(2, "0"),
          r = `${t}${o}`;
        return `&[data-month^='${r}'] td:not([data-date^='${r}']) { opacity: 0.1; }`;
      })
      .join("\n")}\n    }`,
    he.year_month,
  );
}
function et({ view: e, holidays: t }) {
  if ((Je(he.holidays), !t.active || !t.data)) return;
  const a = e.todayYMD,
    o = e.todayID,
    r = (function (e, t = 10) {
      const a = [...structuredClone(e)];
      let o = [];
      for (; a.length; ) {
        const e = a.splice(0, t);
        o = [...o, e];
      }
      return o;
    })(
      Object.entries(t.data.days ?? []).map(([e, t]) => ({ ymd: e, name: t })),
      10,
    );
  let n = "";
  r.forEach((e) => {
    ((n = `\n        [data-can-drag-and-drop] {\n            ${e.map(({ ymd: e }) => `\n                td[data-date='${e}']:not([data-date='${a}']) button * {\n                    color: var(--gcz-holiday-color) !important;\n                }\n                td[data-date='${e}']:not([data-date='${a}']) button *:first-child{\n                    background-color: var(--gcz-holiday-background) !important;\n                }\n                `).join("\n")}\n        }\n        `),
      Xe(n, he.holidays),
      (n = `\n        [role='main']>[data-view-heading]>[role='grid']>[role='presentation']>[role='row']>[aria-hidden='true']>div {\n            ${e.map(({ ymd: e }) => `\n                &>h2[data-datekey='${je(e)}']:not([data-datekey='${o}']) {\n                    color: var(--gcz-holiday-color) !important;\n                }\n                &[data-datekey='${je(e)}'] {\n                    background-color: var(--gcz-holiday-background) !important;\n                }\n                `).join("\n")}\n        }\n        `),
      Xe(n, he.holidays),
      (n = `\n        [role='main']>[data-view-heading]>div>div>[data-month]>[role='grid'] {\n            ${e.map(({ ymd: e, name: t }) => `\n                [data-date='${e}']:after {\n                    content:"${t}";\n                    display: inline-block;\n                    position: absolute;\n                    top: -5px;\n                    left: 50%;\n                    padding: 2px;\n                    visibility: hidden;\n                    white-space: nowrap;\n                    color: #fff;\n                    background-color:#000;\n                    border-radius: 2px;\n                    line-height: 1;\n                    font-size: 12px;\n                    border: 1px solid #777;\n                    transform: translate(-50%, -50%);\n                    pointer-events: none;\n                }\n                [data-date='${e}']:hover{ z-index: 3 !important;}\n                [data-date='${e}']:hover:after{ visibility: visible; z-index: 2; }\n                `).join("\n")}\n        }\n        `),
      Xe(n, he.holidays),
      (n = `\n            :where(body[data-viewkey='AGENDA']) [role='main']>[jsname]>[role='grid']>[role='rowgroup'][data-datekey] {\n                ${e.map(({ ymd: e }) => `\n                    &[data-datekey='${je(e)}'] {\n                        background-color: var(--gcz-holiday-background) !important;\n                        [role='row'] > [role='gridcell'] :where(h2, button) {\n                            color: var(--gcz-holiday-color) !important;\n                        }\n                    }\n                `).join("\n")}\n            }\n        `),
      Xe(n, he.holidays));
  });
}
function tt({ view: e, config: t, holidays: a }) {
  const o = (function () {
    const e = be(
      "[data-start-date-key][data-end-date-key][data-chip-offset-top]",
    );
    if (!e.length) return null;
    const t = e.at(-1);
    return Be(Ie(Number(t.dataset.startDateKey)));
  })();
  if (!o) return;
  Je(he.daily);
  const { todayYMD: r } = e,
    n = "day" === e.activeView,
    i = o.getDay();
  let d = "";
  ((d =
    "\n        [role='main'] [role='grid']>[data-start-date-key]>[role='presentation']{\n            & >[role='row']>[role='presentation'] > *:not([role='columnheader']):not([aria-hidden]):first-child {\n                width: 10px;\n            }\n            & >[role='row'] + [role='row'] > *:first-child {\n                width: 10px;\n            }\n        }\n    "),
    Xe(d, he.daily),
    (d =
      "\n        [role='main'] [role='grid']>[data-start-date-key]>[role='presentation']>[role='row']>[role='presentation']{\n            & > [role='columnheader'] h2 > * {\n                color:inherit;\n            }\n        }\n    "),
    Xe(d, he.daily));
  for (var l = 0; l < 14; l++) {
    const e = n ? i : (l + i) % 7,
      s = Me(n ? o : Pe(o, l));
    let c = `var(--gcz-color-${e})`,
      u = `var(--gcz-bg-${e})`;
    (a.active &&
      a.data &&
      null != a.data.days[s] &&
      ((c = "var(--gcz-holiday-color)"), (u = "var(--gcz-holiday-background)")),
      t.today.activeBG && s === r && (u = "var(--gcz-today-background)"),
      (d = `\n            [role='main'] [role='grid'] {\n\n                \n                & >[data-start-date-key]>[role='presentation']>[role='row']>[role='presentation'] {\n                    &>[role='columnheader']:nth-child(${l + 2}),\n                    &>ul>li:nth-child(${l + 1}) {\n                        background-color: ${u};\n                        position: relative;\n                    }\n                }\n                \n                & >[data-start-date-key]>[role='presentation']>[role='row']>[role='presentation']>[role='columnheader']:nth-child(${l + 2}){\n                    color: ${c};\n                }\n\n                /* 正解 */\n                \n                & > [data-start-date-key] [role='row']>[role='gridcell']:nth-child( ${l + 3} ){\n                    position: relative;\n                    background-color: ${u};\n                }\n                \n                & > [data-date-key] [role='row']>[role='gridcell']:nth-child( ${l + 2} ) {\n                    position: relative;\n                    background-color: ${u};\n                }\n\n                ${t.today.activeBorder && s === r ? `\n                    & >[data-start-date-key]>[role='presentation']>[role='row']>[role='presentation']>[role='columnheader']:nth-child(${l + 2}):after {\n                        content:""; pointer-events:none; display:block; position: absolute; inset:0 1px 0 0; border: solid var(--gcz-today-border-color); border-width: 2px 2px 0 2px;\n                    }\n                    & >[data-start-date-key]>[role='presentation']>[role='row']>[role='presentation']>ul>li:nth-child(${l + 1}):after,\n                    & >[data-start-date-key] [role='row']>[role='gridcell']:nth-child(${l + 3}):after,\n                    & >[data-date-key] [role='row']>[role='gridcell']:nth-child(${l + 2}):after {\n                        content:""; pointer-events:none; display:block; position: absolute; inset:0; border: solid var(--gcz-today-border-color); border-width: 0 2px 0 2px;\n                    }\n                ` : ""}\n            }\n        `),
      Xe(d, he.daily));
  }
}
function at() {
  if (!Ze) return;
  const e = Ze.getOptions();
  applyMenstrualCycleStyles(e.config);
  (!(function ({ config: e, holidays: t }) {
    Je(he.variables);
    let a = "";
    ((a = `\n    body {\n        \n        ${e.color.map((e, t) => `--gcz-color-${t}: ${e};`).join("\n")}\n        ${e.background.map((e, t) => `--gcz-bg-${t}   : ${e};`).join("\n")}\n\n        --gcz-today-accent:       ${e.today.accent};\n        --gcz-today-background:   ${e.today.background};\n        --gcz-today-border-color: ${e.today.borderColor};\n\n        --gcz-holiday-color:      ${t.color};\n        --gcz-holiday-background: ${t.background};\n\n        \n        &[data-theme-color='dark'] {\n            ${e.darkColor.map((e, t) => `--gcz-color-${t}: ${e};`).join("\n")}\n            ${e.darkBackground.map((e, t) => `--gcz-bg-${t}   : ${e};`).join("\n")}\n\n            --gcz-today-accent:       ${e.today.darkAccent};\n            --gcz-today-background:   ${e.today.darkBackground};\n            --gcz-today-border-color: ${e.today.darkBorderColor};\n\n            --gcz-holiday-color:      ${t.darkColor};\n            --gcz-holiday-background: ${t.darkBackground};\n        }\n    }\n    `),
      Xe(a, he.variables),
      (a =
        "\n        body[data-viewkey='MONTH']:has( gcalize-setteing[open][size='small'] ) {\n            [role='main'] {\n                margin-top: 114px;\n            }\n        }\n    "),
      Xe(a, he.variables));
  })(e),
    (function ({ view: e }) {
      const { startWeek: t, showWeekNo: a } = e,
        o = `\n        [data-can-drag-and-drop][jsmodel] [role='grid'] > tbody > tr > td {\n            ${[...Array(7)].map((e, o) => `\n                    &:nth-child(${o + 1 + (a ? 1 : 0)}) button div {\n                        color: var(--gcz-color-${(o + t) % 7});\n                    }\n                `).join("\n")}\n        }\n    `;
      (Je(he.month_mini), Xe(o, he.month_mini));
    })(e),
    (function ({ view: e }) {
      const { startWeek: t, showWeekNo: a } = e,
        o = `\n        \n\n        [role='main']>[data-view-heading]>[role='grid'] {\n\n            \n            \n            & >[role='row'] {\n                border-top-left-radius: inherit;\n                border-top-right-radius: inherit;\n            }\n            \n            & >[role='presentation'],\n            & >[role='presentation']>[role='row']:last-child,\n            & >[role='presentation']>[role='row']:last-child>[aria-hidden][jsname] {\n                border-bottom-left-radius:inherit;\n                border-bottom-right-radius:inherit;\n            }\n\n            \n            ${a ? "& >[role='row']>[role='presentation'] { border-top-right-radius: 0px; }" : "& >[role='row']>[role='columnheader']:nth-child(7n+2) { border-top-left-radius: inherit; }"}\n            \n            & >[role='row']>[role='columnheader']:nth-last-child(1) {\n                border-top-right-radius: inherit;\n            }\n\n            \n            & >[role='presentation']>[role='row']:last-child>[aria-hidden]>div:nth-last-child(1){border-bottom-right-radius:inherit;}\n            \n            ${a ? "& >[role='presentation']>[role='row']:last-child>[aria-hidden]{border-bottom-right-radius:0px;}" : "& >[role='presentation']>[role='row']:last-child>[aria-hidden][jsname]>*:nth-child(1){border-bottom-left-radius:inherit;}"}\n\n            \n            & > [role='row']{ margin-bottom: -2px; }\n            & > [role="row"] > [role="columnheader"]{ padding-top: 3px; }\n\n            \n            ${[
          ...Array(7),
        ]
          .map((e, a) => {
            const o = (a + t) % 7;
            return `\n                    \n                    & >[role='row']>[role='columnheader']:nth-child(7n+${a + 2}):nth-last-child(${7 - a})>span{ color: var(--gcz-color-${o}); }\n                    & >[role='row']>[role='columnheader']:nth-child(7n+${a + 2}):nth-last-child(${7 - a}){ background-color: var(--gcz-bg-${o}); }\n                    \n                    & >[role='presentation']>[role='row']>[aria-hidden]>div:nth-child(7n+${a + 1}):nth-last-child(${7 - a}) h2{ color: var(--gcz-color-${o}); }\n                    & >[role='presentation']>[role='row']>[aria-hidden][jsname]>div:nth-child(7n+${a + 1}):nth-last-child(${7 - a}) { background-color: var(--gcz-bg-${o}); }\n                `;
          })
          .join("\n")}\n\n            \n            ${[...Array(5)]
          .map((e, t) => {
            const a = t + 1;
            return `\n                    \n                    & >[role='row']>[role='columnheader']:nth-child(5n+${t + 2}):nth-last-child(${5 - t})>span{ color: var(--gcz-color-${a}); }\n                    & >[role='row']>[role='columnheader']:nth-child(5n+${t + 2}):nth-last-child(${5 - t}){ background-color: var(--gcz-bg-${a}); }\n                    \n                    & >[role='presentation']>[role='row']>[aria-hidden]>div:nth-child(5n+${t + 1}):nth-last-child(${5 - t})>h2{ color: var(--gcz-color-${a}); }\n                    & >[role='presentation']>[role='row']>[aria-hidden][jsname]>div:nth-child(5n+${t + 1}):nth-last-child(${5 - t}){ background-color: var(--gcz-bg-${a}); }\n                `;
          })
          .join("\n")}\n        }\n    `;
      (Je(he.month_big), Xe(o, he.month_big));
    })(e),
    (function ({ view: e }) {
      const { startWeek: t, showWeekNo: a } = e;
      Je(he.year);
      let o = "";
      ((o = `\n    [role='main']>[data-view-heading] [data-month] [role='grid'] {\n        ${[
        ...Array(7),
      ]
        .map((e, o) => {
          const r = (o + t) % 7,
            n = o + 1 + (a ? 1 : 0);
          return `\n                thead th:nth-child(${n}) span { color: var(--gcz-color-${r}); }\n                [data-date]:nth-child(${n})>[data-grid-cell] {\n                    color: var(--gcz-color-${r});\n                    & > *:nth-last-child(1){\n                        color: var(--gcz-color-${r});\n                    }\n                }\n            `;
        })
        .join("\n")}\n    }\n    `),
        Xe(o, he.year),
        (o =
          "\n    @media print {\n        :root, body {\n            --gm3-sys-color-secondary-container: transparent !important;\n        }\n        [data-keeps-details-open][aria-label][role='complementary']:has([role='tablist']) {\n            display: none;\n            & ~ * {\n                display: none;\n            }\n        }\n    }\n    "),
        Xe(o, he.year));
    })(e),
    et(e),
    (function ({ view: e, config: t }) {
      Je(he.today);
      const { todayYMD: a, todayID: o, todayYM1: r } = e,
        { active: n, activeBG: i, activeBorder: d } = t.today;
      let l = "";
      ((l = `\n        [data-can-drag-and-drop][jsmodel] {\n            td[data-date='${a}'] button * {color: var(--gm3-sys-color-on-primary, #fff) !important;}\n            ${n ? `\n                    td[data-date='${a}'] button *:first-child { background-color: var(--gcz-today-accent) !important;}\n                ` : ""}\n        }\n    `),
        Xe(l, he.today),
        (l = `\n        [role='main']>[data-view-heading]>[role='grid']>[role='presentation']>[role='row']>[aria-hidden='true']>div {\n            \n            ${n ? `&>h2[data-datekey='${o}']{ color:var(--gm3-sys-color-on-primary, #fff) !important; background-color: var(--gcz-today-accent) !important; }` : `&>h2[data-datekey='${o}']{ color:var(--gm3-sys-color-on-primary, #fff) !important; }`}\n            \n            ${i ? `&[data-datekey='${o}']{ background-color: var(--gcz-today-background) !important; }` : ""}\n            \n            ${d ? `&[data-datekey='${o}']{ outline: 2px solid var(--gcz-today-border-color); outline-offset: -2px;}` : ""}\n        }\n    `),
        Xe(l, he.today),
        (l = `\n        [role='main']>[data-view-heading]>div>div>[data-month='${r}']>[role='grid'] [data-date='${a}'] [data-grid-cell] {\n            \n            & > *:nth-last-child(1) {\n                color: var(--gm3-sys-color-on-primary, #fff) !important;\n            }\n            \n            ${n ? "& > *:nth-child(1){ background-color: var(--gcz-today-accent) !important; }" : ""}\n            /* disable today when printing. */\n            @media print {\n                background-color: transparent !important;;\n                & > *:nth-child(1) {\n                    background-color: transparent !important;;\n                }\n                & > *:nth-last-child(1) {\n                    color: inherit !important;\n                }\n            }\n        }\n    `),
        Xe(l, he.today),
        (l = `\n        [role='main'] [role='grid']>[data-start-date-key] {\n            \n            & >[role='presentation']>[role='row']>[role='presentation']>[role='columnheader'] h2>[data-datekey='${o}'],\n            &[data-start-date-key='${o}'][data-end-date-key='${o}']>[role='presentation']>[role='row']>[role='presentation']>[role='columnheader'] h2>div[aria-label]\n            ${n ? "{color: var(--gm3-sys-color-on-primary, #fff) !important; background-color: var(--gcz-today-accent) !important;}" : "{color: var(--gm3-sys-color-on-primary, #fff) !important;}"}\n        }\n    `),
        Xe(l, he.today),
        (l = `\n        :where(body[data-viewkey='AGENDA']) [role='main']>[jsname]>[role='grid']>[role='rowgroup'][data-datekey='${o}'] {\n            \n            ${n ? "\n                    [role='row'] > [role='gridcell'] {\n                        h2 { color: var(--gcz-today-accent) !important; }\n                        button { background-color: var(--gcz-today-accent) !important; }\n                    }" : ""}\n            \n            ${i ? "\n                    &[data-datekey] { background-color: var(--gcz-today-background) !important; }\n                " : ""}\n            \n            ${d ? "&[data-datekey]{ outline: 2px solid var(--gcz-today-border-color); outline-offset: -2px;}" : ""}\n        }\n    `),
        Xe(l, he.today));
    })(e),
    tt(e),
    (function ({ view: e }) {
      Je(he.agenda);
      const { todayID: t } = e;
      Xe(
        `\n        :where(body[data-viewkey='AGENDA']) {\n            \n            [role='main']>[jsname],\n            [role='main']>[jsname]>[role='grid'] {\n                border-radius: inherit;\n            }\n            [role='main']>[jsname]>[role='grid']>[role='rowgroup'][data-datekey] {\n                margin-top: 0px !important;\n                padding-top: var(--cal-list-view-day-vertical-padding, 8px);\n\n                &:first-child {\n                    border-top-left-radius: inherit;\n                    /*border-top-right-radius: inherit;*/\n                }\n                &:last-child {\n                    border-bottom-left-radius: inherit;\n                    /*border-bottom-right-radius: inherit;*/\n                }\n            }\n            \n            [role='main']>[jsname]>[role='grid']>[role='rowgroup'][data-datekey] {\n                ${[...Array(7)].map((e, a) => `\n                    &[data-gcz-wid='${a}'] {\n                        background-color:  var(--gcz-bg-${a});\n                    }\n                    &[data-gcz-wid='${a}']:not([data-datekey='${t}']) [role='row'] > [role='gridcell'] :where(h2, button) {\n                        color: var(--gcz-color-${a});\n                    }\n                `).join("\n")}\n            }\n        }\n    `,
        he.agenda,
      );
    })(
      /**!
       * @license
       * Copyright (C) piayo.
       */ e,
    ));
}
((qe.styles = [Oe]),
  Ue([le({ type: Boolean, reflect: !0 })], qe.prototype, "open", 2),
  Ue([le({ type: String, reflect: !0 })], qe.prototype, "size", 2),
  Ue([ce(".dialog")], qe.prototype, "dialog", 2),
  Ue([ce(".container")], qe.prototype, "container", 2),
  Ue([se()], qe.prototype, "activeMenu", 2),
  Ue([se()], qe.prototype, "manifest", 2),
  Ue([se()], qe.prototype, "holidaysList", 2),
  Ue([se()], qe.prototype, "config", 2),
  Ue([se()], qe.prototype, "holidays", 2),
  Ue([se()], qe.prototype, "view", 2),
  (qe = Ue(
    [
      ((e) => (t, a) => {
        void 0 !== a
          ? a.addInitializer(() => {
              customElements.define(e, t);
            })
          : customElements.define(e, t);
      })(Ve),
    ],
    qe,
  )));
function parseDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}
function calculateCycleDay(startDate, targetDate) {
  const start = parseDate(startDate);
  const target = parseDate(targetDate);
  const diffTime = Math.abs(target - start);
  const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
  return diffDays;
}
function applyMenstrualCycleStyles(config) {
  const { cycleLength, periodLength, firstDayOfCycle } = config.menstrualCycle;

  if (!cycleLength || !periodLength || !firstDayOfCycle) {
    return;
  }

  const calendarDays = document.querySelectorAll("[data-datekey]");
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  calendarDays.forEach((dayElement) => {
    const dateKey = dayElement.dataset.datekey;
    const year = 1970 + (dateKey >> 9);
    const month = (dateKey >> 5) & 15;
    const day = 31 & dateKey;
    const dateString = `${year}-${String(month).padStart(2, "0")}-${String(
      day,
    ).padStart(2, "0")}`;

    const dayOfCycle =
      (calculateCycleDay(firstDayOfCycle, dateString) % cycleLength);

    if (dayOfCycle >= 0) {
      const hue = (dayOfCycle / cycleLength) * 360;
      dayElement.style.backgroundColor = `hsl(${hue}, 70%, 80%)`;
    }
  });
}
const ot = xe(() => {
    const e = Ee();
    if (!Ze || !ge.includes(e)) return;
    Ze.updateViewData();
    const { config: t, holidays: a, view: o } = Ze.getOptions();
    tt({ view: o, config: t, holidays: a });
  }, 10),
  rt = xe(() => {
    "agenda" === Ee() && $e();
  }, 40),
  nt = xe(() => {
    "year" === Ee() && Qe({});
  }, 40);
async function it() {
  (await Ze.init()) && (Ze.requestUpdate(), at(), ot(), rt(), nt());
}
(async () => {
  const e = chrome.runtime.getManifest();
  let t;
  try {
    t = await chrome.runtime.sendMessage({ command: "getSaveData" });
  } catch (i) {
    return void (Ee() && alert(ye.getSaveData));
  }
  let a = [];
  try {
    a = await (async function () {
      const e = new URLSearchParams();
      return (
        e.append("did", "holiday/official"),
        fetch("https://calendar.google.com/calendar/directory", {
          method: "POST",
          cache: "no-cache",
          body: e,
        })
          .then((e) => e.text())
          .then((e) => {
            const t = e.replace(/^\)]}'\n?/, "");
            return JSON.parse(t);
          })
          .then((e) => e.map((e) => ({ ...e, cid: atob(e.did) })))
      );
    })();
  } catch (i) {
    Ee() && alert(ye.getHolidaysList);
  }
  const o = (Ze = document.createElement(Ve));
  document.body.append(o);
  const { config: r, holidays: n } = t;
  ((o.manifest = structuredClone(e)),
    (o.holidaysList = structuredClone(a)),
    (o.config = structuredClone(r)),
    (o.holidays = structuredClone(n)),
    o.requestUpdate(),
    await o.updateComplete,
    (document.body.dataset.themeColor = o.view.themeColor = _e()),
    (function () {
      const e = document.querySelector("head");
      pe.forEach((t) => {
        const a = Object.assign(document.createElement("style"), { id: t });
        null == e || e.appendChild(a);
      });
    })(),
    it(),
    (function (e) {
      clearInterval(me);
      let t = Me(new Date());
      me = setInterval(() => {
        const a = Me(new Date());
        t !== a && ((t = a), e());
      }, 6e4);
    })(async () => it()),
    chrome.runtime.onMessage.addListener((e) => {
      "openSetting" === e.command &&
        (o.updateViewData(), o.requestUpdate(), o.toggle());
    }),
    o.addEventListener("saved", async () => {
      const { config: e, holidays: t } = o;
      (await chrome.runtime.sendMessage({
        command: "saveConfig",
        data: structuredClone(e),
      }),
        await chrome.runtime.sendMessage({
          command: "saveHoliday",
          data: structuredClone(t),
        }),
        o.requestUpdate(),
        at());
    }),
    o.addEventListener("reset", async () => {
      const { config: e, holidays: t } = await chrome.runtime.sendMessage({
        command: "reset",
      });
      ((o.config = structuredClone(e)),
        (o.holidays = structuredClone(t)),
        o.requestUpdate(),
        at());
    }),
    new MutationObserver((e) => {
      e.forEach((e) => {
        var t;
        const a = Ee();
        if (
          ("attributes" === e.type && ke(e.target) && rt(),
          "attributes" === e.type &&
            "BODY" === (null == (t = e.target) ? void 0 : t.tagName))
        ) {
          const e = _e();
          (document.body.dataset.themeColor != e &&
            ((document.body.dataset.themeColor = o.view.themeColor = e),
            o.updateViewData(),
            o.requestUpdate()),
            a && a != o.view.activeView && ot());
        }
        e.addedNodes.length &&
          e.addedNodes.forEach((e) => {
            const t = e;
            (t.querySelector &&
              t.querySelector("#drawerMiniMonthNavigator") &&
              it(),
              "TH" === (null == t ? void 0 : t.tagName) &&
                t.closest &&
                t.closest("table[role='grid']") &&
                o.view.startWeek > -1 &&
                it());
            (t.querySelector &&
              t.querySelector("[data-start-date-key]") &&
              a &&
              ge.includes(a) &&
              ot(),
              ke(t) && rt());
            t.querySelector && t.querySelector("[data-month]") && nt();
          });
      });
    }).observe(document.body, { attributes: !0, childList: !0, subtree: !0 }));
})();
