class Solution {
  public:
    string getSmallestString(int n, int k) {
        // Fill from the end. At a position with i open slots before it,
        // reserve one unit per open slot and spend everything else here,
        // capped at z. The first time the cap stops binding, the reserve
        // drops to exactly the open count and every earlier slot is 'a'.
        string chars(n, 'a');
        long long remaining = k;
        for (int i = n - 1; i >= 0; i--) {
            long long value = min(26LL, remaining - i);
            chars[i] = static_cast<char>('a' + value - 1);
            remaining -= value;
        }
        return chars;
    }
};
