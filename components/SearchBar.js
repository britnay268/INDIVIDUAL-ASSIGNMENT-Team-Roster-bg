import React, { useState } from 'react';
import {
  Button, Form,
} from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    // Extracts name and value from e.target.The value is the current value entered by the user
    const { name, value } = e.target;
    // console.warn(name, value);
    // setSearchInput updates the state and returns a new object based on currentState
    setSearchInput((prevState) => ({
      // Take all the properties from the prevState object and include them as properties in the new object being created.
      ...prevState,
      // Update the property named after the form element's name (which should be "search") with the new value entered by the user.
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If the user input is not an empty string, push the sarchInput value to the searchValue page
    if (searchInput !== '') router.push(`/search/${searchInput.search}`);
  };

  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        name="search"
        value={searchInput.search}
        // when onChange event handler is triggered, it receives an event object as an argument
        onChange={handleChange}
      />
      <Button variant="outline-success" type="submit" style={{ marginRight: '10px' }}>Search</Button>
    </Form>
  );
}
