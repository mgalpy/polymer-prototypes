


var QPUtil = {
  gethex: function(decimal) {
    var hexchars = "0123456789ABCDEFabcdef";
    return "%" + hexchars.charAt(decimal >> 4) + hexchars.charAt(decimal & 0xF);
  },

  encodeURL: function(decoded) {
    var unreserved = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_.~";
    var encoded = "";
    for (var i = 0; i < decoded.length; i++ ) {
      var ch = decoded.charAt(i);
      if (unreserved.indexOf(ch) != -1) {
        encoded = encoded + ch;
      } 
      else {	  
        var charcode = decoded.charCodeAt(i);
        if (charcode < 128) {
          encoded = encoded + QPUtil.gethex(charcode);
        }
        if (charcode > 127 && charcode < 2048) {
          encoded = encoded + QPUtil.gethex((charcode >> 6) | 0xC0);
          encoded = encoded + QPUtil.gethex((charcode & 0x3F) | 0x80);
        }
        if (charcode > 2047 && charcode < 65536) {
          encoded = encoded + QPUtil.gethex((charcode >> 12) | 0xE0);
          encoded = encoded + QPUtil.gethex(((charcode >> 6) & 0x3F) | 0x80);
          encoded = encoded + QPUtil.gethex((charcode & 0x3F) | 0x80);
        }
        if (charcode > 65535) {
          encoded = encoded + QPUtil.gethex((charcode >> 18) | 0xF0);
          encoded = encoded + QPUtil.gethex(((charcode >> 12) & 0x3F) | 0x80);
          encoded = encoded + QPUtil.gethex(((charcode >> 6) & 0x3F) | 0x80);
          encoded = encoded + QPUtil.gethex((charcode & 0x3F) | 0x80);
        }
      }
    }    
    return encoded;
  },
  includeScript: function(url){
    var mScript=document.createElement("script");
    mScript.setAttribute("src", url);
    mScript.setAttribute("type", "text/javascript");
    document.getElementsByTagName("head")[0].appendChild(mScript);
  },
  includeCSS: function(url){
    var mCSS = document.createElement("link");
    mCSS.setAttribute("href", url);
    mCSS.setAttribute("type", "text/css");
    mCSS.setAttribute("rel","stylesheet");
    document.getElementsByTagName("head")[0].appendChild(mCSS);		
  },
  createWindow: function(mTitle, mId, mStyleclass){
    var mDiv=document.createElement("div");
    mDiv.setAttribute("id", mId);
    mDiv.className=mStyleclass;   	
    return mDiv;	
  },
  createPopup: function() {
    var mDiv=document.createElement("div");
    mDiv.setAttribute("id", qpwpopupId);
    mDiv.style.display="none";
    mDiv.className="QPChatEmailWindow";
    mDiv.style.position="absolute";
    // mDiv.style.zindex="100";
    //	mDiv.style.width="250px";
    //	mDiv.style.height="200px";
    // mDiv.style.background="#DDDDDD";
    return mDiv;		
  },
  displayMsg: function(smsg){
    //  QPChat.transcripts='&Text.Librarian;: '+smsg+'\n';
    var msgDiv = document.getElementById('qpchat_text');		
    msgDiv.innerHTML= '<span>'+ smsg +'</span><br>';
    msgDiv.scrollTop=msgDiv.scrollHeight;	
    
  },
  displayMyMsg: function(smsg){
    // QPChat.transcripts='&Text.Patron;: '+smsg+'\n';
    var msgDiv = document.getElementById('qpchat_text');		
    msgDiv.innerHTML= '<p>'+ smsg +'</p>';
    msgDiv.scrollTop=msgDiv.scrollHeight;	
    
  },
  appendMsg: function(smsg){
    // QPChat.transcripts+='&Text.Librarian;: '+smsg+'\n';
    // alert(smsg);
    var msgDiv = document.getElementById('qpchat_text');		
    msgDiv.innerHTML+='<span>'+ smsg +'</span><br>';
    msgDiv.scrollTop=msgDiv.scrollHeight;	
    
  },
  appendMyMsg: function(smsg){
    // QPChat.transcripts+='&Text.Patron;: '+smsg+'\n';
    var msgDiv = document.getElementById('qpchat_text');		
    msgDiv.innerHTML+='<p>'+smsg+'</p>';
    msgDiv.scrollTop=msgDiv.scrollHeight;	
  },
  validateEmail: function(str){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(str);
    
  },
  myPopupRelocate: function() {
    var scrolledX, scrolledY;
    if( self.pageYOffset ) {
      scrolledX = self.pageXOffset;
      scrolledY = self.pageYOffset;
    } 
    else if( document.documentElement && document.documentElement.scrollTop ) {
      scrolledX = document.documentElement.scrollLeft;
      scrolledY = document.documentElement.scrollTop;
    } 
    else if( document.body ) {
      scrolledX = document.body.scrollLeft;
      scrolledY = document.body.scrollTop;
    }
    
    var centerX, centerY;
    if( self.innerHeight ) {
      centerX = self.innerWidth;
      centerY = self.innerHeight;
    } 
    else if( document.documentElement && document.documentElement.clientHeight ) {
      centerX = document.documentElement.clientWidth;
      centerY = document.documentElement.clientHeight;
    } 
    else if( document.body ) {
      centerX = document.body.clientWidth;
      centerY = document.body.clientHeight;
    }
    
    var leftOffset = scrolledX + (centerX - 250) / 2;
    var topOffset = scrolledY + (centerY - 200) / 2;
    
    document.getElementById(qpwpopupId).style.top = topOffset + "px";
    document.getElementById(qpwpopupId).style.left = leftOffset + "px";
  },
  
  fireMyPopup: function() {
    if (!QPChat.inSession) {
      return;
    }
    QPUtil.myPopupRelocate();
    var el = document.getElementById(qpwpopupId);
    el.style.position='relative';
    el.style.top='-150px';
    el.style.left='0px';
    el.style.display = "block";
    document.getElementById('qpchat_email2').focus();
    //document.body.onscroll = QPUtil.myPopupRelocate();
    if (!window.onscroll==undefined) 
      window.onscroll = QPUtil.myPopupRelocate();
  },
  closeMyPopup: function() {
    document.getElementById(qpwpopupId).style.display="none";
  },
  replaceButtonText: function(buttonId, text) {
    if (document.getElementById)
      {
	var button=document.getElementById(buttonId);
	if (button)
	  {
	    if (button.childNodes[0])
	      {
		button.childNodes[0].nodeValue=text;
	      }
	    else if (button.value)
	      {
		button.value=text;
	      }
	    else //if (button.innerHTML)
	      {
		button.innerHTML=text;
	      }
	  }
      }
  },
  isEmpty: function(str) { 
    if (str == null) {
      return true;
    }
		    
    if(str == "") 
      // make sure not to put a space between those quotes
      {
	return true;
      }
    else
      {
	for(j=0; j<str.length; j++)
	  {
	    if(str.charAt(j) != " ")
	      // make sure to put a space between those quotes!
	      {
		return false;
	      }
	  }
      }
    return true;
  },
  openHelpWindow: function() {
    window.open(QPWEntity.qpwhelpurl,'helpwindow','width=405,height=450,left=10,top=20,resizable=yes,scrollbars=yes,menubar=no,status=no,toolbar=no,location=no');
  },
  pressButton: function(btName) {
    var el = document.getElementById(btName);
    if (el != null && el!='undefined') {
      el.src=QPChat.qpBaseURL+'/crs/images/chat/close_down.gif';
    }
  },

  releaseButton: function(btName) {
    var el = document.getElementById(btName);
    if (el != null && el!='undefined') {
      el.src=QPChat.qpBaseURL+'/crs/images/chat/close.gif';
    } 
  },

  resizeInputArea: function() {
     var mTextInput = document.getElementById("qpchat_input");
     var mInput = document.getElementById('qpchat_email1');
     var mWidth='153px';
     var mHeight='40px';
     var mHeight1='20px';
     if (QPChat.size.indexOf("standard") != -1 ){
       mWidth='180px';
       mHeight='45px';
       mHeight1='30px';
     }
     // alert(mWidth);
     mTextInput.style.width=mWidth;
     mInput.style.width=mWidth;  
     mTextInput.style.height=mHeight;
     mInput.style.height=mHeight1;
  }


}
  

