import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserList } from "../../api";
import { RootState } from "../../store";
import { User, GetListParams } from "../../api/types";

export const SearchUserData = createAsyncThunk(
  "search/fetchUser",
  async (params: GetListParams, { getState }) => {
    // Check if the data is already present in the Redux store
    const currentState = (getState() as RootState).users.data;
    const existingData = currentState.filter((item: User) =>
      item.login.includes(params.query)
    );
    if (existingData && existingData.length > 0 && params.page === 1) {
      return existingData;
    }
    // If the data is not present, make the API call
    const data = await getUserList({
      query: params.query,
      page: params.page,
      perPage: params.perPage,
    });

    return data.items;
  }
);

export type SearchUserState = {
  data: User[];
  loading: boolean;
  error: any;
};
const initialState: SearchUserState = {
  data: [],
  loading: false,
  error: null,
};
const searchUserSlice = createSlice({
  name: "searchUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SearchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        SearchUserData.fulfilled,
        (state, { payload }: PayloadAction<User[]>) => {
          state.loading = false;
          state.error = null;
          const upadtedData = payload.filter(
            (item) => !state.data.includes(item)
          );
          state.data.push(...upadtedData);
        }
      )
      .addCase(SearchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default searchUserSlice.reducer;
