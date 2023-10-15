import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./src/redux/store";

const AllProviders = ({ children }) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                {children}
            </Provider>
        </BrowserRouter>
    );
};

const customRender = (ui, options = {}) =>
    render(ui, {
        wrapper: AllProviders,
        ...options,
    });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { customRender as render };
