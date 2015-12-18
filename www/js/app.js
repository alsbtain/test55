(function(){
   

    var htmlContainer = $("#htmlWrapper");
    var htmlContainer1 = $("#wrapperadmin");
    checkReply = function(data) {
        if (typeof(data.status) != "undefined") {
           
            alert(data.message);
            return false;
        } else {
            return true;
        }
    };
    server = {
        url:"http://sbta.in/websites/service/",
            request: function(options) {
                return $.post(server.url+"index.php", options).promise();
            },
            debug: function(options) {
                return $.post(server.url+"debug.php", options).promise();
            }

       
        }
        
$.usersession = {
	login : false,
	userID :"",
	userAuth : function( id ){
		server.request({route:{app:"loadinformation",id:id}})
		.done(
			function(data){

				console.log( data );
				var isAdmin  = localStorage.getItem("isAdmin");
				if(isAdmin==1){
					 var source   = $("#admininfo-wrapper").html();
	            var template = Handlebars.compile(source);
	            var html    = template(data);
	            htmlContainer.html(html);
	            
				}else{
					
					 var source   = $("#userinfo-wrapper").html();
	            var template = Handlebars.compile(source);
	            var html    = template(data);
	            htmlContainer.html(html);
				}
				
	            
	            
			}
			
		);
	},
	empdisplay:function(id){
		server.request({route:{app:"loadinformation",id:id}})
		.done(
			function(data){
				 var source   = $("#admininfoemp-wrapper").html();
            var template = Handlebars.compile(source);
            var html    = template(data);
            htmlContainer.html(html);
			}
	);	
	},
		pointss:function(id){
		server.request({route:{app:"loadinformation",id:id}})
		.done(
			function(data){
				 var source   = $("#pointss-wrapper").html();
            var template = Handlebars.compile(source);
            var html    = template(data);
            htmlContainer.html(html);
			}
	);	
	},
	empinfo:function(id){
		server.request({route:{app:"loadinformation",id:id}})
		.done(
			function(data){
				console.log(data);
				 var source   = $("#empinfo-wrapper").html();
            var template = Handlebars.compile(source);
            var html    = template(data);
            $("#loadmehere").html(html);
			}
		);
	},
	
		createtask:function(){
		server.request({route:{app:"loadcreate"}})
		.done(
			function(data){
			console.log(data);	
			var source   = $("#createtask-wrapper").html();
            var template = Handlebars.compile(source);
            var html    = template(data);
            $("#loadmethere").html(html);
			}
		);
	},
		offerss:function(id){
		 server.request({route:{app:"loadinformation",id:id}})
		.done(function(data){
			console.log(data);
	        var source   = $("#offers-wrapper").html();
            var template = Handlebars.compile(source);
            var html  = template(data);
           
	            htmlContainer.html(html);

         });
	}
	
	
};
Handlebars.registerHelper('helpmesetstatus', function(id) {
  		//console.log(status);
  		//$status= array("1"=>"info","2"=>"active","3"=>"success");
  		var status = {
  			"1":"info",
  			"2":"active",
  			"3":"danger",
  			"4":"success",
  			"5":"warning"
  			
  			
  		}
  		if(id>=5 && id<=25){
  	return status[1];

  		}
  			if(id>=26 && id<=50){
  	return status[2];

  		}
  			if(id>=51 && id<=75){
  	return status[3];

  		}
  			if(id>=76 && id<=100){
  	return status[4];

  		}
  			if(id>100){
  	return status[5];

  		}
  		//console.log(status[3]);
  		
	});

		Handlebars.registerHelper('helpmeselectes', function(option, emp_status) {
  		//console.log(status);
  		return (option==emp_status) ? " selected" : "";
  		
	});
	
		Handlebars.registerHelper('helpmeselect', function(option, status) {
  		//console.log(status);
  		return (option==status) ? " selected" : "";
  		
	});
		Handlebars.registerHelper('helpmeselectpos', function(option, position) {
  		//console.log(status);
  		return (option==position) ? " selected" : "";
  		
	});
		Handlebars.registerHelper('helpmeselectug', function(option, usrgroup) {
  		//console.log(status);
  		return (option==usrgroup) ? " checked" : "";
  		
	});
		Handlebars.registerHelper('helpmeselectsx', function(option, sex) {
  		//console.log(status);
  		if (option==1){
  			return (1==sex) ? " checked" : "";
  		}else{
  			return (2==sex) ? " checked" : "";
  		}
  		
  		
	});
			Handlebars.registerHelper('helpmesetempstatus', function(id) {
  		
  		var status = {
  			"1":"success",
  			"2":"danger"
  		}
  		//console.log(status[3]);
  		return status[id];
  		
	});
//////////////////////////////////////////////////////////////////////////////////////////////	

$("body").delegate("#display","click", function(){
	
        var source   = $("#search-rp").html();
        var template = Handlebars.compile(source);
        var html    = template();
        $("#loadmehere").html(html);

});

  $("body").delegate("#bntsearch","click",function(){
        	var phone = $("#phoneno").val();
        	 server.request({route:{app:"searchphone",phone:phone}})
             .done( function( data ){
             	
             	
                //check if data does not contain any error response
                if(data.vip.length >0){
                	
					
		       var source   = $("#emphone").html();
       		  var template = Handlebars.compile(source);
           	  var html    = template(data);
       		  $("#vipload").html(html);	
            	

                }
                else{
                	alert("unknown number");
                }

             });
        	
        });
        
        $("body").delegate("#bntaddpoint","click",function(){
        	
        	var idx =$("#vipid").val();
        	var pointx =parseInt($("#vippoint").val());
        	var pointoadd =parseInt($("#pointtoadd").val());
        	
        	
        	if(pointoadd<0 || pointoadd>100){
        		$("#pointtoadd").val("");
        	}else{
        	pointoadd =(pointoadd+pointx);
        	pointoadd =""+pointoadd;
        	 server.request({route:{app:"up",pointoadd:pointoadd,idx:idx}})
             .done( function( data ){
            	
             var re=$("#phoneno").val();
             $("#phoneno").val(re);    
             $("#bntsearch").click();
             
             
             	
             	
            });
        		
        	}
        	
 

             });
        	
        	
      
        
        
       

///////////////////////////////////////////////////////////////////////////////////////////////////
$("body").delegate("#backemp","click", function(){
	
	var id  = localStorage.getItem("id");
	$.usersession.empdisplay( id );
//console.log("here");
});
$("body").delegate("#back","click", function(){
	
	var id  = localStorage.getItem("id");
	$.usersession.userAuth( id );
//console.log("here");
});
var login = localStorage.getItem("login");
console.log(login);
var id  = localStorage.getItem("id");
	
        //c _user _session checker
        if(login=="true"){
        	$.usersession.userAuth( id );
        		//$.usersession.userAuthdisp( id );
            // //render user page//
            //alert("im login "+id);
            
    		// $.showHelper.loadinfo();
        }else{
            //display login form
            var source   = $("#login-wrapper").html();
            var template = Handlebars.compile(source);
            var html    = template();
            htmlContainer.html(html);
        }
        //end


        $("#userlogin").on("submit", function( event ){
            event.preventDefault();

            var username  = $("#username").val(),
                password  = $("#password").val();

              server.request({route:{app:"login",username:username,password:password}})
             .done( function( data ){
                //check if data does not contain any error response
                if(checkReply( data )){
					console.log(data);
                   login = true;
				localStorage.setItem("login",true);
				localStorage.setItem("id",data.ID);
				
				localStorage.setItem("isAdmin",data.usr_grp);
                $.usersession.userAuth( data.ID );
            

                }

             },

             //callback failed
             function(){
                console.log("Server Request Failed.. debug login");

             }

             );


        });
        



     
    // var task = server.request({route:{app:'loadtask',name:'ramel'}});
    //     task.done(function( data ){
    //         console.log( data );
    //         var source   = $("#task-wrapper").html();
    //         var template = Handlebars.compile(source);
    //         var html    = template( data );

    //         htmlContainer.html( html );

    //     });
    $("body").delegate("#pp","click", function(){
var id  = $(this).data("mid");
	$.usersession.pointss( id );
	console.log(id);
	});

$("body").delegate("#slctoupd","change", function(){
var nstatus=$(this).val();
var upid=$(this).data("taskid");

var task = server.request({route:{app:'updatetask',upid:upid,nstatus:nstatus}});
task.done(function(data){
	
	console.log(data);
	var id  = localStorage.getItem("id");
	$.usersession.userAuth( id );
});

});

$("body").delegate("#addtask1","click", function(){
	
	
});
$("body").delegate("#showinfoemp","click", function(){
	
var id=$(this).data("empid");
console.log(id);
var empid = server.request({route:{app:'loadinformation',id:id}});
empid.done(function(data){
	
	console.log(data);
	
	$.usersession.empinfo( id );
});

});


$("body").delegate("#update","click", function(){
	
var Fname=$("#Fname").val();
var pid=$("#Fname").data("profilid");
var eid=$("#employeeid").val();
var user=$("#username").val();
var pass=$("#password").val();
var pos_id=$("#slctpstin").val();
var ug_id=$('#usergroup:checked').val();
var sx_id=$('.sex:checked').val();
var empst_id=$("#slctempst").val();
var contact=$('#contact').val();

console.log(empst_id);
var upinfo = server.debug({route:{app:'updinformation',Fname:Fname,pid:pid,eid:eid,pass:pass
,pos_id:pos_id,ug_id:ug_id,sx_id:sx_id,empst_id:empst_id,contact:contact,user:user}});
upinfo.done(function(data){
	console.log( data );
					
       $("#up").show();              
	var id  = localStorage.getItem("id");
$.usersession.empdisplay( id );

});

});


$("body").delegate("#offersID","click", function(){
	var id=$(this).val();
$.usersession.offerss( id );
console.log(id);
	
	});
$("body").delegate("#logout","click", function(){
	localStorage.setItem("login",false);
	localStorage.removeItem("id");
	location.reload();
});

$("body").delegate("#addtask","click", function(){

			$.usersession.createtask();
});
$("body").delegate("#btnadd","click", function(){
	
	var pname=$("#projectname").val();
	var type=$("#type").val();
	var employeeID=$("#employee").val();
	
	//alert(employeeID);
	var vip= server.request({route:{app:'addtask',pname:pname,type:type,employeeid:employeeID}});
	$.usersession.userAuth(localStorage.getItem("id"));
	
	
});

$("body").delegate("#addemployee","click", function(){

       $.usersession.load_addemployee();
});
$("body").delegate("#btnaddemployee","click", function(){
	

	var fullname = $("#fullname").val();
	var dob = $("#dob").val();
	var sex = $(".gender:checked").val();
	var username = $("#eusername").val();
	var password =$("#epassword").val();
	var group = $("#egroup").val();
	var position =$("#eposition").val();
	var phone = $("#phoneno").val();
	
    var vip= server.request({route:{app:'addemployee',fullname:fullname,dob:dob,sex:sex,username:username,password:password,group:group,position:position,phone:phone}})
    
	
	$.usersession.empdisplay(localStorage.getItem("id"));
 

});

})();

