import { useContext } from 'react'

import { IModalOptions, ModalContext } from '@/providers/modal-provider'

export const useModal = () => {
    const context = useContext(ModalContext)

    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider')
    }

    const { showModal } = context

    const info = (options: IModalOptions) => showModal('info', options)

    const success = (options: IModalOptions) => showModal('success', options)

    const error = (options: IModalOptions) => showModal('error', { ...options, okType: 'destructive' })

    const warning = (options: IModalOptions) => showModal('warning', options)

    const confirm = (options: IModalOptions) => showModal('confirm', options)

    return { info, success, error, warning, confirm }
}
