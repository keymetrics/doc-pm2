var CopyPlugin = (function() {

  function bindClick(rootElement) {
    let $button = $(rootElement).find('.docsify-copy-code-button');
    let button = $button.get(0);
    
    $button.off('click');
    $button.on('click',onClick);

    function onClick(event) {
      button.innerHTML = 'Copied!'
      setTimeout(function() {
        button.innerHTML = 'Copy';
      }, 1000);

      var range = document.createRange();
      var codeBlock = rootElement.querySelector("code");
      range.selectNode(codeBlock);
      window.getSelection().addRange(range);

      try {
        // Now that we've selected the anchor text, execute the copy command
        var successful = document.execCommand("copy");
        if (successful) {
          button.classList.add("success");
          setTimeout(function() {
            button.classList.remove("success");
          }, 1000);
        }
      } catch (err) {
        button.classList.add("error");
        setTimeout(function() {
          button.classList.remove("error");
        }, 1000);
      }

      var selection = window.getSelection();
      if (typeof selection.removeRange === "function") {
        selection.removeRange(range);
      } else if (typeof selection.removeAllRanges === "function") {
        selection.removeAllRanges();
      }
    };
  }

  function init() {
    var codeBlocks = document.querySelectorAll("pre[v-pre]");
    codeBlocks.forEach((element, i, obj) => {
      if ($(element).find('.docsify-copy-code-button').length > 0){
        return bindClick(element);
      }
      var button = document.createElement("button");
      button.appendChild(document.createTextNode("Copy"));
      button.classList.add("docsify-copy-code-button");
      element.appendChild(button);
      bindClick(element);
    });
    
  }

  $(document).ready(function(){
    setTimeout(init, 1000);
  });

  return function(hook, vm) {
    hook.afterEach(function(html, next) {
      next(html);
    });
    hook.doneEach(function() {
      init();
    });
    hook.mounted(function() {
      init();
    });
  }
})();


$docsify.plugins.push(CopyPlugin);