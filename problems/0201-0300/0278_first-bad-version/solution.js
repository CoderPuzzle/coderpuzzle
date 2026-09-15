class Solution {
    firstBadVersion(versionControl, n) {
        // The predicate flips exactly once along [1, n] — good up to the
        // hidden boundary, bad from it on — so bisect for the first true.
        let lo = 1;
        let hi = n;
        while (lo < hi) {
            // Overflow-safe midpoint: lo + Math.floor((hi - lo) / 2) never
            // exceeds hi — the same difference form that avoids overflow in
            // the fixed-width languages.
            const mid = lo + Math.floor((hi - lo) / 2);
            if (versionControl.isBadVersion(mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }
}
