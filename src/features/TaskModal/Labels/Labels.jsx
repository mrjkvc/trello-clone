import React from "react";
import Button from "../../../_shared/components/Button/Button";
import Dropdown from "../../../_shared/components/Dropdown/Dropdown";
import TrelloLabel from "../../../_shared/components/TrelloLabel/TrelloLabel";
import Avatar from "../../../_shared/components/TrelloLabel/TrelloLabel";
import HeaderDropdown from "../../HeaderDropdown/HeaderDropdown";
import styles from "./Labels.module.css";
import DropdownItem from "../../../_shared/components/DropdownItem/DropdownItem";
import checkedIcon from "../../../assets/images/check.png";
import blankIcon from "../../../assets/images/blank.png";
const Labels = ({ updateLabels, labels, allLabels }) => {
  const toggleLabel = (label) => {
    if (labels.map((l) => l.id).includes(label.id)) {
      updateLabels("delete", label);
    } else {
      updateLabels("add", label);
    }
  };
  return (
    <div className={styles.container}>
      <label className={styles.title}>LABELS</label>
      <div className={styles.members}>
        {labels &&
          labels.map((label, index) => (
            <TrelloLabel
              text={label.name}
              color={label.color}
              styleClass={styles.label}
            ></TrelloLabel>
          ))}

        <Dropdown
          item={<Button colorStyle={styles.addLabel} text="+"></Button>}
        >
          {allLabels.map((label) => (
            <DropdownItem
              icon={
                labels.map((l) => l.id).includes(label.id)
                  ? checkedIcon
                  : blankIcon
              }
              onClick={() => toggleLabel(label)}
            >
              <TrelloLabel
                text={label.name}
                color={label.color}
                styleClass={styles.label}
              ></TrelloLabel>
            </DropdownItem>
          ))}
        </Dropdown>
      </div>
    </div>
  );
};

export default Labels;
