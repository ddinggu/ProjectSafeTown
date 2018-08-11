$(document).ready(function(){
  $("#menuIcon").click(function(){
    /*$("#sideNav")[0].classList.toggle("visible");*/
     $("#sideNav")[0].style.width = "250px";
  });
  $("#closeBtn").click(function(){
    $("#sideNav")[0].style.width = 0;
  })

  // 경진 - testing
  $('.navMenu').click(function(){
    $('#userform').css('z-index','101');
  })
});
