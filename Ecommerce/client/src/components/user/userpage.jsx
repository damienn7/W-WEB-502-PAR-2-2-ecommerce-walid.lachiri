const id = localStorage.getItem("id");
axios
      .get("http://localhost:8000/api/users/id")
      .then((response) => {
        console.log(response);
      })