from typing import List, Optional


class Solution:
    def maximumBinaryString(self, binary: str) -> str:
        # Both rules only shuffle zeros: "10" -> "01" slides a zero one
        # seat left, and "00" -> "10" fuses an adjacent pair into their
        # right seat. Herding all z zeros into the first one (index first)
        # parks the survivor at first + z - 1 with '1' everywhere else;
        # with at most one zero no move can improve the string.
        zeros = binary.count("0")
        if zeros <= 1:
            return binary
        first = binary.index("0")
        return "1" * (first + zeros - 1) + "0" + "1" * (len(binary) - first - zeros)
