function uniformArray(nums1: number[]): boolean {
    // All-even is achievable iff every element is even: an odd element can
    // only become even by subtracting a smaller odd element, which the
    // minimum odd element can never do. All-odd is achievable iff the
    // minimum element is odd, because then every even element can subtract
    // it. So the minimum plus an all-even check decides the whole array in
    // a single pass each.
    let smallest = nums1[0];
    for (const x of nums1) {
        if (x < smallest) smallest = x;
    }
    if (smallest % 2 === 1) return true;
    return nums1.every((x) => x % 2 === 0);
}
