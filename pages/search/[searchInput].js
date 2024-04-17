/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import MemberCard from '../../components/MemberCard';
import { searchMember } from '../../api/memberData';

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useAuth();

  const router = useRouter();
  const { searchInput } = router.query;

  const getSearchResults = async () => {
    // This stores the search results in filteredResults and then updates the state of searchResults
    const filteredResults = await searchMember(searchInput, user.uid);
    setSearchResults(filteredResults);
  };

  useEffect(() => {
    getSearchResults();
  }, [searchInput, user.uid]);

  return (
    <div className="d-flex flex-wrap justify-content-between">
      {/* If there is no searchResult based on the value entered,  output No results else show each card with the search input */}
      {searchResults.length === 0
        ? (<h1 style={{ color: 'firebrick', textAlign: 'center' }}>No results are found for {searchInput}</h1>)
        : (searchResults.map((results) => (
          <MemberCard key={results.firebaseKey} memberObj={results} onUpdate={getSearchResults} />)))}
    </div>
  );
}
