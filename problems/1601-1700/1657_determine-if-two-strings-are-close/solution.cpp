class Solution {
  public:
    bool closeStrings(string word1, string word2) {
        // Neither operation creates or destroys a letter: Operation 1 only
        // rearranges characters, and Operation 2 swaps the totals of two
        // existing letters. Two strings are therefore close exactly when
        // they occur over the same letter set with the same multiset of
        // frequencies — tallied into 26-slot count arrays, presence compared
        // slot by slot, then both arrays sorted and compared as lists.
        array<int, 26> counts1{}, counts2{};
        for (char c : word1) {
            counts1[c - 'a']++;
        }
        for (char c : word2) {
            counts2[c - 'a']++;
        }
        for (int i = 0; i < 26; ++i) {
            if ((counts1[i] > 0) != (counts2[i] > 0)) {
                return false;
            }
        }
        sort(counts1.begin(), counts1.end());
        sort(counts2.begin(), counts2.end());
        return counts1 == counts2;
    }
};
