const router = require('express').Router()
const Account = require('./accounts-model');
const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.account);
})

router.post('/', checkAccountPayload, async(req, res, next) => {
  // DO YOUR MAGIC
  try {
    const { name, budget } = req.body
    const trimmedName = name.trim()
    const newAccount = await Account.create({ name: trimmedName, budget })
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
