import java.util.HashMap;
import java.util.Map;

class Solution {

    public long countInterestingSubarrays(int[] nums, int modulo, int k) {
        // Only whether nums[i] % modulo == k matters, so track pref: the
        // number of hits among the prefix. A subarray is interesting iff its
        // hit count has residue k — prefix-sum counting, applied to
        // residues. Seed residue 0 for the empty prefix so subarrays
        // starting at index 0 are counted.
        Map<Integer, Long> count = new HashMap<>();
        count.put(0, 1L);
        int pref = 0;
        long ans = 0;
        for (int x : nums) {
            if (x % modulo == k) pref++;
            // Right endpoint at i pairs with every earlier boundary l where
            // pref[right] - pref[l] = k (mod modulo), i.e. pref[l] has this
            // residue. floorMod keeps lookups consistent when pref < k.
            int need = Math.floorMod(pref - k, modulo);
            ans += count.getOrDefault(need, 0L);
            int key = pref % modulo;
            count.merge(key, 1L, Long::sum);
        }
        return ans;
    }
}
