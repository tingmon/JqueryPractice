/**
 * File Name: TJdatabase.js
 *
 *Revision History:
 *      Taekmin Jeong, 2021-3-06 : Created
 */

//global database object
var db;

//general purpose error handler
function errorHandler(error) {
    console.error("SQL error:     " + error.message);
}

var DB = {
    createDatabase: function () {
        var shortName = "FeedbackDB";
        var version = "1.0";
        var displayName = "DB for FeedbackDB App";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database created successfully");
        }

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    createTables: function () {
        if(localStorage.getItem("tables") !== "true"){
            console.info(localStorage.getItem("tables"))

            sqlQueries = ["CREATE TABLE IF NOT EXISTS type( "
            + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
            + "name VARCHAR(20) NOT NULL);",
                "CREATE TABLE IF NOT EXISTS review( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "businessName VARCHAR(30) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "reviewDate DATE," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES type(id));",
                "INSERT INTO type VALUES(NULL, 'Canadian');",
                "INSERT INTO type VALUES(NULL, 'Asian');",
                "INSERT INTO type VALUES(NULL, 'Others');"];
            // "REPLACE INTO `type` SET `name` = 'Canadian';",
            // "REPLACE INTO `type` SET `name` = 'Asian';",
            // "REPLACE INTO `type` SET `name` = 'Others';"]

            var tableCreated = "true";
            localStorage.setItem("tables", tableCreated);
        }
        else{
            console.info(localStorage.getItem("tables"))
            sqlQueries = []
        }


        function txFunction(tx) {
            var options = [];

            function successCallback() {
                console.info("Success: Creating tables successful");
            }
            for (var i  = 0; i < sqlQueries.length; i++){
                console.info(sqlQueries[i]);
                tx.executeSql(sqlQueries[i], options, successCallback, errorHandler);
            }
        }

        function successTransaction() {
            console.info("Success: Create table transaction is successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables: function () {
        sqlQueries = ["DROP TABLE IF EXISTS type;",
            "DROP TABLE IF EXISTS review;"];

        function txFunction(tx) {
            var options = [];

            function successCallback() {
                console.info("Success: Dropping tables successful");
            }

            for (var i  = 0; i < sqlQueries.length; i++){
                console.info(sqlQueries[i]);
                tx.executeSql(sqlQueries[i], options, successCallback, errorHandler);
            }
        }

        function successTransaction() {
            console.info("Success: Dropping table transaction is successful");
        }

        var tableCreated = "false";
        localStorage.setItem("tables", tableCreated);

        db.transaction(txFunction, errorHandler, successTransaction);
    }
}