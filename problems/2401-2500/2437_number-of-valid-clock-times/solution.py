from typing import List


class Solution:
    def countTime(self, time: str) -> int:
        # Count the valid hours and the valid minutes independently; the
        # two fields never constrain each other, so the answer is their
        # product. A field with no ? has exactly one value if it is itself
        # in range, which the given format guarantees.
        h_tens = time[0]
        h_ones = time[1]
        m_tens = time[3]
        m_ones = time[4]

        hours = 0
        for h in range(24):
            if (h_tens == "?" or h // 10 == int(h_tens)) and (h_ones == "?" or h % 10 == int(h_ones)):
                hours += 1

        minutes = 0
        for m in range(60):
            if (m_tens == "?" or m // 10 == int(m_tens)) and (m_ones == "?" or m % 10 == int(m_ones)):
                minutes += 1

        return hours * minutes
