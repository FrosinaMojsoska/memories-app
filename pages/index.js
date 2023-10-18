import { MongoClient } from "mongodb";
import Head from "next/head";
import MemoryList from "@/components/memories/MemoryList";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>My Memories</title>
        <meta name="description" content="React App Demo"></meta>
        
        </Head> <MemoryList memories={props.memories} />
    </Fragment>
  );
};
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://frosinam:react23@cluster0.tjwf3jf.mongodb.net/memories?retryWrites=true&w=majority"
  );

  const db = client.db();
  const memoriesCollection = db.collection("memories");
  const memories = await memoriesCollection.find().toArray();
  client.close();
  return {
    props: {
      memories: memories.map((memory) => ({
        title: memory.title,
        address: memory.address,
        image: memory.image,
        id: memory._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
export default HomePage;
