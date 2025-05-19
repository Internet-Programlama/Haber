import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_ROLES } from '../../basics/USER_ROLES.js';

export const RedirectToPanel = ({ user }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === USER_ROLES.ADMIN) {
            navigate('/admin');
        }
        else if (user?.role === USER_ROLES.EDITOR) {
            navigate('/editor');
        }
        else {
            navigate('/');
        }
    }, [user, navigate]);

    return <div>Yönlendiriliyorsunuz...</div>;
};