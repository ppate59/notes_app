import { client, q } from '../config/db'

const createQuery = (title,description) => client.query(
  q.Create(
    q.Collection('notes'),
    {
      data: {
        title: title,
        description: description
      },
    },
  )
)
.then(ret => ret)
.catch(err => console.warn(err))


export default createQuery