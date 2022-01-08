/**
 * File Name: TJglobal.js
 *
 *Revision History:
 *      Taekmin Jeong, 2021-3-06 : Created
 */

function tjAddRating_click() {
    tjAddRatingCheck();
}

function tjAddRatingEdit_click() {
    tjAddRatingEditCheck();
}

function tjAddCalculator() {
    tjAddCalculatorRun();
}

function tjEditCalculator() {
    tjEditCalculatorRun();
}

// add page
function tjBtnAddReview_click() {
    tjAddReview();
}

// list and edit page
function tjBtnUpdateReview_click() {
    tjUpdateReview();
}

function tjBtnDeleteReview_click() {
    tjDeleteReview();
}

function tjBtnCancelReview_click() {
    tjCancelReview();
}

// setting page
function tjBtnSaveDefaults_click() {
    tjSaveDefaults();
}

function tjBtnClearDB_click() {
    tjClearDatabase();
}

// add form
function tjPageAdd_show() {
    tjShowAddForm();
}

// list
function tjPageReviews_show() {
    tjShowReviewsList();
}

// edit form
function tjPageEdit_show() {
    tjShowEditForm();
}

function init(){
    // show optional input
    $("#tjAddRating").on("click", tjAddRating_click);
    $("#tjAddRatingEdit").on("click", tjAddRatingEdit_click);

    // calculate optional input
    $("#tjFoodQuality").on("change", tjAddCalculator);
    $("#tjService").on("change", tjAddCalculator);
    $("#tjValue").on("change", tjAddCalculator);
    $("#tjFoodQualityEdit").on("change", tjEditCalculator);
    $("#tjServiceEdit").on("change", tjEditCalculator);
    $("#tjValueEdit").on("change", tjEditCalculator);

    // add page button click
    $("#tjBtnAddReview").on("click", tjBtnAddReview_click);
    // reviews and update page button click
    $("#tjBtnUpdateReview").on("click", tjBtnUpdateReview_click);
    $("#tjBtnDeleteReview").on("click", tjBtnDeleteReview_click);
    $("#tjBtnCancelReview").on("click", tjBtnCancelReview_click);
    // settings page button click
    $("#tjBtnSaveDefaults").on("click", tjBtnSaveDefaults_click);
    $("#tjBtnClearDatabase").on("click", tjBtnClearDB_click);

    //page show
    $("#tjAddFeedbackPage").on("pageshow", tjPageAdd_show);
    $("#tjViewFeedbackPage").on("pageshow", tjPageReviews_show)
    $("#tjEditFeedbackPage").on("pageshow", tjPageEdit_show);
}

function initDB()
{
    try{
        DB.createDatabase();
        if(db){

            console.info("Creating tables...");
            DB.createTables();
        }
        else{
            console.error("Error: Cannot create Tables: database does not exist!");
        }
    }
    catch (e){
        console.error("Error: (Fatal) Error in initDB(). Can not proceed");
    }
}


$(document).ready(function(){
    init();
    initDB();
});