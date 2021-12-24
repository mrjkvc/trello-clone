import Modal from "../../_shared/components/Modal/Modal";
import ModalHeader from "../../_shared/components/ModalHeader/ModalHeader";
// import KeywordsTable from "../../features/KeywordsTable/KeywordsTable";
// import { useState } from "react";
// import { useForm, FormProvider } from "react-hook-form";
import styles from "./CreativeModal.module.css";
import Members from "./Members/Members";
import TaskAttachments from "./TaskAttachments/TaskAttachments";
import TaskComments from "./TaskComments/TaskComments";
import TaskDescription from "./TaskDescription/TaskDescription";
import TaskTitle from "./TaskTitle/TaskTitle";
// import { useEffect } from "react";
// import api from "../../api";
// import KeywordField from "./KeywordField";
// import EditCell from "../../_shared/components/EditCell/EditCell";
// import CreativeNameField from "./CreativeNameField";
// import StatusField from "./StatusField";
// import TargetingField from "./TargetingField";
// import CreativeURLField from "./CreativeURLField";
// import ButtonFooter from "./ButtonFooter";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Date from "../../_shared/components/Date/Date";
// import TableStatus from "../../_shared/components/TableStatus/TableStatus";

const TaskModal = ({
  selectedTask,
  setSelectedTask,
  setShowModal,
  showModal,
  // creatives,
  // setCreative,
}) => {
  // const DATE_FORMAT = { month: "long", year: "numeric" };
  // const [data, setData] = useState({});
  // const [bid, setBid] = useState("");
  // const [rawData, setRawData] = useState([]);
  // const [checkedCategories, setCheckedCategories] = useState([]);
  // const [display, setDisplay] = useState("notdisplayed");

  // const requirementsOptions = {
  //   creativeName: {
  //     required: "Enter a valid Creative name",
  //     maxLength: {
  //       value: 50,
  //       message: "Enter a valid Creative name",
  //     },
  //     message: "Enter a valid Creative name",
  //   },
  //   creativeURL: {
  //     required: "Enter a valid URL",
  //     pattern: {
  //       value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
  //       message: "Enter a valid URL",
  //     },
  //     message: "Enter a valid URL",
  //   },
  // };

  // useEffect(() => {
  //   if (Object.keys(selectedCreative).length === 0) {
  //     setRawData([]);
  //     setData([]);
  //   } else {
  //     api.creatives
  //       .getById(selectedCreative.id)
  //       .then((data) => {
  //         setRawData(data.keywords);
  //         setData(generateTableContent(data, data.keywords));
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [selectedCreative]);

  // const generateTableContent = (data, rawData) =>
  //   rawData &&
  //   data &&
  //   data.keywords &&
  //   data.keywords.map((element) => {
  //     let result = {};
  //     for (const [key, value] of Object.entries(element)) {
  //       if (key === "bid") {
  //         result[key] = (
  //           <EditCell
  //             id={element["id"]}
  //             value={value}
  //             rawData={rawData}
  //             setRawData={setRawData}
  //           ></EditCell>
  //         );
  //       } else {
  //         result[key] = value;
  //       }
  //     }
  //     return result;
  //   });

  // const onKeywordDelete = (keyword) => {
  //   setData(data.filter((el) => el.id !== keyword.id));
  //   setRawData(data.filter((el) => el.id !== keyword.id));
  // };

  // const addHandler = ({ keyword }) => {
  //   let dataId;
  //   if (rawData.length === 0) {
  //     dataId = 1;
  //   } else {
  //     dataId = rawData[rawData.length - 1].id + 1;
  //   }
  //   setData([
  //     ...data,
  //     {
  //       id: dataId,
  //       name: keyword,
  //       bid: (
  //         <EditCell
  //           id={dataId}
  //           value={"1.0"}
  //           rawData={rawData}
  //           setRawData={setRawData}
  //         ></EditCell>
  //       ),
  //     },
  //   ]);
  //   setRawData([...rawData, { id:dataId, name: keyword, bid: 1.0 }]);
  // };

  // const handleBidChange = (event) => {
  //   setBid(event.target.value);
  // };

  // const showToastSuccess = () => {
  //   toast.info("Success!", {
  //     position: "bottom-center",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     className: styles.toastStyle,
  //   });
  // };

  // const showToastError = () => {
  //   toast.error("Error", {
  //     position: "bottom-center",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     className: styles.toastStyle,
  //   });
  // };

  // const creativeFormMethods = useForm({
  //   mode: "onBlur",
  //   reValidateMode: "onChange",
  // });
  // toast.configure();
  // const onSubmit = () => {
  //   let tmpForm = creativeFormMethods.getValues();
  //   tmpForm.advertiserId = 1;
  //   tmpForm.keywords = rawData;
  //   tmpForm.categories = checkedCategories;
  //   console.log(tmpForm);
  //   if (Object.keys(selectedCreative).length === 0) {
  //     api.creatives
  //       .insert(tmpForm)
  //       .then((data) => {
  //         console.log("DATE", data.created);
  //         setCreative([
  //           ...creatives,
  //           {
  //             name: data.name,
  //             id: data.id,
  //             created: <Date date={data.created} format={DATE_FORMAT}></Date>,
  //             status: <TableStatus status={data.status}></TableStatus>,
  //             url: <a href={data.url} target="_blank" rel="noopener noreferrer">{data.url}</a>,
  //           },
  //         ]);
  //         showToastSuccess();
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         showToastError();
  //       });
  //   } else {
  //     tmpForm.id = selectedCreative.id;
  //     api.creatives
  //       .update(tmpForm)
  //       .then((res) => {
  //         setCreative(
  //           creatives.map((el) => (el.id === res.id ? { ...el, ...res } : el))
  //         );
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         showToastError();
  //       });
  //   }

  //   setShowModal(false);
  //   setSelectedCreative({});
  // };
  //console.log(JSON.stringify(selectedTask));
  return (
    <Modal showModal={showModal}>
      <div className={styles.columnContainer}>
        <ModalHeader
          title="Card details"
          setShowModal={setShowModal}
          setSelectedTask={setSelectedTask}
        ></ModalHeader>
        {
          <>
            <TaskTitle task={selectedTask}></TaskTitle>
            <TaskDescription
              description={selectedTask.description}
            ></TaskDescription>
            <TaskAttachments attachments={[]}></TaskAttachments>
            <TaskComments comments={selectedTask.comments}></TaskComments>
          </>
          /* <FormProvider {...creativeFormMethods}>
          <form
            className={styles.contentContainer}
            onSubmit={creativeFormMethods.handleSubmit(onSubmit)}
          >
            <div className={` ${styles.rowContainer} ${styles.spaceBetween}`}>
              <CreativeNameField
                selectedCreative={selectedCreative}
                requirements={requirementsOptions.creativeName}
              ></CreativeNameField>
              <StatusField selectedCreative={selectedCreative}></StatusField>
            </div>
            <KeywordField
             
              bidValue={bid}
              handleBidChange={handleBidChange}
              addHandler={addHandler}
              data={data}
              onKeywordDelete={onKeywordDelete}
            ></KeywordField>
            <CreativeURLField
              selectedCreative={selectedCreative}
              requirements={requirementsOptions.creativeURL}
            ></CreativeURLField>
            <TargetingField
              checkedCategories={checkedCategories}
              setCheckedCategories={setCheckedCategories}
            ></TargetingField>
            <ButtonFooter
              isValid={creativeFormMethods.formState.isValid}
              setShowModal={setShowModal}
              setSelectedCreative={setSelectedCreative}
            ></ButtonFooter>
          </form>
        </FormProvider> */
        }
      </div>
    </Modal>
  );
};
export default TaskModal;
