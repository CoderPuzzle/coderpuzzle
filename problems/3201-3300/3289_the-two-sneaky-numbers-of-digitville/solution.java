import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] getSneakyNumbers(int[] nums) {
        // Values all lie in 0..n-1, so a counter array indexed by value finds
        // the two count-2 entries; the ascending walk emits them in order.
        int n = nums.length - 2;
        int[] count = new int[n];
        for (int x : nums) {
            count[x]++;
        }
        List<Integer> sneaky = new ArrayList<>();
        for (int v = 0; v < n; v++) {
            if (count[v] == 2) {
                sneaky.add(v);
            }
        }
        return sneaky.stream().mapToInt(Integer::intValue).toArray();
    }
}
