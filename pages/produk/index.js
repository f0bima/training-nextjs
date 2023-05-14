import CardComponent from "@app/src/components/card.component";
import axios from "axios";
import { array } from "prop-types";
import { useEffect, useState } from "react";

export default function index() {
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState({ page: 1, limit: 12 });

  const getData = async () => {
    setIsloading(true);

    await axios.get("http://localhost:3000/api/produk").then((response) => {
      if (response?.data && Array.isArray(response?.data?.data)) {
        setData([...response?.data?.data]);
        setIsloading(false);
      } else {
        setData([]);
        setIsloading(false);
      }
    });
  };
  useEffect(() => {
    getData();
  },[]);

  const nextPage = () => {
    setParams({ ...params, page: params.page + 1 });
  };

  const prevPage = () => {
    // params._page - 1
    setParams({ ...params, page: params.page - 1 });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-200 px-28 py-8">
      <div className="my-2">
        <h1 className={`${isLoading ? "block" : "hidden"} text-5xl text-black`}>
          ISLOADING
        </h1>
        <div className={isLoading ? "hidden" : "block"}>
          <div className="grid grid-cols-4 gap-5">
            {data.map((dt, key) => {
              return (
                <CardComponent
                  key={key}
                  id={dt.id}
                  title={dt.title}
                  description={dt.description}
                  thumbnail={dt.thumbnail}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* <pre>{JSON.stringify(props.data, null, 2)}</pre> */}
    </div>
  );
}
