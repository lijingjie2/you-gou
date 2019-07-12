// // header模块的js
// // header模块依赖jquery模块,jquery也是遵循AMD规范
// define(['jquery'], () => {
//     class loginForm {
//       constructor () {
//         // 每个页面都留一个空的header标签负责加载头部
//         this.container = $('footer')
//         this.init()
//       }
  
//       init () {
//         // load头部
//         this.container.load('/html/modules/loginForm.html')
//       }
//     }
    
//     return new loginForm()
//   })
function Login() {
    this.usernameInput = $("#username");
    this.passwordInput = $("#password");
    // this.sevenDays = $("#sevenDays");
    this.login = $("#login");
    this.sub();

}

$.extend(Login.prototype, {
    sub() {
        this.login.on("click", () => {
            let username = this.usernameInput.val();
            let password = this.passwordInput.val();
            $.post("http://localhost/api/v1/login.php", { username, password }, (data) => {
                console.log(data);
                if (data.res_code === 1) {
                    alert('登录成功,即将跳回之前页面')

                    this.cookie({ username, password });
                    history.back();
                } else {
                    alert("用户名或密码错误")
                }
            }, "json");
        })
    },
    cookie({ username, password }) {
        if (this.sevenDays[0].checked) {
            let date = new Date();
            date.setDate(date.getDate() + 7);
            document.cookie = "username=" + encodeURIComponent(username) + ";expires=" + date + ";path=/";
            document.cookie = "password=" + encodeURIComponent(password) + ";expires=" + date + ";path=/";


        } else {
            document.cookie = "username=" + encodeURIComponent(username) + ";path=/";
            document.cookie = "password=" + encodeURIComponent(password) + ";path=/";
        }

    }
})


new Login();