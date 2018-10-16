$(function () {

	bigBox.tabs();
	bigBox.burger();
	bigBox.modal();
	bigBox.close();
	bigBox.mobileSittings();

	$('.time-line').slick({
		centerMode: true,
		centerPadding: '10px',
		slidesToShow: 5,
		responsive: [{
			breakpoint: 480,
			settings: {
				centerMode: true,
				slidesToShow: 3
			}
		}]
	});

	var dateToday = new Date();
	var dates = $("#calendar").datepicker({
		inline: true,
		showOtherMonths: true,
		firstDay: 1,
		minDate: dateToday,
		onSelect: function (selectedDate) {
			var option = this.id == "from" ? "minDate" : "maxDate",
				instance = $(this).data("datepicker"),
				date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
			dates.not(this).datepicker("option", option, date);
			$('.modal-calendar').addClass('active');
			$('.modal-calendar__overley').addClass('active');
			$('#startdate').data('date');
		},
		dayNamesMin: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
		monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
	});

});
$('.training .checkbox__item .checkbox__label').each(function () {
	var value = $(this).text();
	$(this).attr('data-training', value);
});

$('.gyms .checkbox__item .checkbox__label').each(function () {
	var value = $(this).text();
	$(this).attr('data-gym', value);
});

$('.coaches .checkbox__item .checkbox__label').each(function () {
	var value = $(this).text();
	$(this).attr('data-coach', value);
});
console.log($('.training .checkbox__item .checkbox__label').attr('for'));
$('.training-list').css({
	"display" : "none"
});
$('#calendar').css({
	"paddingBottom" : "40px"
});
$('.set-time__item').on('click', function () {
	var day = $('.ui-state-default.ui-state-active').text(),
			month = +$('.ui-state-default.ui-state-active').parent('.ui-datepicker-current-day').attr('data-month') + 1,
			year = $('.ui-state-default.ui-state-active').parent('.ui-datepicker-current-day').attr('data-year'),
			time = $(this).text(),
			hour = +$(this).attr('data-hour') + 1,
			minutes = $(this).attr('data-minutes');
	if ( day.length <= 1 ) {
		$('.meta__data.meta_meta__data.meta__info > .set-day').text('0' + day);
	}else{
		$('.meta__data.meta_meta__data.meta__info > .set-day').text(day);
	}
	if ( month <= 9 ) {
		$('.meta__data.meta_meta__data.meta__info > .set-month').text('0' + month);
	}else{
		$('.meta__data.meta_meta__data.meta__info > .set-month').text(month);
	}
	$('.meta__data.meta_meta__data.meta__info > .set-year').text(year);
	$('.card__information > .card__meta > .meta__info > .weight-bold-before').text(time);
	if ( hour <= 9 ) {
		$('.weight-bold-after').html('0' + hour + ':' + minutes);
	}else{
		$('.weight-bold-after').html(hour + ':' + minutes);
	}
	$('.modal-calendar').removeClass('active');
	$('.modal-calendar__overley').removeClass('active');

	$('.training-list').css({
		"display" : "flex"
	});
	$('#calendar').css({
		"paddingBottom" : "0"
	});
});

$('.gyms .checkbox__item .checkbox__label').on('click', function (){
	var gym = $(this).attr('data-gym');
	$('.card__information .meta__gym > a.meta__link').text(gym);
	if ( !$('.training-list').is(':visible') ) {
		$('.training-list').css({
			"display" : "flex"
		});
	}
});

$('.coaches .checkbox__item .checkbox__label').on('click', function (){
	var coach = $(this).attr('data-coach');
	$('.card__information .meta__trener > a.meta__link').text(coach);
	if ( !$('.training-list').is(':visible') ) {
		$('.training-list').css({
			"display" : "flex"
		});
	}
});

$('.training .checkbox__item .checkbox__label').on('click', function (){
	var training = $(this).attr('data-training');
	$('.your-training-is').text(training);
	if ( !$('.training-list').is(':visible') ) {
		$('.training-list').css({
			"display" : "flex"
		});
	}
});

