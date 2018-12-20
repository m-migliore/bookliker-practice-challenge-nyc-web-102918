document.addEventListener("DOMContentLoaded", function() {
  const listPanel = document.getElementById("list-panel")
  const list = document.getElementById("list")
  const showPanel = document.getElementById("show-panel")

  let currentUser = {id: 1, username: "pouros"}

  function fetchBooks() {
    fetch("http://localhost:3000/books")
    .then(r => r.json())
    .then(data => {
      data.forEach(book => {
        new Book(book)
        list.innerHTML += `<li data-id="${book.id}">${book.title}</li>`
      })
    })
  }

  listPanel.addEventListener("click", e => {
    if (e.target.tagName === "LI") {
      const bookId = parseInt(e.target.dataset.id)
      const foundBook = Book.find(bookId)
      showPanel.innerHTML = foundBook.renderShownBook(currentUser.id)
    }
  })

  showPanel.addEventListener("click", e => {
    if (e.target.dataset.action === "like") {
      let likedList = document.getElementById("liked-list")
      let likedBookId = parseInt(e.target.dataset.id)
      let likedBook = Book.find(likedBookId)
      let likedUserIds = likedBook.users.map(user => user.id)

      if (!likedUserIds.includes(currentUser.id)) {
        likedBook.users.push(currentUser)
        const updatedUsers = likedBook.users
        updateBookUsers(e.target.dataset.id, updatedUsers)
        .then(data => {
          console.log("after like", data.users);
          const newLikedUser = data.users[data.users.length - 1]
          likedList.innerHTML += renderUser(newLikedUser)
          const likeBtn = showPanel.querySelector('button')
          likeBtn.innerText = "Unlike"
        })
      } else {
        const removedUserList = likedBook.users.filter(user => user.id !== currentUser.id)
        updateBookUsers(e.target.dataset.id, removedUserList)
        .then(data => {
          console.log("after unlike", data.users);
          const updatedUsers = data.users
          likedList.innerHTML = ""
          updatedUsers.forEach(user => {
            likedList.innerHTML += renderUser(user)
          })
          const likeBtn = showPanel.querySelector('button')
          likeBtn.innerText = "Like"
          let foundBookIndex = Book.all.findIndex(book => book.id === data.id)
          Book.all[foundBookIndex] = data
        })
      }
    }
  })

  function renderUser(user) {
    return `<li data-userId="${user.id}">${user.username}</li>`
  }

  function updateBookUsers(bookId, usersArray) {
    return fetch(`http://localhost:3000/books/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        users: usersArray
      })
    })
    .then(r => r.json())
  }


  fetchBooks()
});
