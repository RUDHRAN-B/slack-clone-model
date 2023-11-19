const Person1SelectorBtn = document.querySelector('#Person1-selector')
const Person2SelectorBtn = document.querySelector('#Person2-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputBox = document.querySelector('.chat-input-box')
const chatInput = document.querySelector('.chat-input')
const refreshBtn = document.querySelector('.refresh-button')
const messages = JSON.parse(localStorage.getItem('messages')) || []
const createChatMessageElement = (message) => 
`
  <div class="message ${message.sender === 'Person1' ? 'bg1' : 'bg2'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`
window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}
let messageSender = 'Person1'
const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender}`
  chatInput.placeholder = `Type here, ${messageSender}...`

  if (name === 'Person1') {
    Person1SelectorBtn.classList.add('active-person')
    Person2SelectorBtn.classList.remove('active-person')
  }
  if (name === 'Person2') {
    Person2SelectorBtn.classList.add('active-person')
    Person1SelectorBtn.classList.remove('active-person')
  }
  chatInput.focus()
}
Person1SelectorBtn.onclick = () => updateMessageSender('Person1')
Person2SelectorBtn.onclick = () => updateMessageSender('Person2')
const sendMessage = (e) => {
  e.preventDefault()
  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp
  }
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))
  chatMessages.innerHTML += createChatMessageElement(message)
  chatInputBox.reset()
  chatMessages.scrollTop = chatMessages.scrollHeight
}
chatInputBox.addEventListener('submit', sendMessage)
refreshBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''
})
