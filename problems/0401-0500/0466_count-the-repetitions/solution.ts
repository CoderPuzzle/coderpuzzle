// Walk str1 one s1-block at a time. The only state crossing a block boundary
// is the cursor into s2 plus the copies consumed so far, and the cursor alone
// decides how any later block plays out — so a repeated cursor exposes a
// cycle that can be jumped arithmetically.
function getMaxRepetitions(s1: string, n1: number, s2: string, n2: number): number {
    const seen = new Map<number, [number, number]>(); // cursor -> [blocks, copies]
    let cursor = 0;
    let copies = 0;
    let blocks = 0;
    while (blocks < n1) {
        for (let i = 0; i < s1.length; ++i) {
            if (s1[i] === s2[cursor]) {
                cursor++;
                if (cursor === s2.length) {
                    cursor = 0;
                    copies++;
                }
            }
        }
        blocks++;
        const start = seen.get(cursor);
        if (start !== undefined) {
            // Every cycle of blocks adds a fixed number of copies; take as
            // many whole cycles as fit, then walk the leftovers by hand.
            const jumps = Math.floor((n1 - blocks) / (blocks - start[0]));
            copies += jumps * (copies - start[1]);
            blocks += jumps * (blocks - start[0]);
            seen.clear();
        } else {
            seen.set(cursor, [blocks, copies]);
        }
    }
    return Math.floor(copies / n2);
}
