import { forwardRef, useEffect, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
var clamp = (e, t, n) => Number.isNaN(e) ? t : Math.min(Math.max(e, t), n), mergeClassNames = (...e) => e.filter(Boolean).join(" "), injectDistortionFilter = (e, t) => {
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
const LiquidGlass = forwardRef(({ children: e, className: s, style: c, intensity: l = .65, ripple: u = .35, blurRadius: d = 18, tint: f = "rgba(255, 255, 255, 0.16)", highlightColor: p = "rgba(255, 255, 255, 0.6)", highlightStrength: m = .55, animated: h = !0, distortion: g = !1, distortionFilterId: _ = "rlg-distort-filter", distortionScale: v = 36,...y }, b) => {
	let x = (e, t) => typeof CSS < "u" && typeof CSS.supports == "function" ? CSS.supports(e, t) : !1, S = x("backdrop-filter", "blur(1px)") || x("-webkit-backdrop-filter", "blur(1px)"), C = navigator.userAgent.includes("Firefox"), w = x("backdrop-filter", `url(#${_})`), T = g && S && w && !C, E = {
		...useMemo(() => {
			let e = {};
			return e["--rlg-intensity"] = clamp(l, 0, 1).toFixed(3), e["--rlg-ripple-opacity"] = clamp(u, 0, 1).toFixed(3), e["--rlg-highlight-strength"] = clamp(m, 0, 1).toFixed(3), e["--rlg-blur-radius"] = `${clamp(d, 0, 120).toFixed(0)}px`, e["--rlg-highlight-color"] = p, e["--rlg-tint"] = f, e["--rlg-backdrop-filter-prefix"] = T ? `url(#${_}) ` : " ", e;
		}, [
			l,
			u,
			d,
			f,
			p,
			m,
			_,
			T
		]),
		...c
	};
	return useEffect(() => {
		if (!T) return;
		let e = clamp(v, -120, 120);
		injectDistortionFilter(_, e);
	}, [
		T,
		_,
		v
	]), /* @__PURE__ */ jsx("div", {
		ref: b,
		"data-liquid-glass": "",
		"data-liquid-glass-animated": h ? "" : void 0,
		"data-liquid-glass-distortion": g ? "" : void 0,
		className: mergeClassNames("rlg-surface", s),
		style: E,
		...y,
		children: e
	});
});
LiquidGlass.displayName = "LiquidGlass";
export { LiquidGlass as default };

//# sourceMappingURL=react-liquid-glass.es.js.map