import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'react-bootstrap';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
    <div className="mt-3">
        <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={() => loginWithRedirect()}>Los Gehts!</Button>
    </div>
    )
};

export default LoginButton;