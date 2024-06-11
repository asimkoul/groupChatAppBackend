const express = require("express");
const groupController = require("../controllers/group");
const userauthentication= require("../middleware/auth");
const router = express.Router();

router.delete("/delete-group/:groupId", userauthentication.authenticate, groupController.deleteGroup);

router.put("/edit-group/:groupId", userauthentication.authenticate, groupController.editGroup);

router.delete("/delete-member/:groupId/:userId", userauthentication.authenticate, groupController.deleteMember);

router.put("/make-admin/:groupId/:userId", userauthentication.authenticate, groupController.makeAdmin);



module.exports = router;