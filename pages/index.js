import { MongoClient } from "mongodb";
import { useState } from "react";
import Filter from "../components/Filter";
import JobsList from "../components/JobsList";
import { data } from "../data";
import Head from "next/head";

export default function Home({ jobsData }) {
  const [filters, setFilters] = useState([]);

  const addFilter = (filter) => {
    if (filters.includes(filter.toLowerCase())) return;

    setFilters([...filters, filter.toLowerCase()]);
  };

  const removeFilter = (filter) => {
    setFilters(
      filters.filter((a) => {
        return a !== filter.toLowerCase();
      })
    );
  };

  const removeAllFilters = () => {
    setFilters([]);
  };

  return (
    <div className="home">
      <Head>
        <title>All jobs</title>
        <link rel="icon" href="/images/job-search.png"></link>
      </Head>
      <Filter
        filters={filters}
        removeFilter={removeFilter}
        removeAllFilters={removeAllFilters}
      />
      <JobsList jobsData={jobsData} addFilter={addFilter} filters={filters} />
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.MONGO_URL);
  const db = client.db();
  const jobsCollection = db.collection("jobs");

  let responseData = await jobsCollection.find().toArray();

  responseData = responseData
    .map((job) => {
      return {
        ...job,
        _id: job._id.toString(),
        id: job._id.toString(),
      };
    })
    .reverse();

  client.close();

  return {
    props: {
      jobsData: [...responseData, ...data],
    },
    revalidate: 1,
  };
}
