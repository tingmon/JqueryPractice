/**
 * File Name: TJfacade.js
 *
 *Revision History:
 *      Taekmin Jeong, 2021-3-06 : Created
 */

function tjShowAddForm(){
    if(localStorage.getItem("defaultEmail")){
        $("#tjTxtEmail").val(localStorage.getItem("defaultEmail"));
    }
}

// select all
function tjShowReviewsList(){
    $("#tjListOfReviews").html("Empty");
    $("#tjListOfReviews").listview("refresh");

    var options = [];

    function callback(tx, results) {
        var html = "";
        for(var i=0; i < results.rows.length; i++){
            var row = results.rows[i];
            var rating1 = row['rating1'];
            var rating2 = row['rating2'];
            var rating3 = row['rating3'];
            var overall = 0;

            overall = Math.round((rating1 + rating2 + rating3) * 100 / 15);

            if(isNaN(overall)){
                overall = 0;
            }

            html += "<li><a data-role='button' data-row-id=" + row['id'] + " href=#>" +
                "<div>" +
                "<h6>Business Name: "+row['businessName']+"</h6>" +
                "<p>Reviewer Email: "+row['reviewerEmail']+"</p>" +
                "<p>Comments: "+row['reviewerComments']+"</p>" +
                "<p>Overall Rating: "+overall+"%</p></div></a></li>";
        }
        var lv = $("#tjListOfReviews");
        lv = lv.html(html);
        lv.listview("refresh");

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop("href", "#tjEditFeedbackPage");
        }
        $("#tjListOfReviews a").on("click", clickHandler);
    }
    Review.selectAll(options, callback);
}

// select
function tjShowEditForm(){
    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx, results) {
        var select = $("#tjTypeEdit");
        var row = results.rows[0];

        $("#tjTxtBusinessNameEdit").val(row['businessName']);
        $("#tjTypeEdit").val(row['typeId']);
        $("#tjTxtEmailEdit").val(row['reviewerEmail']);
        $("#tjTxtCommentsEdit").val(row['reviewerComments']);
        $("#tjTxtReviewDateEdit").val(row['reviewDate']);
        if (row['hasRating'] == 'true') {
            $("#tjAddRatingEdit").prop("checked", true);
            $("#tjFoodQualityEdit").val(row['rating1']);
            $("#tjServiceEdit").val(row['rating2']);
            $("#tjValueEdit").val(row['rating3']);
            var overall = Math.round((row['rating1'] + row['rating2'] + row['rating3']) * 100 / 15);
            $("#tjOverallEdit").val(overall+"%");
        }
        else {
            $("#tjAddRatingEdit").prop("checked", false);
            $("#tjFoodQualityEdit").val(0);
            $("#tjServiceEdit").val(0);
            $("#tjValueEdit").val(0);
            $("#tjOverallEdit").val(0);
        }
        tjAddRatingEditCheck();
        $("#tjFrmEditReview :checkbox").checkboxradio("refresh");
        select.selectmenu("refresh");
    }

    Review.select(options, callback);

}

// insert
function tjAddReview(){

    if(doValidate_tjFrmAddReview()){
        console.info("Form is valid");

        var name = $("#tjTxtBusinessName").val();
        var type = $("#tjType").val();
        var email = $("#tjTxtEmail").val();
        var comments = $("#tjTxtComments").val();
        var date = $("#tjTxtReviewDate").val();
        var hasRating = $("#tjAddRating").prop("checked");
        if (hasRating == true){
            var quality = $("#tjFoodQuality").val();
            var service = $("#tjService").val();
            var value = $("#tjValue").val();
        }
        else {
            console.log("not selected");
            var quality = 0;
            var service = 0;
            var value = 0;
            console.log(quality, service, value);
        }

        var options = [name, type, email, comments, date, hasRating, quality,
        service, value];

        console.info(options);

        function callback() {
            console.info("Record inserted successfully");
            alert("Review added successfully");
            // $(location).prop('href', '#tjViewFeedbackPage');
            window.location.reload();
        }
        Review.insert(options, callback);
    }
    else{
        console.info("Form is INVALID");
    }
}

