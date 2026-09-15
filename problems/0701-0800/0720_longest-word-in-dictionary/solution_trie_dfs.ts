interface TrieNode {
    children: Map<string, TrieNode>;
    end: boolean;
}

function longestWord(words: string[]): string {
    // The trie stores every word once; a node's `end` marks where a word
    // stops. Walking only through `end` nodes keeps every spelled prefix
    // a word, so each path the walk takes is a buildable word.
    const root: TrieNode = { children: new Map(), end: false };
    for (const word of words) {
        let node = root;
        for (const character of word) {
            let child = node.children.get(character);
            if (child === undefined) {
                child = { children: new Map(), end: false };
                node.children.set(character, child);
            }
            node = child;
        }
        node.end = true;
    }
    let best = "";
    const walk = (node: TrieNode, path: string): void => {
        // Strictly longer wins; among equal lengths the smaller word
        // wins — compared explicitly, never via child order.
        if (path.length > best.length || (path.length === best.length && path < best)) {
            best = path;
        }
        node.children.forEach((child, character) => {
            if (child.end) {
                walk(child, path + character);
            }
        });
    };
    walk(root, "");
    // Nothing buildable at all: the statement's empty-string answer.
    return best;
}
