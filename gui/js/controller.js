  var source   = $("#list-template").html();
  var template = Handlebars.compile(source);

  

function shoplist () {
	
	var parentThis = this;
	this.items;
	this.owner = "Owner not yet implemented";
	
	
	// LOAD-METHOD
	this.load = function(listID,done){
		console.log("Vi loader liste");	
		
		$.getJSON( "http://comalbum.dammyr.net//api/shop/list", function( data ) {
			parentThis.items = data;
			done(data);
		});
	}
	
	// SHOW-METHOD
	this.show = function(done){
		console.log("Vi lister din handleliste");
		$("#shoplist").addClass("loading");
		/*
		$.getJSON( "http://comalbum.dammyr.net//api/shop/list", function( data ) {
			$("#shoplist").removeClass("loading");
			var input = {"items": data}
			$(".list-group").html(template(input));
			  var items = $.each( data, function( key, val ) {
				return val;
			  });
			done();
			});
		*/
		parentThis.load(0,function(items){
			$("#shoplist").removeClass("loading");
			var input = {"items": items}
			$(".list-group").html(template(input));
			var list = document.getElementById("list-group");
			new SwipeOut(list);
			//done();
		})
	}
	
	
	// ADD-METHOD
	this.add = function(item, done){
		$("#shoplist").addClass("loading");
		console.log("Vi legger til: ", item);
		
		var senddata = {
			"name"		: item,
			"owner"		: 0,
			"shopped"	: "false"
		}
		var input = {"items": senddata}
		//$(".list-group").append(template(input));
		done();
		
		$.ajax({
			url: "http://comalbum.dammyr.net/api/shop/",
			contentType: "application/json",
			data: JSON.stringify(senddata),
			type: 'POST'
		}).done(function(response) {
			console.log("Response fra ADD i API:",response[0]);
			parentThis.items.push(response[0]);
			var input = {"items": response[0]}
			$(".list-group").append(template(input));
		}).fail(function(err){
			console.warn(err);	
		});
	}
	
	// REMOVE-METHOD
	this.remove = function(item){
		var shopitem = {};
		shopitem.name = $(item).attr("data-name");
		shopitem.id = $(item).attr("data-id");
		
		
		console.log("Vi sletter: ", shopitem);
		
		$.ajax({
		  url: "http://comalbum.dammyr.net/api/shop/"+shopitem.id,
		  type: 'DELETE'
		}).done(function(response) {
		  console.log("Response fra DELETE i API:",response);	
		}).fail(function(err){
			console.warn(err);	
		});
		
	}
	
}





$('document').ready(function(){
	console.log("vi kjører");
	
	var mylist = new shoplist();
	
	mylist.show(function(){
		

	});

	
	// Make new list
		//Get items
			// Fill the GUI
			// Når nye ting legges til må vi ha en event eller tilsvarende som trigger oppdatering av lista... 

	$("#shoplist").on("delete",".list-group-item", function(evt) {
		console.log("Vi bobla!");
		mylist.remove(this);
	});

	$('#shopadd').click(function(){

		var shopitem = $('#shopitem').val();
		mylist.add(shopitem, function(){

		});

	});
	
	// Reload list on scroll to top
	var scrollActive = false;
	$( window ).scroll(function(e){
		
		$("#shoplist").addClass("loading");
		if ($(window).scrollTop() < -20) {
			//console.log("vi scroller -20", scrollActive);
			if (!scrollActive){
				scrollActive = true;
				//console.log("klare!", scrollActive);
				
				mylist.load(0,function(items){
					$("#shoplist").removeClass("loading");
					var input = {"items": items}
					$(".list-group").html(template(input));
					
					var list = document.getElementById("list-group");
					new SwipeOut(list);

				});

			}
		} else if ($(window).scrollTop() >= 0) {
			scrollActive = false;
		}
		
		
	});

	$("#shopform").submit(function(event){
		$("#shopitem").val('');
		event.preventDefault();
	});	
});
