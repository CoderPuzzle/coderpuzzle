class Solution:
    def hasSpecialSubstring(self, s: str, k: int) -> bool:
        # A one-character window must span a whole maximal run: starting
        # inside the run leaves the same character before it, ending inside
        # leaves the same character after it. So the answer is "some maximal
        # run has length exactly k".
        n = len(s)
        i = 0
        while i < n:
            j = i
            while j < n and s[j] == s[i]:
                j += 1
            if j - i == k:
                return True
            i = j
        return False
