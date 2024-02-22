/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouteError } from "react-router-dom";

/// ref¡÷[React Router\Handling Not Found Errors](https://reactrouter.com/en/main/start/tutorial#handling-not-found-errors)
export default function ErrorPage() {
  const error = useRouteError() as any;
  //console.error('ErrorPage.error', error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}