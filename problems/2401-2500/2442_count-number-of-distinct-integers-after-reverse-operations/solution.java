import java.util.HashSet;
import java.util.Set;

class Solution {

    public int countDistinctIntegers(int[] nums) {
        // The final array holds the originals plus one reversal per
        // original, so its distinct values are exactly the set
        // {originals} ∪ {reversals}. Reversal never changes the digit
        // count, so every value stays <= 10^6 and fits an int. Leading
        // zeros vanish because Long.parseLong skips them ("01" parses
        // as 1).
        Set<Integer> seen = new HashSet<>();
        for (int value : nums) {
            seen.add(value);
            long reversed = 0;
            for (int rest = value; rest > 0; rest /= 10) {
                reversed = reversed * 10 + (rest % 10);
            }
            seen.add((int) reversed);
        }
        return seen.size();
    }
}
