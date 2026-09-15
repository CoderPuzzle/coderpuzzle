function minAbsoluteDifference(nums: number[], x: number): number {
    // A pair consists of two distinct indices, so x == 0 still demands a
    // separation of at least one index step. All values are integers well
    // below 2^53, so every difference here is exact.
    const separation = Math.max(x, 1);
    const vals = Array.from(new Set(nums)).sort((a, b) => a - b);
    const m = vals.length;
    const rank = new Map<number, number>();
    for (let i = 0; i < m; i++) {
        rank.set(vals[i], i + 1);
    }
    const tree = new Array<number>(m + 1).fill(0);
    let top = 1;
    while (top * 2 <= m) {
        top *= 2;
    }
    let answer = -1;
    for (let j = 0; j < nums.length; j++) {
        if (j >= separation) {
            // Partner nums[j - separation] enters the eligible prefix
            // before nums[j] queries it.
            for (let i = rank.get(nums[j - separation])!; i <= m; i += i & -i) {
                tree[i] += 1;
            }
            const value = nums[j];
            let count = 0;
            for (let i = rank.get(value)!; i > 0; i -= i & -i) {
                count += tree[i];
            }
            const have = j - separation + 1;
            if (count > 0) {
                let pos = 0;
                let rem = count;
                for (let step = top; step > 0; step >>= 1) {
                    const nxt = pos + step;
                    if (nxt <= m && tree[nxt] < rem) {
                        pos = nxt;
                        rem -= tree[nxt];
                    }
                }
                const difference = value - vals[pos];
                if (answer < 0 || difference < answer) {
                    answer = difference;
                }
            }
            if (have > count) {
                let pos = 0;
                let rem = count + 1;
                for (let step = top; step > 0; step >>= 1) {
                    const nxt = pos + step;
                    if (nxt <= m && tree[nxt] < rem) {
                        pos = nxt;
                        rem -= tree[nxt];
                    }
                }
                const difference = vals[pos] - value;
                if (answer < 0 || difference < answer) {
                    answer = difference;
                }
            }
        }
    }
    return answer;
}
