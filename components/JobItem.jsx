import styles from "./JobItem.module.scss";
import Image from "next/image";

const JobItem = ({ jobData, addFilter }) => {
  const {
    logo,
    company,
    position,
    contract,
    location,
    featured,
    postedAt,
    role,
    level,
    languages,
    tools,
  } = jobData;

  const timestampToDate = (timestamp) => {
    const currentDate = Math.floor(new Date().getTime() / 1000);

    const duration = currentDate - timestamp;

    const days = Math.floor(duration / 86400);

    if (days === 0) {
      return "today";
    } else if (days > 0 && days < 7) {
      return `${days}d ago`;
    } else if (days >= 7 && days < 31) {
      return `${Math.floor(days / 7)}w ago`;
    } else if (days >= 31 && days < 365) {
      return `${Math.floor(days / 31)}m ago`;
    } else {
      return `${Math.floor(days / 365)}y ago`;
    }
  };

  return (
    <div className={`${styles.jobItem}  ${featured ? `${styles.marked}` : ""}`}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image layout="fill" src={logo} alt={company} />
        </div>

        <div className={styles.info__content}>
          <div className={styles.header}>
            <h3 className={styles.company}>{company}</h3>
            {jobData.new && (
              <div className={`${styles.tag} ${styles.new}`}>NEW!</div>
            )}
            {featured && (
              <span className={`${styles.tag} ${styles.featured}`}>
                FEATURED
              </span>
            )}
          </div>

          <a className={styles.position}>{position}</a>

          <div className={styles.time}>
            <p>{timestampToDate(postedAt)}</p>
            <p>{contract}</p>
            <p>{location}</p>
          </div>
        </div>
      </div>

      <ul className={styles.tools}>
        <li onClick={() => addFilter(role)}>{role}</li>
        <li onClick={() => addFilter(level)}>{level}</li>
        {languages &&
          languages.map((language, index) => {
            return (
              <li key={index} onClick={() => addFilter(language)}>
                {language}
              </li>
            );
          })}

        {tools &&
          tools.map((tool, index) => {
            return (
              <li key={100 - index} onClick={() => addFilter(tool)}>
                {tool}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default JobItem;
