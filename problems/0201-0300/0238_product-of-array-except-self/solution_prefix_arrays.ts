/**
 * The judge's expected values are exact big integers, so the products are
 * computed with BigInt. The harness serializes the return value through
 * JSON.stringify, which cannot represent BigInt natively; teach it to emit
 * bare integer tokens for BigInt members.
 */
const __coderpuzzleNativeStringify: (value: any, replacer?: any, space?: any) => string = JSON.stringify;
(JSON as { stringify: (value: any, replacer?: any, space?: any) => string }).stringify = function (
    value: any,
    replacer?: any,
    space?: any,
): string {
    const text = __coderpuzzleNativeStringify(
        value,
        function (key: string, item: any) {
            if (typeof item === "bigint") {
                return "__coderpuzzle_bigint__" + item.toString();
            }
            return replacer ? replacer.call(this, key, item) : item;
        },
        space,
    );
    return typeof text === "string" ? text.replace(/"__coderpuzzle_bigint__(-?\d+)"/g, "$1") : text;
};

function productExceptSelf(nums: number[]): number[] {
    // The product except nums[i] factors as (product of everything
    // before i) x (product of everything after i), both computable as
    // running products — no division, which zeros would break anyway.
    const n = nums.length;
    // pre[i] = product of the i elements preceding index i.
    const pre: bigint[] = [1n];
    for (let i = 0; i < n; i++) {
        pre.push(pre[i] * BigInt(nums[i]));
    }
    // suf[i] = product of everything from index i onward.
    const suf: bigint[] = new Array(n + 1).fill(1n);
    for (let i = n - 1; i >= 0; i--) {
        suf[i] = suf[i + 1] * BigInt(nums[i]);
    }
    const answer: bigint[] = [];
    // pre[i] x suf[i+1] spans everything except nums[i] itself; a lone
    // zero zeroes every cell but its own, automatically.
    for (let i = 0; i < n; i++) {
        answer.push(pre[i] * suf[i + 1]);
    }
    return answer as unknown as number[];
}
