import express from "express";
import {} from "../database/sql";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("insert Router:", req.body);
  const Airport = req.body;
  const data = {
    Airport_code: Airport.update_Airport_Code,
    Name: Airport.update_Airport_Name,
    City: Airport.update_Airport_City,
    State: Airport.update_Airport_State,
  };
  console.log(data);
  updatesql.updateAirport(data);

  res.redirect("/admin");
});

module.exports = router;
