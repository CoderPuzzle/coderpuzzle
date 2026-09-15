import java.util.Collections;
import java.util.PriorityQueue;

class Solution {

    public int maxTransactions(int[] transactions) {
        // Greedy scan with a max-heap of the debits already taken: take every
        // transaction that leaves the balance nonnegative, and when a debit
        // does not fit, refund the largest debit taken earlier if it was
        // strictly bigger and take the smaller one instead — same count, a
        // higher balance, and room for later, smaller debits. Running
        // balances reach 10^14, past 32-bit range, so accumulate in 64-bit.
        long balance = 0;
        int kept = 0;
        PriorityQueue<Integer> debits = new PriorityQueue<>(Collections.reverseOrder());
        for (int t : transactions) {
            if (t >= 0 || balance + t >= 0) {
                ++kept;
                balance += t;
                if (t < 0) {
                    debits.add(-t);
                }
            } else if (!debits.isEmpty() && debits.peek() > -t) {
                balance += debits.poll(); // refund the larger debit
                balance += t;
                debits.add(-t);
            }
        }
        return kept;
    }
}
