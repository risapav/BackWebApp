exports.install = function() {
	F.route('/', view_homepage);
}

function view_homepage() {
console.log('view_homepage ');	
	var self = this;
	self.view('index', { email: '@' });
}
