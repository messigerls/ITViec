function removeQuotation(string) {
    return string.replace(/['"]+/g, "");
}
function getDateTimeNow() {
    const now = new Date();
    const updateTime = `${now.getFullYear()}-${
        now.getMonth() + 1 < 10
            ? "0" + (now.getMonth() + 1)
            : now.getMonth() + 1
    }-${
        now.getDate() < 10 ? "0" + now.getDate() : now.getDate()
    } ${now.toTimeString().substring(0, 8)}`;
    return updateTime;
}

module.exports = { removeQuotation, getDateTimeNow };
