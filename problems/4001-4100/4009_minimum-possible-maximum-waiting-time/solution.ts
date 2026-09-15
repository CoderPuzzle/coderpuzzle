function minMaxWaitingTime(demand: number[], fuel: number[]): number {
    // Level sweep over cars. A state packs (fuel0, fuel1, busy0, busy1)
    // -- remaining fuel and remaining busy time per dispenser, measured
    // from when the current car becomes allowed -- in base 51, mapped to
    // the smallest maximum waiting time achievable so far.
    const B = 51;
    let states = new Map<number, number>();
    states.set((fuel[0] * B + fuel[1]) * B * B, 0);
    for (let i = 0; i < demand.length; i++) {
        const d = demand[i];
        const nxt = new Map<number, number>();
        for (const [key, worst] of states) {
            const f0 = Math.floor(key / (B * B * B));
            const f1 = Math.floor(key / (B * B)) % B;
            const r0 = Math.floor(key / B) % B;
            const r1 = key % B;
            if (f0 >= d) {
                // Serve car i on dispenser 0; the other dispenser's clock
                // runs down by r0 while it waits.
                const nmw = Math.max(worst, r0);
                const nk = (((f0 - d) * B + f1) * B + d) * B + Math.max(r1 - r0, 0);
                const old = nxt.get(nk);
                if (old === undefined || nmw < old) {
                    nxt.set(nk, nmw);
                }
            }
            if (f1 >= d) {
                const nmw = Math.max(worst, r1);
                const nk = ((f0 * B + (f1 - d)) * B + Math.max(r0 - r1, 0)) * B + d;
                const old = nxt.get(nk);
                if (old === undefined || nmw < old) {
                    nxt.set(nk, nmw);
                }
            }
        }
        if (nxt.size === 0) {
            // The process terminates here and no car may be skipped,
            // so every live state has served exactly i cars.
            if (i === 0) {
                return -1;
            }
            break;
        }
        states = nxt;
    }
    let ans = Infinity;
    for (const v of states.values()) {
        ans = Math.min(ans, v);
    }
    return ans;
}
