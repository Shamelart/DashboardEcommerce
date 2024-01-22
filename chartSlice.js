import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

// Acción asíncrona para obtener los datos del gráfico
export const fetchChartData = createAsyncThunk("chart/fetchChartData", async () => {
  const response = await fetch("http://localhost:5000/data");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
 // console.log(data)
  return data;
});

const chartSlice = createSlice({
  name: "chart",
  initialState: { data: [], loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
      //  console.log(action.payload);
        state.loading = "idle";
        state.data = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },  
});

// Crea un selector para obtener el estado del gráfico
const selectChartState = state => state.chart;

// Crea un selector memorizado para obtener los datos del gráfico
export const selectChartData = createSelector(
  [selectChartState],
  chartState => chartState ? chartState.data : []
);

export default chartSlice.reducer;
