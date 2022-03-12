import express from "express";
import { selectsql } from "../database/sql";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  const vars = req.body;
  const users = await selectsql.getUser();
  let whoAmI = "";
  let checkLogin = false;

  users.map((user) => {
    //users라는 배열을 map으로 돌면서 안에 있는 user라는 객체를 가져와 체크한다.
    console.log(user.Id, " as");
    console.log(user.Password, " ws");
    console.log("vars.id : ", vars.id);
    console.log("vars.Password : ", vars.password);
    if (vars.id === user.Id && vars.password === user.Password) {
      // user.id와 res.id user.password와 res.password가 같으면 로그인을 시킨다.
      console.log(`login success!`);
      checkLogin = true; //상태를 바꿔준다.
      if (vars.id === "admin") {
        // 관리자라면 whoAmI상태를 admin으로 바꿔준다.
        whoAmI = `admin`;
      } else {
        whoAmI = "user";
      }
    }
  });
  if (checkLogin && whoAmI === "admin") {
    res.redirect("/admin"); //admin이라면 admin페이지로 redirect한다.
  } else if (checkLogin && whoAmI === "user") {
    console.log("vars.id:지롱", vars.id);
    res.redirect("/user"); //user라면 user페이지로 redirect한다.
  } else {
    console.log("login failed");
    res.send(
      // 로그인이 실패하면 alert경고창을 띄운다.
      "<script>alert('로그인에 실패했습니다.'); location.href='/'; </script>"
    );
  }
});
function createItem(key, value) {
  console.log("create item in local storage");
  localStorage.setItem(key, value);
}
module.exports = router; // 꼭 export를 시켜줘야한다.
