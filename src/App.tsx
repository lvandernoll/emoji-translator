import React from 'react';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header} />
      <div className={styles.content}>
        content
      </div>
      <footer className={styles.footer} />
    </div>
  )
}

export default App;
