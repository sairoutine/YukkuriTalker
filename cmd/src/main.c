#include <stdio.h>
#include <stdlib.h>
#include "AquesTalk2.h"

int main(int argc,char **argv){
    // parse arguments
    int speed=100;
    if(argc!=3 && argc!=4){
        printf("usage:\n");
        printf("  aqwrap <input-file(SJIS)> <output-file(WAV)> <speed>?\n");
        return -1;
    }
    if(argc==4) speed=atoi(argv[3]);

    // load text
    unsigned char *text;
    FILE *fi=fopen(argv[1],"rb");
    if(fi==NULL){
        fprintf(stderr,"couldn't open input file %s\n",argv[1]);
        return -2;
    }
    fseek(fi,0,SEEK_END);
    int fsize=ftell(fi);
    text=malloc(fsize);
    fseek(fi,0,SEEK_SET);

    fread(text,fsize,1,fi);
    fclose(fi);

    // feed the text to AquesTalk
    int size;
    unsigned char *wav=AquesTalk2_Synthe_Utf8(text,speed,&size, 0);
    free(text);

    if(wav==NULL){
        fprintf(stderr,"AquesTalk_Synthe:error:%d\n",size);
        return -1;
    }

    // write out to a file
    FILE *fo=fopen(argv[2],"wb");
    if(fo==NULL){
        fprintf(stderr,"couldn't open output file %s\n",argv[2]);
        AquesTalk2_FreeWave(wav);
        return -2;
    }
    fwrite(wav,1,size,fo);
    AquesTalk2_FreeWave(wav);
    fclose(fo);

    return 0;
}

