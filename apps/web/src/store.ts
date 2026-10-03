import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export type EventItem = {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
};

type EventsState = {
  items: EventItem[];
  status: 'idle' | 'loading' | 'failed';
};

const initialState: EventsState = { items: [], status: 'idle' };

export const loadEvents = createAsyncThunk('events/load', async () => {
  const response = await fetch('/api/events');
  if (!response.ok) throw new Error('Impossible de charger les evenements');
  return (await response.json()) as EventItem[];
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadEvents.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(loadEvents.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const store = configureStore({
  reducer: { events: eventsSlice.reducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
