/**
 * 入力の桁数になるようで四捨五入する関数
 * @param num 
 * @param decimals 
 * @returns (1.234, 2) を入力した場合 1.23
 */
function round(num: number, decimals: number): number {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export { round };
