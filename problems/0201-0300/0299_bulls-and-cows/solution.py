class Solution:
    def getHint(self, secret: str, guess: str) -> str:
        # Bulls are positional matches, tallied directly. Every other digit
        # drops into one of two 10-slot counters — one per side — and the
        # cows are the multiset overlap of the two leftovers, min per digit.
        bulls = 0
        secret_left = [0] * 10
        guess_left = [0] * 10
        for s_digit, g_digit in zip(secret, guess):
            if s_digit == g_digit:
                bulls += 1
            else:
                # Only unmatched positions feed the cow pools: an exact match
                # consumes one copy of the digit on both sides up front.
                secret_left[ord(s_digit) - ord("0")] += 1
                guess_left[ord(g_digit) - ord("0")] += 1
        cows = sum(min(secret_left[d], guess_left[d]) for d in range(10))
        return f"{bulls}A{cows}B"
