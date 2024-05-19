'use client';
import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from './firebase';

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [total, setTotal] = useState(0);

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.price !== '') {
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({ name: '', price: '' });
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
    });
    return () => unsubscribe();
  }, []);

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-4 sm:p-24 bg-gradient-to-b from-khaki to-light-khaki'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm '>
        <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
        <div className='bg-secondary p-6 rounded-lg shadow-lg'>
          <form className='grid grid-cols-6 items-center'>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className='col-span-3 p-3 border rounded-md'
              type='text'
              placeholder='Enter Item'
            />
            <input
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
              className='col-span-2 p-3 border rounded-md mx-3'
              type='number'
              placeholder='Enter ₱'
            />
            <button
              onClick={addItem}
              className='text-white bg-primary hover:bg-primary-dark p-3 text-xl rounded-md'
              type='submit'
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className='my-4 w-full flex justify-between items-center bg-secondary rounded-md shadow-md p-4'
              >
                <div className='flex-1 flex justify-between'>
                  <span className='capitalize'>{item.name}</span>
                  <span>₱{item.price}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className='ml-4 p-2 rounded-full bg-accent hover:bg-accent-dark text-white'
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length > 0 && (
            <div className='flex justify-between p-3 mt-4 bg-primary text-white rounded-md'>
              <span>Total</span>
              <span>₱{total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
