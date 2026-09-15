/**
 * @param {string} title
 * @return {string}
 */
var capitalizeTitle = function (title) {
    return title
        .split(" ")
        .map((word) => {
            const lowered = word.toLowerCase();
            return word.length <= 2 ? lowered : lowered[0].toUpperCase() + lowered.slice(1);
        })
        .join(" ");
};
