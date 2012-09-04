// keep all your code in a closure
(function($)
{
	
	var methods = {
		init : function( options ) {
			//create on/off checkbox
			$('<div id="onOffBoxDiv" style="width: 100px; height: 50px; position: absolute; top: 0px; left: 0px; background-color: #cecece; z-index: 1000;"><form id="onOffForm"><input id="onOffBox" type="checkbox" name="onOffBox" checked="yes" />StyleFocus ON</form></div>').prependTo('body');
						
			$('#onOffBox').bind('mouseenter.styleFocus', methods.showHideOF);
						
			
				return $(this).each(function(){	
					$(this).bind('mouseenter.styleFocus', methods.show);
					$(this).bind('mouseleave.styleFocus', methods.hide);
					$(this).bind('mousemove.styleFocus', methods.changePosition);										
				});	
			
			
		},
		showHideOF : function(){
		
		var h = $('#onOffBoxDiv').css('height');		
			if($('#onOffBoxDiv').css('height') == '50px'){
				$('#onOffBoxDiv').animate({height:'10px'},200);
			}
			else{
				$('#onOffBoxDiv').animate({height:50},200);
			}
											 
		},
		
		turnOnOff : function(){
			if($('#onOffBoxDiv').attr('checked') == false){
				$("#onOffBoxDiv").prop("checked", true);
			}
			else if($('#onOffBoxDiv').attr('checked') == true){
				$("#onOffBoxDiv").prop("checked", false);

			}			
		},
		destroy : function( ) {

		   return this.each(function(){
			 $(window).unbind('.styleFocus');
		   });
	
		},
		cssToJs : function(css) { 	
				 
					var style = {};
					if(!css) return style;
					if(css instanceof CSSStyleDeclaration) {
						for(var i in css) {
							if((css[i]).toLowerCase) {
								style[(css[i]).toLowerCase()] = (css[css[i]]);
							}
						}
					} else if(typeof css == "string") {
						css = css.split("; ");          
						for (var i in css) {
							var l = css[i].split(": ");
							style[l[0].toLowerCase()] = (l[1]);
						};
					}
					return style;
				
		},
		show : function(event){

			if($('#onOffBox').is(':checked')){ 
					var $this = $(this);
					//if(typeof element != 'undefined')
//						{$this = element;}
					
					var sheets = document.styleSheets, o = {}, styleText, formattedStyle;
					
					for(var i=0; i<sheets.length;i++) {
						var rules = sheets[i].rules || sheets[i].cssRules;					
						
						var j = 0;
						
						for(var j=0; j<rules.length;j++) {
							if($this.is(rules[j].selectorText)) {
								
								if(sheets[i].href == null){
									styleText = styleText + '<strong>Inline:</strong><br />';
								}
								else{
									styleText = styleText + '<strong>External:</strong><br />';
								}
								
								styleText = styleText + rules[j].cssText+'<br />';								
							}
						}
						
					}					
					formattedStyle = styleText.replace('undefined','');
					formattedStyle = formattedStyle.replace(/{/g,'{<br />');
					formattedStyle = formattedStyle.replace(/}/g,'{<br />');
					formattedStyle = formattedStyle.replace(/;/g,';<br />');
  					
					var children = $(this).children();	

					if($(children).hasClass('highlight') == false){
						$('div.styleBox').remove();
						$('<div class="styleBox">'+ formattedStyle +'</div>').appendTo('body');
						$(this).addClass('highlight');
					}
				

			}
	
		},
		changePosition : function(event){

			var styleBoxX = event.pageX;
			var styleBoxY = event.pageY - 100;
			$('.styleBox').css({'position' : 'relative', 'top' : styleBoxY, 'left' : styleBoxX});

		},
		hide : function(){
			$(this).removeClass('highlight');
			$('div.styleBox').remove();
		},	
  	};
	
    $.fn.styleFocus = function(method)
    {			

		if ( methods[method] ) {
		  return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
		  return methods.init.apply( this, arguments );
		} else {
		  $.error( 'Method ' +  method + ' does not exist on jQuery.StyleFocus' );
		}    
	  
	};      
	
})(jQuery);