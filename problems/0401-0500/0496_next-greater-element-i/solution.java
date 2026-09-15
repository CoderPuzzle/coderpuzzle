import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        // One scan of nums2 answers every query: the stack holds values
        // still waiting for their next greater element.
        Map<Integer, Integer> nextGreater = new HashMap<>();
        Deque<Integer> stack = new ArrayDeque<>();
        for (int value : nums2) {
            // The current value is the FIRST greater value to the right of
            // each popped element (anything closer would have popped them
            // already); each element is pushed once, popped at most once.
            while (!stack.isEmpty() && stack.peek() < value) {
                nextGreater.put(stack.pop(), value);
            }
            stack.push(value);
        }
        // Whatever survives on the stack has nothing greater to its right.
        for (int value : stack) {
            nextGreater.put(value, -1);
        }
        // Values are unique and nums1 is a subset of nums2, so every
        // lookup hits.
        int[] result = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            result[i] = nextGreater.get(nums1[i]);
        }
        return result;
    }
}
