import Register from '../src/screens/register'
import Login from '../src/screens/login'
import Home from '../src/screens/home'
import Profile from '../src/screens/profile'
import UserProfile from '../src/screens/userProfile'
import AllPosts from '../src/screens/seeAllPosts'
import AddPost from './screens/addPost'
import {Provider} from '../src/context/dataContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/profile/:user_id">
          <UserProfile />
        </Route>
        <Route exact path="/allPosts">
          <AllPosts />
        </Route>
        <Route exact path="/addPost">
          <AddPost />
        </Route>
      </Switch>
    </Router>
  );
}

export default () => {
  return <Provider>
    <App />
  </Provider>
};
