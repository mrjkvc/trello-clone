import React, { useEffect } from "react";
import styles from "./InputItem.module.css";
import { useFormContext } from "react-hook-form";

const InputItem = ({
  id,
  requirements,
  placeholderText,
  inputItemStyleClass,
  value,
  doRegister,
  type = "text",
  handleChangeFunc = (e) => (value = e.target.value),
}) => {
  const methods = useFormContext();
  useEffect(() => {
    if (methods) {
      methods.setValue(id, value, {
        shouldValidate: !value === "",
        shouldDirty: !value === "",
      });
    }
  });
  return (
    <>
      <div className={styles.container}>
        <input
          className={`${styles.input} ${inputItemStyleClass} ${
            methods && methods.formState.errors[id] ? styles.inputError : ""
          }`}
          type={type}
          placeholder={placeholderText}
          {...(doRegister ? { ...methods.register(id, requirements) } : {})}
          id={id}
          value={value}
          onChange={(e) => handleChangeFunc(e)}
        />
        <label
          className={`${styles.errorMessage} ${
            methods && methods.formState.errors[id]
              ? styles.visibleErrorMessage
              : ""
          }`}
        >
          {requirements.message}
        </label>
      </div>
    </>
  );
};

export default InputItem;
