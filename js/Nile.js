jQuery(Init);

function Init()
{
	$('body > section:not(:first-child)').addClass('Hidden');

	$(document).on('keydown', HandleKeyPress);
}

function GoNext()
{
	$('body > section:not(.Hidden)')
		.addClass('Hidden')
		.nextOrFirstSibling()
		.removeClass('Hidden');
}

function GoPrev()
{
	$('body > section:not(.Hidden)')
		.addClass('Hidden')
		.prevOrLastSibling()
		.removeClass('Hidden');
}

function HandleKeyPress(e)
{
	const key = e.which;
	console.log(`Key press: ${key}. Event:`);
	console.log(e);
	switch (key)
	{
		case KEY_LEFT:
			// console.log('Left key detected');
			GoPrev();
			break;
			
		case KEY_RIGHT:
			// console.log('Right key detected');
			GoNext();
			break;
	
		default:
			break;
	}
}
