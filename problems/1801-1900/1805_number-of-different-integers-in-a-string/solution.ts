function numDifferentIntegers(word: string): number {
    // A digit run can be up to 1000 digits long, far beyond any
    // fixed-width integer, so runs are never parsed: each is stripped
    // of leading zeros and compared as a string in a hash set. The
    // strip loop keeps one digit, so an all-zero run stays "0".
    const seen = new Set<string>();
    const n = word.length;
    let i = 0;
    while (i < n) {
        const c = word.charCodeAt(i);
        if (c < 48 || c > 57) {
            i++;
            continue;
        }
        let j = i;
        while (j < n && word.charCodeAt(j) >= 48 && word.charCodeAt(j) <= 57) {
            j++;
        }
        let k = i;
        while (k + 1 < j && word.charCodeAt(k) === 48) {
            k++;
        }
        seen.add(word.slice(k, j));
        i = j;
    }
    return seen.size;
}
