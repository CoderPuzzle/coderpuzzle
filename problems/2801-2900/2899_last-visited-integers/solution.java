import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] lastVisitedIntegers(int[] nums) {
        // seen holds the positives with the most recent one at the front; k
        // counts consecutive -1s and every positive resets it, so each -1
        // either reads the k-th element from the front of seen — the k-th
        // most recent positive — or appends -1 when seen is too short.
        List<Integer> seen = new ArrayList<>();
        List<Integer> ansList = new ArrayList<>();
        int k = 0;
        for (int num : nums) {
            if (num != -1) {
                seen.add(0, num);
                k = 0;
            } else {
                k += 1;
                ansList.add(k <= seen.size() ? seen.get(k - 1) : -1);
            }
        }
        int[] ans = new int[ansList.size()];
        for (int i = 0; i < ans.length; ++i) {
            ans[i] = ansList.get(i);
        }
        return ans;
    }
}
