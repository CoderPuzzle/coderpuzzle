// A legal reply depends only on the last played word: it must be
// lexicographically greater and start with the same letter or the next
// one, and every earlier play is <= that word, so words are never
// replayed. Handing the opponent a larger threshold never helps them
// (their reply options only shrink), so inside one letter a player always
// answers with their largest remaining word there, and a jump into the
// next letter is played at that letter's largest word. After a player
// spends their largest word of a letter they can never play in that
// letter again, so the fight in each letter above the first is one reply
// long: enter with your max, opponent answers with theirs or exits
// upward, entrant exits upward or loses.
//
// Sweep letters top-down with enter[c] = "the player who enters this
// letter with their largest word wins", then resolve Bob's two options at
// the forced opener a[0]: answer inside the letter or jump to the next
// letter at once.
function canAliceWin(a: string[], b: string[]): boolean {
    const maxA: (string | null)[] = new Array(26).fill(null);
    const maxB: (string | null)[] = new Array(26).fill(null);
    for (const w of a) {
        maxA[w.charCodeAt(0) - 97] = w;
    }
    for (const w of b) {
        maxB[w.charCodeAt(0) - 97] = w;
    }
    const hasA: boolean[] = maxA.map((w) => w !== null);
    const hasB: boolean[] = maxB.map((w) => w !== null);
    const entA: boolean[] = new Array(26).fill(false);
    const entB: boolean[] = new Array(26).fill(false);
    for (let c = 25; c >= 0; --c) {
        const nxt = c < 25 ? c + 1 : -1;
        if (hasA[c]) {
            const bobExit: boolean = nxt >= 0 && hasB[nxt] && entB[nxt];
            const bobStay: boolean = hasB[c] && maxB[c]! > maxA[c]! && !(nxt >= 0 && hasA[nxt] && entA[nxt]);
            entA[c] = !(bobExit || bobStay);
        }
        if (hasB[c]) {
            const aliceExit: boolean = nxt >= 0 && hasA[nxt] && entA[nxt];
            const aliceStay: boolean = hasA[c] && maxA[c]! > maxB[c]! && !(nxt >= 0 && hasB[nxt] && entB[nxt]);
            entB[c] = !(aliceExit || aliceStay);
        }
    }
    const c0 = a[0].charCodeAt(0) - 97;
    const bobExit: boolean = c0 < 25 && hasB[c0 + 1] && entB[c0 + 1];
    let battle = false;
    const b1 = maxB[c0];
    if (b1 !== null && b1 > a[0]) {
        const aliceExit: boolean = c0 < 25 && hasA[c0 + 1] && entA[c0 + 1];
        const a1 = maxA[c0];
        const a1Wins: boolean = a1 !== null && a1 > b1 && !bobExit;
        battle = !(a1Wins || aliceExit);
    }
    return !(bobExit || battle);
}
