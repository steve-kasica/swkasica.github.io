/* global $ */

$(document).ready(function() {
    'use strict'
    var hidden = 'd-none';  // bootstrap class for display: none; style
    
    // Enable all tooltips
    $('[data-toggle="tooltip"]').tooltip()

    
    // Trigger cycle toggle on radio filters
    $('.radio > a').click(function(e) {
        e.preventDefault();
        var $el = $(this);
        var sibs = $el.parent().children();        
        $el.addClass(hidden);
        sibs.eq((sibs.index($el) + 1) % sibs.length).removeClass(hidden);
    });
    
    // Trigger strikethrough-underline toggle on checkbox filters.
    $('.checkbox > a').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });
    
    // Initialize isotope filtering
    // $('.isotope').each(function(i,el) {
    //     var $el = $(el);
    //     var $header = $(el).siblings('.header');
        
    //     $el.filterSettings = (function() {
    //         var out = {};
    //         $header.find('.filter a').each(function(i, el) {
    //             var $el = $(el);
    //             if ($el.attr('datakey') === 'checkbox') {
    //                  out[$el.attr('datavalue')] = ($el.hasClass('active')) ? true : false;
    //             } else if (!$el.hasClass(hidden)) {
    //                 out[$el.attr('datakey')] = $el.attr('datavalue');
    //             }
    //         });
    //         return out;
    //     })();
        
    //     $el.isotope({
    //         itemSelector: '.item-container',
    //         percentPosition: true,
    //         layoutMode: $el.attr('data-layout'),
    //         masonry: {
    //             // use outer width of grid-sizer for columnWidth
    //             columnWidth: (function(mode) {
    //                 return (mode === 'masonry') ? '.grid-sizer' : '100%';
    //             })($el.attr('data-layout')),
    //         },
    //         stamp: '.stamp',
    //         getSortData: {
    //             'post_title': '[data-title]',
    //             'post_coolness': '[data-coolness] parseInt',
    //         },
    //         animationOptions: {
    //             duration: 200,
    //             queue: false,
    //             easing: 'linear',
    //         },
    //     });
    
    //     $el.css('min-height', Number($el.css('height').replace('px','')) + 10);

    //     // Trigger isotope filtering 
    //     $header.find('.filter a').click(function(e) {
    //         e.preventDefault();
    //         var $a = $(this);
    //         var key = $a.attr('datakey');
    //         var val = $a.attr('datavalue');
            
    //         if (key === 'checkbox') {
    //             $el.filterSettings[val] = !$el.filterSettings[val];
    //         } else {
    //             $el.filterSettings[key] = $header.find('a[datakey=' + key + ']').not('.' + hidden).attr('datavalue');
    //         }
            
    //         $el.isotope({
    //             filter: (function() {
    //                 var facets = [];
    //                 var isXor = false;
    //                 var delim, out;
                    
    //                 for (var prop in $el.filterSettings) {
    //                     if (typeof $el.filterSettings[prop] === 'boolean' && $el.filterSettings[prop]) {
    //                         facets.push('.' + prop);
    //                     }
    //                 }
                    
    //                 switch($el.filterSettings.logic) {
    //                     case 'and': delim = ''; break;
    //                     case 'xor': isXor = true;
    //                     case 'or': delim = ', '; break;
    //                 }
                    
    //                 if (isXor) {
    //                     var not = ':not(' + facets.join('') + ')';
    //                     out = facets.map(function(el) {
    //                         if (facets.length > 1)
    //                             return el + not;
    //                         else
    //                             return el;
    //                     }).join(delim);
    //                 } else {
    //                     out = facets.join(delim);
    //                 }
    //                 return out;
    //             })(),
    //             sortBy: 'post_' + $el.filterSettings.sort,
    //             sortAscending: ($el.filterSettings.order === 'asc'),
    //         });
    //     }); // click filter > a click
    // }); // for each .isotope

}); // $(document).ready