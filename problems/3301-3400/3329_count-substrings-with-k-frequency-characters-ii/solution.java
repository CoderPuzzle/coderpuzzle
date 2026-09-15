class Solution {

    public long numberOfSubstrings(String s, int k) {
        int n = s.length();
        int[] count = new int[26];
        int sat = 0; // number of characters whose window count has reached k
        int r = 0;
        long total = 0;
        for (int l = 0; l < n; l++) {
            // Window is [l, r). Extend until some character reaches count
            // k: validity only grows as the window widens, so the first
            // end that works for l also works for every larger end.
            while (r < n && sat == 0) {
                int c = s.charAt(r) - 'a';
                count[c]++;
                if (count[c] == k) sat++;
                r++;
            }
            if (sat == 0) break; // no window from l (or any later l) can become valid
            // [l, r - 1] is the minimal valid window from l, so exactly the
            // ends r - 1 .. n - 1 are valid: n - (r - 1) substrings.
            total += n - (r - 1);
            int c = s.charAt(l) - 'a';
            if (count[c] == k) sat--;
            count[c]--;
        }
        return total;
    }
}
