// header模块的js
// header模块依赖jquery模块,jquery也是遵循AMD规范
define(['jquery'], () => {
    class Nav {
      constructor () {
        // 每个页面都留一个空的header标签负责加载头部
        this.container = $('nav')
        this.init().then(() => {
          this.search();
        })
      }
  
      init () {
        // load头部
        return new Promise(resolve => {
        this.container.load('/html/modules/nav.html',resolve)
      })
      }
      search () {
        $('#search').on('keyup', function () {
          let inputValue = $(this).val()
          $.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${inputValue}&cb=?`, resp => {
            console.log(resp)
          })
        })
      }
    }
    
    
    return new Nav()
  })