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
  const [input, setInput] = useState<string>('lemon');
  const [rawOutput, setRawOutput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [emojiCount, setEmojiCount] = useState<number>(0);

  useEffect(() => {
    let outputArr: string[] = [];
    let rawOutputArr: string[] = [];
    let newEmojiCount: number = 0;
    input.split(' ').forEach((word: string) => {
      if(word) {
        const outcome = emojis.filter((emoji: Emoji) => emoji.name.toLowerCase().includes(word.split('-').join(' ').toLowerCase()));
        if(outcome.length > 0) {
          outputArr.push(outcome[0].char);
          rawOutputArr.push(outcome[0].name);
          newEmojiCount += 1;
        } else {
          rawOutputArr.push(word);
        }
      }
    });
    setOutput(outputArr.join(''));
    setRawOutput(rawOutputArr.join(' '));
    setEmojiCount(newEmojiCount);
  }, [input, setOutput]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header} />
      <div className={styles.content}>
        <div style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='75px' width='${emojiCount * 67.5}px'><text x='0' y='55' font-size='50'>${output}</text></svg>")` }}
          className={styles.backgroundImage} />
        <span className={styles.emojis}>{output}</span>
        <span className={styles.raw}>{rawOutput}</span>
        <input className={styles.input} value={input} onChange={(e) => setInput(e.currentTarget.value)} />
      </div>
      <footer className={styles.footer} />
    </div>
  )
}

export default App;
