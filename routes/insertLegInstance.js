import express from "express";
import { selectsql, insertsql } from "../database/sql";

const router = express.Router();
router.post("/", async (req, res) => {
  console.log("insert LegInstance Router:", req.body);
  const LegInstance = req.body;
  const data = {
    Flight_number: LegInstance.insert_Flight_number,
    leg_number: LegInstance.insert_Leg_number,
    Date: LegInstance.insert_Date,
    Number_Of_Available_Seats: LegInstance.insert_Number_Of_Available_Seats,
    Airplane_id: LegInstance.insert_Airplane_id,
    Fair: LegInstance.insert_Fair,
  };
  console.log(data);
  insertsql.insertLegInstance(data);

  res.redirect("/admin");
});

router.get("/", async (req, res) => {
  const legInstance = await selectsql.getLegInstance();
  res.render("admin", {
    //delete.hbs파일을 렌더링한다
    legInstance,
  });
});
module.exports = router;
