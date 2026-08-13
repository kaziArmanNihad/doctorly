import { v4 as uuidv4 } from "uuid";

export const createPatient = (data) => ({
  id: uuidv4(),

  name: data.name.trim(),

  age: Number(data.age),

  condition: data.condition.trim(),

  doctor: data.doctor.trim(),

  phone: data.phone.trim(),

  createdAt: new Date().toISOString().slice(0, 10),
});

const doctorNames = [
  "Dr. Amina Rahman",
  "Dr. Samuel Osei",
  "Dr. Layla Haddad",
  "Dr. Marcus Chen",
  "Dr. Priya Nair",
];

const conditions = [
  "Hypertension",
  "Asthma",
  "Diabetes Type 2",
  "Migraine",
  "Arthritis",
  "Anemia",
];

const firstNames = [
  "Noah",
  "Aisha",
  "Riley",
  "Elena",
  "Marcus",
  "Sofia",
  "Liam",
  "Priya",
  "Omar",
  "Grace",
  "Ethan",
  "Maya",
  "Lucas",
  "Hana",
];

const lastNames = [
  "Bennett",
  "Malik",
  "Morgan",
  "Torres",
  "Chen",
  "Rossi",
  "Bergman",
  "Nair",
  "Farouk",
  "Kim",
  "Walsh",
  "Iqbal",
  "Novak",
  "Osei",
];

const createDate = (daysAgo) =>
  new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 10);

export const seedPatients = Array.from({ length: 22 }, (_, index) => ({
  id: uuidv4(),

  name: `${firstNames[index % firstNames.length]} ${
    lastNames[(index * 3) % lastNames.length]
  }`,

  age: 18 + ((index * 7) % 60),

  condition: conditions[index % conditions.length],

  doctor: doctorNames[index % doctorNames.length],

  phone: `+1 415 555 0${(100 + index * 3).toString().slice(-3)}`,

  createdAt: createDate((index + 1) * 4),
}));

export const updatePatient = (data) => ({
  ...data,

  name: data.name.trim(),
  condition: data.condition.trim(),
  doctor: data.doctor.trim(),
  phone: data.phone.trim(),
  age: Number(data.age),
});
