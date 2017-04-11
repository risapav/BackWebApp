exports.install = function() {
//    F.route('/login/', json_login, ['post']);
//    F.route('/logout/', json_logout, ['post','unauthorize']);
	
    F.route('/ping/', json_logged,   ['post','authorize']);
    F.route('/ping/', json_unlogged, ['post','unauthorize']);	
	
	F.route('/login/', json_login, ['unlogged', 'xhr', 'post']);
	F.route('/logout/', json_logout, ['logged']);
}

//----------------------------------------------
// Login process
// POST, [xhr, unlogged]
function json_login() {
    var self = this;
    var auth = self.module('authorization');

    // read user information from database
    // this is an example
    var user = { id: '1', alias: 'Peter Sirka' };

    // create cookie
    // save to session
    auth.login(self, user.id, user);

    self.json({ r: true });
}

// Logoff process
// POST, [+xhr, logged]
function json_logout() {
    var self = this;
    var auth = self.module('authorization');
    var user = self.user;

    // remove cookie
    // remove user session
    auth.logoff(self, user.id);
	var obj = {
		auth: { role: 'user' },
		msg: { type: 'info', text: 'Úspešne si sa odhlásil' }
	};
console.log('json_logout ', obj);
	self.json(obj); 
    self.redirect('/');
}
//----------------------------------------------




function json_logged() {
	var obj = {
		auth: { role: 'none' },
		msg: { type: 'success', text: 'Už si prihlásený' }
	};	
console.log('json_logged');	
    this.json('logged');
}

function json_unlogged() {
	var obj = {
		auth: { role: 'none' },
		msg: { type: 'warning', text: 'Nie si prihlásený' }
	};
console.log('json_unlogged ', obj);	
    this.json('unlogged', obj);
}


