function SwarmListView(swarmDefinition){

	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	var table = Titanium.UI.createTableView({
		headerTitle: swarmDefinition.title + " (" + swarmDefinition.swarmCount + ")"
	});
	
	self.add(table);
	
	var SwarmCommentsView = require('/ui/SwarmCommentsView');
	var swarmCommentsView = new SwarmCommentsView();

	self.openSwarmCommentsView = function(swarm) {
		var swarmCommentsView = new SwarmCommentsView(swarm);
		swarmCommentsView.containingTab = self.containingTab;
		self.containingTab.open(swarmCommentsView);
	}

	self.addEventListener('click', function(e){
		self.openSwarmCommentsView(e.rowData);
	});
	
	var SwarmClient = require('/network/SwarmClient');
	var swarmClient = new SwarmClient();
	
	var onLoadCallback = function(json) {
		table.data = json;
	}
	swarmClient.getSwarmsForSwarmDefinition(swarmDefinition.id, onLoadCallback);
	
	self.openPastSwarmView = function(swarm) {
		self.openSwarmCommentsView(swarm);
	}
	
	return self;
}

module.exports = SwarmListView;