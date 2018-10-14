// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "doc is ready!" );

    var submit_msg_btn = document.getElementById("submit_msg_btn");

    submit_msg_btn.addEventListener('click', function(){
    	var msg = $("#input_msg").val();
    	if(msg){
    		put_my_message("Maher", "img/maher_pro_pic.jpg", msg)
    	}
    	
    	test1();
    	put_friend_message("Logan", "img/maher_pro_pic.jpg", "What's popping?!");

    	scrollToBottom();
    });

    // var chat_window = document.getElementById("chat-window");
    
    function put_my_message(u_name, u_pic_path, u_msg){
    	var msg_element = '<div class="row justify-content-end">\
				            <div class="card card_msg card_msg_friend">\
				              <div class="card-body card_body_msg">\
				                  <div class="row">\
				                      <div class="col-9 text-left right_zero_margin_padding text-right">\
				                        <p class="chat_msg_name bottom_zero_margin_padding text-right">'+ u_name +':</p>\
				                        <p>'+ u_msg +'</p>\
				                      </div>\
				                      <div class="col-3 text-left right_zero_margin_padding">\
				                        <img class="img-thumbnail img-fluid img-circle card-pro-pic" src="'+ u_pic_path +'">\
				                      </div>\
				                  </div>\
				              </div>\
				            </div>\
				         </div>'
		$("#chat_window").append(msg_element);
    }
    
    function put_friend_message(u_name, u_pic_path, u_msg){
    	var msg_element = '<div class="row">\
				            <div class="card card_msg card_msg_friend">\
				              <div class="card-body card_body_msg">\
				                  <div class="row">\
				                      <div class="col-3 text-left left_zero_margin_padding">\
				                        <img class="img-thumbnail img-fluid img-circle card-pro-pic" src="'+ u_pic_path +'">\
				                      </div>\
				                      <div class="col-9 text-left left_zero_margin_padding">\
				                        <p class="chat_msg_name bottom_zero_margin_padding">'+ u_name +':</p>\
				                        <p>'+ u_msg +'</p>\
				                      </div>\
				                  </div>\
				              </div>\
				            </div>\
				         </div>'
		$("#chat_window").append(msg_element);
    }

    function put_watson_message(u_msg, made_live_scroll){
    	var msg_element = '<div class="row">\
				            <div class="card card_msg card_msg_friend">\
				              <div class="card-body card_body_msg">\
				                  <div class="row">\
				                      <div class="col-3 text-left left_zero_margin_padding">\
				                        <img class="img-thumbnail img-fluid img-circle card-pro-pic" src="img/watson2_pro_pic.png">\
				                      </div>\
				                      <div class="col-9 text-left left_zero_margin_padding">\
				                        <p class="chat_msg_name bottom_zero_margin_padding">Watson:</p>\
				                        <p>'+ u_msg +'</p>\
				                      </div>\
				                  </div>\
				                  '+made_live_scroll+'\
				              </div>\
				            </div>\
				         </div>'
		$("#chat_window").append(msg_element);

    }

    function make_live_scroll(ls_eles){
    	var sum_ls_eles = ""

    	for(var i=0; i<ls_eles.length; i++){
    		sum_ls_eles += ls_eles[i];
    	}
    	var live_scroll_ele = '<div class="live__scroll">\
                    <div class="row text-center">\
                    '+ sum_ls_eles +'</div>\
                  </div>'
        return live_scroll_ele;
    }


    function make_live_scroll_ele(ls_name, ls_img_path){
    	var ls_ele = '<div class="col-4 live__scroll--box">\
		              <div class="card item_box">\
		                <img class="card-img-top" src="'+ ls_img_path +'" alt="Card image cap">\
		                <ul class="list-group">\
		                  <li class="list-group-item">'+ ls_name +'</li>\
		                  <li class="list-group-item list-group-item-secondary">\
		                    <ul class="list-inline">\
		                      <li class="list-inline-item active"><a href="#"><i class="material-icons">thumb_up</i></a></li>\
		                      <li class="list-inline-item active">|</li>\
		                      <li class="list-inline-item active"><a href="#"><i class="material-icons">thumb_down</i></a></li>\
		                    </ul>\
		                  </li>\
		                </ul>\
		              </div>\
		            </div>'
		return ls_ele;
    }

    function test1(){
    	var ls_eles = []
    	for(var i=0; i<5; i++){
    		ls_eles.push(make_live_scroll_ele("Blah Blah", "img/maher_pro_pic.jpg"));
    	}
    	var made_live_scroll = make_live_scroll(ls_eles);
    	put_watson_message("Hey, what do you think of these?", made_live_scroll);
    }
    
    function scrollToBottom(){
    	window.scrollBy({ 
		  top: 1000000, // could be negative value
		  left: 0, 
		  behavior: 'smooth' 
		});
    }

    


});