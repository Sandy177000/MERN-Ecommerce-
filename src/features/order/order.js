import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  incrementAsync,
  selectCount,
  selectOrder,
} from './orderSlice';

export default function Order() {
  const order = useSelector(selectOrder);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
 
      </div>
    </div>
  );
}
