class Solution {

    private long remaining;

    public String smallestPalindrome(String s, int k) {
        // The k-th palindrome is the k-th arrangement of the forced half
        // multiset (count[c] / 2 of each letter), mirrored around the lone
        // odd letter. Walk the half's positions picking, smallest letter
        // first, the letter whose block still contains rank k. Multinomials
        // are capped at k; every intermediate stays below k * n
        // <= 10^6 * 5000, well inside 64-bit.
        remaining = k;
        int[] counts = new int[26];
        for (char ch : s.toCharArray()) {
            counts[ch - 'a'] += 1;
        }
        int[] half = new int[26];
        int m = s.length() / 2;
        String middle = "";
        for (int i = 0; i < 26; ++i) {
            half[i] = counts[i] / 2;
            if (counts[i] % 2 == 1) {
                middle = String.valueOf((char) ('a' + i));
            }
        }
        if (arrangements(half, m) < remaining) {
            return "";
        }
        StringBuilder head = new StringBuilder();
        int r = m;
        while (r > 0) {
            for (int c = 0; c < 26; ++c) {
                if (half[c] == 0) continue;
                half[c] -= 1;
                long ways = arrangements(half, r - 1);
                if (remaining <= ways) {
                    head.append((char) ('a' + c));
                    r -= 1;
                    break;
                }
                remaining -= ways;
                half[c] += 1;
            }
        }
        String front = head.toString();
        String tail = new StringBuilder(front).reverse().toString();
        return front + middle + tail;
    }

    // min(multinomial of the half counts over r slots, remaining): a product
    // of binomials abandoned the moment it reaches remaining.
    private long arrangements(int[] half, int r) {
        long acc = 1;
        int rem = r;
        for (int i = 0; i < 26; ++i) {
            int c = half[i];
            if (c == 0) continue;
            int small = Math.min(c, rem - c);
            long binom = 1;
            for (int j = 1; j <= small; ++j) {
                binom = (binom * (rem - small + j)) / j;
                if (binom >= remaining) {
                    binom = remaining;
                    break;
                }
            }
            acc *= binom;
            if (acc >= remaining) {
                return remaining;
            }
            rem -= c;
        }
        return acc;
    }
}
