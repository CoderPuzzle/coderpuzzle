class Solution {

    public int numWays(int n, int k) {
        // Rolling counts for the prefix built so far: same = its last two
        // posts share a color, diff = they differ. Seeded at the first post:
        // nothing precedes it to match, so all k colors start as "differs".
        // The constraints bound the answer below 2^31 - 1; long rolling keeps
        // every intermediate product comfortably inside range.
        long same = 0,
            diff = k;
        for (int i = 1; i < n; ++i) {
            // A same-color post must follow a differing pair, and a differing
            // post picks any of the k - 1 remaining colors after anything.
            long nextSame = diff;
            diff = (same + diff) * (k - 1);
            same = nextSame;
        }
        return (int) (same + diff);
    }
}
