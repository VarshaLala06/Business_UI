const express=require("express")
const router=express.Router()
const {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
} = require("../controllers/clientController");
const authMiddleware=require('../middlewares/authMiddleware')
const allowRoles = require("../middlewares/roleMiddleware");

// every role can access these
router.get("/",authMiddleware, getClients);
router.get("/:id",authMiddleware, getClientById);

// admin and managers only
router.post("/",authMiddleware, allowRoles("admin", "manager"),createClient);
router.put("/:id",authMiddleware,allowRoles("admin", "manager"), updateClient);
router.delete("/:id", authMiddleware,allowRoles("admin"), deleteClient);

module.exports = router;