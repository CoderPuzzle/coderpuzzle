import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] secondGreaterElement(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        Arrays.fill(result, -1);
        Deque<Integer> first = new ArrayDeque<>(); // awaiting first greater
        Deque<Integer> second = new ArrayDeque<>(); // awaiting second greater
        for (int i = 0; i < n; i++) {
            int x = nums[i];
            while (!second.isEmpty() && nums[second.peek()] < x) {
                result[second.pop()] = x;
            }
            List<Integer> batch = new ArrayList<>();
            while (!first.isEmpty() && nums[first.peek()] < x) {
                batch.add(first.pop());
            }
            // batch leaves the first stack in increasing value order; push it
            // back-to-front so the second stack keeps its smallest value on top
            for (int j = batch.size() - 1; j >= 0; j--) {
                second.push(batch.get(j));
            }
            first.push(i);
        }
        return result;
    }
}
