import java.util.Arrays;

class Solution {

    public int maxNumberOfApples(int[] weight) {
        // Lightest apples first: any optimal packing can be assumed to
        // consist of them, so a sorted greedy prefix is exactly optimal.
        Arrays.sort(weight);
        long total = 0;
        for (int i = 0; i < weight.length; i++) {
            if (total + weight[i] > 5000) {
                return i;
            }
            total += weight[i];
        }
        return weight.length;
    }
}
