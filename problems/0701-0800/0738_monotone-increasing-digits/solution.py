class Solution:
    def monotoneIncreasingDigits(self, n: int) -> int:
        # Keep the non-decreasing prefix, then repair at the first position
        # where a digit exceeds its right neighbor: slide left across the
        # plateau of equals around that digit, decrement its first member,
        # and fill the rest with nines. No break means n already qualifies.
        s = list(str(n))
        d = len(s)
        i = 0
        while i + 1 < d and s[i] <= s[i + 1]:
            i += 1
        if i + 1 == d:
            return n
        while i > 0 and s[i - 1] == s[i]:
            i -= 1
        s[i] = str(int(s[i]) - 1)
        for k in range(i + 1, d):
            s[k] = "9"
        return int("".join(s))
