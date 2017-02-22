import $ from "jquery";

const date = new Date();
const $wrapper = $('.wrapper');

const isNight = (() => {
    if (date.getHours() >= 18) {
        return true;
    } else {
        // return false;
        return true; //debug
    }
})();


if (isNight) {
    $wrapper.addClass('night');
} else {
    $wrapper.addClass('night'); //debug
    // $wrapper.addClass('morning');
}

module.exports = isNight;
