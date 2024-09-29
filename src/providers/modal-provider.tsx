// import { Icon } from '@iconify/react'
import { createContext, ReactNode, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

import { Spinner } from '@/components/shared/spinner';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';
import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';

type ModalType = 'info' | 'success' | 'error' | 'warning' | 'confirm';

export interface IModalOptions {
    icon?: ReactNode;
    title?: string;
    content: ReactNode;
    desc?: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onOk?: (...args: any[]) => any;
    okText?: string;
    okType?: 'default' | 'destructive';
    okDisabled?: boolean;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onCancel?: (...args: any[]) => any;
    cancelText?: string;
}

interface ModalContextType {
    showModal: (type: ModalType, options: IModalOptions) => void;
}

export const ModalContext = createContext<ModalContextType>({
    showModal: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
    const [modal, setModal] = useState<{ type: ModalType; options: IModalOptions } | null>(null);
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const showModal = useCallback((type: ModalType, options: IModalOptions) => {
        setModal({ type, options });
        setIsShow(true);
    }, []);

    const closeModal = useCallback(() => {
        setModal(null);
        setIsShow(false);
        setIsLoading(false);
    }, []);

    const handleOk = useCallback(() => {
        if (modal?.options.okDisabled) return;
        if (modal?.options.onOk) {
            modal.options.onOk();
        }
        closeModal();
    }, [modal, closeModal]);

    const handleAsyncOk = useCallback(async () => {
        if (modal?.options.okDisabled) return;
        if (modal?.options.onOk) {
            setIsLoading(true);
            try {
                await modal.options.onOk();
                closeModal();
            } catch (error) {
                console.error('Error occurred:', error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [modal, closeModal]);

    const renderModal = () => {
        if (!modal) return null;

        const { type, options } = modal;

        const { title, content, desc } = options;

        // const iconName = {
        //     info: 'lucide:alert-circle',
        //     success: 'lucide:check-circle-2',
        //     error: 'lucide:x-circle',
        //     warning: 'lucide:alert-circle',
        //     confirm: 'lucide:alert-circle',
        // };

        const icon = {
            info: <CircleAlert width={24} height={24} className="flex-shrink-0 text-primary" />,
            success: <CircleCheck width={24} height={24} className="flex-shrink-0 text-primary"/>,
            error: <CircleX width={24} height={24} className="flex-shrink-0 text-destructive"/>,
            warning: <CircleAlert width={24} height={24} className="flex-shrink-0 text-primary"/>,
            confirm: <CircleAlert width={24} height={24} className="flex-shrink-0 text-primary" />,
        };

        return (
            <AlertDialog open={isShow}>
                <AlertDialogContent>
                    <div className="flex gap-4">
                        {icon[type]}
                        {/* <Icon
                            icon={iconName[type]}
                            width={24}
                            height={24}
                            className={cn(
                                'flex-shrink-0',
                                type === 'success' && 'text-success',
                                type === 'error' && 'text-destructive',
                                type === 'warning' && 'text-warning',
                                type === 'info' && 'text-primary',
                                type === 'confirm' && 'text-warning'
                            )}
                        /> */}
                        <div className="flex flex-col !gap-2">
                            <AlertDialogHeader>
                                <AlertDialogTitle>{title}</AlertDialogTitle>
                                {desc && <AlertDialogDescription>{desc}</AlertDialogDescription>}
                            </AlertDialogHeader>

                            {content}
                        </div>
                    </div>

                    <AlertDialogFooter>
                        {type === 'confirm' && (
                            <AlertDialogCancel onClick={closeModal} disabled={isLoading}>
                                {options.cancelText || 'Cancel'}
                            </AlertDialogCancel>
                        )}
                        <Button
                            variant={options.okType}
                            onClick={type === 'confirm' ? handleAsyncOk : handleOk}
                            disabled={isLoading || options.okDisabled}
                        >
                            {isLoading && <Spinner className="mr-2 w-4 h-4" />}
                            {options.okText || 'OK'}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    };

    return (
        <ModalContext.Provider value={{ showModal }}>
            {children}
            {createPortal(renderModal(), document.body, 'alert-modal')}
        </ModalContext.Provider>
    );
}
