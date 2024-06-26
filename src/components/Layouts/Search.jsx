import React, { useEffect, useState, useContext } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import {SidebarContext} from '../../context/SidebarContext'

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { keywordQuery } = useContext(SidebarContext);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      navigate(`/products/search/${encodeURIComponent(trimmedQuery)}`); // Navigate to products page with encoded query parameter
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (!location.pathname.startsWith('/products/search/')) {
      setQuery('');
    } else {
      const searchQuery = decodeURIComponent(location.pathname.replace('/products/search/', ''));
      setQuery(searchQuery);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/products/search/')) {
      setQuery(keywordQuery);
    }
  }, [keywordQuery, location.pathname]);

  return (
    <Form inline className="d-flex" onSubmit={handleSubmit}>
      <FormControl
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter Product Name ..."
        className="mr-sm-2"
        id="search_field"
      />
      {window.innerWidth < 990 ? '' : (
        <Button variant="outline-success" type="submit" style={{background:'white', outline:'none', border:'1px solid #1BA786'}}>
          <i style={{color:'#1BA786'}} className="fa fa-search" aria-hidden="true"></i>
        </Button>
      )}
    </Form>
  );
};

export default Search;
