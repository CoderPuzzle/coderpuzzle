import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int[] timeTaken(int[] arrival, int[] state) {
        // Two FIFO queues fed by an arrival pointer (equal arrival seconds
        // enter index order automatically). prevDir carries the direction of
        // the previous second: while both sides compete the door keeps its
        // streak, and exits win only when the door has just been idle.
        int n = arrival.length;
        Deque<Integer> enterQ = new ArrayDeque<>();
        Deque<Integer> exitQ = new ArrayDeque<>();
        int[] ans = new int[n];
        int i = 0;
        long t = 0;
        int prevDir = -1; // -1 unused, 0 entering, 1 exiting
        int done = 0;
        while (done < n) {
            while (i < n && arrival[i] <= t) {
                if (state[i] == 1) {
                    exitQ.addLast(i);
                } else {
                    enterQ.addLast(i);
                }
                i++;
            }
            if (enterQ.isEmpty() && exitQ.isEmpty()) {
                t = arrival[i]; // jump the clock; idle breaks any streak
                prevDir = -1;
                continue;
            }
            boolean hasEnter = !enterQ.isEmpty();
            boolean hasExit = !exitQ.isEmpty();
            int d;
            if (hasEnter && hasExit) {
                d = prevDir != -1 ? prevDir : 1;
            } else {
                d = hasExit ? 1 : 0;
            }
            Deque<Integer> q = d == 1 ? exitQ : enterQ;
            ans[q.pollFirst()] = (int) t;
            prevDir = d;
            done++;
            t++;
        }
        return ans;
    }
}
