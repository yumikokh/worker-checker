import $ from "jquery";

const date = new Date();
const $wrapper = $('.wrapper');
if (date.getHours() >= 18) {
    $wrapper.addClass('night');
} else {
    $wrapper.addClass('night');
    // $wrapper.addClass('morning');
}
