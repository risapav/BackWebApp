/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
NEWSCHEMA('User').make(function(schema) {

    schema.define('name', 'String(20)', true);
    schema.define('pswd', 'String(20)', true);
    schema.define('role', 'String(10)', true);

    schema.addWorkflow('login', function(error, model, controller, callback) {

        NOSQL('users').find().make(function(builder) {
            builder.first();
            builder.where('name', model.name);
            builder.where('pswd', model.pswd);
            builder.callback(function(err, response) {

                if (!response) {
                    error.push('error-user-404');
                    return callback();
                }

                // Writes logs
                NOSQL('users-logs').insert({ id: response.id, username: response.username, ip: controller.ip, date: new Date() });

                // Sets cookies
                controller.cookie(F.config.cookie, F.encrypt({ id: response.id, ip: controller.ip }, 'user'), '5 minutes');

                // Responds
                callback(SUCCESS(true));

            }, error);
        });
    });

});

