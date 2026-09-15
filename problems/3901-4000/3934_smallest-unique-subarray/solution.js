var smallestUniqueSubarray = function (nums) {
    const valueCounts = new Map();
    for (const value of nums) valueCounts.set(value, (valueCounts.get(value) ?? 0) + 1);
    for (const count of valueCounts.values()) if (count === 1) return 1;
    if (valueCounts.size === 1) return nums.length;

    const base = 100003;
    const mod1 = 10000019;
    const mod2 = 10000079;
    const n = nums.length;
    const power1 = Array(n + 1).fill(1);
    const power2 = Array(n + 1).fill(1);
    const prefix1 = Array(n + 1).fill(0);
    const prefix2 = Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        power1[i + 1] = (power1[i] * base) % mod1;
        power2[i + 1] = (power2[i] * base) % mod2;
        prefix1[i + 1] = (prefix1[i] * base + nums[i]) % mod1;
        prefix2[i + 1] = (prefix2[i] * base + nums[i]) % mod2;
    }
    const works = (length) => {
        const frequencies = new Map();
        for (let start = 0; start + length <= n; start++) {
            const end = start + length;
            const first = (prefix1[end] - ((prefix1[start] * power1[length]) % mod1) + mod1) % mod1;
            const second = (prefix2[end] - ((prefix2[start] * power2[length]) % mod2) + mod2) % mod2;
            const key = `${first},${second}`;
            frequencies.set(key, (frequencies.get(key) ?? 0) + 1);
        }
        for (const count of frequencies.values()) if (count === 1) return true;
        return false;
    };
    let low = 1;
    let high = n;
    while (low < high) {
        const middle = Math.floor((low + high) / 2);
        if (works(middle)) high = middle;
        else low = middle + 1;
    }
    return low;
};
