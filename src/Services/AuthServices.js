const loginService = async (loginInput) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(loginInput),
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const signupService = async (signupInput) => {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(signupInput),
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export { loginService, signupService };
