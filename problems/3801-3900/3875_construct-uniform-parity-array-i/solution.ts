function uniformArray(nums1: number[]): boolean {
    // All-even needs 0 odd elements, or at least 2 so each odd can
    // subtract another odd; all-odd needs at least one odd for the even
    // elements to subtract. One of the two always holds.
    let odd = 0;
    for (const x of nums1) {
        if (x % 2 === 1) {
            odd++;
        }
    }
    const allEvenOk = odd === 0 || odd >= 2;
    const allOddOk = odd >= 1;
    return allEvenOk || allOddOk;
}
