import styles from "./Filter.module.scss";
import FilterItem from "./FilterItem";

const Filter = ({ filters, removeFilter, removeAllFilters }) => {
  return (
    <div
      className={`${styles.filter} ${filters.length !== 0 ? styles.open : ""}`}
    >
      <div className={styles.filters}>
        {filters?.map((filter) => {
          return (
            <FilterItem
              key={filter}
              text={filter}
              removeFilter={removeFilter}
              classname={styles.filterItem}
            />
          );
        })}
      </div>
      <button className={styles.clearBtn} onClick={() => removeAllFilters()}>
        Clear
      </button>
    </div>
  );
};

export default Filter;
