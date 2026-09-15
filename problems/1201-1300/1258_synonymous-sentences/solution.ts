function generateSentences(synonyms: string[][], text: string): string[] {
    // Union-find over every word mentioned in a pair.
    const parent = new Map<string, string>();
    const find = (x: string): string => {
        if (!parent.has(x)) parent.set(x, x);
        let root = x;
        while (parent.get(root) !== root) root = parent.get(root)!;
        // Compress.
        let cur = x;
        while (parent.get(cur) !== root) {
            const up = parent.get(cur)!;
            parent.set(cur, root);
            cur = up;
        }
        return root;
    };
    for (const [a, b] of synonyms) {
        parent.set(find(a), find(b));
    }

    const groups = new Map<string, string[]>();
    for (const word of [...parent.keys()]) {
        const root = find(word);
        if (!groups.has(root)) groups.set(root, []);
        groups.get(root)!.push(word);
    }
    for (const group of groups.values()) group.sort();

    // Expand position by position.
    let sentences: string[] = [""];
    for (const word of text.split(" ")) {
        const options = parent.has(word) ? groups.get(find(word))! : [word];
        sentences = sentences.flatMap((prefix) => options.map((option) => prefix + " " + option));
    }
    return sentences.map((s) => s.slice(1)).sort();
}
