import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import router from "./Routes/router";
import "@mantine/core/styles.css";

function App() {
  return (
    <MantineProvider>
      {" "}
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
