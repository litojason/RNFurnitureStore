import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  ColorAttribute,
  Furniture,
  FurnitureOption,
  SizeAttribute,
} from '../../types/furniture.types';
import {getFurnitureDetails} from '../../services/apis/furniture.api';

export const fetchFurnitureDetails = createAsyncThunk(
  'furniture/fetchFurnitureDetails',
  async (id: number, thunkAPI) => {
    const {furniture} = await getFurnitureDetails(id);

    return furniture;
  },
);

export interface FurnitureState {
  furniture?: Furniture;
  furnitureLoading: boolean;

  colorOptions: FurnitureOption['colorAttribute'][];
  selectedColor?: ColorAttribute;

  sizeOptions: FurnitureOption['sizeAttribute'][];
  selectedSize?: SizeAttribute;

  selectedFurnitureOptionId?: number;
}

const initialState: FurnitureState = {
  furniture: undefined,
  furnitureLoading: true,

  colorOptions: [],
  selectedColor: undefined,

  sizeOptions: [],
  selectedSize: undefined,

  selectedFurnitureOptionId: undefined,
};

const furnitureSlice = createSlice({
  name: 'furniture',
  initialState,
  reducers: {
    setSelectedColor: (
      state,
      action: PayloadAction<FurnitureState['selectedColor']>,
    ) => {
      const {selectedSize} = state;
      if (selectedSize) {
        state.selectedFurnitureOptionId =
          state.furniture?.furnitureOptions.find(
            ({sizeAttribute, colorAttribute}) =>
              sizeAttribute.code === selectedSize?.code &&
              colorAttribute.code === action.payload?.code,
          )?.id;
      }

      state.selectedColor = action.payload;
    },
    setSelectedSize: (
      state,
      action: PayloadAction<FurnitureState['selectedSize']>,
    ) => {
      const {selectedColor} = state;
      if (selectedColor) {
        state.selectedFurnitureOptionId =
          state.furniture?.furnitureOptions.find(
            ({sizeAttribute, colorAttribute}) =>
              sizeAttribute.code === action.payload?.code &&
              colorAttribute.code === selectedColor?.code,
          )?.id;
      }

      state.selectedSize = action.payload;
    },
    setSelectedAttributes: (
      state,
      action: PayloadAction<{
        selectedColor: FurnitureState['selectedColor'];
        selectedSize: FurnitureState['selectedSize'];
      }>,
    ) => {
      const {selectedColor, selectedSize} = action.payload;

      state.selectedColor = selectedColor;
      state.selectedSize = selectedSize;
    },
    resetSelectedAttribute: state => {
      state.selectedColor = undefined;
      state.selectedSize = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchFurnitureDetails.fulfilled, (state, action) => {
      state.furniture = action.payload;

      const furnitureOptions = action.payload.furnitureOptions;

      if (furnitureOptions.length !== 0) {
        const colorOptions = furnitureOptions.map(
          furnitureOption => furnitureOption.colorAttribute,
        );
        state.colorOptions = getUniqueObjectInArray(colorOptions);

        const sizeOptions = furnitureOptions.map(
          furnitureOption => furnitureOption.sizeAttribute,
        );
        state.sizeOptions = getUniqueObjectInArray(sizeOptions);
      }
    });
  },
});

export const furnitureActions = furnitureSlice.actions;

const getUniqueObjectInArray = (array: Object[]) =>
  [...new Set(array.map(i => JSON.stringify(i)))].map(i => JSON.parse(i));

export default furnitureSlice.reducer;
