import java.util.*;

class Solution {

    // Prefix sums over the two cyclic cost rings give every letter
    // pair's cheaper direction; the answer sums the per-index pair
    // costs. One pair costs at most 25 * 10^9 = 2.5*10^10, so pair
    // costs and the grand total are accumulated in long.
    public long shiftDistance(String s, String t, int[] nextCost, int[] previousCost) {
        long[] pn = new long[27];
        long[] pp = new long[27];
        for (int k = 0; k < 26; k++) {
            pn[k + 1] = pn[k] + nextCost[k];
            pp[k + 1] = pp[k] + previousCost[k];
        }
        long[][] cost = new long[26][26];
        for (int a = 0; a < 26; a++) {
            for (int b = 0; b < 26; b++) {
                long nxt;
                if (a < b) {
                    nxt = pn[b] - pn[a];
                } else if (a > b) {
                    nxt = pn[26] - pn[a] + pn[b];
                } else {
                    nxt = 0;
                }
                long prv;
                if (b < a) {
                    prv = pp[a + 1] - pp[b + 1];
                } else if (b > a) {
                    prv = pp[26] - pp[b + 1] + pp[a + 1];
                } else {
                    prv = 0;
                }
                cost[a][b] = Math.min(nxt, prv);
            }
        }
        long total = 0;
        for (int i = 0; i < s.length(); i++) {
            total += cost[s.charAt(i) - 'a'][t.charAt(i) - 'a'];
        }
        return total;
    }
}
