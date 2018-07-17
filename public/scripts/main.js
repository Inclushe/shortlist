document.querySelector('#URLForm').addEventListener('submit', (e) => {
  e.preventDefault()
  var url = e.target.querySelector('#url').value
  e.target.querySelector('#submit').setAttribute('disabled', '')
  document.body.querySelector('#outputMessageSuccess').classList.add('hidden')
  document.body.querySelector('#outputMessageFailure').classList.add('hidden')
  window.fetch('/url/new', {
    method: 'POST',
    body: JSON.stringify({url: url}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
      if (json.errors.length === 0) {
        var mnemonicURL = window.location.origin + '/' + json.mnemonicHash
        document.body.querySelector('#unshortenedURL').textContent = url
        document.body.querySelector('#outputHash').textContent = json.mnemonicHash
        document.body.querySelector('#outputURL').innerHTML = `<a href=${mnemonicURL}>${mnemonicURL}</a>`
        document.body.querySelector('#outputMessageSuccess').classList.remove('hidden')
      } else {
        document.body.querySelector('#outputError').textContent = json.errors[0].msg
        document.body.querySelector('#outputMessageFailure').classList.remove('hidden')
      }
      e.target.querySelector('#submit').removeAttribute('disabled')
    })
    .catch((err) => {
      console.error(err)
      document.body.querySelector('#outputError').textContent = err.message
      document.body.querySelector('#outputMessageFailure').classList.remove('hidden')
      e.target.querySelector('#submit').removeAttribute('disabled')
    })
})
