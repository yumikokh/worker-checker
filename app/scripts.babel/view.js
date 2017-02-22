import $ from "jquery";

const date = new Date();
const $wrapper = $('.wrapper');
const $sky = $('.sky');
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
    $currentTime.find('.time').text(`${date.getHours()}:` + `0${date.getMinutes()}`.slice(-2));
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

        // console.log(`${hour}:${minute}:${second}`)
    }
    update();
    setInterval(update, 10 * 100);
}
module.exports = updateWorkingTime;

const to2digit = (num) => {
    return ("0" + num).slice(-2);
}

const blinkColon = setInterval(() => {
    const $time = $currentTime.find('.time');
    let text = $time.text();
    text = (/:/.test(text)) ? text.replace(":", " ") : text.replace(" ", ":");
    $time.text(text);
}, 500);


const getRandomNum = (min, max) => {
    return Math.random() * (max - min) + min;
}

const createStar = () => {
    let i = 0;
    while (i < 40) {
        const pos = { x: getRandomNum(0, 100), y: getRandomNum(0, 100) };
        const $star = $('<div />').addClass('star').css({
            left: `${pos.x}%`,
            top: `${pos.y}%`
        });
        $sky.append($star);
        i++;
    }
}

const createShootingStar = () => {
    const pos = { x: getRandomNum(0, 70), y: getRandomNum(0, 50) };
    const degNum = Math.floor(getRandomNum(0, 70));
    console.log(degNum)
    const $shootingStar = $('<div />').addClass('shootingStar').css({
        right: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: `rotateZ(${degNum}deg)`,
    });
    $sky.append($shootingStar);

    setTimeout(()=>{
      $shootingStar.remove();
    }, 1000);
}

if (isNight) {
    createStar();
    setInterval(createShootingStar, 1200);
}
