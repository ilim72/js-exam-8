import Toolbar from './components/Toolbar/Toolbar.tsx';
import {Route, Routes} from 'react-router-dom';
import Quotes from './containers/Quotes/Quotes.tsx';
import AddQuoteMutation from './containers/addQuoteMutation/AddQuoteMutation.tsx';
import './App.css';

const App = () => (
  <>
    <header className={'container-md mt-3'}>
      <Toolbar/>
    </header>
    <main className={'container-md mt-3'}>
      <Routes>
        <Route path="/" element={<Quotes/>}/>
        <Route path="/quotes/:id" element={<Quotes/>}/>
        <Route path={'add-quote'} element={<AddQuoteMutation/>}/>
        <Route path="/quotes/:id/edit" element={<AddQuoteMutation/>}/>
        <Route path={'*'} element={<div className={'text-center fw-bolder fs-1 mt-5'}>Not found</div>}/>
      </Routes>
    </main>
  </>
);

export default App;
