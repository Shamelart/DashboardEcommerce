import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

// Acción asíncrona para obtener los datos del gráfico
export const fetchChartData = createAsyncThunk("chart/fetchChartData", async () => {
  const response = await fetch("http://localhost:5000/transact");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const bar = await response.json();
  console.log('Datos recibidos de la API:', bar); // Imprime los datos recibidos
  return bar; // Devuelve los datos recibidos
});

const transactionSlice = createSlice({
  name: "transaction",
  initialState: { 
    barChartData: [], 
    loading: "idle", 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        console.log('Datos almacenados en Redux:', action.payload); // Imprime los datos almacenados
        state.loading = "idle";
        state.barChartData = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },  
});


// Crea un selector para obtener el estado del gráfico
const selectChartState = state => state.transaction;


// Crea un selector memorizado para obtener los datos del gráfico
export const selectChartData = createSelector(
  [selectChartState],
  chartState => chartState ? chartState.barChartData : []
);

export default transactionSlice.reducer;
