import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header/Header";
import SubHeader from "../components/header/SubHeader";
import Posts from "../components/posts/Posts";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <SubHeader />

      {/* Posts */}
      <div>
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
       _id,
       title,
       author->{
       name,
       image
     },
     description,
     mainImage,
     slug
     }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
export default Home;
