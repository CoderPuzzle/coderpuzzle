import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] onceTwice(int[] nums) {
        // Exactly one value occurs once, one occurs twice, the rest thrice;
        // a frequency table over the distinct values finds the two specials.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int x : nums) counts.merge(x, 1, Integer::sum);
        int once = 0,
            twice = 0;
        // First answer is the count-1 value, second the count-2 value.
        for (Map.Entry<Integer, Integer> e : counts.entrySet()) {
            if (e.getValue() == 1) once = e.getKey();
            else if (e.getValue() == 2) twice = e.getKey();
        }
        return new int[] { once, twice };
    }
}
