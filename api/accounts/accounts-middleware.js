const db = require('../../data/db-config')
const yup = require('yup')
const Account = require('./accounts-model')

const accountSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .trim()
      .min(3, "name of account must be between 3 and 100")
      .max(100, "name of account must be between 3 and 100")
      .required("name and budget are required"),
    budget: yup
      .number()
      .typeError("Budget must be a number")
      .positive("budget of account is too large or too small")
      .max(1000000, "budget of account is too large or too small")
      .required("name and budget are required")
  });

exports.checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  try {
    await accountSchema.validate(req.body)
    next()
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message })
    }
    next(error)
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { name } = req.body

  try {
    const existingAccount = await db('accounts').where('name', name.trim()).first()
    if (existingAccount) {
      return res.status(400).json({ message: 'that name is taken' })
    }
    next()
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params

  try {
    const account = await Account.getById(id)
    if (!account) {
      return res.status(404).json({ message: 'account not found' })
    }
    req.account = account
    next()
  } catch (err) {
    next(err)
  }
}
