import dynamic from 'next/dynamic';
import Head from 'next/head';
const Editor = dynamic(() => import('../editor-ui'), { ssr: false });

export default function Home() {
  return (
    <div>
      <Head>
        <title>BAUES Building Editor 2D</title>
        <meta name="description" content="BAUES Building Editor 2D" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Editor />
    </div>
  );
}
