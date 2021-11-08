function validate() {
	var digits = document.frm.psw.value;
	const uname = document.frm.uname.value;
	sessionStorage.setItem("NAME", uname);
	if(digits == '12345')
	{
		//Why not goin here now??
		location.href = 'admin-referee-list.html';
	}
	//Something fun..... idk
	else if (digits == '567')
	{
		location.href = 'admin-referee-list.html';
	}
	else
	{
		alert('Incorrect Password');
	}
	
	return false;
	
}
