import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useQuery } from "react-query";
import { getBlog } from "../../api/blog";

export default function Blog() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const dataBlog = await getBlog();
    setData(dataBlog);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-4xl font-bold text-center">All Blog</h1>

      <div className="flex flex-wrap mt-10 gap-y-5">
        {data &&
          data?.map((blog: any) => (
            <div className="w-1/3 h-[250px]" key={blog._id}>
              <div className="w-[95%] h-full justify-between  mx-auto flex flex-col gap-y-2 border-2 p-3 rounded-md">
                <h2 className="text-lg font-semibold">{blog.name}</h2>
                <p className="h-2/3">{blog.body}</p>
                <p className="mt-4 text-opacity-70">{blog.author}</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/blog/detail/${blog._id}`}
                    className="text-sm text-sky-600"
                  >
                    Lihat Blog
                  </Link>
                  <p className="text-sm">{moment(Date()).fromNow(true)}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
