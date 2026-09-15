function maximumGain(s: string, x: number, y: number): number {
    const removePairs = (text: string, first: string, second: string, points: number): [string, number] => {
        const stack: string[] = [];
        let score = 0;
        // Stack scan: `second` arriving on a top of `first` pops and scores;
        // everything else is pushed. Survivors are the text with every
        // non-overlapping removal of this pattern applied.
        for (const c of text) {
            if (stack.length && stack[stack.length - 1] === first && c === second) {
                stack.pop();
                score += points;
            } else {
                stack.push(c);
            }
        }
        // The residue — including non-a/b characters, which never pair — is
        // exactly what the other pattern's pass sweeps next.
        return [stack.join(""), score];
    };
    // Remove the higher-priced pattern first: by exchange, the character left
    // behind still pairs with the other kind, so this never loses.
    if (x >= y) {
        const [rest, score1] = removePairs(s, "a", "b", x);
        const [, score2] = removePairs(rest, "b", "a", y);
        return score1 + score2;
    }
    const [rest, score1] = removePairs(s, "b", "a", y);
    const [, score2] = removePairs(rest, "a", "b", x);
    return score1 + score2;
}
