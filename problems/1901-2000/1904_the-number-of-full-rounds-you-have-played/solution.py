from typing import List, Optional


class Solution:
    def numberOfRounds(self, loginTime: str, logoutTime: str) -> int:
        # Rounds start at every quarter hour, so measuring both times in
        # minutes from midnight turns the question into interval counting:
        # a round starting at s is fully played exactly when login <= s
        # and s + 15 <= logout. When logout is not after login the
        # session crosses midnight, and adding one day to logout — the
        # 48-hour picture — unrolls that wrap into one forward interval.
        # The first round start at or after login is ceil(login / 15)
        # and the last round ending at or before logout is the one
        # starting at floor(logout / 15) - 1, so the count is their
        # difference clamped at zero; both operands stay far below any
        # 32-bit bound.
        login = int(loginTime[:2]) * 60 + int(loginTime[3:])
        logout = int(logoutTime[:2]) * 60 + int(logoutTime[3:])
        if logout <= login:
            logout += 24 * 60
        return max(0, logout // 15 - (login + 14) // 15)
