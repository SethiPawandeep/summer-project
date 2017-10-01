(function ($, d) {
    var DOM = {
            body: $('body'),
            boxRegisterButton: $('.boxRegisterButton'),
            closeButton: $('.closeButton'),
            confirmPassword: $('#confirmPassword'),
            designationList: $('#designation'),
            empId: $('#empId'),
            empName: $('#empName'),
            errorBox: $('.error'),
            errorMessage: $('.errorMessage'),
            loginBox: $('#loginBox'),
            loginBoxClose: $('.loginBoxClose'),
            loginButton: $('.loginButton'),
            navbar: $('.navbar'),
            navIcon: $('.navIcon'),
            password: $('.registerForm #password'),
            registerForm: $('.registerForm form'),
            captcha: $('.g-recaptcha'),
            updateForm: $('.welcome form'),
            address: $('#address'),
            create: $('.create form'),
            success: $('.success')
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
            submitRegisterForm: function (event) {
                if (Variables.formCorrect === true) {
                    $.post($(this).attr('action'), $(this).serialize(), function (json) {
                        console.log(json);
                        if (json.responseCode === 1) {
                            DOM.errorBox.css('position', 'absolute');
                            DOM.errorBox.css('visibility', 'visible');
                            DOM.errorMessage.html('Please select captcha');
                            DOM.password.val('');
                            DOM.confirmPassword.val('');
                            return false;
                        } else if (json.responseCode === 2) {
                            DOM.errorBox.css('position', 'absolute');
                            DOM.errorBox.css('visibility', 'visible');
                            DOM.errorMessage.html('Failed Captcha Verification. Refreshing page in 5s.');
                            setTimeout(function () {
                                location.reload();
                            }, 10000);
                        } else if (json.responseCode == 23505) {
                            DOM.errorBox.css('position', 'absolute');
                            DOM.errorBox.css('visibility', 'visible');
                            DOM.errorMessage.html('User with Employee ID already exists.');
                            return false;
                        } else {
                            window.location.replace('http://localhost:3000');
                        }
                    }, 'json');
                } else {
                    return false;
                }
                return false;
            },
            showBox: function (event) {
                DOM.loginBox.css('margin-top', 0);
                DOM.empName.focus();
            },
            closeBox: function (event) {
                DOM.loginBox.css('margin-top', '100vh');
            },
            submitUpdateForm: function (event) {
                $.ajax({
                    type: 'post',
                    url: '/profile',
                    data: {
                        name: $('#empName').val(),
                        empId: $('#empId').val(),
                        designation: $('#designation').val()
                    },
                    success: function (responseData, status, xhr) {
                        if (responseData.a === true) {
                            DOM.success.css('visibility', 'visible');
                            DOM.success.css('position', 'static');
                            DOM.errorMessage.html('Designation updated successfully');
                        }
                    },
                    error: function (res, status, xhr) {
                        alert('Update Failed');
                    }
                });
                return false;
            },
            showMap: function (event) {
                var address = DOM.address.val();
                var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBdExNx7DlcAvqDz7c3-UtABFC0Nv6RWN8";
                $.ajax({
                    type: 'post',
                    url: url,
                    success: function (responseData, status, xhr) {
                        var coords = {};
                        console.log(responseData["results"][0]["geometry"]["location"]);
                        console.log(responseData);
                        coords.lat = responseData["results"][0]["geometry"]["location"].lat;
                        coords.long = responseData["results"][0]["geometry"]["location"].lng;
                        console.log(coords.lat, coords.long);
                        var myCenter = new google.maps.LatLng(coords.lat, coords.long);
                        var mapCanvas = document.getElementById("map");
                        var mapOptions = {
                            center: myCenter,
                            zoom: 15
                        };
                        var map = new google.maps.Map(mapCanvas, mapOptions);
                        var marker = new google.maps.Marker({
                            position: myCenter
                        });
                        marker.setMap(map);
                        console.log(DOM.create);
                        DOM.create.append($('<input type="text" value="' + coords.lat + '" name="lat" hidden>'));
                        DOM.create.append($('<input type="text" value="' + coords.long + '" name="long" hidden>'));
                        console.log(DOM.create);

                    },
                    error: function (res, status, xhr) {
                        alert('ERROR!');
                    }
                });

            }
        },
        Variables = {
            formCorrect: false,
            hiddenDesignation: $('.hiddenDesignation').val() || 'Scientist A'
            //            data: !{data}
        };

    $(document).ready(function () {
        DOM.empId.kendoMaskedTextBox({
            mask: '0000'
        });
        //        console.log(Variables.data);
        DOM.body.on('click', Functions.checkClick);
        DOM.closeButton.on('click', Functions.closeNav);
        DOM.designationList.kendoDropDownList({
            value: Variables.hiddenDesignation
        });
        $('#location').kendoDropDownList({
            dataTextField: 'address',
            dataValueField: 'id',
            dataSource: {
                type: 'json',
                transport: {
                    read: 'http://localhost:3000/location/fetch'
                }
            }
        });
        DOM.navIcon.on('click', Functions.openNav);
        DOM.loginButton.on('click', Functions.showBox);
        DOM.loginBoxClose.on('click', Functions.closeBox);
        DOM.confirmPassword.on('blur', Functions.checkPassword);
        DOM.password.on('blur', Functions.checkPasswordLength);
        DOM.registerForm.submit(Functions.submitRegisterForm);
        DOM.updateForm.submit(Functions.submitUpdateForm);
        DOM.address.on('blur', Functions.showMap);
    });

})(jQuery, document);
