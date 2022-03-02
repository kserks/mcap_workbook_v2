import objToUrl from './obj-to-url.js'

const baseUrl = 'http://app.mcap.fun/reindexer/api/v1/db'


export default {
  courses: ()=>{
      return `${baseUrl}/mcap_learn/query?q=select%20%2a%20from%20courses`
  },
  subjects: course=>{
    return  `${baseUrl}/mcap_learn/query?q=select%20%2a%20from%20subjects%20where%20course%3D%27${course}%27`
  },

  workbooks: (subject, player)=>{
    return  `${baseUrl}/mcap_learn/query?q=select%20%2a%20from%20workbooks%20where%20subject%3D%27${subject}%27%20and%20player%3D%27${player}%27%20and%20hide%3D%27false%27`
  },
  updateNote: (id, obj)=>{
    let data = objToUrl(obj)

    return `${baseUrl}/mcap_learn/query?q=update%20workbooks%20set${data}%20where%20id%3D%27${id}%27`
  },
  addNote: `${baseUrl}/mcap_learn/namespaces/workbooks/items`,
  put: `http://app.mcap.fun/reindexer/api/put/db/mcap_learn/namespaces/workbooks/items`,
  linkout: (linkout)=>{
    return `${baseUrl}/mcap_learn/query?q=select%20%2a%20from%20workbooks%20where%20linkout%3D%27${linkout}%27`
  },
  maxNotes: player=>{
    return `${baseUrl}/mcap_learn/query?q=select%20max%28index%29%20from%20workbooks%20where%20player%3D%27${player}%27`
  },
  deleteNote: id=>{
    return `${baseUrl}/mcap_learn/query?q=DELETE%20FROM%20workbooks%20where%20id%3D%27${id}%27`
  }
}
