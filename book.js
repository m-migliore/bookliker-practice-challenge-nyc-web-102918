class Book {
  constructor(bookObj) {
    this.id = bookObj.id
    this.title = bookObj.title
    this.description = bookObj.description
    this.img_url = bookObj.img_url
    this.users = bookObj.users

    Book.all.push(this)
  }

  static find(id) {
    return this.all.find(book => book.id === id)
  }

  // static findUsers(id) {
  //   const book = Book.find(id)
  //   return book.users.map(user => user)
  // }

  renderUsers() {
    return this.users.map(user => {
       return `<li data-userId="${user.id}">${user.username}</li>`
    }).join("")
  }

  renderShownBook(id) {
    const userIds = this.users.map(user => user.id)
    let btnText = userIds.includes(id) ? "Unlike" : "Like"

    return `
      <h2 id="book-title">${this.title}</h2>
      <img src="${this.img_url}" alt="${this.title}" id="book-image">
      <p id="book-desc">${this.description}</p>
      <ul id="liked-list">${this.renderUsers()}</ul>
      <button type="button" data-id="${this.id}" data-action="like">${btnText}</button>
    `
  }


}

Book.all = []
