class Solution {

    public int numberOfRounds(String loginTime, String logoutTime) {
        // Rounds start at every quarter hour, so measuring both times in
        // minutes from midnight turns the question into interval counting:
        // a round starting at s is fully played exactly when login <= s
        // and s + 15 <= logout. When logout is not after login the
        // session crosses midnight, and adding one day to logout — the
        // 48-hour picture — unrolls that wrap into one forward interval.
        // The first round start at or after login is ceil(login / 15)
        // and the last round ending at or before logout is the one
        // starting at floor(logout / 15) - 1, so the count is their
        // difference clamped at zero; both operands stay far below any
        // 32-bit bound.
        int login = Integer.parseInt(loginTime.substring(0, 2)) * 60 + Integer.parseInt(loginTime.substring(3));
        int logout = Integer.parseInt(logoutTime.substring(0, 2)) * 60 + Integer.parseInt(logoutTime.substring(3));
        if (logout <= login) {
            logout += 24 * 60;
        }
        return Math.max(0, logout / 15 - (login + 14) / 15);
    }
}
