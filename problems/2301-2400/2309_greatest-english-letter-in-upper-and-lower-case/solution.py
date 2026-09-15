class Solution:
    def greatestLetter(self, s: str) -> str:
        # Mark each letter's presence in its own case; a letter qualifies
        # when both its lowercase and uppercase forms were seen. Scanning
        # the alphabet from Z down to A returns the greatest qualifier.
        lower = set()
        upper = set()
        for ch in s:
            if "a" <= ch <= "z":
                lower.add(ch)
            else:
                upper.add(ch)
        for index in range(25, -1, -1):
            if chr(ord("a") + index) in lower and chr(ord("A") + index) in upper:
                return chr(ord("A") + index)
        return ""
