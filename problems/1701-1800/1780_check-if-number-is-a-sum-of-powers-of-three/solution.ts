// A sum of distinct powers of three is a ternary numeral written with only
// 0s and 1s: each chosen power drops a single 1 into its own position, and
// positional uniqueness makes the correspondence exact both ways. So n is
// representable iff no base-3 digit of n is 2 -- strip digits with % 3 and
// Math.floor(n / 3), failing on a 2. Since n <= 10^7 < 2^53, every value
// stays an exact small integer in the double.
function checkPowersOfThree(n: number): boolean {
    while (n > 0) {
        if (n % 3 === 2) {
            return false;
        }
        n = Math.floor(n / 3);
    }
    return true;
}
