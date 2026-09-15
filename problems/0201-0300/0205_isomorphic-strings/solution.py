class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        # The contract is symmetric and names its own data structure: every
        # character of s keeps one consistent replacement (forward), and no
        # two characters share a replacement (reverse). Each clause is one
        # dictionary, enforced together in a single order-preserving pass.
        if len(s) != len(t):
            # Strings of different lengths can never be aligned position for position.
            return False
        forward, reverse = {}, {}
        for s_char, t_char in zip(s, t):
            if s_char in forward and forward[s_char] != t_char:
                # This source character was already given a different replacement.
                return False
            if t_char in reverse and reverse[t_char] != s_char:
                # This replacement is already claimed by a different source character.
                return False
            forward[s_char] = t_char
            reverse[t_char] = s_char
        return True
