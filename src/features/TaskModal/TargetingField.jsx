import FormItem from "../../_shared/components/FormItem/FormItem";
import InputItem from "../../_shared/components/InputItem/InputItem";
import TargetingTable from "../TargetingTable/TargetingTable";
import styles from "./CreativeModal.module.css";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../api";

const TargetingField = ({ checkedCategories, setCheckedCategories }) => {
  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [checkedCats, setCheckedCats] = useState([]);

  const handleChange = (event) => {
    setSearchString(event.target.value);
  };

  useEffect(() => {
    api.categories
      .getAll()
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  let filteredData = data,
    searchStringValue = searchString.trim().toLowerCase();

    if (searchString.length > 0) {
      filteredData = filteredData.filter((e) => e.name.toLowerCase().includes(searchStringValue));}


  return (
    <div>
      <FormItem
        text="Category Targeting"
        content={
          <TargetingTable
        checkedCategories={checkedCategories}
        setCheckedCategories={setCheckedCategories}
        data={filteredData}
        checkedCats={checkedCats}
        setCheckedCats={setCheckedCats}
      ></TargetingTable>
        }
        customStyle={styles.spaceBetween}
      >
        <InputItem
            id="filter"
            requirements=""
            placeholderText="Search"
            inputItemStyleClass={styles.roundedStyle}
            handleChangeFunc={handleChange}
          ></InputItem>
      </FormItem>
     
       
    </div>
  );
};

export default TargetingField;
