/**
 * @param {number} n
 * @param {number[][]} lights
 * @param {number[]} requirement
 * @return {number}
 */
var meetRequirement = function (n, lights, requirement) {
    const delta = new Array(n + 1).fill(0);
    for (const [position, range] of lights) {
        delta[Math.max(0, position - range)]++;
        delta[Math.min(n, position + range + 1)]--;
    }
    let brightness = 0;
    let count = 0;
    for (let i = 0; i < n; i++) {
        brightness += delta[i];
        if (brightness >= requirement[i]) {
            count++;
        }
    }
    return count;
};
