import $ from "jquery";
import _ from "lodash";
import formatSheetData from "./lib/formatSheetData";
import calcDotArray from "./lib/calcDotArray";
import OfficeWindows from "./lib/OfficeWindows";
import updateWorkingTime from './view.js';

require('./view.js');

const API_ROOT_URL = "https://api.moves-app.com/api/1.1";
const PLACES = "/user/places/daily/";
const ACCESS_TOKEN = localStorage["token"];
const today = formatYYYYMMDD(new Date());
const time = formatHHMM(new Date());
let activitiesData = {};
let lastUpdate = '';
const $place = $(".place");
const $dotArea = $(".js-dot");
const $form = $("#word-form");
const $iframe = $("#hidden-iframe");

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
  updateWorkingTime(enterOfficeTime);
}).fail(res => {
  if(res.responseText === "missing_access_token") console.error("ACCESS_TOKENをオプションから設定してください。");
});


const sheetId = '1zp0po8_VMMVGGqmfA-p310lPfi6PtrDJllJCLWXblMk';
const workSheetId = 'onxsx29';
const SHEET_URL = `https://spreadsheets.google.com/feeds/list/${sheetId}/${workSheetId}/public/basic?alt=json`;
$.ajax({
  url: SHEET_URL,
  type: "GET",
  dataType: "json",
}).done((res, status, jqXHR) => {
  if(!res.feed.entry) return;
  let word = _.filter(formatSheetData(res.feed.entry), (elm) => {
    return time === elm.time;
  });
  word = word.length > 0 ? word[0].word : "つくっていいとも";
  const officeWindows = new OfficeWindows({
    canvas: document.getElementById("office-windows"),
    width: 290,
    height: 565,
    gridW: 5,
    gridH: 8,
    gridSize: 32,
    word: word,
  });
  officeWindows.draw();
  setInterval(() => {
    officeWindows.update();
    officeWindows.draw();
  }, 200);
});


// date: Date型
function formatYYYYMMDD(date) {
  const year = date.getFullYear();
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth()+1}`.slice(-2);
  return year + month + day;
}
// date: Date型
function formatHHMM(date) {
  const hour = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  return `${hour}:${minutes}`;
}


function getEnterOfficeTime(date) {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const hour = date.slice(9, 11) - 0;
  const min = date.slice(11, 13);
  const sec = date.slice(13, 15);
  return `${hour}:${min}:${sec}`;
}

function setRectAnimation(rect, duration) {
  addRect(rect);

  setInterval(() => {
    const firstRow = rect.shift();
    rect.push(firstRow);
    addRect(rect);
  }, duration);
}
