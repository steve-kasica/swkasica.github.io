/* global $ ScrollMagic TimelineMax Linear TweenMax history */

$(document).ready(function() {
    'use strict'
    
   // $('.cover').height(window.innerHeight);
    
    var filterSettings = (function(){
        var out = {};
        $('.filter a').each(function(i, el) {
            var $el = $(el);
            if ($el.attr('datakey') === 'checkbox') {
                 out[$el.attr('datavalue')] = ($el.hasClass('active')) ? true : false;
            } else if (!$el.hasClass('hidden')) {
                out[$el.attr('datakey')] = $el.attr('datavalue');
            }
        });
        return out;
    })();
    
    var $isotope = $('.isotope');
    var $grid = $isotope.isotope({
        itemSelector: '.item-container',
        percentPosition: true,
        layoutMode: 'masonry',
        masonry: {
            // use outer width of grid-sizer for columnWidth
            columnWidth: '.grid-sizer',
        },
        stamp: '.stamp',
        getSortData: {
            'post_title': '.item',
            'post_coolness': '[coolness] parseInt',
        },
        animationOptions: {
            duration: 200,
            queue: false,
            easing: 'linear',
        },
    });
    
    $isotope.css('min-height', $isotope.css('height'));
  
    // Trigger cycle toggle on radio filters
    $('.radio > a').click(function(e) {
        e.preventDefault();
        var $el = $(this);
        var sibs = $el.parent().children();        
        $el.addClass('hidden');
        sibs.eq((sibs.index($el) + 1) % sibs.length).removeClass('hidden');
    });
    
    // Trigger strikethrough-underline toggle on checkbox filters.
    $('.checkbox > a').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });
    
    // Trigger isotope filtering 
    $('.filter a').click(function(e){
        e.preventDefault();
        var $el = $(this);
        var key = $el.attr('datakey');
        var val = $el.attr('datavalue');
        
        if (key === 'checkbox') {
            filterSettings[val] = !filterSettings[val];
        } else {
            filterSettings[key] = $('a[datakey=' + key + ']').not('.hidden').attr('datavalue');
        }
        
        $grid.isotope({
            filter: (function() {
                var facets = [];
                var isXor = false;
                var delim, out;
                
                for (var prop in filterSettings) {
                    if (typeof filterSettings[prop] === 'boolean' && filterSettings[prop]) {
                        facets.push('.' + prop);
                    }
                }
                
                switch(filterSettings.logic) {
                    case 'and': delim = ''; break;
                    case 'xor': isXor = true;
                    case 'or': delim = ', '; break;
                }
                
                if (isXor) {
                    var not = ':not(' + facets.join('') + ')';
                    out = facets.map(function(el) {
                        if (facets.length > 1)
                            return el + not;
                        else
                            return el;
                    }).join(delim);
                } else {
                    out = facets.join(delim);
                }
                return out;
            })(),
            sortBy: 'post_' + filterSettings.sort,
            sortAscending: (filterSettings.order === 'asc'),
        });
        
    });
        
}); // $(document).ready