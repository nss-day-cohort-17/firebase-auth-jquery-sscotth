$('form').submit((e) => {
  var email = $('input[type="email"]').val()
  $('.main-page h1').text(`Welcome ${email}`)
  $('.login-page').addClass('hidden')
  $('.main-page').removeClass('hidden')
  e.preventDefault()
})
