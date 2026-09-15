function validDigit(n: number, x: number): boolean {
    const digits = String(n);
    const target = String(x);
    return digits.includes(target) && digits[0] !== target;
}
