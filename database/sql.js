import async from "hbs/lib/async";
import pool from "./mysql";

//데이터 베이스 연결

//async /await 사용
const promisePool = pool.promise(); // promise 객체를 이용해서 통신을 할 것이다.
const promisePool1 = pool.promise();
//select query
export const selectsql = {
  getUser: async () => {
    console.log("show users");
    //비동기적으로 통신하는 함수이다. 상응하는 응답이 와야지만 작동
    const [rows] = await promisePool.query(`select * from user`); // user table의 모든 데이터를 호출하는 query문
    return rows;
  },
  getAirport: async () => {
    console.log("show airport");
    const [rows] = await promisePool.query("select * from airport");
    return rows;
  },
  getAirplane: async () => {
    console.log("show airplane");
    const [rows] = await promisePool.query(
      "select Airplane_id, Airplane_type, Max_seats, Company from airplane, airplanetype where airplane.airplane_type = airplanetype.airplane_type_name"
    );
    return rows;
  },
  getLegInstance: async () => {
    console.log("show leg instance");
    const [rows] = await promisePool.query(
      "select Flight_number, Leg_number, Date, Number_Of_Available_Seats, Airplane_id, Fair from leg_instance"
    );
    return rows;
  },
};

//insert query
export const insertsql = {
  insertAirport: async (data) => {
    const sql = `insert into Airport values ('${data.Airport_code}', '${data.Name}', '${data.City}', '${data.State}')`;
    await promisePool.query(sql);
  },
  // insertAirplane: async (data) => {
  //   const sql = `insert into airplane select '${data.Airplane_id}', '${data.Airplane_Type}' from dual where exists (select Airplane_Type_name from airplanetype where Airplane_Type_name = '${data.Airplane_Type}')`;
  //   await promisePool.query(sql);
  // },
  insertAirplane: async (data) => {
    //const connection = pool.getConnection();
    //await connection.beginTransaction();
    try {
      const sql0 = `set autocommit = 0`;
      const transaction = `start transaction`;
      await promisePool.query(sql0);
      await promisePool.query(transaction);
      const sql1 = `select Airplane_Type_name from airplanetype where Airplane_Type_name = '${data.Airplane_Type}'`;
      const sql2 = `insert into Airplane values ('${data.Airplane_id}', '${data.Airplane_Type}')`;
      let selectResult1 = await promisePool.query(sql1);

      if (selectResult1[0].length < 1) {
        throw new Error(`there has no airplane_Type!`);
      } else {
        const commit = `commit`;
        console.log("Airplane insert complete");
        await promisePool.query(sql2);
        await promisePool.query(commit);
      }
    } catch (err) {
      console.log("Airport insert에서 error 발생");
      const rollback = `rollback`;
      await promisePool.query(rollback);
    } finally {
      const sql3 = `set autocommit = 1`;
      await promisePool.query(sql3);
      //connection.release();s
    }
  },
  insertLegInstance: async (data) => {
    const sql = `insert into leg_instance select '${data.Flight_number}', '${data.leg_number}', '${data.Date}', '${data.Number_Of_Available_Seats}', '${data.Airplane_id}', '${data.Fair}' from dual where exists (select Flight_number, leg_number, Airplane_id from flight_leg a, airplane b where a.flight_number = '${data.Flight_number}' and a.leg_number = '${data.leg_number}' and b.Airplane_id = '${data.Airplane_id}')`;
    await promisePool.query(sql);
  },
  // insertLegInstance: async (data) => {
  //   const connection = pool.getConnection();
  //   await connection.beginTransaction();
  //   try {
  //     const sql1 = ``
  //   }
  // },
};

//delete query
export const deletesql = {
  deleteAirport: async (data) => {
    console.log("deletesql.deleteAirport: ", data.Name);
    const sql = `delete from Airport where Airport_code='${data.Airport_code}'`; //
    await promisePool.query(sql);
  },
  deleteLegInstance: async (data) => {
    console.log("deletesql.Airplane_id: ", data.Airplane_id);
    console.log("deleteleginstance flight_number: ", data.Flight_number);
    console.log("deleteLegInstance leg number : ", data.Leg_number);
    console.log("나 leg instance deletor야 ");
    const sql = `delete from leg_instance where Airplane_id ='${data.Airplane_id}' and Flight_number = ${data.Flight_number} and Leg_number = ${data.Leg_number}`; //
    await promisePool.query(sql);
  },
  deleteAirplane: async (data) => {
    console.log("deletesql.deleteAirplane: ", data.Airplane_id);
    const sql = `delete from Airplane where airplane_id = '${data.Airplane_id}'`; //
    await promisePool.query(sql);
  },
};

export const updatesql = {
  updateAirport: async (data) => {
    console.log("update Airport________________");
  },
};

