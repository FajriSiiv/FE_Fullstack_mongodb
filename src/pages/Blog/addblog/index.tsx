import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { addBlog } from "../../../api/blog";

export default function AddBlog() {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const addBlogMutation = useMutation(addBlog, {
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const updateBlog = (e: React.FormEvent) => {
    e.preventDefault();

    addBlogMutation.mutate({
      name: name,
      body: body,
    });

    navigate(-1);
  };

  return (
    <div className="container mx-auto relative mt-10">
      <p className="text-4xl font-bold uppercase text-center">Edit Blog</p>
      <form
        onSubmit={updateBlog}
        className="flex flex-col gap-y-2 max-w-[500px] mx-auto"
      >
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="font-semibold">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="p-2 border-2 rounded-md"
            placeholder="Name"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="font-semibold">
            Body
          </label>
          <textarea
            name=""
            id=""
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="p-2 rounded-md border-2"
          ></textarea>
        </div>
        <button
          className="py-2 w-full bg-emerald-400 text-white rounded-md"
          type="submit"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
