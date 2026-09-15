import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] findDiagonalOrder(int[][] nums) {
        List<List<Integer>> buckets = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            for (int j = 0; j < nums[i].length; j++) {
                int key = i + j;
                while (buckets.size() <= key) {
                    buckets.add(new ArrayList<>());
                }
                buckets.get(key).add(nums[i][j]);
            }
        }
        int total = 0;
        for (List<Integer> bucket : buckets) {
            total += bucket.size();
        }
        int[] result = new int[total];
        int fill = 0;
        for (List<Integer> bucket : buckets) {
            for (int i = bucket.size() - 1; i >= 0; i--) {
                result[fill++] = bucket.get(i);
            }
        }
        return result;
    }
}
