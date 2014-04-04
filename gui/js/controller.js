  var source   = $("#list-template").html();
  var template = Handlebars.compile(source);

  

function shoplist () {
	this.list = function(done){
		console.log("Vi lister din handleliste");
		$.getJSON( "http://comalbum.dammyr.net//api/shop/list", function( data ) {
			var input = {"items": data}
			$(".list-group").html(template(input));
			  $.each( data, function( key, val ) {
				console.log(val);
				  
			  });
			done();
			});
	}
	
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
	
	this.remove = function(item){
		var shopitem = {};
		shopitem.id = $(item).siblings(".shoplistitem").attr("data-id");
		shopitem.name = $(item).siblings(".shoplistitem").text();
		console.log("Vi sletter: ", shopitem);
		
		$.ajax({
		  url: "http://comalbum.dammyr.net/api/shop/"+shopitem.id,
		  type: 'DELETE'
		}).done(function(response) {
		  console.log(response[0]);	
		}).fail(function(err){
			console.warn(err);	
		});
	}
	
}





$('document').ready(function(){
	console.log("vi kjører");
	
	var mylist = new shoplist();
	
	
	function shopdelete(el) {
		$(el).siblings().addClass("striked");
		mylist.remove(el);
		function fadeout(){
			$(el).fadeOut(1000);
			$(el).parent().fadeOut(1000);
		}
		//setTimeout(function(){fadeout()}, 3000);
	}
	
	
	mylist.list(function(){
		$('.del-button').click(function(){
			shopdelete(this);		
		});	
		
		$(".list-group").children().children(".shoplistitem").each(function(){
			if($(this).attr("data-shopped") == "true"){
				$(this).addClass("striked");	
			}
		});
		
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
