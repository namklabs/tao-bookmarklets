(function(){

  // the minimum version of jQuery we want
  var v = "1.7.1";

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
      // your JavaScript code goes here!

alert("got into my bookmarklet function wrapper");      
      $.expr[':'].icontains = function(obj, index, meta, stack){
	return (obj.textContent || obj.innerText || jQuery(obj).text() || '').toLowerCase().indexOf(meta[3].toLowerCase()) >= 0;
      };
      
alert("defined icontains");

      delay = (function(){
	var timer = 0;
	return function(callback, ms){
	  clearTimeout (timer);
	  timer = setTimeout(callback, ms);
	};
      })(); 
      
alert("defined delay function");

      $.each( $("select"), function(i, v){
	//change select to multiple, create search box before it:
	$(this).attr("multiple","multiple").before("<input type=\"search\" id=\"select-" + ( $(this).attr("id") == undefined ? $(this).attr("name") : $(this).attr("id") ) + i + "\">");
	//attach keyup function to search box
	var $s = $("#select-" + ( $(this).attr("id") == undefined ? $(this).attr("name") : $(this).attr("id") ) + i);
	$s.keyup(
	  function(){
	    $(this).next("select").find("option").show();
	    $(this).next("select").find("option:not(:icontains('" + $(this).val() + "'))").hide();
	  }
	  );
      }); //end $.each()
    })(); //end window.myBookmarklet()
  } //end initMyBookmarklet()

})();
