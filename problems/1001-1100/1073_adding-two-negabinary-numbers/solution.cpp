class Solution {
  public:
    vector<int> addNegabinary(vector<int> &arr1, vector<int> &arr2) {
        // Walk both arrays from the least-significant digit (the end)
        // toward the most-significant, keeping a running carry. At each
        // column, total = d1 + d2 + carry can temporarily fall outside
        // {0, 1} (it even goes negative), so the digit and the next
        // carry are pulled out with bitwise ops instead of a sign-prone
        // mod/div: total & 1 is the digit, because in two's-complement
        // form the low bit of total already equals total's floor-mod-2
        // regardless of sign. The next carry is -(total >> 1), where
        // >> is an arithmetic (floor) shift, matching the base -2
        // identity total = digit + (-2) * carry. The carry provably
        // stays within {-1, 0, 1} the whole way, so nothing overflows.
        int i = (int)arr1.size() - 1;
        int j = (int)arr2.size() - 1;
        int carry = 0;
        vector<int> digits;
        while (i >= 0 || j >= 0 || carry != 0) {
            int d1 = i >= 0 ? arr1[i] : 0;
            int d2 = j >= 0 ? arr2[j] : 0;
            int total = d1 + d2 + carry;
            digits.push_back(total & 1);
            carry = -(total >> 1);
            i--;
            j--;
        }
        reverse(digits.begin(), digits.end());
        size_t k = 0;
        while (k < digits.size() - 1 && digits[k] == 0) {
            k++;
        }
        return vector<int>(digits.begin() + k, digits.end());
    }
};
