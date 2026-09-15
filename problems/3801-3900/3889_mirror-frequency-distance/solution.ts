function mirrorFrequency(s: string): number {
    // 36 counters: 26 letters, then 10 digits.
    const freq = new Array<number>(36).fill(0);
    for (let i = 0; i < s.length; ++i) {
        const code = s.charCodeAt(i);
        if (code >= 97 && code <= 122) {
            freq[code - 97]++;
        } else {
            freq[26 + code - 48]++;
        }
    }
    let total = 0;
    // Letters fold into 13 mirror pairs (a,z), (b,y), ..., (m,n).
    for (let i = 0; i < 13; ++i) {
        const a = freq[i];
        const b = freq[25 - i];
        if (a + b > 0) total += Math.abs(a - b);
    }
    // Digits fold into 5 mirror pairs (0,9), (1,8), ..., (4,5).
    for (let d = 0; d < 5; ++d) {
        const a = freq[26 + d];
        const b = freq[26 + 9 - d];
        if (a + b > 0) total += Math.abs(a - b);
    }
    return total;
}
