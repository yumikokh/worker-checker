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
setInterval(getCurrentTime, 20 * 1000);

const updateWorkingTime = (enterOfficeTime) => {
    const ary = enterOfficeTime.split(":");
    const officeTimeObj = new Date(date.getFullYear(), date.getMonth(), date.getDate(), ary[0], ary[1], ary[2]);

    $workingTime.find('.last-update').text(enterOfficeTime);

    const update = () => {
        const currentTimeObj = new Date();
        const passingsec = (currentTimeObj.getTime() - officeTimeObj.getTime()) / 1000;
        const hour = to2digit(Math.floor(passingsec / 60 / 60));
        const minute = to2digit(Math.floor(passingsec % 3600 / 60 | 0));
        const second = to2digit(Math.floor(passingsec % 60));



        $workingTime.find('.count').text(`${hour}:${minute}:${second}`);

        console.log(`${hour}:${minute}:${second}`)
    }
    update();
    setInterval(update, 10 * 100);
}

const to2digit = (num) => {
    return ("0" + num).slice(-2);
}

module.exports = updateWorkingTime;
