import React from "react";
import Header from "../components/Header.jsx";
import Image from "next/image.js";
import profilPic from '../picture/profil.png'
import withProtected from "../hoc/withProtected.js";
import useGetValue from "../hook/getValue.js";
import { storage } from "../firebase/firebase.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const profil = () => {
  const user = useGetValue("users");
  const data = Object.values(user.snapshot || {});
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);
  const imageListRef = ref(storage, "profil_Image/");

  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `image/${imageUpload.name + uuidv4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrl((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div>
        <Header title="Profil" />
      </div>
      <div className="lg:flex relative gap-4 p-4">
        <div className="h-fit lg:min-w-fit w-fit m-auto flex flex-col justify-center items-center">
          <div className="bg-blue-400">
            <Image src={profilPic} width={200} height={200} alt="profil_pic" />
          </div>
        </div>
        <div className="w-3/5 bg-white flex-col flex justify-center items-center m-auto rounded-lg border h-fit p-4">
          <div className="w-fit items-center">
            <p className="text-3xl font-bold">Personal Details</p>
          </div>
          <div className="pt-10 flex justify-between mb-2 w-4/5">
            <div className="">
              <p className="text-2xl font-semibold pb-2">Nama</p>
              <p className="text-2xl font-semibold pb-2">Nomor ID</p>
              <p className="text-2xl font-semibold pb-2">Usia</p>
              <p className="text-2xl font-semibold pb-2">Jenis Kelamin</p>
              <p className="text-2xl font-semibold pb-2">Berat Badan</p>
              <p className="text-2xl font-semibold pb-2">Tinggi Badan</p>
              <p className="text-2xl font-semibold pb-2">Tempat Lahir</p>
              <p className="text-2xl font-semibold pb-2">Tanggal Lahir</p>
              <p className="text-2xl font-semibold pb-2">Email</p>
              <p className="text-2xl font-semibold pb-2">Domisili</p>
              <p className="text-2xl font-semibold pb-2">RS Rujukan</p>
            </div>
            <div className="">
              {data.map((item) => {
                return (
                  <div key={item.uid}>
                    <p className="text-2xl pb-2">{item.name}</p>
                    <p className="text-2xl pb-2">{item.nomor_ID}</p>
                    <p className="text-2xl pb-2">{item.usia}</p>
                    <p className="text-2xl pb-2">{item.kelamin}</p>
                    <p className="text-2xl pb-2">{item.berat} kg</p>
                    <p className="text-2xl pb-2">{item.tinggi} cm</p>
                    <p className="text-2xl pb-2">{item.tempat_lahir}</p>
                    <p className="text-2xl pb-2">{item.tanggal_lahir}</p>
                    <p className="text-2xl pb-2">{item.email}</p>
                    <p className="text-2xl pb-2">{item.domisili}</p>
                    <p className="text-2xl pb-2">{item.rujukan}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withProtected(profil);

          {/* {imageUrl.map((event) => {
            return (
              <img
                src={event}
                alt=""
                width={150}
                height={150}
                objectPosition='center bottom'
                style={{borderRadius: '50%'}}
              />
            );
          })}
          <input
            type="file"
            accept="image/"
            onChange={(event) => {
              const file = event.target.files[0];
              if (file && file.type.substring(0, 5) === "image") {
                setImageUpload(file);
              } else {
                setImageUpload(null);
              }
            }}
          /> */}