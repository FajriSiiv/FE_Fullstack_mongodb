import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById, updateBlog } from "../../../api/blog";

export default function EditBlog() {
  const { editId }: any = useParams();
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchData = async () => {
    const res = await getBlogById(editId);
    setData(res);
    setName(res.name);
    setBody(res.body);
  };

  const updateBlogMutation = useMutation(updateBlog, {
    onSuccess: () => {
      navigate("/dashboard");
      queryClient.invalidateQueries("blog");
    },
  });

  const btnUpdateBlog = (e: React.FormEvent) => {
    e.preventDefault();

    updateBlogMutation.mutate({
      ...data,
      name: name,
      body: body,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const backClick = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto relative mt-10">
      <p className="text-4xl font-bold uppercase text-center">Edit Blog</p>
      <button
        onClick={backClick}
        className="py-2 px-5 rounded-md bg-rose-500 text-white fixed left-3 top-20"
      >
        Back
      </button>
      <form
        onSubmit={btnUpdateBlog}
        className="flex flex-col gap-y-2 max-w-[500px] mx-auto"
      >
        <div className="flex flex-col gap-y-1">
          <label className="font-semibold">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="p-2 border-2 rounded-md"
            placeholder="Name"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="font-semibold">Body</label>
          <textarea
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
