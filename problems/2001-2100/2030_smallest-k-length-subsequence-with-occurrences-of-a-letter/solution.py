from typing import List, Optional


class Solution:
    def smallestSubsequence(self, s: str, k: int, letter: str, repetition: int) -> str:
        n = len(s)
        # suffix[i] = number of `letter` occurrences in s[i:]
        suffix = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            suffix[i] = suffix[i + 1] + (1 if s[i] == letter else 0)

        stack = []
        used = 0  # number of `letter` currently in the stack
        for i, ch in enumerate(s):
            while stack:
                top = stack[-1]
                if top <= ch:
                    break
                # After popping `top`, the remaining processed chars plus the
                # unprocessed suffix must still reach length k.
                if len(stack) - 1 + (n - i) < k:
                    break
                letters_after_pop = used - (1 if top == letter else 0)
                # The current char `ch` is appended right after the pop, so it
                # also contributes to the letter pool.
                letters_after_pop += 1 if ch == letter else 0
                if letters_after_pop + suffix[i + 1] < repetition:
                    break
                stack.pop()
                if top == letter:
                    used -= 1
            stack.append(ch)
            if ch == letter:
                used += 1

        # Trim to exactly length k from the right, never dropping below
        # `repetition` target letters.
        remove = len(stack) - k
        letters_in_stack = used
        res = []
        for ch in reversed(stack):
            if remove == 0:
                res.append(ch)
            elif ch == letter:
                if letters_in_stack - 1 >= repetition:
                    letters_in_stack -= 1
                    remove -= 1
                else:
                    res.append(ch)
            else:
                remove -= 1
        return "".join(reversed(res))
