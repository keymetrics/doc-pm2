var KeymetricsPlugin = (function() {
    function changePageClassBasedOnTheUrl(activeClass) {
        var route = location.href.replace(location.origin, '');
        toggleClass('html', 'runtime-page', false);
        toggleClass('html', 'monitoring-page', false);
        toggleClass('html', 'enterprise-page', false);
        if (activeClass) {
            return toggleClass('html', activeClass, true);
        }
        if (route.indexOf('runtime') !== -1) {
            return toggleClass('html', 'runtime-page', true);
        }
        if (route.indexOf('monitoring') !== -1) {
            return toggleClass('html', 'monitoring-page', true);
        }
        if (route.indexOf('enterprise') !== -1) {
            return toggleClass('html', 'enterprise-page', true);
        }
    }

    function mountExtraSidebar(next) {
        var html = find('#sidebar2-template').innerHTML.toString().trim();
        var s = find('.sidebar');
        var el = toDom(html);
        s.insertBefore(el, s.children[0]);
        next();
    }

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

    function configureSearchBarDocSearch() {
        docsearch({
            appId: 'VOHJUDHWT7',
            apiKey: '287f3974c9d415757200ffa7052bca0f',
            indexName: 'pm2',
            inputSelector: '.search_input',
            debug: true // Set debug to true if you want to inspect the dropdown
        });
    }

    function cofigureSearchBarInstantSearch() {

        window.onHitClick = function(dataId) {
            setTimeout(function() {
                anchorClickScrollFix(dataId, 0); //Docsify needs to render the article first.
            }, 10);
        };

        const root = '.search-wrapper';
        const search = instantsearch({
            appId: 'VOHJUDHWT7',
            apiKey: '287f3974c9d415757200ffa7052bca0f',
            indexName: 'pm2',
            urlSync: false,
            searchFunction: searchFunction
        });

        hideAlgoliaResultsWithEscKey();

        function searchFunction(h) {
            h.search();
        }

        search.addWidget(
            instantsearch.widgets.searchBox({
                container: root,
                placeholder: 'Search documentation...'
            })
        );

        search.addWidget(
            instantsearch.widgets.hits({
                container: '#hits',
                templates: {
                    empty: 'No results',
                    item: `<a 
                href="{{{href}}}" 
                onclick="onHitClick('{{{dataId}}}')"
                >{{{_highlightResult.label.value}}}</a>`
                },
                transformData: {
                    item: function(hit) {
                        //console.log('HIT', hit)
                        return hit;
                    }
                }
            })
        );

        search.start();
    }

    function configureSearchBar() {
        return configureSearchBarDocSearch();
        //return cofigureSearchBarInstantSearch();
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
                //closeSidebarOnSmallScreens();
            });
        });
    }



    function insertFooter(hook, vm) {
        var footer = `
            <article class="markdown-section copyright">
                <p>&copy; 2018 Keymetrics</p>
                <ul>
                    <li><a href="javascript:void(0);">Terms of Use</a></li>
                    <li><a href="javascript:void(0);">Privacy Policy</a></li>
                </ul>
            </article>
    `;
        find('section.content').innerHTML += footer;
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

    function getTopBlock() {
        const topBlock = `<div class="markdown-section gettings_started_block topBlock">
        <p>
        Getting started with PM2 
        <span class="runtime_block gettings_started_block_span">Runtime</span>
        <span class="monitoring_block gettings_started_block_span">Monitoring</span>
        <span class="enterprise_block gettings_started_block_span">Enterprise</span>
        </p>
    </div>`;
        return topBlock;
    }

    function getEditPageBlock() {
        return `
        <div class="edit-page">
            <a class="edit-page__text"
            target="_blank" href="https://github.com/rmonnier/pm2-docsify-proto/blob/master/docs${$docsify.nameLink}.md"
            >Edit Page</a>
        </div>
        `;
    }

    function removeEl(selector) {
        var element = document.querySelector(selector);
        element.parentNode.removeChild(element);
    }

    function changePageClassWhenSidebarLinkClicked() {
        $('.sidebar_2 a').on('click', function() {
            changePageClassBasedOnTheUrl(this.dataset.page);
        });
    }

    $(document).ready(function(event) {
        changePageClassBasedOnTheUrl();
        configureSearchBar()
        logoTogglesSidebarOnMobile();
        mountExtraSidebar(changePageClassWhenSidebarLinkClicked);
        setSidebarBreakpoints();
        createSidebarLinkClickHandler();
        insertFooter();
        $('article#main.markdown-section').html(getEditPageBlock() + $('article#main.markdown-section').html())
    });

    function fixLinks(html) {
        var types = ['runtime', 'monitoring', 'enterprise'];
        types.forEach(function(t) {
            html = html.replace(new RegExp(t + '/' + t, 'g'), t);
        });
        return html;
    }

    return function(hook, vm) {
        hook.beforeEach(function(content) {
            removeEl('.topBlock');
            return content
        });
        hook.afterEach(function(html, next) {
            next(getEditPageBlock() + fixLinks(html));
        });
        hook.doneEach(function() {
            appendAt(find('section.content'), toDom(getTopBlock()), 0);
        });
        hook.mounted(function() {
            removeEl('.sidebar-toggle');

        });
    }
})();

$docsify.plugins.push(KeymetricsPlugin);