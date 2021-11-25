jQuery(Init);

function Init()
{
	$('body > section:not(:first-of-type)').addClass('Hidden');

	AnimateLogo('Logo', 'Logo');
	setTimeout(() => GotoPage('Welcome'), 1000);
}

let Page = 'Title';
function GotoPage(page)
{
	if (page == Page) return;
	const prev = Page;
	Page = page;
	
	$('body > section')
		.addClass('Hidden')
		.filter((i,e) => $(e).hasClass(page+'Screen'))
		.removeClass('Hidden');
	
	$dyn = $('.DynamicSplash')
		.removeClass()
		.addClass('DynamicSplash')
		.addClass(page);
	
	if (page == 'Home')
		AnimateLogo('Logo', 'Menu');
	else if (prev == 'Home')
		AnimateLogo('Menu', 'Logo');
}
