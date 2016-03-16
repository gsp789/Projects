var workorderform;
var disableGetLocation = function(worklocationbutton) {
	var getlocationbutton = worklocationbutton;
	getlocationbutton.disabled = true;
	getlocationbutton.innerHTML = "Retrieving your location...";	
}

var clearErrorMessage = function(errordisplay) {
	errordisplay.value = "";
}

var clearLocationOnError = function(updateWorkLocationHidden, updateWorkLocationOutput) {
	updateWorkLocationHidden.value = "";
	updateWorkLocationOutput.value = "";
}

var enableGetLocation = function(worklocationbutton) {
	var getlocationbutton = worklocationbutton;
	getlocationbutton.innerHTML = "Get Location";
	getlocationbutton.disabled = false;
}

var getLocation = function(workLocationObj, updateWorkLocationHidden, updateWorkLocationOutput) {
	var latitude = workLocationObj.coords.latitude;
	var longitude = workLocationObj.coords.longitude;
	var altitude = workLocationObj.coords.altitude === null ? 0 : workLocationObj.coords.altitude;
	
	var location = "Latitude : " + latitude +", Longitude : " + longitude + ", Altitude : " + altitude;
	
	updateWorkLocationHidden.value = location;
	updateWorkLocationOutput.value = location;
}

var getLocationError = function(error, errordisplay) {
	var errorMessage = ['', 'Permission denied', 'Position unavailable'];
	errordisplay.value = "error receiving location info: " + errorMessage[error.code];
}

var emptycallBack = function(){return true;}

var getWorkLocation = function(navigator, worklocationbutton, updateWorkLocationHidden, updateWorkLocationOutput, errordisplay) {
	
	disableGetLocation(worklocationbutton);
	
	clearErrorMessage(errordisplay);
	
	callWorkLocationAPI(navigator, worklocationbutton, updateWorkLocationHidden, updateWorkLocationOutput, errordisplay, emptycallBack);
}

var callWorkLocationAPI = function(navigator, worklocationbutton, updateWorkLocationHidden, updateWorkLocationOutput, errordisplay, callback) {
	
	var getWorkLocations = function(workLocationObj) {
		getLocation(workLocationObj, updateWorkLocationHidden, updateWorkLocationOutput);
		enableGetLocation(worklocationbutton);
		callback();
	}
	var getWorkLocationError = function(error) {
		getLocationError(error, errordisplay);
		clearLocationOnError(updateWorkLocationHidden, updateWorkLocationOutput);
		enableGetLocation(worklocationbutton);
		callback();
	}
	
	navigator.geolocation.getCurrentPosition(getWorkLocations, getWorkLocationError);
}

var invokeSendToServer = function() {
	readFromLocalStorageAndSendToServer(workorderform, localStorage, jQuery);
}

var invokeResetForm = function() {
	resetForm(workorderform, 'Data successfully saved locally');
	return false;
}

var storeCreatorName = function(workorderform, localStorage) {
	localStorage.creatorName = workorderform.creatorname.value;
}

var populateCreatorName = function(workorderform) {
	if(localStorage.creatorName !== undefined) {
		workorderform.creatorname.value = localStorage.creatorName;
	} else {
		workorderform.creatorname.value = '';
		localStorage.creatorName = '';
	}
}

var clearLocalStorage = function() {
	var creatorName = localStorage.creatorName;
	localStorage.clear();
	localStorage.creatorName = creatorName;
}

var clearLocalStorageDisplayMessage = function() {
	clearLocalStorage();
	saveWorkOrderMessage(workorderform, 'Locally stored previous data successfully sent to server', setTimeout);
}

var sendToServerOnPageLoad = function(workorderform, wojson, jQuery) {
	jQuery.ajax({
		type: 'POST',
		url: "http://localhost:3000/create",
		crossDomain: true,
		contentType: "application/json",
		processData: false,
		data: JSON.stringify(wojson),
		success: clearLocalStorageDisplayMessage
	});
}

var invokeSendToServerOnPageLoad = function() {
	var wojson = readFromLocalStorage(localStorage);
	if(wojson.wo.length !== 0)
		sendToServerOnPageLoad(workorderform, wojson, jQuery);
	else
		return false;
}

var checkIfConnected = function(theworkorderform, localStorage, jQuery) {	
	workorderform = theworkorderform;
	jQuery.ajax({
		type: "POST",
		url: "/?q=" + Math.random(),
		success: invokeSendToServerOnPageLoad
	});
}

var invokeIfConnected = function(workorderform, localStorage, jQuery) {	
	jQuery.ajax({
		type: "POST",
		url: "/?q=" + Math.random(),
		success: invokeSendToServer,
		error: invokeResetForm	
	});
}

