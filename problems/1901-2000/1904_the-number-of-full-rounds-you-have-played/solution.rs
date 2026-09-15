impl Solution {
    pub fn number_of_rounds(login_time: String, logout_time: String) -> i32 {
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
        let lb = login_time.as_bytes();
        let ob = logout_time.as_bytes();
        let digit = |b: u8| (b - b'0') as i32;
        let login = digit(lb[0]) * 600 + digit(lb[1]) * 60 + digit(lb[3]) * 10 + digit(lb[4]);
        let mut logout = digit(ob[0]) * 600 + digit(ob[1]) * 60 + digit(ob[3]) * 10 + digit(ob[4]);
        if logout <= login {
            logout += 24 * 60;
        }
        (logout / 15 - (login + 14) / 15).max(0)
    }
}
