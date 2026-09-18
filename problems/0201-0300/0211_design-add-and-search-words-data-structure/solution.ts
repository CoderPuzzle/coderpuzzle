interface TrieNode {
    [letter: string]: TrieNode | boolean | undefined;
}

class WordDictionary {
    private root: TrieNode = {}; // child letters; "#" marks a word's end

    constructor() {}

    addWord(word: string): void {
        let node = this.root;
        for (const ch of word) {
            let child = node[ch] as TrieNode | undefined;
            if (child === undefined) {
                child = {};
                node[ch] = child;
            }
            node = child;
        }
        node["#"] = true;
    }

    search(word: string): boolean {
        // A letter descends its single link; a dot tries every non-empty one.
        const match = (node: TrieNode | undefined, index: number): boolean => {
            if (node === undefined || node === null) {
                return false;
            }
            if (index === word.length) {
                return node["#"] === true;
            }
            const ch = word[index];
            if (ch === ".") {
                for (const key in node) {
                    if (key !== "#" && match(node[key] as TrieNode, index + 1)) {
                        return true;
                    }
                }
                return false;
            }
            return match(node[ch] as TrieNode | undefined, index + 1);
        };
        return match(this.root, 0);
    }
}
