import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import MemoryDetails from "../../components/memories/MemoryDetails";
import Head from "next/head";
import { Fragment } from "react";
const Details = (props) => {
  const router = useRouter();

  return (
    <Fragment>
      <Head>
        <title>{props.memoryData.title}</title>
        <meta name="description" content={props.memoryData.description}/>
      </Head>
      <MemoryDetails
        image={props.memoryData.image}
        title={props.memoryData.title}
        address={props.memoryData.address}
        description={props.memoryData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://frosinam:react23@cluster0.tjwf3jf.mongodb.net/memories?retryWrites=true&w=majority"
  );

  const db = client.db();
  const memoriesCollection = db.collection("memories");
  const memoriesId = await memoriesCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: memoriesId.map((memoryId) => ({
      params: { memoryId: memoryId._id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  const memoryId = context.params.memoryId;

  const client = await MongoClient.connect(
    "mongodb+srv://frosinam:react23@cluster0.tjwf3jf.mongodb.net/memories?retryWrites=true&w=majority"
  );

  const db = client.db();
  const memoriesCollection = db.collection("memories");
  const objectId = new ObjectId(memoryId);

  const selectedMemory = await memoriesCollection.findOne({
    _id: objectId,
  });
  console.log(selectedMemory);
  client.close();

  return {
    props: {
      memoryData: {
        title: selectedMemory.title,
        image: selectedMemory.image,
        address: selectedMemory.address,
        description: selectedMemory.description,
        id: selectedMemory._id.toString(),
      },
    },
  };
}

export default Details;
