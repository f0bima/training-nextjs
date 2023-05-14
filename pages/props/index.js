import Nav from "../components/nav";

export default function index() {
  const menu = [
    {
      title: "Lorem.",
      link: "/",
    },
    {
      title: "Lorem, ipsum.",
      link: "/csr",
    },
    {
      title: "Lorem, ipsum dolor.",
      link: "/produk/1",
    },
  ];
  return (
    <div>
      <Nav title="Hello John" menus={menu} views={100}/>
    </div>
  );
}
