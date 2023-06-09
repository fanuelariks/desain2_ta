import React, { useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import PassToggle from "../components/PassToggle";
import FormError from "../components/Error";
import { useForm } from "react-hook-form";
import { SignUp, GetSignUpErrorMessages } from "../firebase/firebase";
import { Button, CircularProgress } from "@mui/material";
import withUnprotected from "../hoc/withUnprotected";

const Registrasi = () => {
  // console.log(firebaseSDK)
  const [isLoading, setIsLoading] = useState(false);
  const [PassInputType, ToggleIcon] = PassToggle();
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password");
  // console.log({pass: password.current})

  const onSubmit = async (values) => {
    setIsLoading(true)
    const {email, password} = values
    try {
      await SignUp(email, password)
    } catch (error) {
      const message = GetSignUpErrorMessages(error.code)
      setIsLoading(false)
      console.log(message)
    }
  };

  return (
    <>
      <Head>
        <title>Registrasi</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center w-full flex-1 text-center">
        <div className="flex justify-center p-6">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Siloam_Hospitals.svg"
            width={200}
            height={200}
          />
        </div>
        <div className="bg-green-400 rounded-2xl shadow-2xl flex flex-col justify-center items-center lg:w-2/3 lg:max-w-4xl w-3/4 ">
          <div className="text-white p-5 text-md font-medium">
            <h2 className="text-3xl font-bold mb-2">Selamat Datang</h2>
            <div className="border-2 border-white w-28 inline-block mb-2"></div>
            <p className="mb-5 text-lg font-medium">
              Silakan registrasi data diri anda
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between lg:max-w-4xl">
              {/* Form Kiri */}
              <div className="flex flex-col items-center mb-20 mx-4">
                <div className="text-left">
                  <p className="text-gray-100 flex-1 outline-none">Nama</p>
                  <div className="bg-gray-100 lg:w-64 w-48 p-3 mb-2 mt-2 flex items-center">
                    <input
                      type="text"
                      name="nama"
                      placeholder="Masukkan nama anda"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      {...register("name", { required: true })}
                    />
                  </div>
                  <FormError error={errors.name} />
                </div>
                {/* <FormError error={errors.email} /> */}
                <div className="text-left mt-4">
                  <p className="text-gray-100 flex-1 outline-none">Email</p>
                  <div className="bg-gray-100 lg:w-64 w-48 p-3 mb-2 mt-2 flex items-center">
                    <input
                      type="email"
                      name="email"
                      placeholder="Masukkan email anda"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      {...register("email", { required: true })}
                    />
                  </div>
                  <FormError error={errors.email} />
                </div>
                {/* <FormError error={errors.password} /> */}
                {/* <div className="text-left">
                  <p className="text-gray-100 text-sm flex-1 outline-none">
                    Tanggal Lahir
                  </p>
                  <div className="bg-gray-100 lg:w-64 w-48 p-3 mt-4 flex items-center">
                    <input
                      type="date"
                      name="tanggalLahir"
                      placeholder="Tanggal Lahir"
                      className="bg-gray-100 outline-none text-sm flex-1 text-gray-500"
                      // {...register("password", { required: true, minLength: 8 })}
                    />
                  </div>
                </div> */}
              </div>
              {/* Form Tengah */}
              <div className="flex flex-col items-center mb-20 mx-4">
                <div className="text-left">
                  <p className="text-gray-100 flex-1 outline-none">Password</p>
                  <div className="bg-gray-100 lg:w-64 w-48 p-3 mb-2 mt-2 flex items-center">
                    <input
                      type="password"
                      name="pass"
                      placeholder="Masukkan password anda"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      {...register("password", {
                        required: true,
                        minLength: 8,
                      })}
                    />
                  </div>
                  <FormError error={errors.password} />
                </div>
                {/* <FormError error={errors.password} /> */}
                <div className="text-left mt-4">
                  <p className="text-gray-100 flex-1 outline-none">
                    Konfirmasi Password
                  </p>
                  <div className="bg-gray-100 lg:w-64 w-48 p-3 mb-2 mt-2 flex items-center">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Konfirmasi password anda"
                      className="bg-gray-100 outline-none text-sm flex-1 text-gray-500"
                      {...register("ConfirmPassword", {
                        required: true,
                        minLength: 8,
                        validate: (value) => value === password.current,
                      })}
                    />
                  </div>
                  <FormError error={errors.ConfirmPassword} />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="border-2 text-white bg-yellow-400 w-1/3  justify-center font-semibold rounded-full px-10 py-2 mb-10"
              variant="contained"
              disabled={isLoading}
            >
              {isLoading && <CircularProgress size={24} sx={{ mr: 1 }} />}
              Daftar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default withUnprotected(Registrasi);
