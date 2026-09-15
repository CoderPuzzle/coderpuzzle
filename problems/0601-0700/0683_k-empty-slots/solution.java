import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int kEmptySlots(int[] bulbs, int k) {
        // Invert to days: days[p] is the turn on which position p lights. A
        // window (i, i+k+1) qualifies exactly when both endpoints light
        // before every interior position, and it qualifies on the day
        // max(days[i], days[i+k+1]); the answer is the minimum such day.
        int n = bulbs.length;
        if (n < k + 2) {
            return -1;
        }
        int[] days = new int[n];
        for (int day = 0; day < n; ++day) {
            days[bulbs[day] - 1] = day + 1;
        }
        int best = -1;
        Deque<Integer> window = new ArrayDeque<>();
        // The interior [right-k, right-1] slides one position at a time; the
        // deque keeps indices of strictly increasing day values, so its front
        // is always the interior minimum.
        for (int index = 1; index < k; ++index) {
            while (!window.isEmpty() && days[window.peekLast()] >= days[index]) {
                window.pollLast();
            }
            window.addLast(index);
        }
        for (int right = k + 1; right < n; ++right) {
            int entering = right - 1;
            while (!window.isEmpty() && days[window.peekLast()] >= days[entering]) {
                window.pollLast();
            }
            window.addLast(entering);
            while (!window.isEmpty() && window.peekFirst() < right - k) {
                window.pollFirst();
            }
            int pairDay = Math.max(days[right - k - 1], days[right]);
            if ((k == 0 || days[window.peekFirst()] > pairDay) && (best == -1 || pairDay < best)) {
                best = pairDay;
            }
        }
        return best;
    }
}
