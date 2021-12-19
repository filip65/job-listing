import Form from "../components/Form";
import Head from "next/head";

const newJob = () => {
  return (
    <div>
      <Head>
        <title>Add new job</title>
      </Head>
      <Form />
    </div>
  );
};

export default newJob;
