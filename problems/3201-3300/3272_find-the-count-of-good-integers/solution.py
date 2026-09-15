from math import factorial


class Solution:
    def countGoodIntegers(self, n: int, k: int) -> int:
        half = (n + 1) // 2
        fact = [factorial(i) for i in range(n + 1)]
        seen = set()
        # A good integer is a rearrangement of a k-palindrome, and a
        # palindrome is fixed by its first half (for odd n the middle digit
        # is shared) — so only 10^half halves need enumerating.
        for first in range(10**half):
            prefix = str(first).zfill(half)
            if n % 2 == 0:
                palindrome = prefix + prefix[::-1]
            else:
                palindrome = prefix + prefix[-2::-1]
            # Drop palindromes with a leading zero (not n-digit) or not
            # divisible by k; reduce survivors to their digit-count vector
            # so identical multisets are counted once.
            if palindrome[0] != "0" and int(palindrome) % k == 0:
                counts = [0] * 10
                for ch in palindrome:
                    counts[ord(ch) - 48] += 1
                seen.add(tuple(counts))
        answer = 0
        for counts in seen:
            # Distinct n-digit integers with exactly these digits: the
            # multinomial n! / prod(c_d!).
            total = fact[n]
            for c in counts:
                total //= fact[c]
            # Arrangements starting with 0 are not n-digit numbers: fix a
            # zero in front and permute the rest, then subtract.
            if counts[0] > 0:
                lead = fact[n - 1]
                lead //= fact[counts[0] - 1]
                for d in range(1, 10):
                    lead //= fact[counts[d]]
                total -= lead
            answer += total
        return answer
