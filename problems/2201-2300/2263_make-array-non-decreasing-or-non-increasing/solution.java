import java.util.Collections;
import java.util.PriorityQueue;

class Solution {

    private int nonDecreasingCost(int[] values) {
        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
        long cost = 0;
        for (int v : values) {
            heap.add(v);
            if (heap.peek() > v) {
                cost += heap.peek() - v;
                heap.poll();
                heap.add(v);
            }
        }
        return (int) cost;
    }

    public int convertArray(int[] nums) {
        int[] negated = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            negated[i] = -nums[i];
        }
        int up = nonDecreasingCost(nums);
        int down = nonDecreasingCost(negated);
        return Math.min(up, down);
    }
}
