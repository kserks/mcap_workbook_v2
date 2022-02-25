export default function (body){
  return new Promise((resolve, reject)=>{
        try {
            window.mcefQuery({
              request: body,
              persistent: true,
              onSuccess: response=>resolve(response)
            })

        } 
        catch (err) {
            reject(err);
        }

  })
}