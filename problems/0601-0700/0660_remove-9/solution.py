class Solution:
    def newInteger(self, n: int) -> int:
        # The 9-free sequence is the base-9 numerals re-read as decimal:
        # counting in base 9 uses only the digits 0-8, so it skips exactly
        # the integers whose decimal spelling contains a 9 — the nth
        # survivor is n written in base 9. Emit digits least significant
        # first (n % 9, then n // 9) and lay them at rising powers of 10.
        answer = 0
        place = 1
        while n > 0:
            answer += n % 9 * place
            n //= 9
            place *= 10
        return answer
