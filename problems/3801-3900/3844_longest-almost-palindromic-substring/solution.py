class Solution:
    def almostPalindromic(self, s: str) -> int:
        n = len(s)

        # These arrays describe intervals of the two preceding lengths.
        # Empty and one-character intervals are palindromes. A one-character
        # interval is also almost-palindromic because deleting it leaves the
        # empty palindrome.
        pal_two = bytearray(b"\x01") * (n + 1)
        almost_two = bytearray(n + 1)
        pal_one = bytearray(b"\x01") * n
        almost_one = bytearray(b"\x01") * n
        best = 1

        for length in range(2, n + 1):
            count = n - length + 1
            pal_now = bytearray(count)
            almost_now = bytearray(count)
            for left in range(count):
                right = left + length - 1
                same_ends = s[left] == s[right]
                pal_now[left] = same_ends and pal_two[left + 1]

                # Delete the right end, delete the left end, or keep both
                # matching ends and use the deletion inside.
                almost_now[left] = pal_one[left] or pal_one[left + 1] or (same_ends and almost_two[left + 1])
                if almost_now[left]:
                    best = length

            pal_two, pal_one = pal_one, pal_now
            almost_two, almost_one = almost_one, almost_now

        return best
