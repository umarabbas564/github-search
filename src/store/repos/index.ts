import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getReposList } from "../../api";
import { RootState } from "..";
import { Repo, GetListParams } from "../../api/types";

export const SearchReposData = createAsyncThunk(
  "search/fetchRepo",
  async (params: GetListParams, { getState }) => {
    // Check if the data is already present in the Redux store
    const currentState = (getState() as RootState).repos.data;
    const existingData = currentState.filter((item: Repo) =>
      item.full_name.includes(params.query)
    );
    if (existingData && existingData.length > 0 && params.page === 1) {
      return existingData;
    }
    // If the data is not present, make the API call
    const data = await getReposList({
      query: params.query,
      page: params.page,
      perPage: params.perPage,
    });
    return data.items;
  }
);

export type SearchRepoState = {
  data: Repo[];
  loading: boolean;
  error: any;
};
const initialState: SearchRepoState = {
  data: [],
  loading: false,
  error: null,
};
const searchRepoSlice = createSlice({
  name: "searchRepo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SearchReposData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        SearchReposData.fulfilled,
        (state, { payload }: PayloadAction<Repo[]>) => {
          state.loading = false;
          state.error = null;
          const upadtedData = payload.filter(
            (item) => !state.data.includes(item)
          );
          state.data.push(...upadtedData);
        }
      )
      .addCase(SearchReposData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default searchRepoSlice.reducer;
