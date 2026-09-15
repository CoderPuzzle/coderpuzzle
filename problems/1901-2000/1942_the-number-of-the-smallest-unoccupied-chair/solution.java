import java.util.PriorityQueue;

class Solution {

    public int smallestChair(int[][] times, int targetFriend) {
        int n = times.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) order[i] = i;
        java.util.Arrays.sort(order, (a, b) -> Integer.compare(times[a][0], times[b][0]));
        PriorityQueue<int[]> occupied = new PriorityQueue<>((a, b) -> {
            if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
            return Integer.compare(a[1], b[1]);
        }); // min-heap of (leaving_time, chair)
        PriorityQueue<Integer> free = new PriorityQueue<>(); // min-heap of free chair numbers
        int nextChair = 0;
        for (int idx = 0; idx < n; idx++) {
            int i = order[idx];
            int arrival = times[i][0];
            int leaving = times[i][1];
            while (!occupied.isEmpty() && occupied.peek()[0] <= arrival) {
                free.offer(occupied.poll()[1]);
            }
            int chair;
            if (!free.isEmpty()) {
                chair = free.poll();
            } else {
                chair = nextChair;
                nextChair++;
            }
            if (i == targetFriend) return chair;
            occupied.offer(new int[] { leaving, chair });
        }
        return -1;
    }
}
