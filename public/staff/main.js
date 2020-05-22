const fileReader = new FileReader();
const url = '/api/';
let staffs = [];
let oneStaff;
let modalLoader = document.querySelector('#modal-overlay-loader').style;
let mainLoader = document.querySelector('#main-loader').style;

function init() {
  const path = window.location.pathname;
  if (path == '/staff/') {
    showStaffs();
  } else if (path == '/staff/admin') {
    showAdmins();
  } else {
    console.log('nothing');
  }

  localStorage.setItem('staffId', '');
  localStorage.setItem('adminId', '');
}
window.onload = init;

//////////////////////////////////////////////////////////////////
//       print document
//////////////////////////////////////////////////////////////////

// function print() {
//   console.log('Successful!');
//   const filename = 'ThisIsYourPDFFilename.pdf';

//   html2canvas(document.querySelector('#table-view')).then(canvas => {
//     let pdf = new jsPDF('p', 'mm', 'a4');
//     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 595.28, 841.89);
//     pdf.save(filename);
//   });
// }

// Variant
// This one lets you improve the PDF sharpness by scaling up the HTML node tree to render as an image before getting pasted on the PDF.

// function print(quality = 1) {
//   const filename = 'ThisIsYourPDFFilename.pdf';

//   html2canvas(document.querySelector('#'), { scale: quality }).then(
//     canvas => {
//       let pdf = new jsPDF('p', 'mm', 'a4');
//       pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 595.28, 841.89);
//       pdf.save(filename);
//     }
//   );
// }

(function () {
  var form = $('#table-view'),
    cache_width = form.width(),
    a4 = [795.28, 841.89]; // for a4 size paper width and height

  $('#create_pdf').on('click', function () {
    $('body').scrollTop(0);
    createPDF();
  });
  //create pdf
  function createPDF() {
    getCanvas().then(function (canvas) {
      var img = canvas.toDataURL('image/png'),
        doc = new jsPDF({
          unit: 'px',
          orientation: 'landscape',
          format: 'a4',
        });
      doc.addImage(img, 'JPEG', 40, 20);
      doc.save('Aguluzigbo-population-data.pdf');
      form.width(cache_width);
    });
  }

  // create canvas object
  function getCanvas() {
    form.width(a4[0] * 1.33333 - 80).css('max-width', 'none');
    return html2canvas(form, {
      imageTimeout: 2000,
      removeContainer: true,
    });
  }
})();

/*
 * jQuery helper plugin for examples and tests
 */

(function ($) {
  $.fn.html2canvas = function (options) {
    var date = new Date(),
      $message = null,
      timeoutTimer = false,
      timer = date.getTime();
    html2canvas.logging = options && options.logging;
    html2canvas.Preload(
      this[0],
      $.extend(
        {
          complete: function (images) {
            var queue = html2canvas.Parse(this[0], images, options),
              $canvas = $(html2canvas.Renderer(queue, options)),
              finishTime = new Date();

            $canvas
              .css({ position: 'absolute', left: 0, top: 0 })
              .appendTo(document.body);
            $canvas.siblings().toggle();

            $(window).click(function () {
              if (!$canvas.is(':visible')) {
                $canvas.toggle().siblings().toggle();
                throwMessage('Canvas Render visible');
              } else {
                $canvas.siblings().toggle();
                $canvas.toggle();
                throwMessage('Canvas Render hidden');
              }
            });
            throwMessage(
              'Screenshot created in ' +
                (finishTime.getTime() - timer) / 1000 +
                ' seconds<br />',
              4000
            );
          },
        },
        options
      )
    );

    function throwMessage(msg, duration) {
      window.clearTimeout(timeoutTimer);
      timeoutTimer = window.setTimeout(function () {
        $message.fadeOut(function () {
          $message.remove();
        });
      }, duration || 2000);
      if ($message) $message.remove();
      $message = $('<div ></div>')
        .html(msg)
        .css({
          margin: 0,
          padding: 10,
          background: '#000',
          opacity: 0.7,
          position: 'fixed',
          top: 10,
          right: 10,
          fontFamily: 'Tahoma',
          color: '#fff',
          fontSize: 12,
          borderRadius: 12,
          width: 'auto',
          height: 'auto',
          textAlign: 'center',
          textDecoration: 'none',
        })
        .hide()
        .fadeIn()
        .appendTo('body');
    }
  };
})(jQuery);

//////////////////////////////////////////////////////////////////
//       Login Show password
//////////////////////////////////////////////////////////////////

function myFunction() {
  var showPassword = document.getElementById('admin-password');
  if (showPassword.type === 'password') {
    showPassword.type = 'text';
  } else {
    showPassword.type = 'password';
  }
}

//////////////////////////////////////////////////////////////////
//        Staff CRUD
//////////////////////////////////////////////////////////////////

