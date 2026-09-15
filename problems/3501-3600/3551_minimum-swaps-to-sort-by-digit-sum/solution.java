import java.util.Arrays;

class Solution {

    public int minSwaps(int[] nums) {
        // Sorting by (digit sum, value) fixes the target order; mapping
        // every element to its target position turns the rearrangement
        // into a permutation, and the minimum number of swaps is
        // n - (number of cycles): each cycle of length L costs L - 1.
        // The cycle walk is iterative -- n reaches 10^5, past any safe
        // recursion depth.
        int n = nums.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> {
            int sa = digitSum(nums[a]);
            int sb = digitSum(nums[b]);
            return sa != sb ? Integer.compare(sa, sb) : Integer.compare(nums[a], nums[b]);
        });
        int[] pos = new int[n];
        for (int target = 0; target < n; target++) {
            pos[order[target]] = target;
        }
        int swaps = 0;
        boolean[] visited = new boolean[n];
        for (int i = 0; i < n; i++) {
            if (visited[i]) {
                continue;
            }
            int length = 0;
            int j = i;
            while (!visited[j]) {
                visited[j] = true;
                j = pos[j];
                length++;
            }
            swaps += length - 1;
        }
        return swaps;
    }

    private int digitSum(int v) {
        int s = 0;
        for (; v > 0; v /= 10) {
            s += v % 10;
        }
        return s;
    }
}
