import java.util.Arrays;

class Solution {

    public int minimumCost(int[] cost) {
        int[] values = cost.clone();
        Arrays.sort(values);
        int total = 0;
        int descendingIndex = 0;
        for (int index = values.length - 1; index >= 0; index--) {
            if (descendingIndex % 3 != 2) {
                total += values[index];
            }
            descendingIndex++;
        }
        return total;
    }
}
