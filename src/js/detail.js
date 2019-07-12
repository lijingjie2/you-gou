require(['./require.config'], () => {
  require(['template', 'url', 'header', 'nav', 'footer', 'zoom', 'fly'], (template, url) => {
    class Detail {
      constructor () {
        this.container = $('#shopImg')
        this.color = $('.color')
        // addTocart在这里调用的话就要用时间委托，then里调的话就可以不用了
        this.addToCart()
        this.getData().then(detail => {
          this.renderDetail(detail)
        })
      }

      getData () {
        // 取到id值，请求接口
        const id = window.location.search.slice(4)
        console.log(id)
        return new Promise(resolve => {
          $.get(`${url.rapBaseUrl}/shop/detail`, { id }, resp => {

            if (resp.code === 200) {
              const { detail } = resp.body

              // 由于rap2不能处理请求的时候携带的id，所以返回的数据里没有id
              // 所以咱们手动的给detail加上id字段
              // 只有使用rap2的时候需要，上线之后这行代码是不需要的
              detail.id = id
              // 存在this身上，这样的话别的方法（比如加购物车）直接获取当前商品信息
              this.detail = detail
              // detail = {
              //   ...detail,
              //   id
              // }
              resolve(detail)
            }
          })
        })
        
      }
      renderDetail (detail) {
        // 根据info渲染页面
        
        console.log(detail)
        // 第二个参数是template需要的数据，我在template里面写的字段名叫 data， 对应的值应是从后端获取到的 detail 对象
        let str = template('template-img', { data: detail })
        this.container.html(str)
        this.zoomImg()
      }

      zoomImg () {
        $('.zoom-img').elevateZoom({
          gallery: 'gal1', // ul父级盒子的id
          cursor: 'pointer',
          borderSize: '1',
          galleryActiceClass: 'active',
          borderColor: '#f2f2f2'
        })
      }

      addToCart () {
        let _this = this
        // 添加购物车按钮绑定事件（事件委托）
        $('.shopDes').on('click', '.addCart', function () {
          // 飞入购物车抛物线
          // 商品加入购物车
          const src = _this.detail.images[0]
          $(`<img src="${src}" style="width:50px;height:50px;border-radius:50%">`).fly({
            start: {
              left: $(this).offset().left,
              top: $(this).offset().top
            },
            end: {
              left: $('#shopCart').offset().left,
              top: $('#shopCart').offset().top,
              width: 0, //结束时高度
              height: 0
            },
            speed: 0.8,
            onEnd: function () {
              this.destroy()
              // 动画完成，购物车数量 +1
              let num = parseInt($('#shopCart span').html())
              $('#shopCart span').html(++num)
            }
          })

          
          let allCart = localStorage.getItem('cart')
          if (allCart) {
            // 说明购物车已经有数据了
            console.log(allCart)
            // 从localstorage取出来的是json字符串，所以转换一下
            allCart = JSON.parse(allCart)
            // 判断allCart里面是否存在当前商品
            const isExist = allCart.some(shop => {
              return shop.id === _this.detail.id
            })

            if (isExist) {
              // 说明当前商品已经加入过购物车了
              // 把这条商品num++就行了

              // 这种方式也能达到效果，但是不推荐（尽量不要直接修改原数组，而是返回一个新的数组）
              // allCart.forEach(shop => {
              //   if (shop.id === _this.detail.id) shop.num++
              // })

              allCart = allCart.map(shop => {
                if (shop.id === _this.detail.id) shop.num++
                // map方法每一次循环都要有一个返回值，这些返回值会构成一个新的数组，就是整个map的结果
                return shop
              })
            } else {
              // 购物车有数据，但是没有当前这一条
              // 把当前商品push进去
              allCart.push({
                ..._this.detail,
                num: 1
              })
            }
            // 修改完成之后重新存一次把之前的覆盖掉，不管if还是else都要重新存
            localStorage.setItem('cart', JSON.stringify(allCart))

          } else {
            // 购物车为空
            // 把当前数据构造出一个数组（length为1），默认加上num字段（一般为1，或者页面上的数量），存进去
            let arr = [
              {
                ..._this.detail,
                num: 1
              }
            ]
            // 把这个数组转成json字符串存
            localStorage.setItem('cart', JSON.stringify(arr))
          }
        })
      }
    }
    new Detail()
  })
})