function SwarmDefinitionView() {
	
		//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
	
	var rows = [];
	var tableCellWidth = '90%';
	var gapLeft = '5%';
	var displayDateFormat = "dd.mm.yy hh:MM TT";
	
	var scrollview = Ti.UI.createScrollableView({height:'100%'});

	// Title:	
 
	var nameTextField = Ti.UI.createTextField({title:"Name", hintText:'Name', width: tableCellWidth});
	var row = Ti.UI.createTableViewRow()
	row.add(nameTextField);
	rows.push(row);

	// Task:	
	
	var taskTextField = Ti.UI.createTextField({title:"Task", hintText:'Task', width:tableCellWidth});
	var row = Ti.UI.createTableViewRow();
	row.add(taskTextField);
	rows.push(row);
	
	
	Titanium.include('/util/DateFormat.js');
	var DatePicker = require('ui/DatePickerView');
		

	// DateFrom:	
	
	var dateFrom = new Date();
	
	var datePickedHandler = function(date){
		dateFrom = date;
		validFromLabel.text="From: " + date.format(displayDateFormat);
		if(dateUntil.getTime()<dateFrom.getTime()){
			dateUntil = date;
			validUntilLabel.text = "Until: " + date.format(displayDateFormat);
		}
	}
	
	var validFromLabel = Ti.UI.createLabel({text:"From: " + dateFrom.format(displayDateFormat), width:tableCellWidth, left:gapLeft, hasChild:true});
	validFromLabel.addEventListener('click',function(e){
		
		var my_datePickerFrom = new DatePicker(dateFrom, datePickedHandler);
		my_datePickerFrom.open();
		
	});
	row = Ti.UI.createTableViewRow({hasChild:true});
	row.add(validFromLabel);
	rows.push(row);
	
	//DateUntil:	
	
	var dateUntil = new Date();
	
	var datePickedHandlerUntil = function(date){
		dateUntil = date;
		validUntilLabel.text="Until: " + date.format(displayDateFormat);
		if(dateUntil.getTime()<dateFrom.getTime()){
			dateFrom = date;
			validFromLabel.text = "From: " + date.format(displayDateFormat);
		}
	}
	
	var validUntilLabel = Ti.UI.createLabel({text:"Until: " + dateUntil.format(displayDateFormat), width:tableCellWidth, left:gapLeft, hasChild:true});
	validUntilLabel.addEventListener('click',function(e){
		
		var my_datePickerUntil = new DatePicker(dateUntil, datePickedHandlerUntil);
		my_datePickerUntil.open();
		
	});
	row = Ti.UI.createTableViewRow({hasChild:true});
	row.add(validUntilLabel);
	rows.push(row);
	
	// Waiting Time Slider:	
	var waitingTimeMin = 5;
	
	var sliderLabelWaiting = Ti.UI.createLabel({text:"Wait: "+waitingTimeMin+" Minutes",width:'45%', left:gapLeft })
	var sliderWaiting = Ti.UI.createSlider({min:1, max: 60, value:3, width:'45%',left:'50%'});
	sliderWaiting.addEventListener('change', function(e){
		waitingTimeMin = e.value;
		if(waitingTimeMin === 1){
			sliderLabelWaiting.text = "Wait: 1 Minute";
		} else {
			sliderLabelWaiting.text = "Wait: "+waitingTimeMin+" Minutes";
		}
	});
	
	row = Ti.UI.createTableViewRow();
	row.add(sliderLabelWaiting);
	row.add(sliderWaiting);
	rows.push(row);
	
	// Duration Slider:
	var durationMin = 5;
	
	var sliderLabel = Ti.UI.createLabel({text:"Duration: "+durationMin+" Minutes",width:'45%', left:gapLeft })
	var slider = Ti.UI.createSlider({min:1, max: 120, value:5, width:'45%',left:'50%'});
	slider.addEventListener('change', function(e){
		durationMin = e.value;
		if(durationMin === 1){
			sliderLabel.text = "Duration: 1 Minute";
		} else {
			sliderLabel.text = "Duration: "+durationMin+" Minutes";
		}
	});
	
	row = Ti.UI.createTableViewRow();
	row.add(sliderLabel);
	row.add(slider);
	rows.push(row);
	
	// Location:
	var waitingTimeLabel = Ti.UI.createLabel({text:"Location: None", width:tableCellWidth, left:gapLeft});
	row = Ti.UI.createTableViewRow({hasChild:false});
	row.add(waitingTimeLabel);
	rows.push(row);
	


	
	// Radius:	
	
	var radiusLabel = Ti.UI.createLabel({text:"Within: ", width:tableCellWidth, left:gapLeft});
	var radiusTextField = Ti.UI.createTextField({width: '20%', left:'20%', textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT, keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD})
	var mLabel = Ti.UI.createLabel({text:"meter", width:tableCellWidth, left:'45%'})
	radiusTextField.value=300;
	// hinttext does not work, if alignment = right!
	
	row = Ti.UI.createTableViewRow({hasChild:false});
	row.add(radiusLabel);
	row.add(radiusTextField);
	row.add(mLabel);
	rows.push(row);
	
	// Min Participants:	
	
	var minParticipantLabel = Ti.UI.createLabel({text:"Min. participants:", width:tableCellWidth, left:gapLeft});
	var minParticipantTextField = Ti.UI.createTextField({width: '20%',left:'40%', textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD});
	minParticipantTextField.value = 30;
	// hinttext does not work, if alignment = right!
		
	row = Ti.UI.createTableViewRow({hasChild:false});
	row.add(minParticipantLabel);
	row.add(minParticipantTextField);
	rows.push(row);
	
	// Min Participants:	
	
	var maxParticipantLabel = Ti.UI.createLabel({text:"Max. participants:", width:tableCellWidth, left:gapLeft});
	var maxParticipantTextField = Ti.UI.createTextField({width: '20%',left:'40%', textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD});
	maxParticipantTextField.value = 60;
	// hinttext does not work, if alignment = right!
		
	row = Ti.UI.createTableViewRow({hasChild:false});
	row.add(maxParticipantLabel);
	row.add(maxParticipantTextField);
	rows.push(row);
	
	
	
	var publishButton = Ti.UI.createButton({
									title:'Publish',
									width:tableCellWidth});
									
	publishButton.addEventListener('click',function(e){
									var sendObject = {};
									//alert(dateUntil.getTime()-dateFrom.getTime());
									if((dateUntil.getTime()-dateFrom.getTime())<60*60*1000){
										alert('Validity Period must be longer than one hour.' + (dateUntil.getTime()-dateFrom.getTime()));
									} else if(nameTextField.value.length>0
											&& taskTextField.value.length>0
											&&minParticipantTextField.value.length>0
											&&maxParticipantTextField.value.length>0
											&&radiusTextField.value.length>0) {
										sendObject.active = true;
										sendObject.title = nameTextField.value;
										sendObject.task = taskTextField.value;
										sendObject.validFrom = dateFrom.getTime();
										sendObject.validUntil = dateUntil.getTime();
										sendObject.waitingTime = waitingTimeMin*60;
										sendObject.duration = durationMin*60;
										sendObject.minParticipants = minParticipantTextField.value;
										sendObject.maxParticipants = maxParticipantTextField.value;
										sendObject.radius = radiusTextField.value;
										sendObject.ownerId = Ti.App.Properties.getString('user.id');

										var SwarmClient = require('network/SwarmClient');
										var my_swarmClient = new SwarmClient();
										
										my_swarmClient.addSwarmDefinition(sendObject,function(){
											alert('Saved');
										});
										
									} else {
										alert('Please enter all relevant data.');
									}
								});						
						
	row = Ti.UI.createTableViewRow();
	row.add(publishButton);
	rows.push(row);
	
	var tableView = Ti.UI.createTableView({
		style:Ti.UI.iPhone.TableViewStyle.GROUPED,
		width:'100%',
		top:'10%',
		data: rows
	});

	scrollview.add(tableView);
	self.add(scrollview);
	
	return self;
	
};

module.exports = SwarmDefinitionView;