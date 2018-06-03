(function() {

  $(document).ready(function(event) {
    pWarn();
    setAnchors();
    setGitalk();
    logoTogglesSidebarOnMobile();
    addBtnClassToOrphanP();
  });

  // Automatically add btn class to link that are alone (meaning transform to buttons)
  function addBtnClassToOrphanP() {
    if ($('.markdown-section').length > 0) {
      $('.markdown-section p').each(function(el, obj) {
        if ($(obj).clone().find('a').remove().end().html().trim().length == 0) {
          $(obj).find('a').addClass('btn-stylized').append('<i class="material-icons">forward</i>')
          $(obj).addClass('centerize')
        }
      });
    }
  }

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
  function logoTogglesSidebarOnMobile() {
    $('.burger-header').click(function() {
      $('.sidebar').toggleClass('open')
    })
  }
})();
