function appendCharacters(s: string, t: string): number {
    // Match t from its start, scanning s once. Each time the current
    // characters agree, t advances; s advances on every step. The prefix
    // of t consumed this way is the longest one that is a subsequence of
    // s, so the unmatched tail of t is exactly what must be appended.
    let i = 0;
    let j = 0;
    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) j += 1;
        i += 1;
    }
    return t.length - j;
}
