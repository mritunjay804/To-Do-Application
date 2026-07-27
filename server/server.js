const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const connectionString = "mongodb://127.0.0.1:27017";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//register
app.post("/add-register", async (req, res) => {
  try {
    const { user_name, user_id, user_email, user_password } = req.body;
    const client = await MongoClient.connect(connectionString);
    const database = client.db("to_do_application");

    //check user id
    const idExist = await database
      .collection("user_register")
      .findOne({ user_id });

    if (idExist) {
      client.close();
      return res.status(409).json({
        field: "user_id",
        message: "User ID already exists",
      });
    }

    //check email
    const emailExist = await database
      .collection("user_register")
      .findOne({ user_email });
    if (emailExist) {
      client.close();
      return res.status(409).json({
        field: "user_email",
        message: "Email already exists",
      });
    }

    //inerted
    await database.collection("user_register").insertOne({
      user_name,
      user_id,
      user_email,
      user_password,
    });

    console.log("Inserted Successfully");

    await client.close();

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Database Error",
    });
  }
});

//login
app.get("/user/:email", async (req, res) => {
  try {
    const client = await MongoClient.connect(connectionString);
    const database = client.db("to_do_application");

    const user = await database
      .collection("user_register")
      .findOne({ user_email: req.params.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        massage: "user not found",
      });
    }

    client.close();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      massage: "server error",
    });
  }
});

//add appointment
app.post("/add-appointment", async (req, res) => {
  try {
    console.log(req.body);

    const {
      task_title,
      task_description,
      task_category,
      task_date,
      user_email,
    } = req.body;

    const client = await MongoClient.connect(connectionString);
    const database = client.db("to_do_application");

    await database.collection("user_appointment").insertOne({
      task_title,
      task_description,
      task_category,
      task_date: new Date(task_date),
      user_email,
    });

    await client.close();

    res.status(201).json({
      success: true,
      message: "Appointment inserted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

//get appointment
app.get("/appointments/:userEmail", async (req, res) => {
  try {
    const client = await MongoClient.connect(connectionString);
    const database = client.db("to_do_application");

    const documents = await database
      .collection("user_appointment")
      .find({ user_email: req.params.userEmail })
      .toArray();

    client.close();

    res.status(200).json(documents);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

//get complete appointment
app.get("/completeAppointment/:userEmail", async (req, res) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const client = await MongoClient.connect(connectionString);
    const database = client.db("to_do_application");
    const documents = await database
      .collection("user_appointment")
      .find({
        user_email: req.params.userEmail,
        task_date: { $lt: currentDate },
      })
      .toArray();
    client.close();
    res.status(200).json(documents);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//pending appointment
app.get("/pendingAppointment/:userEmail", async (req, res) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const client = await MongoClient.connect(connectionString);
    const database = client.db("to_do_application");

    const documents = await database
      .collection("user_appointment")
      .find({
        user_email: req.params.userEmail,
        task_date: { $gt: currentDate },
      })
      .toArray();

    client.close();

    res.status(200).json(documents);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

//delete Appointment
app.delete("/deleteAppointment/:taskTitle", async (req, res) => {
  try {
    const client = await MongoClient.connect(connectionString);
    const database = client.db("to_do_application");

    await database.collection("user_appointment").deleteOne({
      task_title: req.params.taskTitle,
    });

    client.close();

    res.status(200).json({
      success: true,
      message: "Appointment Deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

//get appointment for edit
app.get("/appointment/:id", async (req, res) => {
  try {
    const client = await MongoClient.connect(connectionString);
    const database = client.db("to_do_application");

    const document = await database.collection("user_appointment").findOne({
      _id: new ObjectId(req.params.id),
    });

    client.close();

    res.json(document);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

//edit Appointment
app.put("/editAppointment/:id", async (req, res) => {
  try {
    const { task_title, task_description, task_category, task_date } = req.body;

    const client = await MongoClient.connect(connectionString);
    const database = client.db("to_do_application");
    await database.collection("user_appointment").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          task_title,
          task_description,
          task_category,
          task_date: new Date(task_date),
        },
      },
    );

    client.close();
    res.status(200).json({
      success: true,
      massage: "Appointment Updated..",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      massage: "Server Error",
    });
  }
});

app.delete("/appointmentDelete/:id", async (req, res) => {
  try {
    const client = await MongoClient.connect(connectionString);
    const database = client.db("to_do_application");
    await database
      .collection("user_appointment")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    client.close();
    res.status(200).json({
      success: true,
      massage: "Appointment Deleted successfully...",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      massage: "Server Error",
    });
  }
});

///update pending appointment//
app.put("/editPendingAppointment/:id", async (req, res) => {
  try {
    const {
      task_title,
      task_description,
      task_category,
      task_date,
    } = req.body;

    const client = await MongoClient.connect(connectionString);
    const database = client.db("to_do_application");

    await database.collection("user_appointment").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          task_title,
          task_description,
          task_category,
          task_date: new Date(task_date),
        },
      }
    );

    client.close();

    res.status(200).json({
      success: true,
      message: "Updated Successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
