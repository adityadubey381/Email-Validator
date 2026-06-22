console.log("this my script");

window.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("emailForm");
    var resultCont = document.getElementById("resultCont");

    if (!form || !resultCont) {
        console.error("Required DOM elements are missing.");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        form.action = "";

        var emailInput = document.getElementById("username");
        var email = emailInput ? emailInput.value.trim() : "";
        if (!email) {
            resultCont.innerHTML = "<div>Please enter an email address.</div>";
            return;
        }

        var apiKey = "ema_live_gQleB3UA7TvdEc3zkVLiZMSgMwI0yKhzRmPgOBvs";
        var url = "https://api.emailvalidation.io/v1/info?apikey=" + encodeURIComponent(apiKey) + "&email=" + encodeURIComponent(email);

        function renderResult(result) {
            var html = "";
            for (var key in result) {
                if (Object.prototype.hasOwnProperty.call(result, key)) {
                    html += '<div><strong>' + key + ':</strong> ' + result[key] + '</div>';
                }
            }
            resultCont.innerHTML = html;
        }

        function renderError(message) {
            console.error(message);
            resultCont.innerHTML = '<div>Request failed: ' + message + '</div>';
        }

        if (window.fetch) {
            fetch(url)
                .then(function (res) {
                    if (!res.ok) {
                        throw new Error('HTTP ' + res.status + ' ' + res.statusText);
                    }
                    return res.json();
                })
                .then(function (result) {
                    renderResult(result);
                })
                .catch(function (error) {
                    renderError(error.message || error);
                });
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            renderResult(JSON.parse(xhr.responseText));
                        } catch (error) {
                            renderError("Invalid JSON response");
                        }
                    } else {
                        renderError('HTTP ' + xhr.status + ' ' + xhr.statusText);
                    }
                }
            };
            xhr.send(null);
        }
    });
});




