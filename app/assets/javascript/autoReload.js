$(function(){
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

  let reloadMessages = function(){
    let last_message_id = $('.content:last').data("id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
        let insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
          $('.contents').append(insertHTML);
          $('.contents').animate({ scrollTop: $('.contents')[0].scrollHeight});
        })
      }
    })
    .fail(function(){
      alert('error');
    })
  }
  setInterval(reloadMessages, 7000);
})