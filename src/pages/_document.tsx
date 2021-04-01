import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

/// 1.Esse componente é o único do NextJS que é bom implementar como classe;
/// 2. Use HTML
/// 3.use o preconnect do google fonts quanto antes, dentro do Head
/// 3.1 lembre que ao importa do google fonts, fechar a tag.
/// 4. Main é o equivalente do root do react
/// 5. NextScripts onde o next injeta seus scripts, abaixo do Main.
