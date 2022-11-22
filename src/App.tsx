import { SharedLayout } from "components";
import { Main, Search } from "pages";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Main />} />
        <Route path="/search/*" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
