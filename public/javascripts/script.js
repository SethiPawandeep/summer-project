(function($, d) {
    var DOM = {
            navbarLines: $('.navbar-lines'),
            nav: $('.nav'),
            closeBtn: $('.close-btn'),
            body: $('body'),
            ageOutput: $('#age-output'),
            ageSlider: $('#age-slider'),
            usernameLogin: $('#uname-login'),
            form: $('form'),
            pass: $('#pass'),
            passConfirm: $('#passConfirm'),
            error: $('.error')
        },
        Functions = {
            openNav: function(e) {
                DOM.nav.css('left', '0px');
                DOM.navbarLines.css('opacity', '0');
                e.preventDefault();
            },
            closeNav: function(e) {
                DOM.nav.css('left', '-300px');
                DOM.navbarLines.css('opacity', '1');
            },
            checkClicked: function(e) {
                var target = $(e.target);
                if (!(target.is('.nav')) && !(target.is('.navbar-lines')) && !(target.is('#sub'))) {
                    Functions.closeNav(e);
                }
            },
            outputUpdate: function() {
                DOM.ageOutput.html(DOM.ageSlider.val());
            },
            formSubmit: function() {
                if (formCorrect == false) {
                    DOM.error.html('Password and Confirm Password do not match.');
                    // return false;
                }
                form.ajaxSubmit({
                    error: function(xhr) {
                        status('Error: ' + xhr.status);
                    },
                    success: function(response) {
                        console.log(response);
                    }
                });
                // return false; --> To prevent the page from refreshing
            },
            minPassLength: function() {
                if (DOM.pass.val().length < 6) {
                    DOM.error.html('Minimum 6 characters for password field.');
                } else {
                    DOM.error.html('');
                }
            },
            passValidation: function() {
                if (DOM.passConfirm.val() !== DOM.pass.val()) {
                    DOM.pass.css('border', 'red 1px solid');
                    DOM.passConfirm.css('border', '1px solid red');
                    DOM.error.html('Password and Confirm Password do not match.');
                    formCorrect = false;
                } else if (DOM.passConfirm.val() === DOM.pass.val()) {
                    DOM.pass.css('border', '0');
                    DOM.passConfirm.css('border', '0');
                    DOM.pass.css('border-bottom', '#EEE 1px solid');
                    DOM.passConfirm.css('border-bottom', '1px solid #EEE');
                    DOM.error.html('');
                    formCorrect = true;
                    Functions.minPassLength();
                }
            }
        },
        formCorrect;

    window.onload = function() {
        formCorrect = false;
        DOM.navbarLines.on('click', Functions.openNav);
        DOM.closeBtn.on('click', Functions.closeNav);
        DOM.body.on('click', Functions.checkClicked);
        DOM.ageSlider.on('input', Functions.outputUpdate);
        DOM.usernameLogin.on('blur', Functions.showAlert);
        DOM.form.submit(Functions.formSubmit);
        DOM.passConfirm.on('blur', Functions.passValidation);
        DOM.pass.on('blur', Functions.minPassLength);
    };
})(jQuery, document);