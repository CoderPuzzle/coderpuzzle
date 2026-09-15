/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function (products, searchWord) {
    // one trie node: 26 child slots indexed by c - 'a'; word is set when a
    // products word ends here, top caches the best three words through it
    function makeNode() {
        return { children: new Array(26).fill(null), word: null, top: [] };
    }

    const root = makeNode();
    // spell every word down the tree; nodes appear only where needed
    for (const word of products) {
        let node = root;
        for (const letter of word) {
            const slot = letter.charCodeAt(0) - 97;
            if (node.children[slot] === null) {
                node.children[slot] = makeNode();
            }
            node = node.children[slot];
        }
        node.word = word;
    }

    // merge phase, deepest nodes first: a node's best three are its own
    // word — a prefix of every other word through it, hence the smallest —
    // followed by the children's lists in letter order; every existing
    // child already holds a non-empty list, so gathering stops by the third
    // child consulted
    const order = [];
    const pending = [root];
    while (pending.length > 0) {
        const node = pending.pop();
        order.push(node);
        for (const child of node.children) {
            if (child !== null) {
                pending.push(child);
            }
        }
    }
    for (let i = order.length - 1; i >= 0; i--) {
        const node = order[i];
        const top = node.word === null ? [] : [node.word];
        for (const child of node.children) {
            if (top.length >= 3) break;
            if (child !== null) top.push(...child.top);
        }
        node.top = top.slice(0, 3);
    }

    // a keystroke is one pointer move; once a slot is empty it stays empty,
    // because prefixes only ever grow
    const result = [];
    let node = root;
    for (const letter of searchWord) {
        if (node !== null) {
            node = node.children[letter.charCodeAt(0) - 97];
        }
        result.push(node === null ? [] : node.top);
    }
    return result;
};
