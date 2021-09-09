import { BrowserRouter as Router, Route, Switch } from 'react-router';
import NavBar from './components/NavBar';
import AddHero from './components/AddHero';
import HeroesList from './components/HeroesList';
import Hero from './components/Hero';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container">
      <NavBar />
      <Switch>
        <Route exact path={['/', '/heroes']} component={HeroesList} />
        <Route exact path="/add" component={AddHero} />
        <Route path="/heroes/:id" component={Hero} />
      </Switch>
    </div>
  );
}

export default App;