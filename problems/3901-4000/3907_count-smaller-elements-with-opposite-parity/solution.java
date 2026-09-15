import java.util.Arrays;

class Solution {

    public int[] countSmallerOppositeParity(int[] nums) {
        int[] values = nums.clone();
        Arrays.sort(values);
        int unique = 0;
        for (int value : values) {
            if (unique == 0 || values[unique - 1] != value) {
                values[unique++] = value;
            }
        }

        int[][] trees = new int[2][unique + 1];
        int[] answer = new int[nums.length];
        for (int i = nums.length - 1; i >= 0; i--) {
            int rank = Arrays.binarySearch(values, 0, unique, nums[i]) + 1;
            int parity = nums[i] & 1;
            answer[i] = query(trees[parity ^ 1], rank - 1);
            update(trees[parity], rank);
        }
        return answer;
    }

    private int query(int[] tree, int index) {
        int total = 0;
        while (index > 0) {
            total += tree[index];
            index -= index & -index;
        }
        return total;
    }

    private void update(int[] tree, int index) {
        while (index < tree.length) {
            tree[index]++;
            index += index & -index;
        }
    }
}
