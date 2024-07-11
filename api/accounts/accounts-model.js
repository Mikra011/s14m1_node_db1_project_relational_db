const db = require('../../data/db-config')

async function getAll() {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({ id }).first()
}

const create = account => {
  // DO YOUR MAGIC
  return db('accounts').insert(account).then(ids => getById(ids[0]))
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db('accounts').where({ id }).update(account).then(() => getById(id))
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({ id }).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
