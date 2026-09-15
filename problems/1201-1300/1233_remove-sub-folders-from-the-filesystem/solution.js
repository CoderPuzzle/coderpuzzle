/**
 * @param {string[]} folder
 * @return {string[]}
 */
var removeSubfolders = function (folder) {
    const sorted = [...folder].sort();
    const out = [];
    for (const path of sorted) {
        // The slash separates a true child ("/a" + "/") from a longer
        // sibling sharing the name prefix ("/ab" vs "/a/").
        if (out.length === 0 || !path.startsWith(out[out.length - 1] + "/")) {
            out.push(path);
        }
    }
    return out;
};
