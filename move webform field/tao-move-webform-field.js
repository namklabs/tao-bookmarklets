// this script will automatically move items in tao lists for you. here's how it works:
// you click on the menu item that you want to move. jQuery will get the item id.
// The bookmarklet then opens a new window as a child of the current window. this window has a box for the id that is prepopulated.
// There are also 2 buttons - promote and demote. When you click one or the other, the script will operate on the parent window and create a click event
// on that page.
//
// If the click event doesn't work, then we can do a window.location to the proper URL for that page.
//
// It could also have an auto field where you tell it how many positions to move it and it will use setTimeOut to make a request, wait for the new page to load,
// and then make another request.

(function () {
    var d = "1.7.2";
    if (window.jQuery === undefined || window.jQuery.fn.jquery < d) {
        var a = false;
        var c = document.createElement("script");
        c.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + d + "/jquery.min.js";
        c.onload = c.onreadystatechange = function () {
            if (!a && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                a = true;
                b()
            }
        };
        document.getElementsByTagName("head")[0].appendChild(c)
    } else {
        b()
    }
    function e(f) {
        var h = {};
        var g = f.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (i, j, k) {
            h[j] = k
        });
        return h
    }
    function b() {
        (window.myBookmarklet = function () {
            var g, k, f, j, i;
            $("a[href*=zorder]").css({
                "background-color": "#FF0000",
                "background-image": "none",
                "margin-right": "-2px"
            });
            alert("Click the red box the for the object you wish to move.");
            $(document).click(function (h) {
                g = h.target.href;
                i = e(g)["zorder"];
                if (/move.php/i.test(g)) {
                    f = "menu";
                    k = e(g)["menuitem_id"];
                    j = e(g)["menu_id"]
                } else {
                    if (/manageopts.php/i.test(g)) {
                        f = "webform";
                        k = e(g)["target"];
                        j = e(g)["form_id"]
                    } else {
                        alert("Incorrect Link Clicked! Please try running the bookmarklet again.");
                        window.location.reload();
                        return false;
                        throw new Error()
                    }
                }
                window.open("/?id=311&item=" + k + "&type=" + f + "&fid=" + j + "&z=" + i, "taomoveitem", "width=215,height=50");
                return false
            })
        })()
    }
})();