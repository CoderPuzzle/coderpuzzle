function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
    const maximum = Math.max(...candies);
    return candies.map((count) => count + extraCandies >= maximum);
}
