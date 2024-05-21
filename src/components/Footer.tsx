import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer py-3 bg-light fixed-bottom" style={{ marginTop: '30px' }}>
            <div className="container text-center">
                <span className="text-muted">IT Blog</span>
            </div>
        </footer>
    );
};

export default Footer;
