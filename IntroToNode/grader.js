function average(scores){
	var sum = 0;
	for(var i = 0; i<scores.length; i++){
		sum += scores[i];
	}
	console.log(Math.round(sum/scores.length));
}

var num = [90, 98, 89, 100, 100, 86, 94];
average(num);

var num2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
average(num2);
