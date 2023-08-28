import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import BudgetList from "../views/budgetList";
import Root from "../Root";

const screens = {
    Root: {
        screen: Root,
        navigationOptions: {
            title: 'Budget Entry',        
        }
    },
    BudgetList: {
        screen: BudgetList,
        navigationOptions: {
            title: 'Budget Entry Listing',
        }
    },

}

const Routing = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: "skyblue"},
        headerTintColor: "white",
        headerTitleStyle: { fontSize: 25 }
    }
});

export default createAppContainer(Routing);