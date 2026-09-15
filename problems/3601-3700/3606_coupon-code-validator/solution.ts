function validateCoupons(code: string[], businessLine: string[], isActive: boolean[]): string[] {
    // Category rank: electronics < grocery < pharmacy < restaurant.
    const rank = new Map<string, number>([
        ["electronics", 0],
        ["grocery", 1],
        ["pharmacy", 2],
        ["restaurant", 3],
    ]);
    const valid: [number, string][] = [];
    for (let i = 0; i < code.length; ++i) {
        if (!isActive[i] || !rank.has(businessLine[i])) continue;
        if (!codeOk(code[i])) continue;
        valid.push([rank.get(businessLine[i])!, code[i]]);
    }
    // Sort by (category rank, code); the code tiebreak is plain
    // lexicographic string order.
    valid.sort((a, b) => a[0] - b[0] || (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0));
    return valid.map((pair) => pair[1]);
}

function codeOk(name: string): boolean {
    if (name.length === 0) return false;
    for (let i = 0; i < name.length; ++i) {
        const c = name.charCodeAt(i);
        const alnum = (c >= 97 && c <= 122) || (c >= 65 && c <= 90) || (c >= 48 && c <= 57);
        if (!alnum && c !== 95) return false;
    }
    return true;
}
