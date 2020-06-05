import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import DreamDetails from "./src/views/DreamDetails";
import Home from "./src/views/Home";
import Information from "./src/views/Information";
import NewDream from "./src/views/NewDream";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Information" component={Information} />
        <Stack.Screen name="NewDream" component={NewDream} />
        <Stack.Screen name="DreamDetails" component={DreamDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
