const gracePeriodForm = document.querySelector(".gracePeriod-js");
const gracePeriodInput = gracePeriodForm.querySelector("input");
const gracePeriodLabel = document.querySelector(".gracePeriodValue-js");

var gracePeriod = {
    init: function init() {
        gracePeriod.loadGracePeriod();
    },

    loadGracePeriod: function loadGracePeriod() {
        // get the grace period value from chrome storage and then set it as the interval value
    }
}

init();