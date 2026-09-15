// Positive divisors pair off (d, n/d), so exactly three divisors forces
// n = x*x and a divisor list of just 1, x, x^2 -- which holds precisely
// when x is prime (a composite root x = a*b would add a*b as a fourth
// divisor). Since n <= 10^4, the root x <= 100, and x*x stays an exact
// small integer in the double.
function isThree(n: number): boolean {
    let x = 1;
    while (x * x < n) {
        x += 1;
    }
    if (x * x !== n) {
        return false;
    }
    for (let d = 2; d < x; d += 1) {
        if (x % d === 0) {
            return false;
        }
    }
    return x > 1;
}
