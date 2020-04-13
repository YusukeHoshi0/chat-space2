$(function() {
  function buildHTML(message){
    if (message.image) {
      var html = 
      `<div class="content" data-id="${message.id}">
        <div class="content__upper-info">
          <div class="content__upper-info--user-name">
            ${message.user_name}
          </div>
          <div class="content__upper-info--date">
            ${message.created_at}
          </div>
        </div>
        <div class="content--body">
          <p class="message__text">
            ${message.content}
          </p>
          <img src="${message.image}">
        </div>
      </div>`
    } else {
      var html = 
      `<div class="content" data-id="${message.id}">
        <div class="content__upper-info">
          <div class="content__upper-info--user-name">
            ${message.user_name}
          </div>
          <div class="content__upper-info--date">
            ${message.created_at}
          </div>
        </div>
        <div class="content--body">
          <p class="message__text">
            ${message.content}
          </p>
        </div>
      </div>`
    }
    return html
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    console.log("hello world"); 
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.contents').append(html);
      $('#new_message')[0].reset();
      $('.contents').animate({ scrollTop: $('.contents')[0].scrollHeight});
      $('.submit-btn').attr('disabled', '');
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});