import $ from "jquery";

const $form = $("#word-form");
const $iframe = $("#hidden-iframe");

$form.submit(() => {
  console.log("送った");
});
$iframe.on("load", () => {
  $("body").append("<p>送信しました。</p>");
});
