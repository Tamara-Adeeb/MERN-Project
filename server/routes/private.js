// const express = require("express");
// const router = express.Router();
// const{getPrivateData} = require('../controllers/private');
const privateController = require('../controllers/private');
const {protect} = require('../middleware/protect')
module.exports = app => {
    app.get('/api/private',protect,privateController.getPrivateData);
}

// router.route("/").get(getPrivateData);

// module.exports = router;
