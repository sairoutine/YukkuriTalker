# main.c
### 元
http://xanxys.hatenablog.jp/entry/20100116/1263608651

### コンパイル方法
CentOS
```
# yum install mingw32-gcc
# ls
quesTalk.h AquesTalk.dll AquesTalk.lib main.c
# i686-pc-mingw32-gcc main.c AquesTalk.lib -o AquesTalk.exe
```

### 使い方
```
wine AquesTalk.exe 文字列(s-jis)の入ったファイル 出力先wav名 再生スピード
```

```
$ echo "わいんでも、ゆっくりしていってね。" | nkf -s > test
$ wine AquesTalk.exe test x.wav 80
```

# 評価版 AquesTalk ライブラリ
http://www.a-quest.com/download/index.html

version は 2ではなく 1
