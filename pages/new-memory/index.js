import AddMemoryForm from "@/components/memories/AddMemoryForm";
import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";
//new-memory
const NewMemory = () => {
  const router = useRouter();

  async function newMemoryHandler(memory) {
    const response = await fetch("/api/new-memory", {
      method: "POST",
      body: JSON.stringify(memory),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("send");
    const data = await response.json();
    console.log(data);
    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add new Memory</title>
      </Head>
      <AddMemoryForm onAddMemory={newMemoryHandler} />
    </Fragment>
  );
};
export default NewMemory;
