class Solution {
  public:
    vector<int> threeEqualParts(vector<int> &arr) {
        // Equal parts repeat one binary value, so the array's 1s must divide
        // into three equal counts; the third part's 1s are the final
        // k = total/3 ones, and the suffix from its first 1 to the end is the
        // exact bit pattern every part must show after its own leading zeros.
        // Both earlier parts begin at a known 1 — the array's first, and the
        // (k+1)-th — so comparing the L bits past each anchor against that
        // suffix decides everything, and the cut points sit exactly L bits
        // past the anchors.
        int total = 0;
        for (int value : arr) {
            total += value;
        }
        if (total == 0) {
            return {0, 2};
        }
        if (total % 3 != 0) {
            return {-1, -1};
        }
        int k = total / 3;
        int first = -1, second = -1, third = -1;
        int seen = 0;
        for (int index = 0; index < (int)arr.size(); ++index) {
            if (arr[index] == 1) {
                ++seen;
                if (seen == 1) {
                    first = index;
                } else if (seen == k + 1) {
                    second = index;
                } else if (seen == 2 * k + 1) {
                    third = index;
                }
            }
        }
        int length = (int)arr.size() - 1 - third;
        for (int anchor : {first, second}) {
            for (int offset = 0; offset <= length; ++offset) {
                if (arr[anchor + offset] != arr[third + offset]) {
                    return {-1, -1};
                }
            }
        }
        return {first + length, second + length + 1};
    }
};
