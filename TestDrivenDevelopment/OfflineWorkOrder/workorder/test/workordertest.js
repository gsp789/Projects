describe('workordertest', function() {

	it('canary is passing', function() {
		expect(true).to.be.eql(true);
	}); 
	
	describe('worklocation', function() {
	
		beforeEach(function() {
			this.getLocationButton = document.createElement('button');
			this.getLocationHidden = document.createElement('input');
			this.getLocationOutput = document.createElement('output');
			this.errordisplay = document.createElement('output');
			this.expectedlocation = 'Latitude : 29.72, Longitude : -95.34, Altitude : 0';
			this.worklocationobject = {
				coords : {
					latitude : {},
					longitude : {},
					altitude : {}
				}
			};
			this.worklocationobject.coords.latitude = '29.72';
			this.worklocationobject.coords.longitude = '-95.34';
			this.worklocationobject.coords.altitude = '0';
		});
		
		it('worklocation disable button on click', function() {			
			disableGetLocation(this.getLocationButton);				
			expect(this.getLocationButton.disabled).to.be.eql(true);		
		});
		
		it('worklocation change button label on click', function() {
			disableGetLocation(this.getLocationButton);				
			expect(this.getLocationButton.innerHTML).to.be.eql('Retrieving your location...');		
		});
		
		it('clear error message on click of worklocation', function() {
			this.errordisplay.value = 'error message';
			
			clearErrorMessage(this.errordisplay);			
			expect(this.errordisplay.value).to.be.eql('');		
		});
		
		it('clear previous location on error in getting worklocation', function() {
			this.getLocationHidden.value = this.expectedlocation;
			
			clearLocationOnError(this.getLocationHidden, this.getLocationOutput);			
			expect(this.getLocationHidden.value).to.be.eql('');		
		});
		
		it('clear previous location display on error in getting worklocation', function() {
			this.getLocationOutput.value = this.expectedlocation;
			
			clearLocationOnError(this.getLocationHidden, this.getLocationOutput);			
			expect(this.getLocationOutput.value).to.be.eql('');
		});
		
		it('worklocation enable after worklocation retrieval', function() {
			enableGetLocation(this.getLocationButton);			
			expect(this.getLocationButton.disabled).to.be.eql(false);
		});
		
		it('worklocation change button label after worklocation retrieval', function() {
			enableGetLocation(this.getLocationButton);			
			expect(this.getLocationButton.innerHTML).to.be.eql('Get Location');
		});
		
		it('update worklocation hidden on successful retrieval', function() {
			getLocation(this.worklocationobject, this.getLocationHidden, this.getLocationOutput);			
			expect(this.getLocationHidden.value).to.be.eql(this.expectedlocation);
		});
		
		it('update worklocation output on successful retrieval', function() {
			this.worklocationobject.coords.altitude = null;			
			getLocation(this.worklocationobject, this.getLocationHidden, this.getLocationOutput);			
			expect(this.getLocationOutput.value).to.be.eql(this.expectedlocation);
		});
		
		it('show error message when unable to retrieve location', function() {	
			var error = {
				code : {}
			};
			error.code = 1;		
			
			getLocationError(error, this.errordisplay);			
			expect(this.errordisplay.value).to.be.eql("error receiving location info: Permission denied");		
		});
		
		it('emptycallback function for callWorkLocationAPI', function() {
			expect(emptycallBack()).to.be.eql(true);
		});
		
		it('disableGetLocation called from getWorkLocation', function() {		
			var navigator = {
				geolocation : {
					getCurrentPosition: function(getlocation, getlocationerror) {}
				}
			};
			
			getWorkLocation(navigator, this.getLocationButton, this.getLocationHidden, this.getLocationOutput, this.errordisplay);
			expect(this.getLocationButton.disabled).to.be.eql(true);
		});
		
		it('clearErrorMessage called from getWorkLocation', function() {		
			this.errordisplay.value = 'error message';
			var navigator = {
				geolocation : {
					getCurrentPosition: function(getlocation, getlocationerror) {}
				}
			};
			
			getWorkLocation(navigator, this.getLocationButton, this.getLocationHidden, this.getLocationOutput, this.errordisplay);
			expect(this.errordisplay.value).to.be.eql('');
		});
		
		it('getLocation called from getWorkLocations callback function', function(done) {		
			var functioncontext = this;
			var worklocationcoords = this.worklocationobject;			
			var navigator = {
				geolocation : {
					getCurrentPosition: function(getlocations, getlocationerrors) {						
						getlocations(worklocationcoords);
					}
				}
			};	
			var callback = function(){
				expect(functioncontext.getLocationOutput.value).to.be.eql(functioncontext.expectedlocation);
				done();
			}
			callWorkLocationAPI(navigator, this.getLocationButton, this.getLocationHidden, this.getLocationOutput, this.errordisplay, callback);
		});
		
		it('enableGetLocation called from getWorkLocations callback function', function(done) {		
			var functioncontext = this;
			var worklocationcoords = this.worklocationobject;
			
			var navigator = {
				geolocation : {
					getCurrentPosition: function(getlocations, getlocationerrors) {						
						getlocations(worklocationcoords);
					}
				}
			};	
			var callback = function(){
				expect(functioncontext.getLocationButton.disabled).to.be.eql(false);
				done();
			}
			callWorkLocationAPI(navigator, this.getLocationButton, this.getLocationHidden, this.getLocationOutput, this.errordisplay, callback);
		});
		
		it('getLocationError called from getWorkLocationError callback function', function(done) {	
			var functioncontext = this;
			var navigator = {
				geolocation : {
					getCurrentPosition: function(getlocations, getlocationerrors) {
						var errorcodes = {
							code : {}
						};
						errorcodes.code = 1;	
						getlocationerrors(errorcodes);
					}
				}
			};	
			var callback = function(){
				expect(functioncontext.errordisplay.value).to.be.eql("error receiving location info: Permission denied");
				done();
			}
			callWorkLocationAPI(navigator, this.getLocationButton, this.getLocationHidden, this.getLocationOutput, this.errordisplay, callback);
		});	
		
		it('clearLocationOnError called from getWorkLocationError callback function', function(done) {	
			var functioncontext = this;
			var navigator = {
				geolocation : {
					getCurrentPosition: function(getlocations, getlocationerrors) {
						var errorcodes = {
							code : {}
						};
						errorcodes.code = 1;	
						getlocationerrors(errorcodes);
					}
				}
			};	
			var callback = function(){
				expect(functioncontext.getLocationHidden.value).to.be.eql('');
				done();
			}
			callWorkLocationAPI(navigator, this.getLocationButton, this.getLocationHidden, this.getLocationOutput, this.errordisplay, callback);
		});
		
		it('enableGetLocation called from getWorkLocationError callback function', function(done) {	
			var functioncontext = this;
			var navigator = {
				geolocation : {
					getCurrentPosition: function(getlocations, getlocationerrors) {
						var errorcodes = {
							code : {}
						};
						errorcodes.code = 1;	
						getlocationerrors(errorcodes);
					}
				}
			};	
			var callback = function(){
				expect(functioncontext.getLocationButton.disabled).to.be.eql(false);
				done();
			}
			callWorkLocationAPI(navigator, this.getLocationButton, this.getLocationHidden, this.getLocationOutput, this.errordisplay, callback);
		});
	});	
	
	describe('save workorder', function() {
		beforeEach(function() {
			var workordercontext = this;
			this.formreset = false;
			this.formvalidity = false;
			this.workorderform = {
				workdescription : {
					value : {}
				},
				worklocation : {
					value : {}
				},
				creationdate : {
					value : {}
				},
				creatorname : {
					value : {}
				},
				severity : {
					value : {}
				},
				outMessage : {
					value : {}
				},
				worklocationerror : {
					value : {}
				},
				save : {
					disabled : {},
					innerHTML : {}
				},
				reset : function () {
					workordercontext.formreset = true;
				},
				checkValidity : function () {
					workordercontext.formvalidity = true;
				}
			};
			
			this.workorder = {
				workdescription: {}, 
				worklocation: {}, 
				creationdate: {}, 
				creatorname: {},
				severity: {}
			};
			
			this.ajaxFunctionCalled = false;
			this.jQuery = {
				ajax: function(options) {
				  workordercontext.ajaxFunctionCalled = true;
				}
			};
			
			this.event = {
				preventDefault : function(){}
			}
			
			this.Modernizr = {
				inputtypes : []
			}
			
			this.workorder.workdescription = 'workorder1', 
			this.workorder.worklocation = 'Lat : 29.7384852, Lon : -95.5110471', 
			this.workorder.creationdate = '2015-08-07', 
			this.workorder.creatorname = 'User1',
			this.workorder.severity = 'Major'
			
			this.workorderform.workdescription.value = 'workorder1';
			this.workorderform.worklocation.value = 'Lat : 29.7384852, Lon : -95.5110471';
			this.workorderform.creationdate.value = '2015-08-07';
			this.workorderform.creatorname.value = 'User1';
			this.workorderform.severity.value = 'Major';
		});
		
		it('read form data to JSON', function() {	
			
			var actualworkorderform = readFormData(this.workorderform);				
			expect(actualworkorderform).to.be.eql(this.workorder);		
		});
		
		it('store form data to localStorage', function() {	
			var localStorage = {};			
			
			storeLocally(this.workorderform, localStorage);				
			expect(localStorage['workorder0']).to.be.eql(JSON.stringify(this.workorder));		
		});
		
		it('set the save message', function() {	
			setStatusMessage(this.workorderform, 'Data successfully saved locally');				
			expect(this.workorderform.outMessage.value).to.be.eql("Data successfully saved locally");		
		});
		
		it('fadeout the save message', function() {	
			var setTimeout = function(callback, timeinterval) {
				callback();
			}
			fadeOutMessage(this.workorderform, setTimeout);				
			expect(this.workorderform.outMessage.value).to.be.eql('');		
		});
		
		it('display and fadeout the save message', function() {	
			var setTimeout = function(callback, timeinterval) {
				callback();
			}
			saveWorkOrderMessage(this.workorderform, 'locally', setTimeout);				
			expect(this.workorderform.outMessage.value).to.be.eql('');		
		});
		
		it('generate json from data from localStorage', function() {	
			var localStorage = {};
			var workorders = [];
			var wojson = {};
			localStorage.workordercount = 1;
			localStorage.workorder0 = {workdescription:"WO1", worklocation:"Lat : 29.7390854, Lon : -95.5107582", creationdate:"2015-08-09", creatorname:"Name1", severity:"Urgent"};
			localStorage.workorder1 = {workdescription:"WO2", worklocation:"Lat : 29.7388717, Lon : -95.51079879999999", creationdate:"2015-08-09", creatorname:"Name2", severity:"Major"};
			workorders[0] = localStorage.workorder0;
			workorders[1] = localStorage.workorder1;
			
			wojson = readFromLocalStorage(localStorage);				
			expect(wojson.wo).to.be.eql(workorders);		
		});
		
		it('disabling the savebutton on submission', function() {	
			disableSaveButton(this.workorderform);				
			expect(this.workorderform.save.disabled).to.be.eql(true);		
		});
		
		it('enabling the savebutton after saving', function() {	
			enableSaveButton(this.workorderform);				
			expect(this.workorderform.save.disabled).to.be.eql(false);		
		});
		
		it('display error for empty work location on form submit', function() {	
			this.workorderform.worklocation.value = '';
			validateWorkLocation(this.workorderform);	
			expect(this.workorderform.worklocationerror.value).to.be.eql('Please click on \'Get Location\' button to fetch the work location.');		
		});
		
		it('proceed to next step if work location is present', function() {	
			expect(validateWorkLocation(this.workorderform)).to.be.eql(true);		
		});
		
		it('clear localStorage after submission to server', function() { 
			localStorageClearFlag = false;
			workorderform = this.workorderform;
			jQuery = function(){};
			localStorage.clear = function() {
				localStorageClearFlag = true;
			}
			Modernizr = this.Modernizr;
			
			clearLocalStorageAndResetForm();
			expect(localStorageClearFlag).to.be.eql(true);
		});
		
		it('localStorage data sent to server', function() {	
		  var ajaxFunctionCalled = false;
			var wojson = {};
			var jQuery = {
				ajax: function(options) {
				  ajaxFunctionCalled = true;
				  expect(options.success).to.be.eql(clearLocalStorageAndResetForm);
				}
			};
			sendToServer(this.workorderform, wojson, jQuery);
			expect(ajaxFunctionCalled).to.be.eql(true);			
		});
		
		it('create json from localstorage and send to server', function() {	
			jQuery = this.jQuery;
			readFromLocalStorageAndSendToServer(this.workorderform, localStorage, jQuery);
			expect(this.ajaxFunctionCalled).to.be.eql(true);			
		});
		
		it('send data to server when connected to server', function() {	
			jQuery = this.jQuery;
			invokeSendToServer();
			expect(this.ajaxFunctionCalled).to.be.eql(true);			
		});
		
		it('reset form data when not connected to server', function() {	
			jQuery = function(){};
			workorderform = this.workorderform;
			invokeResetForm();
			expect(this.formreset).to.be.eql(true);			
		});
		
		it('check if connected to server or not', function() {	
			var ajaxFunctionCalled = false;
			var wojson = {};
			var jQuery = {
				ajax: function(options) {
				  ajaxFunctionCalled = true;
				  expect(options.success).to.be.eql(invokeSendToServer);
				}
			};
			invokeIfConnected(this.workorderform, localStorage, jQuery);
			expect(ajaxFunctionCalled).to.be.eql(true);			
		});
		
		it('save workorder locally and send to server when connected', function() {	
			var ajaxFunctionCalled = false;
			jQuery = {
				ajax: function() {
				  ajaxFunctionCalled = true;
				}
			};
			saveWorkOrder(this.event, this.workorderform, localStorage, jQuery);
			expect(ajaxFunctionCalled).to.be.eql(true);			
		});
		
		it('cancel form submission when no work location', function() {	
			this.workorderform.worklocation.value = '';
			var validationfail = checkFormValidation(this.event, this.workorderform, localStorage, jQuery);
			expect(validationfail).to.be.eql(false);			
		});
		
		it('invoke steps to submit form when work location present', function() {	
			checkFormValidation(this.event, this.workorderform, localStorage, jQuery);
			expect(this.formvalidity).to.be.eql(true);
		});
		
		it('default date for HTML5 supported date type', function() {	
			defaultHTML5DateType(this.workorderform.creationdate, new Date('08/10/2015'));
			expect(this.workorderform.creationdate.valueAsDate).to.be.eql(new Date('08/10/2015'));
		});
		
		it('default date for non HTML5 date type', function() {	
			defaultNonHTML5DateType(this.workorderform.creationdate, new Date('08/10/2015'));
			expect(this.workorderform.creationdate.value).to.be.eql('08/10/2015');
		});
		
		it('clear localStorage after submission to server on page load', function() { 
			localStorageClearFlag = false;
			workorderform = this.workorderform;
			jQuery = function(){};
			localStorage.clear = function() {
				localStorageClearFlag = true;
			}
			
			clearLocalStorageDisplayMessage();
			expect(localStorageClearFlag).to.be.eql(true);
		});
		
		it('localStorage data sent to server on page load', function() {	
		  var ajaxFunctionCalled = false;
			var wojson = {};
			var jQuery = {
				ajax: function(options) {
				  ajaxFunctionCalled = true;
				  expect(options.success).to.be.eql(clearLocalStorageDisplayMessage);
				}
			};
			sendToServerOnPageLoad(this.workorderform, wojson, jQuery);
			expect(ajaxFunctionCalled).to.be.eql(true);			
		});
		
		it('No data sent to server when local storage is empty', function() {	
			
			localStorage.workordercount = -1;
			jQuery = this.jQuery;
			
			expect(invokeSendToServerOnPageLoad()).to.be.eql(false);			
		});
		
		it('invoke send to server on page load only when data is present', function() {	
		
			localStorage = {};
			localStorage.workordercount = 1;
			localStorage.workorder0 = {workdescription:"WO1", worklocation:"Lat : 29.7390854, Lon : -95.5107582", creationdate:"2015-08-09", creatorname:"Name1", severity:"Urgent"};
			localStorage.workorder1 = {workdescription:"WO2", worklocation:"Lat : 29.7388717, Lon : -95.51079879999999", creationdate:"2015-08-09", creatorname:"Name2", severity:"Major"};
			
			jQuery = this.jQuery;
			invokeSendToServerOnPageLoad();
			expect(this.ajaxFunctionCalled).to.be.eql(true);			
		});
		 
		it('check if connected to server on page load', function() {	
			var ajaxFunctionCalled = false;
			var wojson = {};
			var jQuery = {
				ajax: function(options) {
				  ajaxFunctionCalled = true;
				  expect(options.success).to.be.eql(invokeSendToServerOnPageLoad);
				}
			};
			checkIfConnected(this.workorderform, localStorage, jQuery);
			expect(ajaxFunctionCalled).to.be.eql(true);			
		});
		
		it('Blank creator name when no previous stored value', function() {	
			delete localStorage['creatorName'];	
			workorderform = this.workorderform;
			populateCreatorName(workorderform);
			expect(workorderform.creatorname.value).to.be.eql('');			
		});
		
		it('prepopulate creator name on page load and reset', function() {	
			localStorage.creatorName = 'Test1';				
			populateCreatorName(this.workorderform);
			expect(this.workorderform.creatorname.value).to.be.eql('Test1');			
		});
		
		
	});
});