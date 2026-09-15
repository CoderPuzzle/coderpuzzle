class Solution:
    def lengthAfterTransformations(self, s: str, t: int) -> int:
        # Only the per-letter counts matter. One transformation shifts the
        # 26-vector one letter up (each of b..z receives its predecessor's
        # count) and splits every z into an a and a b: after the shift the
        # new counts[0] is the old z-count, and the old a-count gains the
        # old z-count on top. Reducing counts[1] below MOD per sweep keeps
        # every entry below MOD forever. A Python slice rotation runs the
        # shift at C speed, so t sweeps cost t list operations.
        MOD = 1_000_000_007
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - 97] += 1
        for _ in range(t):
            z = counts[25]
            counts = counts[-1:] + counts[:25]
            counts[1] = (counts[1] + z) % MOD
        return sum(counts) % MOD
