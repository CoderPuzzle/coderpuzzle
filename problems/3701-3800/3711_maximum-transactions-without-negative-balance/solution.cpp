class Solution {
  public:
    int maxTransactions(vector<int> &transactions) {
        // Greedy scan with a max-heap of the debits already taken: take every
        // transaction that leaves the balance nonnegative, and when a debit
        // does not fit, refund the largest debit taken earlier if it was
        // strictly bigger and take the smaller one instead — same count, a
        // higher balance, and room for later, smaller debits. Running
        // balances reach 10^14, past 32-bit range, so accumulate in 64-bit.
        long long balance = 0;
        int kept = 0;
        priority_queue<int> debits; // magnitudes of the debits taken so far
        for (int t : transactions) {
            if (t >= 0 || balance + t >= 0) {
                ++kept;
                balance += t;
                if (t < 0) {
                    debits.push(-t);
                }
            } else if (!debits.empty() && debits.top() > -t) {
                balance += debits.top(); // refund the larger debit
                debits.pop();
                balance += t;
                debits.push(-t);
            }
        }
        return kept;
    }
};
