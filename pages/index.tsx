import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('../editor-ui'), { ssr: false });

export default function Home() {
  return <Editor />;
}
