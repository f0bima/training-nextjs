import { signIn } from "next-auth/react";
import { useState } from "react";

export default function login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const formOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    await signIn("my-credentials", {
      email: formData.email,
      password: formData.password,
    })
      .then((response) => {
        console.log({
          response,
        });
      })
      .catch((err) => {
        console.log({
          err,
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-200 px-28 py-8 text-gray-900">
      <form className="flex flex-col gap-4" action="" onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          id="form-email"
          onChange={formOnChange}
        />
        <input
          type="password"
          name="password"
          id="form-password"
          onChange={formOnChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
