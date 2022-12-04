const express = require("express");
const { getNotes } = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route('/').get(getNotes);
// router.route('/create').post();
// router.route('/:id').get().put().delete();

module.exports = router;