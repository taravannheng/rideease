export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/;
// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
export const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
export const emptyRegex = /([^\s]*)/;
//https://stackoverflow.com/questions/2249460/how-to-use-javascript-regex-to-check-for-empty-form-fields

export const checkEmail = (value: string) => {
  return emailRegex.test(String(value).toLowerCase());
}

export const checkPassword = (value: string) => {
  return passwordRegex.test(value);
}

export const checkEmpty = (value: string) => {
  return emptyRegex.test(value);
}