import java.util.PriorityQueue;

class Solution {

    public int makePrefSumNonNegative(int[] nums) {
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        long prefix = 0;
        int ops = 0;
        for (int num : nums) {
            prefix += num;
            // Every element seen so far is a deferral candidate; a negative
            // is handled not when read but at the first prefix it poisons.
            heap.offer(num);
            // Prefix dipped below zero: defer the smallest element seen so
            // far to the end. Removing the minimum raises the prefix the
            // most, so by an exchange argument this uses the fewest ops.
            while (prefix < 0) {
                prefix -= heap.poll();
                ops++;
            }
        }
        return ops;
    }
}
