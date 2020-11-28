import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Doc, Example, Main } from './pages';
import { Header, Footer } from './components'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Footer />
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/doc' exact component={Doc} />
        <Route path='/example' exact component={Example} />
        <Redirect path='*' to='/' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
