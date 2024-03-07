import { ThemeProvider, createTheme } from "@mui/material/styles";
// import CssBaseline from '@mui/material/CssBaseline';
import Builder from "./Builder";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // Define other customizations here
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* <CssBaseline /> */}
      <Builder />
    </ThemeProvider>
  );
}

export default App;
