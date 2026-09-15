class Solution {

    public int jump(int[] nums) {
        // Implicit BFS over jump levels: the indices reachable in `jumps`
        // steps form the window (currentEnd, nextEnd], so one left-to-right
        // walk with two window edges replaces an explicit queue.
        int jumps = 0;
        int currentEnd = 0;
        int nextEnd = 0;
        for (int index = 0; index < nums.length - 1; ++index) {
            nextEnd = Math.max(nextEnd, index + nums[index]);
            if (index == currentEnd) {
                // The level is exhausted; the next jump starts the level
                // that reaches as far as anything scanned so far.
                jumps++;
                currentEnd = nextEnd;
            }
        }
        // A single-element array never enters the loop: 0 jumps.
        return jumps;
    }
}
