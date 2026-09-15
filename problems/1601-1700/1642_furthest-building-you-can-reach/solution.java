import java.util.PriorityQueue;

class Solution {

    public int furthestBuilding(int[] heights, int bricks, int ladders) {
        // Min-heap of the climbs covered by ladders
        PriorityQueue<Integer> ladderClimbs = new PriorityQueue<>();
        for (int i = 0; i < heights.length - 1; i++) {
            int climb = heights[i + 1] - heights[i];
            if (climb <= 0) {
                continue;
            }
            ladderClimbs.offer(climb);
            if (ladderClimbs.size() > ladders) {
                bricks -= ladderClimbs.poll();
                if (bricks < 0) {
                    return i;
                }
            }
        }
        return heights.length - 1;
    }
}
