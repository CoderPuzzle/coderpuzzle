class PrefixNode {
    children: Map<string, PrefixNode>;
    hotness: number;

    constructor() {
        this.children = new Map();
        this.hotness = 0;
    }
}

class AutocompleteSystem {
    private root: PrefixNode;
    private current: PrefixNode | null;
    private typed: string[];

    constructor(sentences: string[], times: number[]) {
        this.root = new PrefixNode();
        this.current = this.root;
        this.typed = [];
        sentences.forEach((sentence, index) => this.insert(sentence, times[index]));
    }

    private insert(sentence: string, extra: number): PrefixNode {
        let node = this.root;
        for (const character of sentence) {
            let child = node.children.get(character);
            if (!child) {
                child = new PrefixNode();
                node.children.set(character, child);
            }
            node = child;
        }
        node.hotness += extra;
        return node;
    }

    input(c: string): string[] {
        if (c === "#") {
            this.insert(this.typed.join(""), 1);
            this.current = this.root;
            this.typed = [];
            return [];
        }
        this.typed.push(c);
        this.current = this.current === null ? null : this.current.children.get(c) || null;
        if (this.current === null) {
            return [];
        }
        const matches: [string, number][] = [];
        this.collect(this.current, this.typed.join(""), matches);
        matches.sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
        return matches.slice(0, 3).map(([sentence]) => sentence);
    }

    // Walks the subtree under the typed prefix, collecting every stored
    // sentence with its accumulated hotness.
    private collect(node: PrefixNode, prefix: string, matches: [string, number][]): void {
        if (node.hotness > 0) {
            matches.push([prefix, node.hotness]);
        }
        for (const [character, child] of node.children) {
            this.collect(child, prefix + character, matches);
        }
    }
}
