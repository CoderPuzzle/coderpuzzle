/**
 * @param {string} num1
 * @param {string} num2
 * @param {number} min_sum
 * @param {number} max_sum
 * @return {number}
 */
var count = function (num1, num2, min_sum, max_sum) {
    const MOD = 1000000007;

    const countRange = (s) => {
        const m = s.length;
        const ms = max_sum;
        let dp = [new Array(ms + 1).fill(0), new Array(ms + 1).fill(0)];
        for (let sm = 0; sm <= ms; sm++) {
            const v = sm >= min_sum ? 1 : 0;
            dp[0][sm] = v;
            dp[1][sm] = v;
        }
        for (let pos = m - 1; pos >= 0; pos--) {
            const d0 = s.charCodeAt(pos) - 48;
            const ndp = [new Array(ms + 1).fill(0), new Array(ms + 1).fill(0)];
            for (let tight = 0; tight < 2; tight++) {
                const limit = tight === 1 ? d0 : 9;
                for (let sm = 0; sm <= ms; sm++) {
                    let total = 0;
                    for (let d = 0; d <= limit; d++) {
                        const ns = sm + d;
                        if (ns > ms) break;
                        const nt = tight === 1 && d === limit ? 1 : 0;
                        total += dp[nt][ns];
                    }
                    ndp[tight][sm] = total % MOD;
                }
            }
            dp = ndp;
        }
        return dp[1][0];
    };

    const decrement = (s) => {
        const arr = s.split("");
        let i = arr.length - 1;
        while (i >= 0 && arr[i] === "0") {
            arr[i] = "9";
            i -= 1;
        }
        arr[i] = String.fromCharCode(arr[i].charCodeAt(0) - 1);
        let j = 0;
        while (j < arr.length - 1 && arr[j] === "0") j += 1;
        return arr.slice(j).join("");
    };

    const a = countRange(num2);
    const b = countRange(decrement(num1));
    return (((a - b) % MOD) + MOD) % MOD;
};
