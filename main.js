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
    showMainPage()
    displayEmail()
  } else {
    // logged out
    showLoginPage()
  }
})

$('.login-page form').submit(doLogin)
$('.main-page form').submit(doAddTodo)
$('.register').click(doRegister)
$('.logout').click(doLogout)

function showLoginPage () {
  $('.login-page').removeClass('hidden')
  $('.main-page').addClass('hidden')
}

function showMainPage () {
  $('.login-page').addClass('hidden')
  $('.main-page').removeClass('hidden')
}

function displayEmail () {
  var email = firebase.auth().currentUser.email
  $('.main-page h1').text(`Welcome ${email}`)
}

function doLogin (e) {
  var email = $('input[type="email"]').val()
  var password = $('input[type="password"]').val()

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(clearLoginForm)
    .catch(handleLoginErrors)

  e.preventDefault()
}

function doRegister (e) {
  var email = $('input[type="email"]').val()
  var password = $('input[type="password"]').val()

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(clearLoginForm)
    .catch(handleLoginErrors)

  e.preventDefault()
}

function doLogout () {
  firebase.auth().signOut()
}

function doAddTodo (e) {
  var task = $('.main-page input[type="text"]').val()
  var uid = firebase.auth().currentUser.uid
  $.post(
    `https://auth-proj-a6516.firebaseio.com/${uid}.json`,
    JSON.stringify({ task: task })
  ).then(res => console.log(res.name))

  e.preventDefault()
}

function clearLoginForm () {
  $('form').trigger('reset')
}

function handleLoginErrors (err) {
  alert(err.message)
}
