import { useState, useEffect } from "react";

import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom"; 
// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
// import { UserContext } from "./Context/UserContext";
import React from 'react';
import { ChatEngine } from 'react-chat-engine';

const App = () => {




  return (
    <Router>
    <div className="App">
      <Switch>
        {/* <UserContext.Provider value={user}> */}
        <PrivateRoute exact path="/" component={PrivateScreen} />
        {/* </UserContext.Provider> */}
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
        <Route exact path="/resetPassword/:restToken" component={ResetPasswordScreen}/>
        
        <ChatEngine
        path="/Django"
			height='100vh'
			userName='Ali Adeeb'
			userSecret='123'
			projectID='d77a73ad-7858-46ae-8807-c927de6abe10'
		/>
        <ChatEngine
        path="/Spring"
			height='100vh'
			userName='Tamara Adeeb'
			userSecret='123456789'
			projectID='f0ae4479-7560-43cb-81a7-81f788ab63f7'
		/>
    {/* <ChatEngine
    path="/Django"
			height='100vh'
			userName='Adeeb'
			userSecret='987654321'
			projectID='d77a73ad-7858-46ae-8807-c927de6abe10'
		/> */}
    <ChatEngine
    path="/React"
			height='100vh'
			userName='Ali'
			userSecret='123'
			projectID='3a46a6c4-df38-4fac-b78d-2886af3a5396'
		/>
      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
