// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var container = document.getElementsByClassName("image-container");
var modalImg = document.getElementById("img01");
var caption = document.getElementById("caption");

function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}

$(".image-container").click(function (){
	var project_description;
   modal.style.display = "block";
   modalImg.src = this.childNodes[1].src;
   switch(getKeyByValue(container, this)) {
		case '0':
			project_description = $("#desc14");
			break;
		case '1':
			project_description = $("#desc13");
			break;
		case '2':
			project_description = $("#desc12");
			break;
		case '3':
			project_description = $("#desc11");
			break;
		case '4':
			project_description = $("#desc10");
			break;
		case '5':
			project_description = $("#desc09");
			break;
        case '6':
			project_description = $("#desc08");
			break;
        case '7':
			project_description = $("#desc07");
			break;
        case '8':
			project_description = $("#desc06");
			break;
        case '9':
			project_description = $("#desc05");
			break;
        case '10':
			project_description = $("#desc04");
			break;
        case '11':
			project_description = $("#desc03");
			break;
        case '12':
			project_description = $("#desc02");
			break;
        case '13':
			project_description = $("#desc01");
			break;
		default:
			break;
   }
   $("#caption").html(project_description.html());
});

// When the user clicks on (x), close the modal
$(".close").click(function () { 
    modal.style.display = "none";
});

$("#myModal").click(function (event) {
	if (event.target.id == "myModal"){
		modal.style.display = "none";
	}
});