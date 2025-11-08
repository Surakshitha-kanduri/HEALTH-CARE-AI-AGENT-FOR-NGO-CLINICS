/* ------------ HOSPITALS ------------ */
const hospitalList = document.getElementById('hospitalList');
if (hospitalList) {
  const hospitals = [
    {
      name: "Yashoda Hospital",
      doctors: [
        { name: "Dr. Meena Sharma", exp: "12 yrs", spec: "Cardiology" },
        { name: "Dr. Rajesh Iyer", exp: "8 yrs", spec: "Neurology" }
      ]
    },
    {
      name: "Apollo Community Clinic",
      doctors: [
        { name: "Dr. Priya Nair", exp: "10 yrs", spec: "General Medicine" },
        { name: "Dr. Anil Verma", exp: "7 yrs", spec: "Orthopedics" }
      ]
    },
    {
      name: "AIIMS Outreach Center",
      doctors: [
        { name: "Dr. Kavita Rao", exp: "15 yrs", spec: "Pediatrics" },
        { name: "Dr. Manish Gupta", exp: "10 yrs", spec: "Oncology" }
      ]
    },
    {
      name: "Medilife NGO Clinic",
      doctors: [
        { name: "Dr. Sushma Das", exp: "9 yrs", spec: "Gynecology" },
        { name: "Dr. Vivek Sharma", exp: "11 yrs", spec: "Dermatology" }
      ]
    }
  ];

  const doctorIcon = "https://cdn-icons-png.flaticon.com/512/3774/3774299.png";

  const renderHospitals = (list) => {
    hospitalList.innerHTML = '';
    list.forEach(h => {
      const div = document.createElement('div');
      div.className = 'hospital-card';
      div.innerHTML = `
        <h3>${h.name}</h3>
        <h4>Available Doctors:</h4>
        <ul>
          ${h.doctors.map(d => `
            <li>
              <img src="${doctorIcon}" class="doctor-icon" alt="doctor icon">
              <strong>${d.name}</strong> — ${d.spec} (${d.exp})
            </li>`).join('')}
        </ul>
      `;
      hospitalList.appendChild(div);
    });
  };

  renderHospitals(hospitals);

  const searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('input', () => {
    const term = searchBar.value.toLowerCase();
    const filtered = hospitals.filter(h =>
      h.name.toLowerCase().includes(term) ||
      h.doctors.some(d =>
        d.name.toLowerCase().includes(term) ||
        d.spec.toLowerCase().includes(term)
      )
    );
    renderHospitals(filtered);
  });
}
