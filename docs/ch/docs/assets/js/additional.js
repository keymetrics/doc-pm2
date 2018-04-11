$(function() {
    logoClick();
    pWarn();
    trasformH2();
    smoothScroll (500);
    anchorH2();
});

function helper(className, content) {
    return ("<p class=\"" + className + "\">" + (content.slice(5).trim()) + "</p>");
}

function transformClass(text) {
    var result;
    if (/^!&gt;/.test(text)) {
        result = helper('tip', text);
    } else if (/^\?&gt;/.test(text)) {
        result = helper('warn', text);
    } else {
        result = "<p>" + text + "</p>";
    }
    return result;
}

// if markdown & rendered HTML contains contains 'p tag &gt'
// render as p class=warn
function pWarn() {
    var allPtag = document.getElementsByTagName("p");
    var length = allPtag.length;
    var text = [];



    for (var i = 0; i < length; i++) {
        if(allPtag[i].innerHTML.indexOf("&gt") !== -1) {
        text[i] = transformClass(allPtag[i].innerHTML);
        allPtag[i].outerHTML = text[i];
        }
    }
}

function logoClick() {
    $('.PM2_logo').click(function() {
        $(this).toggleClass('close');
    });
}

function smoothScroll (duration) {
  $('#main a[href^="#"]').on('click', function(event) {

      var target = $( $(this).attr('href') );

      if( target.length ) {
          // event.preventDefault();
          $('html, body').animate({
              scrollTop: target.offset().top
          }, duration);
      }
  });
}

function trasformH2() {
var heading = document.querySelectorAll('h2');
var length = heading.length;
var output = {};

  for (var i = length - 1; i >= 0; i--) {
    var slug = slugify(heading[i].innerText);
    var text = heading[i].innerText;
    output[i] = "<h2 id=\"" + slug + "\"><a href=\"#" + slug + "\" data-id=\"" + slug + "\" class=\"anchor\"><span>" + text + "</span></a></h2" + ">";
    heading[i].outerHTML = output[i];
  }
}

// from docsify.js
var hasOwn = Object.prototype.hasOwnProperty;
var cache$1 = {};
var re = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g;

function lower(string) {
  return string.toLowerCase();
}

function slugify(str) {
  if (typeof str !== 'string') {
    return '';
  }

  var slug = str
    .trim()
    .replace(/[A-Z]+/g, lower)
    .replace(/<[^>\d]+>/g, '')
    .replace(re, '')
    .replace(/\s/g, '-')
    .replace(/-+/g, '-')
    .replace(/^(\d)/, '_$1');
  var count = cache$1[slug];

  count = hasOwn.call(cache$1, slug) ? count + 1 : 0;
  cache$1[slug] = count;

  if (count) {
    slug = slug + '-' + count;
  }

  return slug;
}

function anchorH2() {
    var urlHash = window.location.href.split("#")[1];
    if (urlHash &&  $('#' + urlHash).length )
          $('html,body').animate({
              scrollTop: $('#' + urlHash).offset().top
          }, 1000);
}