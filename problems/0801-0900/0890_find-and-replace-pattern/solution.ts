function findAndReplacePattern(words: string[], pattern: string): string[] {
    // Index each letter by its first appearance: "abb" -> [0, 1, 1].
    const signature = (s: string): number[] => {
        const first = new Map<string, number>();
        const sig: number[] = [];
        for (const ch of s) {
            let index = first.get(ch);
            if (index === undefined) {
                index = first.size;
                first.set(ch, index);
            }
            sig.push(index);
        }
        return sig;
    };
    const same = (a: number[], b: number[]): boolean => {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    };
    // Equal signatures are exactly bijective matchability for
    // equal-length strings, so no letter-to-letter maps are needed.
    const target = signature(pattern);
    return words.filter((w) => same(signature(w), target));
}
