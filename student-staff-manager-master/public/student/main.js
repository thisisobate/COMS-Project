const fileReader = new FileReader();
const url = "/api/";
let students = [];
let modalLoader = document.querySelector("#modal-overlay-loader").style
let mainLoader = document.querySelector("#main-loader").style

function init() {
     const path = window.location.pathname;
     if (path == "/student/") {
          showStudents();
     } else if (path == "/student/admin") {
          showAdmins();
     } else {
          console.log("nothing");
     }

     localStorage.setItem("studentId", "");
     localStorage.setItem("adminId", "");
}
window.onload = init;

//////////////////////////////////////////////////////////////////
//        Student CRUD
//////////////////////////////////////////////////////////////////

async function getStudents() {
     let students = await fetch(url + "students").then(data => data.json());
     return students;
}

async function getStudent(id) {
     let student = await fetch(url + "students/" + id).then(data => data.json());
     return student;
}

async function deleteStudent() {
     modalLoader.display = "flex"
     const id = localStorage.getItem("studentId");
     await fetch(url + "students/" + id, {
          method: "DELETE",
          headers: {
               "Content-Type": "application/json",
               "token": localStorage.getItem("admin")
          }
     });
     closeModal()
     showStudents()
     modalLoader.display = "none"
}

async function editStudent() {
     modalLoader.display = "flex"
     const id = localStorage.getItem("studentId");
     let student = getFields();
     await fetch(url + "students/" + id, {
          method: "PUT",
          headers: {
               "Content-Type": "application/json",
               "token": localStorage.getItem("admin")
          },
          body: JSON.stringify(student)
     });
     populateFields(student)
     showStudents()
     modalLoader.display = "none"
}

async function addStudent() {
     modalLoader.display = "flex"
     let student = getFields();
     student = await fetch(url + "students", {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
               "token": localStorage.getItem("admin")
          },
          body: JSON.stringify(student)
     });
     closeModal()
     showStudents()
     modalLoader.display = "none"
}

async function getCount() {
     let student = await fetch(url + "students/count").then(data => data.json());
     let admin = await fetch(url + "admins/count").then(data => data.json());

     document.querySelector("#noOfAdmins").innerHTML = admin.data
     document.querySelector("#noOfStudents").innerHTML = student.data
}

//////////////////////////////////////////////////////////////////
//        Admin CRUD
//////////////////////////////////////////////////////////////////

async function getAdmins() {
     let admins = await fetch(url + "admins").then(data => data.json());
     return admins;
}

async function getAdmin(id) {
     let admin = await fetch(url + "admins/" + id).then(data => data.json());
     return admin;
}

async function deleteAdmin() {
     modalLoader.display = "flex"
     const id = localStorage.getItem("adminId");
     await fetch(url + "admins/" + id, {
          method: "DELETE",
          headers: {
               "Content-Type": "application/json",
               "token": localStorage.getItem("admin")
          }
     });
     closeAdminModal()
     showAdmins()
     modalLoader.display = "none"
}

async function editAdmin() {
     modalLoader.display = "flex"
     const id = localStorage.getItem("adminId");
     let admin = getAdminFields();
     await fetch(url + "admins/" + id, {
          method: "PUT",
          headers: {
               "Content-Type": "application/json",
               "token": localStorage.getItem("admin")
          },
          body: JSON.stringify(admin)
     });
     populateAdminFields(admin)
     showAdmins()
     modalLoader.display = "none"
}

async function addAdmin() {
     modalLoader.display = "flex"
     let admin = getAdminFields();
     console.log(admin)
     admin = await fetch(url + "admins", {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
               "token": localStorage.getItem("admin")
          },
          body: JSON.stringify(admin)
     });
     closeAdminModal()
     showAdmins()
     modalLoader.display = "none"
}

async function getCount() {
     let student = await fetch(url + "students/count").then(data => data.json());
     let verifiedStudent = await fetch(url + "students/verified-count").then(data => data.json());
     let admin = await fetch(url + "admins/count").then(data => data.json());

     document.querySelector("#noOfAdmins").innerHTML = admin.data || 0
     document.querySelector("#noOfVerifiedStudent").innerHTML = verifiedStudent.data || 0
     document.querySelector("#noOfStudents").innerHTML = student.data || 0
}

//////////////////////////////////////////////////////////////////
//        Student Helpers
//////////////////////////////////////////////////////////////////

function getFields() {
     let record = {};

     record.name = document.querySelector("#name").value;
     record.regNo = document.querySelector("#regNo").value;
     record.email = document.querySelector("#email").value;
     record.faculty = document.querySelector("#faculty").value;
     record.department = document.querySelector("#department").value;
     record.yearOfEntry = document.querySelector("#yearOfEntry").value;
     record.yearOfGrad = document.querySelector("#yearOfGrad").value;
     record.feesStatus = document.querySelector("#feesStatus").value;
     record.gradStatus = document.querySelector("#gradStatus").value;

     return record;
}

function populateFields(record) {
     document.querySelector("#name").value = record.name;
     document.querySelector("#regNo").value = record.regNo;
     document.querySelector("#email").value = record.email;
     document.querySelector("#faculty").value = record.faculty;
     document.querySelector("#department").value = record.department;
     document.querySelector("#yearOfEntry").value = record.yearOfEntry;
     document.querySelector("#yearOfGrad").value = record.yearOfGrad;
     document.querySelector("#feesStatus").value = record.feesStatus;
     document.querySelector("#gradStatus").value = record.gradStatus;
}

