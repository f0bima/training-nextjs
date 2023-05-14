import CardComponent from "@app/src/components/card.component";
import axios from "axios";
import React from "react";

export default function ssr(props) {
  const { data, pagination } = props;
  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-200 px-28 py-8">
      <div className="my-2">
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

      {/* <pre>{JSON.stringify(props.data, null, 2)}</pre> */}
    </div>
  );
}

export async function getServerSideProps() {
  const response = await axios
    .get("http://localhost:3000/api/produk")
    .then((result) => {
      console.log(result.data);
      const data = result.data;
      const pagination = result.data.pagination;
      return {
        pagination: {
          limit: pagination?.limit ?? 10,
          skip: pagination?.skip ?? 0,
          total: pagination?.total ?? 0,
        },
        data: data?.data ?? [],
      };
    })
    .catch({
      pagination: {
        limit: 10,
        skip: 0,
        total: 0,
      },
      data: [],
    });
  return {
    // props: {
    //   pagination: {
    //     limit: 10,
    //     skip: 0,
    //     total: 0,
    //   },
    //   data: [],
    // },
    props: {
      ...response,
    },
  };
}
