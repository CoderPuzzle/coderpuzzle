class Solution {

    public String lexPalindromicPermutation(String s, String target) {
        int n = s.length();
        int[] freq = new int[26];
        for (int i = 0; i < n; i++) {
            freq[s.charAt(i) - 'a']++;
        }
        // Parity law: every count even, or exactly one odd count absorbed by
        // the middle character when n is odd.
        int odds = 0,
            oddLetter = -1;
        for (int d = 0; d < 26; d++) {
            if (freq[d] % 2 == 1) {
                odds++;
                oddLetter = d;
            }
        }
        if (odds != n % 2) {
            return "";
        }
        // The half multiset is forced — freq[d] / 2 of every letter — and on
        // odd lengths the odd letter pins the middle, so comparing
        // palindromes reduces to comparing (half, middle, mirrored half).
        int[] half = new int[26];
        for (int d = 0; d < 26; d++) {
            half[d] = freq[d] / 2;
        }
        int m = n / 2;
        String p = target.substring(0, m);
        // Candidate 1: keep the half equal to target's own first half p. That
        // pins the entire palindrome, which qualifies only if it already
        // clears target past the shared prefix.
        String best = null;
        int[] pc = new int[26];
        for (int i = 0; i < m; i++) {
            pc[p.charAt(i) - 'a']++;
        }
        boolean matches = true;
        for (int d = 0; d < 26; d++) {
            if (pc[d] != half[d]) {
                matches = false;
            }
        }
        if (matches) {
            String mirrored = new StringBuilder(p).reverse().toString();
            String suffix = target.substring(m + (n % 2));
            boolean wins;
            if (n % 2 == 0) {
                wins = mirrored.compareTo(suffix) > 0;
            } else {
                int mid = target.charAt(m) - 'a';
                wins = oddLetter > mid || (oddLetter == mid && mirrored.compareTo(suffix) > 0);
            }
            if (wins) {
                best = p;
            }
        }
        // Candidate 2: the smallest half arrangement strictly greater than p
        // — match p as far as possible, remembering the latest position where
        // a larger still-available letter existed, and fall back to it.
        if (best == null) {
            int[] cur = half.clone();
            int bumpAt = -1,
                bumpCh = -1;
            int[] bumpCur = null;
            for (int i = 0; i < m; i++) {
                int ci = p.charAt(i) - 'a';
                for (int d = ci + 1; d < 26; d++) {
                    if (cur[d] > 0) {
                        bumpAt = i;
                        bumpCh = d;
                        bumpCur = cur.clone();
                        break;
                    }
                }
                if (cur[ci] == 0) {
                    break;
                }
                cur[ci]--;
            }
            if (bumpAt >= 0) {
                StringBuilder sb = new StringBuilder(target.substring(0, bumpAt));
                sb.append((char) ('a' + bumpCh));
                bumpCur[bumpCh]--;
                for (int d = 0; d < 26; d++) {
                    for (int k = 0; k < bumpCur[d]; k++) {
                        sb.append((char) ('a' + d));
                    }
                }
                best = sb.toString();
            }
        }
        if (best == null) {
            return "";
        }
        StringBuilder result = new StringBuilder(best);
        if (n % 2 == 1) {
            result.append((char) ('a' + oddLetter));
        }
        for (int i = m - 1; i >= 0; i--) {
            result.append(best.charAt(i));
        }
        return result.toString();
    }
}
