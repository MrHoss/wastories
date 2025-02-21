import { ThemeProvider } from "@emotion/react";
import { dark } from "./themes/dark";
import GlobalStyles from "./themes/global";
import Home from "./pages/Home";

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={dark}>
      <Home />
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
