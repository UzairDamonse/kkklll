const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");

// All users

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Single user

router.get("/:id", (req, res) => {
  id = req.params.id;
  try {
    con.query(
      `SELECT * FROM users WHERE users.user_id = ${id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Add user

router.post("/", (req, res) => {
  const {
    email,
    password,
    full_name,
    billing_address,
    default_shipping_address,
    country,
    phone,
    user_type,
  } = req.body;

  try {
    con.query(
      `INSERT INTO users (email,password,full_name,billing_address,default_shipping_address,country,phone,user_type) VALUES ("${email}","${password}","${full_name}","${billing_address}","${default_shipping_address}","${country}","${phone}","${user_type}")`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Edit user

router.put("/:id", (req, res) => {
  const {
    email,
    password,
    full_name,
    billing_address,
    default_shipping_address,
    country,
    phone,
    user_type,
  } = req.body;

  let id = req.params.id;

  try {
    con.query(
      `UPDATE users SET email="${email}",password="${password}",full_name="${full_name}",billing_address="${billing_address}",default_shipping_address="${default_shipping_address}",country="${country}",phone="${phone}",user_type="${user_type}" WHERE users.user_id = "${id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Delete user

router.delete("/:id", (req, res) => {
  let id = req.params.id;

  try {
    con.query(
      `DELETE FROM users WHERE users.user_id = "${id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
