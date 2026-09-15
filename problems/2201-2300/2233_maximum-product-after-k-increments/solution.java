import java.util.PriorityQueue;

class Solution {

    public int maximumProduct(int[] nums, int k) {
        PriorityQueue<Long> heap = new PriorityQueue<>();
        for (int value : nums) {
            heap.offer((long) value);
        }
        for (int i = 0; i < k; i++) {
            heap.offer(heap.poll() + 1);
        }
        long product = 1;
        for (long value : heap) {
            product = (product * value) % 1_000_000_007;
        }
        return (int) product;
    }
}
