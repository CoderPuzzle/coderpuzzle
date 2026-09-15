class Solution {
  public:
    bool isAnagram(string s, string t) {
        // An anagram is a rearrangement: both strings must hold exactly the
        // same letters with the same counts. The constraints promise lowercase
        // English letters, so 26 counters, one per letter, capture the multiset.
        if (s.size() != t.size())
            // Different lengths can never share the same multiset of letters.
            return false;
        int counts[26] = {};
        for (int index = 0; index < (int)s.size(); ++index) {
            counts[s[index] - 'a']++;
            counts[t[index] - 'a']--;
        }
        // A nonzero slot is a letter the two strings disagreed on.
        for (int count : counts) {
            if (count != 0)
                return false;
        }
        return true;
    }
};
