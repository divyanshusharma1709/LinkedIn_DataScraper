document.getElementById("getData").onclick = function(element) {
	// query the current tab to find its id
	chrome.tabs.query({ active: true, currentWindow: true }, function(tab){
		console.log(tab[0].id);
    chrome.scripting.executeScript({
      target: {tabId: tab[0].id},
      function: scrapeData,
    });
	});

};



function scrapeData() {
  var personInfo = document.getElementsByClassName("pv-text-details__left-panel")[0].innerText.split(/\r?\n/);
	console.log(personInfo)
  var firstname = personInfo[0].split(" ")[0];
  var lastname = personInfo[0].split(" ")[1]; //TODO: Add capability to handle middle names
  var job_desc = personInfo[3];
  console.log(firstname);
  console.log(lastname);
  console.log(job_desc);
  var JSON_obj = new Object();
  JSON_obj.first_name = firstname
  JSON_obj.last_name  = lastname;
  JSON_obj.job = job_desc;
  var jsonString= JSON.stringify(JSON_obj);

	alert("Uploaded data for: " + personInfo[0]);
  fetch("https://63c6-122-161-53-223.in.ngrok.io/upload/", {
    method: "POST",
		mode: "no-cors",
    headers: {"Content-Type": "application/json", "Accept": "application/json"},
    body: jsonString
})
    .catch(err => {
        if (err === "server") return
        console.log(err)
    })
		.then(res => {console.log("Response: ", res);
	})
}
