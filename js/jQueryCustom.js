(function ($)
{
	$.fn.nextOne = function(selector)
	{
		const next = this.next(selector);
		return (next.length > 0) ? next : null;
	};
	
	$.fn.prevOne = function(selector)
	{
		const prev = this.prev(selector);
		return (prev.length > 0) ? prev : null;
	};
	
	$.fn.nextOrFirstSibling = function(selector)
	{
		return this.nextOne(selector)
			?? this.siblings(selector).first();
	};
	
	$.fn.prevOrLastSibling = function(selector)
	{
		return this.prevOne(selector)
			?? this.siblings(selector).last();
	};
}(jQuery));
