/**
 * @param {string[]} paths
 * @return {string[][]}
 */
var findDuplicate = function (paths) {
    // One scan groups every file by what it contains. Inside a directory
    // info string the directory path comes first, then its files; a file
    // token keeps its name before the first '(' and its content between
    // that '(' and the token's last ')'. Contents hold no space — the
    // space-separated tokenization could not carry one — so every file
    // lands in exactly one bucket, its path appended in scan order.
    const groups = new Map();
    for (const info of paths) {
        const tokens = info.split(" ");
        const directory = tokens[0];
        for (let i = 1; i < tokens.length; ++i) {
            const token = tokens[i];
            const openAt = token.indexOf("(");
            const closeAt = token.lastIndexOf(")");
            const name = token.slice(0, openAt);
            const content = token.slice(openAt + 1, closeAt);
            if (!groups.has(content)) {
                groups.set(content, []);
            }
            groups.get(content).push(directory + "/" + name);
        }
    }
    const contents = [...groups.keys()].sort().reverse();
    // A bucket answers the question only once a second file joins it; the
    // pinned order lists the survivors by content, descending.
    const results = [];
    for (const content of contents) {
        const group = groups.get(content);
        if (group.length >= 2) {
            results.push(group);
        }
    }
    return results;
};
