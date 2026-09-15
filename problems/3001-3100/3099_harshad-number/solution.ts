function sumOfTheDigitsOfHarshadNumber(x: number): number {
    // Extract digits by repeated division (hint 1), then the definition
    // itself finishes the job: x is a Harshad number exactly when its digit
    // sum divides it. With x <= 100 there are at most three digits and every
    // intermediate stays far inside Number's exact integer window.
    let total = 0;
    let remaining = x;
    while (remaining > 0) {
        total += remaining % 10;
        remaining = Math.floor(remaining / 10);
    }
    return x % total === 0 ? total : -1;
}
