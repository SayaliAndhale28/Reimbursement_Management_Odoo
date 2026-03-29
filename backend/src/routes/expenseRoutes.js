
const router = require("express").Router();
const {createExpense} = require("../controllers/expenseController");

router.post("/", createExpense);

module.exports = router;
