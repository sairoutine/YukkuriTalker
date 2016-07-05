//////////////////////////////////////////////////////////////////////
/*!	@class	CAquesTalk

	@brief	規則音声合成エンジン AquesTalk

  音声記号列から音声波形データをメモリ上に生成する
  出力音声波形は、8HKzサンプリング, 16bit,モノラル,WAVフォーマット


	@author	N.Yamazaki (Aquest)

	@date	2006/05/08	N.Yamazaki	Creation
	@date	2006/10/03	N.Yamazaki	Ver.2.0
	@date	2006/10/12	N.Yamazaki	Ver.2.1 .defファイルの使用と__stdcallの定義
	@date	2007/09/27	N.Yamazaki	Ver.2.2 各種文字コードの記号列に対応
*/
//	このソースコードの利用条件については、
//	同梱の AqLicense.txt をご覧ください
//  COPYRIGHT (C) 2006 AQUEST CORP.
//////////////////////////////////////////////////////////////////////
#if !defined(_AQUESTALK_H_)
#define _AQUESTALK_H_
#ifdef __cplusplus
extern "C"{
#endif

#if defined(AQUESTALK_EXPORTS)
#undef	DllExport
#define DllExport	__declspec( dllexport )
#else
#define DllExport
#endif

#if !(defined(WIN32)||defined(WINCE))
#define	__stdcall		// for Linux etc.
#endif

/////////////////////////////////////////////
//!	音声記号列から音声波形を生成
//!	音声波形データは内部で領域確保される。
//!	音声波形データの解放は本関数の呼び出し側でAquesTalk_FreeWave()にて行う
//! @param	koe[in]		音声記号列（SJIS NULL終端）
//! @param	iSpeed[in]	発話速度 [%] 50-300 の間で指定
//!	@param	pSize[out]	生成した音声データのサイズ[byte]（エラーの場合はエラーコードが返る）
//!	@return	WAVフォーマットの音声データの先頭アドレス。エラー時はNULLが返る
DllExport unsigned char * __stdcall AquesTalk_Synthe(const char *koe, int iSpeed, int *pSize);

//! @param	koe[in]		音声記号列（EUC NULL終端）
DllExport unsigned char * __stdcall AquesTalk_Synthe_Euc(const char *koe, int iSpeed, int *pSize);

//! @param	koe[in]		音声記号列（UTF8 NULL終端 BOMはつけられない）
DllExport unsigned char * __stdcall AquesTalk_Synthe_Utf8(const char *koe, int iSpeed, int *pSize);

//! @param	koe[in]		音声記号列（UTF16 NULL終端 BOMの有無は問わない　エンディアンは実行環境に従う）
DllExport unsigned char * __stdcall AquesTalk_Synthe_Utf16(const unsigned short *koe, int iSpeed, int *pSize);

//! @param	koe[in]		音声記号列（ローマ字表記 NULL終端）
DllExport unsigned char * __stdcall AquesTalk_Synthe_Roman(const char *koe, int iSpeed, int *pSize);


/////////////////////////////////////////////
//!	音声データの領域を開放
//!	@param  wav[in]		AquesTalk_Synthe()で返されたアドレスを指定
DllExport void __stdcall AquesTalk_FreeWave(unsigned char *wav);


/////////////////////////////////////////////
//!	ライセンスキー設定	（Windows版は実装無し）
//!	@param  key[in]		ライセンスキーを指定
//!	@return	ライセンスキーが正しければ0、正しくなければ1が返る
DllExport int __stdcall AquesTalk_SetLicenceKey(const char *key);

#ifdef __cplusplus
}
#endif
#endif // !defined(_AQUESTALK_H_)
