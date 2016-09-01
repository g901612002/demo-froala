/*!
 * froala_editor v2.0.0 (https://www.froala.com/wysiwyg-editor/v2.0)
 * License http://editor.froala.com/license
 * Copyright 2014-2015 Froala Labs
 */
! function(a) {
    "use strict";
    a.extend(a.FroalaEditor.DEFAULTS, {
        paragraphFormat: {
            N: "Normal",
            H1: "Heading 1",
            H2: "Heading 2",
            H3: "Heading 3",
            H4: "Heading 4",
            PRE: "Code"
        },
        paragraphFormatSelection: !1
    }), a.FroalaEditor.PLUGINS.paragraphFormat = function(b) {
        function c(c, d) {
            var e = b.html.defaultTag();
            if (d && d.toLowerCase() != e)
                if (c.find("ul, ol").length > 0) {
                    var f = a("<" + d + ">");
                    c.prepend(f);
                    for (var g = b.node.contents(c.get(0))[0]; g && ["UL", "OL"].indexOf(g.tagName) < 0;) {
                        var h = g.nextSibling;
                        f.append(g), g = h
                    }
                } else c.html("<" + d + ">" + c.html() + "</" + d + ">")
        }

        function d(c, d) {
            var e = b.html.defaultTag();
            d || (d = 'div class="fr-temp-div" data-empty="true"'), d.toLowerCase() == e ? c.replaceWith(c.html()) : c.replaceWith(a("<" + d + ">").html(c.html()))
        }

        function e(c, d) {
            var e = b.html.defaultTag();
            d || (d = 'div class="fr-temp-div"' + (b.node.isEmpty(c.get(0), !0) ? ' data-empty="true"' : "")), d.toLowerCase() == e ? (b.node.isEmpty(c.get(0), !0) || c.append("<br/>"), c.replaceWith(c.html())) : c.replaceWith(a("<" + d + ">").html(c.html()))
        }

        function f(c, d) {
            d || (d = 'div class="fr-temp-div"' + (b.node.isEmpty(c.get(0), !0) ? ' data-empty="true"' : "")), c.replaceWith(a("<" + d + " " + b.node.attributes(c.get(0)) + ">").html(c.html()))
        }

        function g(g) {
            "N" == g && (g = b.html.defaultTag()), b.selection.save(), b.html.wrap(!0, !0, !0), b.selection.restore();
            var h = b.selection.blocks();
            b.selection.save(), b.$el.find("pre").attr("skip", !0);
            for (var i = 0; i < h.length; i++)
                if (h[i].tagName != g) {
                    var j = a(h[i]);
                    "LI" == h[i].tagName ? c(j, g) : "LI" == h[i].parentNode.tagName ? d(j, g) : ["TD", "TH"].indexOf(h[i].parentNode.tagName) >= 0 ? e(j, g) : f(j, g)
                }
            b.$el.find('pre:not([skip="true"]) + pre:not([skip="true"])').each(function() {
                a(this).prev().append("<br>" + a(this).html()), a(this).remove()
            }), b.$el.find("pre").removeAttr("skip"), b.html.unwrap(), b.selection.restore()
        }

        function h(a, c) {
            var d = b.selection.blocks();
            if (d.length) {
                var e = d[0],
                    f = "N",
                    g = b.html.defaultTag();
                e.tagName.toLowerCase() != g && e != b.$el.get(0) && (f = e.tagName), c.find('.fr-command[data-param1="' + f + '"]').addClass("fr-active")
            } else c.find('.fr-command[data-param1="N"]').addClass("fr-active")
        }

        function i(a, c) {
            var d = b.selection.blocks();
            if (d.length) {
                var e = d[0],
                    f = "N",
                    g = b.html.defaultTag();
                e.tagName.toLowerCase() != g && e != b.$el.get(0) && (f = e.tagName), ["LI", "TD", "TH"].indexOf(f) >= 0 && (f = "N"), a.find("> span").text(c.find('.fr-command[data-param1="' + f + '"]').text())
            } else a.find("> span").text(c.find('.fr-command[data-param1="N"]').text())
        }
        return {
            apply: g,
            refreshOnShow: h,
            refresh: i
        }
    }, a.FroalaEditor.RegisterCommand("paragraphFormat", {
        type: "dropdown",
        displaySelection: function(a) {
            return a.opts.paragraphFormatSelection
        },
        defaultSelection: "Normal",
        displaySelectionWidth: 100,
        html: function() {
            var a = '<ul class="fr-dropdown-list">',
                b = this.opts.paragraphFormat;
            for (var c in b) a += "<li><" + c + ' style="padding: 0 !important; margin: 0 !important;"><a class="fr-command" data-cmd="paragraphFormat" data-param1="' + c + '" title="' + this.language.translate(b[c]) + '">' + this.language.translate(b[c]) + "</a></" + c + "></li>";
            return a += "</ul>"
        },
        title: "Paragraph Format",
        callback: function(a, b) {
            this.paragraphFormat.apply(b)
        },
        refresh: function(a, b) {
            this.paragraphFormat.refresh(a, b)
        },
        refreshOnShow: function(a, b) {
            this.paragraphFormat.refreshOnShow(a, b)
        }
    }), a.FroalaEditor.DefineIcon("paragraphFormat", {
        NAME: "paragraph"
    })
}(jQuery);