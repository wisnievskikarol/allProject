import React from "react";
import Alert from "./Alert";
import GitHubRepoListItem from "./GitHubRepoListItem";
import { useLoading, Puff } from "@agney/react-loading";
function ShowList(props) {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Puff width="80" />,
  });

  function compare(a, b) {
    if (a.stargazers_count > b.stargazers_count) return -1;
    if (a.stargazers_count < b.stargazers_count) return 1;

    return 0;
  }

  function displayRows(arr) {
    let res = arr.map((e) => {
      return <GitHubRepoListItem key = {e.id} item={e} />;
    });
    return res;
  }

  function outputList(list, ready, searchingStatus, error) {

    if (ready) {
        if (!Array.isArray(list)) {
          try {
            if ((list.message = "Not Found")) {
              return <Alert text="Brak uzytkownika w bazie" />;
            }
          } catch (e) {
            return displayRows(list.sort(compare));
          }
        } else {
          if (!list.length) {
            return <Alert text="Lista jest pusta" />;
          } else {
            return displayRows(list.sort(compare));
          }
        }
   
    } else {
      if (searchingStatus) {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              margi: "auto",
            }}
          >
            <section {...containerProps}>{indicatorEl}</section>
          </div>
        );
      }
    }
  }
  let status;
  if(props.list.data != null) {
    status = outputList(
        props.list.data[0],
        props.isLoaded,
        props.searchingStatus)
  }
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "70px",
      }}
    >
      {status}

    </div>
  );
}

export default ShowList;
