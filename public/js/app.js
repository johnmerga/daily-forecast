console.log("Client side JS is running");

const weatherForm = document.querySelector("form");
//
const search = document.querySelector("input");
const data_1 = document.querySelector("#data_1");
const data_2 = document.querySelector("#data_2");
//

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  if (!location) {
     data_1.textContent = "please provide an address"
  }
  data_1.textContent = "Loading..";
  data_2.textContent = "";
  fetch("/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          // return console.log(data.error);
          data_1.textContent = data.error;
        } else {
          data_1.textContent = data.location;
          data_2.textContent = data.foreCastData;
        }
      });
    }
  );
});
