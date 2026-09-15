class Solution {

    private static final long M1 = 1000000007L,
        M2 = 998244353L;
    private static final long B1 = 131,
        B2 = 137;

    private String s, t;
    private int n;
    private long[] pw1, pw2, hs1, hs2, ht1, ht2;
    private int probe;
    private int bestKind, bestK;

    public String lexSmallest(String s) {
        this.s = s;
        n = s.length();
        t = new StringBuilder(s).reverse().toString();
        // Double rolling hashes over s and over its reverse: each candidate
        // glues at most two slices of these two strings, so any candidate
        // prefix hashes in O(1) from the tables below. reverse(s[:k]) is the
        // slice of the reversed string at offset n-k; reverse(s[n-k:]) sits
        // at offset 0.
        pw1 = new long[n + 1];
        pw2 = new long[n + 1];
        hs1 = new long[n + 1];
        hs2 = new long[n + 1];
        ht1 = new long[n + 1];
        ht2 = new long[n + 1];
        pw1[0] = 1L;
        pw2[0] = 1L;
        for (int i = 0; i < n; i++) {
            long v = s.charAt(i) - 'a' + 1,
                w = t.charAt(i) - 'a' + 1;
            pw1[i + 1] = (pw1[i] * B1) % M1;
            pw2[i + 1] = (pw2[i] * B2) % M2;
            hs1[i + 1] = (hs1[i] * B1 + v) % M1;
            hs2[i + 1] = (hs2[i] * B2 + v) % M2;
            ht1[i + 1] = (ht1[i] * B1 + w) % M1;
            ht2[i + 1] = (ht2[i] * B2 + w) % M2;
        }
        probe = Math.min(n, 16);
        bestKind = 0;
        bestK = -1;
        // Only candidates starting with the smallest letter can win.
        char smallest = s.charAt(0);
        for (int i = 1; i < n; i++) {
            if (s.charAt(i) < smallest) {
                smallest = s.charAt(i);
            }
        }
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == smallest && (bestK < 0 || beats(0, i + 1))) {
                bestKind = 0;
                bestK = i + 1;
            }
        }
        if (s.charAt(0) == smallest) {
            for (int k = 2; k <= n; k++) {
                if (beats(1, k)) {
                    bestKind = 1;
                    bestK = k;
                }
            }
        }
        // Materialize only the winning candidate.
        if (bestKind == 0) {
            return new StringBuilder(s.substring(0, bestK)).reverse() + s.substring(bestK);
        }
        return s.substring(0, n - bestK) + new StringBuilder(s.substring(n - bestK)).reverse();
    }

    private long[] subS(int l, int length) {
        return new long[] {
            (hs1[l + length] - ((hs1[l] * pw1[length]) % M1) + M1) % M1,
            (hs2[l + length] - ((hs2[l] * pw2[length]) % M2) + M2) % M2,
        };
    }

    private long[] subT(int l, int length) {
        return new long[] {
            (ht1[l + length] - ((ht1[l] * pw1[length]) % M1) + M1) % M1,
            (ht2[l + length] - ((ht2[l] * pw2[length]) % M2) + M2) % M2,
        };
    }

    // Hash pair of a candidate's first `length` characters: kind 0 is
    // reverse(s[:k]) + s[k:] (slices t[:k] then s[k:]), kind 1 is
    // s[:n-k] + reverse(s[n-k:]) (slices s[:head] then t[:head]).
    private long[] pref(int kind, int k, int length) {
        if (kind == 0) {
            if (length <= k) {
                return subT(n - k, length);
            }
            long[] a = subT(n - k, k),
                c = subS(k, length - k);
            return new long[] { (a[0] * pw1[length - k] + c[0]) % M1, (a[1] * pw2[length - k] + c[1]) % M2 };
        }
        int head = n - k;
        if (length <= head) {
            return subS(0, length);
        }
        long[] a = subS(0, head),
            c = subT(0, length - head);
        return new long[] { (a[0] * pw1[length - head] + c[0]) % M1, (a[1] * pw2[length - head] + c[1]) % M2 };
    }

    private char charAt(int kind, int k, int i) {
        // Kind 0 walks the reversed prefix backwards through s; past the
        // boundary both kinds continue with s at the same index.
        if (kind == 0) {
            return i < k ? s.charAt(k - 1 - i) : s.charAt(i);
        }
        int head = n - k;
        return i < head ? s.charAt(i) : t.charAt(i - head);
    }

    private boolean beats(int kind, int k) {
        // True when this candidate sorts strictly before the champion.
        // Exact probe first: most contenders differ within a few chars.
        for (int i = 0; i < probe; i++) {
            char a = charAt(kind, k, i),
                c = charAt(bestKind, bestK, i);
            if (a != c) {
                return a < c;
            }
        }
        // Indistinguishable near the front: settle the rest by hashed
        // longest-common-prefix binary search (probe chars already tie).
        int lo = probe,
            hi = n;
        while (lo < hi) {
            int mid = (lo + hi + 1) / 2;
            long[] a = pref(kind, k, mid),
                b = pref(bestKind, bestK, mid);
            if (a[0] == b[0] && a[1] == b[1]) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        if (lo == n) {
            return false;
        }
        return charAt(kind, k, lo) < charAt(bestKind, bestK, lo);
    }
}
