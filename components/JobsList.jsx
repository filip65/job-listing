import { useEffect, useState } from "react";
import JobItem from "./JobItem";
import styles from "./JobsList.module.scss";
import Link from "next/link";

function JobsList({ jobsData, addFilter, filters }) {
  const [jobs, setJobs] = useState(jobsData);

  useEffect(() => {
    const filteredJobs = jobsData.filter((job) => {
      const { role, level, languages, tools } = job;

      const allItems = [role, level, ...languages, ...tools].map((item) =>
        item.toLowerCase()
      );

      return filters.every((a) => allItems.includes(a));
    });

    setJobs(filteredJobs);
  }, [filters, jobsData]);

  return (
    <div className={styles.jobList}>
      <Link href="/new-job" passHref className={styles.addBtn}>
        <span className={styles.addBtn}>+ Add new job</span>
      </Link>

      {jobs.map((job) => {
        return <JobItem jobData={job} key={job.id} addFilter={addFilter} />;
      })}
    </div>
  );
}

export default JobsList;
