import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

class Solution {

    private static class SegmentTree {

        private final int size;
        private final int inf;
        private final int[] count;
        private final int[] minimum;

        SegmentTree(int n) {
            int power = 1;
            while (power < n + 1) {
                power *= 2;
            }
            size = power;
            inf = n + 1;
            count = new int[2 * size];
            minimum = new int[2 * size];
            java.util.Arrays.fill(minimum, inf);
        }

        void update(int position, boolean active, int mth) {
            int node = size + position;
            count[node] = active ? 1 : 0;
            minimum[node] = active ? mth : inf;
            for (node /= 2; node > 0; node /= 2) {
                count[node] = count[2 * node] + count[2 * node + 1];
                minimum[node] = Math.min(minimum[2 * node], minimum[2 * node + 1]);
            }
        }

        int total() {
            return count[1];
        }

        int kthLatest(int need) {
            int node = 1;
            while (node < size) {
                int right = 2 * node + 1;
                if (count[right] >= need) {
                    node = right;
                } else {
                    need -= count[right];
                    node = right - 1;
                }
            }
            return node - size;
        }

        int rangeMinimum(int left, int right) {
            left += size;
            right += size;
            int result = inf;
            while (left <= right) {
                if ((left & 1) != 0) {
                    result = Math.min(result, minimum[left++]);
                }
                if ((right & 1) == 0) {
                    result = Math.min(result, minimum[right--]);
                }
                left /= 2;
                right /= 2;
            }
            return result;
        }
    }

    public long countSubarrays(int[] nums, int k, int m) {
        int n = nums.length;
        SegmentTree tree = new SegmentTree(n);
        Map<Integer, ArrayList<Integer>> history = new HashMap<>();
        long answer = 0;

        for (int right = 1; right <= n; ++right) {
            ArrayList<Integer> places = history.computeIfAbsent(nums[right - 1], ignored -> new ArrayList<>());
            if (!places.isEmpty()) {
                tree.update(places.get(places.size() - 1), false, 0);
            }
            places.add(right);
            int mth = places.size() >= m ? places.get(places.size() - m) : 0;
            tree.update(right, true, mth);

            if (tree.total() < k) {
                continue;
            }
            int lastK = tree.kthLatest(k);
            int lastNext = tree.total() > k ? tree.kthLatest(k + 1) : 0;
            int minMth = tree.rangeMinimum(lastK, n);
            answer += Math.max(0, Math.min(lastK, minMth) - lastNext);
        }
        return answer;
    }
}
