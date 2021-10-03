import FormItem from "../../_shared/components/FormItem/FormItem";
import InputItem from "../../_shared/components/InputItem/InputItem";
import styles from "./CreativeModal.module.css";
import { useState, useEffect } from "react";

const CreativeNameField = ({ selectedCreative, requirements }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(selectedCreative && selectedCreative.name ? selectedCreative.name : '');
  }, []);

  const handleUrlChange = (event) => setUrl(event.target.value);

  return (
    <FormItem text="Creative name">
      <InputItem
        id="name"
        placeholderText=""
        inputItemStyleClass={styles.nameInput}
        value={url}
        doRegister={true}
        requirements={requirements}
        handleChangeFunc={handleUrlChange}
      ></InputItem>
    </FormItem>
  );
};

export default CreativeNameField;
