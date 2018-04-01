const gitalk = new Gitalk({
    clientID: '8f7108daaf3114f623ff',
    clientSecret: '0d5c25003767ab1401990a3caabaf38e70f11d6e',
    repo: 'pm2-docsify-proto',
    owner: 'rmonnier',
    admin: ['rmonnier'],
    id: md5(window.location.pathname),
    // facebook-like distraction free mode
    distractionFreeMode: false
});

var wrapper = document.createElement('div');
wrapper.className = "markdown-section";
wrapper.appendChild(document.createElement('hr'));
var container = document.createElement('div');
container.id = 'gittalk';
wrapper.appendChild(container);
document.querySelector('section.content').appendChild(wrapper);
$(document).ready(function() {
  gitalk.render('gittalk');
});

