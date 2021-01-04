const postData = async (url = '/addData', data = {}) => {
	const response = await fetch('http://localhost:3200/addData', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	try {
		const projectData = await response.json();
		
        //sunsetCheck(changeTime(), projectData)
		//updateFrontend(projectData);
		console.log(projectData, 'this is new data');
		return projectData
	} catch (error) {
		console.log(error, 'error');
	
	}
};

export {postData}