$('.dropdown-menu-list').on( 'click', function () {
	$('.arrow-down').removeClass('active');
	$('.lvl2-menu').removeClass('open');
	$(this).parent('.acardeon__link').find('div.lvl2-menu').toggleClass('open');
	$(this).next('.arrow-down').toggleClass('active');	
});

var bigBox = new function () {

	this.tabs = function () {
		var $tabs = $('.tabs');
		var $link = $tabs.find('.tabs__link');
		var $section = $tabs.find('.tabs__section');
		var $activeItem = $tabs.find('.tabs__item.active').index();

		$section.eq($activeItem).addClass('active');

		$link.on('click', function () {
			$link.parent().removeClass('active');
			$(this).parent().addClass('active');
			$section.removeClass('active');
			$section.eq($(this).parent().index()).addClass('active');
		});

		$(function() {
			var button = $('#btn-trener');
			var modal = $('.modal-terener');
			var buttonClose = $('.modal-terener__close');

			button.click(function () {
				modal.addClass('modal-active');
			});

			buttonClose.click(function () {
				modal.removeClass('modal-active');
			})

			$(document).keyup(function(e) {
				if (e.keyCode == 27) {
					modal.removeClass('modal-active');
				}
			});
		}())

	};

	this.mobileSittings = function () {

		var $burgerButton = $('.settings-menu');
		var $leftNavigation = $('.left-navigation');
		var $overley = $('.overley-popup');

		$burgerButton.on('click', function () {
			$overley.toggleClass('active');
			$leftNavigation.toggleClass('open');
		});

	};

	this.burger = function () {

		var $burgerButton = $('.burger-button');
		var $Navigation = $('.mobile-menu');

		$burgerButton.on('click', function () {
			$Navigation.toggleClass('active');
		});

	};

	this.modal = function () {

		var $buttonLink = $('.coast-list__link');
		var $modalContent = $('.modal');
		var $modalOverley = $('.modal-overley');
		var $madalClose = $('.modal__close');
		
		$buttonLink.on('click', function () {
			$modalContent.addClass('open');
			$modalOverley.addClass('open');
		});

		$madalClose.on('click', function () {
			$modalContent.removeClass('open');
			$modalOverley.removeClass('open');
		});
	};

	this.close = function () {

		$closeButton = $('.modal__close');
		$modalCalendar = $('.modal-calendar');
		$modalOverley = $('.modal-calendar__overley');

		$closeButton.on('click', function () {
			$modalCalendar.removeClass('active');
			$modalOverley.removeClass('active');
		})

	}
};

(function () {
	var modalContent = $('.modal-footer');
	var modalClose = $('.modal-footer__close');

	var buttonConnectClub = $('#connect-club');
	var modalConnectClub = $('.modal-footer--overley--connect');

	var buttonBecomePartner = $('#become-partner');
	var modalPartners = $('.modal-footer--overley--partners');

	var buttonCollback = $('#collback');
	var modalCollback = $('.modal-footer--overley--collback');

	buttonConnectClub.click(function() {
		modalConnectClub.css('display', 'block');
		fadeInModal(1);
	});

	buttonBecomePartner.click(function () {
		modalPartners.css('display', 'block');
		fadeInModal(1);
	});

	buttonCollback.click(function () {
		modalCollback.css('display', 'block');
		fadeInModal(1);
	})

	modalClose.click(function (e) {
		fadeOut(0);
	});

	$(window).keyup(function (e) {
		if (e.keyCode == 27) {
			fadeOut(0);
		}
	});

	function fadeInModal(x) {
		var modal = $('.modal-footer--overley');
		var opc = parseFloat(modal.css('opacity'));
		
		if (opc < x) {
			opc += 0.05;
			modal.css('opacity', opc);

			setTimeout(function () {
				fadeInModal(x);
			}, 10);
		}
	}

	function fadeOut(x) {
		var modal = $('.modal-footer--overley');
		var opc = parseFloat(modal.css('opacity'));

		if (opc > x) {
			opc -= 0.05;
			modal.css('opacity', opc);

			setTimeout(function () {
				fadeOut(x);
			}, 10);
		}

		if (opc == x) {
			modal.css('display', 'none');
		}
	}
}());

