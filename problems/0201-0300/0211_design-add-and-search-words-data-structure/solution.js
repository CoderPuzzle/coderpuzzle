class WordDictionary {
    constructor() {
        this.root = {}; // child letters; "#" marks a whole word's end
    }

    addWord(word) {
        let node = this.root;
        for (const ch of word) {
            if (!(ch in node)) {
                node[ch] = {};
            }
            node = node[ch];
        }
        node["#"] = true;
    }

    search(word) {
        // A letter descends its single link; a dot tries every non-empty one.
        const match = (node, index) => {
            if (node === undefined || node === null) {
                return false;
            }
            if (index === word.length) {
                return node["#"] === true;
            }
            const ch = word[index];
            if (ch === ".") {
                for (const key in node) {
                    if (key !== "#" && match(node[key], index + 1)) {
                        return true;
                    }
                }
                return false;
            }
            return match(node[ch], index + 1);
        };
        return match(this.root, 0);
    }
}
