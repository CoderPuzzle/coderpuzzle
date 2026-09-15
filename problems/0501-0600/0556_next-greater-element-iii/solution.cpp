class Solution {
  public:
    int nextGreaterElement(int n) {
        // Rearranging n's digits, the answer is the immediate successor of
        // n's digit string among all rearrangements — the classic
        // next-permutation step. Scan from the right for the first digit
        // below its right neighbor (the pivot); none means the digits are
        // entirely non-increasing and n is already the largest arrangement.
        // The suffix past the pivot is non-increasing, so the smallest digit
        // larger than the pivot is the rightmost one that beats it: swap the
        // two, then reverse the (still non-increasing) suffix to sort it
        // ascending — the smallest tail those digits can form.
        string digits = to_string(n);
        int i = digits.size() - 2;
        while (i >= 0 && digits[i] >= digits[i + 1]) {
            i--;
        }
        if (i < 0) {
            return -1;
        }
        int j = digits.size() - 1;
        while (digits[j] <= digits[i]) {
            j--;
        }
        swap(digits[i], digits[j]);
        reverse(digits.begin() + i + 1, digits.end());
        // n reaches 2³¹ - 1 (ten digits) and the successor can run one digit
        // wider, so the rebuilt value — up to 9,999,999,999, past int — is
        // held in a long long and checked against the 32-bit ceiling before
        // it is returned.
        long long result = stoll(digits);
        return result <= numeric_limits<int>::max() ? static_cast<int>(result) : -1;
    }
};
