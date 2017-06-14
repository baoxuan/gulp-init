/*
 * Swiper 2.4.1 - Mobile Touch Slider
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2012-2013, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Updated on: December 15, 2013
*/
var Swiper = function(f, b) {
	function g(a, b) {
		return document.querySelectorAll ? (b || document).querySelectorAll(a) : jQuery(a, b)
	}
	function h() {
		var c = A - m;
		b.freeMode && (c = A - m);
		b.slidesPerView > a.slides.length && (c = 0);
		0 > c && (c = 0);
		return c
	}
	function k() {
		function c(c) {
			var d = new Image;
			d.onload = function() {
				a.imagesLoaded++;
				a.imagesLoaded == a.imagesToLoad.length && (a.reInit(), b.onImagesReady && a.fireCallback(b.onImagesReady, a))
			};
		}
		var d = a.h.addEventListener;
		a.browser.ie10 ? (d(a.wrapper, a.touchEvents.touchStart, B), d(document, a.touchEvents.touchMove, C), d(document, a.touchEvents.touchEnd, D)) : (a.support.touch && (d(a.wrapper, "touchstart", B), d(a.wrapper, "touchmove", C), d(a.wrapper, "touchend", D)), b.simulateTouch && (d(a.wrapper, "mousedown", B), d(document, "mousemove", C), d(document, "mouseup", D)));
		b.autoResize && d(window, "resize", a.resizeFix);
		q();
		a._wheelEvent = !1;
		if (b.mousewheelControl) {
			void 0 !== document.onmousewheel && (a._wheelEvent = "mousewheel");
			try {
				WheelEvent("wheel"),
				a._wheelEvent = "wheel"
			} catch(e) {}
			a._wheelEvent || (a._wheelEvent = "DOMMouseScroll");
			a._wheelEvent && d(a.container, a._wheelEvent, P)
		}
		b.keyboardControl && d(document, "keydown", Q);
		if (b.updateOnImagesReady) for (a.imagesToLoad = g("img", a.container), d = 0; d < a.imagesToLoad.length; d++) c(a.imagesToLoad[d].getAttribute("src"))
	}
	function q() {
		var c = a.h.addEventListener,
		d;
		if (b.preventLinks) {
			var e = g("a", a.container);
			for (d = 0; d < e.length; d++) c(e[d], "click", R)
		}
		if (b.releaseFormElements) for (e = g("input, textarea, select", a.container), d = 0; d < e.length; d++) c(e[d], a.touchEvents.touchStart, S, !0);
		if (b.onSlideClick) for (d = 0; d < a.slides.length; d++) c(a.slides[d], "click", T);
		if (b.onSlideTouch) for (d = 0; d < a.slides.length; d++) c(a.slides[d], a.touchEvents.touchStart, U)
	}
	function t() {
		var c = a.h.removeEventListener,
		d;
		if (b.onSlideClick) for (d = 0; d < a.slides.length; d++) c(a.slides[d], "click", T);
		if (b.onSlideTouch) for (d = 0; d < a.slides.length; d++) c(a.slides[d], a.touchEvents.touchStart, U);
		if (b.releaseFormElements) {
			var e = g("input, textarea, select", a.container);
			for (d = 0; d < e.length; d++) c(e[d], a.touchEvents.touchStart, S, !0)
		}
		if (b.preventLinks) for (e = g("a", a.container), d = 0; d < e.length; d++) c(e[d], "click", R)
	}
	function Q(c) {
		var b = c.keyCode || c.charCode;
		if (37 == b || 39 == b || 38 == b || 40 == b) {
			for (var e = !1, f = a.h.getOffset(a.container), v = a.h.windowScroll().left, h = a.h.windowScroll().top, g = a.h.windowWidth(), m = a.h.windowHeight(), f = [[f.left, f.top], [f.left + a.width, f.top], [f.left, f.top + a.height], [f.left + a.width, f.top + a.height]], k = 0; k < f.length; k++) {
				var r = f[k];
				r[0] >= v && r[0] <= v + g && r[1] >= h && r[1] <= h + m && (e = !0)
			}
			if (!e) return
		}
		if (l) {
			if (37 == b || 39 == b) c.preventDefault ? c.preventDefault() : c.returnValue = !1;
			39 == b && a.swipeNext();
			37 == b && a.swipePrev()
		} else {
			if (38 == b || 40 == b) c.preventDefault ? c.preventDefault() : c.returnValue = !1;
			40 == b && a.swipeNext();
			38 == b && a.swipePrev()
		}
	}
	function P(c) {
		var d = a._wheelEvent,
		e = 0;
		if (c.detail) e = -c.detail;
		else if ("mousewheel" == d) if (b.mousewheelControlForceToAxis) if (l) if (Math.abs(c.wheelDeltaX) > Math.abs(c.wheelDeltaY)) e = c.wheelDeltaX;
		else return;
		else if (Math.abs(c.wheelDeltaY) > Math.abs(c.wheelDeltaX)) e = c.wheelDeltaY;
		else return;
		else e = c.wheelDelta;
		else if ("DOMMouseScroll" == d) e = -c.detail;
		else if ("wheel" == d) if (b.mousewheelControlForceToAxis) if (l) if (Math.abs(c.deltaX) > Math.abs(c.deltaY)) e = -c.deltaX;
		else return;
		else if (Math.abs(c.deltaY) > Math.abs(c.deltaX)) e = -c.deltaY;
		else return;
		else e = Math.abs(c.deltaX) > Math.abs(c.deltaY) ? -c.deltaX: -c.deltaY;
		if (b.freeMode) {
			if (d = a.getWrapperTranslate() + e, 0 < d && (d = 0), d < -h() && (d = -h()), a.setWrapperTransition(0), a.setWrapperTranslate(d), a.updateActiveSlide(d), 0 == d || d == -h()) return
		} else 60 < (new Date).getTime() - V && (0 > e ? a.swipeNext() : a.swipePrev()),
		V = (new Date).getTime();
		b.autoplay && a.stopAutoplay(!0);
		c.preventDefault ? c.preventDefault() : c.returnValue = !1;
		return ! 1
	}
	function T(c) {
		a.allowSlideClick && (W(c), a.fireCallback(b.onSlideClick, a, c))
	}
	function U(c) {
		W(c);
		a.fireCallback(b.onSlideTouch, a, c)
	}
	function W(c) {
		if (c.currentTarget) a.clickedSlide = c.currentTarget;
		else {
			c = c.srcElement;
			do
			if ( - 1 < c.className.indexOf(b.slideClass)) break;
			while (c = c.parentNode);
			a.clickedSlide = c
		}
		a.clickedSlideIndex = a.slides.indexOf(a.clickedSlide);
		a.clickedSlideLoopIndex = a.clickedSlideIndex -
		(a.loopedSlides || 0)
	}
	function R(c) {
		if (!a.allowLinks) return c.preventDefault ? c.preventDefault() : c.returnValue = !1,
		!1
	}
	function S(a) {
		a.stopPropagation ? a.stopPropagation() : a.returnValue = !1;
		return ! 1
	}
	function B(c) {
		b.preventLinks && (a.allowLinks = !0);
		if (a.isTouched || b.onlyExternal) return ! 1;
		var d;
		if (d = b.noSwiping) if (d = c.target || c.srcElement) {
			d = c.target || c.srcElement;
			var e = !1;
			do - 1 < d.className.indexOf(b.noSwipingClass) && (e = !0),
			d = d.parentElement;
			while (!e && d.parentElement && -1 == d.className.indexOf(b.wrapperClass)); ! e && -1 < d.className.indexOf(b.wrapperClass) && -1 < d.className.indexOf(b.noSwipingClass) && (e = !0);
			d = e
		}
		if (d) return ! 1;
		I = !1;
		a.isTouched = !0;
		x = "touchstart" == c.type;
		if(typeof(cmread)!="undefined"){
		cmread.callBackClient('notifyFromPage', '{"gesture":"touchstart"}', '');
		}
		x && 1 != c.targetTouches.length || (a.callPlugins("onTouchStartBegin"), x || (c.preventDefault ? c.preventDefault() : c.returnValue = !1), d = x ? c.targetTouches[0].pageX: c.pageX || c.clientX, c = x ? c.targetTouches[0].pageY: c.pageY || c.clientY, a.touches.startX = a.touches.currentX = d, a.touches.startY = a.touches.currentY = c, a.touches.start = a.touches.current = l ? d: c, a.setWrapperTransition(0), a.positions.start = a.positions.current = a.getWrapperTranslate(), a.setWrapperTranslate(a.positions.start), a.times.start = (new Date).getTime(), y = void 0, 0 < b.moveStartThreshold && (N = !1), b.onTouchStart && a.fireCallback(b.onTouchStart, a), a.callPlugins("onTouchStartEnd"))
	}
	function C(c) {
		if (a.isTouched && !b.onlyExternal && (!x || "mousemove" != c.type)) {
			var d = x ? c.targetTouches[0].pageX: c.pageX || c.clientX,
			e = x ? c.targetTouches[0].pageY: c.pageY || c.clientY;
			"undefined" === typeof y && l && (y = !!(y || Math.abs(e - a.touches.startY) > Math.abs(d -
			a.touches.startX)));
			"undefined" !== typeof y || l || (y = !!(y || Math.abs(e - a.touches.startY) < Math.abs(d - a.touches.startX)));
			if (y) a.isTouched = !1;
			else if (c.assignedToSwiper) a.isTouched = !1;
			else if (c.assignedToSwiper = !0, b.preventLinks && (a.allowLinks = !1), b.onSlideClick && (a.allowSlideClick = !1), b.autoplay && a.stopAutoplay(!0), !x || 1 == c.touches.length) if (a.isMoved || (a.callPlugins("onTouchMoveStart"), b.loop && (a.fixLoop(), a.positions.start = a.getWrapperTranslate()), b.onTouchMoveStart && a.fireCallback(b.onTouchMoveStart, a)), a.isMoved = !0, c.preventDefault ? c.preventDefault() : c.returnValue = !1, a.touches.current = l ? d: e, a.positions.current = (a.touches.current - a.touches.start) * b.touchRatio + a.positions.start, 0 < a.positions.current && b.onResistanceBefore && a.fireCallback(b.onResistanceBefore, a, a.positions.current), a.positions.current < -h() && b.onResistanceAfter && a.fireCallback(b.onResistanceAfter, a, Math.abs(a.positions.current + h())), b.resistance && "100%" != b.resistance && (0 < a.positions.current && (c = 1 - a.positions.current / m / 2, a.positions.current = 0.5 > c ? m / 2: a.positions.current * c), a.positions.current < -h() && (d = (a.touches.current - a.touches.start) * b.touchRatio + (h() + a.positions.start), c = (m + d) / m, d = a.positions.current - d * (1 - c) / 2, e = -h() - m / 2, a.positions.current = d < e || 0 >= c ? e: d)), b.resistance && "100%" == b.resistance && (0 < a.positions.current && (!b.freeMode || b.freeModeFluid) && (a.positions.current = 0), a.positions.current < -h() && (!b.freeMode || b.freeModeFluid) && (a.positions.current = -h())), b.followFinger) return b.moveStartThreshold ? Math.abs(a.touches.current - a.touches.start) > b.moveStartThreshold || N ? (N = !0, a.setWrapperTranslate(a.positions.current)) : a.positions.current = a.positions.start: a.setWrapperTranslate(a.positions.current),
			(b.freeMode || b.watchActiveIndex) && a.updateActiveSlide(a.positions.current),
			b.grabCursor && (a.container.style.cursor = "move", a.container.style.cursor = "grabbing", a.container.style.cursor = "-moz-grabbin", a.container.style.cursor = "-webkit-grabbing"),
			G || (G = a.touches.current),
			J || (J = (new Date).getTime()),
			a.velocity = (a.touches.current - G) / ((new Date).getTime() -
			J) / 2,
			2 > Math.abs(a.touches.current - G) && (a.velocity = 0),
			G = a.touches.current,
			J = (new Date).getTime(),
			a.callPlugins("onTouchMoveEnd"),
			b.onTouchMove && a.fireCallback(b.onTouchMove, a),
			!1
		}
	}
	function D(c) {
		y && a.swipeReset();
		if (!b.onlyExternal && a.isTouched) {
			a.isTouched = !1;
			b.grabCursor && (a.container.style.cursor = "move", a.container.style.cursor = "grab", a.container.style.cursor = "-moz-grab", a.container.style.cursor = "-webkit-grab");
			a.positions.current || 0 === a.positions.current || (a.positions.current = a.positions.start);
			b.followFinger && a.setWrapperTranslate(a.positions.current);
			a.times.end = (new Date).getTime();
			a.touches.diff = a.touches.current - a.touches.start;
			a.touches.abs = Math.abs(a.touches.diff);
			a.positions.diff = a.positions.current - a.positions.start;
			a.positions.abs = Math.abs(a.positions.diff);
			var d = a.positions.diff,
			e = a.positions.abs;
			c = a.times.end - a.times.start;
			5 > e && 300 > c && !1 == a.allowLinks && (b.freeMode || 0 == e || a.swipeReset(), b.preventLinks && (a.allowLinks = !0), b.onSlideClick && (a.allowSlideClick = !0));
			setTimeout(function() {
				b.preventLinks && (a.allowLinks = !0);
				b.onSlideClick && (a.allowSlideClick = !0)
			},
			100);
			var f = h();
			if (!a.isMoved && b.freeMode) a.isMoved = !1,
			b.onTouchEnd && a.fireCallback(b.onTouchEnd, a);
			else if (!a.isMoved || 0 < a.positions.current || a.positions.current < -f) a.swipeReset(),
			b.onTouchEnd && a.fireCallback(b.onTouchEnd, a);
			else if (a.isMoved = !1, b.freeMode) {
				if (b.freeModeFluid) {
					var e = 1E3 * b.momentumRatio,
					d = a.positions.current + a.velocity * e,
					v = !1,
					g,
					p = 20 * Math.abs(a.velocity) * b.momentumBounceRatio;
					d < -f && (b.momentumBounce && a.support.transitions ? (d +
					f < -p && (d = -f - p), g = -f, I = v = !0) : d = -f);
					0 < d && (b.momentumBounce && a.support.transitions ? (d > p && (d = p), g = 0, I = v = !0) : d = 0);
					0 != a.velocity && (e = Math.abs((d - a.positions.current) / a.velocity));
					a.setWrapperTranslate(d);
					a.setWrapperTransition(e);
					b.momentumBounce && v && a.wrapperTransitionEnd(function() {
						I && (b.onMomentumBounce && a.fireCallback(b.onMomentumBounce, a), a.callPlugins("onMomentumBounce"), a.setWrapperTranslate(g), a.setWrapperTransition(300))
					});
					a.updateActiveSlide(d)
				} (!b.freeModeFluid || 300 <= c) && a.updateActiveSlide(a.positions.current);
				b.onTouchEnd && a.fireCallback(b.onTouchEnd, a)
			} else {
				H = 0 > d ? "toNext": "toPrev";
				"toNext" == H && 300 >= c && (30 > e || !b.shortSwipes ? a.swipeReset() : a.swipeNext(!0));
				"toPrev" == H && 300 >= c && (30 > e || !b.shortSwipes ? a.swipeReset() : a.swipePrev(!0));
				f = 0;
				if ("auto" == b.slidesPerView) {
					for (var d = Math.abs(a.getWrapperTranslate()), k = v = 0; k < a.slides.length; k++) if (p = l ? a.slides[k].getWidth(!0) : a.slides[k].getHeight(!0), v += p, v > d) {
						f = p;
						break
					}
					f > m && (f = m)
				} else f = s * b.slidesPerView;
				"toNext" == H && 300 < c && (e >= 0.5 * f ? a.swipeNext(!0) : a.swipeReset());
				"toPrev" == H && 300 < c && (e >= 0.5 * f ? a.swipePrev(!0) : a.swipeReset());
				if (b.onTouchEnd) b.onTouchEnd(a)
			}
			a.callPlugins("onTouchEnd");
			if(typeof(cmread)!="undefined"){
			cmread.callBackClient('notifyFromPage', '{"gesture":"touchend"}', '');
			}
			
		}
	}
	function K(c, d, e) {
		function f() {
			g += l * ( + new Date - h) / (1E3 / 60); (k = "toNext" == m ? g > c: g < c) ? (a.setWrapperTranslate(Math.round(g)), a._DOMAnimating = !0, window.setTimeout(function() {
				f()
			},
			1E3 / 60)) : (b.onSlideChangeEnd && a.fireCallback(b.onSlideChangeEnd, a), a.setWrapperTranslate(c), a._DOMAnimating = !1)
		}
		var v = "to" == d && 0 <= e.speed ? e.speed: b.speed,
		h = +new Date;
		if (a.support.transitions || !b.DOMAnimation) a.setWrapperTranslate(c),
		a.setWrapperTransition(v);
		else {
			var g = a.getWrapperTranslate(),
			l = Math.ceil((c - g) / v * (1E3 / 60)),
			m = g > c ? "toNext": "toPrev",
			k = "toNext" == m ? g > c: g < c;
			if (a._DOMAnimating) return;
			f()
		}
		a.updateActiveSlide(c);
		b.onSlideNext && "next" == d && a.fireCallback(b.onSlideNext, a, c);
		b.onSlidePrev && "prev" == d && a.fireCallback(b.onSlidePrev, a, c);
		b.onSlideReset && "reset" == d && a.fireCallback(b.onSlideReset, a, c); ("next" == d || "prev" == d || "to" == d && !0 == e.runCallbacks) && Z(d)
	}
	function Z(c) {
		a.callPlugins("onSlideChangeStart");
		if (b.onSlideChangeStart) if (b.queueStartCallbacks && a.support.transitions) {
			if (a._queueStartCallbacks) return;
			a._queueStartCallbacks = !0;
			a.fireCallback(b.onSlideChangeStart, a, c);
			a.wrapperTransitionEnd(function() {
				a._queueStartCallbacks = !1
			})
		} else a.fireCallback(b.onSlideChangeStart, a, c);
		b.onSlideChangeEnd && (a.support.transitions ? b.queueEndCallbacks ? a._queueEndCallbacks || (a._queueEndCallbacks = !0, a.wrapperTransitionEnd(function(d) {
			a.fireCallback(b.onSlideChangeEnd, d, c)
		})) : a.wrapperTransitionEnd(function(d) {
			a.fireCallback(b.onSlideChangeEnd, d, c)
		}) : b.DOMAnimation || setTimeout(function() {
			a.fireCallback(b.onSlideChangeStart, a, c)
		},
		10))
	}
	function X() {
		for (var c = a.paginationButtons, b = 0; b < c.length; b++) a.h.removeEventListener(c[b], "click", Y)
	}
	function Y(c) {
		var b;
		c = c.target || c.srcElement;
		for (var e = a.paginationButtons, f = 0; f < e.length; f++) c === e[f] && (b = f);
		a.swipeTo(b)
	}
	function O() {
		E = setTimeout(function() {
			b.loop ? (a.fixLoop(), a.swipeNext(!0)) : a.swipeNext(!0) || a.swipeTo(0);
			a.wrapperTransitionEnd(function() {
				"undefined" !== typeof E && O()
			})
		},
		b.autoplay)
	}
	if (document.body.__defineGetter__ && HTMLElement) {
		var u = HTMLElement.prototype;
		u.__defineGetter__ && u.__defineGetter__("outerHTML",
		function() {
			return (new XMLSerializer).serializeToString(this)
		})
	}
	window.getComputedStyle || (window.getComputedStyle = function(a, b) {
		this.el = a;
		this.getPropertyValue = function(b) {
			var d = /(\-([a-z]){1})/g;
			"float" === b && (b = "styleFloat");
			d.test(b) && (b = b.replace(d,
			function(a, b, c) {
				return c.toUpperCase()
			}));
			return a.currentStyle[b] ? a.currentStyle[b] : null
		};
		return this
	});
	Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
		for (var e = b || 0, f = this.length; e < f; e++) if (this[e] === a) return e;
		return - 1
	});
	if ((document.querySelectorAll || window.jQuery) && "undefined" !== typeof f && (f.nodeType || 0 !== g(f).length)) {
		var a = this;
		a.touches = {
			start: 0,
			startX: 0,
			startY: 0,
			current: 0,
			currentX: 0,
			currentY: 0,
			diff: 0,
			abs: 0
		};
		a.positions = {
			start: 0,
			abs: 0,
			diff: 0,
			current: 0
		};
		a.times = {
			start: 0,
			end: 0
		};
		a.id = (new Date).getTime();
		a.container = f.nodeType ? f: g(f)[0];
		a.isTouched = !1;
		a.isMoved = !1;
		a.activeIndex = 0;
		a.centerIndex = 0;
		a.activeLoaderIndex = 0;
		a.activeLoopIndex = 0;
		a.previousIndex = null;
		a.velocity = 0;
		a.snapGrid = [];
		a.slidesGrid = [];
		a.imagesToLoad = [];
		a.imagesLoaded = 0;
		a.wrapperLeft = 0;
		a.wrapperRight = 0;
		a.wrapperTop = 0;
		a.wrapperBottom = 0;
		var L,
		s,
		A,
		H,
		y,
		m,
		u = {
			mode: "horizontal",
			touchRatio: 1,
			speed: 300,
			freeMode: !1,
			freeModeFluid: !1,
			momentumRatio: 1,
			momentumBounce: !0,
			momentumBounceRatio: 1,
			slidesPerView: 1,
			slidesPerGroup: 1,
			simulateTouch: !0,
			followFinger: !0,
			shortSwipes: !0,
			moveStartThreshold: !1,
			onlyExternal: !1,
			createPagination: !0,
			pagination: !1,
			paginationElement: "span",
			paginationClickable: !1,
			paginationAsRange: !0,
			resistance: !0,
			scrollContainer: !1,
			preventLinks: !0,
			noSwiping: !1,
			noSwipingClass: "swiper-no-swiping",
			initialSlide: 0,
			keyboardControl: !1,
			mousewheelControl: !1,
			mousewheelControlForceToAxis: !1,
			useCSS3Transforms: !0,
			autoplay: !1,
			autoplayDisableOnInteraction: !0,
			loop: !1,
			loopAdditionalSlides: 0,
			calculateHeight: !1,
			cssWidthAndHeight: !1,
			updateOnImagesReady: !0,
			releaseFormElements: !0,
			watchActiveIndex: !1,
			visibilityFullFit: !1,
			offsetPxBefore: 0,
			offsetPxAfter: 0,
			offsetSlidesBefore: 0,
			offsetSlidesAfter: 0,
			centeredSlides: !1,
			queueStartCallbacks: !1,
			queueEndCallbacks: !1,
			autoResize: !0,
			resizeReInit: !1,
			DOMAnimation: !0,
			loader: {
				slides: [],
				slidesHTMLType: "inner",
				surroundGroups: 1,
				logic: "reload",
				loadAllSlides: !1
			},
			slideElement: "div",
			slideClass: "swiper-slide",
			slideActiveClass: "swiper-slide-active",
			slideVisibleClass: "swiper-slide-visible",
			wrapperClass: "swiper-wrapper",
			paginationElementClass: "swiper-pagination-switch",
			paginationActiveClass: "swiper-active-switch",
			paginationVisibleClass: "swiper-visible-switch"
		};
		b = b || {};
		for (var n in u) if (n in b && "object" === typeof b[n]) for (var F in u[n]) F in b[n] || (b[n][F] = u[n][F]);
		else n in b || (b[n] = u[n]);
		a.params = b;
		b.scrollContainer && (b.freeMode = !0, b.freeModeFluid = !0);
		b.loop && (b.resistance = "100%");
		var l = "horizontal" === b.mode;
		a.touchEvents = {
			touchStart: a.support.touch || !b.simulateTouch ? "touchstart": a.browser.ie10 ? "MSPointerDown": "mousedown",
			touchMove: a.support.touch || !b.simulateTouch ? "touchmove": a.browser.ie10 ? "MSPointerMove": "mousemove",
			touchEnd: a.support.touch || !b.simulateTouch ? "touchend": a.browser.ie10 ? "MSPointerUp": "mouseup"
		};
		for (n = a.container.childNodes.length - 1; 0 <= n; n--) if (a.container.childNodes[n].className) for (F = a.container.childNodes[n].className.split(" "), u = 0; u < F.length; u++) F[u] === b.wrapperClass && (L = a.container.childNodes[n]);
		a.wrapper = L;
		a._extendSwiperSlide = function(c) {
			c.append = function() {
				b.loop ? (c.insertAfter(a.slides.length - a.loopedSlides), a.removeLoopedSlides(), a.calcSlides(), a.createLoop()) : a.wrapper.appendChild(c);
				a.reInit();
				return c
			};
			c.prepend = function() {
				b.loop ? (a.wrapper.insertBefore(c, a.slides[a.loopedSlides]), a.removeLoopedSlides(), a.calcSlides(), a.createLoop()) : a.wrapper.insertBefore(c, a.wrapper.firstChild);
				a.reInit();
				return c
			};
			c.insertAfter = function(d) {
				if ("undefined" === typeof d) return ! 1;
				b.loop ? (d = a.slides[d + 1 + a.loopedSlides], a.wrapper.insertBefore(c, d), a.removeLoopedSlides(), a.calcSlides(), a.createLoop()) : (d = a.slides[d + 1], a.wrapper.insertBefore(c, d));
				a.reInit();
				return c
			};
			c.clone = function() {
				return a._extendSwiperSlide(c.cloneNode(!0))
			};
			c.remove = function() {
				a.wrapper.removeChild(c);
				a.reInit()
			};
			c.html = function(a) {
				if ("undefined" === typeof a) return c.innerHTML;
				c.innerHTML = a;
				return c
			};
			c.index = function() {
				for (var b, e = a.slides.length - 1; 0 <= e; e--) c === a.slides[e] && (b = e);
				return b
			};
			c.isActive = function() {
				return c.index() === a.activeIndex ? !0: !1
			};
			c.swiperSlideDataStorage || (c.swiperSlideDataStorage = {});
			c.getData = function(a) {
				return c.swiperSlideDataStorage[a]
			};
			c.setData = function(a, b) {
				c.swiperSlideDataStorage[a] = b;
				return c
			};
			c.data = function(a, b) {
				return b ? (c.setAttribute("data-" + a, b), c) : c.getAttribute("data-" +
				a)
			};
			c.getWidth = function(b) {
				return a.h.getWidth(c, b)
			};
			c.getHeight = function(b) {
				return a.h.getHeight(c, b)
			};
			c.getOffset = function() {
				return a.h.getOffset(c)
			};
			return c
		};
		a.calcSlides = function(c) {
			var d = a.slides ? a.slides.length: !1;
			a.slides = [];
			a.displaySlides = [];
			for (var e = 0; e < a.wrapper.childNodes.length; e++) if (a.wrapper.childNodes[e].className) for (var f = a.wrapper.childNodes[e].className.split(" "), g = 0; g < f.length; g++) f[g] === b.slideClass && a.slides.push(a.wrapper.childNodes[e]);
			for (e = a.slides.length - 1; 0 <= e; e--) a._extendSwiperSlide(a.slides[e]); ! 1 === d || d === a.slides.length && !c || (t(), q(), a.updateActiveSlide(), a.params.pagination && a.createPagination(), a.callPlugins("numberOfSlidesChanged"))
		};
		a.createSlide = function(c, d, e) {
			d = d || a.params.slideClass;
			e = e || b.slideElement;
			e = document.createElement(e);
			e.innerHTML = c || "";
			e.className = d;
			return a._extendSwiperSlide(e)
		};
		a.appendSlide = function(b, d, e) {
			if (b) return b.nodeType ? a._extendSwiperSlide(b).append() : a.createSlide(b, d, e).append()
		};
		a.prependSlide = function(b, d, e) {
			if (b) return b.nodeType ? a._extendSwiperSlide(b).prepend() : a.createSlide(b, d, e).prepend()
		};
		a.insertSlideAfter = function(b, d, e, f) {
			return "undefined" === typeof b ? !1: d.nodeType ? a._extendSwiperSlide(d).insertAfter(b) : a.createSlide(d, e, f).insertAfter(b)
		};
		a.removeSlide = function(c) {
			if (a.slides[c]) {
				if (b.loop) {
					if (!a.slides[c + a.loopedSlides]) return ! 1;
					a.slides[c + a.loopedSlides].remove();
					a.removeLoopedSlides();
					a.calcSlides();
					a.createLoop()
				} else a.slides[c].remove();
				return ! 0
			}
			return ! 1
		};
		a.removeLastSlide = function() {
			return 0 < a.slides.length ? (b.loop ? (a.slides[a.slides.length -
			1 - a.loopedSlides].remove(), a.removeLoopedSlides(), a.calcSlides(), a.createLoop()) : a.slides[a.slides.length - 1].remove(), !0) : !1
		};
		a.removeAllSlides = function() {
			for (var b = a.slides.length - 1; 0 <= b; b--) a.slides[b].remove()
		};
		a.getSlide = function(b) {
			return a.slides[b]
		};
		a.getLastSlide = function() {
			return a.slides[a.slides.length - 1]
		};
		a.getFirstSlide = function() {
			return a.slides[0]
		};
		a.activeSlide = function() {
			return a.slides[a.activeIndex]
		};
		var M = [],
		z;
		for (z in a.plugins) b[z] && (n = a.plugins[z](a, b[z])) && M.push(n);
		a.callPlugins = function(a, b) {
			b || (b = {});
			for (var e = 0; e < M.length; e++) if (a in M[e]) M[e][a](b)
		};
		a.fireCallback = function(a, b, e, f, g, h) {
			if ("[object Array]" === Object.prototype.toString.call(a)) for (var p = 0; p < a.length; p++) {
				if ("function" === typeof a[p]) a[p](b, e, f, g, h)
			} else a(b, e, f, g, h)
		};
		a.addCallback = function(a, b) {
			var e;
			if (this.params["on" + a]) {
				e = "[object Array]" === Object.prototype.toString.apply(this.params["on" + a]) ? !0: !1;
				if (e) return this.params["on" + a].push(b);
				if ("function" === typeof this.params["on" + a]) return e = this.params["on" +
				a],
				this.params["on" + a] = [],
				this.params["on" + a].push(e),
				this.params["on" + a].push(b)
			} else return this.params["on" + a] = [],
			this.params["on" + a].push(b)
		};
		a.removeCallbacks = function(b) {
			if (a.params["on" + b]) return a.params["on" + b] = null
		};
		a.browser.ie10 && !b.onlyExternal && a.wrapper.classList.add("swiper-wp8-" + (l ? "horizontal": "vertical"));
		b.freeMode && (a.container.className += " swiper-free-mode");
		a.initialized = !1;
		a.init = function(c, d) {
			var e = a.h.getWidth(a.container),
			f = a.h.getHeight(a.container);
			if (e !== a.width || f !== a.height || c) {
				a.width = e;
				a.height = f;
				m = l ? e: f;
				e = a.wrapper;
				c && a.calcSlides(d);
				if ("auto" === b.slidesPerView) {
					var g = 0,
					h = 0;
					0 < b.slidesOffset && (e.style.paddingLeft = "", e.style.paddingRight = "", e.style.paddingTop = "", e.style.paddingBottom = "");
					e.style.width = "";
					e.style.height = "";
					0 < b.offsetPxBefore && (l ? a.wrapperLeft = b.offsetPxBefore: a.wrapperTop = b.offsetPxBefore);
					0 < b.offsetPxAfter && (l ? a.wrapperRight = b.offsetPxAfter: a.wrapperBottom = b.offsetPxAfter);
					b.centeredSlides && (l ? (a.wrapperLeft = (m - this.slides[0].getWidth(!0)) / 2, a.wrapperRight = (m - a.slides[a.slides.length - 1].getWidth(!0)) / 2) : (a.wrapperTop = (m - a.slides[0].getHeight(!0)) / 2, a.wrapperBottom = (m - a.slides[a.slides.length - 1].getHeight(!0)) / 2));
					l ? (0 <= a.wrapperLeft && (e.style.paddingLeft = a.wrapperLeft + "px"), 0 <= a.wrapperRight && (e.style.paddingRight = a.wrapperRight + "px")) : (0 <= a.wrapperTop && (e.style.paddingTop = a.wrapperTop + "px"), 0 <= a.wrapperBottom && (e.style.paddingBottom = a.wrapperBottom + "px"));
					var p = 0,
					k = 0;
					a.snapGrid = [];
					a.slidesGrid = [];
					for (var n = 0, r = 0; r < a.slides.length; r++) {
						var f = a.slides[r].getWidth(!0),
						q = a.slides[r].getHeight(!0);
						b.calculateHeight && (n = Math.max(n, q));
						var t = l ? f: q;
						if (b.centeredSlides) {
							var u = r === a.slides.length - 1 ? 0: a.slides[r + 1].getWidth(!0),
							w = r === a.slides.length - 1 ? 0: a.slides[r + 1].getHeight(!0),
							u = l ? u: w;
							if (t > m) {
								for (w = 0; w <= Math.floor(t / (m + a.wrapperLeft)); w++) 0 === w ? a.snapGrid.push(p + a.wrapperLeft) : a.snapGrid.push(p + a.wrapperLeft + m * w);
								a.slidesGrid.push(p + a.wrapperLeft)
							} else a.snapGrid.push(k),
							a.slidesGrid.push(k);
							k += t / 2 + u / 2
						} else {
							if (t > m) for (w = 0; w <= Math.floor(t / m); w++) a.snapGrid.push(p +
							m * w);
							else a.snapGrid.push(p);
							a.slidesGrid.push(p)
						}
						p += t;
						g += f;
						h += q
					}
					b.calculateHeight && (a.height = n);
					l ? (A = g + a.wrapperRight + a.wrapperLeft, e.style.width = g + "px", e.style.height = a.height + "px") : (A = h + a.wrapperTop + a.wrapperBottom, e.style.width = a.width + "px", e.style.height = h + "px")
				} else if (b.scrollContainer) e.style.width = "",
				e.style.height = "",
				n = a.slides[0].getWidth(!0),
				g = a.slides[0].getHeight(!0),
				A = l ? n: g,
				e.style.width = n + "px",
				e.style.height = g + "px",
				s = l ? n: g;
				else {
					if (b.calculateHeight) {
						g = n = 0;
						l || (a.container.style.height = "");
						e.style.height = "";
						for (r = 0; r < a.slides.length; r++) a.slides[r].style.height = "",
						n = Math.max(a.slides[r].getHeight(!0), n),
						l || (g += a.slides[r].getHeight(!0));
						q = n;
						a.height = q;
						l ? g = q: (m = q, a.container.style.height = m + "px")
					} else q = l ? a.height: a.height / b.slidesPerView,
					g = l ? a.height: a.slides.length * q;
					f = l ? a.width / b.slidesPerView: a.width;
					n = l ? a.slides.length * f: a.width;
					s = l ? f: q;
					0 < b.offsetSlidesBefore && (l ? a.wrapperLeft = s * b.offsetSlidesBefore: a.wrapperTop = s * b.offsetSlidesBefore);
					0 < b.offsetSlidesAfter && (l ? a.wrapperRight = s * b.offsetSlidesAfter: a.wrapperBottom = s * b.offsetSlidesAfter);
					0 < b.offsetPxBefore && (l ? a.wrapperLeft = b.offsetPxBefore: a.wrapperTop = b.offsetPxBefore);
					0 < b.offsetPxAfter && (l ? a.wrapperRight = b.offsetPxAfter: a.wrapperBottom = b.offsetPxAfter);
					b.centeredSlides && (l ? (a.wrapperLeft = (m - s) / 2, a.wrapperRight = (m - s) / 2) : (a.wrapperTop = (m - s) / 2, a.wrapperBottom = (m - s) / 2));
					l ? (0 < a.wrapperLeft && (e.style.paddingLeft = a.wrapperLeft + "px"), 0 < a.wrapperRight && (e.style.paddingRight = a.wrapperRight + "px")) : (0 < a.wrapperTop && (e.style.paddingTop = a.wrapperTop + "px"), 0 < a.wrapperBottom && (e.style.paddingBottom = a.wrapperBottom + "px"));
					A = l ? n + a.wrapperRight + a.wrapperLeft: g + a.wrapperTop + a.wrapperBottom;
					b.cssWidthAndHeight || (0 < parseFloat(n) && (e.style.width = n + "px"), 0 < parseFloat(g) && (e.style.height = g + "px"));
					p = 0;
					a.snapGrid = [];
					a.slidesGrid = [];
					for (r = 0; r < a.slides.length; r++) a.snapGrid.push(p),
					a.slidesGrid.push(p),
					p += s,
					b.cssWidthAndHeight || (0 < parseFloat(f) && (a.slides[r].style.width = f + "px"), 0 < parseFloat(q) && (a.slides[r].style.height = q + "px"))
				}
				a.initialized ? (a.callPlugins("onInit"), b.onInit && a.fireCallback(b.onInit, a)) : (a.callPlugins("onFirstInit"), b.onFirstInit && a.fireCallback(b.onFirstInit, a));
				a.initialized = !0
			}
		};
		a.reInit = function(b) {
			a.init(!0, b)
		};
		a.resizeFix = function(c) {
			a.callPlugins("beforeResizeFix");
			a.init(b.resizeReInit || c);
			b.freeMode ? a.getWrapperTranslate() < -h() && (a.setWrapperTransition(0), a.setWrapperTranslate( - h())) : a.swipeTo(b.loop ? a.activeLoopIndex: a.activeIndex, 0, !1);
			a.callPlugins("afterResizeFix")
		};
		a.destroy = function(c) {
			c = a.h.removeEventListener;
			a.browser.ie10 ? (c(a.wrapper, a.touchEvents.touchStart, B), c(document, a.touchEvents.touchMove, C), c(document, a.touchEvents.touchEnd, D)) : (a.support.touch && (c(a.wrapper, "touchstart", B), c(a.wrapper, "touchmove", C), c(a.wrapper, "touchend", D)), b.simulateTouch && (c(a.wrapper, "mousedown", B), c(document, "mousemove", C), c(document, "mouseup", D)));
			b.autoResize && c(window, "resize", a.resizeFix);
			t();
			b.paginationClickable && X();
			b.mousewheelControl && a._wheelEvent && c(a.container, a._wheelEvent, P);
			b.keyboardControl && c(document, "keydown", Q);
			b.autoplay && a.stopAutoplay();
			a.callPlugins("onDestroy");
			a = null
		};
		var V = (new Date).getTime();
		b.grabCursor && (z = a.container.style, z.cursor = "move", z.cursor = "grab", z.cursor = "-moz-grab", z.cursor = "-webkit-grab");
		a.allowSlideClick = !0;
		a.allowLinks = !0;
		var x = !1,
		N,
		I = !0,
		G,
		J;
		a.swipeNext = function(c) { ! c && b.loop && a.fixLoop(); ! c && b.autoplay && a.stopAutoplay(!0);
			a.callPlugins("onSwipeNext");
			var d = c = a.getWrapperTranslate();
			if ("auto" == b.slidesPerView) for (var e = 0; e < a.snapGrid.length; e++) {
				if ( - c >= a.snapGrid[e] && -c < a.snapGrid[e + 1]) {
					d = -a.snapGrid[e + 1];
					break
				}
			} else d = s * b.slidesPerGroup,
			d = -(Math.floor(Math.abs(c) / Math.floor(d)) * d + d);
			d < -h() && (d = -h());
			if (d == c) return ! 1;
			K(d, "next");
			return ! 0
		};
		a.swipePrev = function(c) { ! c && b.loop && a.fixLoop(); ! c && b.autoplay && a.stopAutoplay(!0);
			a.callPlugins("onSwipePrev");
			c = Math.ceil(a.getWrapperTranslate());
			var d;
			if ("auto" == b.slidesPerView) {
				d = 0;
				for (var e = 1; e < a.snapGrid.length; e++) {
					if ( - c == a.snapGrid[e]) {
						d = -a.snapGrid[e - 1];
						break
					}
					if ( - c > a.snapGrid[e] && -c < a.snapGrid[e + 1]) {
						d = -a.snapGrid[e];
						break
					}
				}
			} else d = s * b.slidesPerGroup,
			d *= -(Math.ceil( - c / d) - 1);
			0 < d && (d = 0);
			if (d == c) return ! 1;
			K(d, "prev");
			return ! 0
		};
		a.swipeReset = function() {
			a.callPlugins("onSwipeReset");
			var c = a.getWrapperTranslate(),
			d = s * b.slidesPerGroup;
			h();
			if ("auto" == b.slidesPerView) {
				for (var e = d = 0; e < a.snapGrid.length; e++) {
					if ( - c === a.snapGrid[e]) return;
					if ( - c >= a.snapGrid[e] && -c < a.snapGrid[e + 1]) {
						d = 0 < a.positions.diff ? -a.snapGrid[e + 1] : -a.snapGrid[e];
						break
					}
				} - c >= a.snapGrid[a.snapGrid.length - 1] && (d = -a.snapGrid[a.snapGrid.length - 1]);
				c <= -h() && (d = -h())
			} else d = 0 > c ? Math.round(c / d) * d: 0;
			b.scrollContainer && (d = 0 > c ? c: 0);
			d < -h() && (d = -h());
			b.scrollContainer && m > s && (d = 0);
			if (d == c) return ! 1;
			K(d, "reset");
			return ! 0
		};
		a.swipeTo = function(c, d, e) {
			c = parseInt(c, 10);
			a.callPlugins("onSwipeTo", {
				index: c,
				speed: d
			});
			b.loop && (c += a.loopedSlides);
			var f = a.getWrapperTranslate();
			if (! (c > a.slides.length - 1 || 0 > c)) {
				var g;
				g = "auto" == b.slidesPerView ? -a.slidesGrid[c] : -c * s;
				g < -h() && (g = -h());
				if (g == f) return ! 1;
				K(g, "to", {
					index: c,
					speed: d,
					runCallbacks: !1 === e ? !1: !0
				});
				return ! 0
			}
		};
		a._queueStartCallbacks = !1;
		a._queueEndCallbacks = !1;
		a.updateActiveSlide = function(c) {
			if (a.initialized && 0 != a.slides.length) {
				a.previousIndex = a.activeIndex;
				"undefined" == typeof c && (c = a.getWrapperTranslate());
				0 < c && (c = 0);
				if ("auto" == b.slidesPerView) {
					if (a.activeIndex = a.slidesGrid.indexOf( - c), 0 > a.activeIndex) {
						for (var d = 0; d < a.slidesGrid.length - 1 && !( - c > a.slidesGrid[d] && -c < a.slidesGrid[d + 1]); d++);
						var e = Math.abs(a.slidesGrid[d] + c),
						f = Math.abs(a.slidesGrid[d + 1] + c);
						a.activeIndex = e <= f ? d: d + 1
					}
				} else a.activeIndex = Math[b.visibilityFullFit ? "ceil": "round"]( - c / s);
				a.activeIndex == a.slides.length && (a.activeIndex = a.slides.length - 1);
				0 > a.activeIndex && (a.activeIndex = 0);
				if (a.slides[a.activeIndex]) {
					a.calcVisibleSlides(c);
					e = RegExp("\\s*" + b.slideActiveClass);
					f = RegExp("\\s*" + b.slideVisibleClass);
					for (d = 0; d < a.slides.length; d++) a.slides[d].className = a.slides[d].className.replace(e, "").replace(f, ""),
					0 <= a.visibleSlides.indexOf(a.slides[d]) && (a.slides[d].className += " " + b.slideVisibleClass);
					a.slides[a.activeIndex].className += " " + b.slideActiveClass;
					b.loop ? (d = a.loopedSlides, a.activeLoopIndex = a.activeIndex - d, a.activeLoopIndex >= a.slides.length - 2 * d && (a.activeLoopIndex = a.slides.length - 2 * d - a.activeLoopIndex), 0 > a.activeLoopIndex && (a.activeLoopIndex = a.slides.length - 2 * d + a.activeLoopIndex)) : a.activeLoopIndex = a.activeIndex;
					b.pagination && a.updatePagination(c)
				}
			}
		};
		a.createPagination = function(c) {
			b.paginationClickable && a.paginationButtons && X();
			a.paginationContainer = b.pagination.nodeType ? b.pagination: g(b.pagination)[0];
			if (b.createPagination) {
				var d = "",
				e = a.slides.length;
				b.loop && (e -= 2 * a.loopedSlides);
				for (var f = 0; f < e; f++) d += "<" + b.paginationElement + ' class="' + b.paginationElementClass + '"></' + b.paginationElement + ">";
				a.paginationContainer.innerHTML = d
			}
			a.paginationButtons = g("." + b.paginationElementClass, a.paginationContainer);
			c || a.updatePagination();
			a.callPlugins("onCreatePagination");
			if (b.paginationClickable) for (c = a.paginationButtons, d = 0; d < c.length; d++) a.h.addEventListener(c[d], "click", Y)
		};
		a.updatePagination = function(c) {
			if (b.pagination && !(1 > a.slides.length) && g("." + b.paginationActiveClass, a.paginationContainer)) {
				var d = a.paginationButtons;
				if (0 != d.length) {
					for (var e = 0; e < d.length; e++) d[e].className = b.paginationElementClass;
					var f = b.loop ? a.loopedSlides: 0;
					if (b.paginationAsRange) {
						a.visibleSlides || a.calcVisibleSlides(c);
						c = [];
						for (e = 0; e < a.visibleSlides.length; e++) {
							var h = a.slides.indexOf(a.visibleSlides[e]) - f;
							b.loop && 0 > h && (h = a.slides.length - 2 * a.loopedSlides + h);
							b.loop && h >= a.slides.length - 2 * a.loopedSlides && (h = a.slides.length - 2 * a.loopedSlides - h, h = Math.abs(h));
							c.push(h)
						}
						for (e = 0; e < c.length; e++) d[c[e]] && (d[c[e]].className += " " + b.paginationVisibleClass);
						b.loop ? d[a.activeLoopIndex].className += " " + b.paginationActiveClass: d[a.activeIndex].className += " " + b.paginationActiveClass
					} else b.loop ? d[a.activeLoopIndex].className += " " + b.paginationActiveClass + " " + b.paginationVisibleClass: d[a.activeIndex].className += " " + b.paginationActiveClass + " " + b.paginationVisibleClass
				}
			}
		};
		a.calcVisibleSlides = function(c) {
			var d = [],
			e = 0,
			f = 0,
			g = 0;
			l && 0 < a.wrapperLeft && (c += a.wrapperLeft); ! l && 0 < a.wrapperTop && (c += a.wrapperTop);
			for (var h = 0; h < a.slides.length; h++) {
				var e = e + f,
				f = "auto" == b.slidesPerView ? l ? a.h.getWidth(a.slides[h], !0) : a.h.getHeight(a.slides[h], !0) : s,
				g = e + f,
				k = !1;
				b.visibilityFullFit ? (e >= -c && g <= -c + m && (k = !0), e <= -c && g >= -c + m && (k = !0)) : (g > -c && g <= -c + m && (k = !0), e >= -c && e < -c + m && (k = !0), e < -c && g > -c + m && (k = !0));
				k && d.push(a.slides[h])
			}
			0 == d.length && (d = [a.slides[a.activeIndex]]);
			a.visibleSlides = d
		};
		var E = void 0;
		a.startAutoplay = function() {
			if ("undefined" !== typeof E) return ! 1;
			b.autoplay && (a.callPlugins("onAutoplayStart"), O())
		};
		a.stopAutoplay = function(c) {
			E && clearTimeout(E);
			E = void 0;
			c && !b.autoplayDisableOnInteraction && a.wrapperTransitionEnd(function() {
				O()
			});
			a.callPlugins("onAutoplayStop")
		};
		a.loopCreated = !1;
		a.removeLoopedSlides = function() {
			if (a.loopCreated) for (var b = 0; b < a.slides.length; b++) ! 0 === a.slides[b].getData("looped") && a.wrapper.removeChild(a.slides[b])
		};
		a.createLoop = function() {
			if (0 != a.slides.length) {
				a.loopedSlides = "auto" == b.slidesPerView ? b.loopedSlides || 1: b.slidesPerView + b.loopAdditionalSlides;
				a.loopedSlides > a.slides.length && (a.loopedSlides = a.slides.length);
				var c = "",
				d = "",
				e,
				f = "",
				g = a.slides.length,
				h = Math.floor(a.loopedSlides / g),
				k = a.loopedSlides % g;
				for (e = 0; e < h * g; e++) {
					var l = e;
					e >= g && (l = e - g * Math.floor(e / g));
					f += a.slides[l].outerHTML
				}
				for (e = 0; e < k; e++) d += a.slides[e].outerHTML;
				for (e = g - k; e < g; e++) c += a.slides[e].outerHTML;
				L.innerHTML = c + f + L.innerHTML + f + d;
				a.loopCreated = !0;
				a.calcSlides();
				for (e = 0; e < a.slides.length; e++)(e < a.loopedSlides || e >= a.slides.length - a.loopedSlides) && a.slides[e].setData("looped", !0);
				a.callPlugins("onCreateLoop")
			}
		};
		a.fixLoop = function() {
			var c;
			a.activeIndex < a.loopedSlides ? (c = a.slides.length - 3 * a.loopedSlides + a.activeIndex, a.swipeTo(c, 0, !1)) : a.activeIndex > a.slides.length - 2 * b.slidesPerView && (c = -a.slides.length + a.activeIndex + a.loopedSlides, a.swipeTo(c, 0, !1))
		};
		a.loadSlides = function() {
			var c = "";
			a.activeLoaderIndex = 0;
			for (var d = b.loader.slides, e = b.loader.loadAllSlides ? d.length: b.slidesPerView * (1 + b.loader.surroundGroups), f = 0; f < e; f++) c = "outer" == b.loader.slidesHTMLType ? c + d[f] : c + ("<" + b.slideElement + ' class="' + b.slideClass + '" data-swiperindex="' + f + '">' + d[f] + "</" +
			b.slideElement + ">");
			a.wrapper.innerHTML = c;
			a.calcSlides(!0);
			b.loader.loadAllSlides || a.wrapperTransitionEnd(a.reloadSlides, !0)
		};
		a.reloadSlides = function() {
			var c = b.loader.slides,
			d = parseInt(a.activeSlide().data("swiperindex"), 10);
			if (! (0 > d || d > c.length - 1)) {
				a.activeLoaderIndex = d;
				var e = Math.max(0, d - b.slidesPerView * b.loader.surroundGroups),
				f = Math.min(d + b.slidesPerView * (1 + b.loader.surroundGroups) - 1, c.length - 1);
				0 < d && (a.setWrapperTranslate( - s * (d - e)), a.setWrapperTransition(0));
				if ("reload" === b.loader.logic) {
					for (var g = a.wrapper.innerHTML = "", d = e; d <= f; d++) g += "outer" == b.loader.slidesHTMLType ? c[d] : "<" + b.slideElement + ' class="' + b.slideClass + '" data-swiperindex="' + d + '">' + c[d] + "</" + b.slideElement + ">";
					a.wrapper.innerHTML = g
				} else {
					for (var g = 1E3, h = 0, d = 0; d < a.slides.length; d++) {
						var k = a.slides[d].data("swiperindex");
						k < e || k > f ? a.wrapper.removeChild(a.slides[d]) : (g = Math.min(k, g), h = Math.max(k, h))
					}
					for (d = e; d <= f; d++) d < g && (e = document.createElement(b.slideElement), e.className = b.slideClass, e.setAttribute("data-swiperindex", d), e.innerHTML = c[d], a.wrapper.insertBefore(e, a.wrapper.firstChild)),
					d > h && (e = document.createElement(b.slideElement), e.className = b.slideClass, e.setAttribute("data-swiperindex", d), e.innerHTML = c[d], a.wrapper.appendChild(e))
				}
				a.reInit(!0)
			}
		};
		a.calcSlides();
		0 < b.loader.slides.length && 0 == a.slides.length && a.loadSlides();
		b.loop && a.createLoop();
		a.init();
		k();
		b.pagination && a.createPagination(!0);
		b.loop || 0 < b.initialSlide ? a.swipeTo(b.initialSlide, 0, !1) : a.updateActiveSlide(0);
		b.autoplay && a.startAutoplay();
		a.centerIndex = a.activeIndex;
		b.onSwiperCreated && a.fireCallback(b.onSwiperCreated, a);
		a.callPlugins("onSwiperCreated")
	}
};
Swiper.prototype = {
	plugins: {},
	wrapperTransitionEnd: function(f, b) {
		function g() {
			f(h);
			h.params.queueEndCallbacks && (h._queueEndCallbacks = !1);
			if (!b) for (t = 0; t < q.length; t++) h.h.removeEventListener(k, q[t], g)
		}
		var h = this,
		k = h.wrapper,
		q = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
		t;
		if (f) for (t = 0; t < q.length; t++) h.h.addEventListener(k, q[t], g)
	},
	getWrapperTranslate: function(f) {
		var b = this.wrapper,
		g,
		h;
		"undefined" == typeof f && (f = "horizontal" == this.params.mode ? "x": "y");
		this.support.transforms && this.params.useCSS3Transforms ? (b = window.getComputedStyle(b, null), window.WebKitCSSMatrix ? b = new WebKitCSSMatrix(b.webkitTransform) : (b = b.MozTransform || b.OTransform || b.MsTransform || b.msTransform || b.transform || b.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), g = b.toString().split(",")), "x" == f && (h = window.WebKitCSSMatrix ? b.m41: 16 == g.length ? parseFloat(g[12]) : parseFloat(g[4])), "y" == f && (h = window.WebKitCSSMatrix ? b.m42: 16 == g.length ? parseFloat(g[13]) : parseFloat(g[5]))) : ("x" == f && (h = parseFloat(b.style.left, 10) || 0), "y" == f && (h = parseFloat(b.style.top, 10) || 0));
		return h || 0
	},
	setWrapperTranslate: function(f, b, g) {
		var h = this.wrapper.style,
		k = {
			x: 0,
			y: 0,
			z: 0
		},
		q;
		3 == arguments.length ? (k.x = f, k.y = b, k.z = g) : ("undefined" == typeof b && (b = "horizontal" == this.params.mode ? "x": "y"), k[b] = f);
		this.support.transforms && this.params.useCSS3Transforms ? (q = this.support.transforms3d ? "translate3d(" + k.x + "px, " + k.y + "px, " + k.z + "px)": "translate(" + k.x + "px, " + k.y + "px)", h.webkitTransform = h.MsTransform = h.msTransform = h.MozTransform = h.OTransform = h.transform = q) : (h.left = k.x + "px", h.top = k.y + "px");
		this.callPlugins("onSetWrapperTransform", k);
		this.params.onSetWrapperTransform && this.fireCallback(this.params.onSetWrapperTransform, this, k)
	},
	setWrapperTransition: function(f) {
		var b = this.wrapper.style;
		b.webkitTransitionDuration = b.MsTransitionDuration = b.msTransitionDuration = b.MozTransitionDuration = b.OTransitionDuration = b.transitionDuration = f / 1E3 + "s";
		this.callPlugins("onSetWrapperTransition", {
			duration: f
		});
		this.params.onSetWrapperTransition && this.fireCallback(this.params.onSetWrapperTransition, this, f)
	},
	h: {
		getWidth: function(f, b) {
			var g = window.getComputedStyle(f, null).getPropertyValue("width"),
			h = parseFloat(g);
			if (isNaN(h) || 0 < g.indexOf("%")) h = f.offsetWidth - parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-left")) - parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-right"));
			b && (h += parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-right")));
			return h
		},
		getHeight: function(f, b) {
			if (b) return f.offsetHeight;
			var g = window.getComputedStyle(f, null).getPropertyValue("height"),
			h = parseFloat(g);
			if (isNaN(h) || 0 < g.indexOf("%")) h = f.offsetHeight - parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-top")) - parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-bottom"));
			b && (h += parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-top")) + parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-bottom")));
			return h
		},
		getOffset: function(f) {
			var b = f.getBoundingClientRect(),
			g = document.body,
			h = f.clientTop || g.clientTop || 0,
			g = f.clientLeft || g.clientLeft || 0,
			k = window.pageYOffset || f.scrollTop;
			f = window.pageXOffset || f.scrollLeft;
			document.documentElement && !window.pageYOffset && (k = document.documentElement.scrollTop, f = document.documentElement.scrollLeft);
			return {
				top: b.top + k - h,
				left: b.left + f - g
			}
		},
		windowWidth: function() {
			if (window.innerWidth) return window.innerWidth;
			if (document.documentElement && document.documentElement.clientWidth) return document.documentElement.clientWidth
		},
		windowHeight: function() {
			if (window.innerHeight) return window.innerHeight;
			if (document.documentElement && document.documentElement.clientHeight) return document.documentElement.clientHeight
		},
		windowScroll: function() {
			if ("undefined" != typeof pageYOffset) return {
				left: window.pageXOffset,
				top: window.pageYOffset
			};
			if (document.documentElement) return {
				left: document.documentElement.scrollLeft,
				top: document.documentElement.scrollTop
			}
		},
		addEventListener: function(f, b, g, h) {
			"undefined" == typeof h && (h = !1);
			f.addEventListener ? f.addEventListener(b, g, h) : f.attachEvent && f.attachEvent("on" + b, g)
		},
		removeEventListener: function(f, b, g, h) {
			"undefined" == typeof h && (h = !1);
			f.removeEventListener ? f.removeEventListener(b, g, h) : f.detachEvent && f.detachEvent("on" + b, g)
		}
	},
	setTransform: function(f, b) {
		var g = f.style;
		g.webkitTransform = g.MsTransform = g.msTransform = g.MozTransform = g.OTransform = g.transform = b
	},
	setTranslate: function(f, b) {
		var g = f.style,
		h = b.x || 0,
		k = b.y || 0,
		q = b.z || 0;
		g.webkitTransform = g.MsTransform = g.msTransform = g.MozTransform = g.OTransform = g.transform = this.support.transforms3d ? "translate3d(" + h + "px," + k + "px," + q + "px)": "translate(" + h + "px," + k + "px)";
		this.support.transforms || (g.left = h + "px", g.top = k + "px")
	},
	setTransition: function(f, b) {
		var g = f.style;
		g.webkitTransitionDuration = g.MsTransitionDuration = g.msTransitionDuration = g.MozTransitionDuration = g.OTransitionDuration = g.transitionDuration = b + "ms"
	},
	support: {
		touch: window.Modernizr && !0 === Modernizr.touch ||
		function() {
			return !! ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
		} (),
		transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d ||
		function() {
			var f = document.createElement("div").style;
			return "webkitPerspective" in f || "MozPerspective" in f || "OPerspective" in f || "MsPerspective" in f || "perspective" in f
		} (),
		transforms: window.Modernizr && !0 === Modernizr.csstransforms ||
		function() {
			var f = document.createElement("div").style;
			return "transform" in f || "WebkitTransform" in f || "MozTransform" in f || "msTransform" in f || "MsTransform" in f || "OTransform" in f
		} (),
		transitions: window.Modernizr && !0 === Modernizr.csstransitions ||
		function() {
			var f = document.createElement("div").style;
			return "transition" in f || "WebkitTransition" in f || "MozTransition" in f || "msTransition" in f || "MsTransition" in f || "OTransition" in f
		} ()
	},
	browser: {
		ie8: function() {
			var f = -1;
			"Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (f = parseFloat(RegExp.$1));
			return - 1 != f && 9 > f
		} (),
		ie10: window.navigator.msPointerEnabled
	}
}; (window.jQuery || window.Zepto) &&
function(f) {
	f.fn.swiper = function(b) {
		b = new Swiper(f(this)[0], b);
		f(this).data("swiper", b);
		return b
	}
} (window.jQuery || window.Zepto);
"undefined" !== typeof module && (module.exports = Swiper);
