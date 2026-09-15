import java.util.Arrays;

class Solution {

    public long maxAlternatingSum(int[] nums, int k) {
        int[] values = nums.clone();
        Arrays.sort(values);
        int unique = 0;
        for (int value : values) {
            if (unique == 0 || values[unique - 1] != value) values[unique++] = value;
        }
        MaxTree upTree = new MaxTree(unique);
        MaxTree downTree = new MaxTree(unique);
        long[] up = new long[nums.length];
        long[] down = new long[nums.length];
        long answer = 0;

        for (int i = 0; i < nums.length; i++) {
            if (i >= k) {
                int eligible = i - k;
                int rank = Arrays.binarySearch(values, 0, unique, nums[eligible]);
                upTree.update(rank, up[eligible]);
                downTree.update(rank, down[eligible]);
            }
            int rank = Arrays.binarySearch(values, 0, unique, nums[i]);
            up[i] = nums[i] + downTree.query(0, rank);
            down[i] = nums[i] + upTree.query(rank + 1, unique);
            answer = Math.max(answer, Math.max(up[i], down[i]));
        }
        return answer;
    }

    private static class MaxTree {

        private final int size;
        private final long[] tree;

        MaxTree(int length) {
            int power = 1;
            while (power < length) power *= 2;
            size = power;
            tree = new long[2 * size];
        }

        void update(int index, long value) {
            index += size;
            tree[index] = Math.max(tree[index], value);
            for (index /= 2; index > 0; index /= 2) {
                tree[index] = Math.max(tree[2 * index], tree[2 * index + 1]);
            }
        }

        long query(int left, int right) {
            left += size;
            right += size;
            long best = 0;
            while (left < right) {
                if ((left & 1) == 1) best = Math.max(best, tree[left++]);
                if ((right & 1) == 1) best = Math.max(best, tree[--right]);
                left /= 2;
                right /= 2;
            }
            return best;
        }
    }
}
