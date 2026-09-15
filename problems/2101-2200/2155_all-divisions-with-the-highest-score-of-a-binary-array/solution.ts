// score(i) = zeros in nums[:i] + ones in nums[i:]. Both addends stay as
// running counters — ones on the right is total_ones minus the ones
// already passed — so each of the n + 1 division points costs O(1).
// Scores never exceed n = 10^5, far below Number's 2^53 ceiling, so
// plain arithmetic stays exact. The sweep emits indices ascending.
function maxScoreIndices(nums: number[]): number[] {
    const totalOnes = nums.reduce((a, b) => a + b, 0);
    let onesLeft = 0;
    let zerosLeft = 0;
    let best = -1;
    let answer: number[] = [];
    for (let i = 0; i <= nums.length; i++) {
        const score = zerosLeft + totalOnes - onesLeft;
        if (score > best) {
            best = score;
            answer = [i];
        } else if (score === best) {
            answer.push(i);
        }
        if (i < nums.length) {
            if (nums[i]) {
                onesLeft++;
            } else {
                zerosLeft++;
            }
        }
    }
    return answer;
}
