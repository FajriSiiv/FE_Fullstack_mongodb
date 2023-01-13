import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getBlog, deleteBlog } from "../../api/blog";
import { blog } from "../../data/blog";

interface Blog {
  name: string;
  body: string;
  author: string;
  _id: string;
}

export default function Dashboard() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const dataBlog = await getBlog();
    setData(dataBlog);
  };

  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      fetchData();
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const deleteBlogs = (id: any) => {
    deleteBlogMutation.mutate({ id: id });
  };

  return (
    <div className="container mx-auto h-fit relative ">
      <Link to={"/addblog"} className="w-">
        <p className="text-sm text-white bg-emerald-400 py-3 px-5 rounded-md mt-3 w-fit">
          Add Blog
        </p>
      </Link>
      <div className="border-8 border-dashed border-emerald-100 flex flex-wrap mt-10  gap-y-5 p-5 rounded-lg">
        {data &&
          data?.map((blogs: any) => (
            <div className="w-1/3 h-[250px]" key={blogs._id}>
              <div className="w-[95%] h-full justify-between mx-auto flex flex-col gap-y-2 border-2 p-3 rounded-md">
                <h2 className="text-lg font-semibold">{blogs.name}</h2>
                <p className="h-2/3">{`${blogs.body}`.substring(0, 100)}</p>
                <p className="mt-4 text-opacity-70">{blogs.author}</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/blog/detail/${blogs._id}`}
                    className="text-sm text-sky-600"
                  >
                    Lihat Blogs
                  </Link>
                  <Link
                    to={`/blog/edit/${blogs._id}`}
                    className="text-sm text-rose-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteBlogs(blogs._id)}
                    className="text-sm text-white bg-rose-600 py-1 px-3 rounded-md"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
