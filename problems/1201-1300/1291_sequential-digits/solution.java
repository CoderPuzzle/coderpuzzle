import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] sequentialDigits(int low, int high) {
        // A sequential number is fully determined by its first digit and
        // its length — at most 9 lengths x 9 starting digits minus the runs
        // that would pass 9. Slide a fixed-length window over "123456789"
        // for each length; every window cut is one candidate, already in
        // ascending order because longer windows only add larger values.
        String digits = "123456789";
        List<Integer> collected = new ArrayList<>();
        for (int length = 2; length <= 9; length++) {
            for (int start = 0; start + length <= 9; start++) {
                int value = Integer.parseInt(digits.substring(start, start + length));
                if (value > high) {
                    break;
                }
                if (value >= low) {
                    collected.add(value);
                }
            }
        }
        int[] result = new int[collected.size()];
        for (int i = 0; i < result.length; i++) {
            result[i] = collected.get(i);
        }
        return result;
    }
}
