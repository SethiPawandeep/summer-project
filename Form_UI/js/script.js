(function ($, d) {
    var DOM = {
            navbarLines: $('.navbar-lines'),
            closeBtn: $('.close-btn'),
            body: $('body'),
            ageOutput: $('#ageOutput'),
            form: $('form')
        },
        Functions = {
            openNav: function (e) {
                $('.nav').css('left', '0px');
                $('.navbar-lines').css('opacity', '0');
                e.preventDefault();
            },
            closeNav: function (e) {
                $('.nav').css('left', '-300px');
                $('.navbar-lines').css('opacity', '1');
                //                 e.preventDefault();
            },
            ageOutputUpdate: function (age) {
                DOM.ageOutput.value = age;
            },
            checkClicked: function (e) {
                var target = $(e.target);
                if (!(target.is('.nav')) && !(target.is('.navbar-lines')) && !(target.is('#sub'))) {
                    Functions.closeNav(e);
                }
                if (target instanceof HTMLAnchorElement) {
                    //                    e.preventDefault();
                }
            }
        };

    window.onload = function () {
        DOM.navbarLines.on('click', Functions.openNav);
        DOM.closeBtn.on('click', Functions.closeNav);
        DOM.body.on('click', Functions.checkClicked);
      /*  DOM.form.submit(function (e) {
            e.preventDefault();
            var $form = $(this);
            var $inputs = $form.find("input, select, button, textarea");
            var serialiseData = $form.serialize();
            $inputs.prop("disabled", true);

            request = $.ajax({
                url: '/login.php',
                type: 'post',
                data: serialiseData
            });

            request.done(function (res, status, jqXHR) {
                console.log("ho gaya");
            });

            request.fail(function (jqXHR, status, err) {
                console.log("error");
            });

            request.always(function () {
                $inputs.prop("disabled", false);
            });
        });*/
    };
})(jQuery, document);
