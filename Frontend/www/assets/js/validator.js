/**
 * Created by yaroslav on 24.11.2016.
 */

$(document).ready(function () {
    //jQuery code goes here
    $('#inputName').on('input', function () {
        var input = $(this);
        var validDiv = $(document.getElementsByClassName("name-group"));
        var spanHelp = $(document.getElementsByClassName("name-help-block"));

        var re = /^[^0-9]+$/;
        var is_name = re.test(input.val());
        if (is_name) {
            validDiv.removeClass("has-error").addClass("has-success");
            spanHelp.addClass("none");
        }
        else {
            validDiv.removeClass("has-success").addClass("has-error");
            spanHelp.removeClass("none");
        }
    });

    $('#inputPhone').on('input', function () {
        var input = $(this);
        var validDiv = $(".phone-group");
        var spanHelp = $(".phone-help-block");

        var re1 = /^\+?([0-9]{4})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        var is_phone = re1.test(input.val());

        var re2 = /^\0?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        var is_phone2 = re2.test(input.val());

        if (is_phone || is_phone2) {
            validDiv.removeClass("has-error").addClass("has-success");
            spanHelp.addClass("none");
        }
        else {
            validDiv.removeClass("has-success").addClass("has-error");
            spanHelp.removeClass("none");
        }
    });

  /*  $('#data_submit').click(function () {
        console.log("sdfsdf");
    });*/

});

/*

function submitValidation() {
    console.log("submit");

    var name = document.getElementById('inputName').value;
    var phone = document.getElementById('inputPhone').value;
    var adress = document.getElementById('inputAdress').value;

    var spanName = document.getElementsByClassName("name-help-block");
    if(name == "")
        spanName.removeClass("none");

    var spanPhone = document.getElementsByClassName("phone-help-block");
    if(phone == "")
        spanPhone.removeClass("none");

    var spanAdress = document.getElementsByClassName("address-help-block");
    if(adress == "")
        spanAdress.removeClass("none");


};
*/
