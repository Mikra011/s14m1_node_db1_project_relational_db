const db = require('../../data/db-config')
const Account = require('./accounts-model')

exports.checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body

  if (name === undefined || budget === undefined) {
    return res.status(400).json({ message: 'name and budget are required' })
  }

  if (typeof name != 'string'
    || name.trim().length < 3
    || name.trim().length > 100) {
    return res.status(400).json({ message: 'name of account must be between 3 and 100' })
  }

  if (typeof budget !== 'number' || isNaN(budget)) {
    return res.status(400).json({ message: 'budget of account must be a number' })
  }

  if (budget < 0 || budget > 1000000) {
    return res.status(400).json({ message: 'budget of account is too large or too small' })
  }

  next()
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
