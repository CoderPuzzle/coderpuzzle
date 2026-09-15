class Solution:
    def isScramble(self, s1: str, s2: str) -> bool:
        # Memoized recursion over string pairs. Two guards run before any
        # split work: identical strings are trivially scrambles, and a pair
        # whose letter counts differ can never be one, since swapping blocks
        # of a string only rearranges its letters.
        memo = {}

        def same_letters(a: str, b: str) -> bool:
            counts = [0] * 26
            for ch in a:
                counts[ord(ch) - 97] += 1
            for ch in b:
                counts[ord(ch) - 97] -= 1
            return counts == [0] * 26

        def solve(a: str, b: str) -> bool:
            if a == b:
                return True
            if not same_letters(a, b):
                return False
            answer = memo.get((a, b))
            if answer is not None:
                return answer
            n = len(a)
            for i in range(1, n):
                # Keep the halves in order: the split of b sits at the same
                # index as the split of a.
                if solve(a[:i], b[:i]) and solve(a[i:], b[i:]):
                    memo[(a, b)] = True
                    return True
                # Swap the halves: the head of a pairs with the tail of b.
                if solve(a[:i], b[n - i :]) and solve(a[i:], b[: n - i]):
                    memo[(a, b)] = True
                    return True
            memo[(a, b)] = False
            return False

        return solve(s1, s2)
