function wordBreak(s: string, wordDict: string[]): boolean {
    // Trie over the wordDict: nodes own child maps keyed by letter plus
    // the flag marking a node where a word ends. From every reachable
    // position a walk follows s's own characters, so a branch dies at the
    // first character no remaining word shares, and each terminal crossed
    // marks the prefix after it reachable.
    interface TrieNode {
        children: Map<string, TrieNode>;
        end: boolean;
    }
    const root: TrieNode = { children: new Map(), end: false };
    for (const word of wordDict) {
        let node = root;
        for (const ch of word) {
            let child = node.children.get(ch);
            if (child === undefined) {
                child = { children: new Map(), end: false };
                node.children.set(ch, child);
            }
            node = child;
        }
        node.end = true;
    }
    const n = s.length;
    const reachable = new Array<boolean>(n + 1).fill(false);
    reachable[0] = true;
    for (let i = 0; i < n; ++i) {
        if (!reachable[i]) continue;
        let node = root;
        for (let j = i; j < n; ++j) {
            const child = node.children.get(s[j]);
            if (child === undefined) break;
            node = child;
            // Every terminal on the path ends a word at this depth.
            if (node.end) reachable[j + 1] = true;
        }
    }
    return reachable[n];
}
