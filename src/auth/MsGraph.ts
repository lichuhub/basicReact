import { loginRequest, graphConfig } from "./authConfig";
import { msalInstance } from "../main";

export async function callMsGraph() {
    const account = msalInstance.getActiveAccount();
    if (!account) {
        throw Error(
            "No active account! Verify a user has been signed in and setActiveAccount has been called."
        );
    }

    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
    });

    const headers = new Headers();
    const bearer = `Bearer ${response.accessToken}`;
    console.log("Bearer token:", bearer);
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers,
    };

    return fetch(graphConfig.graphMeEndpoint, options)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}
