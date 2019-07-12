// header模块的js
// header模块依赖jquery模块,jquery也是遵循AMD规范
define(['jquery'], () => {
    class Footer {
      constructor () {
        // 每个页面都留一个空的header标签负责加载头部
        this.container = $('footer')
        this.init()
      }
  
      init () {
        // load头部
        this.container.load('/html/modules/footer.html')
      }
    }
    
    return new Footer()
  })