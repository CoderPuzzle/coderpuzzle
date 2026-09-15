class Solution {
  public:
    bool isIsomorphic(string s, string t) {
        // The contract is symmetric and names its own data structure: every
        // character of s keeps one consistent replacement (forward), and no
        // two characters share a replacement (reverse). Each clause is one
        // map, enforced together in a single order-preserving pass.
        if (s.size() != t.size())
            // Strings of different lengths can never be aligned position for position.
            return false;
        unordered_map<char, char> forward, reverse;
        for (int index = 0; index < (int)s.size(); ++index) {
            // One branch per contract clause: a source already bound to a
            // different replacement, or a target already claimed by another source.
            auto fromSource = forward.find(s[index]);
            auto fromTarget = reverse.find(t[index]);
            if (fromSource != forward.end() && fromSource->second != t[index])
                return false;
            if (fromTarget != reverse.end() && fromTarget->second != s[index])
                return false;
            forward[s[index]] = t[index];
            reverse[t[index]] = s[index];
        }
        return true;
    }
};
