import {mysql} from "mysql2"
  
export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "practic26",
  password: "dasha1604"
});