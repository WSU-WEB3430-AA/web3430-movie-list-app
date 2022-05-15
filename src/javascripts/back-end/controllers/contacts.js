import { Contact } from "../models/contacts"

// GET /api/contacts
export const allContactsAPI = (req, res, next) => {
  Contact.find()
    .exec()
    .then((contacts) => {
      res.write(JSON.stringify(contacts))
      res.end()
    })
    .catch((err) => {
      res.json({ success: false, message: "Query failed" })
      res.end()
    })
}

// POST /api/contacts
export const newContactAPI = (req, res, next) => {
  let contact = new Contact(req.body)
  contact.closed = false
  contact.createdAt = new Date()
  contact.updatedAt = new Date()
  contact.save((err) => {
    if (err) {
      res.json({ success: false, message: "Unable to save" })
    } else {
      res.status(200)
      res.end()
    }
  })
}

// PUT /api/contacts/:cid/close
export const closeContactAPI = (req, res, next) => {
  Contact.findOne({ _id: req.params.cid })
    .exec()
    .then((contact) => {
      contact.closed = true
      contact.updatedAt = new Date()
      contact.save((err) => {
        if (err) {
          res.json({ success: false, message: "Unable to close contact" })
          res.end()
        } else {
          res.end()
        }
      })
    })
    .catch((err) => {
      res.json({ success: false, message: "Unable to find contact" })
      res.end()
    })
}
