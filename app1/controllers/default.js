exports.install = function() {
//	F.route('/', view_logged, ['authorize']);
	F.route('/', view_homepage);
        
	//F.route('/', json_login, ['post', '*User']);
//        F.route('/login/', view_login);
        
//        F.route('/create/', json_logout, ['post']);
//	F.route('/logout/', logout, ['authorize']);

    F.route('/login/', json_login, ['post', '*User']);
    F.route('/logout/', json_logout, ['post']);
};

function view_logged() {
	var self = this;
	self.plain('You are logged as {0}. To unlogged remove cookie __user or click http://{1}:{2}/logout/'.format(self.user.email, F.ip, F.port));
}

function view_login() {
	var self = this;
	self.view('login', { email: '@' });
}

function view_homepage() {
	var self = this;
	self.view('index', { email: '@' });
}

function json_login() {
	var self = this;
	self.body.$workflow('login', self, self.callback());
}

function json_logout() {
	var self = this;
	self.res.cookie(F.config.cookie, '', new Date().add('-1 year'));

        var obj = {
            auth: { role: 'user' },
            msg: { type: 'info', text: 'Úspešne si sa odhlásil' }
        };
console.log('json_logout ', obj);
        self.json(obj);    
	self.redirect('/');
}