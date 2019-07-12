// 首先在ul里写一个静态的li调样式
// 把li的内容抽离出来放到一个script标签里
// 然后加上 {{each list item}} 
// 把li里面的数据改成接口返回的那些对应字段名，比如：<h3>{{item.title}}</h3>
// template模块的配置
// 接口取到数据以后调用template方法，把list数据传递进去，得到根据数据渲染的html字符串
// 最后把这个渲染完成的字符串放到ul里

require(['./require.config'], () => {
  require(['template', 'url', 'header', 'nav', 'footer'], (template, url) => {
    // list 页面功能逻辑
    class List {
      constructor () {
        this.container = $('#productList')
        this.getData().then((list) => {
          // 首先then里面接收了resolve传递过来的list数据，紧接着继续传递给renderList
          this.renderList(list)

        })
      }

      getData () {
        // 请求后端接口拿到列表数据
        return new Promise(resolve => {
          $.get(url.rapBaseUrl + '/shop/list', resp => {
            if (resp.code === 200) {
              // 传递实参，把从接口取到的数据传递给 then
              resolve(resp.body.list)
            }
            
          })
        })
      }

      renderList (list) {
        // 第二个参数 {list: list} 这个对象里的key指的是template里面需要的变量名，value指的是从接口获取的值
        // let str = template('list-template', { list: list })
        let str = template('list-template', { list })
        this.container.html(str)
      }

    }
    new List()
   
  })
})