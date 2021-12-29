import Modal from "../../_shared/components/Modal/Modal";
import ModalHeader from "../../_shared/components/ModalHeader/ModalHeader";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./TaskModal.module.css";
import Members from "./Members/Members";
import TaskAttachments from "./TaskAttachments/TaskAttachments";
import TaskComments from "./TaskComments/TaskComments";
import TaskDescription from "./TaskDescription/TaskDescription";
import TaskTitle from "./TaskTitle/TaskTitle";
import { useSelector } from "react-redux";

const TaskModal = ({
  setSelectedTask,
  setShowModal,
  showModal,
  sendMessage,
  allLabels,
  allMembers,
}) => {
  // const DATE_FORMAT = { month: "long", year: "numeric" };
  // const [data, setData] = useState({});
  // const [bid, setBid] = useState("");
  // const [rawData, setRawData] = useState([]);
  // const [checkedCategories, setCheckedCategories] = useState([]);
  // const [display, setDisplay] = useState("notdisplayed");
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
