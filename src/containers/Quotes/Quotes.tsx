import {useCallback, useEffect, useState} from 'react';
import SideBarElement from '../../components/SideBarElement/SideBarElement.tsx';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import QuotesItem from '../../components/QuotesItem/QuotesItem.tsx';
import {ApiQuotes, Quote} from '../../types.ts';
import axiosApi from '../../AxiosApi.ts';
import Spinner from '../../components/Spinner/Spinner.tsx';

const data = [
  {title: 'Star Wars', id: 'star-wars'},
  {title: 'Motivational', id: 'motivational'},
  {title: 'Famous people', id: 'Famous people'},
  {title: 'Saying', id: 'Saying'},
  {title: 'Humour', id: 'Humour'},
];

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    let response;
    if (id !== undefined) {
      response = await axiosApi.get<ApiQuotes | null>(`/quotes.json?orderBy="category"&equalTo="${id}"`);
    } else {
      response = await axiosApi.get<ApiQuotes | null>('/quotes.json');
    }

    const quoteResponse = response.data;

    if (quoteResponse !== null) {
      const quotes: Quote[] = Object.keys(quoteResponse).map((id: string) => {
        return {
          ...quoteResponse[id],
          id,
        };
      });
      setQuotes(quotes);
    } else {
      setQuotes([]);
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  const deleteQuote = async (id: string) => {
    await axiosApi.delete(`quotes/${id}.json`);
    await fetchPosts();
    if (id !== undefined) {
      navigate('/');
    }
  };

  return (
    <>
      <div className={'d-flex justify-content-between '}>
        <aside className="d-flex flex-column">
          <NavLink className={'custom-link'} to={'/'}>All
          </NavLink>
          {data.map((item) => (<SideBarElement key={item.id} id={item.id} title={item.title}/>))}
        </aside>
        {loading ? <div className={''}><Spinner/></div> :
          <div className={'d-flex flex-column gap-3'}>
            {quotes.map((item) => (
              <QuotesItem key={item.id} id={item.id} author={item.author} quote={item.quote} category={item.category}
                          onClick={() => deleteQuote(item.id)}/>))}
          </div>
        }
      </div>
    </>
  );
};

export default Quotes;