(function(){
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
//

  // the minimum version of jQuery we want
  var v = "1.7.2";

  // check prior inclusion and version
  if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
    var done = false;
    var script = document.createElement("script");
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
    script.onload = script.onreadystatechange = function(){
      if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
        done = true;
        initMyBookmarklet();
      }
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    initMyBookmarklet();
  }

  function initMyBookmarklet() {
    (window.myBookmarklet = function() {

    var h;
    var hArray = [];
    var id;
    $("a[href*=editmenuitem]").css({"background-color":"#59ff80"});
    alert("Click the link you want to move.");
    $(document).click(function(t){
      h = t.target.href;
      hArray = h.split('=');
      id = hArray[hArray.length - 1];
      window.open("/?id=273&item="+id,"taomoveitem");
      return false;
    });
      
      // your JavaScript code goes here!
    })();
  }

})();
