import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int maximumSum(int[] nums) {
        // Group values by remainder mod 3 and keep the three largest of
        // each group -- no valid triplet ever needs a group's fourth-
        // largest value. The only remainder patterns summing to 0 mod 3
        // are 000, 111, 222, and 012, so at most nine values decide
        // everything; the answer is at most 3 * 10^5, safely inside 32
        // bits. If no pattern is achievable the answer stays 0.
        List<List<Integer>> top = new ArrayList<>();
        for (int i = 0; i < 3; ++i) {
            top.add(new ArrayList<>());
        }
        for (int v : nums) {
            top.get(v % 3).add(v);
        }
        for (List<Integer> group : top) {
            Collections.sort(group, Collections.reverseOrder());
            while (group.size() > 3) {
                group.remove(group.size() - 1);
            }
        }
        int best = 0;
        for (int r = 0; r < 3; ++r) {
            int total = take(top, r, 3);
            if (total > best) {
                best = total;
            }
        }
        int a = take(top, 0, 1);
        int b = take(top, 1, 1);
        int c = take(top, 2, 1);
        if (a >= 0 && b >= 0 && c >= 0 && a + b + c > best) {
            best = a + b + c;
        }
        return best;
    }

    private static int take(List<List<Integer>> top, int r, int k) {
        List<Integer> group = top.get(r);
        if (group.size() < k) {
            return -1;
        }
        int total = 0;
        for (int i = 0; i < k; ++i) {
            total += group.get(i);
        }
        return total;
    }
}
