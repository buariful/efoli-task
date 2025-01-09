import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    // setError,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log("error->", error);
    }
  };

  return (
    <div className="min-h-screen min-w-full grid place-content-center">
      <div className="mb-5  text-center">
        <h2 className="font-bold mb-2 text-3xl">Login</h2>
        <p>Welcome Back</p>
      </div>
      <div className=" mx-auto  sm:w-[350px] w-full min-w-[250px] p-5 bg-light-beige shadow rounded">
        <form
          className="flex flex-col gap-4 w-full "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-2 block text-start">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="email@example.com"
              required
              {...register("email")}
            />
          </div>
          <div>
            <div className="mb-2 block  text-start">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              placeholder="**********"
              required
              {...register("password")}
            />
          </div>

          <Button type="submit">Submit</Button>

          <p className="text-center ">
            Don&lsquo;t have an account?{" "}
            <Link
              to={"/register"}
              className="text-cyan-700 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
