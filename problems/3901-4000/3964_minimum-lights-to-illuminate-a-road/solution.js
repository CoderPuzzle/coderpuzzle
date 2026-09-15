/**
 * @param {number[]} lights
 * @return {number}
 */
var minLights = function (lights) {
    const n = lights.length;
    const diff = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        if (lights[i] === 0) continue;
        const left = Math.max(0, i - lights[i]);
        const right = Math.min(n - 1, i + lights[i]);
        diff[left]++;
        diff[right + 1]--;
    }
    const covered = new Array(n).fill(false);
    let current = 0;
    for (let i = 0; i < n; i++) {
        current += diff[i];
        covered[i] = current > 0;
    }

    let answer = 0;
    for (let i = 0; i < n; i++) {
        if (!covered[i]) {
            answer++;
            const end = Math.min(n - 1, i + 2);
            for (let j = i; j <= end; j++) covered[j] = true;
            i = end;
        }
    }
    return answer;
};
