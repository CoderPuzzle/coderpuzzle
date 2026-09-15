import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public boolean maxSubstringLength(String s, int k) {
        int n = s.length();
        int[] first = new int[26];
        int[] last = new int[26];
        Arrays.fill(first, -1);
        for (int i = 0; i < n; i++) {
            int c = s.charAt(i) - 'a';
            if (first[c] == -1) first[c] = i;
            last[c] = i;
        }
        List<int[]> intervals = new ArrayList<>();
        // Every special substring starts at the first occurrence of its
        // first letter — any earlier repeat would sit outside it — so at
        // most 26 candidate starts exist.
        for (int c = 0; c < 26; c++) {
            if (first[c] == -1) continue;
            int a = first[c];
            // Grow the window right until it covers every occurrence of
            // every character inside it; a character leaking left of the
            // start invalidates this start entirely.
            int far = last[c];
            boolean ok = true;
            for (int j = a; j <= far; j++) {
                int x = s.charAt(j) - 'a';
                if (first[x] < a) {
                    ok = false;
                    break;
                }
                far = Math.max(far, last[x]);
            }
            // The whole string itself is not a valid selection.
            if (ok && (a > 0 || far < n - 1)) intervals.add(new int[] { a, far });
        }
        // Classic activity selection: taking earliest ends leaves the most
        // room for further disjoint picks.
        intervals.sort((u, v) -> Integer.compare(u[1], v[1]));
        int count = 0;
        int end = -1;
        for (int[] iv : intervals) {
            if (iv[0] > end) {
                count++;
                end = iv[1];
            }
        }
        return count >= k;
    }
}
