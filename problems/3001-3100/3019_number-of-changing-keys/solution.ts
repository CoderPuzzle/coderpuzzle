function countKeyChanges(s: string): number {
    const keys = s.toLowerCase();
    let changes = 0;
    for (let i = 1; i < keys.length; i++) {
        if (keys[i] !== keys[i - 1]) {
            changes++;
        }
    }
    return changes;
}
