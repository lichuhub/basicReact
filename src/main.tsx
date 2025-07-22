import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router"
import App from "./App";
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MsalProvider } from "@azure/msal-react";
// MSAL imports
import {
    PublicClientApplication,
    EventType,
    type EventMessage,
    type AuthenticationResult,
} from "@azure/msal-browser";
import { msalConfig } from "./auth/authConfig";

// const client = new ApolloClient({
//   uri: 'https://polite-pond-09325b91e.6.azurestaticapps.net/data-api/graphql/',
//   cache: new InMemoryCache(),
// });

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
    }

    msalInstance.addEventCallback((event: EventMessage) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
            const payload = event.payload as AuthenticationResult;
            const account = payload.account;
            msalInstance.setActiveAccount(account);
        }
    });

    console.log("MSAL initialized with account:", msalInstance.getActiveAccount());
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Page not found</div>,
  },
]);    
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MsalProvider instance={msalInstance}>
        <RouterProvider router={router} />
      </MsalProvider>
  </StrictMode>,
)
