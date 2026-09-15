import java.util.Arrays;

class Solution {

    public int[] successfulPairs(int[] spells, int[] potions, long success) {
        // a pair works iff spell * potion >= success, i.e. potion >= need;
        // successful potions are exactly the strongest suffix of the sorted array
        Arrays.sort(potions);
        int n = spells.length;
        int m = potions.length;
        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            // ceil(success / spell) in integer arithmetic: exact even at 1e10
            long need = (success + spells[i] - 1) / spells[i];
            // first index with potions[idx] >= need
            int lo = 0,
                hi = m;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (potions[mid] >= need) hi = mid;
                else lo = mid + 1;
            }
            // every potion from lo on is >= need: that suffix all succeeds
            res[i] = m - lo;
        }
        return res;
    }
}