var qpwpopupId = "qpwpopup";
var QPChat = {
  qpinstId: null,
  qphost: null,
  qpjessionId: null,
  qpqid: 0,
  qpQuestion:'',
  baseURL: null,
  theme:null,
  qpBaseURL:null,
  lastID: 0,
  mTimer:null,
  mTimer1:null,
  stPollingInterval:180000,
  chatPollingInterval:5000,
  sessionTimeout:4,
  online: false,
  langCode: 1,
  questionSent: false,
  isAdmin:false,
  size:"standard",
  sendEmailOption:true,
  inSession:false,
  transcripts: '',
  oldBeforeUnloadFn: null,
  email:'',
  init: function() {
    //alert('in init function');
    // much more flexibility if theme set in attribute
    //QPChat.qpinstId = document.getElementById("qpchatwidget").getAttribute("qpinstid");
    QPChat.theme = document.getElementById("qpchatwidget").getAttribute("theme");
    QPChat.size = document.getElementById("qpchatwidget").getAttribute("qpwsize");
    //QPChat.langCode = document.getElementById("qpchatwidget").getAttribute("langcode");
    
    QPChat.qpinstId = QPWEntity.qpwinstid;
    //  QPChat.theme = QPWEntity.qpwcolor;
    // QPChat.size = QPWEntity.qpwsize;
    QPChat.langCode = QPWEntity.qpwlangcode;
    QPChat.sendEmailOption=QPWEntity.qpwsendemailoption;
    QPChat.isAdmin = "1"==document.getElementById("qpchatwidget").getAttribute("admin");
    QPChat.qpBaseURL = QPWEntity.qpwbaseurl;   
    QPUtil.includeCSS(QPChat.qpBaseURL+'/crs/html/chat/'+QPChat.theme+'_'+QPChat.size+'.css'); 
    QPChat.oldBeforeUnloadFn=window.onbeforeunload;
     
   
    //alert(document.domain);
  },
  createWidget: function(pdata){
    //alert('in createWidget');	
    QPChat.init();
    var colsVar="20";  // small and firefox
    var rowsVar="1";
    if (document.all) {
      colsVar="26";  // ie
      rowsVar="2";
    }
    if (QPChat.size.indexOf("standard") != -1 ){
      var colsVar="29";
      var rowsVar="2";
      if (document.all) {
	colsVar="35";
	
	rowsVar="3";
      }
    }
    var mContainer = document.getElementById("qpchatwidget");
    mContainer.classname='QPChatContainer_'+QPChat.theme+'_'+QPChat.size;
    var mDiv = QPUtil.createWindow("My Widegt:", "Grace","QPChatContainer");
    mDiv.style.display="block";
    // close button
    var mTitleDiv = document.createElement("div");
    mTitleDiv.className="QPChatWindowTitleBar";
    
    mTitleDiv.innerHTML=
     '<table style="border:0px; margin:0px;background:none"><tr valign=top style="border:0px;background:none"><td  style="border:0px;font-weight:bold;font-size:11px;font-family:arial;background:none" class="QPChatWindowTitle" id="qpwtitle">'+
    QPWEntity.qpwtitle+
    '</td><td style="border:0px;background:none">'+
    '<img   style="border:0px;" alt="'+
    QPWEntity.qpwendsession+'" title="'+
    QPWEntity.qpwendsession+'" src="'+QPChat.qpBaseURL+'/crs/images/chat/close.gif" id="qpchat_exit"  onClick="QPChat.endSession(true)"  onMouseDown="QPUtil.pressButton(\'qpchat_exit\')" onMouseUp="QPUtil.releaseButton(\'qpchat_exit\')" onMouseOut="QPUtil.releaseButton(\'qpchat_exit\')"> '+
    '</td></tr></table>';  

    QPWEntity.qpwtitle+
    '</div>';  
    mDiv.appendChild( mTitleDiv);
   
 // status section
   
    var h2 = document.createElement("div");
    h2.setAttribute("id", "qpchattopstatus");
    h2.className="QPChatWindowStatusArea";
    // h2.appendChild(document.createTextNode(""));
    mDiv.appendChild(h2);
    // message section
    var mTextArea = document.createElement("div");
    mTextArea.className="QPChatWindowTextArea";
    mTextArea.setAttribute("id", "qpchat_text");
    mDiv.appendChild(mTextArea);
    // email section hidden first
    var mInnerDiv=document.createElement("div");
    mDiv.appendChild(mInnerDiv);
    mInnerDiv.setAttribute("id", "qpchat_emaildiv");
    mInnerDiv.classname="QPChatWindowTextInput";
    mInnerDiv.style.display="none";
    mTextInput = document.createElement("input"); 
    mInnerDiv.appendChild(mTextInput);
    mTextInput.setAttribute("maxlength", "1024");
    mTextInput.setAttribute("size",colsVar);
   
    mTextInput.setAttribute("id", "qpchat_email1");
    mTextInput.setAttribute("value", QPWEntity.qpwemailprompt);
   
    mTextInput.onfocus = function() {
	if (!this.cleared) {
	  this.value=''; 				
	  this.cleared=true;
	  clearTimeout(QPChat.mTimer1);
	}		
      }
   
     
    // message input section
    mInnerDiv=document.createElement("div");
  
    mInnerDiv.classname="QPChatWindowTextAreaInput";
    mDiv.appendChild(mInnerDiv);
    mTextInput = document.createElement("textarea");  
   
    mTextInput.setAttribute("cols", colsVar);
    mTextInput.setAttribute("rows", rowsVar);
    mTextInput.setAttribute("id", "qpchat_input");    
    mTextInput.innerHTML= QPWEntity.qpwinitialinput;
    if (!QPChat.isAdmin){
      mTextInput.onfocus = function() {
	//	alert("this should not happen");
	if (!this.cleared) {
	    this.value=''; 				
	  this.cleared=true;
	  // clearTimeout(QPChat.mTimer1);
	}		
      }
      mTextInput.onkeyup = function(e) {
	var mKeyCode=window.event?event.keyCode:e.keyCode;
	//	alert(mKeyCode);
	if (mKeyCode==13) {				
	  QPChat.sendChatText();								
	}
      }
    }
    mInnerDiv.appendChild(mTextInput);
  
    // send button
    mButton = document.createElement("button");
    mButton.className="QPChatWindowButton";
    mButton.setAttribute("id", "qpchat_go");
    mButton.setAttribute("type", "button");
    mButton.appendChild(document.createTextNode(QPWEntity.qpwsend));    
    mButton.onclick=QPChat.sendChatText;
    mDiv.appendChild(mButton);
    mContainer.appendChild(mDiv);
   
    // logo help link

    // email popup
    var mDiv2 = QPUtil.createPopup();
    var h2=' <table><tr><td colspan=2>'+
               QPWEntity.qpwemailprompt+'</td></tr>'+
    '<table><tr><td colspan=2><input type=text class="QPChatWindowTextInput" maxlength="1024" size="25" id="qpchat_email2" value=""></td></tr>'+
    '<tr><td colspan=2><input type=checkbox id="transientemail"> '+
    QPWEntity.qpwanonymous+
    '</td></tr>'+
    '<tr><td><input type=button  class="QPChatEmailButton" id="qpchat_emailsend" value="'+
    QPWEntity.qpwsubmit+'" onClick="QPChat.setEmail()"></td>'+
    '<td> <input type=button class="QPChatEmailButton" id="qpchat_emailcancel" value="'+
    QPWEntity.qpwcancel+
    '" onClick="QPUtil.closeMyPopup()"></td></tr></table>'
    
    mDiv2.innerHTML=h2;
    mContainer.appendChild(mDiv2);
    var mEmailArea = document.createElement("div");
    mEmailArea.className="QPChatWindowEmailBar";
    mEmailArea.setAttribute("id", "qpchat_emailbar");
    mEmailArea.innerHTML=
    '<table style="border:0px; margin:0px;background:none" class="QPChatWindowTitleBar"><tr valign=top style="border:0px;background:none;" ><td style="border:0px;background:none;"><img style="border:0px;" class="QPChatEmailLogo" src="'+
    QPChat.qpBaseURL+'/crs/images/chat/mail.gif' + '" id="qpchat_email" alt="'+
    QPWEntity.qpwemailprompt+'" title="'+
    QPWEntity.qpwemailprompt+'" onClick="QPUtil.fireMyPopup()"></td><td style="border:0px;background:none;"><img  style="border:0px;" src="'+
    QPChat.qpBaseURL+'/crs/images/ask/help.gif' + '"class="QPChatLogo"  alt="'+
    QPWEntity.qpwhelp+'" title="'+
    QPWEntity.qpwhelp+'" onClick="QPUtil.openHelpWindow()"></td></tr></table>';


    mEmailArea.style.display="block";
    mDiv.appendChild(mEmailArea);
  
    
    if (!QPChat.isAdmin){
      QPChat.checkOnlineStatus();	
    }
    else {
     // document.getElementById('qpchattopstatus').innerHTML=QPWEntity.qpwoffline ;
      QPUtil.displayMsg(QPWEntity.qpwofflinemsg);
    }
     QPUtil.resizeInputArea();
  },
  
  addBeforeUnloadFn: function () {
     if (!QPChat.isAdmin){
      window.onbeforeunload=function(event) { 
	if (!event) event = window.event; 
	event.returnValue=QPWEntity.qpwunloadmsg;
	return QPWEntity.qpwunloadmsg; 
      }
      window.onunload=function(event) { 
	QPChat.endSession(false);
      }
    }
  },
  removeBeforeUnloadFn: function() {
    window.onbeforeunload=QPChat.oldBeforeUnloadFn;
  },

  sendQuestion: function() {    
    var URL= QPChat.qpBaseURL+'/crs/servlet/org.oclc.chat.QPWClientInit?';   
    var smsg=	document.getElementById('qpchat_input').value; 
   
    if (smsg == null || QPUtil.isEmpty(smsg) || smsg==QPWEntity.qpwinitialinput) {
      return;
    }
    clearTimeout(QPChat.mTimer1); 
    QPChat.qpQuestion=smsg;

    QPChat.questionSent=true;   
    document.getElementById('qpchat_input').value='';
    //smsg='Widget: '+smsg;
    var param = 'question=' + QPUtil.encodeURL(smsg);
    param += '&library='+QPChat.qpinstId;
    param += '&language='+QPChat.langCode;
    param += '&qpw=1';
    if (QPWEntity.maskIp) param += "&chat_email=anonymous";
    QPHTTP.request(URL+param); 
    QPUtil.displayMyMsg(smsg);
  
    // clearTimeout(QPChat.mTimer1);
    
  }, 
  sendEmailQuestion: function() {   
    var email=document.getElementById("qpchat_email1").value;
    if (email=='' || email==null|| !QPUtil.validateEmail(email)){
      alert(QPWEntity.qpwinvalidemail);   
      return;      	
    }
    var smsg=	document.getElementById('qpchat_input').value;
    QPChat.qpQuestion=smsg;
    if (smsg == null || QPUtil.isEmpty(smsg) || smsg==QPWEntity.qpwinitialinput) {
      return;
    }
    clearTimeout(QPChat.mTimer1);
    var url=QPChat.qpBaseURL+'/crs/servlet/org.oclc.ask.QPWPatronQuestion?';
   
    var param = 'question=' + QPUtil.encodeURL(smsg);
    param += '&library='+QPChat.qpinstId;
    param += '&email='+email;
    param += '&language='+QPChat.langCode;
    QPUtil.displayMyMsg(smsg);
    document.getElementById('qpchat_input').value='';
    // alert(param);
    QPHTTP.request(url+param);
   
    
  }, 
  receiveChatText: function() {  
    //alert('in receiveChatText');  
    //debugPrint(QPChat.qpBaseURL+'/crs/servlet/org.oclc.chat.QPWLibrarianResponse;jsessionid='+
    //	QPChat.qpjessionId+'?qphost='+QPChat.qphost+'&qid=' + QPChat.qpqid+'&last='+ QPChat.lastID+
    // 	'&chatsessionid='+QPChat.qpjessionId) 	;    
    var url=QPChat.qpBaseURL+
    '/crs/servlet/org.oclc.chat.QPWLibrarianResponse;jsessionid='+
    QPChat.qpjessionId+'?qphost='+QPChat.qphost+'&qid=' + QPChat.qpqid+
    '&last='+ QPChat.lastID+
    '&chatsessionid='+QPChat.qpjessionId;
    QPHTTP.request(url);
    QPChat.mTimer = setTimeout('QPChat.receiveChatText();',5000);						
  },
  sendChatText: function() { 
    if (QPChat.isAdmin) {return;}
    var smsg=	document.getElementById('qpchat_input').value;	    
    if (smsg == null || QPUtil.isEmpty(smsg) || smsg==QPWEntity.qpwinitialinput) {
      if (QPChat.questionSent && !QPChat.inSession) {
	QPChat.sessionReStart();
	return;
      }
      else {
	//	alert("Noting to send");
	return;
      }
    }
    if (!QPChat.online && !QPChat.sendEmailOption) {
	alert(QPWEntity.qpwoffline);
	return;
      
    }
    if (!QPChat.online && QPChat.sendEmailOption) {      
      QPChat.sendEmailQuestion();
      return;
    }
    if (!QPChat.questionSent){ 
      QPChat.sendQuestion();
      return;
    }
    if (QPChat.questionSent && !QPChat.inSession) {
      QPChat.sessionReStart();
      return;
    }
    var url=QPChat.qpBaseURL+
    '/crs/servlet/org.oclc.chat.QPWClientChat;jsessionid='+
    QPChat.qpjessionId+'?qphost='+QPChat.qphost;
    var param = '&text=' + QPUtil.encodeURL(smsg);
    QPUtil.appendMyMsg(smsg);		
    param += '&chatsessionid='+QPChat.qpjessionId;
    QPHTTP.request(url+param);
    document.getElementById('qpchat_input').value = '';

  },

  setEmail: function() { 
   
    var email =	document.getElementById('qpchat_email2').value;
    var anonymous = document.getElementById("transientemail").checked;
    // alert("in setEmail:" + email);
    if (!QPUtil.validateEmail(email)) {
       alert(QPWEntity.qpwinvalidemail);   
      return;  
    }
   var url= QPChat.qpBaseURL+
    '/crs/servlet/org.oclc.chat.QPWSetEmailOptions;jsessionid='+
    QPChat.qpjessionId+'?qphost='+QPChat.qphost;
    var param = '&email=' + email;
    param += '&chatsessionid='+QPChat.qpjessionId;
    param += '&pf=';
    if(anonymous) {
      param += '0';
    }
    else {
      param +='1';
    }
    param += '&qid='+QPChat.qpqid;
    QPHTTP.request(url+param);
    QPUtil.closeMyPopup();

  },
  checkOnlineStatus: function() {
    var url = QPChat.qpBaseURL+'/crs/servlet/org.oclc.chat.QPWOnlineStatus?max='+QPChat.sessionTimeout+'&library='+ 
 	QPChat.qpinstId;
    if (QPChat.qpjessionId !=null ) {
	url=QPChat.qpBaseURL+'/crs/servlet/org.oclc.chat.QPWOnlineStatus;jsessionid='+
    	QPChat.qpjessionId+'?qphost='+QPChat.qphost+'&max='+QPChat.sessionTimeout+'&library='+
    	QPChat.qpinstId;	
    }
    QPHTTP.request(url);
    QPChat.mTimer1 = setTimeout('QPChat.checkOnlineStatus();',QPChat.stPollingInterval);	
  },
  
  endSession: function(bPrompt) {
    QPChat.email=document.getElementById('qpchat_email2').value; 
    QPChat.transcripts=document.getElementById('qpchat_text').innerHTML;
    if (QPChat.inSession && (!bPrompt || confirm(QPWEntity.qpwconfirmend))) {
      // var email = getElementById("qpchat_email1").value;
      //  if (email ==null || email.length<=2) {
      //	email =  getElementById("qpchat_email2").value;
      // }
      var url=QPChat.qpBaseURL+
		       '/crs/servlet/org.oclc.chat.QPWClientLogout;jsessionid='+
	QPChat.qpjessionId+'?qphost='+QPChat.qphost; 
      var param = '&email=' + QPChat.email;
      param += '&chatsessionid='+QPChat.qpjessionId;
      QPHTTP.request(url+param);
      QPChat.email='';
      document.getElementById('qpchat_email2').value='';
      QPUtil.closeMyPopup();
      debugPrint('in endSession: '+param);
    }   
  },

  emailTranscripts: function() {
    //	if (QPUtil.isEmpty(QPChat.email) || !QPUtil.validateEmail(QPChat.email)) {
    var email=prompt(QPWEntity.qpwemailprompt,QPChat.email);
    //	}
    while (!QPUtil.isEmpty(email) && !QPUtil.validateEmail(email)) {
      email=prompt(QPWEntity.qpwinvalidemail);
    }
    if (QPUtil.validateEmail(email )) {
      QPChat.email=email;
      var url=QPChat.qpBaseURL+
      '/crs/servlet/org.oclc.chat.QPWEmailTranscripts;jsessionid='+
      QPChat.qpjessionId+'?qphost='+QPChat.qphost; 
      var param = '&email=' + QPChat.email;
      param += '&chatsessionid='+QPChat.qpjessionId;	   
      param += '&qid='+QPChat.qpqid;
      param += '&language='+QPChat.langCode;
      param += '&transcripts='+QPUtil.encodeURL(QPChat.transcripts);

      QPHTTP.request(url+param);
      debugPrint('/crs/servlet/org.oclc.chat.QPWEmailTranscripts;jsessionid='+
		 QPChat.qpjessionId+'?qphost='+QPChat.qphost+param);
    }	
  },
  sessionCleanUp: function() {
    	document.getElementById('qpchattopstatus').innerHTML=QPWEntity.qpwsessionended ;
	QPChat.inSession=false;
	QPChat.removeBeforeUnloadFn();
	QPUtil.replaceButtonText('qpchat_go', QPWEntity.qpwstartnew);
        QPChat.qpjessionId=null;
	QPChat.qphost=null;
  },
  sessionReStart: function() {
    debugPrint(" in sessionRestart");
    QPUtil.replaceButtonText('qpchat_go', QPWEntity.qpwsend);
    QPChat.questionSent=false;
    var el = document.getElementById('qpchat_input');
    el.value= QPWEntity.qpwinitialinput;
    el.cleared=false;
    QPChat.checkOnlineStatus();
	
  }

	
}	

