class Solution:
    def checkString(self, s: str) -> bool:
        seen_b = False
        for character in s:
            if character == "b":
                seen_b = True
            elif seen_b:
                return False
        return True
