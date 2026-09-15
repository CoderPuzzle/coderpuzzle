// Suffixes (name minus first letter) grouped by first letter; within a group
// every suffix is unique because all names are unique. A swap between letters
// a and b survives exactly when neither suffix already exists in the other
// letter's group; inclusion-exclusion turns that count into sizes minus the
// shared overlap. The answer can reach ~n^2 = 2.5 * 10^9, well below 2^53, so
// doubles stay exact.
function distinctNames(ideas: string[]): number {
    const suffixes: Set<string>[] = Array.from({ length: 26 }, () => new Set<string>());
    for (const idea of ideas) {
        suffixes[idea.charCodeAt(0) - 97].add(idea.slice(1));
    }
    let total = 0;
    for (let a = 0; a < 26; a++) {
        for (let b = a + 1; b < 26; b++) {
            let shared = 0;
            for (const suffix of suffixes[a]) {
                if (suffixes[b].has(suffix)) {
                    shared++;
                }
            }
            total += 2 * (suffixes[a].size - shared) * (suffixes[b].size - shared);
        }
    }
    return total;
}
