/**
 * @param {number[][]} restaurants
 * @param {number} veganFriendly
 * @param {number} maxPrice
 * @param {number} maxDistance
 * @return {number[]}
 */
var filterRestaurants = function (restaurants, veganFriendly, maxPrice, maxDistance) {
    // Inclusive caps; the vegan filter only bites when it is 1. Survivors
    // sort by rating desc, then id desc.
    return restaurants
        .filter((entry) => (veganFriendly === 0 || entry[2] === 1) && entry[3] <= maxPrice && entry[4] <= maxDistance)
        .sort((a, b) => (b[1] !== a[1] ? b[1] - a[1] : b[0] - a[0]))
        .map((entry) => entry[0]);
};
