class Solution {
  public:
    string reverseByType(string s) {
        // The two reversals act on disjoint position sets — a slot that
        // starts on a letter ends on a letter — so each class can be
        // reversed independently, in place. Each pass walks two pointers
        // inward from the ends, skipping characters outside the class
        // being reversed, and swaps when both sides are on the class.
        int n = (int)s.size();

        auto is_letter = [](char c) { return c >= 'a' && c <= 'z'; };

        int i = 0, j = n - 1;
        while (i < j) {
            if (!is_letter(s[i])) {
                i++;
            } else if (!is_letter(s[j])) {
                j--;
            } else {
                swap(s[i], s[j]);
                i++;
                j--;
            }
        }

        i = 0;
        j = n - 1;
        while (i < j) {
            if (is_letter(s[i])) {
                i++;
            } else if (is_letter(s[j])) {
                j--;
            } else {
                swap(s[i], s[j]);
                i++;
                j--;
            }
        }
        return s;
    }
};
