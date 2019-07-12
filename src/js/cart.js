require(['./require.config'], () => {
    require(['template', 'header', 'footer'], (template) => {
      class Cart {
        constructor () {
          this.container = $('#cart-tbody')
          this.totalPrice = $('.totalPrice')
          this.allCheck = $('.allCheck')
          this.goodCount = $('.good-count')
          // this.countValue = $('.countValue'.value)
          this.init()
          this.calcMoney()
          this.calcNum()
          this.checksChange()
          this.allCheckChange()
        }
  
        init () {
          // 取数据，渲染模板，显示页面
          this.cart = JSON.parse(localStorage.getItem('cart'))
          // TODO: 判断是否为空如果为空的话就不渲染模板了，而是给用户显示为空的界面
  
          // 有数据的情况
          let str = template('template-cart', {cart: this.cart})
          this.container.html(str)
  
          // 一上来的时候默认就要判断是否全选
          let isAllCheck = this.cart.every(shop => {
            return shop.check === true
          })
          this.allCheck.prop('checked', isAllCheck)
        }
  
        calcMoney () {
          // 负责计算总价
          // 每次都重新计算，所以要清零
          this.money = 0
          // 直接根据this.cart数据来计算
          this.money = this.cart.reduce((money, shop) => {
            if (shop.check) {
              money += shop.num * shop.price
            }
            return money
          }, 0)
          // 显示在合计
          this.totalPrice.html(this.money)
        }
        
        calcNum () {
          this.num = 0
          this.num = this.cart.reduce((num, shop) => {
            if(shop.check){
              num += shop.num
            }
            return num
          }, 0)
          this.goodCount.html(this.num)
        }

        checksChange () {
          let _this = this
          // 给container事件委托，来触发单选的状态改变
          this.container.on('change', '.check', function () {
            // 从this出发，找到祖先级tr自定义属性上找到id
            const id = $(this).parents('tr').attr('data-id')
            console.log(id)
            // 根据id值取改变数据
            _this.cart = _this.cart.map(shop => {
              if (shop.id === id) {
                // $(this).prop('checked') 得到的是选框的状态，选中就为true，没选中就是false
                shop.check = $(this).prop('checked')
              }
              return shop
            })
            // 把修改过后的cart数据重新存localstorage
            localStorage.setItem('cart', JSON.stringify(_this.cart))
            // 调用一次计算总价的方法
            _this.calcMoney()
            _this.calcNum()
            // 判断是否全选
            // 判断_this.cart是否每一条数据都为选中状态
            let isAllCheck = _this.cart.every(shop => {
              return shop.check === true
            })
            _this.allCheck.prop('checked', isAllCheck)
          })
        }
  
        allCheckChange () {
          let _this = this
          // 全选按钮切换
          this.allCheck.on('change', function () {
            // 获取全选状态
            let isCheck = $(this).prop('checked')
            // 数据和所有单选都应该按照这个isCheck来修改
            _this.cart = _this.cart.map(shop => {
              shop.check = isCheck
              return shop
            })
            // 把每一个单选都要切换checked，但是jquery内部已经做好了循环了，所以只需要写下面这一句
            $('.check').prop('checked', isCheck)
            // 重新计算总价
            _this.calcMoney()
            _this.calcNum()
  
          })
        }
      }
  
      new Cart()
    })
  })