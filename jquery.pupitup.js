//PupItUp will allow you to place an image of a pup anywhere in your application by simply typing 'pupitup'
//within anywhere in your selected element
//I am calling a dog api, and the possible breeds I have programmed in are linked here
// https://dog.ceo/api/breeds/list/all

//It will pull in a random pup from whatever breed you choose, alternatively thd default will pull in a random pup
//of any breed.
//You can also determine the width and height of your pup by setting pupWidth and pupHeight in your call
//////////////////////////////////////////////////****NOTICE****/////////////////////////////////////////////////
// Since I am calling an API using AJAX, you must be running your app on a server
// whether it is local or hosted, does not matter.
// (if you are on mac, open your terminal, go into your project directory and type Python -m SimpleHTTPServer)
// (there are also multiple npms you can install for windows to get a simple local server running)


(function($) {
    $.fn.pupitup = function(options) {
        var settings = $.extend({
            pupType: "random",
            pupWidth: "200px",
            pupHeight: "200px",
            pupBorder: "none"
        }, options);

        return this.each(function() {
            var text = $(this).text();
            var textArray = text.split(" ");
            function callPups() {
                if (settings.pupType === "random") {
                    var apiUrl = 'https://dog.ceo/api/breeds/image/random';
                } else {
                    var apiUrl = 'https://dog.ceo/api/breed/' + settings.pupType + '/images'
                }
                $.ajax({
                    url: apiUrl,
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    success: function(data) {
                        if (settings.pupType === "random") {
                            pupHtml = "<img src='" + data.message + "' alt='" + settings.pupType + "'style='width:" + settings.pupWidth + "; height:" + settings.pupHeight + "; border:" + settings.pupBorder +";'>";
                        } else {
                            var pupPicUrl = data.message[Math.floor(Math.random() * data.message.length) + 0];
                            pupHtml = "<img src='" + pupPicUrl + "' alt='" + settings.pupType + "' style='width:" + settings.pupWidth + "; height:" + settings.pupHeight + "; border:" + settings.pupBorder +";'>";
                        }
                    }
                })
                return pupHtml;
            }
            $(this).html(text.replace(/pupitup/g, callPups()));
        });
    }
})
(jQuery);