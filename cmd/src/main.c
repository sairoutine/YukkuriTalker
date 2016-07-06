#include <stdio.h>
#include <stdlib.h>
#include "AquesTalk.h"

int main(int argc,char **argv){
	int speed=100; // default

	// parse arguments
	if(argc!=2 && argc!=3){
		printf("usage:\n");
		printf("AquesTalk.exe <output-file(WAV)> <speed>\n");
		return -1;
	}
	if(argc==3) speed=atoi(argv[2]);

	// load text
	unsigned char *text;
	fgets(text, fsize(text), stdin);

	// feed the text to AquesTalk
	int size;
	unsigned char *wav=AquesTalk_Synthe_Utf8(text,speed,&size);
	free(text);

	if(wav==NULL){
		fprintf(stderr,"AquesTalk_Synthe:error:%d\n",size);
		return -1;
	}

	// write out to a file
	FILE *fo=fopen(argv[1],"wb");
	if(fo==NULL){
		fprintf(stderr,"couldn't open output file %s\n",argv[2]);
		AquesTalk_FreeWave(wav);
		return -2;
	}
	fwrite(wav,1,size,fo);
	AquesTalk_FreeWave(wav);
	fclose(fo);

	return 0;
}
