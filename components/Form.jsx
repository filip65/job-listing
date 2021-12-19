import { useEffect, useRef, useState } from "react";
import FilterItem from "./FilterItem";
import styles from "./Form.module.scss";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

function Form() {
  const languagesRef = useRef();
  const toolsRef = useRef();
  const [languages, setLanguages] = useState([]);
  const [tools, setTools] = useState([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.postedAt = Math.floor(new Date().getTime() / 1000);
    data.languages = [...languages];
    data.tools = [...tools];
    data.new = true;
    data.featured = true;

    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    router.push("/");
  };

  const detectEnterLanguages = (ref, array, setArray) => (e) => {
    if (e.key === "Enter") {
      const value = ref.current.value.toLowerCase();
      if (array.includes(value)) return;

      setArray([...array, value]);
      ref.current.value = "";
    }
  };

  const removeLanguage = (item) => {
    setLanguages(languages.filter((a) => a !== item));
  };
  const removeTool = (item) => {
    setTools(tools.filter((a) => a !== item));
  };

  return (
    <form className={styles.form}>
      <h1>New job form</h1>
      <div className={styles.row}>
        <div>
          <input
            type="text"
            placeholder="Company name"
            {...register("company", { required: true })}
          />
          <span
            className={`${styles.error} ${errors.company ? styles.show : ""}`}
          >
            This field can&apos;t be empty
          </span>
        </div>

        <div>
          <input
            type="text"
            placeholder="Position"
            {...register("position", { required: true })}
          />
          <span
            className={`${styles.error} ${errors.position ? styles.show : ""}`}
          >
            This field can&apos;t be empty
          </span>
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <div>
            <input
              type="text"
              placeholder="Role"
              {...register("role", { required: true })}
            />
            <span
              className={`${styles.error} ${errors.role ? styles.show : ""}`}
            >
              This field can&apos;t be empty
            </span>
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Level"
            {...register("level", { required: true })}
          />
          <span
            className={`${styles.error} ${errors.level ? styles.show : ""}`}
          >
            This field can&apos;t be empty
          </span>
        </div>
      </div>
      <div className={styles.row}>
        <div>
          <input
            type="text"
            placeholder="Contract"
            {...register("contract", { required: true })}
          />
          <span
            className={`${styles.error} ${errors.contract ? styles.show : ""}`}
          >
            This field can&apos;t be empty
          </span>
        </div>

        <div>
          <input
            type="text"
            placeholder="Location"
            {...register("location", { required: true })}
          />
          <span
            className={`${styles.error} ${errors.location ? styles.show : ""}`}
          >
            This field can&apos;t be empty
          </span>
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <input
            type="text"
            placeholder="Please add logo url from 'unsplash.com'"
            className={styles.logo}
            {...register("logo", { required: true })}
          />
          <span className={`${styles.error} ${errors.logo ? styles.show : ""}`}>
            This field can&apos;t be empty
          </span>
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <input
            type="text"
            placeholder="Add languages"
            onKeyPress={(e) =>
              detectEnterLanguages(languagesRef, languages, setLanguages)(e)
            }
            ref={languagesRef}
          />
          <span
            className={`${styles.error} ${errors.languages ? styles.show : ""}`}
          >
            Add at least one language
          </span>
        </div>

        <div>
          <input
            type="text"
            placeholder="Add tools"
            onKeyPress={(e) =>
              detectEnterLanguages(toolsRef, tools, setTools)(e)
            }
            ref={toolsRef}
          />
          <span
            className={`${styles.error} ${errors.tools ? styles.show : ""}`}
          >
            Add at least one language
          </span>
        </div>
        <ul className={`${languages.length ? styles.open : ""}`}>
          {languages.map((item) => {
            return (
              <FilterItem
                key={item}
                text={item}
                removeFilter={removeLanguage}
              />
            );
          })}
        </ul>

        <ul className={`${tools.length ? styles.open : ""}`}>
          {tools.map((item) => {
            return (
              <FilterItem key={item} text={item} removeFilter={removeTool} />
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        className={styles.submitBtn}
        onClick={handleSubmit(onSubmit)}
      >
        Send
      </button>
    </form>
  );
}

export default Form;
