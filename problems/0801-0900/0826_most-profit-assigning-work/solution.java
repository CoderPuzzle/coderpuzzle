import java.util.Arrays;

class Solution {

    public int maxProfitAssignment(int[] difficulty, int[] profit, int[] worker) {
        // Workers never compete: jobs are reusable, so each worker simply
        // earns the maximum profit among the jobs whose difficulty is at
        // most their ability. Sort the jobs by difficulty, carry the running
        // profit maximum, and read every worker's earning off a binary
        // search into the sorted difficulties.
        int n = difficulty.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; ++i) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> Integer.compare(difficulty[a], difficulty[b]));
        int[] hardest = new int[n];
        int[] best = new int[n];
        int top = 0;
        for (int i = 0; i < n; ++i) {
            int job = order[i];
            top = Math.max(top, profit[job]);
            hardest[i] = difficulty[job];
            best[i] = top;
        }
        long total = 0;
        for (int ability : worker) {
            int index = upperBound(hardest, ability) - 1;
            if (index >= 0) {
                total += best[index];
            }
        }
        return (int) total;
    }

    private int upperBound(int[] values, int target) {
        int low = 0;
        int high = values.length;
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (values[mid] <= target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
}
