import React, { useEffect, useState } from 'react';

interface Props {
    seconds?: number;
    onClose?: () => void;
    status: 'success' | 'error' | 'danger';
    message: string;
    visible: boolean;
}

const Notice: React.FC<Props> = ({ seconds = 3, onClose, status, message, visible }) => {
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onClose && onClose();
        }, seconds * 1000);

        setTimer(prevTimer => {
            if (prevTimer) clearTimeout(prevTimer);
            return timeoutId;
        });

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [seconds, onClose]);

    return (
        visible ? (
            <div onClick={onClose} className={`alert ${status === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                {message}
            </div>
        ) : null
    );
};

export default Notice;
