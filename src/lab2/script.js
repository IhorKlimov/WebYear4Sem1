function validate() {
    const name = document.forms["person"]["name"].value;
    const group = document.forms["person"]["group"].value;
    const idCard = document.forms["person"]["idCard"].value;
    const dateOfBirth = document.forms["person"]["dateOfBirth"].value;
    const email = document.forms["person"]["email"].value;

    let hasError = false;

    if (!/^[А-Яа-яёЁЇїІіЄєҐґ]+\s[А-Яа-яёЁЇїІіЄєҐґ]\.[А-Яа-яёЁЇїІіЄєҐґ]\.$/i.test(name)) {
        document.getElementById('nameLabel').classList.add("error");
        hasError = true;
    } else {
        document.getElementById('nameLabel').classList.remove("error");
    }

    if (!/^[А-Яа-яёЁЇїІіЄєҐґ]{2}-[\d]{2}$/i.test(group)) {
        document.getElementById('groupLabel').classList.add("error");
        hasError = true;
    } else {
        document.getElementById('groupLabel').classList.remove("error");
    }

    if (!/^[№][\d]{6}$/i.test(idCard)) {
        document.getElementById('idCardLabel').classList.add("error");
        hasError = true;
    } else {
        document.getElementById('idCardLabel').classList.remove("error");
    }

    if (!/^\d\d\.\d\d\.\d\d\d\d$/i.test(dateOfBirth)) {
        document.getElementById('dateOfBirthLabel').classList.add("error");
        hasError = true;
    } else {
        document.getElementById('dateOfBirthLabel').classList.remove("error");
    }

    if (!/^[А-Яа-яёЁЇїІіЄєҐґA-Za-z]+@[А-Яа-яёЁЇїІіЄєҐґA-Za-z]+\.com$/i.test(email)) {
        document.getElementById('emailLabel').classList.add("error");
        hasError = true;
    } else {
        document.getElementById('emailLabel').classList.remove("error");
    }

    if (!hasError) {
        alert("ПІБ: " + name + "\nГрупа: " + group + "\nID-card: " + idCard + "\nДата народж.: " + dateOfBirth + "\ne-mail: " + email);
    }

    return false;
}