const title = 'My top 10 Movies'
export const indexPage = (req, res, next) => {
  res.render('index') //, {no_header: false})
}

export const aboutPage = (req, res, next) => {
  res.render('about')
}

export const contactPage = (req, res, next) => {
  res.render('contact')
}

export const signInPage = (req, res, next) => {
  res.render('signin')
}

export const signUpPage = (req, res, next) => {
  res.render('signup')
}