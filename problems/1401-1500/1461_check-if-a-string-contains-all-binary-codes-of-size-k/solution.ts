function hasAllCodes(s: string, k: number): boolean {
    // all 2^k codes present <=> distinct length-k substrings reach 2^k;
    // a string shorter than k cannot host even one code of length k
    const need = 1 << k;
    if (s.length < k) return false;
    const seen = new Set<string>();
    for (let i = 0; i + k <= s.length; i++) {
        seen.add(s.slice(i, i + k));
        // early exit: codes exhausted before the string ends
        if (seen.size === need) return true;
    }
    return seen.size === need;
}
