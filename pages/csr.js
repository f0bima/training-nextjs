import CardComponent from "@app/src/components/card.component";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function csr() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState({
    _page: 1,
    _limit: 12,
  });

  const url = "https://jsonplaceholder.typicode.com/posts/";
  const getData = async () => {
    setIsLoading(true);

    await axios
      .get(url, {
        params: {
          ...params,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        //   return [];
      }, 3000);
    setIsLoading(false);

  };

  useEffect(() => {
    console.log("hello");
    // setIsLoading(true);
    getData();
    // setIsLoading(false);
  }, [params]);

  const nextPage = () => {
    setParams({ ...params, _page: params._page + 1 });
  };

  const prevPage = () => {
    // params._page - 1
    setParams({ ...params, _page: params._page - 1 });
  };
  return (
    // <div className="flex justify-center items-center min-h-screen bg-slate-600 px-28">
    <div className="flex justify-center items-center min-h-screen bg-neutral-200 px-28 py-8">
      <div className="my-2">
        <h1 className={`${isLoading ? "block" : "hidden"} text-5xl text-black`}>ISLOADING</h1>
        <div className={isLoading ? "hidden" : "block"}>
          
          <div className="grid grid-cols-4 gap-5">
            {data.map((dt, key) => {
              return (
                <CardComponent
                  key={key}
                  id={dt.id}
                  title={dt.title}
                  description={dt.body}
                  thumbnail="/logo.png"
                />
              );
            })}
          </div>
          <div className="flex justify-center mt-8 gap-4">
            <button
              className="bg-lime-400 rounded-full py-2 px-3 text-gray-600"
              onClick={prevPage}
            >
              {" "}
              Previous Page{" "}
            </button>
            <button
              className="bg-gray-400 rounded-full py-2 px-3"
              onClick={nextPage}
            >
              {" "}
              Next Page{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
