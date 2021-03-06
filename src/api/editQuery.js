import { client, q } from '../config/db'

const editQuery = (noteId, newTitle, newDescription) => client.query(
  q.Update(
    q.Ref(q.Collection('notes'), noteId),
    { data: { 
      title: newTitle,
      description: newDescription
    } },
  )
)
.then((ret) => console.log(ret))
.catch(err => console.warn(err))


export default editQuery