import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// Import everything needed to use the `useQuery` hook
// import { useQuery, gql } from '@apollo/client';
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { loginRequest } from "./auth/authConfig";
import { InteractionType } from '@azure/msal-browser';
import { callMsGraph } from "./auth/MsGraph.ts";

function App() {
  // const [count, setCount] = useState(0);
  // const [token, setToken] = useState<string>("");

  // const { result, error } = useMsalAuthentication(InteractionType.Popup, {
  //   ...loginRequest,
  //   redirectUri: "/" // e.g. /redirect
  // });
  // const navigate = useNavigate();
  // const navigationClient = new CustomNavigationClient(navigate);
  // msalInstance.setNavigationClient(navigationClient);

//   const GetEngagements = gql`
//   query GetEngagements {
//     engagements {
//       endCursor
//       hasNextPage
//       items {
//         endDate
//         id
//         name
//         programName
//         startDate
//         status
//     }
//   }
// }
// `;

  // const { loading, error, data } = useQuery(GetEngagements);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;
   const authRequest = {
        ...loginRequest
    };
  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      >
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={ async () => {
           const response = await callMsGraph(); 
          console.log("Response from MS Graph:", response);
        }}>
          Call MS Graph for testing
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </MsalAuthenticationTemplate>
  )
}

export default App
