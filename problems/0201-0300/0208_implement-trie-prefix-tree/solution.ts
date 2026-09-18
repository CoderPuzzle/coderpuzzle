interface TrieNode {
    children: (TrieNode | null)[];
    end: boolean;
}

class Trie {
    private root: TrieNode = Trie.makeNode();

    // One trie node: 26 child slots indexed by c - 'a' plus a whole-word
    // terminator flag; nodes appear lazily on insert.
    private static makeNode(): TrieNode {
        return { children: new Array<TrieNode | null>(26).fill(null), end: false };
    }

    insert(word: string): void {
        let node: TrieNode = this.root;
        for (const letter of word) {
            const slot = letter.charCodeAt(0) - 97;
            if (node.children[slot] === null) {
                node.children[slot] = Trie.makeNode();
            }
            node = node.children[slot]!;
        }
        node.end = true;
    }

    // Walks one node per character; null as soon as a slot is empty.
    private walk(text: string): TrieNode | null {
        let node: TrieNode | null = this.root;
        for (const letter of text) {
            node = node.children[letter.charCodeAt(0) - 97];
            if (node === null) {
                return null;
            }
        }
        return node;
    }

    search(word: string): boolean {
        const node = this.walk(word);
        return node !== null && node.end;
    }

    startsWith(prefix: string): boolean {
        return this.walk(prefix) !== null;
    }
}
