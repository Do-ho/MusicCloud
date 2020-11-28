import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Doc, Example, Main } from './pages';
import { Header, Footer } from './components'
import './App.css';
import styled from 'styled-components';

const MarginBox = styled.div`
  height: 7rem;
`;

function App() {
  return (
    <BrowserRouter>
      <Header />
      <MarginBox />
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
