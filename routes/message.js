const express = require("express");
const messageController = require("../controllers/messages");
const userauthentication = require("../middleware/auth");
const router = express.Router();
router.use(express.json());

router.post('/',userauthentication.authenticate, messageController.postMessages);
router.get('/allMessages', userauthentication.authenticate,messageController.getAllMessages);

module.exports = router;