// update
function tjUpdateReview(){
    if(doValidate_tjFrmEditReview()){
        console.info("Form is valid");

        var id = localStorage.getItem("id");

        var name = $("#tjTxtBusinessNameEdit").val();
        var type = $("#tjTypeEdit").val();
        var email = $("#tjTxtEmailEdit").val();
        var comments = $("#tjTxtCommentsEdit").val();
        var date = $("#tjTxtReviewDateEdit").val();
        var hasRating = $("#tjAddRatingEdit").prop("checked");
        if (hasRating === true){
            var quality = $("#tjFoodQualityEdit").val();
            var service = $("#tjServiceEdit").val();
            var value = $("#tjValueEdit").val();
        }
        else {
            var quality = $("#tjFoodQualityEdit").val(0);
            var service = $("#tjServiceEdit").val(0);
            var value = $("#tjValueEdit").val(0);
        }

        var options = [name, type, email, comments, date, hasRating, quality,
            service, value, id];

        function callback() {
            console.info("Record updated successfully");
            alert("Review updated successfully");
            $(location).prop('href', '#tjViewFeedbackPage');

        }

        Review.update(options, callback);

    }
    else{
        console.info("Form is INVALID");
    }
}

// delete
function tjDeleteReview(){
    var id = localStorage.getItem("id");

    var options = [id];

    function callback() {
        console.info("Record deleted successfully");
        alert("Review deleted successfully");
        $(location).prop('href', '#tjViewFeedbackPage');
    }

    Review.delete(options, callback);
}

// clear db
function tjClearDatabase(){
    var result = confirm("Really want to clear database?");
    if (result) {
        try{
            DB.dropTables();
            alert("Database cleared");
        }catch (e){
            alert(e);
        }
    }
}

//cancel
function tjCancelReview(){
    $(location).prop('href', '#tjViewFeedbackPage');
}

// 유저가 기본 이메일 저장
function tjSaveDefaults(){
    if(doValidate_tjFrmSaveDefaults()){
        console.info("Form is valid");
        var defaultEmail = document.getElementById("tjTxtEmailDefaults").value;
        localStorage.setItem("defaultEmail", defaultEmail);
        console.log(localStorage.getItem("defaultEmail"));
        alert("Default Reviewer email saved\n" + defaultEmail);
    }
    else{
        console.info("Form is INVALID");
    }
}

// 애드 화면에서 선택 평가 작동
function tjAddRatingCheck(){
    var checkbox = document.getElementById("tjAddRating");
    if(checkbox.checked === true){
        $('#tjFrmAddOptional').show();
    }
    else{
        $('#tjFrmAddOptional').hide();
    }
}

// 에딧 화면에서 선택 평가 작동
function tjAddRatingEditCheck(){
    var checkbox = document.getElementById("tjAddRatingEdit");
    if(checkbox.checked === true){
        $('#tjFrmEditOptional').show();
    }
    else{
        $('#tjFrmEditOptional').hide();
    }
}

// 애드 화면에서의 선택 평가 계산기 작동
function tjAddCalculatorRun(){
    var foodQuality = document.getElementById("tjFoodQuality").value;
    var service = document.getElementById("tjService").value;
    var value = document.getElementById("tjValue").value;

    foodQuality = parseInt(foodQuality);
    service = parseInt(service);
    value = parseInt(value);


    var result = Math.round((foodQuality + service + value) * 100 / 15);
    console.log(result);
    Math.round(result);
    if(result != NaN && result <= 100) {
        $("#tjOverall").val(result + "%");
    }
}

// 에딧 화면에서의 선택 평가 계산기 작동
function tjEditCalculatorRun(){
    var foodQuality = document.getElementById("tjFoodQualityEdit").value;
    var service = document.getElementById("tjServiceEdit").value;
    var value = document.getElementById("tjValueEdit").value;

    foodQuality = parseInt(foodQuality);
    service = parseInt(service);
    value = parseInt(value);

    var result = Math.round((foodQuality + service + value) * 100 / 15);
    console.log(result);
    if(result != NaN && result <= 100){
        $("#tjOverallEdit").val(result + "%");
    }

}