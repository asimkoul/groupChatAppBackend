const express = require("express");
const groupController = require("../controllers/group");
const userauthentication= require("../middleware/auth");
const router = express.Router();


router.get("/get-all-groups", userauthentication.authenticate, groupController.getAllGroups);

router.get("/get-all-messages/:groupId", userauthentication.authenticate, groupController.getGroupMessages);

router.get("/get-all-members/:groupId", userauthentication.authenticate, groupController.getGroupMembers);

router.post("/send-group-message/:groupId", userauthentication.authenticate, groupController.sendGroupMessage);

router.post("/create-group", userauthentication.authenticate, groupController.createGroup);

router.delete("/delete-group/:groupId", userauthentication.authenticate, groupController.deleteGroup);

router.put("/edit-group/:groupId", userauthentication.authenticate, groupController.editGroup);

router.delete("/delete-member/:groupId/:userId", userauthentication.authenticate, groupController.deleteMember);

router.put("/make-admin/:groupId/:userId", userauthentication.authenticate, groupController.makeAdmin);



module.exports = router;