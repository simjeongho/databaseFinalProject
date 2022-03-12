import express from "express";
import { route } from "express/lib/application";
import { selectsql, deletesql, insertsql } from "../database/sql";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("insert Router:", req.body);
  const Airport = req.body;
  const data = {
    Airport_code: Airport.insert_Airport_Code,
    Name: Airport.insert_Airport_Name,
    City: Airport.insert_Airport_City,
    State: Airport.insert_Airport_State,
  };
  console.log(data);
  insertsql.insertAirport(data);

  res.redirect("/admin");
});

router.get("/", async (req, res) => {
  const airport = await selectsql.getAirport();
  res.render("admin", {
    //delete.hbs파일을 렌더링한다.
    airport,
  });
});
module.exports = router;
