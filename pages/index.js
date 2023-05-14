import CardComponent from "@app/src/components/card.component";
import axios from "axios";

export default function index(props) {
  console.log(props.data);
  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-200 px-28 py-8">
      <div className="grid grid-cols-4 gap-5">
        {props.data.map((dt, key) => {
          return (
            <CardComponent key={key}
              id={dt.id}
              title={dt.title}
              description={dt.body}
              thumbnail="/logo.png"
            />
          );
        })}
      </div>

      {/* <pre>{JSON.stringify(props.data, null, 2)}</pre> */}
    </div>
  );
}

export async function getServerSideProps() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const data = await axios
    .get(url)
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return {
    props: {
      data: data,
    },
  };
}
