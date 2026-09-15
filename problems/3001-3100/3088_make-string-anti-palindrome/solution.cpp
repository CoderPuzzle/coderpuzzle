class Solution {
  public:
    string makeAntiPalindrome(string s) {
        // Swaps reach every permutation of s, so the answer is the
        // lexicographically smallest anti-palindrome rearrangement. Sorting
        // already gives the smallest possible left half, and the left half
        // of a sorted string never mirrors onto itself, so only the right
        // half needs repair: whenever a position matches its mirror, swap
        // in the next larger letter, tracked by a pointer that only moves
        // right. The pointer running off the end means some letter fills
        // more than half the string — no arrangement can separate it.
        sort(s.begin(), s.end());
        int n = (int)s.size();
        int p = n / 2;
        for (int i = n / 2; i < n; i++) {
            if (s[i] == s[n - 1 - i]) {
                while (p < n && s[p] == s[i]) {
                    p++;
                }
                if (p == n) {
                    return "-1";
                }
                swap(s[i], s[p]);
                p++;
            }
        }
        return s;
    }
};
