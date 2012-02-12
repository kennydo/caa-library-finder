var drives = {
	'a': {
		'name': 'a',
		'filename': 'drives/a.json',
		'list-id': 'drive-a'
	},
	'b': {
		'name': 'b',
		'filename': 'drives/b.json',
		'list-id': 'drive-b'
	},
	'c': {
		'name': 'c',
		'filename': 'drives/c.json',
		'list-id': 'drive-c'
	}
};

var animeLocations = Array();
var animeTitles = Array();

function driveListContainsAnime(drive, title){
	var ret = false;
	$(document.getElementById(drives[drive]["list-id"])).children("li").each(function(){
		$(this).children("div").first().children("span").each(function(){
			if($(this).text() == title){
				ret = true;
			}
		});
	});
	return ret;
}

function addAnimeToDrive(title){
	if(animeTitles.indexOf(title) != -1){
		var drive = animeLocations[title];

		var driveList = $(document.getElementById(drives[drive]["list-id"]));
		if(driveListContainsAnime(drive, title)){
			console.log("Anime title {" + title + "} already exists in list {" + drive + "}");
		} else {
			console.log("Adding anime title " + title);
			driveList.append(
					$(document.createElement("li")).append(
						$(document.createElement("div")).addClass("alert alert-info").append(
							$(document.createElement("a")).addClass("close").attr("data-dismiss", "alert").html("&times;")
						).append(
							$(document.createElement("span")).text(title)	
						)
					)
			);
		}

		return true;
	} else {
		console.log("" + title + " wasn't in the list of anime titles");
	}
	return false;
}

function refreshDriveJson(drive){
	$.getJSON(drive["filename"], {}, function(data){
		for(var i in data){
			var animeTitle = data[i];
			animeTitles.push(animeTitle);
			animeLocations[animeTitle] = drive["name"];
		}
		$('#animeSearch').typeahead({
			source: animeTitles
		});
		console.log("Finished drive: " + drive["name"]);
	});
}

$(document).ready(function(){
	$("#animeSearch").attr("autocomplete", "off");

	for(var d in drives){
		var drive = drives[d];
		console.log("Initiating drive: " + drive["name"]);
		refreshDriveJson(drive);
	}

	$("#addAnimeButton").click(function(){
		var animeTitle = $("#animeSearch").val();
		$("#animeSearch").val("");
		addAnimeToDrive(animeTitle);
	});
});