//////////////////////////////////////////////////////////////////
//        Admin Helpers
//////////////////////////////////////////////////////////////////

function getAdminFields() {
     let record = {};

     record.name = document.querySelector("#name").value;
     record.email = document.querySelector("#email").value;
     record.password = document.querySelector("#password").value;
     record.canEdit = document.querySelector("#canEdit").value;

     console.log(record)

     return record;
}

function populateAdminFields(record) {
     document.querySelector("#name").value = record.name;
     document.querySelector("#email").value = record.email;
     document.querySelector("#password").value = record.password;
     document.querySelector("#canEdit").value = record.canEdit;
}

//////////////////////////////////////////////////////////////////
//        implement admin CRUD
//////////////////////////////////////////////////////////////////

async function showAdmins() {
     mainLoader.display = "block";
     let adminDivs = "";
     const admins = await getAdmins()

     admins.data.forEach((admin) => {
          adminDivs +=
               `<tr onclick="showAdminModal('${admin._id}')">
                    <td>${admin.name}</td>
                    <td>${admin.email}</td>
                    <td class="${admin.canEdit == 'true' ? 'green' : 'red'}">${admin.canEdit}</td>
               </tr>`;
     });

     document.querySelector("#admins-table").innerHTML = adminDivs;
     mainLoader.display = "none"
}

async function showAdminModal(id) {
     document.querySelector("#modal-bg").style.display = "flex";

     if (id) {
          modalLoader.display = "flex";
          document.querySelector("#addAdmin-but").style.display = "none";
          localStorage.setItem("adminId", id);
          const admin = await getAdmin(id);
          populateAdminFields(admin.data);
          modalLoader.display = "none";
     } else {
          document.querySelector("#editAdmin-but").style.display = "none";
          document.querySelector("#deleteAdmin-but").style.display = "none";
          localStorage.setItem("adminId", "");
          document.querySelector("#name").value = "";
          document.querySelector("#email").value = "";
          document.querySelector("#password").value = "";
          document.querySelector("#canEdit").value = "";
     }
}

function closeAdminModal() {
     document.querySelector("#modal-bg").style.display = "none";
     localStorage.setItem("adminId", "");
     document.querySelector("#addAdmin-but").style.display = "inline-block";
     document.querySelector("#editAdmin-but").style.display = "inline-block";
     document.querySelector("#deleteAdmin-but").style.display = "inline-block";
}

//////////////////////////////////////////////////////////////////
//        implement Student CRUD
//////////////////////////////////////////////////////////////////

async function showStudents() {
     mainLoader.display = "block";
     let studentDivs = "";
     const students = await getStudents()

     students.data.forEach((student, index) => {
          studentDivs +=
               `<tr onclick="showStudentModal('${student._id}')">
          <td>${student.name}</td>
          <td>${student.regNo}</td>
          <td>${student.department}</td>
          <td>${student.faculty}</td>
          <td>${student.yearOfEntry}</td>
          <td>${student.yearOfGrad}</td>
          <td>${(parseInt(student.yearOfGrad) - parseInt(student.yearOfEntry)) * 100}</td>
          <td><img src="img/tick.png" alt="" /></td>
          <td class="${student.feesStatus == 'paid' ? 'green' : 'red'}"> ${student.feesStatus}</td>
          <td class="${student.gradStatus == 'graduated' ? 'green' : 'red'}"> ${student.gradStatus}</td>
          </tr>`;
     });

     document.querySelector("#students-table").innerHTML = studentDivs;
     getCount()
     mainLoader.display = "none"
}

async function showStudentModal(id) {
     document.querySelector("#modal-bg").style.display = "flex";

     if (id) {
          modalLoader.display = "flex";
          document.querySelector("#addStudent-but").style.display = "none";
          localStorage.setItem("studentId", id);
          const student = await getStudent(id);
          populateFields(student.data);
          modalLoader.display = "none";
     } else {
          document.querySelector("#editStudent-but").style.display = "none";
          document.querySelector("#deleteStudent-but").style.display = "none";
          localStorage.setItem("studentId", "");
          document.querySelector("#name").value = "";
          document.querySelector("#regNo").value = "";
          document.querySelector("#email").value = "";
          document.querySelector("#faculty").value = "";
          document.querySelector("#department").value = "";
          document.querySelector("#yearOfEntry").value = "";
          document.querySelector("#yearOfGrad").value = "";
          document.querySelector("#feesStatus").value = "";
          document.querySelector("#gradStatus").value = "";
     }
}

function closeModal() {
     document.querySelector("#modal-bg").style.display = "none";
     localStorage.setItem("studentId", "");
     document.querySelector("#addStudent-but").style.display = "inline-block";
     document.querySelector("#editStudent-but").style.display = "inline-block";
     document.querySelector("#deleteStudent-but").style.display = "inline-block";
}

//////////////////////////////////////////////////////////////////
//        Login
//////////////////////////////////////////////////////////////////

async function login() {
     document.querySelector("button").classList.add("loading")

     const email = document.querySelector("#admin-email").value
     const password = document.querySelector("#admin-password").value

     let result = await fetch(url + "admins/" + "signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
     }).then(data => data.json());

     localStorage.setItem("admin", result.data._id);

     if (result.success == true) window.location.replace("/student/");
}