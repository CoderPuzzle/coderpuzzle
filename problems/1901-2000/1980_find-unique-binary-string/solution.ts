function findDifferentBinaryString(nums: string[]): string {
    const n = nums.length;
    const chars: string[] = new Array(n);
    for (let i = 0; i < n; i++) {
        chars[i] = nums[i][i] === "0" ? "1" : "0";
    }
    return chars.join("");
}
