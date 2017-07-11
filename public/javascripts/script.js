(function ($, d) {
    var DOM = {
            body: $('body'),
            closeButton: $('.closeButton'),
            designationList: $('#designation'),
            empId: $('#empId'),
            navbar: $('.navbar'),
            navIcon: $('.navIcon'),
            loginButton: $('.loginButton'),
            loginBox: $('#loginBox'),
            loginBoxClose: $('.loginBoxClose'),
            boxRegisterButton: $('.boxRegisterButton'),
            password: $('#password'),
            confirmPassword: $('#confirmPassword'),
            errorBox: $('.error'),
            errorMessage: $('.errorMessage'),
            registerForm: $('.registerForm form')
        },
        Functions = {
            checkClick: function (event) {
                var target = $(event.target);
                if (!(target.is('.navbar')) && !(target.is('.navIcon')) && !(target.is('#sub'))) {
                    Functions.closeNav(event);
                }
            },
            checkPassword: function (event) {
                if (DOM.password.val() !== DOM.confirmPassword.val()) {
                    Variables.formCorrect = false;
                    DOM.errorBox.css('position', 'static');
                    DOM.errorBox.css('visibility', 'visible');
                    DOM.errorMessage.html('Password and Confirm Password do not match.');
                } else {
                    DOM.errorBox.css('position', 'absolute');
                    DOM.errorBox.css('visibility', 'hidden');
                    DOM.body.css('min-height', '650px');
                    Variables.formCorrect = true;
                }
            },
            checkPasswordLength: function (event) {
                if (DOM.password.val().length < 6) {
                    DOM.errorBox.css('position', 'static');
                    DOM.errorBox.css('visibility', 'visible');
                    DOM.errorMessage.html('Enter at least 6 characters');
                    Variables.formCorrect = false;
                } else {
                    DOM.errorBox.css('position', 'absolute');
                    DOM.errorBox.css('visibility', 'hidden');
                    Variables.formCorrect = true;
                }
            },
            closeNav: function (event) {
                DOM.navbar.css('margin-left', '-300px');
                DOM.navIcon.css('visibility', 'visible');
            },
            openNav: function (event) {
                console.log('Clicked');
                DOM.navbar.css('margin-left', '0');
                DOM.navIcon.css('visibility', 'hidden');
            },
            submitRegisterForm: function(event) {
                
            },
            showBox: function (event) {
                DOM.loginBox.css('margin-top', 0);
            },
            closeBox: function (event) {
                DOM.loginBox.css('margin-top', '100%');
            }
        },
        Variables = {
            formCorrect: false
        };

    $(document).ready(function () {
        DOM.empId.kendoMaskedTextBox({
            mask: '0000'
        });
        DOM.body.on('click', Functions.checkClick);
        DOM.closeButton.on('click', Functions.closeNav);
        DOM.designationList.kendoDropDownList();
        DOM.navIcon.on('click', Functions.openNav);
        DOM.loginButton.on('click', Functions.showBox);
        DOM.loginBoxClose.on('click', Functions.closeBox);
        DOM.confirmPassword.on('blur', Functions.checkPassword);
        DOM.password.on('blur', Functions.checkPasswordLength)
        console.log(DOM.registerForm);
        DOM.registerForm.submit(Functions.submitRegisterForm);
    });

})(jQuery, document);