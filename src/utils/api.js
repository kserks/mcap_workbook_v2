import objToUrl from './obj-to-url.js'

const baseUrl = 'http://atlant.mcacademy.ru/reindexer/api/v1/db'


export default {
  courses: ()=>{
      return `${baseUrl}/mcap_learn/query?q=select%20%2a%20from%20courses`
  },
  subjects: course=>{
    return  `${baseUrl}/mcap_learn/query?q=select%20%2a%20from%20subjects%20where%20course%3D%22${course}%22`
  },

  workbooks: (subject, player)=>{
    return  `${baseUrl}/mcap_learn/query?q=select%20%2a%20from%20workbooks%20where%20subject%3D%22${subject}%22%20and%20player%3D%22${player}%22`
  },
  updateNote: (id, obj)=>{
    let data = objToUrl(obj)

    return `${baseUrl}/mcap_learn/query?q=update%20workbooks%20set${data}%20where%20id%3D%22${id}%22`
  },
  addNote: `${baseUrl}/mcap_learn/namespaces/workbooks/items`,
  put: `http://atlant.mcacademy.ru/reindexer/api/put/db/mcap_learn/namespaces/workbooks/items`
  /*
  copyNoteURL: linkout=>{
    return `${baseUrl}query?q=select%20%2a%20from%20workbooks%20where%20linkout%3D%22${linkout}%22`
  },
  updateParam: (id, obj)=>{
    return `${baseUrl}query?q=update%20workbooks%20set${objToUrl(obj)}%20where%20id%3D%22${id}%22`
  },
  maxUrl: player=>{
    return `${baseUrl}query?q=select%20max%28index%29%20from%20workbooks%20where%20player%3D%22${player}%22`
  },
  deleteItem: id=>{
    return `${baseUrl}query?q=DELETE%20FROM%20workbooks%20where%20id%3D%22${id}%22`
  },
  noteUrlByLinkOut: linkout=>{
    return `${baseUrl}query?q=select%20%2a%20from%20workbooks%20where%20linkout%3D%22${linkout}%22`
  }*/
}