async function getStaffs() {
  let staffs = await fetch(url + 'staffs').then((data) => data.json());
  return staffs;
}

async function getStaff(id) {
  let staff = await fetch(url + 'staffs/' + id).then((data) => data.json());
  return staff;
}

async function deleteStaff() {
  modalLoader.display = 'flex';
  const id = localStorage.getItem('staffId');
  await fetch(url + 'staffs/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('admin'),
    },
  });
  closeModal();
  showStaffs();
  modalLoader.display = 'none';
}

async function editStaff() {
  modalLoader.display = 'flex';
  const id = localStorage.getItem('staffId');
  let staff = getFields();

  fileReader.onload = async function () {
    staff.img = fileReader.result || oneStaff.data.img;
    await fetch(url + 'staffs/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('admin'),
      },
      body: JSON.stringify(staff),
    });
  };

  if (staff.img) {
    fileReader.readAsDataURL(staff.img);
    console.log('yehh');
  }

  populateFields(staff);
  showStaffs();
  modalLoader.display = 'none';
}

async function addStaff() {
  modalLoader.display = 'flex';
  let staff = getFields();

  fileReader.onload = async function () {
    staff.img = fileReader.result;
    staff = await fetch(url + 'staffs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('admin'),
      },
      body: JSON.stringify(staff),
    });
  };

  if (staff.img) {
    fileReader.readAsDataURL(staff.img);
    console.log('yehh');
  }

  closeModal();
  showStaffs();
  modalLoader.display = 'none';
}

async function getCount() {
  let staff = await fetch(url + 'staffs/count').then((data) => data.json());
  let admin = await fetch(url + 'admins/count').then((data) => data.json());

  document.querySelector('#noOfAdmins').innerHTML = admin.data;
  document.querySelector('#noOfStaffs').innerHTML = staff.data;
}

//////////////////////////////////////////////////////////////////
//        search
//////////////////////////////////////////////////////////////////

function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  table = document.getElementById('table-view');
  tr = table.getElementsByTagName('tr');

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}

//////////////////////////////////////////////////////////////////
//        Admin CRUD
//////////////////////////////////////////////////////////////////

async function getAdmins() {
  let admins = await fetch(url + 'admin').then((data) => data.json());
  return admins;
}

async function getAdmin(id) {
  let admin = await fetch(url + 'admin/' + id).then((data) => data.json());
  return admin;
}

async function deleteAdmin() {
  modalLoader.display = 'flex';
  const id = localStorage.getItem('adminId');
  await fetch(url + 'admin/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('admin'),
    },
  });
  closeAdminModal();
  showAdmins();
  modalLoader.display = 'none';
}

async function editAdmin() {
  modalLoader.display = 'flex';
  const id = localStorage.getItem('adminId');
  let admin = getAdminFields();
  await fetch(url + 'admin/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('admin'),
    },
    body: JSON.stringify(admin),
  });
  populateAdminFields(admin);
  showAdmins();
  modalLoader.display = 'none';
}

async function addAdmin() {
  modalLoader.display = 'flex';
  let admin = getAdminFields();
  admin = await fetch(url + 'admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('admin'),
    },
    body: JSON.stringify(admin),
  });
  closeAdminModal();
  showAdmins();
  modalLoader.display = 'none';
}

async function getCount() {
  let staff = await fetch(url + 'staffs/count').then((data) => data.json());
  let verifiedStaff = await fetch(url + 'staffs/verified-count').then((data) =>
    data.json()
  );
  let admin = await fetch(url + 'admin/count').then((data) => data.json());

  document.querySelector('#noOfAdmins').innerHTML = admin.data || 0;
  document.querySelector('#noOfVerifiedStaff').innerHTML =
    verifiedStaff.data || 0;
  document.querySelector('#noOfStaffs').innerHTML = staff.data || 0;
}

//////////////////////////////////////////////////////////////////
//        Staff Helpers
//////////////////////////////////////////////////////////////////

function getFields() {
  let record = {};

  record.img = document.querySelector('#img').files[0];
  record.name = document.querySelector('#name').value;
  record.phone = document.querySelector('#phone').value;
  record.email = document.querySelector('#email').value;
  record.address = document.querySelector('#address').value;
  record.unit = document.querySelector('#unit').value;
  record.employmentStatus = document.querySelector('#employmentStatus').value;
  record.level = document.querySelector('#level').value;

  return record;
}

function populateFields(record) {
  document.querySelector('#modalImg').setAttribute('src', `${record.img}`);
  document.querySelector('#name').value = record.name;
  document.querySelector('#email').value = record.email;
  document.querySelector('#phone').value = record.phone;
  document.querySelector('#address').value = record.address;
  document.querySelector('#unit').value = record.unit;
  document.querySelector('#employmentStatus').value = record.employmentStatus;
  document.querySelector('#level').value = record.level;
}

