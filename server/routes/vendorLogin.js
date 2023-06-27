const express = require('express');
const { createHelper, getAllVendorEmp, loginVendor, createCampaign, getCampaign, vendorsList,createVendorData, UpdateVendorData, GetcreateVendorData, insertSite, loginSite, uploadImage, logoutSite, vendorDetails, createCrypto } = require('../controller/vendors');
const { verifyToken } = require('../middleware/token');
const upload = require('../middleware/ImageUpload');

const router = express.Router()

router.route('/createHelper').post(createHelper).put(getAllVendorEmp).patch(vendorDetails)
router.route('/details/:vendor').get(vendorDetails).post(logoutSite)
// router.route('/loginVendor').post(loginVendor).put(verifyToken,createCampaign).get(getCampaign)
router.route('/loginVendor').put(verifyToken,createCampaign).get(getCampaign)
router.route("/vendor").get(vendorsList).post(createVendorData).put(UpdateVendorData)
router.route("/vendorData").get(GetcreateVendorData).post(insertSite).put(loginSite).patch(upload.single("photo"),uploadImage)
router.route("/files").put(upload.fields([{ name: 'image' }, { name: 'video' }]),uploadImage)
router.route("/c").get(createCrypto)


module.exports = router;