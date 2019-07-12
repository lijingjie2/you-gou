require(["require.config"], () => {
  require(["template", "url","swiper","header","nav","footer"], (template, url, Swiper) => {
    
    
    
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
    class List2 {
      constructor () {
        this.container = $('#todayProduct')
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
        let str = template('list2-template', { list })
        this.container.html(str)
      }

    }


    class Banner {
      constructor() {
          this.container = $(".bannar")
          this.banner();
          // this.load().then(() => {
          //     console.log("banner加载完毕")
          //     this.shop();
          //     this.banner();
          // });
      }

    banner() {
      // var mySwiper = new Swiper ('.swiper-container', {
      //   direction: 'vertical', // 垂直切换选项
      //   loop: true, // 循环模式选项
        
      //   // 如果需要分页器
      //   pagination: {
      //   el: '.swiper-pagination',
      //   },
        
      //   // 如果需要前进后退按钮
      //   navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      //   },
        
      //   // 如果需要滚动条
      //   scrollbar: {
      //   el: '.swiper-scrollbar',
      //   },
    
      var mySwiper = new Swiper('.swiper-container', {
          direction: 'horizontal',
          loop: true,

          // 如果需要分页器
          scrollbar: '.swiper-scrollbar',
          scrollbar: {
              el: '.swiper-scrollbar',
              Hide: false,
              draggable: true,
          },

          effect: 'cube',

          centeredSlides: true,
          pagination: {
              el: '.swiper-pagination',
              clickable: true,
          },

          autoplay: {
              disableOnInteraction: false,
          },


          // 如果需要前进后退按钮
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',

         // 如果需要滚动条


      })
  }
}










    class List3 {
      constructor () {
        this.container = $('.brandFashion1')
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
        let str = template('list3-template', { list })
        this.container.html(str)
      }

    }

    new List()
    new List2()
    new List3()
  return new Banner();
  })
})

