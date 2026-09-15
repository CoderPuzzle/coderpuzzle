function convertNumber(s: string): string {
    // Trie over the ten digit words: each node holds child nodes keyed by
    // letter plus the digit whose word ends there (null when none). No word
    // is a prefix of another, so a walk from any position crosses at most
    // one terminal, and the first terminal reached is exactly where the
    // word ends.
    interface TrieNode {
        children: Map<string, TrieNode>;
        digit: string | null;
    }
    const root: TrieNode = { children: new Map(), digit: null };
    for (const [word, digit] of [
        ["zero", "0"],
        ["one", "1"],
        ["two", "2"],
        ["three", "3"],
        ["four", "4"],
        ["five", "5"],
        ["six", "6"],
        ["seven", "7"],
        ["eight", "8"],
        ["nine", "9"],
    ]) {
        let node = root;
        for (const ch of word) {
            let child = node.children.get(ch);
            if (child === undefined) {
                child = { children: new Map(), digit: null };
                node.children.set(ch, child);
            }
            node = child;
        }
        node.digit = digit;
    }
    const digits: string[] = [];
    const n = s.length;
    let i = 0;
    while (i < n) {
        let node = root;
        let j = i;
        let hit: string | null = null;
        while (j < n) {
            const child = node.children.get(s[j]);
            if (child === undefined) {
                break;
            }
            node = child;
            ++j;
            if (node.digit !== null) {
                hit = node.digit;
                break;
            }
        }
        if (hit === null) {
            ++i;
        } else {
            digits.push(hit);
            i = j;
        }
    }
    return digits.join("");
}
