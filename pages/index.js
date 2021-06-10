import React from "react";
import Head from "next/head";
import { getHTMLFromGoogleDocId } from "../lib/googledoc";
import Footer from "../components/Footer";
import ErrorNotPublished from "../components/ErrorNotPublished";
import RenderGoogleDoc from "../components/RenderGoogleDoc";

export async function getStaticProps({ params }) {
  const googleDocId = "1H6bAErQEJfu2y1rzgVhFtwyPAd1IeofX98uCRVJzdKY";
  const page = await getHTMLFromGoogleDocId(googleDocId);

  return {
    props: { page, googleDocId },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every 180 seconds
    revalidate: 180,
  };
}

export default class Home extends React.Component {
  render() {
    const { page, googleDocId } = this.props;
    return (
      <div className="w-full">
        <Head>
          <title>CryptoArt Brussels</title>
          <link rel="icon" href="/favicon.png" />
          <meta
            name="description"
            content="A place in the capital of Europe to bring local artist to the crypto world"
          />
        </Head>

        <main className="max-w-screen-md px-4 mx-auto">
          {!page.body && <p>Loading...</p>}
          {page.body === "not_published" && (
            <ErrorNotPublished googleDocId={googleDocId} />
          )}
          {page.body && <RenderGoogleDoc html={page.body} />}
        </main>

        <Footer googleDocId={googleDocId} />
      </div>
    );
  }
}
