import { v4 as uuidv4 } from "uuid";
import data from "./data.json"
const createDate = (daysAgo) => {
  return new Date(Date.now() - daysAgo * 86400000)
    .toISOString()
    .slice(0, 10);
};

const doctors = data;

export const seedDoctors = doctors.map((doctor, index) => ({
  id: uuidv4(),

  ...doctor,

  createdAt: createDate((index + 2) * 6),

  patients: [
    {
      id: uuidv4(),
      name: "Noah Bennett",
      age: 34,
      condition: "Hypertension",
      createdAt: createDate(index * 3),
    },
    {
      id: uuidv4(),
      name: "Aisha Malik",
      age: 27,
      condition: "Asthma",
      createdAt: createDate(index * 5),
    },
  ],
}));

export const createDoctor = (data) => ({
  id: uuidv4(),
  ...data,
  createdAt: new Date().toISOString().slice(0, 10),
  patients: [],
});

export const createPatient = (data) => ({
  id: uuidv4(),
  ...data,
  age: Number(data.age),
  createdAt: new Date().toISOString().slice(0, 10),
});