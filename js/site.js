/* global $ */

$(document).ready(function() {
    'use strict'

////////////////////////////////////////////////////////////////////////////////
// Script variables
//

    var scrollDuration = 1000,  // ms
        scrollEasing = 'swing',  // $.animate's default
        brandSelector = '.brand > a',
        headerSelector = '#landing',
        categorySelector = '.category',
        fixedClassName = 'fixed',
        $window = $(window),
        $nav = $('#nav'),
        initialOffset = $window.height(),
        navHeight = $nav.outerHeight(),
        itemSelector = 'section',
        gridItemMode = 'fitRows',
        gridTitleSelector = '.post_title > a',
        gridCoolnessSelector = '.post_coolness',
        radioBtn = 1,
        checkbox = 2,
        $grid;

// Cache selectors for Highlight On Scroll (hos)
var hos = {
    lastId: undefined,
    // All list items
    menuItems: $nav.find('ul a'),
};

hos.topMenuHeight = $nav.outerHeight() + 1;

// Anchors corresponding to menu items
hos.scrollItems = hos.menuItems.map(function() {
    var item = $($(this).attr("href"));
    return (item.length) ? item : null;
});

////////////////////////////////////////////////////////////////////////////////
// Enable smooth scrolling on internal links
// hat-tip to https://css-tricks.com/snippets/jquery/smooth-scrolling
//
    
    // Scroll to section
    $('a[href^="#"]:not([href="#"])').click(function(e) {
        e.preventDefault();
        var hash = this.hash;
        var $dest = $(hash);
        scrollTo($dest, navHeight);
        return;
    });
    
    // Scroll to the top
    $(brandSelector).click(function(e){
        e.preventDefault();
        var $dest = $('body');
        scrollTo($dest, navHeight);
    });
    
    function scrollTo($target, offset, cb) {
        var offset = offset || 0;
        $('html, body').animate({
            scrollTop: $target.offset().top - offset,
        }, scrollDuration, scrollEasing, cb);
        return;
    }

////////////////////////////////////////////////////////////////////////////////
// Isotope filtering
//

    $('.grid').each(function(i, elem) {
        
        var $elem = $(elem),
            context = $elem.parent().attr('id'),
            filterSettings = {
                radios: {
                    order: {
                        value: 'asc',
                        type: radioBtn,
                        $el: $('#' + context + '-filter .order'),
                    },
                    logic: {
                        value: 'and',
                        type: radioBtn,
                        $el: $('#' + context + '-filter .logic')
                    },
                    sort: {
                        value: 'name',
                        type: radioBtn,
                        $el: $('#' + context + '-filter .sort'),
                    },  
                },
                checkboxes: {},
            };
        
        // Initialize Isotope filtering and Masonry layout
        $elem.isotope({
            itemSelector: itemSelector,
            layoutMode: gridItemMode,
            getSortData: {
                'post_title': gridTitleSelector,
                'post_coolness': gridCoolnessSelector + ' parseInt',
            },
        });
        
        // Initialize checkbox filters and add events
        $elem.siblings('aside').find('span.checkbox a').each(function(i, el) {
            
            filterSettings.checkboxes[el.id] = {
                value: false,
                type: checkbox,
                $el: $('#' + context + '-filter #' + context + '-' + el.id),
            };
            
        }).click(function(e) { 
            // Filter tags as if they were checkboxes
            
            e.preventDefault();
            var setting = filterSettings.checkboxes[e.currentTarget.id];
            setting.value = (!setting.value);
            e.currentTarget.className = (setting.value) ? 'active' : '';
        
            // TODO: timeout
            updateFilter($elem, filterSettings);
        });
        
        $elem.siblings('aside').find('span.radio a').click(function(e) {
            // Filter other settings as if they were radio butttons            
            
            e.preventDefault();
            var next = e.currentTarget.nextElementSibling || e.currentTarget.parentElement.firstElementChild;
            var setting = filterSettings.radios[e.currentTarget.parentElement.id];
        
            e.currentTarget.className = 'hidden'; // hide previous option
            next.className = '';  // unhide current option
            setting.value = next.id.split('-').pop();
        
            // TODO: timeout
            if (e.currentTarget.parentElement.id === 'logic') {
                updateFilter($elem, filterSettings);
            } else {
                updateSort($elem, filterSettings);
            }
        });
        
    });
    
    function updateFilter($grid, settings) {
        var isAnd = (settings.radios.logic.value === 'and');
        var filterLogic = isAnd ? '' : ', ';
        var filter = [];
        for (var setting in settings.checkboxes) {
            if (settings.checkboxes[setting].value) {
                filter.push('.' + setting);
            }
        }
       
       $grid.isotope({
            filter: filter.join(filterLogic)
        });
    }
    
    function updateSort($grid, settings) {
        $grid.isotope({
            sortBy: 'post_' + settings.radios.sort.value,
            sortAscending: (settings.radios.order.value === 'asc'),
        });
    }

////////////////////////////////////////////////////////////////////////////////
// Layout
//
    
    // Set .cover elems to window height on page load
    resizeCover();
    
    // recalculate resize height on window resize
    $(window).resize(resizeCover);
    
    function resizeCover() {
        var height = $(window).height();
        
        $(headerSelector).css('height', height);
        $('body').css('padding-top', height);
        $(categorySelector).css('min-height', height);
    }
    
    // Define scrolling functionality
    $window.scroll(function() {
        var loc = $(this).scrollTop();
        
        // Enable sticky nav
        if ( loc > initialOffset ) {
            $nav.addClass(fixedClassName);
        } else {
            $nav.removeClass(fixedClassName);
        }
        
        // Enable highlight on scroll (hos)
        // Tip of the hat to https://codepen.io/joxmar/pen/NqqMEg
        
        // Get container scroll position
        hos.fromTop = $(this).scrollTop() + hos.topMenuHeight;            
            
        // Get id of current scroll item
        hos.cur = hos.scrollItems.map(function() {
            if ($(this).offset().top < hos.fromTop) {
                return this;
            }
        });
            
        // Get the id of the current element
        hos.cur = hos.cur[hos.cur.length - 1];
        hos.id = (hos.cur && hos.cur.length) ? hos.cur[0].id : "";        
            
        if (hos.lastId !== hos.id) {
            hos.lastId = hos.id;
       
            // Set/remove active class
            hos.menuItems.each(function(i, el) {
                var $el = $(el);
                if ($el.attr('href').substr(1) == hos.id) {
                    $el.addClass('active')
                } else {
                    $el.removeClass('active');
                }
            });
        }                               
        
    }); // window scroll callback
    
}); // $(document).ready