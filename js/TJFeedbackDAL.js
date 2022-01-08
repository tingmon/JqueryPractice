/**
 * File Name: TJFeedbackDAL.js
 *
 *Revision History:
 *      Taekmin Jeong, 2021-3-06 : Created
 */

// CRUD 액션을 다룸
var Review = {
    insert: function(options, callback){
        function txFunction(tx) {
            var sql = "INSERT INTO review(businessName, typeId, reviewerEmail," +
                "reviewerComments, reviewDate, hasRating, " +
                "rating1, rating2, rating3)" +
                "VALUES(?,?,?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successHandler() {
            console.info("Success: Insert transaction successful");
        }
        db.transaction(txFunction, errorHandler, successHandler);
    },
    update: function(options, callback){
        function txFunction(tx) {
            var sql = "UPDATE review SET businessName=?, " +
                "typeId=?, reviewerEmail=?," +
                "reviewerComments=?, reviewDate=?, hasRating=?, " +
                "rating1=?, rating2=?, rating3=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successHandler() {
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successHandler);
    },
    delete: function(options, callback){
        function txFunction(tx) {
            var sql = "DELETE FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successHandler() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successHandler);
    },
    select: function(options, callback){
        function txFunction(tx) {
            var sql = "SELECT * FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successHandler() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successHandler);
    },
    selectAll: function(options, callback){
        function txFunction(tx) {
            var sql = "SELECT * FROM review;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successHandler() {
            console.info("Success: Select all transaction successful");
        }
        db.transaction(txFunction, errorHandler, successHandler);
    },
}