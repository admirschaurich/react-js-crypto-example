import React, { useState } from 'react';
import CryptoHelper from './CryptoHelper';

const CryptoDemo: React.FC = () => {
    const [key, setKey] = useState<string>('MgbCryptoKey');
    const [salt, setSalt] = useState<string>('fb548f88-b2d8-438c-9488-40f92e5664a1');
    const [plainText, setPlainText] = useState<string>('Read');
    const [encryptedText, setEncryptedText] = useState<string>('');
    const [decryptedText, setDecryptedText] = useState<string>('');

    const encryptText = () => {
        const helper = new CryptoHelper(key, salt);
        const encrypted = helper.encrypt(plainText);
        setEncryptedText(encrypted);
    };

    const decryptText = () => {
        const helper = new CryptoHelper(key, salt);
        const decrypted = helper.decrypt(encryptedText);
        setDecryptedText(decrypted);
    };

    return (
        <div className="container">
            <h1>CryptoHelper Example</h1>
            <div className="input-group">
                <label htmlFor="key">Key to Encrypt:</label>
                <input type="text" id="key" value={key} onChange={(e) => setKey(e.target.value)} />
            </div>
            <div className="input-group">
                <label htmlFor="salt">Salt to Encrypt:</label>
                <input type="text" id="salt" value={salt} onChange={(e) => setSalt(e.target.value)} />
            </div>
            <hr />
            <div className="input-group">
                <label htmlFor="plainText">Text to Encrypt:</label>
                <input type="text" id="plainText" value={plainText} onChange={(e) => setPlainText(e.target.value)} />
                <button onClick={encryptText}>Encrypt</button>
            </div>
            <div className="input-group">
                <label htmlFor="cipherText">Encrypted Text:</label>
                <input type="text" id="cipherText" value={encryptedText} onChange={(e) => setEncryptedText(e.target.value)} />
                <button onClick={decryptText}>Decrypt</button>
            </div>
            <div className="input-group">
                <label htmlFor="decryptedText">Decrypted Text:</label>
                <input type="text" id="decryptedText" value={decryptedText} readOnly />
            </div>
        </div>
    );
};

export default CryptoDemo;