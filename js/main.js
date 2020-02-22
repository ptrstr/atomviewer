function main() {
	const mass = parseInt(document.getElementById("mass").value);
	const atomicNumber = parseInt(document.getElementById("atomicnumber").value);
	const element = document.getElementById("element").value;

	// Calculate layers
	var layers = [0];

	for (var i = 0, electronsLeft = atomicNumber; i < 7; i++) {
		if (electronsLeft - shellMaximum[i] <= 0) {
			layers[layers.length - 1] = electronsLeft;
			break;
		} else {
			layers[layers.length - 1] = shellMaximum[i];
			layers.push(0);
			electronsLeft -= shellMaximum[i];
		}
	}

	render(atomicNumber, mass - atomicNumber, atomicNumber, element, ...layers);
}