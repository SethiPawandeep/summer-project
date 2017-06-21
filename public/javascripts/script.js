(function($, d) {
    var DOM = {
            navbarLines: $('.navbar-lines'),
            nav: $('.nav'),
            closeBtn: $('.close-btn'),
            body: $('body'),
            ageOutput: $('#age-output'),
            ageSlider: $('#age-slider'),
            usernameLogin: $('#uname-login'),
            form: $('form')
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
                d.getElementById('age-output').innerHTML = d.getElementById('age-slider').value;
            },
            formSubmit: function() {
                form.ajaxSubmit({
                    error: function(xhr) {
                        status('Error: ' + xhr.status);
                    },
                    success: function(response) {
                        console.log(response);
                    }
                });
                // return false; --> To prevent the page from refreshing
            }
        };

    window.onload = function() {
        DOM.navbarLines.on('click', Functions.openNav);
        DOM.closeBtn.on('click', Functions.closeNav);
        DOM.body.on('click', Functions.checkClicked);
        DOM.ageSlider.on('input', Functions.outputUpdate);
        DOM.usernameLogin.on('blur', Functions.showAlert);
        DOM.form.submit(Functions.formSubmit);
    };
})(jQuery, document);