// /**
//  *
//  * @param {Object} props
//  * @param {(String|null)} props.logo
//  * @param {(String|null)} props.title
//  * @param {Object} props.menus

import Link from "next/link";

//  */
export default function NavbarComponent(props) {
  const { logo, title, menus } = props;
  return (
    <header className="fixed w-full flex justify-around items-center bg-slate-500 shadow-lg shadow-slate-400 h-12">
      <div className="flex gap-5">{
        logo !== null &&
        <img className="w-8 h-8 object-cover" src={logo} alt="MyLogo" />
      }
        <h1>{title}</h1>
      </div>

      <ul className="flex justify-center items-center gap-10 h-full">
        {menus.map((menu, idx) => {
          return (
            <li key={idx}>
              <Link
                className="bg-lime-300 px-4 rounded-full py-1 text-gray-700 hover:bg-gray-700 hover:text-lime-300"
                href={menu.link}
              >
                {menu.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
