import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  newTickets: [],
  searchId: '',
  sort: '',
  loading: false,
  sortType: null,
  error: false,
  stop: false,
  isShowMore: false,
  showMoreCount: 5,

  stateCheckBox: {
    all: true,
    noneTransfers: false,
    oneTransfers: false,
    twoTransfers: false,
    threeTransfers: false,
  },
};
const isError = (action) => action.type.endsWith('rejected');

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    showMore(state) {
      if (!state.isShowMore) {
        state.isShowMore = true;
        state.showMoreCount += 5;
      }
    },
    setIsChecked(state, action) {
      state.filteredTickets = [];
      if (state.isShowMore) {
        state.isShowMore = false;
        state.showMoreCount = 5;
      }
      if (action.payload === 'all') {
        const all = !state.stateCheckBox.all;
        state.stateCheckBox = {
          all,
          noneTransfers: all,
          oneTransfers: all,
          twoTransfers: all,
          threeTransfers: all,
        };
      }
      if (action.payload === 'noneTransfers') {
        state.stateCheckBox = {
          ...state.stateCheckBox,
          all:
            !state.stateCheckBox.noneTransfers &&
            state.stateCheckBox.oneTransfers &&
            state.stateCheckBox.twoTransfers &&
            state.stateCheckBox.threeTransfers,
          noneTransfers: !state.stateCheckBox.noneTransfers,
        };
      }
      if (action.payload === 'oneTransfers') {
        state.stateCheckBox = {
          ...state.stateCheckBox,
          all:
            state.stateCheckBox.noneTransfers &&
            !state.stateCheckBox.oneTransfers &&
            state.stateCheckBox.twoTransfers &&
            state.stateCheckBox.threeTransfers,
          oneTransfers: !state.stateCheckBox.oneTransfers,
        };
      }
      if (action.payload === 'twoTransfers') {
        state.stateCheckBox = {
          ...state.stateCheckBox,
          all:
            state.stateCheckBox.noneTransfers &&
            state.stateCheckBox.oneTransfers &&
            !state.stateCheckBox.twoTransfers &&
            state.stateCheckBox.threeTransfers,
          twoTransfers: !state.stateCheckBox.twoTransfers,
        };
      }
      if (action.payload === 'threeTransfers') {
        state.stateCheckBox = {
          ...state.stateCheckBox,
          all:
            state.stateCheckBox.noneTransfers &&
            state.stateCheckBox.oneTransfers &&
            state.stateCheckBox.twoTransfers &&
            !state.stateCheckBox.threeTransfers,
          threeTransfers: !state.stateCheckBox.threeTransfers,
        };
      }
    },

    setSort(state, action) {
      if (state.isShowMore) {
        state.isShowMore = false;
        state.showMoreCount = 5;
      }
      state.loading = true;
      if (action.payload === 'cheap') {
        state.sort = 'cheap';
        state.filteredTickets.sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (action.payload === 'fast') {
        state.sort = 'fast';
        state.filteredTickets.sort((a, b) => {
          const timeA = a.segments[0].duration + a.segments[1].duration;
          const timeB = b.segments[0].duration + b.segments[1].duration;
          return timeA - timeB;
        });
      }
      if (action.payload === 'optimal') {
        state.sort = 'optimal';
        state.filteredTickets.sort((a, b) => {
          const timeA = a.segments[0].duration + a.segments[1].duration;
          const timeB = b.segments[0].duration + b.segments[1].duration;
          return a.price - b.price || timeA - timeB;
        });
      }
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchId.fulfilled, (state, action) => {
        state.loading = false;
        state.searchId = action.payload.searchId;
      })
      .addCase(getFetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.stop = action.payload.stop;
        state.tickets.push(...action.payload.tickets);
      })
      .addCase(getFilterTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFilterTickets.fulfilled, (state, action) => {
        if (
          state.filters.noneTransfers ||
          state.filters.oneTransfer ||
          state.filters.twoTransfers ||
          state.filters.threeTransfers
        )
          state.filteredTickets.push(...action.payload);
        if (state.stop) state.loading = false;
      })
      .addMatcher(isError, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

const url = 'https://aviasales-test-api.kata.academy';

export const searchId = createAsyncThunk("ticketsSlice/searchId", async (_, { rejectWithValue }) => {
  const response = await fetch(`${url}/search`);
  if (!response.ok) {
    return rejectWithValue('Сервер не отвечает!:(');
  }
  const data = await response.json();
  return data;
});

export const getFetchTickets = createAsyncThunk('fetch/getFetchTickets', async (id, { rejectWithValue }) => {
  const response = await fetch(`${url}/tickets?searchId=${id}`);
  if (!response.ok) return rejectWithValue('Сервер не отвечает!:(');
  const data = await response.json();
  return data;
}
);

export const getFilterTickets = createAsyncThunk("ticketsSlice/getFilterTickets", async (_, { tickets, filters }) => {
  const filteredTickets = [];

  if (filters.noneTransfers) {
    filteredTickets.push(
      ...tickets.filter((ticket) => Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length) === 0)
    );
  }
  if (filters.oneTransfers) {
    filteredTickets.push(
      ...tickets.filter((ticket) => Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length) === 1)
    );
  }
  if (filters.twoTransfers) {
    filteredTickets.push(
      ...tickets.filter((ticket) => Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length) === 2)
    );
  }
  if (filters.threeTransfers) {
    filteredTickets.push(
      ...tickets.filter((ticket) => Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length) === 3)
    );
  }
  return filteredTickets;
});


const ticketsActions = ticketsSlice.actions; //export const { setIsChecked, setSort, showMore } = fetchSlice.actions;
const ticketsReducer = ticketsSlice.reducer;

export { ticketsActions, ticketsReducer };


