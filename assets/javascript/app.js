//varible array for the 10 sports 
var topics = ["baseball", "football", "hockey", "soccer", "basketball", "volleyball", "golf", "tennis", "boxing", "rugby"];

//AJAX Variables
var APIKEY = "dc6zaTOxFJmzC";
var topicSelected = "";

//generate buttons from array
function renderButtons() {
    $('.buttons').empty();
    for (i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topics");
        a.attr("value", topics[i]);
        a.html(topics[i]);
        $('.buttons').append(a);
    };
};
renderButtons();
GIFAssign();
// Add Functionality to Push to Array
$("#add-gif").click(function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();
    var newGif = $("#gif-input").val().trim().toLowerCase();
    topics.push(newGif);

    $('#gif-input').val("");
    renderButtons();
    GIFAssign();
});




//Add AJAX display to button array
function GIFAssign() {
    $('.topics').click(function() {
        topicSelected = $(this).attr("value");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topicSelected + "&api_key=" + APIKEY;
        // console.log(topicSelected);

        //Display AJAX from GIPHY
        $.ajax({
            url: queryURL,
            method: "GET"

        }).done(function(response) {
            /*console.log(response);*/

            //grabs GIF div and empties it
            $(".GIF").empty();

            //for loop to generate 12 GIFs
            for (var i = 0; i < 12; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("gif-div");
                var pRating = $("<p>").text("Rating: " + response.data[i].rating);
                var imageGIF = $("<img>");
                imageGIF.attr("data-animate", response.data[i].images.downsized.url);
                imageGIF.attr("data-still", response.data[i].images.downsized_still.url);
                imageGIF.attr("gif-state", "animate");
                imageGIF.attr("src", response.data[i].images.downsized.url)
                imageGIF.addClass("gif");
                gifDiv.append(imageGIF);
                gifDiv.append(pRating);
                $(".GIF").append(gifDiv);
            };

            //Add the pause and start functionallty
            $(".gif").on("click", function() {
                var state = $(this).attr("gif-state");
                if (state === "animate") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("gif-state", "still");
                } else {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("gif-state", "animate");
                    console.log(this);
                }
            });
        });
    });

}
