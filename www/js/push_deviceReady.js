//if( (!(getUrlVars()['c']>0))&&(!(getUrlVars()['page']>0)) )
//{

try 
{ 
	pushNotification = window.plugins.pushNotification;
	if (device.platform == 'android' || device.platform == 'Android') {
		//$("#app-status-ul").append('<li>registering android</li>');
		pushNotification.register(successHandler, errorHandler, {"senderID":"31755832513","ecb":"onNotificationGCM"});		// required!
	} else {
		//$("#app-status-ul").append('<li>registering iOS</li>');
		pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
	}
}
catch(err) 
{ 
	txt="There was an error on this page.\n\n"; 
	txt+="Error description: " + err.message + "\n\n"; 
	//alert(txt); 
}

//}