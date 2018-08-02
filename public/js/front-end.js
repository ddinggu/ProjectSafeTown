$(document).ready(function() {
  $("#fallingStars").delay(300).animate({'opacity':'1'},500);
  $("#title").delay(500).animate({'opacity':'1'},800);
  $("#slogan").delay(800).animate({'opacity':'1'},800);

<<<<<<< HEAD
    $('#test').on('click', function(){
        console.log($('.options'));
        if(!$('.options').length){
            var $option1 = $('<div class="options" class="withoutInput" id="option1"><span>인적이<br>드물어요</span></div>'),
                $option2 = $('<div class="options" class="withoutInput" id="option2"><span>어두워요</span></div>'),
                $option3 = $('<div class="options" class="withoutInput" id="option3"><span>사고가<br>난 적<br>있어요</span></div>'),
                $option4 = $('<div class="options" class="withoutInput" id="option4"><span>유흥가에요</span></div>'),
                $option5 = $('<div class="options" class="withInput" id="option5"><span>기타</span></div>');

            $('#test').after($option1);
            $('#test').after($option2);
            $('#test').after($option3);
            $('#test').after($option4);
            $('#test').after($option5);
            
        }
        else {
            $('#option1').remove();
            $('#option2').remove();
            $('#option3').remove();
            $('#option4').remove();
            $('#option5').remove();
        }
    });
});
=======
  $('#test').click(function(){
    // $(".options").fadeToggle();
    $(".options:hidden").fadeIn();
  });

  //redirect loading page(/) to main page(/main) via button event: Gi-baek
  $("body").click(function(){
    window.location = window.location + "main";
  });
});
>>>>>>> 8bf4de4957d9f9756b9a9551467d93ae26d354b0
