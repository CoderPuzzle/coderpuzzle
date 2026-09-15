function maxDifference(s: string): number {
    // To maximize freq(a1) - freq(a2), take the largest odd frequency
    // and the smallest even one; one counting pass decides both.
    const freq: number[] = new Array(26).fill(0);
    for (let i = 0; i < s.length; ++i) ++freq[s.charCodeAt(i) - 97];
    let odd = -1;
    let even = 101;
    for (const f of freq) {
        if (f === 0) continue;
        if (f & 1) odd = Math.max(odd, f);
        else even = Math.min(even, f);
    }
    return odd - even;
}
