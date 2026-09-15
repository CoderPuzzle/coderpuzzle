class Solution {
  public:
    vector<int> minOperations(vector<int> &nums) {
        // The definition, read literally: widen the offset d = 0, 1, 2,
        // ... and stop at the first d where either neighbor is a binary
        // palindrome; that first hit costs exactly d operations and no
        // palindrome can be closer.
        vector<int> answer;
        answer.reserve(nums.size());
        for (int v : nums) {
            int d = 0;
            while (true) {
                // the down side floors at 1: values below have no binary
                // form without leading zeros
                if (v - d >= 1 && palindrome(v - d)) {
                    break;
                }
                if (palindrome(v + d)) {
                    break;
                }
                d++;
            }
            answer.push_back(d);
        }
        return answer;
    }

  private:
    bool palindrome(int value) {
        // The binary form without leading zeros: peel low bits off, then
        // put the most-significant bit first.
        string bits;
        while (value > 0) {
            bits += char('0' + (value & 1));
            value >>= 1;
        }
        for (int i = 0, j = (int)bits.size() - 1; i < j; i++, j--) {
            if (bits[i] != bits[j]) {
                return false;
            }
        }
        return true;
    }
};
