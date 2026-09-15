from typing import List


class Solution:
    def validUtf8(self, data: List[int]) -> bool:
        # Only the least significant 8 bits of each integer are data, so mask
        # down to one byte before reading the leading bits.
        remaining = 0
        for value in data:
            byte = value & 0xFF
            if remaining == 0:
                # The leader's top bits name its class: 0xxxxxxx (1 byte),
                # 110xxxxx (2), 1110xxxx (3), 11110xxx (4); a stray
                # continuation or the undefined 11111xxx is no leader at all.
                if (byte & 0xF8) == 0xF0:
                    remaining = 3
                elif (byte & 0xF0) == 0xE0:
                    remaining = 2
                elif (byte & 0xE0) == 0xC0:
                    remaining = 1
                elif (byte & 0x80) == 0x00:
                    pass
                else:
                    return False
            elif (byte & 0xC0) != 0x80:
                # Every byte a leader owes must be a 10xxxxxx continuation.
                return False
            else:
                remaining -= 1
        # A leader cut short by the end of the input leaves bytes owed.
        return remaining == 0
