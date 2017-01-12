firebase.initializeApp({
  apiKey: 'AIzaSyDfKMbHscf_4oQ5oL0EGh0u6zP9Gunp9l0',
  authDomain: 'c17-jquery-auth.firebaseapp.com',
  databaseURL: 'https://c17-jquery-auth.firebaseio.com',
  storageBucket: 'c17-jquery-auth.appspot.com',
  messagingSenderId: '936314115006',
})

firebase.auth().onAuthStateChanged(() => {
  if (firebase.auth().currentUser) {
    // logged in
    var email = firebase.auth().currentUser.email

    $('.login-page').addClass('hidden')
    $('.main-page').removeClass('hidden')
    $('.main-page h1').text(`Welcome ${email}`)
  } else {
    // logged out
    $('.login-page').removeClass('hidden')
    $('.main-page').addClass('hidden')
  }
})

$('.login-page form').submit((e) => {
  var email = $('input[type="email"]').val()
  var password = $('input[type="password"]').val()

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => $('form')[0].reset())

  e.preventDefault()
})

$('.logout').click(() => firebase.auth().signOut())

$('.main-page form').submit((e) => {
  var task = $('.main-page input[type="text"]').val()
  var uid = firebase.auth().currentUser.uid
  $.post(
    `https://auth-proj-a6516.firebaseio.com/${uid}.json`,
    JSON.stringify({ task: task })
  ).then(res => console.log(res.name))

  e.preventDefault()
})
