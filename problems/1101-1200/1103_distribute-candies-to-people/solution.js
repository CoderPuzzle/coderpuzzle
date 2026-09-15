/**
 * @param {number} candies
 * @param {number} num_people
 * @return {number[]}
 */
var distributeCandies = function (candies, num_people) {
    // Hand out one gift per turn, cycling through the row. Each turn the
    // gift grows by one; when fewer candies remain than the next gift,
    // the current person takes what is left and the loop ends.
    const result = new Array(num_people).fill(0);
    let give = 1;
    for (let index = 0; candies > 0; ++index) {
        const take = Math.min(give, candies);
        result[index % num_people] += take;
        candies -= take;
        ++give;
    }
    return result;
};
