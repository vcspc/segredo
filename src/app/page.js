"use client";
    import React, { useState, useEffect } from 'react';
    import CryptoJS from 'crypto-js';
    import styles from './page.module.css';

    export default function Home() {
      const [message, setMessage] = useState('');
      const [key, setKey] = useState('');
      const [encryptedMessage, setEncryptedMessage] = useState('');
      const [decryptedMessage, setDecryptedMessage] = useState('');
      const [isDarkMode, setIsDarkMode] = useState(false);

      useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        setIsDarkMode(storedDarkMode === 'true');
      }, []);

      useEffect(() => {
        localStorage.setItem('darkMode', isDarkMode);

        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [isDarkMode]);

      const handleEncrypt = () => {
        if (key.length !== 8 || !/^\d+$/.test(key)) {
          alert('A chave deve ter 8 dígitos numéricos.');
          return;
        }
        const encrypted = CryptoJS.AES.encrypt(message, key).toString();
        setEncryptedMessage(encrypted);
        setDecryptedMessage('');
      };

      const handleDecrypt = () => {
        if (key.length !== 8 || !/^\d+$/.test(key)) {
          alert('A chave deve ter 8 dígitos numéricos.');
          return;
        }
        try {
          const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
          const decrypted = bytes.toString(CryptoJS.enc.Utf8);
          setDecryptedMessage(decrypted);
        } catch (error) {
          alert('Erro ao desencriptar. Verifique a chave e a mensagem encriptada.');
          setDecryptedMessage('');
        }
        setEncryptedMessage('');
      };

      const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
      };

      return (
        <main className={`${styles.main} ${isDarkMode ? 'dark' : ''}`}>
          <h1 className={styles.heading}>Encriptador/Desencriptador de Mensagens</h1>

          <button className={styles.button} onClick={toggleDarkMode} style={{ marginBottom: '1rem' }}>
            {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
          </button>

          <input
            type="text"
            className={styles.input}
            placeholder="Chave de 8 dígitos"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <textarea
            className={styles.textarea}
            placeholder="Mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div>
            <button className={styles.button} onClick={handleEncrypt}>
              Encriptar
            </button>
            <button className={styles.button} onClick={handleDecrypt}>
              Desencriptar
            </button>
          </div>
          {encryptedMessage && (
            <div className={styles.result}>
              <h2>Mensagem Encriptada:</h2>
              <p>{encryptedMessage}</p>
            </div>
          )}
          {decryptedMessage && (
            <div className={styles.result}>
              <h2>Mensagem Descriptada:</h2>
              <p>{decryptedMessage}</p>
            </div>
          )}
        </main>
      );
    }
