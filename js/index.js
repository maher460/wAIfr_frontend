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
    var data = [['EU', 'Paris', 'France', '$$$', 'Temperate', 'Museums', 'No Coast'], 
		        ['EU', 'London', 'Britain', '$$ ', 'Cold', 'Theatre', 'No Coast'], 
		        ['EU', 'Venice', 'Italy', '$$$', 'Temperate', 'History', 'Coast'], 
		        ['EU', 'Bucharest', 'Romania', '$ ', 'Temperate', 'History', 'No Coast'], 
		        ['EU', 'Podgorica', 'Montenegro', '$ ', 'Temperate', 'Outdoors', 'No Coast'], 
		        ['NA', 'New York', 'USA', '$$$', 'Cold', 'Theatre', 'No Coast'], 
		        ['NA', 'Boulder ', 'USA', '$$', 'Cold', 'Outdoors', 'No Coast'], 
		        ['NA', 'Cancun', 'Mexico', '$', 'Hot', 'Party', 'Coast'], 
		        ['NA', 'San Francisco', 'USA', '$$', 'Temperate', 'Party', 'Coast'], 
		        ['NA', 'Los Angeles', 'USA', '$$$', 'Temperate', 'Party', 'Coast'], 
		        ['NA', 'Kansas City', 'USA', '$$', 'Temperate', 'Outdoors', 'No Coast'], 
		        ['EA', 'Hong Kong', 'China', '$$$', 'Hot', 'Shopping', 'No Coast'], 
		        ['EA', 'Tokyo', 'Japan', '$ ', 'Temperate', 'Shopping', 'No Coast'], 
		        ['EA', 'Shenzhen', 'China', '$$ ', 'Hot', 'Technology', 'No Coast'], 
		        ['EA', 'Mumbai', 'India', '$$ ', 'Hot', 'Culture', 'Coast'], 
		        ['EA', 'New Delhi', 'India', '$$$ ', 'Hot', 'Culture', 'No Coast'], 
		        ['SA', 'Rio de Janeiro', 'Brasil', '$$$', 'Temperate', 'Soccer', 'No Coast'], 
		        ['SA', 'Panama City', 'Panama', '$ ', 'Hot', 'Canal', 'Coast'], 
		        ['SA', 'Lima', 'Peru', '$$ ', 'Hot', 'Outdoors', 'No Coast'], 
		        ['SA', 'Guatemala City', 'Guatemala', '$$ ', 'Hot', 'Culture', 'No Coast'], 
		        ['SA', 'Buenos Aires', 'Argentina', '$$$ ', 'Temperate', 'Soccer', 'Coast'], 
		        ['AF', 'Lagos', 'Nigeria', '$$$', 'Hot', 'Outdoors', 'No Coast'], 
		        ['AF', 'Johannesburg', 'South Africa', '$$ ', 'Temperate', 'Culture', 'No Coast'], 
		        ['AF', 'Cairo ', 'Egypt', '$', 'Temperate', 'Pyramids', 'Coast'], 
		        ['AF', 'Nairobi', 'Kenya', '$$$', 'Hot', 'Outdoors', 'No Coast'], 
		        ['AF', 'Algiers', 'Algeria', '$', 'Hot', 'Outdoors', 'Coast']]

	var activities = [['Culture', "img/activities/culture.jpg"],
					  ['History', "img/activities/history.jpg"],
					  ['Museums', "img/activities/museums.jpg"],
					  ['Outdoors', "img/activities/outdoors.jpg"],
					  ['Party', "img/activities/party.jpg"],
					  ['Shopping', "img/activities/shopping.jpg"],
					  ['Soccer', "img/activities/soccer.jpg"],
					  ['Technology', "img/activities/technology.jpg"],
					  ['theatre', "img/activities/theatre.jpg"]]

	var cities = [['Algiers', "img/cities/algiers - Edited.jpg"],
				  ['Boulder', "img/cities/boulder - Edited.jpg"],
				  ['Bucharest', "img/cities/bucharest - Edited.jpg"],
				  ['Buenos Aires', "img/cities/buenos aires - Edited.jpg"],
				  ['Cairo', "img/cities/cairo - Edited.jpg"],
				  ['Cancun', "img/cities/cancun - Edited.jpg"],
				  ['Guatemalacity', "img/cities/guatemalacity - Edited.jpg"],
				  ['Hong Kong', "img/cities/hongkong - Edited.jpg"]]


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

    setTimeout(run_telescript, 2000);



    submit_msg_btn.addEventListener('click', function(){
    	var msg = $("#input_msg").val();
    	if(msg){
    		put_my_message(people_info[ME][0], people_info[ME][1], msg);
    		waiting_for_me = false;
    		$("#input_msg").val("");
    	}
    	
    });

    document.addEventListener('keypress', function(e){
    	if(e.keyCode == 13){
    		var msg = $("#input_msg").val();
	    	if(msg){
	    		put_my_message("Maher", "img/maher_pro_pic.jpg", msg);
	    		waiting_for_me = false;
	    		$("#input_msg").val("");
	    	}
    	}
    	
    	
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
		setTimeout(run_telescript, 2000);
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
		setTimeout(run_telescript, 2000);
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
		setTimeout(run_telescript, 2000);
		$(".thumb").unbind();
		$('.thumb').click(function() {
	    	console.log("thumb clicked!");
		    $(this).toggleClass('color_blue');
		});
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
		                      <li class="list-inline-item active"><a><i class="material-icons thumb">thumb_up</i></a></li>\
		                      <li class="list-inline-item active">|</li>\
		                      <li class="list-inline-item active"><a><i class="material-icons thumb">thumb_down</i></a></li>\
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
    	var ls_eles = []
    	for(var i=0; i<activities.length; i++){
    		ls_eles.push(make_live_scroll_ele(activities[i][0], activities[i][1]));
    	}
    	var made_live_scroll = make_live_scroll(ls_eles);
    	return made_live_scroll;
    }

    function invite_friends(){

        setTimeout(function(){
        	var invite_ele = '<div class="row justify-content-center">\
	            <div class="card card_msg invite_card">\
	              <div class="card-body card_body_msg text-center">\
	                <p class="bottom_zero_margin_padding"><em>Watson added Logan to the chat<em></p>\
	              </div>\
	            </div>\
	          </div>\
	          <div class="row justify-content-center">\
	            <div class="card card_msg invite_card">\
	              <div class="card-body card_body_msg text-center">\
	                <p class="bottom_zero_margin_padding"><em>Watson added Maher to the chat<em></p>\
	              </div>\
	            </div>\
	          </div>\
	          <div class="row justify-content-center">\
	            <div class="card card_msg invite_card">\
	              <div class="card-body card_body_msg text-center">\
	                <p class="bottom_zero_margin_padding"><em>Watson added Matei to the chat<em></p>\
	              </div>\
	            </div>\
	          </div>';
	          $("#chat_window").append(invite_ele);
	          scrollToBottom();
        }, 250);

    	return "";
    }


    function show_cities(){
    	var ls_eles = []
    	for(var i=0; i<activities.length; i++){
    		ls_eles.push(make_live_scroll_ele(cities[i][0], cities[i][1]));
    	}
    	var made_live_scroll = make_live_scroll(ls_eles);
    	return made_live_scroll;
    }

    

    


});