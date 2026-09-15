function lexSmallest(s: string): string {
    const letters: string[] = s.split("");
    const n = letters.length;
    // Reversing a single character changes nothing, so s itself is always
    // one of the reachable strings and seeds the minimum.
    let best = s;
    // Flip the first k characters: the reversed head lands in front of
    // whatever the operation left untouched.
    for (let k = 2; k <= n; k++) {
        const flipped = letters.slice(0, k).reverse();
        const text = flipped.concat(letters.slice(k)).join("");
        if (text < best) {
            best = text;
        }
    }
    // Flip the last k characters: the untouched head keeps its order while
    // the reversed tail closes the string.
    for (let k = 2; k <= n; k++) {
        const head = n - k;
        const flipped = letters.slice(head).reverse();
        const text = letters.slice(0, head).concat(flipped).join("");
        if (text < best) {
            best = text;
        }
    }
    return best;
}
