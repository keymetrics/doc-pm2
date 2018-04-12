const gitalk = new Gitalk({
    clientID: '918c405abac62eacf227',
    clientSecret: '7c102fd9965dbe94ce2fb6006ccadcac8f2b9d44',
    repo: 'doc-pm2Ò',
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