var readFormData = function(workorderform) {
	var workorder = {};
	var workdescription = workorderform.workdescription.value;
	var worklocation = workorderform.worklocation.value;
	var creationdate = workorderform.creationdate.value;
	var creatorname = workorderform.creatorname.value;
	var severity = workorderform.severity.value;
	workorder = {
		workdescription: workdescription, 
		worklocation: worklocation, 
		creationdate: creationdate, 
		creatorname: creatorname,
		severity: severity
	};
	
	return workorder;
}

var storeLocally = function(workorderform, localStorage) {
	var workorder = readFormData(workorderform);	
	var workordercount = parseInt(localStorage.workordercount) + 1 || 0;

	localStorage['workorder' + workordercount] = JSON.stringify(workorder);
	localStorage.workordercount = workordercount;
	storeCreatorName(workorderform, localStorage);
}

var readFromLocalStorage = function(localStorage) {
	var workorders = [];
	var wojson = {};
	for(var i = 0; i <= localStorage.workordercount; i++) {
		workorders[i] = localStorage['workorder' + i];
	}
	wojson = {wo: workorders};
	return wojson;
}

var clearLocalStorageAndResetForm = function() {
	clearLocalStorage();
	resetForm(workorderform, 'Data successfully saved on server');
}

var sendToServer = function(workorderform, wojson, jQuery) {
	jQuery.ajax({
    type: 'POST',
    url: "http://localhost:3000/create",
	crossDomain: true,
	contentType: "application/json",
	processData: false,
    data: JSON.stringify(wojson),
    success: clearLocalStorageAndResetForm
});

}

var readFromLocalStorageAndSendToServer = function(workorderform, localStorage, jQuery) {
	var wojson = readFromLocalStorage(localStorage);
	sendToServer(workorderform, wojson, jQuery);
}

var disableSaveButton = function(workorderform) {
	workorderform.save.disabled = true;
	workorderform.save.innerHTML = "Saving...";	
}

var enableSaveButton = function(workorderform) {
	workorderform.save.disabled = false;
	workorderform.save.innerHTML = "Save";	
}

var saveWorkOrder = function(event, workorderform, localStorage, jQuery) {
	storeLocally(workorderform, localStorage);
	event.preventDefault();
	invokeIfConnected(workorderform, localStorage, jQuery);
}

var validateWorkLocation = function(workorderform) {
	if(workorderform.worklocation.value ==='') {
		workorderform.worklocationerror.value = 'Please click on \'Get Location\' button to fetch the work location.';
		return false;
	} else {
		return true;
	}
}

var checkFormValidation = function(event, theworkorderform, localStorage, jQuery) {
	workorderform = theworkorderform;
	if(validateWorkLocation(workorderform)) {
		disableSaveButton(workorderform);
		saveWorkOrder(event, workorderform, localStorage, jQuery);
		return workorderform.checkValidity();
	} else {
		event.preventDefault();
		return false;
	}
	
}

var resetForm = function(workorderform, saveMessage) {
    workorderform.reset();	
	workorderform.worklocation.value='';
	populateCreatorName(workorderform);
	defaultCreationDate(workorderform.creationdate);	
	enableSaveButton(workorderform);
	saveWorkOrderMessage(workorderform, saveMessage, setTimeout);
}

var setStatusMessage = function(workorderform, saveMessage) {
	workorderform.outMessage.value = saveMessage;
}

var fadeOutMessage = function(workorderform, setTimeout) {
	var fadeOut = function() {
		workorderform.outMessage.value = '';
	}
	setTimeout(fadeOut, 3000);
}

var saveWorkOrderMessage = function(workorderform, saveMessage, setTimeout) {	
	setStatusMessage(workorderform, saveMessage);	
	fadeOutMessage(workorderform, setTimeout);
}

var defaultNonHTML5DateType = function(thecreationdate, date) {
	thecreationdate.value = ("0" + (date.getMonth() + 1)).slice(-2) + '/' + ("0" + date.getDate()).slice(-2) + '/' + date.getFullYear();
}

var defaultHTML5DateType = function(thecreationdate, date) {
	thecreationdate.valueAsDate = new Date(date.toLocaleDateString());
}

var defaultCreationDate = function(thecreationdate){
	var date = new Date();
	jQuery(function() {
		if (!Modernizr.inputtypes['date']) {
			jQuery('input[type=date]').datepicker({
				dateFormat: 'mm/dd/yy'
			});
			defaultNonHTML5DateType(thecreationdate, date);
		} else {
			defaultHTML5DateType(thecreationdate, date);
		}
	});
}
  
