const iname = document.getElementById("name");
const last = document.getElementById("last");
const email = document.getElementById("email");
const password = document.getElementById("password");

const elementsFactory = {
  iname: {
    element: iname,
    label: "First Name",
  },
  last: {
    element: last,
    label: "Last Name",
  },
  email: {
    element: email,
    label: "Email Address",
  },
  password: {
    element: password,
    label: "Password",
  },
};

const elements = Object.keys(elementsFactory);

// Add event listener to the form inputs
elements.forEach((key) => {
  const { element } = elementsFactory[key];
  element.addEventListener("input", () => {
    element.classList.remove("error");
    const prevError = element.nextElementSibling;
    if (prevError && prevError.classList.contains("error-message")) {
      prevError.remove();
    }
  });
});

const isValidEmail = () => {
  const value = email.value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};

const addError = (element, message) => {
  element.classList.add("error");
  element.insertAdjacentHTML(
    "afterend",
    `<p class="error-message">${message}</p>`
  );
};
const validate = () => {
  let isValid = true;
  // remove all error messages
  const prevErrors = document.querySelectorAll(".error-message");
  prevErrors.forEach((error) => error.remove());

  elements.forEach((key) => {
    const { element, label } = elementsFactory[key];
    // check if the element is empty
    if (element.value === "") {
      addError(element, `${label} cannot be empty`);
      isValid = false;
    } else {
      // check if the element is type email
      // and if it is a valid email
      if (key === "email" && !isValidEmail(element.value)) {
        addError(element, "Looks like this is not an email");
        isValid = false;
      } else {
        element.classList.remove("error");
      }
    }
  });

  if (isValid) {
    alert("Form is valid");
  }
};

const button = document.getElementById("submit");
button.addEventListener("click", validate);
