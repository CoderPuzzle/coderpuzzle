class Solution:
    def mirrorFrequency(self, s: str) -> int:
        # 36 counters: 26 letters, then 10 digits.
        freq = [0] * 36
        for ch in s:
            if "a" <= ch <= "z":
                freq[ord(ch) - ord("a")] += 1
            else:
                freq[26 + ord(ch) - ord("0")] += 1
        total = 0
        # Letters fold into 13 mirror pairs (a,z), (b,y), ..., (m,n).
        for i in range(13):
            a = freq[i]
            b = freq[25 - i]
            if a + b > 0:
                total += abs(a - b)
        # Digits fold into 5 mirror pairs (0,9), (1,8), ..., (4,5).
        for d in range(5):
            a = freq[26 + d]
            b = freq[26 + (9 - d)]
            if a + b > 0:
                total += abs(a - b)
        return total
