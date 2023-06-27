const { executeQuery } = require("../conn/conn");
const catchError = require("../utils/catchError")
const bcrypt = require('bcryptjs');
const crypto =  require('crypto')
const {sendEmail} =  require('../middleware/sendEmail')
const sharp = require('sharp')
const ffmpeg  = require('fluent-ffmpeg');
const { genrateToken } = require("../middleware/token");


exports.createHelper = catchError(async(req, res, next) => {
  const permission = req.permissions;
  if(permission[0].can_create == 0 ){
    return res.status(206).json({message:"You are not authorized for this Action"}) 
  }else{
 const {edit, comapanyName} = req.body
 const {name,phone,address,email,password,city} = edit
 const createPassword = bcrypt.hashSync(password,8)

const data = await executeQuery ("INSERT INTO tblvendors_emp (name, phone, address, email, password, city, active, company) VALUES ('"+name+"',"+phone+",'"+address+"', '"+email+"', '"+createPassword+"','"+city+"', 1, '"+comapanyName+"')","gohoardi_crmapp" ,next)
if(data){
  const message = `Hi Mr.${name} here is your email=${email} id and Password=${password}. To login into GOH-APP please use this  email=${email}  and Password=${password} `
  // await sendEmail({
  //   email:email,
  //   subject: `GOH-APP Login Details`,
  //   message: message,
  // })
  return res.status(200).json({message:"Success"})
}
  }
  })

exports.getAllVendorEmp = catchError(async(req,res,next) =>{
  // const permission = req.permissions;
  // if(permission[0].can_view == 0 ){
  //   return res.status(206).json({message:"You are not authorized for this Action"}) 
  // }else{
    const {company} = req.body

    const squery = "SELECT id,caretedDate, sites,name, phone, address, email, city, company, active FROM tblvendors_emp WHERE company = '"+company+"'"

    const data = await executeQuery(squery,"gohoardi_crmapp" ,next)

    return res.status(200).json(data)
})



exports.createCampaign = catchError(async(req,res,next) =>{
const user =  req.id
const {name} = req.body
  const result = await executeQuery("INSERT into goh_campaign (user,campaign_name,created_by) VALUES ("+user+", '"+name+"', 'admin')","gohoardi_goh" ,next)
  if(result){
return res.send("Sucess")
}
})


exports.getCampaign = catchError(async(req,res,next) =>{
  const result = await executeQuery("SELECT campaign.id, campaign.campaign_name, campaign.created_by, campaign.created, staff.media_path_slug FROM  goh_campaign as campaign INNER JOIN gohoardi_crmapp.tblstaff as staff on campaign.user = staff.staffid  WHERE campaign.created_by='admin'","gohoardi_goh" ,next)
  if(result){
return res.send(result)
}
})


exports.vendorsList = catchError(async(req,res,next) =>{
  const result = await executeQuery("SELECT name  FROM  tblcompanies ","odoads_tblcompanies" ,next)
  if(result){
return res.send(result)
}
})


exports.createVendorData = catchError(async(req,res,next) =>{ 
const {vandor, posts, userid, password} = req.body;
const {name, contact_email, contact_phone,user} = posts

const data = await executeQuery("INSERT into goh_campaign_vendor (name, email, phone,users, vendors, userid, password) VALUES ('"+name+"','"+contact_email+"', "+contact_phone+", "+user+", '"+vandor+"','"+userid+"','"+password+"')","gohoardi_goh",next)
if(data){
  const result = await executeQuery("UPDATE tblcompanies SET contact_email='"+contact_email+"', contact_phone='"+contact_phone+"' WHERE name LIKE '%"+vandor+"' ","odoads_tblcompanies",next)
if(result){
 
  if(userid && password){
    const message = `hi ${vandor} this is your Genrated Id = ${userid} and Password = ${password}`
  await sendEmail({
    email:contact_email,
    subject:`GOH-Login Genrated ID and Password`,
    message: message,
  })
  }
}
  return res.status(200).json({message:"Success"})
  } 
})

exports.GetcreateVendorData = catchError(async(req,res,next) =>{
const data = await executeQuery("SELECT * FROM goh_campaign_vendor ","gohoardi_goh",next)
if(data){

  return res.status(200).json(data)
  }
})

