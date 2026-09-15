/**
 * @param {number[]} colors
 * @return {number}
 */
var maxDistance = function (colors) {
    const last = colors.length - 1;
    let answer = 0;
    for (let index = 0; index < colors.length; index++) {
        if (colors[index] !== colors[0]) {
            answer = Math.max(answer, index);
        }
        if (colors[index] !== colors[last]) {
            answer = Math.max(answer, last - index);
        }
    }
    return answer;
};
