var Cloud = require('ti.cloud');
Cloud.debug = true;  // optional; if you add this line, set it to false for production

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var openInitView = function() {
	var InitView = require('ui/InitView');
	var view = new InitView();
	view.addEventListener('close', function(event) {
		openMainView();
	});
	view.open();
}
var openMainView = function() {
	Ti.API.debug(Ti.App.Properties.getString('user.id') + " " + Ti.App.Properties.getString('user.name'));
	var MainView = require('ui/MainView');
	var view = new MainView();
	view.open();
}

var PushNotificationService = require('/network/ios/PushNotificationService');
new PushNotificationService();

if (!Ti.App.Properties.hasProperty('user.id')) {
	openInitView();
} else {
	openMainView();
}
