// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "doc is ready!" );

    var submit_msg_btn = document.getElementById("submit_msg_btn");

    var WATSON = 0;
    var ME = 1;
    var FRIEND1 = 2;
    var FRIEND2 = 3;
    var FRIEND3 = 4;
    var WAIT_FOR_ME_T = true;
    var WAIT_FOR_ME_F = false;
    var waiting_for_me = false;
    var waiting_for_ajax = false;
    var people_info = [["Watson", "img/watson2_pro_pic.png"],
    				   ["Dan", "img/dan_pro_pic.jpg"],
    				   ["Maher", "img/maher_pro_pic.jpg"],
    				   ["Logan", "img/logan_pro_pic.jpg"],
    				   ["Matei", "img/matei_pro_pic.jpg"]]
    var telescript = [[WATSON, "Hi Dan, ready to start planning your next trip?", WAIT_FOR_ME_T, null],
    				  [WATSON, "How about we invite some of your other friends to plan a trip together?", WAIT_FOR_ME_T, null],
    				  [WATSON, "Cool, adding them up now!", WAIT_FOR_ME_T, invite_friends],
    				  [FRIEND1, "Heyy, what's poppinng, all? WATSONN!!!! You are so cool, man!", WAIT_FOR_ME_F, null],
    				  [FRIEND2, "LOL", WAIT_FOR_ME_F, null],
    				  [FRIEND3, "Hi, all!", WAIT_FOR_ME_F, null],
    				  [WATSON, "They're all here now! Tell me some of your travel interests.", WAIT_FOR_ME_F, show_interests],
    				  [FRIEND2, "I want to hike", WAIT_FOR_ME_T, null],
    				  [FRIEND3, "I want nature but still near a city", WAIT_FOR_ME_F, null],
    				  [FRIEND1, "I like fishing", WAIT_FOR_ME_F, null],
    				  [WATSON, "Where are some of your geographic interests?", WAIT_FOR_ME_T, show_interests],
    				  [FRIEND1, "I want to go out west", WAIT_FOR_ME_T, null],
    				  [FRIEND2, "I'd like to see Europe", WAIT_FOR_ME_T, null],
    				  [FRIEND3, "I don't want to travel far", WAIT_FOR_ME_F, null]
    				  ]
    				  
    				  

    console.log(telescript);

    var telescript_idx = 0;
    function run_telescript(){
    	var tele_item = telescript[telescript_idx];
    	console.log(telescript_idx);
    	console.log(tele_item);
    	console.log(telescript);

	    	if((tele_item[2] === false) || (waiting_for_me === false)){
	    		if(tele_item[0] === WATSON){
	    			var u_name = people_info[WATSON][0];
		    		var u_pic_path = people_info[WATSON][1];;
	    			var extra_stuff = "";
	    			if(tele_item[3] != null){
	    				extra_stuff = tele_item[3]();
	    			}
	    			put_watson_message(u_name, u_pic_path, tele_item[1], extra_stuff);
		    	}
		    	else if(tele_item[0] === FRIEND1){
		    		var u_name = people_info[FRIEND1][0];
		    		var u_pic_path = people_info[FRIEND1][1];;
		    		put_friend_message(u_name, u_pic_path, tele_item[1])
		    	}
		    	else if(tele_item[0] === FRIEND2){
		    		var u_name = people_info[FRIEND2][0];
		    		var u_pic_path = people_info[FRIEND2][1];;
		    		put_friend_message(u_name, u_pic_path, tele_item[1])
		    	}
		    	else if(tele_item[0] === FRIEND3){
		    		var u_name = people_info[FRIEND3][0];
		    		var u_pic_path = people_info[FRIEND3][1];;
		    		put_friend_message(u_name, u_pic_path, tele_item[1])
		    	}

		    	waiting_for_me = true;
		    	telescript_idx++;
	    	}
    }

    setTimeout(run_telescript, 1000);



    submit_msg_btn.addEventListener('click', function(){
    	var msg = $("#input_msg").val();
    	if(msg){
    		put_my_message(people_info[ME][0], people_info[ME][1], msg);
    		waiting_for_me = false;
    	}
    	
    	// test1();
    	// put_friend_message("Logan", "img/maher_pro_pic.jpg", "What's popping?!");
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
		scrollToBottom();
		setTimeout(run_telescript, 1000);
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
		scrollToBottom();
		setTimeout(run_telescript, 1000);
    }

    function put_watson_message(u_name, u_pic_path, u_msg, made_live_scroll){
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
				                  '+made_live_scroll+'\
				              </div>\
				            </div>\
				         </div>'
		$("#chat_window").append(msg_element);
		scrollToBottom();
		setTimeout(run_telescript, 1000);
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
		                      <li class="list-inline-item active"><a href=""><i class="material-icons">thumb_up</i></a></li>\
		                      <li class="list-inline-item active">|</li>\
		                      <li class="list-inline-item active"><a href=""><i class="material-icons">thumb_down</i></a></li>\
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

    function show_interests(){
    	return "";
    }

    function invite_friends(){
    	return "";
    }

    


});