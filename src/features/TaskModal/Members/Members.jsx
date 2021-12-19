import React from "react";
import Avatar from "../../../_shared/components/Avatar/Avatar";
import styles from "./Members.module.css";

const Members = ({ members }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>MEMBERS</label>
      <div className={styles.members}>
        {members &&
          members.map((member, index) => (
            <Avatar imageUrl={member.imageurl} size="s" shape="circle"></Avatar>
          ))}
      </div>
    </div>
  );
};

export default Members;
