export default function (){
  return new Promise((resolve, reject)=>{
        try {
            window.mcefQuery({
              request: "info",
              persistent: true,
              onSuccess: response=>{
                let name = JSON.parse(response).name

                resolve(name)
              }
            })

        } 
        catch (err) {
            resolve('mcap_serg')
        }

  })
}