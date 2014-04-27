  var source   = $("#list-template").html();
  var template = Handlebars.compile(source);

  

function shoplist () {
	
	var parentThis = this;
	this.items;
	this.owner = "Owner not yet implemented";
	
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
			done();
		})
	}
	
	// LOAD-METHOD
	this.load = function(listID,done){
		console.log("Vi loader liste");	
		
		$.getJSON( "http://comalbum.dammyr.net//api/shop/list", function( data ) {
			parentThis.items = data;
			done(data);
		});
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
		
		var list = document.getElementById("list-group");
		new SwipeOut(list);
		/*
		$(".list-group-item").on("delete", function(evt) {
			console.log(this);
  			mylist.remove(this);
		});
		*/
		$("#shoplist").on("delete",".list-group-item", function(evt) {
			console.log("Vi bobla!");
			mylist.remove(this);
		});

		mylist.load();
	});
	// Make new list
		//Get items
			// Fill the GUI
			// Når nye ting legges til må vi ha en event eller tilsvarende som trigger oppdatering av lista... 



$('#shopadd').click(function(){
	
	var shopitem = $('#shopitem').val();
	mylist.add(shopitem, function(){
		/*
		$('.del-button').click(function(){
			shopdelete(this);		
		});	
		*/
	});
	
});

$("#shopform").submit(function(event){
	$("#shopitem").val('');
	event.preventDefault();
});	
});
