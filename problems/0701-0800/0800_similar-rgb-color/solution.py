class Solution:
    def similarRGB(self, color: str) -> str:
        # A shorthand color repeats one hex digit per channel, so the
        # candidates for one channel are 0x00, 0x11, ..., 0xff — sixteen
        # values spaced 17 apart. The similarity is a sum of independent
        # per-channel squares, so the most similar shorthand takes,
        # channel by channel, the repeated value nearest the input's:
        # digit (value + 8) / 17 in integers. The spacing 17 is odd, so
        # a channel value is never exactly between two candidates — the
        # nearest, and with it the whole answer, is unique.
        digits = "0123456789abcdef"

        def pair(value: int) -> str:
            return digits[(value + 8) // 17] * 2

        return "#" + pair(int(color[1:3], 16)) + pair(int(color[3:5], 16)) + pair(int(color[5:7], 16))
