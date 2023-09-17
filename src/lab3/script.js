function fetchData() {
    fetch("https://randomuser.me/api?results=5")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (let index = 0; index < data.results.length; index++) {
                const result = data.results[index];

                console.log("person" + (index + 1));
                let root = document.getElementById("person" + (index + 1));

                root.getElementsByClassName("image")[0].src = result.picture.large;
                root.getElementsByClassName("city")[0].getElementsByClassName("value")[0].textContent = result.location.city;
                root.getElementsByClassName("email")[0].getElementsByClassName("value")[0].textContent = result.email;
                root.getElementsByClassName("postCode")[0].getElementsByClassName("value")[0].textContent = result.location.postcode;
                root.getElementsByClassName("country")[0].getElementsByClassName("value")[0].textContent = result.location.country;

                document.getElementsByClassName("parent")[0].style.visibility = "visible";
            }
        });
}