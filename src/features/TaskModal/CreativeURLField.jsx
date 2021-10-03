import FormItem from "../../_shared/components/FormItem/FormItem";
import InputItem from "../../_shared/components/InputItem/InputItem";
import styles from "./CreativeModal.module.css";
import { useState } from "react";
import { useEffect } from "react";

const CreativeURLField = ({requirements, selectedCreative}) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    Object.keys(selectedCreative).length > 0 ? setUrl(selectedCreative.url.props.href) : setUrl('');
  }, []);

  const handleUrlChange = (event) => setUrl(event.target.value);

  return (
    <FormItem text="Creative URL">
      <InputItem
        id="url"
        placeholderText="https://"
        inputItemStyleClass={styles.urlInput}
        doRegister={true}
        requirements={requirements}
        value={url}
        handleChangeFunc={handleUrlChange}
      ></InputItem>
    </FormItem>
  );
};

export default CreativeURLField;
