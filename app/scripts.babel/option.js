import $ from "jquery";

const $token = $("#token");
const $btn = $("#save");
if(localStorage["token"]) $token.val(localStorage["token"]);
$btn.on("click", (evt) => {
  localStorage["token"] = $token.val();
  $("body").prepend("更新されました。");
});
