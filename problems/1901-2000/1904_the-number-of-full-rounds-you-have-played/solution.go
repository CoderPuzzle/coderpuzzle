// Rounds start at every quarter hour, so measuring both times in minutes
// from midnight turns the question into interval counting: a round
// starting at s is fully played exactly when login <= s and s + 15 <=
// logout. When logout is not after login the session crosses midnight,
// and adding one day to logout — the 48-hour picture — unrolls that wrap
// into one forward interval. The first round start at or after login is
// ceil(login / 15) and the last round ending at or before logout is the
// one starting at floor(logout / 15) - 1, so the count is their
// difference clamped at zero; both operands stay far below any 32-bit
// bound.
func numberOfRounds(loginTime string, logoutTime string) int {
	login := int(loginTime[0]-'0')*600 + int(loginTime[1]-'0')*60 +
		int(loginTime[3]-'0')*10 + int(loginTime[4]-'0')
	logout := int(logoutTime[0]-'0')*600 + int(logoutTime[1]-'0')*60 +
		int(logoutTime[3]-'0')*10 + int(logoutTime[4]-'0')
	if logout <= login {
		logout += 24 * 60
	}
	count := logout/15 - (login+14)/15
	if count < 0 {
		return 0
	}
	return count
}
