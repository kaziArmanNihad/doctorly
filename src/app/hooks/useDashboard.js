export function getDoctorId(doctorField) {
  if (!doctorField) return null;
  if (typeof doctorField === "string") return doctorField;
  if (typeof doctorField === "object")
    return doctorField._id || doctorField.$oid || null;
  return null;
}

export function patientsPerDoctor(doctors, patients) {
  const map = new Map();
  doctors.forEach((d) => map.set(d._id, { id: d._id, name: d.name, count: 0 }));

  patients.forEach((p) => {
    const id = getDoctorId(p.doctor);
    if (id && map.has(id)) map.get(id).count += 1;
  });

  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function genderSplit(patients) {
  const counts = { male: 0, female: 0, other: 0 };
  patients.forEach((p) => {
    const g = (p.gender || "").toLowerCase();
    if (g === "male") counts.male += 1;
    else if (g === "female") counts.female += 1;
    else counts.other += 1;
  });
  return counts;
}

export function topConditions(patients, n = 5) {
  const counts = {};
  patients.forEach((p) => {
    const c = (p.condition || "").trim();
    if (!c) return;
    counts[c] = (counts[c] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([condition, count]) => ({ condition, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}
