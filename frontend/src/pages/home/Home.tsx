import React from 'react'
import styles from "./Home.module.css";
import Topbar from '../../components/topbar/Topbar';

export default function Home() {
  return (
    <div>
        <Topbar/>
        <div className={styles.homeWrapper}>
          
        </div>
    </div>
  )
}
