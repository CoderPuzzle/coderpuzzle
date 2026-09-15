class Solution {

    public int sortArray(int[] nums) {
        int n = nums.length;
        int[] targetA = new int[n];
        int[] targetB = new int[n];
        targetA[0] = n - 1;
        for (int v = 1; v < n; v++) targetA[v] = v - 1;
        for (int v = 0; v < n; v++) targetB[v] = v;
        // Two sorted layouts exist — blank last or blank first; compare both
        // (an array cheap for one goal can be dear for the other).
        return Math.min(opsFor(nums, targetA), opsFor(nums, targetB));
    }

    private int opsFor(int[] nums, int[] target) {
        int n = nums.length;
        // sigma[i] = destination slot of the item currently at slot i.
        int[] sigma = new int[n];
        for (int i = 0; i < n; i++) sigma[i] = target[nums[i]];
        int blank = -1;
        for (int i = 0; i < n; i++) {
            if (nums[i] == 0) {
                blank = i;
                break;
            }
        }
        boolean[] visited = new boolean[n];
        int total = 0;
        for (int i = 0; i < n; i++) {
            if (visited[i]) continue;
            // Walk one cycle of the permutation i -> sigma[i].
            int length = 0;
            boolean hasBlank = false;
            int j = i;
            while (!visited[j]) {
                visited[j] = true;
                if (j == blank) hasBlank = true;
                length++;
                j = sigma[j];
            }
            if (hasBlank) {
                // Each move drops one item into the hole the blank occupies,
                // walking the blank home: length - 1 moves.
                total += length - 1;
            } else if (length >= 2) {
                // One extra move pulls the blank into this cycle (an item
                // gets displaced to the blank's own goal), then L in-cycle
                // placements return it: L + 1 moves.
                total += length + 1;
            }
            // Length-1 cycles are already home and cost nothing.
        }
        return total;
    }
}
