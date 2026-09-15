function maxVowels(s: string, k: number): number {
    const isVowel = (c: string): boolean => c === "a" || c === "e" || c === "i" || c === "o" || c === "u";
    // count vowels of the first window once; afterwards only the
    // entering letter (i) and the leaving letter (i-k) can change it
    let count = 0;
    for (let i = 0; i < k && i < s.length; i++) {
        if (isVowel(s[i])) count++;
    }
    let best = count;
    for (let i = k; i < s.length; i++) {
        if (isVowel(s[i])) count++;
        if (isVowel(s[i - k])) count--;
        if (count > best) best = count;
    }
    return best;
}
