import axios from "axios";
import React from "react";

export default function index(props) {
  let { data, id } = props;
  return (
    <div>
      <h1>{id}</h1>
      <pre>
        {typeof data !== "undefined" &&
          typeof data === "object" &&
          Object.keys(data).length > 0 &&
          Object.entries(data).map(([key, value]) => {
            return (
              <div className="" key={key}>
                <span>{key}</span>
                <span> - </span>
                <span>{value}</span>
              </div>
            );
          })}
      </pre>
    </div>
  );
}

export async function getStaticPaths() {
  let paths = [];
  const url = "https://jsonplaceholder.typicode.com/posts";
  await axios.get(url).then((res) => {
    paths = res.data;
  });

  if (Array.isArray(paths) && paths.length > 0) {
    paths = paths.map((item) => ({
      params: {
        id: `${item?.id}`,
      },
    }));
  }

  return {
    paths: paths ?? [],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  let { id } = context.params;
  let data = null;
  const url = "https://jsonplaceholder.typicode.com/posts";
  
  await axios.get(`${url}/${id}`).then((res) => {
    const isEmpty =
      typeof res?.data === "undefined" &&
      typeof res?.data !== "object" &&
      Object.keys(res?.data).length == 0;

    if (!isEmpty) {
      data = res?.data;
    }
  });
  return {
    props: {
      data: data,
      id: id,
    },
  };
}
