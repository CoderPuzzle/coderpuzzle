// Work backwards from target: reverse double is halve (only legal on an
// even number) and reverse subtract-1 is add-1. While target sits above
// startValue, an odd target must add 1 before it can halve, and an even
// target halves at once — two adds pushed before a halve equal one add
// after it, so deferring every add is optimal. Below startValue only
// plain subtractions remain.
function brokenCalc(startValue: number, target: number): number {
    let value = target;
    let ops = 0;
    while (value > startValue) {
        if (value % 2 === 1) {
            value += 1;
        } else {
            value /= 2;
        }
        ops += 1;
    }
    return ops + startValue - value;
}
