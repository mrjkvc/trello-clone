import Button from "../../_shared/components/Button/Button";
import styles from "./CreativeModal.module.css";



const ButtonFooter = ({onSubmit,isValid, setShowModal, setSelectedCreative}) => {

  const closeModal = () => {
    setSelectedCreative({});
    setShowModal(false);
  }

  return (
    <div className={styles.buttonsContainer}>
      <Button
        buttonShape={"rectangle"}
        text={"Save"}
        buttonClass={styles.saveButton}
        textColorStyle={styles.saveButtonTextColor}
        inputType="submit"
        onSubmit={onSubmit}
        disabled={!isValid}
      ></Button>
      <Button
        buttonShape={"rectangle"}
        text={"Cancel"}
        buttonClass={styles.cancelButton}
        textColorStyle={styles.cancelButtonTextColor}
        disabled={false}
        onClick={() => closeModal()}
      ></Button>
    </div>
  );
};

export default ButtonFooter;
