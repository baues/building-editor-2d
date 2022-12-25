import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';


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
