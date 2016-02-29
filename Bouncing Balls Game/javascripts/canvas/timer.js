var setTimer = function()
{
	timer++;
	if(timer % 20 === 0)
	{
		var seconds = ("0" + Math.floor((timer/50) % 60).toString()).slice(-2);
		var minutes = ("0" + Math.floor(timer/(60 * 50)).toString()).slice(-2);
		document.getElementById("timer").innerHTML = "Timer :" + minutes + ":" + seconds;
	}
}
