function splitString(s: string): boolean {
    // Fixing the first piece forces everything after it: each next piece
    // must read as exactly prev - 1. Leading zeros let several lengths
    // share one value, so backtrack over each matching length. A first
    // piece of 11+ digits cannot work: its successor alone needs 10+ of
    // the at most 9 leftover characters.
    const n = s.length;

    function extend(pos: number, prev: number): boolean {
        const want = prev - 1;
        if (pos === n) {
            return true;
        }
        if (want < 0) {
            return false;
        }
        let v = 0;
        for (let end = pos + 1; end <= n; end++) {
            v = v * 10 + (s.charCodeAt(end - 1) - 48);
            if (v === want && extend(end, want)) {
                return true;
            }
            if (v > want) {
                break;
            }
        }
        return false;
    }

    for (let firstEnd = 1; firstEnd < Math.min(n, 11); firstEnd++) {
        let first = 0;
        for (let k = 0; k < firstEnd; k++) {
            first = first * 10 + (s.charCodeAt(k) - 48);
        }
        if (extend(firstEnd, first)) {
            return true;
        }
    }
    return false;
}
