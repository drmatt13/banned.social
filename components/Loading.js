import styles from '../styles/loader.module.scss'

const Loading = () => {
  return <>
    <div className={styles.container}>
      <span className={styles.spinner}></span>
    </div>
  </>
}

export default Loading