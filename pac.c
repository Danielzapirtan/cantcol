#include <stdio.h>
#include <stdlib.h>

int conv_by_line() {
  while (!feof(stdin)) {
	  system("date +%Y%m%d%H%M%S%N");
	  fflush(stdout);
	  int ch;
	  while ((ch = getchar()) != 10 ) {
	    putchar(ch);
  	}
	  putchar(10);
	  fflush(stdout);
	}
}

int main() {conv_by_line();}
