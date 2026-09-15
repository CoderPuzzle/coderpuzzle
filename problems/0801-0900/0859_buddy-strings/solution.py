class Solution:
    def buddyStrings(self, s: str, goal: str) -> bool:
        # A swap moves exactly two letters, so it changes two positions of s
        # or, when the letters are equal, nothing at all. Count the positions
        # where s and goal disagree: exactly two that cross, or none with a
        # repeated letter to trade.
        if len(s) != len(goal):
            return False
        first = second = -1
        for i in range(len(s)):
            if s[i] != goal[i]:
                if first == -1:
                    first = i
                elif second == -1:
                    second = i
                else:
                    return False
        if second != -1:
            return s[first] == goal[second] and s[second] == goal[first]
        if first != -1:
            return False
        seen = [False] * 26
        for ch in s:
            k = ord(ch) - ord("a")
            if seen[k]:
                return True
            seen[k] = True
        return False
