import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/headers";
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <h1>Header </h1>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  //console.log(appContext)
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    const pgProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  // console.log(pgProps)
  // console.log(data)
  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
