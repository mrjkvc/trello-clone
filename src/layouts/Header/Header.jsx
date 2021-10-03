import HeaderDropdown from '../../features/HeaderDropdown/HeaderDropdown';
import styles from './Header.module.css';
import { useState } from 'react';

const Header = (props) => {
   // const [searchValue, setSearchValue] = useState('');

   // const handleSearchInputChange = (e) => {
   //    setSearchValue(e.target.value);
   //    api.creatives.getByName(e.target.value).then(data => console.log("PAGINATION: ", data));
   // }

   return (
      // <div className={styles.headerContainer}>
      //    <div>Header</div>
      //    <div className={styles.rowStyle}>
      //       <InputItem
      //          id="search"
      //          requirements=""
      //          placeholderText="Search"
      //          value={searchValue}
      //          inputItemStyleClass={styles.roundedStyle}
      //          handleChangeFunc={(e) => handleSearchInputChange(e)}
      //       ></InputItem>
      //      
      //    </div>
      // </div>
      <div className={styles.headerContainer}>
         <div>Header</div>
         <HeaderDropdown></HeaderDropdown>
      </div>
   );
}

export default Header;