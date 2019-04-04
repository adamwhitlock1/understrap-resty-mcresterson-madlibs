console.log("custom js fo lyfe!");

(function($) {

  let form_fields = [];
  let madlib_unfilled ="";

  // immediately invoked fucntion to hide steps 2 & 3
  (function () {
    $("#step2-row").hide();
    $("#step3-row").hide();
  })();

  $("#gen-story").click(function(){
    $("#start-content").val("It was a windy, cold November day. I woke up to the fragrant smell of bacon cooking in the kitchen. I quickly headed down the stairs to see if I could help my mother with breakfast. My mother asked if I could pour glasses of juice for the whole family. I got cups out and pours everyone some orange juice to go with our bacon and pancakes. We had a great breakfast. After breakfast, the whole family went on a walk around the lake. It started snowing so we headed inside.")
  });

  $("#start").click(function(){
    let story = getStory();
    if (story.length < 10){
      alert("Your story is too shot. Try again");
    } else {
      ajaxSendStory(story);
    }
  })

  function getStory(){
    return $("#start-content").val();
  }

  function ajaxSendStory(story){
    console.log(story);
    $.ajax({
      url: "/wp-json/madlib/v1/gen-fields",
      async: false,
      data: {text: story},
      success: function(data){
        console.log(data);
        loadStep2(data);
      }
    });
  }

  function loadStep2(data){
    renderFormFields(data);
    $("#step1-row").fadeOut();
    setTimeout(function(){
      $("#step2-row").fadeIn();
    },500);
  }

  function renderFormFields(data){
    form_fields = [];
    madlib_unfilled = "";
    data.fields.map((field, index) => {
      $("#step2-inputs").append(`<input type="text" id="${field}_${index}" placeholder="${field}">`);
      form_fields.push(`${field}_${index}`)
    })
    madlib_unfilled = data.madlib;
  }

  function getFormFields(){
    console.log(form_fields);
    let fields = [];
    form_fields.map((field, index) => {
      let val = $("#" + field).val();
      fields.push(val);
    })
    return fields;
  }

  function showFinishedMadlib(data){
    $("#step3-content").append(`
    <hr>
    <h3 class="text-center">Your Finished Madlib</h3>
    <p class="lead text-center">${data.finished_madlib}</p>
    `);
    $("#step2-row").fadeOut();
    setTimeout(()=>{
      $("#step3-row").fadeIn('slow')
    }, 750)
  }

  function ajaxFinishStory(fields){
    $.ajax({
      url: "/wp-json/madlib/v1/finish-madlib",
      async: false,
      data: {madlib: madlib_unfilled, fields: fields },
      success: function(data){
        console.log(data);
        showFinishedMadlib(data)
      }
    });
  }

  $("#gen-completed-madlib").click(()=>{
    ajaxFinishStory(getFormFields());
  })


}(jQuery));