export const Reservationsql = {
  // showAvailableLegInstance: async (data) => {
  //   try {
  //     const sql0 = `set autocommit = 0`;
  //     await promisePool.query(sql0);
  //     const sql1 = `select a.flight_number, a.leg_number, Date, Number_of_available_seats, Airplane_id, Fair, Departure_airport_code, Arrival_airport_code from flight_leg a, leg_instance b where a.flight_number = b.flight_number and a.leg_number = b.leg_number and a.departure_airport_code = '${data.Departure_Airport}' and a.arrival_airport_code = '${data.Arrival_Airport}' and b.Number_of_Available_seats > 0`;
  //     let SelectAvailable = await promisePool.query(sql1);

  //     if (SelectAvailable[0].length < 1) {
  //       throw new Error(`there has no available leg_instance`);
  //     } else {
  //       console.log("Here are available Leg_Instance!");
  //       console.log(data);
  //       await promisePool.query(sql1);
  //     }
  //   } catch (err) {
  //     console.log("show Available Leg_instance에서 error 발생!");
  //   } finally {
  //     const sql3 = `set autocommit = 1`;
  //     await promisePool.query(sql3);
  //   }
  // },
  showAvailableLegInstance: async (data) => {
    console.log("showAvailableLegInstance!!");
    const [rows] = await promisePool.query(
      `select a.flight_number, a.leg_number, Date, Number_of_available_seats, Airplane_id, Fair, Departure_airport_code, Arrival_airport_code from flight_leg a, leg_instance b where a.flight_number = b.flight_number and a.leg_number = b.leg_number and a.departure_airport_code = '${data.Departure_Airport}' and a.arrival_airport_code = '${data.Arrival_Airport}' and b.Number_of_Available_seats > 0`
    );
    console.log("나 showavailableLegInstance야");
    console.log(rows);
    return rows;
  },
  getAvailableInstance: async () => {
    console.log("getAvailabeInstance!!");
    const [rows] = await promisePool.query(
      `select a.Flight_number, a.leg_number, a.Date, a.Number_of_available_seats, a.Airplane_id, a.Fair, b.departure_airport_code, b.arrival_airport_code, c.city as departureCity from leg_instance a, flight_leg b, Airport c where a.Number_of_available_seats > 0 and c.Airport_code = b.departure_airport_code;`
    );
    return rows;
  },
  showUser: async (data) => {
    console.log("show users on user");
    //비동기적으로 통신하는 함수이다. 상응하는 응답이 와야지만 작동
    const [rows] = await promisePool.query(`select Id from user`); // user table의 모든 데이터를 호출하는 query문
    return rows;
  },
  Reservation: async (data) => {
    console.log("나Reservation!이야!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("Resetvationdata입니다. ", data);
    try {
      console.log("try 문입니다.");
      const sql0 = `set autocommit = 0`;
      await promisePool.query(sql0);
      const sql1 = `start transaction`;
      await promisePool.query(sql1);
      console.log("select 전입니더");
      const sql2 = `select Flight_number, Leg_number, Airplane_id from leg_instance where flight_number = ${data.Flight_number} and Leg_number = ${data.Leg_number} and Airplane_id = '${data.Airplane_id}'`;
      console.log("select까지는 됩니더");
      const sql3 = `insert into seat_reservation values ( ${data.Flight_number}, ${data.Leg_number}, '${data.Date}', ${data.Seat_Number}, '${data.Customer_Name}', '${data.Customer_Phone}', '${data.Airplane_id}')`;
      //await promisePool.query(sql2);
      const updatesql = `update leg_instance set Number_of_available_seats = Number_of_available_seats - 1 where Flight_number = ${data.Flight_number} and leg_number = ${data.Leg_number} and Airplane_id = '${data.Airplane_id}'`;
      let Result1 = await promisePool.query(sql2);
      console.log("select 됩니다.");
      console.log("Result1 결과 !", Result1[0]);
      if (Result1[0].length < 1) {
        console.log("Reservation Failed");
        const sql4 = `rollback`;
        await promisePool.query(sql4);
        throw new Error(`there has no leg_instance`);
      } else {
        console.log("Reservation Success");
        const sql5 = `commit`;
        await promisePool.query(sql3);
        await promisePool.query(updatesql); // number of available seats 1 줄이기
        console.log("commit 되기 전");
        await promisePool.query(sql5);
        console.log("insert 됩니다. ");
      }
    } catch (err) {
      const sql6 = `rollback`;
      console.log("Reservation에서 error 발생1");
      await promisePool.query(sql6);
    } finally {
      const sql7 = `set autocommit = 1`;
      await promisePool.query(sql7);
    }
  },
  getSeatReservation: async () => {
    console.log("getSeatReservation!!");
    const [rows] = await promisePool.query(
      `select a.Flight_number, a.Leg_number, a.Date, a.Seat_number, a.Customer_name, a.Customer_phone, a.Airplane_id, b.Arrival_Airport_Code, b.Departure_Airport_Code from Seat_Reservation a, flight_leg b, leg_instance c where a.flight_number = c.flight_number and a.leg_number = c.leg_number and a.Airplane_id = c.Airplane_id`
    );
    return rows;
  },

  deleteSeatReservation: async (data) => {
    console.log("deleteReservation");
    console.log("나 DeleteReservation이야__________________________________");
    console.log("DeleteReservation입니다. ", data);
    //console.log("data.Flight_number", data.Flight_number);
    try {
      console.log("try문입니더 delete");
      const sql0 = `set autocommit = 0`;
      await promisePool.query(sql0);
      const transactionsql = `start transaction`;
      await promisePool.query(transactionsql);
      console.log("트랜잭션 까지 됩니더 delete");
      const sql2 = `delete from seat_reservation where flight_number = ${data.Flight_number} and leg_number = ${data.Leg_number} and Seat_number = ${data.Seat_Number} and Airplane_id = '${data.Airplane_id}'`;
      await promisePool.query(sql2);
      console.log("delete가 안됩니더");
      const updatesql = `update leg_instance set Number_of_available_seats = Number_of_available_seats + 1 where Flight_number = ${data.Flight_number} and leg_number = ${data.Leg_number} and Airplane_id = '${data.Airplane_id}'`;
      await promisePool.query(updatesql);
      console.log("delete update입니더");
      const commit = `commit`;
      await promisePool.query(commit);
    } catch (err) {
      const Rollback = `rollback`;
      await promisePool.query(Rollback);
    } finally {
      const Autocommit = `set autocommit = 1`;
      await promisePool.query(Autocommit);
    }
  },
};
