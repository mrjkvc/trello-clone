import { useSelector } from "react-redux";
import Modal from "../../_shared/components/Modal/Modal";
import ModalHeader from "../../_shared/components/ModalHeader/ModalHeader";
import TaskComments from "./TaskComments/TaskComments";
import TaskDescription from "./TaskDescription/TaskDescription";
import styles from "./TaskModal.module.css";
import TaskTitle from "./TaskTitle/TaskTitle";

const TaskModal = ({
  setSelectedTask,
  setShowModal,
  showModal,
  sendMessage,
  allLabels,
  allMembers,
}) => {
  const { selectedTask } = useSelector((state) => state.board);
  return (
    <Modal showModal={showModal}>
      <div className={styles.columnContainer}>
        <ModalHeader
          title="Card details"
          setShowModal={setShowModal}
          setSelectedTask={setSelectedTask}
        ></ModalHeader>

        <TaskTitle
          task={selectedTask}
          sendMessage={sendMessage}
          allLabels={allLabels}
          allMembers={allMembers}
        ></TaskTitle>
        <TaskDescription
          task={selectedTask}
          sendMessage={sendMessage}
        ></TaskDescription>
        <TaskComments
          task={selectedTask}
          sendMessage={sendMessage}
        ></TaskComments>
      </div>
    </Modal>
  );
};
export default TaskModal;
