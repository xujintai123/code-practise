/*
 * @lc app=leetcode.cn id=17 lang=csharp
 *
 * [17] 电话号码的字母组合
 *
 * https://leetcode.cn/problems/letter-combinations-of-a-phone-number/
 *
 * 给定一个没有重复数字的序列，返回其所有可能的全排列。
 * 
 * 示例:
 * 
 * 输入: "23"
 * 输出: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * 
 */

function letterCombinations(digits: string): string[] {
    if (!digits) return [];

    let res: string[] = [];
    const map = new Map<string, string[]>([['2', ["a", "b", "c"]],
    ['3', ["d", "e", "f"]], ['4', ["g", "h", "i"]], ['5', ["j", "k", "l"]], 
    ['6', ["m", "n", "o"]], ['7', ["p", "q", "r", "s"]], ['8', ["t", "u", "v"]],
    ['9', ["w", "x", "y", "z"]]]);

    function dfs(str: string, deep: number) {
        if (deep === digits.length) {
            res.push(str);
            return;
        }
        const letters = map.get(digits[deep]);
        for (let i = 0; i < letters.length; i++) {
            dfs(`${str}${letters[i]}`, deep + 1);
        }
    }

    dfs('', 0);

    return res;
};

letterCombinations("23");

// @lc code=end