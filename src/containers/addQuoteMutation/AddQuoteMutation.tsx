import React, {useState} from 'react';
import {Quote} from '../../types.ts';
import {enqueueSnackbar} from 'notistack';
import {useNavigate} from 'react-router-dom';
import axiosApi from '../../AxiosApi.ts';
import Spinner from '../../components/Spinner/Spinner.tsx';

const data = [
  {title: 'Star Wars', id: 'star-wars'},
  {title: 'Motivational', id: 'motivational'},
  {title: 'Famous people', id: 'Famous people'},
  {title: 'Saying', id: 'Saying'},
  {title: 'Humour', id: 'Humour'},
];

const AddQuoteMutation = () => {
  const [quotes, setQuotes] = useState<Quote>({
    author: '',
    category: 'star-wars',
    quote: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setQuotes((prev) => ({...prev, [name]: value}));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      await axiosApi.post('/quotes.json', quotes);
    } catch (e) {
      enqueueSnackbar({variant: 'error', message: 'Something went wrong!'});
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  return (
    <>{ loading ? (<div className={'text-center'}><Spinner/></div>) :
      <form onSubmit={onFormSubmit}>
        <div className={'d-flex flex-column gap-3 w-25 mx-auto'}>
          <h1>Submit a new post</h1>
          <select  name="category" onChange={onFieldChange}>
            {data.map((item, index) => (<option key={index} value={item.id}>{item.title}</option>))}
          </select>
          <input  type="text" name={'author'} onChange={onFieldChange}
                 value={quotes.author}/>
          <textarea  name="quote" onChange={onFieldChange}
                    value={quotes.quote}></textarea>
          <button  className={'btn btn-primary '} type={'submit'}>Send</button>
        </div>

      </form>
    }

    </>
  );
};

export default AddQuoteMutation;