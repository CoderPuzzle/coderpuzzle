class Solution {
  public:
    long long specialPalindrome(long long n) {
        // A palindrome carries at most one digit an odd number of times, so
        // a digit set works only with at most one odd member; any set whose
        // digits sum past 16 makes palindromes of 17+ digits, beyond every
        // answer reachable from n <= 10^15.
        const long long limit = 4000000000000000LL;
        long long answer = limit;
        for (int mask = 1; mask < 512; mask++) {
            vector<int> digits;
            int odds = 0, total = 0;
            for (int d = 1; d <= 9; d++) {
                if (mask >> (d - 1) & 1) {
                    digits.push_back(d);
                    odds += d & 1;
                    total += d;
                }
            }
            if (odds > 1 || total > 16) {
                continue;
            }
            // Each member k lays k / 2 copies into each half (built ascending,
            // since digits are); a lone odd member also takes the middle.
            int mid = 0;
            vector<int> half;
            for (int d : digits) {
                if (d & 1) {
                    mid = d;
                }
                half.insert(half.end(), d / 2, d);
            }
            // Mirroring preserves order, so lexicographic halves enumerate
            // this set's palindromes in increasing numeric order.
            while (true) {
                long long pal = 0;
                for (int d : half) {
                    pal = pal * 10 + d;
                }
                if (mid > 0) {
                    pal = pal * 10 + mid;
                }
                for (int i = (int)half.size() - 1; i >= 0; i--) {
                    pal = pal * 10 + half[i];
                }
                if (pal > limit) {
                    break; // later halves only mirror to larger numbers
                }
                if (pal > n) {
                    answer = std::min(answer, pal);
                    break; // first past n is this set's best
                }
                if (!std::next_permutation(half.begin(), half.end())) {
                    break;
                }
            }
        }
        return answer;
    }
};
