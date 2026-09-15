function fractionAddition(expression: string): string {
    // One left-to-right scan reads each fraction: an optional sign, the
    // numerator's digits, '/', the denominator's digits. Fold it into the
    // running num/den by cross-multiplication - num/den +/- v/w =
    // (num*w +/- v*den)/(den*w) - integers only, never floats.
    let num = 0;
    let den = 1;
    let i = 0;
    while (i < expression.length) {
        let sign = 1;
        const mark = expression[i];
        if (mark === "+" || mark === "-") {
            sign = mark === "-" ? -1 : 1;
            i += 1;
        }
        let value = 0;
        while (i < expression.length && expression[i] >= "0" && expression[i] <= "9") {
            value = value * 10 + Number(expression[i]);
            i += 1;
        }
        i += 1; // the '/' between numerator and denominator
        let divisor = 0;
        while (i < expression.length && expression[i] >= "0" && expression[i] <= "9") {
            divisor = divisor * 10 + Number(expression[i]);
            i += 1;
        }
        num = num * divisor + sign * value * den;
        den *= divisor;
    }
    // Reduce once at the end. gcd(0, den) is den, so a zero sum collapses to
    // 0/1 and an integer keeps its denominator 1; the sign stays on the
    // numerator because den, a product of positives, is positive.
    let a = Math.abs(num);
    let b = den;
    while (b !== 0) {
        const rest = a % b;
        a = b;
        b = rest;
    }
    return `${num / a}/${den / a}`;
}
