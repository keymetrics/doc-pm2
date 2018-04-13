// Mostly taken from : https://webdesign.tutsplus.com/tutorials/copy-to-clipboard-made-easy-with-clipboardjs--cms-25086
document.addEventListener('DOMContentLoaded', function() {

  // Get the elements.
  // - the 'pre' element.
  // - the 'div' with the 'paste-content' id.

  var pre = document.getElementsByTagName('pre');
  var pasteContent = document.getElementById('paste-content');

  // Add a copy button in the 'pre' element.
  // which only has the className of 'language-'.


  for (var i = 2; i < pre.length; i++) { // var i = 1, because the first pre element were not code snippet
    var isLanguage = pre[i].children[0].className.indexOf('language-');

    if ( isLanguage === 1 ) {
      var button           = document.createElement('button');
          button.className = 'docsify-copy-code-button';
          button.textContent = 'Copy';

          pre[i].appendChild(button);

      var codeLang = pre[i].className.match(/[^-]+$/)[0]; //find class in pre element
          pre[i].setAttribute("data-lang", codeLang);

    }
  };

  // Run Clipboard

  var copyCode = new ClipboardJS('.docsify-copy-code-button', {
    target: function(trigger) {
      return trigger.previousElementSibling;
    }
  });

  // On success:
  // - Change the "Copy" text to "Copied".
  // - Swap it to "Copy" in 2s.

  copyCode.on('success', function(event) {
    event.clearSelection();
    event.trigger.textContent = 'Copied';
    window.setTimeout(function() {
      event.trigger.textContent = 'Copy';
    }, 2000);
  });

  // On error (Safari):
  // - Change the  "Press Ctrl+C to copy"
  // - Swap it to "Copy" in 2s.

  copyCode.on('error', function(event) {
    event.trigger.textContent = 'Press "Ctrl + C" to copy';
    window.setTimeout(function() {
      event.trigger.textContent = 'Copy';
    }, 5000);
  });


});
