function checkDistances(s: string, distance: number[]): boolean {
    // Remember each letter's first index; on the second sighting the
    // letters strictly between number second - first - 1, which must
    // equal that letter's distance entry.
    const first = new Map<number, number>();
    for (let i = 0; i < s.length; ++i) {
        const k = s.charCodeAt(i) - 97;
        const seen = first.get(k);
        if (seen === undefined) {
            first.set(k, i);
        } else if (i - seen - 1 !== distance[k]) {
            return false;
        }
    }
    return true;
}
