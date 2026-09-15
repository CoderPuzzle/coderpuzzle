function checkIfExist(arr: number[]): boolean {
    // Insert after the lookup so an element can never match itself.
    const seen = new Set<number>();
    for (const value of arr) {
        if (seen.has(2 * value) || (value % 2 === 0 && seen.has(value / 2))) {
            return true;
        }
        seen.add(value);
    }
    return false;
}
