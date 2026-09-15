function numSub(s: string): number {
    // `run` tracks the length of the run of 1s ending at the current
    // position; adding it after each step accumulates n * (n + 1) / 2 for
    // every completed run, one unit at a time. JS numbers are exact up to
    // 2^53, well beyond any intermediate sum here, so no separate 64-bit
    // type is needed.
    const MOD = 1_000_000_007;
    let total = 0;
    let run = 0;
    for (const c of s) {
        run = c === "1" ? run + 1 : 0;
        total = (total + run) % MOD;
    }
    return total;
}
