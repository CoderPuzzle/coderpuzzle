import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public int countPairs(int[] nums) {
        // Splitting the two operations between the numbers never helps;
        // the minimum number of digit swaps turning one padded string into
        // another obeys the triangle inequality, so x and y are almost
        // equal exactly when y is reachable from x by <= 2 swaps of x's
        // own digits, compared with leading zeros padded to the longer
        // length (that is how 1023 becomes 0213 = 213 and 1 meets 100).
        //
        // Pad every number to the widest width w (<= 7), enumerate all
        // values reachable by 0, 1, or 2 swaps (at most 1 + C(w,2) +
        // C(w,2)^2 deduplicated states), and sweep left to right: add the
        // frequencies of already-seen numbers found in the reachable set,
        // then record the current number. Each pair is counted once, via
        // the later element querying the earlier one's actual value.
        int widest = 0;
        for (int x : nums) {
            widest = Math.max(widest, x);
        }
        int w = Integer.toString(widest).length();
        int m = (w * (w - 1)) / 2;
        int[] pairI = new int[m];
        int[] pairJ = new int[m];
        int t = 0;
        for (int i = 0; i < w; i++) {
            for (int j = i + 1; j < w; j++) {
                pairI[t] = i;
                pairJ[t] = j;
                t++;
            }
        }
        Map<Integer, Integer> seen = new HashMap<>();
        int ans = 0;
        for (int x : nums) {
            char[] d = new char[w];
            String s = Integer.toString(x);
            for (int k = 0; k < w - s.length(); k++) {
                d[k] = '0';
            }
            for (int k = 0; k < s.length(); k++) {
                d[w - s.length() + k] = s.charAt(k);
            }
            Set<Integer> states = new HashSet<>();
            states.add(Integer.parseInt(new String(d)));
            for (int e = 0; e < m; e++) {
                int i = pairI[e],
                    j = pairJ[e];
                char tmp = d[i];
                d[i] = d[j];
                d[j] = tmp;
                states.add(Integer.parseInt(new String(d)));
                for (int f = 0; f < m; f++) {
                    int k = pairI[f],
                        l = pairJ[f];
                    char tmp2 = d[k];
                    d[k] = d[l];
                    d[l] = tmp2;
                    states.add(Integer.parseInt(new String(d)));
                    tmp2 = d[k];
                    d[k] = d[l];
                    d[l] = tmp2;
                }
                tmp = d[i];
                d[i] = d[j];
                d[j] = tmp;
            }
            for (int v : states) {
                ans += seen.getOrDefault(v, 0);
            }
            seen.merge(x, 1, Integer::sum);
        }
        return ans;
    }
}
