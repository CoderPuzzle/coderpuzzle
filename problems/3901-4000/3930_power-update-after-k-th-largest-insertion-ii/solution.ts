function powerUpdate(nums: number[], p: number, queries: number[][]): number[] {
    const values = [...new Set([...nums, ...queries.map((query) => query[0])])].sort((a, b) => a - b);
    const rankOf = new Map(values.map((value, index) => [value, index]));
    const tree = Array(values.length + 1).fill(0);
    const add = (position: number): void => {
        for (let index = position + 1; index < tree.length; index += index & -index) tree[index]++;
    };
    for (const value of nums) add(rankOf.get(value)!);
    let size = nums.length;
    const modulus = 1000000007n;
    const modPow = (base: number, exponent: number): number => {
        let result = 1n;
        let value = BigInt(base);
        while (exponent > 0) {
            if (exponent & 1) result = (result * value) % modulus;
            value = (value * value) % modulus;
            exponent = Math.floor(exponent / 2);
        }
        return Number(result);
    };
    const answer: number[] = [];
    for (const [value, k] of queries) {
        add(rankOf.get(value)!);
        size++;
        let rank = size - k + 1;
        let index = 0;
        let step = 1;
        while (step * 2 <= values.length) step *= 2;
        for (; step > 0; step = Math.floor(step / 2)) {
            const next = index + step;
            if (next < tree.length && tree[next] < rank) {
                index = next;
                rank -= tree[next];
            }
        }
        p = modPow(p, values[index]);
        answer.push(p);
    }
    return answer;
}
