import express from "express";
import logger from "morgan";
import path from "path";

import loginRouter from "../routes/login";
import adminRouter from "../routes/admin";
import userRouter from "../routes/user";
import deleteRouter from "../routes/deleteAirport";
import insertAirportRouter from "../routes/insert_Airport";
import insertAirplaneRouter from "../routes/insert_airplane";
import deleteAirplaneRouter from "../routes/delete_airplane";
import insertLegInstanceRouter from "../routes/insertLegInstance";
import deleteLegInstanceRouter from "../routes/deleteLegInstance";
import showAvailableLegInstanceRouter from "../routes/showAvailableLegInstance";
import ReservationRouter from "../routes/Reservation";
import deleteReservationRouter from "../routes/deleteReservation";
import updateAirportRouter from "../routes/updateAirport";
//import insertLegInstanceRouter from "../routes/insertLegInstance;";
const PORT = 3002; //port 번호

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //json 형식을 사용하겠다.

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs"); //hbs파일을 이용해서 view를 보여주겠다.

app.use(logger("dev")); //log를 사용하겠다.

app.use("/", loginRouter); //기본적인 주소에 해당한다.
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/delete", deleteRouter);
app.use("/insertAirport", insertAirportRouter);
app.use("/insertAirplane", insertAirplaneRouter);
app.use("/deleteAirplane", deleteAirplaneRouter);
app.use("/insertLegInstance", insertLegInstanceRouter);
app.use("/deleteLegInstance", deleteLegInstanceRouter);
app.use("/showAvailableInstance", showAvailableLegInstanceRouter);
app.use("/Reservation", ReservationRouter);
app.use("/deleteReservation", deleteReservationRouter);
app.use("/updateAirport", updateAirportRouter);
//app.use("/insertLegInstance", insertLegInstanceRouter);
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`); //로그 찍기
});
