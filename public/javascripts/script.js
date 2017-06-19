(function($, d) {
    var DOM = {
            navbarLines: $('.navbar-lines'),
            nav: $('.nav'),
            closeBtn: $('.close-btn'),
            body: $('body'),
            ageOutput: $('#age-output'),
            ageSlider: $('#age-slider')
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
                //                if (target instanceof HTMLAnchorElement) {
                //                e.preventDefault();
                //                }
            },
            outputUpdate: function() {
                //                console.log(DOM.ageSlider.value);
                //                console.log(document.getElementById('age-slider').value);
                //                DOM.ageOutput.value = DOM.ageSlider.value;
                //                DOM.ageOutput.innerHTML = d.getElementById('age-slider').value;
                d.getElementById('age-output').innerHTML = d.getElementById('age-slider').value;
            }
        };

    window.onload = function() {
        DOM.navbarLines.on('click', Functions.openNav);
        DOM.closeBtn.on('click', Functions.closeNav);
        DOM.body.on('click', Functions.checkClicked);
        DOM.ageSlider.on('input', Functions.outputUpdate);
    };
})(jQuery, document);