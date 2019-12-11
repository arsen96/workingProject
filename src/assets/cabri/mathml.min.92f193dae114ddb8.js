var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function () {
    var a = 0;
    return function (b) {
        return $jscomp.SYMBOL_PREFIX + (b || "") + a++
    }
}();
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function () {}
};
$jscomp.arrayIterator = function (a) {
    var b = 0;
    return $jscomp.iteratorPrototype(function () {
        return b < a.length ? {
            done: !1,
            value: a[b++]
        } : {
            done: !0
        }
    })
};
$jscomp.iteratorPrototype = function (a) {
    $jscomp.initSymbolIterator();
    a = {
        next: a
    };
    a[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return a
};
$jscomp.iteratorFromArray = function (a, b) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var c = 0,
        d = {
            next: function () {
                if (c < a.length) {
                    var e = c++;
                    return {
                        value: b(e, a[e]),
                        done: !1
                    }
                }
                d.next = function () {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return d.next()
            }
        };
    d[Symbol.iterator] = function () {
        return d
    };
    return d
};
$jscomp.polyfill = function (a, b, c, d) {
    if (b) {
        c = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in c || (c[e] = {});
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
};
$jscomp.polyfill("Array.prototype.keys", function (a) {
    return a ? a : function () {
        return $jscomp.iteratorFromArray(this, function (a) {
            return a
        })
    }
}, "es6", "es3");
$jscomp.checkStringArgs = function (a, b, c) {
    if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
    if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
    return a + ""
};
$jscomp.polyfill("String.prototype.startsWith", function (a) {
    return a ? a : function (a, c) {
        var b = $jscomp.checkStringArgs(this, a, "startsWith");
        a += "";
        var e = b.length,
            g = a.length;
        c = Math.max(0, Math.min(c | 0, b.length));
        for (var h = 0; h < g && c < e;)
            if (b[c++] != a[h++]) return !1;
        return h >= g
    }
}, "es6", "es3");
$jscomp.polyfill("Number.isFinite", function (a) {
    return a ? a : function (a) {
        return "number" !== typeof a ? !1 : !isNaN(a) && Infinity !== a && -Infinity !== a
    }
}, "es6", "es3");
$jscomp.polyfill("Number.isInteger", function (a) {
    return a ? a : function (a) {
        return Number.isFinite(a) ? a === Math.floor(a) : !1
    }
}, "es6", "es3");
$jscomp.polyfill("String.prototype.endsWith", function (a) {
    return a ? a : function (a, c) {
        var b = $jscomp.checkStringArgs(this, a, "endsWith");
        a += "";
        void 0 === c && (c = b.length);
        c = Math.max(0, Math.min(c | 0, b.length));
        for (var e = a.length; 0 < e && 0 < c;)
            if (b[--c] != a[--e]) return !1;
        return 0 >= e
    }
}, "es6", "es3");
$jscomp.polyfill("Math.trunc", function (a) {
    return a ? a : function (a) {
        a = Number(a);
        if (isNaN(a) || Infinity === a || -Infinity === a || 0 === a) return a;
        var b = Math.floor(Math.abs(a));
        return 0 > a ? -b : b
    }
}, "es6", "es3");
$jscomp.polyfill("Math.imul", function (a) {
    return a ? a : function (a, c) {
        a = Number(a);
        c = Number(c);
        var b = a & 65535,
            e = c & 65535;
        return b * e + ((a >>> 16 & 65535) * e + b * (c >>> 16 & 65535) << 16 >>> 0) | 0
    }
}, "es6", "es3");
var Prototype = {
    __name__: "Prototype",
    __init__: function (a) {
        if (a)
            for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
        return this
    },
    specialise: function (a) {
        var b = eval("true && function " + (a && a.__name__ || this.__name__) + "(){};");
        b.prototype = this;
        b = new b;
        b.hasOwnProperty("__proto__") || (b.__proto__ = this);
        if (a)
            for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
        return b
    },
    instantiate: function () {
        var a = this.specialise();
        a.__init__.apply(a, arguments);
        return a
    },
    bind: function (a) {
        return this[a].bind(this)
    },
    addMixin: function (a) {
        for (var b in a)
            if (a.hasOwnProperty(b)) {
                if (this[b]) throw "object has property '" +
                    b + "' already";
                this[b] = a[b]
            } return this
    }
};
"undefined" !== typeof module && (exports.Prototype = Prototype);
var MathMLGlobals = {
    CURObj: null,
    decSeparator: ".",
    coord_separator: ";",
    thousandSeparator: "\u202f\u202f",
    thousandthSeparator: "\u202f",
    unitLowManagment: !0,
    SciNotatHighTreshold: 10,
    SciNotatLowTreshold: 7,
    InternalPrecision: 13,
    InfinityFrontSign: 0,
    ApproxSymbol: "\u2248",
    TranscendentalThreshold: 1E-14,
    ZeroThreshold: 2E-15,
    ZeroCalcThreshold: 9.999999E-101,
    IncompleteSymbol: "\u202f?\u202f",
    DebugOn: !1,
    DebugOn_1: !1,
    DebugOn_2: !1,
    DebugOn_3: !1,
    DebugOn_4: !1,
    DebugOn_5: !1,
    DebugOn_6: !1,
    DebugOn_7: !1,
    forCalcSVG: !1,
    currRemainder: null,
    forImmediateEval: null,
    forAlgebrite: !1,
    pendingParen: !1,
    transFunctions: {
        sin: 1,
        cos: 1,
        tan: 1,
        cot: 1,
        arcsin: 1,
        arccos: 1,
        arctan: 1,
        arccot: 1,
        sinh: 1,
        cosh: 1,
        tanh: 1,
        coth: 1,
        arsinh: 1,
        arcosh: 1,
        artanh: 1,
        arcoth: 1,
        sqrt: 1,
        ln: 1,
        lg: 1,
        log: 1
    },
    fontNameGlobal: null,
    heightGlobal: null,
    ascentGlobal: null,
    descentGlobal: null
};
"undefined" !== typeof module && (exports.MathMLGlobals = MathMLGlobals);
var cvm = {
    complete: !0,
    inBrowser: "undefined" !== typeof window
};
"undefined" !== typeof module && (exports.cvm = cvm);

function setCharAt(a, b, c) {
    return b > a.length - 1 ? a : a.substring(0, b) + c + a.substring(b + 1)
}

function parenthesisToCurly(a) {
    var b = a.search(/\(/),
        c = b + 1;
    for (b = 1;;) {
        var d = a.indexOf("(", c);
        c = a.indexOf(")", c);
        if (-1 === c) return -1;
        if (-1 === d) {
            for (; 0 < --b;)
                if (c = a.indexOf(")", ++c), -1 === c) return -1;
            break
        }
        if (d < c) b++, c = d + 1;
        else if (c += 1, 0 === --b) {
            c--;
            break
        }
    }
    b = a.substring(0, c);
    d = a.substring(c);
    a = b.length;
    b = b.replace(/;/g, " , ");
    a = b.length - a;
    c += a;
    d = (b + d).replace("(", "{");
    return setCharAt(d, c, "}")
}
"undefined" !== typeof module && (exports.setCharAt = setCharAt, exports.parenthesisToCurly = parenthesisToCurly);

function XmlElement(a) {
    this.name = a;
    this.text = null;
    this.attributes = {};
    this.children = []
}
XmlElement.prototype.setAttribute = function (a, b) {
    this.attributes[a] = b
};
XmlElement.prototype.getAttribute = function (a) {
    return this.attributes[a]
};
XmlElement.prototype.att = function (a, b) {
    this.attributes[a] = b;
    return this
};
XmlElement.prototype.appendChild = function (a) {
    "string" == typeof a && (a = new XmlElement(a));
    this.children.push(a);
    return a
};
XmlElement.prototype.toXml = function () {
    var a = "<" + this.name,
        b;
    for (b in this.attributes) a += " " + b + '="' + this.attributes[b] + '"';
    a += ">";
    null != this.text && (a += this.text);
    for (var c in this.children) a += this.children[c].toXml();
    return a += "</" + this.name + ">"
};
"undefined" !== typeof module && (exports.XmlElement = XmlElement);
var SimpleUnitSerializer, SimpleSerializer, affectMathPrefix, CabriConfig;
if ("undefined" !== typeof module) {
    var $jscomp$destructuring$var0 = require("../../../config.js");
    CabriConfig = $jscomp$destructuring$var0.CabriConfig;
    var $jscomp$destructuring$var1 = require("./mathmlglobals.js");
    MathMLGlobals = $jscomp$destructuring$var1.MathMLGlobals;
    var $jscomp$destructuring$var2 = require("./xmlelement.js");
    XmlElement = $jscomp$destructuring$var2.XmlElement;
    var $jscomp$destructuring$var3 = require("./cvm.js");
    cvm = $jscomp$destructuring$var3.cvm;
    require("./operators.js");
    require("./expr.js");
    require("./parse.js");
    require("./box.js");
    require("./layout.js");
    var $jscomp$destructuring$var4 = require("./serialize.js");
    affectMathPrefix = $jscomp$destructuring$var4.affectMathPrefix;
    SimpleSerializer = $jscomp$destructuring$var4.SimpleSerializer;
    var $jscomp$destructuring$var5 = require("./units_serialize.js");
    SimpleUnitSerializer = $jscomp$destructuring$var5.SimpleUnitSerializer
}
var func2evalUpdate = function (a, b, c) {
        for (var d, e, g = [], h = 0; h < nVariables; h++) e = b[h], "x" == e || "y" == e ? (g.push(e), d = c[h]) : a = a.replace(new RegExp("\\b" + e + "\\b", "g"), c[h]);
        g.push("return " + a);
        function2eval = Function.apply(null, g);
        return function2eval.apply(null, [d])
    },
    signedExpVal = function (a) {
        var b = a + signature,
            c = {
                stdFormula: a.replace(/\brand\(\)/g, 'rand("_")'),
                variables: {}
            };
        a = [];
        switch (nVariables) {
            case 10:
                a.unshift(v9);
            case 9:
                a.unshift(v8);
            case 8:
                a.unshift(v7);
            case 7:
                a.unshift(v6);
            case 6:
                a.unshift(v5);
            case 5:
                a.unshift(v4);
            case 4:
                a.unshift(v3);
            case 3:
                a.unshift(v2);
            case 2:
                a.unshift(v1);
            case 1:
                a.unshift(v0)
        }
        var d = nameList.split("\f");
        "" == Formulas && (Formulas = {});
        var e = Formulas[b];
        if (e) {
            var g = e[1];
            outputUnits = e[2];
            e = e[0]
        } else {
            if (nVariables)
                for (g = signature.split(","), e = 0; e < nVariables; e++) c.variables[d[e]] = a[e] + (void 0 != g[e] ? " " + g[e] : "");
            g = WFexpression2JS(c);
            outputUnits = g[1];
            g = g[0];
            outputUnits = ("" + outputUnits).replace(/\u00b0/, "d");
            c = Object.keys(c.variables);
            c.push("return " + g);
            e = Function.apply(null, c);
            Formulas[b] = [e, g, outputUnits]
        }
        outputValue =
            eval4graph ? func2evalUpdate(g, d, a) : e.apply(null, a)
    },
    jsAscii2WF = function (a, b) {
        a = formulaPreTreatment(a);
        a = cvm.parse.parser.parse(a);
        var c = SimpleSerializer.RootExpression(a)[0];
        if (1 === b) return c;
        if ("string" === typeof c && -1 !== c.indexOf("not_evaluable")) return "_";
        b = Object.keys(a.nb_wUnits).length;
        var d = "",
            e;
        for (e in a.nb_wUnits) e.startsWith("__$") ? (b--, c = c.replace(e, a.nb_wUnits[e])) : '"_"' == e ? b-- : d += "\f" + e;
        return c + ("\f" + b + d)
    },
    jsFastEval = function () {
        outputValue = function2eval.apply(null, [genericNb])
    },
    isStillNumber =
    function (a, b, c) {},
    isCabriNumberJS = function (a) {
        outputValue = 0;
        return !1
    },
    isCabriNumber = function (a, b) {},
    formula2tree = function (a) {
        var b = cvm.parse.parser.parse(a.stdFormula);
        a.tree = b;
        a.nb_wUnits = b.nb_wUnits;
        a.cedillas = b.cedillas
    },
    tree2svg = function (a, b, c, d) {
        var e = new XmlElement("svg"),
            g = new XmlElement("defs"),
            h = new XmlElement("style");
        var m = "@font-face {\r\n        font-family: 'STIXGeneral';\r\n        src: url('assets/fonts/STIXGeneral-Regular.otf');\r\n        font-weight: normal;\r\n        font-style: normal;}".replace(/\s/g,
            "");
        h.text = m;
        g.appendChild(h);
        e.appendChild(g);
        MathMLGlobals.CURObj = e.appendChild("g");
        e.children[1].setAttribute("transform", "scale(" + b + ")");
        cvm.complete = !0;
        cvm.fjpyOffset = null;
        e.children[1].setAttribute("font-family", c);
        e.children[1].setAttribute("stroke-width", 0);
        FontAdjust(c);
        e.children[1].setAttribute("font-size", 18);
        e.children[1].setAttribute("fill", d);
        e.children[1].setAttribute("stroke", d);
        c = cvm.expr.drawOnNewCanvas(a.tree);
        cvm.fjpyOffset && (e.children[1].attributes.transform += " translate(" +
            cvm.fjpyOffset + ")", c[0].width += cvm.fjpyOffset);
        a.box = c[1];
        c = c[0];
        a.complete = cvm.complete;
        e.setAttribute("width", arrondiTO1decPlace(c.width * b));
        e.setAttribute("height", arrondiTO1decPlace(c.height * b));
        e.setAttribute("baseline", arrondiTO1decPlace(c.baseline * b));
        d = e.toXml();
        a.cedillas && (d = d.replace(/Z99/g, "###"));
        g = /><\/rect>/g;
        d = d.replace(g, "> </rect>");
        g = /><\/line>/g;
        d = d.replace(g, "> </line>");
        g = /></g;
        d = d.replace(g, ">\n<");
        a.svg = {
            baseline: c.baseline * b,
            width: e.getAttribute("width"),
            height: e.getAttribute("height"),
            svg: d
        }
    },
    expr2Value = function (a, b) {
        a = {
            stdFormula: formulaPreTreatment(a)
        };
        formula2tree(a);
        a.nb_wUnits = {};
        for (var c in a.tree.nb_wUnits) {
            if (!b[c]) return c + " is undefined";
            a.nb_wUnits[c] = b[c]
        }
        tree2value(a);
        return a.value
    },
    tree2value = function (a) {
        a.tree || formula2tree(a);
        1 === CabriConfig.Calculator.Level && (a.stdFormula = a.stdFormula.replace(/:-/g, "/"), formula2tree(a));
        tree2serial(a);
        if (!a.error) {
            if (a.isPureNumber) return a.value;
            if (-1 != a.serial.indexOf("not_evaluable")) return a.value = "--", a.value;
            a.calcSerial =
                a.serial;
            a.serial = serialInstantiate(a.serial, a.nb_wUnits);
            a.functionList.rand && (a.serial = a.serial.replace(/rand\(\)/g, 'rand("_")'));
            a.stdFormula = a.serial;
            formula2tree(a);
            for (var b in a.variables) a.tree.nb_wUnits[b] = a.variables[b];
            b = SimpleUnitSerializer.RootExpression(a.tree);
            a.serial = b[0];
            var c = a.serial;
            a.serial = serialInstantiate(a.serial, a.tree.nb_wUnits, !0);
            if (!a.error) {
                if (a.nb_wUnits && (!a.nb_wUnits.hasOwnProperty("x") || a.nb_wUnits.x)) {
                    try {
                        a.value = eval(a.serial), "boolean" != a.units || isNaN(a.value) ||
                            (a.value = 0 == a.value ? !1 : !0)
                    } catch (d) {
                        a.error = "div_zero" == d || "undefined" == d ? d : "syntax error"
                    }
                    a.units = b[1]
                }
                return c
            }
        }
    },
    WFexpression2JS = function (a) {
        formula2tree(a);
        for (var b in a.variables) a.tree.nb_wUnits[b] = a.variables[b];
        var c = SimpleUnitSerializer.RootExpression(a.tree);
        for (b in a.tree.nb_wUnits) b.startsWith("__$") && (c[0] = c[0].replace(b, parseFloat(a.tree.nb_wUnits[b])));
        return c
    },
    tree2serialAlg = function (a) {
        a.serial = SimpleSerializer.RootExpression(a.tree);
        a.functionList = a.serial[1];
        a.serial = a.serial[0]
    },
    tree2serial = function (a) {
        try {
            MathMLGlobals.forImmediateEval = !Object.keys(a.nb_wUnits).length && (!a.variables || !Object.keys(a.variables).length);
            a.serial = SimpleSerializer.RootExpression(a.tree);
            a.functionList = a.serial[1];
            a.serial = a.serial[0];
            var b = a.serial;
            MathMLGlobals.forImmediateEval && !MathMLGlobals.forAlgebrite && (b = affectMathPrefix(b, a.functionList), a.value = eval(b), MathMLGlobals.forImmediateEval = null);
            void 0 != a.value && isNaN(a.value) || "number" == typeof b && isNaN(b) ? (a.error = "NaN", a.value = "not_evaluable") :
                void 0 == a.value || isNaN(a.value) || (a.isPureNumber = !0, a.units = "", a.serial += "")
        } catch (c) {
            a.error = c, a.value = c, a.functionList = {}
        }
    },
    serialInstantiate = function (a, b, c) {
        for (e in b) {
            var d = b[e];
            if (null != d) {
                c && "boolean" !== typeof d && (d = parseFloat(d));
                e.charAt(0);
                var e = e.replace("$", "\\$");
                a = a.replace(new RegExp(" " + e + " ", "g"), " " + d + " ")
            }
        }
        return a
    },
    rewriteUnits = function (a) {
        if ("" == a) return "";
        if ("\u03b2^1" == a) debugger;
        var b = a.split(" "),
            c = "",
            d;
        if (!CabriConfig.Numbers.AdvUnitsManagement) {
            if (1 < b.length) return "";
            if (-1 !=
                a.indexOf("\u00b0")) return -1 != a.indexOf("cm") || -1 != (d = a.indexOf("^")) && (d = parseInt(a.substring(d + 1)), 1 != d) ? "" : "@\u00b0";
            if (-1 != (d = a.indexOf("cm"))) return b = a.charAt(d + 3), 1 == b ? "@cm" : 2 != b && 3 != b ? "" : "@" + a
        }
        if (1 == b.length) a = b[0].split("^"), b = parseFloat(a[1]), 1 == b ? c = a[0] : Number.isInteger(b) ? c = a[0] + "^" + a[1] : (c = b, d = "", 0 > b && (c = -c, d = "-"), c = float2rat(c), c = a[0] + "^(" + d + c[0] + "////" + c[1] + ")");
        else
            for (a = 0; a < b.length; a++) "" != b[a] && (-1 != b[a].indexOf("\u00b0") ? b[a] = b[a].replace(/\^1$/, "") : -1 != b[a].indexOf("cm") && (b[a] =
                b[a].replace(/\^1$/, "")), c += "(" + b[a] + ")");
        return "@" + c
    },
    prettyPrintUnits = function (a) {
        if (void 0 === a || "" === a || 1 == a) return "";
        if ("\u00b0^1" == a) return "\u00b0";
        for (var b = a, c = a = "", d, e, g, h; b.length;) {
            g = b.indexOf("^");
            d = b.substring(0, g);
            d = d.replace(/^\s*/, "");
            d = "\u202f" + d;
            b = b.substring(g + 1);
            e = parseFloat(b);
            g = b.indexOf(" ");
            b = -1 == g ? "" : b.substring(g);
            h = "";
            g = e;
            if (0 > e) {
                if (1 === CabriConfig.Calculator.Level) return "";
                g = -e;
                h = "-"
            }
            1 == g && "" == h && (g = "");
            var m = null;
            Math.floor(g) != g && (m = float2rat(g));
            if (1 === CabriConfig.Calculator.Level) {
                if (m ||
                    3 < g) return ""
            } else if (1 === CabriConfig.Calculator.Level) {
                if (m && 2 != m[1] && 3 != m[1] || 6 < g) return ""
            } else if (m && 9 < m[1]) return "";
            m && (g = m[0] + "/" + m[1]);
            1 === CabriConfig.Calculator.Level && 0 > e ? c = 1 == g ? c + d : c + (d + "<sup>" + g + "</sup>") : a = 1 == e ? a + d : a + (d + "<sup>" + h + g + "</sup>")
        }
        b = "\u202f/";
        if ("" == a && c) return "\u202f\u202f<sup>1" + b + "</sup>" + c;
        "" == c && (b = "");
        return "\u202f" + a + b + c
    },
    arrondiTO1decPlace = function (a) {
        a = Math.round(10 * a);
        return a / 10
    },
    float2rat = function (a) {
        var b = 1,
            c = 0,
            d = 0,
            e = 1,
            g = a;
        do {
            var h = Math.floor(g),
                m = b;
            b = h * b + c;
            c = m;
            m =
                d;
            d = h * d + e;
            e = m;
            g = 1 / (g - h)
        } while (Math.abs(a - b / d) > 1E-12 * a);
        return [b, d]
    },
    FontAdjust = function (a) {
        MathMLGlobals.fontNameGlobal = a;
        "Times New Roman" == MathMLGlobals.fontNameGlobal || "Arial" == MathMLGlobals.fontNameGlobal ? (MathMLGlobals.ascentGlobal = 16, MathMLGlobals.descentGlobal = -4) : "STIXGeneral" == MathMLGlobals.fontNameGlobal ? (MathMLGlobals.ascentGlobal = 14, MathMLGlobals.descentGlobal = -4) : "Comic Sans MS" == MathMLGlobals.fontNameGlobal ? (MathMLGlobals.ascentGlobal = 20, MathMLGlobals.descentGlobal = -5) : "Andika Basic" ==
            MathMLGlobals.fontNameGlobal ? (MathMLGlobals.ascentGlobal = 17, MathMLGlobals.descentGlobal = -4) : "Droid Serif" == MathMLGlobals.fontNameGlobal ? (MathMLGlobals.ascentGlobal = 17, MathMLGlobals.descentGlobal = -4) : (MathMLGlobals.ascentGlobal = 14, MathMLGlobals.descentGlobal = -5);
        MathMLGlobals.heightGlobal = MathMLGlobals.ascentGlobal - MathMLGlobals.descentGlobal
    },
    Formula2SVG_noEval = function (a, b, c, d, e) {
        void 0 == a && (a = "");
        var g = {};
        g.stdFormula = e ? formulaPreTreatment(a) : a;
        formula2tree(g);
        tree2svg(g, b, c, d);
        return g.svg
    },
    decSeparatorNormalization =
    function (a) {
        if ("," === MathMLGlobals.decSeparator) {
            var b = a.match(/\b\d+,\d+?/g);
            if (b)
                for (var c = 0; c < b.length; c++) {
                    var d = b[c].replace(/,/, ".");
                    a = a.replace(b[c], d)
                }
            "," == a[a.length - 1] && (d = a[a.length - 2], "0" <= d && "9" >= d && (a = a.replace(/,$/, ".")))
        }
        return a
    },
    transformEeNotation = function (a) {
        var b = a.match(/\b(\d*\.)?(\d*)[eE][+-]?\d+/g);
        if (b)
            for (var c = 0; c < b.length; c++) {
                var d = parseFloat(b[c]);
                isNaN(d) || (a = a.replace(b[c], d.toString()))
            }
        return a
    },
    formulaPreTreatment = function (a) {
        if ("" == a) return "";
        a = decSeparatorNormalization(a);
        a = transformEeNotation(a);
        var b, c = a.match(/" *"/g);
        if (c)
            for (b = 0; b < c.length; b++) {
                var d = c[b].replace(/ /g, "\u271d");
                a = a.replace(/" *"/, d)
            }
        a = a.replace(/\s+/g, " ");
        a = a.replace(/\u03c0/g, " pi ");
        a = a.replace(/\u221a/g, " sqrt ");
        a = a.replace(/\u221e\b/g, " inf ");
        a = a.replace(/\b[rR]and\s*\(\s*\)/g, 'rand("_")');
        a = a.replace(/\b[cC]ho(ose|ix)\s*\(/g, "choose(");
        a = a.replace(/\b[rR]an(k|g)\s*\(/g, "rank(");
        a = a.replace(/\bLog\b/g, "ln");
        a = a.replace(/\blog\b/g, "lg");
        a = a.replace(/\blog10\b/g, "lg");
        a = a.replace(/\blog2\b/g,
            "lb");
        a = a.replace(/\basin\b/g, "arcsin");
        a = a.replace(/\bacos\b/g, "arccos");
        a = a.replace(/\batan\b/g, "arctan");
        a = a.replace(/\bacot\b/g, "arccot");
        a = a.replace(/\bsen\b/g, "sin");
        a = a.replace(/\barcsen\b/g, "arcsin");
        a = a.replace(/\bargsinh\b/g, "arsinh");
        a = a.replace(/\bargcosh\b/g, "arcosh");
        a = a.replace(/\bargtanh\b/g, "artanh");
        a = a.replace(/\bargcoth\b/g, "arcoth");
        a = a.replace(/\bentier\b/g, "floor");
        a = a.replace(/\bsigne?\b/g, "sgn");
        a = a.replace(/\bMax\b/g, "max");
        a = a.replace(/\bMin\b/g, "min");
        a = a.replace(/\bPGCD\b/g,
            "gcd");
        a = a.replace(/\bpgcd\b/g, "gcd");
        a = a.replace(/\bPPCM\b/g, "lcm");
        a = a.replace(/\bppcm\b/g, "lcm");
        a = a.replace(/\bcm2\b/g, "cm^2");
        a = a.replace(/\bcm3\b/g, "cm^3");
        a = a.replace(/(^\.[0-9]+)/, "0$1");
        b = parseFloat(a);
        0 > b && (d = new RegExp(b, "g"), d.test(a), c = a.substring(d.lastIndex), /^\s*([:!]|mod)/.test(c) && (a = a.replace(d, "(" + b + ")")));
        return a + " "
    },
    smartThousand = function (a) {
        var b = a.length;
        if (5 > b) return a;
        for (var c, d = "", e = MathMLGlobals.thousandSeparator, g = 0; g < b; g += 3) c = a.substring(a.length - 3, a.length), a = a.substring(0,
            a.length - 3), 0 == a.length && (e = ""), d = e + c + d;
        return d
    },
    smartThousandth = function (a) {
        var b = a.length;
        if (5 > b) return a;
        for (var c, d = "", e = MathMLGlobals.thousandthSeparator, g = 0; g < b; g += 3) 0 < a.length && (c = a.substring(0, 3), a = a.substring(3), 0 == a.length && (e = ""), d += c + e);
        return d
    },
    trailingZerosTrim = function (a) {
        for (;
            "0" == a.charAt(a.length - 1);) a = a.substring(0, a.length - 1);
        return a
    },
    acceptNumber = function (a) {
        a = "" + a;
        if (-1 == a.indexOf(".")) {
            if (a.length > CabriConfig.Numbers.MaxInputDigits) return !1
        } else {
            var b = a.split(".");
            if (CabriConfig.Numbers.LimitPrecisionInput) return b[1].length <=
                CabriConfig.Numbers.MaxPrecision;
            if (a.length >= CabriConfig.Numbers.MaxInputDigits || b[1].length > CabriConfig.Numbers.MaxPrecision || 0 == b[1].length && a.length == CabriConfig.Numbers.MaxInputDigits - 1) return !1
        }
        return !0
    },
    valPreparation = function (a, b) {
        a = Number(a);
        if (!isNaN(a)) {
            var c = a;
            0 > c && (c = -c);
            if (1E10 > c) {
                var d = float2rat(c),
                    e = d[0];
                d = d[1];
                if (1E4 > e && 1E4 > d) {
                    if (0 == e) return 0;
                    a = 0 > a ? "-" : "";
                    return 1 == d ? a + e : a + e + "/" + d
                }
            }
            if (1E-14 > c) return 0
        }
        a = numberSmartValueDisplay(a, b);
        e = a.value;
        return a.isExact ? e : "string" == typeof e &&
            (a = e.split("*"), 2 == a.length) ? a[0] + "\u2026*" + a[1] : e + "\u2026"
    },
    round2even = function (a, b) {
        var c = {
            isExact: !0
        };
        if ("string" == typeof a) {
            var d = a;
            a = Number(a)
        } else d = "" + a;
        var e = a.toFixed(b);
        if (Number(e) == a) return c.value = a, c;
        c.isExact = !1;
        a = a.toFixed(b + 1);
        if (0 == a - d && a.endsWith("5")) {
            d = a.charAt(a.length - 2);
            "." == d && (d = a.charAt(a.length - 3));
            switch (d) {
                case "1":
                    d = "2";
                    break;
                case "3":
                    d = "4";
                    break;
                case "5":
                    d = "6";
                    break;
                case "7":
                    d = "8";
                    break;
                case "9":
                    return c.value = e, c
            }
            c.value = e.substring(0, e.length - 1);
            c.value += d
        } else c.value =
            e;
        return c
    },
    toSciNotation = function (a, b) {
        var c = {
            isExact: !0
        };
        if (0 == a) return c.smartValue = "0", c;
        a = a.toExponential(MathMLGlobals.InternalPrecision).split("e");
        var d = a[0];
        a = a[1];
        a = a.replace("+", "");
        d = round2even(d, b);
        if (10 == d.value) {
            a = 1 + +a;
            var e = "1";
            if (0 < b) {
                e = "1.";
                for (var g = 0; g < b; g++) e += "0"
            }
            d.value = e
        }
        c.isExact = d.isExact;
        c.value = d.value;
        0 != a && (1 == c.value && (c.value = ""), c.value += " 10^(" + a + ")");
        return c
    },
    numberSmartValueDisplay = function (a, b) {
        var c = {
            isExact: !0
        };
        if ("boolean" === typeof inpuNumbetr && (0 == a || 1 ==
                a)) return c.value = "" + a, c;
        if (isNaN(a)) return c.value = "----", c;
        a = Number(a);
        b = Number(b);
        var d = a,
            e = "";
        0 > d && (d = -d, e = "-");
        var g = !1; - Infinity == a && (c.value = "-" + CabriConfig.Numbers.InfinitySymbol, g = !0);
        Infinity == a && (c.value = 0 == MathMLGlobals.InfinityFrontSign ? "" : 0 < MathMLGlobals.InfinityFrontSign ? "+" : "-", c.value += CabriConfig.Numbers.InfinitySymbol, g = !0);
        d >= CabriConfig.Numbers.MaxCapacity && (c.isExact = !1, c.value = d == a ? "+" : "-", c.value += CabriConfig.Numbers.InfinitySymbol, g = !0);
        g && 1 === CabriConfig.Calculator.Level &&
            (c.value = CabriConfig.Numbers.InfinitySymbol);
        if (g) return c;
        if (0 == d) return c.value = "0", c;
        if (d < MathMLGlobals.ZeroThreshold) return c.value = "0", c.isExact = !1, c;
        var h = d.toExponential(MathMLGlobals.InternalPrecision - 1);
        h = h.split("e");
        g = h[0];
        h = Number(h[1]);
        if (Number.isInteger(d)) return h >= MathMLGlobals.InternalPrecision ? (c = toSciNotation(d, b), c.value = e + c.value) : (g = g.replace(/\./, ""), c.value = e + g.substring(0, h + 1)), c;
        if (h >= MathMLGlobals.SciNotatHighTreshold) c = toSciNotation(+d, b);
        else if (h <= -MathMLGlobals.SciNotatLowTreshold) c =
            toSciNotation(+d, b);
        else {
            g.replace(/0*$/, "");
            d = g;
            if (0 < h) d = g.charAt(0) + g.substring(2, h + 2), c = g.substring(h + 2), d = d + "." + c;
            else if (0 > h)
                for (c = 0; c < -h; c++) d /= 10;
            c = round2even(d, b)
        }
        c.value = e + c.value;
        a - +c.value > MathMLGlobals.InternalPrecision && (c.isExact = !1);
        return c
    },
    mod = function (a, b) {
        Math.divEucl(a, b);
        return MathMLGlobals.currRemainder
    };
"undefined" !== typeof module && (exports.formulaPreTreatment = formulaPreTreatment, exports.decSeparatorNormalization = decSeparatorNormalization, exports.formula2tree = formula2tree, exports.tree2serialAlg = tree2serialAlg, exports.tree2serial = tree2serial, exports.expr2Value = expr2Value, exports.numberSmartValueDisplay = numberSmartValueDisplay, exports.prettyPrintUnits = prettyPrintUnits, exports.acceptNumber = acceptNumber, exports.float2rat = float2rat, exports.tree2svg = tree2svg, exports.smartThousand = smartThousand, exports.smartThousandth =
    smartThousandth, exports.XmlElement = XmlElement, exports.ascii2WF = jsAscii2WF);
/\d+(?:\.\d*)?( *(e|E)(\+\d+|-\d+))?/;
var Translator, DomHelper;
if ("undefined" !== typeof module) {
    var $jscomp$destructuring$var6 = require("./cvm.js");
    cvm = $jscomp$destructuring$var6.cvm;
    var $jscomp$destructuring$var7 = require("./prototype.js");
    Prototype = $jscomp$destructuring$var7.Prototype;
    var $jscomp$destructuring$var8 = require("./mathmlglobals.js");
    MathMLGlobals = $jscomp$destructuring$var8.MathMLGlobals;
    var $jscomp$destructuring$var9 = require("./xmlelement.js");
    XmlElement = $jscomp$destructuring$var9.XmlElement;
    var $jscomp$destructuring$var10 = require("../../domhelper.js");
    DomHelper = $jscomp$destructuring$var10.DomHelper;
    if (cvm.inBrowser) {
        var $jscomp$destructuring$var11 = require("../../translator.js");
        Translator = $jscomp$destructuring$var11.Translator
    }
}

function AtomicSVGtext(a, b, c, d) {
    var e = new XmlElement("text");
    e.setAttribute("x", a);
    e.setAttribute("y", b);
    d.fontStyle && e.setAttribute("font-style", d.fontStyle);
    d.fontSize && e.setAttribute("font-size", d.fontSize);
    d.fill && e.setAttribute("fill", d.fill);
    e.text = c;
    MathMLGlobals.CURObj.appendChild(e)
}

function SVGrect(a, b, c, d, e, g, h, m) {
    var t = new XmlElement("rect");
    t.setAttribute("x", a);
    t.setAttribute("y", b);
    t.setAttribute("width", c);
    t.setAttribute("height", d);
    t.setAttribute("fill", e);
    g && t.setAttribute("stroke", g);
    m && t.setAttribute("fill-opacity", m);
    t.setAttribute("stroke-width", h);
    MathMLGlobals.CURObj.appendChild(t)
}

function SVGline(a, b, c, d, e, g, h) {
    var m = new XmlElement("line");
    m.setAttribute("x1", a);
    m.setAttribute("y1", b);
    m.setAttribute("x2", c);
    m.setAttribute("y2", d);
    m.setAttribute("stroke", e);
    m.setAttribute("stroke-width", g);
    h && (a = new XmlElement("animate"), a.setAttribute("attributeType", "XML"), a.setAttribute("attributeName", "stroke-width"), a.setAttribute("values", "0;1;0"), a.setAttribute("dur", "1s"), a.setAttribute("repeatCount", "indefinite"), m.appendChild(a));
    MathMLGlobals.CURObj.appendChild(m)
}

function SVGpolyline(a, b, c, d) {
    c = new XmlElement("polyline");
    c.setAttribute("points", a);
    "none" == b && c.setAttribute("fill", "none");
    c.setAttribute("stroke-width", d);
    MathMLGlobals.CURObj.appendChild(c)
}

function SVGraisedBox(a) {
    var b = new XmlElement("g");
    b.id = "RaisedBox";
    b.setAttribute("transform", "translate(0," + a + ")");
    MathMLGlobals.CURObj.appendChild(b);
    MathMLGlobals.CURObj = b
}

function SVGtransscale(a, b, c) {
    var d = new XmlElement("g");
    d.id = "Scale";
    d.setAttribute("transform", "translate(" + a + "," + b + ") scale(" + c + ")");
    MathMLGlobals.CURObj.appendChild(d);
    MathMLGlobals.CURObj = d
}
(function (a) {
    var b;
    a.inBrowser && (b = function () {
        var a = document.createElement("div");
        a.style.position = "absolute";
        a.style.visibility = "hidden";
        document.body.appendChild(a)
    });
    var c = {
        __name__: "Box",
        alignAdjustment: function (a) {
            switch (a || "left") {
                case "left":
                    return 0;
                case "right":
                    return this.width;
                case "center":
                    return .5 * this.width;
                default:
                    throw "Illegal align adjustment:" + a;
            }
        },
        alignOnCanvas: function (a, b, c) {
            this.drawOnCanvas(a - this.alignAdjustment(c), b)
        },
        contains: function (a, b) {
            return 0 <= a && a < this.width && -this.descent >=
                b && b > -this.ascent
        },
        getContainers: function (a, b) {
            var c = [];
            this.pushContainers(c, a, b);
            return c
        },
        pushContainers: function (a, b, c, d) {
            b += this.alignAdjustment(d);
            this.contains(b, c) && (this.pushSubContainers(a, b, c), a.push({
                box: this,
                x: b,
                y: c
            }))
        },
        pushSubContainers: function () {},
        bindLayout: function (a, b) {
            this.boundLayouts || (this.boundLayouts = []);
            this.boundLayouts.push({
                layout: a,
                key: b
            })
        },
        setStack: function (a) {}
    };
    c = Prototype.specialise(c);
    var d = {
        __name__: "TextBox",
        __init__: function (a, b) {
            this.text = a;
            this.font = b;
            this.calculate()
        },
        calculate: function () {
            var b = 0; - 1 < this.font.search("italic") && (b = 1);
            this.text = this.text.replace(/\u271D/g, "\u00a0");
            if (1 == this.text.length && "\u2026" == this.text[0]) this.width = 7.7;
            else {
                var c = this.text.indexOf("^");
                var d = this.text;
                a.inBrowser ? (DomHelper.createFontMetricsDiv(), DomHelper.calibrationTxt.innerHTML = d, DomHelper.calibrationTxt.style.fontFamily = MathMLGlobals.fontNameGlobal, DomHelper.calibrationTxt.style.fontSize = "18px", DomHelper.calibrationTxt.style.fontStyle = 0 == b ? "normal" : "italic", d = DomHelper.calibrationTxt.offsetWidth) :
                    d = jsUtils.getTextMetrics(d, b);
                this.width = d + 2 - 0; - 1 != c && (this.text.substring(0, c), this.text.substring(c + 1))
            }
            this.height = MathMLGlobals.heightGlobal;
            this.ascent = MathMLGlobals.ascentGlobal;
            this.descent = MathMLGlobals.descentGlobal
        },
        drawOnCanvas: function (b, c, d) {
            var f, k = this.font,
                p = this.text;
            if (1 == p.length && "_" == p[0]) AtomicSVGtext(b, c, "()", "normal");
            else if (1 == p.length && "<" == p[0]) AtomicSVGtext(b, c, "&lt;", "normal");
            else if ("\u222b" == p[0])
                for (d = p.length, MathMLGlobals.SVGObj = new XmlElement("g"), MathMLGlobals.SVGObj.setAttribute("transform",
                        "translate(-5,0)"), MathMLGlobals.CURObj.appendChild(MathMLGlobals.SVGObj), MathMLGlobals.CURObj = MathMLGlobals.SVGObj, f = 0; f < d; f++) MathMLGlobals.SVGObj = new XmlElement("g"), MathMLGlobals.SVGObj.setAttribute("transform", "translate(5,0)"), MathMLGlobals.CURObj.appendChild(MathMLGlobals.SVGObj), MathMLGlobals.CURObj = MathMLGlobals.SVGObj, MathMLGlobals.SVGObj = new XmlElement("path"), MathMLGlobals.SVGObj.id = "Int_Sign", MathMLGlobals.SVGObj.setAttribute("transform", "scale(0.01,-0.011) skewX(5)"), MathMLGlobals.SVGObj.setAttribute("d",
                    "M120,-250c-54,0 -111,30 -111,85    0,27 21,41 42,41     21,0 42,-14 42,-41 0,-26 -19,-40 -38,-42  16,-13 39,-21  65,-21  78,0 97,100 97,207v653c0,116 68,229 180,229     54,0 111,-30 111,-85     0,-28 -21,-41 -42,-41 -21,0 -42,13 -42,41     0,26 19,40 38,42 -16,13  -39,21 -65,21 -78,0    -97,-101  -97,-207v-653c0,-116 -68,-229 -180,-229z"), MathMLGlobals.SVGObj.setAttribute("stroke-width", 0), MathMLGlobals.CURObj.appendChild(MathMLGlobals.SVGObj);
            else if ("\u2264" == p[0]) "." == MathMLGlobals.decSeparator ?
                (d = new XmlElement("text"), d.setAttribute("x", b), d.setAttribute("y", c), d.text = "\u2264", MathMLGlobals.CURObj.appendChild(d)) : (d = c - 12, SVGpolyline(b + 10 + "," + d + " " + b + "," + (d + 5) + " " + (b + 10) + "," + (d + 10), "none", "?", 1), SVGline(b, d + 5 + 3, b + 10, d + 10 + 3, "?", 1));
            else if ("\u2265" == p[0]) "." == MathMLGlobals.decSeparator ? (d = new XmlElement("text"), d.setAttribute("x", b), d.setAttribute("y", c), d.text = "\u2265", MathMLGlobals.CURObj.appendChild(d)) : (d = c - 12, SVGpolyline(b + "," + d + " " + (b + 10) + "," + (d + 5) + " " + b + "," + (d + 10), "none", "?", 1), SVGline(b +
                10, d + 5 + 3, b, d + 10 + 3, "?", 1));
            else if ("\u212f" == p[0]) AtomicSVGtext(b, c, "e", "normal");
            else if (1 == p.length && "\u2026" == p[0]) f = {
                fontSize: 12
            }, AtomicSVGtext(b - 3, c, ".", f), AtomicSVGtext(b, c, ".", f), AtomicSVGtext(b + 3, c, ".", f);
            else {
                f = {}; - 1 != k.search("italic") && (f.fontStyle = "italic"); - 1 != this.text.search("\u201d") && (f.fontStyle = "italic"); - 1 != this.text.search("\u2019") && (f.fontStyle = "italic"); - 1 != this.text.search("\u2019") && (f.fontStyle = "italic");
                d && (f.fill = d);
                a.inBrowser && ("sin" == p ? p = Translator.translate("sin_symbol") :
                    "arcsin" == p && (p = Translator.translate("arcsin_symbol")));
                if (0 === b && f.fontStyle && -1 !== f.fontStyle.indexOf("italic"))
                    if ("f" === p || "j" === p) a.fjpyOffset = 3;
                    else if ("j" === p || "p" === p) a.fjpyOffset = 1;
                AtomicSVGtext(b, c, p, f)
            }
            MathMLGlobals.DebugOn_1 && SVGrect(b, c - this.ascent, this.width - .6, this.height, "none", "blue", .3)
        },
        getCharacterIndexAt: function (a) {
            var b;
            for (b = 0; b < this.text.length; b++) {
                var c = ctx.measureText(this.text.substr(0, b + 1));
                if (a < c) break
            }
            return b
        }
    };
    d = c.specialise(d);
    var e = {
        __name__: "Decoration",
        __init__: function (a,
            b, c) {
            this.box = a;
            this.vOffset = c;
            this.hOffset = b;
            this.calculate()
        },
        calculate: function () {
            var a = this.box;
            this.top = this.vOffset + a.ascent;
            this.bottom = this.vOffset + a.descent;
            this.left = this.hOffset;
            this.right = this.hOffset + a.width
        },
        drawOnCanvas: function (a, b) {
            this.box.drawOnCanvas(a + this.hOffset, b - this.vOffset)
        },
        pushContainers: function (a, b, c) {
            this.box.pushContainers(a, b - this.hOffset, c + this.vOffset)
        }
    };
    e = Prototype.specialise(e);
    var g = {
        __name__: "DecoratedBox",
        __init__: function (a, b) {
            this.box = a;
            this.decorations =
                b || [];
            this.calculate()
        },
        calculate: function () {
            var a = this.box,
                b = a.ascent,
                c = a.descent,
                d = 0,
                f = a.width;
            this.decorations.forEach(function (a) {
                a.top > b && (b = a.top);
                a.bottom < c && (c = a.bottom);
                a.left < d && (d = a.left);
                a.right > f && (f = a.right)
            });
            this.ascent = b;
            this.descent = c;
            this.width = f - d;
            this.hOffset = d;
            this.height = this.ascent - this.descent
        },
        drawOnCanvas: function (a, b) {
            a += this.hOffset;
            this.box.drawOnCanvas(a, b);
            this.decorations.forEach(function (c) {
                c.drawOnCanvas(a, b)
            })
        },
        pushSubContainers: function (a, b, c) {
            b -= this.hOffset;
            this.box.pushContainers(a, b, c);
            this.decorations.forEach(function (d) {
                d.pushContainers(a, b, c)
            })
        }
    };
    g = c.specialise(g);
    var h = {
        __name__: "Scale",
        __init__: function (a, b) {
            this.box = a;
            this.scale = b;
            this.calculate()
        },
        calculate: function () {
            var a = this,
                b = this.box,
                c = this.scale;
            ["width", "height", "ascent", "descent"].forEach(function (d) {
                a[d] = c * b[d]
            })
        },
        drawOnCanvas: function (a, b) {
            var c = MathMLGlobals.CURObj;
            SVGtransscale(a, b, this.scale);
            this.box.drawOnCanvas(0, 0);
            MathMLGlobals.CURObj = c
        },
        pushSubContainers: function (a, b, c) {
            this.box.pushContainers(a,
                b / this.scale, c / this.scale)
        }
    };
    h = c.specialise(h);
    var m = {
        __name__: "Train",
        __init__: function () {
            var a = arguments;
            this.boxes = a = 1 === a.length ? a[0] : Array.prototype.filter.call(a, function () {
                return !0
            });
            this.calculate()
        },
        calculate: function () {
            var a = -1E3,
                b = 1E3,
                c = 0;
            this.boxes.forEach(function (d) {
                c += d.width;
                a < d.ascent && (a = d.ascent);
                b > d.descent && (b = d.descent)
            });
            this.ascent = a;
            this.descent = b;
            this.height = a - b;
            this.width = c
        },
        drawOnCanvas: function (a, b) {
            this.boxes.forEach(function (c) {
                c.drawOnCanvas(a, b);
                a += c.width
            })
        },
        pushSubContainers: function (a,
            b, c) {
            this.boxes.forEach(function (d) {
                d.pushContainers(a, b, c);
                b -= d.width
            })
        }
    };
    m = c.specialise(m);
    var t = {
        __name__: "Paren2",
        __init__: function (a, b) {
            this.box = a;
            this.reflect = b;
            this.calculate()
        },
        calculate: function () {
            var a = this.box;
            this.height = a.height - 4;
            this.ascent = a.ascent - 2;
            this.descent = a.descent + 2;
            this.width = 6;
            this.bracketWidth = 1.5;
            this.left = this.reflect ? this.width : 0;
            this.right = this.reflect ? 0 : this.width;
            this.middle = this.reflect ? this.width - this.bracketWidth : this.bracketWidth;
            this.curveHeight = 10
        },
        drawOnCanvas: function (a,
            b, c) {
            MathMLGlobals.SVGObj = new XmlElement("g");
            a += this.reflect ? -2 : 2;
            MathMLGlobals.SVGObj.setAttribute("transform", "translate(" + a + "," + b + ")");
            var d = -this.ascent,
                f = d + this.curveHeight,
                k = -this.descent,
                p = k - this.curveHeight,
                e = this.right,
                n = this.left;
            MathMLGlobals.DebugOn_1 && SVGrect(a, b - this.ascent, this.width - .6, this.height, "none", "violet", .3);
            MathMLGlobals.SVGObj2 = new XmlElement("path");
            a = "M" + e + "," + d + ("C" + e + "," + d + " " + n + "," + d + " " + n + "," + f) + ("L" + n + "," + p) + ("C" + n + "," + k + " " + e + "," + k + " " + e + "," + k);
            a += "C" + e + "," + k + " " +
                this.middle + "," + k + " " + this.middle + "," + p;
            a += "L" + this.middle + "," + f;
            a += "C" + this.middle + "," + d + " " + e + "," + d + " " + e + "," + d;
            MathMLGlobals.SVGObj2.setAttribute("d", a);
            MathMLGlobals.SVGObj2.setAttribute("stroke-width", 0);
            this.reflect && MathMLGlobals.SVGObj2.setAttribute("fill", c);
            MathMLGlobals.SVGObj.appendChild(MathMLGlobals.SVGObj2);
            MathMLGlobals.CURObj.appendChild(MathMLGlobals.SVGObj)
        }
    };
    t = c.specialise(t);
    var y = {
        __name__: "CurlyBracket",
        __init__: function (a, b) {
            this.box = a;
            this.reflect = b;
            this.calculate()
        },
        calculate: function () {
            var a =
                this.box;
            this.height = a.height - 4;
            this.ascent = a.ascent - 2;
            this.descent = a.descent + 2;
            this.width = 12;
            this.bracketWidth = 1.5
        },
        drawOnCanvas: function (a, b) {
            var c = this.width / 2,
                d = c - this.bracketWidth / 2;
            c += this.bracketWidth / 2;
            var f = 0,
                k = this.width;
            if (this.reflect) {
                var p = c;
                c = d;
                d = p;
                p = k;
                k = f;
                f = p
            }
            p = -.5 * (this.ascent + this.descent);
            var e = -this.ascent,
                n = -this.descent,
                g = e + this.height / 4,
                B = n - this.height / 4;
            MathMLGlobals.SVGObj = new XmlElement("g");
            MathMLGlobals.SVGObj.setAttribute("transform", "translate(" + a + "," + b + ")");
            MathMLGlobals.SVGObj2 =
                new XmlElement("path");
            a = "M" + k + "," + e + ("C" + d + "," + e + " " + d + "," + e + " " + d + "," + g) + ("C" + d + "," + p + " " + d + "," + p + " " + d + "," + p);
            a += "C" + d + "," + p + " " + d + "," + p + " " + d + "," + B;
            a += "C" + d + "," + n + " " + d + "," + n + " " + k + "," + n;
            a += "C" + c + "," + n + " " + c + "," + n + " " + c + "," + B;
            a += "C" + c + "," + p + " " + c + "," + p + " " + f + "," + p;
            a += "C" + c + "," + p + " " + c + "," + p + " " + c + "," + g;
            MathMLGlobals.SVGObj2.setAttribute("d", a + ("C" + c + "," + e + " " + c + "," + e + " " + k + "," + e));
            MathMLGlobals.SVGObj2.setAttribute("stroke-width", 0);
            MathMLGlobals.SVGObj.appendChild(MathMLGlobals.SVGObj2);
            MathMLGlobals.CURObj.appendChild(MathMLGlobals.SVGObj)
        }
    };
    y = c.specialise(y);
    var q = {
        __name__: "Paren",
        __init__: function (a, b, c, d) {
            this.box = a;
            this.top = b;
            this.bottom = c;
            this.reflect = d;
            this.calculate()
        },
        calculate: function () {
            var a = this.box;
            this.height = a.height;
            this.ascent = a.ascent;
            this.descent = a.descent;
            this.left = 0;
            this.right = this.reflect ? -4 : 4;
            this.width = 1
        },
        drawOnCanvas: function (a, b) {
            var c = MathMLGlobals.CURObj;
            MathMLGlobals.SVGObj = new XmlElement("g");
            MathMLGlobals.SVGObj.setAttribute("transform", "translate(" + a + "," + b + ")");
            MathMLGlobals.CURObj.appendChild(MathMLGlobals.SVGObj);
            MathMLGlobals.CURObj = MathMLGlobals.SVGObj;
            this.top && SVGline(this.left, -this.ascent, this.right, -this.ascent, "black", 1);
            this.bottom && SVGline(this.left, -this.descent, this.right, -this.descent, "black", 1);
            SVGline(this.left, -this.ascent - .5, this.left, -this.descent + .5, "black", 1);
            MathMLGlobals.CURObj = c
        }
    };
    q = c.specialise(q);
    var z = {
        __name__: "ElasticBox",
        __init__: function (a, b) {
            this.ref = a;
            this.box = b;
            this.calculate()
        },
        calculate: function () {
            var a = this.ref;
            this.height = a.height;
            this.ascent = a.ascent;
            this.descent = a.descent;
            a = h.instantiate(this.box, this.height / this.box.height);
            this.raisedBox = C.instantiate(-(a.ascent - this.ascent), a);
            this.width = this.raisedBox.width
        },
        drawOnCanvas: function (a, b) {
            this.raisedBox.drawOnCanvas(a, b)
        }
    };
    z = c.specialise(z);
    var u = {
        __name__: "HSpace",
        __init__: function (a) {
            this.width = a;
            this.calculate()
        },
        calculate: function () {
            this.ascent = this.descent = this.height = 0
        },
        drawOnCanvas: function (a, b) {}
    };
    u = c.specialise(u);
    var w = {
        __name__: "VSpace",
        __init__: function (a) {
            this.height = a;
            this.calculate()
        },
        calculate: function () {
            this.width =
                0;
            this.ascent = .5 * this.height;
            this.descent = -this.ascent
        },
        drawOnCanvas: function (a, b) {}
    };
    w = c.specialise(w);
    var A = {
        __name__: "Stack",
        __init__: function (a, b, c) {
            var d = this;
            this.boxes = a;
            this.baseline = b || 0;
            this.align = c || "center";
            this.calculate();
            a.forEach(function (a) {
                a.setStack(d)
            })
        },
        calculate: function () {
            var a = 0,
                b = 0,
                c = this.boxes,
                d = 0,
                f = this.baseline,
                k;
            for (k = 0; k < c.length; k++) {
                var e = c[k];
                k < f ? a -= e.height : k === f ? (a += e.descent, b += e.ascent) : b += e.height;
                d < e.width && (d = e.width)
            }
            this.width = d;
            this.ascent = b;
            this.descent =
                a;
            this.height = b - a
        },
        drawOnCanvas: function (a, b) {
            var c = a,
                d = this.width,
                f = this.height,
                k = this.align;
            b -= this.descent;
            a += this.alignAdjustment(k);
            this.boxes.forEach(function (c) {
                b += c.descent;
                c.alignOnCanvas(a, b, k);
                b -= c.ascent
            });
            MathMLGlobals.DebugOn_4 && SVGrect(c, b, d, f, "none", "green", .1)
        },
        pushSubContainers: function (a, b, c) {
            var d = this.align;
            c += this.descent;
            b -= this.alignAdjustment(d);
            this.boxes.forEach(function (f) {
                c -= f.descent;
                f.pushContainers(a, b, c, d);
                c += f.ascent
            })
        }
    };
    A = c.specialise(A);
    var v = {
        __name__: "HLine",
        __init__: function (a, b) {
            this.width = (this._width = a) || 0;
            this.height = b || 1;
            this.calculate()
        },
        calculate: function () {
            this.ascent = "Times" === MathMLGlobals.fontNameGlobal ? this.height - 1 : this.height;
            this.descent = 0
        },
        drawOnCanvas: function (a, b) {
            var c = this.height / 2;
            SVGrect(a, b - this.ascent + c / 2, this.width, c, "none", void 0, c)
        },
        setStack: function (a) {
            null === this._width && (this.width = a.width)
        }
    };
    v = c.specialise(v);
    var f = {
        __name__: "HChapeau",
        __init__: function (a, b) {
            this.width = (this._width = a) || 0;
            this.height = b || 1;
            this.calculate()
        },
        calculate: function () {
            this.ascent = this.height;
            this.descent = 0;
            this.width = 12
        },
        drawOnCanvas: function (a, b) {
            b += 2;
            var c = a + this.width / 2;
            SVGpolyline(a + 2 + "," + (b - this.ascent + 5) + " " + c + "," + (b - this.ascent) + " " + (a - 2 + this.width + "," + (b - this.ascent + 5) + " " + c + "," + (b - this.ascent + 2)), "black", "black", 0)
        },
        setStack: function (a) {
            null === this._width && (this.width = a.width)
        }
    };
    f = c.specialise(f);
    var k = {
        __name__: "HOverBar",
        __init__: function (a, b) {
            this.width = (this._width = a) || 0;
            this.height = b || 1;
            this.calculate()
        },
        calculate: function () {
            this.ascent =
                this.height;
            this.descent = 0
        },
        drawOnCanvas: function (a, b) {
            SVGrect(a, b - 1, this.width, 1.3, "?", "?", 0)
        },
        setStack: function (a) {
            null === this._width && (this.width = a.width)
        }
    };
    k = c.specialise(k);
    var B = {
        __name__: "HArrow",
        __init__: function (a, b) {
            this.width = (this._width = a) || 0;
            this.height = b || 1;
            this.calculate()
        },
        calculate: function () {
            this.ascent = this.height;
            this.descent = 0
        },
        drawOnCanvas: function (a, b) {
            a += 0;
            var c = a + this.width;
            b = b + 0 - this.ascent + 5;
            SVGpolyline(a + "," + (b - .5) + " " + (c - 5 - -2.3) + "," + (b - .5) + " " + (c - 5) + "," + (b - 2 - .5) + " " +
                c + "," + b + " " + (c - 5 + "," + (b + 2 + .5) + " " + (c - 5 - -2.3) + "," + (b + .5) + " " + a + "," + (b + .5)), "black", "black", 0)
        },
        setStack: function (a) {
            null === this._width && (this.width = a.width)
        }
    };
    B = c.specialise(B);
    var D = {
        __name__: "ColorBox",
        __init__: function (a, b) {
            this.color = a;
            this.box = b;
            this.calculate()
        },
        calculate: function () {
            this.width = this.box.width;
            this.height = this.box.height;
            this.ascent = this.box.ascent;
            this.descent = this.box.descent
        },
        drawOnCanvas: function (a, b) {
            this.box.drawOnCanvas(a, b, this.color)
        },
        pushSubContainers: function (a, b, c) {
            this.box.pushContainers(a,
                b, c)
        }
    };
    D = c.specialise(D);
    var E = {
        __name__: "Cursor",
        __init__: function (a) {
            this.box = a;
            this.calculate()
        },
        calculate: function () {
            this.width = this.box.width;
            this.height = this.box.height;
            this.ascent = this.box.ascent;
            this.descent = this.box.descent
        },
        drawOnCanvas: function (a, b) {
            this.box.drawOnCanvas(a, b);
            SVGrect(a, b - this.ascent + 1, this.width, this.height - 2, "yellow", "#none", "0px", .5);
            SVGline(a + this.width, b - this.ascent, a + this.width, b - this.descent, "red", 2, !0)
        },
        pushSubContainers: function (a, b, c) {
            this.box.pushContainers(a,
                b, c)
        }
    };
    E = c.specialise(E);
    var F = {
        __name__: "Frame",
        __init__: function (a, b) {
            this.style = a || {};
            this.box = b;
            this.calculate()
        },
        calculate: function () {
            this.width = this.box.width;
            this.height = this.box.height;
            this.ascent = this.box.ascent;
            this.descent = this.box.descent
        },
        drawOnCanvas: function (a, b) {
            this.box.drawOnCanvas(a, b)
        },
        pushSubContainers: function (a, b, c) {
            this.box.pushContainers(a, b, c)
        }
    };
    F = c.specialise(F);
    var r = {
        __name__: "RootSign",
        __init__: function (a, b) {
            this.box = a;
            this.nth = b;
            this.calculate()
        },
        calculate: function () {
            this.nthWidth =
                this.nth ? this.nth.width : 0;
            this.nthWidth = Math.max(5, this.nthWidth);
            this.width = this.box.width + this.nthWidth + 9;
            this.height = this.box.height + 3;
            this.ascent = this.box.ascent + 3;
            this.descent = this.box.descent
        },
        drawOnCanvas: function (a, b) {
            var c = MathMLGlobals.CURObj;
            a += this.nthWidth;
            var d = this.width - this.nthWidth;
            MathMLGlobals.SVGObj = new XmlElement("g");
            MathMLGlobals.SVGObj.id = "RootSign";
            MathMLGlobals.SVGObj.setAttribute("transform", "translate(" + (a + 2) + "," + b + ")");
            MathMLGlobals.CURObj.appendChild(MathMLGlobals.SVGObj);
            MathMLGlobals.CURObj = MathMLGlobals.SVGObj;
            SVGline(-7.5, -2.8, -4.3, -5, "?", 1);
            SVGline(-5, -5, 0, -this.descent - .5, "?", 1.8);
            SVGpolyline("0," + -this.descent + " 5," + -(this.ascent - 1) + " " + d + "," + -(this.ascent - 1), "none", "black", 1);
            this.box.drawOnCanvas(7, 0);
            this.nth && this.nth.alignOnCanvas(0, this.nth.descent - 6, "right");
            MathMLGlobals.CURObj = c
        },
        pushSubContainers: function (a, b, c) {
            this.box.pushContainers(a, b - this.nthWidth - 7, c);
            this.nth && this.nth.pushContainers(a, b - this.nthWidth, c + this.descent + 5 - this.nth.descent, "right")
        }
    };
    r = c.specialise(r);
    var C = {
        __name__: "RaiseBox",
        __init__: function (a, b) {
            this.raiseHeight = a;
            this.box = b;
            this.calculate()
        },
        calculate: function () {
            this.width = this.box.width;
            this.height = this.box.height;
            this.ascent = this.box.ascent + this.raiseHeight;
            this.descent = this.box.descent + this.raiseHeight
        },
        drawOnCanvas: function (a, b) {
            var c = MathMLGlobals.CURObj;
            SVGraisedBox(-this.raiseHeight);
            this.box.drawOnCanvas(a, b);
            MathMLGlobals.CURObj = c
        },
        pushSubContainers: function (a, b, c) {
            this.box.pushContainers(a, b, c + this.raiseHeight)
        }
    };
    C = c.specialise(C);
    var n = {
        __name__: "Table",
        __init__: function (a, b, c, d) {
            this.rows = a;
            this.nrows = this.rows.length;
            this.ncols = this.rows.reduce(function (a, b) {
                return Math.max(a, b.length)
            }, 0);
            this.hspace = b || 0;
            this.vspace = c || 0;
            this.align = d || "";
            this.calculate()
        },
        calculate: function () {
            var a, b = this.widths = [];
            for (a = 0; a < this.ncols; a++) b.push(0);
            var c = this.ascents = [],
                d = this.descents = [];
            for (a = 0; a < this.nrows; a++) c.push(-1E3), d.push(1E3);
            this.rows.forEach(function (a, f) {
                a.forEach(function (a, k) {
                    b[k] < a.width && (b[k] = a.width);
                    c[f] < a.ascent && (c[f] = a.ascent);
                    d[f] > a.descent && (d[f] = a.descent)
                })
            });
            for (a = this.height = 0; a < this.nrows; a++) this.height += c[a] - d[a];
            this.width = b.reduce(function (a, b) {
                return a + b
            }, 0) + this.hspace * (this.ncols - 1);
            this.ascent = this.height / 2;
            this.descent = -this.ascent
        },
        drawOnCanvas: function (a, b) {
            var c = this,
                d;
            b -= this.ascent - 1;
            this.rows.forEach(function (f, k) {
                b += c.ascents[k];
                d = a;
                f.forEach(function (a, f) {
                    switch (c.align.charAt(f)) {
                        case "l":
                            a.alignOnCanvas(d, b, "left");
                            break;
                        case "r":
                            a.alignOnCanvas(d + c.widths[f], b, "right");
                        case "c":
                        case "":
                            a.alignOnCanvas(d + c.widths[f] / 2, b, "center");
                            break;
                        default:
                            throw "Invalid align code: " + c.align.charAt(f);
                    }
                    d += c.widths[f] + c.hspace
                });
                b += c.vspace - c.descents[k]
            })
        },
        pushSubContainers: function (a, b, c) {
            var d = this,
                f;
            c += this.ascent;
            this.rows.forEach(function (k, e) {
                c -= d.ascents[e];
                f = 0;
                k.forEach(function (k, e) {
                    k.pushContainers(a, b - f - d.widths[e] / 2, c, "center");
                    f += d.widths[e] + d.hspace
                });
                c -= d.vspace - d.descents[e]
            })
        }
    };
    n = c.specialise(n);
    a.box = {
        Box: c,
        TextBox: d,
        Decoration: e,
        DecoratedBox: g,
        Scale: h,
        Train: m,
        Paren2: t,
        CurlyBracket: y,
        ElasticVBar: q,
        ElasticBox: z,
        HSpace: u,
        VSpace: w,
        Stack: A,
        HLine: v,
        Chapeau: f,
        OverBar: k,
        Arrow: B,
        ColorBox: D,
        CursorCaret: E,
        Frame: F,
        RootSign: r,
        RaiseBox: C,
        Table: n,
        getElasticBox: function (a, b) {
            switch (a) {
                case "(":
                    return t.instantiate(b);
                case ")":
                    return t.instantiate(b, !0);
                case "{":
                    return y.instantiate(b);
                case "}":
                    return y.instantiate(b, !0);
                case "|":
                    return q.instantiate(b);
                case "[":
                    return q.instantiate(b, !0, !0);
                case "]":
                    return q.instantiate(b, !0, !0, !0);
                case "|+":
                    return q.instantiate(b, !0);
                case "+|":
                    return q.instantiate(b, !0, !1, !0);
                case "|_":
                    return q.instantiate(b, !1, !0);
                case "_|":
                    return q.instantiate(b, !1, !0, !0)
            }
            throw "Elasctic box type '" + a + "' unknown";
        }
    };
    a.inBrowser && (a.box.init = b)
})(cvm);
if ("undefined" !== typeof module) {
    var $jscomp$destructuring$var12 = require("./cvm.js");
    cvm = $jscomp$destructuring$var12.cvm
}
(function (a) {
    var b = {
        prefix: {},
        infix: {},
        postfix: {},
        addPrefix: function (a, b) {
            this.prefix[a] = b
        },
        addInfix: function (a, b) {
            this.infix[a] = b
        },
        addPostfix: function (a, b) {
            this.postfix[a] = b
        },
        getPrefix: function (a) {
            return this.prefix[a]
        },
        getInfix: function (a) {
            return this.infix[a]
        },
        getPostfix: function (a) {
            return this.postfix[a]
        },
        simpleOperator: function (a, b, e) {
            return b ? {
                layout: function (c) {
                    return c.train(c.hspace(b), c.text(a), c.hspace(e ? e : b))
                }
            } : {
                layout: function (b) {
                    return b.text(a)
                }
            }
        },
        addSumOperator: function (a, b, e) {
            (b ||
                "" === b) && this.addPrefix(a, this.simpleOperator(b));
            (e || "" === b) && this.addInfix(a, this.simpleOperator(e, 3))
        }
    };
    b.addSumOperator("empty", "", "");
    b.addSumOperator("plus", "+", "+");
    b.addSumOperator("minus", "\u2212", "\u2212");
    b.addSumOperator("plusMinus", "\u00b1", "\u00b1");
    b.addSumOperator("minusPlus", "\u2213", "\u2213");
    b.addInfix("times", b.simpleOperator("\u00d7", 1));
    b.addInfix("eq", b.simpleOperator("=", 5));
    b.addInfix("neq", b.simpleOperator("\u2260", 5));
    b.addInfix("almeq", b.simpleOperator("\u2248", 5));
    b.addInfix("leq",
        b.simpleOperator("\u2264", 5));
    b.addInfix("geq", b.simpleOperator("\u2265", 5));
    b.addInfix("lt", b.simpleOperator("<", 5));
    b.addInfix("gt", b.simpleOperator(">", 5));
    b.addInfix("comma", b.simpleOperator("\u202f,\u00a0", 0, 3));
    b.addInfix("log_and", b.simpleOperator("\u2227", 5));
    b.addInfix("or", b.simpleOperator("\u2228", 5));
    b.addPrefix("not_", b.simpleOperator("\u00ac"));
    b.addPrefix("angle", b.simpleOperator("\u2220"));
    b.addPrefix("seg", b.simpleOperator("\u2220"));
    b.addPrefix("vector", b.simpleOperator("\u2220"));
    b.addInfix("modulo", b.simpleOperator("mod", 4));
    b.addInfix("multmult", b.simpleOperator("\u00d7", 1));
    b.addInfix("elemDivide", b.simpleOperator("\u00f7", 1));
    b.addInfix("multpt", b.simpleOperator("\u22c5", 0));
    b.addInfix("euclDiv", b.simpleOperator(":", 2));
    b.addInfix("oneLineDiv", b.simpleOperator("/"), 0);
    b.addPostfix("prime", b.simpleOperator("\u2032", 1, 0));
    b.addPostfix("pprime", b.simpleOperator("\u2033", 1, 0));
    b.addPostfix("factorial", b.simpleOperator("!"));
    b.addPostfix("ellipsis", b.simpleOperator("\u2026"));
    b.addPostfix("unitDeg", b.simpleOperator("\u00b0"));
    b.addPostfix("unitDegre", b.simpleOperator("\u00b0"));
    b.addPostfix("unitBool", b.simpleOperator("_\u03b2_^1"));
    b.addPostfix("unitRad", b.simpleOperator("rad"));
    b.addPostfix("unitInch", b.simpleOperator("inch"));
    b.addPostfix("unitLg", b.simpleOperator("cm"));
    b.addPostfix("unitLg2", b.simpleOperator("cm\u00b2"));
    b.addPostfix("unitLg3", b.simpleOperator("cm\u00b3"));
    b.addPrefix("sum", {
        layout: function (a) {
            return a.scale(a.text("\u2211"), 1.8)
        }
    });
    b.addPrefix("prod", {
        layout: function (a) {
            return a.scale(a.text("\u220f"), 1.8)
        }
    });
    b.addPrefix("limit", {
        layout: function (a) {
            return a.train([a.scale(a.text("\u2192"), 2.5), a.hspace(-5)])
        }
    });
    b.addPrefix("integral", {
        layout: function (a) {
            return a.train([a.scale(a.text("\u222b"), 2.5), a.hspace(-5)])
        }
    });
    b.addPrefix("d_integral", {
        layout: function (a) {
            return a.train([a.scale(a.text("\u222b\u222b"), 2.5), a.hspace(-2)])
        }
    });
    b.addPrefix("t_integral", {
        layout: function (a) {
            return a.train([a.scale(a.text("\u222b\u222b\u222b"), 2.5), a.hspace(-2)])
        }
    });
    a.operators = b
})(cvm);
if ("undefined" !== typeof module) {
    var $jscomp$destructuring$var13 = require("./cvm.js");
    cvm = $jscomp$destructuring$var13.cvm;
    var $jscomp$destructuring$var14 = require("./prototype.js");
    Prototype = $jscomp$destructuring$var14.Prototype;
    var $jscomp$destructuring$var15 = require("./mathmlglobals.js");
    MathMLGlobals = $jscomp$destructuring$var15.MathMLGlobals;
    var $jscomp$destructuring$var16 = require("./init.js");
    smartThousand = $jscomp$destructuring$var16.smartThousand;
    smartThousandth = $jscomp$destructuring$var16.smartThousandth;
    var $jscomp$destructuring$var17 = require("./xmlelement.js");
    XmlElement = $jscomp$destructuring$var17.XmlElement
}
(function (a) {
    if (!a.expr) {
        var b = a.operators;
        if (!b) throw "operators must be loaded";
        var c = {
            __name__: "Expression",
            subLayout: function (a, b, c) {
                var l = a.ofExpr(b);
                if (!0 === c || !1 !== c && !b.isContainer && this.priority >= b.priority) l = a.bracket(l);
                return l
            },
            isNumber: function () {
                return !1
            },
            removeChild: function (a) {
                return null
            },
            setPreviousSibling: function (a, b) {
                this.previousSibling = a;
                !a && this.parent ? this.parent.firstChild = this : b && a.setNextSibling(this)
            },
            setNextSibling: function (a, b) {
                this.nextSibling = a;
                !a && this.parent ? this.parent.lastChild =
                    this : b && a.setPreviousSibling(this)
            },
            setRelations: function (a, b, c, d) {
                this.parent = a;
                this.setNextSibling(c, d);
                this.setPreviousSibling(b, d)
            },
            removeFromSiblings: function () {
                this.previousSibling && (this.previousSibling.nextSibling = this.nextSibling);
                this.nextSibling && (this.nextSibling.previousSibling = this.previousSibling);
                this.previousSibling = this.nextSibling = this.parent = null
            },
            getSelection: function (a) {
                var b;
                var l = [];
                if (!a) return {
                    expr: this
                };
                for (b = this; !b.isRoot; b = b.parent) {
                    if (a === b) return {
                        expr: b
                    };
                    l.push(b)
                }
                for (b =
                    a; !b.isRoot; b = b.parent) {
                    if (b === this) return {
                        expr: b
                    };
                    a = l.indexOf(b.parent);
                    if (0 === a) return {
                        expr: this
                    };
                    if (-1 !== a) {
                        l = l[a - 1];
                        for (a = b.parent.firstChild;; a = a.nextSibling)
                            if (a === b) {
                                a = b;
                                break
                            } else if (a === l) {
                            a = l;
                            l = b;
                            break
                        }
                        return a === b.parent.firstChild && l === b.parent.lastChild ? {
                            expr: b.parent
                        } : {
                            expr: b.parent,
                            start: a,
                            stop: l.nextSibling
                        }
                    }
                }
                return null
            },
            getPredecessor: function () {
                var a;
                if (this.previousSibling) {
                    for (a = this.previousSibling; a.lastChild;) a = a.lastChild;
                    return a
                }
                return this.parent
            },
            getPredecessor2: function () {
                var a =
                    this.lastChild;
                if (a) return a;
                for (a = this; !a.previousSibling; a = a.parent)
                    if (a.isRoot) return this;
                return a.previousSibling
            },
            getSuccessor2: function () {
                var a = this.nextSibling;
                if (a) {
                    for (; a.firstChild;) a = a.firstChild;
                    return a
                }
                return this.parent.isRoot ? this : this.parent
            },
            getVPredecessor: function () {
                var a = this.getSiblingUp();
                if (a) {
                    for (; a.firstChild;) a = a.getBottomChild();
                    return a
                }
                return this.parent.isRoot ? this : this.parent
            },
            getVSuccessor: function () {
                var a = this.getTopChild();
                if (a) return a;
                for (a = this; !a.getSiblingDown(); a =
                    a.parent)
                    if (a.isRoot) return this;
                return a.getSiblingDown()
            },
            getSiblingUp: function () {
                return this.parent.getNextChildUp(this)
            },
            getSiblingDown: function () {
                return this.parent.getNextChildDown(this)
            },
            getNextChildUp: function (a) {
                return a.previousSibling
            },
            getNextChildDown: function (a) {
                return a.nextSibling
            },
            getTopChild: function () {
                return this.firstChild
            },
            getBottomChild: function () {
                return this.lastChild
            },
            getRoot: function () {
                for (var a = this; a && !a.isRoot;) a = a.parent;
                return a
            },
            getPreviousLeaf: function () {
                var a;
                for (a =
                    this; !a.previousSibling; a = a.parent)
                    if (a.isRoot) return null;
                for (a = a.previousSibling; a.lastChild;) a = a.lastChild;
                return a
            },
            getNextLeaf: function () {
                var a;
                for (a = this; !a.nextSibling; a = a.parent)
                    if (a.isRoot) return null;
                for (a = a.nextSibling; a.firstChild;) a = a.firstChild;
                return a
            },
            setSelected: function (a) {
                this.selected = a
            },
            clearSelected: function () {
                this.selected = !1
            },
            needsFactorSeparator: function () {
                return "Ellipsis" === this.__name__ ? !0 : !1
            },
            sumSeparator: b.infix.plus,
            getSumExpression: function () {
                return this
            }
        };
        c = Prototype.specialise(c);
        var d = {
            __name__: "FixedChildrenExpression",
            childProperties: [],
            optionalProperties: {},
            vOrder: [],
            __init__: function () {
                var a = arguments,
                    b = this.childProperties.length - 1,
                    c, d = this;
                this.childProperties.forEach(function (l, H) {
                    var f = a[H],
                        k = H < b ? a[H + 1] : void 0;
                    f && (d[l] = f, f.parentIndex = H, f.setRelations(d, c, k));
                    c = f
                })
            },
            copy: function () {
                var a = this,
                    b = this.childProperties.map(function (b) {
                        return (b = a[b]) && b.copy()
                    }),
                    c = this.__proto__.specialise();
                c.__init__.apply(c, b);
                return c
            },
            replaceChild: function (a, b) {
                var l = a.parentIndex,
                    c = this.childProperties[l];
                b.parentIndex = l;
                this[c] = b;
                b.setRelations(this, a.previousSibling, a.nextSibling, !0);
                a.setRelations()
            },
            removeChild: function (a) {
                var b = this,
                    l = 0,
                    c = null;
                this.childProperties.forEach(function (d) {
                    d = b[d];
                    d === a || !d || d.isEditExpr && d.isEmpty() || (l++, c = d)
                });
                var d = this.childProperties[a.parentIndex];
                return b.optionalProperties[d] ? (b[d] = null, a.removeFromSibling(), null) : 1 < l ? (this.replaceChild(a, I), null) : 1 == l ? (this.parent.replaceChild(this, c), c) : this.parent.removeChild(this)
            },
            getTopChild: function () {
                var a,
                    b;
                for (a = 0; a < this.vOrder.length; a++)
                    if (b = this[this.vOrder[a]]) return b;
                return null
            },
            getBottomChild: function () {
                var a, b;
                for (a = this.vOrder.length; 0 <= a; a--)
                    if (b = this[this.vOrder[a]]) return b;
                return null
            },
            getNextChildUp: function (a) {
                a = this.vOrder.indexOf(this.childProperties[a.parentIndex]);
                return this[this.vOrder[a - 1]] || null
            },
            getNextChildDown: function (a) {
                a = this.vOrder.indexOf(this.childProperties[a.parentIndex]);
                return this[this.vOrder[a + 1]] || null
            }
        };
        d = c.specialise(d);
        var e = {
            __name__: "Subscript",
            childProperties: ["base",
                "subscript"
            ],
            vOrder: ["base", "subscript"],
            layout: function (a) {
                a = a.subscript(this.subLayout(a, this.base), a.scale(a.ofExpr(this.subscript), .8));
                a.bindExpr(this);
                return a
            }
        };
        e = d.specialise(e);
        var g = {
            __name__: "PrefixOperation",
            isPrefixOperation: !0,
            childProperties: ["value"],
            vOrder: ["value"],
            layout: function (a) {
                var b = this.prefixOp.layout(a),
                    l = this.subLayout(a, this.value);
                a = a.train(b, l);
                b.bindExpr(this, "prefix");
                a.bindExpr(this);
                return a
            },
            getSumExpression: function () {
                return this.value
            }
        };
        g = d.specialise(g);
        var h = {
            __name__: "Negation",
            isNegation: !0,
            prefixOp: b.prefix.minus,
            sumSeparator: b.infix.minus
        };
        h = g.specialise(h);
        var m = {
            __name__: "Add",
            isAdd: !0,
            prefixOp: b.prefix.plus,
            sumSeparator: b.infix.plus
        };
        m = g.specialise(m);
        var t = {
            __name__: "PlusMinus",
            isPlusMinus: !0,
            prefixOp: b.prefix.plusMinus,
            sumSeparator: b.infix.plusMinus
        };
        t = g.specialise(t);
        var y = {
            __name__: "MinusPlus",
            isMinusPlus: !0,
            prefixOp: b.prefix.minusPlus,
            sumSeparator: b.infix.minusPlus
        };
        y = g.specialise(y);
        var q = {
            __name__: "Not_",
            isNot_: !0,
            prefixOp: b.prefix.not_
        };
        q = g.specialise(q);
        var z = {
            __name__: "Angle",
            isAngle: !0,
            childProperties: ["corps"],
            vOrder: ["corps"],
            __init__: function (a, b) {
                d.__init__.call(this, a);
                this.scaleDown = !b
            },
            layout: function (a) {
                var b = a.hspace(.5);
                b = a.train([b, a.ofExpr(this.corps)]);
                var c = 5;
                Ca(b) && (c = 2);
                c = a.chapeau(null, c);
                b = a.stack([b, c], 1);
                b.bindExpr(this);
                c.bindExpr(this, "cha_peau_");
                if (this.scaleDown) b = a.scale(b, 1);
                else return b;
                return a.raise(14, b)
            }
        };
        z = d.specialise(z);
        var u = {
            __name__: "Seg",
            isSeg: !0,
            childProperties: ["corps"],
            vOrder: ["corps"],
            __init__: function (a, b) {
                d.__init__.call(this, a);
                this.scaleDown = !b
            },
            layout: function (a) {
                var b = a.hspace(.5);
                b = a.train([b, a.ofExpr(this.corps)]);
                var c = 5;
                Ca(b) && (c = 2);
                c = a.overbar(null, c);
                b = a.stack([b, c], 1);
                b.bindExpr(this);
                c.bindExpr(this, "overbar_");
                if (this.scaleDown) b = a.scale(b, 1);
                else return b;
                return a.raise(14, b)
            }
        };
        u = d.specialise(u);
        var w = {
            __name__: "Vector",
            isVector: !0,
            childProperties: ["corps"],
            vOrder: ["corps"],
            __init__: function (a, b) {
                d.__init__.call(this, a);
                this.scaleDown = !b
            },
            layout: function (a) {
                var b =
                    a.hspace(0),
                    c = a.train([b, a.ofExpr(this.corps)]);
                b = a.arrow(null, "a" == c.elems[1].boundExprs[0].expr.value ? 3 : 6);
                c = a.stack([c, b], 1);
                c.bindExpr(this);
                b.bindExpr(this, "arrow_");
                if (this.scaleDown) c = a.scale(c, 1);
                else return c;
                return a.raise(14, c)
            }
        };
        w = d.specialise(w);
        var A = {
            __name__: "Bracket",
            isBracket: !0,
            isContainer: !0,
            childProperties: ["expr"],
            vOrder: ["expr"],
            layout: function (a) {
                var b = a.ofExpr(this.expr);
                a = a.bracket(b, "#A0A0A0");
                a.bindExpr(this);
                MathMLGlobals.pendingParen = !0;
                return a
            }
        };
        A = d.specialise(A);
        g = {
            __name__: "LabelledExpr",
            isLabelledExpression: !0,
            childProperties: ["label", "expr"],
            vOrder: ["label", "expr"],
            layout: function (a) {
                var b = a.ofExpr(this.label),
                    c = a.ofExpr(this.expr);
                a = a.train(b, c);
                a.bindExpr(this);
                return a
            },
            needsFactorSeparator: function () {
                return !0
            }
        };
        g = d.specialise(g);
        var v = {
            __name__: "ExprWithUnits",
            isExprWithUnits: !0,
            isLabelledExpression: !0,
            childProperties: ["expr", "units"],
            vOrder: ["expr", "units"],
            layout: function (a) {
                var b = a.ofExpr(this.expr),
                    c = a.ofExpr(this.units);
                a = "\u00b0" == this.units.name ?
                    a.train(b, c) : a.train(b, a.hspace(4), c);
                a.bindExpr(this);
                return a
            },
            needsFactorSeparator: function () {
                return !0
            }
        };
        v = d.specialise(v);
        var f = {
            __name__: "FunctionApplication",
            isFunctionApplication: !0,
            childProperties: ["func", "arglist"],
            layout: function (a) {
                var b = a.ofExpr(this.func),
                    c = a.bracket(a.ofExpr(this.arglist));
                a = a.train([b, c]);
                a.bindExpr(this);
                return a
            }
        };
        f = d.specialise(f);
        var k = {
            __name__: "Power",
            isPower: !0,
            childProperties: ["base", "power"],
            vOrder: ["power", "base"],
            subLayout: function (a, b) {
                var l = c.subLayout.call(this,
                    a, b);
                b === this.base && b.isSqrt && (l = a.bracket(l));
                return l
            },
            layout: function (a) {
                var b = this.subLayout(a, this.base),
                    c = a.ofExpr(this.power);
                a = a.superscript(b, a.scale(c, .8));
                a.bindExpr(this);
                return a
            },
            needsFactorSeparator: function () {
                return this.base.needsFactorSeparator()
            }
        };
        k = d.specialise(k);
        var B = {
            __name__: "Fraction",
            isFraction: !0,
            childProperties: ["nuM", "deN"],
            vOrder: ["nuM", "deN"],
            __init__: function (a, b, c) {
                d.__init__.call(this, a, b);
                this.scaleDown = !c
            },
            layout: function (a) {
                var b = a.hline(null, 1),
                    c = a.vspace(2),
                    l = a.hspace(4),
                    d = a.train([l, a.ofExpr(this.deN), l]);
                l = a.train([l, a.ofExpr(this.nuM), l]);
                c = a.stack([d, c, b, c, l], 1);
                c.bindExpr(this);
                b.bindExpr(this, "line");
                if (this.scaleDown) c = a.scale(c, .9);
                else return c;
                return a.raise(3, c)
            },
            needsFactorSeparator: function () {
                return !0
            }
        };
        B = d.specialise(B);
        var D = {
            __name__: "FractionJML",
            isFractionJML: !0,
            childProperties: ["numJML", "denJML"],
            vOrder: ["numJML", "denJML"],
            __init__: function (a, b, c) {
                d.__init__.call(this, a, b);
                this.scaleDown = !c
            },
            layout: function (a) {
                var b = a.vspace(0),
                    c =
                    a.hspace(10),
                    l = a.train([c, a.ofExpr(this.denJML), c]);
                c = a.train([c, a.ofExpr(this.numJML), c]);
                b = a.stack([l, b, c], 1);
                b.bindExpr(this);
                if (this.scaleDown) b = a.scale(b, .8);
                else return b;
                return a.raise(10, b)
            },
            needsFactorSeparator: function () {
                return !0
            }
        };
        D = d.specialise(D);
        var E = {
            __name__: "Derivative",
            isDerivative: !0,
            childProperties: ["expr", "variable"],
            optionalProperties: {
                variable: !0
            },
            layout: function (a) {
                if (this.variable) {
                    var c = x.fraction(x.parameter("d"), x.differential(this.variable));
                    c = x.applyFunction(c, this.expr);
                    a = a.ofExpr(c);
                    a.bindExpr(this);
                    return a
                }
                a = a.topAlign(this.subLayout(a, this.expr), b.getPostfix("prime").layout(a));
                a.bindExpr(this);
                return a
            }
        };
        E = d.specialise(E);
        var F = {
            __name__: "DDerivative",
            isDerivative: !0,
            childProperties: ["expr", "variable"],
            optionalProperties: {
                variable: !0
            },
            layout: function (a) {
                if (this.variable) {
                    var c = x.fraction(x.parameter("d"), x.differential(this.variable));
                    c = x.applyFunction(c, this.expr);
                    a = a.ofExpr(c);
                    a.bindExpr(this);
                    return a
                }
                a = a.topAlign(this.subLayout(a, this.expr), b.getPostfix("pprime").layout(a));
                a.bindExpr(this);
                return a
            }
        };
        F = d.specialise(F);
        var r = {
            __name__: "OneChildExpression",
            __init__: function (a) {
                var b = arguments,
                    c = this;
                this.child = a;
                a.setRelations(this);
                this.extraProperties && this.extraProperties.forEach(function (a, l) {
                    c[a] = b[l + 1]
                })
            },
            copy: function () {
                if (this.extraProperties) {
                    var a = this;
                    var b = [this.child.copy()];
                    this.extraProperties.forEach(function (c) {
                        b.push(a[c])
                    });
                    return this.__proto__.instantiate.apply(this.__proto__, b)
                }
                return this.__proto__.instantiate(this.child.copy())
            },
            replaceChild: function (a,
                b) {
                return this.child === a ? (this.child = b, b.setRelations(this), a.setRelations(), !0) : !1
            },
            removeChild: function (a) {
                return this.child === a ? this.parent.removeChild(this) : null
            }
        };
        r = c.specialise(r);
        var C = {
            __name__: "ExprWithRelation",
            isExprWithRelation: !0,
            extraProperties: ["relation"]
        };
        C = r.specialise(C);
        var n = {
            __name__: "Fencing",
            isContainer: !0,
            layout: function (a) {
                var b = a.ofExpr(this.child);
                a = a.lrEnclosure(b, this.leftFence, this.rightFence);
                a.bindExpr(this);
                return a
            }
        };
        n = r.specialise(n);
        var p = {
            __name__: "Abs",
            leftFence: "|",
            rightFence: "|"
        };
        p = n.specialise(p);
        var J = {
            __name__: "Ceiling",
            leftFence: "|+",
            rightFence: "+|"
        };
        J = n.specialise(J);
        var K = {
            __name__: "Floor",
            leftFence: "|_",
            rightFence: "_|"
        };
        K = n.specialise(K);
        var L = {
            __name__: "Conjugate",
            isContainer: !0,
            layout: function (a) {
                var b = a.ofExpr(this.child),
                    c = a.hline(null, 1),
                    l = a.vspace(-.5);
                a = a.stack([b, l, c], 0);
                a.bindExpr(this);
                c.bindExpr(this, "line");
                return a
            }
        };
        L = r.specialise(L);
        var M = {
            __name__: "Factorial",
            layout: function (a) {
                var c = this.subLayout(a, this.child),
                    l = b.getPostfix("factorial").layout(a);
                a = a.train([c, l]);
                a.bindExpr(this);
                return a
            }
        };
        M = r.specialise(M);
        var N = {
            __name__: "Ellipsis",
            layout: function (a) {
                var c = this.subLayout(a, this.child),
                    l = b.getPostfix("ellipsis").layout(a);
                a = a.train([c, l]);
                a.bindExpr(this);
                return a
            }
        };
        N = r.specialise(N);
        var O = {
            __name__: "UnitDeg",
            layout: function (a) {
                var c = this.subLayout(a, this.child),
                    l = b.getPostfix("unitDeg").layout(a);
                a = a.train([c, l]);
                a.bindExpr(this);
                return a
            }
        };
        O = r.specialise(O);
        var P = {
            __name__: "UnitDegre",
            layout: function (a) {
                var c = this.subLayout(a, this.child),
                    l = b.getPostfix("unitDegre").layout(a);
                a = a.train([c, l]);
                a.bindExpr(this);
                return a
            }
        };
        P = r.specialise(P);
        var Q = {
            __name__: "UnitBool",
            layout: function (a) {
                var c = this.subLayout(a, this.child),
                    l = b.getPostfix("unitBool").layout(a);
                a = a.train([c, l]);
                a.bindExpr(this);
                return a
            }
        };
        Q = r.specialise(Q);
        var R = {
            __name__: "UnitRad",
            layout: function (a) {
                var c = a.hspace(5),
                    l = this.subLayout(a, this.child),
                    d = b.getPostfix("unitRad").layout(a);
                a = a.train([l, c, d]);
                a.bindExpr(this);
                return a
            }
        };
        R = r.specialise(R);
        var Da = {
            __name__: "UnitInch",
            layout: function (a) {
                var c = a.hspace(5),
                    l = this.subLayout(a, this.child),
                    d = b.getPostfix("unitInch").layout(a);
                a = a.train([l, c, d]);
                a.bindExpr(this);
                return a
            }
        };
        G = r.specialise(G);
        var G = {
            __name__: "UnitLg",
            layout: function (a) {
                var c = a.hspace(5),
                    l = this.subLayout(a, this.child),
                    d = b.getPostfix("unitLg").layout(a);
                a = a.train([l, c, d]);
                a.bindExpr(this);
                return a
            }
        };
        G = r.specialise(G);
        var S = {
            __name__: "UnitLg2",
            layout: function (a) {
                var c = a.hspace(5),
                    l = this.subLayout(a, this.child),
                    d = b.getPostfix("unitLg2").layout(a);
                a = a.train([l,
                    c, d
                ]);
                a.bindExpr(this);
                return a
            }
        };
        S = r.specialise(S);
        var T = {
            __name__: "UnitLg3",
            layout: function (a) {
                var c = a.hspace(5),
                    l = this.subLayout(a, this.child),
                    d = b.getPostfix("unitLg3").layout(a);
                a = a.train([l, c, d]);
                a.bindExpr(this);
                return a
            }
        };
        T = r.specialise(T);
        n = {
            __name__: "OpOf",
            isOpOf: !0,
            childProperties: ["arg", "from", "to"],
            optionalProperties: {
                from: !0,
                to: !0
            },
            layout: function (a) {
                var b = [],
                    c = 0,
                    l = a.vspace(-0),
                    d = a.vspace(-2);
                this.from && (b.push(a.scale(a.ofExpr(this.from), .7)), c = 1);
                b.push(l);
                b.push(this.operator.layout(a));
                b.push(d);
                this.to && b.push(a.scale(a.ofExpr(this.to), .7));
                b = a.raise(-10, a.stack(b, c));
                a = a.train(b, this.subLayout(a, this.arg));
                a.bindExpr(this);
                return a
            },
            setFrom: function (a) {
                this.from && this.from.setRelations();
                this.from = a;
                a.setRelations(this, this.arg, this.to, !0)
            },
            setTo: function (a) {
                this.to && this.to.setRelations();
                this.to = a;
                a.setRelations(this, this.from, null, !0)
            }
        };
        n = d.specialise(n);
        var U = {
            __name__: "LimitOf",
            isLimitOf: !0,
            operator: b.getPrefix("limit")
        };
        U = n.specialise(U);
        var V = {
            __name__: "SumOf",
            isSumOf: !0,
            operator: b.getPrefix("sum")
        };
        V = n.specialise(V);
        var wa = {
            __name__: "ProductOf",
            isProductOf: !0,
            operator: b.getPrefix("product")
        };
        wa = n.specialise(wa);
        var W = {
            __name__: "IntegralOf",
            isIntegralOf: !0,
            operator: b.getPrefix("integral")
        };
        W = n.specialise(W);
        var X = {
            __name__: "D_integralOf",
            isD_integralOf: !0,
            operator: b.getPrefix("d_integral")
        };
        X = n.specialise(X);
        var Y = {
            __name__: "T_integralOf",
            isTIntegralOf: !0,
            operator: b.getPrefix("t_integral")
        };
        Y = n.specialise(Y);
        var Z = {
            __name__: "Differential",
            isDifferential: !0,
            layout: function (a) {
                var b =
                    a.text("d"),
                    c = this.subLayout(a, this.child);
                a = a.train([b, c]);
                a.bindExpr(this);
                return a
            }
        };
        Z = r.specialise(Z);
        var xa = {
            __name__: "ColorExpr",
            extraProperties: ["color"],
            __init__: function () {
                r.__init__.apply(this, arguments);
                this.priority = this.child.priority
            },
            layout: function (a) {
                return a.color(this.color, this.child.layout(a))
            },
            replaceChild: function () {
                r.replaceChild.apply(this, arguments);
                this.priority = this.child.priority
            }
        };
        xa = r.specialise(xa);
        var ya = {
            __name__: "RootExpression",
            isRoot: !0,
            __init__: function (a) {
                this.parent =
                    this;
                this.expr = a;
                a.setRelations(this, null, null)
            },
            layout: function (a) {
                a = a.ofExpr(this.expr);
                a.bindExpr(this);
                return a
            },
            replaceChild: function (a, b) {
                return a === this.expr ? (this.expr = b, b.setRelations(this, null, null), a.setRelations(), b) : null
            }
        };
        ya = c.specialise(ya);
        var aa = {
            __name__: "Number",
            __init__: function (a) {
                this.value = a
            },
            layout: function (a) {
                a = a.text(this.value.toString());
                if (4 < this.value.length && !MathMLGlobals.forAlgebrite) {
                    var b = this.value.split(".");
                    a.text = smartThousand(b[0]);
                    1 < b.length && (a.text += "." +
                        smartThousandth(b[1]))
                }
                "." != MathMLGlobals.decSeparator && (a.text = a.text.replace(/\./, MathMLGlobals.decSeparator));
                this.endingWithPoint && (a.text += MathMLGlobals.decSeparator + "?");
                a.bindExpr(this);
                return a
            },
            isNumber: function () {
                return !0
            },
            copy: function () {
                return x.number(this.value)
            },
            needsFactorSeparator: function () {
                return !0
            }
        };
        aa = c.specialise(aa);
        var ba = {
            __name__: "Parameter",
            __init__: function (a, b) {
                this.name = a;
                this.value = b || a
            },
            layout: function (a) {
                var b = null;
                1 == this.value.length && 0 == this.value.search(/[a-zA-Z]/) &&
                    (this.parent && "ExprWithUnits" != this.parent.__name__ || this.nextSibling) && (b = {
                        style: "italic"
                    });
                if (-1 != this.value.indexOf("__$")) {
                    for (var c = this;
                        "RootExpression" != c.parent.__name__;) c = c.parent;
                    c = "" + c.parent.nb_wUnits[this.value];
                    var d = c.indexOf("^");
                    "\u00b0" == c.charAt(d - 1) && (c = c.replace(" ", ""), d--);
                    1 == c.substring(d + 1) && (c = c.substring(0, d));
                    c.endsWith("_\u03b2_") ? 0 === parseFloat(c) ? this.value = Translator.translate("<boolean_false/>") : this.value = Translator.translate("<boolean_true/>") : this.value = c.replace(".",
                        MathMLGlobals.decSeparator)
                }
                a = a.text(this.value, b);
                a.bindExpr(this);
                return a
            },
            copy: function () {
                return x.parameter(this.name, this.value)
            },
            needsFactorSeparator: function () {
                if (!0 === MathMLGlobals.forCalcSVG) {
                    if (0 == this.name.indexOf("__$")) return !0
                } else return !1
            }
        };
        ba = c.specialise(ba);
        var Ca = function (a) {
            if ("LText" == a.elems[1].__name__) return a = a.elems[1].text, 1 == a.length && a.match(/[a-z]+/);
            if ("LTrain" == a.elems[1].__name__) {
                var b = a.elems[1].elems,
                    c;
                for (c = 0; c < b.length; c++)
                    if ("LText" == b[c].__name__) {
                        a = b[c].text;
                        var d = a.length;
                        a = a.match(/[acegijm-su-z]+/);
                        if (null == a || a.length != d) return !1
                    } else return !1;
                return !0
            }
        };
        n = {
            __name__: "VarLenOperation",
            isVarLenOperation: !0,
            __init__: function () {
                var a = this,
                    b, c = arguments[0];
                if (1 !== arguments.length || !c instanceof Array)
                    for (c = [], b = 0; b < arguments.length; b++) c.push(arguments[b]);
                this.operands = c;
                c.forEach(function (b, d) {
                    b.setRelations(a, c[d - 1], c[d + 1])
                })
            },
            fromSlice: function (a) {
                var b, c = [];
                for (b = a.start; b !== a.stop; b = b.nextSibling) c.push(b.copy());
                return this.__proto__.instantiate(c)
            },
            pushOp: null,
            layout: function (a) {
                var b = this,
                    c = [];
                this.operands.forEach(function (d, l) {
                    b.pushOp(a, c, l)
                });
                var d = a.train(c);
                d.bindExpr(this);
                return d
            },
            slicedLayout: function (a, b) {
                var c = this,
                    d = [],
                    l = [],
                    f = [],
                    k = d;
                this.operands.forEach(function (d, H) {
                    switch (d) {
                        case b.start:
                            k = f;
                            break;
                        case b.stop:
                            k = l
                    }
                    c.pushOp(a, k, H)
                });
                d = a.train(d);
                f = a.train(f);
                l = a.train(l);
                d = a.train([d, f, l]);
                d.bindExpr(this);
                return d
            },
            copy: function () {
                return this.__proto__.instantiate(this.operands.map(function (a) {
                    return a.copy()
                }))
            },
            replaceChild: function (a,
                b, c) {
                var d = this;
                return this.operands.some(function (l, f, k) {
                    return l === a ? (f = d.insertAfter(l, b, c), d.removeChild(l), f) : null
                })
            },
            removeChild: function (a) {
                var b = this.operands.indexOf(a);
                if (-1 === b) return null;
                a.setRelations();
                if (2 !== this.operands.length || this.oneOperandPossible) return this.operands.splice(b, 1), b && this.operands[b - 1].setNextSibling(this.operands[b]), b < this.operands.length && this.operands[b].setPreviousSibling(this.operands[b - 1]), null;
                this.parent.replaceChild(this, this.operands[1 - b]);
                return this.operands[1 -
                    b]
            },
            removeSlice: function (a) {
                var b = this.operands,
                    c = b.length,
                    d = a.start ? b.indexOf(a.start) : 0;
                a = a.stop ? b.indexOf(a.stop) : c;
                var l = a - d;
                switch (c - l) {
                    case 0:
                        return this.parent.removeChild(this), !0;
                    case 1:
                        if (!this.oneOperandPossible) return this.parent.replaceChild(this, b[d ? 0 : a]), !0;
                    default:
                        return d && b[d - 1].setNextSibling(b[a]), a < c && b[a].setPreviousSibling(b[d - 1]), b.splice(d, l), !0
                }
            },
            replaceSlice: function (a, b) {
                this.insertBefore(a.start, b);
                this.removeSlice(a);
                return !0
            },
            insertAt: function (a, b) {
                var c = this;
                if (0 > a ||
                    a > this.operands.length) return !1;
                if (b.isGroup || b.__proto__ !== this.__proto__) {
                    var d = this.operands[a - 1];
                    var l = this.operands[a];
                    this.operands.splice(a, 0, b);
                    b.setRelations(this, d, l, !0)
                } else b.operands.forEach(function (b, d) {
                    c.insertAt(a + d, b)
                });
                return !0
            },
            insertAfter: function (a, b) {
                a = this.operands.indexOf(a);
                return -1 === a ? !1 : this.insertAt(a + 1, b)
            },
            insertBefore: function (a, b) {
                a = this.operands.indexOf(a);
                return -1 === a ? !1 : this.insertAt(a, b)
            }
        };
        n = c.specialise(n);
        var ca = {
            __name__: "Somme",
            pushOp: function (a, d, f, k) {
                k = this.operands[f];
                f && (k.selected ? (f = k.isPrefixOperation ? b.infix.empty.layout(a) : c.sumSeparator.layout(a), f.bindExpr(k)) : (f = k.sumSeparator.layout(a), f.bindExpr(k), k = k.getSumExpression()), d.push(f));
                d.push(this.subLayout(a, k))
            }
        };
        ca = n.specialise(ca);
        var da = {
            __name__: "Equation",
            isProposition: !0,
            isEquation: !0,
            fromSlice: function (a) {
                var b, c = [];
                for (b = a.start; b !== a.stop; b = b.nextSibling) b == a.start && b.isExprWithRelation ? c.push(b.child.copy()) : c.push(b.copy());
                return this.__proto__.instantiate(c)
            },
            pushOp: function (a, c, d, f) {
                f = this.operands[d];
                d && (f.isExprWithRelation ? (d = f.relation, f = f.child) : d = "eq", d = b.infix[d].layout(a), c.push(d), d.bindExpr(f));
                c.push(this.subLayout(a, f))
            }
        };
        da = n.specialise(da);
        var ea = {
            __name__: "Product",
            isProduct: !0,
            subLayout: function (a, b) {
                if (b.isTrigFunction || b.isOrdFunction) {
                    var d = a.hspace(2);
                    return a.train([d, a.ofExpr(b), d])
                }
                return c.subLayout.call(this, a, b)
            },
            pushOp: function (a, c, d, f) {
                var l = this.operands[d];
                d && l.needsFactorSeparator() && (f = b.infix.times.layout(a), c.push(f), f.bindExpr(this, d));
                c.push(this.subLayout(a,
                    l))
            }
        };
        ea = n.specialise(ea);
        var za = {
            __name__: "ArgumentList",
            isArgumentList: !0,
            oneOperandPossible: !0,
            pushOp: function (a, c, d, f) {
                d && (f = b.infix.comma.layout(a), c.push(f), f.bindExpr(this, d));
                c.push(this.subLayout(a, this.operands[d]))
            },
            insertAfterInRow: function (a, b) {
                return this.insertAfter(a, b)
            }
        };
        za = n.specialise(za);
        var Aa = {
            __name__: "CoordsList",
            isArgumentList: !0,
            oneOperandPossible: !0,
            pushOp: function (a, c, d, f) {
                if (d) {
                    f = b.infix.comma.layout(a);
                    if ("," === f.text.charAt(1)) {
                        var l = MathMLGlobals.coord_separator;
                        "CoordsList" ===
                        this.__name__ && "MultiVarFunction" === this.parent.__proto__.__name__ && (l = ",");
                        f.text = "\u202f" + l + "\u00a0"
                    }
                    c.push(f);
                    f.bindExpr(this, d)
                }
                c.push(this.subLayout(a, this.operands[d]))
            },
            layout: function (a) {
                var b = this,
                    c = [];
                this.operands.forEach(function (d, f) {
                    b.pushOp(a, c, f)
                });
                var d = a.train(c);
                var f = a.lrEnclosure(d, "(", ")");
                d.bindExpr(this);
                f.bindExpr(this, "bracket");
                return a.raise(0, f)
            },
            insertAfterInRow: function (a, b) {
                return this.insertAfter(a, b)
            }
        };
        Aa = n.specialise(Aa);
        var fa = {
            __name__: "Conjunction",
            isConjunction: !0,
            pushOp: function (a, c, d, f) {
                d && (f = b.infix.log_and.layout(a), c.push(f), f.bindExpr(this, d));
                c.push(this.subLayout(a, this.operands[d]))
            }
        };
        fa = n.specialise(fa);
        var ha = {
            __name__: "Modulo",
            isModulo: !0,
            pushOp: function (a, c, d, f) {
                d && (f = b.infix.modulo.layout(a), c.push(f), f.bindExpr(this, d));
                c.push(this.subLayout(a, this.operands[d]))
            }
        };
        ha = n.specialise(ha);
        var ia = {
            __name__: "Multmult",
            isMultmult: !0,
            pushOp: function (a, c, d, f) {
                d && (f = b.infix.multmult.layout(a), c.push(f), f.bindExpr(this, d));
                c.push(this.subLayout(a, this.operands[d]))
            }
        };
        ia = n.specialise(ia);
        var ja = {
            __name__: "ElemDivide",
            isElemDivide: !0,
            pushOp: function (a, c, d, f) {
                d && (f = b.infix.elemDivide.layout(a), c.push(f), f.bindExpr(this, d));
                c.push(this.subLayout(a, this.operands[d]))
            }
        };
        ja = n.specialise(ja);
        var ka = {
            __name__: "Multpt",
            isMultpt: !0,
            pushOp: function (a, c, d, f) {
                d && (f = b.infix.multpt.layout(a), c.push(f), f.bindExpr(this, d));
                c.push(this.subLayout(a, this.operands[d]))
            }
        };
        ka = n.specialise(ka);
        var la = {
            __name__: "EuclDiv",
            isEuclDiv: !0,
            pushOp: function (a, c, d, f) {
                d && (f = b.infix.euclDiv.layout(a),
                    c.push(f), f.bindExpr(this, d));
                c.push(this.subLayout(a, this.operands[d]))
            }
        };
        la = n.specialise(la);
        var ma = {
            __name__: "OneLineDiv",
            isOneLineDiv: !0,
            pushOp: function (a, c, d, f) {
                d && (f = b.infix.oneLineDiv.layout(a), c.push(f), f.bindExpr(this, d));
                c.push(this.subLayout(a, this.operands[d]))
            }
        };
        ma = n.specialise(ma);
        var na = {
            __name__: "Disjunction",
            isDisjunction: !0,
            pushOp: function (a, c, d, f) {
                d && (f = b.infix.or.layout(a), c.push(f), f.bindExpr(this, d));
                c.push(this.subLayout(a, this.operands[d]))
            }
        };
        na = n.specialise(na);
        var oa = {
            __name__: "Piecewise",
            isPiecewise: !0,
            isContainer: !0,
            layout: function (a) {
                var b = this.operands.map(function (b) {
                    return b.isConditionalExpression ? [a.ofExpr(b.expr), a.ofExpr(b.condition)] : [a.ofExpr(b), a.text("otherwise")]
                });
                b = a.table(b, 10, 2, "ll");
                b = a.lrEnclosure(b, "{", null);
                b = a.raise(4, b);
                b.bindExpr(this);
                return b
            }
        };
        oa = n.specialise(oa);
        var Ba = {
            __name__: "Text",
            isText: !0,
            __init__: function (a, b) {
                this.content = a || "";
                this._needsFactorSeparator = b
            },
            layout: function (a) {
                var b = a.text(this.content),
                    c = a.hspace(3);
                a = a.train([c, b, c]);
                a.bindExpr(this);
                return a
            },
            copy: function () {
                return x.text(this.content)
            },
            needsFactorSeparator: function () {
                return !0
            }
        };
        Ba = c.specialise(Ba);
        var pa = {
            __name__: "ConditionalExpression",
            isConditionalExpression: !0,
            childProperties: ["expr", "condition"],
            layout: function (a) {
                if (this.expr.isConjunction) {
                    var c = this.expr.operands.map(function (b) {
                        return [a.ofExpr(b)]
                    });
                    c = a.table(c, 10, 2, "l");
                    c = a.lrEnclosure(c, null, "}");
                    c = a.raise(4, c);
                    c = a.train([c, a.ofExpr(this.condition)])
                } else {
                    c = this.subLayout(a, this.expr);
                    var d = b.infix.comma.layout(a),
                        f = this.subLayout(a, this.condition);
                    c = a.train([c, d, f])
                }
                c.bindExpr(this);
                return c
            }
        };
        pa = d.specialise(pa);
        var qa = {
            __name__: "Sqrt",
            isContainer: !0,
            isSqrt: !0,
            __init__: function (a, b) {
                this.expr = a;
                (this.nth = b) && b.setRelations(this, null, a);
                a.setRelations(this, b, null)
            },
            layout: function (a) {
                var b = a.ofExpr(this.expr),
                    c = this.nth && a.scale(a.ofExpr(this.nth), .6);
                a = a.sqrt(b, c);
                a.bindExpr(this);
                return a
            },
            copy: function () {
                return x.sqrt(this.expr.copy(), this.nth && this.nth.copy())
            },
            replaceChild: function (a, b) {
                return a === this.expr ?
                    (this.expr = b, b.setRelations(this, this.nth, null, !0), a.setRelations(), !0) : a === this.nth ? (this.nth = b, b.setRelations(this, null, this.expr, !0), a.setRelations(), !0) : !1
            },
            removeChild: function (a) {
                return a === this.nth ? (this.parent.replaceChild(this, this.expr), this.parent) : a === this.expr ? this.nth ? (this.parent.replaceChild(this, this.nth), this.parent) : this.parent.removeChild(this) : null
            }
        };
        qa = c.specialise(qa);
        var ra = {
            __name__: "TrigFunction",
            isTrigFunction: !0,
            __init__: function (a, b, c) {
                this.name = a;
                this.arg = b;
                this.power =
                    c;
                this.arg.setRelations(this);
                c && this.power.setRelations(this, null, b, !0)
            },
            subLayout: function (a, b) {
                var d;
                return b.isProduct && (d = b.operands.some(function (a) {
                    return a.isTrigFunction
                })) ? a.bracket(a.ofExpr(b)) : c.subLayout.call(this, a, b)
            },
            layout: function (a) {
                var b = a.text(this.name),
                    c = a.hspace(3),
                    d = this.subLayout(a, this.arg);
                if (this.power) {
                    var f = a.ofExpr(this.power);
                    b = a.superscript(b, a.scale(f, .8))
                }
                a = a.train([b, c, d]);
                a.bindExpr(this);
                return a
            },
            copy: function () {
                return x.trigFunction(this.name, this.arg.copy(),
                    this.power && this.power.copy())
            },
            replaceChild: function (a, b) {
                return a === this.arg ? (this.arg = b, a.setRelations(), b.setRelations(this, this.power, null, !0), !0) : a === this.power ? (this.power = b, a.setRelations(), b.setRelations(this, null, this.arg, !0), !0) : !1
            },
            removeChild: function (a) {
                if (a === this.arg) return this.parent.removeChild(this);
                a === this.power && (this.power = void 0, this.arg.setRelations(this), a.setRelations());
                return null
            },
            getTopChild: function () {
                return this.power || this.arg
            },
            getBottomChild: function () {
                return this.arg
            },
            getNextChildUp: function (a) {
                return a === this.arg ? this.power : null
            },
            getNextChildDown: function (a) {
                return a === this.power ? this.arg : null
            }
        };
        ra = c.specialise(ra);
        var sa = {
            __name__: "OrdFunction",
            isOrdFunction: !0,
            __init__: function (a, b, c) {
                this.name = a;
                this.arg = b;
                this.power = c;
                this.arg.setRelations(this);
                c && this.power.setRelations(this, null, b, !0)
            },
            subLayout: function (a, b) {
                var d;
                return b.isProduct && (d = b.operands.some(function (a) {
                    return a.isOrdFunction
                })) ? a.bracket(a.ofExpr(b)) : c.subLayout.call(this, a, b)
            },
            layout: function (a) {
                var b =
                    a.text(this.name),
                    c = a.hspace(3),
                    d = this.subLayout(a, this.arg);
                if (this.power) {
                    var f = a.ofExpr(this.power);
                    b = a.superscript(b, a.scale(f, .8))
                }
                a = a.train([b, c, d]);
                a.bindExpr(this);
                return a
            },
            copy: function () {
                return x.ordFunction(this.name, this.arg.copy(), this.power && this.power.copy())
            },
            replaceChild: function (a, b) {
                return a === this.arg ? (this.arg = b, a.setRelations(), b.setRelations(this, this.power, null, !0), !0) : a === this.power ? (this.power = b, a.setRelations(), b.setRelations(this, null, this.arg, !0), !0) : !1
            },
            removeChild: function (a) {
                if (a ===
                    this.arg) return this.parent.removeChild(this);
                a === this.power && (this.power = void 0, this.arg.setRelations(this), a.setRelations());
                return null
            },
            getTopChild: function () {
                return this.power || this.arg
            },
            getBottomChild: function () {
                return this.arg
            },
            getNextChildUp: function (a) {
                return a === this.arg ? this.power : null
            },
            getNextChildDown: function (a) {
                return a === this.power ? this.arg : null
            }
        };
        sa = c.specialise(sa);
        var ta = {
            __name__: "RandFunction",
            isRandFunction: !0,
            __init__: function (a, b, c) {
                this.name = a;
                this.arg = b;
                this.power = c;
                this.arg.setRelations(this);
                c && this.power.setRelations(this, null, b, !0)
            },
            subLayout: function (a, b) {
                var d;
                return b.isProduct && (d = b.operands.some(function (a) {
                    return a.isRandFunction
                })) ? a.bracket(a.ofExpr(b)) : c.subLayout.call(this, a, b)
            },
            layout: function (a) {
                var b = a.text(this.name),
                    c = a.hspace(3),
                    d = this.subLayout(a, this.arg);
                if (this.power) {
                    var f = a.ofExpr(this.power);
                    b = a.superscript(b, a.scale(f, .8))
                }
                a = a.train([b, c, d]);
                a.bindExpr(this);
                return a
            },
            copy: function () {
                return x.randFunction(this.name, this.arg.copy(), this.power && this.power.copy())
            },
            replaceChild: function (a, b) {
                return a === this.arg ? (this.arg = b, a.setRelations(), b.setRelations(this, this.power, null, !0), !0) : a === this.power ? (this.power = b, a.setRelations(), b.setRelations(this, null, this.arg, !0), !0) : !1
            },
            removeChild: function (a) {
                if (a === this.arg) return this.parent.removeChild(this);
                a === this.power && (this.power = void 0, this.arg.setRelations(this), a.setRelations());
                return null
            },
            getTopChild: function () {
                return this.power || this.arg
            },
            getBottomChild: function () {
                return this.arg
            },
            getNextChildUp: function (a) {
                return a ===
                    this.arg ? this.power : null
            },
            getNextChildDown: function (a) {
                return a === this.power ? this.arg : null
            }
        };
        ta = c.specialise(ta);
        var ua = {
            __name__: "MultiVarFunction",
            isMultiVarFunction: !0,
            __init__: function (a, b, c) {
                this.name = a;
                this.arg = b;
                this.power = c;
                this.arg.setRelations(this);
                c && this.power.setRelations(this, null, b, !0)
            },
            subLayout: function (a, b) {
                var d;
                return b.isProduct && (d = b.operands.some(function (a) {
                    return a.isMultiVarFunction
                })) ? a.bracket(a.ofExpr(b)) : c.subLayout.call(this, a, b)
            },
            layout: function (a) {
                var b = a.text(this.name),
                    c = a.hspace(-2),
                    d = this.subLayout(a, this.arg);
                if (this.power) {
                    var f = a.ofExpr(this.power);
                    b = a.superscript(b, a.scale(f, .8))
                }
                a = a.train([b, c, d]);
                a.bindExpr(this);
                return a
            },
            copy: function () {
                return x.multiVarFunction(this.name, this.arg.copy(), this.power && this.power.copy())
            },
            replaceChild: function (a, b) {
                return a === this.arg ? (this.arg = b, a.setRelations(), b.setRelations(this, this.power, null, !0), !0) : a === this.power ? (this.power = b, a.setRelations(), b.setRelations(this, null, this.arg, !0), !0) : !1
            },
            removeChild: function (a) {
                if (a ===
                    this.arg) return this.parent.removeChild(this);
                a === this.power && (this.power = void 0, this.arg.setRelations(this), a.setRelations());
                return null
            },
            getTopChild: function () {
                return this.power || this.arg
            },
            getBottomChild: function () {
                return this.arg
            },
            getNextChildUp: function (a) {
                return a === this.arg ? this.power : null
            },
            getNextChildDown: function (a) {
                return a === this.power ? this.arg : null
            }
        };
        ua = c.specialise(ua);
        var va = {
            __name__: "Matrix",
            isMatrix: !0,
            isContainer: !0,
            __init__: function (a) {
                var b = this,
                    c = null;
                this.rows = a;
                this.ncols =
                    a.reduce(function (a, b) {
                        return Math.max(a, b.length)
                    }, 0);
                this.nrows = a.length;
                this.rows.forEach(function (a, d) {
                    a.forEach(function (a, f) {
                        f = f + 1 === b.ncols ? b.getItemAt(d + 1, 0) : b.getItemAt(d, f + 1);
                        a.setRelations(b, c, f);
                        c = a
                    })
                })
            },
            getItemAt: function (a, b) {
                return (a = this.rows[a]) && a[b]
            },
            layout: function (a) {
                var b = this.rows.map(function (b) {
                    return b.map(function (b) {
                        return a.ofExpr(b)
                    })
                });
                b = a.table(b, 7, 2);
                var c = a.lrEnclosure(b, "[", "]");
                b.bindExpr(this);
                c.bindExpr(this, "bracket");
                return a.raise(6, c)
            },
            copy: function () {
                return x.matrix(this.rows.map(function (a) {
                    return a.map(function (a) {
                        return a.copy()
                    })
                }))
            },
            findChild: function (a, b) {
                return this.rows.some(function (c, d) {
                    return c.some(function (f, k) {
                        return f === a ? (b(c, d, f, k), !0) : !1
                    })
                })
            },
            replaceChild: function (a, b) {
                var c = this;
                return this.findChild(a, function (d, f, k, e) {
                    b.setRelations(c, k.previousSibling, k.nextSibling, !0);
                    d[e] = b;
                    a.setRelations()
                })
            },
            removeChild: function (a) {
                var b = this;
                return this.findChild(a, function (c, d, f, k) {
                    f = a.previousSibling;
                    var e = a.nextSibling;
                    if (2 === b.rows.reduce(function (a, b) {
                            return a + b.length
                        }, 0)) return b.parent.replaceChild(b, f || e), f || e;
                    1 === c.length ? b.rows.splice(d, 1) : c.splice(k, 1);
                    f ? f.setNextSibling(e, !0) : e.setPreviousSibling(f, !0);
                    a.setRelations();
                    return null
                })
            },
            insertAfterInRow: function (a, b) {
                var c = this;
                return this.findChild(a, function (a, d, f, k) {
                    b.setRelations(c, f, f.nextSibling, !0);
                    a.splice(k + 1, 0, b)
                })
            },
            insertRowAfter: function (a, b) {
                var c = this;
                return this.findChild(a, function (a, d, f, k) {
                    b.forEach(function (f, k) {
                        f.setRelations(c, b[k - 1] || a[a.length - 1], b[k + 1] || c.rows[d + 1] && c.rows[d + 1][0], !0)
                    });
                    c.rows.splice(d + 1, 0, b)
                })
            },
            getNextChildUp: function (a) {
                var b =
                    this,
                    c = null;
                this.findChild(a, function (a, d, f, k) {
                    0 < d && (c = b.rows[d - 1][k])
                });
                return c
            },
            getNextChildDown: function (a) {
                var b = this,
                    c = null;
                this.findChild(a, function (a, d, f, k) {
                    d < b.rows.length && (c = b.rows[d + 1][k])
                });
                return c
            },
            needsFactorSeparator: function () {
                return !0
            }
        };
        va = c.specialise(va);
        var I = {
            __name__: "EditExpr",
            isEditExpr: !0,
            __init__: function (a, b) {
                this.content = a || "";
                this.operand = b;
                this.resetCompletions()
            },
            layout: function (b) {
                var c = b.text(this.content || "??");
                a.complete = !1;
                "??" == c.text && (c.text = "Product" == this.parent.__name__ ?
                    "\u00d7 " + MathMLGlobals.IncompleteSymbol : MathMLGlobals.IncompleteSymbol);
                var d = b.color(DomHelper.getCssVariable("--charterMidBlue"), c);
                c.bindExpr(this); - 1 !== this.completionIndex && (c = this.completions[this.completionIndex], c = b.text(c), c = b.color("gray", c), d = b.train([d, c]), d.bindExpr(this));
                return this.operand ? b.train([b.ofExpr(this.operand), d]) : d
            },
            layout_: function (a) {
                var b = a.text(this.content || "?"),
                    c = a.color("red", b);
                b.bindExpr(this); - 1 !== this.completionIndex && (b = this.completions[this.completionIndex],
                    b = a.text(b), b = a.color("gray", b), c = a.train([c, b]), c.bindExpr(this));
                return this.operand ? a.train([a.ofExpr(this.operand), c]) : c
            },
            copy: function () {
                return x.editExpr(this.content, this.operand)
            },
            isEmpty: function () {
                return !this.content
            },
            isInteger: function () {
                return /^\d+$/.test(this.content)
            },
            isDecimal: function () {
                return /^\d+\.\d*$/.test(this.content)
            },
            resetCompletions: function () {
                this.completions = [];
                this.completionIndex = -1
            },
            setCompletions: function (a) {
                this.completions = a;
                this.completionIndex = 0
            },
            cycleCompletions: function () {
                -1 !==
                    this.completionIndex && (this.completionIndex++, this.completionIndex %= this.completions.length)
            },
            getCurrentCompletion: function () {
                return -1 !== this.completionIndex ? this.completions[this.completionIndex] : ""
            },
            needsFactorSeparator: function () {
                return this.operand ? this.operand.needsFactorSeparator() : /^\d/.test(this.content)
            }
        };
        I = c.specialise(I);
        [
            [aa, 100],
            [ba, 100],
            [I, 100],
            [A, 97],
            [e, 96.5],
            [f, 96.5],
            [E, 96.5],
            [F, 96.5],
            [q, 96.4],
            [z, 96.4],
            [u, 96.4],
            [w, 96.4],
            [M, 96],
            [N, 96],
            [Q, 96],
            [O, 96],
            [P, 96],
            [R, 96],
            [G, 96],
            [S, 96],
            [T, 96],
            [Z, 96],
            [qa, 95],
            [sa, 95],
            [p, 95],
            [J, 95],
            [K, 95],
            [L, 95],
            [k, 90],
            [ha, 85],
            [la, 85],
            [ma, 85],
            [D, 80],
            [v, 45],
            [ua, 42],
            [ta, 42],
            [ra, 40],
            [B, 39],
            [ja, 39],
            [ea, 38],
            [ia, 38],
            [ka, 38],
            [V, 35],
            [U, 35],
            [wa, 35],
            [W, 35],
            [X, 35],
            [Y, 35],
            [h, 20],
            [m, 20],
            [ca, 10],
            [va, 7],
            [C, 5.1],
            [da, 5],
            [g, 4, 7],
            [pa, 4.5],
            [oa, 4.2],
            [fa, 4],
            [na, 3]
        ].forEach(function (a) {
            a[0].priority = a[1]
        });
        var x = a.expr = {
            Number: aa,
            Parameter: ba,
            EditExpr: I,
            Bracket: A,
            Subscript: e,
            FunctionApplication: f,
            Derivative: E,
            DDerivative: F,
            Not_: q,
            Angle: z,
            Seg: u,
            Vector: w,
            Factorial: M,
            Ellipsis: N,
            UnitDeg: O,
            UnitDegre: P,
            UnitRad: R,
            UnitBool: Q,
            UnitLg: G,
            UnitLg2: S,
            UnitLg3: T,
            Differential: Z,
            Sqrt: qa,
            Abs: p,
            Ceiling: J,
            Floor: K,
            Conjugate: L,
            Power: k,
            Fraction: B,
            FractionJML: D,
            Product: ea,
            LimitOf: U,
            SumOf: V,
            IntegralOf: W,
            D_integralOf: X,
            T_integralOf: Y,
            TrigFunction: ra,
            OrdFunction: sa,
            RandFunction: ta,
            MultiVarFunction: ua,
            Negation: h,
            Somme: ca,
            Matrix: va,
            ExprWithRelation: C,
            Modulo: ha,
            Multmult: ia,
            Multpt: ka,
            ElemDivide: ja,
            EuclDiv: la,
            OneLineDiv: ma,
            Equation: da,
            ConditionalExpression: pa,
            Piecewise: oa,
            Conjunction: fa,
            Disjunction: na,
            LabelledExpr: g,
            ExprWithUnits: v,
            number: function (a) {
                return aa.instantiate(a)
            },
            parameter: function (a, b) {
                return ba.instantiate(a, b)
            },
            subscript: function (a, b) {
                return e.instantiate(a, b)
            },
            neg: function (a) {
                return h.instantiate(a)
            },
            add: function (a) {
                return m.instantiate(a)
            },
            plusMinus: function (a) {
                return t.instantiate(a)
            },
            minusPlus: function (a) {
                return y.instantiate(a)
            },
            not_: function (a) {
                return q.instantiate(a)
            },
            angle: function (a) {
                return z.instantiate(a)
            },
            seg: function (a) {
                return u.instantiate(a)
            },
            vector: function (a) {
                return w.instantiate(a)
            },
            brackets: function (a) {
                return A.instantiate(a)
            },
            somme: function (a) {
                return ca.instantiate(a)
            },
            argumentList: function (a) {
                return za.instantiate(a)
            },
            coordsList: function (a) {
                return Aa.instantiate(a)
            },
            text: function (a) {
                return Ba.instantiate(a)
            },
            applyFunction: function (a, b) {
                return f.instantiate(a, b)
            },
            product: function (a) {
                return ea.instantiate(a)
            },
            modulo: function (a) {
                return ha.instantiate(a)
            },
            euclDiv: function (a) {
                return la.instantiate(a)
            },
            oneLineDiv: function (a) {
                return ma.instantiate(a)
            },
            multmult: function (a) {
                return ia.instantiate(a)
            },
            elemDivide: function (a) {
                return ja.instantiate(a)
            },
            multpt: function (a) {
                return ka.instantiate(a)
            },
            conjunction: function (a) {
                return fa.instantiate(a)
            },
            disjunction: function (a) {
                return na.instantiate(a)
            },
            conditionalExpression: function (a, b) {
                return pa.instantiate(a, b)
            },
            piecewise: function (a) {
                return oa.instantiate(a)
            },
            power: function (a, b) {
                return k.instantiate(a, b)
            },
            fraction: function (a, b) {
                return B.instantiate(a, b)
            },
            fractionJML: function (a, b) {
                return D.instantiate(a, b)
            },
            editExpr: function (a, b) {
                return I.instantiate(a,
                    b)
            },
            root: function (a) {
                return ya.instantiate(a)
            },
            sqrt: function (a, b) {
                return qa.instantiate(a, b)
            },
            abs: function (a) {
                return p.instantiate(a)
            },
            ceiling: function (a) {
                return J.instantiate(a)
            },
            conjugate: function (a) {
                return L.instantiate(a)
            },
            factorial: function (a) {
                return M.instantiate(a)
            },
            ellipsis: function (a) {
                return N.instantiate(a)
            },
            unitDeg: function (a) {
                return O.instantiate(a)
            },
            unitDegre: function (a) {
                return P.instantiate(a)
            },
            unitBool: function (a) {
                return Q.instantiate(a)
            },
            unitRad: function (a) {
                return R.instantiate(a)
            },
            unitInch: function (a) {
                return Da.instantiate(a)
            },
            unitLg: function (a) {
                return G.instantiate(a)
            },
            unitLg2: function (a) {
                return S.instantiate(a)
            },
            unitLg3: function (a) {
                return T.instantiate(a)
            },
            floor: function (a) {
                return K.instantiate(a)
            },
            trigFunction: function (a, b, c) {
                return ra.instantiate(a, b, c)
            },
            ordFunction: function (a, b, c) {
                return sa.instantiate(a, b, c)
            },
            randFunction: function (a, b, c) {
                return ta.instantiate(a, b, c)
            },
            multiVarFunction: function (a, b, c) {
                return ua.instantiate(a, b, c)
            },
            matrix: function (a) {
                return va.instantiate(a)
            },
            limitOf: function (a, b, c) {
                return U.instantiate(a, b, c)
            },
            sumOf: function (a, b, c) {
                return V.instantiate(a, b, c)
            },
            productOf: function (a, b, c) {
                return wa.instantiate(a, b, c)
            },
            integralOf: function (a, b, c) {
                return W.instantiate(a, b, c)
            },
            d_integralOf: function (a, b, c) {
                return X.instantiate(a, b, c)
            },
            t_integralOf: function (a, b, c) {
                return Y.instantiate(a, b, c)
            },
            differential: function (a) {
                return Z.instantiate(a)
            },
            derivative: function (a, b) {
                return E.instantiate(a, b)
            },
            dderivative: function (a, b) {
                return F.instantiate(a, b)
            },
            exprWithRelation: function (a,
                b) {
                return C.instantiate(a, b)
            },
            equation: function (a) {
                return da.instantiate(a)
            },
            exprWithUnits: function (a, b) {
                return v.instantiate(a, b)
            },
            drawOnNewCanvas: function (a) {
                var b = new XmlElement("canvas");
                a = this.drawOnCanvas(a, b);
                return [b, a]
            },
            drawOnCanvas: function (b, c) {
                var d = a.layout.ofExpr(b).box();
                b.box = d;
                c.style = {};
                c.style.verticalAlign = d.descent + "px";
                c.width = d.width + 1;
                c.height = d.height + 1;
                c.baseline = -d.descent;
                MathMLGlobals.DebugOn_6 && SVGline(0, d.height + d.descent, d.width, d.height + d.descent, "silver", 1);
                MathMLGlobals.DebugOn_3 &&
                    SVGrect(0, 0, c.width - 1, c.height, "none", "red", .1);
                d.drawOnCanvas(0, d.ascent);
                return d
            },
            color: function (a, b) {
                return xa.instantiate(a, b)
            }
        }
    }
})(cvm);
if ("undefined" !== typeof module) {
    var $jscomp$destructuring$var18 = require("./cvm.js");
    cvm = $jscomp$destructuring$var18.cvm;
    var $jscomp$destructuring$var19 = require("./prototype.js");
    Prototype = $jscomp$destructuring$var19.Prototype;
    var $jscomp$destructuring$var20 = require("./mathmlglobals.js");
    MathMLGlobals = $jscomp$destructuring$var20.MathMLGlobals
}
(function (a) {
    var b = a.box,
        c = {
            bindExpr: function (a, b) {
                this.boundExprs || (this.boundExprs = []);
                this.boundExprs.push({
                    expr: a,
                    key: b
                })
            }
        };
    c = Prototype.specialise(c);
    var d = {
        __name__: "LTrain",
        __init__: function (a) {
            this.elems = a
        },
        box: function () {
            var a = this.elems.map(function (a) {
                return a.box()
            });
            a = b.Train.instantiate(a);
            a.bindLayout(this);
            return a
        }
    };
    d = c.specialise(d);
    var e = {
        __name__: "LText",
        __init__: function (a, b) {
            this.text = a;
            this.style = b || {}
        },
        box: function () {
            var a = [],
                c = this.style;
            c.style && a.push(c.style);
            c.variant &&
                a.push(c.variant);
            c.weight && a.push(c.weight);
            a.push(c.size || "18px");
            a.push(c.family || "serif");
            this.font = a.join(" ");
            a = b.TextBox.instantiate(this.text, this.font);
            a.bindLayout(this);
            return a
        }
    };
    e = c.specialise(e);
    var g = {
        __name__: "LScale",
        __init__: function (a, b) {
            this.elem = a;
            this.scale = b
        },
        box: function () {
            var a = b.Scale.instantiate(this.elem.box(), this.scale);
            a.bindLayout(this);
            return a
        }
    };
    g = c.specialise(g);
    var h = {
        __name__: "LBracket",
        __init__: function (a, b) {
            this.elem = a;
            this.color = b
        },
        box: function () {
            var a = this.elem.box(),
                c = b.Paren.instantiate(a),
                d = b.Paren.instantiate(a, !0);
            this.color && (c = b.ColorBox.instantiate(this.color, c), d = b.ColorBox.instantiate(this.color, d));
            a = b.Train.instantiate(c, a, d);
            c.bindLayout(this, "left");
            d.bindLayout(this, "right");
            a.bindLayout(this);
            return a
        }
    };
    h = c.specialise(h);
    var m = {
        __name__: "LLREnclosure",
        __init__: function (a, b, c, d) {
            this.elem = a;
            this.left = b;
            this.right = c;
            this.color = d
        },
        box: function () {
            var a = b.Stack.instantiate([b.VSpace.instantiate(2), this.elem.box(), b.VSpace.instantiate(2)], 1),
                c = this.left &&
                b.getElasticBox(this.left, a),
                d = this.right && b.getElasticBox(this.right, a);
            this.color && (c = c && b.ColorBox.instantiate(this.color, c), d = d && b.ColorBox.instantiate(this.color, d));
            var f = c ? [b.HSpace.instantiate(2), c, b.HSpace.instantiate(2)] : [];
            f.push(a);
            d && (f.push(b.HSpace.instantiate(2)), f.push(d), f.push(b.HSpace.instantiate(2)));
            a = b.Train.instantiate(f);
            c && c.bindLayout(this, "left");
            d && d.bindLayout(this, "right");
            a.bindLayout(this);
            return a
        }
    };
    m = c.specialise(m);
    var t = {
        __name__: "LSuperscript",
        __init__: function (a,
            b) {
            this.elem = a;
            this.superscript = b
        },
        box: function () {
            var a = this.elem.box(),
                c = this.superscript.box();
            c = b.Decoration.instantiate(c, a.width, a.ascent - 10 - c.descent);
            a = b.DecoratedBox.instantiate(a, [c]);
            a.bindLayout(this);
            return a
        }
    };
    t = c.specialise(t);
    var y = {
        __name__: "LSubscript",
        __init__: function (a, b) {
            this.elem = a;
            this.subscript = b
        },
        box: function () {
            var a = this.elem.box(),
                c = this.subscript.box();
            c = b.Decoration.instantiate(c, a.width, a.descent + 10 - c.ascent);
            a = b.DecoratedBox.instantiate(a, [c]);
            a.bindLayout(this);
            return a
        }
    };
    y = c.specialise(y);
    var q = {
        __name__: "LTopAlign",
        __init__: function (a, b) {
            this.elem = a;
            this.superscript = b
        },
        box: function () {
            var a = this.elem.box(),
                c = this.superscript.box();
            c = b.Decoration.instantiate(c, a.width, a.ascent - c.ascent);
            a = b.DecoratedBox.instantiate(a, [c]);
            a.bindLayout(this);
            return a
        }
    };
    q = c.specialise(q);
    var z = {
        __name__: "LHSpace",
        __init__: function (a) {
            this.width = a
        },
        box: function () {
            return b.HSpace.instantiate(this.width)
        }
    };
    z = c.specialise(z);
    var u = {
        __name__: "LVSpace",
        __init__: function (a) {
            this.height = a
        },
        box: function () {
            return b.VSpace.instantiate(this.height)
        }
    };
    u = c.specialise(u);
    var w = {
        __name__: "LStack",
        __init__: function (a, b) {
            this.elems = a;
            this.baseline = b
        },
        box: function () {
            var a = this.elems.map(function (a) {
                return a.box()
            });
            a = b.Stack.instantiate(a, this.baseline);
            a.bindLayout(this);
            return a
        }
    };
    w = c.specialise(w);
    var A = {
        __name__: "LHLine",
        __init__: function (a, b) {
            this.width = a;
            this.height = b
        },
        box: function () {
            var a = b.HLine.instantiate(this.width, this.height);
            a.bindLayout(this);
            return a
        }
    };
    A = c.specialise(A);
    var v = {
        __name__: "LChapeau",
        __init__: function (a, b) {
            this.width = a;
            this.height = b
        },
        box: function () {
            var a = b.Chapeau.instantiate(this.width, this.height);
            a.bindLayout(this);
            return a
        }
    };
    v = c.specialise(v);
    var f = {
        __name__: "LOverBar",
        __init__: function (a, b) {
            this.width = a;
            this.height = b
        },
        box: function () {
            var a = b.OverBar.instantiate(this.width, this.height);
            a.bindLayout(this);
            return a
        }
    };
    f = c.specialise(f);
    var k = {
        __name__: "LArrow",
        __init__: function (a, b) {
            this.width = a;
            this.height = b
        },
        box: function () {
            var a = b.Arrow.instantiate(this.width,
                this.height);
            a.bindLayout(this);
            return a
        }
    };
    k = c.specialise(k);
    var B = {
        __name__: "LColor",
        __init__: function (a, b) {
            this.color = a;
            this.elem = b
        },
        box: function () {
            var a = this.elem.box();
            a = b.ColorBox.instantiate(this.color, a);
            a.bindLayout(this);
            return a
        }
    };
    B = c.specialise(B);
    var D = {
        __name__: "LCursor",
        __init__: function (a) {
            this.elem = a
        },
        box: function () {
            var a = this.elem.box();
            a = b.CursorCaret.instantiate(a);
            a.bindLayout(this);
            return a
        }
    };
    D = c.specialise(D);
    var E = {
        __name__: "LFrame",
        __init__: function (a, b) {
            this.style = a;
            this.elem =
                b
        },
        box: function () {
            var a = this.elem.box();
            a = b.Frame.instantiate(this.style, a);
            a.bindLayout(this);
            return a
        }
    };
    E = c.specialise(E);
    var F = {
        __name__: "LSqrt",
        __init__: function (a, b) {
            this.elem = a;
            this.nth = b
        },
        box: function () {
            var a = this.elem.box(),
                c = this.nth && this.nth.box();
            a = b.RootSign.instantiate(a, c);
            a.bindLayout(this);
            return a
        }
    };
    F = c.specialise(F);
    var r = {
        __name__: "LRaise",
        __init__: function (a, b) {
            this.height = a;
            this.elem = b
        },
        box: function () {
            var a = this.elem.box();
            a = b.RaiseBox.instantiate(this.height, a);
            a.bindLayout(this);
            return a
        }
    };
    r = c.specialise(r);
    var C = {
        __name__: "LTable",
        __init__: function (a, b, c, d) {
            this.rows = a;
            this.hspace = b;
            this.vspace = c;
            this.align = d
        },
        box: function () {
            var a = this.rows.map(function (a) {
                return a.map(function (a) {
                    return a.box()
                })
            });
            return b.Table.instantiate(a, this.hspace, this.vspace, this.align)
        }
    };
    C = c.specialise(C);
    a.layout = {
        ofExpr: function (a) {
            a.selected && (a = a.selected);
            return a.layout(this)
        },
        select: function (a, b) {
            return b ? this.cursor(a) : this.frame({
                background: "#AAFFAA"
            }, a)
        },
        train: function () {
            MathMLGlobals.DebugOn &&
                console.log("train");
            var a = arguments;
            a = 1 === a.length ? a[0] : Array.prototype.filter.call(a, function () {
                return !0
            });
            return d.instantiate(a)
        },
        text: function (a, b) {
            MathMLGlobals.DebugOn && console.log("text");
            return e.instantiate(a, b)
        },
        scale: function (a, b) {
            MathMLGlobals.DebugOn && console.log("scale");
            return g.instantiate(a, b)
        },
        bracket: function (a, b) {
            MathMLGlobals.DebugOn && console.log("bracket");
            return m.instantiate(a, "(", ")", b)
        },
        lrEnclosure: function (a, b, c, d) {
            MathMLGlobals.DebugOn && console.log("lrEnclosure");
            return m.instantiate(a,
                b, c, d)
        },
        superscript: function (a, b) {
            MathMLGlobals.DebugOn && console.log("superscript");
            return t.instantiate(a, b)
        },
        subscript: function (a, b) {
            MathMLGlobals.DebugOn && console.log("subscript");
            return y.instantiate(a, b)
        },
        topAlign: function (a, b) {
            MathMLGlobals.DebugOn && console.log("topAlign");
            return q.instantiate(a, b)
        },
        hspace: function (a) {
            MathMLGlobals.DebugOn && console.log("hspace");
            return z.instantiate(a)
        },
        vspace: function (a) {
            MathMLGlobals.DebugOn && console.log("vspace");
            return u.instantiate(a)
        },
        stack: function (a,
            b) {
            MathMLGlobals.DebugOn && console.log("stack");
            return w.instantiate(a, b)
        },
        hline: function (a, b) {
            MathMLGlobals.DebugOn && console.log("hline");
            return A.instantiate(a, b)
        },
        chapeau: function (a, b) {
            MathMLGlobals.DebugOn && console.log("chapeau");
            return v.instantiate(a, b)
        },
        overbar: function (a, b) {
            return f.instantiate(a, b)
        },
        arrow: function (a, b) {
            MathMLGlobals.DebugOn && console.log("arrow");
            return k.instantiate(a, b)
        },
        color: function (a, b) {
            MathMLGlobals.DebugOn && console.log("color");
            return B.instantiate(a, b)
        },
        cursor: function (a) {
            MathMLGlobals.DebugOn &&
                console.log("cursor");
            return D.instantiate(a)
        },
        frame: function (a, b) {
            MathMLGlobals.DebugOn && console.log("frame");
            return E.instantiate(a, b)
        },
        raise: function (a, b) {
            MathMLGlobals.DebugOn && console.log("raise");
            return r.instantiate(a, b)
        },
        sqrt: function (a, b) {
            MathMLGlobals.DebugOn && console.log("sqrt");
            return F.instantiate(a, b)
        },
        table: function (a, b, c, d) {
            MathMLGlobals.DebugOn && console.log("table");
            return C.instantiate(a, b, c, d)
        }
    }
})(cvm);
if ("undefined" !== typeof module) {
    var $jscomp$destructuring$var21 = require("./cvm.js");
    cvm = $jscomp$destructuring$var21.cvm;
    var $jscomp$destructuring$var22 = require("./prototype.js");
    Prototype = $jscomp$destructuring$var22.Prototype;
    var $jscomp$destructuring$var23 = require("./utils.js");
    setCharAt = $jscomp$destructuring$var23.setCharAt;
    parenthesisToCurly = $jscomp$destructuring$var23.parenthesisToCurly;
    var $jscomp$destructuring$var24 = require("./mathmlglobals.js");
    MathMLGlobals = $jscomp$destructuring$var24.MathMLGlobals
}
(function (a) {
    var b = a.expr,
        c;
    if (!a.expr) throw "expr module must be loaded";
    var d = {
            priorityMode: !0,
            binop: function (a, c, d) {
                d || (d = b.editExpr());
                if (this.priorityMode || a.isProposition)
                    for (; !c.parent.isRoot && !c.parent.isBracket && c.parent.priority > a.priority;) c = c.parent;
                else a == b.Somme && c.parent.isProduct && (c = c.parent), a == b.Somme && c.parent.isPrefixOperation && (c = c.parent);
                if (this.priorityMode && a === b.Product && c.parent.isTrigFunction && c === c.parent.power) c.parent.replaceChild(c.parent.arg, d);
                else {
                    var f = a === b.Product,
                        k = c.parent.isOpOf;
                    if (f = this.priorityMode && f && k) f = c.parent.from, f = c.parent.to || f;
                    f ? (c.parent.replaceChild(c.parent.arg, d), a = c.parent.parent, a.lastChild.from && a.lastChild.to ? (a.lastChild.from = a.lastChild.firstChild.nextSibling, a.lastChild.to = a.lastChild.lastChild) : a.lastChild.to ? a.lastChild.to = c : a.lastChild.from = a.lastChild.firstChild.nextSibling) : c.__proto__ !== a || c.isGroup ? (a = a.instantiate(c.copy(), d), c.parent.replaceChild(c, a)) : c.insertAfter(c.lastChild, d)
                }
                return d
            },
            add: function (a, c) {
                return d.binop(b.Somme,
                    a, c)
            },
            mult: function (a, c) {
                return d.binop(b.Product, a, c)
            },
            addRelation: function (a) {
                return function (c, f) {
                    f || (f = b.editExpr());
                    var k = b.ExprWithRelation.instantiate(f, a);
                    d.binop(b.Equation, c, k);
                    return f
                }
            },
            log_and: function (a, c) {
                return d.binop(b.Conjunction, a, c)
            },
            modulo: function (a, c) {
                return d.binop(b.Modulo, a, c)
            },
            multmult: function (a, c) {
                return d.binop(b.Multmult, a, c)
            },
            elemDivide: function (a, c) {
                return d.binop(b.ElemDivide, a, c)
            },
            multpt: function (a, c) {
                return d.binop(b.Multpt, a, c)
            },
            euclDiv: function (a, c) {
                return d.binop(b.EuclDiv,
                    a, c)
            },
            onelineDiv: function (a, c) {
                return d.binop(b.OneLineDiv, a, c)
            },
            or: function (a, c) {
                return d.binop(b.Disjunction, a, c)
            },
            conditional: function (a, c) {
                return d.binop(b.ConditionalExpression, a, c)
            },
            piecewise: function (a, c) {
                return d.binop(b.Piecewise, a, c)
            },
            label: function (a, c) {
                return d.binop(b.LabelledExpr, a, c)
            },
            units: function (a, c) {
                return d.binop(b.ExprWithUnits, a, c)
            },
            multByBracket: function (a) {
                var c = b.editExpr();
                d.mult(a, b.brackets(c));
                return c
            },
            openArgList: function (a) {
                var c = b.editExpr(),
                    d = b.applyFunction(a.copy(),
                        b.argumentList([c]));
                a.parent.replaceChild(a, d);
                return c
            },
            openCoordsList: function (a) {
                var c = b.editExpr(),
                    d = b.coordsList([c]);
                a.parent.replaceChild(a, d);
                return c
            },
            addprefixop: function (a) {
                return function (c) {
                    var f = b.editExpr();
                    d.add(c, a(f));
                    return f
                }
            },
            pow: function (a) {
                var c = a.parent,
                    d = b.editExpr();
                c.replaceChild(a, b.power(a.copy(), d));
                return d
            },
            frac: function (a) {
                var c = b.editExpr();
                if (d.priorityMode)
                    for (; !a.parent.isRoot && !a.parent.isBracket && a.parent.priority > b.Fraction.priority;) a = a.parent;
                a.parent.replaceChild(a,
                    b.fraction(a.copy(), c));
                return c
            },
            fracJML: function (a) {
                var c = b.editExpr();
                if (d.priorityMode)
                    for (; !a.parent.isRoot && !a.parent.isBracket && a.parent.priority > b.FractionJML.priority;) a = a.parent;
                a.parent.replaceChild(a, b.fractionJML(a.copy(), c));
                return c
            },
            prefixop: function (a) {
                return function (b) {
                    var c = b.parent,
                        d = b.copy();
                    a(d);
                    c.replaceChild(b, a(d));
                    return d
                }
            },
            closeBracket: function (a) {
                var b;
                for (b = a.parent; !b.isRoot; b = b.parent)
                    if (b.isBracket) {
                        a = b.expr;
                        a.isGroup = !0;
                        b.parent.replaceChild(b, a);
                        break
                    } return a
            },
            closeArgList: function (a) {
                var b;
                for (b = a.parent; !b.isRoot; b = b.parent)
                    if (b.insertAfterInRow || b.insertRowAfter) return b.parent;
                return a
            },
            closeCoordsList: function (a) {
                var b;
                for (b = a.parent; !b.isRoot; b = b.parent)
                    if (b.insertAfterInRow || b.insertRowAfter) return b.parent;
                return a
            },
            factorial: function (a) {
                var c = a.parent,
                    d = b.factorial(a.copy());
                c.replaceChild(a, d);
                return d
            },
            ellipsis: function (a) {
                var c = a.parent,
                    d = b.ellipsis(a.copy());
                c.replaceChild(a, d);
                return d
            },
            unitDeg: function (a) {
                var c = a.parent,
                    d = b.unitDeg(a.copy());
                c.replaceChild(a, d);
                return d
            },
            unitDegre: function (a) {
                var c = a.parent,
                    d = b.unitDegre(a.copy());
                c.replaceChild(a, d);
                return d
            },
            unitRad: function (a) {
                var c = a.parent,
                    d = b.unitRad(a.copy());
                c.replaceChild(a, d);
                return d
            },
            unitBool: function (a) {
                var c = a.parent,
                    d = b.unitBool(a.copy());
                c.replaceChild(a, d);
                return d
            },
            unitInch: function (a) {
                var c = a.parent,
                    d = b.unitInch(a.copy());
                c.replaceChild(a, d);
                return d
            },
            unitLg: function (a) {
                var c = a.parent,
                    d = b.unitLg(a.copy());
                c.replaceChild(a, d);
                return d
            },
            differentiate: function (a) {
                var c =
                    a.parent,
                    d = b.derivative(a.copy());
                c.replaceChild(a, d);
                return d
            },
            ddifferentiate: function (a) {
                var c = a.parent,
                    d = b.dderivative(a.copy());
                c.replaceChild(a, d);
                return d
            },
            nthRoot: function (a, c) {
                var d = a.parent;
                c || (c = b.editExpr());
                d.replaceChild(a, b.sqrt(c, a.copy()));
                return c
            },
            subscript: function (a, c) {
                var d = a.parent;
                c || (c = b.editExpr());
                d.replaceChild(a, b.subscript(a.copy(), c));
                return c
            },
            subscriptList: function (a) {
                var c = b.editExpr();
                d.subscript(a, b.argumentList([c]));
                return c
            },
            addColumn: function (a, c) {
                c = b.editExpr();
                if (d.priorityMode)
                    for (; !a.parent.isRoot && !a.parent.insertAfterInRow && !a.parent.isBracket;) a = a.parent;
                a.parent.insertAfterInRow ? a.parent.insertAfterInRow(a, c) : a.parent.replaceChild(a, b.matrix([
                    [a.copy(), c]
                ]));
                return c
            },
            addRow: function (a, c) {
                c = b.editExpr();
                if (d.priorityMode)
                    for (; !a.parent.isRoot && !a.parent.insertRowAfter && !a.parent.isBracket;) a = a.parent;
                a.parent.insertRowAfter ? a.parent.insertRowAfter(a, [c]) : a.parent.replaceChild(a, b.matrix([
                    [a.copy()],
                    [c]
                ]));
                return c
            },
            fromOp: function (a, c) {
                var d = a;
                for (c =
                    b.editExpr(); !d.isRoot && !d.setFrom && !d.isBracket;) d = d.parent;
                return d.setFrom ? (d.setFrom(c), c) : a
            },
            toOp: function (a, c) {
                var d = a;
                for (c = b.editExpr(); !d.isRoot && !d.setTo && !d.isBracket;) d = d.parent;
                d !== a && a.isEditExpr && a.operand && a.parent.replaceChild(a, a.operand);
                return d.setTo ? (d.setTo(c), c) : a
            }
        },
        e = {
            "+": d.add,
            "*": d.mult,
            "**": d.multmult,
            "*.": d.multpt,
            "-": d.addprefixop(b.neg),
            "+-": d.addprefixop(b.plusMinus),
            "-+": d.addprefixop(b.minusPlus),
            "/": d.frac,
            ":": d.euclDiv,
            ":-": d.elemDivide,
            "//": d.onelineDiv,
            "|": d.fracJML,
            mod: d.modulo,
            "#": d.euclDiv,
            "^": d.pow,
            "(": d.multByBracket,
            "[": d.openArgList,
            "=": d.addRelation("eq"),
            "=?": d.addRelation("is"),
            "!=": d.addRelation("neq"),
            "\u2248": d.addRelation("almeq"),
            ">=<": d.addRelation("almeq"),
            "<": d.addRelation("lt"),
            ">": d.addRelation("gt"),
            "<=": d.addRelation("leq"),
            ">=": d.addRelation("geq"),
            ",": d.addColumn,
            ";": d.addRow,
            root: d.nthRoot,
            _: d.subscript,
            "_[": d.subscriptList,
            and: d.log_and,
            or: d.or,
            "if": d.conditional,
            "else": d.piecewise,
            "@": d.units
        },
        g = {
            "-": d.prefixop(b.neg),
            "+": d.prefixop(b.add),
            "+-": d.prefixop(b.plusMinus),
            "-+": d.prefixop(b.minusPlus),
            not: d.prefixop(b.not_),
            angle: d.prefixop(b.angle),
            seg: d.prefixop(b.seg),
            vect: d.prefixop(b.vector),
            "(": d.prefixop(b.brackets),
            "{": d.openCoordsList,
            "d.": d.prefixop(b.differential),
            from: d.fromOp,
            to: d.toOp
        },
        h = {
            ")": d.closeBracket,
            "]": d.closeArgList,
            "}": d.closeCoordsList,
            "!": d.factorial,
            "\u2026": d.ellipsis,
            "%": d.percent,
            "'": d.differentiate,
            "''": d.ddifferentiate,
            "\u00b0": d.unitDegre,
            deg: d.unitDeg,
            rad: d.unitRad,
            "_\u03b2_^1": d.unitBool,
            "in": d.unitInch,
            cm: d.unitLg
        },
        m = [{
            name: "alpha",
            code: "\u03b1"
        }, {
            name: "beta",
            code: "\u03b2"
        }, {
            name: "gamma",
            code: "\u03b3"
        }, {
            name: "delta",
            code: "\u03b4"
        }, {
            name: "epsilon",
            code: "\u03b5"
        }, {
            name: "zeta",
            code: "\u03b6"
        }, {
            name: "eta",
            code: "\u03b7"
        }, {
            name: "theta",
            code: "\u03b8"
        }, {
            name: "iota",
            code: "\u03b9"
        }, {
            name: "kappa",
            code: "\u03ba"
        }, {
            name: "lambda",
            code: "\u03bb"
        }, {
            name: "mu",
            code: "\u03bc"
        }, {
            name: "nu",
            code: "\u03bd"
        }, {
            name: "xi",
            code: "\u03be"
        }, {
            name: "omicron",
            code: "\u03bf"
        }, {
            name: "pi",
            code: "\u03c0"
        }, {
            name: "rho",
            code: "\u03c1"
        }, {
            name: "sigma",
            code: "\u03c3"
        }, {
            name: "tau",
            code: "\u03c4"
        }, {
            name: "upsilon",
            code: "\u03c5"
        }, {
            name: "phi",
            code: "\u03c6"
        }, {
            name: "chi",
            code: "\u03c7"
        }, {
            name: "psi",
            code: "\u03c8"
        }, {
            name: "omega",
            code: "\u03c9"
        }],
        t = [{
                name: "Alpha",
                code: "\u0391"
            }, {
                name: "Beta",
                code: "\u0392"
            }, {
                name: "Gamma",
                code: "\u0393"
            }, {
                name: "Delta",
                code: "\u0394"
            }, {
                name: "Epsilon",
                code: "\u0395"
            }, {
                name: "Zeta",
                code: "\u0396"
            }, {
                name: "Eta",
                code: "\u0397"
            }, {
                name: "Theta",
                code: "\u0398"
            }, {
                name: "Iota",
                code: "\u0399"
            }, {
                name: "Kappa",
                code: "\u039a"
            }, {
                name: "Lambda",
                code: "\u039b"
            },
            {
                name: "Mu",
                code: "\u039c"
            }, {
                name: "Nu",
                code: "\u039d"
            }, {
                name: "Xi",
                code: "\u039e"
            }, {
                name: "Omicron",
                code: "\u039f"
            }, {
                name: "Pi",
                code: "\u03a0"
            }, {
                name: "Rho",
                code: "\u03a1"
            }, {
                name: "Sigma",
                code: "\u03a3"
            }, {
                name: "Tau",
                code: "\u03a4"
            }, {
                name: "Upsilon",
                code: "\u03a5"
            }, {
                name: "Phi",
                code: "\u03a6"
            }, {
                name: "Chi",
                code: "\u03a7"
            }, {
                name: "Psi",
                code: "\u03a8"
            }, {
                name: "Omega",
                code: "\u03a9"
            }, {
                name: "Euler",
                code: "\u03b3"
            }, {
                name: "inf",
                code: "\u221e"
            }, {
                name: "exp1",
                code: "\u212f"
            }
        ],
        y = {
            oo: "\u221e",
            _i_: "\u2148",
            Infinity: "\u221e"
        };
    [m, t].forEach(function (a) {
        a.forEach(function (a) {
            y[a.name] =
                a.code
        })
    });
    var q = {};
    [{
        name: "sqrt",
        expr: b.sqrt
    }, {
        name: "abs",
        expr: b.abs
    }, {
        name: "ceil",
        expr: b.ceiling
    }, {
        name: "floor",
        expr: b.floor
    }, {
        name: "conj",
        expr: b.conjugate
    }, {
        name: "lim",
        expr: b.limitOf
    }, {
        name: "sum",
        expr: b.sumOf
    }, {
        name: "prod",
        expr: b.productOf
    }, {
        name: "integral",
        expr: b.integralOf
    }, {
        name: "d_integral",
        expr: b.d_integralOf
    }, {
        name: "t_integral",
        expr: b.t_integralOf
    }].forEach(function (a) {
        q[a.name] = a.expr
    });
    "sin cos tan cot sinh cosh tanh coth".split(" ").forEach(function (a) {
        q[a] = function (c) {
            return b.trigFunction(a,
                c)
        };
        q[a + "^"] = function (c) {
            return b.trigFunction(a, b.editExpr(), c)
        }
    });
    "ln lg lb exp num den arcsin arccos arctan arccot arsinh arcosh artanh arcoth sgn".split(" ").forEach(function (a) {
        q[a] = function (c) {
            return b.trigFunction(a, c)
        }
    });
    ["trunc", "round"].forEach(function (a) {
        q[a] = function (c) {
            return b.ordFunction(a, c)
        }
    });
    ["rand"].forEach(function (a) {
        q[a] = function (c) {
            return b.randFunction(a, c)
        }
    });
    ["min", "max", "gcd", "lcm", "choose"].forEach(function (a) {
        q[a] = function (c) {
            return b.multiVarFunction(a, c)
        }
    });
    var z =
        Prototype.specialise({
            __init__: function () {
                this.list = [];
                this.map = {}
            },
            updateWithObject: function (a, b) {
                var c;
                for (c in a)
                    if (a.hasOwnProperty(c)) {
                        var d = {
                            kw: c,
                            type: b,
                            value: a[c]
                        };
                        this.list.push(d);
                        this.map[c] = d
                    } this.list.sort(function (a, b) {
                    return a.kw.localeCompare(b.kw)
                })
            },
            getCompletions: function (a) {
                if ("co" == a) return {
                    completions: this.coCompletion,
                    longestPrefix: null
                };
                if ("si" == a) return {
                    completions: this.siCompletion,
                    longestPrefix: null
                };
                var b = [],
                    c = 0,
                    d = a.length,
                    f = null;
                this.list.forEach(function (e) {
                    a.length <=
                        e.kw.length && !e.kw.lastIndexOf(a, 0) && b.push(e.kw.substr(d));
                    !a.lastIndexOf(e.kw, 0) && e.kw.length > c && (c = e.kw.length, f = e)
                });
                return {
                    completions: b,
                    longestPrefix: f
                }
            },
            contains: function (a) {
                return this.map.hasOwnProperty(a)
            }
        }),
        u = z.instantiate(),
        w = z.instantiate();
    u.updateWithObject(y, "Constant");
    u.updateWithObject(q, "Function");
    u.updateWithObject(g, "PrefixOp");
    u.coCompletion = "s sh s^ sh^ t th t^ th^ nj".split(" ");
    u.coCompletion = ["n", "nh", "n^", "nh^", "gma"];
    w.updateWithObject(e, "InfixOp");
    w.updateWithObject(h,
        "PostfixOp");
    var A = {
            color: function (a, c) {
                if (c.operand) return a = b.color(c.operand, a), c.parent.replaceChild(c, a), a;
                var d = b.editExpr();
                a = b.color(d, a);
                c.parent.replaceChild(c, a);
                return d
            }
        },
        v = {
            locValRefs: {},
            numero: 0,
            trigPower: null,
            interpretNumber: function (a, c, e) {
                a = /(\d+.)?\d+/.exec(a);
                for (a = a[0];
                    "0" === a.charAt(0);) a = a.substring(1);
                "" == a ? a = "0" : "." === a.charAt(0) && (a = "0" + a);
                a = b.number(a);
                c.operand ? (c.parent.replaceChild(c, c.operand), d.mult(c.operand, a)) : c.parent.replaceChild(c, a);
                e && (a.endingWithPoint = 1);
                return a
            },
            interpretDirective: function (a, b) {
                a = a.substring(1, a.length - 1);
                var c = a.split(":", 2);
                1 === c.length ? c = "" : (a = c[0], c = c[1]);
                if (A[a]) return A[a](c, b);
                console && console.log("Unknown directive: " + a);
                return b
            },
            interpretText: function (a, c) {
                a = b.text(a);
                c.operand && c.parent ? (c.parent.replaceChild(c, c.operand), d.mult(c.operand, a)) : c.parent.replaceChild(c, a);
                return a
            },
            interpretParameter: function (a, c) {
                a = b.parameter(a);
                "Parameter" === a.__name__ && (this.newVariable = a.name);
                c.operand ? (c.parent.replaceChild(c, c.operand),
                    d.mult(c.operand, a)) : c.parent.replaceChild(c, a);
                return a
            },
            interpretFunction: function (a, c) {
                var f = b.editExpr(),
                    e = c.parent;
                a = a(f);
                if (d.priorityMode && e.isProduct && e.parent.isTrigFunction) return e = e.removeChild(c) || e, d.mult(e.parent, a), f;
                c.parent.replaceChild(c, a);
                return f
            },
            interpretConstant: function (a, c, d) {
                a = b.parameter(d, a);
                c.parent.replaceChild(c, a);
                return a
            },
            interpretPrefixOp: function (a, b) {
                return a(b)
            },
            interpretInfixOp: function (a, b) {
                b.parent.replaceChild(b, b.operand);
                return a(b.operand)
            },
            interpretPostfixOp: function (a,
                c, d) {
                if (-1 != a.name.indexOf("unit")) {
                    var f = a.name.replace("unit", "");
                    f = {
                        Inch: " in^1",
                        Lg: " cm^1",
                        Lg2: " cm^2",
                        Lg3: " cm^3",
                        Deg: " \u00b0^1",
                        Degre: " \u00b0^1",
                        Rad: " rad^1",
                        Bool: " _\u03b2_^1"
                    } [f]; - 1 != d.indexOf("^") && "_" != d.charAt(0) && (a = d.charAt(3), f = f.substring(0, 4) + a);
                    a = "__$" + v.numero++;
                    d = b.parameter(a);
                    "Parameter" == d.__name__ && (a = c.operand, this.locValRefs[d.name] = ("Ellipsis" === a.__name__ ? c.operand.child.value : c.operand.value) + f);
                    c.parent.replaceChild(c, d);
                    return d
                }
                c.parent.replaceChild(c, c.operand);
                return a(c.operand)
            },
            interpretKeyword: function (a, b) {
                return this["interpret" + a.type](a.value, b, a.kw)
            },
            interpret: function (a, e, g) {
                if (!e) return a.isEditExpr && (a.operand ? (a.parent && a.parent.replaceChild(a, a.operand), a = a.operand) : (a.content = "", a.resetCompletions())), a;
                if (a && !a.isEditExpr) {
                    var f = b.editExpr(e, a);
                    a.parent.replaceChild(a, f);
                    a = f
                }
                a.content = null;
                if (" " === e.charAt(0)) return a = this.interpret(a), e = e.substr(1), a = this.interpret(a, e, g);
                (f = /^__\w*\b/.exec(e)) && (e = '"' + f[0] + '"' + e.substr(f[0].length));
                if (f = /^"[^"]+"/.exec(e)) {
                    f =
                        f[0];
                    this.locValRefs[f] = null;
                    if (f.length === e.length) return g ? (a.content = e, a) : this.interpretText(f.substr(1, f.length - 2), a);
                    a = this.interpretText(f.substr(1, f.length - 2), a);
                    e = e.substr(f.length);
                    return this.interpret(a, e, g)
                }
                if ("%" == e[0]) {
                    if (1 == e.length) return g ? (a.content = e, a) : this.interpretNumber(.01, a);
                    a = this.interpretNumber(.01, a);
                    e = e.substr(1);
                    return a = this.interpret(a, e, g)
                }
                if (f = /^\d+(?:\.\d*)?/.exec(e)) {
                    var h = !1;
                    "." == f[0].charAt(f[0].length - 1) && (h = !0);
                    f = f[0];
                    1 == v.trigPower && f.length === e.length && (e +=
                        "(");
                    if (f.length === e.length || f.length === e.length - 1 && " " === e[e.length - 1]) return g ? (a.content = e, a) : this.interpretNumber(f, a, h);
                    a = this.interpretNumber(f, a);
                    e = e.substr(f.length);
                    a.parent.isTrigFunction && a.parent.power && a.nextSibling && (100000111 == a.parent.power.value && (a.parent.power.value = -1), a = a.nextSibling, v.trigPower = null);
                    return this.interpret(a, e, g)
                }
                a.parent && "MultiVarFunction" === a.parent.__name__ && (e = parenthesisToCurly(e), -1 === e && (e = " "));
                var k = a.operand ? w.getCompletions(e) : u.getCompletions(e);
                if (k.completions.length && g) return a.content = e, 1 < e.length ? a.setCompletions(k.completions) : a.resetCompletions(), a;
                if (k.longestPrefix && (h = -1, f = k.longestPrefix.kw, "_" != f && "_[" != f && -1 != f.search(/\w/) && "^" != f.charAt(f.length - 1) && "." != f.charAt(f.length - 1) && (h = e.substr(f.length), h = h.search(/^\w/)), -1 == h)) {
                    h = "";
                    "cm" == f ? "^" == e.charAt(2) && (f = "cm^" + e.charAt(3), h = k.longestPrefix.kw, k.longestPrefix.kw = f) : "\u00b0" == f ? (h = k.longestPrefix.kw, k.longestPrefix.kw = "deg", f = /^\u00B0(\^-?[0-9]+(\.[0-9]+)?)?/.exec(e)[0]) :
                        "_\u03b2_^1" == f && (h = k.longestPrefix.kw);
                    if ("max" === f || "min" === f)
                        if (a.parent && "Subscript" === a.parent.__name__ || a.parent && "ArgumentList" === a.parent.__name__ && a.parent.parent && "Subscript" === a.parent.parent.__name__) return a = this.interpretParameter(f, a), e = e.substr(3), this.locValRefs[this.varStart + this.newVariable] = null, this.varStart = "", this.interpret(a, e, g);
                    a = this.interpretKeyword(k.longestPrefix, a);
                    a.indexINascii = c.initialInputSize - e.length;
                    "" != h && (k.longestPrefix.kw = h);
                    if (f.length === e.length) return a;
                    e = e.substr(f.length);
                    1 < f.length && "^" == f.charAt(f.length - 1) && (e = e.replace(/^ +/, ""), "-" == e.charAt(0) && "1" == e.charAt(1) && (v.trigPower = !0, e = e.substr(2), e = "100000111" + e));
                    return a = this.interpret(a, e, g)
                }
                if (a.operand) return a.parent.replaceChild(a, a.operand), a = d.mult(a.operand), this.interpret(a, e, g);
                f = /^.\w*(?=_)/.exec(e);
                null == f && (f = /^.\w*/.exec(e));
                k = f[0];
                "_" == k[k.length - 1] && (k += "_");
                var m = k.length;
                h = e.substring(m);
                "" != h && (f = h.match(/^'+/), null != f && (h = f[0], m += h.length, h = 2 == h.length ? h.replace("''", "\u201d") :
                    h.replace(/'/g, "\u2019"), k += h));
                if (m == e.length) {
                    if (g) return a.content = e, a.resetCompletions(), a;
                    a = this.interpretParameter(k, a);
                    this.locValRefs[this.varStart + this.newVariable] = null;
                    this.varStart = "";
                    return a
                }
                a = this.interpretParameter(k, a);
                e = e.substr(m);
                "_" == e.charAt(0) ? (this.varStart = this.newVariable + "_", "[" == e.charAt(1) && (this.varStart += "[")) : "Subscript" === a.parent.__name__ ? (this.locValRefs[this.varStart + this.newVariable] = null, this.varStart = "") : "ArgumentList" === a.parent.__name__ ? ("[" === this.varStart.charAt(this.varStart.length -
                    1) ? this.varStart += this.newVariable : this.varStart += "," + this.newVariable, e.startsWith("]") && (this.locValRefs[this.varStart + "]"] = null, this.varStart = "")) : this.locValRefs[this.newVariable] = null;
                return this.interpret(a, e, g)
            },
            confirmCompletion: function (a) {
                return a.isEditExpr && null !== a.getCurrentCompletion() ? this.interpret(a, a.content + a.getCurrentCompletion()) : a
            },
            addChar: function (a, b) {
                return "\r" == b ? this.confirmCompletion(a) : this.interpret(a, a.isEditExpr ? a.content + b : b, !0)
            },
            parse: function (a) {
                this.cedillas =
                    null; - 1 != a.indexOf('"###"') && (a = a.replace(/"###"/g, "Z99"), this.cedillas = !0);
                var e = b.editExpr(),
                    f = b.root(e);
                v.numero = 0;
                c = f;
                this.locValRefs = {};
                this.newVariable = this.varStart = "";
                this.asciiPosition = 0;
                c.initialInputSize = a.length;
                d.priorityMode = !0;
                MathMLGlobals.pendingParen = !1;
                this.interpret(e, a);
                f.nb_wUnits = this.locValRefs;
                f.cedillas = this.cedillas;
                return f
            }
        };
    a.parse = {
        parser: v,
        operations: d,
        prefixKeywords: u,
        postfixKeywords: w,
        greekLowercase: m,
        greekUppercase: t
    }
})(cvm);
var already, absFct, absproto, CABRI;
if ("undefined" !== typeof module) {
    var $jscomp$destructuring$var25 = require("./mathmlglobals.js");
    MathMLGlobals = $jscomp$destructuring$var25.MathMLGlobals;
    var $jscomp$destructuring$var26 = require("./prototype.js");
    Prototype = $jscomp$destructuring$var26.Prototype;
    var $jscomp$destructuring$var27 = require("../../translator.js");
    CABRI = $jscomp$destructuring$var27.CABRI
}
affectMathPrefix = function (a, b) {
    var c;
    for (c in b) {
        var d = new RegExp("\\b" + c + "\\b", "g");
        a = ("" + a).replace(d, " " + b[c] + " ")
    }
    return a
};
SimpleSerializer = {
    serialize: function (a, b) {
        if (void 0 === this[a.__name__]) return this.evaluable = !1, " not_evaluable";
        var c = this[a.__name__](a);
        if (b || a.priority && a.priority <= a.parent.priority) {
            if (a.parent.isRandFunction) return "()";
            c = "(" + c + ")"
        }
        "Text" == a.__name__ && "\u271d" == c[0] && (c = "?");
        return c
    },
    RootExpression: function (a) {
        this.functionList = {};
        this.evaluable = !0;
        var b = [this.serialize(a.expr), this.functionList, this.evaluable];
        "EuclDiv" != a.expr.__name__ && (MathMLGlobals.currRemainder = null);
        return b
    },
    Number: function (a) {
        return "" +
            Number(a.value)
    },
    Parameter: function (a) {
        return MathMLGlobals.forAlgebrite ? a.name : "pi" == a.name ? Math.PI : "exp1" == a.name ? Math.E : "inf" == a.name || "oo" == a.name ? Infinity : " " + a.name + " "
    },
    Negation: function (a) {
        return "-" + this.serialize(a.value)
    },
    Add: function (a) {
        return this.serialize(a.value)
    },
    Bracket: function (a) {
        return "(" + this.serialize(a.expr) + ")"
    },
    Somme: function (a) {
        var b = "",
            c = this;
        a.operands.forEach(function (a, e) {
            if (0 != e || "Number" != a.__name__ || "0" != a.value) b = a.isNegation ? b + c.serialize(a) : b + ((e ? "+" : "") + c.serialize(a))
        });
        return b
    },
    Product: function (a) {
        var b = this;
        return a.operands.map(function (a) {
            return b.serialize(a)
        }).join("*")
    },
    Modulo: function (a) {
        var b = this;
        var c = a.operands.map(function (a) {
            return b.serialize(a)
        });
        var d = -1;
        return c.reduce(function (a, b) {
            ++d;
            return isNaN(b) ? b.startsWith("(") && b.endsWith(")") && (b = b.substring(1, b.length - 1), !isNaN(b)) ? (c[d] = b, a) : !1 : a
        }, !0) ? c.reduce(Math.modJML) : c.join(" mod ")
    },
    Multmult: function (a) {
        return this.serialize(a.firstChild) + "*" + this.serialize(a.lastChild)
    },
    ElemDivide: function (a) {
        return this.serialize(a.firstChild) +
            "/" + this.serialize(a.lastChild)
    },
    Multpt: function (a) {
        return this.serialize(a.firstChild) + "*" + this.serialize(a.lastChild)
    },
    EuclDiv: function (a) {
        this.functionList.EuclDiv = "Math.divEucl";
        var b = this.serialize(a.firstChild);
        a = this.serialize(a.lastChild);
        try {
            var c = eval(b)
        } catch (e) {
            return b + " : " + a
        }
        try {
            var d = eval(a);
            if (0 === d) throw "div_zero";
        } catch (e) {
            if ("div_zero" == e) throw "div_zero";
            return c + " : " + a
        }
        return Math.divEucl(c, d)
    },
    ArgumentList: function (a) {
        var b = this;
        return a.operands.map(function (a) {
            return b.serialize(a)
        }).join(", ")
    },
    FunctionApplication: function (a) {
        return this.serialize(a.func) + "[" + this.serialize(a.arglist) + "]"
    },
    Equation: function (a) {
        return " not_evaluable"
    },
    ExprWithRelation: function (a) {
        return " not_evaluable"
    },
    Power: function (a) {
        if ("e" == a.base.value) return this.functionList.exp = "Math.exp", "exp" + this.serialize(a.power, !0);
        var b = this.serialize(a.base);
        a = this.serialize(a.power);
        try {
            var c = eval(b)
        } catch (e) {}
        try {
            var d = eval(a)
        } catch (e) {}
        if (void 0 != c && void 0 != d) return Math.pow(c, d);
        if (void 0 != d) switch (Number(d)) {
            case 0:
                return "1";
            case 1:
                return b
        }
        return MathMLGlobals.forImmediateEval ? (this.functionList.pow = "Math.pow", "pow(" + b + "," + a + ")") : "(" + b + ")^(" + a + ")"
    },
    OneLineDiv: function (a) {
        a.nuM = a.operands[0];
        a.deN = a.operands[1];
        var b = this.serialize(a.deN);
        if (isNaN(b)) {
            try {
                var c = affectMathPrefix(b, this.functionList);
                c = eval(c);
                Math.abs(c) < MathMLGlobals.ZeroThreshold && (c = 0)
            } catch (d) {
                if (-1 == d.message.indexOf("not defined")) throw "div_zero";
            }
            if (0 == c) throw "div_zero";
        } else if (0 == b) throw "div_zero";
        return this.serialize(a.nuM) + "/" + b
    },
    Fraction: function (a) {
        var b =
            this.serialize(a.deN);
        if (isNaN(b)) {
            try {
                var c = affectMathPrefix(b, this.functionList);
                c = eval(c);
                Math.abs(c) < MathMLGlobals.ZeroThreshold && (c = 0)
            } catch (d) {
                if (-1 == d.message.indexOf("not defined")) throw "div_zero";
            }
            if (0 == c) throw "div_zero";
        } else if (0 == b) throw "div_zero";
        return this.serialize(a.nuM) + "/" + b
    },
    FractionJML: function (a) {
        var b = this.serialize(a.denJML);
        if (isNaN(b)) {
            try {
                var c = affectMathPrefix(b, this.functionList);
                c = eval(c);
                Math.abs(c) < MathMLGlobals.ZeroThreshold && (c = 0)
            } catch (d) {
                if (-1 == d.message.indexOf("not defined")) throw "div_zero";
            }
            if (0 == c) throw "div_zero";
        } else if (0 == b) throw "div_zero";
        return this.serialize(a.numJML) + "|" + b
    },
    Sqrt: function (a) {
        var b = this.serialize(a.expr),
            c = -1 === b.search(/[_a-zA-Z]/);
        if (a.nth) {
            var d = this.serialize(a.nth);
            return c && -1 === d.search(/[_a-zA-Z]/) ? Math.pow(eval(b), 1 / eval(d)) : "(" + b + ")^(" + 1 / this.serialize(a.nth) + ")"
        }
        this.functionList.sqrt = "Math.sqrt";
        a = affectMathPrefix(b, this.functionList);
        try {
            a = eval(a)
        } catch (e) {
            return "sqrt(" + b + ")"
        }
        if ("number" == typeof a && 0 > a) throw "rac_of_neg";
        return "sqrt(" + b + ")"
    },
    TrigFunction: function (a) {
        var b =
            null,
            c = this.serialize(a.arg),
            d = affectMathPrefix(c, this.functionList);
        try {
            d = eval(d)
        } catch (g) {}
        var e = !isNaN(d);
        e && (c = d);
        switch (a.name) {
            case "sgn":
                b = "sign";
                break;
            case "ln":
                b = "log";
                break;
            case "lg":
                b = "log10";
                break;
            case "lb":
                b = "lo2";
                break;
            case "sinh":
            case "cosh":
            case "tanh":
                b = a.name;
                break;
            case "arcsin":
            case "arccos":
            case "arctan":
                b = a.name.replace("rc", "");
                break;
            case "arsinh":
            case "arcosh":
            case "artanh":
                b = a.name.replace("r", "")
        }
        if (b) {
            if (e) return e && a.name.startsWith("arc") ? "atan" === b ? Math.atan(c) : arcFctofArg1m1("asin" ===
                b ? 1 : 0, c) : Math[b](c);
            this.functionList[a.name] = "Math." + b;
            return a.name + "(" + c + ")"
        }
        if ("arccot" == a.name || "arcoth" == a.name) return a.name + this.serialize(a.arg, !0);
        b = a.power ? a.power.value : 1;
        if (0 === b) return 1;
        if (e) {
            if (-1 === b) {
                if ("tan" == a.name) return Math.atan(c);
                if (c < -1 - 1E-14 || 1 + 1E-14 < c) throw "undefined";
                return 1 - 1E-14 < c ? "sin" == a.name ? Math.PI / 2 : 0 : c < -1 + 1E-14 ? "sin" == a.name ? -Math.PI / 2 : Math.PI : +Math["a" + a.name](c)
            }
            c %= 2 * Math.PI;
            0 > c && (c += 2 * Math.PI);
            if ("sin" === a.name || "tan" === a.name) {
                if (1E-14 > c || 1E-14 > Math.abs(c -
                        Math.PI) || 2 * Math.PI - 1E-14 < c) return 0;
                if ("sin" === a.name) return a = Math.sin(c), 1 === b ? a : Math.pow(a, b)
            }
            if (1E-14 > Math.abs(c - Math.PI / 2) || 1E-14 > Math.abs(c - 3 * Math.PI / 2)) {
                if ("tan" === a.name) throw "undefined";
                return 0
            }
            a = Math[a.name](c);
            return 1 === b ? a : Math.pow(a, b)
        }
        c = "(" + c + ")";
        if (1 === b) return a.name + c;
        if (1 < b) return MathMLGlobals.forImmediateEval && !MathMLGlobals.forAlgebrite ? (this.functionList.pow = "Math.pow", "pow(" + a.name + c + "," + b + ")") : "(" + a.name + c + ")^" + b;
        if (-1 === b) return MathMLGlobals.forImmediateEval ? (this.functionList["a" +
            a.name] = "Math.a" + a.name, "a" + a.name + "(" + c + ")") : "arc" + a.name + "(" + c + ")"
    },
    OrdFunction: function (a) {
        if ("Number" === a.arg.__proto__.__name__) return "(" + Math[a.name](a.arg.value) + ")";
        var b = this.serialize(a.arg, !0);
        if ("round" === a.name) return isNaN(b) ? (this.functionList.round = "Math.round", "round(" + b + ")") : "" + Math.round(b);
        if ("trunc" === a.name) return isNaN(b) ? (this.functionList.trunc = "Math.trunc", "trunc(" + b + ")") : "" + Math.trunc(b)
    },
    RandFunction: function (a) {
        this.functionList[a.name] = "CABRI.random";
        return a.name + "()"
    },
    MultiVarFunction: function (a) {
        if ("choose" === a.name) {
            var b = Object.keys(a.arg.operands).length;
            if (0 === b) return " choose()";
            var c = this.serialize(a.arg.operands[0]);
            if (3 > b) return 3 === b ? c : 0 === c ? " random()" : this.serialize(a.arg.operands[1]);
            if ("number" === typeof c) return c = this.serialize(a.arg.operands[c]);
            for (var d = 1; d < b; d++) c += " , " + this.serialize(a.arg.operands[d]);
            return "choose(" + c + ")"
        }
        c = "";
        d = !0;
        var e = [];
        for (b = 0; b < a.arg.operands.length; b++) {
            var g = this.serialize(a.arg.operands[b]);
            isNaN(g) ? d = !1 : e.push(g);
            c += " , " + g
        }
        c = c.replace(/ , /, "");
        if (MathMLGlobals.forImmediateEval && d) return "gcd" === a.name ? "" + gcd.apply(null, e) : "lcm" === a.name ? "" + lcm.apply(null, e) : "" + Math[a.name].apply(null, e);
        if ("min" == a.name || "max" == a.name) this.functionList[a.name] = "Math." + a.name;
        return a.name + "(" + c + ")"
    },
    Matrix: function (a) {
        return " not_evaluable"
    },
    Abs: function (a) {
        if (a.arg && "Number" === a.arg.__proto__.__name__) return a.arg.value;
        this.functionList.abs = "Math.abs";
        return "abs" + this.serialize(a.child, !0)
    },
    Floor: function (a) {
        a = this.serialize(a.child,
            !1);
        return isNaN(a) ? (this.functionList.floor = "Math.floor", "floor(" + a + ")") : "" + Math.floor(a)
    },
    Ceiling: function (a) {
        this.functionList.ceiling = "Math.ceiling";
        return "ceil" + this.serialize(a.child, !0)
    },
    Factorial: function (a) {
        var b = this.serialize(a.child);
        a = affectMathPrefix(b, this.functionList);
        try {
            a = eval(a)
        } catch (c) {
            return "(" + b + ")!"
        }
        return "" + factorial(a)
    },
    Ellpsis: function (a) {
        return this.serialize(a.child)
    },
    UnitDeg: function (a) {
        return this.serialize(a.child) + "\u00b0"
    },
    UnitDegre: function (a) {
        return this.serialize(a.child) +
            "\u00b0"
    },
    UnitBool: function (a) {
        return this.serialize(a.child) + "_\u03b2_^1"
    },
    UnitRad: function (a) {
        return this.serialize(a.child) + " rad"
    },
    UnitLg: function (a) {
        return this.serialize(a.child) + " cm"
    },
    UnitLg2: function (a) {
        return this.serialize(a.child) + " cm2"
    },
    UnitLg3: function (a) {
        return this.serialize(a.child) + " cm3"
    },
    Conjunction: function (a) {
        var b = this;
        return a.operands.map(function (a) {
            return b.serialize(a)
        }).join("*")
    },
    Disjunction: function (a) {
        var b = this;
        return a.operands.map(function (a) {
            return b.serialize(a)
        }).join("+")
    },
    Not_: function (a) {
        var b = this.serialize(a.firstChild);
        return 0 == b || 1 == b || 0 === b || "number" === typeof b ? "" + !b : "not(" + this.serialize(a.firstChild) + ")"
    },
    Text: function (a) {
        return a.content
    },
    Subscript: function (a) {
        null === a.firstChild.name && (a.firstChild.name = a.firstChild.content);
        null === a.lastChild.name && (a.lastChild.name = null !== a.lastChild.content ? a.lastChild.content : a.lastChild.value ? a.lastChild.value : a.lastChild.operands ? a.lastChild.operands[0].name && a.lastChild.operands[1].name ? a.lastChild.operands[0].name +
            "_" + a.lastChild.operands[1].name : "indices" : "indices");
        if ("Subscript" === a.lastChild.parent.__name__ && "ArgumentList" !== a.lastChild.__name__) var b = a.lastChild.base ? a.lastChild.base.name : a.lastChild.name;
        else if ("ArgumentList" === a.lastChild.__name__) {
            b = a.lastChild.operands[0].name;
            for (var c = 1; c < a.lastChild.operands.length; c++) b += "," + a.lastChild.operands[c].name;
            b = "[" + b + "]"
        }
        return " " + a.firstChild.name + "_" + b + " "
    },
    Conjugate: function (a) {
        return "conj" + this.serialize(a.child, !0)
    },
    Derivative: function (a) {
        return " not_evaluable"
    },
    DDerivative: function (a) {
        return "dd\u00e9riv\u00e9e"
    }
};
SimpleSerializer = Prototype.specialise(SimpleSerializer);
Math.modJML = function (a, b) {
    Math.divEucl(a, b);
    return MathMLGlobals.currRemainder
};

function arcFctofArg1m1(a, b) {
    return b < -1 - 1E-14 || 1 + 1E-14 < b ? NaN : 1 - 1E-14 < b ? a ? Math.PI / 2 : 0 : b < -1 + 1E-14 ? a ? -Math.PI / 2 : Math.PI : a ? Math.asin(b) : Math.cos(b)
}

function number2str(a) {
    return !isNaN(a) || a.startsWith("(") && a.endsWith(")") && (a = a.substring(1, a.length - 1), !isNaN(a)) ? Number(a) : null
}

function mulberry32_(a) {
    return function () {
        var b = a += 1831565813;
        b = Math.imul(b ^ b >>> 15, b | 1);
        b ^= b + Math.imul(b ^ b >>> 7, b | 61);
        return ((b ^ b >>> 14) >>> 0) / 4294967296
    }
}

function factorial(a) {
    if (-Infinity != a) {
        if (Infinity == a) return MathMLGlobals.InfinityFrontSign = 1, Infinity;
        if (Number.isInteger(a)) {
            if (0 > a) return MathMLGlobals.InfinityFrontSign = 0, Infinity;
            if (2 > a) return 1;
            for (var b = 2, c = 3; c <= a; c++) b *= c;
            return b
        }
        a += 1;
        return .5 > a ? Math.PI / (Math.sin(Math.PI * a) * gamma(1 - a)) : gamma(a)
    }
}

function gamma(a) {
    for (var b = [1.000000000190015, 76.18009172947146, -86.50532032941678, 24.01409824083091, -1.231739572450155, .001208650973866179, -5.395239384953E-6], c = Math.sqrt(2 * Math.PI) / a, d = b[0], e = 1; 6 >= e; ++e) d += b[e] / (a + e);
    return c * d * Math.pow(a + 5.5, a + .5) * Math.exp(-(a + 5.5))
}(function (a) {
    return Math.PI / 2 - Math.arctan(a)
});
Math.divEucl = function (a, b) {
    if (1 === b || -1 === b)
        if (MathMLGlobals.currRemainder = 0, Number.isInteger(a)) return 0 <= a ? a : -a;
    if (0 === b) throw 0 != a ? "div_zero" : 1 == CabriConfig.Calculator.Level ? "div_zero" : "undefined";
    var c = Math.floor(a / b);
    0 > b && ++c;
    MathMLGlobals.currRemainder = a - c * b;
    return c
};

function arcoth(a) {
    return .5 * Math.log((a + 1) / (a - 1))
}

function choose(a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    c = b.length;
    if (0 === c) return Math.random();
    if (1 === c) return b[0];
    var d = b[0];
    0 > d ? d = 1 : d >= c && (d = c - 1);
    0 === d && (d = 1 + Math.floor((c - 1) * Math.random()));
    return b[d]
}

function gcd_rec(a, b) {
    return b ? gcd_rec(b, a % b) : Math.abs(a)
}
var gcd = function (a, b) {
        a = Math.abs(Math.round(a));
        b = Math.abs(Math.round(b));
        if (b > a) {
            var c = a;
            a = b;
            b = c
        }
        for (;;) {
            if (0 === b) return a;
            a %= b;
            if (0 === a) return b;
            b %= a
        }
    },
    lcm = function (a, b) {
        return 0 === Math.round(a) && 0 === Math.round(b) ? 0 : Math.round(a) * Math.round(b) / gcd(a, b)
    },
    unitSchemeEquality = function (a, b) {
        b = a.split(" ");
        a.split(" ");
        if (b.length != b.length) return !1
    },
    PMathMLSerializer = {
        serialize: function (a, b) {
            if (void 0 === this[a.__name__]) return " not_evaluable";
            var c = this[a.__name__](a);
            if (b || a.priority && a.priority <= a.parent.priority) {
                if (a.parent.isRandFunction) return "()";
                c = "<mrow>" + c + "</mrow>"
            }
            "Text" == a.__name__ && "\u271d" == c[0] && (c = "?");
            return c
        },
        RootExpression: function (a) {
            return "<math>" + this.serialize(a.expr) + "</math>"
        },
        Number: function (a) {
            return "<mn>" + a.value + "</mn>"
        },
        Parameter: function (a) {
            return "pi" == a.name ? "<mi>&#x3C0;</mi>" : "exp1" == a.name ? Math.E : "<mi>" + a.name + "</mi>"
        },
        Negation: function (a) {
            return "<mo>-</mo><mrow>" + this.serialize(a.value) + "</mrow>"
        },
        Add: function (a) {
            return "<mo>+</mo>" + this.serialize(a.value)
        },
        Bracket: function (a) {
            return "<mrow>" + this.serialize(a.expr) +
                "</mrow>"
        },
        Somme: function (a) {
            var b = "",
                c = this;
            a.operands.forEach(function (a, e) {
                b = a.isNegation ? b + c.serialize(a) : b + ((e ? "<mo>+</mo>" : "") + c.serialize(a))
            });
            return b
        },
        Product: function (a) {
            var b = this;
            return a.operands.map(function (a) {
                return b.serialize(a)
            }).join("<mo>*</mo>")
        },
        Modulo: function (a) {
            return this.serialize(a.firstChild) + " mod " + this.serialize(a.lastChild)
        },
        Multmult: function (a) {
            return this.serialize(a.firstChild) + "*" + this.serialize(a.lastChild)
        },
        ElemDivide: function (a) {
            return this.serialize(a.firstChild) +
                "/" + this.serialize(a.lastChild)
        },
        Multpt: function (a) {
            return this.serialize(a.firstChild) + "*" + this.serialize(a.lastChild)
        },
        EuclDiv: function (a) {
            return "EuclDiv(" + this.serialize(a.firstChild) + "," + this.serialize(a.lastChild) + ")"
        },
        ArgumentList: function (a) {
            var b = this;
            return a.operands.map(function (a) {
                return b.serialize(a)
            }).join("<mo>, </mo>")
        },
        FunctionApplication: function (a) {
            return this.serialize(a.func) + "<mo>[</mo>" + this.serialize(a.arglist) + "<mo>]</mo>"
        },
        Equation: function (a) {
            var b = this;
            return a.operands.map(function (a) {
                return b.serialize(a)
            }).join("<mo>=</mo>")
        },
        ExprWithRelation: function (a) {
            return this.serialize(a.firstChild)
        },
        Power: function (a) {
            return "e" == a.base.value ? "exp" + this.serialize(a.power, !0) : "<msup>" + this.serialize(a.base) + this.serialize(a.power) + "</msup>"
        },
        Fraction: function (a) {
            var b = this.serialize(a.deN);
            return "<mfrac>" + this.serialize(a.nuM) + b + "</mfrac>"
        },
        Sqrt: function (a) {
            var b = this.serialize(a.expr, !0);
            return a.nth ? "<mroot><mrow>" + b + "</mrow><mn>" + a.nth + "</mn></mroot>" : "<msqrt>" + b + "</msqrt>"
        },
        TrigFunction: function (a) {
            var b = this.serialize(a.arg,
                !0);
            return "<mi>" + a.name + "</mi>" + b
        },
        OrdFunction: function (a) {
            return a.name + this.serialize(a.arg, !0)
        },
        RandFunction: function (a) {
            return a.name + this.serialize(a.arg, !0)
        },
        MultiVarFunction: function (a) {
            var b, c = "";
            for (b = 0; b < a.arg.operands.length; b++) c += ";" + this.serialize(a.arg.operands[b]);
            c = c.replace(/;/, "");
            return a.name + "(" + c + ")"
        },
        Matrix: function (a) {
            var b = this;
            return "(" + a.rows.map(function (a) {
                return a.map(function (a) {
                    return b.serialize(a)
                }).join(", ")
            }).join("; ") + ")"
        },
        Abs: function (a) {
            return "abs" + this.serialize(a.child,
                !0)
        },
        Floor: function (a) {
            return "floor" + this.serialize(a.child, !0)
        },
        Ceiling: function (a) {
            return "ceil" + this.serialize(a.child, !0)
        },
        Factorial: function (a) {
            return this.serialize(a.child, !0) + "<mo>!</mo>"
        },
        Ellpsis: function (a) {
            return this.serialize(a.child)
        },
        UnitDeg: function (a) {
            return this.serialize(a.child) + "\u00b0"
        },
        UnitDegre: function (a) {
            return this.serialize(a.child) + "\u00b0"
        },
        UnitRad: function (a) {
            return this.serialize(a.child) + " rad"
        },
        UnitLg: function (a) {
            return this.serialize(a.child) + " cm"
        },
        UnitLg2: function (a) {
            return this.serialize(a.child) +
                " cm2"
        },
        UnitLg3: function (a) {
            return this.serialize(a.child) + " cm3"
        },
        Conjunction: function (a) {
            return this.serialize(a.firstChild) + " * " + this.serialize(a.lastChild)
        },
        Disjunction: function (a) {
            return this.serialize(a.firstChild) + " + " + this.serialize(a.lastChild)
        },
        Not_: function (a) {
            return "not(" + this.serialize(a.firstChild) + ")"
        },
        Text: function (a) {
            return a.content
        },
        Subscript: function (a) {
            return "<msub>" + a.firstChild.name + a.lastChild.name + "</msub>"
        },
        Conjugate: function (a) {
            return "conj" + this.serialize(a.child, !0)
        },
        Derivative: function (a) {
            return "sin" == a.expr.name ? (a = this.serialize(a.expr.arg), "cos" + a + "" + this.serialize(a + "'")) : "d\u00e9riv\u00e9e"
        },
        DDerivative: function (a) {
            return "dd\u00e9riv\u00e9e"
        }
    };
PMathMLSerializer = Prototype.specialise(PMathMLSerializer);
var CMathMLSerializer = {
    serialize: function (a, b, c, d) {
        a = this.serializeToBits(a);
        return -1 != a[0].text.indexOf("CoordsList") ? "CoordsList ( , ) not supported" : -1 != a[0].text.indexOf("Multpt") ? "Multpt *. not supported" : -1 != a[0].text.indexOf("not supported") ? a[0].text : "<math>" + this.bitsToMathML(a, b || 0, c || 2, d) + "</math>"
    },
    serializeToBits: function (a) {
        var b = [];
        this.objectToBits(this.exprToObject(a), b);
        return b
    },
    exprToObject: function (a) {
        return this.hasOwnProperty(a.__name__) ? this[a.__name__](a) : a.__name__ + " not supported"
    },
    objectToBits: function (a, b) {
        var c = this;
        switch (typeof a) {
            case "object":
                if (!a.children || 0 === a.children.length) {
                    b.push({
                        type: "emptyTag",
                        htmltext: "<" + a.tag + "></" + a.tag + ">",
                        xmltext: "<" + a.tag + "/>"
                    });
                    break
                }
                b.push({
                    type: "openTag",
                    text: "<" + a.tag + ">"
                });
                a.children.forEach(function (a) {
                    c.objectToBits(a, b)
                });
                b.push({
                    type: "closeTag",
                    text: "</" + a.tag + ">"
                });
                break;
            case "number":
                b.push({
                    type: "text",
                    text: a.toString()
                });
                break;
            case "string":
                b.push({
                    type: "text",
                    text: a
                })
        }
    },
    bitsToMathML: function (a, b, c, d) {
        var e = [];
        "                                                                                   ".substr(b);
        var g = !1;
        a.forEach(function (h, m) {
            switch (h.type) {
                case "emptyTag":
                    h = d ? h.htmltext : h.xmltext;
                    e.push("                                                                                   ".substr(0, b) + h);
                    break;
                case "openTag":
                    e.push("                                                                                   ".substr(0, b) + h.text);
                    b += c;
                    break;
                case "text":
                    (g = "closeTag" === a[m + 1].type) && (e[e.length - 1] += h.text);
                    break;
                case "closeTag":
                    b -= c, g ? (e[e.length - 1] += h.text, g = !1) : e.push("                                                                                   ".substr(0,
                        b) + h.text)
            }
        });
        return e.join("\n")
    },
    apply: function (a, b, c) {
        var d = this,
            e = ["string" === typeof a ? {
                tag: a
            } : d.exprToObject(a)];
        c && c.forEach(function (a) {
            e.push({
                tag: a.name,
                children: [d.exprToObject(a.value)]
            })
        });
        b.forEach(function (a) {
            e.push(d.exprToObject(a))
        });
        return {
            tag: "apply",
            children: e
        }
    },
    RootExpression: function (a) {
        return this.exprToObject(a.expr)
    },
    Number: function (a) {
        return {
            tag: "cn",
            children: [a.value.toString()]
        }
    },
    Parameter: function (a) {
        return {
            tag: "ci",
            children: [a.name === a.value ? a.value : "&" + a.name + ";"]
        }
    },
    Subscript: function (a) {
        var b = [a.base];
        a.subscript.isArgumentList ? b = b.concat(a.subscript.operands) : b.push(a.subscript);
        return this.apply("selector", b)
    },
    Negation: function (a) {
        return this.apply("minus", [a.value])
    },
    Not: function (a) {
        return this.apply("not", [a.value])
    },
    Bracket: function (a) {
        return this.exprToObject(a.expr)
    },
    Add: function (a) {
        return a.expr ? this.exprToObject(a.expr) : this.exprToObject(a.value)
    },
    Somme: function (a) {
        return 2 === a.operands.length && a.operands[1].isNegation ? this.apply("minus", [a.operands[0],
            a.operands[1].value
        ]) : this.apply("plus", a.operands)
    },
    Product: function (a) {
        return this.apply("times", a.operands)
    },
    FunctionApplication: function (a) {
        return this.apply(a.func, a.arglist.operands)
    },
    Conjunction: function (a) {
        return this.apply("log_and", a.operands)
    },
    Disjunction: function (a) {
        return this.apply("or", a.operands)
    },
    Modulo: function (a) {
        return this.apply("modulo", a.operands)
    },
    EuclDiv: function (a) {
        return this.apply("euclDiv", a.operands)
    },
    Equation: function (a) {
        var b = this,
            c = [],
            d, e, g;
        a.operands.forEach(function (a,
            m) {
            0 === m ? g = a : (a.relation === e ? d.push(a.child) : (d && c.push(b.apply(e, d)), d = [g, a.child], e = a.relation), g = a.child)
        });
        c.push(this.apply(e, d));
        if (1 === c.length) return c[0];
        c.unshift({
            tag: "and"
        });
        return {
            tag: "apply",
            children: c
        }
    },
    Power: function (a) {
        return this.apply("power", [a.base, a.power])
    },
    Fraction: function (a) {
        if (a.nuM.isDifferential && a.deN.isDifferential) {
            var b = [{
                name: "bvar",
                value: a.deN.child
            }];
            return this.apply("diff", [a.nuM.child], b)
        }
        return this.apply("divide", [a.nuM, a.deN])
    },
    Sqrt: function (a) {
        var b = null;
        a.nth && (b = [{
            name: "degree",
            value: a.nth
        }]);
        return this.apply("root", [a.expr], b)
    },
    TrigFunction: function (a) {
        return this.apply(a.name, [a.arg])
    },
    Abs: function (a) {
        return this.apply("abs", [a.child])
    },
    Floor: function (a) {
        return this.apply("floor", [a.child])
    },
    Ceiling: function (a) {
        return this.apply("ceiling", [a.child])
    },
    Factorial: function (a) {
        return this.apply("factorial", [a.child])
    },
    Conjugate: function (a) {
        return this.apply("conjugate", [a.child])
    },
    OpOf: function (a, b) {
        var c = [];
        a.from && a.from.isEquation && (c.push({
            name: "bvar",
            value: a.from.operands[0]
        }), c.push({
            name: "lowlimit",
            value: a.from.operands[1].child
        }));
        a.to && c.push({
            name: "uplimit",
            value: a.to
        });
        return this.apply(b, [a.arg], c)
    },
    SumOf: function (a) {
        return this.OpOf(a, "sum")
    },
    ProductOf: function (a) {
        return this.OpOf(a, "prod")
    },
    IntegralOf: function (a) {
        var b = [],
            c = a.arg;
        if (c.isProduct && c.lastChild.isDifferential) {
            var d = c.lastChild.child;
            c = 2 < c.operands.length ? expr.product(c.operands.slice(0, -1)) : c.firstChild
        } else c.isFraction && c.nuM.isDifferential && (d = c.nuM, c = expr.fraction(expr.number(1),
            c.deN));
        d && b.push({
            name: "bvar",
            value: d
        });
        a.from && b.push({
            name: "lowlimit",
            value: a.from
        });
        a.to && b.push({
            name: "uplimit",
            value: a.to
        });
        return this.apply("int", [c], b)
    },
    Derivative: function (a) {
        var b = [];
        a.variable && b.push({
            name: "bvar",
            value: a.variable
        });
        return this.apply("diff", [a.expr], b)
    },
    Matrix: function (a) {
        var b = this;
        return {
            tag: "matrix",
            children: a.rows.map(function (a) {
                return {
                    tag: "matrixrow",
                    children: a.map(function (a) {
                        return b.exprToObject(a)
                    })
                }
            })
        }
    },
    Piecewise: function (a) {
        var b = this;
        return {
            tag: "piecewise",
            children: a.operands.map(function (a) {
                return a.isConditionalExpression ? {
                    tag: "piece",
                    children: [b.exprToObject(a.expr), b.exprToObject(a.condition)]
                } : {
                    tag: "otherwise",
                    children: [b.exprToObject(a)]
                }
            })
        }
    }
};
CMathMLSerializer = Prototype.specialise(CMathMLSerializer);
"undefined" !== typeof module && (exports.affectMathPrefix = affectMathPrefix, exports.SimpleSerializer = SimpleSerializer, exports.PMathMLSerializer = PMathMLSerializer, exports.CMathMLSerializer = CMathMLSerializer, exports.choose = choose);
if ("undefined" !== typeof module) {
    var $jscomp$destructuring$var28 = require("./prototype.js");
    Prototype = $jscomp$destructuring$var28.Prototype
}
SimpleUnitSerializer = {
    serialize: function (a, b) {
        if (void 0 === this[a.__name__]) return "not_evaluable";
        var c = this[a.__name__](a),
            d = c[1];
        if (-1 != c.indexOf("not(")) return a = c.indexOf(","), [c.substring(0, a) + ")", 1];
        c = c[0];
        if (b || a.priority && a.priority <= a.parent.priority) {
            if (a.parent.isRandFunction) return ["()", 1];
            c = "(" + c + ")"
        }
        "Text" == a.__name__ && "\u271d" == c[0] && (c = "?");
        return [c, d]
    },
    RootExpression: function (a, b) {
        b && (this.immedateEval = !0);
        this.locValRefs = a.nb_wUnits;
        return this.serialize(a.expr)
    },
    Number: function (a) {
        return [a.value.toString(),
            "1"
        ]
    },
    Parameter: function (a) {
        var b = this.locValRefs[a.name],
            c = "1";
        if (null != b)
            if (b += "", -1 != b.indexOf("^")) c = b.replace(/^\d+(?:\.\d*)?( *(e|E)(\+\d+|-\d+))?/, ""), c = c.replace(/^ /, "");
            else if ("false" == b || "true" == b) c = "boolean";
        return "pi" === a.name ? [Math.PI, c] : "exp1" === a.name ? [Math.E, c] : this.immedateEval ? [parseFloat(b), c] : [" " + a.name + " ", c]
    },
    Negation: function (a) {
        a = this.serialize(a.value);
        return ["-" + a[0], a[1]]
    },
    Add: function (a) {
        a = this.serialize(a.value);
        return [a[0], a[1]]
    },
    Bracket: function (a) {
        return a.value ?
            (a = this.serialize(a.value), ["(" + a[0] + ")", a[1]]) : [NaN, 1]
    },
    Somme: function (a) {
        var b = "",
            c = "",
            d = this;
        a.operands.forEach(function (a, g) {
            var e = d.serialize(a),
                m = addUnit(c, e[1]);
            c = m[0];
            1 != m[1] && (e[0] += "*" + m[1]);
            b = a.isNegation ? b + e[0] : b + ((g ? "+" : "") + e[0])
        });
        return [b, c]
    },
    Product: function (a) {
        var b = this,
            c = "",
            d = "1",
            e;
        a.operands.map(function (a) {
            e = b.serialize(a);
            c += "" == c ? e[0] : "*" + e[0];
            d = prod_fracUnit(d, e[1])
        });
        return [c, d]
    },
    Modulo: function (a) {
        a = serial_Infix(a, this, ", ");
        return [" Math.modJML(" + a[0] + ")", a[1]]
    },
    Multmult: function (a) {
        return serial_Infix(a,
            this, "*")
    },
    ElemDivide: function (a) {
        return serial_Infix(a, this, "/")
    },
    Multpt: function (a) {
        return serial_Infix(a, this, "*")
    },
    EuclDiv: function (a) {
        a = serial_Infix(a, this, ", ");
        return [" Math.divEucl(" + a[0] + ")", a[1]]
    },
    ArgumentList: function (a) {
        var b = this;
        return a.operands.map(function (a) {
            return b.serialize(a)
        }).join(", ")
    },
    FunctionApplication: function (a) {
        return this.serialize(a.func) + "[" + this.serialize(a.arglist) + "]"
    },
    Equation: function (a) {
        var b = this;
        return a.operands.map(function (a) {
            return b.serialize(a)
        }).join("=")
    },
    ExprWithRelation: function (a) {
        return "ExprWithRelation"
    },
    Power: function (a) {
        var b = this.serialize(a.base),
            c = this.serialize(a.power);
        a = 1 != c[1] && "" != c[1] ? 1 : powUnit(b[1], c[0]);
        b = b[0];
        c = c[0];
        if (!isNaN(c)) {
            switch (Number(c)) {
                case 2:
                    b = "(" + b + "*" + b + ")";
                    break;
                case 3:
                    b = "(" + b + "*" + b + "*" + b + ")";
                    break;
                case -1:
                    b = "(" + 1 / b + ")";
                    break;
                case 0:
                    b = "1";
                    break;
                case 1:
                    break;
                default:
                    return ["Math.pow(" + b + "," + c + ")", a]
            }
            return [b, a]
        }
        return ["Math.pow(" + b + "," + c + ")", a]
    },
    Fraction: function (a) {
        var b = this.serialize(a.deN);
        if (!isNaN(b[0])) {
            if (0 ==
                b[0]) throw "div_zero";
        } else if (0 == this.locValRefs[b[0].trim()]) throw "div_zero";
        a = this.serialize(a.nuM);
        var c = prod_fracUnit(a[1], b[1], "frac");
        return [a[0] + "/" + b[0], c]
    },
    Sqrt: function (a) {
        var b = this.serialize(a.expr, !0),
            c = 2;
        a.nth && (c = this.serialize(a.nth)[0]);
        var d = unitDecode(b[1])[0];
        var e = unitDecode(b[1])[1];
        d = 1 == d || "" == d ? 1 : 3 < c ? "1" : d + "^" + e / (a.nth ? c : 2);
        return a.nth ? ["Math.pow(" + b[0] + "," + 1 / c + ")", d] : ["Math.sqrt" + b[0], d]
    },
    TrigFunction: function (a) {
        var b = this.serialize(a.arg, !0);
        if ("ln" == a.name) return ["Math.log" +
            b[0], 1
        ];
        if ("lg" == a.name) return ["Math.log10" + b[0], 1];
        if ("lb" == a.name) return ["Math.log2" + b[0], 1];
        if ("sgn" == a.name) return ["Math.sign" + b[0], 1];
        if ("arcsin" == a.name || "arccos" == a.name || "arctan" == a.name) return ["Math." + a.name.replace("rc", "") + b[0], 1];
        if ("arccot" == a.name) return ["arccot" + b[0], 1];
        if ("arsinh" == a.name) return ["Math.asinh" + b[0], 1];
        if ("arcosh" == a.name) return ["Math.acosh" + b[0], 1];
        if ("artanh" == a.name) return ["atanh" + b[0], 1];
        if ("artanh" == a.name) return ["acoth" + b[0], 1];
        "\u00b0" == ("" + b[1]).charAt(0) && (b[0] =
            "(" + (Math.PI / 180 + "*") + b[0] + ")");
        b = "Math." + a.name + b[0];
        return a.power ? ["Math.pow(" + b + "," + a.power.value + ")", 1] : [b, "1"]
    },
    OrdFunction: function (a) {
        var b = this.serialize(a.arg, !0);
        a = a.name;
        "sgn" == a && (a = "sign");
        return ["Math." + a + b[0], b[1]]
    },
    RandFunction: function (a) {
        return ["CABRI.random()", "1"]
    },
    MultiVarFunction: function (a) {
        if ("choose" === a.name) {
            var b = Object.keys(a.arg.operands).length;
            if (0 === b) return [CABRI.random(), 1];
            var c = this.serialize(a.arg.operands[0])[0],
                d = parseFloat(c);
            isNaN(d) || (c = Math.round(parseFloat(c)));
            if (3 > b) return 1 === b ? [c, 1] : 0 === c ? [CABRI.random(), 1] : this.serialize(a.arg.operands[1]);
            if ("number" === typeof c) return 0 === c ? c = 1 + Math.floor((b - 1) * CABRI.random()) : 0 > c ? c = 1 : c >= b && (c = b - 1), a = this.serialize(a.arg.operands[Math.round(c)])
        }
        c = "";
        d = 1;
        for (b = 0; b < a.arg.operands.length; b++) {
            var e = this.serialize(a.arg.operands[b]);
            c += "," + e[0];
            0 === b && (d = e[1])
        }
        c = c.replace(/,/, "");
        return "max" == a.name || "min" == a.name ? ["Math." + a.name + "(" + c + ")", d] : [a.name + "(" + c + ")", 1]
    },
    Matrix: function (a) {
        var b = this;
        return "(" + a.rows.map(function (a) {
                return a.map(function (a) {
                    return b.serialize(a)
                }).join(", ")
            }).join("; ") +
            ")"
    },
    Abs: function (a) {
        a = this.serialize(a.child, !0);
        return ["Math.abs" + a[0], a[1]]
    },
    Floor: function (a) {
        a = this.serialize(a.child, !0);
        return ["Math.floor" + a[0], a[1]]
    },
    Ceiling: function (a) {
        a = this.serialize(a.child, !0);
        return ["Math.ceil" + a[0], a[1]]
    },
    Factorial: function (a) {
        return a.child.isNumber() ? [factorial(a.child), 1] : ["factorial(" + this.serialize(a.child)[0] + ")", "1"]
    },
    Ellpsis: function (a) {
        a = this.serialize(a.child, !0);
        return [a[0], a[1]]
    },
    Conjunction: function (a) {
        return [this.serialize(a.firstChild)[0] + " * " + this.serialize(a.lastChild)[0],
            1
        ]
    },
    Disjunction: function (a) {
        return [this.serialize(a.firstChild)[0] + " + " + this.serialize(a.lastChild)[0], 1]
    },
    Not_: function (a) {
        return ["!(" + this.serialize(a.firstChild)[0] + ")", "_\u03b2_^1"]
    },
    Text: function (a) {
        return [a.content, 1]
    },
    Subscript: function (a) {
        null == a.firstChild.name && (a.firstChild.name = a.firstChild.content);
        null == a.lastChild.name && (a.lastChild.name = null != a.lastChild.content ? a.lastChild.content : a.lastChild.value ? a.lastChild.value : a.lastChild.operands ? a.lastChild.operands[0].name && a.lastChild.operands[1].name ?
            a.lastChild.operands[0].name + "_" + a.lastChild.operands[1].name : "indices" : "indices");
        if ("Subscript" === a.lastChild.parent.__name__ && "ArgumentList" !== a.lastChild.__name__) var b = a.lastChild.base ? a.lastChild.base.name : a.lastChild.name;
        else if ("ArgumentList" === a.lastChild.__name__) {
            b = a.lastChild.operands[0].name;
            for (var c = 1; c < a.lastChild.operands.length; c++) b += "," + a.lastChild.operands[c].name;
            b = "[" + b + "]"
        }
        return [" " + a.firstChild.name + "_" + b + " ", 1]
    },
    Conjugate: function (a) {
        return ["conj" + this.serialize(a.child,
            !0)[0], 1]
    },
    Derivative: function (a) {
        return "sin" == a.expr.name ? (a = this.serialize(a.expr.arg), "cos" + a + "" + this.serialize(a + "'")) : "d\u00e9riv\u00e9e"
    },
    DDerivative: function (a) {
        return "d\u00e9riv\u00e9e"
    }
};
SimpleUnitSerializer = Prototype.specialise(SimpleUnitSerializer);
var unitDecode = function (a) {
    if (1 == a) return [1, 1];
    var b = a.indexOf("^");
    if (-1 != b) {
        var c = a.substring(b + 1);
        return [a.substring(0, b), parseFloat(c)]
    }
    return [a, 1]
};

function prod_fracUnit(a, b, c) {
    if ("boolean" == a || "boolean" == b) return "boolean";
    if (1 == b) return a;
    var d = b.split(" "),
        e;
    if (1 == a) {
        if (c) {
            for (var g = 0; g < d.length; g++) {
                var h = unitDecode(d[g])[0];
                b = unitDecode(d[g])[1];
                c && (b *= -1);
                d[g] = h + "^" + b
            }
            return d.join(" ")
        }
        return b
    }
    for (g = 0; g < d.length; g++)
        if (b = unitDecode(d[g]), h = b[0], b = b[1], -1 != (e = a.indexOf(h))) {
            h = a.substring(e);
            e = h.indexOf("^");
            var m = parseInt(h.substring(e + 1));
            h = h.substring(0, e);
            e = m;
            m = c ? m - b : m + b;
            a = 0 == m ? a.replace(h + "^" + e, "") : a.replace(h + "^" + e, h + "^" + m)
        } else c &&
            (b *= -1), a += " " + h + "^" + b;
    a.replace(/\s+/g, " ").trim();
    "" == a && (a = 1);
    return a
}

function powUnit(a, b) {
    if (1 == a) return "1";
    a = a.split(" ");
    for (var c, d, e = 0; e < a.length; e++) c = unitDecode(a[e]), d = c[0], c = c[1], c *= eval(b), isNaN(c) ? a[e] = 1 : a[e] = d + "^" + c;
    return a.join(" ")
}

function addUnit(a, b) {
    if ("boolean" == a || "boolean" == b) return ["boolean", 1];
    b += "";
    if (a == b || "" == a) return [b, 1];
    if (1 == a) return ["1", 1];
    var c = 1,
        d = a.split(" ");
    b.split(" ");
    for (var e, g, h = 0; h < d.length; h++) {
        -1 == (g = b.indexOf(d[h])) ? ((e = -1 != d[h].indexOf("\u00b0")) && (c *= 1), e || (e = -1 != d[h].indexOf("rad") && -1 != (g = b.indexOf("\u00b0"))) && (c *= Math.PI / 180), e || (e = -1 != d[h].indexOf("cm") && -1 != (g = b.indexOf("in"))) && (c *= 2.54), e || (e = -1 != d[h].indexOf("in") && -1 != (g = b.indexOf("cm"))) && (c *= 1 / 2.54)) : e = !0;
        if (!e) return [a, 1];
        e = unitDecode(d[h])[0];
        unitDecode(d[h]);
        g = b.substring(g + e.length + 1);
        parseInt(g)
    }
    return [a, c]
}

function serial_Infix(a, b, c) {
    var d = b.serialize(a.firstChild);
    a = b.serialize(a.lastChild);
    return [d[0] + c + a[0], d[1]]
}
"undefined" !== typeof module && (exports.SimpleUnitSerializer = SimpleUnitSerializer);
var PresMMLto_Ascii = function (a) {
    a = a.replace(/\s/g, "");
    a = a.replace(/>&/g, ">_");
    a = a.replace(/<math[^>]*/, "<math");
    a = (new DOMParser).parseFromString(a, "text/xml");
    var b = [];
    try {
        handle(a.firstChild, b)
    } catch (c) {
        return c.message
    }
    return b.join(" ")
};

function handleAll(a, b) {
    for (var c = 0; c < a.length; c++) handle(a[c], b)
}

function handle(a, b) {
    (handlers[a.localName] || function () {
        throw Error("Unsupported element: " + a.localName);
    })(a, b)
}
var handlerApi = {
        handle: handle,
        handleAll: handleAll
    },
    moToAsciiMath = {
        "+": "+",
        "-": "-",
        "_sdot;": "*",
        "_Star;": "**",
        "_times;": "**",
        "_InvisibleTimes;": " ",
        "/": "/",
        "_divide;": "-:",
        "=": "=",
        "_ne;": "!=",
        "<": "<",
        ">": ">",
        "_le;": "<=",
        "_ge;": ">=",
        "(": "(",
        ")": ")",
        "_asymp;": "~~",
        "[": "[",
        "]": "]",
        ",": ",",
        "{": "{",
        "}": "}",
        "_macr;": "bar",
        "_rarr;": "vec",
        "_harr;": "line",
        "_plusmn;": "+-",
        "?": "?",
        "_ang;": "/_",
        "_deg;": "deg",
        "_#xB0;": "deg",
        "\u00b0": "deg",
        "_Delta;": "Delta",
        "_Gamma;": "Gamma",
        "_Lambda;": "Lambda",
        "_Omega;": "Omega",
        "_Phi;": "Phi",
        "_Pi;": "Pi",
        "_Sigma;": "Sigma",
        "_Theta;": "Theta",
        "_Xi;": "Xi",
        "_#x3C0;": "pi",
        "_PlusMinus;": "+-"
    },
    toAsciiMath = function (a) {
        return moToAsciiMath[a]
    },
    isOpenOperator = function (a) {
        return -1 != ["(", "[", "{"].indexOf(a)
    },
    isCloseOperator = function (a) {
        return -1 != [")", "]", "}"].indexOf(a)
    },
    math = {
        handle: function (a, b) {
            "parsererror" == a.children[0].localname ? b.push("presentation MathML defect") : handlerApi.handleAll(a.children, b)
        }
    },
    mi = {
        miToAsciiMath: {
            "_alpha;": "alpha",
            "_beta;": "beta",
            "_chi;": "chi",
            "_delta;": "delta",
            "_epsilon;": "epsi",
            "_eta;": "eta",
            "_gamma;": "gamma",
            "_iota;": "iota",
            "_kappa;": "kappa",
            "_lambda;": "lambda",
            "_mu;": "mu",
            "_nu;": "nu",
            "_omega;": "omega",
            "_phi;": "phi",
            "_pi;": "pi",
            "_psi;": "psi",
            "_rho;": "rho",
            "_sigma;": "sigma",
            "_tau;": "tau",
            "_theta;": "theta",
            "_upsilon;": "upsilon",
            "_xi;": "xi",
            "_zeta;": "zeta",
            "_#x3C0;": "pi"
        },
        handle: function (a, b) {
            a = a.textContent.trim();
            b.push(mi.miToAsciiMath[a] || a)
        }
    },
    mo = {
        handle: function (a, b) {
            a = a.textContent.trim();
            var c = toAsciiMath(a);
            if ("undefined" == typeof c) throw Error("Unsupported operator: " +
                a);
            b.push(c)
        }
    },
    mn = {
        handle: function (a, b) {
            b.push(a.textContent.trim())
        }
    };

function needsGrouping(a) {
    var b = a.children[0],
        c = a.children[a.children.length - 1];
    return "mo" == b.name && isOpenOperator(b.val) && "mo" == c.name && isCloseOperator(c.val) || 1 == a.children.length && "mtext" == b.name ? !1 : !0
}
var mrow = {
        handle: function (a, b) {
            var c = needsGrouping(a);
            c && b.push("(");
            handlerApi.handleAll(a.children, b);
            c && b.push(")")
        }
    },
    mfrac = {
        handle: function (a, b) {
            var c = a.children[1];
            handlerApi.handle(a.children[0], b);
            b.push("/");
            handlerApi.handle(c, b)
        }
    },
    mover = {
        handle: function (a, b) {
            handlerApi.handleAll([a.children[1], a.children[0]], b)
        }
    },
    msqrt = {
        handle: function (a, b) {
            b.push("sqrt");
            handlerApi.handleAll(a.children, b)
        }
    },
    msup = {
        handle: function (a, b) {
            var c = a.children[1];
            handlerApi.handle(a.children[0], b);
            b.push("^");
            handlerApi.handle(c,
                b)
        }
    },
    msub = {
        handle: function (a, b) {
            var c = a.children[1];
            handlerApi.handle(a.children[0], b);
            b.push("_");
            handlerApi.handle(c, b)
        }
    },
    mtext = {
        handle: function (a, b) {
            a = trim(a.val);
            b.push("text(" + a + ")")
        }
    },
    mstyle = {
        handle: function (a, b) {
            handlerApi.handleAll(a.children, b)
        }
    },
    handlers = {
        math: math.handle,
        mi: mi.handle,
        mo: mo.handle,
        mn: mn.handle,
        mfrac: mfrac.handle,
        msup: msup.handle,
        msub: msub.handle,
        mrow: mrow.handle,
        msqrt: msqrt.handle,
        mover: mover.handle,
        mstyle: mstyle.handle,
        mtext: mtext.handle
    };
"undefined" !== typeof module && (exports.PresMMLto_Ascii = PresMMLto_Ascii);
var AsciiMath = "undefined" !== typeof module ? require("./init.js") : {
        formulaPreTreatment: formulaPreTreatment,
        formula2tree: formula2tree,
        tree2serial: tree2serial,
        tree2svg: tree2svg
    },
    CabriExpression = function (a) {
        this.rawAscii = a;
        Object.defineProperty(this, "stdFormula", {
            value: AsciiMath.formulaPreTreatment(a),
            writable: !1,
            enumerable: !0,
            configurable: !1
        })
    };
CabriExpression.prototype.buildTree = function () {
    AsciiMath.formula2tree(this)
};
CabriExpression.prototype.buildSerial = function () {
    this.tree || this.buildTree();
    AsciiMath.tree2serial(this);
    return this.serial
};
CabriExpression.prototype.buildSVG = function (a, b, c) {
    a = void 0 === a ? 1 : a;
    b = void 0 === b ? "STIXGeneral" : b;
    c = void 0 === c ? "#000000" : c;
    this.tree || this.buildTree();
    AsciiMath.tree2svg(this, a, b, c);
    return this.svg
};
$jscomp.global.Object.defineProperties(CabriExpression.prototype, {
    variables: {
        configurable: !0,
        enumerable: !0,
        get: function () {
            if (!this._variables) {
                this.tree || this.buildTree();
                this._variables = [];
                for (var a in this.nb_wUnits) null === this.nb_wUnits[a] && this._variables.push(a)
            }
            return this._variables
        }
    }
});
"undefined" !== typeof module && (exports.CabriExpression = CabriExpression);