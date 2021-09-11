import { Route, Redirect, Switch } from 'react-router';
import NavBar from './components/NavBar';
import AddHero from './components/AddHero';
import HeroesList from './components/HeroesList';
import Hero from './components/Hero';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/toastr.scss';

function App() {
  return (
    <div className="container">
      <NavBar />
      <Switch>
        <Route exact path={['/', '/heroes']} component={HeroesList} />
        <Route exact path="/add" component={AddHero} />
        <Route path="/heroes/:id" component={Hero} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
