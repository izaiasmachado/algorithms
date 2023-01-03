# Description: Coin Change using Recursion
# Author: Izaias Machado
# Date: 2023-01-03 (yyyy-mm-dd)
# License: MIT

def coinChangeR(coins, n, sum):
    if sum == 0:
        return 1

    if sum < 0 or n == 0:
        return 0

    result = coinChangeR(coins, n - 1, sum); # exclude the coin
    result += coinChangeR(coins, n, sum - coins[n - 1]); # include the coin

    return result
