import { forwardRef, useEffect } from "react";
var __create = Object.create, __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __commonJSMin = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), __copyProps = (e, t, n, o) => {
	if (t && typeof t == "object" || typeof t == "function") for (var c = __getOwnPropNames(t), l = 0, u = c.length, d; l < u; l++) d = c[l], !__hasOwnProp.call(e, d) && d !== n && __defProp(e, d, {
		get: ((e) => t[e]).bind(null, d),
		enumerable: !(o = __getOwnPropDesc(t, d)) || o.enumerable
	});
	return e;
}, __toESM = (e, t, i) => (i = e == null ? {} : __create(__getProtoOf(e)), __copyProps(t || !e || !e.__esModule ? __defProp(i, "default", {
	value: e,
	enumerable: !0
}) : i, e)), __require = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function.");
}), require_react_compiler_runtime_production = /* @__PURE__ */ __commonJSMin(((e) => {
	var t = __require("react").__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	e.c = function(e) {
		return t.H.useMemoCache(e);
	};
})), require_react_compiler_runtime_development = /* @__PURE__ */ __commonJSMin(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		var t = __require("react").__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		e.c = function(e) {
			var n = t.H;
			return n === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), n.useMemoCache(e);
		};
	})();
})), import_compiler_runtime = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = require_react_compiler_runtime_production() : t.exports = require_react_compiler_runtime_development();
})))()), require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((e) => {
	var t = Symbol.for("react.transitional.element");
	function n(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.jsx = n;
})), require_react_jsx_runtime_development = /* @__PURE__ */ __commonJSMin(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === k ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case w: return "Suspense";
				case T: return "SuspenseList";
				case O: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case S: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case C:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case E: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case D:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function r(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function i(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === D) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function a() {
			var e = A.A;
			return e === null ? null : e.getOwner();
		}
		function o() {
			return Error("react-stack-top-frame");
		}
		function s(e) {
			if (j.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function c(e, t) {
			function n() {
				P || (P = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function l() {
			var e = t(this.type);
			return F[e] || (F[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function u(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: l
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, i, o, l, d) {
			var f = n.children;
			if (f !== void 0) if (o) if (M(f)) {
				for (o = 0; o < f.length; o++) p(f[o]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (j.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				o = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", R[f + o] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", o, f, m, f), R[f + o] = !0);
			}
			if (f = null, i !== void 0 && (r(i), f = "" + i), s(n) && (r(n.key), f = "" + n.key), "key" in n) for (var h in i = {}, n) h !== "key" && (i[h] = n[h]);
			else i = n;
			return f && c(i, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), u(e, f, i, a(), l, d);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === D && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = __require("react"), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), k = Symbol.for("react.client.reference"), A = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = Object.prototype.hasOwnProperty, M = Array.isArray, N = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var P, F = {}, I = h.react_stack_bottom_frame.bind(h, o)(), L = N(i(o)), R = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > A.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : I, r ? N(i(e)) : L);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > A.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : I, r ? N(i(e)) : L);
		};
	})();
})), import_jsx_runtime = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = require_react_jsx_runtime_production() : t.exports = require_react_jsx_runtime_development();
})))()), clamp = (e, t, n) => Number.isNaN(e) ? t : Math.min(Math.max(e, t), n), mergeClassNames = (...e) => e.filter(Boolean).join(" "), injectDistortionFilter = (e, t) => {
	if (typeof window > "u" || typeof document > "u") return;
	let n = Math.min(Math.max(Math.abs(t), 0), 120), r = document.getElementById(e);
	if (r) {
		let e = r.querySelector("feDisplacementMap");
		e && e.setAttribute("scale", n.toString());
		return;
	}
	let i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	i.setAttribute("aria-hidden", "true"), i.setAttribute("focusable", "false"), i.style.position = "absolute", i.style.width = "0", i.style.height = "0", i.style.visibility = "hidden";
	let a = document.createElementNS("http://www.w3.org/2000/svg", "defs"), o = document.createElementNS("http://www.w3.org/2000/svg", "filter");
	o.id = e, i.setAttribute("data-rlg-filter", e);
	let s = document.createElementNS("http://www.w3.org/2000/svg", "feTurbulence");
	s.setAttribute("type", "fractalNoise"), s.setAttribute("baseFrequency", "0.004 0.0055"), s.setAttribute("numOctaves", "2"), s.setAttribute("seed", "7"), s.setAttribute("result", "distortNoise");
	let c = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
	c.setAttribute("in", "distortNoise"), c.setAttribute("stdDeviation", "6.5"), c.setAttribute("result", "softNoise");
	let l = document.createElementNS("http://www.w3.org/2000/svg", "feDisplacementMap");
	l.setAttribute("in", "SourceGraphic"), l.setAttribute("in2", "softNoise"), l.setAttribute("scale", n.toString()), l.setAttribute("xChannelSelector", "R"), l.setAttribute("yChannelSelector", "G"), o.appendChild(s), o.appendChild(c), o.appendChild(l), a.appendChild(o), i.appendChild(a), document.body.appendChild(i);
};
const LiquidGlass = forwardRef((e, n) => {
	let r = (0, import_compiler_runtime.c)(51), i, a, o, s, c, l, u, d, f, p, h, g, x, C;
	r[0] === e ? (i = r[1], a = r[2], o = r[3], s = r[4], c = r[5], l = r[6], u = r[7], d = r[8], f = r[9], p = r[10], h = r[11], g = r[12], x = r[13], C = r[14]) : ({children: i, className: a, style: s, intensity: c, ripple: u, blurRadius: d, tint: f, highlightColor: p, highlightStrength: h, animated: g, distortion: x, distortionFilterId: C, distortionScale: l, ...o} = e, r[0] = e, r[1] = i, r[2] = a, r[3] = o, r[4] = s, r[5] = c, r[6] = l, r[7] = u, r[8] = d, r[9] = f, r[10] = p, r[11] = h, r[12] = g, r[13] = x, r[14] = C);
	let w = c === void 0 ? .65 : c, T = u === void 0 ? .35 : u, E = d === void 0 ? 18 : d, D = f === void 0 ? "rgba(255, 255, 255, 0.16)" : f, O = p === void 0 ? "rgba(255, 255, 255, 0.6)" : p, k = h === void 0 ? .55 : h, A = g === void 0 ? !0 : g, j = x === void 0 ? !1 : x, M = C === void 0 ? "rlg-distort-filter" : C, N = l === void 0 ? 36 : l, P = _temp, F;
	r[15] === Symbol.for("react.memo_cache_sentinel") ? (F = P("backdrop-filter", "blur(1px)") || P("-webkit-backdrop-filter", "blur(1px)"), r[15] = F) : F = r[15];
	let I = F, L = navigator.userAgent.includes("Firefox"), R = `url(#${M})`, z;
	r[16] === R ? z = r[17] : (z = P("backdrop-filter", R), r[16] = R, r[17] = z);
	let B = j && I && z && !L, V, H;
	if (r[18] !== E || r[19] !== M || r[20] !== O || r[21] !== k || r[22] !== w || r[23] !== T || r[24] !== B || r[25] !== D) {
		H = {};
		let e;
		r[27] === w ? e = r[28] : (e = clamp(w, 0, 1).toFixed(3), r[27] = w, r[28] = e), H["--rlg-intensity"] = e;
		let t;
		r[29] === T ? t = r[30] : (t = clamp(T, 0, 1).toFixed(3), r[29] = T, r[30] = t), H["--rlg-ripple-opacity"] = t;
		let n;
		r[31] === k ? n = r[32] : (n = clamp(k, 0, 1).toFixed(3), r[31] = k, r[32] = n), H["--rlg-highlight-strength"] = n, H["--rlg-blur-radius"] = `${clamp(E, 0, 120).toFixed(0)}px`, H["--rlg-highlight-color"] = O, H["--rlg-tint"] = D, H["--rlg-backdrop-filter-prefix"] = B ? `url(#${M}) ` : " ", r[18] = E, r[19] = M, r[20] = O, r[21] = k, r[22] = w, r[23] = T, r[24] = B, r[25] = D, r[26] = H;
	} else H = r[26];
	V = H;
	let U = V, W;
	r[33] !== s || r[34] !== U ? (W = {
		...U,
		...s
	}, r[33] = s, r[34] = U, r[35] = W) : W = r[35];
	let G = W, K, q;
	r[36] !== M || r[37] !== N || r[38] !== B ? (K = () => {
		if (!B) return;
		let e = clamp(N, -120, 120);
		injectDistortionFilter(M, e);
	}, q = [
		B,
		M,
		N
	], r[36] = M, r[37] = N, r[38] = B, r[39] = K, r[40] = q) : (K = r[39], q = r[40]), useEffect(K, q);
	let J = A ? "" : void 0, Y = j ? "" : void 0, X;
	r[41] === a ? X = r[42] : (X = mergeClassNames("rlg-surface", a), r[41] = a, r[42] = X);
	let Z;
	return r[43] !== i || r[44] !== G || r[45] !== n || r[46] !== o || r[47] !== J || r[48] !== Y || r[49] !== X ? (Z = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: n,
		"data-liquid-glass": "",
		"data-liquid-glass-animated": J,
		"data-liquid-glass-distortion": Y,
		className: X,
		style: G,
		...o,
		children: i
	}), r[43] = i, r[44] = G, r[45] = n, r[46] = o, r[47] = J, r[48] = Y, r[49] = X, r[50] = Z) : Z = r[50], Z;
});
LiquidGlass.displayName = "LiquidGlass";
function _temp(e, t) {
	return typeof CSS < "u" && typeof CSS.supports == "function" ? CSS.supports(e, t) : !1;
}
export { LiquidGlass as default };

//# sourceMappingURL=react-liquid-glass.es.js.map