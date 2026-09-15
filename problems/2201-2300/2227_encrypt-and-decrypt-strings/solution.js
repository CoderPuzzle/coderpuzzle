// Forward map for encryption; for decryption, dictionary words are
// pre-encrypted once and counted in a bag, so each decrypt call is one
// hash lookup — the count of dictionary strings whose encryption equals
// word2 equals the number of ways word2 decrypts into the dictionary.
class Encrypter {
    constructor(keys, values, dictionary) {
        this.forward = new Map();
        this.encCounts = new Map();
        for (let i = 0; i < keys.length; i++) {
            this.forward.set(keys[i], values[i]);
        }
        for (const word of dictionary) {
            const encrypted = this.encrypt(word);
            if (encrypted !== "") {
                this.encCounts.set(encrypted, (this.encCounts.get(encrypted) ?? 0) + 1);
            }
        }
    }

    encrypt(word1) {
        let out = "";
        for (const ch of word1) {
            const mapped = this.forward.get(ch);
            if (mapped === undefined) {
                return "";
            }
            out += mapped;
        }
        return out;
    }

    decrypt(word2) {
        return this.encCounts.get(word2) ?? 0;
    }
}

/**
 * Your Encrypter object will be instantiated and called as such:
 * var obj = new Encrypter(keys, values, dictionary)
 * var param_1 = obj.encrypt(word1)
 * var param_2 = obj.decrypt(word2)
 */
