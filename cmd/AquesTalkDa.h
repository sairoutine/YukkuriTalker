//////////////////////////////////////////////////////////////////////
/*!	@class	CAquesTalkDa

	@brief	�K�����������G���W�� AquesTalkDa

  �����L���񂩂特���g�`�f�[�^�𐶐����A�T�E���h�f�o�C�X�ɏo�͂���


	@author	N.Yamazaki (Aquest)

	@date	2006/05/08	N.Yamazaki	Creation
	@date	2006/10/03	N.Yamazaki	Ver.2.0
	@date	2006/10/12	N.Yamazaki	Ver.2.1 .def�t�@�C���̎g�p��__stdcall�̒�`
	@date	2007/09/27	N.Yamazaki	Ver.2.2 �e�핶���R�[�h�̋L����ɑΉ�
*/
//	���̃\�[�X�R�[�h�̗��p�����ɂ��ẮA
//	������ AqLicense.txt ��������������
//  COPYRIGHT (C) 2006 AQUEST CORP.
//////////////////////////////////////////////////////////////////////
#if !defined(_AQUESTALKDA_H_)
#define _AQUESTALKDA_H_
#ifdef __cplusplus
extern "C"{
#endif

#include <windows.h>

#if defined(AQUESTALKDA_EXPORTS)
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
//!	@return	0:����I���@����ȊO�F�G���[�R�[�h
DllExport	int __stdcall AquesTalkDa_PlaySync(const char *koe, int iSpeed=100);
DllExport	int __stdcall AquesTalkDa_PlaySync_Euc(const char *koe, int iSpeed=100);
DllExport	int __stdcall AquesTalkDa_PlaySync_Utf8(const char *koe, int iSpeed=100);
DllExport	int __stdcall AquesTalkDa_PlaySync_Utf16(const unsigned short *koe, int iSpeed=100);
DllExport	int __stdcall AquesTalkDa_PlaySync_Roman(const char *koe, int iSpeed=100);



////////////////////////////////////////////////////////////////////////
//  �ȉ��A�񓯊��^�C�v�̊֐�
////////////////////////////////////////////////////////////////////////
typedef void		*H_AQTKDA;	// ���������G���W���̃n���h�� �����^�C�v�̊֐��Ŏg�p����

/////////////////////////////////////////////
//!	���������G���W���̃C���X�^���X�𐶐��i�񓯊��^�C�v�j
//! @return	���������G���W���̃n���h����Ԃ�
DllExport	H_AQTKDA __stdcall AquesTalkDa_Create();

/////////////////////////////////////////////
//!	���������G���W���̃C���X�^���X������i�񓯊��^�C�v�j
//! @param	hMe[in]		���������G���W���̃n���h�� AquesTalkDa_Create()�Ő���
DllExport	void __stdcall AquesTalkDa_Release(H_AQTKDA hMe);

/////////////////////////////////////////////
//!	�������������ďo�́i�񓯊��^�C�v�j
//!	�����g�`������ɁA�����ɖ߂�
//!	hWnd���w�肷��ƍĐ��I����Amsg�Ɏw�肵�����b�Z�[�W��Post�����B
//!	�Đ��I���O��AquesTalkDa_Play()���Ăяo���āA�A���I�ɍĐ������邱�Ƃ��\�B
//!	
//! @param	hMe[in]		���������G���W���̃n���h�� AquesTalkDa_Create()�Ő���
//! @param	koe[in]		�����L����iNULL�I�[�j
//! @param	iSpeed[in]	���b���x [%] 50-300 �̊ԂŎw��
//! @param	hWnd[in]	�I�����b�Z�[�W���o��E�B���h�E�n���h��
//! @param	msg[in]		�I�����b�Z�[�W
//! @param	dwUser[in]	�C�ӂ̃��[�U�p�����[�^(���b�Z�[�W��lParam �ɐݒ肳���j
//!	@return	0:����I���@����ȊO�F�G���[�R�[�h
DllExport	int __stdcall AquesTalkDa_Play(H_AQTKDA hMe, const char *koe, int iSpeed=100, HWND hWnd=0, unsigned long msg=0, unsigned long dwUser=0);
DllExport	int __stdcall AquesTalkDa_Play_Euc(H_AQTKDA hMe, const char *koe, int iSpeed=100, HWND hWnd=0, unsigned long msg=0, unsigned long dwUser=0);
DllExport	int __stdcall AquesTalkDa_Play_Utf8(H_AQTKDA hMe, const char *koe, int iSpeed=100, HWND hWnd=0, unsigned long msg=0, unsigned long dwUser=0);
DllExport	int __stdcall AquesTalkDa_Play_Utf16(H_AQTKDA hMe, const unsigned short *koe, int iSpeed=100, HWND hWnd=0, unsigned long msg=0, unsigned long dwUser=0);
DllExport	int __stdcall AquesTalkDa_Play_Roman(H_AQTKDA hMe, const char *koe, int iSpeed=100, HWND hWnd=0, unsigned long msg=0, unsigned long dwUser=0);

/////////////////////////////////////////////
//!	�Đ��̒��~ 
//! AquesTalkDa_Play()�ōĐ����ɁA�Đ��𒆒f����B
//!	�Đ���(�Đ��҂����܂ށj�ł���A�I�����b�Z�[�W���o�悪�w�肳��Ă����Ȃ�A
//! �I�����b�Z�[�W��Post�����B
//! @param	hMe[in]		���������G���W���̃n���h�� AquesTalkDa_Create()�Ő���
DllExport	void __stdcall AquesTalkDa_Stop(H_AQTKDA hMe);

/////////////////////////////////////////////
//!	�Đ������ۂ�
//! @param	hMe[in]		���������G���W���̃n���h�� AquesTalkDa_Create()�Ő���
//! @return 1:�Đ��� 0:�Đ����łȂ�
DllExport	int __stdcall AquesTalkDa_IsPlay(H_AQTKDA hMe);

/////////////////////////////////////////////
//!	���C�Z���X�L�[�ݒ�	�iWindows�ł͎��������j
//!	@param  key[in]		���C�Z���X�L�[���w��
//!	@return	���C�Z���X�L�[�����������0�A�������Ȃ����1���Ԃ�
DllExport int __stdcall AquesTalkDa_SetLicenceKey(const char *key);


#ifdef __cplusplus
}
#endif
#endif // !defined(_AQUESTALKDA_H_)
