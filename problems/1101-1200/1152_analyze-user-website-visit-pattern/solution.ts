function mostVisitedPattern(username: string[], timestamp: number[], website: string[]): string[] {
    const perUser = new Map<string, [number, string][]>();
    for (let i = 0; i < username.length; ++i) {
        if (!perUser.has(username[i])) perUser.set(username[i], []);
        perUser.get(username[i])!.push([timestamp[i], website[i]]);
    }
    // The separator cannot appear in a website name (lowercase letters
    // only), so it makes an unambiguous map key.
    const SEP = "|";
    const patternUsers = new Map<string, Set<string>>();
    for (const [user, visits] of perUser) {
        visits.sort((a, b) => a[0] - b[0]);
        const sites = visits.map((v) => v[1]);
        for (let i = 0; i < sites.length; ++i) {
            for (let j = i + 1; j < sites.length; ++j) {
                for (let k = j + 1; k < sites.length; ++k) {
                    const key = sites[i] + SEP + sites[j] + SEP + sites[k];
                    if (!patternUsers.has(key)) patternUsers.set(key, new Set());
                    patternUsers.get(key)!.add(user);
                }
            }
        }
    }
    let best: string[] = [];
    let bestScore = -1;
    for (const [key, users] of patternUsers) {
        const pattern = key.split(SEP);
        const score = users.size;
        const better = score > bestScore || (score === bestScore && (best.length === 0 || key < best.join(SEP)));
        if (better) {
            bestScore = score;
            best = pattern;
        }
    }
    return best;
}
