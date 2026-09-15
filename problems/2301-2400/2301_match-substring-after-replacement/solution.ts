function matchReplacement(s: string, sub: string, mappings: string[][]): boolean {
    // base[t] marks every position of s holding character t; matched[old]
    // extends it with the positions each declared target covers, so bit p
    // of matched[old] is exactly matched(old, s[p]). BigInt stands in for
    // the machine word — 5000-bit rows overflow a double's exact range.
    const base: bigint[] = Array.from({ length: 128 }, () => 0n);
    for (let p = 0; p < s.length; p++) {
        base[s.charCodeAt(p)] |= 1n << BigInt(p);
    }
    const matched = base.slice();
    for (const [old, nw] of mappings) {
        matched[old.charCodeAt(0)] |= base[nw.charCodeAt(0)];
    }
    // bit e of seen marks a window whose first j + 1 characters all match
    // and that ends at e. Seed with the first character's mask; every later
    // character grows the survivors one position deeper into s.
    let seen: bigint = matched[sub.charCodeAt(0)];
    for (let j = 1; j < sub.length; j++) {
        seen = (seen << 1n) & matched[sub.charCodeAt(j)];
    }
    return seen !== 0n;
}
