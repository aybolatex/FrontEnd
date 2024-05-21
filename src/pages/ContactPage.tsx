import React from 'react';

const ContactPage: React.FC = () => {

    return (
        <div className="container mt-5">
            <h2>Contact Us</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea className="form-control" id="message" name="message" rows={3} placeholder="Enter your message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    );
};

export default ContactPage;
