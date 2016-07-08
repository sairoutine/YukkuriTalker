//////////////////////////////////////////////////////////////////////
/*!	@class	AquesTalk2Da

	@brief	�K�����������G���W�� AquesTalk2Da

  �����L���񂩂特���g�`�f�[�^�𐶐����A�T�E���h�f�o�C�X�ɏo�͂���


	@author	N.Yamazaki (Aquest)

	@date	2009/11/28	N.Yamazaki	Creation (from AquesTalkDa.h)
*/
//  COPYRIGHT (C) 2009 AQUEST CORP.
//////////////////////////////////////////////////////////////////////
#if !defined(_AQUESTALK2DA_H_)
#define _AQUESTALK2DA_H_
#ifdef __cplusplus
extern "C"{
#endif

#include <windows.h>

#if defined(AQUESTALK2DA_EXPORTS)
#undef	DllExport
#define DllExport	__declspec( dllexport )
#else
#define DllExport
#endif



/////////////////////////////////////////////
//!	�������������ďo�́i�����^�C�v�j
//!	�����̍Đ����I������܂Ŗ߂�Ȃ�
//! @param	koe[in]		�����L����iNULL�I�[�j
//! @param	iSpeed[in]	���b���x [%] 50-300 �̊ԂŎw��
//!	@param	phontDat[in]	phont�f�[�^�̐擪�A�h���X���w�肵�܂��B����DLL�̃f�t�H���gPhont��p����Ƃ��͂O���w�肵�܂��B
//!	@return	0:����I���@����ȊO�F�G���[�R�[�h
DllExport	int __stdcall AquesTalk2Da_PlaySync(const char *koe, int iSpeed=100, void *phontDat=0);
#ifdef MULTI_STR_CODE
DllExport	int __stdcall AquesTalk2Da_PlaySync_Euc(const char *koe, int iSpeed=100, void *phontDat=0);
DllExport	int __stdcall AquesTalk2Da_PlaySync_Utf8(const char *koe, int iSpeed=100, void *phontDat=0);
DllExport	int __stdcall AquesTalk2Da_PlaySync_Utf16(const unsigned short *koe, int iSpeed=100, void *phontDat=0);
DllExport	int __stdcall AquesTalk2Da_PlaySync_Roman(const char *koe, int iSpeed=100, void *phontDat=0);
#endif



////////////////////////////////////////////////////////////////////////
//  �ȉ��A�񓯊��^�C�v�̊֐�
////////////////////////////////////////////////////////////////////////
typedef void		*H_AQTKDA;	// ���������G���W���̃n���h�� �����^�C�v�̊֐��Ŏg�p����

/////////////////////////////////////////////
//!	���������G���W���̃C���X�^���X�𐶐��i�񓯊��^�C�v�j
//! @return	���������G���W���̃n���h����Ԃ�
DllExport	H_AQTKDA __stdcall AquesTalk2Da_Create();

/////////////////////////////////////////////
//!	���������G���W���̃C���X�^���X������i�񓯊��^�C�v�j
//! @param	hMe[in]		���������G���W���̃n���h�� AquesTalk2Da_Create()�Ő���
DllExport	void __stdcall AquesTalk2Da_Release(H_AQTKDA hMe);

/////////////////////////////////////////////
//!	�������������ďo�́i�񓯊��^�C�v�j
//!	�����g�`������ɁA�����ɖ߂�
//!	hWnd���w�肷��ƍĐ��I����Amsg�Ɏw�肵�����b�Z�[�W��Post�����B
//!	�Đ��I���O��AquesTalk2Da_Play()���Ăяo���āA�A���I�ɍĐ������邱�Ƃ��\�B
//!	
//! @param	hMe[in]		���������G���W���̃n���h�� AquesTalk2Da_Create()�Ő���
//! @param	koe[in]		�����L����iNULL�I�[�j
//! @param	iSpeed[in]	���b���x [%] 50-300 �̊ԂŎw��
//!	@param	phontDat[in]	phont�f�[�^�̐擪�A�h���X���w�肵�܂��B����DLL�̃f�t�H���gPhont��p����Ƃ��͂O���w�肵�܂��B
//! @param	hWnd[in]	�I�����b�Z�[�W���o��E�B���h�E�n���h��
//! @param	msg[in]		�I�����b�Z�[�W
//! @param	dwUser[in]	�C�ӂ̃��[�U�p�����[�^(���b�Z�[�W��lParam �ɐݒ肳���j
//!	@return	0:����I���@����ȊO�F�G���[�R�[�h
DllExport	int __stdcall AquesTalk2Da_Play(H_AQTKDA hMe, const char *koe, int iSpeed=100, void *phontDat=0, HWND hWnd=0, unsigned long msg=0, unsigned long dwUser=0);
#ifdef MULTI_STR_CODE
DllExport	int __stdcall AquesTalk2Da_Play_Euc(H_AQTKDA hMe, const char *koe, int iSpeed=100, void *phontDat=0, HWND hWnd=0, unsigned long msg=0, unsigned long dwUser=0);
DllExport	int __stdcall AquesTalk2Da_Play_Utf8(H_AQTKDA hMe, const char *koe, int iSpeed=100, void *phontDat=0, HWND hWnd=0, unsigned long msg=0, unsigned long dwUser=0);
DllExport	int __stdcall AquesTalk2Da_Play_Utf16(H_AQTKDA hMe, const unsigned short *koe, int iSpeed=100, void *phontDat=0, HWND hWnd=0, unsigned long msg=0, unsigned long dwUser=0);
DllExport	int __stdcall AquesTalk2Da_Play_Roman(H_AQTKDA hMe, const char *koe, int iSpeed=100, void *phontDat=0, HWND hWnd=0, unsigned long msg=0, unsigned long dwUser=0);
#endif

/////////////////////////////////////////////
//!	�Đ��̒��~ 
//! AquesTalk2Da_Play()�ōĐ����ɁA�Đ��𒆒f����B
//!	�Đ���(�Đ��҂����܂ށj�ł���A�I�����b�Z�[�W���o�悪�w�肳��Ă����Ȃ�A
//! �I�����b�Z�[�W��Post�����B
//! @param	hMe[in]		���������G���W���̃n���h�� AquesTalk2Da_Create()�Ő���
DllExport	void __stdcall AquesTalk2Da_Stop(H_AQTKDA hMe);

/////////////////////////////////////////////
//!	�Đ������ۂ�
//! @param	hMe[in]		���������G���W���̃n���h�� AquesTalk2Da_Create()�Ő���
//! @return 1:�Đ��� 0:�Đ����łȂ�
DllExport	int __stdcall AquesTalk2Da_IsPlay(H_AQTKDA hMe);


#ifdef __cplusplus
}
#endif
#endif // !defined(_AQUESTALK2DA_H_)
//  ----------------------------------------------------------------------
// !  Copyright AQUEST Corp. 2006- .  All Rights Reserved.                !
// !  An unpublished and CONFIDENTIAL work.  Reproduction, adaptation, or !
// !  translation without prior written permission is prohibited except   !
// !  as allowed under the copyright laws.                                !
//  ----------------------------------------------------------------------
