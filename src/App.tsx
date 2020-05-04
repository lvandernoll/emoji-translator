import React, { useState, useEffect } from 'react';
import emojis from 'emoji.json';
import styles from './App.module.scss';

interface Emoji {
  codes: string,
  char: string,
  name: string,
  category: string,
  group: string,
  subgroup: string,
}

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [rawOutput, setRawOutput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  useEffect(() => {
    let outputArr: string[] = [];
    let rawOutputArr: string[] = [];
    input.split(' ').forEach((word: string) => {
      if(word) {
        const outcome = emojis.filter((emoji: Emoji) => emoji.name.toLowerCase().includes(word.split('-').join(' ').toLowerCase()));
        if(outcome.length > 0) {
          outputArr.push(outcome[0].char);
          rawOutputArr.push(outcome[0].name);
        } else {
          outputArr.push(word);
          rawOutputArr.push(word);
        }
      }
    });
    setOutput(outputArr.join(' '));
    setRawOutput(rawOutputArr.join(' '));
  }, [input, setOutput]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header} />
      <div className={styles.content}>
        <span>{output}</span>
        <br />
        <span>{rawOutput}</span>
        <br />
        <input value={input} onChange={(e) => setInput(e.currentTarget.value)} />
      </div>
      <footer className={styles.footer} />
    </div>
  )
}

export default App;
