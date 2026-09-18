class StreamChecker {
    constructor(words) {
        this.root = {}; // trie node: child letters, "#" marks a word end
        for (const word of words) {
            let node = this.root;
            for (const ch of word) {
                if (!(ch in node)) {
                    node[ch] = {};
                }
                node = node[ch];
            }
            node["#"] = true;
        }
        // trie nodes the stream suffixes have reached; index 0 is the root
        this.nodes = [this.root];
    }

    query(letter) {
        const advanced = [];
        let hit = false;
        for (const node of this.nodes) {
            // index 0 is always the root
            const child = node[letter];
            if (child !== undefined) {
                advanced.push(child);
                hit = hit || "#" in child;
            }
        }
        advanced.push(this.root); // a fresh suffix begins every feed
        this.nodes = advanced;
        return hit;
    }
}
