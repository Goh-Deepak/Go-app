const catchError = require("../utils/catchError");
const jwtToken = require('jsonwebtoken');
const {executeQuery} = require('../conn/conn')

exports.findRole = catchError(async(req,res,next) =>{
    const {path} = req.query
 
        const cookie = req.headers.cookie
        if (!cookie) {
            return res.status(206).json({ status: false, message: "cookie not found" })
        }
     
          const  token = cookie.split("=")[1]
          if (!token) {
            return res.status(400).json({message: "No Token Found"})
        } else {
            return jwtToken.verify(token, process.env.jwt_secret, async (err, user) => {
                if (err) {
                    return res.status(400).json({message: "InValid Token"});
                } else {
                    switch (path) {
                        case "/media":
                          permission_id = 21;
                          break;
                        case "/vanders":
                          permission_id = 23;
                          break;
                        case "/campaings":
                          permission_id = 7;
                          break;
                        case "/incart":
                          permission_id = 7;
                          break;
                        case "/webleads":
                            permission_id = 20;
                          break;
                        case "/accept":
                          permission_id = 17;
                          break;
                        case "/reject":
                          permission_id = 17;
                          break;
                        case "/permission":
                          permission_id = 6;
                          break;
                        case "/staffPermission":
                          permission_id = 6;
                          break;
                          default:
                         return res.status(200).json({status:false,message:"Login First"})
                      }
                      const role_id = user.id.role
                      const userid = user.id.userid
  
                      // const data = await executeQuery("Select can_view, can_view_own,can_edit,can_create, can_delete From tblrolepermissions Where roleid="+role_id+" && permissionid="+permission_id+"","gohoardi_crmapp",next)
                      const sql = "Select can_view, can_view_own,can_edit,can_create, can_delete From tbl_staff_permissions Where role_id="+role_id+" && permission_id="+permission_id+"&& staff_id="+userid+""
                  
                      const data = await executeQuery(sql,"gohoardi_crmapp",next)
                  
                        if(data[0].can_view_own == 0){
                          return res.status(206).json({message:"You are not authorized for this page"})
                        }
                            req.permissions = data
                            req.userid = userid
                            next()
                    
                }
            })
        }
  
})

