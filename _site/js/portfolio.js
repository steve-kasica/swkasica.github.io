// portfolio.js
// =====================================
//
$(document).ready(function() {
    var $grid = $('.grid');
    var filterValues = [];
    var filterLogic;
    
    // Initialize layout, filtering, and sorting
    $grid.isotope({
        itemSelector: '.item',
        percentPosition: true,
        layoutMode: 'masonry',
        masonry: {
            // use outer width of grid-sizer for columnWidth
            columnWidth: '.item-sizer',
        },
        stamp: '.stamp',
        getSortData: {
            title: '[data-title]',
            coolness: '[data-coolness] parseInt',
        },
        animationOptions: {
            duration: 200,
            queue: false,
            easing: 'linear',
        },
    });

    // Filter results by filter logic
    $('input[name=logic]').change(function(ev) {
        filterLogic = ev.currentTarget.value;
        updateFilters();
    });

    // Filter results by tag
    $('.tags input').change(function() {
        filterValues = Array.from($('.tags input:checked').map(function(i, el) { 
            return '.' + $(el).attr('value'); 
        }));
        updateFilters();
    });

    // Update sort order
    $('input[name=sortAscending]').change(function(ev) {
        var ascending = (ev.currentTarget.value == 'true');
        $grid.isotope({ sortAscending: ascending });
    });

    // Update sorting attribute
    $('input[name=sortBy').change(function(ev) {
        var val = ev.currentTarget.value.toLowerCase();
        $grid.isotope({ sortBy: val });
    });

    function updateFilters() {    
        var delim;    
        if (filterLogic == 'and') {
            delim = ''; 
        } else if (filterLogic == 'or') {
            delim = ', ';
        }

        $grid.isotope({ filter: filterValues.join(delim) }); 

        return null;       
    }
});