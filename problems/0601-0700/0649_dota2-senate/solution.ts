// Two queues of senator indices, filled in string order: the fronts are the
// earliest still-living senator of each party in the current wrap-around
// pass. Head pointers (not shift()) keep every pop O(1).
function predictPartyVictory(senate: string): string {
    const n: number = senate.length;
    const radiant: number[] = [];
    const dire: number[] = [];
    for (let i = 0; i < n; ++i) {
        (senate[i] === "R" ? radiant : dire).push(i);
    }
    // Each step the two fronts fight: the smaller index acts first, bans the
    // loser (popped for good), and re-enqueues itself at index + n, its
    // position in the next round's pass. Every fight removes one senator
    // permanently, so at most n - 1 fights decide the senate.
    let rHead = 0;
    let dHead = 0;
    while (rHead < radiant.length && dHead < dire.length) {
        const r = radiant[rHead++];
        const d = dire[dHead++];
        if (r < d) {
            radiant.push(r + n);
        } else {
            dire.push(d + n);
        }
    }
    return rHead < radiant.length ? "Radiant" : "Dire";
}
