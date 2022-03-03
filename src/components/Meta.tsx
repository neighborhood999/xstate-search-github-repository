import Head from 'next/head';

export function Meta() {
  return (
    <Head>
      <title>XState Search GitHub Repository</title>

      <meta charSet="utf8" />
      <meta name="author" content="Peng Jie" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="theme-color" content="#fff" />

      {/* twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@bivinity" />
      <meta name="twitter:site" content="@bivinity" />
      <meta
        name="twitter:image"
        content="https://source.unsplash.com/u0ZgqJD55pE/640x423"
      />
      <meta name="twitter:title" content="XState Search GitHub Repository" />
      <meta name="twitter:description" content="🔍 Search GitHub Repository" />

      {/* facebook */}
      <meta property="og:title" content="XState Search GitHub Repository" />
      {/* <meta property="og:url" content={url} /> */}
      <meta
        property="og:image"
        content="https://source.unsplash.com/u0ZgqJD55pE/640x423"
      />
      <meta property="og:description" content="🔍 Search GitHub Repository" />
      <meta property="og:type" content="article" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="favicon/site.webmanifest" />
    </Head>
  );
}
