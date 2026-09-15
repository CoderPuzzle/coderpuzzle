class Solution:
    def longestCommonPrefix(self, arr1: list[int], arr2: list[int]) -> int:
        # The deepest cross-array agreement is realized by two lexicographically
        # adjacent entries, so merge both arrays as source-tagged digit strings.
        entries = [(str(x), 0) for x in arr1] + [(str(y), 1) for y in arr2]
        # Sort as digit strings, never numerically: only lexicographic order
        # keeps a prefix family in one contiguous block.
        entries.sort()
        best = 0
        for i in range(1, len(entries)):
            (u, su), (v, sv) = entries[i - 1], entries[i]
            if su == sv:
                # Same-source neighbors cannot witness a cross pair.
                continue
            shared = 0
            for a, b in zip(u, v):
                if a != b:
                    # Digits diverge: the run cannot extend past here.
                    break
                shared += 1
            if shared > best:
                best = shared
        return best
