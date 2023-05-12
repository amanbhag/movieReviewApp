const isValidEmail = (email) => {
  const validateUserInfo = ({ name, email, password }) => {
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if (!isValidEmail.test(email))
      return { ok: false, error: "Invalid email!" };

    return { ok: true };
  };
};
