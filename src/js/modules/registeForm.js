class Register {
    constructor() {
        this.usernameInput = $("#username");
        this.passwordInput = $("#password");
        this.registerBtn = $("#register");
        this.register();
    }
    register() {
        this.registerBtn.on("click", () => {
            let username = this.usernameInput.val();
            let password = this.passwordInput.val();
            $.post("http://localhost/api/v1/register.php", { username, password }, (data) => {
                if (data.res_code === 1) {
                    alert("注册成功,点击确定去登陆")
                    location.href = "/html/login.html"
                }
            }, "json")
        })
    }


}

new Register();