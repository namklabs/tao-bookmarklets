(function(){

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
      $("table.main-border table .tablehead td").eq(1).after("<td>ID</td>");
      $.each( $("table.main-border table tr td a[href^='editor.php?wpid=']").not(".icon"), function(){
        var link = $(this).attr("href");
        var id = /\d{1,10}$/.exec(link);
        $(this).parent().after("<td>" + id + "</td>");
      });
    })();
  }

})();