#include<stdio.h>
#include<cmath>

#define A 271973
#define B 785961

int valid(int v) {

  int prevD = 10;
  int equals = 0;
  while(v > 0){
    int d = v % 10;
    v /= 10;

    if (d > prevD) return 0;
    if (d == prevD) equals++;
    prevD = d;
  }

  if (equals == 0) return 0;

  return 1;
}

int main(void) {
  int total = 0;
  for (int i = A; i <= B; i++) {
    total += valid(i);
  }
  
  printf("%d\n", total);
}
