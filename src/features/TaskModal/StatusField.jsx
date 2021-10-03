import { useEffect } from "react";
import { useState } from "react";
import FormItem from "../../_shared/components/FormItem/FormItem";
import RadioButton from "../../_shared/components/RadioButton/RadioButton";
import TableStatus from "../../_shared/components/TableStatus/TableStatus";
import styles from "./CreativeModal.module.css";
import InputItem from "../../_shared/components/InputItem/InputItem";

const StatusField = ({ selectedCreative }) => {
  const [activeChecked, setActiveChecked] = useState(false);
  const [pausedChecked, setPausedChecked] = useState(true);
  const [creativeStatus, setCreativeStatus] = useState("ACTIVE");

  /* useEffect(() => {
    if (Object.keys(selectedCreative).length > 0) {
      console.log(selectedCreative.status.props.status);
      if (selectedCreative.status.props.status === "ACTIVE") {
        console.log("ACTIVE", selectedCreative);
        setActiveChecked(true);
        setPausedChecked(false);
      } else {
        console.log("PAUSED", selectedCreative);
        setActiveChecked(false);
        setPausedChecked(true);
      }
    }
  }, [selectedCreative]);*/

  useEffect(() => {
    if (Object.keys(selectedCreative).length > 0) {
      setCreativeStatus(selectedCreative.status.props.status);
      console.log("status: ", selectedCreative.status.props.status);
    }
  }, [selectedCreative]);

  return (
    <FormItem text="Status">
      <div className={styles.statusContainer}>
        <RadioButton
          id="status"
          radioValue="ACTIVE"
          doRegister={true}
          checked={creativeStatus === "ACTIVE"}
          setChecked={setCreativeStatus}
        >
          <TableStatus status="ACTIVE"></TableStatus>
        </RadioButton>
        <RadioButton
          id="status"
          radioButtonStyle={styles.radioButton}
          radioValue="PAUSED"
          doRegister={true}
          checked={creativeStatus === "PAUSED"}
          setChecked={setCreativeStatus}
        >
          <TableStatus status="PAUSED"></TableStatus>
        </RadioButton>
      </div>
    </FormItem>
  );
};

export default StatusField;
