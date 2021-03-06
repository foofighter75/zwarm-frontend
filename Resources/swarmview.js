// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

//
// create base UI tab and root window
//
var swarmWin = Titanium.UI.createWindow({  
    title:'SwarmWindow',
    backgroundColor:'#fff'
});

var userSelection = false;

var swarmDefinition = {};

swarmDefinition.name = "Jump around";
swarmDefinition.description = "Raise your Arms in the air and jump around as if you just don't care.";
swarmDefinition.countdownSeconds = 15;
swarmDefinition.durationSeconds = 15;

var countdownSeconds = swarmDefinition.countdownSeconds;      // Wait time in seconds
var zwarmDuration = swarmDefinition.durationSeconds;

var durationString;
if(swarmDefinition.durationSeconds==60){
	durationString = '1 Minute';
} else if(swarmDefinition.durationSeconds>59 && swarmDefinition.durationSeconds%60==0){
	durationString = swarmDefinition.durationSeconds/60 + ' Minuten';
} else {
	durationString = swarmDefinition.durationSeconds + ' Sekunden';
}


var buttonWidth = '80%';

var buttonHeight = '10%';

var textWidth = buttonWidth;

var swarmLabel = Titanium.UI.createLabel({
	backgroundColor:'yellow',
	color:'black',
	top:'10%',
	width:textWidth,
	text:'Swarm: "' + swarmDefinition.name + '" '+ swarmDefinition.description + ' (' + durationString + ')',
	font:{fontSize:30,fontFamily:'Helvetica Neue'},
	textAlign:'center'
});

var switchLabelColor = function(color){
	swarmLabel.backgroundColor = color;
};

var toggleMediaButton = function(mediaButtonsActive){
	if(mediaButtonsActive){
		swarmWin.add(buttonPhoto);
		swarmWin.add(buttonVideo);
		swarmWin.add(buttonComment);
		swarmWin.remove(buttonParticipate);
		swarmWin.remove(buttonNotParticipate);
	} else {
		swarmWin.remove(buttonPhoto);
		swarmWin.remove(buttonVideo);
		swarmWin.remove(buttonComment);
		swarmWin.add(buttonParticipate);
		swarmWin.add(buttonNotParticipate);
	}
}

var closeView = function(){
	alert('Close view');
}

var buttonParticipate = Titanium.UI.createButton({
   title: 'Participate',
   top:'55%',
   width: buttonWidth,
   height: buttonHeight
});


var buttonNotParticipate = Titanium.UI.createButton({
   title: 'Nope',
   top:'70%',
   width: buttonWidth,
   height: buttonHeight
});

var buttonPhoto = Titanium.UI.createButton({
   title: 'Take a Photo',
   top:'55%',
   width: buttonWidth,
   height: buttonHeight
});

var buttonVideo = Titanium.UI.createButton({
   title: 'Make a Video',
   top: '70%',
   width: buttonWidth,
   height: buttonHeight
});

var buttonComment = Titanium.UI.createButton({
   title: 'Write a Comment',
   top: '85%',
   width: buttonWidth,
   height: buttonHeight
});

buttonPhoto.addEventListener('click',function(e){
	alert('Photo button click');
});

buttonParticipate.addEventListener('click',function(e){
	userSelection = true;
	toggleMediaButton(true);
});

buttonNotParticipate.addEventListener('click',function(e){
	closeView();
});


buttonVideo.addEventListener('click',function(e){
	alert('Video button click');
});


buttonComment.addEventListener('click',function(e){
	alert('Comment button click');
});

Titanium.include('countdown.js');

//label for the countdown
var countdownLabel = Ti.UI.createLabel({
	top:'40%',
	width:textWidth
});

countdownLabel.text = "Starting in " + Math.floor(countdownSeconds/60)+":"+countdownSeconds%60 + " Minutes.";        
// timer for Starting in ...
var my_timer = new countDown(0,countdownSeconds,
	function() {
    	countdownLabel.text = "Starting in " + timeString(my_timer) + " Minutes.";
	},
    function() {
    	if(userSelection){
    		startZwarm();
    	} else {
    		closeView();
    	}
   }
).start();

var startZwarm = function(){
	swarmLabel.backgroundColor='green';
	countdownLabel.text = "Finishing in " + Math.floor(zwarmDuration/60)+":"+zwarmDuration%60 + " Minutes.";
	var my_timer = new countDown(0,zwarmDuration,
		function(){
	    	countdownLabel.text = "Finishing in " + timeString(my_timer) + " Minutes.";
		},
		function(){
			alert('Photo List View');
		}
	).start();
}
        
//my_timer.set(secToMin(countdownSeconds));
// seconds are calculated into minutes and vice versa in the funnction => refactor
//my_timer.start();



swarmWin.add(swarmLabel);
swarmWin.add(countdownLabel);
toggleMediaButton(false);

swarmWin.open();