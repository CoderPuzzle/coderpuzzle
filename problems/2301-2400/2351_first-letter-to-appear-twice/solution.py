class Solution:
    def repeatedCharacter(self, s: str) -> str:
        # The first letter to appear twice is exactly the first letter
        # whose second occurrence shows up, so one left-to-right scan with
        # a seen set ends the moment a repeat is met.
        seen = set()
        for ch in s:
            if ch in seen:
                return ch
            seen.add(ch)
        return ""
