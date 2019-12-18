$(function(){

  function buildHTML(message){

    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      <img src="${message.image}" class="lower-message__image" >
                    </div>
                  </div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <img src="${message.image}" class="lower-message__image" >
                    </div>
                  </div>`
    };
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.chat-main__message-form--box__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert('通信に失敗しました');
    })
  })


    var reloadMessages = function() {
      
      if (window.location.href.match(/\/groups\/\d+\/message/)) {   //今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
      
      last_message_id = $('.message:last').data("message-id");  //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。 
      
        $.ajax({
          url: 'api/messages',    // # 取得したグループでのメッセージ達から、idがlast_message_idよりも新しい(大きい)メッセージ達のみを取得
          type: 'GET',          //ルーティングで設定した通りhttpメソッドをgetに指定
          dataType: 'json',
          data: {id: last_message_id}          //dataオプションでリクエストに値を含める
        })
        .done(function(messages) {
          var insertHTML = '';          //追加するHTMLの入れ物を作る
          $.each(messages, function(i, message) { 　//配列のmessagesの中身を一つ一つ取り出し、HTMLに変換したものを入れ物に足し合わせる
            insertHTML += buildHTML(message)
          });
        
          $('.messages').append(insertHTML);        //メッセージが入ったHTMLに、入れ物ごと追加
          $('.chat-main__message-form--box__submit-btn').animate({ scrollTop: $('.chat-main__message-form--box__submit-btn')[0].scrollHeight});
        })
    }
  }
  setInterval(reloadMessages, 7000);
});
