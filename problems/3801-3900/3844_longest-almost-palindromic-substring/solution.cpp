class Solution {
  public:
    int almostPalindromic(string s) {
        int n = static_cast<int>(s.size());

        // These arrays describe intervals of the two preceding lengths.
        // Empty and one-character intervals are palindromes. A one-character
        // interval is also almost-palindromic because deleting it leaves the
        // empty palindrome.
        vector<char> palTwo(n + 1, true), almostTwo(n + 1, false);
        vector<char> palOne(n, true), almostOne(n, true);
        int best = 1;

        for (int length = 2; length <= n; ++length) {
            int count = n - length + 1;
            vector<char> palNow(count, false), almostNow(count, false);
            for (int left = 0; left < count; ++left) {
                int right = left + length - 1;
                bool sameEnds = s[left] == s[right];
                palNow[left] = sameEnds && palTwo[left + 1];

                // Delete the right end, delete the left end, or keep both
                // matching ends and use the deletion inside.
                almostNow[left] = palOne[left] || palOne[left + 1] || (sameEnds && almostTwo[left + 1]);
                if (almostNow[left])
                    best = length;
            }

            palTwo = move(palOne);
            palOne = move(palNow);
            almostTwo = move(almostOne);
            almostOne = move(almostNow);
        }

        return best;
    }
};
