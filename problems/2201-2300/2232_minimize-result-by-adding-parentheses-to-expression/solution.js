/**
 * @param {string} expression
 * @return {string}
 */
var minimizeResult = function (expression) {
    const plus = expression.indexOf("+");
    const left = expression.slice(0, plus);
    const right = expression.slice(plus + 1);
    let bestValue = Infinity;
    let bestForm = "";
    for (let i = 0; i < left.length; i++) {
        const outerLeft = i > 0 ? Number(left.slice(0, i)) : 1;
        const innerLeft = Number(left.slice(i));
        for (let j = 1; j <= right.length; j++) {
            const innerRight = Number(right.slice(0, j));
            const outerRight = j < right.length ? Number(right.slice(j)) : 1;
            const value = outerLeft * (innerLeft + innerRight) * outerRight;
            if (value < bestValue) {
                bestValue = value;
                bestForm = `${left.slice(0, i)}(${left.slice(i)}+${right.slice(0, j)})${right.slice(j)}`;
            }
        }
    }
    return bestForm;
};
