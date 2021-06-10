import Head from "next/head";
import { getHTMLFromGoogleDocId } from "../lib/googledoc";
import Footer from "../components/Footer";
import ErrorNotPublished from "../components/ErrorNotPublished";
import RenderGoogleDoc from "../components/RenderGoogleDoc";

const defaultValues = {
  title: "CryptoArt Brussels",
  description:
    "A place in the capital of Europe to bring local artist to the crypto world",
  image: "https://cryptoart.brussels/cryptoartbrussels-logo.webp",
};

const pages = {
  events: {
    title: "CryptoArt Brussels - Events",
    description:
      "Join us to learn about crypto(art) and meet like minded people.",
    googleDocId: "1H0n2eCaOIzR_cSVmbqUv03uewb5z0AYZB1dGF7b5G7o",
  },
  about: { googleDocId: "157PTpLzlBRSafb910POsk1b6CFNEBDqPCl8kzuKvycM" },
  resources: {
    title: "CryptoArt Brussels - resources",
    description:
      "Reading list, podcasts and other resources to learn about crypto(art)",
    googleDocId: "1IWkopTJeulOHu1FEaj8xtbHoZrR1zZmbZQZAQOSwOlQ",
  },
  collection: {
    description: "NFT minted by the CryptoArt Brussels community",
    googleDocId: "1bO1TO5MbWMNfYJqe0jP2ywetRPij8MTAFfTJevqG_Co",
  },
};

export async function getStaticPaths() {
  const paths = [];
  Object.keys(pages).forEach((key) => {
    paths.push({
      params: {
        googleDocId: pages[key].googleDocId,
      },
    });
    paths.push({
      params: {
        googleDocId: key,
      },
    });
  });
  console.log(paths);
  return {
    paths,
    fallback: true,
  };
}

function getPageInfo(param) {
  let pageInfo = pages[param.toLowerCase()];
  if (!pageInfo) {
    // search by param
    Object.keys(pages).forEach((key) => {
      if (pages[key].googleDocId === param) {
        pageInfo = pages[key];
      }
    });
  }
  return pageInfo || {};
}

export async function getStaticProps({ params }) {
  const pageInfo = getPageInfo(params.googleDocId);
  const googleDocId = pageInfo.googleDocId || params.googleDocId;
  const doc = await getHTMLFromGoogleDocId(googleDocId);

  const page = {
    title: pageInfo.title || doc.title || null,
    description: pageInfo.description || doc.description || null,
    image: pageInfo.image || null,
    body: doc.body,
    googleDocId,
  };

  return {
    props: { page },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every 180 seconds
    revalidate: 180,
  };
}

export default function Home({ page }) {
  if (!page) return <div />;
  const { title, description, body, image, googleDocId } = page;
  return (
    <div className="w-full">
      <Head>
        <title>{title || defaultValues.title}</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content={description || defaultValues.description}
        />
        <meta name="og:image" content={image || defaultValues.image} />
      </Head>

      <main className="max-w-screen-md px-4 mx-auto">
        {!body && <p>Loading...</p>}
        {body === "not_published" && (
          <ErrorNotPublished googleDocId={googleDocId} />
        )}
        {body && <RenderGoogleDoc html={body} />}
      </main>

      <Footer googleDocId={googleDocId} />
    </div>
  );
}
