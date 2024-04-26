import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fakeExecuteSort from '../../utils/fakeExecuterSort';

const initialState = {
  tickets: [],
  newTickets: [],
  searchId: '',
  sort: 'cheap',
  loading: false,
  error: false,
  stop: false,
  isShowMore: false,
  showMoreCount: 5,

  stateCheckBox: {
    all: true, noneTransfers: true, oneTransfers: true, twoTransfers: true, threeTransfers: true,
  },
};
const isError = action => action.type.endsWith('rejected');
const url = 'https://aviasales-test-api.kata.academy';

export const searchId = createAsyncThunk(
  'ticketsSlice/searchId',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${url}/search`);
    if (!response.ok) {
      return rejectWithValue('Сервер не отвечает!:(');
    }
    const data = await response.json();
    return data;
  }
);

export const getFetchTickets = createAsyncThunk(
  'fetch/getFetchTickets',
  async (id, { rejectWithValue }) => {
    const response = await fetch(`${url}/tickets?searchId=${id}`);
    if (!response.ok) return rejectWithValue('Сервер не отвечает!:(');
    const data = await response.json();
    return data;
  }
);

export const getFilterTickets = createAsyncThunk(
  'ticketsSlice/getFilterTickets',
  async ({ tickets, stateCheckBox }) => {
    const newTickets = tickets.filter(ticket => {
      if (
        stateCheckBox.noneTransfers &&
        Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length) === 0
      ) {
        return true;
      }
      if (
        stateCheckBox.oneTransfers &&
        Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length) === 1
      ) {
        return true;
      }
      if (
        stateCheckBox.twoTransfers &&
        Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length) === 2
      ) {
        return true;
      }
      if (
        stateCheckBox.threeTransfers &&
        Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length) === 3
      ) {
        return true;
      }
      return false;
    });

    return newTickets;
  }
);

export const fetchTicketsSort = createAsyncThunk("ticketsSlice/fetchTicketsSort", async (_, { getState }) => {
  const state = getState();

  const sorted = state.ticketsReducer.sort;
  const modifiedTickets = state.ticketsReducer.newTickets;

  return await fakeExecuteSort(sorted, modifiedTickets);
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    showMore(state) {
      if (!state.isShowMore) {
        state.isShowMore = true;
        state.showMoreCount += 5;
      }
    },
    setIsChecked(state, action) {
      console.log(action);
      state.newTickets = [];
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
        state.newTickets.sort((a, b) => a.price - b.price);
      }
      if (action.payload === 'fast') {
        state.sort = 'fast';
        state.newTickets.sort((a, b) => {
          const timeA = a.segments[0].duration + a.segments[1].duration;
          const timeB = b.segments[0].duration + b.segments[1].duration;
          return timeA - timeB;
        });
      }
      if (action.payload === 'optimal') {
        state.sort = 'optimal';
        state.newTickets.sort((a, b) => {
          const timeA = a.segments[0].duration + a.segments[1].duration;
          const timeB = b.segments[0].duration + b.segments[1].duration;
          return a.price - b.price || timeA - timeB;
        });
      }
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchId.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchId.fulfilled, (state, action) => {
        state.loading = false;
        state.searchId = action.payload.searchId;
      })
      .addCase(getFetchTickets.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.stop = action.payload.stop;
        state.tickets.push(...action.payload.tickets);
      })
      .addCase(getFilterTickets.pending, state => {
        state.loading = true;
      })
      .addCase(getFilterTickets.fulfilled, (state, action) => {
        if (
          state.stateCheckBox.noneTransfers ||
          state.stateCheckBox.oneTransfers ||
          state.stateCheckBox.twoTransfers ||
          state.stateCheckBox.threeTransfers
        )
          state.newTickets.push(...action.payload);
        if (state.stop) state.loading = false;
      })
      .addCase(fetchTicketsSort.pending, (state) => {
        state.loading = false;
      }).addCase(fetchTicketsSort.fulfilled, (state, action) => {
        state.newTickets = action.payload;
        state.showMoreCount = 5;
      })
      .addMatcher(isError, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const ticketsActions = ticketsSlice.actions; // export const { setIsChecked, setSort, showMore } = fetchSlice.actions;
const ticketsReducer = ticketsSlice.reducer;

export { ticketsActions, ticketsReducer };
