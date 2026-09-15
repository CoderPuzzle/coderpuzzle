// A prefix trie whose every node on a key's path carries the sum of the
// current values of all live keys passing through it: insert() adds the
// key's CHANGE in value along its path -- a side map remembers the previous
// value, so overwriting a key corrects the running totals instead of
// double-counting -- and sum() walks the prefix and returns the node's
// total, or 0 when the walk falls off the trie.
class TrieNode {
    children = new Map<string, TrieNode>();
    score = 0;
}

class MapSum {
    private root = new TrieNode();
    private values = new Map<string, number>();

    constructor() {}

    insert(key: string, val: number): void {
        const delta = val - (this.values.get(key) ?? 0);
        this.values.set(key, val);
        let node = this.root;
        for (const letter of key) {
            let child = node.children.get(letter);
            if (child === undefined) {
                child = new TrieNode();
                node.children.set(letter, child);
            }
            node = child;
            node.score += delta;
        }
    }

    sum(prefix: string): number {
        let node = this.root;
        for (const letter of prefix) {
            const child = node.children.get(letter);
            if (child === undefined) {
                return 0;
            }
            node = child;
        }
        return node.score;
    }
}
