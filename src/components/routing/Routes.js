import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../home/Home";
import NotFound from "../layout/NotFound";
import QuizDetails from "../quiz/QuizDetails";
import QuizList from "../quiz/QuizList";
import QuizPlay from "../quiz/QuizPlay";
import QuizSummary from "../quiz/QuizSummary";

import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/quizzes" component={QuizList} />
        <PrivateRoute exact path="/quizzes/:id" component={QuizDetails} />
        <PrivateRoute exact path="/quizzes/:id/play" component={QuizPlay} />
        <PrivateRoute
          exact
          path="/quizzes/:id/summary"
          component={QuizSummary}
        />
        {/*<PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} /> */}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
