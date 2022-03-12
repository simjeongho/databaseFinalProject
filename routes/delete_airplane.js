import express from "express";
import { selectsql, deletesql } from "../database/sql";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("delete airplane router:", req.body.AirplanedelBtn);
  const data = {
    Airplane_id: req.body.AirplanedelBtn,
  };
  await deletesql.deleteAirplane(data);

  res.redirect("/admin"); // /delete로 redirect한다.
});
router.get("/", async (req, res) => {
  const Airplane = await selectsql.getAirplane();
  res.render("admin", {
    Airplane,
  });
});

module.exports = router; // 꼭 export를 시켜줘야한다.
