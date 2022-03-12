import express from "express";
import { insertsql } from "../database/sql";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("insert Airplane Router:", req.body);
  const Airplane = req.body;
  const data = {
    Airplane_id: Airplane.insert_Airplane_id,
    Airplane_Type: Airplane.insert_Airplane_Type,
  };
  console.log(data);
  insertsql.insertAirplane(data);
  res.redirect("/admin");
});

router.get("/", async (req, res) => {
  const airplane = await selectsql.getAirplane();
  res.render("admin", {
    airplane,
  });
});
module.exports = router;
