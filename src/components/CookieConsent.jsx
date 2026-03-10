import { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        setIsClosing(true);
        localStorage.setItem('cookie_consent', 'true');

        // Wait for animation to finish before removing from DOM
        setTimeout(() => {
            setIsVisible(false);
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div className={`cookie-consent ${isClosing ? 'cookie-consent--closing' : ''}`}>
            <div className="cookie-consent__content">
                <div className="cookie-consent__text">
                    <h3 className="cookie-consent__title">We Value Your Privacy</h3>
                    <p className="cookie-consent__desc">
                        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                    </p>
                </div>
                <div className="cookie-consent__actions">
                    <button onClick={handleAccept} className="btn btn--primary cookie-consent__btn">
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
