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
        const splitWord: string[] | null = word.match(/(\w{0,})([^\w{0,}])/);
        let filterWord = word;
        let addChar = false;
        if(splitWord && splitWord[2]) {
          filterWord = splitWord[1];
          addChar = true;
        }
        const outcome = emojis.filter((emoji: Emoji) => emoji.name.includes(filterWord.split('-').join(' ')));
        if(outcome.length > 0) {
          outputArr.push(outcome[0].char);
          rawOutputArr.push(outcome[0].name);
        } else {
          outputArr.push(filterWord);
          rawOutputArr.push(filterWord);
        }
        if(addChar && splitWord) {
          outputArr.push(splitWord[2]);
          rawOutputArr.push(splitWord[2]);
        }
      } else {
        outputArr.push(word);
        rawOutputArr.push(word);
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
