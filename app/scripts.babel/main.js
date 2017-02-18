import $ from "jquery";
import _ from "lodash";
import formatSheetData from "./lib/formatSheetData";
import calcDotArray from "./lib/calcDotArray";

const API_ROOT_URL = "https://api.moves-app.com/api/1.1";
const PLACES = "/user/places/daily/";
const ACCESS_TOKEN = "3o1RGDb8xLkcE0sx7lp4r243daQQt8WbyxmU9yd3MIGoWCMsLWFMO_80RFIIlBXO";
const today = formatYYYYMMDD(new Date());
let activitiesData = {};
let lastUpdate = '';
const $update = $(".last-update");
const $place = $(".place");
const $dotArea = $(".js-dot");
const $form = $("#word-form");
const $iframe = $("#hidden-iframe");
let rect = calcDotArray("あ", 32);


/*
TODO: 出社時間の取得
- segments[firstOfficeEnteringIndex].startTime;
*/

$.ajax({
  url: `${API_ROOT_URL}${PLACES}${today}`,
  type: "GET",
  dataType: "json",
  data: {
    access_token: ACCESS_TOKEN,
  },
}).done((res, status, jqXHR) => {
  lastUpdate = res[0].lastUpdate;
  activitiesData = res[0].segments;
  const placeName = /カヤック/g;
  const placeData = _.filter(activitiesData, (elm) => {
    return placeName.test(elm.place.name) && elm.startTime.slice(6, 8) === today.slice(-2);
  });
  const enterOfficeTime = placeData.length > 0 ? getEnterOfficeTime(placeData[0].startTime) : "出社してないよ！";
  $update.text(enterOfficeTime);
});

setRectAnimation();


const sheetId = '1zp0po8_VMMVGGqmfA-p310lPfi6PtrDJllJCLWXblMk';
const workSheetId = 'onxsx29';
const SHEET_URL = `https://spreadsheets.google.com/feeds/list/${sheetId}/${workSheetId}/public/basic?alt=json`;
$.ajax({
  url: SHEET_URL,
  type: "GET",
  dataType: "json",
}).done((res, status, jqXHR) => {
  if(!res.feed.entry) return;
  console.log(formatSheetData(res.feed.entry));
});

$form.submit(() => {
  console.log("送った");
});
$iframe.on("load", () => {
  $("body").append("<p>送信しました。</p>");
});


// date: Date型
function formatYYYYMMDD(date) {
  const year = date.getFullYear();
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth()+1}`.slice(-2);
  return year + month + day;
}


function getEnterOfficeTime(date) {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const hour = date.slice(9, 11);
  const min = date.slice(11, 13);
  const sec = date.slice(13, 15);
  return `${hour}:${min}:${sec}`;
}

function setRectAnimation() {
  addRect();

  setInterval(() => {
    const firstRow = rect.shift();
    rect.push(firstRow);
    addRect();
  }, 500);
}

function addRect() {
  $dotArea.text("");
  for(let i = 0, row = rect.length; i < row; i++) {
    for(let j = 0, col = rect[i].length; j < col; j++) {
      $dotArea.append(rect[i][j] ? "■": "□");
    }
    $dotArea.append("\n");
  }
}
