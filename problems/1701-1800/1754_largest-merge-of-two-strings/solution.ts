function largestMerge(word1: string, word2: string): string {
    // Take the next character from whichever REMAINING string is
    // lexicographically larger — the suffix comparison settles not
    // just differing heads but the tie case.
    const out: string[] = [];
    let a = word1;
    let b = word2;
    while (a.length > 0 && b.length > 0) {
        if (a > b) {
            out.push(a[0]);
            a = a.slice(1);
        } else {
            out.push(b[0]);
            b = b.slice(1);
        }
    }
    return out.join("") + a + b;
}
