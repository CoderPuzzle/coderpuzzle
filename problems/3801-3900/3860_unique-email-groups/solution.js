/**
 * @param {string[]} emails
 * @return {number}
 */
var uniqueEmailGroups = function (emails) {
    // A group is identified by its normalized address: the local part
    // loses its dots and anything from the first '+', then both parts
    // are lowercased.
    const seen = new Set();
    for (const email of emails) {
        const at = email.indexOf("@");
        let local = email.slice(0, at);
        const plus = local.indexOf("+");
        if (plus !== -1) {
            local = local.slice(0, plus);
        }
        const key = local.replace(/\./g, "").toLowerCase() + "@" + email.slice(at + 1).toLowerCase();
        seen.add(key);
    }
    return seen.size;
};
