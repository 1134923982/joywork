/*!
 * ui-grid - v4.0.0 - 2016-12-09
 * Copyright (c) 2016 ; License: MIT
 */

!function () {
    "use strict";
    angular.module("ui.grid.i18n", []), angular.module("ui.grid", ["ui.grid.i18n"])
}(), function () {
    "use strict";
    angular.module("ui.grid").constant("uiGridConstants", {
        LOG_DEBUG_MESSAGES: !0,
        LOG_WARN_MESSAGES: !0,
        LOG_ERROR_MESSAGES: !0,
        CUSTOM_FILTERS: /CUSTOM_FILTERS/g,
        COL_FIELD: /COL_FIELD/g,
        MODEL_COL_FIELD: /MODEL_COL_FIELD/g,
        TOOLTIP: /title=\"TOOLTIP\"/g,
        DISPLAY_CELL_TEMPLATE: /DISPLAY_CELL_TEMPLATE/g,
        TEMPLATE_REGEXP: /<.+>/,
        FUNC_REGEXP: /(\([^)]*\))?$/,
        DOT_REGEXP: /\./g,
        APOS_REGEXP: /'/g,
        BRACKET_REGEXP: /^(.*)((?:\s*\[\s*\d+\s*\]\s*)|(?:\s*\[\s*"(?:[^"\\]|\\.)*"\s*\]\s*)|(?:\s*\[\s*'(?:[^'\\]|\\.)*'\s*\]\s*))(.*)$/,
        COL_CLASS_PREFIX: "ui-grid-col",
        ENTITY_BINDING: "$$this",
        events: {
            GRID_SCROLL: "uiGridScroll",
            COLUMN_MENU_SHOWN: "uiGridColMenuShown",
            ITEM_DRAGGING: "uiGridItemDragStart",
            COLUMN_HEADER_CLICK: "uiGridColumnHeaderClick"
        },
        keymap: {
            TAB: 9,
            STRG: 17,
            CAPSLOCK: 20,
            CTRL: 17,
            CTRLRIGHT: 18,
            CTRLR: 18,
            SHIFT: 16,
            RETURN: 13,
            ENTER: 13,
            BACKSPACE: 8,
            BCKSP: 8,
            ALT: 18,
            ALTR: 17,
            ALTRIGHT: 17,
            SPACE: 32,
            WIN: 91,
            MAC: 91,
            FN: null,
            PG_UP: 33,
            PG_DOWN: 34,
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39,
            ESC: 27,
            DEL: 46,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123
        },
        ASC: "asc",
        DESC: "desc",
        filter: {
            STARTS_WITH: 2,
            ENDS_WITH: 4,
            EXACT: 8,
            CONTAINS: 16,
            GREATER_THAN: 32,
            GREATER_THAN_OR_EQUAL: 64,
            LESS_THAN: 128,
            LESS_THAN_OR_EQUAL: 256,
            NOT_EQUAL: 512,
            SELECT: "select",
            INPUT: "input"
        },
        aggregationTypes: {sum: 2, count: 4, avg: 8, min: 16, max: 32},
        CURRENCY_SYMBOLS: ["¤", "؋", "Ar", "Ƀ", "฿", "B/.", "Br", "Bs.", "Bs.F.", "GH₵", "¢", "c", "Ch.", "₡", "C$", "D", "ден", "دج", ".د.ب", "د.ع", "JD", "د.ك", "ل.د", "дин", "د.ت", "د.م.", "د.إ", "Db", "$", "₫", "Esc", "€", "ƒ", "Ft", "FBu", "FCFA", "CFA", "Fr", "FRw", "G", "gr", "₲", "h", "₴", "₭", "Kč", "kr", "kn", "MK", "ZK", "Kz", "K", "L", "Le", "лв", "E", "lp", "M", "KM", "MT", "₥", "Nfk", "₦", "Nu.", "UM", "T$", "MOP$", "₱", "Pt.", "£", "ج.م.", "LL", "LS", "P", "Q", "q", "R", "R$", "ر.ع.", "ر.ق", "ر.س", "៛", "RM", "p", "Rf.", "₹", "₨", "SRe", "Rp", "₪", "Ksh", "Sh.So.", "USh", "S/", "SDR", "сом", "৳	", "WS$", "₮", "VT", "₩", "¥", "zł"],
        scrollDirection: {UP: "up", DOWN: "down", LEFT: "left", RIGHT: "right", NONE: "none"},
        dataChange: {ALL: "all", EDIT: "edit", ROW: "row", COLUMN: "column", OPTIONS: "options"},
        scrollbars: {NEVER: 0, ALWAYS: 1}
    })
}(), angular.module("ui.grid").directive("uiGridCell", ["$compile", "$parse", "gridUtil", "uiGridConstants", function (a, b, c, d) {
    var e = {
        priority: 0, scope: !1, require: "?^uiGrid", compile: function () {
            return {
                pre: function (b, e, f, g) {
                    function h() {
                        var a = b.col.compiledElementFn;
                        a(b, function (a, b) {
                            e.append(a)
                        })
                    }

                    if (g && b.col.compiledElementFn) h(); else if (g && !b.col.compiledElementFn) b.col.getCompiledElementFn().then(function (a) {
                        a(b, function (a, b) {
                            e.append(a)
                        })
                    }); else {
                        var i = b.col.cellTemplate.replace(d.MODEL_COL_FIELD, "row.entity." + c.preEval(b.col.field)).replace(d.COL_FIELD, "grid.getCellValue(row, col)"),
                            j = a(i)(b);
                        e.append(j)
                    }
                }, post: function (a, b, c, e) {
                    var f = a.col.getColClass(!1);
                    b.addClass(f);
                    var g, h = function (c) {
                        var d = b;
                        g && (d.removeClass(g), g = null), g = angular.isFunction(a.col.cellClass) ? a.col.cellClass(a.grid, a.row, a.col, a.rowRenderIndex, a.colRenderIndex) : a.col.cellClass, d.addClass(g)
                    };
                    a.col.cellClass && h();
                    var i = a.grid.registerDataChangeCallback(h, [d.dataChange.COLUMN, d.dataChange.EDIT]),
                        j = function (c, d) {
                            if (c !== d) {
                                (g || a.col.cellClass) && h();
                                var e = a.col.getColClass(!1);
                                e !== f && (b.removeClass(f), b.addClass(e), f = e)
                            }
                        }, k = a.$watch("row", j), l = function () {
                            i(), k()
                        };
                    a.$on("$destroy", l), b.on("$destroy", l)
                }
            }
        }
    };
    return e
}]), function () {
    angular.module("ui.grid").service("uiGridColumnMenuService", ["i18nService", "uiGridConstants", "gridUtil", function (a, b, c) {
        var d = {
            initialize: function (a, b) {
                a.grid = b.grid, b.columnMenuScope = a, a.menuShown = !1
            }, setColMenuItemWatch: function (a) {
                var b = a.$watch("col.menuItems", function (b) {
                    "undefined" != typeof b && b && angular.isArray(b) ? (b.forEach(function (b) {
                        "undefined" != typeof b.context && b.context || (b.context = {}), b.context.col = a.col
                    }), a.menuItems = a.defaultMenuItems.concat(b)) : a.menuItems = a.defaultMenuItems
                });
                a.$on("$destroy", b)
            }, sortable: function (a) {
                return a.grid.options.enableSorting && "undefined" != typeof a.col && a.col && a.col.enableSorting ? !0 : !1
            }, isActiveSort: function (a, b) {
                return "undefined" != typeof a.col && "undefined" != typeof a.col.sort && "undefined" != typeof a.col.sort.direction && a.col.sort.direction === b
            }, suppressRemoveSort: function (a) {
                return a.col && a.col.suppressRemoveSort ? !0 : !1
            }, hideable: function (a) {
                return "undefined" != typeof a.col && a.col && a.col.colDef && a.col.colDef.enableHiding === !1 ? !1 : !0
            }, getDefaultMenuItems: function (c) {
                return [{
                    title: a.getSafeText("sort.ascending"),
                    icon: "ui-grid-icon-sort-alt-up",
                    action: function (a) {
                        a.stopPropagation(), c.sortColumn(a, b.ASC)
                    },
                    shown: function () {
                        return d.sortable(c)
                    },
                    active: function () {
                        return d.isActiveSort(c, b.ASC)
                    }
                }, {
                    title: a.getSafeText("sort.descending"), icon: "ui-grid-icon-sort-alt-down", action: function (a) {
                        a.stopPropagation(), c.sortColumn(a, b.DESC)
                    }, shown: function () {
                        return d.sortable(c)
                    }, active: function () {
                        return d.isActiveSort(c, b.DESC)
                    }
                }, {
                    title: a.getSafeText("sort.remove"), icon: "ui-grid-icon-cancel", action: function (a) {
                        a.stopPropagation(), c.unsortColumn()
                    }, shown: function () {
                        return d.sortable(c) && "undefined" != typeof c.col && "undefined" != typeof c.col.sort && "undefined" != typeof c.col.sort.direction && null !== c.col.sort.direction && !d.suppressRemoveSort(c)
                    }
                }, {
                    title: a.getSafeText("column.hide"), icon: "ui-grid-icon-cancel", shown: function () {
                        return d.hideable(c)
                    }, action: function (a) {
                        a.stopPropagation(), c.hideColumn()
                    }
                }]
            }, getColumnElementPosition: function (a, b, d) {
                var e = {};
                return e.left = d[0].offsetLeft, e.top = d[0].offsetTop, e.parentLeft = d[0].offsetParent.offsetLeft, e.offset = 0, b.grid.options.offsetLeft && (e.offset = b.grid.options.offsetLeft), e.height = c.elementHeight(d, !0), e.width = c.elementWidth(d, !0), e
            }, repositionMenu: function (a, b, d, e, f) {
                var g = e[0].querySelectorAll(".ui-grid-menu"), h = c.closestElm(f, ".ui-grid-render-container"),
                    i = h.getBoundingClientRect().left - a.grid.element[0].getBoundingClientRect().left,
                    j = h.querySelectorAll(".ui-grid-viewport")[0].scrollLeft,
                    k = b.lastMenuWidth ? b.lastMenuWidth : a.lastMenuWidth ? a.lastMenuWidth : 170,
                    l = b.lastMenuPaddingRight ? b.lastMenuPaddingRight : a.lastMenuPaddingRight ? a.lastMenuPaddingRight : 10;
                if (0 !== g.length) {
                    var m = g[0].querySelectorAll(".ui-grid-menu-mid");
                    0 === m.length || angular.element(m).hasClass("ng-hide") || (k = c.elementWidth(g, !0), a.lastMenuWidth = k, b.lastMenuWidth = k, l = parseInt(c.getStyles(angular.element(g)[0]).paddingRight, 10), a.lastMenuPaddingRight = l, b.lastMenuPaddingRight = l)
                }
                var n = d.left + i - j + d.parentLeft + d.width - k + l;
                n < d.offset && (n = d.offset), e.css("left", n + "px"), e.css("top", d.top + d.height + "px")
            }
        };
        return d
    }]).directive("uiGridColumnMenu", ["$timeout", "gridUtil", "uiGridConstants", "uiGridColumnMenuService", "$document", function (a, b, c, d, e) {
        var f = {
            priority: 0,
            scope: !0,
            require: "^uiGrid",
            templateUrl: "ui-grid/uiGridColumnMenu",
            replace: !0,
            link: function (f, g, h, i) {
                d.initialize(f, i), f.defaultMenuItems = d.getDefaultMenuItems(f), f.menuItems = f.defaultMenuItems, d.setColMenuItemWatch(f), f.showMenu = function (a, b, c) {
                    f.col = a;
                    var e = d.getColumnElementPosition(f, a, b);
                    f.menuShown ? (f.colElement = b, f.colElementPosition = e, f.hideThenShow = !0, f.$broadcast("hide-menu", {originalEvent: c})) : (f.menuShown = !0, d.repositionMenu(f, a, e, g, b), f.colElement = b, f.colElementPosition = e, f.$broadcast("show-menu", {originalEvent: c}))
                }, f.hideMenu = function (a) {
                    f.menuShown = !1, a || f.$broadcast("hide-menu")
                }, f.$on("menu-hidden", function () {
                    f.hideThenShow ? (delete f.hideThenShow, d.repositionMenu(f, f.col, f.colElementPosition, g, f.colElement), f.$broadcast("show-menu"), f.menuShown = !0) : (f.hideMenu(!0), f.col && b.focus.bySelector(e, ".ui-grid-header-cell." + f.col.getColClass() + " .ui-grid-column-menu-button", f.col.grid, !1))
                }), f.$on("menu-shown", function () {
                    a(function () {
                        d.repositionMenu(f, f.col, f.colElementPosition, g, f.colElement), b.focus.bySelector(e, ".ui-grid-menu-items .ui-grid-menu-item", !0), delete f.colElementPosition, delete f.columnElement
                    }, 200)
                }), f.sortColumn = function (a, b) {
                    a.stopPropagation(), f.grid.sortColumn(f.col, b, !0).then(function () {
                        f.grid.refresh(), f.hideMenu()
                    })
                }, f.unsortColumn = function () {
                    f.col.unsort(), f.grid.refresh(), f.hideMenu()
                };
                var j = function () {
                    a(function () {
                        var a, c = function () {
                            return b.focus.byId("grid-menu", f.grid)
                        };
                        f.grid.columns.some(function (b, c) {
                            return angular.equals(b, f.col) ? (a = c, !0) : void 0
                        });
                        var d;
                        if (f.grid.columns.some(function (b, c) {
                            if (!b.visible) return !1;
                            if (a > c) d = b; else {
                                if (c > a && !d) return d = b, !0;
                                if (c > a && d) return !0
                            }
                        }), d) {
                            var g = d.getColClass();
                            b.focus.bySelector(e, ".ui-grid-header-cell." + g + " .ui-grid-header-cell-primary-focus", !0).then(angular.noop, function (a) {
                                return "canceled" !== a ? c() : void 0
                            })
                        } else c()
                    })
                };
                f.hideColumn = function () {
                    f.col.colDef.visible = !1, f.col.visible = !1, f.grid.queueGridRefresh(), f.hideMenu(), f.grid.api.core.notifyDataChange(c.dataChange.COLUMN), f.grid.api.core.raise.columnVisibilityChanged(f.col), j()
                }
            },
            controller: ["$scope", function (a) {
                var b = this;
                a.$watch("menuItems", function (a) {
                    b.menuItems = a
                })
            }]
        };
        return f
    }])
}(), function () {
    "use strict";
    angular.module("ui.grid").directive("uiGridFilter", ["$compile", "$templateCache", "i18nService", "gridUtil", function (a, b, c, d) {
        return {
            compile: function () {
                return {
                    pre: function (b, c, d, e) {
                        b.col.updateFilters = function (d) {
                            if (c.children().remove(), d) {
                                var e = b.col.filterHeaderTemplate;
                                c.append(a(e)(b))
                            }
                        }, b.$on("$destroy", function () {
                            delete b.col.updateFilters
                        })
                    }, post: function (a, b, e, f) {
                        a.aria = c.getSafeText("headerCell.aria"), a.removeFilter = function (a, c) {
                            a.term = null, d.focus.bySelector(b, ".ui-grid-filter-input-" + c)
                        }
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("ui.grid").directive("uiGridFooterCell", ["$timeout", "gridUtil", "uiGridConstants", "$compile", function (a, b, c, d) {
        var e = {
            priority: 0,
            scope: {col: "=", row: "=", renderIndex: "="},
            replace: !0,
            require: "^uiGrid",
            compile: function (a, b, e) {
                return {
                    pre: function (a, b, c, e) {
                        var f = d(a.col.footerCellTemplate)(a);
                        b.append(f)
                    }, post: function (a, b, d, e) {
                        a.grid = e.grid;
                        var f = a.col.getColClass(!1);
                        b.addClass(f);
                        var g, h = function (c) {
                            var d = b;
                            g && (d.removeClass(g), g = null), g = angular.isFunction(a.col.footerCellClass) ? a.col.footerCellClass(a.grid, a.row, a.col, a.rowRenderIndex, a.colRenderIndex) : a.col.footerCellClass, d.addClass(g)
                        };
                        a.col.footerCellClass && h(), a.col.updateAggregationValue();
                        var i = a.grid.registerDataChangeCallback(h, [c.dataChange.COLUMN]);
                        a.grid.api.core.on.rowsRendered(a, a.col.updateAggregationValue), a.grid.api.core.on.rowsRendered(a, h), a.$on("$destroy", i)
                    }
                }
            }
        };
        return e
    }])
}(), function () {
    "use strict";
    angular.module("ui.grid").directive("uiGridFooter", ["$templateCache", "$compile", "uiGridConstants", "gridUtil", "$timeout", function (a, b, c, d, e) {
        return {
            restrict: "EA",
            replace: !0,
            require: ["^uiGrid", "^uiGridRenderContainer"],
            scope: !0,
            compile: function (a, c) {
                return {
                    pre: function (a, c, e, f) {
                        var g = f[0], h = f[1];
                        a.grid = g.grid, a.colContainer = h.colContainer, h.footer = c;
                        var i = a.grid.options.footerTemplate;
                        d.getTemplate(i).then(function (d) {
                            var e = angular.element(d), f = b(e)(a);
                            if (c.append(f), h) {
                                var g = c[0].getElementsByClassName("ui-grid-footer-viewport")[0];
                                g && (h.footerViewport = g)
                            }
                        })
                    }, post: function (a, b, c, e) {
                        var f = e[0], g = e[1];
                        f.grid;
                        d.disableAnimations(b), g.footer = b;
                        var h = b[0].getElementsByClassName("ui-grid-footer-viewport")[0];
                        h && (g.footerViewport = h)
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("ui.grid").directive("uiGridGridFooter", ["$templateCache", "$compile", "uiGridConstants", "gridUtil", "$timeout", function (a, b, c, d, e) {
        return {
            restrict: "EA", replace: !0, require: "^uiGrid", scope: !0, compile: function (a, c) {
                return {
                    pre: function (a, c, e, f) {
                        a.grid = f.grid;
                        var g = a.grid.options.gridFooterTemplate;
                        d.getTemplate(g).then(function (d) {
                            var e = angular.element(d), f = b(e)(a);
                            c.append(f)
                        })
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("ui.grid").directive("uiGridGroupPanel", ["$compile", "uiGridConstants", "gridUtil", function (a, b, c) {
        var d = "ui-grid/ui-grid-group-panel";
        return {
            restrict: "EA", replace: !0, require: "?^uiGrid", scope: !1, compile: function (b, e) {
                return {
                    pre: function (b, e, f, g) {
                        var h = b.grid.options.groupPanelTemplate || d;
                        c.getTemplate(h).then(function (c) {
                            var d = angular.element(c), f = a(d)(b);
                            e.append(f)
                        })
                    }, post: function (a, b, c, d) {
                        b.bind("$destroy", function () {
                        })
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("ui.grid").directive("uiGridHeaderCell", ["$compile", "$timeout", "$window", "$document", "gridUtil", "uiGridConstants", "ScrollEvent", "i18nService", function (a, b, c, d, e, f, g, h) {
        var i = 500, j = 500, k = {
            priority: 0,
            scope: {col: "=", row: "=", renderIndex: "="},
            require: ["^uiGrid", "^uiGridRenderContainer"],
            replace: !0,
            compile: function () {
                return {
                    pre: function (b, c, d) {
                        var e = a(b.col.headerCellTemplate)(b);
                        c.append(e)
                    }, post: function (a, c, e, g) {
                        var k = g[0], l = g[1];
                        a.i18n = {
                            headerCell: h.getSafeText("headerCell"),
                            sort: h.getSafeText("sort")
                        }, a.isSortPriorityVisible = function () {
                            return angular.isNumber(a.col.sort.priority) && a.grid.columns.some(function (b, c) {
                                return angular.isNumber(b.sort.priority) && b !== a.col
                            })
                        }, a.getSortDirectionAriaLabel = function () {
                            var b = a.col,
                                c = b.sort.direction === f.ASC ? a.i18n.sort.ascending : b.sort.direction === f.DESC ? a.i18n.sort.descending : a.i18n.sort.none,
                                d = c;
                            return a.isSortPriorityVisible() && (d = d + ". " + a.i18n.headerCell.priority + " " + b.sort.priority), d
                        }, a.grid = k.grid, a.renderContainer = k.grid.renderContainers[l.containerId];
                        var m = a.col.getColClass(!1);
                        c.addClass(m), a.menuShown = !1, a.asc = f.ASC, a.desc = f.DESC;
                        var n, o,
                            p = (angular.element(c[0].querySelectorAll(".ui-grid-header-cell-menu")), angular.element(c[0].querySelectorAll(".ui-grid-cell-contents"))),
                            q = [];
                        a.downFn = function (e) {
                            e.stopPropagation(), "undefined" != typeof e.originalEvent && void 0 !== e.originalEvent && (e = e.originalEvent), e.button && 0 !== e.button || (o = e.pageX, a.mousedownStartTime = (new Date).getTime(), a.mousedownTimeout = b(function () {
                            }, i), a.mousedownTimeout.then(function () {
                                a.colMenu && k.columnMenuScope.showMenu(a.col, c, e)
                            }), k.fireEvent(f.events.COLUMN_HEADER_CLICK, {
                                event: e,
                                columnName: a.col.colDef.name
                            }), a.offAllEvents(), "touchstart" === e.type ? (d.on("touchend", a.upFn), d.on("touchmove", a.moveFn)) : "mousedown" === e.type && (d.on("mouseup", a.upFn), d.on("mousemove", a.moveFn)))
                        }, a.upFn = function (c) {
                            c.stopPropagation(), b.cancel(a.mousedownTimeout), a.offAllEvents(), a.onDownEvents(c.type);
                            var d = (new Date).getTime(), e = d - a.mousedownStartTime;
                            e > i || a.sortable && a.handleClick(c)
                        }, a.moveFn = function (c) {
                            var d = c.pageX - o;
                            0 !== d && (b.cancel(a.mousedownTimeout), a.offAllEvents(), a.onDownEvents(c.type))
                        }, a.clickFn = function (b) {
                            b.stopPropagation(), p.off("click", a.clickFn)
                        }, a.offAllEvents = function () {
                            p.off("touchstart", a.downFn), p.off("mousedown", a.downFn), d.off("touchend", a.upFn), d.off("mouseup", a.upFn), d.off("touchmove", a.moveFn), d.off("mousemove", a.moveFn), p.off("click", a.clickFn)
                        }, a.onDownEvents = function (c) {
                            switch (c) {
                                case"touchmove":
                                case"touchend":
                                    p.on("click", a.clickFn), p.on("touchstart", a.downFn), b(function () {
                                        p.on("mousedown", a.downFn)
                                    }, j);
                                    break;
                                case"mousemove":
                                case"mouseup":
                                    p.on("click", a.clickFn), p.on("mousedown", a.downFn), b(function () {
                                        p.on("touchstart", a.downFn)
                                    }, j);
                                    break;
                                default:
                                    p.on("click", a.clickFn), p.on("touchstart", a.downFn), p.on("mousedown", a.downFn)
                            }
                        };
                        var r = function (d) {
                            var e = c;
                            n && (e.removeClass(n), n = null), n = angular.isFunction(a.col.headerCellClass) ? a.col.headerCellClass(a.grid, a.row, a.col, a.rowRenderIndex, a.colRenderIndex) : a.col.headerCellClass, e.addClass(n), b(function () {
                                var b = a.grid.renderContainers.right ? a.grid.renderContainers.right : a.grid.renderContainers.body;
                                a.isLastCol = a.col === b.visibleColumnCache[b.visibleColumnCache.length - 1]
                            }), a.col.enableSorting ? a.sortable = !0 : a.sortable = !1;
                            var g = a.filterable;
                            k.grid.options.enableFiltering && a.col.enableFiltering ? a.filterable = !0 : a.filterable = !1, g !== a.filterable && ("undefined" != typeof a.col.updateFilters && a.col.updateFilters(a.filterable), a.filterable ? (a.col.filters.forEach(function (b, c) {
                                q.push(a.$watch("col.filters[" + c + "].term", function (a, b) {
                                    a !== b && (k.grid.api.core.raise.filterChanged(), k.grid.api.core.notifyDataChange(f.dataChange.COLUMN), k.grid.queueGridRefresh())
                                }))
                            }), a.$on("$destroy", function () {
                                q.forEach(function (a) {
                                    a()
                                })
                            })) : q.forEach(function (a) {
                                a()
                            })), a.col.grid.options && a.col.grid.options.enableColumnMenus !== !1 && a.col.colDef && a.col.colDef.enableColumnMenu !== !1 ? a.colMenu = !0 : a.colMenu = !1, a.offAllEvents(), (a.sortable || a.colMenu) && (a.onDownEvents(), a.$on("$destroy", function () {
                                a.offAllEvents()
                            }))
                        };
                        r();
                        var s = a.grid.registerDataChangeCallback(r, [f.dataChange.COLUMN]);
                        a.$on("$destroy", s), a.handleClick = function (b) {
                            var c = !1;
                            b.shiftKey && (c = !0), k.grid.sortColumn(a.col, c).then(function () {
                                k.columnMenuScope && k.columnMenuScope.hideMenu(), k.grid.refresh()
                            })
                        }, a.toggleMenu = function (b) {
                            b.stopPropagation(), k.columnMenuScope.menuShown && k.columnMenuScope.col === a.col ? k.columnMenuScope.hideMenu() : k.columnMenuScope.showMenu(a.col, c)
                        }
                    }
                }
            }
        };
        return k
    }])
}(), function () {
    "use strict";
    angular.module("ui.grid").directive("uiGridHeader", ["$templateCache", "$compile", "uiGridConstants", "gridUtil", "$timeout", "ScrollEvent", function (a, b, c, d, e, f) {
        var g = "ui-grid/ui-grid-header", h = "ui-grid/ui-grid-no-header";
        return {
            restrict: "EA",
            replace: !0,
            require: ["^uiGrid", "^uiGridRenderContainer"],
            scope: !0,
            compile: function (a, c) {
                return {
                    pre: function (a, c, e, i) {
                        function j() {
                            m.header = m.colContainer.header = c;
                            var a = c[0].getElementsByClassName("ui-grid-header-canvas");
                            a.length > 0 ? m.headerCanvas = m.colContainer.headerCanvas = a[0] : m.headerCanvas = null
                        }

                        function k(a) {
                            if (!l.grid.isScrollingHorizontally) {
                                var b = d.normalizeScrollLeft(m.headerViewport, l.grid),
                                    c = m.colContainer.scrollHorizontal(b),
                                    e = new f(l.grid, null, m.colContainer, f.Sources.ViewPortScroll);
                                e.newScrollLeft = b, c > -1 && (e.x = {percentage: c}), l.grid.scrollContainers(null, e)
                            }
                        }

                        var l = i[0], m = i[1];
                        a.grid = l.grid, a.colContainer = m.colContainer, j();
                        var n;
                        n = a.grid.options.showHeader ? a.grid.options.headerTemplate ? a.grid.options.headerTemplate : g : h, d.getTemplate(n).then(function (d) {
                            var e = angular.element(d), f = b(e)(a);
                            if (c.replaceWith(f), c = f, j(), m) {
                                var g = c[0].getElementsByClassName("ui-grid-header-viewport")[0];
                                g && (m.headerViewport = g, angular.element(g).on("scroll", k), a.$on("$destroy", function () {
                                    angular.element(g).off("scroll", k)
                                }))
                            }
                            a.grid.queueRefresh()
                        })
                    }, post: function (a, b, c, e) {
                        function f() {
                            var a = h.colContainer.visibleColumnCache, b = "", c = 0;
                            return a.forEach(function (a) {
                                b += a.getColClassDefinition(), c += a.drawnWidth
                            }), h.colContainer.canvasWidth = c, b
                        }

                        var g = e[0], h = e[1];
                        g.grid;
                        d.disableAnimations(b), h.header = b;
                        var i = b[0].getElementsByClassName("ui-grid-header-viewport")[0];
                        i && (h.headerViewport = i), g && g.grid.registerStyleComputation({priority: 15, func: f})
                    }
                }
            }
        }
    }])
}(), function () {
    angular.module("ui.grid").service("uiGridGridMenuService", ["gridUtil", "i18nService", "uiGridConstants", function (a, b, c) {
        var d = {
            initialize: function (a, b) {
                b.gridMenuScope = a, a.grid = b, a.registeredMenuItems = [], a.$on("$destroy", function () {
                    a.grid && a.grid.gridMenuScope && (a.grid.gridMenuScope = null), a.grid && (a.grid = null), a.registeredMenuItems && (a.registeredMenuItems = null)
                }), a.registeredMenuItems = [], b.api.registerMethod("core", "addToGridMenu", d.addToGridMenu), b.api.registerMethod("core", "removeFromGridMenu", d.removeFromGridMenu)
            }, addToGridMenu: function (b, c) {
                angular.isArray(c) ? b.gridMenuScope ? (b.gridMenuScope.registeredMenuItems = b.gridMenuScope.registeredMenuItems ? b.gridMenuScope.registeredMenuItems : [], b.gridMenuScope.registeredMenuItems = b.gridMenuScope.registeredMenuItems.concat(c)) : a.logError("Asked to addToGridMenu, but gridMenuScope not present.  Timing issue?  Please log issue with ui-grid") : a.logError("addToGridMenu: menuItems must be an array, and is not, not adding any items")
            }, removeFromGridMenu: function (b, c) {
                var d = -1;
                b && b.gridMenuScope && b.gridMenuScope.registeredMenuItems.forEach(function (b, e) {
                    b.id === c && (d > -1 ? a.logError("removeFromGridMenu: found multiple items with the same id, removing only the last") : d = e)
                }), d > -1 && b.gridMenuScope.registeredMenuItems.splice(d, 1)
            }, getMenuItems: function (c) {
                var e = [];
                c.grid.options.gridMenuCustomItems && (angular.isArray(c.grid.options.gridMenuCustomItems) ? e = e.concat(c.grid.options.gridMenuCustomItems) : a.logError("gridOptions.gridMenuCustomItems must be an array, and is not"));
                var f = [{
                    title: b.getSafeText("gridMenu.clearAllFilters"), action: function (a) {
                        c.grid.clearAllFilters()
                    }, shown: function () {
                        return c.grid.options.enableFiltering
                    }, order: 100
                }];
                return e = e.concat(f), e = e.concat(c.registeredMenuItems), c.grid.options.gridMenuShowHideColumns !== !1 && (e = e.concat(d.showHideColumns(c))), e.sort(function (a, b) {
                    return a.order - b.order
                }), e
            }, showHideColumns: function (a) {
                var c = [];
                return a.grid.options.columnDefs && 0 !== a.grid.options.columnDefs.length && 0 !== a.grid.columns.length ? (c.push({
                    title: b.getSafeText("gridMenu.columns"),
                    order: 300
                }), a.grid.options.gridMenuTitleFilter = a.grid.options.gridMenuTitleFilter ? a.grid.options.gridMenuTitleFilter : function (a) {
                    return a
                }, a.grid.options.columnDefs.forEach(function (b, e) {
                    if (b.enableHiding !== !1) {
                        var f = {
                            icon: "ui-grid-icon-ok",
                            action: function (a) {
                                a.stopPropagation(), d.toggleColumnVisibility(this.context.gridCol)
                            },
                            shown: function () {
                                return this.context.gridCol.colDef.visible === !0 || void 0 === this.context.gridCol.colDef.visible
                            },
                            context: {gridCol: a.grid.getColumn(b.name || b.field)},
                            leaveOpen: !0,
                            order: 301 + 2 * e
                        };
                        d.setMenuItemTitle(f, b, a.grid), c.push(f), f = {
                            icon: "ui-grid-icon-cancel",
                            action: function (a) {
                                a.stopPropagation(), d.toggleColumnVisibility(this.context.gridCol)
                            },
                            shown: function () {
                                return !(this.context.gridCol.colDef.visible === !0 || void 0 === this.context.gridCol.colDef.visible)
                            },
                            context: {gridCol: a.grid.getColumn(b.name || b.field)},
                            leaveOpen: !0,
                            order: 301 + 2 * e + 1
                        }, d.setMenuItemTitle(f, b, a.grid), c.push(f)
                    }
                }), c) : c
            }, setMenuItemTitle: function (b, c, d) {
                var e = d.options.gridMenuTitleFilter(c.displayName || a.readableColumnName(c.name) || c.field);
                "string" == typeof e ? b.title = e : e.then ? (b.title = "", e.then(function (a) {
                    b.title = a
                }, function (a) {
                    b.title = a
                })) : (a.logError("Expected gridMenuTitleFilter to return a string or a promise, it has returned neither, bad config"), b.title = "badconfig")
            }, toggleColumnVisibility: function (a) {
                a.colDef.visible = !(a.colDef.visible === !0 || void 0 === a.colDef.visible), a.grid.refresh(), a.grid.api.core.notifyDataChange(c.dataChange.COLUMN), a.grid.api.core.raise.columnVisibilityChanged(a)
            }
        };
        return d
    }]).directive("uiGridMenuButton", ["gridUtil", "uiGridConstants", "uiGridGridMenuService", "i18nService", function (a, b, c, d) {
        return {
            priority: 0,
            scope: !0,
            require: ["^uiGrid"],
            templateUrl: "ui-grid/ui-grid-menu-button",
            replace: !0,
            link: function (b, e, f, g) {
                var h = g[0];
                b.i18n = {aria: d.getSafeText("gridMenu.aria")}, c.initialize(b, h.grid), b.shown = !1, b.toggleMenu = function () {
                    b.shown ? (b.$broadcast("hide-menu"), b.shown = !1) : (b.menuItems = c.getMenuItems(b), b.$broadcast("show-menu"), b.shown = !0)
                }, b.$on("menu-hidden", function () {
                    b.shown = !1, a.focus.bySelector(e, ".ui-grid-icon-container")
                })
            }
        }
    }])
}(), function () {
    angular.module("ui.grid").directive("uiGridMenu", ["$compile", "$timeout", "$window", "$document", "gridUtil", "uiGridConstants", "i18nService", function (a, b, c, d, e, f, g) {
        var h = {
            priority: 0,
            scope: {menuItems: "=", autoHide: "=?"},
            require: "?^uiGrid",
            templateUrl: "ui-grid/uiGridMenu",
            replace: !1,
            link: function (a, d, h, i) {
                a.dynamicStyles = "";
                var j = function (b) {
                    var c = b - i.grid.headerHeight - 20;
                    a.dynamicStyles = [".grid" + i.grid.id + " .ui-grid-menu-mid {", "max-height: " + c + "px;", "}"].join(" ")
                };
                i && (j(i.grid.gridHeight), i.grid.api.core.on.gridDimensionChanged(a, function (a, b, c, d) {
                    j(c)
                })), a.i18n = {close: g.getSafeText("columnMenu.close")}, a.showMenu = function (c, f) {
                    a.shown ? a.shownMid || (a.shownMid = !0, a.$emit("menu-shown")) : (a.shown = !0, b(function () {
                        a.shownMid = !0, a.$emit("menu-shown")
                    }));
                    var g = "click";
                    f && f.originalEvent && f.originalEvent.type && "touchstart" === f.originalEvent.type && (g = f.originalEvent.type), angular.element(document).off("click touchstart", k), d.off("keyup", l), d.off("keydown", m), b(function () {
                        angular.element(document).on(g, k), d.on("keyup", l), d.on("keydown", m)
                    }), e.focus.bySelector(d, "button[type=button]", !0)
                }, a.hideMenu = function (c) {
                    a.shown && (a.shownMid = !1, b(function () {
                        a.shownMid || (a.shown = !1, a.$emit("menu-hidden"))
                    }, 200)), angular.element(document).off("click touchstart", k), d.off("keyup", l), d.off("keydown", m)
                }, a.$on("hide-menu", function (b, c) {
                    a.hideMenu(b, c)
                }), a.$on("show-menu", function (b, c) {
                    a.showMenu(b, c)
                });
                var k = function () {
                    a.shown && a.$apply(function () {
                        a.hideMenu()
                    })
                }, l = function (b) {
                    27 === b.keyCode && a.hideMenu()
                }, m = function (a) {
                    var b = function (b) {
                        return b.focus(), a.preventDefault(), !1
                    };
                    if (9 === a.keyCode) {
                        var c, e, f = d[0].querySelectorAll("button:not(.ng-hide)");
                        f.length > 0 && (c = f[0], e = f[f.length - 1], a.target !== e || a.shiftKey ? a.target === c && a.shiftKey && b(e) : b(c))
                    }
                };
                ("undefined" == typeof a.autoHide || void 0 === a.autoHide) && (a.autoHide = !0), a.autoHide && angular.element(c).on("resize", k), a.$on("$destroy", function () {
                    angular.element(document).off("click touchstart", k)
                }), a.$on("$destroy", function () {
                    angular.element(c).off("resize", k)
                }), i && a.$on("$destroy", i.grid.api.core.on.scrollBegin(a, k)), a.$on("$destroy", a.$on(f.events.ITEM_DRAGGING, k))
            }
        };
        return h
    }]).directive("uiGridMenuItem", ["gridUtil", "$compile", "i18nService", function (a, b, c) {
        var d = {
            priority: 0,
            scope: {
                name: "=",
                active: "=",
                action: "=",
                icon: "=",
                shown: "=",
                context: "=",
                templateUrl: "=",
                leaveOpen: "=",
                screenReaderOnly: "="
            },
            require: ["?^uiGrid"],
            templateUrl: "ui-grid/uiGridMenuItem",
            replace: !1,
            compile: function () {
                return {
                    pre: function (c, d) {
                        c.templateUrl && a.getTemplate(c.templateUrl).then(function (a) {
                            var e = angular.element(a), f = b(e)(c);
                            d.replaceWith(f)
                        })
                    }, post: function (b, d, e, f) {
                        var g = f[0];
                        ("undefined" == typeof b.shown || null === b.shown) && (b.shown = function () {
                            return !0
                        }), b.itemShown = function () {
                            var a = {};
                            return b.context && (a.context = b.context), "undefined" != typeof g && g && (a.grid = g.grid), b.shown.call(a)
                        }, b.itemAction = function (c, e) {
                            if (c.stopPropagation(), "function" == typeof b.action) {
                                var f = {};
                                b.context && (f.context = b.context), "undefined" != typeof g && g && (f.grid = g.grid), b.action.call(f, c, e), b.leaveOpen ? a.focus.bySelector(angular.element(a.closestElm(d, ".ui-grid-menu-items")), "button[type=button]", !0) : b.$emit("hide-menu")
                            }
                        }, b.i18n = c.get()
                    }
                }
            }
        };
        return d
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid");
    angular.forEach([{tag: "Src", method: "attr"}, {tag: "Text", method: "text"}, {
        tag: "Href",
        method: "attr"
    }, {tag: "Class", method: "addClass"}, {tag: "Html", method: "html"}, {tag: "Alt", method: "attr"}, {
        tag: "Style",
        method: "css"
    }, {tag: "Value", method: "attr"}, {tag: "Id", method: "attr"}, {
        tag: "Id",
        directiveName: "IdGrid",
        method: "attr",
        appendGridId: !0
    }, {tag: "Title", method: "attr"}, {tag: "Label", method: "attr", aria: !0}, {
        tag: "Labelledby",
        method: "attr",
        aria: !0
    }, {
        tag: "Labelledby",
        directiveName: "LabelledbyGrid",
        appendGridId: !0,
        method: "attr",
        aria: !0
    }, {tag: "Describedby", method: "attr", aria: !0}, {
        tag: "Describedby",
        directiveName: "DescribedbyGrid",
        appendGridId: !0,
        method: "attr",
        aria: !0
    }], function (b) {
        var c = "uiGridOneBind", d = (b.aria ? c + "Aria" : c) + (b.directiveName ? b.directiveName : b.tag);
        a.directive(d, ["gridUtil", function (a) {
            return {
                restrict: "A", require: ["?uiGrid", "?^uiGrid"], link: function (c, e, f, g) {
                    var h = function (b) {
                        var e;
                        if (c.grid) e = c.grid; else if (c.col && c.col.grid) e = c.col.grid; else if (!g.some(function (a) {
                            return a && a.grid ? (e = a.grid, !0) : void 0
                        })) throw a.logError("[" + d + "] A valid grid could not be found to bind id. Are you using this directive within the correct scope? Trying to generate id: [gridID]-" + b), new Error("No valid grid could be found");
                        if (e) {
                            var f = new RegExp(e.id.toString());
                            f.test(b) || (b = e.id.toString() + "-" + b)
                        }
                        return b
                    }, i = c.$watch(f[d], function (a) {
                        if (a) {
                            if (b.appendGridId) {
                                var c = null;
                                angular.forEach(a.split(" "), function (a) {
                                    c = (c ? c + " " : "") + h(a)
                                }), a = c
                            }
                            switch (b.method) {
                                case"attr":
                                    b.aria ? e[b.method]("aria-" + b.tag.toLowerCase(), a) : e[b.method](b.tag.toLowerCase(), a);
                                    break;
                                case"addClass":
                                    if (angular.isObject(a) && !angular.isArray(a)) {
                                        var d = [], f = !1;
                                        if (angular.forEach(a, function (a, b) {
                                            null !== a && "undefined" != typeof a && (f = !0, a && d.push(b))
                                        }), !f) return;
                                        a = d
                                    }
                                    if (!a) return;
                                    e.addClass(angular.isArray(a) ? a.join(" ") : a);
                                    break;
                                default:
                                    e[b.method](a)
                            }
                            i()
                        }
                    }, !0)
                }
            }
        }])
    })
}(), function () {
    "use strict";
    var a = angular.module("ui.grid");
    a.directive("uiGridRenderContainer", ["$timeout", "$document", "uiGridConstants", "gridUtil", "ScrollEvent", function (a, b, c, d, e) {
        return {
            replace: !0,
            transclude: !0,
            templateUrl: "ui-grid/uiGridRenderContainer",
            require: ["^uiGrid", "uiGridRenderContainer"],
            scope: {
                containerId: "=",
                rowContainerName: "=",
                colContainerName: "=",
                bindScrollHorizontal: "=",
                bindScrollVertical: "=",
                enableVerticalScrollbar: "=",
                enableHorizontalScrollbar: "="
            },
            controller: "uiGridRenderContainer as RenderContainer",
            compile: function () {
                return {
                    pre: function (a, b, c, d) {
                        var e = d[0], f = d[1], g = a.grid = e.grid;
                        if (!a.rowContainerName) throw"No row render container name specified";
                        if (!a.colContainerName) throw"No column render container name specified";
                        if (!g.renderContainers[a.rowContainerName]) throw"Row render container '" + a.rowContainerName + "' is not registered.";
                        if (!g.renderContainers[a.colContainerName]) throw"Column render container '" + a.colContainerName + "' is not registered.";
                        var h = a.rowContainer = g.renderContainers[a.rowContainerName],
                            i = a.colContainer = g.renderContainers[a.colContainerName];
                        f.containerId = a.containerId, f.rowContainer = h, f.colContainer = i
                    }, post: function (a, b, c, f) {
                        function g() {
                            var b = "", c = l.canvasWidth, d = l.getViewportWidth(), e = k.getCanvasHeight(),
                                f = k.getViewportHeight();
                            l.needsHScrollbarPlaceholder() && (f -= j.scrollbarHeight);
                            var g, i;
                            return g = i = l.getHeaderViewportWidth(), b += "\n .grid" + h.grid.id + " .ui-grid-render-container-" + a.containerId + " .ui-grid-canvas { width: " + c + "px; height: " + e + "px; }", b += "\n .grid" + h.grid.id + " .ui-grid-render-container-" + a.containerId + " .ui-grid-header-canvas { width: " + (c + j.scrollbarWidth) + "px; }", b += o.explicitHeaderCanvasHeight ? "\n .grid" + h.grid.id + " .ui-grid-render-container-" + a.containerId + " .ui-grid-header-canvas { height: " + o.explicitHeaderCanvasHeight + "px; }" : "\n .grid" + h.grid.id + " .ui-grid-render-container-" + a.containerId + " .ui-grid-header-canvas { height: inherit; }", b += "\n .grid" + h.grid.id + " .ui-grid-render-container-" + a.containerId + " .ui-grid-viewport { width: " + d + "px; height: " + f + "px; }", b += "\n .grid" + h.grid.id + " .ui-grid-render-container-" + a.containerId + " .ui-grid-header-viewport { width: " + g + "px; }", b += "\n .grid" + h.grid.id + " .ui-grid-render-container-" + a.containerId + " .ui-grid-footer-canvas { width: " + (c + j.scrollbarWidth) + "px; }", b += "\n .grid" + h.grid.id + " .ui-grid-render-container-" + a.containerId + " .ui-grid-footer-viewport { width: " + i + "px; }"
                        }

                        var h = f[0], i = f[1], j = h.grid, k = i.rowContainer, l = i.colContainer, m = null, n = null,
                            o = j.renderContainers[a.containerId];
                        b.addClass("ui-grid-render-container-" + a.containerId), d.on.mousewheel(b, function (a) {
                            var b = new e(j, k, l, e.Sources.RenderContainerMouseWheel);
                            if (0 !== a.deltaY) {
                                var c = -1 * a.deltaY * a.deltaFactor;
                                m = i.viewport[0].scrollTop, b.verticalScrollLength = k.getVerticalScrollLength();
                                var f = (m + c) / b.verticalScrollLength;
                                f >= 1 && m < b.verticalScrollLength && (i.viewport[0].scrollTop = b.verticalScrollLength), 0 > f ? f = 0 : f > 1 && (f = 1), b.y = {
                                    percentage: f,
                                    pixels: c
                                }
                            }
                            if (0 !== a.deltaX) {
                                var g = a.deltaX * a.deltaFactor;
                                n = d.normalizeScrollLeft(i.viewport, j), b.horizontalScrollLength = l.getCanvasWidth() - l.getViewportWidth();
                                var h = (n + g) / b.horizontalScrollLength;
                                0 > h ? h = 0 : h > 1 && (h = 1), b.x = {percentage: h, pixels: g}
                            }
                            0 !== a.deltaY && (b.atTop(m) || b.atBottom(m)) || 0 !== a.deltaX && (b.atLeft(n) || b.atRight(n)) || (a.preventDefault(), a.stopPropagation(), b.fireThrottledScrollingEvent("", b))
                        }), b.bind("$destroy", function () {
                            b.unbind("keydown"), ["touchstart", "touchmove", "touchend", "keydown", "wheel", "mousewheel", "DomMouseScroll", "MozMousePixelScroll"].forEach(function (a) {
                                b.unbind(a)
                            })
                        }), h.grid.registerStyleComputation({priority: 6, func: g})
                    }
                }
            }
        }
    }]), a.controller("uiGridRenderContainer", ["$scope", "gridUtil", function (a, b) {
    }])
}(), function () {
    "use strict";
    angular.module("ui.grid").directive("uiGridRow", ["gridUtil", function (a) {
        return {
            replace: !0,
            require: ["^uiGrid", "^uiGridRenderContainer"],
            scope: {row: "=uiGridRow", rowRenderIndex: "="},
            compile: function () {
                return {
                    pre: function (a, b, c, d) {
                        function e() {
                            a.row.getRowTemplateFn.then(function (c) {
                                var d = a.$new();
                                c(d, function (a, c) {
                                    h && (h.remove(), i.$destroy()), b.empty().append(a), h = a, i = d
                                })
                            })
                        }

                        var f = d[0], g = d[1];
                        f.grid;
                        a.grid = f.grid, a.colContainer = g.colContainer;
                        var h, i;
                        e(), a.$watch("row.getRowTemplateFn", function (a, b) {
                            a !== b && e()
                        })
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }])
}(), function () {
    angular.module("ui.grid").directive("uiGridStyle", ["gridUtil", "$interpolate", function (a, b) {
        return {
            link: function (a, c, d, e) {
                var f = b(c.text(), !0);
                f && a.$watch(f, function (a) {
                    c.text(a)
                })
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("ui.grid").directive("uiGridViewport", ["gridUtil", "ScrollEvent", "uiGridConstants", "$log", function (a, b, c, d) {
        return {
            replace: !0,
            scope: {},
            controllerAs: "Viewport",
            templateUrl: "ui-grid/uiGridViewport",
            require: ["^uiGrid", "^uiGridRenderContainer"],
            link: function (c, d, e, f) {
                function g(e) {
                    var f = d[0].scrollTop, g = a.normalizeScrollLeft(d, p), h = n.scrollVertical(f),
                        i = o.scrollHorizontal(g), j = new b(p, n, o, b.Sources.ViewPortScroll);
                    j.newScrollLeft = g, j.newScrollTop = f, i > -1 && (j.x = {percentage: i}), h > -1 && (j.y = {percentage: h}), p.scrollContainers(c.$parent.containerId, j)
                }

                function h(a) {
                    m.prevScrollArgs = a;
                    var b = a.getNewScrollTop(n, m.viewport);
                    d[0].scrollTop = b
                }

                function i(b) {
                    m.prevScrollArgs = b;
                    var c = b.getNewScrollLeft(o, m.viewport);
                    d[0].scrollLeft = a.denormalizeScrollLeft(m.viewport, c, p)
                }

                function j(b) {
                    var c = b.getNewScrollLeft(o, m.viewport);
                    m.headerViewport && (m.headerViewport.scrollLeft = a.denormalizeScrollLeft(m.viewport, c, p))
                }

                function k(b) {
                    var c = b.getNewScrollLeft(o, m.viewport);
                    m.footerViewport && (m.footerViewport.scrollLeft = a.denormalizeScrollLeft(m.viewport, c, p))
                }

                var l = f[0], m = f[1];
                c.containerCtrl = m;
                var n = m.rowContainer, o = m.colContainer, p = l.grid;
                c.grid = l.grid, c.rowContainer = m.rowContainer, c.colContainer = m.colContainer, m.viewport = d, p && p.options && p.options.customScroller ? p.options.customScroller(d, g) : d.on("scroll", g);
                c.$parent.bindScrollVertical && p.addVerticalScrollSync(c.$parent.containerId, h), c.$parent.bindScrollHorizontal && (p.addHorizontalScrollSync(c.$parent.containerId, i), p.addHorizontalScrollSync(c.$parent.containerId + "header", j), p.addHorizontalScrollSync(c.$parent.containerId + "footer", k))
            },
            controller: ["$scope", function (a) {
                this.rowStyle = function (b) {
                    var c = a.rowContainer, d = a.colContainer, e = {};
                    if (0 !== c.currentTopRow) {
                        var f = "translateY(" + c.currentTopRow * c.grid.options.rowHeight + "px)";
                        e.transform = f, e["-webkit-transform"] = f, e["-ms-transform"] = f
                    }
                    return 0 !== d.currentFirstColumn && (d.grid.isRTL() ? e["margin-right"] = d.columnOffset + "px" : e["margin-left"] = d.columnOffset + "px"), e
                }
            }]
        }
    }])
}(), function () {
    angular.module("ui.grid").directive("uiGridVisible", function () {
        return function (a, b, c) {
            a.$watch(c.uiGridVisible, function (a) {
                b[a ? "removeClass" : "addClass"]("ui-grid-invisible")
            })
        }
    })
}(), function () {
    "use strict";

    function a(a, b, c, d, e, f) {
        return {
            templateUrl: "ui-grid/ui-grid",
            scope: {uiGrid: "="},
            replace: !0,
            transclude: !0,
            controller: "uiGridController",
            compile: function () {
                return {
                    post: function (a, b, g, h) {
                        function i() {
                            b[0].offsetWidth <= 0 && p > q ? (setTimeout(i, o), q++) : c(k, 0, !1)
                        }

                        function j() {
                            angular.element(d).on("resize", m), b.on("$destroy", function () {
                                angular.element(d).off("resize", m)
                            }), a.$watch(function () {
                                return n.hasLeftContainer()
                            }, function (a, b) {
                                a !== b && n.refreshCanvas(!0)
                            }), a.$watch(function () {
                                return n.hasRightContainer()
                            }, function (a, b) {
                                a !== b && n.refreshCanvas(!0)
                            })
                        }

                        function k() {
                            n.gridWidth = a.gridWidth = e.elementWidth(b), n.canvasWidth = h.grid.gridWidth, n.gridHeight = a.gridHeight = e.elementHeight(b), n.gridHeight <= n.options.rowHeight && n.options.enableMinHeightCheck && l(), n.refreshCanvas(!0)
                        }

                        function l() {
                            var c = n.options.minRowsToShow * n.options.rowHeight,
                                d = n.options.showHeader ? n.options.headerRowHeight : 0, g = n.calcFooterHeight(),
                                h = 0;
                            n.options.enableHorizontalScrollbar === f.scrollbars.ALWAYS && (h = e.getScrollbarWidth());
                            var i = 0;
                            if (angular.forEach(n.options.columnDefs, function (a) {
                                a.hasOwnProperty("filter") ? 1 > i && (i = 1) : a.hasOwnProperty("filters") && i < a.filters.length && (i = a.filters.length)
                            }), n.options.enableFiltering && !i) {
                                var j = n.options.columnDefs.length && n.options.columnDefs.every(function (a) {
                                    return a.enableFiltering === !1
                                });
                                j || (i = 1)
                            }
                            var k = i * d, l = d + c + g + h + k;
                            b.css("height", l + "px"), n.gridHeight = a.gridHeight = e.elementHeight(b)
                        }

                        function m(c) {
                            n.gridWidth = a.gridWidth = e.elementWidth(b), n.gridHeight = a.gridHeight = e.elementHeight(b), n.refreshCanvas(!0)
                        }

                        var n = h.grid;
                        h.scrollbars = [], n.element = b;
                        var o = 100, p = 20, q = 0;
                        j(), k(), n.renderingComplete(), i()
                    }
                }
            }
        }
    }

    angular.module("ui.grid").controller("uiGridController", ["$scope", "$element", "$attrs", "gridUtil", "$q", "uiGridConstants", "$templateCache", "gridClassFactory", "$timeout", "$parse", "$compile", function (a, b, c, d, e, f, g, h, i, j, k) {
        function l(b, c) {
            b && b !== c && (n.grid.options.columnDefs = a.uiGrid.columnDefs, n.grid.buildColumns({orderByColumnDefs: !0}).then(function () {
                n.grid.preCompileCellTemplates(), n.grid.callDataChangeCallbacks(f.dataChange.COLUMN)
            }))
        }

        function m(b) {
            var d = [];
            if (n.grid.options.fastWatch && (b = angular.isString(a.uiGrid.data) ? n.grid.appScope[a.uiGrid.data] : a.uiGrid.data), p = b, b) {
                var g = n.grid.columns.length > (n.grid.rowHeaderColumns ? n.grid.rowHeaderColumns.length : 0);
                !g && !c.uiGridColumns && 0 === n.grid.options.columnDefs.length && b.length > 0 && n.grid.buildColumnDefsFromData(b), !g && (n.grid.options.columnDefs.length > 0 || b.length > 0) && d.push(n.grid.buildColumns().then(function () {
                    n.grid.preCompileCellTemplates()
                })), e.all(d).then(function () {
                    n.grid.modifyRows(p).then(function () {
                        n.grid.redrawInPlace(!0), a.$evalAsync(function () {
                            n.grid.refreshCanvas(!0), n.grid.callDataChangeCallbacks(f.dataChange.ROW)
                        })
                    })
                })
            }
        }

        var n = this;
        n.grid = h.createGrid(a.uiGrid), n.grid.appScope = n.grid.appScope || a.$parent, b.addClass("grid" + n.grid.id), n.grid.rtl = "rtl" === d.getStyles(b[0]).direction, a.grid = n.grid, c.uiGridColumns && c.$observe("uiGridColumns", function (a) {
            n.grid.options.columnDefs = a, n.grid.buildColumns().then(function () {
                n.grid.preCompileCellTemplates(), n.grid.refreshCanvas(!0)
            })
        });
        var o = [];
        n.grid.options.fastWatch ? (n.uiGrid = a.uiGrid, angular.isString(a.uiGrid.data) ? (o.push(a.$parent.$watch(a.uiGrid.data, m)), o.push(a.$parent.$watch(function () {
            return n.grid.appScope[a.uiGrid.data] ? n.grid.appScope[a.uiGrid.data].length : void 0
        }, m))) : (o.push(a.$parent.$watch(function () {
            return a.uiGrid.data
        }, m)), o.push(a.$parent.$watch(function () {
            return a.uiGrid.data.length
        }, function () {
            m(a.uiGrid.data)
        }))), o.push(a.$parent.$watch(function () {
            return a.uiGrid.columnDefs
        }, l)), o.push(a.$parent.$watch(function () {
            return a.uiGrid.columnDefs.length
        }, function () {
            l(a.uiGrid.columnDefs)
        }))) : (angular.isString(a.uiGrid.data) ? o.push(a.$parent.$watchCollection(a.uiGrid.data, m)) : o.push(a.$parent.$watchCollection(function () {
            return a.uiGrid.data
        }, m)), o.push(a.$parent.$watchCollection(function () {
            return a.uiGrid.columnDefs
        }, l)));
        var p, q = a.$watch(function () {
            return n.grid.styleComputations
        }, function () {
            n.grid.refreshCanvas(!0)
        });
        a.$on("$destroy", function () {
            o.forEach(function (a) {
                a()
            }), q()
        }), n.fireEvent = function (b, c) {
            ("undefined" == typeof c || void 0 === c) && (c = {}), ("undefined" == typeof c.grid || void 0 === c.grid) && (c.grid = n.grid), a.$broadcast(b, c)
        }, n.innerCompile = function (b) {
            k(b)(a)
        }
    }]), angular.module("ui.grid").directive("uiGrid", a), a.$inject = ["$compile", "$templateCache", "$timeout", "$window", "gridUtil", "uiGridConstants"]
}(), function () {
    "use strict";
    angular.module("ui.grid").directive("uiGridPinnedContainer", ["gridUtil", function (a) {
        return {
            restrict: "EA",
            replace: !0,
            template: '<div class="ui-grid-pinned-container"><div ui-grid-render-container container-id="side" row-container-name="\'body\'" col-container-name="side" bind-scroll-vertical="true" class="{{ side }} ui-grid-render-container-{{ side }}"></div></div>',
            scope: {side: "=uiGridPinnedContainer"},
            require: "^uiGrid",
            compile: function () {
                return {
                    post: function (a, b, c, d) {
                        function e() {
                            var a = this, b = 0;
                            a.visibleColumnCache.forEach(function (a) {
                                b += a.drawnWidth
                            });
                            var c = a.getViewportAdjustment();
                            return b += c.width
                        }

                        function f() {
                            if ("left" === a.side || "right" === a.side) {
                                for (var b = h.renderContainers[a.side].visibleColumnCache, c = 0, d = 0; d < b.length; d++) {
                                    var e = b[d];
                                    c += e.drawnWidth || e.width || 0
                                }
                                return c
                            }
                        }

                        function g() {
                            var c = "";
                            return ("left" === a.side || "right" === a.side) && (i = f(), b.attr("style", null), c += ".grid" + h.id + " .ui-grid-pinned-container-" + a.side + ", .grid" + h.id + " .ui-grid-pinned-container-" + a.side + " .ui-grid-render-container-" + a.side + " .ui-grid-viewport { width: " + i + "px; } "), c
                        }

                        var h = d.grid, i = 0;
                        b.addClass("ui-grid-pinned-container-" + a.side), ("left" === a.side || "right" === a.side) && (h.renderContainers[a.side].getViewportWidth = e), h.renderContainers.body.registerViewportAdjuster(function (b) {
                            return i = f(), b.width -= i, b.side = a.side, b
                        }), h.registerStyleComputation({priority: 15, func: g})
                    }
                }
            }
        }
    }])
}(), function () {
    angular.module("ui.grid").factory("Grid", ["$q", "$compile", "$parse", "gridUtil", "uiGridConstants", "GridOptions", "GridColumn", "GridRow", "GridApi", "rowSorter", "rowSearcher", "GridRenderContainer", "$timeout", "ScrollEvent", function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
        function o() {
        }

        var p = function (a) {
            function b(a) {
                g.isScrollingVertically = !1, g.api.core.raise.scrollEnd(a), g.scrollDirection = e.scrollDirection.NONE
            }

            function c(a) {
                g.isScrollingHorizontally = !1, g.api.core.raise.scrollEnd(a), g.scrollDirection = e.scrollDirection.NONE
            }

            var g = this;
            if (void 0 === a || "undefined" == typeof a.id || !a.id) throw new Error("No ID provided. An ID must be given when creating a grid.");
            if (!/^[_a-zA-Z0-9-]+$/.test(a.id)) throw new Error("Grid id '" + a.id + '" is invalid. It must follow CSS selector syntax rules.');
            g.id = a.id, delete a.id, g.options = f.initialize(a), g.appScope = g.options.appScopeProvider, g.headerHeight = g.options.headerRowHeight, g.footerHeight = g.calcFooterHeight(), g.columnFooterHeight = g.calcColumnFooterHeight(), g.rtl = !1, g.gridHeight = 0, g.gridWidth = 0, g.columnBuilders = [], g.rowBuilders = [], g.rowsProcessors = [], g.columnsProcessors = [], g.styleComputations = [], g.viewportAdjusters = [], g.rowHeaderColumns = [], g.dataChangeCallbacks = {}, g.verticalScrollSyncCallBackFns = {}, g.horizontalScrollSyncCallBackFns = {}, g.renderContainers = {}, g.renderContainers.body = new l("body", g), g.cellValueGetterCache = {}, g.getRowTemplateFn = null, g.rows = [], g.columns = [], g.isScrollingVertically = !1, g.isScrollingHorizontally = !1, g.scrollDirection = e.scrollDirection.NONE, g.disableScrolling = !1;
            var h = d.debounce(b, g.options.scrollDebounce), k = d.debounce(b, 0),
                m = d.debounce(c, g.options.scrollDebounce), n = d.debounce(c, 0);
            g.flagScrollingVertically = function (a) {
                g.isScrollingVertically || g.isScrollingHorizontally || g.api.core.raise.scrollBegin(a), g.isScrollingVertically = !0, 0 !== g.options.scrollDebounce && a.withDelay ? h(a) : k(a)
            }, g.flagScrollingHorizontally = function (a) {
                g.isScrollingVertically || g.isScrollingHorizontally || g.api.core.raise.scrollBegin(a), g.isScrollingHorizontally = !0, 0 !== g.options.scrollDebounce && a.withDelay ? m(a) : n(a)
            }, g.scrollbarHeight = 0, g.scrollbarWidth = 0, g.options.enableHorizontalScrollbar === e.scrollbars.ALWAYS && (g.scrollbarHeight = d.getScrollbarWidth()), g.options.enableVerticalScrollbar === e.scrollbars.ALWAYS && (g.scrollbarWidth = d.getScrollbarWidth()), g.api = new i(g), g.api.registerMethod("core", "refresh", this.refresh), g.api.registerMethod("core", "queueGridRefresh", this.queueGridRefresh), g.api.registerMethod("core", "refreshRows", this.refreshRows), g.api.registerMethod("core", "queueRefresh", this.queueRefresh), g.api.registerMethod("core", "handleWindowResize", this.handleWindowResize), g.api.registerMethod("core", "addRowHeaderColumn", this.addRowHeaderColumn), g.api.registerMethod("core", "scrollToIfNecessary", function (a, b) {
                return g.scrollToIfNecessary(a, b)
            }), g.api.registerMethod("core", "scrollTo", function (a, b) {
                return g.scrollTo(a, b)
            }), g.api.registerMethod("core", "registerRowsProcessor", this.registerRowsProcessor), g.api.registerMethod("core", "registerColumnsProcessor", this.registerColumnsProcessor), g.api.registerMethod("core", "sortHandleNulls", j.handleNulls), g.api.registerEvent("core", "sortChanged"), g.api.registerEvent("core", "columnVisibilityChanged"), g.api.registerMethod("core", "notifyDataChange", this.notifyDataChange), g.api.registerMethod("core", "clearAllFilters", this.clearAllFilters), g.registerDataChangeCallback(g.columnRefreshCallback, [e.dataChange.COLUMN]), g.registerDataChangeCallback(g.processRowsCallback, [e.dataChange.EDIT]), g.registerDataChangeCallback(g.updateFooterHeightCallback, [e.dataChange.OPTIONS]), g.registerStyleComputation({
                priority: 10,
                func: g.getFooterStyles
            })
        };
        p.prototype.calcFooterHeight = function () {
            if (!this.hasFooter()) return 0;
            var a = 0;
            return this.options.showGridFooter && (a += this.options.gridFooterHeight), a += this.calcColumnFooterHeight()
        }, p.prototype.calcColumnFooterHeight = function () {
            var a = 0;
            return this.options.showColumnFooter && (a += this.options.columnFooterHeight), a
        }, p.prototype.getFooterStyles = function () {
            var a = ".grid" + this.id + " .ui-grid-footer-aggregates-row { height: " + this.options.columnFooterHeight + "px; }";
            return a += " .grid" + this.id + " .ui-grid-footer-info { height: " + this.options.gridFooterHeight + "px; }"
        }, p.prototype.hasFooter = function () {
            return this.options.showGridFooter || this.options.showColumnFooter
        }, p.prototype.isRTL = function () {
            return this.rtl
        }, p.prototype.registerColumnBuilder = function (a) {
            this.columnBuilders.push(a)
        }, p.prototype.buildColumnDefsFromData = function (a) {
            this.options.columnDefs = d.getColumnsFromData(a, this.options.excludeProperties)
        }, p.prototype.registerRowBuilder = function (a) {
            this.rowBuilders.push(a)
        }, p.prototype.registerDataChangeCallback = function (a, b, c) {
            var f = d.nextUid();
            b || (b = [e.dataChange.ALL]), Array.isArray(b) || d.logError("Expected types to be an array or null in registerDataChangeCallback, value passed was: " + b), this.dataChangeCallbacks[f] = {
                callback: a,
                types: b,
                _this: c
            };
            var g = this, h = function () {
                delete g.dataChangeCallbacks[f]
            };
            return h
        }, p.prototype.callDataChangeCallbacks = function (a, b) {
            angular.forEach(this.dataChangeCallbacks, function (b, c) {
                (-1 !== b.types.indexOf(e.dataChange.ALL) || -1 !== b.types.indexOf(a) || a === e.dataChange.ALL) && (b._this ? b.callback.apply(b._this, this) : b.callback(this))
            }, this)
        }, p.prototype.notifyDataChange = function (a) {
            var b = e.dataChange;
            a === b.ALL || a === b.COLUMN || a === b.EDIT || a === b.ROW || a === b.OPTIONS ? this.callDataChangeCallbacks(a) : d.logError("Notified of a data change, but the type was not recognised, so no action taken, type was: " + a)
        }, p.prototype.columnRefreshCallback = function (a) {
            a.buildColumns(), a.queueGridRefresh()
        }, p.prototype.processRowsCallback = function (a) {
            a.queueGridRefresh()
        }, p.prototype.updateFooterHeightCallback = function (a) {
            a.footerHeight = a.calcFooterHeight(), a.columnFooterHeight = a.calcColumnFooterHeight()
        }, p.prototype.getColumn = function (a) {
            var b = this.columns.filter(function (b) {
                return b.colDef.name === a
            });
            return b.length > 0 ? b[0] : null
        }, p.prototype.getColDef = function (a) {
            var b = this.options.columnDefs.filter(function (b) {
                return b.name === a
            });
            return b.length > 0 ? b[0] : null
        }, p.prototype.assignTypes = function () {
            var a = this;
            a.options.columnDefs.forEach(function (b, c) {
                if (!b.type) {
                    var e = new g(b, c, a), f = a.rows.length > 0 ? a.rows[0] : null;
                    f ? b.type = d.guessType(a.getCellValue(f, e)) : b.type = "string"
                }
            })
        }, p.prototype.isRowHeaderColumn = function (a) {
            return -1 !== this.rowHeaderColumns.indexOf(a)
        }, p.prototype.addRowHeaderColumn = function (a, b) {
            var c = this;
            void 0 === b && (b = 0);
            var e = new g(a, d.nextUid(), c);
            e.isRowHeader = !0, c.isRTL() ? (c.createRightContainer(), e.renderContainer = "right") : (c.createLeftContainer(), e.renderContainer = "left"), c.columnBuilders[0](a, e, c.options).then(function () {
                e.enableFiltering = !1, e.enableSorting = !1, e.enableHiding = !1, e.headerPriority = b, c.rowHeaderColumns.push(e), c.rowHeaderColumns = c.rowHeaderColumns.sort(function (a, b) {
                    return a.headerPriority - b.headerPriority
                }), c.buildColumns().then(function () {
                    c.preCompileCellTemplates(), c.queueGridRefresh()
                })
            })
        }, p.prototype.getOnlyDataColumns = function () {
            var a = this, b = [];
            return a.columns.forEach(function (c) {
                -1 === a.rowHeaderColumns.indexOf(c) && b.push(c)
            }), b
        }, p.prototype.buildColumns = function (b) {
            var c = {orderByColumnDefs: !1};
            angular.extend(c, b);
            var e, f = this, h = [], i = f.rowHeaderColumns.length;
            for (e = 0; e < f.columns.length; e++) f.getColDef(f.columns[e].name) || (f.columns.splice(e, 1), e--);
            for (var j = f.rowHeaderColumns.length - 1; j >= 0; j--) f.columns.unshift(f.rowHeaderColumns[j]);
            if (f.options.columnDefs.forEach(function (a, b) {
                f.preprocessColDef(a);
                var c = f.getColumn(a.name);
                c ? c.updateColumnDef(a, !1) : (c = new g(a, d.nextUid(), f), f.columns.splice(b + i, 0, c)), f.columnBuilders.forEach(function (b) {
                    h.push(b.call(f, a, c, f.options))
                })
            }), c.orderByColumnDefs) {
                var k = f.columns.slice(0), l = Math.min(f.options.columnDefs.length, f.columns.length);
                for (e = 0; l > e; e++) f.columns[e + i].name !== f.options.columnDefs[e].name ? k[e + i] = f.getColumn(f.options.columnDefs[e].name) : k[e + i] = f.columns[e + i];
                f.columns.length = 0, Array.prototype.splice.apply(f.columns, [0, 0].concat(k))
            }
            return a.all(h).then(function () {
                f.rows.length > 0 && f.assignTypes()
            })
        }, p.prototype.preCompileCellTemplate = function (a) {
            var c = this, d = a.cellTemplate.replace(e.MODEL_COL_FIELD, c.getQualifiedColField(a));
            d = d.replace(e.COL_FIELD, "grid.getCellValue(row, col)");
            var f = b(d);
            a.compiledElementFn = f, a.compiledElementFnDefer && a.compiledElementFnDefer.resolve(a.compiledElementFn)
        }, p.prototype.preCompileCellTemplates = function () {
            var a = this;
            a.columns.forEach(function (b) {
                b.cellTemplate ? a.preCompileCellTemplate(b) : b.cellTemplatePromise && b.cellTemplatePromise.then(function () {
                    a.preCompileCellTemplate(b)
                })
            })
        }, p.prototype.getQualifiedColField = function (a) {
            var b = "row.entity";
            return a.field === e.ENTITY_BINDING ? b : d.preEval(b + "." + a.field)
        }, p.prototype.createLeftContainer = function () {
            this.hasLeftContainer() || (this.renderContainers.left = new l("left", this, {disableColumnOffset: !0}))
        }, p.prototype.createRightContainer = function () {
            this.hasRightContainer() || (this.renderContainers.right = new l("right", this, {disableColumnOffset: !0}))
        }, p.prototype.hasLeftContainer = function () {
            return void 0 !== this.renderContainers.left
        }, p.prototype.hasRightContainer = function () {
            return void 0 !== this.renderContainers.right
        }, p.prototype.preprocessColDef = function (a) {
            var b = this;
            if (!a.field && !a.name) throw new Error("colDef.name or colDef.field property is required");
            if (void 0 === a.name && void 0 !== a.field) {
                for (var c = a.field, d = 2; b.getColumn(c);) c = a.field + d.toString(), d++;
                a.name = c
            }
        }, p.prototype.newInN = function (a, b, c, d) {
            for (var e = this, f = [], g = 0; g < b.length; g++) {
                for (var h = d ? b[g][d] : b[g], i = !1, j = 0; j < a.length; j++) {
                    var k = c ? a[j][c] : a[j];
                    if (e.options.rowEquality(h, k)) {
                        i = !0;
                        break
                    }
                }
                i || f.push(h)
            }
            return f
        }, p.prototype.getRow = function (a, b) {
            var c = this;
            b = "undefined" == typeof b ? c.rows : b;
            var d = b.filter(function (b) {
                return c.options.rowEquality(b.entity, a)
            });
            return d.length > 0 ? d[0] : null
        }, p.prototype.modifyRows = function (b) {
            var c = this, d = c.rows.slice(0), e = c.rowHashMap || c.createRowHashMap();
            c.rowHashMap = c.createRowHashMap(), c.rows.length = 0, b.forEach(function (a, b) {
                var f;
                f = c.options.enableRowHashing ? e.get(a) : c.getRow(a, d), f || (f = c.processRowBuilders(new h(a, b, c))), c.rows.push(f), c.rowHashMap.put(a, f)
            }), c.assignTypes();
            var f = a.when(c.processRowsProcessors(c.rows)).then(function (a) {
                return c.setVisibleRows(a)
            }), g = a.when(c.processColumnsProcessors(c.columns)).then(function (a) {
                return c.setVisibleColumns(a)
            });
            return a.all([f, g])
        }, p.prototype.addRows = function (a) {
            for (var b = this, c = b.rows.length, d = 0; d < a.length; d++) {
                var e = b.processRowBuilders(new h(a[d], d + c, b));
                if (b.options.enableRowHashing) {
                    var f = b.rowHashMap.get(e.entity);
                    f && (f.row = e)
                }
                b.rows.push(e)
            }
        }, p.prototype.processRowBuilders = function (a) {
            var b = this;
            return b.rowBuilders.forEach(function (c) {
                c.call(b, a, b.options)
            }), a
        }, p.prototype.registerStyleComputation = function (a) {
            this.styleComputations.push(a)
        }, p.prototype.registerRowsProcessor = function (a, b) {
            if (!angular.isFunction(a)) throw"Attempt to register non-function rows processor: " + a;
            this.rowsProcessors.push({processor: a, priority: b}), this.rowsProcessors.sort(function (a, b) {
                return a.priority - b.priority
            })
        }, p.prototype.removeRowsProcessor = function (a) {
            var b = -1;
            this.rowsProcessors.forEach(function (c, d) {
                c.processor === a && (b = d)
            }), -1 !== b && this.rowsProcessors.splice(b, 1)
        }, p.prototype.processRowsProcessors = function (b) {
            function c(b, e) {
                var g = d.rowsProcessors[b].processor;
                return a.when(g.call(d, e, d.columns)).then(function (a) {
                    if (!a) throw"Processor at index " + b + " did not return a set of renderable rows";
                    if (!angular.isArray(a)) throw"Processor at index " + b + " did not return an array";
                    return b++, b <= d.rowsProcessors.length - 1 ? c(b, a) : void f.resolve(a)
                })
            }

            var d = this, e = b.slice(0);
            if (0 === d.rowsProcessors.length) return a.when(e);
            var f = a.defer();
            return c(0, e), f.promise
        }, p.prototype.setVisibleRows = function (a) {
            var b = this;
            for (var c in b.renderContainers) {
                var d = b.renderContainers[c];
                d.canvasHeightShouldUpdate = !0, "undefined" == typeof d.visibleRowCache ? d.visibleRowCache = [] : d.visibleRowCache.length = 0
            }
            for (var e = 0; e < a.length; e++) {
                var f = a[e],
                    g = "undefined" != typeof f.renderContainer && f.renderContainer ? f.renderContainer : "body";
                f.visible && b.renderContainers[g].visibleRowCache.push(f)
            }
            b.api.core.raise.rowsVisibleChanged(this.api), b.api.core.raise.rowsRendered(this.api)
        }, p.prototype.registerColumnsProcessor = function (a, b) {
            if (!angular.isFunction(a)) throw"Attempt to register non-function rows processor: " + a;
            this.columnsProcessors.push({processor: a, priority: b}), this.columnsProcessors.sort(function (a, b) {
                return a.priority - b.priority
            })
        }, p.prototype.removeColumnsProcessor = function (a) {
            var b = this.columnsProcessors.indexOf(a);
            "undefined" != typeof b && void 0 !== b && this.columnsProcessors.splice(b, 1)
        }, p.prototype.processColumnsProcessors = function (b) {
            function c(b, g) {
                var h = d.columnsProcessors[b].processor;
                return a.when(h.call(d, g, d.rows)).then(function (a) {
                    if (!a) throw"Processor at index " + b + " did not return a set of renderable rows";
                    if (!angular.isArray(a)) throw"Processor at index " + b + " did not return an array";
                    return b++, b <= d.columnsProcessors.length - 1 ? c(b, e) : void f.resolve(e)
                })
            }

            var d = this, e = b.slice(0);
            if (0 === d.columnsProcessors.length) return a.when(e);
            var f = a.defer();
            return c(0, e), f.promise
        }, p.prototype.setVisibleColumns = function (a) {
            var b = this;
            for (var c in b.renderContainers) {
                var d = b.renderContainers[c];
                d.visibleColumnCache.length = 0
            }
            for (var e = 0; e < a.length; e++) {
                var f = a[e];
                f.visible && ("undefined" != typeof f.renderContainer && f.renderContainer ? b.renderContainers[f.renderContainer].visibleColumnCache.push(f) : b.renderContainers.body.visibleColumnCache.push(f))
            }
        }, p.prototype.handleWindowResize = function (a) {
            var b = this;
            return b.gridWidth = d.elementWidth(b.element), b.gridHeight = d.elementHeight(b.element), b.queueRefresh()
        }, p.prototype.queueRefresh = function () {
            var a = this;
            return a.refreshCanceller && m.cancel(a.refreshCanceller), a.refreshCanceller = m(function () {
                a.refreshCanvas(!0)
            }), a.refreshCanceller.then(function () {
                a.refreshCanceller = null
            }), a.refreshCanceller
        }, p.prototype.queueGridRefresh = function () {
            var a = this;
            return a.gridRefreshCanceller && m.cancel(a.gridRefreshCanceller), a.gridRefreshCanceller = m(function () {
                a.refresh(!0)
            }), a.gridRefreshCanceller.then(function () {
                a.gridRefreshCanceller = null
            }), a.gridRefreshCanceller
        }, p.prototype.updateCanvasHeight = function () {
            var a = this;
            for (var b in a.renderContainers) if (a.renderContainers.hasOwnProperty(b)) {
                var c = a.renderContainers[b];
                c.canvasHeightShouldUpdate = !0
            }
        }, p.prototype.buildStyles = function () {
            var a = this;
            a.customStyles = "", a.styleComputations.sort(function (a, b) {
                return null === a.priority ? 1 : null === b.priority ? -1 : null === a.priority && null === b.priority ? 0 : a.priority - b.priority
            }).forEach(function (b) {
                var c = b.func.call(a);
                angular.isString(c) && (a.customStyles += "\n" + c)
            })
        }, p.prototype.minColumnsToRender = function () {
            var a = this, b = this.getViewportWidth(), c = 0, d = 0;
            return a.columns.forEach(function (e, f) {
                if (b > d) d += e.drawnWidth, c++; else {
                    for (var g = 0, h = f; h >= f - c; h--) g += a.columns[h].drawnWidth;
                    b > g && c++
                }
            }), c
        }, p.prototype.getBodyHeight = function () {
            var a = this.getViewportHeight();
            return a
        }, p.prototype.getViewportHeight = function () {
            var a = this, b = this.gridHeight - this.headerHeight - this.footerHeight, c = a.getViewportAdjustment();
            return b += c.height
        }, p.prototype.getViewportWidth = function () {
            var a = this, b = this.gridWidth, c = a.getViewportAdjustment();
            return b += c.width
        }, p.prototype.getHeaderViewportWidth = function () {
            var a = this.getViewportWidth();
            return a
        }, p.prototype.addVerticalScrollSync = function (a, b) {
            this.verticalScrollSyncCallBackFns[a] = b
        }, p.prototype.addHorizontalScrollSync = function (a, b) {
            this.horizontalScrollSyncCallBackFns[a] = b
        }, p.prototype.scrollContainers = function (a, b) {
            if (b.y) {
                var c = ["body", "left", "right"];
                this.flagScrollingVertically(b), "body" === a ? c = ["left", "right"] : "left" === a ? c = ["body", "right"] : "right" === a && (c = ["body", "left"]);
                for (var d = 0; d < c.length; d++) {
                    var e = c[d];
                    this.verticalScrollSyncCallBackFns[e] && this.verticalScrollSyncCallBackFns[e](b)
                }
            }
            if (b.x) {
                var f = ["body", "bodyheader", "bodyfooter"];
                this.flagScrollingHorizontally(b), "body" === a && (f = ["bodyheader", "bodyfooter"]);
                for (var g = 0; g < f.length; g++) {
                    var h = f[g];
                    this.horizontalScrollSyncCallBackFns[h] && this.horizontalScrollSyncCallBackFns[h](b)
                }
            }
        }, p.prototype.registerViewportAdjuster = function (a) {
            this.viewportAdjusters.push(a)
        }, p.prototype.removeViewportAdjuster = function (a) {
            var b = this.viewportAdjusters.indexOf(a);
            "undefined" != typeof b && void 0 !== b && this.viewportAdjusters.splice(b, 1)
        }, p.prototype.getViewportAdjustment = function () {
            var a = this, b = {height: 0, width: 0};
            return a.viewportAdjusters.forEach(function (a) {
                b = a.call(this, b)
            }), b
        }, p.prototype.getVisibleRowCount = function () {
            return this.renderContainers.body.visibleRowCache.length
        }, p.prototype.getVisibleRows = function () {
            return this.renderContainers.body.visibleRowCache
        }, p.prototype.getVisibleColumnCount = function () {
            return this.renderContainers.body.visibleColumnCache.length
        }, p.prototype.searchRows = function (a) {
            return k.search(this, a, this.columns)
        }, p.prototype.sortByColumn = function (a) {
            return j.sort(this, a, this.columns)
        }, p.prototype.getCellValue = function (a, b) {
            return "undefined" != typeof a.entity["$$" + b.uid] ? a.entity["$$" + b.uid].rendered : this.options.flatEntityAccess && "undefined" != typeof b.field ? a.entity[b.field] : (b.cellValueGetterCache || (b.cellValueGetterCache = c(a.getEntityQualifiedColField(b))), b.cellValueGetterCache(a))
        }, p.prototype.getCellDisplayValue = function (a, b) {
            if (!b.cellDisplayGetterCache) {
                var d = b.cellFilter ? " | " + b.cellFilter : "";
                "undefined" != typeof a.entity["$$" + b.uid] ? b.cellDisplayGetterCache = c(a.entity["$$" + b.uid].rendered + d) : this.options.flatEntityAccess && "undefined" != typeof b.field ? b.cellDisplayGetterCache = c(a.entity[b.field] + d) : b.cellDisplayGetterCache = c(a.getEntityQualifiedColField(b) + d)
            }
            return b.cellDisplayGetterCache(a)
        }, p.prototype.getNextColumnSortPriority = function () {
            var a = this, b = 0;
            return a.columns.forEach(function (a) {
                a.sort && void 0 !== a.sort.priority && a.sort.priority >= b && (b = a.sort.priority + 1)
            }), b
        }, p.prototype.resetColumnSorting = function (a) {
            var b = this;
            b.columns.forEach(function (b) {
                b === a || b.suppressRemoveSort || (b.sort = {})
            })
        }, p.prototype.getColumnSorting = function () {
            var a, b = this, c = [];
            return a = b.columns.slice(0), a.sort(j.prioritySort).forEach(function (a) {
                a.sort && "undefined" != typeof a.sort.direction && a.sort.direction && (a.sort.direction === e.ASC || a.sort.direction === e.DESC) && c.push(a)
            }), c
        }, p.prototype.sortColumn = function (b, c, d) {
            var e = this, f = null;
            if ("undefined" == typeof b || !b) throw new Error("No column parameter provided");
            if ("boolean" == typeof c ? d = c : f = c, d ? void 0 === b.sort.priority && (b.sort.priority = e.getNextColumnSortPriority()) : (e.resetColumnSorting(b), b.sort.priority = void 0, b.sort.priority = e.getNextColumnSortPriority()), f) b.sort.direction = f; else {
                var g = b.sortDirectionCycle.indexOf(b.sort.direction ? b.sort.direction : null);
                g = (g + 1) % b.sortDirectionCycle.length, b.colDef && b.suppressRemoveSort && !b.sortDirectionCycle[g] && (g = (g + 1) % b.sortDirectionCycle.length), b.sortDirectionCycle[g] ? b.sort.direction = b.sortDirectionCycle[g] : q(b, e)
            }
            return e.api.core.raise.sortChanged(e, e.getColumnSorting()), a.when(b)
        };
        var q = function (a, b) {
            b.columns.forEach(function (b) {
                b.sort && void 0 !== b.sort.priority && b.sort.priority > a.sort.priority && (b.sort.priority -= 1)
            }), a.sort = {}
        };
        return p.prototype.renderingComplete = function () {
            angular.isFunction(this.options.onRegisterApi) && this.options.onRegisterApi(this.api), this.api.core.raise.renderingComplete(this.api)
        }, p.prototype.createRowHashMap = function () {
            var a = this, b = new o;
            return b.grid = a, b
        }, p.prototype.refresh = function (b) {
            var c = this, d = c.processRowsProcessors(c.rows).then(function (a) {
                c.setVisibleRows(a)
            }), e = c.processColumnsProcessors(c.columns).then(function (a) {
                c.setVisibleColumns(a)
            });
            return a.all([d, e]).then(function () {
                c.redrawInPlace(b), c.refreshCanvas(!0)
            })
        }, p.prototype.refreshRows = function () {
            var a = this;
            return a.processRowsProcessors(a.rows).then(function (b) {
                a.setVisibleRows(b), a.redrawInPlace(), a.refreshCanvas(!0)
            })
        }, p.prototype.refreshCanvas = function (b) {
            var c = this;
            b && c.buildStyles();
            var e = a.defer(), f = [];
            for (var g in c.renderContainers) if (c.renderContainers.hasOwnProperty(g)) {
                var h = c.renderContainers[g];
                if (null === h.canvasWidth || isNaN(h.canvasWidth)) continue;
                (h.header || h.headerCanvas) && (h.explicitHeaderHeight = h.explicitHeaderHeight || null, h.explicitHeaderCanvasHeight = h.explicitHeaderCanvasHeight || null, f.push(h))
            }
            return f.length > 0 ? (b && c.buildStyles(), m(function () {
                var a, g, h = !1, i = 0, j = 0, k = function (a, b) {
                    return a !== b && (h = !0), b
                };
                for (a = 0; a < f.length; a++) if (g = f[a], null !== g.canvasWidth && !isNaN(g.canvasWidth)) {
                    if (g.header) {
                        var l = g.headerHeight = k(g.headerHeight, parseInt(d.outerElementHeight(g.header), 10)),
                            m = d.getBorderSize(g.header, "top"), n = d.getBorderSize(g.header, "bottom"),
                            o = parseInt(l - m - n, 10);
                        o = 0 > o ? 0 : o, g.innerHeaderHeight = o, !g.explicitHeaderHeight && o > i && (i = o)
                    }
                    if (g.headerCanvas) {
                        var p = g.headerCanvasHeight = k(g.headerCanvasHeight, parseInt(d.outerElementHeight(g.headerCanvas), 10));
                        !g.explicitHeaderCanvasHeight && p > j && (j = p)
                    }
                }
                for (a = 0; a < f.length; a++) g = f[a], i > 0 && "undefined" != typeof g.headerHeight && null !== g.headerHeight && (g.explicitHeaderHeight || g.headerHeight < i) && (g.explicitHeaderHeight = k(g.explicitHeaderHeight, i)), j > 0 && "undefined" != typeof g.headerCanvasHeight && null !== g.headerCanvasHeight && (g.explicitHeaderCanvasHeight || g.headerCanvasHeight < j) && (g.explicitHeaderCanvasHeight = k(g.explicitHeaderCanvasHeight, j));
                b && h && c.buildStyles(), e.resolve()
            }, 0, !1)) : m(function () {
                e.resolve()
            }, 0, !1), e.promise
        }, p.prototype.redrawInPlace = function (a) {
            var b = this;
            for (var c in b.renderContainers) {
                var d = b.renderContainers[c];
                a ? (d.adjustRows(d.prevScrollTop, null), d.adjustColumns(d.prevScrollLeft, null)) : (d.adjustRows(null, d.prevScrolltopPercentage), d.adjustColumns(null, d.prevScrollleftPercentage))
            }
        }, p.prototype.hasLeftContainerColumns = function () {
            return this.hasLeftContainer() && this.renderContainers.left.renderedColumns.length > 0
        }, p.prototype.hasRightContainerColumns = function () {
            return this.hasRightContainer() && this.renderContainers.right.renderedColumns.length > 0
        }, p.prototype.scrollToIfNecessary = function (b, c) {
            var d = this, e = new n(d, "uiGrid.scrollToIfNecessary"), f = d.renderContainers.body.visibleRowCache,
                g = d.renderContainers.body.visibleColumnCache,
                h = d.renderContainers.body.prevScrollTop + d.headerHeight;
            h = 0 > h ? 0 : h;
            var i = d.renderContainers.body.prevScrollLeft,
                j = d.renderContainers.body.prevScrollTop + d.gridHeight - d.renderContainers.body.headerHeight - d.footerHeight - d.scrollbarWidth,
                k = d.renderContainers.body.prevScrollLeft + Math.ceil(d.renderContainers.body.getViewportWidth());
            if (null !== b) {
                var l = f.indexOf(b),
                    m = d.renderContainers.body.getCanvasHeight() - d.renderContainers.body.getViewportHeight(),
                    o = l * d.options.rowHeight + d.headerHeight;
                o = 0 > o ? 0 : o;
                var p, q;
                h > o ? (p = d.renderContainers.body.prevScrollTop - (h - o), q = p / m, e.y = {percentage: q}) : o > j && (p = o - j + d.renderContainers.body.prevScrollTop, q = p / m, e.y = {percentage: q})
            }
            if (null !== c) {
                for (var r = g.indexOf(c), s = d.renderContainers.body.getCanvasWidth() - d.renderContainers.body.getViewportWidth(), t = 0, u = 0; r > u; u++) {
                    var v = g[u];
                    t += v.drawnWidth
                }
                t = 0 > t ? 0 : t;
                var w = t + c.drawnWidth;
                w = 0 > w ? 0 : w;
                var x, y;
                i > t ? (x = d.renderContainers.body.prevScrollLeft - (i - t), y = x / s, y = y > 1 ? 1 : y, e.x = {percentage: y}) : w > k && (x = w - k + d.renderContainers.body.prevScrollLeft, y = x / s, y = y > 1 ? 1 : y, e.x = {percentage: y})
            }
            var z = a.defer();
            if (e.y || e.x) {
                e.withDelay = !1, d.scrollContainers("", e);
                var A = d.api.core.on.scrollEnd(null, function () {
                    z.resolve(e), A()
                })
            } else z.resolve();
            return z.promise
        }, p.prototype.scrollTo = function (a, b) {
            var c = null, d = null;
            return null !== a && "undefined" != typeof a && (c = this.getRow(a)), null !== b && "undefined" != typeof b && (d = this.getColumn(b.name ? b.name : b.field)), this.scrollToIfNecessary(c, d)
        }, p.prototype.clearAllFilters = function (a, b, c) {
            return void 0 === a && (a = !0), void 0 === b && (b = !1), void 0 === c && (c = !1), this.columns.forEach(function (a) {
                a.filters.forEach(function (a) {
                    a.term = void 0, b && (a.condition = void 0), c && (a.flags = void 0)
                })
            }), a ? this.refreshRows() : void 0
        }, o.prototype = {
            put: function (a, b) {
                this[this.grid.options.rowIdentity(a)] = b
            }, get: function (a) {
                return this[this.grid.options.rowIdentity(a)]
            }, remove: function (a) {
                var b = this[a = this.grid.options.rowIdentity(a)];
                return delete this[a], b
            }
        }, p
    }])
}(), function () {
    angular.module("ui.grid").factory("GridApi", ["$q", "$rootScope", "gridUtil", "uiGridConstants", "GridRow", "uiGridGridMenuService", function (a, b, c, d, e, f) {
        function g(a, c, d, e) {
            return b.$on(a, function (a) {
                var b = Array.prototype.slice.call(arguments);
                b.splice(0, 1), c.apply(e ? e : d.api, b)
            })
        }

        var h = function (a) {
            this.grid = a, this.listeners = [], this.registerEvent("core", "renderingComplete"),
                this.registerEvent("core", "filterChanged"), this.registerMethod("core", "setRowInvisible", e.prototype.setRowInvisible), this.registerMethod("core", "clearRowInvisible", e.prototype.clearRowInvisible), this.registerMethod("core", "getVisibleRows", this.grid.getVisibleRows), this.registerEvent("core", "rowsVisibleChanged"), this.registerEvent("core", "rowsRendered"), this.registerEvent("core", "scrollBegin"), this.registerEvent("core", "scrollEnd"), this.registerEvent("core", "canvasHeightChanged"), this.registerEvent("core", "gridDimensionChanged")
        };
        return h.prototype.suppressEvents = function (a, b) {
            var c = this, d = angular.isArray(a) ? a : [a], e = c.listeners.filter(function (a) {
                return d.some(function (b) {
                    return a.handler === b
                })
            });
            e.forEach(function (a) {
                a.dereg()
            }), b(), e.forEach(function (a) {
                a.dereg = g(a.eventId, a.handler, c.grid, a._this)
            })
        }, h.prototype.registerEvent = function (a, d) {
            var e = this;
            e[a] || (e[a] = {});
            var f = e[a];
            f.on || (f.on = {}, f.raise = {});
            var h = e.grid.id + a + d;
            f.raise[d] = function () {
                b.$emit.apply(b, [h].concat(Array.prototype.slice.call(arguments)))
            }, f.on[d] = function (b, f, i) {
                if (null !== b && "undefined" == typeof b.$on) return void c.logError("asked to listen on " + a + ".on." + d + " but scope wasn't passed in the input parameters.  It is legitimate to pass null, but you've passed something else, so you probably forgot to provide scope rather than did it deliberately, not registering");
                var j = g(h, f, e.grid, i), k = {handler: f, dereg: j, eventId: h, scope: b, _this: i};
                e.listeners.push(k);
                var l = function () {
                    k.dereg();
                    var a = e.listeners.indexOf(k);
                    e.listeners.splice(a, 1)
                };
                return b && b.$on("$destroy", function () {
                    l()
                }), l
            }
        }, h.prototype.registerEventsFromObject = function (a) {
            var b = this, c = [];
            angular.forEach(a, function (a, b) {
                var d = {name: b, events: []};
                angular.forEach(a, function (a, b) {
                    d.events.push(b)
                }), c.push(d)
            }), c.forEach(function (a) {
                a.events.forEach(function (c) {
                    b.registerEvent(a.name, c)
                })
            })
        }, h.prototype.registerMethod = function (a, b, d, e) {
            this[a] || (this[a] = {});
            var f = this[a];
            f[b] = c.createBoundedWrapper(e || this.grid, d)
        }, h.prototype.registerMethodsFromObject = function (a, b) {
            var c = this, d = [];
            angular.forEach(a, function (a, b) {
                var c = {name: b, methods: []};
                angular.forEach(a, function (a, b) {
                    c.methods.push({name: b, fn: a})
                }), d.push(c)
            }), d.forEach(function (a) {
                a.methods.forEach(function (d) {
                    c.registerMethod(a.name, d.name, d.fn, b)
                })
            })
        }, h
    }])
}(), function () {
    angular.module("ui.grid").factory("GridColumn", ["gridUtil", "uiGridConstants", "i18nService", function (a, b, c) {
        function d(a, c, d) {
            var e = this;
            e.grid = d, e.uid = c, e.updateColumnDef(a, !0), e.aggregationValue = void 0, e.updateAggregationValue = function () {
                if (!e.aggregationType) return void(e.aggregationValue = void 0);
                var a = 0, c = e.grid.getVisibleRows(), d = function () {
                    var a = [];
                    return c.forEach(function (b) {
                        var c = e.grid.getCellValue(b, e), d = Number(c);
                        isNaN(d) || a.push(d)
                    }), a
                };
                angular.isFunction(e.aggregationType) ? e.aggregationValue = e.aggregationType(c, e) : e.aggregationType === b.aggregationTypes.count ? e.aggregationValue = e.grid.getVisibleRowCount() : e.aggregationType === b.aggregationTypes.sum ? (d().forEach(function (b) {
                    a += b
                }), e.aggregationValue = a) : e.aggregationType === b.aggregationTypes.avg ? (d().forEach(function (b) {
                    a += b
                }), a /= d().length, e.aggregationValue = a) : e.aggregationType === b.aggregationTypes.min ? e.aggregationValue = Math.min.apply(null, d()) : e.aggregationType === b.aggregationTypes.max ? e.aggregationValue = Math.max.apply(null, d()) : e.aggregationValue = " "
            }, this.getAggregationValue = function () {
                return e.aggregationValue
            }
        }

        return d.prototype.hideColumn = function () {
            this.colDef.visible = !1
        }, d.prototype.setPropertyOrDefault = function (a, b, c) {
            var d = this;
            "undefined" != typeof a[b] && a[b] ? d[b] = a[b] : "undefined" != typeof d[b] ? d[b] = d[b] : d[b] = c ? c : {}
        }, d.prototype.updateColumnDef = function (c, d) {
            var e = this;
            if (e.colDef = c, void 0 === c.name) throw new Error("colDef.name is required for column at index " + e.grid.options.columnDefs.indexOf(c));
            if (e.displayName = void 0 === c.displayName ? a.readableColumnName(c.name) : c.displayName, !angular.isNumber(e.width) || !e.hasCustomWidth || c.allowCustomWidthOverride) {
                var f = c.width, g = "Cannot parse column width '" + f + "' for column named '" + c.name + "'";
                if (e.hasCustomWidth = !1, angular.isString(f) || angular.isNumber(f)) if (angular.isString(f)) if (a.endsWith(f, "%")) {
                    var h = f.replace(/%/g, ""), i = parseInt(h, 10);
                    if (isNaN(i)) throw new Error(g);
                    e.width = f
                } else if (f.match(/^(\d+)$/)) e.width = parseInt(f.match(/^(\d+)$/)[1], 10); else {
                    if (!f.match(/^\*+$/)) throw new Error(g);
                    e.width = f
                } else e.width = f; else e.width = "*"
            }
            ["minWidth", "maxWidth"].forEach(function (a) {
                var b = c[a], d = "Cannot parse column " + a + " '" + b + "' for column named '" + c.name + "'";
                if (angular.isString(b) || angular.isNumber(b)) if (angular.isString(b)) {
                    if (!b.match(/^(\d+)$/)) throw new Error(d);
                    e[a] = parseInt(b.match(/^(\d+)$/)[1], 10)
                } else e[a] = b; else e[a] = "minWidth" === a ? 30 : 9e3
            }), e.field = void 0 === c.field ? c.name : c.field, "string" != typeof e.field && a.logError("Field is not a string, this is likely to break the code, Field is: " + e.field), e.name = c.name, e.displayName = void 0 === c.displayName ? a.readableColumnName(c.name) : c.displayName, e.aggregationType = angular.isDefined(c.aggregationType) ? c.aggregationType : null, e.footerCellTemplate = angular.isDefined(c.footerCellTemplate) ? c.footerCellTemplate : null, "undefined" == typeof c.cellTooltip || c.cellTooltip === !1 ? e.cellTooltip = !1 : c.cellTooltip === !0 ? e.cellTooltip = function (a, b) {
                return e.grid.getCellValue(a, b)
            } : "function" == typeof c.cellTooltip ? e.cellTooltip = c.cellTooltip : e.cellTooltip = function (a, b) {
                return b.colDef.cellTooltip
            }, "undefined" == typeof c.headerTooltip || c.headerTooltip === !1 ? e.headerTooltip = !1 : c.headerTooltip === !0 ? e.headerTooltip = function (a) {
                return a.displayName
            } : "function" == typeof c.headerTooltip ? e.headerTooltip = c.headerTooltip : e.headerTooltip = function (a) {
                return a.colDef.headerTooltip
            }, e.footerCellClass = c.footerCellClass, e.cellClass = c.cellClass, e.headerCellClass = c.headerCellClass, e.cellFilter = c.cellFilter ? c.cellFilter : "", e.sortCellFiltered = c.sortCellFiltered ? !0 : !1, e.filterCellFiltered = c.filterCellFiltered ? !0 : !1, e.headerCellFilter = c.headerCellFilter ? c.headerCellFilter : "", e.footerCellFilter = c.footerCellFilter ? c.footerCellFilter : "", e.visible = a.isNullOrUndefined(c.visible) || c.visible, e.headerClass = c.headerClass, e.enableSorting = "undefined" != typeof c.enableSorting ? c.enableSorting : e.grid.options.enableSorting, e.sortingAlgorithm = c.sortingAlgorithm, e.sortDirectionCycle = "undefined" != typeof c.sortDirectionCycle ? c.sortDirectionCycle : [null, b.ASC, b.DESC], "undefined" == typeof e.suppressRemoveSort && (e.suppressRemoveSort = "undefined" != typeof c.suppressRemoveSort ? c.suppressRemoveSort : !1), e.enableFiltering = "undefined" != typeof c.enableFiltering ? c.enableFiltering : !0, e.setPropertyOrDefault(c, "menuItems", []), d && e.setPropertyOrDefault(c, "sort");
            var j = [];
            c.filter ? j.push(c.filter) : c.filters ? j = c.filters : j.push({}), d ? (e.setPropertyOrDefault(c, "filter"), e.setPropertyOrDefault(c, "extraStyle"), e.setPropertyOrDefault(c, "filters", j)) : e.filters.length === j.length && e.filters.forEach(function (a, b) {
                "undefined" != typeof j[b].placeholder && (a.placeholder = j[b].placeholder), "undefined" != typeof j[b].ariaLabel && (a.ariaLabel = j[b].ariaLabel), "undefined" != typeof j[b].flags && (a.flags = j[b].flags), "undefined" != typeof j[b].type && (a.type = j[b].type), "undefined" != typeof j[b].selectOptions && (a.selectOptions = j[b].selectOptions)
            })
        }, d.prototype.unsort = function () {
            this.sort = {}, this.grid.api.core.raise.sortChanged(this.grid, this.grid.getColumnSorting())
        }, d.prototype.getColClass = function (a) {
            var c = b.COL_CLASS_PREFIX + this.uid;
            return a ? "." + c : c
        }, d.prototype.isPinnedLeft = function () {
            return "left" === this.renderContainer
        }, d.prototype.isPinnedRight = function () {
            return "right" === this.renderContainer
        }, d.prototype.getColClassDefinition = function () {
            return " .grid" + this.grid.id + " " + this.getColClass(!0) + " { min-width: " + this.drawnWidth + "px; max-width: " + this.drawnWidth + "px; }"
        }, d.prototype.getRenderContainer = function () {
            var a = this, b = a.renderContainer;
            return (null === b || "" === b || void 0 === b) && (b = "body"), a.grid.renderContainers[b]
        }, d.prototype.showColumn = function () {
            this.colDef.visible = !0
        }, d.prototype.getAggregationText = function () {
            var a = this;
            if (a.colDef.aggregationHideLabel) return "";
            if (a.colDef.aggregationLabel) return a.colDef.aggregationLabel;
            switch (a.colDef.aggregationType) {
                case b.aggregationTypes.count:
                    return c.getSafeText("aggregation.count");
                case b.aggregationTypes.sum:
                    return c.getSafeText("aggregation.sum");
                case b.aggregationTypes.avg:
                    return c.getSafeText("aggregation.avg");
                case b.aggregationTypes.min:
                    return c.getSafeText("aggregation.min");
                case b.aggregationTypes.max:
                    return c.getSafeText("aggregation.max");
                default:
                    return ""
            }
        }, d.prototype.getCellTemplate = function () {
            var a = this;
            return a.cellTemplatePromise
        }, d.prototype.getCompiledElementFn = function () {
            var a = this;
            return a.compiledElementFnDefer.promise
        }, d
    }])
}(), function () {
    angular.module("ui.grid").factory("GridOptions", ["gridUtil", "uiGridConstants", function (a, b) {
        return {
            initialize: function (c) {
                return c.onRegisterApi = c.onRegisterApi || angular.noop(), c.data = c.data || [], c.columnDefs = c.columnDefs || [], c.excludeProperties = c.excludeProperties || ["$$hashKey"], c.enableRowHashing = c.enableRowHashing !== !1, c.rowIdentity = c.rowIdentity || function (b) {
                    return a.hashKey(b)
                }, c.getRowIdentity = c.getRowIdentity || function (a) {
                    return a.$$hashKey
                }, c.flatEntityAccess = c.flatEntityAccess === !0, c.showHeader = "undefined" != typeof c.showHeader ? c.showHeader : !0, c.showHeader ? c.headerRowHeight = "undefined" != typeof c.headerRowHeight ? c.headerRowHeight : 30 : c.headerRowHeight = 0, "string" == typeof c.rowHeight ? c.rowHeight = parseInt(c.rowHeight) || 30 : c.rowHeight = c.rowHeight || 30, c.minRowsToShow = "undefined" != typeof c.minRowsToShow ? c.minRowsToShow : 10, c.showGridFooter = c.showGridFooter === !0, c.showColumnFooter = c.showColumnFooter === !0, c.columnFooterHeight = "undefined" != typeof c.columnFooterHeight ? c.columnFooterHeight : 30, c.gridFooterHeight = "undefined" != typeof c.gridFooterHeight ? c.gridFooterHeight : 30, c.columnWidth = "undefined" != typeof c.columnWidth ? c.columnWidth : 50, c.maxVisibleColumnCount = "undefined" != typeof c.maxVisibleColumnCount ? c.maxVisibleColumnCount : 200, c.virtualizationThreshold = "undefined" != typeof c.virtualizationThreshold ? c.virtualizationThreshold : 20, c.columnVirtualizationThreshold = "undefined" != typeof c.columnVirtualizationThreshold ? c.columnVirtualizationThreshold : 10, c.excessRows = "undefined" != typeof c.excessRows ? c.excessRows : 4, c.scrollThreshold = "undefined" != typeof c.scrollThreshold ? c.scrollThreshold : 4, c.excessColumns = "undefined" != typeof c.excessColumns ? c.excessColumns : 4, c.horizontalScrollThreshold = "undefined" != typeof c.horizontalScrollThreshold ? c.horizontalScrollThreshold : 2, c.aggregationCalcThrottle = "undefined" != typeof c.aggregationCalcThrottle ? c.aggregationCalcThrottle : 500, c.wheelScrollThrottle = "undefined" != typeof c.wheelScrollThrottle ? c.wheelScrollThrottle : 70, c.scrollDebounce = "undefined" != typeof c.scrollDebounce ? c.scrollDebounce : 300, c.enableSorting = c.enableSorting !== !1, c.enableFiltering = c.enableFiltering === !0, c.enableColumnMenus = c.enableColumnMenus !== !1, c.enableVerticalScrollbar = "undefined" != typeof c.enableVerticalScrollbar ? c.enableVerticalScrollbar : b.scrollbars.ALWAYS, c.enableHorizontalScrollbar = "undefined" != typeof c.enableHorizontalScrollbar ? c.enableHorizontalScrollbar : b.scrollbars.ALWAYS, c.enableMinHeightCheck = c.enableMinHeightCheck !== !1, c.minimumColumnSize = "undefined" != typeof c.minimumColumnSize ? c.minimumColumnSize : 10, c.rowEquality = c.rowEquality || function (a, b) {
                    return a === b
                }, c.headerTemplate = c.headerTemplate || null, c.footerTemplate = c.footerTemplate || "ui-grid/ui-grid-footer", c.gridFooterTemplate = c.gridFooterTemplate || "ui-grid/ui-grid-grid-footer", c.rowTemplate = c.rowTemplate || "ui-grid/ui-grid-row", c.appScopeProvider = c.appScopeProvider || null, c
            }
        }
    }])
}(), function () {
    angular.module("ui.grid").factory("GridRenderContainer", ["gridUtil", "uiGridConstants", function (a, b) {
        function c(a, b, c) {
            var d = this;
            d.name = a, d.grid = b, d.visibleRowCache = [], d.visibleColumnCache = [], d.renderedRows = [], d.renderedColumns = [], d.prevScrollTop = 0, d.prevScrolltopPercentage = 0, d.prevRowScrollIndex = 0, d.prevScrollLeft = 0, d.prevScrollleftPercentage = 0, d.prevColumnScrollIndex = 0, d.columnStyles = "", d.viewportAdjusters = [], d.hasHScrollbar = !1, d.hasVScrollbar = !1, d.canvasHeightShouldUpdate = !0, d.$$canvasHeight = 0, c && angular.isObject(c) && angular.extend(d, c), b.registerStyleComputation({
                priority: 5,
                func: function () {
                    return d.updateColumnWidths(), d.columnStyles
                }
            })
        }

        return c.prototype.reset = function () {
            this.visibleColumnCache.length = 0, this.visibleRowCache.length = 0, this.renderedRows.length = 0, this.renderedColumns.length = 0
        }, c.prototype.containsColumn = function (a) {
            return -1 !== this.visibleColumnCache.indexOf(a)
        }, c.prototype.minRowsToRender = function () {
            for (var a = this, b = 0, c = 0, d = a.getViewportHeight(), e = a.visibleRowCache.length - 1; d > c && e >= 0; e--) c += a.visibleRowCache[e].height, b++;
            return b
        }, c.prototype.minColumnsToRender = function () {
            for (var a = this, b = this.getViewportWidth(), c = 0, d = 0, e = 0; e < a.visibleColumnCache.length; e++) {
                var f = a.visibleColumnCache[e];
                if (b > d) d += f.drawnWidth ? f.drawnWidth : 0, c++; else {
                    for (var g = 0, h = e; h >= e - c; h--) g += a.visibleColumnCache[h].drawnWidth ? a.visibleColumnCache[h].drawnWidth : 0;
                    b > g && c++
                }
            }
            return c
        }, c.prototype.getVisibleRowCount = function () {
            return this.visibleRowCache.length
        }, c.prototype.registerViewportAdjuster = function (a) {
            this.viewportAdjusters.push(a)
        }, c.prototype.removeViewportAdjuster = function (a) {
            var b = this.viewportAdjusters.indexOf(a);
            b > -1 && this.viewportAdjusters.splice(b, 1)
        }, c.prototype.getViewportAdjustment = function () {
            var a = this, b = {height: 0, width: 0};
            return a.viewportAdjusters.forEach(function (a) {
                b = a.call(this, b)
            }), b
        }, c.prototype.getMargin = function (a) {
            var b = this, c = 0;
            return b.viewportAdjusters.forEach(function (b) {
                var d = b.call(this, {height: 0, width: 0});
                d.side && d.side === a && (c += -1 * d.width)
            }), c
        }, c.prototype.getViewportHeight = function () {
            var a = this, b = a.headerHeight ? a.headerHeight : a.grid.headerHeight,
                c = a.grid.gridHeight - b - a.grid.footerHeight, d = a.getViewportAdjustment();
            return c += d.height
        }, c.prototype.getViewportWidth = function () {
            var a = this, b = a.grid.gridWidth, c = a.getViewportAdjustment();
            return b += c.width
        }, c.prototype.getHeaderViewportWidth = function () {
            var a = this.getViewportWidth();
            return a
        }, c.prototype.getCanvasHeight = function () {
            var a = this;
            if (!a.canvasHeightShouldUpdate) return a.$$canvasHeight;
            var b = a.$$canvasHeight;
            return a.$$canvasHeight = 0, a.visibleRowCache.forEach(function (b) {
                a.$$canvasHeight += b.height
            }), a.canvasHeightShouldUpdate = !1, a.grid.api.core.raise.canvasHeightChanged(b, a.$$canvasHeight), a.$$canvasHeight
        }, c.prototype.getVerticalScrollLength = function () {
            return this.getCanvasHeight() - this.getViewportHeight() + this.grid.scrollbarHeight !== 0 ? this.getCanvasHeight() - this.getViewportHeight() + this.grid.scrollbarHeight : -1
        }, c.prototype.getHorizontalScrollLength = function () {
            return this.getCanvasWidth() - this.getViewportWidth() + this.grid.scrollbarWidth !== 0 ? this.getCanvasWidth() - this.getViewportWidth() + this.grid.scrollbarWidth : -1
        }, c.prototype.getCanvasWidth = function () {
            var a = this, b = a.canvasWidth;
            return b
        }, c.prototype.setRenderedRows = function (a) {
            this.renderedRows.length = a.length;
            for (var b = 0; b < a.length; b++) this.renderedRows[b] = a[b]
        }, c.prototype.setRenderedColumns = function (a) {
            this.renderedColumns.length = a.length;
            for (var b = 0; b < a.length; b++) this.renderedColumns[b] = a[b];
            this.updateColumnOffset()
        }, c.prototype.updateColumnOffset = function () {
            for (var a = 0, b = 0; b < this.currentFirstColumn; b++) a += this.visibleColumnCache[b].drawnWidth;
            this.columnOffset = a
        }, c.prototype.scrollVertical = function (a) {
            var c = -1;
            if (a !== this.prevScrollTop) {
                var d = a - this.prevScrollTop;
                d > 0 && (this.grid.scrollDirection = b.scrollDirection.DOWN), 0 > d && (this.grid.scrollDirection = b.scrollDirection.UP);
                var e = this.getVerticalScrollLength();
                return c = a / e, c > 1 && (c = 1), 0 > c && (c = 0), this.adjustScrollVertical(a, c), c
            }
        }, c.prototype.scrollHorizontal = function (a) {
            var c = -1;
            if (a !== this.prevScrollLeft) {
                var d = a - this.prevScrollLeft;
                d > 0 && (this.grid.scrollDirection = b.scrollDirection.RIGHT), 0 > d && (this.grid.scrollDirection = b.scrollDirection.LEFT);
                var e = this.getHorizontalScrollLength();
                return c = 0 !== e ? a / e : 0, this.adjustScrollHorizontal(a, c), c
            }
        }, c.prototype.adjustScrollVertical = function (a, b, c) {
            (this.prevScrollTop !== a || c) && (("undefined" == typeof a || void 0 === a || null === a) && (a = (this.getCanvasHeight() - this.getViewportHeight()) * b), this.adjustRows(a, b, !1), this.prevScrollTop = a, this.prevScrolltopPercentage = b, this.grid.queueRefresh())
        }, c.prototype.adjustScrollHorizontal = function (a, b, c) {
            (this.prevScrollLeft !== a || c) && (("undefined" == typeof a || void 0 === a || null === a) && (a = (this.getCanvasWidth() - this.getViewportWidth()) * b), this.adjustColumns(a, b), this.prevScrollLeft = a, this.prevScrollleftPercentage = b, this.grid.queueRefresh())
        }, c.prototype.adjustRows = function (a, b, c) {
            var d = this, e = d.minRowsToRender(), f = d.visibleRowCache, g = f.length - e;
            "undefined" != typeof b && null !== b || !a || (b = a / d.getVerticalScrollLength());
            var h = Math.ceil(Math.min(g, g * b));
            h > g && (h = g);
            var i = [];
            if (f.length > d.grid.options.virtualizationThreshold) {
                if ("undefined" != typeof a && null !== a) {
                    if (!d.grid.suppressParentScrollDown && d.prevScrollTop < a && h < d.prevRowScrollIndex + d.grid.options.scrollThreshold && g > h) return;
                    if (!d.grid.suppressParentScrollUp && d.prevScrollTop > a && h > d.prevRowScrollIndex - d.grid.options.scrollThreshold && g > h) return
                }
                var j = {}, k = {};
                j = Math.max(0, h - d.grid.options.excessRows), k = Math.min(f.length, h + e + d.grid.options.excessRows), i = [j, k]
            } else {
                var l = d.visibleRowCache.length;
                i = [0, Math.max(l, e + d.grid.options.excessRows)]
            }
            d.updateViewableRowRange(i), d.prevRowScrollIndex = h
        }, c.prototype.adjustColumns = function (a, b) {
            var c = this, d = c.minColumnsToRender(), e = c.visibleColumnCache, f = e.length - d;
            "undefined" != typeof b && null !== b || !a || (b = a / c.getHorizontalScrollLength());
            var g = Math.ceil(Math.min(f, f * b));
            g > f && (g = f);
            var h = [];
            if (e.length > c.grid.options.columnVirtualizationThreshold && c.getCanvasWidth() > c.getViewportWidth()) {
                var i = Math.max(0, g - c.grid.options.excessColumns),
                    j = Math.min(e.length, g + d + c.grid.options.excessColumns);
                h = [i, j]
            } else {
                var k = c.visibleColumnCache.length;
                h = [0, Math.max(k, d + c.grid.options.excessColumns)]
            }
            c.updateViewableColumnRange(h), c.prevColumnScrollIndex = g
        }, c.prototype.updateViewableRowRange = function (a) {
            var b = this.visibleRowCache.slice(a[0], a[1]);
            this.currentTopRow = a[0], this.setRenderedRows(b)
        }, c.prototype.updateViewableColumnRange = function (a) {
            var b = this.visibleColumnCache.slice(a[0], a[1]);
            this.currentFirstColumn = a[0], this.setRenderedColumns(b)
        }, c.prototype.headerCellWrapperStyle = function () {
            var a = this;
            if (0 !== a.currentFirstColumn) {
                var b = a.columnOffset;
                return a.grid.isRTL() ? {"margin-right": b + "px"} : {"margin-left": b + "px"}
            }
            return null
        }, c.prototype.updateColumnWidths = function () {
            var b = this, c = [], d = 0, e = 0, f = "", g = b.grid.getViewportWidth() - b.grid.scrollbarWidth, h = [];
            angular.forEach(b.grid.renderContainers, function (a, b) {
                h = h.concat(a.visibleColumnCache)
            }), h.forEach(function (b, f) {
                var h = 0;
                b.visible && (angular.isNumber(b.width) ? (h = parseInt(b.width, 10), e += h, b.drawnWidth = h) : a.endsWith(b.width, "%") ? (h = parseFloat(parseInt(b.width.replace(/%/g, ""), 10) / 100 * g), h > b.maxWidth && (h = b.maxWidth), h < b.minWidth && (h = b.minWidth), e += h, b.drawnWidth = h) : angular.isString(b.width) && -1 !== b.width.indexOf("*") && (d += b.width.length, c.push(b)))
            });
            var i = g - e;
            if (c.length > 0) {
                var j = i / d;
                c.forEach(function (a) {
                    var b = parseInt(a.width.length * j, 10);
                    b > a.maxWidth && (b = a.maxWidth), b < a.minWidth && (b = a.minWidth), e += b, a.drawnWidth = b
                })
            }
            for (var k = function (a) {
                a.drawnWidth < a.maxWidth && l > 0 && (a.drawnWidth++, e++, l--, m = !0)
            }, l = g - e, m = !0; l > 0 && m;) m = !1, c.forEach(k);
            var n = function (a) {
                a.drawnWidth > a.minWidth && o > 0 && (a.drawnWidth--, e--, o--, m = !0)
            }, o = e - g;
            for (m = !0; o > 0 && m;) m = !1, c.forEach(n);
            var p = 0;
            b.visibleColumnCache.forEach(function (a) {
                a.visible && (p += a.drawnWidth)
            }), h.forEach(function (a) {
                f += a.getColClassDefinition()
            }), b.canvasWidth = p, this.columnStyles = f
        }, c.prototype.needsHScrollbarPlaceholder = function () {
            return this.grid.options.enableHorizontalScrollbar && !this.hasHScrollbar && !this.grid.disableScrolling
        }, c.prototype.getViewportStyle = function () {
            var a = this, c = {};
            return a.hasHScrollbar = !1, a.hasVScrollbar = !1, a.grid.disableScrolling ? (c["overflow-x"] = "hidden", c["overflow-y"] = "hidden", c) : ("body" === a.name ? (a.hasHScrollbar = a.grid.options.enableHorizontalScrollbar !== b.scrollbars.NEVER, a.grid.isRTL() ? a.grid.hasLeftContainerColumns() || (a.hasVScrollbar = a.grid.options.enableVerticalScrollbar !== b.scrollbars.NEVER) : a.grid.hasRightContainerColumns() || (a.hasVScrollbar = a.grid.options.enableVerticalScrollbar !== b.scrollbars.NEVER)) : "left" === a.name ? a.hasVScrollbar = a.grid.isRTL() ? a.grid.options.enableVerticalScrollbar !== b.scrollbars.NEVER : !1 : a.hasVScrollbar = a.grid.isRTL() ? !1 : a.grid.options.enableVerticalScrollbar !== b.scrollbars.NEVER, c["overflow-x"] = a.hasHScrollbar ? "scroll" : "hidden", c["overflow-y"] = a.hasVScrollbar ? "scroll" : "hidden", c)
        }, c
    }])
}(), function () {
    angular.module("ui.grid").factory("GridRow", ["gridUtil", "uiGridConstants", function (a, b) {
        function c(b, c, d) {
            this.grid = d, this.entity = b, this.uid = a.nextUid(), this.visible = !0, this.$$height = d.options.rowHeight
        }

        return Object.defineProperty(c.prototype, "height", {
            get: function () {
                return this.$$height
            }, set: function (a) {
                a !== this.$$height && (this.grid.updateCanvasHeight(), this.$$height = a)
            }
        }), c.prototype.getQualifiedColField = function (a) {
            return "row." + this.getEntityQualifiedColField(a)
        }, c.prototype.getEntityQualifiedColField = function (c) {
            var d = "entity";
            return c.field === b.ENTITY_BINDING ? d : a.preEval(d + "." + c.field)
        }, c.prototype.setRowInvisible = function (a) {
            a && a.setThisRowInvisible && a.setThisRowInvisible("user")
        }, c.prototype.clearRowInvisible = function (a) {
            a && a.clearThisRowInvisible && a.clearThisRowInvisible("user")
        }, c.prototype.setThisRowInvisible = function (a, b) {
            this.invisibleReason || (this.invisibleReason = {}), this.invisibleReason[a] = !0, this.evaluateRowVisibility(b)
        }, c.prototype.clearThisRowInvisible = function (a, b) {
            "undefined" != typeof this.invisibleReason && delete this.invisibleReason[a], this.evaluateRowVisibility(b)
        }, c.prototype.evaluateRowVisibility = function (a) {
            var b = !0;
            "undefined" != typeof this.invisibleReason && angular.forEach(this.invisibleReason, function (a, c) {
                a && (b = !1)
            }), ("undefined" == typeof this.visible || this.visible !== b) && (this.visible = b, a || (this.grid.queueGridRefresh(), this.grid.api.core.raise.rowsVisibleChanged(this)))
        }, c
    }])
}(), function () {
    "use strict";
    angular.module("ui.grid").factory("GridRowColumn", ["$parse", "$filter", function (a, b) {
        var c = function d(a, b) {
            if (!(this instanceof d)) throw"Using GridRowColumn as a function insead of as a constructor. Must be called with `new` keyword";
            this.row = a, this.col = b
        };
        return c.prototype.getIntersectionValueRaw = function () {
            var b = a(this.row.getEntityQualifiedColField(this.col)), c = this.row;
            return b(c)
        }, c
    }])
}(), function () {
    angular.module("ui.grid").factory("ScrollEvent", ["gridUtil", function (a) {
        function b(b, c, d, e) {
            var f = this;
            if (!b) throw new Error("grid argument is required");
            f.grid = b, f.source = e, f.withDelay = !0, f.sourceRowContainer = c, f.sourceColContainer = d, f.newScrollLeft = null, f.newScrollTop = null, f.x = null, f.y = null, f.verticalScrollLength = -9999999, f.horizontalScrollLength = -999999, f.fireThrottledScrollingEvent = a.throttle(function (a) {
                f.grid.scrollContainers(a, f)
            }, f.grid.options.wheelScrollThrottle, {trailing: !0})
        }

        return b.prototype.getNewScrollLeft = function (b, c) {
            var d = this;
            if (!d.newScrollLeft) {
                var e, f = b.getCanvasWidth() - b.getViewportWidth(), g = a.normalizeScrollLeft(c, d.grid);
                if ("undefined" != typeof d.x.percentage && void 0 !== d.x.percentage) e = d.x.percentage; else {
                    if ("undefined" == typeof d.x.pixels || void 0 === d.x.pixels) throw new Error("No percentage or pixel value provided for scroll event X axis");
                    e = d.x.percentage = (g + d.x.pixels) / f
                }
                return Math.max(0, e * f)
            }
            return d.newScrollLeft
        }, b.prototype.getNewScrollTop = function (a, b) {
            var c = this;
            if (!c.newScrollTop) {
                var d, e = a.getVerticalScrollLength(), f = b[0].scrollTop;
                if ("undefined" != typeof c.y.percentage && void 0 !== c.y.percentage) d = c.y.percentage; else {
                    if ("undefined" == typeof c.y.pixels || void 0 === c.y.pixels) throw new Error("No percentage or pixel value provided for scroll event Y axis");
                    d = c.y.percentage = (f + c.y.pixels) / e
                }
                return Math.max(0, d * e)
            }
            return c.newScrollTop
        }, b.prototype.atTop = function (a) {
            return this.y && (0 === this.y.percentage || this.verticalScrollLength < 0) && 0 === a
        }, b.prototype.atBottom = function (a) {
            return this.y && (1 === this.y.percentage || 0 === this.verticalScrollLength) && a > 0
        }, b.prototype.atLeft = function (a) {
            return this.x && (0 === this.x.percentage || this.horizontalScrollLength < 0) && 0 === a
        }, b.prototype.atRight = function (a) {
            return this.x && (1 === this.x.percentage || 0 === this.horizontalScrollLength) && a > 0
        }, b.Sources = {
            ViewPortScroll: "ViewPortScroll",
            RenderContainerMouseWheel: "RenderContainerMouseWheel",
            RenderContainerTouchMove: "RenderContainerTouchMove",
            Other: 99
        }, b
    }])
}(), function () {
    "use strict";
    angular.module("ui.grid").service("gridClassFactory", ["gridUtil", "$q", "$compile", "$templateCache", "uiGridConstants", "Grid", "GridColumn", "GridRow", function (a, b, c, d, e, f, g, h) {
        var i = {
            createGrid: function (d) {
                d = "undefined" != typeof d ? d : {}, d.id = a.newId();
                var e = new f(d);
                if (e.options.rowTemplate) {
                    var g = b.defer();
                    e.getRowTemplateFn = g.promise, a.getTemplate(e.options.rowTemplate).then(function (a) {
                        var b = c(a);
                        g.resolve(b)
                    }, function (a) {
                        throw new Error("Couldn't fetch/use row template '" + e.options.rowTemplate + "'")
                    })
                }
                return e.registerColumnBuilder(i.defaultColumnBuilder), e.registerRowBuilder(i.rowTemplateAssigner), e.registerRowsProcessor(function (a) {
                    return a.forEach(function (a) {
                        a.evaluateRowVisibility(!0)
                    }, 50), a
                }), e.registerColumnsProcessor(function (a) {
                    return a.forEach(function (a) {
                        a.visible = angular.isDefined(a.colDef.visible) ? a.colDef.visible : !0
                    }), a
                }, 50), e.registerRowsProcessor(e.searchRows, 100), e.options.externalSort && angular.isFunction(e.options.externalSort) ? e.registerRowsProcessor(e.options.externalSort, 200) : e.registerRowsProcessor(e.sortByColumn, 200), e
            }, defaultColumnBuilder: function (c, d, f) {
                var g = [], h = function (b, f, h, i, j) {
                    c[b] ? d[f] = c[b] : d[f] = h, g.push(a.getTemplate(d[f]).then(function (a) {
                        angular.isFunction(a) && (a = a());
                        var c = "cellTooltip" === j ? "col.cellTooltip(row,col)" : "col.headerTooltip(col)";
                        j && d[j] === !1 ? a = a.replace(e.TOOLTIP, "") : j && d[j] && (a = a.replace(e.TOOLTIP, 'title="{{' + c + ' CUSTOM_FILTERS }}"')), i ? d[b] = a.replace(e.CUSTOM_FILTERS, function () {
                            return d[i] ? "|" + d[i] : ""
                        }) : d[b] = a
                    }, function (a) {
                        throw new Error("Couldn't fetch/use colDef." + b + " '" + c[b] + "'")
                    }))
                };
                return h("cellTemplate", "providedCellTemplate", "ui-grid/uiGridCell", "cellFilter", "cellTooltip"), d.cellTemplatePromise = g[0], h("headerCellTemplate", "providedHeaderCellTemplate", "ui-grid/uiGridHeaderCell", "headerCellFilter", "headerTooltip"), h("footerCellTemplate", "providedFooterCellTemplate", "ui-grid/uiGridFooterCell", "footerCellFilter"), h("filterHeaderTemplate", "providedFilterHeaderTemplate", "ui-grid/ui-grid-filter"), d.compiledElementFnDefer = b.defer(), b.all(g)
            }, rowTemplateAssigner: function (d) {
                var e = this;
                if (d.rowTemplate) {
                    var f = b.defer();
                    d.getRowTemplateFn = f.promise, a.getTemplate(d.rowTemplate).then(function (a) {
                        var b = c(a);
                        f.resolve(b)
                    }, function (a) {
                        throw new Error("Couldn't fetch/use row template '" + d.rowTemplate + "'")
                    })
                } else d.rowTemplate = e.options.rowTemplate, d.getRowTemplateFn = e.getRowTemplateFn;
                return d.getRowTemplateFn
            }
        };
        return i
    }])
}(), function () {
    function a(a) {
        return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
    }

    var b = angular.module("ui.grid");
    b.service("rowSearcher", ["gridUtil", "uiGridConstants", function (b, c) {
        var d = c.filter.CONTAINS, e = {};
        return e.getTerm = function (a) {
            if ("undefined" == typeof a.term) return a.term;
            var b = a.term;
            return "string" == typeof b && (b = b.trim()), b
        }, e.stripTerm = function (b) {
            var c = e.getTerm(b);
            return "string" == typeof c ? a(c.replace(/(^\*|\*$)/g, "")) : c
        }, e.guessCondition = function (a) {
            if ("undefined" == typeof a.term || !a.term) return d;
            var b = e.getTerm(a);
            if (/\*/.test(b)) {
                var c = "";
                a.flags && a.flags.caseSensitive || (c += "i");
                var f = b.replace(/(\\)?\*/g, function (a, b) {
                    return b ? a : "[\\s\\S]*?"
                });
                return new RegExp("^" + f + "$", c)
            }
            return d
        }, e.setupFilters = function (a) {
            for (var d = [], f = a.length, g = 0; f > g; g++) {
                var h = a[g];
                if (h.noTerm || !b.isNullOrUndefined(h.term)) {
                    var i = {}, j = "";
                    h.flags && h.flags.caseSensitive || (j += "i"), b.isNullOrUndefined(h.term) || (h.rawTerm ? i.term = h.term : i.term = e.stripTerm(h)), i.noTerm = h.noTerm, h.condition ? i.condition = h.condition : i.condition = e.guessCondition(h), i.flags = angular.extend({
                        caseSensitive: !1,
                        date: !1
                    }, h.flags), i.condition === c.filter.STARTS_WITH && (i.startswithRE = new RegExp("^" + i.term, j)), i.condition === c.filter.ENDS_WITH && (i.endswithRE = new RegExp(i.term + "$", j)), i.condition === c.filter.CONTAINS && (i.containsRE = new RegExp(i.term, j)), i.condition === c.filter.EXACT && (i.exactRE = new RegExp("^" + i.term + "$", j)), d.push(i)
                }
            }
            return d
        }, e.runColumnFilter = function (a, b, d, e) {
            var f, g = typeof e.condition, h = e.term;
            if (f = d.filterCellFiltered ? a.getCellDisplayValue(b, d) : a.getCellValue(b, d), e.condition instanceof RegExp) return e.condition.test(f);
            if ("function" === g) return e.condition(h, f, b, d);
            if (e.startswithRE) return e.startswithRE.test(f);
            if (e.endswithRE) return e.endswithRE.test(f);
            if (e.containsRE) return e.containsRE.test(f);
            if (e.exactRE) return e.exactRE.test(f);
            if (e.condition === c.filter.NOT_EQUAL) {
                var i = new RegExp("^" + h + "$");
                return !i.exec(f)
            }
            if ("number" == typeof f && "string" == typeof h) {
                var j = parseFloat(h.replace(/\\\./, ".").replace(/\\\-/, "-"));
                isNaN(j) || (h = j)
            }
            return e.flags.date === !0 && (f = new Date(f), h = new Date(h.replace(/\\/g, ""))), e.condition === c.filter.GREATER_THAN ? f > h : e.condition === c.filter.GREATER_THAN_OR_EQUAL ? f >= h : e.condition === c.filter.LESS_THAN ? h > f : e.condition === c.filter.LESS_THAN_OR_EQUAL ? h >= f : !0
        }, e.searchColumn = function (a, c, d, f) {
            if (a.options.useExternalFiltering) return !0;
            for (var g = f.length, h = 0; g > h; h++) {
                var i = f[h];
                if (!b.isNullOrUndefined(i.term) && "" !== i.term || i.noTerm) {
                    var j = e.runColumnFilter(a, c, d, i);
                    if (!j) return !1
                }
            }
            return !0
        }, e.search = function (a, c, d) {
            if (c) {
                if (!a.options.enableFiltering) return c;
                for (var f = [], g = d.length, h = function (a) {
                    var c = !1;
                    return a.forEach(function (a) {
                        (!b.isNullOrUndefined(a.term) && "" !== a.term || a.noTerm) && (c = !0)
                    }), c
                }, i = 0; g > i; i++) {
                    var j = d[i];
                    "undefined" != typeof j.filters && h(j.filters) && f.push({
                        col: j,
                        filters: e.setupFilters(j.filters)
                    })
                }
                if (f.length > 0) {
                    for (var k = function (a, b, c, d) {
                        b.visible && !e.searchColumn(a, b, c, d) && (b.visible = !1)
                    }, l = function (a, b) {
                        for (var d = c.length, e = 0; d > e; e++) k(a, c[e], b.col, b.filters)
                    }, m = f.length, n = 0; m > n; n++) l(a, f[n]);
                    a.api.core.raise.rowsVisibleChanged && a.api.core.raise.rowsVisibleChanged()
                }
                return c
            }
        }, e
    }])
}(), function () {
    var a = angular.module("ui.grid");
    a.service("rowSorter", ["$parse", "uiGridConstants", function (a, b) {
        var c = "(" + b.CURRENCY_SYMBOLS.map(function (a) {
            return "\\" + a
        }).join("|") + ")?", d = (new RegExp("^[-+]?" + c + "[\\d,.]+" + c + "%?$"), {colSortFnCache: {}});
        return d.guessSortFn = function (a) {
            switch (a) {
                case"number":
                    return d.sortNumber;
                case"numberStr":
                    return d.sortNumberStr;
                case"boolean":
                    return d.sortBool;
                case"string":
                    return d.sortAlpha;
                case"date":
                    return d.sortDate;
                case"object":
                    return d.basicSort;
                default:
                    throw new Error("No sorting function found for type:" + a)
            }
        }, d.handleNulls = function (a, b) {
            if (!a && 0 !== a && a !== !1 || !b && 0 !== b && b !== !1) {
                if (!a && 0 !== a && a !== !1 && !b && 0 !== b && b !== !1) return 0;
                if (!a && 0 !== a && a !== !1) return 1;
                if (!b && 0 !== b && b !== !1) return -1
            }
            return null
        }, d.basicSort = function (a, b) {
            var c = d.handleNulls(a, b);
            return null !== c ? c : a === b ? 0 : b > a ? -1 : 1
        }, d.sortNumber = function (a, b) {
            var c = d.handleNulls(a, b);
            return null !== c ? c : a - b
        }, d.sortNumberStr = function (a, b) {
            var c = d.handleNulls(a, b);
            if (null !== c) return c;
            var e, f, g = !1, h = !1;
            return e = parseFloat(a.replace(/[^0-9.-]/g, "")), isNaN(e) && (g = !0), f = parseFloat(b.replace(/[^0-9.-]/g, "")), isNaN(f) && (h = !0), g && h ? 0 : g ? 1 : h ? -1 : e - f
        }, d.sortAlpha = function (a, b) {
            var c = d.handleNulls(a, b);
            if (null !== c) return c;
            var e = a.toString().toLowerCase(), f = b.toString().toLowerCase();
            return e === f ? 0 : e.localeCompare(f)
        }, d.sortDate = function (a, b) {
            var c = d.handleNulls(a, b);
            if (null !== c) return c;
            a instanceof Date || (a = new Date(a)), b instanceof Date || (b = new Date(b));
            var e = a.getTime(), f = b.getTime();
            return e === f ? 0 : f > e ? -1 : 1
        }, d.sortBool = function (a, b) {
            var c = d.handleNulls(a, b);
            return null !== c ? c : a && b ? 0 : a || b ? a ? 1 : -1 : 0
        }, d.getSortFn = function (a, b, c) {
            var e;
            return d.colSortFnCache[b.colDef.name] ? e = d.colSortFnCache[b.colDef.name] : void 0 !== b.sortingAlgorithm ? (e = b.sortingAlgorithm, d.colSortFnCache[b.colDef.name] = b.sortingAlgorithm) : b.sortCellFiltered && b.cellFilter ? (e = d.sortAlpha, d.colSortFnCache[b.colDef.name] = e) : (e = d.guessSortFn(b.colDef.type), e ? d.colSortFnCache[b.colDef.name] = e : e = d.sortAlpha), e
        }, d.prioritySort = function (a, b) {
            return void 0 !== a.sort.priority && void 0 !== b.sort.priority ? a.sort.priority < b.sort.priority ? -1 : a.sort.priority === b.sort.priority ? 0 : 1 : void 0 !== a.sort.priority ? -1 : void 0 !== b.sort.priority ? 1 : 0;
        }, d.sort = function (a, c, e) {
            if (c) {
                if (a.options.useExternalSorting) return c;
                var f = [];
                if (e.forEach(function (a) {
                    !a.sort || a.sort.ignoreSort || !a.sort.direction || a.sort.direction !== b.ASC && a.sort.direction !== b.DESC || f.push(a)
                }), f = f.sort(d.prioritySort), 0 === f.length) return c;
                var g, h, i = function (a, b) {
                    a.entity.$$uiGridIndex = b
                };
                c.forEach(i);
                var j = c.slice(0), k = function (c, e) {
                    for (var i, k = 0, l = 0; 0 === k && l < f.length;) {
                        g = f[l], h = f[l].sort.direction, i = d.getSortFn(a, g, j);
                        var m, n;
                        g.sortCellFiltered ? (m = a.getCellDisplayValue(c, g), n = a.getCellDisplayValue(e, g)) : (m = a.getCellValue(c, g), n = a.getCellValue(e, g)), k = i(m, n, c, e, h, g), l++
                    }
                    return 0 === k ? c.entity.$$uiGridIndex - e.entity.$$uiGridIndex : h === b.ASC ? k : 0 - k
                }, l = c.sort(k), m = function (a, b) {
                    delete a.entity.$$uiGridIndex
                };
                return c.forEach(m), l
            }
        }, d
    }])
}(), function () {
    function a(a) {
        var b = a;
        return "undefined" != typeof b.length && b.length && (b = a[0]), b.ownerDocument.defaultView.getComputedStyle(b, null)
    }

    function b(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0, h = ["Top", "Right", "Bottom", "Left"]; 4 > f; f += 2) {
            var i = h[f];
            if ("margin" === c) {
                var j = parseFloat(e[c + i]);
                isNaN(j) || (g += j)
            }
            if (d) {
                if ("content" === c) {
                    var k = parseFloat(e["padding" + i]);
                    isNaN(k) || (g -= k)
                }
                if ("margin" !== c) {
                    var l = parseFloat(e["border" + i + "Width"]);
                    isNaN(l) || (g -= l)
                }
            } else {
                var m = parseFloat(e["padding" + i]);
                if (isNaN(m) || (g += m), "padding" !== c) {
                    var n = parseFloat(e["border" + i + "Width"]);
                    isNaN(n) || (g += n)
                }
            }
        }
        return g
    }

    function c(c, d, e) {
        var f, h = !0, i = a(c), j = "border-box" === i.boxSizing;
        if (0 >= f || null == f) {
            if (f = i[d], (0 > f || null == f) && (f = c.style[d]), g.test(f)) return f;
            h = j && !0, f = parseFloat(f) || 0
        }
        var k = f + b(c, d, e || (j ? "border" : "content"), h, i);
        return k
    }

    function d(b) {
        b = angular.element(b)[0];
        var c = b.parentElement;
        return c || (c = document.getElementsByTagName("body")[0]), parseInt(a(c).fontSize) || parseInt(a(b).fontSize) || 16
    }

    var e, f = angular.module("ui.grid");
    "function" != typeof Function.prototype.bind && (e = function () {
        var a = Array.prototype.slice;
        return function (b) {
            var c = this, d = a.call(arguments, 1);
            return d.length ? function () {
                return arguments.length ? c.apply(b, d.concat(a.call(arguments))) : c.apply(b, d)
            } : function () {
                return arguments.length ? c.apply(b, arguments) : c.call(b)
            }
        }
    });
    var g = new RegExp("^(" + /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source + ")(?!px)[a-z%]+$", "i"),
        h = /^(block|none|table(?!-c[ea]).+)/, i = {position: "absolute", visibility: "hidden", display: "block"},
        j = ["0", "0", "0", "0"], k = "uiGrid-";
    f.service("gridUtil", ["$log", "$window", "$document", "$http", "$templateCache", "$timeout", "$interval", "$injector", "$q", "$interpolate", "uiGridConstants", function (f, g, l, m, n, o, p, q, r, s, t) {
        function u(a, b) {
            var c = angular.element(this), d = 0, e = 0, f = 0, g = 0;
            if (b.originalEvent && (b = b.originalEvent), "detail" in b && (f = -1 * b.detail), "wheelDelta" in b && (f = b.wheelDelta), "wheelDeltaY" in b && (f = b.wheelDeltaY), "wheelDeltaX" in b && (e = -1 * b.wheelDeltaX), "axis" in b && b.axis === b.HORIZONTAL_AXIS && (e = -1 * f, f = 0), d = 0 === f ? e : f, "deltaY" in b && (f = -1 * b.deltaY, d = f), "deltaX" in b && (e = b.deltaX, 0 === f && (d = -1 * e)), 0 !== f || 0 !== e) {
                if (1 === b.deltaMode) {
                    var h = c.data("mousewheel-line-height");
                    d *= h, f *= h, e *= h
                } else if (2 === b.deltaMode) {
                    var i = c.data("mousewheel-page-height");
                    d *= i, f *= i, e *= i
                }
                g = Math.max(Math.abs(f), Math.abs(e)), (!z || z > g) && (z = g, w(b, g) && (z /= 40)), d = Math[d >= 1 ? "floor" : "ceil"](d / z), e = Math[e >= 1 ? "floor" : "ceil"](e / z), f = Math[f >= 1 ? "floor" : "ceil"](f / z);
                var j = {
                    originalEvent: b, deltaX: e, deltaY: f, deltaFactor: z, preventDefault: function () {
                        b.preventDefault()
                    }, stopPropagation: function () {
                        b.stopPropagation()
                    }
                };
                y && clearTimeout(y), y = setTimeout(v, 200), a.call(c[0], j)
            }
        }

        function v() {
            z = null
        }

        function w(a, b) {
            return "mousewheel" === a.type && b % 120 === 0
        }

        var x = {
            augmentWidthOrHeight: b, getStyles: a, createBoundedWrapper: function (a, b) {
                return function () {
                    return b.apply(a, arguments)
                }
            }, readableColumnName: function (a) {
                return "undefined" == typeof a || void 0 === a || null === a ? a : ("string" != typeof a && (a = String(a)), a.replace(/_+/g, " ").replace(/^[A-Z]+$/, function (a) {
                    return angular.lowercase(angular.uppercase(a.charAt(0)) + a.slice(1))
                }).replace(/([\w\u00C0-\u017F]+)/g, function (a) {
                    return angular.uppercase(a.charAt(0)) + a.slice(1)
                }).replace(/(\w+?(?=[A-Z]))/g, "$1 "))
            }, getColumnsFromData: function (a, b) {
                var c = [];
                if (!a || "undefined" == typeof a[0] || void 0 === a[0]) return [];
                angular.isUndefined(b) && (b = []);
                var d = a[0];
                return angular.forEach(d, function (a, d) {
                    -1 === b.indexOf(d) && c.push({name: d})
                }), c
            }, newId: function () {
                var a = (new Date).getTime();
                return function () {
                    return a += 1
                }
            }(), getTemplate: function (a) {
                if (n.get(a)) return x.postProcessTemplate(n.get(a));
                if (angular.isFunction(a.then)) return a.then(x.postProcessTemplate);
                try {
                    if (angular.element(a).length > 0) return r.when(a).then(x.postProcessTemplate)
                } catch (b) {
                }
                return x.logDebug("fetching url", a), m({method: "GET", url: a}).then(function (b) {
                    var c = b.data.trim();
                    return n.put(a, c), c
                }, function (b) {
                    throw new Error("Could not get template " + a + ": " + b)
                }).then(x.postProcessTemplate)
            }, postProcessTemplate: function (a) {
                var b = s.startSymbol(), c = s.endSymbol();
                return ("{{" !== b || "}}" !== c) && (a = a.replace(/\{\{/g, b), a = a.replace(/\}\}/g, c)), r.when(a)
            }, guessType: function (a) {
                var b = typeof a;
                switch (b) {
                    case"number":
                    case"boolean":
                    case"string":
                        return b;
                    default:
                        return angular.isDate(a) ? "date" : "object"
                }
            }, elementWidth: function (a) {
            }, elementHeight: function (a) {
            }, getScrollbarWidth: function () {
                var a = document.createElement("div");
                a.style.visibility = "hidden", a.style.width = "100px", a.style.msOverflowStyle = "scrollbar", document.body.appendChild(a);
                var b = a.offsetWidth;
                a.style.overflow = "scroll";
                var c = document.createElement("div");
                c.style.width = "100%", a.appendChild(c);
                var d = c.offsetWidth;
                return a.parentNode.removeChild(a), b - d
            }, swap: function (a, b, c, d) {
                var e, f, g = {};
                for (f in b) g[f] = a.style[f], a.style[f] = b[f];
                e = c.apply(a, d || []);
                for (f in b) a.style[f] = g[f];
                return e
            }, fakeElement: function (a, b, c, d) {
                var e, f, g = angular.element(a).clone()[0];
                for (f in b) g.style[f] = b[f];
                return angular.element(document.body).append(g), e = c.call(g, g), angular.element(g).remove(), e
            }, normalizeWheelEvent: function (a) {
                var b, c, d, e = a || window.event, f = ([].slice.call(arguments, 1), 0), g = 0, h = 0, i = 0, j = 0;
                return e.originalEvent && (e = e.originalEvent), e.wheelDelta && (f = e.wheelDelta), e.detail && (f = -1 * e.detail), h = f, void 0 !== e.axis && e.axis === e.HORIZONTAL_AXIS && (h = 0, g = -1 * f), e.deltaY && (h = -1 * e.deltaY, f = h), e.deltaX && (g = e.deltaX, f = -1 * g), void 0 !== e.wheelDeltaY && (h = e.wheelDeltaY), void 0 !== e.wheelDeltaX && (g = e.wheelDeltaX), i = Math.abs(f), (!b || b > i) && (b = i), j = Math.max(Math.abs(h), Math.abs(g)), (!c || c > j) && (c = j), d = f > 0 ? "floor" : "ceil", f = Math[d](f / b), g = Math[d](g / c), h = Math[d](h / c), {
                    delta: f,
                    deltaX: g,
                    deltaY: h
                }
            }, isTouchEnabled: function () {
                var a;
                return ("ontouchstart" in g || g.DocumentTouch && l instanceof DocumentTouch) && (a = !0), a
            }, isNullOrUndefined: function (a) {
                return void 0 === a || null === a ? !0 : !1
            }, endsWith: function (a, b) {
                return a && b && "string" == typeof a ? -1 !== a.indexOf(b, a.length - b.length) : !1
            }, arrayContainsObjectWithProperty: function (a, b, c) {
                var d = !1;
                return angular.forEach(a, function (a) {
                    a[b] === c && (d = !0)
                }), d
            }, numericAndNullSort: function (a, b) {
                return null === a ? 1 : null === b ? -1 : null === a && null === b ? 0 : a - b
            }, disableAnimations: function (a) {
                var b;
                try {
                    b = q.get("$animate"), angular.version.major > 1 || 1 === angular.version.major && angular.version.minor >= 4 ? b.enabled(a, !1) : b.enabled(!1, a)
                } catch (c) {
                }
            }, enableAnimations: function (a) {
                var b;
                try {
                    return b = q.get("$animate"), angular.version.major > 1 || 1 === angular.version.major && angular.version.minor >= 4 ? b.enabled(a, !0) : b.enabled(!0, a), b
                } catch (c) {
                }
            }, nextUid: function () {
                for (var a, b = j.length; b;) {
                    if (b--, a = j[b].charCodeAt(0), 57 === a) return j[b] = "A", k + j.join("");
                    if (90 !== a) return j[b] = String.fromCharCode(a + 1), k + j.join("");
                    j[b] = "0"
                }
                return j.unshift("0"), k + j.join("")
            }, hashKey: function (a) {
                var b, c = typeof a;
                return "object" === c && null !== a ? "function" == typeof(b = a.$$hashKey) ? b = a.$$hashKey() : "undefined" != typeof a.$$hashKey && a.$$hashKey ? b = a.$$hashKey : void 0 === b && (b = a.$$hashKey = x.nextUid()) : b = a, c + ":" + b
            }, resetUids: function () {
                j = ["0", "0", "0"]
            }, logError: function (a) {
                t.LOG_ERROR_MESSAGES && f.error(a)
            }, logWarn: function (a) {
                t.LOG_WARN_MESSAGES && f.warn(a)
            }, logDebug: function () {
                t.LOG_DEBUG_MESSAGES && f.debug.apply(f, arguments)
            }
        };
        x.focus = {
            queue: [], byId: function (a, b) {
                this._purgeQueue();
                var c = o(function () {
                    var c = (b && b.id ? b.id + "-" : "") + a, d = g.document.getElementById(c);
                    d ? d.focus() : x.logWarn("[focus.byId] Element id " + c + " was not found.")
                }, 0, !1);
                return this.queue.push(c), c
            }, byElement: function (a) {
                if (!angular.isElement(a)) return x.logWarn("Trying to focus on an element that isn't an element."), r.reject("not-element");
                a = angular.element(a), this._purgeQueue();
                var b = o(function () {
                    a && a[0].focus()
                }, 0, !1);
                return this.queue.push(b), b
            }, bySelector: function (a, b, c) {
                var d = this;
                if (!angular.isElement(a)) throw new Error("The parent element is not an element.");
                a = angular.element(a);
                var e = function () {
                    var c = a[0].querySelector(b);
                    return d.byElement(c)
                };
                if (this._purgeQueue(), c) {
                    var f = o(e, 0, !1);
                    return this.queue.push(o(e), 0, !1), f
                }
                return e()
            }, _purgeQueue: function () {
                this.queue.forEach(function (a) {
                    o.cancel(a)
                }), this.queue = []
            }
        }, ["width", "height"].forEach(function (b) {
            var d = angular.uppercase(b.charAt(0)) + b.substr(1);
            x["element" + d] = function (d, e) {
                var f = d;
                if (f && "undefined" != typeof f.length && f.length && (f = d[0]), f && null !== f) {
                    var g = a(f);
                    return 0 === f.offsetWidth && h.test(g.display) ? x.swap(f, i, function () {
                        return c(f, b, e)
                    }) : c(f, b, e)
                }
                return null
            }, x["outerElement" + d] = function (a, b) {
                return a ? x["element" + d].call(this, a, b ? "margin" : "border") : null
            }
        }), x.closestElm = function (a, b) {
            "undefined" != typeof a.length && a.length && (a = a[0]);
            var c;
            ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"].some(function (a) {
                return "function" == typeof document.body[a] ? (c = a, !0) : !1
            });
            for (var d; null !== a;) {
                if (d = a.parentElement, null !== d && d[c](b)) return d;
                a = d
            }
            return null
        }, x.type = function (a) {
            var b = Function.prototype.toString.call(a.constructor);
            return b.match(/function (.*?)\(/)[1]
        }, x.getBorderSize = function (b, c) {
            "undefined" != typeof b.length && b.length && (b = b[0]);
            var d = a(b);
            c = c ? "border" + c.charAt(0).toUpperCase() + c.slice(1) : "border", c += "Width";
            var e = parseInt(d[c], 10);
            return isNaN(e) ? 0 : e
        }, x.detectBrowser = function () {
            var a = g.navigator.userAgent,
                b = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer|trident\//i};
            for (var c in b) if (b[c].test(a)) return c;
            return "unknown"
        }, x.rtlScrollType = function B() {
            if (B.type) return B.type;
            var a = angular.element('<div dir="rtl" style="font-size: 14px; width: 1px; height: 1px; position: absolute; top: -1000px; overflow: scroll">A</div>')[0],
                b = "reverse";
            return document.body.appendChild(a), a.scrollLeft > 0 ? b = "default" : (a.scrollLeft = 1, 0 === a.scrollLeft && (b = "negative")), angular.element(a).remove(), B.type = b, b
        }, x.normalizeScrollLeft = function (a, b) {
            "undefined" != typeof a.length && a.length && (a = a[0]);
            var c = a.scrollLeft;
            if (b.isRTL()) switch (x.rtlScrollType()) {
                case"default":
                    return a.scrollWidth - c - a.clientWidth;
                case"negative":
                    return Math.abs(c);
                case"reverse":
                    return c
            }
            return c
        }, x.denormalizeScrollLeft = function (a, b, c) {
            if ("undefined" != typeof a.length && a.length && (a = a[0]), c.isRTL()) switch (x.rtlScrollType()) {
                case"default":
                    var d = a.scrollWidth - a.clientWidth;
                    return d - b;
                case"negative":
                    return -1 * b;
                case"reverse":
                    return b
            }
            return b
        }, x.preEval = function (a) {
            var b = t.BRACKET_REGEXP.exec(a);
            if (b) return (b[1] ? x.preEval(b[1]) : b[1]) + b[2] + (b[3] ? x.preEval(b[3]) : b[3]);
            a = a.replace(t.APOS_REGEXP, "\\'");
            var c = a.split(t.DOT_REGEXP), d = [c.shift()];
            return angular.forEach(c, function (a) {
                d.push(a.replace(t.FUNC_REGEXP, "']$1"))
            }), d.join("['")
        }, x.debounce = function (a, b, c) {
            function d() {
                g = this, f = arguments;
                var d = function () {
                    e = null, c || (h = a.apply(g, f))
                }, i = c && !e;
                return e && o.cancel(e), e = o(d, b, !1), i && (h = a.apply(g, f)), h
            }

            var e, f, g, h;
            return d.cancel = function () {
                o.cancel(e), e = null
            }, d
        }, x.throttle = function (a, b, c) {
            function d(b) {
                g = +new Date, a.apply(e, f), p(function () {
                    h = null
                }, 0, 1, !1)
            }

            c = c || {};
            var e, f, g = 0, h = null;
            return function () {
                if (e = this, f = arguments, null === h) {
                    var a = +new Date - g;
                    a > b ? d() : c.trailing && (h = p(d, b - a, 1, !1))
                }
            }
        }, x.on = {}, x.off = {}, x._events = {}, x.addOff = function (a) {
            x.off[a] = function (b, c) {
                var d = x._events[a].indexOf(c);
                d > 0 && x._events[a].removeAt(d)
            }
        };
        var y, z,
            A = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"];
        return x.on.mousewheel = function (a, b) {
            if (a && b) {
                var c = angular.element(a);
                c.data("mousewheel-line-height", d(c)), c.data("mousewheel-page-height", x.elementHeight(c)), c.data("mousewheel-callbacks") || c.data("mousewheel-callbacks", {});
                var f = c.data("mousewheel-callbacks");
                f[b] = (Function.prototype.bind || e).call(u, c[0], b);
                for (var g = A.length; g;) c.on(A[--g], f[b])
            }
        }, x.off.mousewheel = function (a, b) {
            var c = angular.element(a), d = c.data("mousewheel-callbacks"), e = d[b];
            if (e) for (var f = A.length; f;) c.off(A[--f], e);
            delete d[b], 0 === Object.keys(d).length && (c.removeData("mousewheel-line-height"), c.removeData("mousewheel-page-height"), c.removeData("mousewheel-callbacks"))
        }, x
    }]), f.filter("px", function () {
        return function (a) {
            return a.match(/^[\d\.]+$/) ? a + "px" : a
        }
    })
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            var b = {
                aggregate: {label: "položky"},
                groupPanel: {description: "Přesuňte záhlaví zde pro vytvoření skupiny dle sloupce."},
                search: {
                    placeholder: "Hledat...",
                    showingItems: "Zobrazuji položky:",
                    selectedItems: "Vybrané položky:",
                    totalItems: "Celkem položek:",
                    size: "Velikost strany:",
                    first: "První strana",
                    next: "Další strana",
                    previous: "Předchozí strana",
                    last: "Poslední strana"
                },
                menu: {text: "Vyberte sloupec:"},
                sort: {ascending: "Seřadit od A-Z", descending: "Seřadit od Z-A", remove: "Odebrat seřazení"},
                column: {hide: "Schovat sloupec"},
                aggregation: {count: "celkem řádků: ", sum: "celkem: ", avg: "avg: ", min: "min.: ", max: "max.: "},
                pinning: {pinLeft: "Zamknout vlevo", pinRight: "Zamknout vpravo", unpin: "Odemknout"},
                gridMenu: {
                    columns: "Sloupce:",
                    importerTitle: "Importovat soubor",
                    exporterAllAsCsv: "Exportovat všechna data do csv",
                    exporterVisibleAsCsv: "Exportovat viditelná data do csv",
                    exporterSelectedAsCsv: "Exportovat vybraná data do csv",
                    exporterAllAsPdf: "Exportovat všechna data do pdf",
                    exporterVisibleAsPdf: "Exportovat viditelná data do pdf",
                    exporterSelectedAsPdf: "Exportovat vybraná data do pdf",
                    clearAllFilters: "Odstranit všechny filtry"
                },
                importer: {
                    noHeaders: "Názvy sloupců se nepodařilo získat, obsahuje soubor záhlaví?",
                    noObjects: "Data se nepodařilo zpracovat, obsahuje soubor řádky mimo záhlaví?",
                    invalidCsv: "Soubor nelze zpracovat, jedná se o CSV?",
                    invalidJson: "Soubor nelze zpracovat, je to JSON?",
                    jsonNotArray: "Soubor musí obsahovat json. Ukončuji.."
                },
                pagination: {sizes: "položek na stránku", totalItems: "položek"},
                grouping: {
                    group: "Seskupit",
                    ungroup: "Odebrat seskupení",
                    aggregate_count: "Agregace: Count",
                    aggregate_sum: "Agregace: Sum",
                    aggregate_max: "Agregace: Max",
                    aggregate_min: "Agregace: Min",
                    aggregate_avg: "Agregace: Avg",
                    aggregate_remove: "Agregace: Odebrat"
                }
            };
            return a.add("cs", b), a.add("cz", b), a.add("cs-cz", b), a.add("cs-CZ", b), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("da", {
                aggregate: {label: "artikler"},
                groupPanel: {description: "Grupér rækker udfra en kolonne ved at trække dens overskift hertil."},
                search: {
                    placeholder: "Søg...",
                    showingItems: "Viste rækker:",
                    selectedItems: "Valgte rækker:",
                    totalItems: "Rækker totalt:",
                    size: "Side størrelse:",
                    first: "Første side",
                    next: "Næste side",
                    previous: "Forrige side",
                    last: "Sidste side"
                },
                menu: {text: "Vælg kolonner:"},
                sort: {
                    ascending: "Sorter stigende",
                    descending: "Sorter faldende",
                    none: "Sorter ingen",
                    remove: "Fjern sortering"
                },
                column: {hide: "Skjul kolonne"},
                aggregation: {count: "antal rækker: ", sum: "sum: ", avg: "gns: ", min: "min: ", max: "max: "},
                gridMenu: {
                    columns: "Kolonner:",
                    importerTitle: "Importer fil",
                    exporterAllAsCsv: "Eksporter alle data som csv",
                    exporterVisibleAsCsv: "Eksporter synlige data som csv",
                    exporterSelectedAsCsv: "Eksporter markerede data som csv",
                    exporterAllAsPdf: "Eksporter alle data som pdf",
                    exporterVisibleAsPdf: "Eksporter synlige data som pdf",
                    exporterSelectedAsPdf: "Eksporter markerede data som pdf",
                    clearAllFilters: "Clear all filters"
                },
                importer: {
                    noHeaders: "Column names were unable to be derived, does the file have a header?",
                    noObjects: "Objects were not able to be derived, was there data in the file other than headers?",
                    invalidCsv: "File was unable to be processed, is it valid CSV?",
                    invalidJson: "File was unable to be processed, is it valid Json?",
                    jsonNotArray: "Imported json file must contain an array, aborting."
                },
                pagination: {
                    aria: {
                        pageToFirst: "Gå til første",
                        pageBack: "Gå tilbage",
                        pageSelected: "Valgte side",
                        pageForward: "Gå frem",
                        pageToLast: "Gå til sidste"
                    }, sizes: "genstande per side", totalItems: "genstande", through: "gennem", of: "af"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("de", {
                headerCell: {
                    aria: {
                        defaultFilterLabel: "Filter für Spalte",
                        removeFilter: "Filter löschen",
                        columnMenuButtonLabel: "Spaltenmenü"
                    }, priority: "Priorität:", filterLabel: "Filter für Spalte: "
                },
                aggregate: {label: "Eintrag"},
                groupPanel: {description: "Ziehen Sie eine Spaltenüberschrift hierhin, um nach dieser Spalte zu gruppieren."},
                search: {
                    placeholder: "Suche...",
                    showingItems: "Zeige Einträge:",
                    selectedItems: "Ausgewählte Einträge:",
                    totalItems: "Einträge gesamt:",
                    size: "Einträge pro Seite:",
                    first: "Erste Seite",
                    next: "Nächste Seite",
                    previous: "Vorherige Seite",
                    last: "Letzte Seite"
                },
                menu: {text: "Spalten auswählen:"},
                sort: {
                    ascending: "aufsteigend sortieren",
                    descending: "absteigend sortieren",
                    none: "keine Sortierung",
                    remove: "Sortierung zurücksetzen"
                },
                column: {hide: "Spalte ausblenden"},
                aggregation: {
                    count: "Zeilen insgesamt: ",
                    sum: "gesamt: ",
                    avg: "Durchschnitt: ",
                    min: "min: ",
                    max: "max: "
                },
                pinning: {pinLeft: "Links anheften", pinRight: "Rechts anheften", unpin: "Lösen"},
                columnMenu: {close: "Schließen"},
                gridMenu: {
                    aria: {buttonLabel: "Tabellenmenü"},
                    columns: "Spalten:",
                    importerTitle: "Datei importieren",
                    exporterAllAsCsv: "Alle Daten als CSV exportieren",
                    exporterVisibleAsCsv: "sichtbare Daten als CSV exportieren",
                    exporterSelectedAsCsv: "markierte Daten als CSV exportieren",
                    exporterAllAsPdf: "Alle Daten als PDF exportieren",
                    exporterVisibleAsPdf: "sichtbare Daten als PDF exportieren",
                    exporterSelectedAsPdf: "markierte Daten als PDF exportieren",
                    clearAllFilters: "Alle Filter zurücksetzen"
                },
                importer: {
                    noHeaders: "Es konnten keine Spaltennamen ermittelt werden. Sind in der Datei Spaltendefinitionen enthalten?",
                    noObjects: "Es konnten keine Zeileninformationen gelesen werden, Sind in der Datei außer den Spaltendefinitionen auch Daten enthalten?",
                    invalidCsv: "Die Datei konnte nicht eingelesen werden, ist es eine gültige CSV-Datei?",
                    invalidJson: "Die Datei konnte nicht eingelesen werden. Enthält sie gültiges JSON?",
                    jsonNotArray: "Die importierte JSON-Datei muß ein Array enthalten. Breche Import ab."
                },
                pagination: {
                    aria: {
                        pageToFirst: "Zum Anfang",
                        pageBack: "Seite zurück",
                        pageSelected: "Ausgwählte Seite",
                        pageForward: "Seite vor",
                        pageToLast: "Zum Ende"
                    }, sizes: "Einträge pro Seite", totalItems: "Einträge", through: "bis", of: "von"
                },
                grouping: {
                    group: "Gruppieren",
                    ungroup: "Gruppierung aufheben",
                    aggregate_count: "Agg: Anzahl",
                    aggregate_sum: "Agg: Summe",
                    aggregate_max: "Agg: Maximum",
                    aggregate_min: "Agg: Minimum",
                    aggregate_avg: "Agg: Mittelwert",
                    aggregate_remove: "Aggregation entfernen"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("en", {
                headerCell: {
                    aria: {
                        defaultFilterLabel: "Filter for column",
                        removeFilter: "Remove Filter",
                        columnMenuButtonLabel: "Column Menu"
                    }, priority: "Priority:", filterLabel: "Filter for column: "
                },
                aggregate: {label: "items"},
                groupPanel: {description: "Drag a column header here and drop it to group by that column."},
                search: {
                    placeholder: "Search...",
                    showingItems: "Showing Items:",
                    selectedItems: "Selected Items:",
                    totalItems: "Total Items:",
                    size: "Page Size:",
                    first: "First Page",
                    next: "Next Page",
                    previous: "Previous Page",
                    last: "Last Page"
                },
                menu: {text: "Choose Columns:"},
                sort: {
                    ascending: "Sort Ascending",
                    descending: "Sort Descending",
                    none: "Sort None",
                    remove: "Remove Sort"
                },
                column: {hide: "Hide Column"},
                aggregation: {count: "total rows: ", sum: "total: ", avg: "avg: ", min: "min: ", max: "max: "},
                pinning: {pinLeft: "Pin Left", pinRight: "Pin Right", unpin: "Unpin"},
                columnMenu: {close: "Close"},
                gridMenu: {
                    aria: {buttonLabel: "Grid Menu"},
                    columns: "Columns:",
                    importerTitle: "Import file",
                    exporterAllAsCsv: "Export all data as csv",
                    exporterVisibleAsCsv: "Export visible data as csv",
                    exporterSelectedAsCsv: "Export selected data as csv",
                    exporterAllAsPdf: "Export all data as pdf",
                    exporterVisibleAsPdf: "Export visible data as pdf",
                    exporterSelectedAsPdf: "Export selected data as pdf",
                    clearAllFilters: "Clear all filters"
                },
                importer: {
                    noHeaders: "Column names were unable to be derived, does the file have a header?",
                    noObjects: "Objects were not able to be derived, was there data in the file other than headers?",
                    invalidCsv: "File was unable to be processed, is it valid CSV?",
                    invalidJson: "File was unable to be processed, is it valid Json?",
                    jsonNotArray: "Imported json file must contain an array, aborting."
                },
                pagination: {
                    aria: {
                        pageToFirst: "Page to first",
                        pageBack: "Page back",
                        pageSelected: "Selected page",
                        pageForward: "Page forward",
                        pageToLast: "Page to last"
                    }, sizes: "items per page", totalItems: "items", through: "through", of: "of"
                },
                grouping: {
                    group: "Group",
                    ungroup: "Ungroup",
                    aggregate_count: "Agg: Count",
                    aggregate_sum: "Agg: Sum",
                    aggregate_max: "Agg: Max",
                    aggregate_min: "Agg: Min",
                    aggregate_avg: "Agg: Avg",
                    aggregate_remove: "Agg: Remove"
                },
                validate: {
                    error: "Error:",
                    minLength: "Value should be at least THRESHOLD characters long.",
                    maxLength: "Value should be at most THRESHOLD characters long.",
                    required: "A value is needed."
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("es", {
                aggregate: {label: "Artículos"},
                groupPanel: {description: "Arrastre un encabezado de columna aquí y suéltelo para agrupar por esa columna."},
                search: {
                    placeholder: "Buscar...",
                    showingItems: "Artículos Mostrados:",
                    selectedItems: "Artículos Seleccionados:",
                    totalItems: "Artículos Totales:",
                    size: "Tamaño de Página:",
                    first: "Primera Página",
                    next: "Página Siguiente",
                    previous: "Página Anterior",
                    last: "Última Página"
                },
                menu: {text: "Elegir columnas:"},
                sort: {ascending: "Orden Ascendente", descending: "Orden Descendente", remove: "Sin Ordenar"},
                column: {hide: "Ocultar la columna"},
                aggregation: {count: "filas totales: ", sum: "total: ", avg: "media: ", min: "min: ", max: "max: "},
                pinning: {pinLeft: "Fijar a la Izquierda", pinRight: "Fijar a la Derecha", unpin: "Quitar Fijación"},
                gridMenu: {
                    columns: "Columnas:",
                    importerTitle: "Importar archivo",
                    exporterAllAsCsv: "Exportar todo como csv",
                    exporterVisibleAsCsv: "Exportar vista como csv",
                    exporterSelectedAsCsv: "Exportar selección como csv",
                    exporterAllAsPdf: "Exportar todo como pdf",
                    exporterVisibleAsPdf: "Exportar vista como pdf",
                    exporterSelectedAsPdf: "Exportar selección como pdf",
                    clearAllFilters: "Limpiar todos los filtros"
                },
                importer: {
                    noHeaders: "No fue posible derivar los nombres de las columnas, ¿tiene encabezados el archivo?",
                    noObjects: "No fue posible obtener registros, ¿contiene datos el archivo, aparte de los encabezados?",
                    invalidCsv: "No fue posible procesar el archivo, ¿es un CSV válido?",
                    invalidJson: "No fue posible procesar el archivo, ¿es un Json válido?",
                    jsonNotArray: "El archivo json importado debe contener un array, abortando."
                },
                pagination: {sizes: "registros por página", totalItems: "registros", of: "de"},
                grouping: {
                    group: "Agrupar",
                    ungroup: "Desagrupar",
                    aggregate_count: "Agr: Cont",
                    aggregate_sum: "Agr: Sum",
                    aggregate_max: "Agr: Máx",
                    aggregate_min: "Agr: Min",
                    aggregate_avg: "Agr: Prom",
                    aggregate_remove: "Agr: Quitar"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("fa", {
                aggregate: {label: "قلم"},
                groupPanel: {description: "عنوان یک ستون را بگیر و به گروهی از آن ستون رها کن."},
                search: {
                    placeholder: "جستجو...",
                    showingItems: "نمایش اقلام:",
                    selectedItems: "قلم‌های انتخاب شده:",
                    totalItems: "مجموع اقلام:",
                    size: "اندازه‌ی صفحه:",
                    first: "اولین صفحه",
                    next: "صفحه‌ی‌بعدی",
                    previous: "صفحه‌ی‌ قبلی",
                    last: "آخرین صفحه"
                },
                menu: {text: "ستون‌های انتخابی:"},
                sort: {ascending: "ترتیب صعودی", descending: "ترتیب نزولی", remove: "حذف مرتب کردن"},
                column: {hide: "پنهان‌کردن ستون"},
                aggregation: {count: "تعداد: ", sum: "مجموع: ", avg: "میانگین: ", min: "کمترین: ", max: "بیشترین: "},
                pinning: {pinLeft: "پین کردن سمت چپ", pinRight: "پین کردن سمت راست", unpin: "حذف پین"},
                gridMenu: {
                    columns: "ستون‌ها:",
                    importerTitle: "وارد کردن فایل",
                    exporterAllAsCsv: "خروجی تمام داده‌ها در فایل csv",
                    exporterVisibleAsCsv: "خروجی داده‌های قابل مشاهده در فایل csv",
                    exporterSelectedAsCsv: "خروجی داده‌های انتخاب‌شده در فایل csv",
                    exporterAllAsPdf: "خروجی تمام داده‌ها در فایل pdf",
                    exporterVisibleAsPdf: "خروجی داده‌های قابل مشاهده در فایل pdf",
                    exporterSelectedAsPdf: "خروجی داده‌های انتخاب‌شده در فایل pdf",
                    clearAllFilters: "پاک کردن تمام فیلتر"
                },
                importer: {
                    noHeaders: "نام ستون قابل استخراج نیست. آیا فایل عنوان دارد؟",
                    noObjects: "اشیا قابل استخراج نیستند. آیا به جز عنوان‌ها در فایل داده وجود دارد؟",
                    invalidCsv: "فایل قابل پردازش نیست. آیا فرمت  csv  معتبر است؟",
                    invalidJson: "فایل قابل پردازش نیست. آیا فرمت json   معتبر است؟",
                    jsonNotArray: "فایل json وارد شده باید حاوی آرایه باشد. عملیات ساقط شد."
                },
                pagination: {sizes: "اقلام در هر صفحه", totalItems: "اقلام", of: "از"},
                grouping: {
                    group: "گروه‌بندی",
                    ungroup: "حذف گروه‌بندی",
                    aggregate_count: "Agg: تعداد",
                    aggregate_sum: "Agg: جمع",
                    aggregate_max: "Agg: بیشینه",
                    aggregate_min: "Agg: کمینه",
                    aggregate_avg: "Agg: میانگین",
                    aggregate_remove: "Agg: حذف"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("fi", {
                aggregate: {label: "rivit"},
                groupPanel: {description: "Raahaa ja pudota otsikko tähän ryhmittääksesi sarakkeen mukaan."},
                search: {
                    placeholder: "Hae...",
                    showingItems: "Näytetään rivejä:",
                    selectedItems: "Valitut rivit:",
                    totalItems: "Rivejä yht.:",
                    size: "Näytä:",
                    first: "Ensimmäinen sivu",
                    next: "Seuraava sivu",
                    previous: "Edellinen sivu",
                    last: "Viimeinen sivu"
                },
                menu: {text: "Valitse sarakkeet:"},
                sort: {ascending: "Järjestä nouseva", descending: "Järjestä laskeva", remove: "Poista järjestys"},
                column: {hide: "Piilota sarake"},
                aggregation: {count: "Rivejä yht.: ", sum: "Summa: ", avg: "K.a.: ", min: "Min: ", max: "Max: "},
                pinning: {pinLeft: "Lukitse vasemmalle", pinRight: "Lukitse oikealle", unpin: "Poista lukitus"},
                gridMenu: {
                    columns: "Sarakkeet:",
                    importerTitle: "Tuo tiedosto",
                    exporterAllAsCsv: "Vie tiedot csv-muodossa",
                    exporterVisibleAsCsv: "Vie näkyvä tieto csv-muodossa",
                    exporterSelectedAsCsv: "Vie valittu tieto csv-muodossa",
                    exporterAllAsPdf: "Vie tiedot pdf-muodossa",
                    exporterVisibleAsPdf: "Vie näkyvä tieto pdf-muodossa",
                    exporterSelectedAsPdf: "Vie valittu tieto pdf-muodossa",
                    clearAllFilters: "Puhdista kaikki suodattimet"
                },
                importer: {
                    noHeaders: "Sarakkeen nimiä ei voitu päätellä, onko tiedostossa otsikkoriviä?",
                    noObjects: "Tietoja ei voitu lukea, onko tiedostossa muuta kuin otsikkot?",
                    invalidCsv: "Tiedostoa ei voitu käsitellä, oliko se CSV-muodossa?",
                    invalidJson: "Tiedostoa ei voitu käsitellä, oliko se JSON-muodossa?",
                    jsonNotArray: "Tiedosto ei sisältänyt taulukkoa, lopetetaan."
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("fr", {
                headerCell: {
                    aria: {
                        defaultFilterLabel: "Filtre de la colonne",
                        removeFilter: "Supprimer le filtre",
                        columnMenuButtonLabel: "Menu de la colonne"
                    }, priority: "Priorité:", filterLabel: "Filtre de la colonne: "
                },
                aggregate: {label: "éléments"},
                groupPanel: {description: "Faites glisser une en-tête de colonne ici pour créer un groupe de colonnes."},
                search: {
                    placeholder: "Recherche...",
                    showingItems: "Affichage des éléments :",
                    selectedItems: "Éléments sélectionnés :",
                    totalItems: "Nombre total d'éléments:",
                    size: "Taille de page:",
                    first: "Première page",
                    next: "Page Suivante",
                    previous: "Page précédente",
                    last: "Dernière page"
                },
                menu: {text: "Choisir des colonnes :"},
                sort: {
                    ascending: "Trier par ordre croissant",
                    descending: "Trier par ordre décroissant",
                    none: "Aucun tri",
                    remove: "Enlever le tri"
                },
                column: {hide: "Cacher la colonne"},
                aggregation: {count: "lignes totales: ", sum: "total: ", avg: "moy: ", min: "min: ", max: "max: "},
                pinning: {pinLeft: "Épingler à gauche", pinRight: "Épingler à droite", unpin: "Détacher"},
                columnMenu: {close: "Fermer"},
                gridMenu: {
                    aria: {buttonLabel: "Menu du tableau"},
                    columns: "Colonnes:",
                    importerTitle: "Importer un fichier",
                    exporterAllAsCsv: "Exporter toutes les données en CSV",
                    exporterVisibleAsCsv: "Exporter les données visibles en CSV",
                    exporterSelectedAsCsv: "Exporter les données sélectionnées en CSV",
                    exporterAllAsPdf: "Exporter toutes les données en PDF",
                    exporterVisibleAsPdf: "Exporter les données visibles en PDF",
                    exporterSelectedAsPdf: "Exporter les données sélectionnées en PDF",
                    clearAllFilters: "Nettoyez tous les filtres"
                },
                importer: {
                    noHeaders: "Impossible de déterminer le nom des colonnes, le fichier possède-t-il une en-tête ?",
                    noObjects: "Aucun objet trouvé, le fichier possède-t-il des données autres que l'en-tête ?",
                    invalidCsv: "Le fichier n'a pas pu être traité, le CSV est-il valide ?",
                    invalidJson: "Le fichier n'a pas pu être traité, le JSON est-il valide ?",
                    jsonNotArray: "Le fichier JSON importé doit contenir un tableau, abandon."
                },
                pagination: {
                    aria: {
                        pageToFirst: "Aller à la première page",
                        pageBack: "Page précédente",
                        pageSelected: "Page sélectionnée",
                        pageForward: "Page suivante",
                        pageToLast: "Aller à la dernière page"
                    }, sizes: "éléments par page", totalItems: "éléments", through: "à", of: "sur"
                },
                grouping: {
                    group: "Grouper",
                    ungroup: "Dégrouper",
                    aggregate_count: "Agg: Compter",
                    aggregate_sum: "Agg: Somme",
                    aggregate_max: "Agg: Max",
                    aggregate_min: "Agg: Min",
                    aggregate_avg: "Agg: Moy",
                    aggregate_remove: "Agg: Retirer"
                },
                validate: {
                    error: "Erreur:",
                    minLength: "La valeur doit être supérieure ou égale à THRESHOLD caractères.",
                    maxLength: "La valeur doit être inférieure ou égale à THRESHOLD caractères.",
                    required: "Une valeur est nécéssaire."
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("he", {
                aggregate: {label: "items"},
                groupPanel: {description: "גרור עמודה לכאן ושחרר בכדי לקבץ עמודה זו."},
                search: {
                    placeholder: "חפש...",
                    showingItems: "מציג:",
                    selectedItems: 'סה"כ נבחרו:',
                    totalItems: 'סה"כ רשומות:',
                    size: "תוצאות בדף:",
                    first: "דף ראשון",
                    next: "דף הבא",
                    previous: "דף קודם",
                    last: "דף אחרון"
                },
                menu: {text: "בחר עמודות:"},
                sort: {ascending: "סדר עולה", descending: "סדר יורד", remove: "בטל"},
                column: {hide: "טור הסתר"},
                aggregation: {count: "total rows: ", sum: "total: ", avg: "avg: ", min: "min: ", max: "max: "},
                gridMenu: {
                    columns: "Columns:",
                    importerTitle: "Import file",
                    exporterAllAsCsv: "Export all data as csv",
                    exporterVisibleAsCsv: "Export visible data as csv",
                    exporterSelectedAsCsv: "Export selected data as csv",
                    exporterAllAsPdf: "Export all data as pdf",
                    exporterVisibleAsPdf: "Export visible data as pdf",
                    exporterSelectedAsPdf: "Export selected data as pdf",
                    clearAllFilters: "Clean all filters"
                },
                importer: {
                    noHeaders: "Column names were unable to be derived, does the file have a header?",
                    noObjects: "Objects were not able to be derived, was there data in the file other than headers?",
                    invalidCsv: "File was unable to be processed, is it valid CSV?",
                    invalidJson: "File was unable to be processed, is it valid Json?",
                    jsonNotArray: "Imported json file must contain an array, aborting."
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("hy", {
                aggregate: {label: "տվյալներ"},
                groupPanel: {description: "Ըստ սյան խմբավորելու համար քաշեք և գցեք վերնագիրն այստեղ։"},
                search: {
                    placeholder: "Փնտրում...",
                    showingItems: "Ցուցադրված տվյալներ՝",
                    selectedItems: "Ընտրված:",
                    totalItems: "Ընդամենը՝",
                    size: "Տողերի քանակը էջում՝",
                    first: "Առաջին էջ",
                    next: "Հաջորդ էջ",
                    previous: "Նախորդ էջ",
                    last: "Վերջին էջ"
                },
                menu: {text: "Ընտրել սյուները:"},
                sort: {ascending: "Աճման կարգով", descending: "Նվազման կարգով", remove: "Հանել "},
                column: {hide: "Թաքցնել սյունը"},
                aggregation: {count: "ընդամենը տող՝ ", sum: "ընդամենը՝ ", avg: "միջին՝ ", min: "մին՝ ", max: "մաքս՝ "},
                pinning: {pinLeft: "Կպցնել ձախ կողմում", pinRight: "Կպցնել աջ կողմում", unpin: "Արձակել"},
                gridMenu: {
                    columns: "Սյուներ:",
                    importerTitle: "Ներմուծել ֆայլ",
                    exporterAllAsCsv: "Արտահանել ամբողջը CSV",
                    exporterVisibleAsCsv: "Արտահանել երևացող տվյալները CSV",
                    exporterSelectedAsCsv: "Արտահանել ընտրված տվյալները CSV",
                    exporterAllAsPdf: "Արտահանել PDF",
                    exporterVisibleAsPdf: "Արտահանել երևացող տվյալները PDF",
                    exporterSelectedAsPdf: "Արտահանել ընտրված տվյալները PDF",
                    clearAllFilters: "Մաքրել բոլոր ֆիլտրերը"
                },
                importer: {
                    noHeaders: "Հնարավոր չեղավ որոշել սյան վերնագրերը։ Արդյո՞ք ֆայլը ունի վերնագրեր։",
                    noObjects: "Հնարավոր չեղավ կարդալ տվյալները։ Արդյո՞ք ֆայլում կան տվյալներ։",
                    invalidCsv: "Հնարավոր չեղավ մշակել ֆայլը։ Արդյո՞ք այն վավեր CSV է։",
                    invalidJson: "Հնարավոր չեղավ մշակել ֆայլը։ Արդյո՞ք այն վավեր Json է։",
                    jsonNotArray: "Ներմուծված json ֆայլը պետք է պարունակի զանգված, կասեցվում է։"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("it", {
                aggregate: {label: "elementi"},
                groupPanel: {description: "Trascina un'intestazione all'interno del gruppo della colonna."},
                search: {
                    placeholder: "Ricerca...",
                    showingItems: "Mostra:",
                    selectedItems: "Selezionati:",
                    totalItems: "Totali:",
                    size: "Tot Pagine:",
                    first: "Prima",
                    next: "Prossima",
                    previous: "Precedente",
                    last: "Ultima"
                },
                menu: {text: "Scegli le colonne:"},
                sort: {ascending: "Asc.", descending: "Desc.", remove: "Annulla ordinamento"},
                column: {hide: "Nascondi"},
                aggregation: {count: "righe totali: ", sum: "tot: ", avg: "media: ", min: "minimo: ", max: "massimo: "},
                pinning: {pinLeft: "Blocca a sx", pinRight: "Blocca a dx", unpin: "Blocca in alto"},
                gridMenu: {
                    columns: "Colonne:",
                    importerTitle: "Importa",
                    exporterAllAsCsv: "Esporta tutti i dati in CSV",
                    exporterVisibleAsCsv: "Esporta i dati visibili in CSV",
                    exporterSelectedAsCsv: "Esporta i dati selezionati in CSV",
                    exporterAllAsPdf: "Esporta tutti i dati in PDF",
                    exporterVisibleAsPdf: "Esporta i dati visibili in PDF",
                    exporterSelectedAsPdf: "Esporta i dati selezionati in PDF",
                    clearAllFilters: "Pulire tutti i filtri"
                },
                importer: {
                    noHeaders: "Impossibile reperire i nomi delle colonne, sicuro che siano indicati all'interno del file?",
                    noObjects: "Impossibile reperire gli oggetti, sicuro che siano indicati all'interno del file?",
                    invalidCsv: "Impossibile elaborare il file, sicuro che sia un CSV?",
                    invalidJson: "Impossibile elaborare il file, sicuro che sia un JSON valido?",
                    jsonNotArray: "Errore! Il file JSON da importare deve contenere un array."
                },
                pagination: {
                    aria: {
                        pageToFirst: "Prima",
                        pageBack: "Indietro",
                        pageSelected: "Pagina selezionata",
                        pageForward: "Avanti",
                        pageToLast: "Ultima"
                    }, sizes: "elementi per pagina", totalItems: "elementi", through: "a", of: "di"
                },
                grouping: {
                    group: "Raggruppa",
                    ungroup: "Separa",
                    aggregate_count: "Agg: N. Elem.",
                    aggregate_sum: "Agg: Somma",
                    aggregate_max: "Agg: Massimo",
                    aggregate_min: "Agg: Minimo",
                    aggregate_avg: "Agg: Media",
                    aggregate_remove: "Agg: Rimuovi"
                },
                validate: {
                    error: "Errore:",
                    minLength: "Lunghezza minima pari a THRESHOLD caratteri.",
                    maxLength: "Lunghezza massima pari a THRESHOLD caratteri.",
                    required: "Necessario inserire un valore."
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("ja", {
                aggregate: {label: "項目"},
                groupPanel: {description: "ここに列ヘッダをドラッグアンドドロップして、その列でグループ化します。"},
                search: {
                    placeholder: "検索...",
                    showingItems: "表示中の項目:",
                    selectedItems: "選択した項目:",
                    totalItems: "項目の総数:",
                    size: "ページサイズ:",
                    first: "最初のページ",
                    next: "次のページ",
                    previous: "前のページ",
                    last: "前のページ"
                },
                menu: {text: "列の選択:"},
                sort: {ascending: "昇順に並べ替え", descending: "降順に並べ替え", remove: "並べ替えの解除"},
                column: {hide: "列の非表示"},
                aggregation: {count: "合計行数: ", sum: "合計: ", avg: "平均: ", min: "最小: ", max: "最大: "},
                pinning: {pinLeft: "左に固定", pinRight: "右に固定", unpin: "固定解除"},
                gridMenu: {
                    columns: "列:",
                    importerTitle: "ファイルのインポート",
                    exporterAllAsCsv: "すべてのデータをCSV形式でエクスポート",
                    exporterVisibleAsCsv: "表示中のデータをCSV形式でエクスポート",
                    exporterSelectedAsCsv: "選択したデータをCSV形式でエクスポート",
                    exporterAllAsPdf: "すべてのデータをPDF形式でエクスポート",
                    exporterVisibleAsPdf: "表示中のデータをPDF形式でエクスポート",
                    exporterSelectedAsPdf: "選択したデータをPDF形式でエクスポート",
                    clearAllFilters: "すべてのフィルタを清掃してください"
                },
                importer: {
                    noHeaders: "列名を取得できません。ファイルにヘッダが含まれていることを確認してください。",
                    noObjects: "オブジェクトを取得できません。ファイルにヘッダ以外のデータが含まれていることを確認してください。",
                    invalidCsv: "ファイルを処理できません。ファイルが有効なCSV形式であることを確認してください。",
                    invalidJson: "ファイルを処理できません。ファイルが有効なJSON形式であることを確認してください。",
                    jsonNotArray: "インポートしたJSONファイルには配列が含まれている必要があります。処理を中止します。"
                },
                pagination: {
                    aria: {
                        pageToFirst: "最初のページ",
                        pageBack: "前のページ",
                        pageSelected: "現在のページ",
                        pageForward: "次のページ",
                        pageToLast: "最後のページ"
                    }, sizes: "項目/ページ", totalItems: "項目", through: "から", of: "項目/全"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("ko", {
                aggregate: {label: "아이템"},
                groupPanel: {description: "컬럼으로 그룹핑하기 위해서는 컬럼 헤더를 끌어 떨어뜨려 주세요."},
                search: {
                    placeholder: "검색...",
                    showingItems: "항목 보여주기:",
                    selectedItems: "선택 항목:",
                    totalItems: "전체 항목:",
                    size: "페이지 크기:",
                    first: "첫번째 페이지",
                    next: "다음 페이지",
                    previous: "이전 페이지",
                    last: "마지막 페이지"
                },
                menu: {text: "컬럼을 선택하세요:"},
                sort: {ascending: "오름차순 정렬", descending: "내림차순 정렬", remove: "소팅 제거"},
                column: {hide: "컬럼 제거"},
                aggregation: {count: "전체 갯수: ", sum: "전체: ", avg: "평균: ", min: "최소: ", max: "최대: "},
                pinning: {pinLeft: "왼쪽 핀", pinRight: "오른쪽 핀", unpin: "핀 제거"},
                gridMenu: {
                    columns: "컬럼:",
                    importerTitle: "파일 가져오기",
                    exporterAllAsCsv: "csv로 모든 데이터 내보내기",
                    exporterVisibleAsCsv: "csv로 보이는 데이터 내보내기",
                    exporterSelectedAsCsv: "csv로 선택된 데이터 내보내기",
                    exporterAllAsPdf: "pdf로 모든 데이터 내보내기",
                    exporterVisibleAsPdf: "pdf로 보이는 데이터 내보내기",
                    exporterSelectedAsPdf: "pdf로 선택 데이터 내보내기",
                    clearAllFilters: "모든 필터를 청소"
                },
                importer: {
                    noHeaders: "컬럼명이 지정되어 있지 않습니다. 파일에 헤더가 명시되어 있는지 확인해 주세요.",
                    noObjects: "데이터가 지정되어 있지 않습니다. 데이터가 파일에 있는지 확인해 주세요.",
                    invalidCsv: "파일을 처리할 수 없습니다. 올바른 csv인지 확인해 주세요.",
                    invalidJson: "파일을 처리할 수 없습니다. 올바른 json인지 확인해 주세요.",
                    jsonNotArray: "json 파일은 배열을 포함해야 합니다."
                },
                pagination: {sizes: "페이지당 항목", totalItems: "전체 항목"}
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("nl", {
                aggregate: {label: "items"},
                groupPanel: {description: "Sleep hier een kolomnaam heen om op te groeperen."},
                search: {
                    placeholder: "Zoeken...",
                    showingItems: "Getoonde items:",
                    selectedItems: "Geselecteerde items:",
                    totalItems: "Totaal aantal items:",
                    size: "Items per pagina:",
                    first: "Eerste pagina",
                    next: "Volgende pagina",
                    previous: "Vorige pagina",
                    last: "Laatste pagina"
                },
                menu: {text: "Kies kolommen:"},
                sort: {ascending: "Sorteer oplopend", descending: "Sorteer aflopend", remove: "Verwijder sortering"},
                column: {hide: "Verberg kolom"},
                aggregation: {count: "Aantal rijen: ", sum: "Som: ", avg: "Gemiddelde: ", min: "Min: ", max: "Max: "},
                pinning: {pinLeft: "Zet links vast", pinRight: "Zet rechts vast", unpin: "Maak los"},
                gridMenu: {
                    columns: "Kolommen:",
                    importerTitle: "Importeer bestand",
                    exporterAllAsCsv: "Exporteer alle data als csv",
                    exporterVisibleAsCsv: "Exporteer zichtbare data als csv",
                    exporterSelectedAsCsv: "Exporteer geselecteerde data als csv",
                    exporterAllAsPdf: "Exporteer alle data als pdf",
                    exporterVisibleAsPdf: "Exporteer zichtbare data als pdf",
                    exporterSelectedAsPdf: "Exporteer geselecteerde data als pdf",
                    clearAllFilters: "Reinig alle filters"
                },
                importer: {
                    noHeaders: "Kolomnamen kunnen niet worden afgeleid. Heeft het bestand een header?",
                    noObjects: "Objecten kunnen niet worden afgeleid. Bevat het bestand data naast de headers?",
                    invalidCsv: "Het bestand kan niet verwerkt worden. Is het een valide csv bestand?",
                    invalidJson: "Het bestand kan niet verwerkt worden. Is het valide json?",
                    jsonNotArray: "Het json bestand moet een array bevatten. De actie wordt geannuleerd."
                },
                pagination: {sizes: "items per pagina", totalItems: "items", of: "van de"},
                grouping: {
                    group: "Groepeer",
                    ungroup: "Groepering opheffen",
                    aggregate_count: "Agg: Aantal",
                    aggregate_sum: "Agg: Som",
                    aggregate_max: "Agg: Max",
                    aggregate_min: "Agg: Min",
                    aggregate_avg: "Agg: Gem",
                    aggregate_remove: "Agg: Verwijder"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("no", {
                headerCell: {
                    aria: {
                        defaultFilterLabel: "Filter for column",
                        removeFilter: "Remove Filter",
                        columnMenuButtonLabel: "Column Menu"
                    }, priority: "Priority:", filterLabel: "Filter for column: "
                },
                aggregate: {label: "items"},
                groupPanel: {description: "Drag a column header here and drop it to group by that column."},
                search: {
                    placeholder: "Search...",
                    showingItems: "Showing Items:",
                    selectedItems: "Selected Items:",
                    totalItems: "Total Items:",
                    size: "Page Size:",
                    first: "First Page",
                    next: "Next Page",
                    previous: "Previous Page",
                    last: "Last Page"
                },
                menu: {text: "Choose Columns:"},
                sort: {
                    ascending: "Sort Ascending",
                    descending: "Sort Descending",
                    none: "Sort None",
                    remove: "Remove Sort"
                },
                column: {hide: "Hide Column"},
                aggregation: {count: "total rows: ", sum: "total: ", avg: "avg: ", min: "min: ", max: "max: "},
                pinning: {pinLeft: "Pin Left", pinRight: "Pin Right", unpin: "Unpin"},
                columnMenu: {close: "Close"},
                gridMenu: {
                    aria: {buttonLabel: "Grid Menu"},
                    columns: "Kolonner:",
                    importerTitle: "Importer fil",
                    exporterAllAsCsv: "Eksporter alle data som csv",
                    exporterVisibleAsCsv: "Eksporter synlige data som csv",
                    exporterSelectedAsCsv: "Eksporter utvalgte data som csv",
                    exporterAllAsPdf: "Eksporter alle data som pdf",
                    exporterVisibleAsPdf: "Eksporter synlige data som pdf",
                    exporterSelectedAsPdf: "Eksporter utvalgte data som pdf",
                    clearAllFilters: "Clear all filters"
                },
                importer: {
                    noHeaders: "Column names were unable to be derived, does the file have a header?",
                    noObjects: "Objects were not able to be derived, was there data in the file other than headers?",
                    invalidCsv: "File was unable to be processed, is it valid CSV?",
                    invalidJson: "File was unable to be processed, is it valid Json?",
                    jsonNotArray: "Imported json file must contain an array, aborting."
                },
                pagination: {
                    aria: {
                        pageToFirst: "Page to first",
                        pageBack: "Page back",
                        pageSelected: "Selected page",
                        pageForward: "Page forward",
                        pageToLast: "Page to last"
                    }, sizes: "items per page", totalItems: "items", through: "through", of: "of"
                },
                grouping: {
                    group: "Group",
                    ungroup: "Ungroup",
                    aggregate_count: "Agg: Count",
                    aggregate_sum: "Agg: Sum",
                    aggregate_max: "Agg: Max",
                    aggregate_min: "Agg: Min",
                    aggregate_avg: "Agg: Avg",
                    aggregate_remove: "Agg: Remove"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("pl", {
                headerCell: {
                    aria: {
                        defaultFilterLabel: "Filtr dla kolumny",
                        removeFilter: "Usuń filtr",
                        columnMenuButtonLabel: "Menu kolumny"
                    }, priority: "Prioritet:", filterLabel: "Filtr dla kolumny: "
                },
                aggregate: {label: "pozycji"},
                groupPanel: {description: "Przeciągnij nagłówek kolumny tutaj, aby pogrupować według niej."},
                search: {
                    placeholder: "Szukaj...",
                    showingItems: "Widoczne pozycje:",
                    selectedItems: "Zaznaczone pozycje:",
                    totalItems: "Wszystkich pozycji:",
                    size: "Rozmiar strony:",
                    first: "Pierwsza strona",
                    next: "Następna strona",
                    previous: "Poprzednia strona",
                    last: "Ostatnia strona"
                },
                menu: {text: "Wybierz kolumny:"},
                sort: {
                    ascending: "Sortuj rosnąco",
                    descending: "Sortuj malejąco",
                    none: "Brak sortowania",
                    remove: "Wyłącz sortowanie"
                },
                column: {hide: "Ukryj kolumne"},
                aggregation: {count: "Razem pozycji: ", sum: "Razem: ", avg: "Średnia: ", min: "Min: ", max: "Max: "},
                pinning: {pinLeft: "Przypnij do lewej", pinRight: "Przypnij do prawej", unpin: "Odepnij"},
                columnMenu: {close: "Zamknij"},
                gridMenu: {
                    aria: {buttonLabel: "Menu Grida"},
                    columns: "Kolumny:",
                    importerTitle: "Importuj plik",
                    exporterAllAsCsv: "Eksportuj wszystkie dane do csv",
                    exporterVisibleAsCsv: "Eksportuj widoczne dane do csv",
                    exporterSelectedAsCsv: "Eksportuj zaznaczone dane do csv",
                    exporterAllAsPdf: "Eksportuj wszystkie dane do pdf",
                    exporterVisibleAsPdf: "Eksportuj widoczne dane do pdf",
                    exporterSelectedAsPdf: "Eksportuj zaznaczone dane do pdf",
                    clearAllFilters: "Wyczyść filtry"
                },
                importer: {
                    noHeaders: "Nie udało się wczytać nazw kolumn. Czy plik posiada nagłówek?",
                    noObjects: "Nie udalo się wczytać pozycji. Czy plik zawiera dane??",
                    invalidCsv: "Nie udało się przetworzyć pliku, jest to prawidlowy plik CSV??",
                    invalidJson: "Nie udało się przetworzyć pliku, jest to prawidlowy plik Json?",
                    jsonNotArray: "Importowany plik json musi zawierać tablicę, importowanie przerwane."
                },
                pagination: {
                    aria: {
                        pageToFirst: "Pierwsza strona",
                        pageBack: "Poprzednia strona",
                        pageSelected: "Wybrana strona",
                        pageForward: "Następna strona",
                        pageToLast: "Ostatnia strona"
                    }, sizes: "pozycji na stronę", totalItems: "pozycji", through: "do", of: "z"
                },
                grouping: {
                    group: "Grupuj",
                    ungroup: "Rozgrupuj",
                    aggregate_count: "Zbiorczo: Razem",
                    aggregate_sum: "Zbiorczo: Suma",
                    aggregate_max: "Zbiorczo: Max",
                    aggregate_min: "Zbiorczo: Min",
                    aggregate_avg: "Zbiorczo: Średnia",
                    aggregate_remove: "Zbiorczo: Usuń"
                },
                validate: {
                    error: "Błąd:",
                    minLength: "Wartość powinna składać się z co najmniej THRESHOLD znaków.",
                    maxLength: "Wartość powinna składać się z przynajmniej THRESHOLD znaków.",
                    required: "Wartość jest wymagana."
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("pt-br", {
                headerCell: {
                    aria: {
                        defaultFilterLabel: "Filtro por coluna",
                        removeFilter: "Remover filtro",
                        columnMenuButtonLabel: "Menu coluna"
                    }, priority: "Prioridade:", filterLabel: "Filtro por coluna: "
                },
                aggregate: {label: "itens"},
                groupPanel: {description: "Arraste e solte uma coluna aqui para agrupar por essa coluna"},
                search: {
                    placeholder: "Procurar...",
                    showingItems: "Mostrando os Itens:",
                    selectedItems: "Items Selecionados:",
                    totalItems: "Total de Itens:",
                    size: "Tamanho da Página:",
                    first: "Primeira Página",
                    next: "Próxima Página",
                    previous: "Página Anterior",
                    last: "Última Página"
                },
                menu: {text: "Selecione as colunas:"},
                sort: {
                    ascending: "Ordenar Ascendente",
                    descending: "Ordenar Descendente",
                    none: "Nenhuma Ordem",
                    remove: "Remover Ordenação"
                },
                column: {hide: "Esconder coluna"},
                aggregation: {count: "total de linhas: ", sum: "total: ", avg: "med: ", min: "min: ", max: "max: "},
                pinning: {pinLeft: "Fixar Esquerda", pinRight: "Fixar Direita", unpin: "Desprender"},
                columnMenu: {close: "Fechar"},
                gridMenu: {
                    aria: {buttonLabel: "Menu Grid"},
                    columns: "Colunas:",
                    importerTitle: "Importar arquivo",
                    exporterAllAsCsv: "Exportar todos os dados como csv",
                    exporterVisibleAsCsv: "Exportar dados visíveis como csv",
                    exporterSelectedAsCsv: "Exportar dados selecionados como csv",
                    exporterAllAsPdf: "Exportar todos os dados como pdf",
                    exporterVisibleAsPdf: "Exportar dados visíveis como pdf",
                    exporterSelectedAsPdf: "Exportar dados selecionados como pdf",
                    clearAllFilters: "Limpar todos os filtros"
                },
                importer: {
                    noHeaders: "Nomes de colunas não puderam ser derivados. O arquivo tem um cabeçalho?",
                    noObjects: "Objetos não puderam ser derivados. Havia dados no arquivo, além dos cabeçalhos?",
                    invalidCsv: "Arquivo não pode ser processado. É um CSV válido?",
                    invalidJson: "Arquivo não pode ser processado. É um Json válido?",
                    jsonNotArray: "Arquivo json importado tem que conter um array. Abortando."
                },
                pagination: {
                    aria: {
                        pageToFirst: "Primeira página",
                        pageBack: "Página anterior",
                        pageSelected: "Página Selecionada",
                        pageForward: "Proxima",
                        pageToLast: "Anterior"
                    }, sizes: "itens por página", totalItems: "itens", through: "através dos", of: "de"
                },
                grouping: {
                    group: "Agrupar",
                    ungroup: "Desagrupar",
                    aggregate_count: "Agr: Contar",
                    aggregate_sum: "Agr: Soma",
                    aggregate_max: "Agr: Max",
                    aggregate_min: "Agr: Min",
                    aggregate_avg: "Agr: Med",
                    aggregate_remove: "Agr: Remover"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("pt", {
                headerCell: {
                    aria: {
                        defaultFilterLabel: "Filtro por coluna",
                        removeFilter: "Remover filtro",
                        columnMenuButtonLabel: "Menu coluna"
                    }, priority: "Prioridade:", filterLabel: "Filtro por coluna: "
                },
                aggregate: {label: "itens"},
                groupPanel: {description: "Arraste e solte uma coluna aqui para agrupar por essa coluna"},
                search: {
                    placeholder: "Procurar...",
                    showingItems: "Mostrando os Itens:",
                    selectedItems: "Itens Selecionados:",
                    totalItems: "Total de Itens:",
                    size: "Tamanho da Página:",
                    first: "Primeira Página",
                    next: "Próxima Página",
                    previous: "Página Anterior",
                    last: "Última Página"
                },
                menu: {text: "Selecione as colunas:"},
                sort: {
                    ascending: "Ordenar Ascendente",
                    descending: "Ordenar Descendente",
                    none: "Nenhuma Ordem",
                    remove: "Remover Ordenação"
                },
                column: {hide: "Esconder coluna"},
                aggregation: {count: "total de linhas: ", sum: "total: ", avg: "med: ", min: "min: ", max: "max: "},
                pinning: {pinLeft: "Fixar Esquerda", pinRight: "Fixar Direita", unpin: "Desprender"},
                columnMenu: {close: "Fechar"},
                gridMenu: {
                    aria: {buttonLabel: "Menu Grid"},
                    columns: "Colunas:",
                    importerTitle: "Importar ficheiro",
                    exporterAllAsCsv: "Exportar todos os dados como csv",
                    exporterVisibleAsCsv: "Exportar dados visíveis como csv",
                    exporterSelectedAsCsv: "Exportar dados selecionados como csv",
                    exporterAllAsPdf: "Exportar todos os dados como pdf",
                    exporterVisibleAsPdf: "Exportar dados visíveis como pdf",
                    exporterSelectedAsPdf: "Exportar dados selecionados como pdf",
                    clearAllFilters: "Limpar todos os filtros"
                },
                importer: {
                    noHeaders: "Nomes de colunas não puderam ser derivados. O ficheiro tem um cabeçalho?",
                    noObjects: "Objetos não puderam ser derivados. Havia dados no ficheiro, além dos cabeçalhos?",
                    invalidCsv: "Ficheiro não pode ser processado. É um CSV válido?",
                    invalidJson: "Ficheiro não pode ser processado. É um Json válido?",
                    jsonNotArray: "Ficheiro json importado tem que conter um array. Interrompendo."
                },
                pagination: {
                    aria: {
                        pageToFirst: "Primeira página",
                        pageBack: "Página anterior",
                        pageSelected: "Página Selecionada",
                        pageForward: "Próxima",
                        pageToLast: "Anterior"
                    }, sizes: "itens por página", totalItems: "itens", through: "através dos", of: "de"
                },
                grouping: {
                    group: "Agrupar",
                    ungroup: "Desagrupar",
                    aggregate_count: "Agr: Contar",
                    aggregate_sum: "Agr: Soma",
                    aggregate_max: "Agr: Max",
                    aggregate_min: "Agr: Min",
                    aggregate_avg: "Agr: Med",
                    aggregate_remove: "Agr: Remover"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("ro", {
                headerCell: {
                    aria: {
                        defaultFilterLabel: "Filtru pentru coloana",
                        removeFilter: "Sterge filtru",
                        columnMenuButtonLabel: "Column Menu"
                    }, priority: "Prioritate:", filterLabel: "Filtru pentru coloana:"
                },
                aggregate: {label: "Elemente"},
                groupPanel: {description: "Trage un cap de coloana aici pentru a grupa elementele dupa coloana respectiva"},
                search: {
                    placeholder: "Cauta...",
                    showingItems: "Arata elementele:",
                    selectedItems: "Elementele selectate:",
                    totalItems: "Total elemente:",
                    size: "Marime pagina:",
                    first: "Prima pagina",
                    next: "Pagina urmatoare",
                    previous: "Pagina anterioara",
                    last: "Ultima pagina"
                },
                menu: {text: "Alege coloane:"},
                sort: {
                    ascending: "Ordoneaza crescator",
                    descending: "Ordoneaza descrescator",
                    none: "Fara ordonare",
                    remove: "Sterge ordonarea"
                },
                column: {hide: "Ascunde coloana"},
                aggregation: {count: "total linii: ", sum: "total: ", avg: "medie: ", min: "min: ", max: "max: "},
                pinning: {pinLeft: "Pin la stanga", pinRight: "Pin la dreapta", unpin: "Sterge pinul"},
                columnMenu: {close: "Inchide"},
                gridMenu: {
                    aria: {buttonLabel: "Grid Menu"},
                    columns: "Coloane:",
                    importerTitle: "Incarca fisier",
                    exporterAllAsCsv: "Exporta toate datele ca csv",
                    exporterVisibleAsCsv: "Exporta datele vizibile ca csv",
                    exporterSelectedAsCsv: "Exporta datele selectate ca csv",
                    exporterAllAsPdf: "Exporta toate datele ca pdf",
                    exporterVisibleAsPdf: "Exporta datele vizibile ca pdf",
                    exporterSelectedAsPdf: "Exporta datele selectate ca csv pdf",
                    clearAllFilters: "Sterge toate filtrele"
                },
                importer: {
                    noHeaders: "Numele coloanelor nu a putut fi incarcat, acest fisier are un header?",
                    noObjects: "Datele nu au putut fi incarcate, exista date in fisier in afara numelor de coloane?",
                    invalidCsv: "Fisierul nu a putut fi procesat, ati incarcat un CSV valid ?",
                    invalidJson: "Fisierul nu a putut fi procesat, ati incarcat un Json valid?",
                    jsonNotArray: "Json-ul incarcat trebuie sa contina un array, inchidere."
                },
                pagination: {
                    aria: {
                        pageToFirst: "Prima pagina",
                        pageBack: "O pagina inapoi",
                        pageSelected: "Pagina selectata",
                        pageForward: "O pagina inainte",
                        pageToLast: "Ultima pagina"
                    }, sizes: "Elemente per pagina", totalItems: "elemente", through: "prin", of: "of"
                },
                grouping: {
                    group: "Grupeaza",
                    ungroup: "Opreste gruparea",
                    aggregate_count: "Agg: Count",
                    aggregate_sum: "Agg: Sum",
                    aggregate_max: "Agg: Max",
                    aggregate_min: "Agg: Min",
                    aggregate_avg: "Agg: Avg",
                    aggregate_remove: "Agg: Remove"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("ru", {
                headerCell: {
                    aria: {
                        defaultFilterLabel: "Фильтр столбца",
                        removeFilter: "Удалить фильтр",
                        columnMenuButtonLabel: "Меню столбца"
                    }, priority: "Приоритет:", filterLabel: "Фильтр столбца: "
                },
                aggregate: {label: "элементы"},
                groupPanel: {description: "Для группировки по столбцу перетащите сюда его название."},
                search: {
                    placeholder: "Поиск...",
                    showingItems: "Показать элементы:",
                    selectedItems: "Выбранные элементы:",
                    totalItems: "Всего элементов:",
                    size: "Размер страницы:",
                    first: "Первая страница",
                    next: "Следующая страница",
                    previous: "Предыдущая страница",
                    last: "Последняя страница"
                },
                menu: {text: "Выбрать столбцы:"},
                sort: {
                    ascending: "По возрастанию",
                    descending: "По убыванию",
                    none: "Без сортировки",
                    remove: "Убрать сортировку"
                },
                column: {hide: "Спрятать столбец"},
                aggregation: {count: "всего строк: ", sum: "итого: ", avg: "среднее: ", min: "мин: ", max: "макс: "},
                pinning: {pinLeft: "Закрепить слева", pinRight: "Закрепить справа", unpin: "Открепить"},
                columnMenu: {close: "Закрыть"},
                gridMenu: {
                    aria: {buttonLabel: "Меню"},
                    columns: "Столбцы:",
                    importerTitle: "Импортировать файл",
                    exporterAllAsCsv: "Экспортировать всё в CSV",
                    exporterVisibleAsCsv: "Экспортировать видимые данные в CSV",
                    exporterSelectedAsCsv: "Экспортировать выбранные данные в CSV",
                    exporterAllAsPdf: "Экспортировать всё в PDF",
                    exporterVisibleAsPdf: "Экспортировать видимые данные в PDF",
                    exporterSelectedAsPdf: "Экспортировать выбранные данные в PDF",
                    clearAllFilters: "Очистите все фильтры"
                },
                importer: {
                    noHeaders: "Не удалось получить названия столбцов, есть ли в файле заголовок?",
                    noObjects: "Не удалось получить данные, есть ли в файле строки кроме заголовка?",
                    invalidCsv: "Не удалось обработать файл, это правильный CSV-файл?",
                    invalidJson: "Не удалось обработать файл, это правильный JSON?",
                    jsonNotArray: "Импортируемый JSON-файл должен содержать массив, операция отменена."
                },
                pagination: {
                    aria: {
                        pageToFirst: "Первая страница",
                        pageBack: "Предыдущая страница",
                        pageSelected: "Выбранная страница",
                        pageForward: "Следующая страница",
                        pageToLast: "Последняя страница"
                    }, sizes: "строк на страницу", totalItems: "строк", through: "по", of: "из"
                },
                grouping: {
                    group: "Группировать",
                    ungroup: "Разгруппировать",
                    aggregate_count: "Группировать: Count",
                    aggregate_sum: "Для группы: Сумма",
                    aggregate_max: "Для группы: Максимум",
                    aggregate_min: "Для группы: Минимум",
                    aggregate_avg: "Для группы: Среднее",
                    aggregate_remove: "Для группы: Пусто"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("sk", {
                aggregate: {label: "items"},
                groupPanel: {description: "Pretiahni sem názov stĺpca pre zoskupenie podľa toho stĺpca."},
                search: {
                    placeholder: "Hľadaj...",
                    showingItems: "Zobrazujem položky:",
                    selectedItems: "Vybraté položky:",
                    totalItems: "Počet položiek:",
                    size: "Počet:",
                    first: "Prvá strana",
                    next: "Ďalšia strana",
                    previous: "Predchádzajúca strana",
                    last: "Posledná strana"
                },
                menu: {text: "Vyberte stĺpce:"},
                sort: {ascending: "Zotriediť vzostupne", descending: "Zotriediť zostupne", remove: "Vymazať triedenie"},
                aggregation: {count: "total rows: ", sum: "total: ", avg: "avg: ", min: "min: ", max: "max: "},
                gridMenu: {
                    columns: "Columns:",
                    importerTitle: "Import file",
                    exporterAllAsCsv: "Export all data as csv",
                    exporterVisibleAsCsv: "Export visible data as csv",
                    exporterSelectedAsCsv: "Export selected data as csv",
                    exporterAllAsPdf: "Export all data as pdf",
                    exporterVisibleAsPdf: "Export visible data as pdf",
                    exporterSelectedAsPdf: "Export selected data as pdf",
                    clearAllFilters: "Clear all filters"
                },
                importer: {
                    noHeaders: "Column names were unable to be derived, does the file have a header?",
                    noObjects: "Objects were not able to be derived, was there data in the file other than headers?",
                    invalidCsv: "File was unable to be processed, is it valid CSV?",
                    invalidJson: "File was unable to be processed, is it valid Json?",
                    jsonNotArray: "Imported json file must contain an array, aborting."
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("sv", {
                aggregate: {label: "Artiklar"},
                groupPanel: {description: "Dra en kolumnrubrik hit och släpp den för att gruppera efter den kolumnen."},
                search: {
                    placeholder: "Sök...",
                    showingItems: "Visar artiklar:",
                    selectedItems: "Valda artiklar:",
                    totalItems: "Antal artiklar:",
                    size: "Sidstorlek:",
                    first: "Första sidan",
                    next: "Nästa sida",
                    previous: "Föregående sida",
                    last: "Sista sidan"
                },
                menu: {text: "Välj kolumner:"},
                sort: {ascending: "Sortera stigande", descending: "Sortera fallande", remove: "Inaktivera sortering"},
                column: {hide: "Göm kolumn"},
                aggregation: {count: "Antal rader: ", sum: "Summa: ", avg: "Genomsnitt: ", min: "Min: ", max: "Max: "},
                pinning: {pinLeft: "Fäst vänster", pinRight: "Fäst höger", unpin: "Lösgör"},
                gridMenu: {
                    columns: "Kolumner:",
                    importerTitle: "Importera fil",
                    exporterAllAsCsv: "Exportera all data som CSV",
                    exporterVisibleAsCsv: "Exportera synlig data som CSV",
                    exporterSelectedAsCsv: "Exportera markerad data som CSV",
                    exporterAllAsPdf: "Exportera all data som PDF",
                    exporterVisibleAsPdf: "Exportera synlig data som PDF",
                    exporterSelectedAsPdf: "Exportera markerad data som PDF",
                    clearAllFilters: "Rengör alla filter"
                },
                importer: {
                    noHeaders: "Kolumnnamn kunde inte härledas. Har filen ett sidhuvud?",
                    noObjects: "Objekt kunde inte härledas. Har filen data undantaget sidhuvud?",
                    invalidCsv: "Filen kunde inte behandlas, är den en giltig CSV?",
                    invalidJson: "Filen kunde inte behandlas, är den en giltig JSON?",
                    jsonNotArray: "Importerad JSON-fil måste innehålla ett fält. Import avbruten."
                },
                pagination: {sizes: "Artiklar per sida", totalItems: "Artiklar"}
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("ta", {
                aggregate: {label: "உருப்படிகள்"},
                groupPanel: {description: "ஒரு பத்தியை குழுவாக அமைக்க அப்பத்தியின் தலைப்பை இங்கே  இழுத்து வரவும் "},
                search: {
                    placeholder: "தேடல் ...",
                    showingItems: "உருப்படிகளை காண்பித்தல்:",
                    selectedItems: "தேர்ந்தெடுக்கப்பட்ட  உருப்படிகள்:",
                    totalItems: "மொத்த உருப்படிகள்:",
                    size: "பக்க அளவு: ",
                    first: "முதல் பக்கம்",
                    next: "அடுத்த பக்கம்",
                    previous: "முந்தைய பக்கம் ",
                    last: "இறுதி பக்கம்"
                },
                menu: {text: "பத்திகளை தேர்ந்தெடு:"},
                sort: {ascending: "மேலிருந்து கீழாக", descending: "கீழிருந்து மேலாக", remove: "வரிசையை நீக்கு"},
                column: {hide: "பத்தியை மறைத்து வை "},
                aggregation: {
                    count: "மொத்த வரிகள்:",
                    sum: "மொத்தம்: ",
                    avg: "சராசரி: ",
                    min: "குறைந்தபட்ச: ",
                    max: "அதிகபட்ச: "
                },
                pinning: {pinLeft: "இடதுபுறமாக தைக்க ", pinRight: "வலதுபுறமாக தைக்க", unpin: "பிரி"},
                gridMenu: {
                    columns: "பத்திகள்:",
                    importerTitle: "கோப்பு : படித்தல்",
                    exporterAllAsCsv: "எல்லா தரவுகளையும் கோப்பாக்கு: csv",
                    exporterVisibleAsCsv: "இருக்கும் தரவுகளை கோப்பாக்கு: csv",
                    exporterSelectedAsCsv: "தேர்ந்தெடுத்த தரவுகளை கோப்பாக்கு: csv",
                    exporterAllAsPdf: "எல்லா தரவுகளையும் கோப்பாக்கு: pdf",
                    exporterVisibleAsPdf: "இருக்கும் தரவுகளை கோப்பாக்கு: pdf",
                    exporterSelectedAsPdf: "தேர்ந்தெடுத்த தரவுகளை கோப்பாக்கு: pdf",
                    clearAllFilters: "Clear all filters"
                },
                importer: {
                    noHeaders: "பத்தியின் தலைப்புகளை பெற இயலவில்லை, கோப்பிற்கு தலைப்பு உள்ளதா?",
                    noObjects: "இலக்குகளை உருவாக்க முடியவில்லை, கோப்பில் தலைப்புகளை தவிர தரவு ஏதேனும் உள்ளதா? ",
                    invalidCsv: "சரிவர நடைமுறை படுத்த இயலவில்லை, கோப்பு சரிதானா? - csv",
                    invalidJson: "சரிவர நடைமுறை படுத்த இயலவில்லை, கோப்பு சரிதானா? - json",
                    jsonNotArray: "படித்த கோப்பில் வரிசைகள் உள்ளது, நடைமுறை ரத்து செய் : json"
                },
                pagination: {sizes: "உருப்படிகள் / பக்கம்", totalItems: "உருப்படிகள் "},
                grouping: {
                    group: "குழு",
                    ungroup: "பிரி",
                    aggregate_count: "மதிப்பீட்டு : எண்ணு",
                    aggregate_sum: "மதிப்பீட்டு : கூட்டல்",
                    aggregate_max: "மதிப்பீட்டு : அதிகபட்சம்",
                    aggregate_min: "மதிப்பீட்டு : குறைந்தபட்சம்",
                    aggregate_avg: "மதிப்பீட்டு : சராசரி",
                    aggregate_remove: "மதிப்பீட்டு : நீக்கு"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("tr", {
                headerCell: {
                    aria: {
                        defaultFilterLabel: "Sütun için filtre",
                        removeFilter: "Filtreyi Kaldır",
                        columnMenuButtonLabel: "Sütun Menüsü"
                    }, priority: "Öncelik:", filterLabel: "Sütun için filtre: "
                },
                aggregate: {label: "kayıtlar"},
                groupPanel: {description: "Sütuna göre gruplamak için sütun başlığını buraya sürükleyin ve bırakın."},
                search: {
                    placeholder: "Arama...",
                    showingItems: "Gösterilen Kayıt:",
                    selectedItems: "Seçili Kayıt:",
                    totalItems: "Toplam Kayıt:",
                    size: "Sayfa Boyutu:",
                    first: "İlk Sayfa",
                    next: "Sonraki Sayfa",
                    previous: "Önceki Sayfa",
                    last: "Son Sayfa"
                },
                menu: {text: "Sütunları Seç:"},
                sort: {
                    ascending: "Artan Sırada Sırala",
                    descending: "Azalan Sırada Sırala",
                    none: "Sıralama Yapma",
                    remove: "Sıralamayı Kaldır"
                },
                column: {hide: "Sütunu Gizle"},
                aggregation: {count: "toplam satır: ", sum: "toplam: ", avg: "ort: ", min: "min: ", max: "maks: "},
                pinning: {pinLeft: "Sola Sabitle", pinRight: "Sağa Sabitle", unpin: "Sabitlemeyi Kaldır"},
                columnMenu: {close: "Kapat"},
                gridMenu: {
                    aria: {buttonLabel: "Tablo Menü"},
                    columns: "Sütunlar:",
                    importerTitle: "Dosya içeri aktar",
                    exporterAllAsCsv: "Bütün veriyi CSV olarak dışarı aktar",
                    exporterVisibleAsCsv: "Görünen veriyi CSV olarak dışarı aktar",
                    exporterSelectedAsCsv: "Seçili veriyi CSV olarak dışarı aktar",
                    exporterAllAsPdf: "Bütün veriyi PDF olarak dışarı aktar",
                    exporterVisibleAsPdf: "Görünen veriyi PDF olarak dışarı aktar",
                    exporterSelectedAsPdf: "Seçili veriyi PDF olarak dışarı aktar",
                    clearAllFilters: "Bütün filtreleri kaldır"
                },
                importer: {
                    noHeaders: "Sütun isimleri üretilemiyor, dosyanın bir başlığı var mı?",
                    noObjects: "Nesneler üretilemiyor, dosyada başlıktan başka bir veri var mı?",
                    invalidCsv: "Dosya işlenemedi, geçerli bir CSV dosyası mı?",
                    invalidJson: "Dosya işlenemedi, geçerli bir Json dosyası mı?",
                    jsonNotArray: "Alınan Json dosyasında bir dizi bulunmalıdır, işlem iptal ediliyor."
                },
                pagination: {
                    aria: {
                        pageToFirst: "İlk sayfaya",
                        pageBack: "Geri git",
                        pageSelected: "Seçili sayfa",
                        pageForward: "İleri git",
                        pageToLast: "Sona git"
                    }, sizes: "Sayfadaki nesne sayısı", totalItems: "kayıtlar", through: "", of: ""
                },
                grouping: {
                    group: "Grupla",
                    ungroup: "Gruplama",
                    aggregate_count: "Yekun: Sayı",
                    aggregate_sum: "Yekun: Toplam",
                    aggregate_max: "Yekun: Maks",
                    aggregate_min: "Yekun: Min",
                    aggregate_avg: "Yekun: Ort",
                    aggregate_remove: "Yekun: Sil"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("ua", {
                headerCell: {
                    aria: {
                        defaultFilterLabel: "Фільтр стовпчика",
                        removeFilter: "Видалити фільтр",
                        columnMenuButtonLabel: "Меню ствпчика"
                    }, priority: "Пріоритет:", filterLabel: "Фільтр стовпчика: "
                },
                aggregate: {label: "елементи"},
                groupPanel: {description: "Для групування за стовпчиком перетягніть сюди його назву."},
                search: {
                    placeholder: "Пошук...",
                    showingItems: "Показати елементи:",
                    selectedItems: "Обрані елементи:",
                    totalItems: "Усього елементів:",
                    size: "Розмір сторінки:",
                    first: "Перша сторінка",
                    next: "Наступна сторінка",
                    previous: "Попередня сторінка",
                    last: "Остання сторінка"
                },
                menu: {text: "Обрати ствпчики:"},
                sort: {
                    ascending: "За зростанням",
                    descending: "За спаданням",
                    none: "Без сортування",
                    remove: "Прибрати сортування"
                },
                column: {hide: "Приховати стовпчик"},
                aggregation: {count: "усього рядків: ", sum: "ітого: ", avg: "середнє: ", min: "мін: ", max: "макс: "},
                pinning: {pinLeft: "Закріпити ліворуч", pinRight: "Закріпити праворуч", unpin: "Відкріпити"},
                columnMenu: {close: "Закрити"},
                gridMenu: {
                    aria: {buttonLabel: "Меню"},
                    columns: "Стовпчики:",
                    importerTitle: "Імпортувати файл",
                    exporterAllAsCsv: "Експортувати все в CSV",
                    exporterVisibleAsCsv: "Експортувати видимі дані в CSV",
                    exporterSelectedAsCsv: "Експортувати обрані дані в CSV",
                    exporterAllAsPdf: "Експортувати все в PDF",
                    exporterVisibleAsPdf: "Експортувати видимі дані в PDF",
                    exporterSelectedAsPdf: "Експортувати обрані дані в PDF",
                    clearAllFilters: "Очистити всі фільтри"
                },
                importer: {
                    noHeaders: "Не вдалося отримати назви стовпчиків, чи є в файлі заголовок?",
                    noObjects: "Не вдалося отримати дані, чи є в файлі рядки окрім заголовка?",
                    invalidCsv: "Не вдалося обробити файл, чи це коректний CSV-файл?",
                    invalidJson: "Не вдалося обробити файл, чи це коректний JSON?",
                    jsonNotArray: "JSON-файл що імпортується повинен містити масив, операцію скасовано."
                },
                pagination: {
                    aria: {
                        pageToFirst: "Перша сторінка",
                        pageBack: "Попередня сторінка",
                        pageSelected: "Обрана сторінка",
                        pageForward: "Наступна сторінка",
                        pageToLast: "Остання сторінка"
                    }, sizes: "рядків на сторінку", totalItems: "рядків", through: "по", of: "з"
                },
                grouping: {
                    group: "Групувати",
                    ungroup: "Розгрупувати",
                    aggregate_count: "Групувати: Кількість",
                    aggregate_sum: "Для групи: Сума",
                    aggregate_max: "Для групи: Максимум",
                    aggregate_min: "Для групи: Мінімум",
                    aggregate_avg: "Для групи: Серднє",
                    aggregate_remove: "Для групи: Пусто"
                }
            }), a
        }])
    }])
}(), function () {
    var a = ["uiT", "uiTranslate"], b = ["t", "uiTranslate"], c = angular.module("ui.grid.i18n");
    c.constant("i18nConstants", {
        MISSING: "[MISSING]", UPDATE_EVENT: "$uiI18n", LOCALE_DIRECTIVE_ALIAS: "uiI18n", DEFAULT_LANG: "en"
    }), c.service("i18nService", ["$log", "i18nConstants", "$rootScope", function (a, b, c) {
        var d = {
            _langs: {}, current: null, get: function (a) {
                return this._langs[a.toLowerCase()]
            }, add: function (a, b) {
                var c = a.toLowerCase();
                this._langs[c] || (this._langs[c] = {}), angular.extend(this._langs[c], b)
            }, getAllLangs: function () {
                var a = [];
                if (!this._langs) return a;
                for (var b in this._langs) a.push(b);
                return a
            }, setCurrent: function (a) {
                this.current = a.toLowerCase()
            }, getCurrentLang: function () {
                return this.current
            }
        }, e = {
            add: function (a, b) {
                "object" == typeof a ? angular.forEach(a, function (a) {
                    a && d.add(a, b)
                }) : d.add(a, b)
            }, getAllLangs: function () {
                return d.getAllLangs()
            }, get: function (a) {
                var b = a ? a : e.getCurrentLang();
                return d.get(b)
            }, getSafeText: function (a, c) {
                var f = c ? c : e.getCurrentLang(), g = d.get(f);
                if (!g) return b.MISSING;
                for (var h = a.split("."), i = g, j = 0; j < h.length; ++j) {
                    if (void 0 === i[h[j]] || null === i[h[j]]) return b.MISSING;
                    i = i[h[j]]
                }
                return i
            }, setCurrentLang: function (a) {
                a && (d.setCurrent(a), c.$broadcast(b.UPDATE_EVENT))
            }, getCurrentLang: function () {
                var a = d.getCurrentLang();
                return a || (a = b.DEFAULT_LANG, d.setCurrent(a)), a
            }
        };
        return e
    }]);
    var d = function (a, b) {
        return {
            compile: function () {
                return {
                    pre: function (c, d, e) {
                        var f = b.LOCALE_DIRECTIVE_ALIAS, g = c.$eval(e[f]);
                        g ? c.$watch(e[f], function () {
                            a.setCurrentLang(g)
                        }) : e.$$observers && e.$observe(f, function () {
                            a.setCurrentLang(e[f] || b.DEFAULT_LANG)
                        })
                    }
                }
            }
        }
    };
    c.directive("uiI18n", ["i18nService", "i18nConstants", d]);
    var e = function (b, c, d) {
        return {
            restrict: "EA", compile: function () {
                return {
                    pre: function (e, f, g) {
                        var h, i = a[0], j = a[1], k = g[i] || g[j] || f.html(), l = d.MISSING + k;
                        if (g.$$observers) {
                            var m = g[i] ? i : j;
                            h = g.$observe(m, function (a) {
                                a && f.html(b(a)(c.getCurrentLang()) || l)
                            })
                        }
                        var n = b(k), o = e.$on(d.UPDATE_EVENT, function (a) {
                            h ? h(g[i] || g[j]) : f.html(n(c.get()) || l)
                        });
                        e.$on("$destroy", o), f.html(n(c.get()) || l)
                    }
                }
            }
        }
    };
    angular.forEach(a, function (a) {
        c.directive(a, ["$parse", "i18nService", "i18nConstants", e])
    });
    var f = function (a, b, c) {
        return function (d) {
            var e = a(d);
            return e(b.get()) || c.MISSING + d
        }
    };
    angular.forEach(b, function (a) {
        c.filter(a, ["$parse", "i18nService", "i18nConstants", f])
    })
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("zh-cn", {
                headerCell: {
                    aria: {
                        defaultFilterLabel: "列过滤器",
                        removeFilter: "移除过滤器",
                        columnMenuButtonLabel: "列菜单"
                    }, priority: "优先级:", filterLabel: "列过滤器: "
                },
                aggregate: {label: "行"},
                groupPanel: {description: "拖曳表头到此处进行分组"},
                search: {
                    placeholder: "查找",
                    showingItems: "已显示行数：",
                    selectedItems: "已选择行数：",
                    totalItems: "总行数：",
                    size: "每页显示行数：",
                    first: "首页",
                    next: "下一页",
                    previous: "上一页",
                    last: "末页"
                },
                menu: {text: "选择列："},
                sort: {ascending: "升序", descending: "降序", none: "无序", remove: "取消排序"},
                column: {hide: "隐藏列"},
                aggregation: {count: "计数：", sum: "求和：", avg: "均值：", min: "最小值：", max: "最大值："},
                pinning: {pinLeft: "左侧固定", pinRight: "右侧固定", unpin: "取消固定"},
                columnMenu: {close: "关闭"},
                gridMenu: {
                    aria: {buttonLabel: "表格菜单"},
                    columns: "列：",
                    importerTitle: "导入文件",
                    exporterAllAsCsv: "导出全部数据到CSV",
                    exporterVisibleAsCsv: "导出可见数据到CSV",
                    exporterSelectedAsCsv: "导出已选数据到CSV",
                    exporterAllAsPdf: "导出全部数据到PDF",
                    exporterVisibleAsPdf: "导出可见数据到PDF",
                    exporterSelectedAsPdf: "导出已选数据到PDF",
                    clearAllFilters: "清除所有过滤器"
                },
                importer: {
                    noHeaders: "无法获取列名，确定文件包含表头？",
                    noObjects: "无法获取数据，确定文件包含数据？",
                    invalidCsv: "无法处理文件，确定是合法的CSV文件？",
                    invalidJson: "无法处理文件，确定是合法的JSON文件？",
                    jsonNotArray: "导入的文件不是JSON数组！"
                },
                pagination: {
                    aria: {
                        pageToFirst: "第一页",
                        pageBack: "上一页",
                        pageSelected: "当前页",
                        pageForward: "下一页",
                        pageToLast: "最后一页"
                    }, sizes: "行每页", totalItems: "行", through: "至", of: "共"
                },
                grouping: {
                    group: "分组",
                    ungroup: "取消分组",
                    aggregate_count: "合计: 计数",
                    aggregate_sum: "合计: 求和",
                    aggregate_max: "合计: 最大",
                    aggregate_min: "合计: 最小",
                    aggregate_avg: "合计: 平均",
                    aggregate_remove: "合计: 移除"
                }
            }), a
        }])
    }])
}(), function () {
    angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("i18nService", ["$delegate", function (a) {
            return a.add("zh-tw", {
                aggregate: {label: "行"},
                groupPanel: {description: "拖曳表頭到此處進行分組"},
                search: {
                    placeholder: "查找",
                    showingItems: "已顯示行數：",
                    selectedItems: "已選擇行數：",
                    totalItems: "總行數：",
                    size: "每頁顯示行數：",
                    first: "首頁",
                    next: "下壹頁",
                    previous: "上壹頁",
                    last: "末頁"
                },
                menu: {text: "選擇列："},
                sort: {ascending: "升序", descending: "降序", remove: "取消排序"},
                column: {hide: "隱藏列"},
                aggregation: {count: "計數：", sum: "求和：", avg: "均值：", min: "最小值：", max: "最大值："},
                pinning: {pinLeft: "左側固定", pinRight: "右側固定", unpin: "取消固定"},
                gridMenu: {
                    columns: "列：",
                    importerTitle: "導入文件",
                    exporterAllAsCsv: "導出全部數據到CSV",
                    exporterVisibleAsCsv: "導出可見數據到CSV",
                    exporterSelectedAsCsv: "導出已選數據到CSV",
                    exporterAllAsPdf: "導出全部數據到PDF",
                    exporterVisibleAsPdf: "導出可見數據到PDF",
                    exporterSelectedAsPdf: "導出已選數據到PDF",
                    clearAllFilters: "清除所有过滤器"
                },
                importer: {
                    noHeaders: "無法獲取列名，確定文件包含表頭？",
                    noObjects: "無法獲取數據，確定文件包含數據？",
                    invalidCsv: "無法處理文件，確定是合法的CSV文件？",
                    invalidJson: "無法處理文件，確定是合法的JSON文件？",
                    jsonNotArray: "導入的文件不是JSON數組！"
                },
                pagination: {sizes: "行每頁", totalItems: "行"}
            }), a
        }])
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.autoResize", ["ui.grid"]);
    a.directive("uiGridAutoResize", ["$timeout", "gridUtil", function (a, b) {
        return {
            require: "uiGrid", scope: !1, link: function (a, c, d, e) {
                function f() {
                    i = b.elementHeight(c), h = b.elementWidth(c)
                }

                function g() {
                    clearTimeout(j), j = setTimeout(function () {
                        var d = b.elementHeight(c), j = b.elementWidth(c);
                        d !== i || j !== h ? (e.grid.gridHeight = d, e.grid.gridWidth = j, e.grid.api.core.raise.gridDimensionChanged(i, h, d, j), a.$apply(function () {
                            e.grid.refresh().then(function () {
                                f(), g()
                            })
                        })) : g()
                    }, 250)
                }

                var h, i;
                f();
                var j;
                g(), a.$on("$destroy", function () {
                    clearTimeout(j)
                })
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.cellNav", ["ui.grid"]);
    a.constant("uiGridCellNavConstants", {
        FEATURE_NAME: "gridCellNav",
        CELL_NAV_EVENT: "cellNav",
        direction: {LEFT: 0, RIGHT: 1, UP: 2, DOWN: 3, PG_UP: 4, PG_DOWN: 5},
        EVENT_TYPE: {KEYDOWN: 0, CLICK: 1, CLEAR: 2}
    }), a.factory("uiGridCellNavFactory", ["gridUtil", "uiGridConstants", "uiGridCellNavConstants", "GridRowColumn", "$q", function (a, b, c, d, e) {
        var f = function (a, b, c, d) {
            this.rows = a.visibleRowCache, this.columns = b.visibleColumnCache, this.leftColumns = c ? c.visibleColumnCache : [], this.rightColumns = d ? d.visibleColumnCache : [], this.bodyContainer = a
        };
        return f.prototype.getFocusableCols = function () {
            var a = this.leftColumns.concat(this.columns, this.rightColumns);
            return a.filter(function (a) {
                return a.colDef.allowCellFocus
            })
        }, f.prototype.getFocusableRows = function () {
            return this.rows.filter(function (a) {
                return a.allowCellFocus !== !1
            })
        }, f.prototype.getNextRowCol = function (a, b, d) {
            switch (a) {
                case c.direction.LEFT:
                    return this.getRowColLeft(b, d);
                case c.direction.RIGHT:
                    return this.getRowColRight(b, d);
                case c.direction.UP:
                    return this.getRowColUp(b, d);
                case c.direction.DOWN:
                    return this.getRowColDown(b, d);
                case c.direction.PG_UP:
                    return this.getRowColPageUp(b, d);
                case c.direction.PG_DOWN:
                    return this.getRowColPageDown(b, d)
            }
        }, f.prototype.initializeSelection = function () {
            var a = this.getFocusableCols(), b = this.getFocusableRows();
            if (0 === a.length || 0 === b.length) return null;
            return new d(b[0], a[0])
        }, f.prototype.getRowColLeft = function (a, b) {
            var c = this.getFocusableCols(), e = this.getFocusableRows(), f = c.indexOf(b), g = e.indexOf(a);
            -1 === f && (f = 1);
            var h = 0 === f ? c.length - 1 : f - 1;
            return h >= f ? 0 === g ? new d(a, c[h]) : new d(e[g - 1], c[h]) : new d(a, c[h])
        }, f.prototype.getRowColRight = function (a, b) {
            var c = this.getFocusableCols(), e = this.getFocusableRows(), f = c.indexOf(b), g = e.indexOf(a);
            -1 === f && (f = 0);
            var h = f === c.length - 1 ? 0 : f + 1;
            return f >= h ? g === e.length - 1 ? new d(a, c[h]) : new d(e[g + 1], c[h]) : new d(a, c[h])
        }, f.prototype.getRowColDown = function (a, b) {
            var c = this.getFocusableCols(), e = this.getFocusableRows(), f = c.indexOf(b), g = e.indexOf(a);
            return -1 === f && (f = 0), g === e.length - 1 ? new d(a, c[f]) : new d(e[g + 1], c[f])
        }, f.prototype.getRowColPageDown = function (a, b) {
            var c = this.getFocusableCols(), e = this.getFocusableRows(), f = c.indexOf(b), g = e.indexOf(a);
            -1 === f && (f = 0);
            var h = this.bodyContainer.minRowsToRender();
            return g >= e.length - h ? new d(e[e.length - 1], c[f]) : new d(e[g + h], c[f])
        }, f.prototype.getRowColUp = function (a, b) {
            var c = this.getFocusableCols(), e = this.getFocusableRows(), f = c.indexOf(b), g = e.indexOf(a);
            return -1 === f && (f = 0), 0 === g ? new d(a, c[f]) : new d(e[g - 1], c[f])
        }, f.prototype.getRowColPageUp = function (a, b) {
            var c = this.getFocusableCols(), e = this.getFocusableRows(), f = c.indexOf(b), g = e.indexOf(a);
            -1 === f && (f = 0);
            var h = this.bodyContainer.minRowsToRender();
            return 0 > g - h ? new d(e[0], c[f]) : new d(e[g - h], c[f])
        }, f
    }]), a.service("uiGridCellNavService", ["gridUtil", "uiGridConstants", "uiGridCellNavConstants", "$q", "uiGridCellNavFactory", "GridRowColumn", "ScrollEvent", function (a, b, c, d, e, f, g) {
        var h = {
            initializeGrid: function (a) {
                a.registerColumnBuilder(h.cellNavColumnBuilder), a.cellNav = {}, a.cellNav.lastRowCol = null, a.cellNav.focusedCells = [], h.defaultGridOptions(a.options);
                var b = {
                    events: {
                        cellNav: {
                            navigate: function (a, b) {
                            }, viewPortKeyDown: function (a, b) {
                            }, viewPortKeyPress: function (a, b) {
                            }
                        }
                    }, methods: {
                        cellNav: {
                            scrollToFocus: function (b, c) {
                                return h.scrollToFocus(a, b, c)
                            }, getFocusedCell: function () {
                                return a.cellNav.lastRowCol
                            }, getCurrentSelection: function () {
                                return a.cellNav.focusedCells
                            }, rowColSelectIndex: function (b) {
                                for (var c = -1, d = 0; d < a.cellNav.focusedCells.length; d++) if (a.cellNav.focusedCells[d].col.uid === b.col.uid && a.cellNav.focusedCells[d].row.uid === b.row.uid) {
                                    c = d;
                                    break
                                }
                                return c
                            }
                        }
                    }
                };
                a.api.registerEventsFromObject(b.events), a.api.registerMethodsFromObject(b.methods)
            }, defaultGridOptions: function (a) {
                a.modifierKeysToMultiSelectCells = a.modifierKeysToMultiSelectCells === !0, a.keyDownOverrides = a.keyDownOverrides || []
            }, decorateRenderContainers: function (a) {
                var b = a.hasRightContainer() ? a.renderContainers.right : null,
                    c = a.hasLeftContainer() ? a.renderContainers.left : null;
                null !== c && (a.renderContainers.left.cellNav = new e(a.renderContainers.body, c, b, a.renderContainers.body)), null !== b && (a.renderContainers.right.cellNav = new e(a.renderContainers.body, b, a.renderContainers.body, c)), a.renderContainers.body.cellNav = new e(a.renderContainers.body, a.renderContainers.body, c, b)
            }, getDirection: function (a) {
                return a.keyCode === b.keymap.LEFT || a.keyCode === b.keymap.TAB && a.shiftKey ? c.direction.LEFT : a.keyCode === b.keymap.RIGHT || a.keyCode === b.keymap.TAB ? c.direction.RIGHT : a.keyCode === b.keymap.UP || a.keyCode === b.keymap.ENTER && a.shiftKey ? c.direction.UP : a.keyCode === b.keymap.PG_UP ? c.direction.PG_UP : a.keyCode === b.keymap.DOWN || a.keyCode === b.keymap.ENTER && !a.ctrlKey && !a.altKey ? c.direction.DOWN : a.keyCode === b.keymap.PG_DOWN ? c.direction.PG_DOWN : null
            }, cellNavColumnBuilder: function (a, b, c) {
                var e = [];
                return a.allowCellFocus = void 0 === a.allowCellFocus ? !0 : a.allowCellFocus, d.all(e)
            }, scrollToFocus: function (a, b, c) {
                var d = null, e = null;
                return "undefined" != typeof b && null !== b && (d = a.getRow(b)), "undefined" != typeof c && null !== c && (e = a.getColumn(c.name ? c.name : c.field)), a.api.core.scrollToIfNecessary(d, e).then(function () {
                    var b = {row: d, col: e};
                    null !== d && null !== e && a.cellNav.broadcastCellNav(b)
                })
            }, getLeftWidth: function (a, b) {
                var c = 0;
                if (!b) return c;
                var d = a.renderContainers.body.visibleColumnCache.indexOf(b);
                a.renderContainers.body.visibleColumnCache.forEach(function (a, b) {
                    d > b && (c += a.drawnWidth)
                });
                var e = 0 === d ? 0 : (d + 1) / a.renderContainers.body.visibleColumnCache.length;
                return c += b.drawnWidth * e
            }
        };
        return h
    }]), a.directive("uiGridCellnav", ["gridUtil", "uiGridCellNavService", "uiGridCellNavConstants", "uiGridConstants", "GridRowColumn", "$timeout", "$compile", function (a, b, c, d, e, f, g) {
        return {
            replace: !0, priority: -150, require: "^uiGrid", scope: !1, controller: function () {
            }, compile: function () {
                return {
                    pre: function (a, f, g, h) {
                        var i = a, j = h.grid;
                        b.initializeGrid(j), h.cellNav = {}, h.cellNav.makeRowCol = function (a) {
                            return a instanceof e || (a = new e(a.row, a.col)), a
                        }, h.cellNav.getActiveCell = function () {
                            var a = f[0].getElementsByClassName("ui-grid-cell-focus");
                            return a.length > 0 ? a[0] : void 0
                        }, h.cellNav.broadcastCellNav = j.cellNav.broadcastCellNav = function (a, b, d) {
                            b = !(void 0 === b || !b), a = h.cellNav.makeRowCol(a), h.cellNav.broadcastFocus(a, b, d), i.$broadcast(c.CELL_NAV_EVENT, a, b, d)
                        }, h.cellNav.clearFocus = j.cellNav.clearFocus = function () {
                            j.cellNav.focusedCells = [], i.$broadcast(c.CELL_NAV_EVENT)
                        }, h.cellNav.broadcastFocus = function (a, b, c) {
                            b = !(void 0 === b || !b), a = h.cellNav.makeRowCol(a);
                            var d = a.row, f = a.col, g = h.grid.api.cellNav.rowColSelectIndex(a);
                            if (null === j.cellNav.lastRowCol || -1 === g) {
                                var i = new e(d, f);
                                (null === j.cellNav.lastRowCol || j.cellNav.lastRowCol.row !== i.row || j.cellNav.lastRowCol.col !== i.col) && (j.api.cellNav.raise.navigate(i, j.cellNav.lastRowCol, c), j.cellNav.lastRowCol = i), h.grid.options.modifierKeysToMultiSelectCells && b ? j.cellNav.focusedCells.push(a) : j.cellNav.focusedCells = [a]
                            } else j.options.modifierKeysToMultiSelectCells && b && g >= 0 && j.cellNav.focusedCells.splice(g, 1)
                        }, h.cellNav.handleKeyDown = function (a) {
                            var e = b.getDirection(a);
                            if (null === e) return null;
                            var f = "body";
                            a.uiGridTargetRenderContainerId && (f = a.uiGridTargetRenderContainerId);
                            var g = h.grid.api.cellNav.getFocusedCell();
                            if (g) {
                                var i = h.grid.renderContainers[f].cellNav.getNextRowCol(e, g.row, g.col),
                                    k = h.grid.renderContainers[f].cellNav.getFocusableCols(),
                                    l = h.grid.api.cellNav.rowColSelectIndex(i);
                                return e === c.direction.LEFT && i.col === k[k.length - 1] && i.row === g.row && a.keyCode === d.keymap.TAB && a.shiftKey ? (j.cellNav.focusedCells.splice(l, 1), h.cellNav.clearFocus(), !0) : e !== c.direction.RIGHT || i.col !== k[0] || i.row !== g.row || a.keyCode !== d.keymap.TAB || a.shiftKey ? (j.scrollToIfNecessary(i.row, i.col).then(function () {
                                    h.cellNav.broadcastCellNav(i, null, a)
                                }), a.stopPropagation(), a.preventDefault(), !1) : (j.cellNav.focusedCells.splice(l, 1), h.cellNav.clearFocus(), !0)
                            }
                        }
                    }, post: function (a, b, d, e) {
                        function f() {
                            var d = '<div id="' + h.id + '-aria-speakable" class="ui-grid-a11y-ariascreenreader-speakable ui-grid-offscreen" aria-live="assertive" role="region" aria-atomic="true" aria-hidden="false" aria-relevant="additions" >&nbsp;</div>',
                                e = g(d)(a);
                            b.prepend(e), a.$on(c.CELL_NAV_EVENT, function (a, b, c, d) {
                                function f(a) {
                                    a !== e.text() && (e[0].style.clip = "rect(0px,0px,0px,0px)", e[0].innerHTML = "", e[0].style.visibility = "hidden", e[0].style.visibility = "visible", "" !== a && (e[0].style.clip = "auto", e[0].appendChild(document.createTextNode(a + " ")), e[0].style.visibility = "hidden", e[0].style.visibility = "visible"))
                                }

                                if (!d || "focus" !== d.type) {
                                    for (var g = [], i = h.api.cellNav.getCurrentSelection(), j = 0; j < i.length; j++) g.push(h.getCellDisplayValue(i[j].row, i[j].col));
                                    var k = g.toString();
                                    f(k)
                                }
                            })
                        }

                        var h = e.grid;
                        f()
                    }
                }
            }
        }
    }]), a.directive("uiGridRenderContainer", ["$timeout", "$document", "gridUtil", "uiGridConstants", "uiGridCellNavService", "$compile", "uiGridCellNavConstants", function (a, b, c, d, e, f, g) {
        return {
            replace: !0,
            priority: -99999,
            require: ["^uiGrid", "uiGridRenderContainer", "?^uiGridCellnav"],
            scope: !1,
            compile: function () {
                return {
                    post: function (b, d, h, i) {
                        var j = i[0], k = i[1], l = i[2];
                        if (j.grid.api.cellNav) {
                            var m = k.containerId, n = j.grid;
                            if (e.decorateRenderContainers(n), "body" === m) {
                                j.grid.options.modifierKeysToMultiSelectCells ? d.attr("aria-multiselectable", !0) : d.attr("aria-multiselectable", !1);
                                var o = f('<div class="ui-grid-focuser" role="region" aria-live="assertive" aria-atomic="false" tabindex="0" aria-controls="' + n.id + "-aria-speakable " + n.id + '-grid-container" aria-owns="' + n.id + '-grid-container"></div>')(b);
                                d.append(o), o.on("focus", function (a) {
                                    a.uiGridTargetRenderContainerId = m;
                                    var b = j.grid.api.cellNav.getFocusedCell();
                                    null === b && (b = j.grid.renderContainers[m].cellNav.getNextRowCol(g.direction.DOWN, null, null), b.row && b.col && j.cellNav.broadcastCellNav(b))
                                }), l.setAriaActivedescendant = function (a) {
                                    d.attr("aria-activedescendant", a)
                                }, l.removeAriaActivedescendant = function (a) {
                                    d.attr("aria-activedescendant") === a && d.attr("aria-activedescendant", "")
                                }, j.focus = function () {
                                    c.focus.byElement(o[0])
                                };
                                var p = null;
                                o.on("keydown", function (a) {
                                    a.uiGridTargetRenderContainerId = m;
                                    var b = j.grid.api.cellNav.getFocusedCell(),
                                        c = j.grid.options.keyDownOverrides.some(function (b) {
                                            return Object.keys(b).every(function (c) {
                                                return b[c] === a[c]
                                            })
                                        }), d = c ? null : j.cellNav.handleKeyDown(a);
                                    null === d && (j.grid.api.cellNav.raise.viewPortKeyDown(a, b), p = b)
                                }), o.on("keypress", function (b) {
                                    p && (a(function () {
                                        j.grid.api.cellNav.raise.viewPortKeyPress(b, p)
                                    }, 4), p = null)
                                }), b.$on("$destroy", function () {
                                    o.off()
                                })
                            }
                        }
                    }
                }
            }
        }
    }]), a.directive("uiGridViewport", ["$timeout", "$document", "gridUtil", "uiGridConstants", "uiGridCellNavService", "uiGridCellNavConstants", "$log", "$compile", function (a, b, c, d, e, f, g, h) {
        return {
            replace: !0,
            priority: -99999,
            require: ["^uiGrid", "^uiGridRenderContainer", "?^uiGridCellnav"],
            scope: !1,
            compile: function () {
                return {
                    pre: function (a, b, c, d) {
                    }, post: function (a, b, c, d) {
                        var e = d[0], f = d[1];
                        if (e.grid.api.cellNav) {
                            var g = f.containerId;
                            if ("body" === g) {
                                var h = e.grid;
                                h.api.core.on.scrollBegin(a, function (a) {
                                    var b = e.grid.api.cellNav.getFocusedCell();
                                    null !== b && f.colContainer.containsColumn(b.col) && e.cellNav.clearFocus()
                                }), h.api.core.on.scrollEnd(a, function (a) {
                                    var b = e.grid.api.cellNav.getFocusedCell();
                                    null !== b && f.colContainer.containsColumn(b.col) && e.cellNav.broadcastCellNav(b)
                                }), h.api.cellNav.on.navigate(a, function () {
                                    e.focus()
                                })
                            }
                        }
                    }
                }
            }
        }
    }]), a.directive("uiGridCell", ["$timeout", "$document", "uiGridCellNavService", "gridUtil", "uiGridCellNavConstants", "uiGridConstants", "GridRowColumn", function (a, b, c, d, e, f, g) {
        return {
            priority: -150,
            restrict: "A",
            require: ["^uiGrid", "?^uiGridCellnav"],
            scope: !1,
            link: function (b, c, d, h) {
                function i(a) {
                    a.preventDefault()
                }

                function j() {
                    var a = o.cellNav.focusedCells.some(function (a, c) {
                        return a.row === b.row && a.col === b.col
                    });
                    a ? k() : l()
                }

                function k() {
                    if (!b.focused) {
                        var a = c.find("div");
                        a.addClass("ui-grid-cell-focus"), c.attr("aria-selected", !0), n.setAriaActivedescendant(c.attr("id")), b.focused = !0
                    }
                }

                function l() {
                    if (b.focused) {
                        var a = c.find("div");
                        a.removeClass("ui-grid-cell-focus"), c.attr("aria-selected", !1), n.removeAriaActivedescendant(c.attr("id")), b.focused = !1
                    }
                }

                var m = h[0], n = h[1];
                if (m.grid.api.cellNav && b.col.colDef.allowCellFocus) {
                    var o = m.grid;
                    b.focused = !1, c.attr("tabindex", -1), c.find("div").on("click", function (a) {
                        m.cellNav.broadcastCellNav(new g(b.row, b.col), a.ctrlKey || a.metaKey, a), a.stopPropagation(), b.$apply()
                    }), c.on("mousedown", i), m.grid.api.edit && (m.grid.api.edit.on.beginCellEdit(b, function () {
                        c.off("mousedown", i)
                    }), m.grid.api.edit.on.afterCellEdit(b, function () {
                        c.on("mousedown", i)
                    }), m.grid.api.edit.on.cancelCellEdit(b, function () {
                        c.on("mousedown", i)
                    })), j(), c.on("focus", function (a) {
                        m.cellNav.broadcastCellNav(new g(b.row, b.col), !1, a), a.stopPropagation(), b.$apply()
                    }), b.$on(e.CELL_NAV_EVENT, j);
                    var p = m.grid.registerDataChangeCallback(function (b) {
                        l(), a(j)
                    }, [f.dataChange.ROW]);
                    b.$on("$destroy", function () {
                        p(), c.find("div").off(), c.off()
                    })
                }
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.edit", ["ui.grid"]);
    a.constant("uiGridEditConstants", {
        EDITABLE_CELL_TEMPLATE: /EDITABLE_CELL_TEMPLATE/g,
        EDITABLE_CELL_DIRECTIVE: /editable_cell_directive/g,
        events: {
            BEGIN_CELL_EDIT: "uiGridEventBeginCellEdit",
            END_CELL_EDIT: "uiGridEventEndCellEdit",
            CANCEL_CELL_EDIT: "uiGridEventCancelCellEdit"
        }
    }), a.service("uiGridEditService", ["$q", "uiGridConstants", "gridUtil", function (a, b, c) {
        var d = {
            initializeGrid: function (a) {
                d.defaultGridOptions(a.options), a.registerColumnBuilder(d.editColumnBuilder), a.edit = {};
                var b = {
                    events: {
                        edit: {
                            afterCellEdit: function (a, b, c, d) {
                            }, beginCellEdit: function (a, b, c) {
                            }, cancelCellEdit: function (a, b) {
                            }
                        }
                    }, methods: {edit: {}}
                };
                a.api.registerEventsFromObject(b.events)
            }, defaultGridOptions: function (a) {
                a.cellEditableCondition = void 0 === a.cellEditableCondition ? !0 : a.cellEditableCondition, a.enableCellEditOnFocus = void 0 === a.enableCellEditOnFocus ? !1 : a.enableCellEditOnFocus
            }, editColumnBuilder: function (b, d, e) {
                var f = [];
                return b.enableCellEdit = void 0 === b.enableCellEdit ? void 0 === e.enableCellEdit ? "object" !== b.type : e.enableCellEdit : b.enableCellEdit, b.cellEditableCondition = void 0 === b.cellEditableCondition ? e.cellEditableCondition : b.cellEditableCondition, b.enableCellEdit && (b.editableCellTemplate = b.editableCellTemplate || e.editableCellTemplate || "ui-grid/cellEditor", f.push(c.getTemplate(b.editableCellTemplate).then(function (a) {
                    d.editableCellTemplate = a
                }, function (a) {
                    throw new Error("Couldn't fetch/use colDef.editableCellTemplate '" + b.editableCellTemplate + "'")
                }))), b.enableCellEditOnFocus = void 0 === b.enableCellEditOnFocus ? e.enableCellEditOnFocus : b.enableCellEditOnFocus, a.all(f)
            }, isStartEditKey: function (a) {
                return a.metaKey || a.keyCode === b.keymap.ESC || a.keyCode === b.keymap.SHIFT || a.keyCode === b.keymap.CTRL || a.keyCode === b.keymap.ALT || a.keyCode === b.keymap.WIN || a.keyCode === b.keymap.CAPSLOCK || a.keyCode === b.keymap.LEFT || a.keyCode === b.keymap.TAB && a.shiftKey || a.keyCode === b.keymap.RIGHT || a.keyCode === b.keymap.TAB || a.keyCode === b.keymap.UP || a.keyCode === b.keymap.ENTER && a.shiftKey || a.keyCode === b.keymap.DOWN || a.keyCode === b.keymap.ENTER ? !1 : !0
            }
        };
        return d
    }]), a.directive("uiGridEdit", ["gridUtil", "uiGridEditService", function (a, b) {
        return {
            replace: !0, priority: 0, require: "^uiGrid", scope: !1, compile: function () {
                return {
                    pre: function (a, c, d, e) {
                        b.initializeGrid(e.grid)
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }]), a.directive("uiGridViewport", ["uiGridEditConstants", function (a) {
        return {
            replace: !0,
            priority: -99998,
            require: ["^uiGrid", "^uiGridRenderContainer"],
            scope: !1,
            compile: function () {
                return {
                    post: function (b, c, d, e) {
                        var f = e[0];
                        if (f.grid.api.edit && f.grid.api.cellNav) {
                            var g = e[1].containerId;
                            "body" === g && (b.$on(a.events.CANCEL_CELL_EDIT, function () {
                                f.focus()
                            }), b.$on(a.events.END_CELL_EDIT, function () {
                                f.focus()
                            }))
                        }
                    }
                }
            }
        }
    }]), a.directive("uiGridCell", ["$compile", "$injector", "$timeout", "uiGridConstants", "uiGridEditConstants", "gridUtil", "$parse", "uiGridEditService", "$rootScope", "$q", function (a, b, c, d, e, f, g, h, i, j) {
        var k = 500;
        if (b.has("uiGridCellNavService")) {
            b.get("uiGridCellNavService")
        }
        return {
            priority: -100, restrict: "A", scope: !1, require: "?^uiGrid", link: function (b, l, m, n) {
                function o() {
                    l.on("dblclick", u), l.on("touchstart", p), n && n.grid.api.cellNav && (G = n.grid.api.cellNav.on.viewPortKeyDown(b, function (a, c) {
                        null !== c && (c.row !== b.row || c.col !== b.col || b.col.colDef.enableCellEditOnFocus || s(a))
                    }), F = n.grid.api.cellNav.on.navigate(b, function (a, d, e) {
                        b.col.colDef.enableCellEditOnFocus && (d && a.row === d.row && a.col === d.col || a.row !== b.row || a.col !== b.col || c(function () {
                            u(e)
                        }))
                    })), b.beginEditEventsWired = !0
                }

                function p(a) {
                    "undefined" != typeof a.originalEvent && void 0 !== a.originalEvent && (a = a.originalEvent), l.on("touchend", q), C = c(function () {
                    }, k), C.then(function () {
                        setTimeout(u, 0), l.off("touchend", q)
                    })
                }

                function q(a) {
                    c.cancel(C), l.off("touchend", q)
                }

                function r() {
                    l.off("dblclick", u), l.off("keydown", s), l.off("touchstart", p), F(), G(), b.beginEditEventsWired = !1
                }

                function s(a) {
                    h.isStartEditKey(a) && u(a)
                }

                function t(a, c) {
                    return !c.isSaving && (angular.isFunction(a.colDef.cellEditableCondition) ? a.colDef.cellEditableCondition(b) : a.colDef.cellEditableCondition)
                }

                function u(a) {
                    b.grid.api.core.scrollToIfNecessary(b.row, b.col).then(function () {
                        v(a)
                    })
                }

                function v(h) {
                    if (!E && t(b.col, b.row)) {
                        var k = b.row.getQualifiedColField(b.col);
                        b.col.colDef.editModelField && (k = f.preEval("row.entity." + b.col.colDef.editModelField)), B = g(k), A = B(b), z = b.col.editableCellTemplate, z = z.replace(d.MODEL_COL_FIELD, k), z = z.replace(d.COL_FIELD, "grid.getCellValue(row, col)");
                        var m = b.col.colDef.editDropdownFilter ? "|" + b.col.colDef.editDropdownFilter : "";
                        z = z.replace(d.CUSTOM_FILTERS, m);
                        var n = "text";
                        switch (b.col.colDef.type) {
                            case"boolean":
                                n = "checkbox";
                                break;
                            case"number":
                                n = "number";
                                break;
                            case"date":
                                n = "date"
                        }
                        z = z.replace("INPUT_TYPE", n);
                        var o = b.col.colDef.editDropdownOptionsFunction;
                        if (o) j.when(o(b.row.entity, b.col.colDef)).then(function (a) {
                            b.editDropdownOptionsArray = a
                        }); else {
                            var p = b.col.colDef.editDropdownRowEntityOptionsArrayPath;
                            p ? b.editDropdownOptionsArray = y(b.row.entity, p) : b.editDropdownOptionsArray = b.col.colDef.editDropdownOptionsArray
                        }
                        b.editDropdownIdLabel = b.col.colDef.editDropdownIdLabel ? b.col.colDef.editDropdownIdLabel : "id", b.editDropdownValueLabel = b.col.colDef.editDropdownValueLabel ? b.col.colDef.editDropdownValueLabel : "value";
                        var q = function () {
                            E = !0, r();
                            var c = angular.element(z);
                            l.append(c), D = b.$new(), a(c)(D);
                            var d = angular.element(l.children()[0]);
                            d.addClass("ui-grid-cell-contents-hidden")
                        };
                        i.$$phase ? q() : b.$apply(q);
                        var s = b.col.grid.api.core.on.scrollBegin(b, function () {
                            b.grid.disableScrolling || (w(), b.grid.api.edit.raise.afterCellEdit(b.row.entity, b.col.colDef, B(b), A), s(), u(), v())
                        }), u = b.$on(e.events.END_CELL_EDIT, function () {
                            w(), b.grid.api.edit.raise.afterCellEdit(b.row.entity, b.col.colDef, B(b), A), u(), s(), v()
                        }), v = b.$on(e.events.CANCEL_CELL_EDIT, function () {
                            x(), v(), s(), u()
                        });
                        b.$broadcast(e.events.BEGIN_CELL_EDIT, h), c(function () {
                            b.grid.api.edit.raise.beginCellEdit(b.row.entity, b.col.colDef, h)
                        })
                    }
                }

                function w() {
                    if (b.grid.disableScrolling = !1, E) {
                        n && n.grid.api.cellNav && n.focus();
                        var a = angular.element(l.children()[0]);
                        D.$destroy();
                        for (var c = l.children(), e = 1; e < c.length; e++) angular.element(c[e]).remove();
                        a.removeClass("ui-grid-cell-contents-hidden"), E = !1, o(), b.grid.api.core.notifyDataChange(d.dataChange.EDIT)
                    }
                }

                function x() {
                    b.grid.disableScrolling = !1, E && (B.assign(b, A), b.$apply(), b.grid.api.edit.raise.cancelCellEdit(b.row.entity, b.col.colDef), w())
                }

                function y(a, b) {
                    b = b.replace(/\[(\w+)\]/g, ".$1"), b = b.replace(/^\./, "");
                    for (var c = b.split("."); c.length;) {
                        var d = c.shift();
                        if (!(d in a)) return;
                        a = a[d]
                    }
                    return a
                }

                var z, A, B, C, D, E = !1;
                if (b.col.colDef.enableCellEdit) {
                    var F = function () {
                    }, G = function () {
                    }, H = function () {
                        b.col.colDef.enableCellEdit && b.row.enableCellEdit !== !1 ? b.beginEditEventsWired || o() : b.beginEditEventsWired && r()
                    };
                    H();
                    var I = b.$watch("row", function (a, b) {
                        a !== b && H()
                    });
                    b.$on("$destroy", I)
                }
            }
        }
    }]), a.directive("uiGridEditor", ["gridUtil", "uiGridConstants", "uiGridEditConstants", "$timeout", "uiGridEditService", function (a, b, c, d, e) {
        return {
            scope: !0, require: ["?^uiGrid", "?^uiGridRenderContainer", "ngModel"], compile: function () {
                return {
                    pre: function (a, b, c) {
                    }, post: function (a, f, g, h) {
                        var i, j, k;
                        h[0] && (i = h[0]), h[1] && (j = h[1]), h[2] && (k = h[2]), a.$on(c.events.BEGIN_CELL_EDIT, function (b, c) {
                            if (d(function () {
                                if (f[0].focus(), !f[0].select || !a.col.colDef.enableCellEditOnFocus && i && i.grid.api.cellNav) try {
                                    f[0].setSelectionRange(f[0].value.length, f[0].value.length)
                                } catch (b) {
                                } else f[0].select()
                            }), i && i.grid.api.cellNav) var g = i.grid.api.cellNav.on.viewPortKeyPress(a, function (a, b) {
                                e.isStartEditKey(a) && (k.$setViewValue(String.fromCharCode("number" == typeof a.which ? a.which : a.keyCode), a), k.$render()), g()
                            });
                            f.on("mousedown", function (b) {
                                "checkbox" === f[0].type && (f.off("blur", a.stopEdit), d(function () {
                                    f.focus(), f.on("blur", a.stopEdit)
                                }))
                            }), f.on("blur", a.stopEdit)
                        }), a.deepEdit = !1, a.stopEdit = function (b) {
                            a.inputForm && !a.inputForm.$valid ? (b.stopPropagation(), a.$emit(c.events.CANCEL_CELL_EDIT)) : a.$emit(c.events.END_CELL_EDIT), a.deepEdit = !1
                        }, f.on("click", function (b) {
                            "checkbox" !== f[0].type && (a.deepEdit = !0, d(function () {
                                a.grid.disableScrolling = !0
                            }))
                        }), f.on("keydown", function (d) {
                            switch (d.keyCode) {
                                case b.keymap.ESC:
                                    d.stopPropagation(), a.$emit(c.events.CANCEL_CELL_EDIT)
                            }
                            if (!a.deepEdit || d.keyCode !== b.keymap.LEFT && d.keyCode !== b.keymap.RIGHT && d.keyCode !== b.keymap.UP && d.keyCode !== b.keymap.DOWN) if (i && i.grid.api.cellNav) d.uiGridTargetRenderContainerId = j.containerId, null !== i.cellNav.handleKeyDown(d) && a.stopEdit(d); else switch (d.keyCode) {
                                case b.keymap.ENTER:
                                case b.keymap.TAB:
                                    d.stopPropagation(), d.preventDefault(), a.stopEdit(d)
                            } else d.stopPropagation();
                            return !0
                        })
                    }
                }
            }
        }
    }]), a.directive("uiGridEditor", ["$filter", function (a) {
        function b(a) {
            if ("undefined" == typeof a || "" === a) return null;
            var b = a.split("-");
            if (3 !== b.length) return null;
            var c = parseInt(b[0], 10), d = parseInt(b[1], 10), e = parseInt(b[2], 10);
            return 1 > d || 1 > c || 1 > e ? null : new Date(c, d - 1, e)
        }

        return {
            priority: -100, require: "?ngModel", link: function (c, d, e, f) {
                2 === angular.version.minor && e.type && "date" === e.type && f && (f.$formatters.push(function (b) {
                    return f.$setValidity(null, !b || !isNaN(b.getTime())), a("date")(b, "yyyy-MM-dd")
                }), f.$parsers.push(function (a) {
                    if (a && a.length > 0) {
                        var c = b(a);
                        return f.$setValidity(null, c && !isNaN(c.getTime())), c
                    }
                    return f.$setValidity(null, !0), null
                }))
            }
        }
    }]), a.directive("uiGridEditDropdown", ["uiGridConstants", "uiGridEditConstants", "$timeout", function (a, b, c) {
        return {
            require: ["?^uiGrid", "?^uiGridRenderContainer"], scope: !0, compile: function () {
                return {
                    pre: function (a, b, c) {
                    }, post: function (d, e, f, g) {
                        var h = g[0], i = g[1];
                        d.$on(b.events.BEGIN_CELL_EDIT, function () {
                            c(function () {
                                e[0].focus()
                            }), e[0].style.width = e[0].parentElement.offsetWidth - 1 + "px", e.on("blur", function (a) {
                                d.stopEdit(a)
                            })
                        }), d.stopEdit = function (a) {
                            d.$emit(b.events.END_CELL_EDIT)
                        }, e.on("keydown", function (c) {
                            switch (c.keyCode) {
                                case a.keymap.ESC:
                                    c.stopPropagation(), d.$emit(b.events.CANCEL_CELL_EDIT)
                            }
                            if (h && h.grid.api.cellNav) c.uiGridTargetRenderContainerId = i.containerId, null !== h.cellNav.handleKeyDown(c) && d.stopEdit(c); else switch (c.keyCode) {
                                case a.keymap.ENTER:
                                case a.keymap.TAB:
                                    c.stopPropagation(), c.preventDefault(), d.stopEdit(c)
                            }
                            return !0
                        })
                    }
                }
            }
        }
    }]), a.directive("uiGridEditFileChooser", ["gridUtil", "uiGridConstants", "uiGridEditConstants", "$timeout", function (a, b, c, d) {
        return {
            scope: !0, require: ["?^uiGrid", "?^uiGridRenderContainer"], compile: function () {
                return {
                    pre: function (a, b, c) {
                    }, post: function (b, d, e, f) {
                        var g, h;
                        f[0] && (g = f[0]), f[1] && (h = f[1]);
                        var i = (g.grid, function (d) {
                            var e = d.srcElement || d.target;
                            e && e.files && e.files.length > 0 ? ("function" == typeof b.col.colDef.editFileChooserCallback ? b.col.colDef.editFileChooserCallback(b.row, b.col, e.files) : a.logError("You need to set colDef.editFileChooserCallback to use the file chooser"), e.form.reset(), b.$emit(c.events.END_CELL_EDIT)) : b.$emit(c.events.CANCEL_CELL_EDIT)
                        });
                        d[0].addEventListener("change", i, !1), b.$on(c.events.BEGIN_CELL_EDIT, function () {
                            d[0].focus(), d[0].select(), d.on("blur", function (a) {
                                b.$emit(c.events.END_CELL_EDIT)
                            })
                        })
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.emptyBaseLayer", ["ui.grid"]);
    a.service("uiGridBaseLayerService", ["gridUtil", "$compile", function (a, b) {
        var c = {
            initializeGrid: function (a, b) {
                a.baseLayer = {emptyRows: []}, a.options.enableEmptyGridBaseLayer !== !1 && (a.options.enableEmptyGridBaseLayer = !b)
            }, setNumberOfEmptyRows: function (a, b) {
                var c = b.options.rowHeight, d = Math.ceil(a / c);
                if (d > 0) {
                    b.baseLayer.emptyRows = [];
                    for (var e = 0; d > e; e++) b.baseLayer.emptyRows.push({})
                }
            }
        };
        return c
    }]), a.directive("uiGridEmptyBaseLayer", ["gridUtil", "uiGridBaseLayerService", "$parse", function (a, b, c) {
        return {
            require: "^uiGrid", scope: !1, compile: function (a, d) {
                return {
                    pre: function (a, d, e, f) {
                        var g = c(e.uiGridEmptyBaseLayer)(a) === !1;
                        b.initializeGrid(f.grid, g)
                    }, post: function (a, c, d, e) {
                        function f() {
                            var a = h.getViewportHeight();
                            return a !== i ? (i = a, !0) : !1
                        }

                        function g(a) {
                            return ".grid" + e.grid.id + " .ui-grid-render-container .ui-grid-empty-base-layer-container.ui-grid-canvas { height: " + a + "px; }"
                        }

                        if (e.grid.options.enableEmptyGridBaseLayer) {
                            var h = e.grid.renderContainers.body, i = h.getViewportHeight();
                            e.grid.registerStyleComputation({
                                func: function () {
                                    return f() && b.setNumberOfEmptyRows(i, e.grid), g(i)
                                }
                            })
                        }
                    }
                }
            }
        }
    }]), a.directive("uiGridViewport", ["$compile", "gridUtil", "$templateCache", function (a, b, c) {
        return {
            priority: -200, scope: !1, compile: function (a, b) {
                var d = c.get("ui-grid/emptyBaseLayerContainer");
                return a.prepend(d), {
                    pre: function (a, b, c, d) {
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.expandable", ["ui.grid"]);
    a.service("uiGridExpandableService", ["gridUtil", "$compile", function (a, b) {
        var c = {
            initializeGrid: function (b) {
                b.expandable = {}, b.expandable.expandedAll = !1, b.options.enableExpandable = b.options.enableExpandable !== !1, b.options.expandableRowHeight = b.options.expandableRowHeight || 150, b.options.expandableRowHeaderWidth = b.options.expandableRowHeaderWidth || 40, b.options.enableExpandable && !b.options.expandableRowTemplate && (a.logError("You have not set the expandableRowTemplate, disabling expandable module"), b.options.enableExpandable = !1);
                var d = {
                    events: {
                        expandable: {
                            rowExpandedBeforeStateChanged: function (a, b) {
                            }, rowExpandedStateChanged: function (a, b) {
                            }
                        }
                    }, methods: {
                        expandable: {
                            toggleRowExpansion: function (a) {
                                var d = b.getRow(a);
                                null !== d && c.toggleRowExpansion(b, d)
                            }, expandAllRows: function () {
                                c.expandAllRows(b)
                            }, collapseAllRows: function () {
                                c.collapseAllRows(b)
                            }, toggleAllRows: function () {
                                c.toggleAllRows(b)
                            }, expandRow: function (a) {
                                var d = b.getRow(a);
                                null === d || d.isExpanded || c.toggleRowExpansion(b, d)
                            }, collapseRow: function (a) {
                                var d = b.getRow(a);
                                null !== d && d.isExpanded && c.toggleRowExpansion(b, d)
                            }, getExpandedRows: function () {
                                return c.getExpandedRows(b).map(function (a) {
                                    return a.entity
                                })
                            }
                        }
                    }
                };
                b.api.registerEventsFromObject(d.events), b.api.registerMethodsFromObject(d.methods)
            }, toggleRowExpansion: function (a, b) {
                a.api.expandable.raise.rowExpandedBeforeStateChanged(b), b.isExpanded = !b.isExpanded, angular.isUndefined(b.expandedRowHeight) && (b.expandedRowHeight = a.options.expandableRowHeight), b.isExpanded ? b.height = b.grid.options.rowHeight + b.expandedRowHeight : (b.height = b.grid.options.rowHeight, a.expandable.expandedAll = !1), a.api.expandable.raise.rowExpandedStateChanged(b)
            }, expandAllRows: function (a, b) {
                a.renderContainers.body.visibleRowCache.forEach(function (b) {
                    b.isExpanded || c.toggleRowExpansion(a, b)
                }), a.expandable.expandedAll = !0, a.queueGridRefresh()
            }, collapseAllRows: function (a) {
                a.renderContainers.body.visibleRowCache.forEach(function (b) {
                    b.isExpanded && c.toggleRowExpansion(a, b)
                }), a.expandable.expandedAll = !1, a.queueGridRefresh()
            }, toggleAllRows: function (a) {
                a.expandable.expandedAll ? c.collapseAllRows(a) : c.expandAllRows(a)
            }, getExpandedRows: function (a) {
                return a.rows.filter(function (a) {
                    return a.isExpanded
                })
            }
        };
        return c
    }]), a.directive("uiGridExpandable", ["uiGridExpandableService", "$templateCache", function (a, b) {
        return {
            replace: !0, priority: 0, require: "^uiGrid", scope: !1, compile: function () {
                return {
                    pre: function (c, d, e, f) {
                        if (a.initializeGrid(f.grid), f.grid.options.enableExpandable && f.grid.options.enableExpandableRowHeader !== !1) {
                            var g = {
                                name: "expandableButtons",
                                displayName: "",
                                exporterSuppressExport: !0,
                                enableColumnResizing: !1,
                                enableColumnMenu: !1,
                                width: f.grid.options.expandableRowHeaderWidth || 40
                            };
                            g.cellTemplate = b.get("ui-grid/expandableRowHeader"), g.headerCellTemplate = b.get("ui-grid/expandableTopRowHeader"), f.grid.addRowHeaderColumn(g, -90)
                        }
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }]), a.directive("uiGrid", ["uiGridExpandableService", "$templateCache", function (a, b) {
        return {
            replace: !0, priority: 599, require: "^uiGrid", scope: !1, compile: function () {
                return {
                    pre: function (a, b, c, d) {
                        d.grid.api.core.on.renderingComplete(a, function () {
                            a.row && a.row.grid && a.row.grid.options && a.row.grid.options.enableExpandable && (d.grid.parentRow = a.row)
                        })
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }]), a.directive("uiGridExpandableRow", ["uiGridExpandableService", "$timeout", "$compile", "uiGridConstants", "gridUtil", "$interval", "$log", function (a, b, c, d, e, f, g) {
        return {
            replace: !1, priority: 0, scope: !1, compile: function () {
                return {
                    pre: function (a, b, d, f) {
                        e.getTemplate(a.grid.options.expandableRowTemplate).then(function (d) {
                            if (a.grid.options.expandableRowScope) {
                                var e = a.grid.options.expandableRowScope;
                                for (var f in e) e.hasOwnProperty(f) && (a[f] = e[f])
                            }
                            var g = angular.element(d);
                            b.append(g), g = c(g)(a), a.row.expandedRendered = !0
                        })
                    }, post: function (a, b, c, d) {
                        a.$on("$destroy", function () {
                            a.row.expandedRendered = !1
                        })
                    }
                }
            }
        }
    }]), a.directive("uiGridRow", ["$compile", "gridUtil", "$templateCache", function (a, b, c) {
        return {
            priority: -200, scope: !1, compile: function (a, b) {
                return {
                    pre: function (a, b, c, d) {
                        a.grid.options.enableExpandable && (a.expandableRow = {}, a.expandableRow.shouldRenderExpand = function () {
                            var b = "body" === a.colContainer.name && a.grid.options.enableExpandable !== !1 && a.row.isExpanded && (!a.grid.isScrollingVertically || a.row.expandedRendered);
                            return b
                        }, a.expandableRow.shouldRenderFiller = function () {
                            var b = a.row.isExpanded && ("body" !== a.colContainer.name || a.grid.isScrollingVertically && !a.row.expandedRendered);
                            return b
                        })
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }]), a.directive("uiGridViewport", ["$compile", "gridUtil", "$templateCache", function (a, b, c) {
        return {
            priority: -200, scope: !1, compile: function (a, b) {
                var d = angular.element(a.children().children()[0]), e = c.get("ui-grid/expandableScrollFiller"),
                    f = c.get("ui-grid/expandableRow");
                return d.append(f), d.append(e), {
                    pre: function (a, b, c, d) {
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.exporter", ["ui.grid"]);
    a.constant("uiGridExporterConstants", {
        featureName: "exporter",
        ALL: "all",
        VISIBLE: "visible",
        SELECTED: "selected",
        CSV_CONTENT: "CSV_CONTENT",
        BUTTON_LABEL: "BUTTON_LABEL",
        FILE_NAME: "FILE_NAME"
    }), a.service("uiGridExporterService", ["$q", "uiGridExporterConstants", "gridUtil", "$compile", "$interval", "i18nService", function (a, b, c, d, e, f) {
        var g = {
            delay: 100, initializeGrid: function (a) {
                a.exporter = {}, this.defaultGridOptions(a.options);
                var b = {
                    events: {exporter: {}}, methods: {
                        exporter: {
                            csvExport: function (b, c) {
                                g.csvExport(a, b, c)
                            }, pdfExport: function (b, c) {
                                g.pdfExport(a, b, c)
                            }
                        }
                    }
                };
                a.api.registerEventsFromObject(b.events), a.api.registerMethodsFromObject(b.methods), a.api.core.addToGridMenu ? g.addToMenu(a) : e(function () {
                    a.api.core.addToGridMenu && g.addToMenu(a)
                }, this.delay, 1)
            }, defaultGridOptions: function (a) {
                a.exporterSuppressMenu = a.exporterSuppressMenu === !0, a.exporterMenuLabel = a.exporterMenuLabel ? a.exporterMenuLabel : "Export", a.exporterSuppressColumns = a.exporterSuppressColumns ? a.exporterSuppressColumns : [], a.exporterCsvColumnSeparator = a.exporterCsvColumnSeparator ? a.exporterCsvColumnSeparator : ",", a.exporterCsvFilename = a.exporterCsvFilename ? a.exporterCsvFilename : "download.csv", a.exporterPdfFilename = a.exporterPdfFilename ? a.exporterPdfFilename : "download.pdf", a.exporterOlderExcelCompatibility = a.exporterOlderExcelCompatibility === !0, a.exporterIsExcelCompatible = a.exporterIsExcelCompatible === !0, a.exporterMenuItemOrder = a.exporterMenuItemOrder ? a.exporterMenuItemOrder : 200, a.exporterPdfDefaultStyle = a.exporterPdfDefaultStyle ? a.exporterPdfDefaultStyle : {fontSize: 11}, a.exporterPdfTableStyle = a.exporterPdfTableStyle ? a.exporterPdfTableStyle : {margin: [0, 5, 0, 15]}, a.exporterPdfTableHeaderStyle = a.exporterPdfTableHeaderStyle ? a.exporterPdfTableHeaderStyle : {
                    bold: !0,
                    fontSize: 12,
                    color: "black"
                }, a.exporterPdfHeader = a.exporterPdfHeader ? a.exporterPdfHeader : null, a.exporterPdfFooter = a.exporterPdfFooter ? a.exporterPdfFooter : null, a.exporterPdfOrientation = a.exporterPdfOrientation ? a.exporterPdfOrientation : "landscape", a.exporterPdfPageSize = a.exporterPdfPageSize ? a.exporterPdfPageSize : "A4", a.exporterPdfMaxGridWidth = a.exporterPdfMaxGridWidth ? a.exporterPdfMaxGridWidth : 720, a.exporterMenuAllData = void 0 !== a.exporterMenuAllData ? a.exporterMenuAllData : !0, a.exporterMenuVisibleData = void 0 !== a.exporterMenuVisibleData ? a.exporterMenuVisibleData : !0, a.exporterMenuSelectedData = void 0 !== a.exporterMenuSelectedData ? a.exporterMenuSelectedData : !0, a.exporterMenuCsv = void 0 !== a.exporterMenuCsv ? a.exporterMenuCsv : !0, a.exporterMenuPdf = void 0 !== a.exporterMenuPdf ? a.exporterMenuPdf : !0, a.exporterPdfCustomFormatter = a.exporterPdfCustomFormatter && "function" == typeof a.exporterPdfCustomFormatter ? a.exporterPdfCustomFormatter : function (a) {
                    return a
                }, a.exporterHeaderFilterUseName = a.exporterHeaderFilterUseName === !0, a.exporterFieldCallback = a.exporterFieldCallback ? a.exporterFieldCallback : function (a, b, c, d) {
                    return d
                }, a.exporterAllDataFn = a.exporterAllDataFn ? a.exporterAllDataFn : null, null == a.exporterAllDataFn && a.exporterAllDataPromise && (a.exporterAllDataFn = a.exporterAllDataPromise)
            }, addToMenu: function (a) {
                a.api.core.addToGridMenu(a, [{
                    title: f.getSafeText("gridMenu.exporterAllAsCsv"), action: function (a) {
                        this.grid.api.exporter.csvExport(b.ALL, b.ALL)
                    }, shown: function () {
                        return this.grid.options.exporterMenuCsv && this.grid.options.exporterMenuAllData
                    }, order: a.options.exporterMenuItemOrder
                }, {
                    title: f.getSafeText("gridMenu.exporterVisibleAsCsv"), action: function (a) {
                        this.grid.api.exporter.csvExport(b.VISIBLE, b.VISIBLE)
                    }, shown: function () {
                        return this.grid.options.exporterMenuCsv && this.grid.options.exporterMenuVisibleData
                    }, order: a.options.exporterMenuItemOrder + 1
                }, {
                    title: f.getSafeText("gridMenu.exporterSelectedAsCsv"), action: function (a) {
                        this.grid.api.exporter.csvExport(b.SELECTED, b.VISIBLE)
                    }, shown: function () {
                        return this.grid.options.exporterMenuCsv && this.grid.options.exporterMenuSelectedData && this.grid.api.selection && this.grid.api.selection.getSelectedRows().length > 0
                    }, order: a.options.exporterMenuItemOrder + 2
                }, {
                    title: f.getSafeText("gridMenu.exporterAllAsPdf"), action: function (a) {
                        this.grid.api.exporter.pdfExport(b.ALL, b.ALL)
                    }, shown: function () {
                        return this.grid.options.exporterMenuPdf && this.grid.options.exporterMenuAllData
                    }, order: a.options.exporterMenuItemOrder + 3
                }, {
                    title: f.getSafeText("gridMenu.exporterVisibleAsPdf"), action: function (a) {
                        this.grid.api.exporter.pdfExport(b.VISIBLE, b.VISIBLE)
                    }, shown: function () {
                        return this.grid.options.exporterMenuPdf && this.grid.options.exporterMenuVisibleData
                    }, order: a.options.exporterMenuItemOrder + 4
                }, {
                    title: f.getSafeText("gridMenu.exporterSelectedAsPdf"), action: function (a) {
                        this.grid.api.exporter.pdfExport(b.SELECTED, b.VISIBLE)
                    }, shown: function () {
                        return this.grid.options.exporterMenuPdf && this.grid.options.exporterMenuSelectedData && this.grid.api.selection && this.grid.api.selection.getSelectedRows().length > 0
                    }, order: a.options.exporterMenuItemOrder + 5
                }])
            }, csvExport: function (a, b, c) {
                var d = this;
                this.loadAllDataIfNeeded(a, b, c).then(function () {
                    var e = a.options.showHeader ? d.getColumnHeaders(a, c) : [], f = d.getData(a, b, c),
                        g = d.formatAsCsv(e, f, a.options.exporterCsvColumnSeparator);
                    d.downloadFile(a.options.exporterCsvFilename, g, a.options.exporterCsvColumnSeparator, a.options.exporterOlderExcelCompatibility, a.options.exporterIsExcelCompatible)
                })
            }, loadAllDataIfNeeded: function (c, d, e) {
                if (d === b.ALL && c.rows.length !== c.options.totalItems && c.options.exporterAllDataFn) return c.options.exporterAllDataFn().then(function () {
                    c.modifyRows(c.options.data)
                });
                var f = a.defer();
                return f.resolve(), f.promise
            }, getColumnHeaders: function (a, c) {
                var d, e = [];
                if (c === b.ALL) d = a.columns; else {
                    var f = a.renderContainers.left ? a.renderContainers.left.visibleColumnCache.filter(function (a) {
                            return a.visible
                        }) : [],
                        g = a.renderContainers.body ? a.renderContainers.body.visibleColumnCache.filter(function (a) {
                            return a.visible
                        }) : [],
                        h = a.renderContainers.right ? a.renderContainers.right.visibleColumnCache.filter(function (a) {
                            return a.visible
                        }) : [];
                    d = f.concat(g, h)
                }
                return d.forEach(function (b, c) {
                    b.colDef.exporterSuppressExport !== !0 && -1 === a.options.exporterSuppressColumns.indexOf(b.name) && e.push({
                        name: b.field,
                        displayName: a.options.exporterHeaderFilter ? a.options.exporterHeaderFilterUseName ? a.options.exporterHeaderFilter(b.name) : a.options.exporterHeaderFilter(b.displayName) : b.displayName,
                        width: b.drawnWidth ? b.drawnWidth : b.width,
                        align: "number" === b.colDef.type ? "right" : "left"
                    })
                }), e
            }, getData: function (a, d, e, f) {
                var g, h, i = [];
                switch (d) {
                    case b.ALL:
                        g = a.rows;
                        break;
                    case b.VISIBLE:
                        g = a.getVisibleRows();
                        break;
                    case b.SELECTED:
                        a.api.selection ? g = a.api.selection.getSelectedGridRows() : c.logError("selection feature must be enabled to allow selected rows to be exported")
                }
                if (e === b.ALL) h = a.columns; else {
                    var j = a.renderContainers.left ? a.renderContainers.left.visibleColumnCache.filter(function (a) {
                            return a.visible
                        }) : [],
                        k = a.renderContainers.body ? a.renderContainers.body.visibleColumnCache.filter(function (a) {
                            return a.visible
                        }) : [],
                        l = a.renderContainers.right ? a.renderContainers.right.visibleColumnCache.filter(function (a) {
                            return a.visible
                        }) : [];
                    h = j.concat(k, l)
                }
                return g.forEach(function (c, d) {
                    if (c.exporterEnableExporting !== !1) {
                        var g = [];
                        h.forEach(function (d, h) {
                            if ((d.visible || e === b.ALL) && d.colDef.exporterSuppressExport !== !0 && -1 === a.options.exporterSuppressColumns.indexOf(d.name)) {
                                var i = f ? a.getCellDisplayValue(c, d) : a.getCellValue(c, d),
                                    j = {value: a.options.exporterFieldCallback(a, c, d, i)};
                                d.colDef.exporterPdfAlign && (j.alignment = d.colDef.exporterPdfAlign), g.push(j)
                            }
                        }), i.push(g)
                    }
                }), i
            }, formatAsCsv: function (a, b, c) {
                var d = this, e = a.map(function (a) {
                    return {value: a.displayName}
                }), f = e.length > 0 ? d.formatRowAsCsv(this, c)(e) + "\n" : "";
                return f += b.map(this.formatRowAsCsv(this, c)).join("\n")
            }, formatRowAsCsv: function (a, b) {
                return function (c) {
                    return c.map(a.formatFieldAsCsv).join(b)
                }
            }, formatFieldAsCsv: function (a) {
                return null == a.value ? "" : "number" == typeof a.value ? a.value : "boolean" == typeof a.value ? a.value ? "TRUE" : "FALSE" : "string" == typeof a.value ? '"' + a.value.replace(/"/g, '""') + '"' : JSON.stringify(a.value)
            }, isIE: function () {
                var a = navigator.userAgent.search(/(?:Edge|MSIE|Trident\/.*; rv:)/), b = !1;
                return -1 !== a && (b = !0), b
            }, downloadFile: function (a, b, c, d, e) {
                var f, g = document, h = g.createElement("a"), i = "application/octet-stream;charset=utf-8",
                    j = this.isIE();
                if (e && (b = "sep=" + c + "\r\n" + b), navigator.msSaveBlob) return navigator.msSaveOrOpenBlob(new Blob([d ? "\ufeff" : "", b], {type: i}), a);
                if (j) {
                    var k = g.createElement("iframe");
                    return document.body.appendChild(k), k.contentWindow.document.open("text/html", "replace"), k.contentWindow.document.write(b), k.contentWindow.document.close(), k.contentWindow.focus(), k.contentWindow.document.execCommand("SaveAs", !0, a), document.body.removeChild(k), !0
                }
                if ("download" in h) {
                    var l = new Blob([d ? "\ufeff" : "", b], {type: i});
                    f = URL.createObjectURL(l), h.setAttribute("download", a)
                } else f = "data:" + i + "," + encodeURIComponent(b), h.setAttribute("target", "_blank");
                h.href = f, h.setAttribute("style", "display:none;"), g.body.appendChild(h), setTimeout(function () {
                    if (h.click) h.click(); else if (document.createEvent) {
                        var a = document.createEvent("MouseEvents");
                        a.initEvent("click", !0, !0), h.dispatchEvent(a)
                    }
                    g.body.removeChild(h)
                }, this.delay)
            }, pdfExport: function (a, b, c) {
                var d = this;
                this.loadAllDataIfNeeded(a, b, c).then(function () {
                    var e = d.getColumnHeaders(a, c), f = d.getData(a, b, c), g = d.prepareAsPdf(a, e, f);
                    d.isIE() || -1 !== navigator.appVersion.indexOf("Edge") ? d.downloadPDF(a.options.exporterPdfFilename, g) : pdfMake.createPdf(g).open()
                })
            }, downloadPDF: function (a, b) {
                var c, d = document;
                d.createElement("a");
                c = this.isIE();
                var e, f = pdfMake.createPdf(b);
                f.getBuffer(function (b) {
                    if (e = new Blob([b]), navigator.msSaveBlob) return navigator.msSaveBlob(e, a);
                    if (c) {
                        var f = d.createElement("iframe");
                        return document.body.appendChild(f), f.contentWindow.document.open("text/html", "replace"), f.contentWindow.document.write(e), f.contentWindow.document.close(), f.contentWindow.focus(), f.contentWindow.document.execCommand("SaveAs", !0, a), document.body.removeChild(f), !0
                    }
                })
            }, prepareAsPdf: function (a, b, c) {
                var d = this.calculatePdfHeaderWidths(a, b), e = b.map(function (a) {
                    return {text: a.displayName, style: "tableHeader"}
                }), f = c.map(this.formatRowAsPdf(this)), g = [e].concat(f), h = {
                    pageOrientation: a.options.exporterPdfOrientation,
                    pageSize: a.options.exporterPdfPageSize,
                    content: [{style: "tableStyle", table: {headerRows: 1, widths: d, body: g}}],
                    styles: {
                        tableStyle: a.options.exporterPdfTableStyle,
                        tableHeader: a.options.exporterPdfTableHeaderStyle
                    },
                    defaultStyle: a.options.exporterPdfDefaultStyle
                };
                return a.options.exporterPdfLayout && (h.layout = a.options.exporterPdfLayout), a.options.exporterPdfHeader && (h.header = a.options.exporterPdfHeader), a.options.exporterPdfFooter && (h.footer = a.options.exporterPdfFooter), a.options.exporterPdfCustomFormatter && (h = a.options.exporterPdfCustomFormatter(h)), h
            }, calculatePdfHeaderWidths: function (a, b) {
                var c = 0;
                b.forEach(function (a) {
                    "number" == typeof a.width && (c += a.width)
                });
                var d = 0;
                b.forEach(function (a) {
                    if ("*" === a.width && (d += 100), "string" == typeof a.width && a.width.match(/(\d)*%/)) {
                        var b = parseInt(a.width.match(/(\d)*%/)[0]);
                        a.width = c * b / 100, d += a.width
                    }
                });
                var e = c + d;
                return b.map(function (b) {
                    return "*" === b.width ? b.width : b.width * a.options.exporterPdfMaxGridWidth / e
                })
            }, formatRowAsPdf: function (a) {
                return function (b) {
                    return b.map(a.formatFieldAsPdfString)
                }
            }, formatFieldAsPdfString: function (a) {
                var b;
                return b = null == a.value ? "" : "number" == typeof a.value ? a.value.toString() : "boolean" == typeof a.value ? a.value ? "TRUE" : "FALSE" : "string" == typeof a.value ? a.value.replace(/"/g, '""') : JSON.stringify(a.value).replace(/^"/, "").replace(/"$/, ""), a.alignment && "string" == typeof a.alignment && (b = {
                    text: b,
                    alignment: a.alignment
                }), b
            }
        };
        return g
    }]), a.directive("uiGridExporter", ["uiGridExporterConstants", "uiGridExporterService", "gridUtil", "$compile", function (a, b, c, d) {
        return {
            replace: !0, priority: 0, require: "^uiGrid", scope: !1, link: function (a, c, d, e) {
                b.initializeGrid(e.grid), e.grid.exporter.$scope = a
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.grouping", ["ui.grid", "ui.grid.treeBase"]);
    a.constant("uiGridGroupingConstants", {
        featureName: "grouping",
        rowHeaderColName: "treeBaseRowHeaderCol",
        EXPANDED: "expanded",
        COLLAPSED: "collapsed",
        aggregation: {COUNT: "count", SUM: "sum", MAX: "max", MIN: "min", AVG: "avg"}
    }), a.service("uiGridGroupingService", ["$q", "uiGridGroupingConstants", "gridUtil", "rowSorter", "GridRow", "gridClassFactory", "i18nService", "uiGridConstants", "uiGridTreeBaseService", function (a, b, c, d, e, f, g, h, i) {
        var j = {
            initializeGrid: function (a, b) {
                i.initializeGrid(a, b), a.grouping = {}, a.grouping.groupHeaderCache = {}, j.defaultGridOptions(a.options), a.registerRowsProcessor(j.groupRows, 400), a.registerColumnBuilder(j.groupingColumnBuilder), a.registerColumnsProcessor(j.groupingColumnProcessor, 400);
                var c = {
                    events: {grouping: {aggregationChanged: {}, groupingChanged: {}}},
                    methods: {
                        grouping: {
                            getGrouping: function (b) {
                                var c = j.getGrouping(a);
                                return c.grouping.forEach(function (a) {
                                    a.colName = a.col.name, delete a.col
                                }), c.aggregations.forEach(function (a) {
                                    a.colName = a.col.name, delete a.col
                                }), c.aggregations = c.aggregations.filter(function (a) {
                                    return !a.aggregation.source || "grouping" !== a.aggregation.source
                                }), b && (c.rowExpandedStates = j.getRowExpandedStates(a.grouping.groupingHeaderCache)), c
                            }, setGrouping: function (b) {
                                j.setGrouping(a, b)
                            }, groupColumn: function (b) {
                                var c = a.getColumn(b);
                                j.groupColumn(a, c)
                            }, ungroupColumn: function (b) {
                                var c = a.getColumn(b);
                                j.ungroupColumn(a, c)
                            }, clearGrouping: function () {
                                j.clearGrouping(a)
                            }, aggregateColumn: function (b, c, d) {
                                var e = a.getColumn(b);
                                j.aggregateColumn(a, e, c, d)
                            }
                        }
                    }
                };
                a.api.registerEventsFromObject(c.events), a.api.registerMethodsFromObject(c.methods), a.api.core.on.sortChanged(b, j.tidyPriorities)
            }, defaultGridOptions: function (a) {
                a.enableGrouping = a.enableGrouping !== !1, a.groupingShowCounts = a.groupingShowCounts !== !1, a.groupingNullLabel = "undefined" == typeof a.groupingNullLabel ? "Null" : a.groupingNullLabel, a.enableGroupHeaderSelection = a.enableGroupHeaderSelection === !0
            }, groupingColumnBuilder: function (a, d, e) {
                if (a.enableGrouping !== !1) {
                    "undefined" == typeof d.grouping && "undefined" != typeof a.grouping ? (d.grouping = angular.copy(a.grouping), "undefined" != typeof d.grouping.groupPriority && d.grouping.groupPriority > -1 && (d.treeAggregationFn = i.nativeAggregations()[b.aggregation.COUNT].aggregationFn, d.treeAggregationFinalizerFn = j.groupedFinalizerFn)) : "undefined" == typeof d.grouping && (d.grouping = {}), "undefined" != typeof d.grouping && "undefined" != typeof d.grouping.groupPriority && d.grouping.groupPriority >= 0 && (d.suppressRemoveSort = !0);
                    var f = {
                        name: "ui.grid.grouping.group",
                        title: g.get().grouping.group,
                        icon: "ui-grid-icon-indent-right",
                        shown: function () {
                            return "undefined" == typeof this.context.col.grouping || "undefined" == typeof this.context.col.grouping.groupPriority || this.context.col.grouping.groupPriority < 0
                        },
                        action: function () {
                            j.groupColumn(this.context.col.grid, this.context.col)
                        }
                    }, h = {
                        name: "ui.grid.grouping.ungroup",
                        title: g.get().grouping.ungroup,
                        icon: "ui-grid-icon-indent-left",
                        shown: function () {
                            return "undefined" != typeof this.context.col.grouping && "undefined" != typeof this.context.col.grouping.groupPriority && this.context.col.grouping.groupPriority >= 0
                        },
                        action: function () {
                            j.ungroupColumn(this.context.col.grid, this.context.col)
                        }
                    }, k = {
                        name: "ui.grid.grouping.aggregateRemove",
                        title: g.get().grouping.aggregate_remove,
                        shown: function () {
                            return "undefined" != typeof this.context.col.treeAggregationFn
                        },
                        action: function () {
                            j.aggregateColumn(this.context.col.grid, this.context.col, null)
                        }
                    }, l = function (a, b) {
                        b = b || g.get().grouping["aggregate_" + a] || a;
                        var e = {
                            name: "ui.grid.grouping.aggregate" + a, title: b, shown: function () {
                                return "undefined" == typeof this.context.col.treeAggregation || "undefined" == typeof this.context.col.treeAggregation.type || this.context.col.treeAggregation.type !== a
                            }, action: function () {
                                j.aggregateColumn(this.context.col.grid, this.context.col, a)
                            }
                        };
                        c.arrayContainsObjectWithProperty(d.menuItems, "name", "ui.grid.grouping.aggregate" + a) || d.menuItems.push(e)
                    };
                    d.colDef.groupingShowGroupingMenu !== !1 && (c.arrayContainsObjectWithProperty(d.menuItems, "name", "ui.grid.grouping.group") || d.menuItems.push(f), c.arrayContainsObjectWithProperty(d.menuItems, "name", "ui.grid.grouping.ungroup") || d.menuItems.push(h)), d.colDef.groupingShowAggregationMenu !== !1 && (angular.forEach(i.nativeAggregations(), function (a, b) {
                        l(b)
                    }), angular.forEach(e.treeCustomAggregations, function (a, b) {
                        l(b, a.menuTitle)
                    }), c.arrayContainsObjectWithProperty(d.menuItems, "name", "ui.grid.grouping.aggregateRemove") || d.menuItems.push(k))
                }
            }, groupingColumnProcessor: function (a, b) {
                return a = j.moveGroupColumns(this, a, b)
            }, groupedFinalizerFn: function (a) {
                var b = this;
                "undefined" != typeof a.groupVal ? (a.rendered = a.groupVal, b.grid.options.groupingShowCounts && "date" !== b.colDef.type && "object" !== b.colDef.type && (a.rendered += " (" + a.value + ")")) : a.rendered = null
            }, moveGroupColumns: function (a, b, c) {
                return a.options.moveGroupColumns === !1 ? b : (b.forEach(function (a, b) {
                    a.groupingPosition = b
                }), b.sort(function (a, b) {
                    var c, d;
                    return c = a.isRowHeader ? a.headerPriority : "undefined" == typeof a.grouping || "undefined" == typeof a.grouping.groupPriority || a.grouping.groupPriority < 0 ? null : a.grouping.groupPriority, d = b.isRowHeader ? b.headerPriority : "undefined" == typeof b.grouping || "undefined" == typeof b.grouping.groupPriority || b.grouping.groupPriority < 0 ? null : b.grouping.groupPriority, null !== c && null === d ? -1 : null !== d && null === c ? 1 : null !== c && null !== d ? c - d : a.groupingPosition - b.groupingPosition
                }), b.forEach(function (a, b) {
                    delete a.groupingPosition
                }), b)
            }, groupColumn: function (a, c) {
                "undefined" == typeof c.grouping && (c.grouping = {});
                var d = j.getGrouping(a);
                c.grouping.groupPriority = d.grouping.length, c.previousSort = angular.copy(c.sort), c.sort ? ("undefined" == typeof c.sort.direction || null === c.sort.direction) && (c.sort.direction = h.ASC) : c.sort = {direction: h.ASC}, c.treeAggregation = {
                    type: b.aggregation.COUNT,
                    source: "grouping"
                }, c.treeAggregationFn = i.nativeAggregations()[b.aggregation.COUNT].aggregationFn, c.treeAggregationFinalizerFn = j.groupedFinalizerFn, a.api.grouping.raise.groupingChanged(c), a.api.core.raise.sortChanged(a, a.getColumnSorting()), a.queueGridRefresh()
            }, ungroupColumn: function (a, b) {
                "undefined" != typeof b.grouping && (delete b.grouping.groupPriority, delete b.treeAggregation, delete b.customTreeAggregationFinalizer, b.previousSort && (b.sort = b.previousSort, delete b.previousSort), j.tidyPriorities(a), a.api.grouping.raise.groupingChanged(b), a.api.core.raise.sortChanged(a, a.getColumnSorting()), a.queueGridRefresh())
            }, aggregateColumn: function (a, b, c) {
                "undefined" != typeof b.grouping && "undefined" != typeof b.grouping.groupPriority && b.grouping.groupPriority >= 0 && j.ungroupColumn(a, b);
                var d = {};
                "undefined" != typeof a.options.treeCustomAggregations[c] ? d = a.options.treeCustomAggregations[c] : "undefined" != typeof i.nativeAggregations()[c] && (d = i.nativeAggregations()[c]), b.treeAggregation = {
                    type: c,
                    label: g.get().aggregation[d.label] || d.label
                }, b.treeAggregationFn = d.aggregationFn, b.treeAggregationFinalizerFn = d.finalizerFn, a.api.grouping.raise.aggregationChanged(b), a.queueGridRefresh()
            }, setGrouping: function (a, b) {
                "undefined" != typeof b && (j.clearGrouping(a), b.grouping && b.grouping.length && b.grouping.length > 0 && b.grouping.forEach(function (b) {
                    var c = a.getColumn(b.colName);
                    c && j.groupColumn(a, c)
                }), b.aggregations && b.aggregations.length && b.aggregations.forEach(function (b) {
                    var c = a.getColumn(b.colName);
                    c && j.aggregateColumn(a, c, b.aggregation.type)
                }), b.rowExpandedStates && j.applyRowExpandedStates(a.grouping.groupingHeaderCache, b.rowExpandedStates))
            }, clearGrouping: function (a) {
                var b = j.getGrouping(a);
                b.grouping.length > 0 && b.grouping.forEach(function (b) {
                    b.col || (b.col = a.getColumn(b.colName)), j.ungroupColumn(a, b.col)
                }), b.aggregations.length > 0 && b.aggregations.forEach(function (b) {
                    b.col || (b.col = a.getColumn(b.colName)), j.aggregateColumn(a, b.col, null)
                })
            }, tidyPriorities: function (a) {
                "undefined" != typeof a && "undefined" == typeof a.grid || "undefined" == typeof this.grid || (a = this.grid);
                var b = [], c = [];
                a.columns.forEach(function (a, d) {
                    "undefined" != typeof a.grouping && "undefined" != typeof a.grouping.groupPriority && a.grouping.groupPriority >= 0 ? b.push(a) : "undefined" != typeof a.sort && "undefined" != typeof a.sort.priority && a.sort.priority >= 0 && c.push(a)
                }), b.sort(function (a, b) {
                    return a.grouping.groupPriority - b.grouping.groupPriority
                }), b.forEach(function (a, b) {
                    a.grouping.groupPriority = b, a.suppressRemoveSort = !0, "undefined" == typeof a.sort && (a.sort = {}), a.sort.priority = b
                });
                var d = b.length;
                c.sort(function (a, b) {
                    return a.sort.priority - b.sort.priority
                }), c.forEach(function (a, b) {
                    a.sort.priority = d, a.suppressRemoveSort = a.colDef.suppressRemoveSort, d++
                })
            }, groupRows: function (a) {
                if (0 === a.length) return a;
                var b = this;
                b.grouping.oldGroupingHeaderCache = b.grouping.groupingHeaderCache || {}, b.grouping.groupingHeaderCache = {};
                for (var c = j.initialiseProcessingState(b), e = function (e, h) {
                    var i = b.getCellValue(g, e.col);
                    e.initialised && 0 === d.getSortFn(b, e.col, a)(i, e.currentValue) || (j.insertGroupHeader(b, a, f, c, h), f++)
                }, f = 0; f < a.length; f++) {
                    var g = a[f];
                    g.visible && c.forEach(e)
                }
                return delete b.grouping.oldGroupingHeaderCache, a
            }, initialiseProcessingState: function (a) {
                var b = [], c = j.getGrouping(a);
                return c.grouping.forEach(function (a, c) {
                    b.push({fieldName: a.field, col: a.col, initialised: !1, currentValue: null, currentRow: null})
                }), b
            }, getGrouping: function (a) {
                var b = [], c = [];
                return a.columns.forEach(function (a, d) {
                    a.grouping && "undefined" != typeof a.grouping.groupPriority && a.grouping.groupPriority >= 0 && b.push({
                        field: a.field,
                        col: a,
                        groupPriority: a.grouping.groupPriority,
                        grouping: a.grouping
                    }), a.treeAggregation && a.treeAggregation.type && c.push({
                        field: a.field,
                        col: a,
                        aggregation: a.treeAggregation
                    })
                }), b.sort(function (a, b) {
                    return a.groupPriority - b.groupPriority
                }), b.forEach(function (a, b) {
                    a.grouping.groupPriority = b, a.groupPriority = b, delete a.grouping
                }), {grouping: b, aggregations: c}
            }, insertGroupHeader: function (a, b, c, d, g) {
                var h = (d[g].fieldName, d[g].col), i = a.getCellValue(b[c], h), k = i;
                ("undefined" == typeof i || null === i) && (k = a.options.groupingNullLabel);
                for (var l = function (a) {
                    return angular.isObject(a) ? JSON.stringify(a) : a
                }, m = a.grouping.oldGroupingHeaderCache, n = 0; g > n; n++) m && m[l(d[n].currentValue)] && (m = m[l(d[n].currentValue)].children);
                var o;
                for (m && m[l(i)] ? (o = m[l(i)].row, o.entity = {}) : (o = new e({}, null, a), f.rowTemplateAssigner.call(a, o)), o.entity["$$" + d[g].col.uid] = {groupVal: k}, o.treeLevel = g, o.groupHeader = !0, o.internalRow = !0, o.enableCellEdit = !1, o.enableSelection = a.options.enableGroupHeaderSelection, d[g].initialised = !0, d[g].currentValue = i, d[g].currentRow = o, j.finaliseProcessingState(d, g + 1), b.splice(c, 0, o), m = a.grouping.groupingHeaderCache, n = 0; g > n; n++) m = m[l(d[n].currentValue)].children;
                m[l(i)] = {row: o, children: {}}
            }, finaliseProcessingState: function (a, b) {
                for (var c = b; c < a.length; c++) a[c].initialised = !1, a[c].currentRow = null, a[c].currentValue = null
            }, getRowExpandedStates: function (a) {
                if ("undefined" == typeof a) return {};
                var b = {};
                return angular.forEach(a, function (a, c) {
                    b[c] = {state: a.row.treeNode.state}, a.children ? b[c].children = j.getRowExpandedStates(a.children) : b[c].children = {}
                }), b
            }, applyRowExpandedStates: function (a, b) {
                "undefined" != typeof b && angular.forEach(b, function (b, c) {
                    a[c] && (a[c].row.treeNode.state = b.state, b.children && a[c].children && j.applyRowExpandedStates(a[c].children, b.children))
                })
            }
        };
        return j
    }]), a.directive("uiGridGrouping", ["uiGridGroupingConstants", "uiGridGroupingService", "$templateCache", function (a, b, c) {
        return {
            replace: !0, priority: 0, require: "^uiGrid", scope: !1, compile: function () {
                return {
                    pre: function (a, c, d, e) {
                        e.grid.options.enableGrouping !== !1 && b.initializeGrid(e.grid, a)
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.importer", ["ui.grid"]);
    a.constant("uiGridImporterConstants", {featureName: "importer"}), a.service("uiGridImporterService", ["$q", "uiGridConstants", "uiGridImporterConstants", "gridUtil", "$compile", "$interval", "i18nService", "$window", function (a, b, c, d, e, f, g, h) {
        var i = {
            initializeGrid: function (a, b) {
                b.importer = {$scope: a}, this.defaultGridOptions(b.options);
                var c = {
                    events: {importer: {}}, methods: {
                        importer: {
                            importFile: function (a) {
                                i.importThisFile(b, a)
                            }
                        }
                    }
                };
                b.api.registerEventsFromObject(c.events), b.api.registerMethodsFromObject(c.methods), b.options.enableImporter && b.options.importerShowMenu && (b.api.core.addToGridMenu ? i.addToMenu(b) : f(function () {
                    b.api.core.addToGridMenu && i.addToMenu(b)
                }, 100, 1))
            }, defaultGridOptions: function (a) {
                a.enableImporter || void 0 === a.enableImporter ? h.hasOwnProperty("File") && h.hasOwnProperty("FileReader") && h.hasOwnProperty("FileList") && h.hasOwnProperty("Blob") ? a.enableImporter = !0 : (d.logError("The File APIs are not fully supported in this browser, grid importer cannot be used."), a.enableImporter = !1) : a.enableImporter = !1, a.importerProcessHeaders = a.importerProcessHeaders || i.processHeaders, a.importerHeaderFilter = a.importerHeaderFilter || function (a) {
                    return a
                }, a.importerErrorCallback && "function" == typeof a.importerErrorCallback || delete a.importerErrorCallback, a.enableImporter !== !0 || a.importerDataAddCallback || (d.logError("You have not set an importerDataAddCallback, importer is disabled"), a.enableImporter = !1), a.importerShowMenu = a.importerShowMenu !== !1, a.importerObjectCallback = a.importerObjectCallback || function (a, b) {
                    return b
                }
            }, addToMenu: function (a) {
                a.api.core.addToGridMenu(a, [{
                    title: g.getSafeText("gridMenu.importerTitle"),
                    order: 150
                }, {
                    templateUrl: "ui-grid/importerMenuItemContainer", action: function (b) {
                        this.grid.api.importer.importAFile(a)
                    }, order: 151
                }])
            }, importThisFile: function (a, b) {
                if (!b) return void d.logError("No file object provided to importThisFile, should be impossible, aborting");
                var c = new FileReader;
                switch (b.type) {
                    case"application/json":
                        c.onload = i.importJsonClosure(a);
                        break;
                    default:
                        c.onload = i.importCsvClosure(a)
                }
                c.readAsText(b)
            }, importJsonClosure: function (a) {
                return function (b) {
                    var c, d = [], e = i.parseJson(a, b);
                    null !== e && (e.forEach(function (b, e) {
                        c = i.newObject(a), angular.extend(c, b), c = a.options.importerObjectCallback(a, c), d.push(c)
                    }), i.addObjects(a, d))
                }
            }, parseJson: function (a, b) {
                var c;
                try {
                    c = JSON.parse(b.target.result)
                } catch (d) {
                    return void i.alertError(a, "importer.invalidJson", "File could not be processed, is it valid json? Content was: ", b.target.result)
                }
                return Array.isArray(c) ? c : (i.alertError(a, "importer.jsonNotarray", "Import failed, file is not an array, file was: ", b.target.result), [])
            }, importCsvClosure: function (a) {
                return function (b) {
                    var c = i.parseCsv(b);
                    if (!c || c.length < 1) return void i.alertError(a, "importer.invalidCsv", "File could not be processed, is it valid csv? Content was: ", b.target.result);
                    var d = i.createCsvObjects(a, c);
                    return d && 0 !== d.length ? void i.addObjects(a, d) : void i.alertError(a, "importer.noObjects", "Objects were not able to be derived, content was: ", b.target.result)
                }
            }, parseCsv: function (a) {
                var b = a.target.result;
                return CSV.parse(b)
            }, createCsvObjects: function (a, b) {
                var c = a.options.importerProcessHeaders(a, b.shift());
                if (!c || 0 === c.length) return i.alertError(a, "importer.noHeaders", "Column names could not be derived, content was: ", b), [];
                var d, e = [];
                return b.forEach(function (b, f) {
                    d = i.newObject(a), null !== b && b.forEach(function (a, b) {
                        null !== c[b] && (d[c[b]] = a)
                    }), d = a.options.importerObjectCallback(a, d), e.push(d)
                }), e
            }, processHeaders: function (a, b) {
                var c = [];
                if (a.options.columnDefs && 0 !== a.options.columnDefs.length) {
                    var d = i.flattenColumnDefs(a, a.options.columnDefs);
                    return b.forEach(function (a, b) {
                        d[a] ? c.push(d[a]) : d[a.toLowerCase()] ? c.push(d[a.toLowerCase()]) : c.push(null)
                    }), c
                }
                return b.forEach(function (a, b) {
                    c.push(a.replace(/[^0-9a-zA-Z\-_]/g, "_"))
                }), c
            }, flattenColumnDefs: function (a, b) {
                var c = {};
                return b.forEach(function (b, d) {
                    b.name && (c[b.name] = b.field || b.name, c[b.name.toLowerCase()] = b.field || b.name), b.field && (c[b.field] = b.field || b.name, c[b.field.toLowerCase()] = b.field || b.name), b.displayName && (c[b.displayName] = b.field || b.name, c[b.displayName.toLowerCase()] = b.field || b.name), b.displayName && a.options.importerHeaderFilter && (c[a.options.importerHeaderFilter(b.displayName)] = b.field || b.name, c[a.options.importerHeaderFilter(b.displayName).toLowerCase()] = b.field || b.name)
                }), c
            }, addObjects: function (a, c, d) {
                if (a.api.rowEdit) {
                    var e = a.registerDataChangeCallback(function () {
                        a.api.rowEdit.setRowsDirty(c), e()
                    }, [b.dataChange.ROW]);
                    a.importer.$scope.$on("$destroy", e)
                }
                a.importer.$scope.$apply(a.options.importerDataAddCallback(a, c))
            }, newObject: function (a) {
                return "undefined" != typeof a.options && "undefined" != typeof a.options.importerNewObject ? new a.options.importerNewObject : {}
            }, alertError: function (a, b, c, e) {
                a.options.importerErrorCallback ? a.options.importerErrorCallback(a, b, c, e) : (h.alert(g.getSafeText(b)), d.logError(c + e))
            }
        };
        return i
    }]), a.directive("uiGridImporter", ["uiGridImporterConstants", "uiGridImporterService", "gridUtil", "$compile", function (a, b, c, d) {
        return {
            replace: !0, priority: 0, require: "^uiGrid", scope: !1, link: function (a, c, d, e) {
                b.initializeGrid(a, e.grid)
            }
        }
    }]), a.directive("uiGridImporterMenuItem", ["uiGridImporterConstants", "uiGridImporterService", "gridUtil", "$compile", function (a, b, c, d) {
        return {
            replace: !0,
            priority: 0,
            require: "^uiGrid",
            scope: !1,
            templateUrl: "ui-grid/importerMenuItem",
            link: function (a, d, e, f) {
                var g = function (a) {
                    var c = a.srcElement || a.target;
                    if (c && c.files && 1 === c.files.length) {
                        var d = c.files[0];
                        b.importThisFile(i, d), c.form.reset()
                    }
                }, h = d[0].querySelectorAll(".ui-grid-importer-file-chooser"), i = f.grid;
                1 !== h.length ? c.logError("Found > 1 or < 1 file choosers within the menu item, error, cannot continue") : h[0].addEventListener("change", g, !1);
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.infiniteScroll", ["ui.grid"]);
    a.service("uiGridInfiniteScrollService", ["gridUtil", "$compile", "$timeout", "uiGridConstants", "ScrollEvent", "$q", function (a, b, c, d, e, f) {
        var g = {
            initializeGrid: function (a, b) {
                if (g.defaultGridOptions(a.options), a.options.enableInfiniteScroll) {
                    a.infiniteScroll = {dataLoading: !1}, g.setScrollDirections(a, a.options.infiniteScrollUp, a.options.infiniteScrollDown), a.api.core.on.scrollEnd(b, g.handleScroll);
                    var c = {
                        events: {
                            infiniteScroll: {
                                needLoadMoreData: function (a, b) {
                                }, needLoadMoreDataTop: function (a, b) {
                                }
                            }
                        }, methods: {
                            infiniteScroll: {
                                dataLoaded: function (b, c) {
                                    g.setScrollDirections(a, b, c);
                                    var d = g.adjustScroll(a).then(function () {
                                        a.infiniteScroll.dataLoading = !1
                                    });
                                    return d
                                }, resetScroll: function (b, c) {
                                    g.setScrollDirections(a, b, c), g.adjustInfiniteScrollPosition(a, 0)
                                }, saveScrollPercentage: function () {
                                    a.infiniteScroll.prevScrollTop = a.renderContainers.body.prevScrollTop, a.infiniteScroll.previousVisibleRows = a.getVisibleRowCount()
                                }, dataRemovedTop: function (b, c) {
                                    g.dataRemovedTop(a, b, c)
                                }, dataRemovedBottom: function (b, c) {
                                    g.dataRemovedBottom(a, b, c)
                                }, setScrollDirections: function (b, c) {
                                    g.setScrollDirections(a, b, c)
                                }
                            }
                        }
                    };
                    a.api.registerEventsFromObject(c.events), a.api.registerMethodsFromObject(c.methods)
                }
            }, defaultGridOptions: function (a) {
                a.enableInfiniteScroll = a.enableInfiniteScroll !== !1, a.infiniteScrollRowsFromEnd = a.infiniteScrollRowsFromEnd || 20, a.infiniteScrollUp = a.infiniteScrollUp === !0, a.infiniteScrollDown = a.infiniteScrollDown !== !1
            }, setScrollDirections: function (a, b, c) {
                a.infiniteScroll.scrollUp = b === !0, a.suppressParentScrollUp = b === !0, a.infiniteScroll.scrollDown = c !== !1, a.suppressParentScrollDown = c !== !1
            }, handleScroll: function (a) {
                if (!(a.grid.infiniteScroll && a.grid.infiniteScroll.dataLoading || "ui.grid.adjustInfiniteScrollPosition" === a.source) && a.y) if (0 === a.y.percentage) a.grid.scrollDirection = d.scrollDirection.UP, g.loadData(a.grid); else if (1 === a.y.percentage) a.grid.scrollDirection = d.scrollDirection.DOWN, g.loadData(a.grid); else {
                    var b,
                        c = a.grid.options.infiniteScrollRowsFromEnd / a.grid.renderContainers.body.visibleRowCache.length;
                    a.grid.scrollDirection === d.scrollDirection.UP ? (b = a.y.percentage, c >= b && g.loadData(a.grid)) : a.grid.scrollDirection === d.scrollDirection.DOWN && (b = 1 - a.y.percentage, c >= b && g.loadData(a.grid))
                }
            }, loadData: function (a) {
                a.infiniteScroll.previousVisibleRows = a.renderContainers.body.visibleRowCache.length, a.infiniteScroll.direction = a.scrollDirection, delete a.infiniteScroll.prevScrollTop, a.scrollDirection === d.scrollDirection.UP && a.infiniteScroll.scrollUp ? (a.infiniteScroll.dataLoading = !0, a.api.infiniteScroll.raise.needLoadMoreDataTop()) : a.scrollDirection === d.scrollDirection.DOWN && a.infiniteScroll.scrollDown && (a.infiniteScroll.dataLoading = !0, a.api.infiniteScroll.raise.needLoadMoreData())
            }, adjustScroll: function (a) {
                var b = f.defer();
                return c(function () {
                    var e, f, h, i, j;
                    e = a.getViewportHeight() + a.headerHeight - a.renderContainers.body.headerHeight - a.scrollbarHeight, f = a.options.rowHeight, void 0 === a.infiniteScroll.direction && g.adjustInfiniteScrollPosition(a, 0), h = a.getVisibleRowCount();
                    var k = f * h;
                    a.infiniteScroll.scrollDown && e > k && a.api.infiniteScroll.raise.needLoadMoreData(), a.infiniteScroll.direction === d.scrollDirection.UP && (i = a.infiniteScroll.prevScrollTop || 0, j = i + (h - a.infiniteScroll.previousVisibleRows) * f, g.adjustInfiniteScrollPosition(a, j), c(function () {
                        b.resolve()
                    })), a.infiniteScroll.direction === d.scrollDirection.DOWN && (j = a.infiniteScroll.prevScrollTop || a.infiniteScroll.previousVisibleRows * f - e, g.adjustInfiniteScrollPosition(a, j), c(function () {
                        b.resolve()
                    }))
                }, 0), b.promise
            }, adjustInfiniteScrollPosition: function (a, b) {
                var c = new e(a, null, null, "ui.grid.adjustInfiniteScrollPosition"), d = a.getVisibleRowCount(),
                    f = a.getViewportHeight() + a.headerHeight - a.renderContainers.body.headerHeight - a.scrollbarHeight,
                    g = a.options.rowHeight, h = d * g - f;
                0 === b && a.infiniteScroll.scrollUp ? c.y = {percentage: 1 / h} : c.y = {percentage: b / h}, a.scrollContainers("", c)
            }, dataRemovedTop: function (a, b, c) {
                var d, e, f, h;
                g.setScrollDirections(a, b, c), d = a.renderContainers.body.visibleRowCache.length, e = a.infiniteScroll.prevScrollTop, h = a.options.rowHeight, f = e - (a.infiniteScroll.previousVisibleRows - d) * h, g.adjustInfiniteScrollPosition(a, f)
            }, dataRemovedBottom: function (a, b, c) {
                var d;
                g.setScrollDirections(a, b, c), d = a.infiniteScroll.prevScrollTop, g.adjustInfiniteScrollPosition(a, d)
            }
        };
        return g
    }]), a.directive("uiGridInfiniteScroll", ["uiGridInfiniteScrollService", function (a) {
        return {
            priority: -200, scope: !1, require: "^uiGrid", compile: function (b, c, d) {
                return {
                    pre: function (b, c, d, e) {
                        a.initializeGrid(e.grid, b)
                    }, post: function (a, b, c) {
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.moveColumns", ["ui.grid"]);
    a.service("uiGridMoveColumnService", ["$q", "$timeout", "$log", "ScrollEvent", "uiGridConstants", "gridUtil", function (a, b, c, d, e, f) {
        var g = {
            initializeGrid: function (a) {
                var b = this;
                this.registerPublicApi(a), this.defaultGridOptions(a.options), a.moveColumns = {orderCache: []}, a.registerColumnBuilder(b.movableColumnBuilder), a.registerDataChangeCallback(b.verifyColumnOrder, [e.dataChange.COLUMN])
            }, registerPublicApi: function (a) {
                var b = this, c = {
                    events: {
                        colMovable: {
                            columnPositionChanged: function (a, b, c) {
                            }
                        }
                    }, methods: {
                        colMovable: {
                            moveColumn: function (c, d) {
                                var e = a.columns;
                                if (!angular.isNumber(c) || !angular.isNumber(d)) return void f.logError("MoveColumn: Please provide valid values for originalPosition and finalPosition");
                                for (var g = 0, h = 0; h < e.length; h++) (angular.isDefined(e[h].colDef.visible) && e[h].colDef.visible === !1 || e[h].isRowHeader === !0) && g++;
                                if (c >= e.length - g || d >= e.length - g) return void f.logError("MoveColumn: Invalid values for originalPosition, finalPosition");
                                var i = function (a) {
                                    for (var b = a, c = 0; b >= c; c++) angular.isDefined(e[c]) && (angular.isDefined(e[c].colDef.visible) && e[c].colDef.visible === !1 || e[c].isRowHeader === !0) && b++;
                                    return b
                                };
                                b.redrawColumnAtPosition(a, i(c), i(d))
                            }
                        }
                    }
                };
                a.api.registerEventsFromObject(c.events), a.api.registerMethodsFromObject(c.methods)
            }, defaultGridOptions: function (a) {
                a.enableColumnMoving = a.enableColumnMoving !== !1
            }, movableColumnBuilder: function (b, c, d) {
                var e = [];
                return b.enableColumnMoving = void 0 === b.enableColumnMoving ? d.enableColumnMoving : b.enableColumnMoving, a.all(e)
            }, updateColumnCache: function (a) {
                a.moveColumns.orderCache = a.getOnlyDataColumns()
            }, verifyColumnOrder: function (a) {
                var b, c = a.rowHeaderColumns.length;
                angular.forEach(a.moveColumns.orderCache, function (d, e) {
                    if (b = a.columns.indexOf(d), -1 !== b && b - c !== e) {
                        var f = a.columns.splice(b, 1)[0];
                        a.columns.splice(e + c, 0, f)
                    }
                })
            }, redrawColumnAtPosition: function (a, c, d) {
                var f = a.columns;
                if (c !== d) {
                    var h = d > c ? c + 1 : c - 1, i = Math.min(h, d);
                    for (i; i <= Math.max(h, d) && !f[i].visible; i++) ;
                    if (!(i > Math.max(h, d))) {
                        var j = f[c];
                        if (j.colDef.enableColumnMoving) {
                            if (c > d) for (var k = c; k > d; k--) f[k] = f[k - 1]; else if (d > c) for (var l = c; d > l; l++) f[l] = f[l + 1];
                            f[d] = j, g.updateColumnCache(a), a.queueGridRefresh(), b(function () {
                                a.api.core.notifyDataChange(e.dataChange.COLUMN), a.api.colMovable.raise.columnPositionChanged(j.colDef, c, d)
                            })
                        }
                    }
                }
            }
        };
        return g
    }]), a.directive("uiGridMoveColumns", ["uiGridMoveColumnService", function (a) {
        return {
            replace: !0, priority: 0, require: "^uiGrid", scope: !1, compile: function () {
                return {
                    pre: function (b, c, d, e) {
                        a.initializeGrid(e.grid)
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }]), a.directive("uiGridHeaderCell", ["$q", "gridUtil", "uiGridMoveColumnService", "$document", "$log", "uiGridConstants", "ScrollEvent", function (a, b, c, d, e, f, g) {
        return {
            priority: -10, require: "^uiGrid", compile: function () {
                return {
                    post: function (a, b, e, f) {
                        if (a.col.colDef.enableColumnMoving) {
                            var h, i, j, k, l, m, n = angular.element(b[0].querySelectorAll(".ui-grid-cell-contents")),
                                o = !1, p = !1, q = function (b) {
                                    h = a.grid.element[0].getBoundingClientRect().left, a.grid.hasLeftContainer() && (h += a.grid.renderContainers.left.header[0].getBoundingClientRect().width), i = b.pageX || (b.originalEvent ? b.originalEvent.pageX : 0), j = 0, k = h + a.grid.getViewportWidth(), "mousedown" === b.type ? (d.on("mousemove", r), d.on("mouseup", s)) : "touchstart" === b.type && (d.on("touchmove", r), d.on("touchend", s))
                                }, r = function (a) {
                                    var b = a.pageX || (a.originalEvent ? a.originalEvent.pageX : 0), c = b - i;
                                    0 !== c && (document.onselectstart = function () {
                                        return !1
                                    }, p = !0, o ? o && (w(c), i = b) : v())
                                }, s = function (b) {
                                    if (document.onselectstart = null, l && (l.remove(), o = !1), u(), t(), p) {
                                        for (var d = a.grid.columns, e = 0, f = 0; f < d.length && d[f].colDef.name !== a.col.colDef.name; f++) e++;
                                        var g;
                                        if (0 > j) {
                                            var h, i = 0;
                                            if (a.grid.isRTL()) {
                                                for (h = e + 1; h < d.length; h++) if ((angular.isUndefined(d[h].colDef.visible) || d[h].colDef.visible === !0) && (i += d[h].drawnWidth || d[h].width || d[h].colDef.width, i > Math.abs(j))) {
                                                    c.redrawColumnAtPosition(a.grid, e, h - 1);
                                                    break
                                                }
                                            } else for (h = e - 1; h >= 0; h--) if ((angular.isUndefined(d[h].colDef.visible) || d[h].colDef.visible === !0) && (i += d[h].drawnWidth || d[h].width || d[h].colDef.width, i > Math.abs(j))) {
                                                c.redrawColumnAtPosition(a.grid, e, h + 1);
                                                break
                                            }
                                            i < Math.abs(j) && (g = 0, a.grid.isRTL() && (g = d.length - 1), c.redrawColumnAtPosition(a.grid, e, g))
                                        } else if (j > 0) {
                                            var k, m = 0;
                                            if (a.grid.isRTL()) {
                                                for (k = e - 1; k > 0; k--) if ((angular.isUndefined(d[k].colDef.visible) || d[k].colDef.visible === !0) && (m += d[k].drawnWidth || d[k].width || d[k].colDef.width, m > j)) {
                                                    c.redrawColumnAtPosition(a.grid, e, k);
                                                    break
                                                }
                                            } else for (k = e + 1; k < d.length; k++) if ((angular.isUndefined(d[k].colDef.visible) || d[k].colDef.visible === !0) && (m += d[k].drawnWidth || d[k].width || d[k].colDef.width, m > j)) {
                                                c.redrawColumnAtPosition(a.grid, e, k - 1);
                                                break
                                            }
                                            j > m && (g = d.length - 1, a.grid.isRTL() && (g = 0), c.redrawColumnAtPosition(a.grid, e, g))
                                        }
                                    }
                                }, t = function () {
                                    n.on("touchstart", q), n.on("mousedown", q)
                                }, u = function () {
                                    n.off("touchstart", q), n.off("mousedown", q), d.off("mousemove", r), d.off("touchmove", r), d.off("mouseup", s), d.off("touchend", s)
                                };
                            t();
                            var v = function () {
                                o = !0, l = b.clone(), b.parent().append(l), l.addClass("movingColumn");
                                var c = {};
                                c.left = b[0].offsetLeft + "px";
                                var d = a.grid.element[0].getBoundingClientRect().right,
                                    e = b[0].getBoundingClientRect().right;
                                e > d && (m = a.col.drawnWidth + (d - e), c.width = m + "px"), l.css(c)
                            }, w = function (b) {
                                for (var c = a.grid.columns, d = 0, e = 0; e < c.length; e++) (angular.isUndefined(c[e].colDef.visible) || c[e].colDef.visible === !0) && (d += c[e].drawnWidth || c[e].width || c[e].colDef.width);
                                var i, n = l[0].getBoundingClientRect().left - 1,
                                    o = l[0].getBoundingClientRect().right;
                                if (i = n - h + b, i = k > i ? i : k, (n >= h || b > 0) && (k >= o || 0 > b)) l.css({
                                    visibility: "visible",
                                    left: l[0].offsetLeft + (k > i ? b : k - n) + "px"
                                }); else if (d > Math.ceil(f.grid.gridWidth)) {
                                    b *= 8;
                                    var p = new g(a.col.grid, null, null, "uiGridHeaderCell.moveElement");
                                    p.x = {pixels: b}, p.grid.scrollContainers("", p)
                                }
                                for (var q = 0, r = 0; r < c.length; r++) if (angular.isUndefined(c[r].colDef.visible) || c[r].colDef.visible === !0) {
                                    if (c[r].colDef.name === a.col.colDef.name) break;
                                    q += c[r].drawnWidth || c[r].width || c[r].colDef.width
                                }
                                void 0 === a.newScrollLeft ? j += b : j = a.newScrollLeft + i - q, m < a.col.drawnWidth && (m += Math.abs(b), l.css({width: m + "px"}))
                            }
                        }
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.pagination", ["ng", "ui.grid"]);
    a.service("uiGridPaginationService", ["gridUtil", function (a) {
        var b = {
            initializeGrid: function (a) {
                b.defaultGridOptions(a.options);
                var c = {
                    events: {
                        pagination: {
                            paginationChanged: function (a, b) {
                            }
                        }
                    }, methods: {
                        pagination: {
                            getPage: function () {
                                return a.options.enablePagination ? a.options.paginationCurrentPage : null
                            }, getFirstRowIndex: function () {
                                return a.options.useCustomPagination ? a.options.paginationPageSizes.reduce(function (b, c, d) {
                                    return d < a.options.paginationCurrentPage - 1 ? b + c : b
                                }, 0) : (a.options.paginationCurrentPage - 1) * a.options.paginationPageSize
                            }, getLastRowIndex: function () {
                                return a.options.useCustomPagination ? c.methods.pagination.getFirstRowIndex() + a.options.paginationPageSizes[a.options.paginationCurrentPage - 1] : Math.min(a.options.paginationCurrentPage * a.options.paginationPageSize, a.options.totalItems)
                            }, getTotalPages: function () {
                                return a.options.enablePagination ? a.options.useCustomPagination ? a.options.paginationPageSizes.length : 0 === a.options.totalItems ? 1 : Math.ceil(a.options.totalItems / a.options.paginationPageSize) : null
                            }, nextPage: function () {
                                a.options.enablePagination && (a.options.totalItems > 0 ? a.options.paginationCurrentPage = Math.min(a.options.paginationCurrentPage + 1, c.methods.pagination.getTotalPages()) : a.options.paginationCurrentPage++)
                            }, previousPage: function () {
                                a.options.enablePagination && (a.options.paginationCurrentPage = Math.max(a.options.paginationCurrentPage - 1, 1))
                            }, seek: function (b) {
                                if (a.options.enablePagination) {
                                    if (!angular.isNumber(b) || 1 > b) throw"Invalid page number: " + b;
                                    a.options.paginationCurrentPage = Math.min(b, c.methods.pagination.getTotalPages())
                                }
                            }
                        }
                    }
                };
                a.api.registerEventsFromObject(c.events), a.api.registerMethodsFromObject(c.methods);
                var d = function (b) {
                    if (a.options.useExternalPagination || !a.options.enablePagination) return b;
                    var d = parseInt(a.options.paginationPageSize, 10),
                        e = parseInt(a.options.paginationCurrentPage, 10), f = b.filter(function (a) {
                            return a.visible
                        });
                    a.options.totalItems = f.length;
                    var g = c.methods.pagination.getFirstRowIndex(), h = c.methods.pagination.getLastRowIndex();
                    return g > f.length && (e = a.options.paginationCurrentPage = 1, g = (e - 1) * d), f.slice(g, h)
                };
                a.registerRowsProcessor(d, 900)
            }, defaultGridOptions: function (b) {
                b.enablePagination = b.enablePagination !== !1, b.enablePaginationControls = b.enablePaginationControls !== !1, b.useExternalPagination = b.useExternalPagination === !0, b.useCustomPagination = b.useCustomPagination === !0, a.isNullOrUndefined(b.totalItems) && (b.totalItems = 0), a.isNullOrUndefined(b.paginationPageSizes) && (b.paginationPageSizes = [250, 500, 1e3]), a.isNullOrUndefined(b.paginationPageSize) && (b.paginationPageSizes.length > 0 ? b.paginationPageSize = b.paginationPageSizes[0] : b.paginationPageSize = 0), a.isNullOrUndefined(b.paginationCurrentPage) && (b.paginationCurrentPage = 1), a.isNullOrUndefined(b.paginationTemplate) && (b.paginationTemplate = "ui-grid/pagination")
            }, onPaginationChanged: function (a, b, c) {
                a.api.pagination.raise.paginationChanged(b, c), a.options.useExternalPagination || a.queueGridRefresh()
            }
        };
        return b
    }]), a.directive("uiGridPagination", ["gridUtil", "uiGridPaginationService", function (a, b) {
        return {
            priority: -200, scope: !1, require: "uiGrid", link: {
                pre: function (c, d, e, f) {
                    b.initializeGrid(f.grid), a.getTemplate(f.grid.options.paginationTemplate).then(function (a) {
                        var b = angular.element(a);
                        d.append(b), f.innerCompile(b)
                    })
                }
            }
        }
    }]), a.directive("uiGridPager", ["uiGridPaginationService", "uiGridConstants", "gridUtil", "i18nService", function (a, b, c, d) {
        return {
            priority: -200, scope: !0, require: "^uiGrid", link: function (e, f, g, h) {
                var i = ".ui-grid-pager-control-input";
                e.aria = d.getSafeText("pagination.aria"), e.paginationApi = h.grid.api.pagination, e.sizesLabel = d.getSafeText("pagination.sizes"), e.totalItemsLabel = d.getSafeText("pagination.totalItems"), e.paginationOf = d.getSafeText("pagination.of"), e.paginationThrough = d.getSafeText("pagination.through");
                var j = h.grid.options;
                h.grid.renderContainers.body.registerViewportAdjuster(function (a) {
                    return a.height = a.height - c.elementHeight(f, "padding"), a
                });
                var k = h.grid.registerDataChangeCallback(function (a) {
                    a.options.useExternalPagination || (a.options.totalItems = a.rows.length)
                }, [b.dataChange.ROW]);
                e.$on("$destroy", k);
                var l = e.$watch("grid.options.paginationCurrentPage + grid.options.paginationPageSize", function (b, c) {
                    return b !== c && void 0 !== c ? !angular.isNumber(j.paginationCurrentPage) || j.paginationCurrentPage < 1 ? void(j.paginationCurrentPage = 1) : j.totalItems > 0 && j.paginationCurrentPage > e.paginationApi.getTotalPages() ? void(j.paginationCurrentPage = e.paginationApi.getTotalPages()) : void a.onPaginationChanged(e.grid, j.paginationCurrentPage, j.paginationPageSize) : void 0
                });
                e.$on("$destroy", function () {
                    l()
                }), e.cantPageForward = function () {
                    return e.paginationApi.getTotalPages() ? e.cantPageToLast() : j.data.length < 1
                }, e.cantPageToLast = function () {
                    var a = e.paginationApi.getTotalPages();
                    return !a || j.paginationCurrentPage >= a
                }, e.cantPageBackward = function () {
                    return j.paginationCurrentPage <= 1
                };
                var m = function (a) {
                    a && c.focus.bySelector(f, i)
                };
                e.pageFirstPageClick = function () {
                    e.paginationApi.seek(1), m(e.cantPageBackward())
                }, e.pagePreviousPageClick = function () {
                    e.paginationApi.previousPage(), m(e.cantPageBackward())
                }, e.pageNextPageClick = function () {
                    e.paginationApi.nextPage(), m(e.cantPageForward())
                }, e.pageLastPageClick = function () {
                    e.paginationApi.seek(e.paginationApi.getTotalPages()), m(e.cantPageToLast())
                }
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.pinning", ["ui.grid"]);
    a.constant("uiGridPinningConstants", {
        container: {
            LEFT: "left",
            RIGHT: "right",
            NONE: ""
        }
    }), a.service("uiGridPinningService", ["gridUtil", "GridRenderContainer", "i18nService", "uiGridPinningConstants", function (a, b, c, d) {
        var e = {
            initializeGrid: function (a) {
                e.defaultGridOptions(a.options), a.registerColumnBuilder(e.pinningColumnBuilder);
                var b = {
                    events: {
                        pinning: {
                            columnPinned: function (a, b) {
                            }
                        }
                    }, methods: {
                        pinning: {
                            pinColumn: function (b, c) {
                                e.pinColumn(a, b, c)
                            }
                        }
                    }
                };
                a.api.registerEventsFromObject(b.events), a.api.registerMethodsFromObject(b.methods)
            }, defaultGridOptions: function (a) {
                a.enablePinning = a.enablePinning !== !1
            }, pinningColumnBuilder: function (b, f, g) {
                if (b.enablePinning = void 0 === b.enablePinning ? g.enablePinning : b.enablePinning, b.pinnedLeft ? (f.renderContainer = "left", f.grid.createLeftContainer()) : b.pinnedRight && (f.renderContainer = "right", f.grid.createRightContainer()), b.enablePinning) {
                    var h = {
                        name: "ui.grid.pinning.pinLeft",
                        title: c.get().pinning.pinLeft,
                        icon: "ui-grid-icon-left-open",
                        shown: function () {
                            return "undefined" == typeof this.context.col.renderContainer || !this.context.col.renderContainer || "left" !== this.context.col.renderContainer
                        },
                        action: function () {
                            e.pinColumn(this.context.col.grid, this.context.col, d.container.LEFT)
                        }
                    }, i = {
                        name: "ui.grid.pinning.pinRight",
                        title: c.get().pinning.pinRight,
                        icon: "ui-grid-icon-right-open",
                        shown: function () {
                            return "undefined" == typeof this.context.col.renderContainer || !this.context.col.renderContainer || "right" !== this.context.col.renderContainer
                        },
                        action: function () {
                            e.pinColumn(this.context.col.grid, this.context.col, d.container.RIGHT)
                        }
                    }, j = {
                        name: "ui.grid.pinning.unpin",
                        title: c.get().pinning.unpin,
                        icon: "ui-grid-icon-cancel",
                        shown: function () {
                            return "undefined" != typeof this.context.col.renderContainer && null !== this.context.col.renderContainer && "body" !== this.context.col.renderContainer
                        },
                        action: function () {
                            e.pinColumn(this.context.col.grid, this.context.col, d.container.NONE)
                        }
                    };
                    a.arrayContainsObjectWithProperty(f.menuItems, "name", "ui.grid.pinning.pinLeft") || f.menuItems.push(h), a.arrayContainsObjectWithProperty(f.menuItems, "name", "ui.grid.pinning.pinRight") || f.menuItems.push(i), a.arrayContainsObjectWithProperty(f.menuItems, "name", "ui.grid.pinning.unpin") || f.menuItems.push(j)
                }
            }, pinColumn: function (a, b, c) {
                c === d.container.NONE ? (b.renderContainer = null, b.colDef.pinnedLeft = b.colDef.pinnedRight = !1) : (b.renderContainer = c, c === d.container.LEFT ? a.createLeftContainer() : c === d.container.RIGHT && a.createRightContainer()), a.refresh().then(function () {
                    a.api.pinning.raise.columnPinned(b.colDef, c)
                })
            }
        };
        return e
    }]), a.directive("uiGridPinning", ["gridUtil", "uiGridPinningService", function (a, b) {
        return {
            require: "uiGrid", scope: !1, compile: function () {
                return {
                    pre: function (a, c, d, e) {
                        b.initializeGrid(e.grid)
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.resizeColumns", ["ui.grid"]);
    a.service("uiGridResizeColumnsService", ["gridUtil", "$q", "$timeout", function (a, b, c) {
        var d = {
            defaultGridOptions: function (a) {
                a.enableColumnResizing = a.enableColumnResizing !== !1, a.enableColumnResize === !1 && (a.enableColumnResizing = !1)
            }, colResizerColumnBuilder: function (a, c, d) {
                var e = [];
                return a.enableColumnResizing = void 0 === a.enableColumnResizing ? d.enableColumnResizing : a.enableColumnResizing, a.enableColumnResize === !1 && (a.enableColumnResizing = !1), b.all(e)
            }, registerPublicApi: function (a) {
                var b = {
                    events: {
                        colResizable: {
                            columnSizeChanged: function (a, b) {
                            }
                        }
                    }
                };
                a.api.registerEventsFromObject(b.events)
            }, fireColumnSizeChanged: function (b, d, e) {
                c(function () {
                    b.api.colResizable ? b.api.colResizable.raise.columnSizeChanged(d, e) : a.logError("The resizeable api is not registered, this may indicate that you've included the module but not added the 'ui-grid-resize-columns' directive to your grid definition.  Cannot raise any events.")
                })
            }, findTargetCol: function (a, b, c) {
                var d = a.getRenderContainer();
                if ("left" === b) {
                    var e = d.visibleColumnCache.indexOf(a);
                    return d.visibleColumnCache[e - 1 * c]
                }
                return a
            }
        };
        return d
    }]), a.directive("uiGridResizeColumns", ["gridUtil", "uiGridResizeColumnsService", function (a, b) {
        return {
            replace: !0, priority: 0, require: "^uiGrid", scope: !1, compile: function () {
                return {
                    pre: function (a, c, d, e) {
                        b.defaultGridOptions(e.grid.options), e.grid.registerColumnBuilder(b.colResizerColumnBuilder), b.registerPublicApi(e.grid)
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }]), a.directive("uiGridHeaderCell", ["gridUtil", "$templateCache", "$compile", "$q", "uiGridResizeColumnsService", "uiGridConstants", "$timeout", function (a, b, c, d, e, f, g) {
        return {
            priority: -10, require: "^uiGrid", compile: function () {
                return {
                    post: function (a, d, h, i) {
                        var j = i.grid;
                        if (j.options.enableColumnResizing) {
                            var k = b.get("ui-grid/columnResizer"), l = 1;
                            j.isRTL() && (a.position = "left", l = -1);
                            var m = function () {
                                for (var b = d[0].getElementsByClassName("ui-grid-column-resizer"), f = 0; f < b.length; f++) angular.element(b[f]).remove();
                                var g = e.findTargetCol(a.col, "left", l), h = a.col.getRenderContainer();
                                if (g && 0 !== h.visibleColumnCache.indexOf(a.col) && g.colDef.enableColumnResizing !== !1) {
                                    var i = angular.element(k).clone();
                                    i.attr("position", "left"), d.prepend(i), c(i)(a)
                                }
                                if (a.col.colDef.enableColumnResizing !== !1) {
                                    var j = angular.element(k).clone();
                                    j.attr("position", "right"), d.append(j), c(j)(a)
                                }
                            };
                            m();
                            var n = function () {
                                g(m)
                            }, o = j.registerDataChangeCallback(n, [f.dataChange.COLUMN]);
                            a.$on("$destroy", o)
                        }
                    }
                }
            }
        }
    }]), a.directive("uiGridColumnResizer", ["$document", "gridUtil", "uiGridConstants", "uiGridResizeColumnsService", function (a, b, c, d) {
        var e = angular.element('<div class="ui-grid-resize-overlay"></div>'), f = {
            priority: 0,
            scope: {col: "=", position: "@", renderIndex: "="},
            require: "?^uiGrid",
            link: function (f, g, h, i) {
                function j(a) {
                    i.grid.refreshCanvas(!0).then(function () {
                        i.grid.queueGridRefresh()
                    })
                }

                function k(a, b) {
                    var c = b;
                    return a.minWidth && c < a.minWidth ? c = a.minWidth : a.maxWidth && c > a.maxWidth && (c = a.maxWidth), c
                }

                function l(a, b) {
                    a.originalEvent && (a = a.originalEvent), a.preventDefault(), o = (a.targetTouches ? a.targetTouches[0] : a).clientX - p, 0 > o ? o = 0 : o > i.grid.gridWidth && (o = i.grid.gridWidth);
                    var g = d.findTargetCol(f.col, f.position, q);
                    if (g.colDef.enableColumnResizing !== !1) {
                        i.grid.element.hasClass("column-resizing") || i.grid.element.addClass("column-resizing");
                        var h = o - n, j = parseInt(g.drawnWidth + h * q, 10);
                        o += (k(g, j) - j) * q, e.css({left: o + "px"}), i.fireEvent(c.events.ITEM_DRAGGING)
                    }
                }

                function m(a, b) {
                    a.originalEvent && (a = a.originalEvent), a.preventDefault(), i.grid.element.removeClass("column-resizing"), e.remove(), o = (a.changedTouches ? a.changedTouches[0] : a).clientX - p;
                    var c = o - n;
                    if (0 === c) return t(), void s();
                    var g = d.findTargetCol(f.col, f.position, q);
                    if (g.colDef.enableColumnResizing !== !1) {
                        var h = parseInt(g.drawnWidth + c * q, 10);
                        g.width = k(g, h), g.hasCustomWidth = !0, j(c), d.fireColumnSizeChanged(i.grid, g.colDef, c), t(), s()
                    }
                }

                var n = 0, o = 0, p = 0, q = 1;
                i.grid.isRTL() && (f.position = "left", q = -1), "left" === f.position ? g.addClass("left") : "right" === f.position && g.addClass("right");
                var r = function (b, c) {
                    b.originalEvent && (b = b.originalEvent), b.stopPropagation(), p = i.grid.element[0].getBoundingClientRect().left, n = (b.targetTouches ? b.targetTouches[0] : b).clientX - p, i.grid.element.append(e), e.css({left: n}), "touchstart" === b.type ? (a.on("touchend", m), a.on("touchmove", l), g.off("mousedown", r)) : (a.on("mouseup", m), a.on("mousemove", l), g.off("touchstart", r))
                }, s = function () {
                    g.on("mousedown", r), g.on("touchstart", r)
                }, t = function () {
                    a.off("mouseup", m), a.off("touchend", m), a.off("mousemove", l), a.off("touchmove", l), g.off("mousedown", r), g.off("touchstart", r)
                };
                s();
                var u = function (a, e) {
                    a.stopPropagation();
                    var h = d.findTargetCol(f.col, f.position, q);
                    if (h.colDef.enableColumnResizing !== !1) {
                        var l = 0, m = 0, n = b.closestElm(g, ".ui-grid-render-container"),
                            o = n.querySelectorAll("." + c.COL_CLASS_PREFIX + h.uid + " .ui-grid-cell-contents");
                        Array.prototype.forEach.call(o, function (a) {
                            var c;
                            angular.element(a).parent().hasClass("ui-grid-header-cell") && (c = angular.element(a).parent()[0].querySelectorAll(".ui-grid-column-menu-button")), b.fakeElement(a, {}, function (a) {
                                var d = angular.element(a);
                                d.attr("style", "float: left");
                                var e = b.elementWidth(d);
                                if (c) {
                                    var f = b.elementWidth(c);
                                    e += f
                                }
                                e > l && (l = e, m = l - e)
                            })
                        }), h.width = k(h, l), h.hasCustomWidth = !0, j(m), d.fireColumnSizeChanged(i.grid, h.colDef, m)
                    }
                };
                g.on("dblclick", u), g.on("$destroy", function () {
                    g.off("dblclick", u), t()
                })
            }
        };
        return f
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.rowEdit", ["ui.grid", "ui.grid.edit", "ui.grid.cellNav"]);
    a.constant("uiGridRowEditConstants", {}), a.service("uiGridRowEditService", ["$interval", "$q", "uiGridConstants", "uiGridRowEditConstants", "gridUtil", function (a, b, c, d, e) {
        var f = {
            initializeGrid: function (a, b) {
                b.rowEdit = {};
                var c = {
                    events: {
                        rowEdit: {
                            saveRow: function (a) {
                            }
                        }
                    }, methods: {
                        rowEdit: {
                            setSavePromise: function (a, c) {
                                f.setSavePromise(b, a, c)
                            }, getDirtyRows: function () {
                                return b.rowEdit.dirtyRows ? b.rowEdit.dirtyRows : []
                            }, getErrorRows: function () {
                                return b.rowEdit.errorRows ? b.rowEdit.errorRows : []
                            }, flushDirtyRows: function () {
                                return f.flushDirtyRows(b)
                            }, setRowsDirty: function (a) {
                                f.setRowsDirty(b, a)
                            }, setRowsClean: function (a) {
                                f.setRowsClean(b, a)
                            }
                        }
                    }
                };
                b.api.registerEventsFromObject(c.events), b.api.registerMethodsFromObject(c.methods), b.api.core.on.renderingComplete(a, function (c) {
                    b.api.edit.on.afterCellEdit(a, f.endEditCell), b.api.edit.on.beginCellEdit(a, f.beginEditCell), b.api.edit.on.cancelCellEdit(a, f.cancelEditCell), b.api.cellNav && b.api.cellNav.on.navigate(a, f.navigate)
                })
            }, defaultGridOptions: function (a) {
            }, saveRow: function (a, b) {
                var c = this;
                return function () {
                    if (b.isSaving = !0, b.rowEditSavePromise) return b.rowEditSavePromise;
                    var d = a.api.rowEdit.raise.saveRow(b.entity);
                    return b.rowEditSavePromise ? b.rowEditSavePromise.then(c.processSuccessPromise(a, b), c.processErrorPromise(a, b)) : e.logError("A promise was not returned when saveRow event was raised, either nobody is listening to event, or event handler did not return a promise"), d
                }
            }, setSavePromise: function (a, b, c) {
                var d = a.getRow(b);
                d.rowEditSavePromise = c
            }, processSuccessPromise: function (a, b) {
                var c = this;
                return function () {
                    delete b.isSaving, delete b.isDirty, delete b.isError, delete b.rowEditSaveTimer, delete b.rowEditSavePromise, c.removeRow(a.rowEdit.errorRows, b), c.removeRow(a.rowEdit.dirtyRows, b)
                }
            }, processErrorPromise: function (a, b) {
                return function () {
                    delete b.isSaving, delete b.rowEditSaveTimer, delete b.rowEditSavePromise, b.isError = !0, a.rowEdit.errorRows || (a.rowEdit.errorRows = []), f.isRowPresent(a.rowEdit.errorRows, b) || a.rowEdit.errorRows.push(b)
                }
            }, removeRow: function (a, b) {
                "undefined" != typeof a && null !== a && a.forEach(function (c, d) {
                    c.uid === b.uid && a.splice(d, 1)
                })
            }, isRowPresent: function (a, b) {
                var c = !1;
                return a.forEach(function (a, d) {
                    a.uid === b.uid && (c = !0)
                }), c
            }, flushDirtyRows: function (a) {
                var c = [];
                return a.api.rowEdit.getDirtyRows().forEach(function (b) {
                    f.saveRow(a, b)(), c.push(b.rowEditSavePromise)
                }), b.all(c)
            }, endEditCell: function (a, b, c, d) {
                var g = this.grid, h = g.getRow(a);
                return h ? void((c !== d || h.isDirty) && (g.rowEdit.dirtyRows || (g.rowEdit.dirtyRows = []), h.isDirty || (h.isDirty = !0, g.rowEdit.dirtyRows.push(h)), delete h.isError, f.considerSetTimer(g, h))) : void e.logError("Unable to find rowEntity in grid data, dirty flag cannot be set")
            }, beginEditCell: function (a, b) {
                var c = this.grid, d = c.getRow(a);
                return d ? void f.cancelTimer(c, d) : void e.logError("Unable to find rowEntity in grid data, timer cannot be cancelled")
            }, cancelEditCell: function (a, b) {
                var c = this.grid, d = c.getRow(a);
                return d ? void f.considerSetTimer(c, d) : void e.logError("Unable to find rowEntity in grid data, timer cannot be set")
            }, navigate: function (a, b) {
                var c = this.grid;
                a.row.rowEditSaveTimer && f.cancelTimer(c, a.row), b && b.row && b.row !== a.row && f.considerSetTimer(c, b.row)
            }, considerSetTimer: function (b, c) {
                if (f.cancelTimer(b, c), c.isDirty && !c.isSaving && -1 !== b.options.rowEditWaitInterval) {
                    var d = b.options.rowEditWaitInterval ? b.options.rowEditWaitInterval : 2e3;
                    c.rowEditSaveTimer = a(f.saveRow(b, c), d, 1)
                }
            }, cancelTimer: function (b, c) {
                c.rowEditSaveTimer && !c.isSaving && (a.cancel(c.rowEditSaveTimer), delete c.rowEditSaveTimer)
            }, setRowsDirty: function (a, b) {
                var c;
                b.forEach(function (b, d) {
                    c = a.getRow(b), c ? (a.rowEdit.dirtyRows || (a.rowEdit.dirtyRows = []), c.isDirty || (c.isDirty = !0, a.rowEdit.dirtyRows.push(c)), delete c.isError, f.considerSetTimer(a, c)) : e.logError("requested row not found in rowEdit.setRowsDirty, row was: " + b)
                })
            }, setRowsClean: function (a, b) {
                var c;
                b.forEach(function (b, d) {
                    c = a.getRow(b), c ? (delete c.isDirty, f.removeRow(a.rowEdit.dirtyRows, c), f.cancelTimer(a, c), delete c.isError, f.removeRow(a.rowEdit.errorRows, c)) : e.logError("requested row not found in rowEdit.setRowsClean, row was: " + b)
                })
            }
        };
        return f
    }]), a.directive("uiGridRowEdit", ["gridUtil", "uiGridRowEditService", "uiGridEditConstants", function (a, b, c) {
        return {
            replace: !0, priority: 0, require: "^uiGrid", scope: !1, compile: function () {
                return {
                    pre: function (a, c, d, e) {
                        b.initializeGrid(a, e.grid)
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }]), a.directive("uiGridViewport", ["$compile", "uiGridConstants", "gridUtil", "$parse", function (a, b, c, d) {
        return {
            priority: -200, scope: !1, compile: function (a, b) {
                var c = angular.element(a.children().children()[0]), d = c.attr("ng-class"), e = "";
                return e = d ? d.slice(0, -1) + ", 'ui-grid-row-dirty': row.isDirty, 'ui-grid-row-saving': row.isSaving, 'ui-grid-row-error': row.isError}" : "{'ui-grid-row-dirty': row.isDirty, 'ui-grid-row-saving': row.isSaving, 'ui-grid-row-error': row.isError}", c.attr("ng-class", e), {
                    pre: function (a, b, c, d) {
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.saveState", ["ui.grid", "ui.grid.selection", "ui.grid.cellNav", "ui.grid.grouping", "ui.grid.pinning", "ui.grid.treeView"]);
    a.constant("uiGridSaveStateConstants", {featureName: "saveState"}), a.service("uiGridSaveStateService", ["$q", "uiGridSaveStateConstants", "gridUtil", "$compile", "$interval", "uiGridConstants", function (a, b, c, d, e, f) {
        var g = {
            initializeGrid: function (a) {
                a.saveState = {}, this.defaultGridOptions(a.options);
                var b = {
                    events: {saveState: {}}, methods: {
                        saveState: {
                            save: function () {
                                return g.save(a)
                            }, restore: function (b, c) {
                                g.restore(a, b, c)
                            }
                        }
                    }
                };
                a.api.registerEventsFromObject(b.events), a.api.registerMethodsFromObject(b.methods)
            }, defaultGridOptions: function (a) {
                a.saveWidths = a.saveWidths !== !1, a.saveOrder = a.saveOrder !== !1, a.saveScroll = a.saveScroll === !0, a.saveFocus = a.saveScroll !== !0 && a.saveFocus !== !1, a.saveVisible = a.saveVisible !== !1, a.saveSort = a.saveSort !== !1, a.saveFilter = a.saveFilter !== !1, a.saveSelection = a.saveSelection !== !1, a.saveGrouping = a.saveGrouping !== !1, a.saveGroupingExpandedStates = a.saveGroupingExpandedStates === !0, a.savePinning = a.savePinning !== !1, a.saveTreeView = a.saveTreeView !== !1
            }, save: function (a) {
                var b = {};
                return b.columns = g.saveColumns(a), b.scrollFocus = g.saveScrollFocus(a), b.selection = g.saveSelection(a), b.grouping = g.saveGrouping(a), b.treeView = g.saveTreeView(a), b.pagination = g.savePagination(a), b
            }, restore: function (a, b, c) {
                c.columns && g.restoreColumns(a, c.columns), c.scrollFocus && g.restoreScrollFocus(a, b, c.scrollFocus), c.selection && g.restoreSelection(a, c.selection), c.grouping && g.restoreGrouping(a, c.grouping), c.treeView && g.restoreTreeView(a, c.treeView), c.pagination && g.restorePagination(a, c.pagination), a.refresh()
            }, saveColumns: function (a) {
                var b = [];
                return a.getOnlyDataColumns().forEach(function (c) {
                    var d = {};
                    d.name = c.name, a.options.saveVisible && (d.visible = c.visible), a.options.saveWidths && (d.width = c.width), a.options.saveSort && (d.sort = angular.copy(c.sort)), a.options.saveFilter && (d.filters = [], c.filters.forEach(function (a) {
                        var b = {};
                        angular.forEach(a, function (a, c) {
                            "condition" !== c && "$$hashKey" !== c && "placeholder" !== c && (b[c] = a)
                        }), d.filters.push(b)
                    })), a.api.pinning && a.options.savePinning && (d.pinned = c.renderContainer ? c.renderContainer : ""), b.push(d)
                }), b
            }, saveScrollFocus: function (a) {
                if (!a.api.cellNav) return {};
                var b = {};
                if (a.options.saveFocus) {
                    b.focus = !0;
                    var c = a.api.cellNav.getFocusedCell();
                    null !== c && (null !== c.col && (b.colName = c.col.colDef.name), null !== c.row && (b.rowVal = g.getRowVal(a, c.row)))
                }
                return (a.options.saveScroll || a.options.saveFocus && !b.colName && !b.rowVal) && (b.focus = !1, a.renderContainers.body.prevRowScrollIndex && (b.rowVal = g.getRowVal(a, a.renderContainers.body.visibleRowCache[a.renderContainers.body.prevRowScrollIndex])), a.renderContainers.body.prevColScrollIndex && (b.colName = a.renderContainers.body.visibleColumnCache[a.renderContainers.body.prevColScrollIndex].name)), b
            }, saveSelection: function (a) {
                if (!a.api.selection || !a.options.saveSelection) return [];
                var b = a.api.selection.getSelectedGridRows().map(function (b) {
                    return g.getRowVal(a, b)
                });
                return b
            }, saveGrouping: function (a) {
                return a.api.grouping && a.options.saveGrouping ? a.api.grouping.getGrouping(a.options.saveGroupingExpandedStates) : {}
            }, savePagination: function (a) {
                return a.api.pagination && a.options.paginationPageSize ? {
                    paginationCurrentPage: a.options.paginationCurrentPage,
                    paginationPageSize: a.options.paginationPageSize
                } : {}
            }, saveTreeView: function (a) {
                return a.api.treeView && a.options.saveTreeView ? a.api.treeView.getTreeView() : {}
            }, getRowVal: function (a, b) {
                if (!b) return null;
                var c = {};
                return a.options.saveRowIdentity ? (c.identity = !0, c.row = a.options.saveRowIdentity(b.entity)) : (c.identity = !1, c.row = a.renderContainers.body.visibleRowCache.indexOf(b)), c
            }, restoreColumns: function (a, b) {
                var c = !1;
                b.forEach(function (b, d) {
                    var e = a.getColumn(b.name);
                    if (e && !a.isRowHeaderColumn(e)) {
                        !a.options.saveVisible || e.visible === b.visible && e.colDef.visible === b.visible || (e.visible = b.visible, e.colDef.visible = b.visible, a.api.core.raise.columnVisibilityChanged(e)), a.options.saveWidths && e.width !== b.width && (e.width = b.width, e.hasCustomWidth = !0), !a.options.saveSort || angular.equals(e.sort, b.sort) || void 0 === e.sort && angular.isEmpty(b.sort) || (e.sort = angular.copy(b.sort), c = !0), a.options.saveFilter && !angular.equals(e.filters, b.filters) && (b.filters.forEach(function (a, b) {
                            angular.extend(e.filters[b], a), ("undefined" == typeof a.term || null === a.term) && delete e.filters[b].term
                        }), a.api.core.raise.filterChanged()), a.api.pinning && a.options.savePinning && e.renderContainer !== b.pinned && a.api.pinning.pinColumn(e, b.pinned);
                        var f = a.getOnlyDataColumns().indexOf(e);
                        if (-1 !== f && a.options.saveOrder && f !== d) {
                            var g = a.columns.splice(f + a.rowHeaderColumns.length, 1)[0];
                            a.columns.splice(d + a.rowHeaderColumns.length, 0, g)
                        }
                    }
                }), c && a.api.core.raise.sortChanged(a, a.getColumnSorting())
            }, restoreScrollFocus: function (a, b, c) {
                if (a.api.cellNav) {
                    var d, e;
                    if (c.colName) {
                        var f = a.options.columnDefs.filter(function (a) {
                            return a.name === c.colName
                        });
                        f.length > 0 && (d = f[0])
                    }
                    c.rowVal && c.rowVal.row && (e = c.rowVal.identity ? g.findRowByIdentity(a, c.rowVal) : a.renderContainers.body.visibleRowCache[c.rowVal.row]);
                    var h = e && e.entity ? e.entity : null;
                    (d || h) && (c.focus ? a.api.cellNav.scrollToFocus(h, d) : a.scrollTo(h, d))
                }
            }, restoreSelection: function (a, b) {
                a.api.selection && (a.api.selection.clearSelectedRows(), b.forEach(function (b) {
                    if (b.identity) {
                        var c = g.findRowByIdentity(a, b);
                        c && a.api.selection.selectRow(c.entity)
                    } else a.api.selection.selectRowByVisibleIndex(b.row)
                }))
            }, restoreGrouping: function (a, b) {
                a.api.grouping && "undefined" != typeof b && null !== b && !angular.equals(b, {}) && a.api.grouping.setGrouping(b)
            }, restoreTreeView: function (a, b) {
                a.api.treeView && "undefined" != typeof b && null !== b && !angular.equals(b, {}) && a.api.treeView.setTreeView(b)
            }, restorePagination: function (a, b) {
                a.api.pagination && a.options.paginationPageSize && (a.options.paginationCurrentPage = b.paginationCurrentPage, a.options.paginationPageSize = b.paginationPageSize)
            }, findRowByIdentity: function (a, b) {
                if (!a.options.saveRowIdentity) return null;
                var c = a.rows.filter(function (c) {
                    return a.options.saveRowIdentity(c.entity) === b.row ? !0 : !1
                });
                return c.length > 0 ? c[0] : null
            }
        };
        return g
    }]), a.directive("uiGridSaveState", ["uiGridSaveStateConstants", "uiGridSaveStateService", "gridUtil", "$compile", function (a, b, c, d) {
        return {
            replace: !0, priority: 0, require: "^uiGrid", scope: !1, link: function (a, c, d, e) {
                b.initializeGrid(e.grid)
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.selection", ["ui.grid"]);
    a.constant("uiGridSelectionConstants", {
        featureName: "selection",
        selectionRowHeaderColName: "selectionRowHeaderCol"
    }), angular.module("ui.grid").config(["$provide", function (a) {
        a.decorator("GridRow", ["$delegate", function (a) {
            return a.prototype.setSelected = function (a) {
                a !== this.isSelected && (this.isSelected = a, this.grid.selection.selectedCount += a ? 1 : -1)
            }, a
        }])
    }]), a.service("uiGridSelectionService", ["$q", "$templateCache", "uiGridSelectionConstants", "gridUtil", function (a, b, c, d) {
        var e = {
            initializeGrid: function (a) {
                a.selection = {}, a.selection.lastSelectedRow = null, a.selection.selectAll = !1, a.selection.selectedCount = 0, e.defaultGridOptions(a.options);
                var b = {
                    events: {
                        selection: {
                            rowSelectionChanged: function (a, b, c) {
                            }, rowSelectionChangedBatch: function (a, b, c) {
                            }
                        }
                    }, methods: {
                        selection: {
                            toggleRowSelection: function (b, c) {
                                var d = a.getRow(b);
                                null !== d && e.toggleRowSelection(a, d, c, a.options.multiSelect, a.options.noUnselect)
                            }, selectRow: function (b, c) {
                                var d = a.getRow(b);
                                null === d || d.isSelected || e.toggleRowSelection(a, d, c, a.options.multiSelect, a.options.noUnselect)
                            }, selectRowByVisibleIndex: function (b, c) {
                                var d = a.renderContainers.body.visibleRowCache[b];
                                null === d || "undefined" == typeof d || d.isSelected || e.toggleRowSelection(a, d, c, a.options.multiSelect, a.options.noUnselect)
                            }, unSelectRow: function (b, c) {
                                var d = a.getRow(b);
                                null !== d && d.isSelected && e.toggleRowSelection(a, d, c, a.options.multiSelect, a.options.noUnselect)
                            }, selectAllRows: function (b) {
                                if (a.options.multiSelect !== !1) {
                                    var c = [];
                                    a.rows.forEach(function (d) {
                                        d.isSelected || d.enableSelection === !1 || (d.setSelected(!0), e.decideRaiseSelectionEvent(a, d, c, b))
                                    }), e.decideRaiseSelectionBatchEvent(a, c, b), a.selection.selectAll = !0
                                }
                            }, selectAllVisibleRows: function (b) {
                                if (a.options.multiSelect !== !1) {
                                    var c = [];
                                    a.rows.forEach(function (d) {
                                        d.visible ? d.isSelected || d.enableSelection === !1 || (d.setSelected(!0), e.decideRaiseSelectionEvent(a, d, c, b)) : d.isSelected && (d.setSelected(!1), e.decideRaiseSelectionEvent(a, d, c, b))
                                    }), e.decideRaiseSelectionBatchEvent(a, c, b), a.selection.selectAll = !0
                                }
                            }, clearSelectedRows: function (b) {
                                e.clearSelectedRows(a, b)
                            }, getSelectedRows: function () {
                                return e.getSelectedRows(a).map(function (a) {
                                    return a.entity
                                })
                            }, getSelectedGridRows: function () {
                                return e.getSelectedRows(a)
                            }, getSelectedCount: function () {
                                return a.selection.selectedCount
                            }, setMultiSelect: function (b) {
                                a.options.multiSelect = b
                            }, setModifierKeysToMultiSelect: function (b) {
                                a.options.modifierKeysToMultiSelect = b
                            }, getSelectAllState: function () {
                                return a.selection.selectAll
                            }
                        }
                    }
                };
                a.api.registerEventsFromObject(b.events), a.api.registerMethodsFromObject(b.methods)
            }, defaultGridOptions: function (a) {
                a.enableRowSelection = a.enableRowSelection !== !1, a.multiSelect = a.multiSelect !== !1, a.noUnselect = a.noUnselect === !0, a.modifierKeysToMultiSelect = a.modifierKeysToMultiSelect === !0, a.enableRowHeaderSelection = a.enableRowHeaderSelection !== !1, "undefined" == typeof a.enableFullRowSelection && (a.enableFullRowSelection = !a.enableRowHeaderSelection), a.enableSelectAll = a.enableSelectAll !== !1, a.enableSelectionBatchEvent = a.enableSelectionBatchEvent !== !1, a.selectionRowHeaderWidth = angular.isDefined(a.selectionRowHeaderWidth) ? a.selectionRowHeaderWidth : 30, a.enableFooterTotalSelected = a.enableFooterTotalSelected !== !1, a.isRowSelectable = angular.isDefined(a.isRowSelectable) ? a.isRowSelectable : angular.noop
            }, toggleRowSelection: function (a, b, c, d, f) {
                var g = b.isSelected;
                if (b.enableSelection !== !1 || g) {
                    var h;
                    d || g ? !d && g && (h = e.getSelectedRows(a), h.length > 1 && (g = !1, e.clearSelectedRows(a, c))) : e.clearSelectedRows(a, c), g && f || (b.setSelected(!g), b.isSelected === !0 && (a.selection.lastSelectedRow = b), h = e.getSelectedRows(a), a.selection.selectAll = a.rows.length === h.length, a.api.selection.raise.rowSelectionChanged(b, c))
                }
            }, shiftSelect: function (a, b, c, d) {
                if (d) {
                    var f = e.getSelectedRows(a),
                        g = f.length > 0 ? a.renderContainers.body.visibleRowCache.indexOf(a.selection.lastSelectedRow) : 0,
                        h = a.renderContainers.body.visibleRowCache.indexOf(b);
                    if (g > h) {
                        var i = g;
                        g = h, h = i
                    }
                    for (var j = [], k = g; h >= k; k++) {
                        var l = a.renderContainers.body.visibleRowCache[k];
                        l && (l.isSelected || l.enableSelection === !1 || (l.setSelected(!0), a.selection.lastSelectedRow = l, e.decideRaiseSelectionEvent(a, l, j, c)))
                    }
                    e.decideRaiseSelectionBatchEvent(a, j, c)
                }
            }, getSelectedRows: function (a) {
                return a.rows.filter(function (a) {
                    return a.isSelected
                })
            }, clearSelectedRows: function (a, b) {
                var c = [];
                e.getSelectedRows(a).forEach(function (d) {
                    d.isSelected && (d.setSelected(!1), e.decideRaiseSelectionEvent(a, d, c, b))
                }), e.decideRaiseSelectionBatchEvent(a, c, b), a.selection.selectAll = !1, a.selection.selectedCount = 0
            }, decideRaiseSelectionEvent: function (a, b, c, d) {
                a.options.enableSelectionBatchEvent ? c.push(b) : a.api.selection.raise.rowSelectionChanged(b, d)
            }, decideRaiseSelectionBatchEvent: function (a, b, c) {
                b.length > 0 && a.api.selection.raise.rowSelectionChangedBatch(b, c)
            }
        };
        return e
    }]), a.directive("uiGridSelection", ["uiGridSelectionConstants", "uiGridSelectionService", "$templateCache", "uiGridConstants", function (a, b, c, d) {
        return {
            replace: !0, priority: 0, require: "^uiGrid", scope: !1, compile: function () {
                return {
                    pre: function (c, e, f, g) {
                        if (b.initializeGrid(g.grid), g.grid.options.enableRowHeaderSelection) {
                            var h = {
                                name: a.selectionRowHeaderColName,
                                displayName: "",
                                width: g.grid.options.selectionRowHeaderWidth,
                                minWidth: 10,
                                cellTemplate: "ui-grid/selectionRowHeader",
                                headerCellTemplate: "ui-grid/selectionHeaderCell",
                                enableColumnResizing: !1,
                                enableColumnMenu: !1,
                                exporterSuppressExport: !0,
                                allowCellFocus: !0
                            };
                            g.grid.addRowHeaderColumn(h, 0)
                        }
                        var i = !1, j = function (a) {
                            return a.forEach(function (a) {
                                a.enableSelection = g.grid.options.isRowSelectable(a)
                            }), a
                        }, k = function () {
                            g.grid.options.isRowSelectable !== angular.noop && i !== !0 && (g.grid.registerRowsProcessor(j, 500), i = !0)
                        };
                        k();
                        var l = g.grid.registerDataChangeCallback(k, [d.dataChange.OPTIONS]);
                        c.$on("$destroy", l)
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }]), a.directive("uiGridSelectionRowHeaderButtons", ["$templateCache", "uiGridSelectionService", "gridUtil", function (a, b, c) {
        return {
            replace: !0,
            restrict: "E",
            template: a.get("ui-grid/selectionRowHeaderButtons"),
            scope: !0,
            require: "^uiGrid",
            link: function (a, d, e, f) {
                function g(a, c) {
                    c.stopPropagation(), c.shiftKey ? b.shiftSelect(i, a, c, i.options.multiSelect) : c.ctrlKey || c.metaKey ? b.toggleRowSelection(i, a, c, i.options.multiSelect, i.options.noUnselect) : b.toggleRowSelection(i, a, c, i.options.multiSelect && !i.options.modifierKeysToMultiSelect, i.options.noUnselect)
                }

                function h(a) {
                    (a.ctrlKey || a.shiftKey) && (a.target.onselectstart = function () {
                        return !1
                    }, window.setTimeout(function () {
                        a.target.onselectstart = null
                    }, 0))
                }

                var i = f.grid;
                a.selectButtonClick = g, "ie" === c.detectBrowser() && d.on("mousedown", h)
            }
        }
    }]), a.directive("uiGridSelectionSelectAllButtons", ["$templateCache", "uiGridSelectionService", function (a, b) {
        return {
            replace: !0,
            restrict: "E",
            template: a.get("ui-grid/selectionSelectAllButtons"),
            scope: !1,
            link: function (a, c, d, e) {
                var f = a.col.grid;
                a.headerButtonClick = function (a, c) {
                    f.selection.selectAll ? (b.clearSelectedRows(f, c), f.options.noUnselect && f.api.selection.selectRowByVisibleIndex(0, c), f.selection.selectAll = !1) : f.options.multiSelect && (f.api.selection.selectAllVisibleRows(c), f.selection.selectAll = !0)
                }
            }
        }
    }]), a.directive("uiGridViewport", ["$compile", "uiGridConstants", "uiGridSelectionConstants", "gridUtil", "$parse", "uiGridSelectionService", function (a, b, c, d, e, f) {
        return {
            priority: -200, scope: !1, compile: function (a, b) {
                var c = angular.element(a.children().children()[0]), d = c.attr("ng-class"), e = "";
                return e = d ? d.slice(0, -1) + ",'ui-grid-row-selected': row.isSelected}" : "{'ui-grid-row-selected': row.isSelected}", c.attr("ng-class", e), {
                    pre: function (a, b, c, d) {
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }]), a.directive("uiGridCell", ["$compile", "uiGridConstants", "uiGridSelectionConstants", "gridUtil", "$parse", "uiGridSelectionService", "$timeout", function (a, b, c, d, e, f, g) {
        return {
            priority: -200, restrict: "A", require: "?^uiGrid", scope: !1, link: function (a, c, d, e) {
                function h() {
                    a.grid.options.enableRowSelection && a.grid.options.enableFullRowSelection && (c.addClass("ui-grid-disable-selection"), c.on("touchstart", m), c.on("touchend", n), c.on("click", l), a.registered = !0)
                }

                function i() {
                    a.registered && (c.removeClass("ui-grid-disable-selection"), c.off("touchstart", m), c.off("touchend", n), c.off("click", l), a.registered = !1)
                }

                var j = 0, k = 300;
                e.grid.api.cellNav && e.grid.api.cellNav.on.viewPortKeyDown(a, function (b, c) {
                    null !== c && c.row === a.row && c.col === a.col && 32 === b.keyCode && "selectionRowHeaderCol" === a.col.colDef.name && (f.toggleRowSelection(a.grid, a.row, b, a.grid.options.multiSelect && !a.grid.options.modifierKeysToMultiSelect, a.grid.options.noUnselect), a.$apply())
                });
                var l = function (b) {
                    "ui-grid-icon-minus-squared" !== b.target.className && "ui-grid-icon-plus-squared" !== b.target.className && (c.off("touchend", n), b.shiftKey ? f.shiftSelect(a.grid, a.row, b, a.grid.options.multiSelect) : b.ctrlKey || b.metaKey ? f.toggleRowSelection(a.grid, a.row, b, a.grid.options.multiSelect, a.grid.options.noUnselect) : f.toggleRowSelection(a.grid, a.row, b, a.grid.options.multiSelect && !a.grid.options.modifierKeysToMultiSelect, a.grid.options.noUnselect), a.$apply(), g(function () {
                        c.on("touchend", n)
                    }, k))
                }, m = function (a) {
                    j = (new Date).getTime(), c.off("click", l)
                }, n = function (a) {
                    var b = (new Date).getTime(), d = b - j;
                    k > d && l(a), g(function () {
                        c.on("click", l)
                    }, k)
                };
                h();
                var o = a.grid.registerDataChangeCallback(function () {
                    a.grid.options.enableRowSelection && a.grid.options.enableFullRowSelection && !a.registered ? h() : a.grid.options.enableRowSelection && a.grid.options.enableFullRowSelection || !a.registered || i()
                }, [b.dataChange.OPTIONS]);
                c.on("$destroy", o)
            }
        }
    }]), a.directive("uiGridGridFooter", ["$compile", "uiGridConstants", "gridUtil", function (a, b, c) {
        return {
            restrict: "EA", replace: !0, priority: -1e3, require: "^uiGrid", scope: !0, compile: function (b, d) {
                return {
                    pre: function (b, d, e, f) {
                        f.grid.options.showGridFooter && c.getTemplate("ui-grid/gridFooterSelectedItems").then(function (c) {
                            var e = angular.element(c), f = a(e)(b);
                            angular.element(d[0].getElementsByClassName("ui-grid-grid-footer")[0]).append(f)
                        })
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.treeBase", ["ui.grid"]);
    a.constant("uiGridTreeBaseConstants", {
        featureName: "treeBase",
        rowHeaderColName: "treeBaseRowHeaderCol",
        EXPANDED: "expanded",
        COLLAPSED: "collapsed",
        aggregation: {COUNT: "count", SUM: "sum", MAX: "max", MIN: "min", AVG: "avg"}
    }), a.service("uiGridTreeBaseService", ["$q", "uiGridTreeBaseConstants", "gridUtil", "GridRow", "gridClassFactory", "i18nService", "uiGridConstants", "rowSorter", function (a, b, c, d, e, f, g, h) {
        var i = {
            initializeGrid: function (a, b) {
                a.treeBase = {}, a.treeBase.numberLevels = 0, a.treeBase.expandAll = !1, a.treeBase.tree = [], i.defaultGridOptions(a.options), a.registerRowsProcessor(i.treeRows, 410), a.registerColumnBuilder(i.treeBaseColumnBuilder), i.createRowHeader(a);
                var c = {
                    events: {treeBase: {rowExpanded: {}, rowCollapsed: {}}},
                    methods: {
                        treeBase: {
                            expandAllRows: function () {
                                i.expandAllRows(a)
                            }, collapseAllRows: function () {
                                i.collapseAllRows(a)
                            }, toggleRowTreeState: function (b) {
                                i.toggleRowTreeState(a, b)
                            }, expandRow: function (b) {
                                i.expandRow(a, b)
                            }, expandRowChildren: function (b) {
                                i.expandRowChildren(a, b)
                            }, collapseRow: function (b) {
                                i.collapseRow(a, b)
                            }, collapseRowChildren: function (b) {
                                i.collapseRowChildren(a, b)
                            }, getTreeExpandedState: function () {
                                return {expandedState: i.getTreeState(a)}
                            }, setTreeState: function (b) {
                                i.setTreeState(a, b)
                            }, getRowChildren: function (a) {
                                return a.treeNode.children.map(function (a) {
                                    return a.row
                                })
                            }
                        }
                    }
                };
                a.api.registerEventsFromObject(c.events), a.api.registerMethodsFromObject(c.methods)
            }, defaultGridOptions: function (a) {
                a.treeRowHeaderBaseWidth = a.treeRowHeaderBaseWidth || 30, a.treeIndent = a.treeIndent || 10, a.showTreeRowHeader = a.showTreeRowHeader !== !1, a.showTreeExpandNoChildren = a.showTreeExpandNoChildren !== !1, a.treeRowHeaderAlwaysVisible = a.treeRowHeaderAlwaysVisible !== !1, a.treeCustomAggregations = a.treeCustomAggregations || {}, a.enableExpandAll = a.enableExpandAll !== !1
            }, treeBaseColumnBuilder: function (a, b, c) {
                "undefined" != typeof a.customTreeAggregationFn && (b.treeAggregationFn = a.customTreeAggregationFn), "undefined" != typeof a.treeAggregationType && (b.treeAggregation = {type: a.treeAggregationType}, "undefined" != typeof c.treeCustomAggregations[a.treeAggregationType] ? (b.treeAggregationFn = c.treeCustomAggregations[a.treeAggregationType].aggregationFn, b.treeAggregationFinalizerFn = c.treeCustomAggregations[a.treeAggregationType].finalizerFn, b.treeAggregation.label = c.treeCustomAggregations[a.treeAggregationType].label) : "undefined" != typeof i.nativeAggregations()[a.treeAggregationType] && (b.treeAggregationFn = i.nativeAggregations()[a.treeAggregationType].aggregationFn, b.treeAggregation.label = i.nativeAggregations()[a.treeAggregationType].label)), "undefined" != typeof a.treeAggregationLabel && ("undefined" == typeof b.treeAggregation && (b.treeAggregation = {}), b.treeAggregation.label = a.treeAggregationLabel), b.treeAggregationUpdateEntity = a.treeAggregationUpdateEntity !== !1, "undefined" == typeof b.customTreeAggregationFinalizerFn && (b.customTreeAggregationFinalizerFn = a.customTreeAggregationFinalizerFn)
            }, createRowHeader: function (a) {
                var c = {
                    name: b.rowHeaderColName,
                    displayName: "",
                    width: a.options.treeRowHeaderBaseWidth,
                    minWidth: 10,
                    cellTemplate: "ui-grid/treeBaseRowHeader",
                    headerCellTemplate: "ui-grid/treeBaseHeaderCell",
                    enableColumnResizing: !1,
                    enableColumnMenu: !1,
                    exporterSuppressExport: !0,
                    allowCellFocus: !0
                };
                c.visible = a.options.treeRowHeaderAlwaysVisible, a.addRowHeaderColumn(c, -100)
            }, expandAllRows: function (a) {
                a.treeBase.tree.forEach(function (c) {
                    i.setAllNodes(a, c, b.EXPANDED)
                }), a.treeBase.expandAll = !0, a.queueGridRefresh()
            }, collapseAllRows: function (a) {
                a.treeBase.tree.forEach(function (c) {
                    i.setAllNodes(a, c, b.COLLAPSED)
                }), a.treeBase.expandAll = !1, a.queueGridRefresh()
            }, setAllNodes: function (a, c, d) {
                "undefined" != typeof c.state && c.state !== d && (c.state = d, d === b.EXPANDED ? a.api.treeBase.raise.rowExpanded(c.row) : a.api.treeBase.raise.rowCollapsed(c.row)), c.children && c.children.forEach(function (b) {
                    i.setAllNodes(a, b, d)
                })
            }, toggleRowTreeState: function (a, c) {
                "undefined" == typeof c.treeLevel || null === c.treeLevel || c.treeLevel < 0 || (c.treeNode.state === b.EXPANDED ? i.collapseRow(a, c) : i.expandRow(a, c), a.queueGridRefresh())
            }, expandRow: function (a, c) {
                "undefined" == typeof c.treeLevel || null === c.treeLevel || c.treeLevel < 0 || c.treeNode.state !== b.EXPANDED && (c.treeNode.state = b.EXPANDED, a.api.treeBase.raise.rowExpanded(c), a.treeBase.expandAll = i.allExpanded(a.treeBase.tree), a.queueGridRefresh())
            }, expandRowChildren: function (a, c) {
                "undefined" == typeof c.treeLevel || null === c.treeLevel || c.treeLevel < 0 || (i.setAllNodes(a, c.treeNode, b.EXPANDED), a.treeBase.expandAll = i.allExpanded(a.treeBase.tree), a.queueGridRefresh())
            }, collapseRow: function (a, c) {
                "undefined" == typeof c.treeLevel || null === c.treeLevel || c.treeLevel < 0 || c.treeNode.state !== b.COLLAPSED && (c.treeNode.state = b.COLLAPSED, a.treeBase.expandAll = !1, a.api.treeBase.raise.rowCollapsed(c), a.queueGridRefresh())
            }, collapseRowChildren: function (a, c) {
                "undefined" == typeof c.treeLevel || null === c.treeLevel || c.treeLevel < 0 || (i.setAllNodes(a, c.treeNode, b.COLLAPSED), a.treeBase.expandAll = !1, a.queueGridRefresh())
            }, allExpanded: function (a) {
                var b = !0;
                return a.forEach(function (a) {
                    i.allExpandedInternal(a) || (b = !1)
                }), b
            }, allExpandedInternal: function (a) {
                if (a.children && a.children.length > 0) {
                    if (a.state === b.COLLAPSED) return !1;
                    var c = !0;
                    return a.children.forEach(function (a) {
                        i.allExpandedInternal(a) || (c = !1)
                    }), c
                }
                return !0
            }, treeRows: function (a) {
                if (0 === a.length) return a;
                var c = this;
                b.EXPANDED;
                return c.treeBase.tree = i.createTree(c, a), i.updateRowHeaderWidth(c), i.sortTree(c), i.fixFilter(c), i.renderTree(c.treeBase.tree)
            }, updateRowHeaderWidth: function (a) {
                var c = a.getColumn(b.rowHeaderColName),
                    d = a.options.treeRowHeaderBaseWidth + a.options.treeIndent * Math.max(a.treeBase.numberLevels - 1, 0);
                c && d !== c.width && (c.width = d, a.queueRefresh());
                var e = !0;
                a.options.showTreeRowHeader === !1 && (e = !1), a.options.treeRowHeaderAlwaysVisible === !1 && a.treeBase.numberLevels <= 0 && (e = !1), c.visible !== e && (c.visible = e, c.colDef.visible = e, a.queueGridRefresh())
            }, renderTree: function (a) {
                var c = [];
                return a.forEach(function (a) {
                    a.row.visible && c.push(a.row), a.state === b.EXPANDED && a.children && a.children.length > 0 && (c = c.concat(i.renderTree(a.children)))
                }), c
            }, createTree: function (a, c) {
                var d, e = -1, f = [];
                a.treeBase.tree = [], a.treeBase.numberLevels = 0;
                var g = i.getAggregations(a), h = function (c) {
                    if ("undefined" != typeof c.entity.$$treeLevel && c.treeLevel !== c.entity.$$treeLevel && (c.treeLevel = c.entity.$$treeLevel), c.treeLevel <= e) {
                        for (; c.treeLevel <= e;) {
                            var h = f.pop();
                            i.finaliseAggregations(h), e--
                        }
                        d = f.length > 0 ? i.setCurrentState(f) : b.EXPANDED
                    }
                    ("undefined" == typeof c.treeLevel || null === c.treeLevel || c.treeLevel < 0) && c.visible && i.aggregate(a, c, f), i.addOrUseNode(a, c, f, g), "undefined" != typeof c.treeLevel && null !== c.treeLevel && c.treeLevel >= 0 && (f.push(c), e++, d = i.setCurrentState(f)), a.treeBase.numberLevels < c.treeLevel + 1 && (a.treeBase.numberLevels = c.treeLevel + 1)
                };
                for (c.forEach(h); f.length > 0;) {
                    var j = f.pop();
                    i.finaliseAggregations(j)
                }
                return a.treeBase.tree
            }, addOrUseNode: function (a, c, d, e) {
                var f = [];
                e.forEach(function (a) {
                    f.push(i.buildAggregationObject(a.col))
                });
                var g = {state: b.COLLAPSED, row: c, parentRow: null, aggregations: f, children: []};
                c.treeNode && (g.state = c.treeNode.state), d.length > 0 && (g.parentRow = d[d.length - 1]), c.treeNode = g, 0 === d.length ? a.treeBase.tree.push(g) : d[d.length - 1].treeNode.children.push(g)
            }, setCurrentState: function (a) {
                var c = b.EXPANDED;
                return a.forEach(function (a) {
                    a.treeNode.state === b.COLLAPSED && (c = b.COLLAPSED)
                }), c
            }, sortTree: function (a) {
                a.columns.forEach(function (a) {
                    a.sort && a.sort.ignoreSort && delete a.sort.ignoreSort
                }), a.treeBase.tree = i.sortInternal(a, a.treeBase.tree)
            }, sortInternal: function (a, c) {
                var d = c.map(function (a) {
                    return a.row
                });
                d = h.sort(a, d, a.columns);
                var e = d.map(function (a) {
                    return a.treeNode
                });
                return e.forEach(function (c) {
                    c.state === b.EXPANDED && c.children && c.children.length > 0 && (c.children = i.sortInternal(a, c.children))
                }), e
            }, fixFilter: function (a) {
                var b;
                a.treeBase.tree.forEach(function (a) {
                    a.children && a.children.length > 0 && (b = a.row.visible, i.fixFilterInternal(a.children, b))
                })
            }, fixFilterInternal: function (a, b) {
                return a.forEach(function (a) {
                    a.row.visible && !b && (i.setParentsVisible(a), b = !0), a.children && a.children.length > 0 && i.fixFilterInternal(a.children, b && a.row.visible) && (b = !0)
                }), b
            }, setParentsVisible: function (a) {
                for (; a.parentRow;) a.parentRow.visible = !0, a = a.parentRow.treeNode
            }, buildAggregationObject: function (a) {
                var b = {col: a};
                return a.treeAggregation && a.treeAggregation.type && (b.type = a.treeAggregation.type), a.treeAggregation && a.treeAggregation.label && (b.label = a.treeAggregation.label), b
            }, getAggregations: function (a) {
                var b = [];
                return a.columns.forEach(function (c) {
                    "undefined" != typeof c.treeAggregationFn && (b.push(i.buildAggregationObject(c)), a.options.showColumnFooter && "undefined" == typeof c.colDef.aggregationType && c.treeAggregation && (c.treeFooterAggregation = i.buildAggregationObject(c), c.aggregationType = i.treeFooterAggregationType))
                }), b
            }, aggregate: function (a, b, c) {
                0 === c.length && b.treeNode && b.treeNode.aggregations && b.treeNode.aggregations.forEach(function (c) {
                    if ("undefined" != typeof c.col.treeFooterAggregation) {
                        var d = a.getCellValue(b, c.col), e = Number(d);
                        c.col.treeAggregationFn(c.col.treeFooterAggregation, d, e, b)
                    }
                }), c.forEach(function (c, d) {
                    c.treeNode.aggregations && c.treeNode.aggregations.forEach(function (c) {
                        var e = a.getCellValue(b, c.col), f = Number(e);
                        c.col.treeAggregationFn(c, e, f, b), 0 === d && "undefined" != typeof c.col.treeFooterAggregation && c.col.treeAggregationFn(c.col.treeFooterAggregation, e, f, b)
                    })
                })
            }, nativeAggregations: function () {
                var a = {
                    count: {
                        label: f.get().aggregation.count,
                        menuTitle: f.get().grouping.aggregate_count,
                        aggregationFn: function (a, b, c) {
                            "undefined" == typeof a.value ? a.value = 1 : a.value++
                        }
                    },
                    sum: {
                        label: f.get().aggregation.sum,
                        menuTitle: f.get().grouping.aggregate_sum,
                        aggregationFn: function (a, b, c) {
                            isNaN(c) || ("undefined" == typeof a.value ? a.value = c : a.value += c)
                        }
                    },
                    min: {
                        label: f.get().aggregation.min,
                        menuTitle: f.get().grouping.aggregate_min,
                        aggregationFn: function (a, b, c) {
                            "undefined" == typeof a.value ? a.value = b : "undefined" != typeof b && null !== b && (b < a.value || null === a.value) && (a.value = b)
                        }
                    },
                    max: {
                        label: f.get().aggregation.max,
                        menuTitle: f.get().grouping.aggregate_max,
                        aggregationFn: function (a, b, c) {
                            "undefined" == typeof a.value ? a.value = b : "undefined" != typeof b && null !== b && (b > a.value || null === a.value) && (a.value = b)
                        }
                    },
                    avg: {
                        label: f.get().aggregation.avg,
                        menuTitle: f.get().grouping.aggregate_avg,
                        aggregationFn: function (a, b, c) {
                            "undefined" == typeof a.count ? a.count = 1 : a.count++, isNaN(c) || ("undefined" == typeof a.value || "undefined" == typeof a.sum ? (a.value = c, a.sum = c) : (a.sum += c, a.value = a.sum / a.count))
                        }
                    }
                };
                return a
            }, finaliseAggregation: function (a, b) {
                b.col.treeAggregationUpdateEntity && "undefined" != typeof a && "undefined" != typeof a.entity["$$" + b.col.uid] && angular.extend(b, a.entity["$$" + b.col.uid]), "function" == typeof b.col.treeAggregationFinalizerFn && b.col.treeAggregationFinalizerFn(b), "function" == typeof b.col.customTreeAggregationFinalizerFn && b.col.customTreeAggregationFinalizerFn(b), "undefined" == typeof b.rendered && (b.rendered = b.label ? b.label + b.value : b.value)
            }, finaliseAggregations: function (a) {
                null != a && "undefined" != typeof a.treeNode.aggregations && a.treeNode.aggregations.forEach(function (b) {
                    if (i.finaliseAggregation(a, b), b.col.treeAggregationUpdateEntity) {
                        var c = {};
                        angular.forEach(b, function (a, d) {
                            b.hasOwnProperty(d) && "col" !== d && (c[d] = a)
                        }), a.entity["$$" + b.col.uid] = c
                    }
                })
            }, treeFooterAggregationType: function (a, b) {
                return i.finaliseAggregation(void 0, b.treeFooterAggregation), "undefined" == typeof b.treeFooterAggregation.value || null === b.treeFooterAggregation.rendered ? "" : b.treeFooterAggregation.rendered
            }
        };
        return i
    }]), a.directive("uiGridTreeBaseRowHeaderButtons", ["$templateCache", "uiGridTreeBaseService", function (a, b) {
        return {
            replace: !0,
            restrict: "E",
            template: a.get("ui-grid/treeBaseRowHeaderButtons"),
            scope: !0,
            require: "^uiGrid",
            link: function (a, c, d, e) {
                var f = e.grid;
                a.treeButtonClick = function (a, c) {
                    b.toggleRowTreeState(f, a, c)
                }
            }
        }
    }]), a.directive("uiGridTreeBaseExpandAllButtons", ["$templateCache", "uiGridTreeBaseService", function (a, b) {
        return {
            replace: !0,
            restrict: "E",
            template: a.get("ui-grid/treeBaseExpandAllButtons"),
            scope: !1,
            link: function (a, c, d, e) {
                var f = a.col.grid;
                a.headerButtonClick = function (a, c) {
                    f.treeBase.expandAll ? b.collapseAllRows(f, c) : b.expandAllRows(f, c)
                }
            }
        }
    }]), a.directive("uiGridViewport", ["$compile", "uiGridConstants", "gridUtil", "$parse", function (a, b, c, d) {
        return {
            priority: -200, scope: !1, compile: function (a, b) {
                var c = angular.element(a.children().children()[0]), d = c.attr("ng-class"), e = "";
                return e = d ? d.slice(0, -1) + ",'ui-grid-tree-header-row': row.treeLevel > -1}" : "{'ui-grid-tree-header-row': row.treeLevel > -1}", c.attr("ng-class", e), {
                    pre: function (a, b, c, d) {
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.treeView", ["ui.grid", "ui.grid.treeBase"]);
    a.constant("uiGridTreeViewConstants", {
        featureName: "treeView",
        rowHeaderColName: "treeBaseRowHeaderCol",
        EXPANDED: "expanded",
        COLLAPSED: "collapsed",
        aggregation: {COUNT: "count", SUM: "sum", MAX: "max", MIN: "min", AVG: "avg"}
    }), a.service("uiGridTreeViewService", ["$q", "uiGridTreeViewConstants", "uiGridTreeBaseConstants", "uiGridTreeBaseService", "gridUtil", "GridRow", "gridClassFactory", "i18nService", "uiGridConstants", function (a, b, c, d, e, f, g, h, i) {
        var j = {
            initializeGrid: function (a, b) {
                d.initializeGrid(a, b), a.treeView = {}, a.registerRowsProcessor(j.adjustSorting, 60);
                var c = {events: {treeView: {}}, methods: {treeView: {}}};
                a.api.registerEventsFromObject(c.events), a.api.registerMethodsFromObject(c.methods)
            }, defaultGridOptions: function (a) {
                a.enableTreeView = a.enableTreeView !== !1
            }, adjustSorting: function (a) {
                var b = this;
                return b.columns.forEach(function (a) {
                    a.sort && (a.sort.ignoreSort = !0)
                }), a
            }
        };
        return j
    }]), a.directive("uiGridTreeView", ["uiGridTreeViewConstants", "uiGridTreeViewService", "$templateCache", function (a, b, c) {
        return {
            replace: !0, priority: 0, require: "^uiGrid", scope: !1, compile: function () {
                return {
                    pre: function (a, c, d, e) {
                        e.grid.options.enableTreeView !== !1 && b.initializeGrid(e.grid, a)
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    var a = angular.module("ui.grid.validate", ["ui.grid"]);
    a.service("uiGridValidateService", ["$sce", "$q", "$http", "i18nService", "uiGridConstants", function (a, b, c, d, e) {
        var f = {
            validatorFactories: {}, setExternalFactoryFunction: function (a) {
                f.externalFactoryFunction = a
            }, clearExternalFactory: function () {
                delete f.externalFactoryFunction
            }, getValidatorFromExternalFactory: function (a, b) {
                return f.externalFactoryFunction(a, b).validatorFactory(b)
            }, getMessageFromExternalFactory: function (a, b) {
                return f.externalFactoryFunction(a, b).messageFunction(b)
            }, setValidator: function (a, b, c) {
                f.validatorFactories[a] = {validatorFactory: b, messageFunction: c}
            }, getValidator: function (a, b) {
                if (f.externalFactoryFunction) {
                    var c = f.getValidatorFromExternalFactory(a, b);
                    if (c) return c
                }
                if (!f.validatorFactories[a]) throw"Invalid validator name: " + a;
                return f.validatorFactories[a].validatorFactory(b)
            }, getMessage: function (a, b) {
                if (f.externalFactoryFunction) {
                    var c = f.getMessageFromExternalFactory(a, b);
                    if (c) return c
                }
                return f.validatorFactories[a].messageFunction(b)
            }, isInvalid: function (a, b) {
                return a["$$invalid" + b.name]
            }, setInvalid: function (a, b) {
                a["$$invalid" + b.name] = !0
            }, setValid: function (a, b) {
                delete a["$$invalid" + b.name]
            }, setError: function (a, b, c) {
                a["$$errors" + b.name] || (a["$$errors" + b.name] = {}), a["$$errors" + b.name][c] = !0
            }, clearError: function (a, b, c) {
                a["$$errors" + b.name] && c in a["$$errors" + b.name] && delete a["$$errors" + b.name][c]
            }, getErrorMessages: function (a, b) {
                var c = [];
                return a["$$errors" + b.name] && 0 !== Object.keys(a["$$errors" + b.name]).length ? (Object.keys(a["$$errors" + b.name]).sort().forEach(function (a) {
                    c.push(f.getMessage(a, b.validators[a]))
                }), c) : c
            }, getFormattedErrors: function (b, c) {
                var e = "", g = f.getErrorMessages(b, c);
                return g.length ? (g.forEach(function (a) {
                    e += a + "<br/>"
                }), a.trustAsHtml("<p><b>" + d.getSafeText("validate.error") + "</b></p>" + e)) : void 0
            }, getTitleFormattedErrors: function (b, c) {
                var e = "\n", g = "", h = f.getErrorMessages(b, c);
                return h.length ? (h.forEach(function (a) {
                    g += a + e
                }), a.trustAsHtml(d.getSafeText("validate.error") + e + g)) : void 0
            }, runValidators: function (a, c, d, e, g) {
                if (d !== e) {
                    if ("undefined" == typeof c.name || !c.name) throw new Error("colDef.name is required to perform validation");
                    f.setValid(a, c);
                    var h = function (a, b, c) {
                        return function (h) {
                            h || (f.setInvalid(a, b), f.setError(a, b, c), g && g.api.validate.raise.validationFailed(a, b, d, e))
                        }
                    }, i = [];
                    for (var j in c.validators) {
                        f.clearError(a, c, j);
                        var k = f.getValidator(j, c.validators[j]), l = b.when(k(e, d, a, c)).then(h(a, c, j));
                        i.push(l)
                    }
                    return b.all(i)
                }
            }, createDefaultValidators: function () {
                f.setValidator("minLength", function (a) {
                    return function (b, c, d, e) {
                        return void 0 === c || null === c || "" === c ? !0 : c.length >= a
                    }
                }, function (a) {
                    return d.getSafeText("validate.minLength").replace("THRESHOLD", a)
                }), f.setValidator("maxLength", function (a) {
                    return function (b, c, d, e) {
                        return void 0 === c || null === c || "" === c ? !0 : c.length <= a
                    }
                }, function (a) {
                    return d.getSafeText("validate.maxLength").replace("THRESHOLD", a)
                }), f.setValidator("required", function (a) {
                    return function (b, c, d, e) {
                        return a ? !(void 0 === c || null === c || "" === c) : !0
                    }
                }, function (a) {
                    return d.getSafeText("validate.required")
                })
            }, initializeGrid: function (a, b) {
                b.validate = {
                    isInvalid: f.isInvalid,
                    getFormattedErrors: f.getFormattedErrors,
                    getTitleFormattedErrors: f.getTitleFormattedErrors,
                    runValidators: f.runValidators
                };
                var c = {
                    events: {
                        validate: {
                            validationFailed: function (a, b, c, d) {
                            }
                        }
                    }, methods: {
                        validate: {
                            isInvalid: function (a, c) {
                                return b.validate.isInvalid(a, c)
                            }, getErrorMessages: function (a, c) {
                                return b.validate.getErrorMessages(a, c)
                            }, getFormattedErrors: function (a, c) {
                                return b.validate.getFormattedErrors(a, c)
                            }, getTitleFormattedErrors: function (a, c) {
                                return b.validate.getTitleFormattedErrors(a, c)
                            }
                        }
                    }
                };
                b.api.registerEventsFromObject(c.events), b.api.registerMethodsFromObject(c.methods), b.edit && b.api.edit.on.afterCellEdit(a, function (a, c, d, e) {
                    b.validate.runValidators(a, c, d, e, b)
                }), f.createDefaultValidators()
            }
        };
        return f
    }]), a.directive("uiGridValidate", ["gridUtil", "uiGridValidateService", function (a, b) {
        return {
            priority: 0, replace: !0, require: "^uiGrid", scope: !1, compile: function () {
                return {
                    pre: function (a, c, d, e) {
                        b.initializeGrid(a, e.grid)
                    }, post: function (a, b, c, d) {
                    }
                }
            }
        }
    }])
}(), angular.module("ui.grid").run(["$templateCache", function (a) {
    "use strict";
    a.put("ui-grid/ui-grid-filter", '<div class="ui-grid-filter-container" ng-style="col.extraStyle" ng-repeat="colFilter in col.filters" ng-class="{\'ui-grid-filter-cancel-button-hidden\' : colFilter.disableCancelFilterButton === true }"><div ng-if="colFilter.type !== \'select\'"><input type="text" class="ui-grid-filter-input ui-grid-filter-input-{{$index}}" ng-model="colFilter.term" ng-attr-placeholder="{{colFilter.placeholder || \'\'}}" aria-label="{{colFilter.ariaLabel || aria.defaultFilterLabel}}"><div role="button" class="ui-grid-filter-button" ng-click="removeFilter(colFilter, $index)" ng-if="!colFilter.disableCancelFilterButton" ng-disabled="colFilter.term === undefined || colFilter.term === null || colFilter.term === \'\'" ng-show="colFilter.term !== undefined && colFilter.term !== null && colFilter.term !== \'\'"><i class="ui-grid-icon-cancel" ui-grid-one-bind-aria-label="aria.removeFilter">&nbsp;</i></div></div><div ng-if="colFilter.type === \'select\'"><select class="ui-grid-filter-select ui-grid-filter-input-{{$index}}" ng-model="colFilter.term" ng-show="colFilter.selectOptions.length > 0" ng-attr-placeholder="{{colFilter.placeholder || aria.defaultFilterLabel}}" aria-label="{{colFilter.ariaLabel || \'\'}}" ng-options="option.value as option.label for option in colFilter.selectOptions"><option value=""></option></select><div role="button" class="ui-grid-filter-button-select" ng-click="removeFilter(colFilter, $index)" ng-if="!colFilter.disableCancelFilterButton" ng-disabled="colFilter.term === undefined || colFilter.term === null || colFilter.term === \'\'" ng-show="colFilter.term !== undefined && colFilter.term != null"><i class="ui-grid-icon-cancel" ui-grid-one-bind-aria-label="aria.removeFilter">&nbsp;</i></div></div></div>'),
        a.put("ui-grid/ui-grid-footer", '<div class="ui-grid-footer-panel ui-grid-footer-aggregates-row"><!-- tfooter --><div class="ui-grid-footer ui-grid-footer-viewport"><div class="ui-grid-footer-canvas"><div class="ui-grid-footer-cell-wrapper" ng-style="colContainer.headerCellWrapperStyle()"><div role="row" class="ui-grid-footer-cell-row"><div ui-grid-footer-cell role="gridcell" ng-repeat="col in colContainer.renderedColumns track by col.uid" col="col" render-index="$index" class="ui-grid-footer-cell ui-grid-clearfix"></div></div></div></div></div></div>'), a.put("ui-grid/ui-grid-grid-footer", '<div class="ui-grid-footer-info ui-grid-grid-footer"><span>{{\'search.totalItems\' | t}} {{grid.rows.length}}</span> <span ng-if="grid.renderContainers.body.visibleRowCache.length !== grid.rows.length" class="ngLabel">({{"search.showingItems" | t}} {{grid.renderContainers.body.visibleRowCache.length}})</span></div>'), a.put("ui-grid/ui-grid-group-panel", '<div class="ui-grid-group-panel"><div ui-t="groupPanel.description" class="description" ng-show="groupings.length == 0"></div><ul ng-show="groupings.length > 0" class="ngGroupList"><li class="ngGroupItem" ng-repeat="group in configGroups"><span class="ngGroupElement"><span class="ngGroupName">{{group.displayName}} <span ng-click="removeGroup($index)" class="ngRemoveGroup">x</span></span> <span ng-hide="$last" class="ngGroupArrow"></span></span></li></ul></div>'), a.put("ui-grid/ui-grid-header", '<div role="rowgroup" class="ui-grid-header"><!-- theader --><div class="ui-grid-top-panel"><div class="ui-grid-header-viewport"><div class="ui-grid-header-canvas"><div class="ui-grid-header-cell-wrapper" ng-style="colContainer.headerCellWrapperStyle()"><div role="row" class="ui-grid-header-cell-row"><div class="ui-grid-header-cell ui-grid-clearfix" ng-repeat="col in colContainer.renderedColumns track by col.uid" ui-grid-header-cell col="col" render-index="$index"></div></div></div></div></div></div></div>'), a.put("ui-grid/ui-grid-menu-button", '<div class="ui-grid-menu-button"><div role="button" ui-grid-one-bind-id-grid="\'grid-menu\'" class="ui-grid-icon-container" ng-click="toggleMenu()" aria-haspopup="true"><i class="ui-grid-icon-menu" ui-grid-one-bind-aria-label="i18n.aria.buttonLabel">&nbsp;</i></div><div ui-grid-menu menu-items="menuItems"></div></div>'), a.put("ui-grid/ui-grid-no-header", '<div class="ui-grid-top-panel"></div>'), a.put("ui-grid/ui-grid-row", "<div ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.uid\" ui-grid-one-bind-id-grid=\"rowRenderIndex + '-' + col.uid + '-cell'\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" role=\"{{col.isRowHeader ? 'rowheader' : 'gridcell'}}\" ui-grid-cell></div>"), a.put("ui-grid/ui-grid", '<div ui-i18n="en" class="ui-grid"><!-- TODO (c0bra): add "scoped" attr here, eventually? --><style ui-grid-style>.grid{{ grid.id }} {\n      /* Styles for the grid */\n    }\n\n    .grid{{ grid.id }} .ui-grid-row, .grid{{ grid.id }} .ui-grid-cell, .grid{{ grid.id }} .ui-grid-cell .ui-grid-vertical-bar {\n      height: {{ grid.options.rowHeight }}px;\n    }\n\n    .grid{{ grid.id }} .ui-grid-row:last-child .ui-grid-cell {\n      border-bottom-width: {{ ((grid.getTotalRowHeight() < grid.getViewportHeight()) && \'1\') || \'0\' }}px;\n    }\n\n    {{ grid.verticalScrollbarStyles }}\n    {{ grid.horizontalScrollbarStyles }}\n\n    /*\n    .ui-grid[dir=rtl] .ui-grid-viewport {\n      padding-left: {{ grid.verticalScrollbarWidth }}px;\n    }\n    */\n\n    {{ grid.customStyles }}</style><div class="ui-grid-contents-wrapper"><div ui-grid-menu-button ng-if="grid.options.enableGridMenu"></div><div ng-if="grid.hasLeftContainer()" style="width: 0" ui-grid-pinned-container="\'left\'"></div><div ui-grid-render-container container-id="\'body\'" col-container-name="\'body\'" row-container-name="\'body\'" bind-scroll-horizontal="true" bind-scroll-vertical="true" enable-horizontal-scrollbar="grid.options.enableHorizontalScrollbar" enable-vertical-scrollbar="grid.options.enableVerticalScrollbar"></div><div ng-if="grid.hasRightContainer()" style="width: 0" ui-grid-pinned-container="\'right\'"></div><div ui-grid-grid-footer ng-if="grid.options.showGridFooter"></div><div ui-grid-column-menu ng-if="grid.options.enableColumnMenus"></div><div ng-transclude></div></div></div>'), a.put("ui-grid/uiGridCell", '<div class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>'), a.put("ui-grid/uiGridColumnMenu", '<div class="ui-grid-column-menu"><div ui-grid-menu menu-items="menuItems"><!-- <div class="ui-grid-column-menu">\n    <div class="inner" ng-show="menuShown">\n      <ul>\n        <div ng-show="grid.options.enableSorting">\n          <li ng-click="sortColumn($event, asc)" ng-class="{ \'selected\' : col.sort.direction == asc }"><i class="ui-grid-icon-sort-alt-up"></i> Sort Ascending</li>\n          <li ng-click="sortColumn($event, desc)" ng-class="{ \'selected\' : col.sort.direction == desc }"><i class="ui-grid-icon-sort-alt-down"></i> Sort Descending</li>\n          <li ng-show="col.sort.direction" ng-click="unsortColumn()"><i class="ui-grid-icon-cancel"></i> Remove Sort</li>\n        </div>\n      </ul>\n    </div>\n  </div> --></div></div>'), a.put("ui-grid/uiGridFooterCell", '<div class="ui-grid-cell-contents" col-index="renderIndex"><div>{{ col.getAggregationText() + ( col.getAggregationValue() CUSTOM_FILTERS ) }}</div></div>'), a.put("ui-grid/uiGridHeaderCell", '<div role="columnheader" ng-class="{ \'sortable\': sortable }" ui-grid-one-bind-aria-labelledby-grid="col.uid + \'-header-text \' + col.uid + \'-sortdir-text\'" aria-sort="{{col.sort.direction == asc ? \'ascending\' : ( col.sort.direction == desc ? \'descending\' : (!col.sort.direction ? \'none\' : \'other\'))}}"><div role="button" tabindex="0" class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" col-index="renderIndex" title="TOOLTIP"><span class="ui-grid-header-cell-label" ui-grid-one-bind-id-grid="col.uid + \'-header-text\'">{{ col.displayName CUSTOM_FILTERS }}</span> <span ui-grid-one-bind-id-grid="col.uid + \'-sortdir-text\'" ui-grid-visible="col.sort.direction" aria-label="{{getSortDirectionAriaLabel()}}"><i ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }" title="{{isSortPriorityVisible() ? i18n.headerCell.priority + \' \' + ( col.sort.priority + 1 )  : null}}" aria-hidden="true"></i> <sub ui-grid-visible="isSortPriorityVisible()" class="ui-grid-sort-priority-number">{{col.sort.priority + 1}}</sub></span></div><div role="button" tabindex="0" ui-grid-one-bind-id-grid="col.uid + \'-menu-button\'" class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}" ui-grid-one-bind-aria-label="i18n.headerCell.aria.columnMenuButtonLabel" aria-haspopup="true"><i class="ui-grid-icon-angle-down" aria-hidden="true">&nbsp;</i></div><div ui-grid-filter></div></div>'), a.put("ui-grid/uiGridMenu", '<div class="ui-grid-menu" ng-if="shown"><style ui-grid-style>{{dynamicStyles}}</style><div class="ui-grid-menu-mid" ng-show="shownMid"><div class="ui-grid-menu-inner"><ul role="menu" class="ui-grid-menu-items"><li ng-repeat="item in menuItems" role="menuitem" ui-grid-menu-item ui-grid-one-bind-id="\'menuitem-\'+$index" action="item.action" name="item.title" active="item.active" icon="item.icon" shown="item.shown" context="item.context" template-url="item.templateUrl" leave-open="item.leaveOpen" screen-reader-only="item.screenReaderOnly"></li></ul></div></div></div>'), a.put("ui-grid/uiGridMenuItem", '<button type="button" class="ui-grid-menu-item" ng-click="itemAction($event, title)" ng-show="itemShown()" ng-class="{ \'ui-grid-menu-item-active\': active(), \'ui-grid-sr-only\': (!focus && screenReaderOnly) }" aria-pressed="{{active()}}" tabindex="0" ng-focus="focus=true" ng-blur="focus=false"><i ng-class="icon" aria-hidden="true">&nbsp;</i> {{ name }}</button>'), a.put("ui-grid/uiGridRenderContainer", "<div role=\"grid\" ui-grid-one-bind-id-grid=\"'grid-container'\" class=\"ui-grid-render-container\" ng-style=\"{ 'margin-left': colContainer.getMargin('left') + 'px', 'margin-right': colContainer.getMargin('right') + 'px' }\"><!-- All of these dom elements are replaced in place --><div ui-grid-header></div><div ui-grid-viewport></div><div ng-if=\"colContainer.needsHScrollbarPlaceholder()\" class=\"ui-grid-scrollbar-placeholder\" ng-style=\"{height:colContainer.grid.scrollbarHeight + 'px'}\"></div><ui-grid-footer ng-if=\"grid.options.showColumnFooter\"></ui-grid-footer></div>"), a.put("ui-grid/uiGridViewport", '<div role="rowgroup" class="ui-grid-viewport" ng-style="colContainer.getViewportStyle()"><!-- tbody --><div class="ui-grid-canvas"><div ng-repeat="(rowRenderIndex, row) in rowContainer.renderedRows track by $index" class="ui-grid-row" ng-style="Viewport.rowStyle(rowRenderIndex)"><div role="row" ui-grid-row="row" row-render-index="rowRenderIndex"></div></div></div></div>'), a.put("ui-grid/cellEditor", '<div><form name="inputForm"><input type="INPUT_TYPE" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD"></form></div>'), a.put("ui-grid/dropdownEditor", '<div><form name="inputForm"><select ng-class="\'colt\' + col.uid" ui-grid-edit-dropdown ng-model="MODEL_COL_FIELD" ng-options="field[editDropdownIdLabel] as field[editDropdownValueLabel] CUSTOM_FILTERS for field in editDropdownOptionsArray"></select></form></div>'), a.put("ui-grid/fileChooserEditor", '<div><form name="inputForm"><input ng-class="\'colt\' + col.uid" ui-grid-edit-file-chooser type="file" id="files" name="files[]" ng-model="MODEL_COL_FIELD"></form></div>'), a.put("ui-grid/emptyBaseLayerContainer", '<div class="ui-grid-empty-base-layer-container ui-grid-canvas"><div class="ui-grid-row" ng-repeat="(rowRenderIndex, row) in grid.baseLayer.emptyRows track by $index" ng-style="Viewport.rowStyle(rowRenderIndex)"><div><div><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell {{ col.getColClass(false) }}"></div></div></div></div></div>'), a.put("ui-grid/expandableRow", '<div ui-grid-expandable-row ng-if="expandableRow.shouldRenderExpand()" class="expandableRow" style="float:left; margin-top: 1px; margin-bottom: 1px" ng-style="{width: (grid.renderContainers.body.getCanvasWidth()) + \'px\', height: row.expandedRowHeight + \'px\'}"></div>'), a.put("ui-grid/expandableRowHeader", '<div class="ui-grid-row-header-cell ui-grid-expandable-buttons-cell"><div class="ui-grid-cell-contents"><i ng-if="!row.groupHeader==true" ng-class="{ \'ui-grid-icon-plus-squared\' : !row.isExpanded, \'ui-grid-icon-minus-squared\' : row.isExpanded }" ng-click="grid.api.expandable.toggleRowExpansion(row.entity)"></i></div></div>'), a.put("ui-grid/expandableScrollFiller", "<div ng-if=\"expandableRow.shouldRenderFiller()\" ng-class=\"{scrollFiller:true, scrollFillerClass:(colContainer.name === 'body')}\" ng-style=\"{ width: (grid.getViewportWidth()) + 'px', height: row.expandedRowHeight + 2 + 'px', 'margin-left': grid.options.rowHeader.rowHeaderWidth + 'px' }\"><i class=\"ui-grid-icon-spin5 ui-grid-animate-spin\" ng-style=\"{'margin-top': ( row.expandedRowHeight/2 - 5) + 'px', 'margin-left' : ((grid.getViewportWidth() - grid.options.rowHeader.rowHeaderWidth)/2 - 5) + 'px'}\"></i></div>"), a.put("ui-grid/expandableTopRowHeader", '<div class="ui-grid-row-header-cell ui-grid-expandable-buttons-cell"><div class="ui-grid-cell-contents"><i ng-class="{ \'ui-grid-icon-plus-squared\' : !grid.expandable.expandedAll, \'ui-grid-icon-minus-squared\' : grid.expandable.expandedAll }" ng-click="grid.api.expandable.toggleAllRows()"></i></div></div>'), a.put("ui-grid/csvLink", '<span class="ui-grid-exporter-csv-link-span"><a href="data:text/csv;charset=UTF-8,CSV_CONTENT" download="FILE_NAME">LINK_LABEL</a></span>'), a.put("ui-grid/importerMenuItem", '<li class="ui-grid-menu-item"><form><input class="ui-grid-importer-file-chooser" type="file" id="files" name="files[]"></form></li>'), a.put("ui-grid/importerMenuItemContainer", "<div ui-grid-importer-menu-item></div>"), a.put("ui-grid/pagination", '<div role="contentinfo" class="ui-grid-pager-panel" ui-grid-pager ng-show="grid.options.enablePaginationControls"><div role="navigation" class="ui-grid-pager-container"><div role="menubar" class="ui-grid-pager-control"><button type="button" role="menuitem" class="ui-grid-pager-first" ui-grid-one-bind-title="aria.pageToFirst" ui-grid-one-bind-aria-label="aria.pageToFirst" ng-click="pageFirstPageClick()" ng-disabled="cantPageBackward()"><div ng-class="grid.isRTL() ? \'last-triangle\' : \'first-triangle\'"><div ng-class="grid.isRTL() ? \'last-bar-rtl\' : \'first-bar\'"></div></div></button> <button type="button" role="menuitem" class="ui-grid-pager-previous" ui-grid-one-bind-title="aria.pageBack" ui-grid-one-bind-aria-label="aria.pageBack" ng-click="pagePreviousPageClick()" ng-disabled="cantPageBackward()"><div ng-class="grid.isRTL() ? \'last-triangle prev-triangle\' : \'first-triangle prev-triangle\'"></div></button> <input type="number" ui-grid-one-bind-title="aria.pageSelected" ui-grid-one-bind-aria-label="aria.pageSelected" class="ui-grid-pager-control-input" ng-model="grid.options.paginationCurrentPage" min="1" max="{{ paginationApi.getTotalPages() }}" required> <span class="ui-grid-pager-max-pages-number" ng-show="paginationApi.getTotalPages() > 0"><abbr ui-grid-one-bind-title="paginationOf">/</abbr> {{ paginationApi.getTotalPages() }}</span> <button type="button" role="menuitem" class="ui-grid-pager-next" ui-grid-one-bind-title="aria.pageForward" ui-grid-one-bind-aria-label="aria.pageForward" ng-click="pageNextPageClick()" ng-disabled="cantPageForward()"><div ng-class="grid.isRTL() ? \'first-triangle next-triangle\' : \'last-triangle next-triangle\'"></div></button> <button type="button" role="menuitem" class="ui-grid-pager-last" ui-grid-one-bind-title="aria.pageToLast" ui-grid-one-bind-aria-label="aria.pageToLast" ng-click="pageLastPageClick()" ng-disabled="cantPageToLast()"><div ng-class="grid.isRTL() ? \'first-triangle\' : \'last-triangle\'"><div ng-class="grid.isRTL() ? \'first-bar-rtl\' : \'last-bar\'"></div></div></button></div><div class="ui-grid-pager-row-count-picker" ng-if="grid.options.paginationPageSizes.length > 1 && !grid.options.useCustomPagination"><select ui-grid-one-bind-aria-labelledby-grid="\'items-per-page-label\'" ng-model="grid.options.paginationPageSize" ng-options="o as o for o in grid.options.paginationPageSizes"></select><span ui-grid-one-bind-id-grid="\'items-per-page-label\'" class="ui-grid-pager-row-count-label">&nbsp;{{sizesLabel}}</span></div><span ng-if="grid.options.paginationPageSizes.length <= 1" class="ui-grid-pager-row-count-label">{{grid.options.paginationPageSize}}&nbsp;{{sizesLabel}}</span></div><div class="ui-grid-pager-count-container"><div class="ui-grid-pager-count"><span ng-show="grid.options.totalItems > 0">{{ 1 + paginationApi.getFirstRowIndex() }} <abbr ui-grid-one-bind-title="paginationThrough">-</abbr> {{ 1 + paginationApi.getLastRowIndex() }} {{paginationOf}} {{grid.options.totalItems}} {{totalItemsLabel}}</span></div></div></div>'), a.put("ui-grid/columnResizer", '<div ui-grid-column-resizer ng-if="grid.options.enableColumnResizing" class="ui-grid-column-resizer" col="col" position="right" render-index="renderIndex" unselectable="on"></div>'), a.put("ui-grid/gridFooterSelectedItems", '<span ng-if="grid.selection.selectedCount !== 0 && grid.options.enableFooterTotalSelected">({{"search.selectedItems" | t}} {{grid.selection.selectedCount}})</span>'), a.put("ui-grid/selectionHeaderCell", '<div><!-- <div class="ui-grid-vertical-bar">&nbsp;</div> --><div class="ui-grid-cell-contents" col-index="renderIndex"><ui-grid-selection-select-all-buttons ng-if="grid.options.enableSelectAll"></ui-grid-selection-select-all-buttons></div></div>'), a.put("ui-grid/selectionRowHeader", '<div class="ui-grid-disable-selection"><div class="ui-grid-cell-contents"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div></div>'), a.put("ui-grid/selectionRowHeaderButtons", '<div class="ui-grid-selection-row-header-buttons ui-grid-icon-ok" ng-class="{\'ui-grid-row-selected\': row.isSelected}" ng-click="selectButtonClick(row, $event)">&nbsp;</div>'), a.put("ui-grid/selectionSelectAllButtons", '<div class="ui-grid-selection-row-header-buttons ui-grid-icon-ok" ng-class="{\'ui-grid-all-selected\': grid.selection.selectAll}" ng-click="headerButtonClick($event)"></div>'), a.put("ui-grid/treeBaseExpandAllButtons", '<div class="ui-grid-tree-base-row-header-buttons" ng-class="{\'ui-grid-icon-minus-squared\': grid.treeBase.numberLevels > 0 && grid.treeBase.expandAll, \'ui-grid-icon-plus-squared\': grid.treeBase.numberLevels > 0 && !grid.treeBase.expandAll}" ng-click="headerButtonClick($event)"></div>'), a.put("ui-grid/treeBaseHeaderCell", '<div><div class="ui-grid-cell-contents" col-index="renderIndex"><ui-grid-tree-base-expand-all-buttons ng-if="grid.options.enableExpandAll"></ui-grid-tree-base-expand-all-buttons></div></div>'), a.put("ui-grid/treeBaseRowHeader", '<div class="ui-grid-cell-contents"><ui-grid-tree-base-row-header-buttons></ui-grid-tree-base-row-header-buttons></div>'), a.put("ui-grid/treeBaseRowHeaderButtons", "<div class=\"ui-grid-tree-base-row-header-buttons\" ng-class=\"{'ui-grid-tree-base-header': row.treeLevel > -1 }\" ng-click=\"treeButtonClick(row, $event)\"><i ng-class=\"{'ui-grid-icon-minus-squared': ( ( grid.options.showTreeExpandNoChildren && row.treeLevel > -1 ) || ( row.treeNode.children && row.treeNode.children.length > 0 ) ) && row.treeNode.state === 'expanded', 'ui-grid-icon-plus-squared': ( ( grid.options.showTreeExpandNoChildren && row.treeLevel > -1 ) || ( row.treeNode.children && row.treeNode.children.length > 0 ) ) && row.treeNode.state === 'collapsed'}\" ng-style=\"{'padding-left': grid.options.treeIndent * row.treeLevel + 'px'}\"></i> &nbsp;</div>"), a.put("ui-grid/cellTitleValidator", '<div class="ui-grid-cell-contents" ng-class="{invalid:grid.validate.isInvalid(row.entity,col.colDef)}" title="{{grid.validate.getTitleFormattedErrors(row.entity,col.colDef)}}">{{COL_FIELD CUSTOM_FILTERS}}</div>'), a.put("ui-grid/cellTooltipValidator", '<div class="ui-grid-cell-contents" ng-class="{invalid:grid.validate.isInvalid(row.entity,col.colDef)}" tooltip-html-unsafe="{{grid.validate.getFormattedErrors(row.entity,col.colDef)}}" tooltip-enable="grid.validate.isInvalid(row.entity,col.colDef)" tooltip-append-to-body="true" tooltip-placement="top" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>')
}]);