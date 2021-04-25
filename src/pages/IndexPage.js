import React, { useState } from "react";
import ShowList from "../components/ShowList";
import { AiOutlineSearch } from "react-icons/ai";
import Alert from "../components/Alert";
import "./IndexPage.css";
function IndexPage() {
  const [loading, setLoading] = useState(false);
  const [reposList, setReposList] = useState([]);
  const [error, setError] = useState(false);
  const [searchingStatus, setSearchingStatus] = useState(false);
  const [searchingText, setSearchingText] = useState("");

  function check(data) {
    if (Array.isArray(data)) {
      if (data.length === 100) {
        return 1;
      }
    }
    return 0;
  }

  async function getGithubRepoList() {
    let tmpRepoList = [];

    let isCompleted = false;
    let currentPage = 1;
    while (!isCompleted) {
      const res = await fetch(
        `https://api.github.com/users/${searchingText}/repos?per_page=100&page=${currentPage}`
      );
      const data = await res.json();
      tmpRepoList = [...tmpRepoList, data];
      if (!check(data)) {
        isCompleted = true;
      }
      currentPage++;
    }

    return { data: tmpRepoList, error: null };
  }

  async function OnSearch(e) {
    e.preventDefault();
    setLoading(false);
    setError(false);
    setSearchingStatus(true);
    try {
      const data = await getGithubRepoList();
      setReposList(data);
    } catch (e) {
      setError(true);
      throw e;
    }
    setLoading(true);
    setSearchingStatus(false);
  }

  return (
    <div className="container">
      <nav>
        <input
          className="IndexPage_searchInput"
          onChange={(e) => {
            setSearchingText(e.target.value);
          }}
          type="text"
          placeholder="Kogo szukasz?"
        />
        <form>
          <button className="IndexPage_searchButton" onClick={OnSearch} type="submit">
            <AiOutlineSearch />
          </button>
        </form>
      </nav>
      {!error ? (
        <ShowList
          list={reposList}
          isLoaded={loading}
          searchingStatus={searchingStatus}
          searchingText={searchingText}
        />
      ) : (
        <Alert text="Wystąpił błąd"></Alert>
      )}
    </div>
  );
}

export default IndexPage;
