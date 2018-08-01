$(document).ready(function() {
    $("#fallingStars").delay(300).animate({'opacity':'1'},500);
    $("#title").delay(500).animate({'opacity':'1'},800);
    $("#slogan").delay(800).animate({'opacity':'1'},800);

    $('#test').click(function(){
        // $(".options").fadeToggle();
        $(".options:hidden").fadeIn();
    });
});