import $ from "jquery";
import _ from "lodash";

const API_ROOT_URL = "https://api.moves-app.com/api/1.1";
const ACTIVITY = "/user/activities/daily/";
const ACCESS_TOKEN = "Jcd9PJT89wW2OqEq1BM93_Q1hJQ8II3ImQyD2muH2OPk9Uc_wTyVsWrWY6Cw1bj9";
const today = formatYYYYMMDD(new Date());

/*
TODO: 出社時間の取得
- segments[firstOfficeEnteringIndex].startTime;
*/
$.ajax({
  url: `${API_ROOT_URL}${ACTIVITY}${today}`,
  type: "GET",
  dataType: "json",
  data: {
    access_token: ACCESS_TOKEN,
  },
}).done((res, textStatus, jqXHR) => {
  console.log(res, textStatus, jqXHR);
});

// date: Date型
function formatYYYYMMDD(date) {
  if(!date.getYear) date = new Date(date);
  const year = date.getFullYear();
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth()+1}`.slice(-2);
  return year + month + day;
}

