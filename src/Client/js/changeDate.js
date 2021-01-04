function changeDate(date) {
	console.log(date)
	let utcSeconds = date;
	let d = new Date(0);
	d.setUTCSeconds(utcSeconds);
	let array = d.toString().split(' ');
	let dateArray = [];
	// for (let i = 0; i < array.length; i++){
	//     console.log(array[i], i)
	// }
	dateArray = array.slice(1, 4);
	
	return dateArray.toString(' ');
	// return time
}

export {changeDate}