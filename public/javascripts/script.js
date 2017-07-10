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
            errorBox: $('.error')
        },
        Functions = {
            checkClick: function (event) {
                var target = $(event.target);
                if (!(target.is('.navbar')) && !(target.is('.navIcon')) && !(target.is('#sub'))) {
                    Functions.closeNav(event);
                }
            },
            checkPassword: function (event) {
                console.log('huasdf');
                if(DOM.password.val() === DOM.confirmPassword.val()) {
                    DOM.errorBox.css('position', 'absolute');
                    DOM.errorBox.css('visibility', 'hidden');
                    DOM.body.css('min-height', '650px');
                    Variables.passwordMatch = true;
                } else {
                    Variables.passwordMatch = false;
                    DOM.errorBox.css('position', 'static');
                    DOM.errorBox.css('visibility', 'visible');
//                    DOM.body.css('min-height', '680px');
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
            showBox: function (event) {
                console.log('asdf');
                DOM.loginBox.css('margin-top', 0);
            },
            closeBox: function (event) {
                console.log('clicked');
                DOM.loginBox.css('margin-top', '100%');
            }
        },
        Variables = {
            passwordMatch: false
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
    });

})(jQuery, document);
