import React from 'react'
import TrelloCard from '../TrelloCard/TrelloCard'
import styles from "./TaskList.module.css";


const TaskList = ({tasks}) => {

    return (
        <div className={styles.cardsContainer}>
        {
            tasks.map((task,index) => <TrelloCard text={task.text} id={task.id} index={index}></TrelloCard>)
        }
    </div>
    )
}

export default TaskList
