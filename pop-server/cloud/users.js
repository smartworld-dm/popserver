"use strict";  

Parse.Cloud.define('getUsers', function(req, res) {
    if (!req.user) {
		res.error("Must be signed in to call this Cloud Function.");
		return;
    }
    const user = req.user.toJSON();
    if (user.role !== 'admin') {
        res.error("Your don't have permission to use this function.");
        return;
    }
    
    const query = new Parse.Query("_User");
    query.limit(1000);
    query.find({useMasterKey: true}).then(
        (users) => {
            res.success(users);
        },
        (error) => {
            res.error(error);
        }
    );
});