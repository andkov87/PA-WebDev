/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const equipments = require("./equipments.json")
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require('../db/tool.model');


const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

/*
const splitedNames = names.map(name =>  {
  const nameSplit = name.split(' ');
   
  if(nameSplit.length < 3 ){
    return {
      firstName: nameSplit[0],
      middleName: "",
      lastŃame: nameSplit[1]
    }
  } else {
    return {
    firstName: nameSplit[0],
    middleName: nameSplit[1],
    lastŃame: nameSplit[2]
    }
  }
})
*/
const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name: name,
    level: pick(levels),
    position: pick(positions),
    present: false
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateTools = async () => {
  await EquipmentModel.deleteMany({});


    await EquipmentModel.create(...equipments);
    console.log('Equipments created')
}

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await populateTools();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
