// 1. Before you can make any part of our site work, you need to create an array of strings, 
// each one related to a topic that interests you. Save it to a variable called `topics`. 
//    * You can make a list to your own liking.

// theme: gif stickers with friends

var topics = ["tgif", "coffee?", "hey", "good night",
				"brunch", "brb", "sweet", "thumbs up",
				"cool", "sorry", "oh really"];

// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.

function renderButtons() {
	$("#buttons-view").empty();

	for (var i = 0; i < topics.length; i++) {
		var b = $("<button>");
		b.addClass("gif");
		b.attr("data-name", topics[i]);
		b.text(topics[i]);
		$("#buttons-view").append(b);
	}
}

renderButtons();

// 3. When the user clicks on a button, the page should grab 10 static,
// non-animated gif images from the GIPHY API and place them on the page. 

function displayGif() {
	$("button").on("click", function(event) {
		$("#gif-view").empty();
		var gifbutton = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        gifbutton + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			// $("#gif-view").html(JSON.stringify(response));
			var results = response.data; //still		

			for (var j = 0; j < results.length; j++) {
				var gifDiv = $("<div class='oneResult'>");
				var still = response.data[j].images.original_still.url;
				var animate = response.data[j].images.original.url;
				var gifImage = $("<img>");
				var rating = results[j].rating
				var p = $("<p>").html("<class='rating'> Rating: " + rating);

				gifImage.attr("class", "item");
				gifImage.attr("src", still);
				gifImage.attr("data-still", still);
				gifImage.attr("data-animate", animate);
				gifImage.attr("data-state", "still");

				console.log("test");
				// gifDiv.prepend(p);
				gifDiv.prepend(p);
				gifDiv.prepend(gifImage);
				$("#gif-view").prepend(gifDiv);
			}
		});
	});
}
displayGif();


// 4. When the user clicks one of the still GIPHY images,
// the gif should animate. If the user clicks the gif again, it should stop playing.

$(document).on("click", ".item", function() {

	var state = $(this).attr("data-state");

	console.log("hi");

	if (state === "still") {
		var newSrc = $(this).attr("data-animate");
		$(this).attr('src', newSrc);
		$(this).attr('data-state', 'animate');
	} else {
		var newSrc = $(this).attr("data-still");
		$(this).attr('src', newSrc);
		$(this).attr('data-state', 'still');
	}

});

// 5. Under every gif, display its rating (PG, G, so on). <-- done
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses
//    should you move on to the next step.

// 6. Add a form to your page takes the value from a user input box
// and adds it into your `topics` array. Then make a function call that takes
// each topic in the array remakes the buttons on the page.
$(document).on("click", "#add-gif", function(event) {
	event.preventDefault();
	console.log("hi");

	var gif = $("#gif-input").val().trim().toLowerCase();

	console.log(gif);

	if (!topics.includes(gif)) {
		topics.push(gif);
	};
	$("#gif-input").empty();
	renderButtons();
	displayGif();
});

