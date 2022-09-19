const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'e-commerce',
    password: 'ffb3278@',
    port: 5432,
})

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// async/await - check out a client
;(async () => {
  const client = await pool.connect()
  try {
    const res = await client.query('SELECT * FROM adress')
    console.log(res)
  } catch (err) {
    console.log(err.stack)
  } finally {
    client.release()
  }
})()