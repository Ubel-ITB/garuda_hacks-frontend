import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { CurrentUserProvider } from "./lib/contexts/CurrentUserContext";

function App() {
  return (
    <CurrentUserProvider>
      <RouterProvider router={router} />
    </CurrentUserProvider>
  );
}

export default App;
