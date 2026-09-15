class Solution {
  public:
    string reversePrefix(string s, int k) {
        // Mutable buffer; two pointers close on the middle of the prefix.
        // s arrives by value, so it already is the working copy.
        int left = 0;
        int right = k - 1;
        while (left < right) {
            swap(s[left], s[right]);
            left++;
            right--;
        }
        return s;
    }
};
