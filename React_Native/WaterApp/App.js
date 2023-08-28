import Screen from "./components/Screen";
import { Provider } from "react-redux";
import store from "./store";

export default function dApp() {
  return (
    <Provider store={store}>
      <Screen />
    </Provider>
  );
}