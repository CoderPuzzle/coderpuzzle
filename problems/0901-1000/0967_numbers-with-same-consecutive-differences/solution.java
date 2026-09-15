import java.util.Arrays;

class Solution {

    public int[] numsSameConsecDiff(int n, int k) {
        // Seed the queue with the nine legal first digits. A seed is
        // never 0 and growth only appends digits, so no number grown
        // from these seeds can carry a leading zero.
        int[] queue = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
        // Grow every prefix by one digit, n - 1 times. A prefix that
        // ends in d can only continue with d - k or d + k — any other
        // next digit would break the consecutive-difference rule at
        // that pair already — and a continuation outside 0..9 is
        // dropped on the spot.
        for (int step = 1; step < n; step++) {
            int[] grown = new int[queue.length * 2];
            int size = 0;
            for (int prefix : queue) {
                int last = prefix % 10;
                int low = last - k;
                int high = last + k;
                if (low >= 0) {
                    grown[size++] = prefix * 10 + low;
                }
                // k = 0 makes the two continuations the same digit;
                // take it once.
                if (high <= 9 && high != low) {
                    grown[size++] = prefix * 10 + high;
                }
            }
            queue = Arrays.copyOf(grown, size);
        }
        // Each round preserved the rule on the pair it touched, so the
        // final queue is exactly the answer set. Sorting states the
        // pinned ascending order in code.
        Arrays.sort(queue);
        return queue;
    }
}
