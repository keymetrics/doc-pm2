module.exports = {
  template: './docs/index-ssr.html',
  maxAge: 60 * 60 * 1000,
  config: {
    //repo:'https://github.com/Unitech/pm2/',
    basePath: '/docs',
    alias: {
      '/runtime/.*/_sidebar.md': '/runtime/_sidebar.md',
      '/monitoring/.*/_sidebar.md': '/monitoring/_sidebar.md',
      '/enterprise/.*/_sidebar.md': '/enterprise/_sidebar.md'
    },
    auto2top: true,
    coverpage: false,
    executeScript: true,
    loadSidebar: '_sidebar.md',
    loadNavbar: false,
    mergeNavbar: false,
    //maxLevel: 4,
    subMaxLevel: 1,
    name: '',
    search:false,
    plugins:[
      //DocsifyCopyCodePlugin.init()
    ]
  }
}
