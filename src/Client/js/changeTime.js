function changeTime(projectData) {
	console.log('change time is getting called', projectData);
	let timeArray = [];
	let utcSeconds = projectData;
	let d = new Date(0);
	d.setUTCSeconds(utcSeconds);
	let array = d.toString().split(' ');
    dateTime = array.slice(4, 5).toString();
    let time = ''
	for (let i = 0; i < dateTime.length; i++) {
		if (i < 5) {
			timeArray.push(dateTime[i]);
		}
    }
    let last;
    if (timeArray[1] >= 2){
        time = " PM"
        if (timeArray[1] > 2){
            last = parseInt(timeArray.slice(0,2).join(""))
            last = Math.abs(last -12)
            timeArray[0] = 0
            timeArray[1] = last
            timeArray.slice(1,4)
        }
        
    } else {
        time = ' AM'
    }
    
    return timeArray.join('')+ time;
    
}

export {changeTime}