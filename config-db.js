(function() {
	const db_info = {url:'localhost',
                        username: '<your username>',
                        password: '<your password>',  //Your dataBase server password you created
                        port: '<your port>',   // The port assigned to you after following MongoDB-setup.txt
						database: 'cs5003_group-t', //Database name
                        collection1: 'Holiday_Categories',
                        cousers: 'Users',
                        cocomments:'Comments',
                        collectionItinery: 'Itinery_Collection'};

	const moduleExports = db_info;

    if (typeof __dirname != 'undefined')
        module.exports = moduleExports;
}());

