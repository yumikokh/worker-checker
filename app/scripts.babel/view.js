import $ from "jquery";

const date = new Date();
const $wrapper = $('.wrapper');
const $currentTime = $('.current-time');
const $workingTime = $('.working-time');

const isNight = (() => {
    if (date.getHours() >= 18) {
        return true;
    } else {
        // return false;
        return true; //debug
    }
})();
module.exports = isNight;


if (isNight) {
    $wrapper.addClass('night');
} else {
    $wrapper.addClass('night'); //debug
    // $wrapper.addClass('morning');
}
const getWeekday = () => {
    const weekdayAry = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekday = date.getDay();
    return weekdayAry[weekday];
}

const getCurrentTime = () => {
    $currentTime.find('.year').text(date.getFullYear());
    $currentTime.find('.date').text(`${date.getMonth()+1}/${date.getDate()}`);
    $currentTime.find('.weekday').text(getWeekday());
    $currentTime.find('.time').text(`${date.getHours()}:${date.getMinutes()}`);
}
getCurrentTime();
setInterval(getCurrentTime, 60 * 1000);

const getWorkingTime = () => {

}

const blinkColon = setInterval(() => {
  const $time = $currentTime.find('.time');
  let text = $time.text();
  text = (/:/.test(text)) ? text.replace(":", " ") : text.replace(" ", ":");
  $time.text(text);
}, 500);