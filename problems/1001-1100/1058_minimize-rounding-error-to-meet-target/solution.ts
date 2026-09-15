function minimizeError(prices: string[], target: number): string {
    // Work entirely in integer thousandths so nothing ever touches a
    // float: "1.500" splits into an integer part (the floor) and a
    // 3-digit fractional part (in [0, 1000)).
    let sumFloors = 0;
    const fracs: number[] = [];
    for (const price of prices) {
        const dot = price.indexOf(".");
        const floorVal = parseInt(price.slice(0, dot), 10);
        const fracVal = parseInt(price.slice(dot + 1), 10);
        sumFloors += floorVal;
        if (fracVal !== 0) {
            fracs.push(fracVal);
        }
    }

    const countNonint = fracs.length;
    const sumCeils = sumFloors + countNonint;
    if (target < sumFloors || target > sumCeils) {
        return "-1";
    }

    // Flooring everything reaches sumFloors; each fractional price
    // switched to its ceiling adds exactly 1, so exactly k of them must
    // switch.
    const k = target - sumFloors;

    // Switching a price with fractional part f changes its error
    // contribution from f to (1000 - f): cheapest for the largest f.
    // Flip the k largest fractions first.
    const baseError = fracs.reduce((a, b) => a + b, 0);
    fracs.sort((a, b) => b - a);
    let sumFlip = 0;
    for (let i = 0; i < k; i++) {
        sumFlip += fracs[i];
    }
    const totalError = baseError + k * 1000 - 2 * sumFlip;

    const whole = Math.floor(totalError / 1000);
    const frac = totalError % 1000;
    return `${whole}.${String(frac).padStart(3, "0")}`;
}
