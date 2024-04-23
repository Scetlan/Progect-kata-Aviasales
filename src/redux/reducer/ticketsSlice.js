import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { v4 as createId } from "uuid";
import { Api } from "../fetchRequests";

const initialState = {
  saveTickets: [],
  modifiedTickets: [],
  progressivelyLoadedTickets: [],
  fetchLoading: null,
  fakeLoading: null,
  sortType: null,
  isReceivedFetchData: false,
  error: false,
  stop: false,
  position: 5,

  stateCheckBox: {
    disabledAllCheckbox: false,
    allCheckbox: true,
    noneCheckbox: false,
    firstCheckbox: false,
    secondCheckbox: false,
    thirdCheckbox: false,
  },
};

const api = new Api();

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addQuantityTikets: (state) => {
      state.position += 5;
    },
    setCheckBox: (state, action) => {
      const { key, isActive } = action.payload;
      const { stateCheckBox } = state;

      state.stateCheckBox[key] = isActive;

      state.stateCheckBox.disabledAllCheckbox = stateCheckBox.noneCheckbox || stateCheckBox.firstCheckbox || stateCheckBox.secondCheckbox || stateCheckBox.thirdCheckbox;
      if (key === 'allCheckbox' && isActive) {
        for (const key in state.stateCheckBox) {
          state.stateCheckBox[key] = false;
        }
      }
    },

    setSortType: (state, action) => {
      if (action.payload === 'fast') {
        state.sortType = action.payload;
      }
      if (action.payload === 'cheap') {
        state.sortType = action.payload;
      }
      if (action.payload === 'optimal') {
        state.sortType = action.payload;
      }
    },

    setIdTickets: (state, action) => {
      const dataTrueId = action.payload.map((ticket) => {
        return { ...ticket, id: createId() };
      });

      state.saveTickets = [...state.saveTickets, ...dataTrueId];
    },

    executeFilter: state => {
      const { stateCheckBox } = state;
      let results = [];
      if (!stateCheckBox.disabledAllCheckbox) {
        state.modifiedTickets = state.saveTickets;
        return;
      }
      Object.keys(stateCheckBox).forEach((key, index) => {
        if (stateCheckBox[key]) {
          if (key !== 'allCheckbox' && key !== 'disabledAllCheckbox') {
            //Вычитаем из index кол-во ключей которые хотим пропустить от 0.
            const ticketsFilter = state.saveTickets.filter(({ segments }) =>
              segments.every(segment => segment.stops.length === index - 2)
            );
            if (ticketsFilter) {
              results = [...results, ...ticketsFilter];
            }
          }
        }
      });
      state.position = 5;
      state.modifiedTickets = results.sort(() => Math.random() - 0.5);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewTickets.pending, (state) => {
      state.fetchLoading = "pending";
      state.error = false;
    });
    builder.addCase(fetchNewTickets.fulfilled, (state, action) => {
      state.stop = action.payload.stop;
      state.isReceivedFetchData = true;
      state.fetchLoading = "fulfilled";
    });
    builder.addCase(fetchNewTickets.rejected, (state) => {
      state.error = true;
    });

    builder.addCase(loadingTickets.pending, (state) => {
      state.fakeLoading = "pending";
    });
    builder.addCase(loadingTickets.fulfilled, (state, action) => {
      state.fakeLoading = "fulfilled";

      if (action.payload.length > 1) {
        state.progressivelyLoadedTickets = action.payload;
        return;
      }

      state.progressivelyLoadedTickets = state.saveTickets.slice(0, state.position);
    });

    builder.addCase(fetchTicketsSort.pending, (state) => {
      state.fakeLoading = "pending";
    });

    builder.addCase(fetchTicketsSort.fulfilled, (state, action) => {
      state.modifiedTickets = action.payload;
      state.position = 5;
      state.fakeLoading = "fulfilled";
    });
  },
});

export const fetchNewTickets = createAsyncThunk("ticketsSlice/fetchNewTickets", async (_, { dispatch }) => {
  const session = Cookies.get('session');

  if (!session) {
    new Error("Not session");
  }

  const result = await api.get(`/tickets?searchId=${session}`, {
    headers: {
      "Content-type": "application/json",
    },
  });

  dispatch(ticketsActions.setIdTickets(result.tickets));

  return result;
});

export const loadingTickets = createAsyncThunk("ticketsSlice/loadingTickets", async (_, { getState }) => {
  const state = getState();

  const position = state.ticketsReducer.position;
  const modifiedTickets = state.ticketsReducer.modifiedTickets;

  const result = await api.fakeEndpoint(0, modifiedTickets);

  return result.slice(0, position);
});

//"fast" | "cheap" | "optimal"
export const fetchTicketsSort = createAsyncThunk("ticketsSlice/fetchTicketsSort", async (_, { getState }) => {
  const state = getState();

  const sortType = state.ticketsReducer.sortType;
  const modifiedTickets = state.ticketsReducer.modifiedTickets;

  return await api.fakeExecuteSort(sortType, modifiedTickets);
});

const ticketsActions = ticketsSlice.actions;
const ticketsReducer = ticketsSlice.reducer;

export { ticketsActions, ticketsReducer };
