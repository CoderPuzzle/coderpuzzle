import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int maxFixedPoints(int[] nums) {
        int[][] candidates = new int[nums.length][2];
        int size = 0;
        for (int i = 0; i < nums.length; ++i) {
            if (nums[i] <= i) candidates[size++] = new int[] { nums[i], i - nums[i] };
        }
        Arrays.sort(candidates, 0, size, (a, b) ->
            a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1])
        );
        int[] bit = new int[nums.length + 1];
        int answer = 0;
        for (int start = 0; start < size; ) {
            int end = start;
            List<int[]> pending = new ArrayList<>();
            while (end < size && candidates[end][0] == candidates[start][0]) {
                int deletionCount = candidates[end][1];
                int length = query(bit, deletionCount) + 1;
                pending.add(new int[] { deletionCount, length });
                answer = Math.max(answer, length);
                ++end;
            }
            for (int[] item : pending) update(bit, item[0], item[1]);
            start = end;
        }
        return answer;
    }

    private static int query(int[] bit, int index) {
        int best = 0;
        for (++index; index > 0; index -= index & -index) best = Math.max(best, bit[index]);
        return best;
    }

    private static void update(int[] bit, int index, int value) {
        for (++index; index < bit.length; index += index & -index) bit[index] = Math.max(bit[index], value);
    }
}
