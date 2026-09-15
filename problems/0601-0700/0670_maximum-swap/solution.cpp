class Solution {
  public:
    int maximumSwap(int num) {
        // One swap can raise exactly one position, and a position is worth
        // more the further left it sits, so the best swap moves the largest
        // available digit as far left as it can go. Record the last index of
        // each digit value, then scan left to right: at the first position
        // where a larger digit occurs later, swap in the largest such digit,
        // taken from its LAST occurrence — the tiebreak pushes the displaced
        // smaller digit as far right as it can go. No qualifying position
        // means num is already maximal and is returned unchanged.
        string digits = to_string(num);
        array<int, 10> last;
        last.fill(-1);
        for (int i = 0; i < static_cast<int>(digits.size()); i++) {
            last[digits[i] - '0'] = i;
        }
        for (int i = 0; i < static_cast<int>(digits.size()); i++) {
            for (int value = 9; value > digits[i] - '0'; value--) {
                if (last[value] > i) {
                    swap(digits[i], digits[last[value]]);
                    return stoi(digits);
                }
            }
        }
        return num;
    }
};
