import auth0 from 'auth0-js'

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_DOMAIN,
      clientID: process.env.REACT_APP_CLIENT_ID,
      redirectUri: process.env.REACT_APP_REDIRECT_URI + '/callback',
      audience: process.env.REACT_APP_AUDIENCE,
      responseType: 'token id_token',
      scope: 'openid email'
    })

    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.authFlag = 'isLoggedIn'
  }

  signIn() {
    this.auth0.authorize()
  }

  getIdToken() {
    return this.idToken
  }

  getEmail() {
    return this.userEmail
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if(err) return reject(err)
        if(!authResult || !authResult.idToken) {
          return reject(err)
        }
        this.setSession(authResult)
        resolve()
      })
    })
  }

  setSession(authResult) {
    this.idToken = authResult.idToken
    this.userEmail = authResult.idTokenPayload.email
    localStorage.setItem(this.authFlag, JSON.stringify(true))
  }

  signOut() {
    localStorage.setItem(this.authFlag, JSON.stringify(false))
    this.auth0.logout({
      returnTo: process.env.REACT_APP_REDIRECT_URI,
      clientID: process.env.REACT_APP_CLIENT_ID
    })
  }

  silentAuth() {
    if(this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if(err) {
            localStorage.removeItem(this.authFlag)
            return reject(err)
          } 
          this.setSession(authResult)
          resolve()
        })
      })
    }
  }

  isAuthenticated() {
    return JSON.parse(localStorage.getItem(this.authFlag))
  }
}

const auth = new Auth()
export default auth
