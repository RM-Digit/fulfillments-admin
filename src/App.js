import Home from "./home";
import Topbar from "./components/topbar";
import { Frame } from "@shopify/polaris";

const Index = () => (
  <Frame>
    <Topbar />
    <Home />
  </Frame>
);

export default Index;
