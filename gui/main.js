$('document').ready(function(){
	console.log("vi kjører");

	
});

function shopdelete(el) {
	$(el).siblings().addClass("striked");
	
	function fadeout(){
		$(el).fadeOut(1000);
		$(el).parent().fadeOut(1000);
	}
	
	setTimeout(function(){fadeout()}, 3000);
	
}


	
$('#shopadd').click(function(){
	var shopitem = $('#shopitem').val();
	$('#shoplist > div').append("<span class=\"list-group-item\"><span class=\"shoplistitem\">"+shopitem+"</span><span class=\"pull-right del-button glyphicon glyphicon-remove\"></span></span>");
	//<span class=\"btn-group pull-right\"><button type=\"button\" class=\"btn btn-default\">Del</button>
	$('.del-button').click(function(){
		shopdelete(this);		
	});
});

$("#shopform").submit(function(event){
	$("#shopitem").val('');
	event.preventDefault();
});