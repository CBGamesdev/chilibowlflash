function MainMenu() {
	var menu = null;
	var table = null;

	var callback = null;
	
	this.init = function(c) {
		callback = c;
		
		create();
		render();
		
		menu.open(menuClosed);
	};
	this.paint = function() {
		table.paint();
		menu.paint();
	};

	function end(nextViewIdx) {
		callback(nextViewIdx);
	};
	
	function create() {
		menu = new Menu();
		for (var i = 1; i < VIEWS.length; i++)
			menu.options[i-1] = VIEWS[i];
		table = new Table();
	};
	function render() {
		table.render();
	};
	
	function menuClosed(option) {
		end(option);
	};
};