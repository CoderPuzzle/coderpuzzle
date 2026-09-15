function minimumSwap(s1: string, s2: string): number {
    // Each swap fixes two mismatches, so an odd total is impossible.
    let xy = 0,
        yx = 0;
    for (let i = 0; i < s1.length; ++i) {
        const a = s1[i],
            b = s2[i];
        if (a === "x" && b === "y") ++xy;
        else if (a === "y" && b === "x") ++yx;
    }
    if ((xy + yx) % 2 === 1) return -1;
    // Same-shape pairs cost 1 each; one leftover pair of each shape costs 2.
    return Math.floor(xy / 2) + Math.floor(yx / 2) + (xy % 2 === 1 ? 2 : 0);
}
