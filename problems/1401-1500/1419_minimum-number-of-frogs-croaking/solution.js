/**
 * @param {string} croakOfFrogs
 * @return {number}
 */
var minNumberOfFrogs = function (croakOfFrogs) {
    const order = "croak";
    const counts = [0, 0, 0, 0, 0];
    let active = 0;
    let answer = 0;
    for (const ch of croakOfFrogs) {
        const index = order.indexOf(ch);
        if (index < 0) {
            return -1;
        }
        if (index === 0) {
            counts[0]++;
            active++;
            answer = Math.max(answer, active);
        } else {
            if (counts[index - 1] === 0) {
                return -1;
            }
            counts[index - 1]--;
            counts[index]++;
            if (index === 4) {
                active--;
            }
        }
    }
    for (let i = 0; i < 4; i++) {
        if (counts[i] !== 0) {
            return -1;
        }
    }
    return answer;
};
