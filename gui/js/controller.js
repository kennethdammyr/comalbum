  var source   = $("#list-template").html();
  var template = Handlebars.compile(source);

  

function shoplist () {
	
	this.items;
	this.owner = "Owner not yet implemented";
	
	// SHOW-METHOD
	this.show = function(done){
		console.log("Vi lister din handleliste");
		$("#shoplist").addClass("loading");
		
		$.getJSON( "http://comalbum.dammyr.net//api/shop/list", function( data ) {
			$("#shoplist").removeClass("loading");
			var input = {"items": data}
			$(".list-group").html(template(input));
			  $.each( data, function( key, val ) {
				items = val;
			  });
			done();
			
			});
	}
	
	// RELOAD-METHOD
	this.reload = function(done){
		console.log("Vi reloader aktiv liste");	
		
		
		
		//done();
	}
	
	
	// ADD-METHOD
	this.add = function(item, done){
		console.log("Vi legger til: ", item);
			
		var senddata = {
			"name"		: item,
			"owner"		: 0,
			"shopped"	: "false"
		}
		var input = {"items": senddata}
		$(".list-group").append(template(input));
		done();
		$.ajax({
		  url: "http://comalbum.dammyr.net/api/shop/",
		  contentType: "application/json",
		  data: JSON.stringify(senddata),
		  type: 'POST'
		}).done(function(response) {
		  console.log(response[0]);
			
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
		  console.log(response);	
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
		
		$(".list-group-item").on("delete", function(evt) {
			console.log(this);
  			mylist.remove(this);
		});

		console.log(mylist.owner);
	});
	// Make new list
		//Get items
			// Fill the GUI
			// Når nye ting legges til må vi ha en event eller tilsvarende som trigger oppdatering av lista... 



$('#shopadd').click(function(){
	
	var shopitem = $('#shopitem').val();
	mylist.add(shopitem, function(){
		$('.del-button').click(function(){
			shopdelete(this);		
		});	
	});
	
});

$("#shopform").submit(function(event){
	$("#shopitem").val('');
	event.preventDefault();
});	
});
