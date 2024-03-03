export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);

export const ERROR_MESSAGE = {
  password_regex:
    'A password must be have lowercase, UPPERCASE, a number and special characters.',
};
