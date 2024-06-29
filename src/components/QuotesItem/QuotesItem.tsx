import React from 'react';
import {NavLink} from 'react-router-dom';

interface Props {
  author: string;
  category: string;
  quote: string;
  id: string;
  onClick: VoidFunction;
}

const QuotesItem: React.FC<Props> = ({author, category, quote, id, onClick}) => {

  return (
    <div className={'alert alert-primary'} style={{width: '480px'}}>
      <div className={'d-flex justify-content-between align-items-center'}>
        <h5>{category}</h5>
        <div>
          <NavLink to={`/quotes/${id}/edit`} className={'border-0 bg-none bg-primary-subtle'}><i
            className="fs-4 text-primary bi bi-pencil-square"></i></NavLink>
          <button onClick={onClick} className={'border-0  bg-primary-subtle'}><i
            className="fs-4 text-danger bi bi-trash3-fill"></i></button>
        </div>
      </div>
      <div>
        <p>{quote}</p>
        <span><b className={'text-danger'}>~{author}~</b></span>
      </div>
    </div>
  );
};

export default QuotesItem;