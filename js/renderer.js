function renderRutherfordBohr(protons, ...layers) {
	var c = document.getElementById("rutherfordBohrCanvas");
	var ctx = c.getContext("2d");

	ctx.fillStyle = "#0A0A0A";
	ctx.fillRect(0, 0, c.width, c.height);

	// Draw core
	var sizeMedian = ((c.width + c.height) / 2);
	var coreRadius = sizeMedian / 20;

	ctx.beginPath();
	ctx.arc(c.width/2, c.height/2, coreRadius, 0, 2 * Math.PI);
	ctx.fillStyle = "#FF0000";
	ctx.fill(); 

	// Draw core text
	ctx.font = "20px Arial";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(protons.toString() + "+", (c.width/2) - (coreRadius/2), (c.height/2) + (coreRadius/2), coreRadius);

	for (var i = 0; i < layers.length; i++) {
		// Draw ring around core
		ctx.beginPath();
		ctx.arc(c.width/2, c.height/2, coreRadius * (i+2), 0, 2 * Math.PI);
		ctx.strokeStyle = "#C2C5CC";
		ctx.lineWidth = sizeMedian/80;
		ctx.stroke();

		
		// Draw electrons
		for (var j = 0; j < layers[i]; j++) {
			dividend = 2;
			if (layers[i] == 2) {
				dividend = 1;
			}

			var degree = (360 / (shellMaximum[i] / dividend)) * j;
			if (j >= shellMaximum[i] / 2 && i != 0) {
				degree += 10; 
			}
			var coordinate = deg2vec(degree, coreRadius * (i+2));
			ctx.beginPath();
			ctx.arc((c.width/2) + coordinate[0], (c.height/2) - coordinate[1], sizeMedian/80, 0, 2 * Math.PI);
			ctx.fillStyle = "#FFFF00";
			ctx.fill();
		}
	}

	// Draw name text
	ctx.font = "30px Arial";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Rutherford-Bohr Model", 0, 30, c.width);
}

function renderSimplified(protons, neutrons, ...layers) {
	var c = document.getElementById("simplifiedCanvas");
	var ctx = c.getContext("2d");

	ctx.fillStyle = "#0A0A0A";
	ctx.fillRect(0, 0, c.width, c.height);

	// Draw core
	var sizeMedian = ((c.width + c.height) / 2);
	var coreRadius = sizeMedian / 16;

	ctx.beginPath();
	ctx.arc(coreRadius*2, c.height/2, coreRadius, 0, 2 * Math.PI);
	ctx.fillStyle = "#FF0000";
	ctx.fill(); 

	// Draw core text
	ctx.font = "20px Arial";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(protons.toString() + "p" + String.fromCharCode(parseInt('207a', 16)), coreRadius*1.5, (c.height/2) - (coreRadius/4), coreRadius);
	ctx.fillText(neutrons.toString() + "n", coreRadius*1.5, (c.height/2) + (coreRadius/2), coreRadius);

	for (var i = 0; i < layers.length; i++) {
		// Draw ring
		var degree = 25;

		ctx.beginPath();
		ctx.arc(coreRadius, c.height/2, coreRadius * (i+2) * 1.5, -1 *(degree * Math.PI) / 180, (degree * Math.PI) / 180);
		ctx.strokeStyle = "#C2C5CC";
		ctx.lineWidth = sizeMedian/80;
		ctx.stroke();

		// Draw electron text
		ctx.font = "20px Arial";
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText(layers[i].toString() + "e" + String.fromCharCode(parseInt('207b', 16)), coreRadius + (coreRadius * (i+2) * 1.5) + (c.width / 80), c.height/2, (coreRadius * (i+3)) - (coreRadius * (i+2)));
	
		// Draw layer number
		var coordinates = deg2vec(degree, coreRadius * (i+2) * 1.5);
		ctx.font = "20px Arial";
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText((i+1).toString(), coreRadius + coordinates[0], (c.height/2) - coordinates[1]);
	}

	// Draw name text
	ctx.font = "30px Arial";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Simplified Model", 0, 30, c.width);
}

function renderLewis(element, ...layers) {
	var c = document.getElementById("lewisCanvas");
	var ctx = c.getContext("2d");

	ctx.fillStyle = "#0A0A0A";
	ctx.fillRect(0, 0, c.width, c.height);

	// Draw core text
	var textSize = c.width/(8/3);
	ctx.font = textSize.toString() + "px Arial";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(element, (c.width/2) - (textSize/2), (c.height/2) + (textSize/3), textSize);

	// Draw dots
	var slots = [
		[(c.width/2) - (textSize/4), (c.height/2) - textSize],
		[(c.width/2) + textSize, (c.height/2) - (textSize/4)],
		[(c.width/2) + (textSize/4), (c.height/2) + textSize],
		[(c.width/2) - textSize, (c.height/2) + (textSize/4)],
		[(c.width/2) + (textSize/4), (c.height/2) - textSize],
		[(c.width/2) + textSize, (c.height/2) + (textSize/4)],
		[(c.width/2) - (textSize/4), (c.height/2) + textSize],
		[(c.width/2) - textSize, (c.height/2) - (textSize/4)]
	];

	var colors = [
		"#BDD769",
		"#B9F3E5",
		"#A6E0F8",
		"#8881AD",
		"#9479A2",
		"#F58EAC",
		"#F88775",
		"#FFDB76"
	]

	for (var i = 0; i < layers[layers.length - 1] && i < 8; i++) {
		ctx.beginPath();
		ctx.arc(slots[i][0], slots[i][1], c.width/25, 0, Math.PI * 2);
		ctx.fillStyle = colors[layers[layers.length - 1] < 8 ? layers[layers.length - 1] - 1 : 7];
		ctx.fill();
	}

	// Draw name text
	ctx.font = "30px Arial";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Lewis Model", 0, 30, c.width);
}


function render(protons, neutrons, electrons, element, ...layers) {
	document.getElementById("renders").innerHTML = "<canvas id=\"rutherfordBohrCanvas\" width=\"400\" height=\"400\"></canvas><canvas id=\"simplifiedCanvas\" width=\"400\" height=\"400\"></canvas><canvas id=\"lewisCanvas\" width=\"400\" height=\"400\"></canvas>";
	renderRutherfordBohr(protons, ...layers);
	renderSimplified(protons, neutrons, ...layers);
	renderLewis(element, ...layers);
}
