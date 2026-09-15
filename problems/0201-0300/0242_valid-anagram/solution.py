class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        # An anagram is a rearrangement: both strings must hold exactly the
        # same letters with the same counts. The constraints promise lowercase
        # English letters, so 26 counters, one per letter, capture the multiset.
        if len(s) != len(t):
            # Different lengths can never share the same multiset of letters.
            return False
        counts = [0] * 26
        for s_char, t_char in zip(s, t):
            counts[ord(s_char) - ord("a")] += 1
            counts[ord(t_char) - ord("a")] -= 1
        # A nonzero slot is a letter the two strings disagreed on.
        return all(count == 0 for count in counts)
