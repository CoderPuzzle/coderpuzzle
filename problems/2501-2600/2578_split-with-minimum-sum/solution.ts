function splitNum(num: number): number {
    // Greedy over sorted digits: ascending order, dealt alternately to
    // num1 and num2, puts the small digits where they carry the most
    // significance and interleaves so neither number grows a fat
    // leading digit. A final exchange argument shows any other deal has
    // both parts at least as large. Sums stay under 2*10^5 here (each
    // part has at most ceil(log10(num)) <= 5 significant digits), far
    // inside Number precision.
    const digits = String(num).split("").sort();
    let num1 = 0;
    let num2 = 0;
    for (let i = 0; i < digits.length; ++i) {
        if (i % 2 === 0) {
            num1 = num1 * 10 + Number(digits[i]);
        } else {
            num2 = num2 * 10 + Number(digits[i]);
        }
    }
    return num1 + num2;
}
