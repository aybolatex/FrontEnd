import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh'
            }}
        >
            <div className="spinner-border" role="status"></div>
        </div>
    );
};

export default LoadingSpinner;