// callback functions

var QPHandler = {
  handleEmailTranscripts: function(responseObj) {
    if (responseObj && responseObj.status==200) {    
      return;
    }
    else {
      debugPrint(responseObj.msg);
    }	
  },	
  handleSendQuestion: function(responseObj) {
    if (responseObj.status==200) {   
      QPChat.qpjessionId=responseObj.sessionid;      
      QPChat.qphost=responseObj.qphost;
      QPChat.qpqid=responseObj.qid;      
      QPChat.mTimer = setTimeout('QPChat.receiveChatText();',QPChat.chatPollingInterval);
      document.getElementById('qpchattopstatus').innerHTML=QPWEntity.qpwquestionsent ;
      if (!QPChat.inSession) {
	QPChat.inSession=true;
	QPChat.addBeforeUnloadFn();
      }
    }
    else if (responseObj.status==404) {
      document.getElementById('qpchattopstatus').innerHTML=QPWEntity.qpwquestionnotsent ;
      document.getElementById('qpchat_input').value=QPChat.qpQuestion;
      // alert(QPChat.qpQuestion);
      QPChat.questionSent=false; 
      debugPrint(responseObj.msg);
      alert(QPWEntity.qpwoffline);
      QPChat.checkOnlineStatus();
    }
    else {
      document.getElementById('qpchattopstatus').innerHTML=QPWEntity.qpwquestionnotsent ;
      QPChat.questionSent=false; 
      document.getElementById('qpchat_input').value=QPChat.qpQuestion;
      QPChat.mTimer1 = setTimeout('QPChat.checkOnlineStatus();',QPChat.stPollingInterval);
      debugPrint(responseObj.msg);
    }	
  },	  
  handleSendEmailQuestion: function(responseObj) {
    if (responseObj.status==200) {   
      // QPUtil.displayMsg(responseObj.msg);
      document.getElementById('qpchattopstatus').innerHTML=QPWEntity.qpwquestionsent ;
    }	
    else {
      document.getElementById('qpchattopstatus').innerHTML=QPWEntity.qpwquestionnotsent ;
      debugPrint(responseObj.msg);
    }	
  },
  handleReceiveChat: function(responseObj) {
     if (responseObj.status==200) {
       var itype=responseObj.itype;     
       var myArray=responseObj.msg;
       if (responseObj.iid>0) {
       	QPChat.lastID=responseObj.iid;
	}
       debugPrint('number of rows:'+myArray.length);
       for (var i = 0; i < myArray.length; i++) {
	 QPUtil.appendMsg(myArray[i][0]);	 	
         itype=myArray[i][1]; 
       	 if  ("7"==itype){
	 	QPChat.endSession(false);
          }
       	  if ("8"==itype){
	 	document.getElementById('qpchattopstatus').innerHTML=QPWEntity.qpwsessionstarted;
       	  }
     	}
     }	
     else {
      debugPrint(responseObj.msg);
    }
	 
  },
  handleSetEmail: function(responseObj) {
     if (responseObj && responseObj.status==200) {    
      return;
    }
    else {
      debugPrint(responseObj.msg);
    }	   
  },
 handleOnlineStatus: function(responseObj) {
    if (responseObj && responseObj.status==200) {
      QPChat.qpjessionId=responseObj.sessionid;
      QPChat.qphost=responseObj.qphost;
	  

      var res = responseObj.msg;
      //alert('Response='+res);
      if (res.indexOf("true")!=-1) {
	// chat available
	document.getElementById('qpchattopstatus').innerHTML=QPWEntity.qpwonline;
	document.getElementById('qpchat_text').className='QPChatWindowTextArea';
	document.getElementById('qpchat_emaildiv').style.display="none";
	QPChat.online=true;	
	QPUtil.displayMsg('');
      }
      else {
//	document.getElementById('qpchattopstatus').innerHTML=QPWEntity.qpwoffline ;
	QPChat.online=false;
	if (QPChat.sendEmailOption) {
	  // alert(QPChat.sendEmailOption);
	  document.getElementById('qpchat_text').className='QPChatWindowTextAreaShort';
	  
	  // show the email if email option is set:
	  
	  document.getElementById('qpchat_emaildiv').style.display="block";
	}
	else {
	  document.getElementById('qpchat_text').className='QPChatWindowTextArea';
	  document.getElementById('qpchat_emaildiv').style.display="none";		 
	}
	QPUtil.displayMsg(QPWEntity.qpwofflinemsg);
      }			
    }
    else {
      debugPrint(responseObj.msg);
    }	
  },
  handleEndSession: function(responseObj) {
    if (responseObj && responseObj.status==200) { 
    	clearTimeout(QPChat.mTimer);
	QPUtil.appendMyMsg(QPWEntity.qpwpatronexit);
	QPUtil.appendMsg('<a style="color:#2F77BA" href="javascript:QPChat.emailTranscripts()">'+QPWEntity.qpwemailrequest+'</a>');	
	if (QPWEntity.qpwsurveyurl!=null && QPWEntity.qpwsurveyurl.length>0) {
	  var suffix='?&type=chat&qid='+QPChat.qpqid;
	  if (QPWEntity.qpwexternalsurvey==1) {
	    suffix='';
	  }
	  QPUtil.appendMsg(QPWEntity.qpwpleasesurvey+ ' <a style="color:#2F77BA" target="_new" href="'+
			   QPWEntity.qpwsurveyurl+suffix+'">'+QPWEntity.qpwsurvey+'</a>');
	}
	QPChat.sessionCleanUp();
    }
    else {
      debugPrint(responseObj.msg);
    }
  },	     
  handleSendChat: function(responseObj) {
    if (responseObj && responseObj.status==200) {    
      return;
    }
    else {
      debugPrint(responseObj.msg);
    }	     
  }	 
}
var QPHTTP = {
  QPDataArray: [],
  request: function(URL) {
   
    var len = QPHTTP.QPDataArray.length;
    QPHTTP.QPDataArray[len] = {};
    QPHTTP.QPDataArray[len].scriptObj = document.createElement("script");
    QPHTTP.QPDataArray[len].scriptObj.setAttribute("type","text/javascript");
    if(URL.indexOf("?") == -1) {
      URL+="?rid=" + len + "&cnt=" + Date.parse(new Date());
    } else {
      URL+="&rid=" + len + "&cnt=" + Date.parse(new Date());
    }
    debugPrint("QPHTTP.request: " + URL);
    QPHTTP.QPDataArray[len].scriptObj.setAttribute("src",URL);
    document.getElementsByTagName("head")[0].appendChild(QPHTTP.QPDataArray[len].scriptObj);
  },
  accept: function(responseObj) {
    debugPrint("length of QPDataArray:"+QPHTTP.QPDataArray.length);
    var type = responseObj.type;
    debugPrint("Type of QPDataArray:"+type);
    if (type==1) { //sendquestion
      QPHandler.handleSendQuestion(responseObj);
      return;
    }
    else if (type==2) { //sendEmailQuestion
      QPHandler.handleSendEmailQuestion(responseObj);
      return;
    }
    else if (type==3) { // sendChatText
      QPHandler.handleSendChat(responseObj);
      return;
    }
    else if (type==4) { // receiveChatText
      QPHandler.handleReceiveChat(responseObj);
      return;
    }
    else if (type==5) { // setEmail
      QPHandler.handleSetEmail(responseObj);
      return;
    }
    else if (type==6) { // onlineStatus
      QPHandler.handleOnlineStatus(responseObj);
      return;
    }
    else if (type==7) { // emailTranscript
      QPHandler.handleEmailTranscripts(responseObj);
      return;
    }
    else if (type==8) { // endSession
      QPHandler.handleEndSession(responseObj);
      return;
    }
    else {}
  }
}


function debugPrint(text){
   var el =document.getElementById('qpwdebug_diswin');
    if (el != null && el != "undefined") {
    el.innerHTML+="<br>"+text;
    }
}




// QPChat.createWidget("test");
