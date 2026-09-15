function shortestSuperstring(s1: string, s2: string): string {
    // Containment first: the shorter answer is then always a merge that
    // overlaps a suffix of one string with a prefix of the other, so the
    // scan takes the largest such overlap in either direction and lets the
    // first direction win ties.
    const maxOverlap = (a: string, b: string): number => {
        for (let k = Math.min(a.length, b.length); k > 0; --k) {
            if (a.slice(-k) === b.slice(0, k)) {
                return k;
            }
        }
        return 0;
    };
    if (s1.includes(s2)) {
        return s1;
    }
    if (s2.includes(s1)) {
        return s2;
    }
    const ov1 = maxOverlap(s1, s2); // suffix of s1 == prefix of s2
    const ov2 = maxOverlap(s2, s1);
    if (ov1 >= ov2) {
        return s1 + s2.slice(ov1);
    }
    return s2 + s1.slice(ov2);
}