exports.UpdateVendorData = catchError(async(req,res,next) =>{
  const {name, email, phone, user, vandor, userid, password} = req.body;
const data = await executeQuery("UPDATE goh_campaign_vendor SET name='"+name+"', email='"+email+"', phone="+phone+", user="+user+", vandor='"+vandor+"', userid='"+userid+"', password='"+password+"' ","gohoardi_goh",next)
if(data){
  return res.status(200).json({message:"Success"})
  }
})


exports.insertSite = catchError(async(req,res,next) =>{
  const {posts,vendorName } = req.body
  const { category_name, subcategory, location, illumination, city, size} = posts
  const data = await executeQuery("INSERT into goh_campaign_sites (vendors, category_name, subcategory, location, illumination, city, size) VALUES ('"+vendorName+"','"+category_name+"', '"+subcategory+"', '"+location+"', '"+illumination+"','"+city+"','"+size+"')","gohoardi_goh",next)
  if(data){
    return res.status(200).json({message:"Success"})
    } 
})

exports.loginSite = catchError(async(req,res,next) =>{
  const {email, password} = req.body

  const user =  await executeQuery("SELECT * FROM goh_campaign_sites WHERE vendors = (SELECT vendors FROM goh_campaign_vendor WHERE email='"+email+"' && password='"+password+"' &&  users > loginUsers) ","gohoardi_goh",next)
  if(user.length > 1){
   const updateUserlength =  await executeQuery("UPDATE  goh_campaign_vendor SET loginUsers = loginUsers + 1 WHERE vendors = '"+user[0].vendors+"'","gohoardi_goh",next)
   if(updateUserlength){
   return res.status(200).json(user)
  }else if(!user){
    return res.send("You Reach Maximum Limit")
  }
}
})


exports.logoutSite = catchError(async(req,res,next) =>{
  const {vendor} = req.params;

 const updateUserlength =  await executeQuery("UPDATE  goh_campaign_vendor SET loginUsers = loginUsers - 1 WHERE vendors = '"+vendor+"'","gohoardi_goh",next)
   if(updateUserlength){
   return res.send("Success")
  }

})

exports.uploadImage = catchError(async(req,res,next) =>{
 const { image, video } = req.files;
  const {id} = req.body
 
let imageLink;
  // Handle the uploaded image file
  if (image) {
    const imageFile = image[0];
    const { filename, mimetype, size } = imageFile;
    // Compress the image file
    await compressImage(imageFile.path);
    // Process the compressed image file as needed
    // ...

  imageLink = `${req.headers.host}/upload/${filename}`
  }
let videoLink;
  // Handle the uploaded video file
  if (video) {
    const videoFile = video[0];
    const { filename, mimetype, size } = videoFile;
    // Compress the video file
    await compressVideo(videoFile.path);
    // Process the compressed video file as needed
    // ...

    videoLink = `http://${req.headers.host}/upload/${filename}`
  }
  const inserVideoImage = await executeQuery("UPDATE goh_campaign_sites SET images = '"+imageLink+"', short_video = '"+videoLink+"' WHERE id="+id+"","gohoardi_goh",next)
  if(inserVideoImage){
    return  res.json({ message: 'Files uploaded successfully' });
  }else{
    return  res.json({ message: 'Something Wrong Here' });
  }
  // Return a response indicating the successful upload
 
})



// Function to compress an image using sharp
async function compressImage(filePath) {
  const compressedFilePath = filePath.replace(/(\.[\w\d_-]+)$/i, '-compressed$1');
  await sharp(filePath).jpeg({ quality: 80 }).toFile(compressedFilePath);
  return compressedFilePath;
}

// Function to compress a video using fluent-ffmpeg
async function compressVideo(filePath) {
  const compressedFilePath = filePath.replace(/(\.[\w\d_-]+)$/i, '-compressed$1');
  await new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .outputOptions('-crf 28')
      .output(compressedFilePath)
      .on('end', resolve)
      .on('error', reject)
      .run();
  });
  return compressedFilePath;
}



exports.vendorDetails = catchError(async(req,res,next) =>{
  const {vendor} = req.params
  const result = await executeQuery("SELECT contact_email,contact_phone FROM  tblcompanies WHERE name LIKE '%"+vendor+"'","odoads_tblcompanies" ,next)
  if(result){
return res.send(result)
}
})

exports.createCrypto = catchError(async(req,res,next) =>{
  var token = crypto.randomBytes(10).toString('hex');
  return res.send(token)
})