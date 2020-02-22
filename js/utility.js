const shellMaximum = [2, 8, 8, 18, 18, 32, 32];

function deg2vec(degree, radius) {
	var vector = new Array();
	vector[0] = radius * Math.sin(((90 - degree) * Math.PI) / 180);
	vector[1] = radius * Math.sin((degree * Math.PI) / 180);
	return vector;
}