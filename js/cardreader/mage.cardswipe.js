(function ($){

    var convertDataToMagento = function(data){
        data.expMonth
    }

// Called by plugin on a successful scan.
var complete = function (data) {

    data = convertDataToMagento(data);

    // Is it a payment card?
    if (data.type == "generic")
        return;

    // Copy data fields to form
    $("input[name='payment[cc_number]']").val(data.account);
    $("input[name='payment[cc_owner]']").val(data.firstName + ' ' + data.lastName);
    //$("#account").val(data.account);
    $("select[name='payment[cc_exp_month]']").val(data.expMonth);
    $("select[name='payment[cc_exp_year]']").val(data.expYear);
    $("select[name='payment[cc_type]']").val(data.type);

};

// Event handler for scanstart.cardswipe.
var scanstart = function () {
    $("#overlay").fadeIn(200);
};

// Event handler for scanend.cardswipe.
var scanend = function () {
    $("#overlay").fadeOut(200);
};

// Event handler for success.cardswipe.  Displays returned data in a dialog
var success = function (event, data) {

    $("#properties").empty();

    // Iterate properties of parsed data
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var text = key + ': ' + data[key];
            $("#properties").append('<div class="property">' + text + '</div>');
        }
    }


    $("#success").fadeIn().delay(3000).fadeOut();
}

var failure = function () {
    $("#failure").fadeIn().delay(1000).fadeOut();
}

// Initialize the plugin with default parser and callbacks.
//
// Set debug to true to watch the characters get captured and the state machine transitions
// in the javascript console. This requires a browser that supports the console.log function.
//
// Set firstLineOnly to true to invoke the parser after scanning the first line. This will speed up the
// time from the start of the scan to invoking your success callback.
$.cardswipe({
    firstLineOnly: true,
    complete: complete,
    parsers: ["visa", "amex", "mastercard", "generic"],
    debug: false
});

// Bind event listeners to the document
$(document)
    .bind("scanstart.cardswipe", scanstart)
    .bind("scanend.cardswipe", scanend)
    .bind("success.cardswipe", success)
    .bind("failure.cardswipe", failure)
;
}(jQuery));