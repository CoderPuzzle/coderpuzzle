function divisibilityArray(word: string, m: number): number[] {
    // Rolling remainder over digit prefixes: if r was word[0..i-1] mod
    // m, then appending digit d gives (10*r + d) mod m, so each flag
    // costs one multiply-add-mod instead of re-parsing the prefix. The
    // intermediate 10*r + d tops out just above 10^10 (r < m <= 10^9),
    // far below the 2^53 limit where TS numbers stay exact.
    const div: number[] = [];
    let rem = 0;
    for (let i = 0; i < word.length; ++i) {
        rem = (rem * 10 + word.charCodeAt(i) - 48) % m;
        div.push(rem === 0 ? 1 : 0);
    }
    return div;
}
