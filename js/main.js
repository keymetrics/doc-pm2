const gitalk = new Gitalk({
  clientID: '918c405abac62eacf227',
  clientSecret: '7c102fd9965dbe94ce2fb6006ccadcac8f2b9d44',
  repo: 'doc-pm2',
  owner: 'keymetrics',
  admin: ['keymetrics'],
  id: md5(window.location.pathname),
  // facebook-like distraction free mode
  distractionFreeMode: false
})

var wrapper = document.createElement('div');
wrapper.className = "markdown-section";
wrapper.appendChild(document.createElement('hr'));
var container = document.createElement('div');
container.id = 'gittalk';
wrapper.appendChild(container);
document.querySelector('section.content').insertBefore(wrapper, document.querySelector('footer.markdown-section.copyright'));
$(document).ready(function() {
gitalk.render('gittalk');
});



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

(function() {
  // ok
    function setSidebarBreakpoints() {
        var onResize = function() {
            var w = window.innerWidth;
            if (w < 768) {
                toggleClass('body', 'close', true);
            } else {
                toggleClass('body', 'close', false);
            }
        };
        addEvent(window, 'resize', onResize);
        onResize();
    }

// ok
    function logoTogglesSidebarOnMobile() {
        var el = find('.PM2_logo');
        if (el) {
            addEvent(el, 'click', function(e) {
                if (window.outerWidth < 1200) {
                    if (find('body').className.indexOf('close') !== -1) {
                        toggleClass('body', 'close', false);
                    } else {
                        toggleClass('body', 'close', true);
                    }
                }
                e.preventDefault();
            });
        } else {
            console.warn('cannt find .PM2_logo')
        }
    }

    function hideAlgoliaResultsWithEscKey() {
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key == "Escape" || evt.key == "Esc");
            } else {
                isEscape = (evt.keyCode == 27);
            }
            if (isEscape) {
                toggleClass('#hits', 'hide', true);
            }
        };
    }

     // ok
    function configureSearchBarDocSearch() {
        docsearch({
            appId: 'VOHJUDHWT7',
            apiKey: '65aa0e3b2df3e2c47669de31f26cc562',
            indexName: 'pm2',
            inputSelector: '.search_input',
            debug: true // Set debug to true if you want to inspect the dropdown
        });
    }

    function configureSearchBar() {
        return configureSearchBarDocSearch();
    }


    function attachBehaviourToElementsOnTheFly(opts, foundAny) {
        if (!foundAny) foundAny = false;
        var result = Array.prototype.slice.call(document.querySelectorAll(opts.target));
        result.forEach(function(el) {
            if (opts.handlerStopCondition(el)) {
                return;
            }
            opts.handler(el);
            foundAny = true;
        });
        if (foundAny || result.length === 0) {
            setTimeout(function() {
                attachBehaviourToElementsOnTheFly(opts);
            }, opts.interval || 100);
        }
    }

    function anchorClickScrollFix(dataId, timeout) {
        var offsetTop = 0;
        if (dataId) {
            var el = document.querySelector(`[data-id="${dataId}"]`);
            if (el) {
                offsetTop = el.offsetTop;
            }
        }
        setTimeout(function() {
            window.scroll({
                top: !offsetTop ? (window.scrollY - 100) : offsetTop + 100,
                left: 0,
                behavior: 'smooth'
            });
        }, timeout || 1000);
    }

    function iterateSelectorResults(selector, handler) {
        return Array.prototype.slice.call(document.querySelectorAll(selector)).forEach(handler);
    }

    function createSidebarLinkClickHandler() {
        iterateSelectorResults('.sidebar a', function(a) {
            addEvent(a, 'click', function() {
                anchorClickScrollFix();
            });
        });
    }

    function configureGittalkPlugin() {
        attachBehaviourToElementsOnTheFly({
            target: '#gitalk-container',
            handler: function(el) {
                if (el.dataset.configured === '1') return;
                toggleClass(el, 'markdown-section', true);
                appendAt(el, document.createElement('hr'), 0);
                el.removeAttribute('style');
                el.dataset.configured = '1';
            },
            handlerStopCondition: function(el) {
                el.dataset.configured === '1';
            },
            interval: 1000
        });
    }

    function toDom(string) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = string;
        return wrapper.firstChild;
    }

    // ok
    function toggleClass(el, className, toggleValue) {
        if (el && !el.tagName) {
            el = find(el);
        }
        var cls_arr = el.className.split(' ');
        if (toggleValue) {
            add();
        } else {
            remove();
        }

        function remove() {
            if (cls_arr.includes(className)) {
                cls_arr.splice(cls_arr.indexOf(className), 1);
                el.className = cls_arr.join(' ');
            }
        }

        function add() {
            if (!cls_arr.includes(className)) {
                cls_arr.push(className)
                el.className = cls_arr.join(' ');
            }
        }
    }

    function find(s) {
        return window.document.querySelector(s);
    }

    function appendAt(target, el, position) {
        let matchedEl = target.children[position];
        if (!matchedEl) {
            target.appendChild(el);
        } else {
            target.insertBefore(el, matchedEl);
        }
    }

    function addEvent(object, type, callback) {
        if (object == null || typeof(object) == 'undefined') return;
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
        } else if (object.attachEvent) {
            object.attachEvent("on" + type, callback);
        } else {
            object["on" + type] = callback;
        }
        return function() {
            if (object.removeEventListener) {
                object.removeEventListener(type, callback);
            } else if (object.detachEvent) {
                object.detachEvent("on" + type, callback);
            } else {

            }
        }
    }

    function removeEl(selector) {
        var element = document.querySelector(selector);
        element.parentNode.removeChild(element);
    }

    $(document).ready(function(event) {
        // configureSearchBar();
        logoTogglesSidebarOnMobile();
        setSidebarBreakpoints();
        createSidebarLinkClickHandler();
    });


})();