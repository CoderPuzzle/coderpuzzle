class Solution {
  public:
    vector<int> minOperations(vector<int> &nums) {
        // A binary palindrome is completely determined by its first half
        // of bits: mirror that half around the middle and the whole string
        // is fixed. So every candidate nearest palindrome is one of: the
        // mirrors of the value's own first half and the halves one step
        // below/above it, plus the two length-boundary forms.
        vector<int> answer;
        answer.reserve(nums.size());
        for (int value : nums) {
            int length = 32 - __builtin_clz(value);
            int half_len = (length + 1) / 2;
            int head = value >> (length - half_len);
            int best = -1;
            for (int h = head - 1; h <= head + 1; h++) {
                if ((h >> (half_len - 1)) == 0) {
                    continue; // would lose its leading one — not a b-bit head
                }
                int d = abs(value - mirror(h, half_len, length));
                if (best < 0 || d < best) {
                    best = d;
                }
            }
            int boundaries[2] = {(1 << (length - 1)) - 1, (1 << length) + 1};
            for (int boundary : boundaries) {
                int d = abs(value - boundary);
                if (d < best) {
                    best = d;
                }
            }
            answer.push_back(best);
        }
        return answer;
    }

  private:
    // Build the full palindrome from its first half of bits: emit the half
    // MSB-first, then append the mirrored tail — every bit except the
    // shared center for odd lengths (bit 0 of the half), all bits for even
    // lengths.
    static int mirror(int head, int half_len, int length) {
        int full = 0;
        for (int i = half_len - 1; i >= 0; i--) {
            full = full * 2 + ((head >> i) & 1);
        }
        for (int i = length % 2 == 0 ? 0 : 1; i < half_len; i++) {
            full = full * 2 + ((head >> i) & 1);
        }
        return full;
    }
};
