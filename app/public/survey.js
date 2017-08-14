    var config = {
      '.chosen-select'           : {},
      '.chosen-select-deselect'  : {allow_single_deselect:true},
      '.chosen-select-no-single' : {disable_search_threshold:10},
      '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
      '.chosen-select-width'     : {width:"95%"}
    }
    for (var selector in config) {
      $(selector).chosen(config[selector]);
    }

    $(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function imageIsLoaded(img) {
    $('#userImg').attr('src', img.target.result);
    $('#userImg').attr('hidden', false);
};



    // Capture the form inputs 
    $("#submit").on("click", function(){

    	// Form validation
    	function validateForm() {
		  var isValid = true;

		  
		   if ($("#name").val() === '') {
		        isValid = false;
		    	console.log("forms are: " + isValid);
		  	};

		   if ($("#photo").val() && $("#imgUpload").val()) {
		        isValid = false;
		        console.log("pic and photo are: " + isValid);
		    };

		    if ($("#photo").val() === '' && $("#imgUpload").val() === '') {
		        isValid = false;
		        console.log("pic and photo are: " + isValid);
		    };

		  $('.chosen-select').each(function() {
		  	if( $(this).val() === "")
		  		isValid = false;
		  		console.log("chosen selects are: " + isValid);
		  });

		  return isValid;
		}

		// If all required fields are filled
		if (validateForm() == true) {
			// Create an object for the user's data
	    	var userData = {
	    		name: $("#name").val().trim(),
	    		photo: $("#photo").val().trim() || $("#userImg").attr('src'),
	    		scores: [$("#q1").val().trim(), $("#q2").val().trim(), $("#q3").val().trim(), $("#q4").val().trim(), $("#q5").val().trim(), $("#q6").val().trim(), $("#q7").val().trim(), $("#q8").val().trim(), $("#q9").val().trim(), $("#q10").val().trim()]
	    	}

	    	console.log(userData);

	    	// Grab the URL of the website
	    	var currentURL = window.location.origin;

	    	// AJAX post the data to the friends API. 
	    	$.post(currentURL + "/api/house", userData, function(data){

	    		// Grab the result from the AJAX post so that the best match's name and photo are displayed.
	    		$("#matchName").text("Sir " + userData.name + " belongs in " + data.name);
	    		$("#inputImg").attr("src", userData.photo);
	    		$('#matchImg').attr("src", data.photo);

		    	// Show the modal with the best match 
		    	$("#resultsModal").modal('toggle');

	    	});
	    	

		}

		else
		{
			alert("Please fill out all fields and upload a link or image before submitting!");
			// $('#userImg').attr('hidden', true);
			// $('#userImg').attr('src', "#");
		}
    		// $(".form-control").val('');
	    	// $(".chosen-select").val('').trigger('chosen:updated');
    	return false;
    });