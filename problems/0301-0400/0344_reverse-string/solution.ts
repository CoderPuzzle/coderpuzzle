function reverseString(s: string[]): string[] {
    // Two indexes walk inward from both ends and swap each pair they
    // form: position i trades places with position n-1-i, so every
    // element crosses the middle exactly once and the array is reversed
    // when the indexes meet. The destructuring assignment only trades the
    // two references — no string is ever rebuilt — so the reversal happens
    // in place with O(1) extra memory; the mutated array is the answer.
    let lo = 0;
    let hi = s.length - 1;
    while (lo < hi) {
        [s[lo], s[hi]] = [s[hi], s[lo]];
        ++lo;
        --hi;
    }
    return s;
}
