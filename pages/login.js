exports.LoginPage = class LoginPage{
    // Constructor
    constructor(page){
        this.page = page
        this.username_textbox = page.getByRole('textbox', { name: 'Username' })
        this.password_texbox = page.getByRole('textbox', { name: 'Password' })
        this.login_button = page.getByRole('button', { name: 'Login' })
        this.errorMessage = page.locator('[data-test="error"]')
    }
    
    // method
    async gotoLoginPage(){
        await this.page.goto('https://www.saucedemo.com/')
    }
    
    async login(username, password){
        await this.username_textbox.fill(username)
        await this.password_texbox.fill(password)
        await this.login_button.click()
    }
}

