(function() {

  $(document).ready(function(event) {
    pWarn();
    setAnchors();
    setGitalk();
    logoTogglesSidebarOnMobile();
    setSidebarBreakpoints();
  });

  function setAnchors() {
    var anchorForId = function (id) {
      var anchor = document.createElement("a");
      anchor.className = "header-link";
      anchor.href      = "#" + id;
      anchor.innerHTML = "<i class=\"fa fa-link\">#</i>";
      return anchor;
    };

    var linkifyAnchors = function (level, containingElement) {
      var headers = containingElement.getElementsByTagName("h" + level);
      for (var h = 0; h < headers.length; h++) {
        var header = headers[h];

        if (typeof header.id !== "undefined" && header.id !== "") {
          header.appendChild(anchorForId(header.id));
        }
      }
    };

    document.onreadystatechange = function () {
      if (this.readyState === "complete") {
        var contentBlock = document.getElementsByClassName("content")[0];
        if (!contentBlock) {
          return;
        }
        for (var level = 2; level <= 6; level++) {
          linkifyAnchors(level, contentBlock);
        }
      }

      // var urlHash = window.location.href.split("#")[1];
      // if (urlHash &&  $('#' + urlHash).length )
      //   $('html,body').animate({
      //     scrollTop: $('#' + urlHash).offset().top
      //   }, 1000);
    };
  }

  function setGitalk() {
    var gitalk = new Gitalk({
      clientID: '918c405abac62eacf227',
      clientSecret: '7c102fd9965dbe94ce2fb6006ccadcac8f2b9d44',
      repo: 'doc-pm2',
      owner: 'keymetrics',
      admin: ['robin-monnier', 'vmarchaud', 'Unitech'],
      language: document.documentElement.lang === 'ch' ? 'zh-CN' : 'en',
      id: md5(window.location.pathname),
      // facebook-like distraction free mode
      distractionFreeMode: false
    })

    $(document).ready(function() {
      try {
        gitalk.render('gittalk');
      } catch(e) { console.error('Could not find comment thread')}
    });
  }



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

  // function logoClick() {
  //   $('.PM2_logo').click(function() {
  //     $(this).toggleClass('close');
  //   });
  // }

  // from docsify.js
  var hasOwn = Object.prototype.hasOwnProperty;
  var cache$1 = {};
  var re = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g;

  function lower(string) {
    return string.toLowerCase();
  }

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
    var el = find('.sidebar-toggle');
    if (el) {
      addEvent(el, 'click', function(e) {
        if (find('body').className.indexOf('close') !== -1) {
          toggleClass('body', 'close', false);
        } else {
          toggleClass('body', 'close', true);
        }
        e.preventDefault();
      });
    } else {
      console.warn('can\'t find .PM2_logo')
    }
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

  function iterateSelectorResults(selector, handler) {
    return Array.prototype.slice.call(document.querySelectorAll(selector)).forEach(handler);
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
})();
