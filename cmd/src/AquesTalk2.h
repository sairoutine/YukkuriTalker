//////////////////////////////////////////////////////////////////////
/*!	@class	AquesTalk2

	@brief	�K�����������G���W�� AquesTalk2

  �����L���񂩂特���g�`�f�[�^����������ɐ�������
  �o�͉����g�`�́A8HKz�T���v�����O, 16bit,���m����,WAV�t�H�[�}�b�g


	@author	N.Yamazaki (Aquest)

	@date	2009/11/28	N.Yamazaki	Creation (from AuesTalk.h)
	@date	2011/02/03	N.Yamazaki	_Synthe CAqTkF_Init()�̖߂�l���`�F�b�N
*/
//  COPYRIGHT (C) 2009 AQUEST CORP.
//////////////////////////////////////////////////////////////////////
#if !defined(_AQUESTALK2_H_)
#define _AQUESTALK2_H_
#ifdef __cplusplus
extern "C"{
#endif

#if defined(AQUESTALK2_EXPORTS)
#undef	DllExport
#define DllExport	__declspec( dllexport )
#else
#define DllExport
#endif

#if !(defined(WIN32)||defined(WINCE))
#define	__stdcall		// for Linux etc.
#endif

/////////////////////////////////////////////
//!	�����L���񂩂特���g�`�𐶐�
//!	�����g�`�f�[�^�͓����ŗ̈�m�ۂ����B
//!	�����g�`�f�[�^�̉���͖{�֐��̌Ăяo������AquesTalk_FreeWave()�ɂčs��
//! @param	koe[in]		�����L����iSJIS NULL�I�[�j
//! @param	iSpeed[in]	���b���x [%] 50-300 �̊ԂŎw�� default:100
//!	@param	pSize[out]	�������������f�[�^�̃T�C�Y[byte]�i�G���[�̏ꍇ�̓G���[�R�[�h���Ԃ�j
//!	@param	phontDat[in]	phont�f�[�^�̐擪�A�h���X���w�肵�܂��B����DLL�̃f�t�H���gPhont��p����Ƃ��͂O���w�肵�܂��B
//!	@return	WAV�t�H�[�}�b�g�̉����f�[�^�̐擪�A�h���X�B�G���[����NULL���Ԃ�
DllExport unsigned char * __stdcall AquesTalk2_Synthe(const char *koe, int iSpeed, int *pSize, void *phontDat);
//! @param	koe[in]		�����L����iEUC NULL�I�[�j
DllExport unsigned char * __stdcall AquesTalk2_Synthe_Euc(const char *koe, int iSpeed, int *pSize, void *phontDat);
//! @param	koe[in]		�����L����iUTF8 NULL�I�[ BOM�͂����Ȃ��j
DllExport unsigned char * __stdcall AquesTalk2_Synthe_Utf8(const char *koe, int iSpeed, int *pSize, void *phontDat);
//! @param	koe[in]		�����L����iUTF16 NULL�I�[ BOM�̗L���͖��Ȃ��@�G���f�B�A���͎��s���ɏ]���j
DllExport unsigned char * __stdcall AquesTalk2_Synthe_Utf16(const unsigned short *koe, int iSpeed, int *pSize, void *phontDat);
//! @param	koe[in]		�����L����i���[�}���\�L NULL�I�[�j
DllExport unsigned char * __stdcall AquesTalk2_Synthe_Roman(const char *koe, int iSpeed, int *pSize, void *phontDat);

/////////////////////////////////////////////
//!	�����f�[�^�̗̈���J��
//!	@param  wav[in]		AquesTalk_Synthe()�ŕԂ��ꂽ�A�h���X���w��
DllExport void __stdcall AquesTalk2_FreeWave(unsigned char *wav);

#ifdef __cplusplus
}
#endif
#endif // !defined(_AQUESTALK2_H_)
//  ----------------------------------------------------------------------
// !  Copyright AQUEST Corp. 2006- .  All Rights Reserved.                !
// !  An unpublished and CONFIDENTIAL work.  Reproduction, adaptation, or !
// !  translation without prior written permission is prohibited except   !
// !  as allowed under the copyright laws.                                !
//  ----------------------------------------------------------------------
