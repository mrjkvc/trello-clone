import React from "react";
import Avatar from "../../../_shared/components/Avatar/Avatar";
import Button from "../../../_shared/components/Button/Button";
import styles from "./Members.module.css";
import Dropdown from "../../../_shared/components/Dropdown/Dropdown";
import DropdownItem from "../../../_shared/components/DropdownItem/DropdownItem";
import checkedIcon from "../../../assets/images/check.png";
import blankIcon from "../../../assets/images/blank.png";

const Members = ({ updateMembers, members, allMembers }) => {
  const toggleMember = (member) => {
    if (members.map((m) => m.id).includes(member.id)) {
      updateMembers("delete", member);
    } else {
      updateMembers("add", member);
    }
  };
  return (
    <div className={styles.container}>
      <label className={styles.label}>MEMBERS</label>
      <div className={styles.members}>
        {members &&
          members.map((member, index) => (
            <Avatar
              imageUrl={member.avatarSource}
              size="s"
              shape="circle"
            ></Avatar>
          ))}
        <Dropdown
          item={<Button colorStyle={styles.addMember} text="+"></Button>}
        >
          {allMembers.map((member) => (
            <DropdownItem
              icon={
                members.map((m) => m.id).includes(member.id)
                  ? checkedIcon
                  : blankIcon
              }
              onClick={() => toggleMember(member)}
              text={member.fullName}
            >
              <Avatar
                imageUrl={member.avatarSource}
                size="s"
                shape="circle"
              ></Avatar>
            </DropdownItem>
          ))}
        </Dropdown>
      </div>
    </div>
  );
};

export default Members;
