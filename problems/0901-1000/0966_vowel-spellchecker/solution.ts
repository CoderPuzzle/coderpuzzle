function spellchecker(wordlist: string[], queries: string[]): string[] {
    // Blank out the vowels of an already-lowercase word.
    const devowel = (low: string): string => low.replace(/[aeiou]/g, "*");
    // One pass over the wordlist builds all three lookups; the has() guards
    // keep the FIRST word claiming each key — first-match-wins.
    const exact = new Set<string>(wordlist);
    const byLower = new Map<string, string>();
    const byDevowel = new Map<string, string>();
    for (const w of wordlist) {
        const low = w.toLowerCase();
        if (!byLower.has(low)) {
            byLower.set(low, w);
        }
        const dv = devowel(low);
        if (!byDevowel.has(dv)) {
            byDevowel.set(dv, w);
        }
    }
    // Each query walks the tiers in precedence order: exact echo, then
    // case-insensitive, then vowel-blind, then "".
    const answer: string[] = [];
    for (const q of queries) {
        if (exact.has(q)) {
            answer.push(q);
            continue;
        }
        const low = q.toLowerCase();
        answer.push(byLower.get(low) ?? byDevowel.get(devowel(low)) ?? "");
    }
    return answer;
}
