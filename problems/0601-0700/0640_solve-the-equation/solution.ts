function solveEquation(equation: string): string {
    // Split at the one '=' and reduce each side to a*x + b with a single
    // scan. A term is an optional sign, digits (empty before an 'x' means
    // coefficient 1), and a possible trailing 'x'; '0x' contributes a zero
    // coefficient and drops out by itself.
    const eq = equation.indexOf("=");
    const [la, lb] = parseSide(equation.slice(0, eq));
    const [ra, rb] = parseSide(equation.slice(eq + 1));
    // la*x + lb = ra*x + rb -> (la - ra)*x = rb - lb. A zero coefficient
    // leaves either every x or no x; otherwise the division is exact.
    const a = la - ra;
    const b = rb - lb;
    if (a === 0) {
        return b === 0 ? "Infinite solutions" : "No solution";
    }
    return `x=${b / a}`;
}

const parseSide = (side: string): [number, number] => {
    let a = 0;
    let b = 0;
    let i = 0;
    while (i < side.length) {
        let sign = 1;
        const mark = side[i];
        if (mark === "+" || mark === "-") {
            sign = mark === "-" ? -1 : 1;
            i += 1;
        }
        let value = 0;
        let hasDigits = false;
        while (i < side.length && side[i] >= "0" && side[i] <= "9") {
            value = value * 10 + Number(side[i]);
            hasDigits = true;
            i += 1;
        }
        if (i < side.length && side[i] === "x") {
            a += sign * (hasDigits ? value : 1);
            i += 1;
        } else {
            b += sign * value;
        }
    }
    return [a, b];
};
