class Solution {

    public String defangIPaddr(String address) {
        // A single global replacement is the whole algorithm: the input is a
        // valid IPv4 address, so every '.' sits between numeric segments and
        // each becomes "[.]".
        return address.replace(".", "[.]");
    }
}
