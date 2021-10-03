import styles from "./CreativeModal.module.css";
import Button from "../../_shared/components/Button/Button";
import FormItem from "../../_shared/components/FormItem/FormItem";
import InputItem from "../../_shared/components/InputItem/InputItem";
import KeywordsTable from "../../features/KeywordsTable/KeywordsTable";
import { useState } from "react";



const KeywordField = ({
  bidValue,
  addHandler,
  data,
  onKeywordDelete
}) => {
  const [keywordValue, setKeywordValue] = useState("");
  const handleKeywordChange = (event) => {
    setKeywordValue(event.target.value);
  };



  const onAddKeyword = () => {
    if(!data.filter((e) => e.name === keywordValue).length>0){
      addHandler({ keyword: keywordValue, bid: bidValue });}
    setKeywordValue("");
  }

  return (
    <FormItem text="Keywords"
      content={<KeywordsTable
        tableContent={data}
        deleteAction={onKeywordDelete}
      ></KeywordsTable>}>
      <InputItem
        id="keyword"
        requirements=""
        placeholderText=""
        inputItemStyleClass={styles.keywordInput}
        doRegister={false}
        value={keywordValue}
        handleChangeFunc={handleKeywordChange}
        requirements={{ message: 'Keyword already added'}}
      ></InputItem>
      <Button
        buttonShape="rectangle"
        text="Add"
        buttonClass={styles.addButton}
        textColorStyle={styles.addButtonTextColor}
        disabled={!(keywordValue.length>0 && keywordValue.length<50)}
        onClick={onAddKeyword}
      ></Button>
    </FormItem>
  );
};

export default KeywordField;
