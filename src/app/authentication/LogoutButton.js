import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Trans } from "react-i18next";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <p className="preview-subject mb-1" onClick={() => logout({ clientId: 'Kki1BI6x8GbtrfQ92N3KEuvqZnORAhdG', returnTo: window.location.origin})}><Trans>Log Out</Trans></p>
    );
};

export default LogoutButton;