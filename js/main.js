(function() {

  $(document).ready(function(event) {
    setAnchors();
    setGitalk();
    logoTogglesSidebarOnMobile();
  });

  function setAnchors() {
    var anchorForId = function (id) {
      var anchor = document.createElement("a");
      anchor.className = "header-link";
      anchor.href      = "#" + id;
      anchor.innerHTML = "<i class=\"material-icons\">link</i>";
      return anchor;
    };

    var linkifyAnchors = function (level, containingElement) {
      var headers = containingElement.getElementsByTagName("h" + level);
      for (var h = 0; h < headers.length; h++) {
        var header = headers[h];

        $(header).attr('onClick','location.hash="' + header.id + '"');
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

      var urlHash = window.location.href.split("#")[1];
      if (urlHash &&  $('#' + urlHash).length )
        $('.content-container').animate({
          scrollTop: $('#' + urlHash).offset().top - 80
        }, 1000);
    };
  }

  function setGitalk() {
    var gitalk = new Gitalk({
      clientID: '918c405abac62eacf227',
      clientSecret: '7c102fd9965dbe94ce2fb6006ccadcac8f2b9d44',
      repo: 'doc-pm2',
      owner: 'keymetrics',
      admin: ['robin-monnier', 'vmarchaud', 'Unitech'],
      language: document.documentElement.lang === 'zh' ? 'zh-CN' : 'en',
      id: md5(window.location.pathname),
      // facebook-like distraction free mode
      distractionFreeMode: false
    })

    $(document).ready(function() {
      if (document.querySelector('#gitalk')) {
        gitalk.render('gitalk');
      }
    });
  }

  function logoTogglesSidebarOnMobile() {
    $('.burger-header').click(function() {
      $('.sidebar').toggleClass('open')
    })
  }
})();
