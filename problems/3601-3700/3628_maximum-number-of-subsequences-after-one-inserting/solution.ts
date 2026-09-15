function numOfSubsequences(s: string): number {
    // Forward pass fills preL[i] / preLC[i] (L's and LC pairs strictly
    // before boundary i) and accumulates base, the LCT count of s. The
    // backward pass fills sufT[i] / sufCT[i] (T's and CT pairs at or
    // after boundary i). Inserting letter x at boundary i gains
    // sufCT[i] for L, preL[i] * sufT[i] for C, and preLC[i] for T, so
    // the answer is base plus the best gain over the n + 1 boundaries.
    // Totals peak near ((n+1)/3)^3 ≈ 3.8e13 < 2^53, so Number math is
    // exact.
    const n = s.length;
    const preL = new Array<number>(n + 1).fill(0);
    const preLC = new Array<number>(n + 1).fill(0);
    const sufT = new Array<number>(n + 1).fill(0);
    const sufCT = new Array<number>(n + 1).fill(0);
    let base = 0;
    let cntL = 0;
    let cntLC = 0;
    for (let i = 0; i < n; ++i) {
        preL[i] = cntL;
        preLC[i] = cntLC;
        const ch = s[i];
        if (ch === "L") ++cntL;
        else if (ch === "C") cntLC += cntL;
        else if (ch === "T") base += cntLC;
    }
    preL[n] = cntL;
    preLC[n] = cntLC;
    let cntT = 0;
    let cntCT = 0;
    for (let i = n - 1; i >= 0; --i) {
        sufT[i + 1] = cntT;
        sufCT[i + 1] = cntCT;
        const ch = s[i];
        if (ch === "T") ++cntT;
        else if (ch === "C") cntCT += cntT;
    }
    sufT[0] = cntT;
    sufCT[0] = cntCT;
    let gain = 0;
    for (let i = 0; i <= n; ++i) {
        if (sufCT[i] > gain) gain = sufCT[i];
        if (preL[i] * sufT[i] > gain) gain = preL[i] * sufT[i];
        if (preLC[i] > gain) gain = preLC[i];
    }
    return base + gain;
}
