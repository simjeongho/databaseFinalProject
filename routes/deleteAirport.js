import express from "express";
import { deletesql, selectsql } from "../database/sql";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("delete router:", req.body.AirportdelBtn);
  const data = {
    Airport_code: req.body.AirportdelBtn,
  };
  await deletesql.deleteAirport(data);

  res.redirect("/admin"); // /delete로 redirect한다.
});
router.get("/", async (req, res) => {
  const Airport = await selectsql.getAirport;
  res.render("admin", {
    Airport,
  });
});
module.exports = router;
