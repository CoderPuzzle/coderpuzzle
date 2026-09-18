interface TrieNode {
    [letter: string]: TrieNode | boolean | undefined;
}

class StreamChecker {
    private root: TrieNode = {}; // child letters; "#" marks a word end
    private nodes: TrieNode[] = []; // nodes the live attempts sit on

    constructor(words: string[]) {
        for (const word of words) {
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
        this.nodes = [this.root]; // index 0 is always the root
    }

    query(letter: string): boolean {
        const advanced: TrieNode[] = [];
        let hit = false;
        for (const node of this.nodes) {
            // index 0 is always the root
            const child = node[letter] as TrieNode | undefined;
            if (child !== undefined) {
                advanced.push(child);
                hit = hit || child["#"] === true;
            }
        }
        advanced.push(this.root); // a fresh suffix begins every feed
        this.nodes = advanced;
        return hit;
    }
}
