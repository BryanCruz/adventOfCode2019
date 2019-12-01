#include <bits/stdc++.h>

using namespace std;

int findFuel(int mass) {
    return (mass / 3) - 2;
}

int main (void) {
    ios_base::sync_with_stdio(false);

    int sum = 0;
    int mass;
    while(scanf("%d", &mass) != EOF) {
        int fuel = findFuel(mass);
        while (fuel > 0) {
            sum += fuel;
            fuel = findFuel(fuel);
        }
    }

    printf("%d\n", sum);
    return 0;
}

