import Toolbar from './components/Toolbar/Toolbar.tsx';
import {Route, Routes} from 'react-router-dom';
import Quotes from './containers/Quotes/Quotes.tsx';
import QuotesItem from './components/QuotesItem/QuotesItem.tsx';
import AddQuoteMutation from './containers/addQuoteMutation/AddQuoteMutation.tsx';

const App = () => (
  <>
      <header className={'container-md mt-3'}>
        <Toolbar/>
      </header>
      <main className={'container-md mt-3'}>
        <Routes>
          <Route path="/" element={<Quotes/>}/>
          <Route path="/quotes/:id" element={<QuotesItem/>}/>
          <Route path={'add-quote'} element={<AddQuoteMutation/>}/>
        </Routes>
      </main>
  </>
);

export default App;
