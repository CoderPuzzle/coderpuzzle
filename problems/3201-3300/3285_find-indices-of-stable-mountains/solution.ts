function stableMountains(height: number[], threshold: number): number[] {
    // Mountain i is stable exactly when its immediate predecessor is
    // strictly taller than the threshold; one left-to-right pass emits
    // the qualifying indices in ascending order.
    const stable: number[] = [];
    for (let i = 1; i < height.length; i++) {
        if (height[i - 1] > threshold) {
            stable.push(i);
        }
    }
    return stable;
}
