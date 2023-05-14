import { useState } from "react";

/**
 *
 * @param {Object} props
 * @param {number} props.id
 * @param {String} props.thumbnail
 * @param {String} props.title
 * @param {String} props.description
 * @returns
 */
export default function CardComponent(props) {
  const { id, thumbnail, title, description } = props;
  const [isLoading, setIsLoading] = useState(false);
  const addToCard = () => {
    console.log("Add To Card");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    clearTimeout();
  };
  return (
    <section className="flex flex-col justify-between bg-white shadow-2xl shadow-slate-400 rounded-2xl app-card overflow-hidden">
      <div className="app-card-img">
        <img
          src={thumbnail}
          alt="thumbnail-card"
          className="card-img__images aspect-video object-cover"
        />
      </div>
      <div className="p-3 flex h-40 flex-col justify-between">
        <div className="overflow-hidden">
          <h3 className="text-danger truncate text-lg font-bold">{title}</h3>
          <p className="text-sm font-light text-justify text-gray-700">{description}</p>
        </div>
        <div className="mt-5">
          <button
            onClick={addToCard}
            className="bg-lime-500 w-full rounded-2xl py-2"
          >
            {isLoading ? "Loading" : "Add To Card"}
          </button>
        </div>
      </div>
    </section>
  );
}
