/**
 * @param {string} caption
 * @return {string}
 */
var generateTag = function (caption) {
    // Words are joined in order — the first word fully lowercase, later
    // words with only their first letter capitalized — then the leading
    // '#' plus English letters survive and the tag is cut to 100
    // characters.
    const words = caption.split(" ").filter((word) => word.length > 0);
    let tag = "#";
    for (let index = 0; index < words.length; index++) {
        const lower = words[index].toLowerCase();
        tag += index === 0 ? lower : lower[0].toUpperCase() + lower.slice(1);
    }
    const kept = ["#"];
    for (const ch of tag.slice(1)) {
        if ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z")) kept.push(ch);
    }
    return kept.slice(0, 100).join("");
};
