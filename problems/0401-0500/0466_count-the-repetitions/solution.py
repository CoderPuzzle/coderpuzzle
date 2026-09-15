class Solution:
    def getMaxRepetitions(self, s1: str, n1: int, s2: str, n2: int) -> int:
        # Walk str1 one s1-block at a time. The only state crossing a block
        # boundary is the cursor into s2 plus the copies consumed so far, and
        # the cursor alone decides how any later block plays out — so a
        # repeated cursor exposes a cycle that can be jumped arithmetically.
        seen = {}  # cursor after a block -> (blocks used, copies consumed)
        cursor = 0
        copies = 0
        blocks = 0
        while blocks < n1:
            for ch in s1:
                if ch == s2[cursor]:
                    cursor += 1
                    if cursor == len(s2):
                        cursor = 0
                        copies += 1
            blocks += 1
            if cursor in seen:
                # Every (blocks - start[0]) blocks add (copies - start[1])
                # more copies; take as many whole cycles as fit, then walk
                # the leftover blocks by hand.
                start_blocks, start_copies = seen[cursor]
                jumps = (n1 - blocks) // (blocks - start_blocks)
                copies += jumps * (copies - start_copies)
                blocks += jumps * (blocks - start_blocks)
                seen.clear()
            else:
                seen[cursor] = (blocks, copies)
        return copies // n2
