class Solution {
  public:
    string minimizeStringValue(string &s) {
        // A letter appearing x times costs x*(x-1)/2 no matter where it sits,
        // so only the final counts matter: each '?' should take the currently
        // least frequent letter (smallest letter on ties — that also makes the
        // fill lexicographically smallest). The chosen letters are then sorted
        // into the '?' slots left to right. Scanning all 26 counts per '?' is
        // O(26n), well within n = 1e5.
        int counts[26] = {0};
        for (char ch : s) {
            if (ch != '?') {
                counts[ch - 'a']++;
            }
        }
        vector<int> picks;
        for (char ch : s) {
            if (ch == '?') {
                int best = 0;
                for (int letter = 1; letter < 26; letter++) {
                    if (counts[letter] < counts[best]) {
                        best = letter;
                    }
                }
                counts[best]++;
                picks.push_back(best);
            }
        }
        sort(picks.begin(), picks.end());
        int at = 0;
        for (char &ch : s) {
            if (ch == '?') {
                ch = static_cast<char>('a' + picks[at]);
                at++;
            }
        }
        return s;
    }
};
