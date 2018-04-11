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
            apiKey: '287f3974c9d415757200ffa7052bca0f',
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

    function fixLinks(html) {
      var types = ['runtime', 'monitoring', 'enterprise'];
      types.forEach(function(t) {
          html = html.replace(new RegExp(t + '/' + t, 'g'), t);
      });
      return html;
  }

    $(document).ready(function(event) {
        configureSearchBar();
        logoTogglesSidebarOnMobile();
        setSidebarBreakpoints();
        createSidebarLinkClickHandler();
    });
    

})();