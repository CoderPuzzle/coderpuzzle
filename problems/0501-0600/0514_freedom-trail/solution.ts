function findRotateSteps(ring: string, key: string): number {
    const n = ring.length;
    // Precompute each character's indices so every stage only considers
    // alignments that actually spell the current key character (never
    // empty because the key is guaranteed spellable).
    const positions = new Map<string, number[]>();
    for (let i = 0; i < n; i++) {
        const ch = ring[i];
        if (!positions.has(ch)) positions.set(ch, []);
        positions.get(ch)!.push(i);
    }
    // dp: ring index aligned at 12:00 -> min rotation steps so far
    let dp = new Map<number, number>([[0, 0]]);
    for (const ch of key) {
        const nxt = new Map<number, number>();
        const list = positions.get(ch)!;
        for (const j of list) {
            let best = Infinity;
            for (const [i, cost] of dp) {
                // Circular rotation cost between alignments i and j: the
                // shorter of the direct and wrap-around distances.
                const diff = Math.abs(i - j);
                const rot = Math.min(diff, n - diff);
                if (cost + rot < best) best = cost + rot;
            }
            nxt.set(j, best);
        }
        dp = nxt;
    }
    // Cheapest final alignment, plus one button press per key char.
    let ans = Infinity;
    for (const cost of dp.values()) {
        if (cost < ans) ans = cost;
    }
    return ans + key.length;
}
