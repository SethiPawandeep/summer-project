(function ($, d) {
    var DOM = {
            navbarLines: $('.navbar-lines'),
            nav: $('.nav'),
            empId: $('#emp-id'),
            designationList: $('#designation'),
            closeBtn: $('.close-btn'),
        body: $('body')
        },
        Functions = {
            showNav: function (event) {
                console.log('Clicked');
                DOM.nav.css('margin-left', '0');
                DOM.navbarLines.css('visibility', 'hidden');
            },
            closeNav: function (event) {
                DOM.nav.css('margin-left', '-300px');
                DOM.navbarLines.css('visibility', 'visible');
            },
            checkClick: function (event) {
                var target = $(event.target);
                if (!(target.is('.nav')) && !(target.is('.navbar-lines')) && !(target.is('#sub'))) {
                    Functions.closeNav(event);
                }
            }
        };

    $(document).ready(function () {
        DOM.empId.kendoMaskedTextBox({
            mask: '0000'
        });
        DOM.designationList.kendoDropDownList();
        DOM.navbarLines.on('click', Functions.showNav);
        DOM.closeBtn.on('click', Functions.closeNav);
        DOM.body.on('click', Functions.checkClick);
    });

})(jQuery, document);
