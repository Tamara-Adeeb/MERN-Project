// exports.getPrivateData =(request,response,next) => {
//     response.status(200).json({
//         sucess: true,
//         data:"you got access to the private data in this route",
//     })
// }

module.exports.getPrivateData =(request,response,next) => {
    response.status(200).json({
        sucess: true,
        data:"you got access to the private data in this route",
    })
}