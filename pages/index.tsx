import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('../2dcad-editor'), { ssr: false });

export default function Home() {
  return <Editor />;
}
