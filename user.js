class User {
  constructor(userObj) {
    this.id  = userObj.id
    this.username = userObj.username

    User.all.push(this)
  }

  static find(id) {
    return this.all.find(user => user.id === id)
  }

  renderUser() {
    return `<li data-userId="${this.id}">${this.username}</li>`
  }
}

User.all = []
