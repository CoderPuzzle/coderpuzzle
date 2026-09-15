from typing import List, Optional


class Solution:
    def decodeString(self, s: str) -> str:
        # One (previous_string, repeat_count) frame per unclosed '[' —
        # the stack mirrors the bracket structure, so context is never
        # lost no matter how deep the nesting goes.
        stack = []
        current = ""
        repeat = 0
        for ch in s:
            if ch.isdigit():
                # Multi-digit counts assemble digit by digit.
                repeat = repeat * 10 + int(ch)
            elif ch == "[":
                # Park the outer segment and its count; reset both for
                # the fresh inner segment.
                stack.append((current, repeat))
                current = ""
                repeat = 0
            elif ch == "]":
                # Absorb the finished inner segment: restore the outer
                # string, then repeat-and-append onto it.
                previous, times = stack.pop()
                current = previous + current * times
            else:
                current += ch
        # Every bracket is closed, so the stack is empty and current is
        # the fully decoded string.
        return current
