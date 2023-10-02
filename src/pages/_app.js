import Head from 'next/head';
import '../../styles/globals.css'

const App = (props) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);


  return (
    <>
      <Head>
        <title>heerim</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}

    </>
  );
}
export default App;
