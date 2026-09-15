import java.util.PriorityQueue;

class Solution {

    public long[] mostFrequentIDs(int[] nums, int[] freq) {
        // Only one ID's count moves per step, so a lazy max-heap of (count,
        // id) snapshots answers "most frequent" without ever hunting down
        // the previous snapshot: push the touched ID's new count, then pop
        // entries whose count no longer matches the live table. A count can
        // reach 10^5 * 10^5 = 10^10, beyond int, so counts and entries are
        // longs.
        long[] counts = new long[100001];
        PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) -> Long.compare(b[0], a[0]));
        long[] answer = new long[nums.length];
        for (int i = 0; i < nums.length; i++) {
            int ident = nums[i];
            counts[ident] += freq[i];
            heap.offer(new long[] { counts[ident], ident });
            while (heap.peek()[0] != counts[(int) heap.peek()[1]]) {
                heap.poll();
            }
            answer[i] = heap.peek()[0];
        }
        return answer;
    }
}
