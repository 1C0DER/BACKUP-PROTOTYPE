$(document).ready(function() {

    //this method will select the radio button one way
    $(".index-body").css('background-image','url(/prototype/images/plane.png)');

    // This will hide some elements when the one way radio button is selected
    $('#oneWay').click(function() {
        $('#return-date').hide();
        $('#returning').hide();
        $('#addFlight').hide();
    });

    // This will hide/show some elements when the round trip radio button is selected
    $('#roundTrip').click(function() {

        $('#return-date').show();
        $('#returning').show();
        $('#addFlight').hide();
    })

    // This will hide/show some elements when the multi city radio button is selected
    // The add flight input is already checked in the html
    $('#multiCity').click(function() {
        $('#addFlight').show();
        $('#arrival-date').show();
        $('#returning').show();

    });

    // This will add more return and depart elements to the webpage when the add flight button is clicked
    $('#addFlight').click(function() {
        $('#return').append('<input type="date" class="form-control select-date" >');
        $('#depart').append('<input type="date" class="form-control select-date" >');

    });


    // This method will take effect when the user clicks the check flight button.
    //  these lines of codes contains the ajax call function to the api of goflightlabs.com and will work on
    // the response of the api success return.

    // The variables will be passed from the booking form in the flight.html folder

    $('#check-flight').click(function(e) {
        e.preventDefault();

        //these variables will get the date and format it properly
        var date = new Date($('#departure-date').val());
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var departureDate = [year, month, day].join('-');


        var date2 = new Date($('#return-date').val());
        var day = date2.getDate();
        var month = date2.getMonth() + 1;
        var year = date2.getFullYear();
        var returnDate = [year, month, day].join('-');


        // These variables will get the other inputs by the user
        var departure = $('#flying-from').val();
        var destination = $('#flying-to').val();
        var adult = $('#adult').val();
        var travelClass = $('#cabin').val();
        var credentials = new FormData();

        // These variables will add the search parameter to the url using the search params method
        var url = new URL("https://app.goflightlabs.com/search-all-flights?access_key=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNDJhYTQzMGI2Mzk4MzYwMzQzNjdiNzExNzkzMmNjYTljMGE0MDUyMTNkZmVmYThlNDE5OGEwNzc1MzhjMDViNjk3YWVhNGFkZTllYTI1MmMiLCJpYXQiOjE2NjU2NTk2OTcsIm5iZiI6MTY2NTY1OTY5NywiZXhwIjoxNjk3MTk1Njk3LCJzdWIiOiIxNDk3NCIsInNjb3BlcyI6W119.P4L7kJJzEOQlbGBjYyPMKzP1TP8W9lLjPqrlBxN9igrbHaXx2VConG0ral_3FWmp7QfbOvqRDKBJvfNtKlas3w&adults="+adult);
        url.searchParams.append('origin', departure);
        url.searchParams.append('destination', destination);
        url.searchParams.append('departureDate', departureDate);
        url.searchParams.append('returnDate', returnDate);
        url.searchParams.append('cabinClass', travelClass);
       
        // This is the method used to make the ajax call
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function(response) {
                printResponse(response);

            }
            
        });

        $.ajax({
            type: "method",
            url: "url",
            data: "data",
            dataType: "json",
            success: function (response) {
                console.log(response);
            }
        });
        // This will hide the booking form box when the button is clicked


        // This method will print the json response in the result div in the flight html
        // function printResponse(response) {
        //     var feedback = JSON.stringify(response);
        //     $('#result').append(feedback);
        // }


    });



});