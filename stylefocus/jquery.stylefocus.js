(function($)
{
	
	var methods = {
		init : function( options ) {
			$('<div id="onOffBoxDiv"><form id="onOffForm"><input id="onOffBox" type="checkbox" name="onOffBox" checked="yes" />StyleFocus ON</form></div>').prependTo('body');
						
			$('#onOffBoxDiv').bind('mouseenter.styleFocus', methods.showOF);
			$('#onOffBoxDiv').bind('mouseleave.styleFocus', methods.hideOF);				
			
			return $(this).each(function(){	
				$(this).bind('mouseenter.styleFocus', methods.show);
				$(this).bind('mouseleave.styleFocus', methods.hide);
				$(this).bind('mousemove.styleFocus', methods.changePosition);										
			});	
			
			
		},
		
		showOF : function(){		
			
			$('#onOffBoxDiv').animate({top: "-1px"});
									 
		},
		
		hideOF : function(){
		
			$('#onOffBoxDiv').animate({top: "-20px"});
											 
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
		
		getCSS : function(css) { 	
				 
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
					var line = css[i].split(": ");
					style[line[0].toLowerCase()] = (line[1]);
				};
			}
			return style;
				
		},
		
		show : function(event){

			if($('#onOffBox').is(':checked')){ 
			
				var $this = $(this);
				
				var sheets = document.styleSheets, styleText, formattedStyle;
				
				for(var i=0; i<sheets.length; i++) {
					var rules = sheets[i].rules || sheets[i].cssRules;					
					
					var j = 0;
					
					for(var j=0; j<rules.length; j++) {
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