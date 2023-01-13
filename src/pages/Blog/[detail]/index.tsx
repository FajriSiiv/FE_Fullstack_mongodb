import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById } from "../../../api/blog";

export default function DetailBlog() {
  const { detail } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery("blog", () =>
    getBlogById(detail)
  );

  if (isLoading) {
    return <p>Loading....</p>;
  }
  if (isError) {
    return <p>Error {isError}</p>;
  }
  const backClick = () => {
    navigate(-1);
  };
  return (
    <div className="container mt-20 mx-auto flex flex-col gap-y-3 relative">
      <button
        onClick={backClick}
        className="py-2 px-5 rounded-md bg-rose-500 text-white fixed left-3 top-20"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold text-sky-500">{data.name}</h1>
      <p className="text-emerald-500">Author : {data.author}</p>
      <p className="leading-relaxed">{data.body}</p>
    </div>
  );
}
