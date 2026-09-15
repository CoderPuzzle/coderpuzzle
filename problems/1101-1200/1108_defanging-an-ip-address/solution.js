/**
 * @param {string} address
 * @return {string}
 */
var defangIPaddr = function (address) {
    // A single global replacement is the whole algorithm: the input is a
    // valid IPv4 address, so every '.' sits between numeric segments and
    // each one becomes "[.]".
    return address.replace(/\./g, "[.]");
};
