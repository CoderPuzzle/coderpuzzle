class Solution:
    def findValidPair(self, s: str) -> str:
        # A digit's validity never depends on where it sits, only on how
        # often it occurs in the whole string, so one counting pass settles
        # every question the scan will ask.
        counts = [0] * 10
        for ch in s:
            counts[ord(ch) - ord("0")] += 1
        for i in range(len(s) - 1):
            a = ord(s[i]) - ord("0")
            b = ord(s[i + 1]) - ord("0")
            # Valid when the digits differ and each occurs exactly as many
            # times as its numeric value.
            if a != b and counts[a] == a and counts[b] == b:
                return s[i : i + 2]
        return ""
