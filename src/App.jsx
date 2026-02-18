import { useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [empForm, setEmpForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const [attendanceForm, setAttendanceForm] = useState({
    employeeId: "",
    date: "",
    status: "Present",
  });

  // =========================
  // Employee Functions
  // =========================

  const handleEmpChange = (e) => {
    setEmpForm({ ...empForm, [e.target.name]: e.target.value });
  };

  const addEmployee = (e) => {
    e.preventDefault();

    // Check unique Employee ID
    if (employees.find(emp => emp.employeeId === empForm.employeeId)) {
      alert("Employee ID must be unique!");
      return;
    }

    setEmployees([...employees, empForm]);

    setEmpForm({
      employeeId: "",
      fullName: "",
      email: "",
      department: "",
    });
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.employeeId !== id));
    setAttendance(attendance.filter(att => att.employeeId !== id));
  };

  // =========================
  // Attendance Functions
  // =========================

  const handleAttendanceChange = (e) => {
    setAttendanceForm({
      ...attendanceForm,
      [e.target.name]: e.target.value,
    });
  };

  const markAttendance = (e) => {
    e.preventDefault();

    setAttendance([...attendance, attendanceForm]);

    setAttendanceForm({
      employeeId: "",
      date: "",
      status: "Present",
    });
  };

  return (

  <div className="container">

      <h1>Employee Management System</h1>

      {/* ================= EMPLOYEE SECTION ================= */}

      <h2>Add Employee</h2>
      <form onSubmit={addEmployee}>
        <input
          name="employeeId"
          placeholder="Employee ID"
          value={empForm.employeeId}
          onChange={handleEmpChange}
          required
        />
        <br /><br />

        <input
          name="fullName"
          placeholder="Full Name"
          value={empForm.fullName}
          onChange={handleEmpChange}
          required
        />
        <br /><br />

        <input
          name="email"
          placeholder="Email Address"
          value={empForm.email}
          onChange={handleEmpChange}
          required
        />
        <br /><br />

        <input
          name="department"
          placeholder="Department"
          value={empForm.department}
          onChange={handleEmpChange}
          required
        />
        <br /><br />

        <button type="submit">Add Employee</button>
      </form>

      <h2>Employee List</h2>
      {employees.map(emp => (
     <div key={emp.employeeId} className="employee-card">

          <b>{emp.fullName}</b> ({emp.department})
          <button
  onClick={() => deleteEmployee(emp.employeeId)}
  className="delete-btn"
>
  Delete
</button>

        </div>
      ))}

      <hr />

      {/* ================= ATTENDANCE SECTION ================= */}

      <h2>Mark Attendance</h2>
      <form onSubmit={markAttendance}>
        <select
          name="employeeId"
          value={attendanceForm.employeeId}
          onChange={handleAttendanceChange}
          required
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.employeeId} value={emp.employeeId}>
              {emp.fullName}
            </option>
          ))}
        </select>

        <br /><br />

        <input
          type="date"
          name="date"
          value={attendanceForm.date}
          onChange={handleAttendanceChange}
          required
        />

        <br /><br />

        <select
          name="status"
          value={attendanceForm.status}
          onChange={handleAttendanceChange}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <br /><br />

        <button type="submit">Mark Attendance</button>
      </form>

      <h2>Attendance Records</h2>
      {attendance.map((att, index) => {
        const employee = employees.find(emp => emp.employeeId === att.employeeId);
        return (
          <div key={index}>
            {employee?.fullName} - {att.date} - {att.status}
          </div>
        );
      })}
    </div>
  );
}

export default App;
