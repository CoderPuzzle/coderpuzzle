class Solution:
    def isSubstringPresent(self, s: str) -> bool:
        # A length-2 substring of s shows up in reverse(s) exactly when its
        # own reversal shows up somewhere in s, since reading s backwards
        # turns every adjacent pair xy into yx. One pass records each pair
        # in a set and looks the current pair up flipped — a hit on yx
        # means an earlier xy mirrors into it, and a later yx finds the xy
        # recorded before it. A doubled letter is its own reversal, so xx
        # matches the moment it appears.
        seen = set()
        for i in range(len(s) - 1):
            if s[i] == s[i + 1] or s[i + 1] + s[i] in seen:
                return True
            seen.add(s[i] + s[i + 1])
        return False
