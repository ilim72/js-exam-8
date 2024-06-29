import React, {useCallback, useEffect, useState} from 'react';
import {ApiQuote} from '../../types.ts';
import {enqueueSnackbar} from 'notistack';
import {useNavigate, useParams} from 'react-router-dom';
import axiosApi from '../../AxiosApi.ts';
import Spinner from '../../components/Spinner/Spinner.tsx';

const data = [
  {title: 'Star Wars', id: 'star-wars'},
  {title: 'Motivational', id: 'motivational'},
  {title: 'Famous people', id: 'Famous people'},
  {title: 'Saying', id: 'Saying'},
  {title: 'Humour', id: 'Humour'},
];

const initialState = {
  author: '',
  category: 'star-wars',
  quote: '',
};

const AddQuoteMutation = () => {
  const [quote, setQuote] = useState<ApiQuote>(initialState);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const {id} = useParams();
  const navigate = useNavigate();

  const fetchOnePost = useCallback(async (id: string) => {
    setIsFetching(true);
    const response = await axiosApi.get<ApiQuote | null>(`/quotes/${id}.json`);
    const responseData = response.data;
    if (responseData) {
      setQuote(responseData);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      void fetchOnePost(id);
    } else {
      setQuote(initialState);
    }
  }, [id, fetchOnePost]);

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setQuote((prev) => ({...prev, [name]: value}));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (id !== undefined) {
        await axiosApi.put(`/quotes/${id}.json`, quote);
      } else {
        await axiosApi.post('/quotes.json', quote);
      }
    } catch (e) {
      enqueueSnackbar({variant: 'error', message: 'Something went wrong!'});
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  let form = (
    <>
      <form onSubmit={onFormSubmit}>
        <div className={'d-flex flex-column gap-3 w-25 mx-auto'}>
          {id ? <h1>Edit post</h1> : <h1>Submit a new post</h1>}
          <select className={'p-1'} name="category" onChange={onFieldChange} value={quote.category}>
            {data.map((item, index) => (<option key={index}>{item.title}</option>))}
          </select>
          <input required
                 type="text"
                 name={'author'}
                 onChange={onFieldChange}
                 placeholder={'Enter author'}
                 value={quote.author}
          className={'p-1'}/>

          <textarea required
                    name="quote"
                    onChange={onFieldChange}
                    value={quote.quote}
                    placeholder={'Enter quote'}/>
          <button className={'btn btn-primary '} type={'submit'}>{id ? 'Edit' : 'Send'}</button>
        </div>
      </form>
    </>
  );
  if (loading) {
    form =
      <div className={'d-flex justify-content-center align-items-center'} style={{height: '300px'}}><Spinner/></div>;
  }

  return isFetching ? <Spinner/> : (
    <div>
      {form}
    </div>
  );
};

export default AddQuoteMutation;