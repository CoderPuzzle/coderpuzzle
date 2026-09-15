function countSubranges(nums1: number[], nums2: number[]): number {
    const mod = 1000000007;
    const offset = 10000;
    const size = 20001;
    let previous = new Int32Array(size);
    let answer = 0;
    for (let index = 0; index < nums1.length; index++) {
        const current = new Int32Array(size);
        current[offset + nums1[index]] = 1;
        current[offset - nums2[index]] = (current[offset - nums2[index]] + 1) % mod;
        for (let position = 0; position < size; position++) {
            const count = previous[position];
            if (count === 0) continue;
            if (position + nums1[index] < size) {
                current[position + nums1[index]] = (current[position + nums1[index]] + count) % mod;
            }
            if (position - nums2[index] >= 0) {
                current[position - nums2[index]] = (current[position - nums2[index]] + count) % mod;
            }
        }
        answer = (answer + current[offset]) % mod;
        previous = current;
    }
    return answer;
}
