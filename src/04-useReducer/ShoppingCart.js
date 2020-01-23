import React, { useReducer } from 'react';

const products = [
  { id: 1, name: 'Python Book', price: 29.99 },
  { id: 2, name: 'React Course', price: 49.99 },
  { id: 3, name: 'Mechanical Keyboard', price: 89.99 },
];

// je mets TOUT dans un seul state - je sais pas encore que c'est trop complex
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.product, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
        )
      };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  console.log('ShoppingCart rendered, items:', cart.items.length);

  const total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Shopping Cart (useReducer)</h3>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <h4>Products</h4>
          {products.map(p => (
            <div key={p.id} style={{ marginBottom: '8px' }}>
              <span>{p.name} — ${p.price}</span>
              <button
                onClick={() => dispatch({ type: 'ADD_ITEM', product: p })}
                style={{ marginLeft: '10px' }}
              >
                Add
              </button>
            </div>
          ))}
        </div>
        <div>
          <h4>Cart ({cart.items.length} items)</h4>
          {cart.items.length === 0 ? (
            <p style={{ color: '#999' }}>Empty</p>
          ) : (
            <>
              {cart.items.map(item => (
                <div key={item.id} style={{ marginBottom: '8px' }}>
                  <span>{item.name} x</span>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={e => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: Number(e.target.value) })}
                    style={{ width: '40px', marginLeft: '5px' }}
                  />
                  <span style={{ marginLeft: '5px' }}>${(item.price * item.qty).toFixed(2)}</span>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
                    style={{ marginLeft: '10px', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    x
                  </button>
                </div>
              ))}
              <p><strong>Total: ${total.toFixed(2)}</strong></p>
              <button onClick={() => dispatch({ type: 'CLEAR' })}>Clear Cart</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
