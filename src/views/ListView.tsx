/* @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import CardGrid from "../components/CardGrid";
import HeroBanner from "../components/HeroBanner";
import Loader from "../components/Loader";
import { SearchReposData } from "../store/repos";
import { SearchUserData } from "../store/users";
import { AppDispatch, RootState } from "store";
import { EntityType, User, Repo } from "../api/types";
import ErrorScreen from "../components/ErrorScreen";
import { useIntersectionObserver } from "../hooks/useInfiniteScroll";
import { PAGE_SIZE } from "../config/constants";

const containerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  flex-direction: column;
`;

const ListView: React.FC = () => {
  const [searchKeywords, setSearchKeywords] = useState<string>("");
  const [selectedEntity, setSelectedEntity] = useState<string>("1");
  const dispatch = useDispatch<AppDispatch>();
  const usersListState = useSelector((state: RootState) => state.users);
  const reposListState = useSelector((state: RootState) => state.repos);
  const isLoading = reposListState.loading || usersListState.loading;
  const [showBottomLoader, setShowBottomLoader] = useState<boolean>(false);
  const [showCards, setShowCards] = useState<boolean>(false);
  const [showErrorScreen, setShowErrorScreen] = useState<boolean>(false);
  const [currentPageRecordCount, setCurrentPageRecordCount] = useState<number>(
    1
  );
  const [pageNumber, setPageNumber] = useState<number>(0);
  const ref = useRef(null);
  const isBottomVisible = useIntersectionObserver(
    ref,
    {
      threshold: 0,
    },
    false
  );

  const dropDownOptions = [
    { value: "1", label: "Users" },
    { value: "2", label: "Repos" },
  ];

  useEffect(() => {
    let storeHasData = usersListState.data.length || reposListState.data.length;
    if (searchKeywords.length > 2 && storeHasData) {
      setShowCards(true);
    } else {
      setShowCards(false);
    }
  }, [searchKeywords, usersListState.data, reposListState.data]);

  const dispatchUserData = (query: string, page: number) => {
    dispatch(
      SearchUserData({
        query: query,
        perPage: PAGE_SIZE,
        page: page,
      })
    )
      .unwrap()
      .then((res: User[]) => {
        setShowErrorScreen(false);
        setCurrentPageRecordCount(res.length || 0);
        setShowBottomLoader(false);
      })
      .catch(() => {
        setShowCards(false);
        setShowErrorScreen(true);
        setShowBottomLoader(false);
      });
  };

  const dispatchReposData = (query: string, page: number) => {
    dispatch(
      SearchReposData({
        query: query,
        perPage: PAGE_SIZE,
        page: page,
      })
    )
      .unwrap()
      .then((res: Repo[]) => {
        setShowErrorScreen(false);
        setShowBottomLoader(false);
        setCurrentPageRecordCount(res.length || 0);
      })
      .catch(() => {
        setShowCards(false);
        setShowErrorScreen(true);
        setShowBottomLoader(false);
      });
  };

  useEffect(() => {
    if (currentPageRecordCount && searchKeywords.length > 2) {
      if (selectedEntity == EntityType.Users) {
        dispatchUserData(searchKeywords, pageNumber);
      }
      if (selectedEntity == EntityType.Repos) {
        dispatchReposData(searchKeywords, pageNumber);
      }
    }
  }, [pageNumber]);

  useEffect(() => {
    if (isBottomVisible) {
      setShowBottomLoader(true);
      setPageNumber(pageNumber + 1);
    }
  }, [isBottomVisible]);

  const handleInputChange = (value: string) => {
    setSearchKeywords(value);
    if (value.length > 2) {
      if (selectedEntity == EntityType.Users) {
        dispatchUserData(value, 1);
      }
      if (selectedEntity == EntityType.Repos) {
        dispatchReposData(value, 1);
      }
    }
    if (value.length < 3) {
      setShowCards(false);
      setPageNumber(0);
    }
  };
  const handleSelectChange = (value: string) => {
    setSelectedEntity(value);
    setPageNumber(1);
    if (searchKeywords.length > 2) {
      if (selectedEntity == EntityType.Users) {
        dispatchUserData(searchKeywords, 1);
      }
      if (selectedEntity == EntityType.Repos) {
        dispatchReposData(searchKeywords, 1);
      }
    }
    if (searchKeywords.length < 3) {
      setShowCards(false);
    }
  };
  return (
    <Container
      css={[
        containerCss,
        !showCards && {
          height: "100%",
          paddingTop: 0,
          paddingBottom: 0,
          maxWidth: 480,
        },
      ]}
    >
      <HeroBanner
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
        selectOptions={dropDownOptions}
      />
      {isLoading && !showBottomLoader && (
        <Loader
          css={{
            paddingTop: 60,
          }}
        />
      )}
      {showCards && (
        <>
          <CardGrid
            selectedEntity={selectedEntity}
            userList={usersListState.data}
            repoList={reposListState.data}
            showLoaderAtBottom={showBottomLoader}
          />
        </>
      )}

      {showErrorScreen && !isLoading && (
        <ErrorScreen message="Failed to load data please try again." />
      )}
      <div ref={ref} style={{ width: "100%", height: "50px" }}></div>
    </Container>
  );
};

export default ListView;
