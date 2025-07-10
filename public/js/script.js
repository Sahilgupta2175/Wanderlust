// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})();

let taxSwitch = document.getElementById('flexSwitchCheckDefault');

taxSwitch.addEventListener('click', () => {
    let taxInfo = document.getElementsByClassName('tax-info');
  
    for(info of taxInfo) {
        info.style.display = taxSwitch.checked ? 'inline' : 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    const searchForm = searchInput.form;
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') window.location.href = '/listings';
    });

    if (searchForm) {
        searchForm.addEventListener('submit', e => {
            if (searchInput.value.trim() === '') {
                e.preventDefault();
                window.location.href = '/listings';
            }
        });
    }
});