//////////////////////////////////////////////////////////////////
//        Admin Helpers
//////////////////////////////////////////////////////////////////

function getAdminFields() {
  let record = {};

  record.name = document.querySelector('#name').value;
  record.email = document.querySelector('#email').value;
  record.password = document.querySelector('#password').value;
  record.canEdit = document.querySelector('#canEdit').value;

  return record;
}

function populateAdminFields(record) {
  document.querySelector('#name').value = record.name;
  document.querySelector('#email').value = record.email;
  document.querySelector('#password').value = record.password;
  document.querySelector('#canEdit').value = record.canEdit;
}

//////////////////////////////////////////////////////////////////
//        implement admin CRUD
//////////////////////////////////////////////////////////////////

async function showAdmins() {
  mainLoader.display = 'block';
  let adminDivs = '';
  const admins = await getAdmins();

  admins.data.forEach((admin) => {
    adminDivs += `<tr onclick="showAdminModal('${admin._id}')">
                    <td>${admin.name}</td>
                    <td>${admin.email}</td>
                    <td class="${admin.canEdit == 'true' ? 'green' : 'red'}">${
      admin.canEdit
    }</td>
               </tr>`;
  });

  document.querySelector('#admins-table').innerHTML = adminDivs;
  mainLoader.display = 'none';
}

async function showAdminModal(id) {
  document.querySelector('#modal-bg').style.display = 'flex';

  if (id) {
    modalLoader.display = 'flex';
    document.querySelector('#addAdmin-but').style.display = 'none';
    localStorage.setItem('adminId', id);
    const admin = await getAdmin(id);
    populateAdminFields(admin.data);
    modalLoader.display = 'none';
  } else {
    document.querySelector('#editAdmin-but').style.display = 'none';
    document.querySelector('#deleteAdmin-but').style.display = 'none';
    localStorage.setItem('adminId', '');
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#password').value = '';
    document.querySelector('#canEdit').value = '';
  }
}

function closeAdminModal() {
  document.querySelector('#modal-bg').style.display = 'none';
  localStorage.setItem('adminId', '');
  document.querySelector('#addAdmin-but').style.display = 'inline-block';
  document.querySelector('#editAdmin-but').style.display = 'inline-block';
  document.querySelector('#deleteAdmin-but').style.display = 'inline-block';
}

//////////////////////////////////////////////////////////////////
//        implement Staff CRUD
//////////////////////////////////////////////////////////////////

async function showStaffs() {
  mainLoader.display = 'block';
  let staffDivs = '';
  const staffs = await getStaffs();

  staffs.data.forEach((staff, index) => {
    staffDivs += `<tr onclick="showStaffModal('${staff._id}')">
                    <td> <img src="${staff.img}"> ${staff.name}</td>
                    <td>${staff.email}</td>
                    <td>${staff.phone}</td>
                    <td>${staff.address}</td>
                    <td>${staff.unit}</td>
                    <td class="${
                      staff.employmentStatus == 'indigene' ? 'green' : 'red'
                    }"> ${staff.employmentStatus}</td>
                    <td>${staff.level}</td>
               </tr>`;
  });

  document.querySelector('#staffs-table').innerHTML = staffDivs;
  getCount();
  mainLoader.display = 'none';
}

async function showStaffModal(id) {
  document.querySelector('#modal-bg').style.display = 'flex';

  if (id) {
    modalLoader.display = 'flex';
    document.querySelector('#addStaff-but').style.display = 'none';
    localStorage.setItem('staffId', id);
    oneStaff = await getStaff(id);
    populateFields(oneStaff.data);
    modalLoader.display = 'none';
  } else {
    document.querySelector('#editStaff-but').style.display = 'none';
    document.querySelector('#deleteStaff-but').style.display = 'none';
    localStorage.setItem('staffId', '');
    document.querySelector('#name').value = '';
    document.querySelector('#phone').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#address').value = '';
    document.querySelector('#unit').value = '';
    document.querySelector('#employmentStatus').value = '';
    document.querySelector('#level').value = '';
  }
}

function closeModal() {
  document.querySelector('#modal-bg').style.display = 'none';
  localStorage.setItem('staffId', '');
  document.querySelector('#addStaff-but').style.display = 'inline-block';
  document.querySelector('#editStaff-but').style.display = 'inline-block';
  document.querySelector('#deleteStaff-but').style.display = 'inline-block';
}

//////////////////////////////////////////////////////////////////
//        Login
//////////////////////////////////////////////////////////////////

async function login() {
  document.querySelector('button').classList.add('loading');

  const email = document.querySelector('#admin-email').value;
  const password = document.querySelector('#admin-password').value;

  let result = await fetch(url + 'admin/' + 'signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then((data) => data.json());

  localStorage.setItem('admin', result.data._id);

  if (result.success == true) window.location.replace('/staff/');
}
