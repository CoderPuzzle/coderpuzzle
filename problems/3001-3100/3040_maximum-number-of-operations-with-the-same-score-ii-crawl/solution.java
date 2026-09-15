class Solution {

    public int maxOperations(int[] nums) {
        // The first operation fixes the score, and its pair is one of three:
        // the two head elements, the two tail elements, or both end elements.
        int n = nums.length;
        int headPair = nums[0] + nums[1];
        int endPair = nums[0] + nums[n - 1];
        int tailPair = nums[n - 2] + nums[n - 1];
        int best = 0;
        int[] openingScores = { headPair, endPair, tailPair };
        for (int target : openingScores) {
            // Every operation deletes exactly two elements, so a window keeps
            // its width parity; roll one dp layer per reachable width.
            int[] previous = new int[n + 2];
            for (int width = 2 + (n % 2); width <= n; width += 2) {
                int[] current = new int[n + 2];
                for (int left = 0; left + width <= n; left++) {
                    int right = left + width - 1;
                    int value = 0;
                    if (nums[left] + nums[right] == target) {
                        value = Math.max(value, 1 + previous[left + 1]);
                    }
                    if (nums[left] + nums[left + 1] == target) {
                        value = Math.max(value, 1 + previous[left + 2]);
                    }
                    if (nums[right - 1] + nums[right] == target) {
                        value = Math.max(value, 1 + previous[left]);
                    }
                    current[left] = value;
                }
                int[] swap = previous;
                previous = current;
                current = swap;
            }
            best = Math.max(best, previous[0]);
        }
        return best;
    }
}
