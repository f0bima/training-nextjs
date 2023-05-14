import NavbarComponent from "@app/src/components/navbar";
import "@app/styles/globals.css";
import "@app/styles/sass/main.scss";
import { getSession, SessionProvider } from "next-auth/react";

export default function App(props) {
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
  const logo =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/2048px-BMW_logo_%28gray%29.svg.png";
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;
  return (
    <SessionProvider session={session}>
      <main className="app-main relative">
        <NavbarComponent title="Hello John" menus={menu} logo="/logo.png" />
        <div className="pt-12">
          <Component {...pageProps} />
        </div>
      </main>
    </SessionProvider>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  const session = await getSession(ctx);

  pageProps = {
    ...pageProps,
    session,
  };
  return {
    pageProps,
  };
};
