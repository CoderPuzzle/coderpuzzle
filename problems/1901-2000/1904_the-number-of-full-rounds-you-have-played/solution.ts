// Rounds start at every quarter hour, so measuring both times in minutes
// from midnight turns the question into interval counting: a round
// starting at s is fully played exactly when login <= s and s + 15 <=
// logout. When logout is not after login the session crosses midnight,
// and adding one day to logout — the 48-hour picture — unrolls that wrap
// into one forward interval. The first round start at or after login is
// ceil(login / 15) and the last round ending at or before logout is the
// one starting at floor(logout / 15) - 1, so the count is their
// difference clamped at zero; every operand is at most 2879, exact as a
// JS number.
function numberOfRounds(loginTime: string, logoutTime: string): number {
    const login = Number(loginTime.slice(0, 2)) * 60 + Number(loginTime.slice(3));
    let logout = Number(logoutTime.slice(0, 2)) * 60 + Number(logoutTime.slice(3));
    if (logout <= login) {
        logout += 24 * 60;
    }
    return Math.max(0, Math.floor(logout / 15) - Math.ceil(login / 15));
}
