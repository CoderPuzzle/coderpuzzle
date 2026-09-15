import java.util.Arrays;

class Solution {

    public String longestDupSubstring(String s) {
        int n = s.length();
        // Rank of each suffix by its first character alone; ranks only need
        // relative order, so the letter's alphabet index serves.
        Integer[] sa = new Integer[n];
        int[] rank = new int[n];
        for (int i = 0; i < n; i++) {
            sa[i] = i;
            rank[i] = s.charAt(i) - 'a';
        }

        // Doubling sort: after the pass with step k, ranks order prefixes of
        // length 2k, so ceil(log2 n) passes settle the whole suffix order.
        // Each pass sorts on one packed key: the current rank scaled past
        // every possible second component, plus the rank of the suffix k
        // steps later, with 0 standing in for "past the end" so a suffix
        // that is a prefix of a longer one ranks strictly below it.
        long[] key = new long[n];
        for (int k = 1; k < n; k <<= 1) {
            for (int i = 0; i < n; i++) {
                key[i] = (long) rank[i] * (n + 27) + (i + k < n ? rank[i + k] + 1 : 0);
            }
            Arrays.sort(sa, (x, y) -> Long.compare(key[x], key[y]));
            int[] next = new int[n];
            int r = 0;
            for (int p = 1; p < n; p++) {
                if (key[sa[p]] != key[sa[p - 1]]) r++;
                next[sa[p]] = r;
            }
            rank = next;
            if (r == n - 1) break; // every suffix distinct — the order is already final
        }

        // Kasai's scan: walk the text positions left to right, matching each
        // suffix against its predecessor in sorted order. Dropping a leading
        // character from both sides of a match shortens it by at most one,
        // so a single extending counter h that only ever retreats by one per
        // step settles every LCP within 2n character comparisons.
        int[] posOf = new int[n];
        for (int p = 0; p < n; p++) posOf[sa[p]] = p;
        int bestLength = 0,
            bestStart = 0,
            h = 0;
        for (int i = 0; i < n; i++) {
            if (posOf[i] > 0) {
                int j = sa[posOf[i] - 1];
                while (i + h < n && j + h < n && s.charAt(i + h) == s.charAt(j + h)) h++;
                if (h > bestLength) {
                    bestLength = h;
                    bestStart = i;
                }
                if (h > 0) h--;
            } else {
                h = 0;
            }
        }

        if (bestLength == 0) return "";
        return s.substring(bestStart, bestStart + bestLength);
    }
}
