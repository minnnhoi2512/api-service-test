const express = require("express");
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/service.controller");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.get("/", verifyToken, getAllServices);
router.get("/:id", verifyToken, getServiceById);
router.post("/", isAdmin, createService);
router.put("/:id", isAdmin, updateService);
router.delete("/:id", isAdmin, deleteService);

module.exports = router;
