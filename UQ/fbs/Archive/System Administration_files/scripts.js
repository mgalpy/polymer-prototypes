Calendar=function(firstDayOfWeek,dateStr,onSelected,onClose){this.activeDiv=null;this.currentDateEl=null;this.getDateStatus=null;this.getDateToolTip=null;this.getDateText=null;this.timeout=null;this.onSelected=onSelected||null;this.onClose=onClose||null;this.dragging=false;this.hidden=false;this.minYear=1970;this.maxYear=2050;this.dateFormat=Calendar._TT["DEF_DATE_FORMAT"];this.ttDateFormat=Calendar._TT["TT_DATE_FORMAT"];this.isPopup=true;this.weekNumbers=true;this.firstDayOfWeek=typeof firstDayOfWeek=="number"?firstDayOfWeek:Calendar._FD;this.showsOtherMonths=false;this.dateStr=dateStr;this.ar_days=null;this.showsTime=false;this.time24=true;this.yearStep=2;this.hiliteToday=true;this.multiple=null;this.table=null;this.element=null;this.tbody=null;this.firstdayname=null;this.monthsCombo=null;this.yearsCombo=null;this.hilitedMonth=null;this.activeMonth=null;this.hilitedYear=null;this.activeYear=null;this.dateClicked=false;if(typeof Calendar._SDN=="undefined"){if(typeof Calendar._SDN_len=="undefined")
Calendar._SDN_len=3;var ar=new Array();for(var i=8;i>0;){ar[--i]=Calendar._DN[i].substr(0,Calendar._SDN_len);}
Calendar._SDN=ar;if(typeof Calendar._SMN_len=="undefined")
Calendar._SMN_len=3;ar=new Array();for(var i=12;i>0;){ar[--i]=Calendar._MN[i].substr(0,Calendar._SMN_len);}
Calendar._SMN=ar;}};Calendar._C=null;Calendar.is_ie=(/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent));Calendar.is_ie5=(Calendar.is_ie&&/msie 5\.0/i.test(navigator.userAgent));Calendar.is_opera=/opera/i.test(navigator.userAgent);Calendar.is_khtml=/Konqueror|Safari|KHTML/i.test(navigator.userAgent);Calendar.getAbsolutePos=function(el){var SL=0,ST=0;var is_div=/^div$/i.test(el.tagName);if(is_div&&el.scrollLeft)
SL=el.scrollLeft;if(is_div&&el.scrollTop)
ST=el.scrollTop;var r={x:el.offsetLeft-SL,y:el.offsetTop-ST};if(el.offsetParent){var tmp=this.getAbsolutePos(el.offsetParent);r.x+=tmp.x;r.y+=tmp.y;}
return r;};Calendar.isRelated=function(el,evt){var related=evt.relatedTarget;if(!related){var type=evt.type;if(type=="mouseover"){related=evt.fromElement;}else if(type=="mouseout"){related=evt.toElement;}}
while(related){if(related==el){return true;}
related=related.parentNode;}
return false;};Calendar.removeClass=function(el,className){if(!(el&&el.className)){return;}
var cls=el.className.split(" ");var ar=new Array();for(var i=cls.length;i>0;){if(cls[--i]!=className){ar[ar.length]=cls[i];}}
el.className=ar.join(" ");};Calendar.addClass=function(el,className){Calendar.removeClass(el,className);el.className+=" "+className;};Calendar.getElement=function(ev){var f=Calendar.is_ie?window.event.srcElement:ev.currentTarget;while(f.nodeType!=1||/^div$/i.test(f.tagName))
f=f.parentNode;return f;};Calendar.getTargetElement=function(ev){var f=Calendar.is_ie?window.event.srcElement:ev.target;while(f.nodeType!=1)
f=f.parentNode;return f;};Calendar.stopEvent=function(ev){ev||(ev=window.event);if(Calendar.is_ie){ev.cancelBubble=true;ev.returnValue=false;}else{ev.preventDefault();ev.stopPropagation();}
return false;};Calendar.addEvent=function(el,evname,func){if(el.attachEvent){el.attachEvent("on"+evname,func);}else if(el.addEventListener){el.addEventListener(evname,func,true);}else{el["on"+evname]=func;}};Calendar.removeEvent=function(el,evname,func){if(el.detachEvent){el.detachEvent("on"+evname,func);}else if(el.removeEventListener){el.removeEventListener(evname,func,true);}else{el["on"+evname]=null;}};Calendar.createElement=function(type,parent){var el=null;if(document.createElementNS){el=document.createElementNS("http://www.w3.org/1999/xhtml",type);}else{el=document.createElement(type);}
if(typeof parent!="undefined"){parent.appendChild(el);}
return el;};Calendar._add_evs=function(el){with(Calendar){addEvent(el,"mouseover",dayMouseOver);addEvent(el,"mousedown",dayMouseDown);addEvent(el,"mouseout",dayMouseOut);if(is_ie){addEvent(el,"dblclick",dayMouseDblClick);el.setAttribute("unselectable",true);}}};Calendar.findMonth=function(el){if(typeof el.month!="undefined"){return el;}else if(typeof el.parentNode.month!="undefined"){return el.parentNode;}
return null;};Calendar.findYear=function(el){if(typeof el.year!="undefined"){return el;}else if(typeof el.parentNode.year!="undefined"){return el.parentNode;}
return null;};Calendar.showMonthsCombo=function(){var cal=Calendar._C;if(!cal){return false;}
var cal=cal;var cd=cal.activeDiv;var mc=cal.monthsCombo;if(cal.hilitedMonth){Calendar.removeClass(cal.hilitedMonth,"hilite");}
if(cal.activeMonth){Calendar.removeClass(cal.activeMonth,"active");}
var mon=cal.monthsCombo.getElementsByTagName("div")[cal.date.getMonth()];Calendar.addClass(mon,"active");cal.activeMonth=mon;var s=mc.style;s.display="block";if(cd.navtype<0)
s.left=cd.offsetLeft+"px";else{var mcw=mc.offsetWidth;if(typeof mcw=="undefined")
mcw=50;s.left=(cd.offsetLeft+cd.offsetWidth-mcw)+"px";}
s.top=(cd.offsetTop+cd.offsetHeight)+"px";};Calendar.showYearsCombo=function(fwd){var cal=Calendar._C;if(!cal){return false;}
var cal=cal;var cd=cal.activeDiv;var yc=cal.yearsCombo;if(cal.hilitedYear){Calendar.removeClass(cal.hilitedYear,"hilite");}
if(cal.activeYear){Calendar.removeClass(cal.activeYear,"active");}
cal.activeYear=null;var Y=cal.date.getFullYear()+(fwd?1:-1);var yr=yc.firstChild;var show=false;for(var i=12;i>0;--i){if(Y>=cal.minYear&&Y<=cal.maxYear){yr.innerHTML=Y;yr.year=Y;yr.style.display="block";show=true;}else{yr.style.display="none";}
yr=yr.nextSibling;Y+=fwd?cal.yearStep:-cal.yearStep;}
if(show){var s=yc.style;s.display="block";if(cd.navtype<0)
s.left=cd.offsetLeft+"px";else{var ycw=yc.offsetWidth;if(typeof ycw=="undefined")
ycw=50;s.left=(cd.offsetLeft+cd.offsetWidth-ycw)+"px";}
s.top=(cd.offsetTop+cd.offsetHeight)+"px";}};Calendar.tableMouseUp=function(ev){var cal=Calendar._C;if(!cal){return false;}
if(cal.timeout){clearTimeout(cal.timeout);}
var el=cal.activeDiv;if(!el){return false;}
var target=Calendar.getTargetElement(ev);ev||(ev=window.event);Calendar.removeClass(el,"active");if(target==el||target.parentNode==el){Calendar.cellClick(el,ev);}
var mon=Calendar.findMonth(target);var date=null;if(mon){date=new Date(cal.date);if(mon.month!=date.getMonth()){date.setMonth(mon.month);cal.setDate(date);cal.dateClicked=false;cal.callHandler();}}else{var year=Calendar.findYear(target);if(year){date=new Date(cal.date);if(year.year!=date.getFullYear()){date.setFullYear(year.year);cal.setDate(date);cal.dateClicked=false;cal.callHandler();}}}
with(Calendar){removeEvent(document,"mouseup",tableMouseUp);removeEvent(document,"mouseover",tableMouseOver);removeEvent(document,"mousemove",tableMouseOver);cal._hideCombos();_C=null;return stopEvent(ev);}};Calendar.tableMouseOver=function(ev){var cal=Calendar._C;if(!cal){return;}
var el=cal.activeDiv;var target=Calendar.getTargetElement(ev);if(target==el||target.parentNode==el){Calendar.addClass(el,"hilite active");Calendar.addClass(el.parentNode,"rowhilite");}else{if(typeof el.navtype=="undefined"||(el.navtype!=50&&(el.navtype==0||Math.abs(el.navtype)>2)))
Calendar.removeClass(el,"active");Calendar.removeClass(el,"hilite");Calendar.removeClass(el.parentNode,"rowhilite");}
ev||(ev=window.event);if(el.navtype==50&&target!=el){var pos=Calendar.getAbsolutePos(el);var w=el.offsetWidth;var x=ev.clientX;var dx;var decrease=true;if(x>pos.x+w){dx=x-pos.x-w;decrease=false;}else
dx=pos.x-x;if(dx<0)dx=0;var range=el._range;var current=el._current;var count=Math.floor(dx/10)%range.length;for(var i=range.length;--i>=0;)
if(range[i]==current)
break;while(count-->0)
if(decrease){if(--i<0)
i=range.length-1;}else if(++i>=range.length)
i=0;var newval=range[i];el.innerHTML=newval;cal.onUpdateTime();}
var mon=Calendar.findMonth(target);if(mon){if(mon.month!=cal.date.getMonth()){if(cal.hilitedMonth){Calendar.removeClass(cal.hilitedMonth,"hilite");}
Calendar.addClass(mon,"hilite");cal.hilitedMonth=mon;}else if(cal.hilitedMonth){Calendar.removeClass(cal.hilitedMonth,"hilite");}}else{if(cal.hilitedMonth){Calendar.removeClass(cal.hilitedMonth,"hilite");}
var year=Calendar.findYear(target);if(year){if(year.year!=cal.date.getFullYear()){if(cal.hilitedYear){Calendar.removeClass(cal.hilitedYear,"hilite");}
Calendar.addClass(year,"hilite");cal.hilitedYear=year;}else if(cal.hilitedYear){Calendar.removeClass(cal.hilitedYear,"hilite");}}else if(cal.hilitedYear){Calendar.removeClass(cal.hilitedYear,"hilite");}}
return Calendar.stopEvent(ev);};Calendar.tableMouseDown=function(ev){if(Calendar.getTargetElement(ev)==Calendar.getElement(ev)){return Calendar.stopEvent(ev);}};Calendar.calDragIt=function(ev){var cal=Calendar._C;if(!(cal&&cal.dragging)){return false;}
var posX;var posY;if(Calendar.is_ie){posY=window.event.clientY+document.body.scrollTop;posX=window.event.clientX+document.body.scrollLeft;}else{posX=ev.pageX;posY=ev.pageY;}
cal.hideShowCovered();var st=cal.element.style;st.left=(posX-cal.xOffs)+"px";st.top=(posY-cal.yOffs)+"px";return Calendar.stopEvent(ev);};Calendar.calDragEnd=function(ev){var cal=Calendar._C;if(!cal){return false;}
cal.dragging=false;with(Calendar){removeEvent(document,"mousemove",calDragIt);removeEvent(document,"mouseup",calDragEnd);tableMouseUp(ev);}
cal.hideShowCovered();};Calendar.dayMouseDown=function(ev){var el=Calendar.getElement(ev);if(el.disabled){return false;}
var cal=el.calendar;cal.activeDiv=el;Calendar._C=cal;if(el.navtype!=300)with(Calendar){if(el.navtype==50){el._current=el.innerHTML;addEvent(document,"mousemove",tableMouseOver);}else
addEvent(document,Calendar.is_ie5?"mousemove":"mouseover",tableMouseOver);addClass(el,"hilite active");addEvent(document,"mouseup",tableMouseUp);}else if(cal.isPopup){cal._dragStart(ev);}
if(el.navtype==-1||el.navtype==1){if(cal.timeout)clearTimeout(cal.timeout);cal.timeout=setTimeout("Calendar.showMonthsCombo()",250);}else if(el.navtype==-2||el.navtype==2){if(cal.timeout)clearTimeout(cal.timeout);cal.timeout=setTimeout((el.navtype>0)?"Calendar.showYearsCombo(true)":"Calendar.showYearsCombo(false)",250);}else{cal.timeout=null;}
return Calendar.stopEvent(ev);};Calendar.dayMouseDblClick=function(ev){Calendar.cellClick(Calendar.getElement(ev),ev||window.event);if(Calendar.is_ie){document.selection.empty();}};Calendar.dayMouseOver=function(ev){var el=Calendar.getElement(ev);if(Calendar.isRelated(el,ev)||Calendar._C||el.disabled){return false;}
if(el.ttip){if(el.ttip.substr(0,1)=="_"){el.ttip=el.caldate.print(el.calendar.ttDateFormat)+el.ttip.substr(1);}
el.calendar.tooltips.innerHTML=el.ttip;}
if(el.navtype!=300){Calendar.addClass(el,"hilite");if(el.caldate){Calendar.addClass(el.parentNode,"rowhilite");}}
return Calendar.stopEvent(ev);};Calendar.dayMouseOut=function(ev){with(Calendar){var el=getElement(ev);if(isRelated(el,ev)||_C||el.disabled)
return false;removeClass(el,"hilite");if(el.caldate)
removeClass(el.parentNode,"rowhilite");if(el.calendar)
el.calendar.tooltips.innerHTML=_TT["SEL_DATE"];return stopEvent(ev);}};Calendar.cellClick=function(el,ev){var cal=el.calendar;var closing=false;var newdate=false;var date=null;if(typeof el.navtype=="undefined"){if(cal.currentDateEl){Calendar.removeClass(cal.currentDateEl,"selected");Calendar.addClass(el,"selected");closing=(cal.currentDateEl==el);if(!closing){cal.currentDateEl=el;}}
cal.date.setDateOnly(el.caldate);date=cal.date;var other_month=!(cal.dateClicked=!el.otherMonth);if(!other_month&&!cal.currentDateEl)
cal._toggleMultipleDate(new Date(date));else
newdate=!el.disabled;if(other_month)
cal._init(cal.firstDayOfWeek,date);}else{if(el.navtype==200){Calendar.removeClass(el,"hilite");cal.callCloseHandler();return;}
date=new Date(cal.date);if(el.navtype==0)
date.setDateOnly(new Date());cal.dateClicked=false;var year=date.getFullYear();var mon=date.getMonth();function setMonth(m){var day=date.getDate();var max=date.getMonthDays(m);if(day>max){date.setDate(max);}
date.setMonth(m);};switch(el.navtype){case 400:Calendar.removeClass(el,"hilite");var text=Calendar._TT["ABOUT"];if(typeof text!="undefined"){text+=cal.showsTime?Calendar._TT["ABOUT_TIME"]:"";}else{text="Help and about box text is not translated into this language.\n"+"If you know this language and you feel generous please update\n"+"the corresponding file in \"lang\" subdir to match calendar-en.js\n"+"and send it back to <mihai_bazon@yahoo.com> to get it into the distribution  ;-)\n\n"+"Thank you!\n"+"http://dynarch.com/mishoo/calendar.epl\n";}
alert(text);return;case-2:if(year>cal.minYear){date.setFullYear(year-1);}
break;case-1:if(mon>0){setMonth(mon-1);}else if(year-->cal.minYear){date.setFullYear(year);setMonth(11);}
break;case 1:if(mon<11){setMonth(mon+1);}else if(year<cal.maxYear){date.setFullYear(year+1);setMonth(0);}
break;case 2:if(year<cal.maxYear){date.setFullYear(year+1);}
break;case 100:cal.setFirstDayOfWeek(el.fdow);return;case 50:var range=el._range;var current=el.innerHTML;for(var i=range.length;--i>=0;)
if(range[i]==current)
break;if(ev&&ev.shiftKey){if(--i<0)
i=range.length-1;}else if(++i>=range.length)
i=0;var newval=range[i];el.innerHTML=newval;cal.onUpdateTime();return;case 0:if((typeof cal.getDateStatus=="function")&&cal.getDateStatus(date,date.getFullYear(),date.getMonth(),date.getDate())){return false;}
break;}
if(!date.equalsTo(cal.date)){cal.setDate(date);newdate=true;}else if(el.navtype==0)
newdate=closing=true;}
if(newdate){ev&&cal.callHandler();}
if(closing){Calendar.removeClass(el,"hilite");ev&&cal.callCloseHandler();}};Calendar.prototype.create=function(_par){var parent=null;if(!_par){parent=document.getElementsByTagName("body")[0];this.isPopup=true;}else{parent=_par;this.isPopup=false;}
this.date=this.dateStr?new Date(this.dateStr):new Date();var table=Calendar.createElement("table");this.table=table;table.cellSpacing=0;table.cellPadding=0;table.calendar=this;Calendar.addEvent(table,"mousedown",Calendar.tableMouseDown);var div=Calendar.createElement("div");this.element=div;div.className="calendar";if(this.isPopup){div.style.position="absolute";div.style.display="none";}
div.appendChild(table);var thead=Calendar.createElement("thead",table);var cell=null;var row=null;var cal=this;var hh=function(text,cs,navtype){cell=Calendar.createElement("td",row);cell.colSpan=cs;cell.className="button";if(navtype!=0&&Math.abs(navtype)<=2)
cell.className+=" nav";Calendar._add_evs(cell);cell.calendar=cal;cell.navtype=navtype;cell.innerHTML="<div unselectable='on'>"+text+"</div>";return cell;};row=Calendar.createElement("tr",thead);var title_length=6;(this.isPopup)&&--title_length;(this.weekNumbers)&&++title_length;hh("?",1,400).ttip=Calendar._TT["INFO"];this.title=hh("",title_length,300);this.title.className="title";if(this.isPopup){this.title.ttip=Calendar._TT["DRAG_TO_MOVE"];this.title.style.cursor="move";hh("&#x00d7;",1,200).ttip=Calendar._TT["CLOSE"];}
row=Calendar.createElement("tr",thead);row.className="headrow";this._nav_py=hh("&#x00ab;",1,-2);this._nav_py.ttip=Calendar._TT["PREV_YEAR"];this._nav_pm=hh("&#x2039;",1,-1);this._nav_pm.ttip=Calendar._TT["PREV_MONTH"];this._nav_now=hh(Calendar._TT["TODAY"],this.weekNumbers?4:3,0);this._nav_now.ttip=Calendar._TT["GO_TODAY"];this._nav_nm=hh("&#x203a;",1,1);this._nav_nm.ttip=Calendar._TT["NEXT_MONTH"];this._nav_ny=hh("&#x00bb;",1,2);this._nav_ny.ttip=Calendar._TT["NEXT_YEAR"];row=Calendar.createElement("tr",thead);row.className="daynames";if(this.weekNumbers){cell=Calendar.createElement("td",row);cell.className="name wn";cell.innerHTML=Calendar._TT["WK"];}
for(var i=7;i>0;--i){cell=Calendar.createElement("td",row);if(!i){cell.navtype=100;cell.calendar=this;Calendar._add_evs(cell);}}
this.firstdayname=(this.weekNumbers)?row.firstChild.nextSibling:row.firstChild;this._displayWeekdays();var tbody=Calendar.createElement("tbody",table);this.tbody=tbody;for(i=6;i>0;--i){row=Calendar.createElement("tr",tbody);if(this.weekNumbers){cell=Calendar.createElement("td",row);}
for(var j=7;j>0;--j){cell=Calendar.createElement("td",row);cell.calendar=this;Calendar._add_evs(cell);}}
if(this.showsTime){row=Calendar.createElement("tr",tbody);row.className="time";cell=Calendar.createElement("td",row);cell.className="time";cell.colSpan=2;cell.innerHTML=Calendar._TT["TIME"]||"&nbsp;";cell=Calendar.createElement("td",row);cell.className="time";cell.colSpan=this.weekNumbers?4:3;(function(){function makeTimePart(className,init,range_start,range_end){var part=Calendar.createElement("span",cell);part.className=className;part.innerHTML=init;part.calendar=cal;part.ttip=Calendar._TT["TIME_PART"];part.navtype=50;part._range=[];if(typeof range_start!="number")
part._range=range_start;else{for(var i=range_start;i<=range_end;++i){var txt;if(i<10&&range_end>=10)txt='0'+i;else txt=''+i;part._range[part._range.length]=txt;}}
Calendar._add_evs(part);return part;};var hrs=cal.date.getHours();var mins=cal.date.getMinutes();var t12=!cal.time24;var pm=(hrs>12);if(t12&&pm)hrs-=12;var H=makeTimePart("hour",hrs,t12?1:0,t12?12:23);var span=Calendar.createElement("span",cell);span.innerHTML=":";span.className="colon";var M=makeTimePart("minute",mins,0,59);var AP=null;cell=Calendar.createElement("td",row);cell.className="time";cell.colSpan=2;if(t12)
AP=makeTimePart("ampm",pm?"pm":"am",["am","pm"]);else
cell.innerHTML="&nbsp;";cal.onSetTime=function(){var pm,hrs=this.date.getHours(),mins=this.date.getMinutes();if(t12){pm=(hrs>=12);if(pm)hrs-=12;if(hrs==0)hrs=12;AP.innerHTML=pm?"pm":"am";}
H.innerHTML=(hrs<10)?("0"+hrs):hrs;M.innerHTML=(mins<10)?("0"+mins):mins;};cal.onUpdateTime=function(){var date=this.date;var h=parseInt(H.innerHTML,10);if(t12){if(/pm/i.test(AP.innerHTML)&&h<12)
h+=12;else if(/am/i.test(AP.innerHTML)&&h==12)
h=0;}
var d=date.getDate();var m=date.getMonth();var y=date.getFullYear();date.setHours(h);date.setMinutes(parseInt(M.innerHTML,10));date.setFullYear(y);date.setMonth(m);date.setDate(d);this.dateClicked=false;this.callHandler();};})();}else{this.onSetTime=this.onUpdateTime=function(){};}
var tfoot=Calendar.createElement("tfoot",table);row=Calendar.createElement("tr",tfoot);row.className="footrow";cell=hh(Calendar._TT["SEL_DATE"],this.weekNumbers?8:7,300);cell.className="ttip";if(this.isPopup){cell.ttip=Calendar._TT["DRAG_TO_MOVE"];cell.style.cursor="move";}
this.tooltips=cell;div=Calendar.createElement("div",this.element);this.monthsCombo=div;div.className="combo";for(i=0;i<Calendar._MN.length;++i){var mn=Calendar.createElement("div");mn.className=Calendar.is_ie?"label-IEfix":"label";mn.month=i;mn.innerHTML=Calendar._SMN[i];div.appendChild(mn);}
div=Calendar.createElement("div",this.element);this.yearsCombo=div;div.className="combo";for(i=12;i>0;--i){var yr=Calendar.createElement("div");yr.className=Calendar.is_ie?"label-IEfix":"label";div.appendChild(yr);}
this._init(this.firstDayOfWeek,this.date);parent.appendChild(this.element);};Calendar._keyEvent=function(ev){var cal=window._dynarch_popupCalendar;if(!cal||cal.multiple)
return false;(Calendar.is_ie)&&(ev=window.event);var act=(Calendar.is_ie||ev.type=="keypress"),K=ev.keyCode;if(ev.ctrlKey){switch(K){case 37:act&&Calendar.cellClick(cal._nav_pm);break;case 38:act&&Calendar.cellClick(cal._nav_py);break;case 39:act&&Calendar.cellClick(cal._nav_nm);break;case 40:act&&Calendar.cellClick(cal._nav_ny);break;default:return false;}}else switch(K){case 32:Calendar.cellClick(cal._nav_now);break;case 27:act&&cal.callCloseHandler();break;case 37:case 38:case 39:case 40:if(act){var prev,x,y,ne,el,step;prev=K==37||K==38;step=(K==37||K==39)?1:7;function setVars(){el=cal.currentDateEl;var p=el.pos;x=p&15;y=p>>4;ne=cal.ar_days[y][x];};setVars();function prevMonth(){var date=new Date(cal.date);date.setDate(date.getDate()-step);cal.setDate(date);};function nextMonth(){var date=new Date(cal.date);date.setDate(date.getDate()+step);cal.setDate(date);};while(1){switch(K){case 37:if(--x>=0)
ne=cal.ar_days[y][x];else{x=6;K=38;continue;}
break;case 38:if(--y>=0)
ne=cal.ar_days[y][x];else{prevMonth();setVars();}
break;case 39:if(++x<7)
ne=cal.ar_days[y][x];else{x=0;K=40;continue;}
break;case 40:if(++y<cal.ar_days.length)
ne=cal.ar_days[y][x];else{nextMonth();setVars();}
break;}
break;}
if(ne){if(!ne.disabled)
Calendar.cellClick(ne);else if(prev)
prevMonth();else
nextMonth();}}
break;case 13:if(act)
Calendar.cellClick(cal.currentDateEl,ev);break;default:return false;}
return Calendar.stopEvent(ev);};Calendar.prototype._init=function(firstDayOfWeek,date){var today=new Date(),TY=today.getFullYear(),TM=today.getMonth(),TD=today.getDate();this.table.style.visibility="hidden";var year=date.getFullYear();if(year<this.minYear){year=this.minYear;date.setFullYear(year);}else if(year>this.maxYear){year=this.maxYear;date.setFullYear(year);}
this.firstDayOfWeek=firstDayOfWeek;this.date=new Date(date);var month=date.getMonth();var mday=date.getDate();var no_days=date.getMonthDays();date.setDate(1);var day1=(date.getDay()-this.firstDayOfWeek)%7;if(day1<0)
day1+=7;date.setDate(-day1);date.setDate(date.getDate()+1);var row=this.tbody.firstChild;var MN=Calendar._SMN[month];var ar_days=this.ar_days=new Array();var weekend=Calendar._TT["WEEKEND"];var dates=this.multiple?(this.datesCells={}):null;for(var i=0;i<6;++i,row=row.nextSibling){var cell=row.firstChild;if(this.weekNumbers){cell.className="day wn";cell.innerHTML=date.getWeekNumber();cell=cell.nextSibling;}
row.className="daysrow";var hasdays=false,iday,dpos=ar_days[i]=[];for(var j=0;j<7;++j,cell=cell.nextSibling,date.setDate(iday+1)){iday=date.getDate();var wday=date.getDay();cell.className="day";cell.pos=i<<4|j;dpos[j]=cell;var current_month=(date.getMonth()==month);if(!current_month){if(this.showsOtherMonths){cell.className+=" othermonth";cell.otherMonth=true;}else{cell.className="emptycell";cell.innerHTML="&nbsp;";cell.disabled=true;continue;}}else{cell.otherMonth=false;hasdays=true;}
cell.disabled=false;cell.innerHTML=this.getDateText?this.getDateText(date,iday):iday;if(dates)
dates[date.print("%Y%m%d")]=cell;if(this.getDateStatus){var status=this.getDateStatus(date,year,month,iday);if(this.getDateToolTip){var toolTip=this.getDateToolTip(date,year,month,iday);if(toolTip)
cell.title=toolTip;}
if(status===true){cell.className+=" disabled";cell.disabled=true;}else{if(/disabled/i.test(status))
cell.disabled=true;cell.className+=" "+status;}}
if(!cell.disabled){cell.caldate=new Date(date);cell.ttip="_";if(!this.multiple&&current_month&&iday==mday&&this.hiliteToday){cell.className+=" selected";this.currentDateEl=cell;}
if(date.getFullYear()==TY&&date.getMonth()==TM&&iday==TD){cell.className+=" today";cell.ttip+=Calendar._TT["PART_TODAY"];}
if(weekend.indexOf(wday.toString())!=-1)
cell.className+=cell.otherMonth?" oweekend":" weekend";}}
if(!(hasdays||this.showsOtherMonths))
row.className="emptyrow";}
this.title.innerHTML=Calendar._MN[month]+", "+year;this.onSetTime();this.table.style.visibility="visible";this._initMultipleDates();};Calendar.prototype._initMultipleDates=function(){if(this.multiple){for(var i in this.multiple){var cell=this.datesCells[i];var d=this.multiple[i];if(!d)
continue;if(cell)
cell.className+=" selected";}}};Calendar.prototype._toggleMultipleDate=function(date){if(this.multiple){var ds=date.print("%Y%m%d");var cell=this.datesCells[ds];if(cell){var d=this.multiple[ds];if(!d){Calendar.addClass(cell,"selected");this.multiple[ds]=date;}else{Calendar.removeClass(cell,"selected");delete this.multiple[ds];}}}};Calendar.prototype.setDateToolTipHandler=function(unaryFunction){this.getDateToolTip=unaryFunction;};Calendar.prototype.setDate=function(date){if(!date.equalsTo(this.date)){this._init(this.firstDayOfWeek,date);}};Calendar.prototype.refresh=function(){this._init(this.firstDayOfWeek,this.date);};Calendar.prototype.setFirstDayOfWeek=function(firstDayOfWeek){this._init(firstDayOfWeek,this.date);this._displayWeekdays();};Calendar.prototype.setDateStatusHandler=Calendar.prototype.setDisabledHandler=function(unaryFunction){this.getDateStatus=unaryFunction;};Calendar.prototype.setRange=function(a,z){this.minYear=a;this.maxYear=z;};Calendar.prototype.callHandler=function(){if(this.onSelected){this.onSelected(this,this.date.print(this.dateFormat));}};Calendar.prototype.callCloseHandler=function(){if(this.onClose){this.onClose(this);}
this.hideShowCovered();};Calendar.prototype.destroy=function(){var el=this.element.parentNode;el.removeChild(this.element);Calendar._C=null;window._dynarch_popupCalendar=null;};Calendar.prototype.reparent=function(new_parent){var el=this.element;el.parentNode.removeChild(el);new_parent.appendChild(el);};Calendar._checkCalendar=function(ev){var calendar=window._dynarch_popupCalendar;if(!calendar){return false;}
var el=Calendar.is_ie?Calendar.getElement(ev):Calendar.getTargetElement(ev);for(;el!=null&&el!=calendar.element;el=el.parentNode);if(el==null){window._dynarch_popupCalendar.callCloseHandler();return Calendar.stopEvent(ev);}};Calendar.prototype.show=function(){var rows=this.table.getElementsByTagName("tr");for(var i=rows.length;i>0;){var row=rows[--i];Calendar.removeClass(row,"rowhilite");var cells=row.getElementsByTagName("td");for(var j=cells.length;j>0;){var cell=cells[--j];Calendar.removeClass(cell,"hilite");Calendar.removeClass(cell,"active");}}
this.element.style.display="block";this.hidden=false;if(this.isPopup){window._dynarch_popupCalendar=this;Calendar.addEvent(document,"keydown",Calendar._keyEvent);Calendar.addEvent(document,"keypress",Calendar._keyEvent);Calendar.addEvent(document,"mousedown",Calendar._checkCalendar);}
this.hideShowCovered();};Calendar.prototype.hide=function(){if(this.isPopup){Calendar.removeEvent(document,"keydown",Calendar._keyEvent);Calendar.removeEvent(document,"keypress",Calendar._keyEvent);Calendar.removeEvent(document,"mousedown",Calendar._checkCalendar);}
this.element.style.display="none";this.hidden=true;this.hideShowCovered();};Calendar.prototype.showAt=function(x,y){var s=this.element.style;s.left=x+"px";s.top=y+"px";this.show();};Calendar.prototype.showAtElement=function(el,opts){var self=this;var p=Calendar.getAbsolutePos(el);if(!opts||typeof opts!="string"){this.showAt(p.x,p.y+el.offsetHeight);return true;}
function fixPosition(box){if(box.x<0)
box.x=0;if(box.y<0)
box.y=0;var cp=document.createElement("div");var s=cp.style;s.position="absolute";s.right=s.bottom=s.width=s.height="0px";document.body.appendChild(cp);var br=Calendar.getAbsolutePos(cp);document.body.removeChild(cp);if(Calendar.is_ie){br.y+=document.body.scrollTop;br.x+=document.body.scrollLeft;}else{br.y+=window.scrollY;br.x+=window.scrollX;}
var tmp=box.x+box.width-br.x;if(tmp>0)box.x-=tmp;tmp=box.y+box.height-br.y;if(tmp>0)box.y-=tmp;};this.element.style.display="block";Calendar.continuation_for_the_fucking_khtml_browser=function(){var w=self.element.offsetWidth;var h=self.element.offsetHeight;self.element.style.display="none";var valign=opts.substr(0,1);var halign="l";if(opts.length>1){halign=opts.substr(1,1);}
switch(valign){case"T":p.y-=h;break;case"B":p.y+=el.offsetHeight;break;case"C":p.y+=(el.offsetHeight-h)/2;break;case"t":p.y+=el.offsetHeight-h;break;case"b":break;}
switch(halign){case"L":p.x-=w;break;case"R":p.x+=el.offsetWidth;break;case"C":p.x+=(el.offsetWidth-w)/2;break;case"l":p.x+=el.offsetWidth-w;break;case"r":break;}
p.width=w;p.height=h+40;self.monthsCombo.style.display="none";fixPosition(p);self.showAt(p.x,p.y);};if(Calendar.is_khtml)
setTimeout("Calendar.continuation_for_the_fucking_khtml_browser()",10);else
Calendar.continuation_for_the_fucking_khtml_browser();};Calendar.prototype.setDateFormat=function(str){this.dateFormat=str;};Calendar.prototype.setTtDateFormat=function(str){this.ttDateFormat=str;};Calendar.prototype.parseDate=function(str,fmt){if(!fmt)
fmt=this.dateFormat;this.setDate(Date.parseDate(str,fmt));};Calendar.prototype.hideShowCovered=function(){if(!Calendar.is_ie&&!Calendar.is_opera)
return;function getVisib(obj){var value=obj.style.visibility;if(!value){if(document.defaultView&&typeof(document.defaultView.getComputedStyle)=="function"){if(!Calendar.is_khtml)
value=document.defaultView.getComputedStyle(obj,"").getPropertyValue("visibility");else
value='';}else if(obj.currentStyle){value=obj.currentStyle.visibility;}else
value='';}
return value;};var tags=new Array("applet","iframe","select");var el=this.element;var p=Calendar.getAbsolutePos(el);var EX1=p.x;var EX2=el.offsetWidth+EX1;var EY1=p.y;var EY2=el.offsetHeight+EY1;for(var k=tags.length;k>0;){var ar=document.getElementsByTagName(tags[--k]);var cc=null;for(var i=ar.length;i>0;){cc=ar[--i];p=Calendar.getAbsolutePos(cc);var CX1=p.x;var CX2=cc.offsetWidth+CX1;var CY1=p.y;var CY2=cc.offsetHeight+CY1;if(this.hidden||(CX1>EX2)||(CX2<EX1)||(CY1>EY2)||(CY2<EY1)){if(!cc.__msh_save_visibility){cc.__msh_save_visibility=getVisib(cc);}
cc.style.visibility=cc.__msh_save_visibility;}else{if(!cc.__msh_save_visibility){cc.__msh_save_visibility=getVisib(cc);}
cc.style.visibility="hidden";}}}};Calendar.prototype._displayWeekdays=function(){var fdow=this.firstDayOfWeek;var cell=this.firstdayname;var weekend=Calendar._TT["WEEKEND"];for(var i=0;i<7;++i){cell.className="day name";var realday=(i+fdow)%7;if(i){cell.ttip=Calendar._TT["DAY_FIRST"].replace("%s",Calendar._DN[realday]);cell.navtype=100;cell.calendar=this;cell.fdow=realday;Calendar._add_evs(cell);}
if(weekend.indexOf(realday.toString())!=-1){Calendar.addClass(cell,"weekend");}
cell.innerHTML=Calendar._SDN[(i+fdow)%7];cell=cell.nextSibling;}};Calendar.prototype._hideCombos=function(){this.monthsCombo.style.display="none";this.yearsCombo.style.display="none";};Calendar.prototype._dragStart=function(ev){if(this.dragging){return;}
this.dragging=true;var posX;var posY;if(Calendar.is_ie){posY=window.event.clientY+document.body.scrollTop;posX=window.event.clientX+document.body.scrollLeft;}else{posY=ev.clientY+window.scrollY;posX=ev.clientX+window.scrollX;}
var st=this.element.style;this.xOffs=posX-parseInt(st.left);this.yOffs=posY-parseInt(st.top);with(Calendar){addEvent(document,"mousemove",calDragIt);addEvent(document,"mouseup",calDragEnd);}};Date._MD=new Array(31,28,31,30,31,30,31,31,30,31,30,31);Date.SECOND=1000;Date.MINUTE=60*Date.SECOND;Date.HOUR=60*Date.MINUTE;Date.DAY=24*Date.HOUR;Date.WEEK=7*Date.DAY;Date.parseDate=function(str,fmt){var today=new Date();var y=0;var m=-1;var d=0;var a=str.split(/\W+/);var b=fmt.match(/%./g);var i=0,j=0;var hr=0;var min=0;for(i=0;i<a.length;++i){if(!a[i])
continue;switch(b[i]){case"%d":case"%e":d=parseInt(a[i],10);break;case"%m":m=parseInt(a[i],10)-1;break;case"%Y":case"%y":y=parseInt(a[i],10);(y<100)&&(y+=(y>29)?1900:2000);break;case"%b":case"%B":for(j=0;j<12;++j){if(Calendar._MN[j].substr(0,a[i].length).toLowerCase()==a[i].toLowerCase()){m=j;break;}}
break;case"%H":case"%I":case"%k":case"%l":hr=parseInt(a[i],10);break;case"%P":case"%p":if(/pm/i.test(a[i])&&hr<12)
hr+=12;else if(/am/i.test(a[i])&&hr>=12)
hr-=12;break;case"%M":min=parseInt(a[i],10);break;}}
if(isNaN(y))y=today.getFullYear();if(isNaN(m))m=today.getMonth();if(isNaN(d))d=today.getDate();if(isNaN(hr))hr=today.getHours();if(isNaN(min))min=today.getMinutes();if(y!=0&&m!=-1&&d!=0)
return new Date(y,m,d,hr,min,0);y=0;m=-1;d=0;for(i=0;i<a.length;++i){if(a[i].search(/[a-zA-Z]+/)!=-1){var t=-1;for(j=0;j<12;++j){if(Calendar._MN[j].substr(0,a[i].length).toLowerCase()==a[i].toLowerCase()){t=j;break;}}
if(t!=-1){if(m!=-1){d=m+1;}
m=t;}}else if(parseInt(a[i],10)<=12&&m==-1){m=a[i]-1;}else if(parseInt(a[i],10)>31&&y==0){y=parseInt(a[i],10);(y<100)&&(y+=(y>29)?1900:2000);}else if(d==0){d=a[i];}}
if(y==0)
y=today.getFullYear();if(m!=-1&&d!=0)
return new Date(y,m,d,hr,min,0);return today;};Date.prototype.getMonthDays=function(month){var year=this.getFullYear();if(typeof month=="undefined"){month=this.getMonth();}
if(((0==(year%4))&&((0!=(year%100))||(0==(year%400))))&&month==1){return 29;}else{return Date._MD[month];}};Date.prototype.getDayOfYear=function(){var now=new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0);var then=new Date(this.getFullYear(),0,0,0,0,0);var time=now-then;return Math.floor(time/Date.DAY);};Date.prototype.getWeekNumber=function(){var d=new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0);var DoW=d.getDay();d.setDate(d.getDate()-(DoW+6)%7+3);var ms=d.valueOf();d.setMonth(0);d.setDate(4);return Math.round((ms-d.valueOf())/(7*864e5))+1;};Date.prototype.equalsTo=function(date){return((this.getFullYear()==date.getFullYear())&&(this.getMonth()==date.getMonth())&&(this.getDate()==date.getDate())&&(this.getHours()==date.getHours())&&(this.getMinutes()==date.getMinutes()));};Date.prototype.setDateOnly=function(date){var tmp=new Date(date);this.setDate(1);this.setFullYear(tmp.getFullYear());this.setMonth(tmp.getMonth());this.setDate(tmp.getDate());};Date.prototype.print=function(str){var m=this.getMonth();var d=this.getDate();var y=this.getFullYear();var wn=this.getWeekNumber();var w=this.getDay();var s={};var hr=this.getHours();var pm=(hr>=12);var ir=(pm)?(hr-12):hr;var dy=this.getDayOfYear();if(ir==0)
ir=12;var min=this.getMinutes();var sec=this.getSeconds();s["%a"]=Calendar._SDN[w];s["%A"]=Calendar._DN[w];s["%b"]=Calendar._SMN[m];s["%B"]=Calendar._MN[m];s["%C"]=1+Math.floor(y/100);s["%d"]=(d<10)?("0"+d):d;s["%e"]=d;s["%H"]=(hr<10)?("0"+hr):hr;s["%I"]=(ir<10)?("0"+ir):ir;s["%j"]=(dy<100)?((dy<10)?("00"+dy):("0"+dy)):dy;s["%k"]=hr;s["%l"]=ir;s["%m"]=(m<9)?("0"+(1+m)):(1+m);s["%M"]=(min<10)?("0"+min):min;s["%n"]="\n";s["%p"]=pm?"PM":"AM";s["%P"]=pm?"pm":"am";s["%s"]=Math.floor(this.getTime()/1000);s["%S"]=(sec<10)?("0"+sec):sec;s["%t"]="\t";s["%U"]=s["%W"]=s["%V"]=(wn<10)?("0"+wn):wn;s["%u"]=w+1;s["%w"]=w;s["%y"]=(''+y).substr(2,2);s["%Y"]=y;s["%%"]="%";var re=/%./g;if(!Calendar.is_ie5&&!Calendar.is_khtml)
return str.replace(re,function(par){return s[par]||par;});var a=str.match(re);for(var i=0;i<a.length;i++){var tmp=s[a[i]];if(tmp){re=new RegExp(a[i],'g');str=str.replace(re,tmp);}}
return str;};Date.prototype.__msh_oldSetFullYear=Date.prototype.setFullYear;Date.prototype.setFullYear=function(y){var d=new Date(this);d.__msh_oldSetFullYear(y);if(d.getMonth()!=this.getMonth())
this.setDate(28);this.__msh_oldSetFullYear(y);};window._dynarch_popupCalendar=null;;Calendar._DN=new Array
("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday");Calendar._SDN=new Array
("Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun");Calendar._FD=0;Calendar._MN=new Array
("January","February","March","April","May","June","July","August","September","October","November","December");Calendar._SMN=new Array
("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");Calendar._TT={};Calendar._TT["INFO"]="About the calendar";Calendar._TT["ABOUT"]="DHTML Date/Time Selector\n"+"(c) dynarch.com 2002-2005 / Author: Mihai Bazon\n"+"For latest version visit: http://www.dynarch.com/projects/calendar/\n"+"Distributed under GNU LGPL.  See http://gnu.org/licenses/lgpl.html for details."+"\n\n"+"Date selection:\n"+"- Use the \xab, \xbb buttons to select year\n"+"- Use the "+String.fromCharCode(0x2039)+", "+String.fromCharCode(0x203a)+" buttons to select month\n"+"- Hold mouse button on any of the above buttons for faster selection.";Calendar._TT["ABOUT_TIME"]="\n\n"+"Time selection:\n"+"- Click on any of the time parts to increase it\n"+"- or Shift-click to decrease it\n"+"- or click and drag for faster selection.";Calendar._TT["PREV_YEAR"]="Prev. year (hold for menu)";Calendar._TT["PREV_MONTH"]="Prev. month (hold for menu)";Calendar._TT["GO_TODAY"]="Go Today";Calendar._TT["NEXT_MONTH"]="Next month (hold for menu)";Calendar._TT["NEXT_YEAR"]="Next year (hold for menu)";Calendar._TT["SEL_DATE"]="Select date";Calendar._TT["DRAG_TO_MOVE"]="Drag to move";Calendar._TT["PART_TODAY"]=" (today)";Calendar._TT["DAY_FIRST"]="Display %s first";Calendar._TT["WEEKEND"]="0,6";Calendar._TT["CLOSE"]="Close";Calendar._TT["TODAY"]="Today";Calendar._TT["TIME_PART"]="(Shift-)Click or drag to change value";Calendar._TT["DEF_DATE_FORMAT"]="%Y-%m-%d";Calendar._TT["TT_DATE_FORMAT"]="%a, %b %e";Calendar._TT["WK"]="wk";Calendar._TT["TIME"]="Time:";;Calendar.setup=function(params){function param_default(pname,def){if(typeof params[pname]=="undefined"){params[pname]=def;}};param_default("inputField",null);param_default("displayArea",null);param_default("button",null);param_default("eventName","click");param_default("ifFormat","%Y/%m/%d");param_default("daFormat","%Y/%m/%d");param_default("singleClick",true);param_default("disableFunc",null);param_default("dateStatusFunc",params["disableFunc"]);param_default("dateText",null);param_default("firstDay",null);param_default("align","Br");param_default("range",[1900,2999]);param_default("weekNumbers",true);param_default("flat",null);param_default("flatCallback",null);param_default("onSelect",null);param_default("onClose",null);param_default("onUpdate",null);param_default("date",null);param_default("showsTime",false);param_default("timeformat","24");param_default("electric",true);param_default("step",2);param_default("position",null);param_default("cache",false);param_default("showOthers",false);param_default("multiple",null);var tmp=["inputField","displayArea","button"];for(var i in tmp){if(typeof params[tmp[i]]=="string"){params[tmp[i]]=document.getElementById(params[tmp[i]]);}}
if(!(params.flat||params.multiple||params.inputField||params.displayArea||params.button)){alert("Calendar.setup:\n  Nothing to setup (no fields found).  Please check your code");return false;}
function onSelect(cal){var p=cal.params;var update=(cal.dateClicked||p.electric);if(update&&p.inputField){p.inputField.value=cal.date.print(p.ifFormat);if(typeof p.inputField.onchange=="function")
p.inputField.onchange();}
if(update&&p.displayArea)
p.displayArea.innerHTML=cal.date.print(p.daFormat);if(update&&typeof p.onUpdate=="function")
p.onUpdate(cal);if(update&&p.flat){if(typeof p.flatCallback=="function")
p.flatCallback(cal);}
if(update&&p.singleClick&&cal.dateClicked)
cal.callCloseHandler();};if(params.flat!=null){if(typeof params.flat=="string")
params.flat=document.getElementById(params.flat);if(!params.flat){alert("Calendar.setup:\n  Flat specified but can't find parent.");return false;}
var cal=new Calendar(params.firstDay,params.date,params.onSelect||onSelect);cal.showsOtherMonths=params.showOthers;cal.showsTime=params.showsTime;cal.time24=(params.timeformat=="24");cal.params=params;cal.weekNumbers=params.weekNumbers;cal.setRange(params.range[0],params.range[1]);cal.setDateStatusHandler(params.dateStatusFunc);cal.getDateText=params.dateText;if(params.ifFormat){cal.setDateFormat(params.ifFormat);}
if(params.inputField&&typeof params.inputField.value=="string"){cal.parseDate(params.inputField.value);}
cal.create(params.flat);cal.show();return false;}
var triggerEl=params.button||params.displayArea||params.inputField;triggerEl["on"+params.eventName]=function(){var dateEl=params.inputField||params.displayArea;var dateFmt=params.inputField?params.ifFormat:params.daFormat;var mustCreate=false;var cal=window.calendar;if(dateEl)
params.date=Date.parseDate(dateEl.value||dateEl.innerHTML,dateFmt);if(!(cal&&params.cache)){window.calendar=cal=new Calendar(params.firstDay,params.date,params.onSelect||onSelect,params.onClose||function(cal){cal.hide();});cal.showsTime=params.showsTime;cal.time24=(params.timeformat=="24");cal.weekNumbers=params.weekNumbers;mustCreate=true;}else{if(params.date)
cal.setDate(params.date);cal.hide();}
if(params.multiple){cal.multiple={};for(var i=params.multiple.length;--i>=0;){var d=params.multiple[i];var ds=d.print("%Y%m%d");cal.multiple[ds]=d;}}
cal.showsOtherMonths=params.showOthers;cal.yearStep=params.step;cal.setRange(params.range[0],params.range[1]);cal.params=params;cal.setDateStatusHandler(params.dateStatusFunc);cal.getDateText=params.dateText;cal.setDateFormat(dateFmt);if(mustCreate)
cal.create();cal.refresh();if(!params.position)
cal.showAtElement(params.button||params.displayArea||params.inputField,params.align);else
cal.showAt(params.position[0],params.position[1]);return false;};return cal;};;function schedulerDateChanged(calendar){if(calendar.dateClicked){y=calendar.date.getFullYear();m=calendar.date.getMonth()+1;d=calendar.date.getDate();changeScheduler(m,d,y,0,currentSchedule);}}
function checkForm(f){var msg="Please fix these errors:\n";var errors=false;if(f.fname.value==""){msg+="-First name is required\n";errors=true;}
if(f.lname.value==""){msg+="-Last name is required\n";errors=true;}
if(f.phone.value==""){msg+="-Phone number is required\n";errors=true;}
if(f.institution.value==""){msg+="-Institution is required\n";errors=true;}
if((f.email.value=="")||(f.email.value.indexOf('@')==-1)){msg+="-Valid email is required\n";errors=true;}
if(errors){window.alert(msg);return false;}
return true;}
function verifyEdit(){var msg="Please fix these errors:\n";var errors=false;if((document.register.email.value!="")&&(document.register.email.value.indexOf('@')==-1)){msg+="-Valid email is required\n";errors=true;}
if((document.register.password.value!="")&&(document.register.password.value.length<6)){msg+="-Min 6 character password is required\n";errors=true;}
if((document.register.password.value!="")&&(document.register.password.value!=document.register.password2.value)){msg+=("-Passwords to not match\n");errors=true;}
if(errors){window.alert(msg);return false;}
return true;}
function help(file){if(!file)
file='';else
file='#'+file;window.open("help.php"+file,"","width=500,height=500,scrollbars");void(0);}
function history(memberid){if(memberid){window.open("user_history.php?memberid="+memberid,"","width=1000,height=700,scrollbars");void(0);}}
function blackmarks(memberid){if(memberid){window.open("user_blackmarks.php?memberid="+memberid,"","width=1000,height=700,scrollbars");void(0);}}
function keycontrol(){window.open("milcirc/key.php","","width=500,height=500,scrollbars");void(0);}
function reserve(type,machid,start_date,resid,scheduleid,is_blackout,read_only,pending,starttime,endtime,admin){if(is_blackout==null){is_blackout=0;}
if(admin==null){admin=0;}
if(is_blackout!=1&&admin==1){w=(type=='r'||type=='m')?660:520;h=(type=='m')?610:720;}
else if(is_blackout!=1){w=(type=='r'||type=='m')?500:520;h=(type=='m')?610:600;}
else if(is_blackout==1){w=(type=='r'||type=='m')?660:520;h=(type=='m')?610:720;}
else{w=(type=='r')?600:425;h=(type=='m')?460:420;}
if(machid==null){machid='';}
if(start_date==null){start_date='';}
if(resid==null){resid='';}
if(scheduleid==null){scheduleid='';}
if(read_only==null){read_only='';}
if(pending==null){pending='';}
if(starttime==null){starttime='';}
if(endtime==null){endtime='';}
nurl="reserve.php?type="+type+"&machid="+machid+"&start_date="+start_date+"&resid="+resid+'&scheduleid='+scheduleid+"&is_blackout="+is_blackout+"&read_only="+read_only+"&pending="+pending+"&starttime="+starttime+"&endtime="+endtime;var resWindow=window.open(nurl,"reserve","width="+w+",height="+h+",scrollbars,resizable=no,status=no");resWindow.focus();void(0);}
function printres(resid){w=520;h=600;if(resid==null){resid='';}
nurl="reserve.php?type=v&resid="+resid+"&printres=1";var resWindow=window.open(nurl,"printres","width="+w+",height="+h+",scrollbars,resizable=no,status=no");resWindow.focus();void(0);}
function checkDate(){var formStr=document.getElementById("jumpWeek");var month=document.getElementById("jumpMonth").value;var day=document.getElementById("jumpDay").value;var year=document.getElementById("jumpYear").value;var dayNum=new Array();if(year%4==0){dayNum=[31,29,31,30,31,30,31,31,30,31,30,31];}
else{dayNum=[31,28,31,30,31,30,31,31,30,31,30,31];}
if((month>12)||(day>dayNum[month-1])){alert("Please enter valid date value");return false;}
for(var i=0;i<formStr.childNodes.length-1;i++){if(formStr.childNodes[i].type=="text"||formStr.childNodes[i].type=="textbox"){if((formStr.childNodes[i].value<=0)||(formStr.childNodes[i].value.match(/\D+/)!=null)){alert("Please enter valid date value");formStr.childNodes[i].focus();return false;}}}
changeScheduler(month,day,year,0,"");}
function verifyTimes(f){if(f.del&&f.del.checked){return confirm("Delete this reservation?");}
if(parseFloat(f.starttime.value)<parseFloat(f.endtime.value)){return true;}
else{window.alert("End time must be later than start time\nCurrent start time: "+f.starttime.value+" Current end time: "+f.endtime.value);return false;}}
function checkAdminForm(){var f=document.forms[0];for(var i=0;i<f.elements.length;i++){if((f.elements[i].type=="checkbox")&&(f.elements[i].checked==true))
return confirm('This will delete all reservations and permission information for the checked items!\nContinue?');}
alert("No boxes have been checked!");return false;}
function checkBoxes(){var f=document.train;for(var i=0;i<f.elements.length;i++){if(f.elements[i].type=="checkbox")
f.elements[i].checked=true;}
void(0);}
function viewUser(user){window.open("userInfo.php?user="+user,"UserInfo","width=400,height=400,scrollbars,resizable=no,status=no");void(0);}
function checkAddResource(f){var msg="";minres=(parseInt(f.minH.value)*60)+parseInt(f.minM.value);maxRes=(parseInt(f.maxH.value)*60)+parseInt(f.maxM.value);if(f.name.value=="")
msg+="-Resource name is required.\n";if(parseInt(minres)>parseInt(maxRes))
msg+="-Minimum reservaion time must be less than or equal to maximum";if(msg!=""){alert("You have the following errors:\n\n"+msg);return false;}
return true;}
function checkAddSchedule(){var f=document.addSchedule;var msg="";if(f.scheduletitle.value=="")
msg+="-Branch title is required.\n";if(parseInt(f.daystart.value)>parseInt(f.dayend.value))
msg+="-Invalid start/end times.\n";if(f.viewdays.value==""||parseInt(f.viewdays.value)<=0)
msg+="Invalid view days.\n";if(f.adminemail.value=="")
msg+="Admin email is required.\n";if(msg!=""){alert("You have the following errors:\n\n"+msg);return false;}
return true;}
function checkAddSubSchedule(){var f=document.addSubSchedule;var msg="";if(f.scheduletitle.value=="")
msg+="-Schedule title is required.\n";if(msg!=""){alert("You have the following errors:\n\n"+msg);return false;}
return true;}
function checkAllBoxes(box){var f=document.forms[0];for(var i=0;i<f.elements.length;i++){if(f.elements[i].type=="checkbox"&&f.elements[i].name!="notify_user")
f.elements[i].checked=box.checked;}
void(0);}
function check_reservation_form(f){var recur_ok=false;var days_ok=false;var is_repeat=false;var msg="";if((typeof f.interval!='undefined')&&f.interval.value!="none"){is_repeat=true;if(f.interval.value=="week"||f.interval.value=="month_day"){for(var i=0;i<f.elements["repeat_day[]"].length;i++){if(f.elements["repeat_day[]"][i].checked==true)
days_ok=true;}}
else{days_ok=true;}
if(f.repeat_until.value==""){msg+="- Please choose an ending date\n";recur_ok=false;}}
else{recur_ok=true;days_ok=true;}
if(days_ok==false){recur_ok=false;msg+="- Please select days to repeat on";}
if(msg!="")
alert(msg);return(msg=="");}
function check_for_delete(f){if(f.del&&f.del.checked==true)
return confirm('Delete this reservation?');}
function toggle_fields(box){document.forms[0].elements["table,"+box.value+"[]"].disabled=(box.checked==true)?false:"disabled";}
function search_user_lname(letter){var frm=isIE()?document.name_search:document.forms['name_search'];frm.firstName.value="";frm.lastName.value=letter;frm.submit();}
function isIE(){return document.all;}
function changeDate(month,year){var frm=isIE()?document.changeMonth:document.forms['changeMonth'];frm.month.value=month;frm.year.value=year;frm.submit();}
function changeScheduler(m,d,y,isPopup,scheduleid){newDate=m+'-'+d+'-'+y;keys=new Array();vals=new Array();var queryString=(isPopup)?window.opener.document.location.search.substring(0):document.location.search.substring(0);queryString=queryString.replace("?","");var pairs=queryString.split('&');var url=(isPopup)?window.opener.document.URL.split('?')[0]:document.URL.split('?')[0];var schedid=""
if(scheduleid==""){for(var i=0;i<pairs.length;i++)
{var pos=pairs[i].indexOf('=');if(pos>=0)
{var argname=pairs[i].substring(0,pos);var value=pairs[i].substring(pos+1);keys[keys.length]=argname;vals[vals.length]=value;}}
for(i=0;i<keys.length;i++){if(keys[i]=="scheduleid"){schedid=vals[i];}}}
else{schedid=scheduleid;}
if(isPopup)
window.opener.location=url+"?date="+newDate+"&scheduleid="+schedid;else
document.location.href=url+"?date="+newDate+"&scheduleid="+schedid;}
function changeResDate(m,d,y,isPopup,scheduleid){var newDate=m+'/'+d+'/'+y;var newDateDisplay=d+'/'+m+'/'+y;var newDateRefresh=m+'-'+d+'-'+y;var myStartDate=window.opener.document.getElementById("hdn_start_date");var myEndDate=window.opener.document.getElementById("hdn_end_date");var myStartDateDiv=window.opener.document.getElementById("div_start_date");var myEndDateDiv=window.opener.document.getElementById("div_end_date");var url=window.opener.window.opener.document.URL.split('?')[0];myStartDate.value=newDate;myEndDate.value=newDate;myStartDateDiv.innerHTML=newDateDisplay;myEndDateDiv.innerHTML=newDateDisplay;window.opener.window.opener.location=url+"?date="+newDateRefresh+"&scheduleid="+scheduleid;self.close();}
function isIE7(){return(document.all&&(typeof document.body.style.maxHeight!="undefined"));}
function ssum(e,text)
{showsummary('schedule_summary',e,text);}
function hsum()
{hideSummary('schedule_summary');}
function msum(e)
{moveSummary('schedule_summary',e);}
function showsummary(object,e,text){myLayer=document.getElementById(object);myLayer.innerHTML=text;w=parseInt(myLayer.style.width);h=parseInt(myLayer.style.height);if(e!=''){if(isIE()){x=e.clientX;y=e.clientY;browserX=document.body.offsetWidth-25;if(isIE7()){x+=document.documentElement.scrollLeft-document.body.clientLeft;y+=document.documentElement.scrollTop-document.body.clientTop;}else{x+=document.body.scrollLeft;y+=document.body.scrollTop;}}
else{x=e.pageX;y=e.pageY;browserX=window.innerWidth-35;}}
x1=x+20;y1=y+20;if(x1+w>browserX){x1=browserX-w;}
myLayer.style.left=parseInt(x1)+"px";myLayer.style.top=parseInt(y1)+"px";myLayer.style.visibility="visible";}
function getAbsolutePosition(element){var r={x:element.offsetLeft,y:element.offsetTop};if(element.offsetParent){var tmp=getAbsolutePosition(element.offsetParent);r.x+=tmp.x;r.y+=tmp.y;}
return r;};function moveSummary(object,e){myLayer=document.getElementById(object);w=parseInt(myLayer.style.width);h=parseInt(myLayer.style.height);if(e!=''){if(isIE()){x=e.clientX;y=e.clientY;browserX=document.body.offsetWidth-25;if(isIE7()){x+=document.documentElement.scrollLeft-document.body.clientLeft;y+=document.documentElement.scrollTop-document.body.clientTop;}else{x+=document.body.scrollLeft;y+=document.body.scrollTop;}}
if(!isIE()){x=e.pageX;y=e.pageY;browserX=window.innerWidth-30;}}
x1=x+20;y1=y+20;if(x1+w>browserX)
x1=browserX-w;myLayer.style.left=parseInt(x1)+"px";myLayer.style.top=parseInt(y1)+"px";}
function hideSummary(object){myLayer=document.getElementById(object);myLayer.style.visibility='hidden';}
function showHideDays(opt){e=document.getElementById("days");if(opt.options[2].selected==true||opt.options[4].selected==true){e.style.visibility="visible";e.style.display=isIE()?"inline":"table";}
else{e.style.visibility="hidden";e.style.display="none";}
e=document.getElementById("week_num")
if(opt.options[4].selected==true){e.style.visibility="visible";e.style.display=isIE()?"inline":"table";}
else{e.style.visibility="hidden";e.style.display="none";}}
function chooseDate(input_box,m,y){var file="recurCalendar.php?m="+m+"&y="+y;if(isIE()){yVal="top="+200;xVal="left="+500;}
if(!isIE()){yVal="screenY="+200;xVal="screenX="+500}
window.open(file,"calendar",yVal+","+xVal+",height=270,width=220,resizable=no,status=no,menubar=no");void(0);}
function selectRecurDate(m,d,y,isPopup){f=window.opener.document.forms[0];f._repeat_until.value=m+"/"+d+"/"+y;f.repeat_until.value=f._repeat_until.value;window.close();}
function setSchedule(sid){f=document.getElementById("setDefaultSchedule");f.scheduleid.value=sid;f.submit();}
function changeSchedule(sel){var url=document.URL.split('?')[0];document.location.href=url+"?scheduleid="+sel.options[sel.selectedIndex].value;}
function showHideCpanelTable(element){var expires=new Date();var time=expires.getTime()+2592000000;expires.setTime(time);var showHide="";if(document.getElementById(element).style.display=="none"){document.getElementById(element).style.display='block';showHide="show";}else{document.getElementById(element).style.display='none';showHide="hide";}
document.cookie=element+"="+showHide+";expires="+expires.toGMTString();}
function changeLanguage(opt){var expires=new Date();var time=expires.getTime()+2592000000;expires.setTime(time);document.cookie="lang="+opt.options[opt.selectedIndex].value+";expires="+expires.toGMTString()+";path=/";document.location.href=document.URL;}
function clickTab(tabid,panel_to_show){document.getElementById(tabid.getAttribute("id")).className="tab-selected";rows=document.getElementById("tab-container").getElementsByTagName("td");for(i=0;i<rows.length;i++){if(rows[i].className=="tab-selected"&&rows[i]!=tabid){rows[i].className="tab-not-selected";}}
div_to_display=document.getElementById(panel_to_show);div_to_display.style.display=isIE()?"block":"table";divs=document.getElementById("main-tab-panel").getElementsByTagName("div");for(i=0;i<divs.length;i++){if(divs[i]!=div_to_display&&divs[i].getAttribute("id").substring(0,3)=="pnl"){divs[i].style.display="none";}}}
function checkBooking(){check_reservation_form(document.forms[0]);checkReservation('check.php','reserve','Checking');updateEnd(this);}
function checkCalendarDates(){var table=document.getElementById("repeat_table");if(table==null)return;if(document.getElementById("hdn_start_date").value!=document.getElementById("hdn_end_date").value){table.style.display="none";table.style.visibility="hidden";}
else{table.style.display=isIE()?"inline":"table";table.style.visibility="visible";}}
function showHideMinMax(chk){document.getElementById("minH").disabled=document.getElementById("minM").disabled=document.getElementById("maxH").disabled=document.getElementById("maxM").disabled=chk.checked}
function moveSelectItems(from,to){from_select=document.getElementById(from);to_select=document.getElementById(to);for(i=0;i<from_select.options.length;i++){if(from_select.options[i].selected){if(isIE()){var option=new Option(from_select.options[i].text,from_select.options[i].value);to_select.options.add(option);from_select.options.remove(i);to_select.options[0].selected=true;}
else{to_select.options.add(from_select.options[i]);}
i--;}}}
function selectAllOptions(button){var form=button.form;var i;for(i=0;i<form.elements.length;i++){if(form.elements[i].type=="select-multiple"&&form.elements[i].multiple==true){selectbox=form.elements[i];for(j=0;j<selectbox.options.length;j++){selectbox.options[j].selected=true;}}}}
function changeMyCal(m,d,y,view){var url=document.URL.split('?')[0];document.location.href=url+"?date="+m+"-"+d+"-"+y+"&view="+view;}
function changeResCalendar(m,d,y,view,id){var url=document.URL.split('?')[0];var type_id=id.split("|");var type=type_id[0];var p=(type=="s")?"scheduleid":"machid";var id=type_id[1];document.location.href=url+"?date="+m+"-"+d+"-"+y+"&view="+view+"&"+p+"="+id;}
function selectUserForReservation(memberid,fname,lname,email){var doc=window.opener.document
doc.forms[0].memberid.value=memberid;doc.getElementById('name').innerHTML=fname+" "+lname;doc.getElementById('memberid').innerHTML=memberid;doc.getElementById('email').innerHTML=email;window.close();}
function adminRowClick(checkbox,row_id,count){var row=document.getElementById(row_id);row.className=(checkbox.checked)?"adminRowSelected":"cellColor"+(count%2);}
function showHide(element){if(document.getElementById(element).style.display=="none"){document.getElementById(element).style.display='block';}
else{document.getElementById(element).style.display='none';}}
function submitJoinForm(isLoggedIn){var loggedIn=(isLoggedIn!=0);var f=document.getElementById("join_form");f.h_join_fname.value=(!loggedIn)?document.getElementById("join_fname").value:"";f.h_join_lname.value=(!loggedIn)?document.getElementById("join_lname").value:"";f.h_join_email.value=(!loggedIn)?document.getElementById("join_email").value:"";f.h_join_userid.value=(loggedIn)?document.getElementById("join_userid").value:"";f.h_join_resid.value=document.getElementById("resid").value;f.submit();}
function validateReservationWindow(){document.getElementById("check").style.display="inline";var f=document.getElementById("reserve");f.target="check";f.submit();}
function createXMLDoc(){var xmlDoc=null;if(document.implementation&&document.implementation.createDocument)
{xmlDoc=document.implementation.createDocument("","",null);}
else if(window.ActiveXObject)
{xmlDoc=new ActiveXObject("Microsoft.XMLDOM");}
return xmlDoc;}
function getOption(opt){if(isIE()){return new Option(opt.text,opt.value);}
else{return opt;}}
function popResourceGroupEdit(machid){window.open("resource_groups.php?edit=1&machid="+machid,"groups","height=350,width=800,resizable=no,status=no,menubar=no");void(0);}
function popResourcePatronTypeEdit(machid){window.open("resource_patron_types.php?edit=1&machid="+machid,"groups","height=350,width=800,resizable=no,status=no,menubar=no");void(0);}
function popGroupEdit(memberid){window.open("group_edit.php?edit=1&memberid="+memberid,"groups","height=350,width=800,resizable=no,status=no,menubar=no");void(0);}
function popGroupView(memberid){window.open("group_edit.php?edit=0&memberid="+memberid,"groups","height=250,width=470,resizable=no,status=no,menubar=no");void(0);}
function showHere(parent,id){var element=document.getElementById(id);var x;var y;var offset=getOffset(parent);x=offset[0];y=offset[1];element.style.left=parseInt(x)+"px";element.style.top=parseInt(y-34)+"px";element.style.display="inline";}
function getOffset(obj){var curLeft=0;var curTop=0;if(obj.offsetParent)
{while(obj.offsetParent)
{curLeft+=obj.offsetLeft
curTop+=obj.offsetTop;obj=obj.offsetParent;}}
else if(obj.x){curLeft+=obj.x;curTop+=obj.y;}
return new Array(curLeft,curTop);}
function switchStyle(obj,style){obj.className=style;}
function openExport(type,id,start,end){var qs='type='+type;if(id.length>0){qs+="&resid="+id;}
else{if(start.length>0){qs+="&start_date="+start;}
if(end.length>0){qs+="&end_date="+end;}}
window.open("ical.php?"+qs);}
function exportSearch(){var _type=document.getElementById("type");var type=_type[_type.selectedIndex].value;var start=document.getElementById("nostart").checked?'':document.getElementById("hdn_start_date").value;var end=document.getElementById("noend").checked?'':document.getElementById("hdn_end_date").value;openExport(type,'',start,end);}
function blurDiv(checkbox,divid){document.getElementById(divid).className=checkbox.checked?"blur_textbox":"textbox";}
function updateEnd(startDrop){return;var endDrop=document.getElementById("endtime");var index=startDrop.selectedIndex;endDrop.selectedIndex=(endDrop.options.length-1>index)?index+1:index;}
function show_calendar(containerid,scheduleid,pagedate,selected){var Event=YAHOO.util.Event;var cal=new YAHOO.widget.Calendar(cal,'calContainer_'+containerid,{iframe:false,close:true,pagedate:pagedate,selected:selected});cal.selectEvent.subscribe(function(){var calDate=this.getSelectedDates()[0];var m=(calDate.getMonth()+1);var d=calDate.getDate();var y=calDate.getFullYear();changeScheduler(m,d,y,0,scheduleid);},cal,true);cal.render();cal.show();};var http_request=null;function createRequestObject(){var request_obj=false;if(window.XMLHttpRequest){request_obj=new XMLHttpRequest();if(request_obj.overrideMimeType){request_obj.overrideMimeType('text/xml');}}
else if(window.ActiveXObject){try{request_obj=new ActiveXObject("Msxml2.XMLHTTP");}
catch(e){try{request_obj=new ActiveXObject("Microsoft.XMLHTTP");}
catch(e){}}}
return request_obj;}
function checkReservation(url,formid,txt){var div=document.getElementById("checkDiv");var f=document.getElementById(formid);http_request=createRequestObject();http_request.onreadystatechange=showCheckResults;http_request.open('POST',url+document.location.search.substring(0),true);http_request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');div.style.textAlign="center";div.style.display="inline";div.innerHTML="<h4>"+txt+"..."+"</h4>";var keyValue="";keyValue=buildKeyValueString(f,keyValue);http_request.send(keyValue);}
function default_sched(scheduleid){var div=document.getElementById("default_sched_link");var url='default_sched.php';http_request=createRequestObject();http_request.onreadystatechange=showDefaultSchedResult;http_request.open('POST',url,true);http_request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');http_request.send('scheduleid='+scheduleid);}
function buildKeyValueString(f,keyValue){for(var i=0;i<f.elements.length;i++){if(f.elements[i].name==""){continue;}
if(f.elements[i].type=="select-multiple"){for(var o=0;o<f.elements[i].options.length;o++){keyValue+=f.elements[i].name+"="+f.elements[i].options[o].value+"&";}}
else if(f.elements[i].type=="checkbox"&&f.elements[i].name.indexOf("[]",0)>=0){if(f.elements[i].checked){keyValue+=f.elements[i].name+"="+f.elements[i].value+"&";}}
else{keyValue+=f.elements[i].name+"="+f.elements[i].value+"&";}}
return keyValue;}
function showDefaultSchedResult(){if(http_request.readyState==4){var txt="";var div=document.getElementById("default_sched_link");if(http_request.status==200){txt=http_request.responseText;}
else{txt="Error changing default schedule";}
div.innerHTML=txt;}}
function showCheckResults(){if(http_request.readyState==4){var txt="";var div=document.getElementById("checkDiv");if(http_request.status==200){div.style.textAlign="left";txt=http_request.responseText;}
else{txt="Error checking reservations";}
div.innerHTML=txt;}}
function update_schedule_view(refresh){var div=document.getElementById("schedule_table");var url=location.href;if(url.indexOf('?')>0)
url+='&ajax=1';else
url+='?ajax=1';http_request=createRequestObject();http_request.onreadystatechange=show_updated_schedule_view;http_request.open('GET',url,true);http_request.send();setTimeout(function(){update_schedule_view(refresh)},refresh);}
function show_updated_schedule_view(){if(http_request.readyState==4){var txt="";var div=document.getElementById("schedule_table");if(http_request.status==200){xmldoc=http_request.responseXML;var n=xmldoc.getElementsByTagName('response')[0].firstChild.nodeValue;div.innerHTML=n;}}}