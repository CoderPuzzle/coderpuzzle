class Solution:
    def reverseStr(self, s: str, k: int) -> str:
        # Read the string as consecutive 2k-sized blocks: every block
        # contributes its first k characters reversed, its last k untouched.
        # Walking i in steps of 2k and reversing the window chars[i:i+k]
        # needs no special case for the tail — fewer than k characters
        # left makes the slice short, so reversing it reverses all of them,
        # while k..2k-1 left makes the slice exactly the first k of them.
        chars = list(s)
        for i in range(0, len(chars), 2 * k):
            chars[i : i + k] = reversed(chars[i : i + k])
        return "".join(chars)
