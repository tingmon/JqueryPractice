/**
 * File Name: TJutil.js
 *
 *Revision History:
 *      Taekmin Jeong, 2021-3-06 : Created
 */

// 발리데이션 다룸

function doValidate_tjFrmAddReview(){
    var f = $("#tjFrmAddReview");

    f.validate({
        rules:{
            tjTxtBusinessName:{
                required:true,
                rangelength: [2, 20]
            },
            tjTxtEmail:{
                required:true,
                emailcheck: true
            },
            tjTxtReviewDate:{
                required:true
            },
            tjFoodQuality:{
                numcheck:true
            },
            tjService: {
                numcheck:true
            },
            tjValue:{
                numcheck:true
            }
        },
        messages:{
            tjTxtBusinessName:{
                required:"Bussiness name is required",
                rangelength: "Bussiness name should be between 2-20 characters"
            },
            tjTxtEmail:{
                required:"Email is required",
                emailcheck: "Invalid email"
            },
            tjTxtReviewDate:{
                required:"Review Date is required"
            },
            tjFoodQuality:{
                numcheck:"Enter number between 0-5"
            },
            tjService: {
                numcheck:"Enter number between 0-5"
            },
            tjValue:{
                numcheck:"Enter number between 0-5"
            }
        }
    });
    return f.valid();
}

function doValidate_tjFrmEditReview(){
    var f = $("#tjFrmEditReview");

    f.validate({
        rules:{
            tjTxtBusinessNameEdit:{
                required:true,
                rangelength: [2, 20]
            },
            tjTxtEmailEdit:{
                required:true,
                emailcheck: true
            },
            tjTxtReviewDateEdit:{
                required:true
            },
            tjFoodQualityEdit:{
                numcheck:true
            },
            tjServiceEdit: {
                numcheck:true
            },
            tjValueEdit:{
                numcheck:true
            }
        },
        messages:{
            tjTxtBusinessNameEdit:{
                required:"Bussiness name is required",
                rangelength: "Bussiness name should be between 2-20 characters"
            },
            tjTxtEmailEdit:{
                required:"Email is required",
                emailcheck: "Invalid email"
            },
            tjTxtReviewDateEdit:{
                required:"Review Date is required"
            },
            tjFoodQualityEdit:{
                numcheck:"Enter number between 0-5"
            },
            tjServiceEdit: {
                numcheck:"Enter number between 0-5"
            },
            tjValueEdit:{
                numcheck:"Enter number between 0-5"
            }
        }
    });
    return f.valid();
}

function doValidate_tjFrmSaveDefaults(){
    var f = $("#tjFrmDefaults");

    f.validate({
        rules:{
            tjTxtEmailDefaults:{
                required:true,
                emailcheck: true
            },
        },
        messages:{
            tjTxtEmailDefaults:{
                required:"Email is required",
                emailcheck: "Invalid email"
            },
        }
    });
    return f.valid();
}

jQuery.validator.addMethod(
    "emailcheck",
    function(value, element){
        var r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return this.optional(element) || r.test(value);
    },
    "Invalid email"
);

jQuery.validator.addMethod(
    "numcheck",
    function(value, element){
        if(value){
            if(value < 0 || value > 5){
                return this.optional(element) || false;
            }
            else{
                return this.optional(element) || true;
            }
        }
    },
    "Enter number between 0-5"
);

