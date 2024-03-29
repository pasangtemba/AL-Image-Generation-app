import React from "react";
import { useState } from "react";
// import { useNavigation } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  // const navigate = useNavigation();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false);
  const [generateingImg, setGeneratingImg] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = (e) => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const genetrateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        console.log(data.photo);
        setForm({ ...form, photo: data.photo });
      } catch (error) {
        console.log(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",

          body: JSON.stringify(form),
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }

      const data = await response.json();
    }

    return (
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-extrablod text-[#22328] text-[32px]">Create</h1>
          <p className="mt-2 text-[66e75] text-[16px] max-w[500px]">
            Create imaginative and visitually stunning image through DALL-E AI
            and share them with the community{" "}
          </p>
        </div>
        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your name"
              name="name"
              type="text"
              placeholder="  Pasang Temba Sherpa"
              value={form.name}
              handleChange={handleChange}
            />
            <FormField
              labelName="Prompt"
              name="prompt"
              type="text"
              placeholder="a painting of a fox in the style of Starry Night"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <div
              className=" relatively bg-gray-50 border border-gray-300 text-gray-900
    text-sm rounded-lg focus:ring-blue-500 focus-border-blue-500 focus-border-blue-500 w-64 p-3
     h-64 flex justify-center items-center"
            >
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-container"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              )}
              {generateingImg && (
                <div
                  className="absolute inset-0 z-0 flex justify-center
        items-center bg-[rgba(0,0,0,0.5)] rounded-lg"
                >
                  <Loader />
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 flex gap-5">
            <button
              type="buttom"
              onClick={genetrateImage}
              className="text-white bg-green-700 font-medium rounded-md
    text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {generateingImg ? "Generating..." : "Generate"}
            </button>
          </div>
          <div className="mt-10">
            <p className=" mt-2 text-[#666e75] text-[14px] ">
              Once you have created the image you want , you can share it with
              others in the community
            </p>
            <button
              type="submit"
              className=" mt-3 text-white bg-blue-700 text-small rounded-md
   w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? "sharing..." : " share with the community"}
            </button>
          </div>
        </form>
      </section>
    );
  };
};
export default CreatePost;
