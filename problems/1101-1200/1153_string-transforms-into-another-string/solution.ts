function canConvert(str1: string, str2: string): boolean {
    if (str1 === str2) {
        // Zero conversions needed; cycles in the mapping never fire.
        return true;
    }
    const mapping = new Map<string, string>();
    const targets = new Set<string>();
    for (let i = 0; i < str1.length; ++i) {
        const a = str1[i],
            b = str2[i];
        if (mapping.has(a) && mapping.get(a) !== b) {
            // One source letter would need two different targets.
            return false;
        }
        mapping.set(a, b);
        targets.add(b);
    }
    // A cycle needs a spare letter to break it, and a spare is any letter
    // that never appears as a target.
    return targets.size < 26;
}
