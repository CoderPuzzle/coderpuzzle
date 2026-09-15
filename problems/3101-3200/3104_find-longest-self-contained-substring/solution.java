class Solution {

    public int maxSubstringLength(String s) {
        int n = s.length();
        int[] first = new int[26];
        int[] last = new int[26];
        java.util.Arrays.fill(first, -1);
        // Prefix counts make "does letter d occur inside s[l..r]" a plain
        // count difference, driving both the closure cascade and the
        // final validation.
        int[][] counts = new int[n + 1][26];
        for (int i = 0; i < n; i++) {
            counts[i + 1] = counts[i].clone();
            int d = s.charAt(i) - 'a';
            counts[i + 1][d]++;
            if (first[d] == -1) {
                first[d] = i;
            }
            last[d] = i;
        }

        // A self-contained window always starts at the first occurrence
        // of its own leading character, so only those positions are
        // anchors.
        int best = -1;
        for (int c = 0; c < 26; c++) {
            if (first[c] == -1) {
                continue;
            }
            int l = first[c];
            int r = last[s.charAt(l) - 'a'];
            while (true) {
                // Stabilize: extend the right end until every letter
                // occurring inside s[l..r] is fully contained there,
                // tracking the earliest first occurrence among them.
                int minFirst = Integer.MAX_VALUE;
                while (true) {
                    int newR = r;
                    minFirst = Integer.MAX_VALUE;
                    for (int d = 0; d < 26; d++) {
                        if (counts[r + 1][d] - counts[l][d] > 0) {
                            if (last[d] > newR) {
                                newR = last[d];
                            }
                            if (first[d] < minFirst) {
                                minFirst = first[d];
                            }
                        }
                    }
                    if (newR == r) {
                        break;
                    }
                    r = newR;
                }
                if (minFirst >= l && !(l == 0 && r == n - 1)) {
                    best = Math.max(best, r - l + 1);
                }
                if (r == n - 1) {
                    break;
                }
                // Absorb the next closed block wholesale; unions of
                // consecutive blocks surface as further fixpoints.
                r = last[s.charAt(r + 1) - 'a'];
            }
        }
        return best;
    }
}
