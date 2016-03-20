(function (b, h) {
    var e = 0;
    var f = 1;
    var c = null;
    var a = null;
    var g = null;
    var i = ["明判大势<br>急速行情", "独家头条咨询<br>24小时播报", "自选异动<br>第一时间知晓", "14年经典指标<br>波段操作有把握", "专家在线互动<br>每日行情专业解读"];
    var d = {
        init: function (j) {
            h.addEventListener("DOMContentLoaded", function () {
                d.bindTapEvent();
                d.bindBtnEvent();
                c = h.querySelector("#ptext");
                a = h.querySelector("#lBtn");
                g = h.querySelector("#rBtn");
                d.setTipText();
                d.setArrow()
            }, false)
        }(), setViewport: function (j) {
            this.style.webkitTransform = "translate3d(" + j + "px,0,0)";
            e = j
        }, setTipText: function () {
            c.innerHTML = i[f - 1]
        }, setArrow: function (j) {
            var l = a.children[0];
            var k = g.children[0];
            if (f == 1) {
                l.src = "../images/app/20160318-11.png";
                a.style.pointerEvents = "none";
                k.src = "../images/app/20160318-03.png";
                g.style.pointerEvents = "auto"
            } else {
                if (f == 5) {
                    l.src = "../images/app/20160318-03.png";
                    a.style.pointerEvents = "auto";
                    k.src = "../images/app/20160318-11.png";
                    g.style.pointerEvents = "none"
                } else {
                    l.src = "../images/app/20160318-03.png";
                    a.style.pointerEvents = "auto";
                    k.src = "../images/app/20160318-03.png";
                    g.style.pointerEvents = "auto"
                }
            }
        }, bindBtnEvent: function () {
            var m = this;
            var k = h.querySelector("#screenview");
            var j = b.innerWidth;
            var o = j * 4;
            var l = 0;
            var n = 0;
            Touch.tap("#download", function () {
                download()
            });
            Touch.tap("#rBtn", function () {
                if (f < 5) {
                    k.style.webkitTransition = "0.3s ease -webkit-transform";
                    l = e - (j + n);
                    l = l < -o ? -o : l;
                    m.setViewport.call(k, l);
                    f = Math.round(Math.abs(l) / j) + 1;
                    d.setTipText();
                    d.setArrow()
                } else {
                    Msg.toast("已是最后一页")
                }
            });
            Touch.tap("#lBtn", function () {
                if (f > 1) {
                    k.style.webkitTransition = "0.3s ease -webkit-transform";
                    l = e + j - n;
                    l = l > 0 ? 0 : l;
                    m.setViewport.call(k, l);
                    f = Math.round(Math.abs(l) / j) + 1;
                    d.setTipText();
                    d.setArrow()
                } else {
                    Msg.toast("已是第一页")
                }
            })
        }, bindTapEvent: function () {
            var v = this;
            var o = h.querySelector("#screenview");
            var r = b.innerWidth;
            var s = r * 4;
            var p = 0;
            var l, m;
            var t = 0;
            var q = 0;
            var u = "";
            var n = false;
            var k = 0;
            var j = 0;
            o.addEventListener("touchstart", function (w) {
                w.preventDefault();
                var x = w.touches[0];
                l = x.pageX;
                m = x.pageY;
                t = e;
                n = false;
                o.style.webkitTransition = "";
                j = new Date().getTime()
            }, false);
            o.addEventListener("touchmove", function (z) {
                z.preventDefault();
                var A = z.touches[0];
                var w = A.pageX - l;
                var y = A.pageY - m;
                if (Math.abs(w) > Math.abs(y)) {
                    q = w;
                    var x = t + w;
                    if (x <= 0 && x >= -r * 4) {
                        v.setViewport.call(o, x);
                        n = true
                    }
                    u = w > 0 ? "right" : "left"
                }
            }, false);
            o.addEventListener("touchend", function (x) {
                x.preventDefault();
                var w = 0;
                k = new Date().getTime() - j;
                if (n) {
                    o.style.webkitTransition = "0.3s ease -webkit-transform";
                    if (k < 300) {
                        w = u == "left" ? e - (r + q) : e + r - q;
                        w = w > p ? p : w;
                        w = w < -s ? -s : w
                    } else {
                        if (Math.abs(q) / r < 0.5) {
                            w = e - q
                        } else {
                            w = u == "left" ? e - (r + q) : e + r - q;
                            w = w > p ? p : w;
                            w = w < -s ? -s : w
                        }
                    }
                    setTimeout(function () {
                        v.setViewport.call(o, w)
                    }, 0);
                    f = Math.round(Math.abs(w) / r) + 1;
                    setTimeout(function () {
                        d.setTipText();
                        d.setArrow()
                    }, 100)
                }
            }, false)
        }
    }
})(window, document);
