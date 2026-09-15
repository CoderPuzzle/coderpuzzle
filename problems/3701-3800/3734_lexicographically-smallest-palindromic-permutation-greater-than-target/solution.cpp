class Solution {
  public:
    string lexPalindromicPermutation(string s, string target) {
        int n = s.size();
        // Counts of each letter of s.
        array<int, 26> freq{};
        for (char ch : s) {
            freq[ch - 'a']++;
        }
        // Parity law: every count even, or exactly one odd count absorbed by
        // the middle character when n is odd.
        int odds = 0, oddLetter = -1;
        for (int d = 0; d < 26; d++) {
            if (freq[d] % 2 == 1) {
                odds++;
                oddLetter = d;
            }
        }
        if (odds != n % 2) {
            return "";
        }
        // The half multiset is forced — freq[d] / 2 of every letter — and on
        // odd lengths the odd letter pins the middle, so comparing
        // palindromes reduces to comparing (half, middle, mirrored half).
        array<int, 26> half{};
        for (int d = 0; d < 26; d++) {
            half[d] = freq[d] / 2;
        }
        int m = n / 2;
        string p = target.substr(0, m);
        // Candidate 1: keep the half equal to target's own first half p. That
        // pins the entire palindrome, which qualifies only if it already
        // clears target past the shared prefix.
        string best;
        bool found = false;
        array<int, 26> pc{};
        for (char ch : p) {
            pc[ch - 'a']++;
        }
        bool matches = true;
        for (int d = 0; d < 26; d++) {
            if (pc[d] != half[d]) {
                matches = false;
            }
        }
        if (matches) {
            string mirrored(p.rbegin(), p.rend());
            string suffix = target.substr(m + (n % 2));
            bool wins;
            if (n % 2 == 0) {
                wins = mirrored > suffix;
            } else {
                int mid = target[m] - 'a';
                wins = oddLetter > mid || (oddLetter == mid && mirrored > suffix);
            }
            if (wins) {
                best = p;
                found = true;
            }
        }
        // Candidate 2: the smallest half arrangement strictly greater than p
        // — match p as far as possible, remembering the latest position where
        // a larger still-available letter existed, and fall back to it.
        if (!found) {
            array<int, 26> cur = half;
            int bumpAt = -1, bumpCh = -1;
            array<int, 26> bumpCur{};
            for (int i = 0; i < m; i++) {
                int ci = p[i] - 'a';
                for (int d = ci + 1; d < 26; d++) {
                    if (cur[d] > 0) {
                        bumpAt = i;
                        bumpCh = d;
                        bumpCur = cur;
                        break;
                    }
                }
                if (cur[ci] == 0) {
                    break;
                }
                cur[ci]--;
            }
            if (bumpAt >= 0) {
                bumpCur[bumpCh]--;
                best = p.substr(0, bumpAt);
                best += char('a' + bumpCh);
                for (int d = 0; d < 26; d++) {
                    best += string(bumpCur[d], 'a' + d);
                }
                found = true;
            }
        }
        if (!found) {
            return "";
        }
        string result = best;
        if (n % 2 == 1) {
            result += char('a' + oddLetter);
        }
        for (int i = m - 1; i >= 0; i--) {
            result += best[i];
        }
        return result;
    }
};
