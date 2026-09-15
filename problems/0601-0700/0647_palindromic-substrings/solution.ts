function countSubstrings(s: string): number {
    const n = s.length;
    let count = 0;
    for (let center = 0; center < n; center++) {
        // Each palindrome has one center: a character (odd) or a gap (even),
        // so trying both shapes discovers every occurrence exactly once.
        for (const pair of [
            [center, center],
            [center, center + 1],
        ]) {
            let left = pair[0];
            let right = pair[1];
            while (left >= 0 && right < n && s[left] === s[right]) {
                // Every successful step is one more palindrome; stop at the
                // first mismatch — wrapping can never restore symmetry.
                count += 1;
                left -= 1;
                right += 1;
            }
        }
    }
    return count;
}
