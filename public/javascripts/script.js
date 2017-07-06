(function ($, d) {
    var DOM = {
            body: $('body'),
            closeButton: $('.closeButton'),
            designationList: $('#designation'),
            empId: $('#empId'),
            navbar: $('.navbar'),
            navIcon: $('.navIcon')
        },
        Functions = {
            checkClick: function (event) {
                var target = $(event.target);
                if (!(target.is('.navbar')) && !(target.is('.navIcon')) && !(target.is('#sub'))) {
                    Functions.closeNav(event);
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
            }
        };

    $(document).ready(function () {
        DOM.empId.kendoMaskedTextBox({
            mask: '0000'
        });
        DOM.body.on('click', Functions.checkClick);
        DOM.closeButton.on('click', Functions.closeNav);
        DOM.designationList.kendoDropDownList();
        DOM.navIcon.on('click', Functions.openNav);
    });

})(jQuery, document);
