import PropTypes from "prop-types";

export default function Nav(props) {
  const { title, menus, views } = props;
  return (
    <div className="flex justify-around items-center bg-slate-500 h-12">
      <div className="flex gap-5">
        <h1>{title}</h1>
        <p>{views + 1000}</p>
      </div>

      <ul className="flex justify-center items-center gap-10 h-full">
        {menus.map((menu, idx) => {
          return (
            <li key={idx}>
              <a
                className="bg-lime-300 px-4 rounded-full py-1 text-gray-700 hover:bg-gray-700 hover:text-lime-300"
                href={menu.link}
              >
                {menu.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Nav.prototype = {
  title: PropTypes.string.isRequired,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
  views: PropTypes.number,
};

Nav.defaultProps = {
  title: "Hello",
  menus: [
    {
      title: "hello",
      link: "/",
    },
  ],
  views: 0,
};
