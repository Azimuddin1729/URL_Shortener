function convertToBase62(number,length=6){
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const base = chars.length; // 62
    const max = Math.pow(base, length);
    if (number < 0) throw new Error("Negative numbers not supported.");
    if (number >= max) throw new Error(`Exceeded max IDs for length=${length}.`);

    let result = '';
    while (number > 0) {
        result = chars[number % base] + result;
        number = Math.floor(number / base);
    }

    return result.padStart(length, '0');
}
module.exports = {
    convertToBase62
};