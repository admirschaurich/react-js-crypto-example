import * as CryptoJS from 'crypto-js';

class CryptoHelper {
    key: string;
    salt: string;

    constructor(keyString: string, saltString: string) {
        this.key = this.utf8Encode(keyString);
        this.salt = this.utf8Encode(saltString);
    }

    utf8Encode(string: string): string {
        return unescape(encodeURIComponent(string));
    }

    utf8Decode(encodedString: string): string {
        return decodeURIComponent(escape(encodedString));
    }

    pbkdf2Sync(password: string, salt: string, iterations: number, keylen: number, digest: string): CryptoJS.lib.WordArray {
        let derivedKey = CryptoJS.PBKDF2(password, salt, { keySize: keylen / 4, iterations: iterations, hasher: CryptoJS.algo.SHA256 });
        return CryptoJS.enc.Hex.parse(derivedKey.toString());
    }

    encrypt(plainText: string): string {
        const keyDerivation = this.pbkdf2Sync(this.key, this.salt, 1000, 32, 'sha256');
        const iv = CryptoJS.lib.WordArray.random(128 / 8);
        const encrypted = CryptoJS.AES.encrypt(plainText, keyDerivation, { iv: iv });
        return iv.toString(CryptoJS.enc.Base64) + '|' + encrypted.toString();
    }

    decrypt(cipherText: string): string {
        const parts = cipherText.split('|');
        const iv = CryptoJS.enc.Base64.parse(parts[0]);
        const encryptedText = parts[1];
        const keyDerivation = this.pbkdf2Sync(this.key, this.salt, 1000, 32, 'sha256');
        const decrypted = CryptoJS.AES.decrypt(encryptedText, keyDerivation, { iv: iv });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}

export default CryptoHelper;