import dynamic from 'next/dynamic';

export default function Home() {
  if (typeof window !== 'undefined') {
    const Editor = dynamic(() => import('./2dcad-editor'), { ssr: false });

    return (
      <Editor />
    );
  } else {
    return null;
  }
}
