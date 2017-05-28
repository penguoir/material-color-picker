var colors = [
	'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue',
	'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime',
	 'yellow', 'amber', 'orange', 'deep-orange', ]
var shades = [
	'-50', '-100', '-200', '-300', '-400', '-500', '-600', '-700',
	'-800', '-900', '', '', '-a-100', '-a-200', '-a-400', '-a-700'
]

var colorState = true;
var currentColor = null;
var copyState = 'hex';

// 'Not optimised for mobile' message when on mobile
function checkMobile() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if ( checkMobile() ) {
	$('#app').remove();
	$('body').html('<h1>Sorry, material color picker only works for desktops.</h1>');
}

function getBackgroundColor(trigger) {
	// Return value depending on the copy state
	var bg = tinycolor( $(trigger).css('background-color') );
	switch (copyState) {
		case 'hex':
			return bg.toHexString();
			break;
		case 'hexnohash':
			return bg.toHex();
			break;
		case 'hsl':
			return bg.toHslString();
			break;
		case 'rgb':
			return bg.toRgbString();
			break;
		default:
			return bg.toHexString();
	}
}

function copy (index) {
	// Copies the color selected
	var clipboard = new Clipboard('.cbox', {
		text: function(trigger) {
			return getBackgroundColor(trigger);
		}
	});

	// Handle success and error
	clipboard.on('success', function(e) {
		$('.checkmark i').text('check');
		$('.checkmark').fadeIn().delay(300).fadeOut();
		clipboard.destroy();
	})

	clipboard.on('error', function eror(e) {
		$('.checkmark i').text('error');
		$('.checkmark').fadeIn().delay(300).fadeOut();
		clipboard.destroy();
	})
}

function showShades (index) {
	// Show back button
	$('.back-button').show();

	currentColor = colors[index];
	colorState = false;

	// Converts to different shades of color selected
	$('.cbox').each(function(i) {
		$(this).removeClass( colors[i] + '-500' ).addClass( colors[index] + shades[i] );
	});
}

function showColors () {
	// Hide back button
	$('.back-button').hide();

	// Converts to all colors
	$('.cbox').each(function(i) {
		$(this).removeClass(currentColor + shades[i]).addClass(colors[i] + '-500');
	});

	currentColor = null;
	colorState = true;
}

$(document).ready(function () {
	if ( Cookies.get('format') ) {
		copyState = Cookies.get('format');
	}

	// Turns boxs into primary colors
	$('.cbox').each(function (index) {
		$(this).addClass(colors[index] + '-500');
		$(this).attr('data-index', index);
	})

	// Adds data-index, shows shades when currently colors and copies color if shades.
	$('.cbox').click(function (event) {
		index = $(this).attr('data-index');
		colorState ? showShades( index ) : copy( index );
		$('.cbox-container').rippleria('changeColor', $(this).css('background-color'))
		$('.cbox-container').rippleria("changeDuration", "400");
	})

	// Go to primary colors when clicking on back button
	$('.back-button').click(function() {
		showColors();
	})

	// Goes to original colors when clicking on backspace key
	document.addEventListener("keydown", function(event) {
		if (event.keyCode == 8) showColors();
	});

	$('.menu').click(function() {
		if($('.color-format').css('display') == 'flex') {
			$('.color-format').hide('fast').css('display', 'none');
		}
		else {
			$('.color-format').show('fast').css('display', 'flex');
		}
	})

	// Closes menu when clicking outside of the menu
	$("body").click(function(){
	  $('.color-format').hide('fast').css('display', 'none');
	});

	$(".menu-area").click(function(e){
	  e.stopPropagation();
	});

	// Swap the color copy format 
	$('.color-format').click(function() {
		$('.active').removeClass('active');
		$(this).addClass('active');
		copyState = $(this).text();
		Cookies.set('format', copyState, {expires: 1000000000});
	})

	// Adds active class to current copy state (changes because of cookies)
	$('.' + copyState).addClass('active');

});
