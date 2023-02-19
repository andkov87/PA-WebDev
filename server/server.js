require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require('./db/tool.model')

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(express.json());

app.use("/api/employees/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});



app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

app.get('/api/equipments/', async (req, res) => {
  const equipments = await EquipmentModel.find();
  return res.json(equipments)
})

app.get("/api/employees/:id", (req, res) => {
  return res.json(req.employee);
});
app.get("/api/equipments/:id", async (req, res) => {
  const equipment = await EquipmentModel.findById(req.params.id)

  if (!equipment) {
    return res.status(404).end("Equipment not found");
  }
  return res.json(equipment);
});

app.get('/robert', async (req, res) => {
  const roberts = await EmployeeModel.find({firstName: /^Robert/})
  return res.json(roberts)

})

app.get('/missing', async (req, res) => {
  const missingEmployee = await EmployeeModel.find({present: false})
  return res.json(missingEmployee)
})

app.get("/api/filteredEmployees/:id", async (req, res, next) => {
    try {
      const sortEmployees = await EmployeeModel.find({position: req.params.position, level: req.params.level});     
      return res.json(sortEmployees);
    } catch (err) {
      return next(err);
    }
  });

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/equipments/", async (req, res, next) => {
  const equipment = req.body;

  try {
    const savedEq = await EquipmentModel.create(equipment);
    return res.json(savedEq);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  const employee = req.body;

  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}); 
    return res.json(equipment);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/equipments/:id", async (req, res, next) => {
    try {
      const deleteEquipment = await EquipmentModel.findOneAndDelete({_id: req.params.id}); 
      console.log(deleteEquipment)
      return res.json(deleteEquipment);
    } catch (err) {
      return next(err);
    }
  });

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
